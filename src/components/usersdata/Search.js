import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

const Search = () =>  {

  const gitContext = useContext(GithubContext);

  const [text, settext] = useState('')

  const changeHandler = (e) => settext( e.target.value );
  // or  changeHandler = (e) => this.setState({ [text: e.target.value });
 
  // submitHandler(e){
  //   e.preventDefault()
  //   console.log(this.state.text)
  // }
 
  const submitHandler = (e) => {
    e.preventDefault();  
    gitContext.searchUsers(text);
    settext('')
  }

  return (
    <div>
      <form className="x" onSubmit={submitHandler} >
      {/* <form className="x" onSubmit={this.submitHandler.bind(this)} >  */}
        <input type="text" name="text" placeholder="Search Users..." value={text} onChange={changeHandler}  />
        <input type="submit" value="Search" className="btn btn-dark btn-block" />
      </form>
      {gitContext.users.length > 0 && <button className="btn btn-dark btn-block" onClick={gitContext.clearUsers} >Clear</button>}
    </div>
  )
};

export default Search; 
