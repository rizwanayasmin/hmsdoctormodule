import React, { Component } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead'
import { Select } from 'antd';
import { Input } from 'antd';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {apiurl} from '../../App';
​
const { Option } = Select;
​
class ScheduleComp extends Component {
    constructor(props) {
        super(props)
​
        this.state = {
            fromtime:null,
            fromError:"",
            totime:null,
            toError:"",
            slotduration:null,
            durationError:"",
            ipaddress:"126.187.50.1",
            isvip:null,
            vipError:"",
            NoOfslots:null,
            slotsError:"",
            checkedA:false,
            checkedB:false,
            checkedC:false,
            checkedD:false,
            checkedE:false,
            checkedF:false,
            checkedG:false,
            checkedH:false,
            days:[]
        }
    }
validate = () =>{
let fromError="";
let toError="";
let durationError="";
let vipError="";
let slotsError="";
​
if(!this.state.fromtime.includes(':') && (!this.state.toError.includes(':'))){
  fromError="Time Format is Invalid";
  toError="Time Format is Invalid";
  
}
​
if(fromError){
  this.setState({fromError,toError})
  return false
}
return true
​
}
    // send api
​
    sendDetails = () => {
      const isValid= this.validate()
      console.log("iddd", this.props.clinic)
      if (isValid){
        var data = {
            "clinicId":this.props.clinic !== '' ? this.props.clinic : 1,
            "fromtime":this.state.fromtime,   
            "totime":this.state.totime,
            "slotduration":this.state.slotduration,
            "NoOfslots":this.state.NoOfslots,
            "days": this.state.days, 
            "doctorId":"4",
            "isvip":this.state.isvip,
            "createdby":"19",
            "ipaddress":"126.187.50.1"
        }
​
        fetch(apiurl+'insertdocAppointmentSettings',{
              method:'post',
              headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((response) => response.json()).then((responseJson) => {
            console.log("success or not",responseJson)
        })
​
        console.log("sdfkjsdkfjskdfjksfd",data)
        } }
​
    handleChange = (event) => {
      
        this.setState({
            [event.target.name] :event.target.value
        })
    }
​
    Changecheckedbox = ((name,id) => event => {
        
        this.setState({ ...this.state, [name]: event.target.checked,days:[...this.state.days,id]},() => console.log("sdfksdkfjsdklf",this.state.days));
    });
​
    handledrop = (value) => {
        alert(value)
          value === "vip" ? this.setState({isvip:1}) : this.setState({isvip:2})
    }
    render() {
        return (
            <div>
                 <div>
        <div className="AvailabilityDetailsDiv">
            <TableRow> 
          <TableCell component="th" id={""} scope="row" padding="none"  style={{width:"9vw"}}>
                                 <div className="Availability-sno-wrapper">  {"1"} </div>
                               </TableCell>
                              
 
 
                               <TableCell align="right" style={{ width: "15vw" }}>
                                 <Input name="fromtime" value={this.state.fromtime} onChange={this.handleChange}  style={{ width: 90 }}/>
                                 <div>{this.state.fromError}</div></TableCell>
                               
​
                               <TableCell align="right" style={{ width: "15vw" }} >
                                 <Input name="totime" value={this.state.totime} onChange={this.handleChange} style={{ width: 90 }} />
                                 <div>{this.state.toError}</div></TableCell>
                                 
 
                               <TableCell align="right" className="Abi" style={{ width: "15vw" }}>
                                 <Input value={this.state.slotduration} name="slotduration" onChange={this.handleChange} style={{ width: 60 }} /><label className="slot-duration-unit_label">Min</label>
                                 <div>{this.state.durationError}</div> </TableCell>
                                 
​
                               <TableCell align="right" style={{ width: "12vw" }}>
                                 <div className="no_of_slots_data"><Input value={this.state.NoOfslots} onChange={this.handleChange} name="NoOfslots" style={{ width: 60 }} /></div>
                                 <div>{this.state.slotsError}</div></TableCell>
                                 
​
                               <TableCell align="right" style={{ width: "13vw" }}><div>
                               <Select className="availability-clinic-toggledropdown" onChange={this.handledrop} defaultValue="" style={{ width: 110 }} >
                                 <Option className="availability-clinic-toggledropdown"   value="regular" id="2">Regular</Option>
                                 <Option className="availability-clinic-toggledropdown"  value="vip" id="1">Vip</Option>
                               </Select> </div>
                               <div>{this.state.vipError}</div></TableCell>
                             </TableRow>
 
 
 
 
                             <TableRow
                               hover
                               role="checkbox"
                             >
                               <TableCell align="right" colSpan={8}>
                               
                                 <FormGroup row className="Availability-checkbox-row-div">
       <FormControlLabel style={{ width:80}}
         control={
           <Checkbox  name="checkedA" value="checkedA" onChange={this.Changecheckedbox('checkedA')} checked={this.state.checkedA} />
         }
         label="All"
       />
             <FormControlLabel style={{ width:80}}
         control={
           <Checkbox  name="checkedA" value="checkedB"  onChange={this.Changecheckedbox('checkedB',7)} checked={this.state.checkedB} />
         }
         label="SUN"
       />
             <FormControlLabel style={{ width:80}}
         control={
           <Checkbox  name="checkedA" value="checkedC" onChange={this.Changecheckedbox('checkedC',1)} checked={this.state.checkedC} />
         }
         label="MON"
       />
             <FormControlLabel style={{ width:80}}
         control={
           <Checkbox  name="checkedA" value="checkedD"  onChange={this.Changecheckedbox('checkedD',2)} checked={this.state.checkedD} />
         }
         label="TUE"
       />
             <FormControlLabel style={{ width:80}}
         control={
           <Checkbox  name="checkedA"  value="checkedE" onChange={this.Changecheckedbox('checkedE',3)} checked={this.state.checkedE} />
         }
         label="WED"
       />
       <FormControlLabel style={{ width:80}}
         control={
           <Checkbox  name="checkedA" value="checkedF"  onChange={this.Changecheckedbox('checkedF',4)} checked={this.state.checkedF}/>
         }
         label="THU"
       />
       <FormControlLabel style={{ width:80}}
         control={
           <Checkbox  name="checkedA" value="checkedG"  onChange={this.Changecheckedbox('checkedG',5)} checked={this.state.checkedG} />
         }
         label="FRI"
       />
       <FormControlLabel style={{ width:80}}
         control={
           <Checkbox  name="checkedA" value="checkedH" onChange={this.Changecheckedbox('checkedH',6)} checked={this.state.checkedH} />
         }
         label="SAT"
       />
       
       
       </FormGroup>
       <div className="delete_container">
         <Button className="save_btn" onClick={() => this.sendDetails()} >Save</Button>
         <EditIcon className="edit_icon"/>
         <DeleteIcon className="delete_icon"/>
         </div>
       </TableCell> 
           </TableRow> 
        </div>
     
        <div className="delete_container">
         <EditIcon className="edit_icon"/>
         <DeleteIcon className="delete_icon"/>
         </div>
           
        
        </div>
                
            </div>
        )
    }
}
​
export default ScheduleComp