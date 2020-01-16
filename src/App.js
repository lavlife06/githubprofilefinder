import React, { Fragment, Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/layout/Navbar";
import UsersArray from './components/usersdata/UsersArray';
import Search from './components/usersdata/Search';
import Userinfo from './components/usersdata/Userinfo'


class App extends Component{
  state={
    users: [],
    particularuser: {},
    createdRepos: [],
    readme: [],
    user_repo_url: []
  }

  getUser = async (username) => {
    const github_id = "d20b59a667ed4b931be6";
    const github_secret = "4a293f41b9f53bbbec836a53fe3d0c88f78d97c6"
    let response = await fetch(`https://api.github.com/users/${username}?client_id=${github_id}&client_secret=${github_secret}`);
    let particulardata = await response.json();
    this.setState({particularuser: particulardata})
  };
 
  getUserRepos = async (username) => {
    const github_id = "d20b59a667ed4b931be6";
    const github_secret = "4a293f41b9f53bbbec836a53fe3d0c88f78d97c6"
    let response = await fetch(`https://api.github.com/users/${username}/repos?client_id=${github_id}&client_secret=${github_secret}`);
    let userRepos = await response.json();
    let createdRepos = [];
    let readme = [];
    let user_repo_url = [];
    let top5 = 0;
    userRepos.forEach(element => {
      if(element.fork === false && top5 <=4 ){
      createdRepos.push(element.name);
      readme.push(element.description);
      user_repo_url.push(element.html_url)
      top5 +=1
    }
    });
    this.setState({createdRepos: createdRepos,readme: readme,user_repo_url: user_repo_url})
  };
  // https://api.github.com/users/lavlife06/repos
  // https://api.github.com/repos/lavlife06/mycalculator/contents/README.md?ref=master

  searchUsers = async (text) => {
    const github_id = "d20b59a667ed4b931be6";
    const github_secret = "4a293f41b9f53bbbec836a53fe3d0c88f78d97c6"
    let response = await fetch(`https://api.github.com/search/users?q=${text}&client_id=${github_id}&client_secret=${github_secret}`);
    let data = await response.json();
    let items = await data.items
    this.setState({users: items});
  }

  clearUsers = () => this.setState({users: []})

  render(){
    const {users, particularuser, createdRepos, readme, user_repo_url} =this.state;
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
                    searchUsers={this.searchUsers} 
                    clearUsers={this.clearUsers} 
                    showClear={users.length > 0 ? true: false} />
                  <UsersArray users={users} />
                </Fragment>)}>
              </Route>
              <Route exact path="/githubers/:login" render={props => (
                <Userinfo { ...props } getUser={this.getUser} particularuser={particularuser} getUserRepos={this.getUserRepos} createdRepos={createdRepos} readme={readme} user_repo_url={user_repo_url} />
              )} >
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
// rec - for class, racf for arrow function react