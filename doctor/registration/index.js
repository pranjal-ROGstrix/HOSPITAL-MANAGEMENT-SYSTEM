(function () {
    var app = angular.module('app', []);
    app.controller('RegistrationController', function ($http) {
        let registration = this;
        registration.url = window.backend__url+'doctor_login/';
        $http({
            method:'GET',
            url:registration.url+'degree/'
        })
        .then(
            function mySuccess(response) {
                registration.degree = response.data;
                console.log(registration.degree)
            }
        )

        registration.getSpecializations = function () {
            $http({
                method:'GET',
                url:registration.url+'field/?degree='+registration.selectedDegree
            })
            .then(
                function mySuccess(response) {
                    registration.field = response.data
                    // registration.degree = response.data;
                    console.log(registration.field)
                }
            )
        }
        
        $('#form__span__error__name').hide();
        $('#form__span__error__email').hide();
        $('#form__span__error__confirmpassword').hide();

        registration.nameValidation = function () {
            let name = registration.name;
            // console.log(name)
            if (!isNaN(name)) {
                $('#form__span__error__name').html("please enter a valid name");
                $('#form__span__error__name').show();
                $('#form__name').addClass("error__border");
                $('#form__name').focus();
            } else if (name.length < 3 || name.length > 20) {
                $('#form__span__error__name').show();
                $('#form__span__error__name').html("please enter a valid name");
                $('#form__name').focus();
                $('#form__name').addClass('error__border');
                return false;
            } else {
                $('#form__span__error__name').hide();
                $('#form__name').removeClass('error__border')
                $('#form__name').addClass('border-success');
                return true;
            }
        }

        registration.mobileValidation = function () {
            let mobile = registration.number;
            let strmob = $('#mobile').val();
            let len = ('' + mobile).length;
            console.log(strmob)
            if (isNaN(mobile)) {
                $('#form__span__error__mobile').html("please enter a valid mobile");
                $('#form__span__error__mobile').show();
                $('#mobile').addClass("error__border");
                $('#mobile').focus();
            } else if (len != 10) {
                $('#form__span__error__mobile').html("please enter a valid mobile");
                $('#form__span__error__mobile').show();
                $('#mobile').addClass("error__border");
                $('#mobile').focus();
            } else {
                $('#form__span__error__mobile').hide();
                $('#mobile').removeClass('error__border');
                $('#mobile').addClass('border-success');
            }
        }
        
        registration.confirmpasswordValidation = function () {
            let confirmpassword = registration.confirmPassword;
            let password = registration.password;
            if (password != confirmpassword) {
                {
                    $('#form__span__error__confirmpassword').show();
                    $('#form__span__error__confirmpassword').html("PASSWORDS DO NOT MATCH");
                    $('#confirm-password').addClass('error__border');
                    $('#button').prop("disabled", true);
                    return false;
                }
            } else {
                $('#confirm-password').removeClass('error__border');
                $('#confirm-password').addClass('border-success');
                $('#form__span__error__confirmpassword').hide();
                $('#button').prop('disabled', false);
            }
        }
        registration.formSubmit = function () {
            let name = registration.name;
            let email = registration.email;
            let password = registration.password;
            let degree = registration.selectedDegree;
            let field = registration.speciaslizations
            let number = registration.number;
            console.log(registration)
            $http({
                method: 'POST',
                url: registration.url+'signup/',
                data: {
                    'email': email,
                    'name': name,
                    'password': password,
                    'degree': degree,
                    'field': field,
                    'contact_no': number
                }
            })
            .then(
                function mySuccess(response) {
                    formdata = response;
                    console.log(formdata.data)
                    // window.location.href = "../homepage/index.html?b=" + email;
                }
                // function myError(response) {
                //     alert('Wrong Credentials');
                //     login.email = "";
                //     login.password = "";
                // }
            );
        }
    });
})();