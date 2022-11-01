import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import React from 'react'

import './App.css';
import ErrorPage from './common/errors/error-page';
import NavigationBar from './navBar';
import UserContainer from './user/user-container'
import Home from './home/home-container'

function App() {
  return (
    <div>
      <Router>
      <div>
        <NavigationBar />
        <Routes>
            <Route
                exact
                path='/'
                render={() => <Home/>}
              />

              <Route
                exact
                path='/user'
                render={() => <UserContainer/>}
              />

              {/*Error*/}
              <Route
                exact
                path='/error'
                render={() => <ErrorPage/>}
              />
        </Routes>
          
        </div>
      </Router>
    </div>
  );
}

export default App;
