
module.exports = { matchesPerYear , matchesWonPerTeamPerYear , extraRuns2016 , economicalBowlers2015 }

//first function which give number of matches per year
function matchesPerYear(data){
    let noOfMatchesPerYear = {};
    for(let index=0;index<data.length;index++){      //accessing each row which is in the form of object in data array
        if(data[index].season in noOfMatchesPerYear){
            noOfMatchesPerYear[data[index].season]++; //incrementing the value if the year is already present in the object
        }
        else{
            noOfMatchesPerYear[data[index].season]=1; //initialising the year value to one if it is already not present
        }
    }
    return noOfMatchesPerYear;
}

//second function which gives matches won per team in each season
//this functions returns a result object wgich contains object for each year and these year objects contains the wins of each team
function matchesWonPerTeamPerYear(data){
    let noOfMatchesPerTeam = {};
    for(let index=0;index<data.length;index++){
            let rowObj = data[index];
            let seasonInObj = rowObj['season'];   
            let winnerInObj = rowObj['winner'];  //storing the required values of each row for this particular function
            let resultInObj = rowObj['result'];
            if(resultInObj !== 'no result'){  
            if(seasonInObj in noOfMatchesPerTeam){ // checking if the year is already present in the object
                if(noOfMatchesPerTeam[seasonInObj][winnerInObj]){  //checking if the winner team is already present in the object
                    noOfMatchesPerTeam[seasonInObj][winnerInObj] ++;
                }
                else{                                         //if winner not present in that particular year add the winner team into that year object and initialise to one
                    noOfMatchesPerTeam[seasonInObj][winnerInObj]  = 1;
                }
                 
            }
            else{
                  noOfMatchesPerTeam[seasonInObj] = {};           //add the year in the object 
                  noOfMatchesPerTeam[seasonInObj][winnerInObj]  = 1; //add the team in that particular year and initialise the value to one
            }
        }
     }
      return noOfMatchesPerTeam;  
}

//third function which gives the extra runs per team in the year 2016
function extraRuns2016(matchesData,deliveriesData){
   let extraRunsPerTeam2016 = {};
   let startId2016 = null;
   let endId2016 = null;
   for(let index=0;index<matchesData.length;index++){  //calculating the start and end match ids of the year 2016 from matches.csv file data
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
       let bowlingTeamObj = deliveriesData[index]['bowling_team']; //requried values for this function
       let extraRunsObj = deliveriesData[index]['extra_runs'];
       if(Number(rowObj['match_id']) >= startId2016 && Number(rowObj['match_id']) <= endId2016 ){ //match id lies in the range of year 2016
          if(extraRunsPerTeam2016[bowlingTeamObj]){
            extraRunsPerTeam2016[bowlingTeamObj] = Number(extraRunsPerTeam2016[bowlingTeamObj])+Number(extraRunsObj);  //add extra runs to the value if already present
          }
          else{
            extraRunsPerTeam2016[bowlingTeamObj] = Number(extraRunsObj); //initialise the property and set value as extra runs
          }
       }
    }
   return extraRunsPerTeam2016;
}

 //fourth function which gives the top 10 economical bowlers in the year 2015
function economicalBowlers2015(matchesData,deliveriesData){
   let topEconomicalBowlers2015 = {}; 
   let allBowlerBallsRuns = {};
   let bowlerEconomy = [];
   let startId2015 = null;
   let endId2015 = null;
   for(let index=0;index<matchesData.length;index++){ //start and end ids for the year 2015
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
          if(allBowlerBallsRuns[bowlerObj])     //checking if bowler already present in object
          {
            allBowlerBallsRuns[bowlerObj][0]++;        //incrementing the number of balls
            allBowlerBallsRuns[bowlerObj][1] += Number(totalRunsObj); //adding the total runs in thtat ball
          } 
          else{
            allBowlerBallsRuns[bowlerObj]= [];  //each bowler has a list which contains no of balls and total runs
            allBowlerBallsRuns[bowlerObj][0] = 1;  //initialising the balls to one
            allBowlerBallsRuns[bowlerObj][1] = Number(totalRunsObj); //initialising the total runs to that ball
          }
        }
    }
    for(property in allBowlerBallsRuns){
            allBowlerBallsRuns[property][0] = Math.floor(allBowlerBallsRuns[property][0]/6);   //calculating number of overs from balls bowled by dividing with six and replacing with the balls bowled
            allBowlerBallsRuns[property][1] = allBowlerBallsRuns[property][1]/allBowlerBallsRuns[property][0];  //calculating the economy rate by dividing the total runs eith number of overs 
            bowlerEconomy.push([property, allBowlerBallsRuns[property][1]]); //storing the bowler name and economy rate in an array 
        }
    bowlerEconomy.sort(function(a, b) {
        return a[1] - b[1];    //sorting based on economy rate
    });
   for(let index = 0;index<10;index++){
        topEconomicalBowlers2015[bowlerEconomy[index][0]] = bowlerEconomy[index][1];  //storing top 10 least economy rate bowlers in an object
    }
  return topEconomicalBowlers2015;
}