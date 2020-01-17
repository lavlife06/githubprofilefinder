import React, { useContext } from 'react'
import UsersCard from './UsersCard';
import GithubContext from '../../context/github/githubContext';

const UsersArray = () => {

  const gitContext = useContext(GithubContext);
  const { users } = gitContext;

  return (
    <div style={userStyle}>
      {users.map((user) => (
        <UsersCard key={user.id} user={user} />
      ))}
    </div>
  )
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
}

export default UsersArray;
