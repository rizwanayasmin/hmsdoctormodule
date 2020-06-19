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
​
​
const data = [
    { month: 'Jan.', count: 69, city: 'tokyo' }
];
const scale = {
    month: { alias: 'Month', },
    count: { alias: 'Sales', },
};
​
​
​
export default class DealList extends React.Component{
    constructor(props) {
        super(props)
        this.state = { open: false,
            
                id: '',
              
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
​
​
    getAdBooking=()=>{
        Axios({
            method: 'POST',
            url: apiurl + 'getAdBooking'
            
          })//if your using axios no need of conversion to json
          .then((response) =>{//2.getting json response in another promise function called .then function
              var data=response.data
              console.log("response",data)
         
          console.log("data", data)
            
            if(data.status==1){//checking success response = 1
              this.setState({details: data.data})
            }
            // else{} send the error response = 0
            console.log("details",this.state.details)
          })
    }
​
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
​
​
    handleChange = event => {
        this.setState({ id: event.target.value });
      }
​
​
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
​
​
    render(){
        return(
         <>
            <div className="location_add_container">
        
                {this.state.details.map((bookingDetails) => {
                    return(
                        <div className="Ad_location_container">
                        <div className="advertise_addlist_items">
                      
                            <div>
                                <div>
                                    <label className="list_head">Ad Location</label>
                            <h5 className="list_subhead">{bookingDetails.ad_location_id}</h5>
                                </div>
                                
                                <div>
                                    <label className="list_head">Days</label>
                            <h5 className="list_subhead">{bookingDetails.ad_total_cost}</h5>
                                </div>
                                
                            </div>
    
    
                            <div>
                                <div>
                                    <label className="list_head">Start Date</label>
                            <h5 className="list_subhead">{bookingDetails.ad_start_date}</h5>
                                </div>
                                
                                <div>
                                    <label className="list_head">Fee / Day (KWD)</label>
                                    <h5 className="list_subhead">{bookingDetails.ad_fee_per_day}</h5>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="list_head">End Date</label>
                                    <h5 className="list_subhead">{bookingDetails.ad_end_date}</h5>
                                </div>
                                
                                <div>
                                    <label className="list_head">Total Cost (KWD)</label>
                                    <h5 className="list_subhead">{bookingDetails.ad_total_cost}</h5>
                                </div>
                            </div>
    
                                <div>
                                    <div> <img src={Full} /> </div>
                                    <h5 className="full_half_div">{bookingDetails.ad_filename}</h5>
                                        <div>
                                            <img src={Workflow} className="listdelete_icon" />
                                            <EditIcon className="list_edit" />
                                            <DeleteIcon className="listdelete_icon" 
                                            onClick={this.handleDelete} />
                                        </div>
                                    {/* <img src={Full}/> */}
                                </div>
                                  
                        </div>
                    </div>
                    )
                })}
​
​
            </div>
​
             
​
             
                        
                          
                <div>
                 
                        <Modalcomp xswidth={"xs"} clrchange="textclr" 
                        title="Delete Media" visible={this.state.open} closemodal={this.handleClose}>
                            <DeleteMedia />
                        </Modalcomp>
                </div>
​
​
                </>
​
​
       
               
                    
            
        )
    }
}