import React, { useEffect, Fragment, useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Repos from "./Repos";
import { useGlobalContext } from "../../context/github/githubContext";
import ReactApexChart from "react-apexcharts";
import { pieChart } from "../../interfaces/contextInterfaces";
import { clickHandler, setChartdata } from "../../helpers/helperFunctions";

type TParams = { login: string };

const Userinfo = ({ match }: RouteComponentProps<TParams>) => {
    const { particularuser, moreDetails, getUser, getUserRepos, darkMode } =
        useGlobalContext();
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (moreDetails.hasOwnProperty("reposPerLanguage")) {
            let { setChart1Data, setChart2Data, setChart3Data } =
                setChartdata(moreDetails);

            setChart1(setChart1Data);
            setChart2(setChart2Data);
            setChart3(setChart3Data);
        }
    }, [moreDetails]);

    const [chart1, setChart1] = useState<pieChart | null>(null);
    const [chart2, setChart2] = useState<pieChart | null>(null);
    const [chart3, setChart3] = useState<pieChart | null>(null);

    useEffect(() => {
        let textElement: NodeListOf<Element> =
            document.querySelectorAll("#chart");
        console.log(textElement);
    }, [darkMode]);

    const {
        name,
        avatar_url,
        bio,
        login,
        html_url,
        followers,
        following,
        public_repos,
        blog,
        public_gists,
        location,
        company,
    } = particularuser;

    return (
        <Fragment>
            <Link
                to="/"
                className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
            >
                Back to Search
            </Link>
            <div className="card grid-2">
                <div className="all-center">
                    <img
                        src={avatar_url}
                        className="round-img"
                        alt=""
                        style={{ width: "150px" }}
                    />
                    <h1>{name}</h1>
                    <p>
                        Location:{" "}
                        {location ? location : "Information not available"}
                    </p>
                </div>
                <div>
                    <Fragment>
                        <h3>Bio</h3>
                        <p>{bio ? bio : "Bio info not provided"}</p>
                    </Fragment>
                    <a
                        href={html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn ${
                            darkMode ? "btn-light" : "btn-dark"
                        } my-1`}
                    >
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>
                            )}
                        </li>

                        <li>
                            <Fragment>
                                <strong>Company: </strong>{" "}
                                {company
                                    ? company
                                    : "Information not available"}
                            </Fragment>
                        </li>

                        <li>
                            <Fragment>
                                <strong>Website:</strong>
                                <a
                                    href={blog}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "black" }}
                                >
                                    {blog ? blog : "Information not available"}
                                </a>
                            </Fragment>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">
                    Followers: {followers}
                </div>
                <div className="badge badge-success">
                    Following: {following}
                </div>
                <div className="badge badge-dark">
                    Public Repos: {public_repos}
                </div>
                <div className="badge badge-light">
                    Public Gists: {public_gists}
                </div>
            </div>
            <div id="chart" style={{ display: "flex", flexWrap: "wrap" }}>
                {chart1 && (
                    <ReactApexChart
                        id="chartid"
                        options={chart1.options}
                        series={chart1.series}
                        type="pie"
                        width={400}
                        onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.persist();
                            clickHandler("chart1", login, e.target.id);
                        }}
                    />
                )}
                {chart2 && (
                    <ReactApexChart
                        id="chartid"
                        options={chart2.options}
                        series={chart2.series}
                        type="pie"
                        width={400}
                        onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.persist();
                            clickHandler("chart2", login, e.target.id);
                        }}
                    />
                )}
                {chart3 && (
                    <ReactApexChart
                        id="chartid"
                        options={chart3.options}
                        series={chart3.series}
                        type="pie"
                        width={500}
                        onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
                            e.persist();
                            clickHandler("chart3", login, e.target.id);
                        }}
                    />
                )}
            </div>
            <Repos />
        </Fragment>
    );
};

export default Userinfo;
