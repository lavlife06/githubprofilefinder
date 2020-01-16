import React, { useState } from 'react'

const Search = ({ searchUsers, showClear, clearUsers }) =>  {

  const [text, settext] = useState('')

  const changeHandler = (e) => settext( e.target.value );
  // or  changeHandler = (e) => this.setState({ [text: e.target.value });
 
  // submitHandler(e){
  //   e.preventDefault()
  //   console.log(this.state.text)
  // }
 
  const submitHandler = (e) => {
    e.preventDefault();  
    searchUsers(text);
    settext('')
  }

  return (
    <div>
      <form className="x" onSubmit={submitHandler} >
      {/* <form className="x" onSubmit={this.submitHandler.bind(this)} >  */}
        <input type="text" name="text" placeholder="Search Users..." value={text} onChange={changeHandler}  />
        <input type="submit" value="Search" className="btn btn-dark btn-block" />
      </form>
      {showClear && <button className="btn btn-dark btn-block" onClick={clearUsers} >Clear</button>}
    </div>
  )
};

export default Search; 
