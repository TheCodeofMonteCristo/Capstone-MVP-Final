// Importing required libraries
const express = require('express'); // Express framework for creating the server
const path = require('path'); // Path module to resolve file paths
const fs = require('fs'); // File system module to read files
const app = express(); // Create an instance of an Express application
const port = 3000; // Define the port number the server will listen on

// Middleware to enable CORS (Cross-Origin Resource Sharing) for frontend and backend communication
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed methods
  res.header("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers
  next(); // Proceed to the next middleware
});

// Route to serve city data
app.get('/api/cities', (req, res) => {
  // Read the static cities.json file
  fs.readFile(path.join(__dirname, 'data', 'cities.json'), 'utf8', (err, data) => {
    if (err) {
      // If there's an error reading the file, send a 500 error
      return res.status(500).json({ error: 'Unable to read cities data' });
    }
    // Parse the JSON data and send it as a response
    const cities = JSON.parse(data);
    res.json(cities); // Send the cities data as a JSON response
  });
});

// Starting the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log the server running message
});
