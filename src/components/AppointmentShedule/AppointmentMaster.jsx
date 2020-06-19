import React, { Component } from 'react'
import plus from '../../images/plus.png'
import Grid from '@material-ui/core/Grid'
import { Select } from 'antd';
import './AppointmentMaster.css'
import AppointmentDetails from './AppointmentDetails'
import Paper from '@material-ui/core/Paper';
const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class Availabilitymaster extends Component {
    constructor(props)
    {
        super(props)
        this.state={addrow:false}
    }
    
    AddRow=()=>{
        this.setState({addrow:true})
 }
 
    render() {
        return (
         <div className="uploadmaster">   
         <Paper>
        <div className="uploadsmasterheader">
        <Grid container>
        <Grid items xs={6} md={6}>
        <div className="titleuser">APPOINTMENT SETTING SCHEDULE
        </div>
        <div className="Availability-clinic-dropdown">
            <label className="availability-clinic-label">Clinic </label>
           <Select className="availability-clinic-toggledropdown" defaultValue="Excel Polyclinic" style={{ width: 200 }} onChange={handleChange}>
      <Option className="availability-clinic-toggledropdown" value="excel polyclinic">Excel Polyclinic</Option>
      <Option className="availability-clinic-toggledropdown" value="option 1">Option 1</Option>
      <Option className="availability-clinic-toggledropdown" value="option 2">Option 2</Option>
   </Select> </div>
         </Grid>
        <Grid items xs={6} md={6} className="plus-container">
        <div><img className="plus-icon"  src={plus} onClick={() => this.AddRow()}/></div>
        </Grid>
        </Grid>
         </div>
         <AppointmentDetails addrow={this.state.addrow} />
        </Paper>
         </div>
        )
    }
}
