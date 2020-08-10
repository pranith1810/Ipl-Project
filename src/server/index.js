let fs = require("fs");
let iplFunctions = require("./ipl.js");
let config = require("./config.js");
let mysql = require('mysql');

let connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

connection.connect((err) => {
    if (err) {
        console.error('Error while connecting to database' + err);
    }

    else {
        console.log('Connection to database successful!!');

        iplFunctions.matchesPerYear(connection)
            .then((result) => {
                fs.writeFile("../output/matchesPerYear.json", JSON.stringify(result, null, 4), 'utf8', function (err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Number of matches played per year JSON file has been saved.");
                    }
                })
            })
            .catch(error => {
                console.error('An error occurred while writing to numberOfMatchesPerYear.json file.' + error);
            });

        iplFunctions.matchesWonPerTeamPerYear(connection)
            .then((result) => {
                fs.writeFile("../output/noOfMatchesTeamWonPerYear.json", JSON.stringify(result, null, 4), 'utf8', function (err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Number of matches a team won per year JSON file has been saved.");
                    }
                });
            })
            .catch(error => {
                console.error('An error occurred while writing to numberOfMatchesPerTeamPerYear.json file.' + error);
            });

        iplFunctions.extraRuns2016(connection)
            .then((result) => {
                fs.writeFile("../output/noOfExtraRunsPerTeam2016.json", JSON.stringify(result, null, 4), 'utf8', function (err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Number of extra runs per team in the year 2016  JSON file has been saved.");
                    }
                });
            })
            .catch(error => {
                console.error('An error occurred while writing to noOfExtraRunsPerTeam2016.json file.' + error);
            });

        iplFunctions.economicalBowlers2015(connection)
            .then((result) => {
                fs.writeFile("../output/topEconomicalBowlers2015.json", JSON.stringify(result, null, 4), 'utf8', function (err) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Top 10 economical bowlers in the year 2015 JSON file has been saved.");
                    }
                });
            })
            .catch(error => {
                console.error('An error occurred while writing to topEconomicalBowlers2015.json file.' + error);
            });
    }
});