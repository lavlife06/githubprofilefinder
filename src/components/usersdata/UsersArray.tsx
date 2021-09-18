import React from "react";
import UsersCard from "./UsersCard";
import { useGlobalContext } from "../../context/github/githubContext";

const UsersArray = () => {
    const { users, darkMode } = useGlobalContext();

    console.log(users);
    return (
        <div className="usersArrayContainer">
            {users.length
                ? users.map((user, index) => (
                      <UsersCard key={index} user={user} mode={darkMode} />
                  ))
                : null}
        </div>
    );
};

export default UsersArray;
