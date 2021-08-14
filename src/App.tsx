import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/layout/Navbar";
import UsersArray from './components/usersdata/UsersArray';
import Search from './components/usersdata/Search';
import Userinfo from './components/usersdata/Userinfo'
import GithubState from './context/github/GithubState';
import Notfound from './components/usersdata/Notfound';

const App = () => {
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route 
                exact path='/' 
                render={() => (
                <Fragment>
                  <Search />
                  <UsersArray />
                </Fragment>)}>
              </Route>
              <Route exact path="/githubers/:login" component={Userinfo} />
              <Route component={Notfound} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
// rec - for class, racfe for arrow function react