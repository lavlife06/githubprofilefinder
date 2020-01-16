import React from 'react'
import UsersCard from './UsersCard';

const UsersArray = ({users}) => {
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
