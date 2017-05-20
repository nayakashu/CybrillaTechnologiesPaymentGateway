/**
 * server.js -> Entry point for the Payment Gateway Server
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

// Instantiate Express
var app = express();

// Configure bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var paymentGatewayRouter = require('./routes/paymentGatewayRouter')();

// Allow-CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// REGISTER ROUTES -------------------------------
// All of the routes will be prefixed with /api
app.use('/api', paymentGatewayRouter);

// Route for GET request
app.get('/', function(req, res) {
    res.json({ "Status": "Payment Gateway is running at port: " + port });
});

// Configure the server port
var port = process.env.PORT || 3030;

// START THE SERVER
// =============================================================================
app.listen(port, function() {
    console.log('Payment Gateway is running at port: ' + port);
});