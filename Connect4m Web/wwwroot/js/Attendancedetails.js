function CallToAjax(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}
function handleAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {

    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        contentType: false,
        processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };

    if (hasFileUpload) {
        ajaxOptions.processData = false;
        ajaxOptions.contentType = false;
    }

    $.ajax(ajaxOptions);
}

$(document).ready(function () {

    setTodayDate("StartDateid", "EndDateid");

    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/Attendance/Attendancedetailsdepartment',          // URL for data fetching
        '#Ddldepartment',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
});

function setTodayDate(startDateId, endDateId) {
    debugger;
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;

    document.getElementById(startDateId).value = today;
    document.getElementById(endDateId).value = today;
}

function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    debugger;
    CallToAjax('GET', url,
        function (response) {

            debugger;
            var dataToPopulate = Array.isArray(response) ? response : response[Responsevalues] || [];
            populateDropdown(dataToPopulate, dropdownSelector, valueField, textField);
        },
        function (status, error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        }
    );
}
function populateDropdown(data, dropdownSelector, valueField, textField) {
    var dropdown = $(dropdownSelector);
    debugger;
    dropdown.empty(); // Clear existing options
    dropdown.append($('<option>', {
        value: '',
        text: '---Select---'
    }));
    $.each(data, function (index, item) {
        dropdown.append($('<option>', {
            value: item[valueField],
            text: item[textField]
        }));
    });
}
$('#Ddldepartment').change(function () {
    var ClassificationId = $('#Ddldepartment').val();
    //var SubClassificationId = $('#DdlSubClass').val();
    // var FilterTeachingSubjects = 0;
    debugger;
    Departmentbysubclassdd(ClassificationId);
});

function Departmentbysubclassdd(Departmentvalue) {
    $.ajax({
        url: '/Attendance/AttendancedetailsSubClass?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#DdlSubClass';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}
$('#DdlSubClass').change(function () {
    var ClassificationId = $('#Ddldepartment').val();
    var SubClassificationId = $('#DdlSubClass').val();
    Classwisestudentnames(ClassificationId, SubClassificationId);

    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/Attendance/AttendancedetailsSlot',                // URL for data fetching
        '#Slotddl',                                         // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );

});


function Classwisestudentnames(Departmentvalue, SubClassificationId) {
    debugger;
    $.ajax({
        url: '/Attendance/Classwisestudents?InstanceClassificationId=' + Departmentvalue + "&InstanceSubClassificationId=" + SubClassificationId,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#Studentnamesddl';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}

$('#Attendancedetailsform').on('submit', function () {
    event.preventDefault();
    event.stopImmediatePropagation();
    setTimeout(function () {
        debugger;
        $('#ErrorMessage').text('');
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;
        var radiobuttonvalue = $("input[class='form-check-input']:checked").val();
        var bFlagForDisplay = $("input[name='bFlagForDisplay']:checked").val();
        if (typeof bFlagForDisplay === "undefined") {
            $('#bFlagForDisplayvalidationmessages').text("Display only for is required");
            return;
        } else {
            $('#bFlagForDisplayvalidationmessages').text('');
        }
        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            $('#bFlagForDisplayvalidationmessages').text('');
            loaddingimg.css('display', 'block');
            var formData = $('#Attendancedetailsform').serialize();
            var url = "/Attendance/Get_Attendance_Details_Tbl";

            handleAjax('GET', url, formData,
                function (response) {
                    debugger;
                    if (response == "0") {
                        window.scrollTo(0, 0);
                        $('#ErrorMessage').text('Your search returned 0 records.');                       
                        $("#User_Attendance_Tbl").empty();
                    } else {
                        $("#User_Attendance_Tbl").html(response);                       
                    }
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    debugger;
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                },
                true
            );
        }
    }, 50);
});


function Clearfun(formid) {
    debugger;
    $('#' + formid).find('input, select, textarea').val('');
    $('#' + formid).find('.field-validation-error').html('');
    $('#User_Attendance_Tbl').empty();
}