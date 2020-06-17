(function () {
    let app = angular.module('app', [])
    app.controller('registrationController', function ($http) {
        let registration = this;
        $('#form__span__error__name').hide();
        $('#form__span__error__email').hide();
        $('#form__span__error__confirmpassword').hide();
        $('#form__span__error__age').hide();

        registration.nameValidation = function () {
            let name = registration.name;
            console.log(name)
            if (!isNaN(name)) {
                $('#form__span__error__name').html("please enter a valid name");
                $('#form__span__error__name').show();
                $('#name').addClass("error__border");
                $('#name').focus();
            } else if (name.length < 3 || name.length > 20) {
                $('#form__span__error__name').show();
                $('#form__span__error__name').html("please enter a valid name");
                $('#form__name').focus();
                $('#form__name').addClass('error__border');
            } else {
                $('#form__span__error__name').hide();
                $('#form__name').removeClass('error__border')
                $('#form__name').addClass('border-success');
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

                }
            } else {
                $('#confirm-password').removeClass('error__border');
                $('#confirm-password').addClass('border-success');
                $('#form__span__error__confirmpassword').hide();
                $('#button').prop('disabled', false);
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

        registration.ageValidate = function () {
            let age = registration.age;
            if (isNaN(age)) {
                $('#form__span__error__age').html("enter a valid age");
                $('#form__span__error__age').html("please enter a valid age");
                $('#form__span__error__age').show();
                $('#age').addClass("error__border");
                $('#age').focus();
            } else if (age > 110) {
                $('#form__span__error__age').html("please enter a valid age");
                $('#form__span__error__age').show();
                $('#age').addClass("error__border");
                $('#age').focus();
            } else {
                $('#form__span__error__age').hide();
                $('#age').removeClass('error__border');
                $('#age').addClass('border-success');
            }
        }
        registration.formSubmit = function () {
            let url = window.backend__url + "patient_login/signup/";
            let name = registration.name;
            let email = registration.email;
            let password = registration.password;
            let gender = registration.gender;
            let number = registration.number;
            let age = registration.age;
            $http({
                    method: 'POST',
                    url: url,
                    data: {
                        'email': email,
                        'name': name,
                        'password': password,
                        'gender': gender,
                        'contact_no': number,
                        'age': age
                    }
                })
                .then(
                    function mySuccess(response) {
                        formdata = response;
                        console.log(formdata)
                        window.location.href = "../login/index.html"
                        // window.location.href = "../homepage/index.html?b=" + email;
                    }
                    // function myError(response) {
                    //     alert('Wrong Credentials');
                    //     login.email = "";
                    //     login.password = "";
                    // }
                );
        }
    })
})();