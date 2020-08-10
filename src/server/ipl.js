
module.exports = { matchesPerYear, matchesWonPerTeamPerYear, extraRuns2016, economicalBowlers2015 }

/** 
 * Calculating number of matches played per year
 * @param {array} data  Array of objects where each object represents a row from given data
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
 * @param {array} data  Array of objects where each object represents a row from given data
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
 * @param {array} data  Array of objects where each object represents a row from given data
 * @returns {object} Result object with each team as a property and number of extra runs as value
*/
function extraRuns2016(matchesData, deliveriesData) {

    let extraRunsPerTeam2016 = {};
    let startId2016 = null;
    let endId2016 = null;

    const matchesIn2016IdCallback = (matchesData) => {
        if (matchesData.season === 2016) {
            if (!startId2016) {
                startId2016 = matchesData.id;
            }
            endId2016 = matchesData.id;
        }
    }

    matchesData.forEach(matchesIn2016IdCallback);

    const deliveriesIn2016Callback = (deliveriesData) => {
        let rowObj = deliveriesData;
        if (rowObj['match_id'] >= startId2016 && rowObj['match_id'] <= endId2016) {
            return true;
        }
    }

    const extraRunsPerTeam2016Callback = (deliveriesData) => {

        let bowlingTeamObj = deliveriesData['bowling_team'];
        let extraRunsObj = deliveriesData['extra_runs'];

        if (extraRunsPerTeam2016[bowlingTeamObj] !== undefined) {
            //add extra runs to the value if already present
            extraRunsPerTeam2016[bowlingTeamObj] = extraRunsPerTeam2016[bowlingTeamObj] + extraRunsObj;
        }
        else {
            //initialize the property and set value as extra runs
            extraRunsPerTeam2016[bowlingTeamObj] = extraRunsObj;
        }
    }

    deliveriesData.filter(deliveriesIn2016Callback)
        .forEach(extraRunsPerTeam2016Callback);

    return extraRunsPerTeam2016;
}

/** 
 * Calculating the top 10 economical bowlers in the year 2015
 * @param {array} data  Array of objects where each object represents a row from given data
 * @returns {object} Result object with top 10 bowlers economically with each bowler as a property and the economy rate as value
*/
function economicalBowlers2015(matchesData, deliveriesData) {

    let topEconomicalBowlers2015 = {};
    let allBowlerBallsRuns = {};
    let bowlerEconomy = [];
    let startId2015 = null;
    let endId2015 = null;

    const matchesIn2015IdCallback = (matchesData) => {
        if (matchesData.season === 2015) {
            if (!startId2015) {
                startId2015 = matchesData.id;
            }
            endId2015 = matchesData.id;
        }
    }

    matchesData.forEach(matchesIn2015IdCallback);

    const deliveriesIn2015Callback = (deliveriesData) => {
        let rowObj = deliveriesData;
        if (rowObj['match_id'] >= startId2015 && rowObj['match_id'] <= endId2015) {
            return true;
        }
    }

    const allBowlerBallsRunsCallback = (deliveriesData) => {
        let rowObj = deliveriesData;
        let bowlerObj = rowObj['bowler'];
        let totalRunsObj = rowObj['total_runs'];
        let noBallRunsObj = rowObj['noball_runs'];
        let wideBallRunsObj = rowObj['wide_runs'];

        if (allBowlerBallsRuns[bowlerObj] !== undefined) {
            if (noBallRunsObj === 0 && wideBallRunsObj === 0) {
                allBowlerBallsRuns[bowlerObj][0]++;
            }
            allBowlerBallsRuns[bowlerObj][1] += totalRunsObj;
        }
        else {
            //each bowler has a list which contains no of balls and total runs respectively
            allBowlerBallsRuns[bowlerObj] = [];

            if (noBallRunsObj === 0 && wideBallRunsObj === 0) {
                allBowlerBallsRuns[bowlerObj][0] = 1;
            }
            else {
                allBowlerBallsRuns[bowlerObj][0] = 0;
            }
            allBowlerBallsRuns[bowlerObj][1] = totalRunsObj;
        }
    }

    deliveriesData.filter(deliveriesIn2015Callback)
        .forEach(allBowlerBallsRunsCallback);

    for (property in allBowlerBallsRuns) {
        //number of overs from balls bowled by dividing with six 
        allBowlerBallsRuns[property][0] = allBowlerBallsRuns[property][0] / 6;
        //calculating the economy rate by dividing the total runs with number of overs 
        allBowlerBallsRuns[property][1] = allBowlerBallsRuns[property][1] / allBowlerBallsRuns[property][0];
        bowlerEconomy.push([property, allBowlerBallsRuns[property][1]]);
    }

    //sorting based on economy rate
    bowlerEconomy.sort(function (a, b) {
        return a[1] - b[1];
    });

    const listTop10EconomicalBowlers = (eachBowler, index) => {
        if (index < 10) {
            topEconomicalBowlers2015[eachBowler[0]] = eachBowler[1];
        }
    }

    bowlerEconomy.forEach(listTop10EconomicalBowlers);

    return topEconomicalBowlers2015;
}