module.exports = { matchesPerYear , matchesWonPerTeamPerYear }


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


