(function () {
    $('#error__span').hide()
    var backend = window.window.backend__url+'Manager_login/login/';
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
                        if (formdata == 'ok') {
                            // sessionStorage.setItem("key", "value");
                            // window.location.href = "../homepage/index.html"
                        } else {
                            $('#error__span').show()
                            login.email = "";
                            login.password = "";
                        }
                        console.log(formdata);
                        // window.location.href = "../homepage/index.html?b=" + email;
                    },
                    function myError(response) {
                        alert('unable to connect to the server PLEASE TRY AGAIN');

                    }
                );
        }
    })
})()