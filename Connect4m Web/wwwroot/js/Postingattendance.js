
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
function handleAjax(method, url, data, successCallback, errorCallback) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        //contentType: false,
        //processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };
    $.ajax(ajaxOptions);
}
$(document).ready(function () {
    debugger;
    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/Attendance/Attendancepostingdepartment',          // URL for data fetching
        '#Ddldepartment',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        ' '                              // Response value return class name
    );
    fetchDataAndPopulateDropdown(                           //==== << ** Faculty Dropdown ** >>
        '/Attendance/Facultynamesdd',                        // URL for data fetching
        '#Ddfaculty',                                        // Dropdown selector
        'mentorUserid',                                      // Field name for option text
        'mentorName',                                        // Field name for option values
        ' '                               // Response value return class name
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
        url: '/Attendance/AttendancepostingdepartmentbySubclass?InstanceClassificationId=' + Departmentvalue,
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

    Classwiseslots(ClassificationId, SubClassificationId);
});
function Classwiseslots(Departmentvalue, SubClassificationId) {
    $.ajax({
        url: '/Attendance/Attendancepostingdepartmentbyslot?InstanceClassificationId=' + Departmentvalue + "&InstanceSubClassificationId=" + SubClassificationId,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#Ddslotsid';
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


$('#Attendancepostingform').on('submit', function () {
    event.preventDefault();
    event.stopImmediatePropagation();

    $('#ErrorMessage').text('');
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;
        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            var formData = $('#Attendancepostingform').serialize();
            handleAjax('POST', '/Attendance/AttendancePosting_Tbl', formData,
                function (response) {
                    debugger;
                    $("#Appendingdivcontainer").html(response);
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    debugger;
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                }
            );
        }
    }, 50);
});
