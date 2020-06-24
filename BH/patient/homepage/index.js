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
                templateUrl: 'payment.html',
                controller: 'paymentCtrl as payCtrl'
            })
            .state('report', {
                url: '/report',
                templateUrl: 'report.html',
                controller: 'reportCtrl as repCtrl'
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
    app.controller('homeCtrl', function ($http, $window) {
        let homeCtrl = this;
        // console.log(sessionStorage);

        if (sessionStorage.length == 1) {
            window.location.href = "../login/index.html"
        }
        if (sessionStorage.login == "false") {
            window.location.href = "../login/index.html"
        }
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

        $http({
                method: 'GET',
                url: url + 'notification/?id=' + sessionStorage.id
            })
            .then(
                function mySuccess(response) {
                    console.log(response)

                    if (response.data == 'NO') {
                        homeCtrl.notifications = "";
                        $('#notifications--table').hide();
                        $('#no--notifications').html('You have no new notifications.')
                        $('#noti-button').hide();
                    } else {
                        homeCtrl.notifications = response.data;
                    }
                }
            )

        homeCtrl.remove__notification = function () {
            $http({
                    method: 'GET',
                    url: url + 'notification/cancel/?id=' + sessionStorage.id
                })
                .then(
                    function mySuccess(response) {
                        console.log(response);
                        $window.location.reload();
                    }
                )
        }
    })

    app.controller('appointmentCtrl', function ($http, $window) {
        let appCtrl = this;

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        appCtrl.todays_date = yyyy + '-' + mm + '-' + dd;

        var modal = document.getElementById("appointment__myModal");

        var btn = document.getElementById("appointment__myBtn");

        var span = document.getElementsByClassName("appointment__close")[0];

        btn.onclick = function () {
            modal.style.display = "block";
        }

        span.onclick = function () {
            modal.style.display = "none";
            window.location.reload();
        }

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
                window.location.reload();

            }
        }

        // end of the popup



        console.log(appCtrl.todays_date)
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
            appCtrl.date_of_appointment = $('#appointment__date').val();
            appCtrl.time_of_appointment = $('#appointment__time').val();
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
                        $('#appointment__date').html("");
                        $('#appointment__time').html("");
                        appCtrl.problem = "";
                        // $window.location.reload();
                    }
                )
        }
    })

    app.controller('medicalCtrl', function ($http) {
        let medCtrl = this;
        medCtrl.bloodgroups = {
            0: 'A+',
            1: 'A-',
            2: 'B+',
            3: 'AB+',
            4: 'AB-',
            5: 'O+',
            6: 'O-'
        }
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

    app.controller('paymentCtrl', function ($http) {
        let payCtrl = this;
        $http({
                method: 'GET',
                url: url + 'show_fees/?key_id=' + sessionStorage.id
            })
            .then(
                function mysuccess(response) {
                    payCtrl.doctorfees = response.data;
                }
            )

        $http({
                method: 'GET',
                url: url + 'test_cost/?key_id=' + sessionStorage.id
            })
            .then(
                function mySuccess(response) {
                    payCtrl.testfees = response.data;
                }
            )

    })

    app.controller('profileCtrl', function () {
        let profileCtrl = this;
        profileCtrl.name = sessionStorage.name;
        profileCtrl.age = sessionStorage.age;
        profileCtrl.email = sessionStorage.email;
        profileCtrl.gender = sessionStorage.gender;
        profileCtrl.mobile_no = sessionStorage.mobile_no;
    })

    app.controller('reportCtrl', function ($http) {
        let repCtrl = this;
        $http({
                method: 'GET',
                url: url + 'report_date/?key_id=' + sessionStorage.id
            })
            .then(
                function mySuccess(response) {
                    repCtrl.dates = response.data;
                    console.log(repCtrl.dates)
                }
            )
        repCtrl.sendselectedDate = function () {
            $http({
                    method: 'POST',
                    url: url + 'report_details/',
                    data: {
                        'selected_date': repCtrl.selectedDate
                    }
                })
                .then(
                    function mySuccess(response) {
                        repCtrl.report = response.data[0];
                        repCtrl.bp = repCtrl.report.bp;
                        repCtrl.SpO2 = repCtrl.report.SpO2;
                        repCtrl.prescription = repCtrl.report.prescription;
                        repCtrl.message = repCtrl.report.message;
                        console.log(response.data);
                    }
                )
        }
    })

    app.controller('signoutCtrl', function () {
        sessionStorage.clear();
        console.log(sessionStorage)
        window.location.href = "../login/index.html"
    })


})();