import { ActionKind } from "../types";

import { InitialState, Action } from "../../interfaces/contextInterfaces";

const GithubReducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case ActionKind.SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                particularuser: {},
                createdRepos: [],
                readme: [],
                user_repo_url: [],
                repos_id: [],
            };
        case ActionKind.CLEAR_USERS:
            return {
                users: [],
                particularuser: {},
                createdRepos: [],
                readme: [],
                user_repo_url: [],
                repos_id: [],
            };
        case ActionKind.GET_USERS:
            return {
                ...state,
                particularuser: action.payload,
            };
        case ActionKind.GET_USERS_REPOS:
            return {
                ...state,
                createdRepos: action.payload.createdRepos,
                readme: action.payload.readme,
                user_repo_url: action.payload.user_repo_url,
                repos_id: action.payload.repos_id,
            };
        default:
            return state;
    }
};

export default GithubReducer;
