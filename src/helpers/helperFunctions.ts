import { moreDetails, pieChart } from "../interfaces/contextInterfaces";

export const setChartdata = (
    chartData: moreDetails,
    darkMode: boolean
): {
    setChart1Data: pieChart;
    setChart2Data: pieChart;
    setChart3Data: pieChart;
} => {
    const pieChartData: pieChart = {
        series: [44, 55, 13, 43, 22],
        options: {
            title: {
                text: "Repos per Language",
                align: "left",
                style: {
                    color: !darkMode ? "black" : "rgb(234, 240, 241)",
                },
            },
            labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        },
    };

    let chart1Series = [];
    let labels: Array<string> = [];
    let chart2Series = [];

    let chart3Series = [];
    let labelsRepos: Array<string> = [];

    for (let language in chartData.reposPerLanguage) {
        labels.push(language);
        chart1Series.push(chartData.reposPerLanguage[language]["count"]);
        chart2Series.push(chartData.reposPerLanguage[language]["stars"]);
    }

    let i = 0;
    for (let repo in chartData.starsPerRepo) {
        if (i === 10) {
            break;
        } else if (chartData.starsPerRepo[repo]) {
            labelsRepos.push(repo);
            chart3Series.push(chartData.starsPerRepo[repo]);
            i++;
        }
    }

    const setChart1Data: pieChart = {
        ...pieChartData,
        series: chart1Series,
        options: {
            ...pieChartData.options,
            labels,
            title: {
                text: "Repos Per Language",
                ...pieChartData.options.title,
            },
        },
    };

    const setChart2Data: pieChart = {
        ...pieChartData,
        series: chart2Series,
        options: {
            ...pieChartData.options,
            labels,
            title: {
                text: "Stars Per Language",
                ...pieChartData.options.title,
            },
        },
    };

    const setChart3Data: pieChart = {
        ...pieChartData,
        series: chart3Series,
        options: {
            ...pieChartData.options,
            labels: labelsRepos,
            title: {
                text: "Stars per Repo (top 10)",
                ...pieChartData.options.title,
            },
        },
    };
    return {
        setChart1Data,
        setChart2Data,
        setChart3Data,
    };
};

export const clickHandler = (
    type: string,
    login: string,
    targetid: string
): void => {
    if ((type === "chart1" || type === "chart2") && targetid) {
        window.open(
            `https://github.com/${login}?utf8=%E2%9C%93&tab=repositories&q=&type=source&language=${
                document.getElementById(targetid).parentElement.attributes[2]
                    .nodeValue
            }`
        );
    } else {
        if (targetid) {
            window.open(
                `https://github.com/${login}/${
                    document.getElementById(targetid).parentElement
                        .attributes[2].nodeValue
                }`
            );
        }
    }
};
