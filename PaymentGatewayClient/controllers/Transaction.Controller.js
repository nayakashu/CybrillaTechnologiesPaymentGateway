angular.module('PaymentGatewayModule').controller('TransactionController', 
		function($scope, $location, $http) {

            $scope.init = function() {
                 $scope.responseFromServer = null;
            };

            $scope.submitTransactionAsString = function() {
                // Set the requestString
                var requestString = "bank_ifsc_code=" + $scope.bank_ifsc_code +
                                    "|" + "bank_account_number=" + $scope.bank_account_number +
                                    "|" + "amount=" + $scope.amount +
                                    "|" + "merchant_transaction_ref=" + $scope.merchant_transaction_ref +
                                    "|" + "transaction_date=" + $scope.transaction_date +
                                    "|" + "payment_gateway_merchant_reference=" + $scope.payment_gateway_merchant_reference;
                
                // Create the hash
                var hash = CryptoJS.SHA1(requestString);
                console.log("Hash: " + hash);

                // Append the has to the requestString
                requestString = requestString + "|" + "hash=" + hash;

                // Encrypt in AES using the secret key provided
                var secretKey = "Q9fbkBF8au24C9wshGRW9ut8ecYpyXye5vhFLtHFdGjRg3a4HxPYRfQaKutZx5N4";
                var aes = CryptoJS.AES.encrypt(requestString, secretKey);
                console.log("AES: " + aes);

                // Encode in BASE64
                var words = CryptoJS.enc.Utf8.parse(aes);
                var base64 = CryptoJS.enc.Base64.stringify(words);
                console.log("Base64: " + base64);

                // Create the POST request for the server
                var postRequest = {
                    msg: base64
                };

                // Do a HTTP POST request and get the response and show it back in the view
                $http.post('http://localhost:3030/api/transaction/', postRequest).then(
                    function(response) {
                        if (response.data !== null) {
                            $scope.responseFromServer = response.data.response;
                            console.log('Server Response: ' + JSON.stringify($scope.responseFromServer));
                        } 
                        else {
                            alert('Failed to perform the operation. Check your Network or Server connectivity and retry!');
                            console.log('Failed to perform the operation. Check your Network or Server connectivity and retry!');
                        }
                    });
            };
});