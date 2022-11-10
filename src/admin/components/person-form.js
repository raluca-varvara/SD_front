import React from 'react';
import {Col, Row, Button} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import "./person-form.css"
const textStyle = {color: 'white', fontFamily:"Serif"};

const headerStyle = {color: 'rgb(12, 59, 46)', fontFamily:"Serif", fontWeight:"bold", padding:"10px 10px"};



class PersonForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', password: '',role:''};
        
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeRole = this.handleChangeRole.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.props.updateTables = this.props.updateTables.bind(this)
      }
    
      handleChangeName(event) {
        console.log(event.target.value)
        this.setState({name: event.target.value});
      }
      handleChangePassword(event) {
        this.setState({password: event.target.value});
      }
      handleChangeRole(event) {
        console.log(event.target.value)
        this.setState({role: event.target.value});
      }
      
    
      async handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.name);
        console.log(this.state.name)
        let roleUser = 0
        if(this.state.role=='Admin' || this.state.role == "ADMIN" || this.state.role=='admin'){
          roleUser = 1
        }else{
          roleUser=0
        }
        let user = {'name': this.state.name, 'password': this.state.password, 'role': roleUser}
        event.preventDefault();
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
        await fetch("http://localhost:8080/admin",requestOptions).then(
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
                    <h4 style = {headerStyle}>Add user:</h4>
                    
                        <label> Name: </label>
                        <input name='username' type="text" id="username" value={this.state.name} onChange={this.handleChangeName} />
                        <label> Password: </label>
                        <input name='password' type="text" id="userpassword" value={this.state.password} onChange={this.handleChangePassword} />
                        <label> Role: </label>
                        <input name='role' type="text" id="userrole" value={this.state.role} onChange={this.handleChangeRole} />
                      
                    <button className='color-button' type="submit">Submit</button>
                </form>
            </div>
          
        );
      }
}

export default PersonForm;
