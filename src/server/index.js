var fs = require("fs");
var d3 = require("d3");
var iplFunctions = require("./ipl.js");

let numberOfMatchesPerYear = {};

fs.readFile("../data/matches.csv","utf8",function(err,data){
    if(err){
        console.error("error has occured while reading the file")
    }
    else{
    dataOfMatches=d3.csvParse(data);     
    }
    numberOfMatchesPerYear = iplFunctions.matchesPerYear(dataOfMatches);
fs.writeFile("../output/matchesPerYear.json", JSON.stringify(numberOfMatchesPerYear), 'utf8', function (err) {
        if (err) {
            console.error("An error occured while writing JSON Object to File.");
        }
        else
        console.log("JSON file has been saved.");
    }); 
});

