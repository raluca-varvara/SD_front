import React from "react";

import "../../common/styles/table-person.css"


const showItem = (item, i) => {
        return (
            <tr key={"item-" + i}>
                <th scope = "row">{item.id}</th>
                <td><input type="text" value = {item.name}></input></td>
                <td><input type="text" value = {item.role}></input></td>
                <td><button type="button" class="button_style">Update</button></td>
                <td><button type="button" class="button_style">Delete</button></td>
            </tr>
        );
}


class PersonTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({tableData: nextProps.tableData});
    }

    handleNameChanged(i, event) {
        var items = this.state.tableData;
      
        items[i].name = event.target.value;
      
        this.setState({
          tableData: items
        });
    }
    handleRoleChanged(i, event) {
        var items = this.state.tableData;
      
        items[i].role = event.target.value;
      
        this.setState({
          tableData: items
        });
    }

    handleItemDelete(i) {
        var items = this.state.tableData;
      
        const requestOptions = {
            method: "DELETE",
          }
        fetch("http://localhost:8080/admin/" + items[i].id,requestOptions).then(
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
        let r = "CLIENT"
        if(items[i].role=="ADMIN"){
            r="ADMIN"
        }

        let user = {'id': items[i].id,'name': items[i].name, 'role': r}
        console.log(items[i].name)
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
        fetch("http://localhost:8080/admin", requestOptions).then(
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
            
            return (
                
                <tr key={"item-" + i}>
                    {/* <th scope = "row">{item.id}</th> */}
                    <th scope = "row">{i}</th>
                    <td><input type="text" value = {item.name} onChange={context.handleNameChanged.bind(context, i)}></input></td>
                    <td><input type="text" value = {item.role} onChange={context.handleRoleChanged.bind(context, i)}></input></td>
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
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.state.tableData.map(showItem)} */}
                        {this.renderRows()}
                    </tbody>
                    </table>
            </div>
        )
    }
}

export default PersonTable;