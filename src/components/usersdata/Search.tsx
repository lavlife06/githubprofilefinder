/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useState } from "react";
import { useGlobalContext } from "../../context/github/githubContext";

const Search: React.FC = (): ReactElement => {
    const [text, settext] = useState<string | "">("");

    const { searchUsers, users, clearUsers } = useGlobalContext();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
        settext(e.target.value);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        searchUsers(text);
        settext("");
    };

    // const defaultPropsOfContainer = {
    //     heading: <strong>Maah heading</strong>,
    // };

    // type ContainerProps = { children: string } & typeof defaultPropsOfContainer;

    // const Container = ({ heading, children }: ContainerProps): ReactElement => {
    //     return (
    //         <div>
    //             <h1>{heading}</h1>
    //             {children}
    //         </div>
    //     );
    // };

    // Container.defaultProps = defaultPropsOfContainer;

    return (
        <div>
            {/* <Container>Hii everyone</Container> */}
            <form className="x" onSubmit={submitHandler}>
                <input
                    type="text"
                    name="text"
                    id="search-field"
                    placeholder="Search Users..."
                    value={text}
                    onChange={changeHandler}
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
