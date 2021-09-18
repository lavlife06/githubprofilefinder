import { ActionKind } from "../context/types";

interface ParticularUser {
    name?: string;
    avatar_url?: string;
    bio?: string;
    login?: string;
    html_url?: string;
    followers?: number;
    following?: number;
    public_repos?: number;
    blog?: string | "";
    public_gists?: number;
    location?: string;
    company?: string | null;
}

export interface moreDetails {
    reposPerLanguage?: { [key: string]: { count: number; stars: number } };
    starsPerRepo?: { [key: string]: number };
}

export interface InitialState {
    darkMode: boolean;
    users: {
        avatar_url: string;
        login: string;
        followers: number;
        following: number;
        public_repos: number;
    }[];
    particularuser: ParticularUser;
    moreDetails: moreDetails;
    createdRepos: Array<string>;
    readme: Array<string>;
    user_repo_url: Array<string>;
    repos_id: Array<number>;
    searchUsers?: (text: string) => Promise<void> | undefined;
    clearUsers?: () => void | undefined;
    getUser?: (username: string) => Promise<void> | undefined;
    getUserRepos?: (username: string) => Promise<void> | undefined;
    setDarkMode?: (value: boolean) => void | undefined;
}

export type Action =
    | {
          type: ActionKind.SEARCH_USERS;
          payload: {
              avatar_url: string;
              login: string;
              followers: number;
              following: number;
              public_repos: number;
          }[];
      }
    | {
          type: ActionKind.GET_USERS;
          payload: { particularuser: ParticularUser; moredetails: moreDetails };
      }
    | {
          type: ActionKind.GET_USERS_REPOS;
          payload: {
              createdRepos: Array<string>;
              readme: Array<string>;
              user_repo_url: Array<string>;
              repos_id: Array<number>;
          };
      }
    | {
          type: ActionKind.CLEAR_USERS;
      }
    | {
          type: ActionKind.CHANGE_DARK_MODE;
          payload: boolean;
      };

export interface pieChart {
    series: number[];
    options: {
        labels: string[];
        title: {
            text: string;
            align: "right" | "left" | "center";
            style: { color: string };
        };
        // responsive: {
        //     breakpoint: number;
        //     options: { chart: { width: number }; legend: { position: string } };
        // }[];
    };
}
