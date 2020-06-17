(function () {
    let url = window.backend__url + 'patient_details/';
    let app = angular.module('app', ['ui.router'])
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/root')
        $stateProvider
            .state('root', {
                url: '/root',
                templateUrl: "home.html",
                controller: 'homeCtrl as homeCtrl'
            })
            .state('appointment', {
                url: '/appointment',
                templateUrl: 'appointment.html',
                controller: 'appointmentCtrl as appCtrl'
            })
            .state('medical', {
                url: '/medical',
                templateUrl: 'medical.html',
                controller: 'medicalCtrl as medCtrl'
            })
            .state('payment', {
                url: '/payment',
                templateUrl: 'payment.html'
            })
            .state('report', {
                url: '/report',
                templateUrl: 'report.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'profile.html',
                controller: 'profileCtrl as profileCtrl'
            })
            .state('signout', {
                url: '/logout',
                template: 'You are being signed out !!',
                controller: 'signoutCtrl'
            })
    })
    app.controller('homeCtrl', function ($http) {
        // console.log(sessionStorage);
        let homeCtrl = this;
        // if (sessionStorage.length == 1) {
        //     window.location.href = "../login/index.html"
        // }
        // if (sessionStorage.login == "false") {
        //     window.location.href = "../login/index.html"
        // }
        homeCtrl.name = sessionStorage.name;
        homeCtrl.id = sessionStorage.id;
        homeCtrl.appointmenturl = url + "appointment/details/?id=";
        homeCtrl.med_historyurl = url + 'appointment/medical_history/display/?id=';
        $http({
                method: "GET",
                url: homeCtrl.appointmenturl + homeCtrl.id
            })
            .then(
                function mysuccess(response) {
                    homeCtrl.appointment_details = response.data;
                    // console.log(homeCtrl.message)
                }
            )

        $http({
                method: 'GET',
                url: homeCtrl.med_historyurl + homeCtrl.id
            })
            .then(
                function mysuccess(response) {
                    homeCtrl.med_history = response.data;
                    let data = homeCtrl.med_history[0]
                    homeCtrl.height = data.height
                    homeCtrl.weight = data.weight
                    homeCtrl.previous_problem = data.previous_problem
                    homeCtrl.blood_group = data.blood_group
                }
            )
    })

    app.controller('appointmentCtrl', function ($http) {
        let appCtrl = this;
        let today = new Date();
        appCtrl.todays_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        // appCtrl.date_of_appointment = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        // console.log(appCtrl.date_of_appointment)
        appCtrl.url = url + "appointment/";
        appCtrl.id = sessionStorage.id;
        appCtrl.name = sessionStorage.name;
        appCtrl.age = sessionStorage.age;
        appCtrl.email = sessionStorage.email;
        appCtrl.gender = sessionStorage.gender;
        appCtrl.mobile_no = sessionStorage.mobile_no;
        appCtrl.submit = function () {
            console.log(appCtrl)
            $http({
                    method: "POST",
                    url: appCtrl.url,
                    data: {
                        'id': appCtrl.id,
                        'date_of_appointment': appCtrl.date_of_appointment,
                        'time_of_appointment': appCtrl.time_of_appointment,
                        'problem': appCtrl.problem,
                        'fees': appCtrl.fees
                    }
                })
                .then(
                    function mysuccess(response) {
                        appCtrl.message = response.data;
                        appCtrl.date_of_appointment = "";
                        appCtrl.time_of_appointment = "";
                        appCtrl.problem = ""
                    }
                )
        }
    })

    app.controller('medicalCtrl', function ($http) {
        let medCtrl = this;
        medCtrl.id = sessionStorage.id;
        medCtrl.url = url + 'appointment/medical_history/';
        medCtrl.submit = function () {
            $http({
                    method: "POST",
                    url: medCtrl.url,
                    data: {
                        'id': medCtrl.id,
                        'height': medCtrl.height,
                        'weight': medCtrl.weight,
                        'previous_problem': medCtrl.problem,
                        'blood_group': medCtrl.blood_group
                    }
                })
                .then(
                    function mysuccess(response) {
                        medCtrl.message = response.data;
                        medCtrl.height = "";
                        medCtrl.weight = "";
                        medCtrl.problem = "";
                        medCtrl.blood_group = "";
                    }
                )
        }

    })

    app.controller('profileCtrl', function () {
        let profileCtrl = this;
        profileCtrl.name = sessionStorage.name;
        profileCtrl.age = sessionStorage.age;
        profileCtrl.email = sessionStorage.email;
        profileCtrl.gender = sessionStorage.gender;
        profileCtrl.mobile_no = sessionStorage.mobile_no;
    })

    app.controller('signoutCtrl', function () {
        sessionStorage.clear();
        console.log(sessionStorage)
        window.location.href = "../login/index.html"
    })


})();