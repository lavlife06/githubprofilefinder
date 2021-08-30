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

interface moreDetails {
    langRepoCount?: { [key: string]: number };
    langStarCount?: { [key: string]: number };
    langCommitCount?: { [key: string]: number };
    repoCommitCount?: { [key: string]: number };
    repoStarCount?: { [key: string]: number };
}

export interface InitialState {
    users: { avatar_url: string; login: string }[];
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
}

export type Action =
    | {
          type: ActionKind.SEARCH_USERS;
          payload: { avatar_url: string; login: string }[];
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
      };
