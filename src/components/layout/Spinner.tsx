import React, { Fragment } from "react";
import spinner from "./Fidget-spinner.gif";

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{
                paddingTop: "100px",
                width: "70px",
                margin: "auto",
                display: "block",
                paddingBottom: "10px",
            }}
            alt="Loading..."
        />
        <h2 style={{ textAlign: "center" }}>
            Hang tight, your data is arriving...
        </h2>
    </Fragment>
);
