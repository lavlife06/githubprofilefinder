import React, { Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/layout/Navbar";
import UsersArray from './components/usersdata/UsersArray';
import Search from './components/usersdata/Search';
import Userinfo from './components/usersdata/Userinfo'


const App = () => {

  const [users, setUsers] = useState([]);
  const [particularuser, setParticularuser] = useState({});
  const [createdRepos, setCreatedRepos] = useState([]);
  const [readme, setReadme] = useState([]);
  const [user_repo_url, setUser_repo_url] = useState([]);

  const github_id = "d20b59a667ed4b931be6";
  const github_secret = "4a293f41b9f53bbbec836a53fe3d0c88f78d97c6"

  const getUser = async (username) => {
    let response = await fetch(`https://api.github.com/users/${username}?client_id=${github_id}&client_secret=${github_secret}`);
    let particulardata = await response.json();
    setParticularuser(particulardata)
  };
 
  const getUserRepos = async (username) => {
    let response = await fetch(`https://api.github.com/users/${username}/repos?client_id=${github_id}&client_secret=${github_secret}`);
    let userRepos = await response.json();
    let top5 = 0;
    userRepos.forEach(element => {
      if(element.fork === false && top5 <=4 ){
      createdRepos.push(element.name);
      readme.push(element.description);
      user_repo_url.push(element.html_url)
      top5 +=1
    }
    });
    setCreatedRepos(createdRepos);
    setReadme(readme);
    setUser_repo_url(user_repo_url);
  };
  // https://api.github.com/users/lavlife06/repos
  // https://api.github.com/repos/lavlife06/mycalculator/contents/README.md?ref=master

  const searchUsers = async (text) => {
    let response = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${github_id}&client_secret=${github_secret}`);
    let data = await response.json();
    let items = await data.items
    setUsers(items);
  }

  const clearUsers = () => setUsers([])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
              <Fragment>
                <Search 
                  searchUsers={searchUsers} 
                  clearUsers={clearUsers} 
                  showClear={users.length > 0 ? true: false} />
                <UsersArray users={users} />
              </Fragment>)}>
            </Route>
            <Route exact path="/githubers/:login" render={props => (
              <Userinfo { ...props } getUser={getUser} particularuser={particularuser} getUserRepos={getUserRepos} createdRepos={createdRepos} readme={readme} user_repo_url={user_repo_url} />
            )} >
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
// rec - for class, racf for arrow function react