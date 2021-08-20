import React from "react";
import UsersCard from "./UsersCard";
import { useGlobalContext } from "../../context/github/githubContext";

const UsersArray = () => {
    const { users } = useGlobalContext();

    return (
        <div style={userStyle}>
            {users.map((user, index) => (
                <UsersCard key={index} user={user} />
            ))}
        </div>
    );
};

const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem",
};

export default UsersArray;
