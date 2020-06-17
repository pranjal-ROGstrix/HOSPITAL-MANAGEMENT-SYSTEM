(function () {
    let url = window.backend__url;
    let app = angular.module('app', ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/root')
        $stateProvider
            .state('root', {
                url: '/root',
                templateUrl: 'home.html',
                controller: 'homeCtrl as homeCtrl'
            })
            .state('pending__doctors', {
                url: '/pending__doctors',
                templateUrl: 'pending__doctors.html',
                controller: 'pending__doctorsCtrl as pendocCtrl'
            })
            .state('doctors__accepted', {
                url: '/doctors__accepted',
                templateUrl: 'doctor__accepted.html',
                controller: 'doctors__acceptedCtrl as accdocCtrl'
            })
            .state('doctors__rejected', {
                url: '/doctors__rejected',
                templateUrl: 'doctor__rejected.html',
                controller: 'doctors__rejectedCtrl as rejdocCtrl'
            })
            .state('patient__registered', {
                url: '/patient__registered',
                templateUrl: 'patient __registered.html',
                controller: 'patregCtrl as patregCtrl'
            })
            .state('appointment', {
                url: '/appointment',
                templateUrl: 'appointment.html',
                controller: 'appointmentCtrl as appCtrl'
            })
            .state('payment', {
                url: '/payment',
                templateUrl: 'payment.html',
                // controller:'paymentCtrl as payCtrl'
            })
            .state('report', {
                url: '/report',
                templateUrl: 'report.html',
                // controller:'reportCtrl as repCtrl'
            })
            .state('logout', {
                url: '/logout',
                template: 'You are being logged out...',
                controller: 'logoutCtrl'
            })
    })
    app.controller('homeCtrl', function ($http) {
        if (sessionStorage.length == 1) {
            window.location.href = '../login/index.html';
        }
    })

    app.controller('pending__doctorsCtrl', function ($http, $window) {
        let pendocCtrl = this;
        pendocCtrl.url = url + 'Manager_login/doctor_registration';

        // pendocCtrl.showDoctors = function () {
        $http({
                method: 'GET',
                url: pendocCtrl.url
            })
            .then(
                function mySuccess(response) {
                    pendocCtrl.doctors = response.data;
                    console.log(pendocCtrl.doctors)
                }
            )
        // }
        pendocCtrl.accept = function (a) {
            console.log(a.id)
            $http({
                    method: 'POST',
                    url: pendocCtrl.url + '/accept/',
                    data: {
                        'id': a.id
                    }
                })
                .then(
                    function mySuccess(response) {
                        console.log(response)
                        if (response.data == "successfull") {
                            console.log(response)
                            $window.location.reload();

                        }

                    }
                )
        }
        pendocCtrl.reject = function (a) {
            $http({
                    method: 'POST',
                    url: pendocCtrl.url + '/reject/',
                    data: {
                        'id': a.id
                    }
                })
                .then(
                    function mySuccess(response) {

                        if (response.data == "successfull") {
                            console.log(response)
                            window.location.reload();
                        }


                    }
                )
        }
    })

    app.controller('doctors__acceptedCtrl', function ($http) {
        let accdocCtrl = this;
        accdocCtrl.url = url + 'Manager_login/doctor_registration/accept/list';
        $http({
                method: 'GET',
                url: accdocCtrl.url
            })
            .then(
                function mySuccess(response) {
                    accdocCtrl.accepted = response.data;
                }
            )
    })

    app.controller('doctors__rejectedCtrl', function ($http) {
        let rejdocCtrl = this;
        rejdocCtrl.url = url + 'Manager_login/doctor_registration/reject/list';
        $http({
                method: 'GET',
                url: rejdocCtrl.url
            })
            .then(
                function mySuccess(response) {
                    rejdocCtrl.rejected = response.data;
                }
            )
    })

    app.controller('patregCtrl', function ($http) {
        let patregCtrl = this;
        patregCtrl.url = url + 'Manager_dashboard/show_details/';

        $http({
                method: 'GET',
                url: patregCtrl.url
            })
            .then(
                function mySuccess(response) {
                    patregCtrl.patients_registered = response.data;
                    console.log(patregCtrl.patients_registered)
                }
            )
    })

    app.controller('appointmentCtrl', function ($http, $window) {
        let appCtrl = this;
        appCtrl.url = url;
        // Pending Appointment patient list dropdown generator
        $http({
                method: 'GET',
                url: appCtrl.url + 'Manager_dashboard/show_appointment/'
            })
            .then(
                function mySuccess(response) {
                    appCtrl.appointments__pending = response.data;
                    console.log(appCtrl.appointments__pending)
                }
            )

        //  Select degree of doctor Dropdown

        $http({
                method: 'GET',
                url: appCtrl.url + 'doctor_login/degree/'
            })
            .then(
                function mySuccess(response) {
                    appCtrl.degree = response.data;
                    console.log(appCtrl.degree)
                }
            )

        // select the patient to show details table

        appCtrl.details = function (a) {
            $http({
                    method: 'POST',
                    url: appCtrl.url + 'Manager_dashboard/show_appointment/id/',
                    data: {
                        'id': appCtrl.id
                    }
                })
                .then(
                    function mySuccess(response) {
                        appCtrl.patient_list = response.data[0];
                        console.log(appCtrl.patient_list)
                    }
                )
        }


        // Select doctors specializations Dropdown
        appCtrl.getSpecializations = function () {
            $http({
                    method: 'GET',
                    url: appCtrl.url + 'doctor_login/field/?degree=' + appCtrl.selectedDegree
                })
                .then(
                    function mySuccess(response) {
                        appCtrl.field = response.data
                        // appCtrl.degree = response.data;
                        console.log(appCtrl.field)
                    }
                )
        }
        // Select the doctor Dropdown
        appCtrl.getDoctor = function () {
            $http({
                    method: 'GET',
                    url: appCtrl.url + 'Manager_dashboard/field/doctor_list/?field=' + appCtrl.speciaslizations,
                })
                .then(
                    function mySuccess(response) {
                        appCtrl.doctorList = response.data;
                        console.log(appCtrl.doctorList)
                    }
                )
        }

        appCtrl.forward = function () {
            console.log(appCtrl.id, appCtrl.speciaslizations, appCtrl.selectedDoctor)
            $http({
                    method: 'POST',
                    url: appCtrl.url + 'Manager_dashboard/appointment_forward/',
                    data: {
                        'id': appCtrl.id,
                        'name': appCtrl.selectedDoctor,
                        'field': appCtrl.speciaslizations,
                    }
                })
                .then(
                    function mySuccess(response) {
                        console.log(response)
                    }
                )
        }

        appCtrl.reject = function () {
            console.log(appCtrl.id, appCtrl.message)
            $http({
                    method: 'POST',
                    url: appCtrl.url + 'Manager_dashboard/appointment_reject/',
                    data: {
                        'id': appCtrl.id,
                        'message': appCtrl.message
                    }
                })
                .then(
                    function mySuccess(response) {
                        console.log(response)
                        // appCtrl.error_message = response.data;
                        if (response.data == "Fill the message field") {
                            appCtrl.error_message = response.data;
                            alert(appCtrl.error_message)
                            $window.location.reload();
                        }
                    }
                )

        }






        // }
        // appCtrl.forward = function (a) {
        //     console.log(a.id)
        //     $http({
        //             method: 'POST',
        //             url: appCtrl.url + '/forward/',
        //             data: {
        //                 'id': a.id
        //             }
        //         })
        //         .then(
        //             function mySuccess(response) {
        //                 console.log(response)
        //                 if (response.data == "successfull") {
        //                     console.log(response)
        //                     $window.location.reload();
        //                 }
        //             }
        //         )
        // }
        // appCtrl.reject = function (a) {
        //     $http({
        //             method: 'POST',
        //             url: appCtrl.url + '/reject/',
        //             data: {
        //                 'id': a.id
        //             }
        //         })
        //         .then(
        //             function mySuccess(response) {

        //                 if (response.data == "successfull") {
        //                     console.log(response)
        //                     window.location.reload();
        //                 }
        //             }
        //         )
        // }
    })

    app.controller('logoutCtrl', function () {
        sessionStorage.clear();
        console.log(sessionStorage)
        window.location.href = "../login/index.html"

    })

})();