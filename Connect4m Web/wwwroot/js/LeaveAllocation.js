






////  "../Admin/ViewChangeActivity.aspx?Key=NoofLeaves&Id=9855918&Name=LeaveAllocation"


////h=250 ,w=700
//function OpenIFrameModel(strURL, Width, Height, ScrollBar) {
//    debugger;
//    strURL = "../Admin/ViewChangeActivity.aspx?Key=NoofLeaves&Id=9855918&Name=LeaveAllocation";
//    Width = 700;
//    Height = 250;
//    var modalURL = strURL + "&width=" + Width + "&height=" + Height + "&Dt=" + Date();
//    if (ScrollBar != undefined && ScrollBar != null) {
//        var dialogAttrib = "dialogHeight:" + Height + "px;dialogWidth:" + Width + "px;center:yes;scroll:" + ScrollBar + ";resizable:yes;"

//    } else {
//        var dialogAttrib = "dialogHeight:" + Height + "px;dialogWidth:" + Width + "px;center:yes;scroll:no;resizable:yes;"
//    }
//    window.showModalDialog(modalURL, "", dialogAttrib);
//    return false;
//}







//=============================== Submit Leaves

function SubmitLeaves(event) {
    try {
    debugger;
    event.preventDefault();
    $(".ErrorMessageSpan").empty();
    //var allTextboxValues = [];
    var allTextboxValues = new FormData();

    // Get all rows in the table body
    //var table = $('#TblUserLeaveAllocationList_SearchedRecords');
    var tableBody = document.querySelector('tbody');
    var rows = tableBody.querySelectorAll('tr');

    debugger;
    // Loop through each row
    rows.forEach(function (row, index) {
        var rowData = {};
        // Get the User ID for the current row
        //var userIdInput = row.querySelector('input[name^="val["][name$="].UserId"]');
        var userIdInput = row.querySelector('input#UserId');
        if (userIdInput) {

            allTextboxValues.append('List_UserId', parseInt(userIdInput.value));
            //rowData.UserId = userIdInput.value;
        }
       // var Userid = rows.find('UserId').val();
        // Create an array to store the textbox values for the current row
        var rowTextboxValues = [];

        var textboxes = row.querySelectorAll('input[type="text"]');

        // Loop through checkboxes and textboxes
        textboxes.forEach(function (textboxe, i) {
            var textbox = textboxes[i];
            var value = textbox.title + '-' + textbox.value;      
                rowTextboxValues.push(value);         
        });

        // Join the row's array elements into a comma-separated string
        var rowParamString = rowTextboxValues.join(',');
        //rowData["ParamString"] = rowParamString
        // Add the row's string to the overall array

        //allTextboxValues.push(rowData);

        allTextboxValues.append('List_LeaveNameandDayCount', rowParamString);
    });

    debugger;
    var ButtonName = $("#BtnSubmit").val();
    $("#loadingOverlay").show();

    $.ajax({
       // url: "/Attendance/LeaveAllocation?ButtonName=" + ButtonName,
        type: "POST",
        url: '/Attendance/LeaveAllocation?ButtonName=' + ButtonName,
        data:allTextboxValues ,
        contentType: false,
        processData: false,
        success: function (responce) {
            debugger;
            $("#Main_Span_Error").text(responce.message);
            if (responce.message == "Records inserted successfully.") {
                $("#BtnSubmit").prop('disabled', true);        
            }
            
            $("#loadingOverlay").hide();
        },
        error: function (xhr, status, error) {
            $("#loadingOverlay").hide();
            $("#Main_Span_Error").text("Something Error");
        }
    });

        window.scrollTo(0, 0);
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
}

////function SubmitLeaves(event) {
//$("Fm_TblUserLeaveAllocationList_SearchedRecords22").submit(function (event) {
//    try {
//        debugger;
//        event.preventDefault();
//        window.scrollTo(0, 0);
//        $(".ErrorMessageSpan").empty();

//        // var formData = $('#Fm_TblUserLeaveAllocationList_SearchedRecords').serialize();

//      //  var formData = new FormData($("#Fm_TblUserLeaveAllocationList_SearchedRecords")[0]);
//        debugger;
//        var formData = new FormData(this);
//        var ButtonName = $("#BtnSubmit").val();

//        $("#loadingOverlay").show();
//        $.ajax({
//            url: "/Attendance/LeaveAllocation?ButtonName=" + ButtonName,
//            type: "POST",
//            data: formData,
//            contentType: false,
//            processData: false,
//            success: function (responce) {
//                debugger;
//                if (responce.message == "Records inserted successfully.") {
//                    $("#BtnSubmit").prop('disabled', true);
//                    $("#Main_Span_Error").text(responce.message);
//                }
//                else {
//                    $("#Main_Span_Error").text(responce.message);
//                }
//                $("#loadingOverlay").hide();
//            },
//            error: function (xhr, status, error) {
//                $("#loadingOverlay").hide();
//                $("#Main_Span_Error").text("Something Error");
//            }
//        });
//    } catch (x) {
//        $("#loadingOverlay").hide();
//        $("#Main_Span_Error").text("Something Error");
//    }
//   //}
//});



////this for add same value in Textboxes by selecting checkbox
//function UpdateAllTextboxvaluesByChecked(checkbox, FirstTextBoxId, EffectiveTxtClass) {
//    debugger;
//    const AllTextboxes = document.querySelectorAll('.' + EffectiveTxtClass);
//    const FirstTxtValue = document.getElementById(FirstTextBoxId).value;
//    //const FirstTxtValue = document.getElementById(FirstTextBoxId).value;
//    if (checkbox.checked) {
//        AllTextboxes.forEach(textbox => {
//            textbox.value = FirstTxtValue;
//        });
//    }
//}

////  To get Partial View of SearchLeaveTypePage
function SearchLeaveAllocationPartialViewFunction(event) {
    try {
        debugger;
        event.preventDefault();

        $(".ErrorMessageSpan").empty();
        var GenderId = $("input[type='radio'].check:checked").val();

        //if (GenderId == undefined) {
        //    GenderId = default;
        //}

        var PayrollCategoryId = $("#DdlLmsCategory").val();
        var PayrollSubCategoryId = $("#DdlLmsSubCategory").val();
        $("#loadingOverlay").show();
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/LeaveAllocationTBLView?GenderId=" + GenderId + "&PayrollCategoryId=" + PayrollCategoryId + "&PayrollSubCategoryId=" + PayrollSubCategoryId,
            type: "GET",
            success: function (data) {
                if (data == "") {
                    $("#Main_Span_Error").text("No records found");
                }
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
            } ,
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