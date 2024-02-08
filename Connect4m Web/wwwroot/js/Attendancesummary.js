
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

    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/Attendance/AttendanceClassification',     // URL for data fetching
        '#Ddldepartment',                 // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
});

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
        url: '/Attendance/Get_SubClassificationNames?InstanceClassificationId=' + Departmentvalue,
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
});


function Classwisestudentnames(Departmentvalue, SubClassificationId) {
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




$('#Summerydetails').on('submit', function () {
    event.preventDefault();
    event.stopImmediatePropagation();
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            loaddingimg.css('display', 'block');

            var formData = $('#Summerydetails').serialize();

            var url = "/Attendance/Get_Attendance_Summary_Details";

            handleAjax('GET', url, formData,
                function (response) {
                    debugger;
                    $("#Attendance_Summary_Tbl").html(response);
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
