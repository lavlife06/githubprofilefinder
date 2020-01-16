import React from 'react';

const RepoItem = ({ repo, top5readme, repo_url }) => {
  return (
    <div className='card'>
      <h3>
        <a href={repo_url}>{repo}</a>
        <p>{top5readme}</p>
      </h3>
    </div>
  );
};

export default RepoItem;