angular.module('PaymentGatewayModule').config(function ($routeProvider) {
    $routeProvider
            .when('/',
                {
                    controller: 'TransactionController',
                    templateUrl: 'partials/TransactionForm.partial.html'
                })
            .when('/notification_page',
                {
                    controller: 'NotificationController',
                    templateUrl: 'partials/NotificationPage.partial.html'
                })   
            .otherwise({ redirectTo: '/'});
});