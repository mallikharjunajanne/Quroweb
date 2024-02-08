
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
        '/Attendance/Attendancepostingdepartment',          // URL for data fetching
        '#Ddldepartment',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
    fetchDataAndPopulateDropdown(                           //==== << ** Faculty Dropdown ** >>
        '/Attendance/Facultynamesdd',                        // URL for data fetching
        '#Ddfaculty',                                        // Dropdown selector
        'mentorUserid',                                      // Field name for option text
        'mentorName',                                        // Field name for option values
        'manageClassification'                               // Response value return class name
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
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            loaddingimg.css('display', 'block');

            var formData = $('#Attendancepostingform').serialize();

            var url = "/Attendance/AttendancePosting";

            handleAjax('POST', url, formData,
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


function saveFeeType(event) {
    event.preventDefault();

    if (validateForm()) {

        $('#validation2').text('');
        $('#validationMessage').text('');
        $('#MessageID').text('');

        debugger

        var feeType = document.getElementById("feeType").value;
        var feeTypeStatus = document.querySelector('input[name="FeeTypeStatus"]:checked').value;
        var concedingtypeIds = Array.from(document.getElementById("DT_Values").selectedOptions).map(option => option.value);


        var quantity = document.querySelector('input[name="quantity"]:checked').value;
        var amount = document.getElementById("Amount").value;
        var description = document.getElementById("description").value;

        debugger;

        var formData = {
            FeeType: feeType,
            FeeTypeStatus: feeTypeStatus,
            ConcedingtypeIds: concedingtypeIds,
            Quantity: quantity,
            Amount: amount,
            Description: description
        };


        manageFeeTypesdata(formData);
    }
}

function manageFeeTypesdata(formData) {
    debugger;
    var feeType = document.getElementById("feeType").value;
    $.ajax({
        url: '/FeeSection/ManageFeeTypes',
        method: 'POST',
        data: formData,
        success: function (response) {
            // Handle the response as needed
            debugger;
            console.log(response);
            if (response == "1") {                
                $("#MessageID").text("Record inserted successfully!");           
            }
            else if (response == "2") {
                $("#MessageID").text("Record inserted successfully!");
            }
            else if (response == "0") {

                $("#MessageID").text("Fee Type with Name " + '"' + feeType + '"' + " already exists.");

            } else if (response == response) {

                $('#MessageID').text('Record inserted successfully.');
            }
            else {
                // Handle the case when the record insertion fails
                $("#MessageID").text("Failed to insert the record. Please try again.");
                // Perform any additional error handling or display error messages
            }
        },
        error: function () {
            console.log('Error saving fee type.');
        }
    });
}
