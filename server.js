// Express web server
const express = require('express');
const app = express();

// Backend(API) Port
const port = 8000;

// Use CORS: Cross Origin Resource Sharing
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Load database configuration
require('./server/config/database');
// Load API routes
require('./server/config/routes')(app);

// Verification of server running
app.listen(port,() => {
  console.log(`App is running on ${port}`)
});
