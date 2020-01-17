import React, { Component } from 'react'

class Search extends Component {
  state = {
    text: ''
  };

  changeHandler = (e) => this.setState({ [e.target.name]: e.target.value });
  // or  changeHandler = (e) => this.setState({ [text: e.target.value });
 
  // submitHandler(e){
  //   e.preventDefault()
  //   console.log(this.state.text)
  // }
 
  submitHandler = (e) => {
    e.preventDefault();  
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" })
  }

  render(){
    const {showClear,clearUsers} = this.props;
    return (
      <div>
        <form className="x" onSubmit={this.submitHandler} >
        {/* <form className="x" onSubmit={this.submitHandler.bind(this)} >  */}
          <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.changeHandler}  />
          <input type="submit" value="Search" className="btn btn-dark btn-block" />
        </form>
        {showClear && <button className="btn btn-dark btn-block" onClick={clearUsers} >Clear</button>}
      </div>
    )
  }
};

export default Search; 
