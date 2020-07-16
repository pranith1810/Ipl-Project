module.exports = { matchesPerYear }


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



