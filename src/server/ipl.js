module.exports = { matchesPerYear , matchesWonPerTeamPerYear , extraRuns2016 }


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


