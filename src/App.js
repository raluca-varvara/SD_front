import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React from 'react'

import './App.css';
import ErrorPage from './common/errors/error-page';
import NavigationBar from './navBar';
import UserContainer from './user/user-container'
import AdminContainer from './admin/admin-container'
import Home from './home/home-container'

function App() {
  return (
    <div>
      <Router>
      <div>
        <NavigationBar />
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user" element={<UserContainer />}></Route>
            <Route path="/admin" element={<AdminContainer />}></Route>
            {/*Error*/}
            <Route path="/error" element={<ErrorPage />}></Route>
        </Routes>
          
        </div>
      </Router>
    </div>
  );
}

export default App;
