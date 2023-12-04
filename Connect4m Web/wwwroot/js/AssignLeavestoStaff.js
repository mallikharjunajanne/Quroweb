

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
        window.scrollTo(0, 0);
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
            $("#Main_Span_Error").text("Please select any one of the Employee to submit Leaves.");
            return;
        }



        // var formData = $('#Fm_TblUserLeaveAllocationList_SearchedRecords').serialize();
        var formData = new FormData($("#Fm_TblAssignLeavesToStaffList_SearchedRecords")[0]);
        //var formData = new FormData(this);
        var ButtonName = $("#BtnSubmit").val();
        // var formData = new FormData(this);
        $("#loadingOverlay").show();
        $.ajax({
            url: "/Attendance/AssignLeavestoStaff?ButtonName=" + ButtonName,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (responce) {
                debugger;

                if (responce.message == "Records inserted successfully.") {
                    $("#BtnSubmit").prop('disabled', true);

                    $("#Main_Span_Error").text(responce.message);
                }
                else {
                    $("#Main_Span_Error").text(responce.message);
                }
                $("#loadingOverlay").hide();
            },
            error: function (xhr, status, error) {
                $("#loadingOverlay").hide();
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
}
//  });





////  To get Partial View of SearchLeaveTypePage
function _TblAssignLeavesToStaffTblViewCalingFunction(event) {
    try {
        debugger;
        event.preventDefault();

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
            }
            return;
        }


        $("#loadingOverlay").show();
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/_TblAssignLeavesToStaff_AssignLeavestoStaff?PayrollCategoryId=" + PayrollCategoryId + "&PayrollSubCategoryId=" + PayrollSubCategoryId,
            type: "GET",
            success: function (data) {

                // Append the received partial view content to the container
                $("#_TblAssignLeavesToStaffSearchedTypePageView_id_Div").html(data);
                $("#loadingOverlay").hide();
                // LeaveTypesCAllingTableView(event);
            },
            error: function () {
                $("#loadingOverlay").hide();
                $("#Main_Span_Error").text("Something Error");
            }

        });
    } catch (e) {
        $("#loadingOverlay").hide();
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
            success: function (responce) {
                // $("#AppliedEmployeesNames_Id").empty();
                $("#" + EffectingDropdownid).empty();
                $("#" + EffectingDropdownid).append('<option value="" >Select LMS Sub Category</option>');

                $.each(responce, function (i, Value2) {

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
            success: function (responce) {
                $("#DdlLmsCategory").empty();
                $("#DdlLmsCategory").append('<option value="">Select LMS category</option>');
                $.each(responce, function (i, Value2) {
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
        document.getElementById(Formid).reset(); // Reset the form

        $("#TBLAllocateLeavesSearchedTypePageView_id_Div").empty();
        $(".ErrorMessageSpan").empty();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}