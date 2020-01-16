import React from 'react';
import Repoitem from "./Repoitem";

const Repos = ({ repos, readmes, repo_url }) => {
  return (
    <div>
      {repos.map((repo,index) => {
        return(
          <Repoitem repo={repo} repo_url={repo_url[index]} key={repo.id} top5readme={readmes[index]} />
        )})
      }
    </div>
  );
};
export default Repos;