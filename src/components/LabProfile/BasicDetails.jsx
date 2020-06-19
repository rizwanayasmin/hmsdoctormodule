import React,{Component} from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
// import './PharmacyEntryMaster'
import Grid from '@material-ui/core/Grid';
import Labelbox from '../../helpers/labelbox/labelbox'
import Button from '@material-ui/core/Button';
import './BasicDetails.css'
export default class BasicDetails extends React.Component{
render()
{
    return(
        <div className="basic_details_container">
<Grid container>
<Grid item xs={12} md={6} className="basicdetails_container">
<div className="basicdetails_firstgrid">
<div className="basicdetails_child">
<Labelbox type="text" labelname="Qualification" value="MD"/>
<Labelbox type="select" labelname="Experience" value="5year"/>
<Labelbox type="text" labelname="Email Id" value="tec@tec.com.kw"/>
<Labelbox type="text" labelname="Address" value="Abdul Rahman"/>
</div>
</div>
</Grid>
<Grid item xs={12} md={6} className="basicdetails_container">
<div className="basicdetails_firstgrid">
<div className="basicdetails_child">
<Labelbox type="text" labelname="Speciality" value="Cardiologist"/>
 <Labelbox type="text" labelname="Mobile Number" value="+96522000001"/>
 <Labelbox type="text" labelname="Website"/>
 </div>
</div>
 </Grid>
</Grid>
</div>
    )
}
}
