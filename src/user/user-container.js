import React from 'react';

import BackgroundImg from '../common/images/background1.jpg';
import DeviceUserTable from './components/user-devices';
import MeasurementCharts from './components/measurements-charts';

import {Button, Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${BackgroundImg})`,
    blurAmount:3,
    blurRadius:5,
};

const textStyle = {color: 'white', fontFamily:"Serif"};

const headerStyle = {color: 'white', fontFamily:"Serif", fontWeight:"bold", padding:"40px", paddingTop: "90px"};

class UserContainer extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {
            user: null,
            deviceTableData: [],
            measurementsTableData: [],
            id:null,

        };

    }

    updateDeviceJson(json){
        console.log(json)
        let list = json
        console.log(list)
        this.setState({deviceTableData: list});

    }
    updateId(id){
        this.setState({id:id})
        console.log(id)
    }

    componentDidMount(){
        const data = window.localStorage.getItem('MY_APP_STATE');
        if ( data !== null ) this.user = JSON.parse(data);
        console.log(this.user)
        this.getTableData()

    }

    async getTableData(){
        var userCurent = this.user;
        const requestOptions1 = {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json"
                    }
                }  
        await fetch("http://localhost:8080/user/"+userCurent.id,requestOptions1).then(
                      (response) => {
                          if (response.ok) {
                             return response.json();
                            }})
                             .then(response => {
                                console.log(response)
                                this.updateDeviceJson(response);
                                this.updateId(response[0].id)
                             })
                            .catch(function (err) {
        
                             console.log(err);
                        });  
    }
    handleDeviceId = (id) => {
        this.setState({id: id});
        this.updateId(id)
        console.log(this.state.id)
    }

    render() {

        return (

            <div style = {backgroundStyle}>
                   <h2 style={headerStyle}>CLIENT</h2>
                   <DeviceUserTable tableData = {this.state.deviceTableData} updateId={this.handleDeviceId} id={this.id}/>
                   <MeasurementCharts id = {this.state.id}/>

            </div>
        )
    };
}


export default UserContainer;