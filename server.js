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

app.get('/location', (request, response) => {
    try {
        const responseObject = getLatLong(request.query.search);
        response.status(200).send(responseObject);
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

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});