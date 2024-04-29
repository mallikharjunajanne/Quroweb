

//Main Ready function 
$(document).ready(function () {
    DdlLmsCategory_Calingfunction();
});




//This For Save and Update
//function FN_LeaveTypes_Save(event) {
//$("#Fm_TblUserLeaveAllocationList_SearchedRecords").submit(function (event) {

function SubmitLeaves(event) {
    try {
        debugger;
        event.preventDefault();
        loaddingimg.css('display', 'block');
        $(".ErrorMessageSpan").empty();
        var CheckBoxcount = 0;
        var row = $("#TblAssignLeavesToStaffList_SearchedRecords tbody tr");
        row.each(function (index) {
            if ($(this).find("td input[type='checkbox']").is(":checked")) { //if check box is checked then it is TRUE
                CheckBoxcount++;             
            }
        });
        debugger;
        if (CheckBoxcount < 1) {
            //$("#Main_Span_Error").text("Please select any one of the Employee to submit Leaves.");
            $('.alert-danger p').text("Please select any one of the Employee to submit Leaves.");
            $(".alert-danger").show().delay(6000).fadeOut();
            window.scrollTo(0, 0);
            loaddingimg.css('display', 'none');
            return;
        }

        // var formData = $('#Fm_TblUserLeaveAllocationList_SearchedRecords').serialize();
        var formData = new FormData($("#Fm_TblAssignLeavesToStaffList_SearchedRecords")[0]);
        //var formData = new FormData(this);
        var ButtonName = $("#BtnSubmit").val();
        // var formData = new FormData(this);
       
        $.ajax({
            url: "/Attendance/AssignLeavestoStaff?ButtonName=" + ButtonName,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                debugger;

                if (response.message == "Records inserted successfully.") {
                    $("#BtnSubmit").prop('disabled', true);
                    $('.alert-success p').text(response.message);
                    $(".alert-success").show().delay(6000).fadeOut()
                    //$("#Main_Span_Error").text(response.message);
                }
                else {
                    $('.alert-danger p').text(response.message);
                    $(".alert-danger").show().delay(6000).fadeOut();
                    //$("#Main_Span_Error").text(response.message);
                }
                loaddingimg.css('display', 'none');
            },
            error: function (xhr, status, error) {
                loaddingimg.css('display', 'none');
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}
//  });





////  To get Partial View of SearchLeaveTypePage
function _TblAssignLeavesToStaffTblViewCalingFunction(event) {
    try {
        debugger;
        event.preventDefault();
        loaddingimg.css('display', 'block');
        $(".ErrorMessageSpan").empty();


        var PayrollCategoryId = $("#DdlLmsCategory").val();
        var PayrollSubCategoryId = $("#DdlLmsSubCategory").val();

        if (PayrollCategoryId === "" || PayrollSubCategoryId === "") {
            $("#Main_Span_Error").text('Following fields have invalid data :');

            if (PayrollCategoryId === "") {
                $("#PayrollCategoryId_Span_Error").text('LMS Category');

            }
            if (PayrollSubCategoryId === "") {
                $("#PayrollSubCategoryId_Span_Error").text('LMS Subcategory');
            } else if (PayrollSubCategoryId == "Select LMS Sub Category") {     //else if is adding by arjun
                $("#PayrollSubCategoryId_Span_Error").text('LMS Subcategory');
            }
            loaddingimg.css('display', 'none');
            return;
        }
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/_TblAssignLeavesToStaff_AssignLeavestoStaff?PayrollCategoryId=" + PayrollCategoryId + "&PayrollSubCategoryId=" + PayrollSubCategoryId,
            type: "GET",
            success: function (data) {

                // Append the received partial view content to the container
                $("#_TblAssignLeavesToStaffSearchedTypePageView_id_Div").html(data);
                loaddingimg.css('display', 'none');
                // LeaveTypesCAllingTableView(event);
            },
            error: function () {
                loaddingimg.css('display', 'none');
                $("#Main_Span_Error").text("Something Error");
            }

        });
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}



function DdlLmsSubCategory_Calingfunction(buttonId, EffectingDropdownid) {
    try {
        debugger;
        $("#ErrorMessageSpan").empty();
        var PayrollCategoryId = $("#" + buttonId).val();
        if (PayrollCategoryId == "") {
            $("#" + EffectingDropdownid).empty();
            $("#" + EffectingDropdownid).append('<option value="" >Select LMS Sub Category</option>');
          
            return;
        }
        //var InstanceClassificationId = $("#Department_Id").val();

        $.ajax({
            url: "/Attendance/DdlLmsSubCategory_Calingfunction?PayrollCategoryId=" + PayrollCategoryId,
            type: "GET",
            success: function (response) {
                // $("#AppliedEmployeesNames_Id").empty();
                $("#" + EffectingDropdownid).empty();
                $("#" + EffectingDropdownid).append('<option value="" >Select LMS Sub Category</option>');

                $.each(response, function (i, Value2) {

                    $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')

                });             

            }
            ,
            error: function (xhr, status, error) {

                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {

        $("#Main_Span_Error").text("Something Error");
    }
};


function DdlLmsCategory_Calingfunction() {

    try {
        debugger;
        $("#ErrorMessageSpan").empty();
        $.ajax({
            url: "/Attendance/DdlLmsCategory_Calingfunction",
            type: "GET",
            success: function (response) {
                $("#DdlLmsCategory").empty();
                $("#DdlLmsCategory").append('<option value="">Select LMS category</option>');
                $.each(response, function (i, Value2) {
                    $("#DdlLmsCategory").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                });

            }
            ,
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
};


function FN_ClearValues(Formid) {
    try {
      //  document.getElementById(Formid).reset(); // Reset the form

        $("#TBLAllocateLeavesSearchedTypePageView_id_Div").empty();
        $("#_TblAssignLeavesToStaffSearchedTypePageView_id_Div").empty();
        $(".ErrorMessageSpan").empty();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error"); 
    }
}

//=====================clear a span
function Spanclearfunction() {
    debugger;
    $(".ErrorMessageSpan").empty();
}

//===================================This is for save and Update Leave in ManagePastDaysLeave Screen
function SavePastDayseaves(event) {
    try {
        debugger;
        event.preventDefault();
        window.scrollTo(0, 0);
        $(".ErrorMessageSpan").empty();
        loaddingimg.css('display', 'block');
        var DdlDepartment = $("#DdlDepartment").val();
        var DdlUser = $("#DdlEmployee").val();
        var DdlLeaveType = $("#DdlLeaveType").val();

        if (DdlDepartment === "" || DdlDepartment === "0" || DdlUser === "" || DdlLeaveType === "" /*|| $("#AllowPastDates_bool").is(":checked") == false*/) {
            $("#Main_Span_Error").text('Following fields have invalid data :');
            debugger;
            if (DdlDepartment === "" || DdlDepartment === "0") {
                $("#DdlDepartment_Span_Error").text('Department');
            }
            if (DdlUser === "") {
                $("#DdlUser_Span_Error").text('Employee');
            }
            if (DdlLeaveType === "") {
                $("#DdlLeaveType_Span_Error").text('Leave Type');
            }
            //if ($("#AllowPastDates_bool").is(":checked") == false) {
            //    $("#AllowPastDates_bool_Span_Error").text("Please select 'Allow Apply Leave for Past Days' check box");
            //}
            loaddingimg.css('display', 'none');
            return;
        }
        else if ($("#AllowPastDates_bool").is(":checked") == false) {
            $("#AllowPastDates_bool_Span_Error").text("Please select 'Allow Apply Leave for Past Days' check box");
            loaddingimg.css('display', 'none');
            return;
        }

        var formData = new FormData($("#FmAlloPastdaysform")[0]);
        //var formData = new FormData(this);
        var ButtonName = $("#BtnSaveId").val();

        $.ajax({
            url: "/Attendance/ManagePastDaysLeave?ButtonName=" + ButtonName,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                //$("#Main_Span_Error").text(response.message);
                if (response.message == "Leave Apply for Past Days successfully allocated to selected Employee.") {
                    TblDataTableWithColumns_CallingFunction(event, 'noStop', "/Attendance/TblAllowLeavePastDays_CallingFunction", 'TblAlloPastdaysform_SearchedRecords', 'counts', 'Fm_TblAlloPastdaysform_SearchedRecords', 'TblAlloPastdaysform_Div');
                    $('.alert-success p').text(response.message);
                    $(".alert-success").show().delay(6000).fadeOut()
                }
                else {
                    //$("#Main_Span_Error").text(response.message);
                    $('.alert-danger p').text(response.message);
                    $(".alert-danger").show().delay(6000).fadeOut();
                }
                loaddingimg.css('display', 'none');
            },
            error: function (xhr, status, error) {
                loaddingimg.css('display', 'none');
                $("#Main_Span_Error").text("Something Error");
            }
        });

    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}
