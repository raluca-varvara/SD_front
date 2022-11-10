import React from 'react';
import {Col, Row, Button} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import "./person-form.css"
const textStyle = {color: 'white', fontFamily:"Serif"};

const headerStyle = {color: 'rgb(12, 59, 46)', fontFamily:"Serif", fontWeight:"bold", padding:"10px 10px"};

class MappingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', deviceDescription: ''};
    
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangeDevice = this.handleChangeDevice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChangeUsername(event) {
        this.setState({username: event.target.value});
      }
    
      handleChangeDevice(event) {
        this.setState({deviceDescription: event.target.value});
      }

      async handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        let mapping = {'userName': this.state.username, 'deviceDescription': this.state.deviceDescription}
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(mapping)
        }
        await fetch("http://localhost:8080/admindevice/usermappingput",requestOptions).then(
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
                    <h4 style = {headerStyle}>Add mapping:</h4>
                    
                        <label> User's Name: </label>
                        <input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
                        <label> Device's Description: </label>
                        <input type="text" value={this.state.deviceDescription} onChange={this.handleChangeDevice} />
                    
                    <button className='color-button' type="submit">Submit</button>
                </form>
            </div>
          
        );
      }
}

export default MappingForm;
