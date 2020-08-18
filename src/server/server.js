const http = require('http');
const fs = require('fs');
const iplFunctions = require("./ipl.js");
const { connection } = require("./index.js");
const config = require("./config.js");

const readFilePromise = (filepath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    })
}

const server = http.createServer((req, res) => {

    switch (req.url) {

        case '/':
            readFilePromise('src/client/index.html')
                .then((data) => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data);
                    res.end();
                })
                .catch((err) => {
                    res.writeHead(500);
                    res.end();
                    console.error('Error while reading the index.html file ' + err);
                });
            break;

        case '/app.js':
            readFilePromise('src/client/app.js')
                .then((data) => {
                    res.writeHead(200, {
                        'Content-Type': 'text/javascript'
                    });
                    res.write(data);
                    res.end();
                })
                .catch((err) => {
                    res.writeHead(500);
                    res.end();
                    console.error('Error while reading the app.js file ' + err);
                });
            break;

        case '/app.css':
            readFilePromise('src/client/app.css')
                .then((data) => {
                    res.writeHead(200, {
                        'Content-Type': 'text/css'
                    });
                    res.write(data);
                    res.end();
                })
                .catch((err) => {
                    res.writeHead(500);
                    res.end();
                    console.error('Error while reading the app.css file ' + err);
                });
            break;

        case '/matchesPerYear':
            iplFunctions.matchesPerYear(connection)
                .then((result) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(result);
                    res.end();
                })
                .catch(error => {
                    console.error('An error occurred while writing to numberOfMatchesPerYear.json file.' + error);
                });
            break;

        case '/noOfMatchesTeamWonPerYear':
            iplFunctions.matchesWonPerTeamPerYear(connection)
                .then((result) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(result);
                    res.end();
                })
                .catch(error => {
                    console.error('An error occurred while writing to numberOfMatchesPerTeamPerYear.json file.' + error);
                });
            break;

        case '/noOfExtraRunsPerTeam2016':
            iplFunctions.extraRuns2016(connection)
                .then((result) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(result);
                    res.end();
                })
                .catch(error => {
                    console.error('An error occurred while writing to noOfExtraRunsPerTeam2016.json file.' + error);
                });
            break;

        case '/topEconomicalBowlers2015':
            iplFunctions.economicalBowlers2015(connection)
                .then((result) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(result);
                    res.end();
                })
                .catch(error => {
                    console.error('An error occurred while writing to topEconomicalBowlers2015.json file.' + error);
                });
            break;

        default:
            res.writeHead(404);
            res.end();

    }
});

server.listen(config.port);