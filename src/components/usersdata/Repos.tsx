import React, { useContext } from 'react';
import Repoitem from "./Repoitem";
import GithubContext from '../../context/github/githubContext';

const Repos = () => {
  const gitContext = useContext(GithubContext);
  const { user_repo_url, readme, createdRepos, repos_id} = gitContext;
  return (
    <div>
      {createdRepos.map((repo,index) => {
        return(
          <Repoitem repo={repo} repo_url={user_repo_url[index]} key={repos_id[index]} top5readme={readme[index]} />
        )})
      }
    </div>
  );
};
export default Repos;