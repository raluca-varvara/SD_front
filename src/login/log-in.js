import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";


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


import "../admin/components/person-form.css"

const textStyle = {color: 'white', fontFamily:"Serif"};

const headerStyle = {color: 'white', fontFamily:"Serif", fontWeight:"bold", padding:"40px", paddingTop: "90px"};
//extends React.Component
function LogInContainer(props)  {
    const [role, setRole] = useState(null);

    const navigation = useNavigate()

    
    useEffect(() => {
        if(role==="CLIENT"){
            console.log("CLIENT")
            navigation(`/user`)
        }
        else if(role==="admin"){
            console.log("admin")
            navigation(`/admin`)
        }
        else{
            console.log("else")
            navigation(`/login`)
        }

    },[role])



    function handleSubmit(event){
        console.log("event")
        event.preventDefault();
        props.logIn({"name":event.target[0].value, "password":event.target[1].value}, (user) => {
            props.setRoles(user);
            window.localStorage.setItem('MY_APP_STATE', JSON.stringify(user));
            window.localStorage.setItem('MY_ROLE', JSON.stringify(user));
            if(user.role==='CLIENT'){
                console.log("client")
                setRole("CLIENT")
                
            }else{
                setRole("admin")
                console.log("admin")
                
            }
        })
    }
    
    //render() {
        
        return (

            <div className="loginCont">
                <h2 style={headerStyle}>Please Log In</h2>
                <form className='formStyle' onSubmit={handleSubmit}>
                    <label>
                    <p>Username</p>
                    </label>
                    <input type="text" id="username1"/>
                    <label>
                    <p>Password</p>
                    </label>
                    <input type="password" id="password1"/>
                    <div>
                    <button className="color-button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    };
//}
export default LogInContainer;




