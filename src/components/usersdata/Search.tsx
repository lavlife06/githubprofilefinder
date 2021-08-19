/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useGlobalContext } from "../../context/github/githubContext";

const Search = () => {
    const [text, settext] = useState<string>("");

    const { searchUsers, users, clearUsers } = useGlobalContext();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
        settext(e.target.value);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        searchUsers(text);
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
            {users.length > 0 && (
                <button className="btn btn-dark btn-block" onClick={clearUsers}>
                    Clear
                </button>
            )}
        </div>
    );
};

export default Search;
