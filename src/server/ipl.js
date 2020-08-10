
module.exports = { matchesPerYear, matchesWonPerTeamPerYear, extraRuns2016, economicalBowlers2015 }

/** 
 * Calculating number of matches played per year
 * @param {object} connection  Connection object to a database
 * @returns {object} Result object with each season as property and number of wins as value
*/
function matchesPerYear(connection) {

    return new Promise((resolve, reject) => {

        let query = `SELECT season,count(season) AS matchesNum
                    FROM matches 
                    GROUP BY season;`

        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
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

    return new Promise((resolve, reject) => {

        let query = `SELECT season,winner,count(winner) FROM matches
                    WHERE result != 'no result'
                    GROUP BY winner,season; `

        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
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

        let query = `SELECT bowling_team,sum(extra_runs) AS extra_runs_2016 
        FROM deliveries 
        WHERE match_id IN (SELECT id FROM matches WHERE season = 2016)
        GROUP BY bowling_team;`;

        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
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

        let query = `SELECT bowler AS bowler_name,            
        (sum(total_runs)/(SELECT count(bowler) FROM deliveries
        WHERE match_id IN (SELECT id FROM matches WHERE season = 2015) 
        AND bowler = bowler_name
        AND noball_runs=0 AND wide_runs=0 ))*6 AS economy
        FROM deliveries
        WHERE match_id IN (SELECT id FROM matches WHERE season = 2015)
        GROUP BY bowler
        ORDER BY economy
        LIMIT 10;`;

        connection.query(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}