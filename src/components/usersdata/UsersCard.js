import React  from 'react';
import { Link } from "react-router-dom";

const UsersCard = ({user:{login, avatar_url, html_url}}) => {
  return (
    <div className='card text-centre'>
      <img src={avatar_url} alt="" className='round-img' style=
      {{ width: "60px"}} />
      <h3>{login}</h3>
      <Link to={`/githubers/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
    </div>
  )
}

export default UsersCard
