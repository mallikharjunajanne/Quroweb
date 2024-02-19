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
    debugger;
    Classificationdropdown();
    Slotsdropdown();
});



//======>>> Classification Dropdown
function Classificationdropdown() {
    //fetchDataAndPopulateDropdown(
    //    '/Attendance/FastAttendanceClassification',         // URL for data fetching
    //    '#Ddldepartment',                                   // Dropdown selector
    //    'value',                                             // Field name for option text
    //    'text',                                             // Field name for option values       
    //    'manageClassification'                              // Response value return class name
    //);
    $.ajax({
        url: '/Attendance/FastAttendanceClassification',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#Ddldepartment';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            //dropdown.empty();
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






//=======>>> Slots Dropdown
function Slotsdropdown() {
    //fetchDataAndPopulateDropdown(
    //    '/Attendance/FastAttendancegetSlots',         // URL for data fetching
    //    '#Ddslots',                                   // Dropdown selector
    //    'slotId',                                             // Field name for option text
    //    'slotName',                                             // Field name for option values
    //    'slotSubjectnames'                              // Response value return class name
    //);
    debugger;
    $.ajax({
        url: '/Attendance/FastAttendancegetSlots',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#Ddslots';
            var dropdown = $(dropdownSelector);
            var valueField = 'slotId';
            var textField = 'slotName';
            //dropdown.empty();
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


function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
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
    //dropdown.empty(); // Clear existing options
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
    var selectedValues = $('#Ddldepartment').val();
    debugger;
    Departmentbysubclassdd(selectedValues);
});


function Departmentbysubclassdd(Departmentvalue) {
    $.ajax({
        url: '/Attendance/FastAttendancegetSubclass?InstanceClassificationId=' + Departmentvalue,
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

function getCurrentDateFormatted() {
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

$("#Fastattendanceform").on('submit', function () {
    event.preventDefault();
    event.stopImmediatePropagation();
    debugger;
    $("#ErrorMessage").text('');

    var StartdateInput = $("#Startdatetxt").val();
    var Startdate = new Date(StartdateInput);
    var formattedCurrentDate = getCurrentDateFormatted();
    var Subclasstext = $('#DdlSubClass option:selected').text();
    if (StartdateInput > formattedCurrentDate) {
        $('#ErrorMessage').text("You cannot select the start date less than Effective Date for " + Subclasstext);

        return;
    } else {
        $('#ErrorMessage').text("");
    }

    setTimeout(function () {

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            var Subclassnames = $('#DdlSubClass').val();

            var formData = $('#Fastattendanceform').serialize();

            var url = "/Attendance/Get_FastAttendance_Table";

            handleAjax('GET', url, formData,
                function (resp) {
                    loaddingimg.css('display', 'none');
              


                    if (resp.returnmessage == "0") {
                        debugger;
                        $('#Fast_Attendance_Table_data').empty();
                        var selectedOptions = $('#DdlSubClass option:selected');
                        var subClassId = resp.subClassid;

                        if (selectedOptions.filter('[value="' + subClassId + '"]').length > 0) {
                            var subclasstext = selectedOptions.filter('[value="' + subClassId + '"]').text();
                            $("#ErrorMessage").text("you cannot select the start date less than Effective Date for " + subclasstext);
                        }
                    } else if (resp.returnmessage == "1") {
                        return;
                    } else {
                        debugger;
                        //$('#Ddldepartment').empty();
                        //$('#Ddslots').empty();
                        $("#Fast_Attendance_Table_data").html(resp);
                    }
                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );

        }
    }, 50);
});
