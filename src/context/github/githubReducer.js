import {
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USERS_REPOS,
  GET_USERS
} from '../types';

const GithubReducer = (state, action) => {
  switch(action.type){
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: []
      };
    case GET_USERS:
      return {
        ...state,
        particularuser: action.payload
      };
    case GET_USERS_REPOS:
      return{
        ...state,
        createdRepos: action.payload.createdRepos,
        readme: action.payload.readme,
        user_repo_url: action.payload.user_repo_url,
        repos_id: action.payload.repos_id
      }
    default:
      return state;
  }
}

export default GithubReducer;
    // setCreatedRepos(createdRepos);
    // setReadme(readme);
    // setUser_repo_url(user_repo_url);