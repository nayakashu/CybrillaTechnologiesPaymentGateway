/**
 * paymentGatewayRouter.js -> API router to serve to the transaction POST request
 */

var express = require('express'),
    fs = require('fs'),
    CryptoJS = require("crypto-js");

var routes = function() {
    
    var paymentGatewayRouter = express.Router();

    // Router for decrypting a request String
    paymentGatewayRouter.route('/transaction')

    .post(function(req, res) {

        if(!req.body.hasOwnProperty('msg')) {
            res.json({ Status: "POST request doesn't has 'msg' property!" });
            return;
        }

        // Get the Base64AESCipherText
        var base64AESCipherText = req.body.msg;
        console.log("Base64 AES Cipher Text: " + base64AESCipherText);

        // Extract the AES encrypted string
        var words = CryptoJS.enc.Base64.parse(base64AESCipherText);
        var AESTextString = CryptoJS.enc.Utf8.stringify(words);
        console.log("AES Text String: " + AESTextString);

        // Decrypt the AES encrypted string with the provided secret key
        var bytes  = CryptoJS.AES.decrypt(AESTextString.toString(), 'Q9fbkBF8au24C9wshGRW9ut8ecYpyXye5vhFLtHFdGjRg3a4HxPYRfQaKutZx5N4');
        var requestStringWithHash = bytes.toString(CryptoJS.enc.Utf8);      
        console.log("Request String With Hash: " + requestStringWithHash);

        // Generate hash for the request part and compare with the existing hash in the request string
        var lastIndexOfSeparator = requestStringWithHash.lastIndexOf("|");
        var actualData = requestStringWithHash.substr(0, lastIndexOfSeparator);
        console.log("Actual Data: " + actualData);

        // Get the existing hash from the requestString
        var hashData = requestStringWithHash.substr(lastIndexOfSeparator + 1, requestStringWithHash.length);
        console.log("Hash Data: " + hashData);
        var existingHash = hashData.substr(hashData.indexOf("=") + 1, hashData.length);
        console.log("Existing Hash: " + existingHash);

        // Hash the actualData part from the requestString with Crypto
        var calculatedHash = CryptoJS.SHA1(actualData);
        console.log("Calculated Hash: " + calculatedHash);

        // Sample requestString
        // bank_ifsc_code=undefined|bank_account_number=undefined|amount=1000.00|merchant_transaction_ref=txn001|
        // transaction_date=2014-11-14|payment_gateway_merchant_reference=merc001

        // Verify the hash and then send the appropriate response
        var responseObject;
        if(calculatedHash.toString() == existingHash.toString()) {
            responseObject = {
                "txn_status": "success",
                "data": requestStringWithHash
            };
        } else {
            responseObject = {
                "txn_status": "failure",
                "reason": "Hash doesn't match!"
            };
        }

        res.json({ response: responseObject});
    })

    .get(function(req, res) {
        res.json({ "Status": "GET Request -/api/transaction" });
    });

    return paymentGatewayRouter;
};

module.exports = routes;