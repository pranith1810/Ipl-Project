fetch('http://localhost:8080/src/output/matchesPerYear.json')
    .then((response) => {
        if (response.ok === true) {
            return response.json();
        }
        throw new Error('Request failed!');
    })
    .then((jsonResponse) => {
        Highcharts.chart('chartOfNumOfMatches', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Number of matches played per year'
            },
            xAxis: {
                categories: Object.keys(jsonResponse)
            },
            yAxis: {
                title: {
                    text: 'Number of matches played'
                }
            },
            series: [{
                name: 'Number of matches',
                data: Object.values(jsonResponse)
            }]
        });
    })
    .catch((err) => {
        console.error('Error while fetching the matchesPerYear.json file ' + err);
    });