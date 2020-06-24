(function () {
    $('#error__span').hide()
    var backend = window.window.backend__url + 'doctor_login/login/';
    var app = angular.module('app', []);
    app.controller('loginController', function ($http) {
        var login = this;
        login.myFunction = function () {
            login.found = "";
            let email = login.email;
            let pass = login.password;
            console.log(email, pass)
            $http({
                    method: "POST",
                    url: backend,
                    data: {
                        'email': email,
                        'password': pass,
                    }
                })
                .then(
                    function mySuccess(response) {
                        formdata = response.data;
                        if (formdata == 'invalid credentials') {
                            $('#error__span').show()
                            login.email = "";
                            login.password = "";
                        } else {
                            sessionStorage.name = formdata[0].name;
                            sessionStorage.email = formdata[0].email;
                            sessionStorage.mobile_no = formdata[0].mobile_no;
                            sessionStorage.doctor_degree = formdata[0].doctor_degree;
                            sessionStorage.field = formdata[0].field;
                            console.log(sessionStorage)
                            window.location.href = "../homepage/index.html"
                        }

                    },
                    function myError(response) {
                        alert('unable to connect to the server PLEASE TRY AGAIN');

                    }
                );
        }
    })
})()