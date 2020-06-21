(function () {
    let url = window.backend__url + 'doctor_dashboard/';
    let app = angular.module('app', ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/root')
        $stateProvider
            .state('root', {
                url: '/root',
                templateUrl: 'home.html',
                controller: 'homeCtrl as homeCtrl'
            })
            .state('appointment', {
                url: '/appointments',
                templateUrl: 'appointment.html',
                controller: 'appointmentCtrl as appCtrl'
            })
            .state('confirmedAppointment', {
                url: '/confirmedAppointment',
                templateUrl: 'confirmedappointments.html',
                controller: 'confirmedAppointmentsCtrl as appconCtrl'
            })
            .state('patient', {
                url: '/patient',
                templateUrl: 'patient.html',
                controller: 'patientCtrl as patientCtrl'
            })
            .state('report', {
                url: "/report",
                templateUrl: 'report.html',
                controller: 'reportCtrl as reportCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'profile.html',
                controller: 'profileCtrl as profileCtrl'
            })
            .state('signout', {
                url: '/signout',
                template: 'you are being logged out',
                controller: 'signoutCtrl'
            })


    })

    // home controller Starts here 

    app.controller('homeCtrl', function ($http) {
        if (sessionStorage.length == 1) {
            window.location.href = "../login/index.html"
        }
        let homeCtrl = this;

    })
    // Appointment Controller starts here

    app.controller('appointmentCtrl', function ($http, $window) {

        // for hide and show of the reject and modify data at time of confirming appointment

        $('#reject__hideme').hide();
        $('#modify_data').hide();
        $('#reject_button').click(function () {
            $('#modify_data').hide();
            $('#reject__hideme').toggle();
        })

        $('#modify_button').click(function () {
            $('#reject__hideme').hide();
            $('#modify_data').toggle();
        })
        let appCtrl = this;
        appCtrl.url = url;

        //list of patients who have booked appointment

        $http({
                method: 'POST',
                url: appCtrl.url + "appointment/",
                data: {
                    'name': sessionStorage.name
                }
            })
            .then(
                function mySuccess(response) {
                    console.log(response.data)
                    if (response.data == "You have no appointments") {
                        appCtrl.patient_list = "";
                        alert("You have no new appointments")
                    } else {
                        appCtrl.patient_list = response.data;
                        console.log(response.data)
                    }

                }
            )

        // this is to get patient details

        appCtrl.patientDetails = function () {
            $http({
                    method: 'POST',
                    url: appCtrl.url + "appointment/details/",
                    data: {
                        'id': appCtrl.selsectedPatient
                    }
                })
                .then(
                    function mySuccess(response) {
                        let patientdetails = response.data[0];
                        console.log(patientdetails)
                        appCtrl.id = patientdetails.id
                        appCtrl.patientDetailsdata_booking_date = patientdetails.booking_date;
                        appCtrl.patientDetailsdata_date_of_appointment = patientdetails.date_of_appointment;
                        appCtrl.patientDetailsdata_name = patientdetails.key__name;
                        appCtrl.patientDetailsdata_problem = patientdetails.problem;
                        appCtrl.patientDetailsdata_time_of_appointment = patientdetails.time_of_appointment;
                    }
                )
        }

        appCtrl.accept = function () {
            $http({
                    method: 'POST',
                    url: appCtrl.url + 'appointment/accept/',
                    data: {
                        'id': appCtrl.id
                    }
                })
                .then(
                    function mySuccess(response) {
                        console.log(response)
                        alert("Appointment Accepted")
                        $window.location.reload();
                    }
                )
        }

        appCtrl.submitrejectionMessage = function () {
            console.log(appCtrl.rejecttion_message)
            $http({
                    method: 'POST',
                    url: window.backend__url + 'Manager_dashboard/appointment_reject/',
                    data: {
                        'id': appCtrl.id,
                        'message': appCtrl.rejecttion_message
                    }
                })
                .then(
                    function mySuccess(response) {
                        if (response.data == "Fill the message field") {
                            alert(response.data)
                        } else {
                            alert(response.data)
                            $window.location.reload();
                        }
                    }
                )
        }

        appCtrl.submitModified = function () {
            appCtrl.modified_time = $('#modifiedtime').val();
            appCtrl.modified_date = $('#modifieddate').val();
            console.log(appCtrl.modified_time, appCtrl.modified_date)
            $http({
                    method: 'POST',
                    url: appCtrl.url + "appointment/modify/",
                    data: {
                        'id': appCtrl.id,
                        'time': appCtrl.modified_time,
                        'date': appCtrl.modified_date
                    }
                })
                .then(
                    function mySuccess(response) {
                        console.log(response.data)
                    }
                )
        }
    })

    app.controller('confirmedAppointmentsCtrl', function ($http, $location, factory) {
        let appconCtrl = this;
        $http({
                method: 'POST',
                url: url + 'appointment/confirm_list/',
                data: {
                    'name': sessionStorage.name
                }
            })
            .then(
                function mySuccess(response) {
                    appconCtrl.confirmedAppointments = response.data;
                }
            )

        //function to get details of selected patient and store thenm in factory 

        appconCtrl.makereport = function (selectedPatient) {
            factory.selectedPatient = selectedPatient;
            console.log(factory.selectedPatient)
            $location.path('/report')
        }
    })

    app.controller('reportCtrl', function ($http, factory, $location) {
        console.log(factory)
        if (angular.equals(factory, {})) {
            $location.path('/confirmedAppointment')
        }
        let reportCtrl = this;
        $http({
                method: 'POST',
                url: url + 'medical_history/',
                data: {
                    'key_id': factory.selectedPatient.key_id
                }
            })
            .then(
                function mySuccess(response) {
                    reportCtrl.patient_medicalhistory = response.data[0];
                    console.log(reportCtrl.patient_medicalhistory)
                    reportCtrl.blood_group = reportCtrl.patient_medicalhistory.blood_group;
                    reportCtrl.weight = reportCtrl.patient_medicalhistory.weight;
                    reportCtrl.height = reportCtrl.patient_medicalhistory.height;
                    reportCtrl.previous_problem = reportCtrl.patient_medicalhistory.previous_problem;
                }
            )

        reportCtrl.key__name = factory.selectedPatient.key__name;
        reportCtrl.problem = factory.selectedPatient.problem;
        reportCtrl.booking_date = factory.selectedPatient.booking_date;
        reportCtrl.date_of_appointment = factory.selectedPatient.date_of_appointment;
        reportCtrl.time_of_appointment = factory.selectedPatient.time_of_appointment;


        reportCtrl.submitreport = function () {
            $http({
                    method: 'POST',
                    url: url + 'report/',
                    data: {
                        'id': factory.selectedPatient.id,
                        'bp': reportCtrl.bp,
                        'SpO2': reportCtrl.SpO2,
                        'prescription': reportCtrl.prescription,
                        'message': reportCtrl.test
                    }
                })
                .then(
                    function mySuccess(response) {
                        reportCtrl.message = response.data;
                        console.log(response.data)
                    }
                )
        }
    })

    app.controller('patientCtrl', function ($http) {
        // let patientCtrl = this;
        // $http({
        //     method:'GET',
        //     url:url+'count/'
        // })
        // .then(
        //     function mySuccess(response) {
        //         console.log(response)
        //         patientCtrl.returndata = response.data;
        //     }
        // )
    })


    // profile contrller starts here

    app.controller('profileCtrl', function ($http) {
        let profileCtrl = this;
        profileCtrl.name = sessionStorage.name;
        profileCtrl.degree = sessionStorage.doctor_degree;
        profileCtrl.email = sessionStorage.email;
        profileCtrl.field = sessionStorage.field;
        profileCtrl.mobile_no = sessionStorage.mobile_no;
    })


    app.controller('signoutCtrl', function () {
        sessionStorage.clear();
        window.location.href = "../login/index.html"
    })




    // this factory stores id of the selected patient to share data between confirmedAppointmentsCtrl and reportCtrl
    app.factory('factory', function () {
        return {};
    });
})();