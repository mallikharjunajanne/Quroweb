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
    
    CommonDropdownAjaxFunction("ddlAcademicYearId", "GET", "/Admin/GetAcademicYearDropdown", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
    $('#ddlClass').empty();
    ClassDropdownfun();

});

function ClassDropdownfun() {
    CommonDropdownAjaxFunction("ddlClass", "GET", "/Admin/GetAllClass", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

$("#ddlAcademicYearId").change(function () {
    debugger;
    // Get the selected value of the dropdown
    var selectedValue = $(this).val();
    if (selectedValue) {
        ClassDropdownfun();
    } else {
        $('#ddlClass').empty();
    }
});

$('#ConfirmAdmissions_searchform').submit(function (event) {

    event.preventDefault();
    setTimeout(function () {

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        DatesCompare("From date", "To date");

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

       
            var formData = $('#ConfirmAdmissions_searchform').serialize();
            //var formData = new FormData($('#ConfirmAdmissions_searchform')[0]);

            handleAjax('GET', "/Admin/ManageQuroAdmissionstbl", formData,
                function (resp) {
                    debugger;
                    loaddingimg.css('display', 'none');
                    //$('#SearchingConfirmadmissiondiv').hide();
                    $('#Confirmadmissionsdiv1').append(resp);
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                }
            );
        }

        $("#Confirmadmissionsdiv1").empty();
    }, 50);
});



//==>>DATES COMPARING
function DatesCompare(Sdate, Edate) {
    try {
        debugger;
        var StartdateInput = $("#txtFromRegDate").val();
        var EnddateInput = $("#txtToRegDate").val();

        var today = new Date();        
        var Todaydate = GetDateFormat(today);
        //var formattedStartDate = GetDateFormat(StartdateInput);
        //var formattedEndDate = GetDateFormat(EnddateInput);
        
        var formattedStartDate = GetDateFormat(new Date(StartdateInput));
        var formattedEndDate = GetDateFormat(new Date(EnddateInput));
        var errorElement = $('#DateCompareErrormessage');

        debugger;

        errorElement.text("");
        if (StartdateInput !== "" && formattedStartDate > Todaydate) {
            errorElement.text("From Date Should not be greater than today's date.");
        }

        if (EnddateInput !== "" && formattedEndDate > Todaydate) {
            errorElement.text("To Date Should not be greater than today's date.");
        }

        if (StartdateInput !== "" && EnddateInput !== "" && formattedStartDate > formattedEndDate) {
            errorElement.text("From date should not be greater than To date.");
        }


        //if (StartdateInput != "") {
        //    if (formattedStartDate > Todaydate) {
        //        errorElement.text("From Date Should not be greater than today's date.");
        //    } else {
        //        errorElement.text("");
        //    }
        //}
        //if (EnddateInput != "") {
        //    if (formattedEndDate > Todaydate) {
        //        errorElement.text("To Date Should not be greater than today's date.");
        //    } else {
        //        errorElement.text("");
        //    }
        //}

        //if (StartdateInput !== "" && EnddateInput !== "") {
        //    if (formattedStartDate > formattedEndDate) {
        //        errorElement.text("From date should not be greater than To date.");
        //        errorElement.css("color", "red"); // Set error message color to red
        //    } else {
        //        errorElement.text("");
        //    }

        //    if (formattedEndDate > today) {
        //        errorElement.text("To Date Should not be greater than today.");
        //        errorElement.css("color", "red"); // Set error message color to red
        //    } else {
        //        errorElement.text("");
        //    }
        //}
        //else {
        //    errorElement.text("");
        //}

    }
    catch (error) {
        console.log(error);
    }
}


$("#txtFromRegDate").on("change", function () { DatesCompare("From date", "To date"); });
$("#txtToRegDate").on("change", function () { DatesCompare("From Date", "To date"); });

function GetDateFormat(date) {
    debugger;
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
}



////==>> Select All Function
//$('#chkCheckAll').on('click', function () {
//    debugger;
//    var isChecked = $(this).prop('checked');
//    $('.chkRow').prop('checked', isChecked);
//});





//==>> Clear Function
function Clearfun(formid) {
    $('#' + formid)[0].reset();
    $('#DateCompareErrormessage').text('');
}


$('#Submitbtn').click(function () {



});