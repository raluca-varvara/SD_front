import React from 'react';

import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    Row,
    Container
} from 'reactstrap';

import PersonForm from "./components/person-form";
import DeviceForm from "./components/device-form";
import MappingForm from './components/mapping-form';
import PersonTable from './components/person-table';
import DeviceTable from './components/device-table';

import BackgroundImg from '../common/images/background1.jpg';
import "./admin-container.css"



const backgroundStyle = {
    width: "100%",
    height: "100%",
    margin:"0",
    backgroundImage: `url(${BackgroundImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center",
    backgroundAttachment: 'fixed',
    blurAmount:3,
    blurRadius:5,
    //position:fixed
};


const textStyle = {color: 'white', fontFamily:"Serif"};

const headerStyle = {color: 'white', fontFamily:"Serif", fontWeight:"bold", padding:"40px", paddingTop: "90px"};

class AdminContainer extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {
            selected: false,
            userTableData: [],
            deviceTableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null
        };
        this.updateUserJson = this.updateUserJson.bind(this);
        this.updateDeviceJson = this.updateDeviceJson.bind(this);
        this.updateUserTableData = this.updateUserTableData.bind(this);
    }

    updateUserJson(json){
        console.log(json)
        let list = json
        console.log(list)
        this.setState({userTableData: list});
        console.log();
    }
    updateDeviceJson(json){
        console.log(json)
        let list = json
        console.log(list)
        this.setState({deviceTableData: list});
        console.log();
    }

    async componentDidMount(){
           this.getTableData()  

    }
    // async componentDidUpdate(){
    //     this.getTableData()  
    // }

    async getTableData(){
        const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
        }  
        await fetch("http://localhost:8080/admin",requestOptions).then(
              (response) => {
                  if (response.ok) {
                     return response.json();
                    }})
                     .then(response => {
                        this.updateUserJson(response);
                     })
                    .catch(function (err) {

                     console.log(err);
                });
        const requestOptions1 = {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json"
                    }
                }  
        await fetch("http://localhost:8080/admindevice",requestOptions1).then(
                      (response) => {
                          if (response.ok) {
                             return response.json();
                            }})
                             .then(response => {
                                this.updateDeviceJson(response);
                             })
                            .catch(function (err) {
        
                             console.log(err);
                        });  
    }
    updateUserTableData(item){
        console.log(item)
        let list = this.userTableData //.concat(item)
        //this.updateUserJson(list)
    }
    
    
    render() {
        
        return (

            <div>
                    <h2 style ={headerStyle}>Administrator</h2>
                    <div>
                    <div className="half">
                        <div className='formsStyles'>
                            <PersonForm />
                            <DeviceForm/>
                        </div>
                        <div className='formsStyles'>
                            <MappingForm />
                        </div>
                    </div>
                    <div>
                        <h3 style ={headerStyle}>Users</h3>
                        <PersonTable tableData = {this.state.userTableData} />
                        <h3 style ={headerStyle}>Devices</h3>
                        <DeviceTable tableData = {this.state.deviceTableData}/>
                    </div>
                    </div>
                    

            </div>
        )
    };
}
export default AdminContainer;