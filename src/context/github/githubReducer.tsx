import { ActionKind } from "../types";

import { InitialState, Action } from "../../interfaces/contextInterfaces";

const GithubReducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
        case ActionKind.SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                particularuser: {},
                moreDetails: {},
                createdRepos: [],
                readme: [],
                user_repo_url: [],
                repos_id: [],
            };
        case ActionKind.CLEAR_USERS:
            return {
                ...state,
                users: [],
                particularuser: {},
                moreDetails: {},
                createdRepos: [],
                readme: [],
                user_repo_url: [],
                repos_id: [],
            };
        case ActionKind.GET_USERS:
            return {
                ...state,
                particularuser: action.payload.particularuser,
                moreDetails: action.payload.moredetails,
            };
        case ActionKind.GET_USERS_REPOS:
            return {
                ...state,
                createdRepos: action.payload.createdRepos,
                readme: action.payload.readme,
                user_repo_url: action.payload.user_repo_url,
                repos_id: action.payload.repos_id,
            };
        case ActionKind.CHANGE_DARK_MODE:
            return {
                ...state,
                darkMode: action.payload,
            };
        default:
            return state;
    }
};

export default GithubReducer;
