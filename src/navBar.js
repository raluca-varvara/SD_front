import React from 'react'
import logo from './common/images/icon.png';
import "./navBar.css"
import { useNavigate } from "react-router-dom";

import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown,
    Button,
    Form
} from 'reactstrap';

const textStyle = {
    color: 'white',
    textDecoration: 'none',
    fontFamily: 'Serif'
};



function NavigationBar(){
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/login`; 
        navigate(path);
    }
    const logout = () =>{ 
        window.localStorage.setItem('MY_APP_STATE', null);
        window.localStorage.setItem('MY_ROLE', null);
        let path = `/`; 
        navigate(path);
    }
    return(
        <div className='color-nav'>
        <Navbar  className='color-nav' variant="light" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"50"} />
            </NavbarBrand>
            <Nav className="ms-auto" navbar>

                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle style={textStyle} nav caret>
                       Menu
                    </DropdownToggle>
                    <DropdownMenu end >

                        <DropdownItem>
                            <NavLink href="/user">User</NavLink>
                            <NavLink href="/admin">Admin</NavLink>
                        </DropdownItem>


                    </DropdownMenu>
                </UncontrolledDropdown>

                <Form pullRight> 
                    <Button bsStyle="primary" className = "color-button" onClick={routeChange}>Login</Button>
                    <Button bsStyle="primary" className = "color-button" onClick={logout}>Logout</Button>
                </Form>
            </Nav>
        </Navbar>
    </div>
    )
    
};

export default NavigationBar
