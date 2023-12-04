


//Fast Attendance Screen Dropdown script start
// Dropdown Name: InstanceClassificationId (Department) based By Class DropDown


$("#F_IN_Class").change(fun01);
function fun01() {
    debugger;
    var value = $('#F_IC_Id').val();

    $.ajax({
        url: "/Attendance/F_Get_Inc_By_Subclass?InstanceClassificationId=" + value,
        type: "GET",
        success: fun02
    });
    function fun02(response) {
        /*debugger;*/
        $("#F_IC_Sub_Id").html(response);
    }

}
//Fast Attendance Screen Dropdown script End




//Get Attendance Form button click after fire script start  
//by using form Id 

$(document).ready(function () {

    debugger;
    function validateForm() {
        var Startdates = $('#FA_StartdateId1').val();
        var InstanceClassificationId = $('#F_IC_Id').val();
        var InstanceSubClassificationId = $('#F_IC_Sub_Id').val();
        var SubjectSlotID = $('#myDropdown').val();

        var Stdate = new Date($('#FA_StartdateId1').val());
        var today = new Date();

        var Year = Stdate.getFullYear();
        var m = ('0' + (Stdate.getMonth() + 1)).slice(-2);
        var date = ('0' + Stdate.getDate()).slice(-2);
        var Rdate = Year + '-' + m + '-' + date;

        var ToYear = today.getFullYear();
        var Tom = ('0' + (today.getMonth() + 1)).slice(-2);
        var Todate = ('0' + today.getDate()).slice(-2);
        var Gettodaydate = ToYear + '-' + Tom + '-' + Todate;


        var validationMessage = "";
        var DatesvalidationMessage = "";
        var hasError = false;

        debugger;
        // Perform your validation checks

        if (Startdates === "") {

            validationMessage += "Start Date is Required.<br>";
            hasError = true;
        } else if (Rdate > Gettodaydate) {

            validationMessage += "Start Date should not be greater than today.<br />";
            hasError = true;
        }

        if (InstanceClassificationId === "") {
            validationMessage += "Department is required.<br>";
            hasError = true;
        }

        if (InstanceSubClassificationId.length === 0) {
            validationMessage += "Class is required.<br>";
            hasError = true;
        }

        if (SubjectSlotID === "") {
            validationMessage += "Slot is required.<br>";
            hasError = true;
        }

        return {
            validationMessage: validationMessage,
            DatesvalidationMessage: DatesvalidationMessage,
            hasError: hasError
        };
    }

    $("#F_At_Main_Form").submit(function (event) {
        debugger;

        $("#validation1").html(""); // Clear validation message div 1
        $("#validation2").html(""); // Clear validation message div 2
        $("#validation3").html(""); // Clear validation message div 2
        $("#Fast_Attendance_Table_data").empty();

        $('#ErrorMessage').text('');

        var validation = validateForm();



        debugger;
        if (validation.hasError) {
            $("#validation1").html(validation.validationMessage);
            $("#validation2").html("Following fields have invalid data:");
            $("#validation3").html(validation.DatesvalidationMessage);
           
        } else {
            // Perform AJAX request
            var formData = $(this).serialize();
            $.ajax({
                url: "/Attendance/Get_FastAttendance_Table",
                type: "Get",
                data: formData,
                success: function (response) {
                    $("#Fast_Attendance_Table_data").html(response);
                },
                error: function () {
                    alert("An error occurred during the request.");
                }
            });
        }

        event.preventDefault(); // Prevent default form submission
    });


    //$("#F_At_Main_Form").submit(function (event) {
    //    debugger;

    //    var Startdates = $('#FA_StartdateId1').val();
    //    var InstanceClassificationId = $('#F_IC_Id').val();
    //    var InstanceSubClassificationId = $('#F_IC_Sub_Id').val();
       

    //    var SubjectSlotID = $('#myDropdown').val();

    //    //feature Date validation
    //    var Stdate = new Date($('#FA_StartdateId1').val());
    //    var today = new Date();

    //    var Year = Stdate.getFullYear();
    //    var m = ('0' + (Stdate.getMonth() + 1)).slice(-2);
    //    var date = ('0' + Stdate.getDate()).slice(-2);
    //    var Rdate = Year + '-' + m + '-' + date;

    //    var ToYear = today.getFullYear();
    //    var Tom = ('0' + (today.getMonth() + 1)).slice(-2);
    //    var Todate = ('0' + today.getDate()).slice(-2);
    //    var Gettodaydate = ToYear + '-' + Tom + '-' + Todate;


    //    event.preventDefault(); // Prevent default form submission

    //    var validationMessage = "";
    //    var validation2Message = "";
    //    var hasError = false;

    //    if (Rdate > Gettodaydate) {
        
    //        validationMessage += "Start Date should not be greater than today.<br>";
    //        hasError = true;
    //    }     


    //    if (Startdates === "") {
    //        validationMessage += "Start Date is Required.<br>";
    //        hasError = true;
    //    }

    //    if (InstanceClassificationId === "") {

    //        validationMessage += "Department is required.<br>";
    //        hasError = true;
    //    }

    //    if (InstanceSubClassificationId.length === 0) {

    //        validationMessage += "Class is required.<br>";
    //        hasError = true;
    //    }

    //    if (SubjectSlotID === "") {

    //        validationMessage += "Slot is required.<br>";
    //        hasError = true;
    //    }
        
    //    if (hasError) {
    //        validation2Message = "Following fields have invalid data:<br>";
    //        $("#validation1").html(validationMessage);
    //        $("#validation2").html(validation2Message);
           
    //    } else {

    //        $("#validation1").html("");
    //        $("#validation2").html("");
       

    //        var formData = $(this).serialize(); // Serialize form data


    //        //var selectedValues = $("#F_IC_Sub_Id").val();
    //        ////formData += "&SelectedValues=" + selectedValues.join(",");
    //        //for (var i = 0; i < selectedValues.length; i++) {
    //        //    formData += "&SelectedValues=" + selectedValues[i];
    //        //}
    //        $.ajax({
    //            url: "/Attendance/Get_FastAttendance_Table",
    //            type: "Get",
    //            data: formData,
    //            success: function (response) {
    //                /*console.log(response);*/

    //                $("#Fast_Attendance_Table_data").html(response);

    //            },
    //            error: function () {
    //                // Handle error, if any
    //                alert("An error occurred during the request.");
    //            }
    //        });
    //    }
    //});
});

//Get Attendance Form button click after fire script end  
debugger;
var Dates = $('#FA_StartdateId1').val();
var dateParts = Dates.split("-");
var formattedDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];

$('#startDateParagraph').text(formattedDate);

//Get Attendance Form button click after show table script start && and table view click submit button fire script
$(document).ready(function () {
    $("#submitBtn").click(function (e) {

        $('#ErrorMessage').text('');

        e.preventDefault();
        debugger;
       
        var Startdate = $('#FA_StartdateId1').val();

        var LgUserid = $('#Lg_UserId_FastTxtid').val();

        var InstanceClassificationId = $('#F_IC_Id').val();


        var InstanceSubClassificationId = $('#F_IC_Sub_Id').val();
        var InstanceSubClassificationName = $('#F_IC_Sub_Id option:selected').text();

        var SubjectSlotID = $('#myDropdown').val();
        var SubjectSlotName = $('#myDropdown option:selected').text();

        var formData = [];

        $(".Fast_TextArea").each(function () {
            var textareaValue = $(this).val();
            var instanceSubClassificationId = $(this).closest("tr").find("td:first-child").text();

            formData.push({
                "instanceSubClassificationId": instanceSubClassificationId,
                "textareaValue": textareaValue
            });
        });

        $.ajax({

            url: "/Attendance/FastAttendance?InstanceClassificationId=" + InstanceClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&Startdate=" + Startdate + "&CreatedBy=" + LgUserid,
            type: "POST",
            data: { formData: formData },
            success: function (result) {
              
                debugger;
                var errorMessage = document.getElementById('ErrorMessage');
                if (result == 0) {

                    $('#ErrorMessage').text("Attendance already posted for " + InstanceSubClassificationName + " class on " + Startdate + " for " + SubjectSlotName);

                    //errorMessage.innerHTML = "Attendance already posted for " + InstanceSubClassificationName + " class on " + Startdate + " for " + SubjectSlotName;
                    //errorMessage.style.opacity = "1";

                    // Apply fadeout effect after 3 seconds
                    //setTimeout(function () {
                    //    errorMessage.style.transition = "opacity 1s";
                    //    errorMessage.style.opacity = "0";
                    //}, 3000);
                    
                }
                else if (result == -2) {

                    $('#ErrorMessage').text("Entered REG. NO. 's are invalid for " + InstanceSubClassificationName + " class on " + Startdate + " for " + SubjectSlotName + " ");

                    //errorMessage.innerHTML = "Entered REG. NO. 's are invalid for " + InstanceSubClassificationName + " class on " + Startdate + " for " + SubjectSlotName + " ";
                    //errorMessage.style.opacity = "1";

                    // Apply fadeout effect after 3 seconds
                    //setTimeout(function () {
                    //    errorMessage.style.transition = "opacity 1s";
                    //    errorMessage.style.opacity = "0";
                    //}, 3000);
                   
                }
                else if (result == 1) {

                    $('#ErrorMessage').text('Attendance posted successfully.');
                    //errorMessage.innerHTML = "Attendance posted successfully.";
                    //errorMessage.style.opacity = "1";

                    // Apply fadeout effect after 3 seconds
                    //setTimeout(function () {
                    //    errorMessage.style.transition = "opacity 1s";
                    //    errorMessage.style.opacity = "0";
                    //}, 3000);                   
                }
                console.log(result);
            },
            error: function (xhr, status, error) {
                // Handle the error response
            }
        });
    });

});
//Get Attendance Form button click after show table script End && and table view click submit button fire script