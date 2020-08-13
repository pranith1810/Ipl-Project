const http = require('http');
const fs = require('fs');

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
            readFilePromise('../client/index.html')
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
            readFilePromise('../client/app.js')
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
                    console.error('Error while reading the index.html file ' + err);
                });
            break;

        case '/app.css':
            readFilePromise('../client/app.css')
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
                    console.error('Error while reading the index.html file ' + err);
                });
            break;

        case '/matchesPerYear':
            readFilePromise('../output/matchesPerYear.json')
                .then((data) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(data);
                    res.end();
                })
                .catch((err) => {
                    res.writeHead(500);
                    res.end();
                    console.error('Error while reading the matchesPerYear file ' + err);
                });
            break;

        case '/noOfMatchesTeamWonPerYear':
            readFilePromise('../output/noOfMatchesTeamWonPerYear.json')
                .then((data) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(data);
                    res.end();
                })
                .catch((err) => {
                    res.writeHead(500);
                    res.end();
                    console.error('Error while reading the noOfMatchesTeamWonPerYear file ' + err);
                });
            break;

        case '/noOfExtraRunsPerTeam2016':
            readFilePromise('../output/noOfExtraRunsPerTeam2016.json')
                .then((data) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(data);
                    res.end();
                })
                .catch((err) => {
                    res.writeHead(500);
                    res.end();
                    console.error('Error while reading the noOfExtraRunsPerTeam2016 file ' + err);
                });
            break;

        case '/topEconomicalBowlers2015':
            readFilePromise('../output/topEconomicalBowlers2015.json')
                .then((data) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    res.write(data);
                    res.end();
                })
                .catch((err) => {
                    res.writeHead(500);
                    res.end();
                    console.error('Error while reading the topEconomicalBowlers2015 file ' + err);
                });
            break;

        default:
            res.writeHead(404);
            res.end();

    }
});

server.listen(8080);