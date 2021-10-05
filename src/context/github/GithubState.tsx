import React, { useReducer } from "react";
import GithubReducer from "./githubReducer";
import { GithubContext } from "./githubContext";
import { ActionKind } from "../types";
import { InitialState } from "../../interfaces/contextInterfaces";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

//useReducer is an alternative to useState.

interface InputProps {
    children: React.ReactNode;
}

const GithubState = ({ children }: InputProps) => {
    const initialState: InitialState = {
        darkMode: false,
        loading: false,
        users: [],
        particularuser: {},
        moreDetails: {},
        createdRepos: [],
        readme: [],
        user_repo_url: [],
        repos_id: [],
    };

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async (text: string): Promise<void> => {
        dispatch({
            type: ActionKind.CLEAR_USERS,
        });
        let response = await fetch(
            `https://api.github.com/search/users?q=${text}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );
        let data = await response.json();
        let items = await data.items;

        let newList = [];

        for (let item of items) {
            let response = await fetch(
                `https://api.github.com/users/${item.login}`
            );

            let particulardata = await response.json();

            newList.push({
                login: item.login,
                avatar_url: item.avatar_url,
                followers: particulardata.followers,
                following: particulardata.following,
                public_repos: particulardata.public_repos,
            });
        }
        dispatch({
            type: ActionKind.SEARCH_USERS,
            payload: newList, // It is the actual data which we want to set or send
        });
    };

    // Get User
    const getUser = async (username: string): Promise<void> => {
        dispatch({
            type: ActionKind.CLEAR_MORE_DETAILS,
        });
        let response = await fetch(
            `https://api.github.com/users/${username}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
        );

        let particulardata = await response.json();

        let response2 = await fetch(
            `https://api.github.com/users/${username}/repos`
        );
        let repodetails = await response2.json();

        let reposPerLanguage: {
            [key: string]: {
                count: number | undefined;
                stars: number | undefined;
            };
        } = {};

        let starsPerRepo: { [key: string]: number } = {};

        for (let item of repodetails) {
            let type = item.language || "Unkown";

            // reposPerLanguage
            if (!reposPerLanguage[type]) {
                reposPerLanguage[type] = {
                    count: 1,
                    stars: item.stargazers_count,
                };
            } else {
                reposPerLanguage[type].count =
                    (reposPerLanguage[type].count || 0) + 1;
                reposPerLanguage[type].stars =
                    (reposPerLanguage[type].stars || 0) + item.stargazers_count;
            }

            //  starsPerRepo
            starsPerRepo[item.name] = item.stargazers_count;
        }

        let filteredDataObj = {
            reposPerLanguage,
            starsPerRepo,
        };

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

        dispatch({
            type: ActionKind.GET_USERS,
            payload: { particularuser: newObj, moredetails: filteredDataObj },
        });
    };

    // Get User Repos
    const getUserRepos = async (
        username: string,
        public_repos: number
    ): Promise<void> => {
        dispatch({
            type: ActionKind.CLEAR_REPOS,
        });
        let response = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=${public_repos}&sort=created:asc&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
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
    const clearUserDetails = (): void => {
        dispatch({ type: ActionKind.CLEAR_MORE_DETAILS });
        dispatch({ type: ActionKind.CLEAR_REPOS });
    };

    const setDarkMode = (value: boolean) => {
        if (!value) {
            document.body.style.backgroundColor = "#DAE0E2";
            document.body.style.color = "black";
        } else {
            document.body.style.backgroundColor = "#1b262c";
            document.body.style.color = "#eaf0f1";
        }
        dispatch({
            type: ActionKind.CHANGE_DARK_MODE,
            payload: value,
        });
    };

    return (
        <GithubContext.Provider
            value={{
                darkMode: state.darkMode,
                users: state.users,
                particularuser: state.particularuser,
                moreDetails: state.moreDetails,
                createdRepos: state.createdRepos,
                user_repo_url: state.user_repo_url,
                readme: state.readme,
                repos_id: state.repos_id,
                loading: state.loading,
                searchUsers,
                clearUserDetails,
                getUser,
                getUserRepos,
                setDarkMode,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

// https://api.github.com/users/lavlife06/repos
// https://api.github.com/repos/lavlife06/mycalculator/contents/README.md?ref=master

export default GithubState;
