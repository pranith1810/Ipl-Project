const { map } = require("d3");

module.exports = { matchesPerYear , matchesWonPerTeamPerYear , extraRuns2016 , economicalBowlers2015 }


function matchesPerYear(data){
    let noOfMatchesPerYear = {};
    for(let index=0;index<data.length;index++){
        if(data[index].season in noOfMatchesPerYear){
            noOfMatchesPerYear[data[index].season]++;
        }
        else{
            noOfMatchesPerYear[data[index].season]=1;
        }
    }
    return noOfMatchesPerYear;
}

function matchesWonPerTeamPerYear(data){
    let noOfMatchesPerTeam = {};
    for(let index=0;index<data.length;index++){
            let rowObj = data[index];
            let seasonInObj = rowObj['season'];
            let winnerInObj = rowObj['winner'];
            let resultInObj = rowObj['result'];
            if(resultInObj !== 'no result'){
            if(seasonInObj in noOfMatchesPerTeam){
                if(noOfMatchesPerTeam[seasonInObj][winnerInObj]){
                    noOfMatchesPerTeam[seasonInObj][winnerInObj] ++;
                }
                else{
                    noOfMatchesPerTeam[seasonInObj][winnerInObj]  = 1;
                }
                 
            }
            else{
                  noOfMatchesPerTeam[seasonInObj] = {};
                  noOfMatchesPerTeam[seasonInObj][winnerInObj]  = 1;
            }
        }
     }
      return noOfMatchesPerTeam;  
}

function extraRuns2016(matchesData,deliveriesData){
   let extraRunsPerTeam2016 = {};
   let startId2016 = null;
   let endId2016 = null;
   for(let index=0;index<matchesData.length;index++){
       if(matchesData[index].season === '2016'){
           if(!startId2016){
               startId2016 = Number(matchesData[index].id);
           }
           endId2016 = matchesData[index].id;
       }
    
    }
    endId2016 = Number(endId2016);
    for(let index=0;index<deliveriesData.length;index++){
       let rowObj = deliveriesData[index];
       let bowlingTeamObj = deliveriesData[index]['bowling_team'];
       let extraRunsObj = deliveriesData[index]['extra_runs'];
       if(Number(rowObj['match_id']) >= startId2016 && Number(rowObj['match_id']) <= endId2016 ){
          if(extraRunsPerTeam2016[bowlingTeamObj]){
            extraRunsPerTeam2016[bowlingTeamObj] = Number(extraRunsPerTeam2016[bowlingTeamObj])+Number(extraRunsObj);
          }
          else{
            extraRunsPerTeam2016[bowlingTeamObj] = Number(extraRunsObj);
          }
       }
    }
   return extraRunsPerTeam2016;
}

function economicalBowlers2015(matchesData,deliveriesData){
   let topEconomicalBowlers2015 = {}; 
   let allBowlerBallsRuns = {};
   let bowlerEconomy = [];
   let startId2015 = null;
   let endId2015 = null;
   for(let index=0;index<matchesData.length;index++){
        if(matchesData[index].season === '2015'){
            if(!startId2015){
                startId2015 = Number(matchesData[index].id);
            }
            endId2015 = matchesData[index].id;
        }
     
    }
    endId2015 = Number(endId2015);

    for(let index=0;index<deliveriesData.length;index++){
        let rowObj = deliveriesData[index];
        let bowlerObj = null;
        let totalRunsObj = null;
        if(Number(rowObj['match_id']) >= startId2015 && Number(rowObj['match_id']) <= endId2015 ){
          bowlerObj = rowObj['bowler'];
          totalRunsObj = rowObj['total_runs'];
          if(allBowlerBallsRuns[bowlerObj])
          {
            allBowlerBallsRuns[bowlerObj][0]++;
            allBowlerBallsRuns[bowlerObj][1] += Number(totalRunsObj);
          } 
          else{
            allBowlerBallsRuns[bowlerObj]= [];
            allBowlerBallsRuns[bowlerObj][0] = 1;
            allBowlerBallsRuns[bowlerObj][1] = Number(totalRunsObj);
          }
        }
    }
    for(property in allBowlerBallsRuns){
            allBowlerBallsRuns[property][0] = Math.floor(allBowlerBallsRuns[property][0]/6);
            allBowlerBallsRuns[property][1] = allBowlerBallsRuns[property][1]/allBowlerBallsRuns[property][0];
            bowlerEconomy.push([property, allBowlerBallsRuns[property][1]]);
        }
    bowlerEconomy.sort(function(a, b) {
        return a[1] - b[1];
    });
   for(let index = 0;index<10;index++){
        topEconomicalBowlers2015[bowlerEconomy[index][0]] = bowlerEconomy[index][1];
    }
  return topEconomicalBowlers2015;
}