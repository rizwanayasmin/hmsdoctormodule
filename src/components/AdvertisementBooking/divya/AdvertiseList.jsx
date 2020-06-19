import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import Report from '../../images/report.jpg'
import './AdvertiseList.css'
import { Progress } from 'antd';
import Workflow from '../../images/workflow.svg'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Full from '../../images/half.svg'
import Half from '../../images/Full.svg'
import DeleteMedia from './DeleteMedia'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
import Axios from 'axios';
import apiservice from '../../apiservices';
import { apiurl, imageUrl } from "../../App";
import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';
// import apiservice from '../apiservice';
const data = [
    { month: 'Jan.', count: 69, city: 'tokyo' }
];
const scale = {
    month: { alias: 'Month', },
    count: { alias: 'Sales', },
};
export default class DealList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false,
            
                id: '',
              
        // adDetails:[],
        details:[
            {
                id: "",
                // ad_title: ad test,
                ad_start_date: "",
                ad_end_date: "",
                ad_total_days: "",
                ad_size: "",
                ad_location_id: "",
                ad_fee_per_day: "",
                ad_total_cost: "",
                ad_filename: null,
                ad_vendor_id: 1,
                created_by: 1,
                created_on: "2020-04-16 05:24:53",
                modified_by: 1,
                modified_on: "2020-04-16 05:24:53",
                ipaddress: "126.183.0.1",
                ad_approve_status: "",
                ad_approval_time: null,
                business_days: ""
            }
         ]
    }
}
getAdBooking = (details) => {
    Axios({
        method: 'POST',
        url: apiurl + 'getAdBooking',
        data: {
            doctorid: 1,
        }
    }).then((response) => {
        console.log(response)
        // this.resetFormValue()
        this.getDealsList()

    }).catch((error) => {
        alert(JSON.stringify(error))
    })
    console.log("hello", details)
}
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }


    handleChange = event => {
        this.setState({ id: event.target.value });
      }
    // handleDelete = event => {
    //     event.preventDefault();
    
    //     Axios.delete(`http://52.200.251.222:8158/api/v1/deleteAdBooking/${this.state.id}`)
    //       .then(res => {
    //         console.log(res);
    //         console.log(res.data);
    //       })
    //   }
      handleDelete = (details) => {
        Axios({
            method: 'POST',
            url: apiurl + 'deleteAdBooking',
            data: {
                doctorid: 1,
            }
        }).then((response) => {
            console.log(response)
            // this.resetFormValue()
            this.getDealsList()
    
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
        console.log("deletedetails", details)
    }

    render() {
        return (
            <div className="location_add_container">
                {/* {this.props.adDetails.map((details) => {return( */}

                    
                    <div className="Ad_location_container">
                        <div className="advertise_addlist_items">
                            <div >
                                <div><p className="list_head">Ad Location</p>
                <p className="list_subhead">
                    {/* {details.ad_location_id} */}
                </p></div>
                                <div><p className="list_head">Days</p>
                                    <p className="list_subhead">5</p></div>
                            </div>
                            <div>
                                <div><p className="list_head">Start Date</p>
                                    <p className="list_subhead">11 Nov 2020</p></div>
                                <div><p className="list_head">Fee / Day (KWD)</p>
                                    <p className="list_subhead">500</p></div>
                            </div>
                            <div>
                                <div><p className="list_head">End Date</p>
                                    <p className="list_subhead">15 Nov 2020</p></div>
                                <div><p className="list_head">Total Cost (KWD)</p>
                                    <p className="list_subhead">1000</p></div>
                            </div>

                            <div>
                                <div> <img src={Full} /> </div>
                                <span className="full_half_div">Full</span>
                                <div>
                                    <img src={Workflow} className="listdelete_icon" />
                                    <EditIcon className="list_edit" />
                                    <DeleteIcon className="listdelete_icon" 
                                    onClick={this.handleDelete} />
                                </div>
                                {/* <img src={Full}/> */}

                            </div>
                        </div>



                        {/* <div className="advertise_addlist_items"> */}
                        {/* <div >
                    <div><p className="list_head">Ad Location</p>
                    <p className="list_subhead">App Home</p></div>
                    <div><p className="list_head">Days</p>
                    <p className="list_subhead">5</p></div>
               </div>
               <div>
                    <div><p className="list_head">Start Date</p>
                    <p className="list_subhead">11 Nov 2020</p></div>
                    <div><p className="list_head">Fee / Day (KWD)</p>
                    <p className="list_subhead">500</p></div>
               </div> */}
                        {/* <div>
                    <div><p className="list_head">End Date</p>
                    <p className="list_subhead">15 Nov 2020</p></div>
                    <div><p className="list_head">Total Cost (KWD)</p>
                    <p className="list_subhead">1000</p></div>
               </div> */}

                        {/* <div>
                  <div> <img src={Half}/> </div>
                  <span className="full_half_div">Half</span>
                   <div>
                       <img src={Workflow} className="listdelete_icon"/>
                       <EditIcon className="list_edit"/>
                       <DeleteIcon className="listdelete_icon"/>
                   </div> */}
                        {/* <img src={Full}/> */}

                        {/* </div> */}
                        {/* </div> */}
                    </div>
             
                        <Modalcomp xswidth={"xs"} clrchange="textclr" title="Delete Media" visible={this.state.open} closemodal={this.handleClose}>
                            <DeleteMedia />
                        </Modalcomp>
       </div>
        )
    
    }
}