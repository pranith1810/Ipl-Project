fetch('http://localhost:8080/src/output/matchesPerYear.json')
    .then((response) => {
        if (response.ok === true) {
            return response.json();
        }
        throw new Error('Request failed!');
    })
    .then((jsonResponse) => {
        Highcharts.chart('chartOfNumOfMatches', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Number of matches played per year'
            },
            xAxis: {
                categories: Object.keys(jsonResponse)
            },
            yAxis: {
                title: {
                    text: 'Number of matches played'
                }
            },
            series: [{
                name: 'Number of matches',
                data: Object.values(jsonResponse)
            }]
        });
    })
    .catch((err) => {
        console.error('Error while fetching the matchesPerYear.json file ' + err);
    });

fetch('http://localhost:8080/src/output/noOfMatchesTeamWonPerYear.json')
    .then((response) => {
        if (response.ok === true) {
            return response.json();
        }
        throw new Error('Request failed!');
    })
    .then((jsonResponse) => {

        let teams = {};
        let seasonsObj = [];

        for (let season in jsonResponse) {
            seasonsObj.push(jsonResponse[season]);
            for (team in jsonResponse[season]) {
                if (teams[team] === undefined) {
                    teams[team] = [];
                }
            }
        }

        for (team in teams) {
            seasonsObj.forEach((seasonObj) => {
                let flag = 0;
                for (teamObj in seasonObj) {
                    if (teamObj === team) {
                        teams[team].push(seasonObj[teamObj]);
                        flag = 1;
                        break;
                    }
                }
                if (flag === 0) {
                    teams[team].push(0);
                }
            });
        }

        let numOfWinsChartOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Number of wins per season for each team'
            },
            xAxis: {
                categories: Object.keys(jsonResponse)
            },
            yAxis: {
                title: {
                    text: 'Number of wins'
                }
            },
            plotOptions: {
                column: {
                    minPointLength: 3
                }
            },
            series: []
        }
        for (team in teams) {
            numOfWinsChartOptions.series.push({
                name: team,
                data: teams[team]
            });
        }

        Highcharts.chart('chartOfNumOfWinsPerSeason', numOfWinsChartOptions);

    })
    .catch((err) => {
        console.error('Error while fetching the noOfMatchesTeamWonPerYear.json file ' + err);
    });

fetch('http://localhost:8080/src/output/noOfExtraRunsPerTeam2016.json')
    .then((response) => {
        if (response.ok === true) {
            return response.json();
        }
        throw new Error('Request failed!');
    })
    .then((jsonResponse) => {
        Highcharts.chart('chartOfNumOfExtraRuns2016', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Number extra runs per team in 2016'
            },
            xAxis: {
                categories: Object.keys(jsonResponse)
            },
            yAxis: {
                title: {
                    text: 'Number of extra runs'
                }
            },
            series: [{
                name: 'Extra runs',
                data: Object.values(jsonResponse)
            }]
        });
    })
    .catch((err) => {
        console.error('Error while fetching the noOfExtraRunsPerTeam2016.json file ' + err);
    });

fetch('http://localhost:8080/src/output/topEconomicalBowlers2015.json')
    .then((response) => {
        if (response.ok === true) {
            return response.json();
        }
        throw new Error('Request failed!');
    })
    .then((jsonResponse) => {
        Highcharts.chart('chartOfTopEconomicalBowlers2015', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Top economical bowlers in 2015'
            },
            xAxis: {
                categories: Object.keys(jsonResponse)
            },
            yAxis: {
                title: {
                    text: 'Economy rate'
                }
            },
            series: [{
                name: 'Economy Rate',
                data: Object.values(jsonResponse)
            },]
        });
    })
    .catch((err) => {
        console.error('Error while fetching the topEconomicalBowlers2015.json file ' + err);
    });