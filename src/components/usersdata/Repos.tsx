import React, { useContext } from "react";
import Repoitem from "./Repoitem";
import { useGlobalContext } from "../../context/github/githubContext";

interface GitContextProps {
    user_repo_url: string;
    readme: string;
    createdRepos: any;
    repos_id: string;
}

const Repos = () => {
    console.log(useGlobalContext());
    // const { user_repo_url, readme, createdRepos, repos_id } =
    //     useGlobalContext();

    return (
        <div>
            {/* {createdRepos.map((repo, index) => {
                return (
                    <Repoitem
                        repo={repo}
                        repo_url={user_repo_url[index]}
                        key={repos_id[index]}
                        top5readme={readme[index]}
                    />
                );
            })} */}
            hii
        </div>
    );
};
export default Repos;
