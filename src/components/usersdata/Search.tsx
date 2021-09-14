/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useState } from "react";
import { useGlobalContext } from "../../context/github/githubContext";

const Search: React.FC = (): ReactElement => {
    const [text, settext] = useState<string | "">("");

    const { searchUsers, users, clearUsers, darkMode } = useGlobalContext();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void =>
        settext(e.target.value);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (text.length) {
            searchUsers(text);
        }
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
                    type="search"
                    name="search"
                    id="search-field"
                    placeholder="Search Users..."
                    value={text}
                    onChange={changeHandler}
                    style={{
                        width: "100%",
                        height: "100%",
                        margin: "0px",
                        paddingLeft: "10px",
                    }}
                />
                <input
                    type="submit"
                    value="Search"
                    className={`btn ${
                        darkMode ? "btn-light" : "btn-dark"
                    } btn-block`}
                    style={{
                        height: "100%",
                        width: "100px",
                        borderRadius: "5px",
                    }}
                />
            </form>
        </div>
    );
};

export default Search;
