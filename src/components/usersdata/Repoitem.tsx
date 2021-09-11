import React from "react";
import { useGlobalContext } from "../../context/github/githubContext";
import "./usersdata.css";

interface AppProps {
    repo: string;
    top5readme: string;
    repo_url: string;
}

const RepoItem = ({ repo, top5readme, repo_url }: AppProps) => {
    const { darkMode } = useGlobalContext();

    return (
        <div className="reposContainer" style={{ borderStyle: "none" }}>
            {/* <h3>
                <a href={repo_url} rel="noopener noreferrer" target="_blank">
                    {repo}
                </a>
                <p>{top5readme}</p>
            </h3> */}
            <div
                className={
                    darkMode ? "dark-repo-details" : "white-repo-details"
                }
            >
                <h3 style={{ textDecoration: "underline" }}>
                    <a
                        href={repo_url}
                        rel="noopener noreferrer"
                        target="_blank"
                        style={{ color: "black" }}
                    >
                        {repo}
                    </a>
                </h3>
                <div className="fork-star">
                    <p>Forks: {2}</p>
                    <p id="star">Stars: {3}</p>
                </div>
                <p id="description">
                    <em>{top5readme ? top5readme : "No Description"}</em>
                </p>
            </div>
        </div>
    );
};

export default RepoItem;
