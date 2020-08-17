
module.exports = { matchesPerYear, matchesWonPerTeamPerYear, extraRuns2016, economicalBowlers2015 }

/** 
 * Calculating number of matches played per year
 * @param {object} connection  Connection object to a database
 * @returns {object} Result object with each season as property and number of wins as value
*/
function matchesPerYear(connection) {

    return new Promise((resolve, reject) => {

        let noOfMatchesPerYear = {};

        let query = `SELECT 
                        season, count(season) AS matchesNum
                    FROM 
                        matches 
                    GROUP BY
                        season;`;

        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                result.forEach(rowObj => {
                    noOfMatchesPerYear[rowObj['season']] = rowObj['matchesNum'];
                });

                resolve(JSON.stringify(noOfMatchesPerYear));
            }
        });
    });
}

/** 
 * Calculating the number of matches each team has won per season
 * @param {object} connection Array of objects where each object represents a row from given data
 * @returns {object} Result object with each season as an object which contains all the teams as properties and number of wins for each team as value
*/
function matchesWonPerTeamPerYear(connection) {

    let noOfMatchesPerTeam = {};

    return new Promise((resolve, reject) => {

        let query = `SELECT 
                        season, winner, count(winner) AS match_wins 
                    FROM 
                        matches
                    WHERE 
                        result != 'no result'
                    GROUP BY 
                        winner, season;`;

        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                result.forEach(rowObj => {
                    let season = rowObj['season'];
                    if (season in noOfMatchesPerTeam) {
                        noOfMatchesPerTeam[season][rowObj['winner']] = rowObj['match_wins'];
                    }
                    else {
                        noOfMatchesPerTeam[season] = {};
                        noOfMatchesPerTeam[season][rowObj['winner']] = rowObj['match_wins'];
                    }
                });

                resolve(JSON.stringify(noOfMatchesPerTeam));
            }
        });
    });
}

/** 
 * Calculating the extra runs per team in the year 2016
 * @param {object} connection Array of objects where each object represents a row from given data
 * @returns {object} Result object with each team as a property and number of extra runs as value
*/
function extraRuns2016(connection) {
    return new Promise((resolve, reject) => {

        let extraRunsPerTeam2016 = {};

        let query = `SELECT 
                        bowling_team, sum(extra_runs) AS extra_runs_2016 
                    FROM 
                        deliveries 
                    WHERE 
                        match_id IN (SELECT id FROM matches WHERE season = 2016)
                    GROUP BY 
                        bowling_team;`;

        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                result.forEach(rowObj => {
                    extraRunsPerTeam2016[rowObj['bowling_team']] = rowObj['extra_runs_2016'];
                });

                resolve(JSON.stringify(extraRunsPerTeam2016));
            }
        });
    });
}

/** 
 * Calculating the top 10 economical bowlers in the year 2015
 * @param {object} connection Array of objects where each object represents a row from given data
 * @returns {object} Result object with top 10 bowlers economically with each bowler as a property and the economy rate as value
*/
function economicalBowlers2015(connection) {
    return new Promise((resolve, reject) => {

        let topEconomicalBowlers2015 = {};

        let query = `SELECT	 
                        bowler,(total_runs/(all_balls-total_no_balls-total_wide_balls))*6 as economy  /*4th function*/
                    FROM
                        (SELECT 
                            bowler,sum(total_runs) AS total_runs ,count(*) as all_balls, 
                            SUM(IF(noball_runs > 0, 1, 0)) AS total_no_balls,
                            SUM(IF(wide_runs > 0, 1, 0)) AS total_wide_balls
                        FROM 
                            deliveries
                        WHERE 
                            match_id IN (SELECT id FROM matches WHERE season = 2015)
                        GROUP BY 
                            bowler)
                        AS table1
                    ORDER BY 
                        economy
                    LIMIT 
                        10;`;

        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                result.forEach(rowObj => {
                    topEconomicalBowlers2015[rowObj['bowler']] = rowObj['economy'];
                });

                resolve(JSON.stringify(topEconomicalBowlers2015));
            }
        });
    });
}