// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');

// Application Setup
// - make an express app!
const app = express();
// - get the port on which to run the server
const PORT = process.env.PORT;
// - enable CORS
app.use(cors());

app.use(express.static('server.js'));

app.get('/location', (request, response) => {
    try {
        const responseObject = getLatLong(request.query.search);
        response.status(200).send(responseObject);
    } 
    catch(err) {
        response.status(500).send({ error: 'something blew up' });
    }
});

app.get('/weather', (request, response) => {
    try {
        console.log(request.location);
        const responseArray = getWeather(request.location);
        response.status(200).send(responseArray);
    } 
    catch(err) {
        response.status(500).send({ error: 'something blew up' });
    }
});

const geoData = require('./data/geo.json');
function getLatLong(searchString){
    const responseObject = {
        'search_query': searchString,
        'formatted_query': geoData.results[0].formatted_address,
        'latitude': geoData.results[0].geometry.location.lat,
        'longitude': geoData.results[0].geometry.location.lng
    };
    return responseObject;
}

const skyNet = require('./data/darksky.json');
function getWeather(location) {
    const forecastArray = [];
    skyNet.daily.data.forEach(dailyForecast => {
        const forecastDay = new Date(dailyForecast.time * 1000);
        const dateArray = forecastDay.toUTCString().split(' ');
        let day = dateArray[0].split(',')[0];
        let date = dateArray[1];
        let month = dateArray[2];
        let year = dateArray[3];
        const responseObject = {
            'forecast': dailyForecast.summary,
            'time': [day, month, date, year].join(' '),
        };
        forecastArray.push(responseObject);
    });
    console.log(forecastArray);
    return forecastArray;
}

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});