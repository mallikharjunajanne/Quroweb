﻿// UPDATE && INSERT FUNCTION
$('#NewAdmissionform').submit(function (event) {
    debugger;
    event.preventDefault();
    $('#CommonErrorMessage').text('');
    $('#emailError').text('');

    setTimeout(function () {

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            loaddingimg.css('display', 'block');
            if (!validateDate()) {
                $('#ErrorMessage').text('Date of birth cannot be greater than today date');
                loaddingimg.css('display', 'none');
                return false;
            }

            //var formData = $('#NewAdmissionform').serialize();
            var formData = new FormData($('#NewAdmissionform')[0]);
            var Admissionforclass = $('#ddlAdminssionForClass option:selected').text();
            var CountrySelectedtext = $('#ddlCountry option:selected').text();
            var Stateselectedtext = $("#ddlState option:selected").text();
            var RegistrationUserId = $('#txtRegistrationUserId').val();

            var actionUrl = RegistrationUserId != "" ? "/Admin/QuroAdmissionProcessUpdate" : "/Admin/QuroAdmissionProcess_New";
            var additionalData = {
                AdmissionForClass: Admissionforclass,
                Country: CountrySelectedtext,
                State: Stateselectedtext,
                RegistrationUserId: RegistrationUserId
            };
            debugger;
            var ajaxOptions = {
                url: actionUrl,
                method: 'POST',
                data: new FormData($('#NewAdmissionform')[0]), // Create FormData object directly
                processData: false, // Prevent jQuery from processing the data
                contentType: false, // Prevent jQuery from setting contentType
                success: function (resp) {
                    debugger;
                    if (resp.methodName === "Insert") {
                        if (resp.returnValue === "-2") {
                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text("User already exists.");
                        } else if (resp.returnValue === "1") {
                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text("Data inserted Successfully.");
                        }
                    }
                    else if (resp.methodName === "Update") {
                        if (resp.returnValue > 0) {
                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text('Data Updated Successfully.');
                        } else {

                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text('Something went wrong. Please try again.');
                        }
                    }
                    else {
                        if (resp.methodName === "Insert") {
                            if (resp.returnValue === "-2") {
                                loaddingimg.css('display', 'none');
                                $('#CommonErrorMessage').text("User already exists.");
                            } else if (resp.returnValue === "1") {
                                loaddingimg.css('display', 'none');
                                $('#CommonErrorMessage').text("Data inserted Successfully.");
                            }
                        }
                        else if (resp.methodName === "Update") {
                            if (resp.returnValue > 0) {
                                loaddingimg.css('display', 'none');
                                $('#CommonErrorMessage').text('Data Updated Successfully.');
                            } else {

                                loaddingimg.css('display', 'none');
                                $('#CommonErrorMessage').text('Something went wrong. Please try again.');
                            }
                        }
                    }
                },
                error: function (xhr, status, error) {
                    debugger;
                    loaddingimg.css('display', 'none');
                }
            };

            // Append additional data to the FormData object
            var formData = ajaxOptions.data;
            for (var key in additionalData) {
                formData.append(key, additionalData[key]);
            }

            // Make the AJAX request
            $.ajax(ajaxOptions);
        }
    }, 50);
});

function validateDate() {
    $('#CommonErrorMessage').text('');
    var startDate = new Date(document.getElementById('txtDOB').value);
    var endDate = new Date();

    if (startDate > endDate) {       
        window.scrollTo(0, 0);
        $('#CommonErrorMessage').text('Date of birth cannot be greater than today date');
        return false;
    }
    return true;
}