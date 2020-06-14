(function () {
    
        let app = angular.module('app', ['ui.router'])
        app.config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/root')
            $stateProvider
                .state('root', {
                    url: '/root',
                    templateUrl: "home.html",
                    controller: 'homeCtrl'
                })
                .state('appointment', {
                    url: '/appointment',
                    templateUrl: 'appointment.html',
                    css: "appointment"
                })
                .state('medical', {
                    url: '/medical',
                    templateUrl: 'medical.html'
                })
                .state('payment', {
                    url: '/payment',
                    templateUrl: 'payment.html'
                })
                .state('report', {
                    url: '/report',
                    templateUrl: 'report.html'
                })
        })
        app.controller('homeCtrl', function () {
            console.log(sessionStorage);
            if (sessionStorage.length == 1) {
                window.location.href = "../login/index.html"
            }
            if (sessionStorage.login == "false") {
                window.location.href = "../login/index.html"
            }
        })
    

})();