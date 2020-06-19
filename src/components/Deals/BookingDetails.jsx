import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { Tabs } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
import Report from '../../images/report.jpg'
import './BookingDetails.css'
import DealList from './DealList'
import Calendar from '../Calendar/Calendar'
import Axios from "axios";
import { apiurl } from "../../App";
import ValidationLibrary from '../../helpers/validationfunction';
import dateformat from 'dateformat';

export default class BookingDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            serviceType: [
                {
                    id: 1,
                    service_type: "All"
                }
            ],
            edit: false,
            activeKey: "1",
            serviceTypeAll: false,
            dealOption: "M",
            deal_valid_from: '',
            deal_valid_to: '',
            dealActive: false,
            bookingDetails: {
                'service_type': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'deal_title': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'deal_amt': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                }
            }
        }
    }
    callback = (key) => {
        this.setState({
            activeKey: key
        })
    }

    changeTabFun = (data) => {
        this.setState({
            activeKey: "1",
            editData: data,
            edit: true
        })
        // For Edit Data form filling
        this.state.bookingDetails.service_type.value = 19
        this.state.bookingDetails.deal_title.value = data.deal_title
        this.state.bookingDetails.deal_amt.value = data.deal_amount
        this.state.dealActive = data.deal_active === 1 ? true : false
        this.state.dealOption = data.deal_options === "Amount" ? "M" : "F"
        this.state.deal_valid_from = dateformat(data.deal_valid_from, "yyyy-mm-dd")
        this.state.deal_valid_to = dateformat(data.deal_valid_to, "yyyy-mm-dd")
        this.setState({})

    }

    componentWillMount() {
        Axios({
            method: 'GET',
            url: 'https://ipapi.co/json/',
        }).then((response) => {
            this.setState({
                myIpAddress: response.data.ip
            })
        }).catch((error) => {
            alert(JSON.stringify(error))
        })

        var self = this;
        Axios({
            method: 'GET',
            url: apiurl + 'get_mas_doctor_service_type',
        }).then((response) => {
            response.data.data.map((val, index) => {
                return (
                    self.state.serviceType.push({ id: val.id, service_type: val.service_type })
                )
            })
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
        this.setState({})
        console.log(this.state.serviceType, "myservicetype")
    }


    checkValidation = () => {
        var bookingDetails = this.state.bookingDetails;
        var bookingKeys = Object.keys(bookingDetails);
        console.log(bookingKeys);
        for (var i in bookingKeys) {
            var errorcheck = ValidationLibrary.checkValidation(bookingDetails[bookingKeys[i]].value, bookingDetails[bookingKeys[i]].validation);
            console.log(errorcheck);
            bookingDetails[bookingKeys[i]].error = !errorcheck.state;
            bookingDetails[bookingKeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = bookingKeys.filter((obj) =>
            bookingDetails[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })
            this.onSubmitData()
        }
        this.setState({ bookingDetails })
    }
    changeDynamic = (data, key) => {
        var bookingDetails = this.state.bookingDetails;
        var errorcheck = ValidationLibrary.checkValidation(data, bookingDetails[key].validation);
        bookingDetails[key].value = data;
        bookingDetails[key].error = !errorcheck.state;
        bookingDetails[key].errmsg = errorcheck.msg;
        this.setState({ bookingDetails });
        if (key === "service_type" && data === 1) {
            alert("true")
            var Data = [];
            this.state.serviceType.map(val => val.id > 1 && Data.push(val.id))
            console.log(Data.toString(), "myData")
            this.setState({
                serviceTypeAll: Data.toString()
            })
        }
        this.setState({})
    }

    changeDealOption = (data) => {
        this.setState({ dealOption: data });
    }

    dealActiveCheck = (e) => {
        console.log(e.target.checked, "mytargetValue")
        this.setState({
            dealActive: e.target.checked
        })
    }

    getRangeData = (data) => {
        this.setState({
            deal_valid_from: dateformat(new Date(data[0].split(" ").reverse().join("/")), "yyyy-mm-dd"),
            deal_valid_to: dateformat(new Date(data[1].split(" ").reverse().join("/")), "yyyy-mm-dd")
        })
        this.setState({})
    }

    onSubmitData = () => {
        var bookingDetails = {
            userId: 1,
            dealvendorId: 1,
            dealservicetypeId: this.state.serviceTypeAll === false ? this.state.bookingDetails.service_type.value : this.state.serviceTypeAll,
            dealtitle: this.state.bookingDetails.deal_title.value,
            dealvalidfrom: this.state.deal_valid_from,
            dealvalidto: this.state.deal_valid_to,
            dealoptions: this.state.dealOption === "M" ? "Amount" : "Percentage",
            dealamount: this.state.bookingDetails.deal_amt.value,
            dealactive: this.state.dealActive === true ? 1 : 0,
            ipaddress: this.state.myIpAddress,
            activeflag: 1,
            createdby: 1,
            createdon: dateformat(new Date(), "yyyy-mm-dd"),
            modifiedby: 1,
            modifiedon: dateformat(new Date(), "yyyy-mm-dd"),
        }
        if (this.state.edit === false) {
            alert("True")
            this.bookingDetailsInsertApi(bookingDetails)
        } else {
            alert("false")
            this.bookingDetailsEditApi(bookingDetails)
        }
    }
    // Once form submitted successfully then form resets happens here
    // resetFormValue = () => {
    //     this.setState({

    //     })
    //         this.state.bookingDetails.service_type.value="",
    //         this.state.bookingDetails.deal_title.value="",
    //         this.state.deal_valid_from="",
    //         this.state.deal_valid_to="",
    //         this.state.dealOption = "M",
    //         this.state.bookingDetails.deal_amt.value="",
    //         this.state.dealActive = false
    // }

    bookingDetailsInsertApi = (bookingDetails) => {
        Axios({
            method: 'POST',
            url: apiurl + 'insertDeals',
            data: {
                ...bookingDetails
            }
        }).then((response) => {
            console.log(response)
            // this.resetFormValue()
            this.getDealsList()

        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }


    bookingDetailsEditApi = (bookingDetails) => {
        Axios({
            method: "PUT",
            url: apiurl + "editDeals",
            data: {
                Id: this.state.editData.id,
                ...bookingDetails
            }
        }).then((response) => {
            alert(JSON.stringify(response))
            // this.resetFormValue()
            this.getDealsList()
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }

    // For Update purpose we are using this function here (if we try use this in dealList.jsx then we cant update automatically the list)
    getDealsList = () => {
        Axios({
            method: 'GET',
            url: apiurl + '/getDeals',
        }).then((response) => {
            this.setState({
                dealsList: response.data.data
            })
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }

    render() {
        const { TabPane } = Tabs;
        return (
            <div className="booking_createlist">
                <Grid container>
                    <Grid item xs={12} md={7}>
                        <Calendar
                            // edit={this.state.edit === true && true}
                            editFromDate={this.state.editData && this.state.editData.deal_valid_from}
                            editToDate={this.state.editData && this.state.editData.deal_valid_to}
                            getDate={(data) => this.getRangeData(data)}
                        />
                    </Grid>
                    <Grid item xs={12} md={5} >
                        <Tabs defaultActiveKey={"1"} activeKey={this.state.activeKey} onChange={this.callback}>
                            <TabPane tab="Create Deals" key={"1"}>
                                <Grid container spacing={2} className="deal_container">
                                    <Grid item xs={12} md={6}   >
                                        <Labelbox
                                            type="select"
                                            labelname="Service Type"
                                            valuelabel={'service_type'}
                                            valuebind={"id"}
                                            dropdown={this.state.serviceType}
                                            changeData={(data) => this.changeDynamic(data, 'service_type')}
                                            value={this.state.bookingDetails.service_type.value}
                                            error={this.state.bookingDetails.service_type.error}
                                            errmsg={this.state.bookingDetails.service_type.errmsg}
                                        />
                                        <Labelbox
                                            type="text"
                                            labelname="Valid From"
                                            value={this.state.deal_valid_from}
                                        />

                                        <div className="radio_buttons">
                                            <Labelbox
                                                labelname="Deal Options"
                                                type="radio"
                                                dealOption={this.state.dealOption}
                                                changeDealOption={(data) => this.changeDealOption(data)}
                                            />
                                        </div>

                                    </Grid>
                                    <Grid item xs={12} md={6} className="deal_container">
                                        <Labelbox
                                            type="text"
                                            labelname="Deal Title"
                                            valuelabel={'deal_title'}
                                            changeData={(data) => this.changeDynamic(data, 'deal_title')}
                                            value={this.state.bookingDetails.deal_title.value}
                                            error={this.state.bookingDetails.deal_title.error}
                                            errmsg={this.state.bookingDetails.deal_title.errmsg}
                                        />
                                        <Grid container spacing={2}>
                                            <Grid item xs={7} md={7}>
                                                <div className="datepicker_active">
                                                    <Labelbox
                                                        type="text"
                                                        labelname="Valid To"
                                                        value={this.state.deal_valid_to}
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={5} md={5} className="validdate_picker">
                                                <div className="Deal_activecheck">
                                                    <Checkbox className="Deal_active_check" checked={this.state.dealActive} onChange={(e) => this.dealActiveCheck(e)} /><span>Deal Active</span></div>
                                            </Grid>
                                        </Grid>
                                        {/* <Labelbox
                                            type="number"
                                            labelname={this.state.dealOption === "M" ? "Deal Amount" : "Deal Percentage"}
                                            valuelabel={'deal_amt'}
                                            changeData={(data) => this.changeDynamic(data, 'deal_amt')}
                                            value={this.state.bookingDetails.deal_amt.value}
                                            error={this.state.bookingDetails.deal_amt.error}
                                            errmsg={this.state.bookingDetails.deal_amt.errmsg}
                                        /> */}
                                    </Grid>
                                    <Grid item xs={12} md={6}>

                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div className="createbutton-container">
                                            <Button className="create_cancel">Cancel</Button>
                                            <Button className="media_save" onClick={this.checkValidation}>
                                                {
                                                    this.state.edit === true ? "Update" : "Save"
                                                }
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </TabPane>
                            <TabPane tab="Deal List" key="2">
                                <DealList
                                    dealsList={this.state.dealsList} // list data
                                    getDealsList={this.getDealsList} // get api function
                                    serviceType={this.state.serviceType} // dropdown val
                                    changeTab={(data) => this.changeTabFun(data)} // for automatically change the tab
                                />
                            </TabPane>
                        </Tabs>
                        <div></div>
                    </Grid>

                </Grid>
            </div >
        )
    }
}