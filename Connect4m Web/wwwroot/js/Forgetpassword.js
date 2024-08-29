function DataCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

var loaddingimg = $('#loading');
$(document).ready(function () {
    debugger;
});

$('#Mobilenumbertxt').on('input', function () {
    // Allow only numeric input and enforce maxlength
    var value = $(this).val();
    $(this).val(value.replace(/[^0-9]/g, '').slice(0, 10));
});



$("#Forgetpasswordform").submit(function (event) {
    debugger;

    loaddingimg.css('display', 'block');
    event.preventDefault();
    var UserName = $('#Useridtxt').val();
    var Mobilenumber = $('#Mobilenumbertxt').val();
    var formdata_CSA = $(this).serialize();
    $('#Mobilenumbervalidationspid').text("");
    $('#fperrormessage').text("");
    var formElement = document.getElementById('Forgetpasswordform');
    setTimeout(function () {
        debugger;
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationmelength = validationMessages.length;

        if (Mobilenumber == "") {
            formElement.getElementsByClassName('field-validation-error');
            $('#Mobilenumbervalidationspid').text("The Mobile number field is required.");
            return false;
        }

        if (validationmelength == 0) {
            
            loaddingimg.css('display', 'none');
            //DataCallToAjax('POST', '/Attendance/GetForgetPassworddetails', formdata_CSA,
                DataCallToAjax('GET', '/Attendance/GetForgetPassworddetails', formdata_CSA,
                function (response) {
                    debugger;
                    var Errormessage = "";
                    if (response == "1") {
                          Errormessage = "More than one Records Exists with the same Details. Please contact administrator";
                    }
                    else if (response == "2") {
                        Errormessage = "User Name or Email doesn't exists.";
                        //Errormessage = "Please enter correct Details";
                    }
                    else if (response == "3") {
                        Errormessage = "Students cannot change password. Contact your respective Class-In-Charge.";
                    }
                    else if (response == "0") {
                        Errormessage = "An unexpected error occurred. Please try again.";
                    }
                    else {
                        $('#Divcontainer').hide();
                        $('#Divcontainer1').html(response);
                    }
                    $('#Commonfperrormessage').text(Errormessage);
                },
                function (status, error) {
                    debugger;
                    // Handle errors in the AJAX call
                    console.error('Error:', status, error);
                    $('#Commonfperrormessage').text('An error occurred while processing your request. Please try again later.');
                },
                false
            );
        }
        else {
            $('.alert-danger p').text("Please Enter a All Required Fields.");
            $(".alert-danger").show().delay(5000).fadeOut();
            loaddingimg.css('display', 'none');
        }
    }, 50);
    loaddingimg.css('display', 'none');
})

function Forgetpsdclearfun(formid) {
    var form = document.getElementById(formid);

    if (form) {
        // Use the reset method to clear the form
        form.reset();
        $('#Mobilenumbervalidationspid').text('');
        $('#Commonfperrormessage').text('');
        // Clear ASP.NET Core validation messages
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });

    } else {
        console.error("Form with id '" + formid + "' not found.");
    }
}


$("#Formforgetpassword").submit(function (event) {
    debugger;

    loaddingimg.css('display', 'block');
    event.preventDefault();

    var UserName = $('#StudentUsertxtid').val();
    var Mobilenumber = $('#Mobilenumbertxtid').val();
    var Portalemail = $('#Portalemailtxtid').val();
    var Username = $('#Usernametxtid').val();
    var FirstName = $('#FirstNametxtid').val();
    var SendSMS = $('#SendSMStxtid').val();
    var RoleName = $('#RoleNametxtid').val();
    var SubDomineName = $('#SubDomineNametxtid').val();
    var Instanceid = $('#InstanceIDtxtid').val();
    var Password = $('#Passwordtxt').val();
    var ConfirmPassword = $('#ConfirmPasswordtxt').val();
    if (Password == ConfirmPassword) {
        var formdata_CSA = $(this).serialize();
        $('#fperrormessage').text("");
        var formElement = document.getElementById('Formforgetpassword');
        setTimeout(function () {
            debugger;
            var validationMessages = formElement.getElementsByClassName('field-validation-error');
            var validationmelength = validationMessages.length;
            if (validationmelength == 0) {
                DataCallToAjax('POST', '/Attendance/GetForgetPassworddetails', formdata_CSA,
                    function (response) {
                        debugger;
                        var Errormessage = null;
                        if (response == "0") {
                            Errormessage = 'Please enter required field';
                        } else if (response == "1") {
                            Errormessage = 'Password Changed Sucessfully';
                        } else {

                        }
                        loaddingimg.css('display', 'none');
                        $('#fperrormessage').text(Errormessage);

                        //if (response == "1") {
                        //    //if (response == "1") {
                        //    //    $('#fperrormessage').text("Password Changed Sucessfully.SMS Successfully Sent To User.");
                        //    //}
                        //    $('#fperrormessage').text('Password Changed Sucessfully');
                        //    //$('#fperrormessage').text('Notice Posted Successfully.SMS Successfully Sent To User(s).');
                        //} 
                        ////else if (response = "-1") {
                        ////    $('#fperrormessage').text('');
                        ////} else {
                        ////    $('#fperrormessage').text('');
                        ////    $('#fperrormessage').text('SMS Sending Failed. Please try again');
                        ////}                  
                    },
                    function (status, error) {
                        debugger;
                        // Handle errors in the AJAX call
                        console.error('Error:', status, error);
                        $('#fperrormessage').text('An error occurred while processing your request. Please try again later.');
                    },
                    false
                );
            }
            else {
                $('.alert-danger p').text("Please Enter a All Required Fields.");
                $(".alert-danger").show().delay(5000).fadeOut();
                loaddingimg.css('display', 'none');
            }
        }, 50);
    }
    else {        
        loaddingimg.css('display', 'none');
        return false;
    }
    loaddingimg.css('display', 'none');
})


function Fgclearfun(formid) {
    var form = document.getElementById(formid);

    if (form) {
        // Use the reset method to clear the form
        form.reset();
        //$('#Mobilenumbervalidationspid').text('');
        $('#fperrormessage').text('');
        // Clear ASP.NET Core validation messages
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });

    } else {
        console.error("Form with id '" + formid + "' not found.");
    }
}