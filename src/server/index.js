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
            })

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
            })
    }
});


// fs.readFile("../data/matches.csv", "utf8", function (err, data) {
//     if (err) {
//         console.error("Error has occurred while reading the matches file")
//     }
//     else {

//         let dataOfMatches = d3.csvParse(data, d3.autoType);

//         let numberOfMatchesPerYear = iplFunctions.matchesPerYear(dataOfMatches);
//         fs.writeFile("../output/matchesPerYear.json", JSON.stringify(numberOfMatchesPerYear, null, 4), 'utf8', function (err) {
//             if (err) {
//                 console.error("An error occurred while writing to numberOfMatchesPerYear.json file.");
//             }
//             else {
//                 console.log("Number of matches won per year JSON file has been saved.");
//             }
//         });

//         let numberOfMatchesPerTeamPerYear = iplFunctions.matchesWonPerTeamPerYear(dataOfMatches);
//         fs.writeFile("../output/noOfMatchesTeamWonPerYear.json", JSON.stringify(numberOfMatchesPerTeamPerYear, null, 4), 'utf8', function (err) {
//             if (err) {
//                 console.error("An error occurred while writing to numberOfMatchesPerTeamPerYear.json file.");
//             }
//             else {
//                 console.log("Number of matches a team won per year JSON file has been saved.");
//             }
//         });

//         fs.readFile("../data/deliveries.csv", "utf8", function (err, data) {
//             if (err) {
//                 console.error("error has occurred while reading the deliveries file")
//             }
//             else {

//                 let dataOfDeliveries = d3.csvParse(data, d3.autoType);

//                 let extraRunsPerTeam2016 = iplFunctions.extraRuns2016(dataOfMatches, dataOfDeliveries);
//                 fs.writeFile("../output/noOfExtraRunsPerTeam2016.json", JSON.stringify(extraRunsPerTeam2016, null, 4), 'utf8', function (err) {
//                     if (err) {
//                         console.error("An error occurred while writing to noOfExtraRunsPerTeam2016.json file.");
//                     }
//                     else
//                         console.log("Number of extra runs per team in the year 2016 JSON file has been saved.");
//                 });

//                 let topEconomicalBowlers2015 = iplFunctions.economicalBowlers2015(dataOfMatches, dataOfDeliveries);
//                 fs.writeFile("../output/topEconomicalBowlers2015.json", JSON.stringify(topEconomicalBowlers2015, null, 4), 'utf8', function (err) {
//                     if (err) {
//                         console.error("An error occurred while writing to topEconomicalBowlers2015.json file.");
//                     }
//                     else
//                         console.log("Top 10 economical bowlers in the year 2015 JSON file has been saved.");
//                 });
//             }
//         });
//     }

// });


