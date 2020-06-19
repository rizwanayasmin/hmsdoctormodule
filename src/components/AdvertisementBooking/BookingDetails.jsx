import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Labelbox from "../../helpers/labelbox/labelbox"
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import { Tabs } from 'antd';
import Checkbox from '@material-ui/core/Checkbox';
import Report from '../../images/report.jpg'
import './BookingDetails.css'
import { FiInfo } from "react-icons/fi";
import { Upload, Icon, message } from 'antd';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AdvertiseList from './AdvertiseList'
import InfoIcon from '@material-ui/icons/Info';
import UploadMedia from './UploadInstruction'
import Modalcomp from '../../helpers/ModalComp/Modalcomp'
import Calendar from '../Calendar/Calendar'
import Info from '../../images/info.svg'
import DeleteMedia from './DeleteMedia'
import { NavLink} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import { apiurl, imageUrl } from "../../App";
import Axios from "axios";
import apiservice from '../../apiservices';
import dateformat from 'dateformat';



// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
//   }
//   ​
//   function beforeUpload(file) {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must smaller than 2MB!');
//     }
//     return isJpgOrPng && isLt2M;
//   }
export default class BookingDetails extends React.Component{
constructor(props)
{
super(props)
   this.state={
       open:false,
       loading: false,
       data:[],
       placementLocation:[],
       sizeData:[ ],
       sizeCheck: "S",
       details:[
           {
            id: "",
          
            startdate:new Date(),
            endDate:new Date(),
            adtotaldays: 5,
            adsize: "",
            adlocationId: "",
            adfeeperday: "",
            adtotalcost: "",
            imageArray: null,
            advendorId: 1,
            createdby: 1,
            createdon: "2020-04-16 05:24:53",
            modifiedon: 1,
            // modified_on: "2020-04-16 05:24:53",
            ipaddress: "126.183.0.1",
            // ad_approve_status: "",
            // ad_approval_time: null
           }
       ]
    }
}
// handleimage = info => {
//     if (info.file.status === 'uploading') {
//       this.setState({ loading: true });
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       getBase64(info.file.originFileObj, imageUrl =>
//         this.setState({
//           imageUrl,
//           loading: false,
//         }),
//       );
//     }
//     this.setState({})
//   };


// handleFile= event => {
//     let ad_file =event.target.value
//     this.setState({imageArray:ad_file})
// }
changeTabFun = (data) => {
    this.setState({
        activeKey: "1",
        editData: data,
        edit: true
    })
    

}
// changeDate = startdate=>
//     this.setState({
//         startdate,
//         endDate
//     })

changeSizeCheck = (data) => {
    this.setState({ sizeCheck: data });
}
componentWillMount(){
  
    this.handleChangeSize()
    this.handlePlacement()
   this.handleSubmit()
  
}
handleChangeSize =()=>{
    Axios({
        method: 'GET',
        url: apiurl+"get_mas_size_master"      
      })
      .then((response) =>{//1..getting json response in another promise function called .then function
          var data=response.data
          console.log("BookingDetails -> checkSize -> data", data)
          
          if(data.status==1){ //2.checking success response = 1
            
          this.setState({sizeData: data.data})
          console.log("BookingDetails -> componentWillMount -> data", data)
        }
        // else{} 3.send the error response = 0
        console.log("sizeData",this.state.sizeData)
      })
}
handlePlacement=()=>{
    Axios({
        method: 'GET',
        url: apiurl + 'get_mas_placement_location'
        
      })//if your using axios no need of conversion to json
      .then((response) =>{//2.getting json response in another promise function called .then function
          var data=response.data
          console.log("response",data)
      //   console.log("RevenueMaster -> componentWillMount -> data", data)
      console.log("data", data)
        
        if(data.status==1){//checking success response = 0
          this.setState({placementLocation: data.data})
        }
        // else{} send the error response = 1
        console.log("placement_location",this.state.placementLocation)
      })
}

handleChange = event => {
    this.setState({ 
        id: event.target.value,
        startdate: event.target.value,
        endDate: event.target.value,
        adtotaldays: event.target.value,
        adsize: event.target.value,
        adlocationId: event.target.value,
        adfeeperday: event.target.value,
        adtotalcost: event.target.value,

     });
  }

   

    handleSubmit = () => {
        var details = {
        id:this.state.id,
        startdate:this.state. startdate,   
        endDate:this.state.endDate,
        adtotaldays:this.state.adtotaldays,
        adsize:this.state.adsize,
        adlocationId: this.state.adlocationId, 
        adfeeperday:this.state.adfeeperday,
        adtotalcost:this.state. adtotalcost,
        imageArray:this.state.imageArray,
        advendorId: 1,
        createdby: 1,
        ipaddress: "126.183.0.1",
        ad_approve_status: "R",
        ad_approval_time: null,
        createdon: dateformat(new Date(), "yyyy-mm-dd"),
        modifiedby: 1,
        modifiedon: dateformat(new Date(), "yyyy-mm-dd"),
        }
        if (this.state.edit === false) {
            alert("True")
            this.insertAdBooking(details)
        }
        //  else {
        //     alert("false")
        //     this.bookingDetailsEditApi(bookingDetails)
        // }
        console.log("creator",details)
    }
    insertAdBooking = (details) => {
        Axios({
            method: 'POST',
            url: apiurl + 'insertAdBooking',
            data: {
                details
            }
        }).then((response) => {
            console.log(response)
            // this.resetFormValue()
            this.getDealsList()

        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }

handleOpen=()=>
{
    this.setState({open:true})
}
handleClose=()=>
{
    this.setState({open:false})
}

 callback=(key)=>{
    console.log(key);
  }

//   image upload api

  uploadFile = ({target : {files}}) =>{
      console.log(files[0])
      let data =new FormData();
      data.append ('file',files[0])
      Axios({
        method: 'POST',
        url: apiurl + 'insertAdBooking'
              
      })
      .then((res) =>{
          console.log(res)
      })
  }
render()
{
    console.log("sdfkjsdfksdf",this.state.sizeData)
    const { TabPane } = Tabs;

    const uploadButton = (
        <div>
          {this.props.loading ? <Icon type='loading'/>
          :<CameraAltIcon className="" />}
          <div className="ant-upload-text">Add Photo</div>
        </div>
      );
      const { imageUrl } = this.state;
    return(
        <div className="booking_createlist">
            <Grid container className="calendar_container" spacing={3}>
            <Grid item xs={12} md={7} >
              
                <Calendar/>
               
                </Grid>
                <Grid item xs={12} md={5}>
                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Create Ad" key="1"> 
                            <Grid container>
                                <Grid item xs={12} md={6} className="create_container">
                                    <Labelbox type="datepicker" labelname="Start Date" value={this.state.startdate}
                                    onChange={this.handleChange}/>
                                    
                                    <div className="half_full_container">
                                
                            {
                                this.state.sizeData.length > 0 && this.state.sizeData.map(checkingsize =>
                                    <div> 
                                        <Checkbox value={checkingsize.adsize} 
                                        // value={this.state.startdate}
                                        onChange={this.changeDate}> 
                                            </Checkbox>
                                            {checkingsize.size} 
                                            </div>
                                )}
                                    </div>

                                    <label className="fees_cost" >Fee / Day (KWD)</label>
                                    <input type="number" value={this.state.adfeeperday} onChange={this.handleChange}></input>
                                </Grid>

                                <Grid item xs={12} md={6} className="create_container">
                                    <Labelbox type="datepicker" labelname="End Date"
                                    onChange={this.handleChange} value={this.state.endDate}/>
                                    
                                   

                                <label className="location_label">Placement Location</label>
                                    <select className="select_location"  onChange={this.handleChange} 
                                        style={{width:"150px", height:"30px"}} type="drop down">
                                            {
                                                this.state.placementLocation.map(location =><option 
                                                    value={location.adlocationId}>{location.placement_location}</option>)}
                                    </select>
               
                                    <p className="fees_cost">Total Cost (KWD)</p>
                                                <input type="number" value={this.state.adtotalcost} onChange={this.handleChange}></input>
                                </Grid>

                                <Grid item xs={12} md={12} className="create_container">
                                    <div><label>Upload Advertisement</label>
                                        <span><img src={Info} className="info_icon" onClick={this.handleOpen}/></span>
                                    </div>
                                        {/* <Upload className="browse_files" value={this.state.imageArray}  onChange={this.handleFile}>
                                            <span>My image.jpg </span>
                                            <span><Button className="button_browse">Browse</Button></span>
                                        </Upload> */}
                                  {/* <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    // onChange={(e)=> this.props.changeData(e)}
                                    onChange={this.handleimage}
                                    sendData={this.state.imageUrl}
                                >
                                    {this.props.imageUrl ? <img src={this.props.imageUrl} 
                                    alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload> */}


 {/* image upload  */}
<input  type="file" className="form-control profile-pic-uploader" onChange={this.uploadFile}/>


                                </Grid>
                                <Grid item xs={12} md={12} className="create_container">
                                    <div className="datebook_container">
                                        <Button className="datebook_button" onClick={this.handleSubmit}
                                        //  component={NavLink} to="/home/payment"
                                         > Book</Button>
                                    </div>
                                </Grid>
                            </Grid>  
                        </TabPane>
                
                        <TabPane tab="Ad List" key="2">
                            <AdvertiseList
                            //    changeTab={(data) => this.changeTabFun(data)}
                               />
                        </TabPane>
                    </Tabs>
                <div></div>
            </Grid>
        </Grid>
        
        <Modalcomp xswidth={"xs"} clrchange="textclr" title="UPLOAD INSTRUCTIONS" visible={this.state.open} closemodal={this.handleClose}>
            <UploadMedia/>
        </Modalcomp>
    </div>
    )
  }
}