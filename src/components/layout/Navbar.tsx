import React, { Fragment, useState } from "react";
import { useGlobalContext } from "../../context/github/githubContext";
const darkImg =
    "https://img.icons8.com/pastel-glyph/64/000000/planet-on-the-dark-side.png";
const whiteImg =
    "https://img.icons8.com/cotton/64/000000/planet-on-the-dark-side.png";

const Navbar = () => {
    const { darkMode, setDarkMode } = useGlobalContext();

    return (
        <Fragment>
            <nav className="navbar">
                <h1>
                    <i className="fab fa-github" /> Github Finder
                </h1>
                <div
                    onClick={() => {
                        if (darkMode) {
                            setDarkMode(false);
                        } else {
                            setDarkMode(true);
                        }
                    }}
                    id="dark"
                >
                    <Fragment>
                        <img
                            src={darkMode ? whiteImg : darkImg}
                            alt={darkMode ? "WhiteMode" : "DarkMode"}
                        />
                    </Fragment>
                </div>
            </nav>
            {/* <hr></hr> */}
        </Fragment>
    );
};

export default Navbar;
