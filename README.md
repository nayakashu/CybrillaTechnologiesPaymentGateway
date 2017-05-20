# CybrillaTechnologiesPaymentGateway
Payment gateway system developed for Cybrilla Technologies
**********************
Payment Gateway Server 
**********************
Exposes a RESTFul API built in Express.

To run the server command
node server.js

It runs in 3030 port by default. For running in different port, please update the same in your environment.

**********************
Payment Gateway Client
**********************
HTML5 view built using Angular JS which submits a POST request to the REST API running in the Express Server
and fetches the transaction status data and shows it to the user.

Please copy the client folder to some web server such as WAMP to be able to send POST requests to the REST API Server.

Note: Required node_modules are committed to Github as well.
