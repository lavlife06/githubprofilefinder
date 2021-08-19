import React, { useReducer } from "react";
import GithubReducer from "./githubReducer";
import { GithubContext } from "./githubContext";
import { ActionKind } from "../types";
import { InitialState } from "../../interfaces/contextInterfaces";

//useReducer is an alternative to useState.

interface InputProps {
    children: React.ReactNode;
}

const GithubState = ({ children }: InputProps) => {
    const initialState: InitialState = {
        users: [],
        particularuser: {},
        createdRepos: [],
        readme: [],
        user_repo_url: [],
        repos_id: [],
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async (text: string): Promise<void> => {
        let response = await fetch(
            `https://api.github.com/search/users?q=${text}`
        );
        let data = await response.json();
        let items = await data.items;

        let newList = items.map((user: typeof items[0]) => {
            return { login: user.login, avatar_url: user.avatar_url };
        });

        dispatch({
            type: ActionKind.SEARCH_USERS,
            payload: newList, // It is the actual data which we want to set or send
        });
    };

    // Get User
    const getUser = async (username: string): Promise<void> => {
        dispatch({
            type: ActionKind.CLEAR_USERS,
        });
        console.log(state.createdRepos, "repos");
        let response = await fetch(`https://api.github.com/users/${username}`);
        let particulardata = await response.json();

        let newObj = {
            name: particulardata.name,
            avatar_url: particulardata.avatar_url,
            bio: particulardata.bio,
            login: particulardata.login,
            html_url: particulardata.html_url,
            followers: particulardata.followers,
            following: particulardata.following,
            public_repos: particulardata.public_repos,
            blog: particulardata.blog,
            public_gists: particulardata.public_gists,
            location: particulardata.location,
            company: particulardata.company,
        };

        dispatch({ type: ActionKind.GET_USERS, payload: newObj });
    };

    // Get User Repos
    const getUserRepos = async (username: string): Promise<void> => {
        dispatch({
            type: ActionKind.CLEAR_USERS,
        });
        let response = await fetch(
            `https://api.github.com/users/${username}/repos`
        );
        let userRepos = await response.json();
        let top5 = 0;
        userRepos.forEach((element: typeof userRepos[0]) => {
            if (element.fork === false && top5 <= 4) {
                state.createdRepos.push(element.name);
                state.readme.push(element.description);
                state.user_repo_url.push(element.html_url);
                state.repos_id.push(element.id);
                top5 += 1;
            }
        });
        console.log(state.readme);

        dispatch({
            type: ActionKind.GET_USERS_REPOS,
            payload: {
                createdRepos: state.createdRepos,
                readme: state.readme,
                user_repo_url: state.user_repo_url,
                repos_id: state.repos_id,
            },
        });
    };
    // Clear Users
    const clearUsers = (): void => dispatch({ type: ActionKind.CLEAR_USERS });

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                particularuser: state.particularuser,
                createdRepos: state.createdRepos,
                user_repo_url: state.user_repo_url,
                readme: state.readme,
                repos_id: state.repos_id,
                searchUsers,
                clearUsers,
                getUser,
                getUserRepos,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

// https://api.github.com/users/lavlife06/repos
// https://api.github.com/repos/lavlife06/mycalculator/contents/README.md?ref=master

export default GithubState;
