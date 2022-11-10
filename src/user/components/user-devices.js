import React from "react";

import "../../common/styles/table-person.css"



class DeviceUserTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({tableData: nextProps.tableData});
        console.log()
    }
    handleIdChange(i) {
        console.log("mama ta azi si maine ")
        var items = this.state.tableData;
        console.log(items[i].id)
        this.props.updateId(items[i].id)
    }

    
    renderRows(){
        var context = this;

        return  this.state.tableData.map(function(item, i) {

            return (
                
                <tr key={"item-" + i}>
                    {/* <th scope = "row">{item.id}</th> */}
                    <th scope = "row">{i}</th>
                    <td>{item.description}</td>
                    <td>{item.address}</td>
                    <td>{item.maxHourlyEnergyC}</td>
                    <td><button type="button" className="button_style" onClick={context.handleIdChange.bind(context, i)} >Set device</button></td>
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
                            <th scope="col">Max Hourly consumption</th>
                            <th scope="col">Set Device</th>
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

export default DeviceUserTable;