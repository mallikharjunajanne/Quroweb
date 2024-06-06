function handleAjax(method, url, data, successCallback, errorCallback) {

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
    $.ajax(ajaxOptions);
}



$(document).ready(function () {

    var Rolename = $('#FAROLENAMESPANID').val().toUpperCase();
    var today = new Date().toISOString().split('T')[0];
    $('#Startdatetxt').val(today);
    //ADMINISTRATOR //TEACHER //ADMIN //Class Teacher //School Admin
   
    if ((Rolename === "CLASS TEACHER" && Rolename !== "TEACHER") || (Rolename !== "CLASS TEACHER" && Rolename === "TEACHER")) {
        $('#Startdatetxt').prop('readonly', true);   
    } else {  
        $('#Startdatetxt').prop('readonly', false);
    }

    Classificationddlbind();
    Slotsddlbind();
});

function Classificationddlbind() {
    $.ajax({
        url: '/Attendance/FastAttendanceClassification',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            //debugger;
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
function Slotsddlbind() {
   // debugger;
    $.ajax({
        url: '/Attendance/FastAttendancegetSlots',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
           // debugger;
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
$('#Ddldepartment').change(function () {
    var selectedValues = $('#Ddldepartment').val();
    //debugger;
    Departmentbysubclassddlbind(selectedValues);
});
function Departmentbysubclassddlbind(Departmentvalue) {
    $.ajax({
        url: '/Attendance/FastAttendancegetSubclass?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            //debugger;
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
function Dateformdatechange(inputDate) {
    var dd = String(inputDate.getDate()).padStart(2, '0'); // Get the day and pad with leading zero if necessary
    var mm = String(inputDate.getMonth() + 1).padStart(2, '0'); // Get the month and pad with leading zero if necessary
    var yyyy = inputDate.getFullYear(); // Get the year

    // Create the formatted date string in "dd/mm/yyyy" format
    var formattedDate = dd + '/' + mm + '/' + yyyy;

    return formattedDate;
}
function validateDate() {
    $('#ErrorMessage').text('');
    var startDate = new Date(document.getElementById('Startdatetxt').value);
    var endDate = new Date();

    if (startDate > endDate) {       
        window.scrollTo(0, 0);
        $('#ErrorMessage').text('Start date cannot be greater than end date');
        return false;
        //document.getElementById('Startdatetxt').value = ''; // Clear the start date field
    }
    return true;
}

$("#Fastattendanceform").on('submit', function () {
    debugger;
    loaddingimg.css('display', 'none');
    event.preventDefault();
    event.stopImmediatePropagation();
    $("#ErrorMessage").text('');

    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;
        var Subclassnames = $('#DdlSubClass').val();

        if (!validateDate()) {
            $('#ErrorMessage').text('Start date cannot be greater than end date');
            loaddingimg.css('display', 'none');
            return false;
        }
        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            var formData = $('#Fastattendanceform').serialize();
            if (Array.isArray(Subclassnames) && Subclassnames.length > 0) {
                formData += '&InstanceSubClassificationIds=' + encodeURIComponent(Subclassnames.join(','));
                formData += '&Subclassids=' + encodeURIComponent(Subclassnames.join(','));               
            }
            else {               
                formData += '&InstanceSubClassificationIds=' + encodeURIComponent(Subclassnames);
                formData += '&Subclassids=' + encodeURIComponent(Subclassnames);                
            }
      
            handleAjax('GET', '/Attendance/Get_FastAttendance_Table', formData,
                function (resp) {         
                  
                    //debugger;
                    if (resp.returnmessage == "0") {                       
                        $('#Divcontent').empty();
                        var selectedOptions = $('#DdlSubClass option:selected');
                        var subClassId = resp.subClassid;
                        if (selectedOptions.filter('[value="' + subClassId + '"]').length > 0) {
                            var subclasstext = selectedOptions.filter('[value="' + subClassId + '"]').text();
                            $("#ErrorMessage").text("you cannot select the start date less than Effective Date for " + subclasstext);
                            loaddingimg.css('display', 'none');
                        }
                    }
                    else if (resp.returnmessage == "1") {
                        return;
                        loaddingimg.css('display', 'none');
                    }
                    else {
                        $("#Divcontent").html(resp);
                        loaddingimg.css('display', 'none');
                    }
                },
                function (status, error) {
                    //debugger;
                    console.error("Error fetching data:", error);
                }
            );
        }
    }, 50);
    loaddingimg.css('display', 'block');
});



