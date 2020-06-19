import React, { Component } from "react";
import apiservice from '../apiservice';

addDoctotService=()=>{
        apiservice.addDoctotService('1').then((response)=>{
            console.log(response);
        })
    }
    export default class Dummy extends Component{
        render(){
            return(
                <div>
                    <button onclick={this.addDoctotService}>save</button>
                </div>
            )
        }
    }