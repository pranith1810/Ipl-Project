var fs = require("fs");
var d3 = require("d3");
var iplFunctions = require("./ipl.js");

let numberOfMatchesPerYear = {};
let numberOfMatchesPerTeamPerYear = {};

fs.readFile("../data/matches.csv","utf8",function(err,data){
    if(err){                                                            
        console.error("error has occured while reading the file")       
    }                                                                   
    else{                                          
    dataOfMatches=d3.csvParse(data);     
    }
    // console.log(dataOfMatches);
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

