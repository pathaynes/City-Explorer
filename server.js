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
    console.log(request.baseUrl);
    console.log(request.hostname);
    response.status(500).send({ error: 'something blew up' })
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});