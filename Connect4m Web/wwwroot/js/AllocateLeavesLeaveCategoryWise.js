

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





////this is fpr restrict the Characters
//function restrictCharacters(element) {
//    element.value = element.value.replace(/[^0-9]/g, '');

//}



//===========================This For Save and Update
//function FN_LeaveTypes_Save(event) {
//$("#Fm_TblUserLeaveAllocationList_SearchedRecords").submit(function (event) {

function SubmitLeaves(event) {
    try {
        debugger;
        loaddingimg.css('display', 'block');
        event.preventDefault();
        
        $(".ErrorMessageSpan").empty();

        // var formData = $('#Fm_TblUserLeaveAllocationList_SearchedRecords').serialize();
       // var formData = new FormData($("#Fm_TblUserLeaveAllocationList_SearchedRecords")[0]);
        var allTextboxValues = new FormData();
        var PayrollCategoryId;
        var PayrollSubCategoryId;
        var rowTextboxValues;
        document.querySelectorAll('tbody tr').forEach(function (row) {
             PayrollCategoryId = row.querySelector('input#PayrollCategoryId');
            allTextboxValues.append('List_PayrollCategoryId', parseInt(PayrollCategoryId.value));
             PayrollSubCategoryId = row.querySelector('input#PayrollSubCategoryId');
            allTextboxValues.append('List_PayrollSubCategoryId', parseInt(PayrollSubCategoryId.value));
             rowTextboxValues = Array.from(row.querySelectorAll('input[type="text"]')).map(function (textbox) {
                return textbox.title + '-' + textbox.value;
            });

            allTextboxValues.append('List_LeaveNameandDayCount', rowTextboxValues.join(','));
        });
        //var formData = new FormData(this);
        var ButtonName = $("#BtnSubmit").val();
        // var formData = new FormData(this);
       
        $.ajax({
            url: "/Attendance/AllocateLeavesLeaveCategoryWise?ButtonName=" + ButtonName,
            type: "POST",
            data: allTextboxValues,
            contentType: false,
            processData: false,
            success: function (response) {
                debugger;
                if (response.message == "Records inserted successfully.") {
                    $("#BtnSubmit").prop('disabled', true);
                    $('.alert-success p').text(response.message);
                    $(".alert-success").show().delay(6000).fadeOut()
                } else {
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
        window.scrollTo(0, 0);
    } catch (x) {
        loaddingimg.css('display', 'none');
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
        loaddingimg.css('display', 'block');
        $(".ErrorMessageSpan").empty();


        var PayrollCategoryId = $("#DdlLmsCategory").val();
        var PayrollSubCategoryId = $("#DdlLmsSubCategory").val();
        
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/GetAllocateLeavesLeaveCategoryWiseTBLViewCalingFunction?PayrollCategoryId=" + PayrollCategoryId + "&PayrollSubCategoryId=" + PayrollSubCategoryId,
            type: "GET",
            success: function (data) {
                
                // Append the received partial view content to the container
                $("#TBLAllocateLeavesSearchedTypePageView_id_Div").html(data);
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
            $("#" + EffectingDropdownid).prop('disabled', true);
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
                if (response.length <= 0) {
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
        //document.getElementById(Formid).reset(); // Reset the form

        $("#TBLAllocateLeavesSearchedTypePageView_id_Div").empty();
        $(".ErrorMessageSpan").empty();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}