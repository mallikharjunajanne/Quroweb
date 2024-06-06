
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

$(document).ready(function () {
    debugger;
   
    fetchDataAndPopulateDropdown(                           //==== << ** Faculty Dropdown ** >>
        '/Attendance/Facultynamesdd',                        // URL for data fetching
        '#Ddlfaculty',                                        // Dropdown selector
        'mentorUserid',                                      // Field name for option text
        'mentorName',                                        // Field name for option values
        ' '                               // Response value return class name
    );
});


$("#Postprivousattendancelink").click(function (e) {
    $('#Commonerrormessage').text('');
    e.preventDefault();
    $("#Postingattendancedatedivid").toggle();
    $('#Startdatetxt').val('');
});


$('#Showperiodsbtn').click(function () {
    $('#Commonerrormessage').text('');
    var Startdate = $('#Startdatetxt').val();
    if (Startdate == "") {
        $('#Commonerrormessage').text('Please select Date');
        return false;
    }
    else if (new Date(Startdate) > new Date()) {
        $('#Commonerrormessage').text('Selected date cannot be greater than today.');
        return false; // Prevent form submission or further action
    }
    else {
        DateandfacultybyPeriodsddl();
    }

});

$('#Ddlfaculty').on('change', function () {
    DateandfacultybyPeriodsddl();
});

function DateandfacultybyPeriodsddl() {

    $('#Commonerrormessage').text('');
    loaddingimg.css('display', 'block');
    var Mentor = $('#Ddlfaculty').val();
    var Startdate = $('#Startdatetxt').val();

    if (Mentor == "") {
        $('#Commonerrormessage').text('Please select Mentor.');
        loaddingimg.css('display', 'none');
        return;
    }
    var data = {
        MentorUserid: Mentor,
        StartDate: Startdate,
    };

    handleAjax('POST', '/Attendance/MentorbyPeriodsddl', data,
         
        function (response) {
            try {
                debugger;
                if (response[0].returnvalue == "-1") {
                    $('#Commonerrormessage').text('No Data Exist.');
                    loaddingimg.css('display', 'none');
                }
                else if (response[0].returnvalue == "-2") {
                    $('#Commonerrormessage').text('It is a Holiday.');
                    loaddingimg.css('display', 'none');
                }
                else if (response[0].returnvalue == "-3") {
                    $('#Commonerrormessage').text('It is a Week Holiday.');
                    loaddingimg.css('display', 'none');
                }
                else {
                    debugger;
                    loaddingimg.css('display', 'none');
                    populateDropdown(response, '#Ddlperiods', 'periodId', 'periodName')
                }
            }
            catch (error) {
                console.error('Error in processing response:', error);
                // Handle error, display message, etc.
                loaddingimg.css('display', 'none');
            }
        },
        function (status, error) {
            debugger;
            console.error("Error fetching data:", error);
            loaddingimg.css('display', 'none');
        }
    );
  

}

$('#Ddlperiods').on('change', function () {

    $('#Commonerrormessage').text('');
    debugger;
    var Mentor = $('#Ddlfaculty').val();
    var Startdate = $('#Startdatetxt').val();
    var PeriodId = $('#Ddlperiods').val();
    var data = {
        MentorUserid: Mentor,
        StartDate: Startdate,
        PeriodId: PeriodId,
    };
    handleAjax('POST', '/Attendance/DepartmentClassnamesbyperiod', data,

        function (response) {
            try {
                debugger;
                $('.Departmentclassdata').show();
                $('#Departmentlbl').text(response[0].classificationName);
                $('#Subjectlbl').text(response[0].subject);
            }
            catch (error) {
                console.error('Error in processing response:', error);
                // Handle error, display message, etc.
                loaddingimg.css('display', 'none');
            }
        },
        function (status, error) {
            debugger;
            console.error("Error fetching data:", error);
            loaddingimg.css('display', 'none');
        }
    );
});

$('#Searchbtn').click(function () {

    $('#Commonerrormessage').text('');

    var Mentor = $('#Ddlfaculty').val();
    var Startdate = $('#Startdatetxt').val();
    var PeriodId = $('#Ddlperiods').val();
    var data = {
        MentorUserid: Mentor,
        StartDate: Startdate,
        PeriodId: PeriodId,
    };
    handleAjax('POST', '/Attendance/PostPeriodAttendancetbl', data,

        function (response) {
            try {
                debugger;
                var returnvalues = response.Returnvalues; // Assuming "Returnvalues" is a key in the JSON response
                var holidayName = response.HolidayName; // Assuming "HolidayName" is a key in the JSON response
               // var startDate = response.StartDate; // Assuming "StartDate" is a key in the JSON response
               // var formattedStartDate = startDate.format('dddd, MMMM D, YYYY');
                var startDate = new Date(response.StartDate);
                var formattedStartDate = startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


                if (returnvalues == "0") {
                    $('#Commonerrormessage').text('The Selected date' + '"' + formattedStartDate + '"' + ' is declared as ' + '"' + holidayName + '"' + ' holiday.')
                }
                else if (returnvalues == "-1") {
                    $('#Commonerrormessage').text('You are allowed to post the attendance only for past' + '"' + holidayName + '"' + ' days . To post attendance for selected date ' + '"' + formattedStartDate + '"' + ' please contact Quro 4M administrator.')
                } else {
                    $('#Commonerrormessage').text('');
                }
            }
            catch (error) {
                console.error('Error in processing response:', error);
                // Handle error, display message, etc.
                loaddingimg.css('display', 'none');
            }
        },
        function (status, error) {
            debugger;
            console.error("Error fetching data:", error);
            loaddingimg.css('display', 'none');
        }
    );
});