import React from "react";

import "../../common/styles/table-person.css"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bar, Chart } from "react-chartjs-2";
import "./char.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



class MeasurementCharts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            startDate: new Date(),
            id_device: this.props.id,
            labels: [],
            data: []
            
        }
        this.handleDateChanged = this.handleDateChanged.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleLabels = this.handleLabels.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({tableData: nextProps.tableData, id_device:nextProps.id});
        console.log(this.state.id_device)
        console.log("props changed")
        console.log(this.state.startDate)
        let d = new Date(this.state.startDate)
        let m = d.getMonth()+1
        
        let user = {id:nextProps.id, month: m, day: d.getDate(), year: d.getFullYear()}

        const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          }
          fetch("http://localhost:8080/user", requestOptions).then(
                  (response) => {
                    
                    if (response.ok) {
                        return response.json();
                       }})
                        .then(response => {
                           console.log(response)
                           this.handleLabels(response);
                           
                        })
                       .catch(function (err) {
   
                        console.log(err);
                   });  

    }

    handleIdChange(id){
        this.setState({id_device:id});
        
    }

    handleLabels(json){
        console.log(json)
        let x = json.map((element) => (new Date(element.timestampMeasurement)).getUTCHours())
        let y = json.map((element) => (element.energyConsumption))
        this.setState({labels:x, data:y})
        console.log(x)

    }

    handleDateChanged(date) {
        this.setState({
            startDate: date
        });
        let d = new Date(date)
        let m = d.getMonth()+1
        
        let user = {id:this.state.id_device, month: m, day: d.getDate(), year: d.getFullYear()}

        const requestOptions = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
          }
          fetch("http://localhost:8080/user", requestOptions).then(
                  (response) => {
                    
                    if (response.ok) {
                        return response.json();
                       }})
                        .then(response => {
                           console.log(response)
                           this.handleLabels(response);
                           
                        })
                       .catch(function (err) {
   
                        console.log(err);
                   });  
        // let d = new Date(date)
        // let d1 = new Date("2022-11-06T16:48:29.000+00:00")
        // console.log(d1.getDate())
        // console.log(d1.getMonth())
        // console.log(d1.getFullYear())
        // console.log(d1.getUTCHours())
        
    }
    
    
    render() {
        
        return (
            <div className = "classChart">
                {/* <DatePicker selected={this.startDate} onChange={(date) => this.handleDateChanged(date)} /> */}
                <DatePicker
                    selected={ this.state.startDate }
                    onChange={ this.handleDateChanged }
                    name="startDate"
                    dateFormat="yyyy/MM/dd"
                />
                <Bar
                        data={{
                            // Name of the variables on x-axies for each bar
                            // labels: ["1st bar", "2nd bar", "3rd bar", "4th bar"],
                            labels: this.state.labels,
                            datasets: [
                            {
                                // Label for bars
                                label: "total count/value",
                                // Data or value of your each variable
                                data: this.state.data,
                                // Color of each bar
                                backgroundColor: ["rgb(255, 161, 60)", "rgb(12, 59, 46)"],
                                // Border color of each bar
                                borderColor: ["rgb(255, 161, 60)", "rgb(12, 59, 46)"],
                                
                            },
                            ],
                        }}
                        // Height of graph
                        height={5}
                        options={{
                            maintainAspectRatio: false,
                            // scales: {
                            // yAxes: [
                            //     {
                            //         ticks: {
                            //             // The y-axis value will start from zero
                            //             beginAtZero: true,
                            //         },
                            //     },
                            // ],
                            // },
                            legend: {
                                labels: {
                                    fontSize: 15,
                                },
                            },
                    }}
                />
                 {/* <Chart chartData={this.chartData} /> */}
            </div>
        )
    }
}

export default MeasurementCharts;