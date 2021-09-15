import React from "react";
import { Link } from "react-router-dom";
import "./usersdata.css";

interface AppProps {
    user: { login: string; avatar_url: string };
    mode: boolean;
}

const UsersCard = ({ user: { login, avatar_url }, mode }: AppProps) => {
    return (
        <div className={mode ? "dark-user-details" : "white-user-details"}>
            <div className="user-photo">
                <img src={avatar_url} alt={login} />
                <h3>{login}</h3>
            </div>
            <div className="other-details">
                <ul>
                    {true ? (
                        <li>
                            Followers: <span className="data">{5}</span>
                        </li>
                    ) : null}
                    {true ? (
                        <li>
                            Following: <span className="data">{4}</span>
                        </li>
                    ) : null}
                    {true ? (
                        <li>
                            Repositories: <span className="data">{4}</span>
                        </li>
                    ) : null}
                </ul>
            </div>
            <Link
                to={`/githubers/${login}`}
                className={`btn ${mode ? "btn-light" : "btn-dark"} btn-sm my-1`}
            >
                More
            </Link>
            <div></div>
        </div>
    );
};

export default UsersCard;
