import { createContext, useContext } from "react";
import { InitialState } from "../../interfaces/contextInterfaces";

export const GithubContext = createContext<InitialState | null>(null);
export const useGlobalContext = () => useContext(GithubContext);
