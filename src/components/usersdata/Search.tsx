import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";

const Search = () => {
    const gitContext = useContext(GithubContext);

    const [text, settext] = useState("");

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
        settext(e.target.value);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        gitContext.searchUsers(text);
        settext("");
    };

    return (
        <div>
            <form className="x" onSubmit={(e) => submitHandler(e)}>
                <input
                    type="text"
                    name="text"
                    placeholder="Search Users..."
                    value={text}
                    onChange={(e) => changeHandler(e)}
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />
            </form>
            {gitContext.users.length > 0 && (
                <button
                    className="btn btn-dark btn-block"
                    onClick={gitContext.clearUsers}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default Search;
