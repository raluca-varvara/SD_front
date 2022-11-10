import React from 'react';
//import validate from "./validators/person-validators";
// import Button from "react-bootstrap/Button";
// import * as API_USERS from "../api/person-api";
// import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row, Button} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import "./person-form.css"
const textStyle = {color: 'white', fontFamily:"Serif"};

const headerStyle = {color: 'rgb(12, 59, 46)', fontFamily:"Serif", fontWeight:"bold", padding:"10px 10px"};



class DeviceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {description: '', address:'', maximumC:''};
    
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeMaximumC = this.handleChangeMaximumC.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChangeDescription(event) {
        console.log(event.target.value)
        this.setState({description: event.target.value});
      }
      handleChangeAddress(event) {
        this.setState({address: event.target.value});
      }
      handleChangeMaximumC(event) {
        console.log(event.target.value)
        this.setState({maximumC: event.target.value});
      }

      
    
      async handleSubmit(event) {
        
        event.preventDefault();
        let user = {'description': this.state.description, 'address': this.state.address, 'maxHourlyEnergyC': this.state.maximumC}
        event.preventDefault();
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
        await fetch("http://localhost:8080/admindevice",requestOptions).then(
              function(response) {
                
                  if (response.ok) {
                     response.json().then(json => {
                      console.log(json)
                      window.location.reload(false)
                     });
                  }
              
              })
          .catch(function (err) {
              //catch any other unexpected error, and set custom code for error = 1
              //callback(null, 1, err)
              console.log(err);
          });
      }
    
      render() {
        return (
            <div>
                <form className='formStyle' onSubmit={this.handleSubmit}>
                    <h4 style = {headerStyle}>Add device:</h4>
                    
                        <label> Description: </label>
                        <input type="text" value={this.state.description} onChange={this.handleChangeDescription} />
                    
                        <label> Address: </label>
                        <input type="text" value={this.state.address} onChange={this.handleChangeAddress} />
                    
                        <label> Maximum consumption: </label>
                        <input type="number" value={this.state.maximumC} onChange={this.handleChangeMaximumC} />
                    
                    <button className='color-button' type="submit">Submit</button>
                </form>
            </div>
          
        );
      }
}

export default DeviceForm;
