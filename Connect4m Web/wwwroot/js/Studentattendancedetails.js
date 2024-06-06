

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

    //fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
    //    '/Attendance/attendancedetailsSlots',               // URL for data fetching
    //    '#Slotddl',                                         // Dropdown selector
    //    'value',                                            // Field name for option text
    //    'text',                                             // Field name for option values
    //    'manageClassification'                              // Response value return class name
    //);
});


//function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    
//    CallToAjax('GET', url,
//        function (response) {

            
//            var dataToPopulate = Array.isArray(response) ? response : response[Responsevalues] || [];
//            populateDropdown(dataToPopulate, dropdownSelector, valueField, textField);
//        },
//        function (status, error) {
//            // Handle errors here
//            console.error("Error fetching data:", error);
//        }
//    );
//}

//function populateDropdown(data, dropdownSelector, valueField, textField) {
//    var dropdown = $(dropdownSelector);
    
//    dropdown.empty(); // Clear existing options
//    dropdown.append($('<option>', {
//        value: '',
//        text: '---Select---'
//    }));
//    $.each(data, function (index, item) {
//        dropdown.append($('<option>', {
//            value: item[valueField],
//            text: item[textField]
//        }));
//    });
//}




$(document).ready(function () {


});



/* ---****  MONTH WISE AND DATE WISE FUNCTION ***----*/
function ShowFields() {
    var dateWiseDiv = document.getElementById("Datewisecontent");
    var monthWiseDiv = document.getElementById("Monthwisecontent");
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



//const feeType = document.getElementById("Feetypetxt").value;
//const feeTypeStatus = document.querySelector('input[name="Feetypestatus"]:checked')?.value;

//const quantity = document.querySelector('input[name="Qunatityradio"]:checked')?.value;
//const amount = document.getElementById("Amounttxt").value;
//var description = document.getElementById("descriptiontxt").value;

//var formData = {
//    FeeType: feeType,
//    Feetypestatus: feeTypeStatus,
//    ConcedingtypeIds: concedingtypeIds,
//    Quantity: quantity,
//    Amount: amount,
//    Description: description
//};

//CallToAjax('POST', "/FeeSection/Insert_feetype", formData,
//    function (resp) {
//        const errorMessages = {
//            "0": 'Fee Type with Name ' + feeType + ' already exists.',
//            "-2": 'One FeeType with Fee Backlog is Already set to Current Academic Year,You cannot Create Fee Type with Fee BackLog.',
//            "-4": 'Fee Type with Receipt Code ' + 'Your Receipt Code' + ' already exists.'
//        };
//        $('#Commonerrormessage').text(errorMessages[resp] || 'Record inserted successfully');
//        loaddingimg.css('display', 'none');
//    },
//    function (status, error) {
//        loaddingimg.css('display', 'none');
//    },
//);
$("#detailsbtn").click(function () {
    debugger;
    $('#resultcountmessage').text('');
    $('#Studentattendancedetailstbl').empty();
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
                    if (response != 0) {
                        $("#Studentattendancedetailstbl").append(response);
                    } else {
                        $('#resultcountmessage').text('No Records Found 0');
                    }
                    
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

        

            var Slotselectedvalue = $('#Slotddl').val();
            var additionalData = {
                StartDate: startDateString,
                EndDate: endDateString,
                SubjectSlotID: Slotselectedvalue,
                //SubjectSlotID: Slotid,
            };
            var additionalDataString = $.param(additionalData);
   


            handleValidationAndAjax("", "/Attendance/GetViewAttendanceDetailstbl", additionalData);
        }
    }
});



function dateformatchange(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd + " " +'00:00:00';
}