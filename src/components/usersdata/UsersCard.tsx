import React from "react";
import { Link } from "react-router-dom";
import "./usersdata.css";

interface AppProps {
    user: {
        login: string;
        avatar_url: string;
        followers: number;
        following: number;
        public_repos: number;
    };
    mode: boolean;
}

const UsersCard = ({
    user: { login, avatar_url, followers, following, public_repos },
    mode,
}: AppProps) => {
    return (
        <div className={mode ? "dark-user-details" : "white-user-details"}>
            <div className="user-photo">
                <img src={avatar_url} alt={login} />
                <h3>{login}</h3>
            </div>
            <div className="other-details">
                <ul>
                    <li>
                        Followers: <span className="data">{followers}</span>
                    </li>
                    <li>
                        Following: <span className="data">{following}</span>
                    </li>
                    <li>
                        Public_repos:{" "}
                        <span className="data">{public_repos}</span>
                    </li>
                </ul>
            </div>
            <Link
                to={{
                    pathname: `/githubers/${login}`,
                    state: {
                        public_repos,
                    },
                }}
                className={`btn ${mode ? "btn-light" : "btn-dark"} btn-sm my-1`}
            >
                More
            </Link>
            <div></div>
        </div>
    );
};

export default UsersCard;
