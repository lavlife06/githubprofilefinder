import React from "react";
import UsersCard from "./UsersCard";
import { useGlobalContext } from "../../context/github/githubContext";

const UsersArray = () => {
    const { users, darkMode } = useGlobalContext();

    return (
        <div className="usersArrayContainer">
            {users.map((user, index) => (
                <UsersCard key={index} user={user} mode={darkMode} />
            ))}
        </div>
    );
};

export default UsersArray;
