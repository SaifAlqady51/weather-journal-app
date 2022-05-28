// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')



// Start up an instance of app

const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));

// Post route

app.post('/api',async(req,res) => {
    const data = await req.body;
    projectData = data;
    console.log(projectData)
    res.send(projectData);
    
})

// Get route

app.get('/all', async (req,res) => {
    console.log(projectData)
    res.send(projectData)
})

// Setup Server

app.listen(8000,() => {
    console.log('Listening to port 8000')
})