
module.exports = { matchesPerYear, matchesWonPerTeamPerYear, extraRuns2016, economicalBowlers2015 }

/** 
 * Calculating number of matches played per year
 * @param {array} data  Array of objects where each object represents a row from given data
 * @returns {object} Result object with each season as property and number of wins as value
*/
function matchesPerYear(data) {

    let noOfMatchesPerYear = {};

    for (let index = 0; index < data.length; index++) {
        if (data[index].season in noOfMatchesPerYear) {
            //incrementing the value if the year is already present in the object
            noOfMatchesPerYear[data[index].season]++;
        }
        else {
            //initializing the year value to one if it is already not present
            noOfMatchesPerYear[data[index].season] = 1;
        }
    }

    return noOfMatchesPerYear;
}

/** 
 * Calculating the number of matches each team has won per season
 * @param {array} data  Array of objects where each object represents a row from given data
 * @returns {object} Result object with each season as an object which contains all the teams as properties and number of wins for each team as value
*/
function matchesWonPerTeamPerYear(data) {
    let noOfMatchesPerTeam = {};

    for (let index = 0; index < data.length; index++) {

        let rowObj = data[index];
        let seasonInObj = rowObj['season'];
        let winnerInObj = rowObj['winner'];
        let resultInObj = rowObj['result'];

        if (resultInObj !== 'no result') {
            // checking if the season is already present in the object
            if (seasonInObj in noOfMatchesPerTeam) {
                //checking if the winner team is already present in the season object
                if (noOfMatchesPerTeam[seasonInObj][winnerInObj] !== undefined) {
                    noOfMatchesPerTeam[seasonInObj][winnerInObj]++;
                }
                else {
                    //adding the winner team into that year object and initialize to one                              
                    noOfMatchesPerTeam[seasonInObj][winnerInObj] = 1;
                }

            }
            else {
                //adding the season object in the object 
                noOfMatchesPerTeam[seasonInObj] = {};
                //adding the team in that particular season       
                noOfMatchesPerTeam[seasonInObj][winnerInObj] = 1;
            }
        }
    }

    return noOfMatchesPerTeam;
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

    for (let index = 0; index < matchesData.length; index++) {
        if (matchesData[index].season === '2016') {
            if (!startId2016) {
                startId2016 = Number(matchesData[index].id);
            }
            endId2016 = matchesData[index].id;
        }

    }

    endId2016 = Number(endId2016);

    for (let index = 0; index < deliveriesData.length; index++) {

        let rowObj = deliveriesData[index];
        let bowlingTeamObj = deliveriesData[index]['bowling_team'];
        let extraRunsObj = deliveriesData[index]['extra_runs'];

        if (Number(rowObj['match_id']) >= startId2016 && Number(rowObj['match_id']) <= endId2016) {
            if (extraRunsPerTeam2016[bowlingTeamObj] !== undefined) {
                //add extra runs to the value if already present
                extraRunsPerTeam2016[bowlingTeamObj] = Number(extraRunsPerTeam2016[bowlingTeamObj]) + Number(extraRunsObj);
            }
            else {
                //initialize the property and set value as extra runs
                extraRunsPerTeam2016[bowlingTeamObj] = Number(extraRunsObj);
            }
        }
    }

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

    for (let index = 0; index < matchesData.length; index++) {
        if (matchesData[index].season === '2015') {
            if (!startId2015) {
                startId2015 = Number(matchesData[index].id);
            }
            endId2015 = matchesData[index].id;
        }

    }

    endId2015 = Number(endId2015);

    for (let index = 0; index < deliveriesData.length; index++) {
        let rowObj = deliveriesData[index];
        let bowlerObj = null;
        let totalRunsObj = null;
        let noBallRunsObj = null;
        let wideBallRunsObj = null;

        if (Number(rowObj['match_id']) >= startId2015 && Number(rowObj['match_id']) <= endId2015) {

            bowlerObj = rowObj['bowler'];
            totalRunsObj = rowObj['total_runs'];
            noBallRunsObj = rowObj['noball_runs'];
            wideBallRunsObj = rowObj['wide_runs'];

            if (allBowlerBallsRuns[bowlerObj] !== undefined) {
                if (Number(noBallRunsObj) === 0 && Number(wideBallRunsObj) === 0)
                    allBowlerBallsRuns[bowlerObj][0]++;
                allBowlerBallsRuns[bowlerObj][1] += Number(totalRunsObj);
            }
            else {
                //each bowler has a list which contains no of balls and total runs respectively
                allBowlerBallsRuns[bowlerObj] = [];

                if (Number(noBallRunsObj) === 0 && Number(wideBallRunsObj) === 0)
                    allBowlerBallsRuns[bowlerObj][0] = 1;
                else
                    allBowlerBallsRuns[bowlerObj][0] = 0;
                allBowlerBallsRuns[bowlerObj][1] = Number(totalRunsObj);
            }
        }
    }

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

    for (let index = 0; index < 10; index++) {
        topEconomicalBowlers2015[bowlerEconomy[index][0]] = bowlerEconomy[index][1];
        return topEconomicalBowlers2015;
    }
}