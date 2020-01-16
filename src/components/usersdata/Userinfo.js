import React, { Component,Fragment } from 'react'
import { Link } from 'react-router-dom';
import Repos from './Repos';

class Userinfo extends Component {

  componentDidMount(){
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  render() {
    const {name,avatar_url,bio,login,html_url,followers,following,public_repos,blog,public_gists,location,company} = this.props.particularuser;
    const { readme, createdRepos ,user_repo_url} = this.props;
     console.log(readme,createdRepos,user_repo_url)
    return (
      <Fragment>
        <Link to="/" className="btn btn-dark" >
          Back to Search
        </Link>
        <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>

            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>

            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong> 
                  <a href={blog} target="_blank" rel="noopener noreferrer" >{blog}</a>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-dark'>Public Repos: {public_repos}</div>
        <div className='badge badge-light'>Public Gists: {public_gists}</div>
      </div>
      <Repos repos={createdRepos} readmes={readme} repo_url={user_repo_url} />
    </Fragment>
    )
  }
}

export default Userinfo

