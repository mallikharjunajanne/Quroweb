
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
        '/Attendance/attendancedetailsSlots',               // URL for data fetching
        '#Slotddl',                                         // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
});


function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    
    CallToAjax('GET', url,
        function (response) {

            
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
    /* ---****  MONTH WISE AND DATE WISE FUNCTION ***----*/
    ShowFields();
});



/* ---****  MONTH WISE AND DATE WISE FUNCTION ***----*/
function ShowFields() {
    var dateWiseDiv = document.getElementById("DateWise_Id_fields");
    var monthWiseDiv = document.getElementById("MonthWise_Id_fields");
    var dateRadioButton = document.getElementById("defaultRadio1");

    if (dateRadioButton.checked) {
        dateWiseDiv.style.display = "block";
        monthWiseDiv.style.display = "none";
        
    } else {
        dateWiseDiv.style.display = "none";
        monthWiseDiv.style.display = "block";
    }
}



function GetDateFormat(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
}


//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {
        var StartdateInput = $("#StartDateid").val();
        var EnddateInput = $("#EndDateid").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var formattedStartDate = GetDateFormat(Startdate);
        var formattedEndDate = GetDateFormat(Enddate);

        var errorElement = $('.compare');

        if (formattedStartDate != formattedEndDate) {
            if (Enddate >= Startdate) {
                $('#Validationmessage').text(Edate + " must be greater than " + Sdate + ".");
            } else {
                $('#Validationmessage').text("");
            }
        } else {
            $('#Validationmessage').text("");
        }
    }
    catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$("#StartDateid").on("change", function () {DatesCompare("Start Date", "End Date");});
$("#EndDateid").on("change", function () {DatesCompare("Start Date", "End Date");});

//$("#detailsbtn").click(function () {

//    debugger;
//    var detailsformdata = $("#Studentattendancedetailsform").serialize();

//    var selectedValue = $("input[name='RadioSearch']:checked").val();
//    var StDate = $("#StartDateid").val();
//    var EnDate = $("#EndDateid").val();
//    var InstanceSubjectId = $("#Slotddl").val();
//    var Subjectlength = InstanceSubjectId.length;
//    var Ddlmonth = $("#Ddlmonth").val();
//    var today = new Date();
//    if (selectedValue === "0") {
//        // "Dates" radio button is selected

//        if (StDate === '' && EnDate === '') {
//            $("#Validationmessage").text("Please Select Startdate and Enddate");

//        } else if (StDate === '') {
//            $("#Validationmessage").text("Please Select Startdate");

//        } else if (EnDate === '') {
//            $("#Validationmessage").text("Please Select Enddate");

//        } else if (Subjectlength === 0) {
//            $("#Validationmessage").text("Please Select Slot");

//        }

//    }
//    else if (selectedValue === "1") {
//        // "Months" radio button is selected    
//        $("#Validationmessage").text('');
//        if (Ddlmonth == '0') {
//            $("#Validationmessage").text("Please Select Month");
//        }
//        else {
//            debugger;
//            var selectedMonth = document.getElementById('Ddlmonth').value;
//            if (selectedMonth !== '0') {
//                // Get the current year dynamically
//                var currentYear = new Date().getFullYear();

//                // Create a Date object with the selected year and month
//                var selectedDate = new Date(currentYear, parseInt(selectedMonth) - 1, 1);

//                // Get the first day of the month
//                var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
//                debugger;
//                //var startDateString = startDate;
//                var startDateString = dateformatchange(startDate);

//                // Get the last day of the month
//                var endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
//                //var endDateString = endDate;
//                var endDateString = dateformatchange(endDate);

//                // Display or use the start and end dates as needed
//                console.log('Start Date:', startDateString);
//                console.log('End Date:', endDateString);
//            }
//            var StartDates = startDateString;
//            var EndDates = endDateString;


//            $.ajax({
//                url: "/Attendance/GetViewAttendanceDetailstbl",
//                type: "GET",
//                data: detailsformdata,
//                success: function (response) {
//                    $("#Student_Attendance_Details_Tbl").html(response);
//                }
//            });
//        }
//    } else {

//        $.ajax({
//            url: "/Attendance/GetViewAttendanceDetailstbl",
//            type: "GET",
//            data: detailsformdata,
//            success: function (response) {
//                $("#Student_Attendance_Details_Tbl").html(response);
//            }
//        });
//    }
//});


$("#detailsbtn").click(function () {
    debugger;
    var selectedValue = $("input[name='RadioSearch']:checked").val();
    var Ddlmonth = $("#Ddlmonth").val();

    // Function to handle validation and AJAX call
    function handleValidationAndAjax(validationMessage, ajaxUrl, detailsformdata) {
        $("#Validationmessage").text(validationMessage);
        if (!validationMessage) {
            $.ajax({
                url: ajaxUrl,
                type: "GET",
                data: detailsformdata,
                success: function (response) {
                    debugger;
                    $("#Studentattendancedetailstbl").append(response);
                },
                error: function (xhr, status, error) {
                    console.error("AJAX request failed:", status, error);
                    // You can handle the error here, for example, display an error message
                    $("#Studentattendancedetailstbl").html("<p>Error loading data.</p>");
                }
            });
        }
    }

    // "Dates" radio button is selected
    if (selectedValue === "0") {
        if ($("#StartDateid").val() === '' && $("#EndDateid").val() === '') {
            handleValidationAndAjax("Please Select Startdate and Enddate", "");
        } else if ($("#StartDateid").val() === '') {
            handleValidationAndAjax("Please Select Startdate", "");
        } else if ($("#EndDateid").val() === '') {
            handleValidationAndAjax("Please Select Enddate", "");
        } else if ($("#Slotddl").val().length === 0) {
            handleValidationAndAjax("Please Select Slot", "");
        } else {
            var detailsformdata = $("#Studentattendancedetailsform").serialize();

            handleValidationAndAjax("", "/Attendance/GetViewAttendanceDetailstbl", detailsformdata);
        }
    }
    // "Months" radio button is selected
    else if (selectedValue === "1") {
        $("#Validationmessage").text('');
        if (Ddlmonth == '0') {
            handleValidationAndAjax("Please Select Month", "");
        } else if ($("#Slotddl").val().length === 0) {
            handleValidationAndAjax("Please Select Slot", "");
        } else {
            debugger;
            var selectedMonth = document.getElementById('Ddlmonth').value;
            var currentYear = new Date().getFullYear();
            var selectedDate = new Date(currentYear, parseInt(selectedMonth) - 1, 1);
            var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
            var startDateString = dateformatchange(startDate);
            var endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
            var endDateString = dateformatchange(endDate);


            var additionalData = {
                StartDate: startDateString,
                EndDate: endDateString,
                SubjectSlotID: selectedMonth,
            };
            var additionalDataString = $.param(additionalData);
            //detailsformdata += "&" + additionalDataString;


            //detailsformdata += "&StartDate=" + encodeURIComponent(startDateString);
            //detailsformdata += "&EndDate=" + encodeURIComponent(endDateString);
            //detailsformdata = removeDuplicateParams(detailsformdata, "StartDate");
            //detailsformdata = removeDuplicateParams(detailsformdata, "EndDate");
            handleValidationAndAjax("", "/Attendance/GetViewAttendanceDetailstbl", additionalData);
        }
    }


    //var detailsformdata = $("#Studentattendancedetailsform").serialize();
    //    debugger;
    //var detailsformdata = $("#Studentattendancedetailsform").serialize();

    //var selectedValue = $("input[name='RadioSearch']:checked").val();
    //var StDate = $("#StartDateid").val();
    //var EnDate = $("#EndDateid").val();
    //var InstanceSubjectId = $("#Slotddl").val();
    //var Subjectlength = InstanceSubjectId.length;
    //var Ddlmonth = $("#Ddlmonth").val();
    //var today = new Date();
    //if (selectedValue === "0") {
    //    // "Dates" radio button is selected

    //    if (StDate === '' && EnDate === '') {

    //        $("#Validationmessage").text("Please Select Startdate and Enddate");

    //    } else if (StDate === '') {

    //        $("#Validationmessage").text("Please Select Startdate");

    //    } else if (EnDate === '') {

    //        $("#Validationmessage").text("Please Select Enddate");

    //    } else if (Subjectlength === 0) {

    //        $("#Validationmessage").text("Please Select Slot");
    //    } else {

    //        $.ajax({
    //            url: "/Attendance/GetViewAttendanceDetailstbl",
    //            type: "GET",
    //            data: detailsformdata,
    //            success: function (response) {
    //                debugger;
    //                $("#Studentattendancedetailstbl").html(response);
    //            }
    //        });

    //    }
    //} else if (selectedValue === "1") {
    //    // "Months" radio button is selected

    //    $("#Validationmessage").text('');

    //    if (Ddlmonth == '0') {

    //        $("#Validationmessage").text("Please Select Month");

    //    } else {
    //        debugger;
    //        var selectedMonth = document.getElementById('Ddlmonth').value;
    //       /* if (selectedMonth !== '0') {*/
    //            // Get the current year dynamically
    //            var currentYear = new Date().getFullYear();

    //            // Create a Date object with the selected year and month
    //            var selectedDate = new Date(currentYear, parseInt(selectedMonth) - 1, 1);

    //            // Get the first day of the month
    //            var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    //            debugger;
    //            //var startDateString = startDate;
    //            var startDateString = dateformatchange(startDate);

    //            // Get the last day of the month
    //            var endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    //            //var endDateString = endDate;
    //            var endDateString = dateformatchange(endDate);

    //            // Display or use the start and end dates as needed
    //            console.log('Start Date:', startDateString);
    //            console.log('End Date:', endDateString);
    //        //}
    //        debugger;
    //        var StartDates = startDateString;
    //        var EndDates = endDateString;
    //        $.ajax({
    //            url: "/Attendance/GetViewAttendanceDetailstbl",
    //            type: "GET",
    //            data: detailsformdata,
    //            success: function (response) {
    //                $("#Student_Attendance_Details_Tbl").html(response);
    //            }
    //        });

    //    }
    //}

});

//$('#Studentattendancedetailsform').on('submit', function () {
//    debugger;
//    var selectedValue = $("input[name='RadioSearch']:checked").val();
//    var StDate = $("#StartDateid").val();
//    var EnDate = $("#EndDateid").val();
//    var InstanceSubjectId = $("#Slotddl").val();
//    var Subjectlength = InstanceSubjectId.length;
//    var Ddlmonth = $("#Ddlmonth").val();
//    var today = new Date();
//    if (selectedValue === "0") {
//        // "Dates" radio button is selected

//        if (StDate === '' && EnDate === '') {
//            $("#Validationmessage").text("Please Select Startdate and Enddate");

//        } else if (StDate === '') {
//            $("#Validationmessage").text("Please Select Startdate");
           
//        } else if (EnDate === '') {
//            $("#Validationmessage").text("Please Select Enddate");
           
//        } else if (Subjectlength === 0) {
//            $("#Validationmessage").text("Please Select Slot");
          
//        }

//    }
//    else if (selectedValue === "1") {
        
//        $("#Validationmessage").text('');
//        if (Ddlmonth == '0') {
//            $("#Validationmessage").text("Please Select Month");
        
//        }
//        else {
//            debugger;
//            var selectedMonth = document.getElementById('Ddlmonth').value;
//            if (selectedMonth !== '0') {
//                // Get the current year dynamically
//                var currentYear = new Date().getFullYear();

//                // Create a Date object with the selected year and month
//                var selectedDate = new Date(currentYear, parseInt(selectedMonth) - 1, 1);

//                // Get the first day of the month
//                var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
//                debugger;
//               // var startDateString = startDate;
//                var startDateString = dateformatchange(startDate);

//                // Get the last day of the month
//                var endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
//                //var endDateString = endDate;
//                var endDateString = dateformatchange(endDate);

//                // Display or use the start and end dates as needed
//                console.log('Start Date:', startDateString);
//                console.log('End Date:', endDateString);
//            }
//        }


//        var StartDates = startDateString;
//        var EndDates = endDateString;
//        debugger;
//        var St_details_formdata = $("#Studentattendancedetailsform").serialize();
//        debugger;
//        debugger;
//        $.ajax({

//            url: "/Attendance/GetViewAttendanceDetailstbl_",
//            type: "GET",
//            data: St_details_formdata,
//            success: fun2150
//        });
//        function fun2150(resptbl) {
//            debugger;
//            $("#Student_Attendance_Details_Tbl").html(resptbl);
//        }
//    }

//});

function dateformatchange(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd + " " +'00:00:00';
}