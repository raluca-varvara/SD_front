import React from "react";

import "../../common/styles/table-person.css"


const showItem = (item) => {
        let owner = "none"
        console.log(item.owner)
        
        return (
            <tr>
                <th scope = "row">{item.id}</th>
                <td><input type="text" value = {item.description}></input></td>
                <td><input type="text" value = {item.address}></input></td>
                <td><input type="text" value = {item.maxHourlyEnergyC}></input></td>
                <td>{owner}</td>
                <td><button type="button" class="button_style">Update</button></td>
                <td><button type="button" class="button_style">Delete</button></td>
            </tr>
        );
}


class DeviceTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({tableData: nextProps.tableData});
    }

    handleDescriptionChanged(i, event) {
        var items = this.state.tableData;
      
        items[i].description = event.target.value;
      
        this.setState({
          tableData: items
        });
    }
    handleAddressChanged(i, event) {
        var items = this.state.tableData;
      
        items[i].address = event.target.value;
      
        this.setState({
          tableData: items
        });
    }
    handleEnergyChanged(i, event) {
        var items = this.state.tableData;
      
        items[i].maxHourlyEnergyC = event.target.value;
      
        this.setState({
          tableData: items
        });
    }

    handleItemDelete(i) {
        var items = this.state.tableData;
      
        const requestOptions = {
            method: "DELETE",
          }
        fetch("http://localhost:8080/admindevice/" + items[i].id,requestOptions).then(
                function(response) {
                  
                    if (response.ok) {
                       response.json().then(json => {
                        console.log(json)
                       });
                    }   
                })
            .catch(function (err) {

                console.log(err);
            });

            items.splice(i, 1);
      
            this.setState({
            tableData: items
            });
    }

    handleUpdateButton(i) {
        var items = this.state.tableData;


        let user = {'id': items[i].id,'description': items[i].description, 'address': items[i].address, 'owner':items[i].owner, "energyMeasurements":items[i].energyMeasurements, "maxHourlyEnergyC":items[i].maxHourlyEnergyC}
        console.log(items[i].name)
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
        fetch("http://localhost:8080/admindevice", requestOptions).then(
                function(response) {
                  
                    if (response.ok) {
                       response.json().then(json => {
                        console.log(json)
                       });
                    }   
                })
            .catch(function (err) {

                console.log(err);
            });

            items[i] = user;
      
            this.setState({
            tableData: items
            });
    }



    renderRows(){
        var context = this;

        return  this.state.tableData.map(function(item, i) {
            let owner = "none"
            if(item.owner !== null){
                owner = item.owner.name
                //console.log(item.owner)
            }
            return (
                
                <tr key={"item-" + i}>
                    {/* <th scope = "row">{item.id}</th> */}
                    <th scope = "row">{i}</th>
                    <td><input type="text" value = {item.description} onChange={context.handleDescriptionChanged.bind(context, i)}></input></td>
                    <td><input type="text" value = {item.address} onChange={context.handleAddressChanged.bind(context, i)}></input></td>
                    <td><input type="text" value = {item.maxHourlyEnergyC} onChange={context.handleEnergyChanged.bind(context, i)}></input></td>
                    <td>{owner}</td>
                    <td><button type="button" class="button_style" onClick={context.handleUpdateButton.bind(context, i)}>Update</button></td>
                    <td><button type="button" class="button_style" onClick={context.handleItemDelete.bind(context, i)}>Delete</button></td>
                </tr>
            );
        })
    }
    
    render() {
        console.log(this.state.tableData)
        return (
            <div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Description</th>
                            <th scope="col">Address</th>
                            <th scope="col">Hourly consumption</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default DeviceTable;