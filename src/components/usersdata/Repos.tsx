import React from "react";
import Repoitem from "./Repoitem";
import { useGlobalContext } from "../../context/github/githubContext";

const Repos = () => {
    const { user_repo_url, readme, createdRepos, repos_id } =
        useGlobalContext();

    return (
        <div>
            {createdRepos.map((repo: string, index: number) => {
                return (
                    <Repoitem
                        repo={repo}
                        repo_url={user_repo_url[index]}
                        key={repos_id[index]}
                        top5readme={readme[index]}
                    />
                );
            })}
        </div>
    );
};
export default Repos;
