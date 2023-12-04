

//Main Ready function 
$(document).ready(function () {
    DdlLmsCategory_Calingfunction();
});






//  "../Admin/ViewChangeActivity.aspx?Key=NoofLeaves&Id=9855918&Name=LeaveAllocation"


//h=250 ,w=700
function OpenIFrameModel(strURL, Width, Height, ScrollBar) {
    debugger;
    strURL = "../Admin/ViewChangeActivity.aspx?Key=NoofLeaves&Id=9855918&Name=LeaveAllocation";
    Width = 700;
    Height = 250;
    var modalURL = strURL + "&width=" + Width + "&height=" + Height + "&Dt=" + Date();
    if (ScrollBar != undefined && ScrollBar != null) {
        var dialogAttrib = "dialogHeight:" + Height + "px;dialogWidth:" + Width + "px;center:yes;scroll:" + ScrollBar + ";resizable:yes;"

    } else {
        var dialogAttrib = "dialogHeight:" + Height + "px;dialogWidth:" + Width + "px;center:yes;scroll:no;resizable:yes;"

    }
    window.showModalDialog(modalURL, "", dialogAttrib);
    return false;
}





//this is fpr restrict the Characters
function restrictCharacters(element) {
    element.value = element.value.replace(/[^0-9]/g, '');

}



//This For Save and Update
//function FN_LeaveTypes_Save(event) {
//$("#Fm_TblUserLeaveAllocationList_SearchedRecords").submit(function (event) {

function SubmitLeaves(event) {
    try {
        debugger;
        event.preventDefault();
        window.scrollTo(0, 0);
        $(".ErrorMessageSpan").empty();

        // var formData = $('#Fm_TblUserLeaveAllocationList_SearchedRecords').serialize();
        var formData = new FormData($("#Fm_TblUserLeaveAllocationList_SearchedRecords")[0]);
        //var formData = new FormData(this);
        var ButtonName = $("#BtnSubmit").val();
        // var formData = new FormData(this);
        $("#loadingOverlay").show();
        $.ajax({
            url: "/Attendance/AllocateLeavesLeaveCategoryWise?ButtonName=" + ButtonName,
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



//this for add same value in Textboxes by selecting checkbox
function UpdateAllTextboxvaluesByChecked(checkbox, FirstTextBoxId, EffectiveTxtClass) {
    debugger;
    const AllTextboxes = document.querySelectorAll('.' + EffectiveTxtClass);
    const FirstTxtValue = document.getElementById(FirstTextBoxId).value;
    //const FirstTxtValue = document.getElementById(FirstTextBoxId).value;
    if (checkbox.checked) {
        AllTextboxes.forEach(textbox => {
            textbox.value = FirstTxtValue;
        });
    }
}



////  To get Partial View of SearchLeaveTypePage
function GetAllocateLeavesLeaveCategoryWiseTBLViewCalingFunction(event) {
    try {
        debugger;
        event.preventDefault();

        $(".ErrorMessageSpan").empty();


        var PayrollCategoryId = $("#DdlLmsCategory").val();
        var PayrollSubCategoryId = $("#DdlLmsSubCategory").val();
        $("#loadingOverlay").show();
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/GetAllocateLeavesLeaveCategoryWiseTBLViewCalingFunction?PayrollCategoryId=" + PayrollCategoryId + "&PayrollSubCategoryId=" + PayrollSubCategoryId,
            type: "GET",
            success: function (data) {
                
                // Append the received partial view content to the container
                $("#TBLAllocateLeavesSearchedTypePageView_id_Div").html(data);
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
            $("#" + EffectingDropdownid).prop('disabled', true);
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
                if (responce.length <= 0) {
                    $("#" + EffectingDropdownid).prop('disabled', true);
                } else {
                    $("#" + EffectingDropdownid).prop('disabled', false);
                }

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