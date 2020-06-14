(function () {
    var app = angular.module('app', []);
    app.controller('RegistrationController', function ($http) {
        let registration = this;
        $('#form__span__error__name').hide();
        $('#form__span__error__email').hide();
        $('#form__span__error__confirmpassword').hide();

        registration.nameValidation = function () {
            let name = registration.name;
            console.log(name)
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
            let degree = registration.degree;
            $http({
                method: 'POST',
                url: 'http://f040a5cf56fa.ngrok.io/doctor_login/signup/',
                data: {
                    'email': name,
                    'name': name,
                    'password': password,
                    'degree': degree
                }
            })
            .then(
                function mySuccess(response) {
                    formdata = response;
                    console.log(formdata.data.status)
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