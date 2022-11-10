import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React, { useEffect, useState , useRef} from 'react'
import { useNavigate, Navigate , useNavigation} from "react-router-dom";

import './App.css';
import ErrorPage from './common/errors/error-page';
import NavigationBar from './navBar';
import UserContainer from './user/user-container'
import AdminContainer from './admin/admin-container'
import Home from './home/home-container'
import BackgroundImg from './common/images/background1.jpg';
import LogInContainer from './login/log-in';
import Protected from './protected';


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

function App() {

  const [role, setRole] = React.useState(null);
  const [user, setUser] = React.useState(null);

  async function logIn(user, callback) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }
    await fetch("http://localhost:8080/logIn",requestOptions).then(
          function(response) {
            
              if (response.ok) {
                 response.json().then(json => {
                  callback(json)
                 });
              }
          
          })
      .catch(function (err) {
          //catch any other unexpected error, and set custom code for error = 1
          //callback(null, 1, err)
          console.log(err);
      });
      
  }

  
  const setRoles = (user) => {
    console.log(user.role)
    
    if(user.role == 'CLIENT'){
      setRole("CLIENT")
    }
    else{
      setRole("ADMIN")
    }
    
  }

  //const navigation = useRef(useNavigation());
  useEffect(() =>{
    const data = window.localStorage.getItem('MY_APP_STATE');
    if ( data !== null ) setUser(JSON.parse(data));
  }, [])
  

  return (
    <div style = {backgroundStyle}>
      <Router>
      <div>
        <NavigationBar />
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user" element={<Protected role = 'CLIENT'><UserContainer /></Protected>}></Route>
            <Route path="/admin" element={<Protected role = 'ADMIN'><AdminContainer /></Protected>}></Route>
            <Route path="/login"  element={<LogInContainer logIn = {logIn} setRoles = {setRoles}/>}></Route>
            {/*Error*/}
            <Route path="/error" element={<ErrorPage />}></Route>
        </Routes>
          
        </div>
      </Router>
    </div>
  );
}

export default App;
