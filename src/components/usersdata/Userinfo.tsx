import React, { useEffect, Fragment } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Repos from "./Repos";
import { useGlobalContext } from "../../context/github/githubContext";

type TParams = { login: string };

const Userinfo = ({ match }: RouteComponentProps<TParams>) => {
    const { particularuser, moreDetails, getUser, getUserRepos } =
        useGlobalContext();
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []);

    const {
        name,
        avatar_url,
        bio,
        login,
        html_url,
        followers,
        following,
        public_repos,
        blog,
        public_gists,
        location,
        company,
    } = particularuser;

    console.log(moreDetails);

    return (
        <Fragment>
            <Link to="/" className="btn btn-dark">
                Back to Search
            </Link>
            <div className="card grid-2">
                <div className="all-center">
                    <img
                        src={avatar_url}
                        className="round-img"
                        alt=""
                        style={{ width: "150px" }}
                    />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark my-1"
                    >
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>
                            )}
                        </li>

                        <li>
                            {company && (
                                <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>
                            )}
                        </li>

                        <li>
                            {blog && (
                                <Fragment>
                                    <strong>Website: </strong>
                                    <a
                                        href={blog}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {blog}
                                    </a>
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">
                    Followers: {followers}
                </div>
                <div className="badge badge-success">
                    Following: {following}
                </div>
                <div className="badge badge-dark">
                    Public Repos: {public_repos}
                </div>
                <div className="badge badge-light">
                    Public Gists: {public_gists}
                </div>
            </div>
            <Repos />
        </Fragment>
    );
};

export default Userinfo;
