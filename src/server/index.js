var fs = require("fs");
var d3 = require("d3");
var iplFunctions = require("./ipl.js");
const { economicalBowlers2015 } = require("./ipl.js");

let numberOfMatchesPerYear = {};
let numberOfMatchesPerTeamPerYear = {};
let extraRunsPerTeam2016 = {};
let topEconomicalBowlers2015 = {};

let dataOfMatches = []
let dataOfDeliveries = []

fs.readFile("../data/matches.csv","utf8",function(err,data){
    if(err){                                                            
        console.error("error has occured while reading the matches file")       
    }                                                                   
    else{                                          
    dataOfMatches=d3.csvParse(data);     
    }
    numberOfMatchesPerYear = iplFunctions.matchesPerYear(dataOfMatches);
    fs.writeFile("../output/matchesPerYear.json", JSON.stringify(numberOfMatchesPerYear,null,4), 'utf8', function (err) {
        if (err) {
            console.error("An error occured while writing JSON Object to File.");
        }
        else
        console.log("Number of matches won per year JSON file has been saved.");
    }); 
   numberOfMatchesPerTeamPerYear = iplFunctions.matchesWonPerTeamPerYear(dataOfMatches);
   fs.writeFile("../output/noOfMatchesTeamWonPerYear.json", JSON.stringify(numberOfMatchesPerTeamPerYear,null,4), 'utf8', function (err) {
    if (err) {
        console.error("An error occured while writing JSON Object to File.");
    }
    else
    console.log("Number of matches a team won per year JSON file has been saved."); 
     }); 
});


fs.readFile("../data/deliveries.csv","utf8",function(err,data){
    if(err){
        console.error("error has occured while reading the deliveries file")
    }
    else{
        dataOfDeliveries = d3.csvParse(data);  
    } 
    extraRunsPerTeam2016 = iplFunctions.extraRuns2016(dataOfMatches,dataOfDeliveries);
    fs.writeFile("../output/noOfExtraRunsPerTeam2016.json", JSON.stringify(extraRunsPerTeam2016,null,4), 'utf8', function (err) {
        if (err) {
            console.error("An error occured while writing JSON Object to File.");
        }
        else
        console.log("Number of extra runs per team in the year 2016 JSON file has been saved."); 
         }); 
    topEconomicalBowlers2015 = economicalBowlers2015(dataOfMatches,dataOfDeliveries);
    fs.writeFile("../output/topEconomicalBowlers2015.json", JSON.stringify(topEconomicalBowlers2015,null,4), 'utf8', function (err) {
        if (err) {
            console.error("An error occured while writing JSON Object to File.");
        }
        else
        console.log("Top 10 economical bowlers in the year 2015 JSON file has been saved."); 
         }); 
  });


