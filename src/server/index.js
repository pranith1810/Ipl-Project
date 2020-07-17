var fs = require("fs");
var d3 = require("d3");
var iplFunctions = require("./ipl.js");//importing the functions present in ipl.js file

//result objects
let numberOfMatchesPerYear = {};
let numberOfMatchesPerTeamPerYear = {};   
let extraRunsPerTeam2016 = {};
let topEconomicalBowlers2015 = {};

//data storing arrays in terms of object
let dataOfMatches = []
let dataOfDeliveries = []    

//reading the matches.csv file 
fs.readFile("../data/matches.csv","utf8",function(err,data){        
    if(err){                                                            
        console.error("error has occured while reading the matches file")       
    }                                                                   
    else{                                          
    dataOfMatches=d3.csvParse(data);     
    }
    //first function call which give number of matches per year
    numberOfMatchesPerYear = iplFunctions.matchesPerYear(dataOfMatches);
    //writimg the result into a JSON file
    fs.writeFile("../output/matchesPerYear.json", JSON.stringify(numberOfMatchesPerYear,null,4), 'utf8', function (err) {
        if (err) {
            console.error("An error occured while writing JSON Object to File.");
        }
        else
        console.log("Number of matches won per year JSON file has been saved.");
    }); 
    //second function call which gives matches won per team in each season
   numberOfMatchesPerTeamPerYear = iplFunctions.matchesWonPerTeamPerYear(dataOfMatches);
   fs.writeFile("../output/noOfMatchesTeamWonPerYear.json", JSON.stringify(numberOfMatchesPerTeamPerYear,null,4), 'utf8', function (err) {
    if (err) {
        console.error("An error occured while writing JSON Object to File.");
    }
    else
    console.log("Number of matches a team won per year JSON file has been saved."); 
     }); 
});

//reading the deliveries.csv file
fs.readFile("../data/deliveries.csv","utf8",function(err,data){
    if(err){
        console.error("error has occured while reading the deliveries file")
    }
    else{
        dataOfDeliveries = d3.csvParse(data);  
    } 
    //third function call which gives the extra runs per team in the year 2016
    extraRunsPerTeam2016 = iplFunctions.extraRuns2016(dataOfMatches,dataOfDeliveries);
    fs.writeFile("../output/noOfExtraRunsPerTeam2016.json", JSON.stringify(extraRunsPerTeam2016,null,4), 'utf8', function (err) {
        if (err) {
            console.error("An error occured while writing JSON Object to File.");
        }
        else
        console.log("Number of extra runs per team in the year 2016 JSON file has been saved."); 
         }); 
    //fourth function call which gives the top 10 economical bowlers in the year 2015
    topEconomicalBowlers2015 = iplFunctions.economicalBowlers2015(dataOfMatches,dataOfDeliveries);
    fs.writeFile("../output/topEconomicalBowlers2015.json", JSON.stringify(topEconomicalBowlers2015,null,4), 'utf8', function (err) {
        if (err) {
            console.error("An error occured while writing JSON Object to File.");
        }
        else
        console.log("Top 10 economical bowlers in the year 2015 JSON file has been saved."); 
         }); 
  });


