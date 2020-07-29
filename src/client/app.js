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
        let objectOfEachSeason = [];
        for (let year in jsonResponse) {
            objectOfEachSeason.push(jsonResponse[year]);
        }
        Highcharts.chart('chartOfNumOfWinsPerSeason', {
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
            series: [{
                name: 'Mumbai Indians',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Mumbai Indians') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Deccan Chargers',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Deccan Chargers') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Kings XI Punjab',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Kings XI Punjab') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Rajasthan Royals',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Rajasthan Royals') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Royal Challengers Bangalore',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Royal Challengers Bangalore') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Delhi Daredevils',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Delhi Daredevils') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Chennai Super Kings',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Chennai Super Kings') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Kolkata Knight Riders',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Kolkata Knight Riders') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Sunrisers Hyderabad',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Sunrisers Hyderabad') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Pune Warriors',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Pune Warriors') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Kochi Tuskers Kerala',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Kochi Tuskers Kerala') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Rising Pune Supergiants',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Rising Pune Supergiants') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            {
                name: 'Gujarat Lions',
                data: objectOfEachSeason.map((object) => {
                    for (team in object) {
                        if (team === 'Gujarat Lions') {
                            return object[team];
                        }
                    }
                    return 0;
                })
            },
            ]
        })
    })
    .catch((err) => {
        console.error('Error while fetching the noOfMatchesTeamWonPerYear.json file ' + err);
    });