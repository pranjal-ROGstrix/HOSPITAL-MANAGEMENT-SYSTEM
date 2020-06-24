(function () {
    let app = angular.module('app', [])
    app.controller('loginController', function ($http) {
        let login = this;
        $('#login__error').hide();
        login.formSubmit = function () {
            let email = login.email;
            let password = login.password;
            let url =  window.backend__url+"patient_login/login/"
            $http({
                    method: 'POST',
                    url: url,
                    data: {
                        'email': email,
                        'password': password,
                    }
                })
                .then(
                    function mySuccess(response) {
                        formdata = response;
                        console.log(formdata)
                        if (formdata.data == "invalid credentials") {
                            sessionStorage.setItem("login", "unsuccessful");
                            login.error = response.data;
                            $('#login__error').show();
                            email = "";
                            password = "";
                            $('#email').on("focus", function () {
                                $('#login__error').hide();
                            });

                        } else {
                            console.log(formdata.data[0].age)
                            sessionStorage.setItem("id", formdata.data[0].id);
                            sessionStorage.setItem("login", "success");
                            sessionStorage.setItem("email", email);
                            sessionStorage.setItem('age', formdata.data[0].age)
                            sessionStorage.setItem('gender', formdata.data[0].gender)
                            sessionStorage.setItem('password', formdata.data[0].password)
                            sessionStorage.setItem('mobile_no', formdata.data[0].mobile_no)
                            sessionStorage.setItem('name', formdata.data[0].name)
                            window.location.href = "../homepage/index.html"
                            // age: "18"
                            // email: "pranjal@pranjal"
                            // gender: "male"
                            // id: 1
                            // mobile_no: "9123456789"
                            // name: "Pranjal Maurya"
                            // password: "pranjal"

                            // if ($('#email').focus()) {
                            //     $('#login__error').hide();

                        }

                    }
                );
        }
    })
})();