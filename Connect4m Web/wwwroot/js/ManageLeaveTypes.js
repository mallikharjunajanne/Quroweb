


//clear span by click search symbol
//function clearspanBySearchImgIcon(event) {
//    event.preventDefault();
//    $(".ErrorMessageSpan").empty();
//}



//==================== To get Partial View of SearchLeaveTypePage Head
function SearchLeaveTypePagePartialViewFunction() {
    try {
        debugger;
        // Make AJAX call to the controller action
        loaddingimg.css('display', 'block');
        $.ajax({
            url: "/Attendance/LoadPartialView",
            type: "GET",
            success: function (data) {
                // Append the received partial view content to the container
                $("#SearchLeaveTypePagePartialView").html(data);
                LeaveTypesCAllingTableView(event, "First");
                loaddingimg.css('display', 'none');
            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
                loaddingimg.css('display', 'none');
            }

        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
}


//This is for delete

//----------------------  Delete code start----------------------------

function DeleteLeaveTypesCallingFunction(Leavetypeid) {
    debugger;
    var Deletemsg = "Leave Type ";
    CommonDeleteFunction_Vs1(Deletemsg, "POST", "/Attendance/ManageLeaveTypes?ButtonName=Delete&Leavetypeid=" + Leavetypeid, function (response) {
            LeaveTypesCAllingTableView(event);    
    });
}

//---------------------------Delete code end------------------





//========================This For Save and Update
function FN_LeaveTypes_Save(event) {
    try {
        debugger;
        event.preventDefault();
       
        $(".ErrorMessageSpan").empty();
        // ScrollToSelected_ID('Main_Span_Error');
        loaddingimg.css('display', 'block');
        var Leavetype_CreatePage = $("#TxtLeavetype_Createpage").val();
        var LeaveShortName_CreatePage = $("#TxtLeaveShortName_Createpage").val();
        //var CarryForwardCheckbox = document.getElementById("TxtCarryForward_Createpage");
        var isActiveCheckbox = document.querySelector('input[name="Carryforward_bool"]');
        //  var isChecked = isActiveCheckbox.checked;
        var i = 0;


        var isdisableCheckbox = $('input[name="Carryforward_bool"]');
        if (isdisableCheckbox.prop("disabled")) {
            i++;
        }
        if (Leavetype_CreatePage === "" || LeaveShortName_CreatePage === "") {
            $("#Main_Span_Error").text('Following fields have invalid data :');
            debugger;
            if (Leavetype_CreatePage === "") {
                $("#Leavetype_CreatePage_Span_Error").text('Leave Type');
                //$("#TxtLeavetype_Createpage").css({
                //    'border':'2px solid red',
                //})
            }
            if (LeaveShortName_CreatePage === "") {
                $("#LeaveShortName_CreatePage_Span_Error").text('Leave Short Name');
                //$("#TxtLeaveShortName_Createpage").css({
                //    'border':'1px solid red',
                //})
            }
            window.scrollTo(0, 0);
            loaddingimg.css('display', 'none');
            return;

        }



        isActiveCheckbox.disabled = false;
        var formData = new FormData($("#FmCreateLeaveType")[0]);
        if (i >= 1) {
            isActiveCheckbox.disabled = true;
        }

        formData.append("Leavetype", Leavetype_CreatePage);
        formData.append("ShortName", LeaveShortName_CreatePage);
        //formData.append("Carryforward_bool", isChecked);
        var ButtonName = $("#BtnSave").val();
        if (ButtonName == "Update") {

        }
        
        $.ajax({
            url: "/Attendance/ManageLeaveTypes?ButtonName=" + ButtonName,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                debugger;

                if (response.message == "Record inserted successfully." || response.message == "Record updated successfully." || response.message == "Record Updated Successfully.") {
                    $("#BtnSave").prop('disabled', true);
                    $("#BtnClear").prop('disabled', true);
                    $('.alert-success p').text(response.message);
                    $(".alert-success").show().delay(6000).fadeOut()
                   // $("#Main_Span_Error").text(response.message);
                }
                else {
                    $('.alert-danger p').text(response.message);
                    $(".alert-danger").show().delay(6000).fadeOut();
                  //  $("#Main_Span_Error").text(response.message);
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




// =======================================This is for edit===============================

//$("#TblLeavesTypes_SearchRecords tbody").on("click", "#TBLLeavetype", function () {
function EditValuesGettingFunction() {
    try {
        debugger;
        $(".ErrorMessageSpan").empty();

        loaddingimg.css('display', 'block');
        var Tr = $(this).closest('tr');

        var TBLLeavetypeid = Tr.find("#TBLLeavetypeid").val();

        $.ajax({
            url: "/Attendance/CreateLeaveTypePageView?Leavetypeid=" + TBLLeavetypeid,
            type: "GET",
            success: function fun2(response) {
            
                $("#CreateLeaveTypePageView_id").html(response);

                $.ajax({
                    url: "/Attendance/EditValuesGettingFunction?Leavetypeid=" + TBLLeavetypeid,
                    type: "GET",
                    success: function (response) {
                        $("#TxtLeavetype_Createpage").val(response[0].leavetype);
                        $("#TxtLeaveShortName_Createpage").val(response[0].shortName);
                        $("#TxtAreaDescription_Createpage").val(response[0].description);
                        $("#HdnLeavetypeid").val(response[0].leavetypeid);

                        if (response[0].carryforward == 1) {
                            $("#TxtCarryForward_Createpage").prop("checked", true);
                        }
                        else {
                            $("#TxtCarryForward_Createpage").prop("checked", false);
                        }

                        if (response[0].allowPastDates == 1) {
                            $("#TxtAllowLeaveApplyforPastDays_Createpage").prop("checked", true);
                        }
                        else {
                            $("#TxtAllowLeaveApplyforPastDays_Createpage").prop("checked", false);
                        }

                        if (response[0].editEligibleReturnValue == "2") {
                            $("#Main_Span_Error").text("NOTE : Leave Type allocated to users. Unable to Edit Leave Type.");
                            $("#TxtLeavetype_Createpage").prop("disabled", true);
                            $("#TxtLeaveShortName_Createpage").prop("disabled", true);
                            $("#TxtCarryForward_Createpage").prop("disabled", true);
                            debugger;

                            //$("#imgAuditIconAllowPastDays").attr("style", "display: inline-block !important;");

                            //  $(this).css("display", "inline-block !important");
                            // $("#imgAuditIconAllowPastDays").css("display","inline-block !important");

                            //var inputElement = $('<input>', {
                            //    type: 'image',
                            //    id: 'imgAuditIconAllowPastDays',
                            //    src: '~/IconImages/searchbtn image.png',
                            //    style: 'border-width: 0px; height: 13px; margin-left: 10px; margin-top: 7px;',
                            //    click: clearspanBySearchImgIcon
                            //});

                            //// Append the input element to the target element
                            //$('#targetElement').append(inputElement);
                        }
                        else {

                        }
                        $("#BtnSave").val("Update");
                        $("#BtnClear").prop("disabled", true);

                        loaddingimg.css('display', 'none');
                    },
                    error: function (xhr, status, error) {
                        $("#Main_Span_Error").text("Something Error");
                        loaddingimg.css('display', 'none');
                    }
                })

                $("#SearchLeaveTypePagePartialView").hide();
                loaddingimg.css('display', 'none');
            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
                loaddingimg.css('display', 'none');
            }
        })

        //  $("#LeaveTypesCAllingTableView_Id").empty();

     

        loaddingimg.css('display', 'none');
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }

};
// });




//===========================Leave type getting table Records

function LeaveTypesCAllingTableView(event,val) {
    try {
        debugger;
        if (val != "First") {
            event.preventDefault();
        }
        debugger;
        $(".ErrorMessageSpan").empty();

        var LeaveType = $("#TxtLeavetype").val();
        var Description = $("#TxtDescription").val();

        var currentPage = 0;
        if (val != "First") {
            var table = js('#TblLeavesTypes_SearchRecords').DataTable();
             currentPage = table.page.info().page;
            table.destroy();
        }

        loaddingimg.css('display', 'block');
        debugger;
        $.ajax({
            url: "/Attendance/LeaveTypesCAllingTableView?LeaveType=" + LeaveType + "&Description=" + Description,
            type: "GET",
            success: function(response) {
                debugger;
                $("#LeaveTypesCAllingTableView_Id").html(response);
                debugger;

                var ExcelDownloadColumnsNo = [];

                var lenth = $("#TblLeavesTypes_SearchRecords tbody tr").length;
                TblDataTableWith_OutColumns_CallingFunction("TblLeavesTypes_SearchRecords", 'noresponse', lenth, currentPage, 'Noname', ExcelDownloadColumnsNo);
                loaddingimg.css('display', 'none');
                //if ($("#TblLeavesTypes_SearchRecords tbody tr").length <= 0) {
                //    //$("#Main_Span_Error").text("No Records Found");
                //    // $("#LeaveTypesCAllingTableView_Id").empty();
                //    $("#TblLeavesTypes_SearchRecords").hide();
                //}
                //else {
                //    //Pagination($("#TblLeavesTypes_SearchRecords tbody tr").length, "TblLeavesTypes_SearchRecords");

                //    if ($("#TblLeavesTypes_SearchRecords tbody tr").length < 11) {
                //        $('#TblLeavesTypes_SearchRecords_pagination').empty();
                //        //$("#TblLeavesTypes_SearchRecords tfoot").hide();
                //    }
                //    else {
                //        $("#TblLeavesTypes_SearchRecords tfoot").show();
                //        var pagination = $('#TblLeavesTypes_SearchRecords_pagination');


                //        var pagenationtext = $('#TblLeavesTypes_SearchRecords_pagination .TblLeavesTypes_SearchRecords_pagination_Class.active').text();
                //        debugger;
                //        // $('#TblLeavesTypes_SearchRecords_pagination').empty();

                //        var currentPage = 1; // Default current page


                //        var table = $('#TblLeavesTypes_SearchRecords');
                //        var tbody = table.find('tbody');
                //        //var numRows = tbody.find('tr').length;
                //        var rowsPerPage = 10; // Number of rows to display per page
                //        //var numPages = Math.ceil(numRows / rowsPerPage);

                //        if (pagenationtext != '') {


                //            // Get all the <a> elements within the specified div
                //            var aTags = document.querySelectorAll('#TblLeavesTypes_SearchRecords_pagination a');

                //            // Loop through each <a> tag and check if the selected text matches its inner text
                //            var isSelectedTextAvailable = false;
                //            for (var i = 0; i < aTags.length; i++) {
                //                if (aTags[i].innerText === pagenationtext) {
                //                    isSelectedTextAvailable = true;
                //                    break;
                //                }
                //            }
                //            if (isSelectedTextAvailable) {
                //                showPage(pagenationtext);
                //            }
                //            else {
                //                showPage(1);
                //            }
                //        }
                //        else {
                //            // Show the first page by default
                //            showPage(currentPage);

                //            // Adjust pagination alignment
                //            pagination.css('text-align', 'center');
                //            debugger;
                //            // Handle pagination link click event
                //            pagination.on('click', '.TblLeavesTypes_SearchRecords_pagination_Class', function (e) {
                //                debugger;
                //                e.preventDefault();
                //                // LeaveTypesCAllingTableView(event);

                //                var numPages = Math.ceil(tbody.find('tr').length / rowsPerPage);

                //                var linkText = $(this).text();
                //                if (linkText === "Previous") {
                //                    currentPage = Math.max(currentPage - 1, 1);
                //                } else if (linkText === "Next") {
                //                    currentPage = Math.min(currentPage + 1, numPages);
                //                } else {
                //                    currentPage = parseInt(linkText);
                //                }
                //                showPage(currentPage);
                //            });
                //        }
                //        // Function to display the specified page
                //        function showPage(page) {
                //            debugger;
                //            var start = (page - 1) * rowsPerPage;
                //            var end = start + rowsPerPage;
                //            //var numPages2 = tbody.find('tr').length;

                //            var numPages2 = Math.ceil(tbody.find('tr').length / rowsPerPage);
                //            tbody.find('tr').hide(); // Hide all rows
                //            tbody.find('tr').slice(start, end).show(); // Show rows for the specified page

                //            // Update pagination links
                //            var newStartIndex = Math.max(1, page - 4);
                //            var newEndIndex = Math.min(newStartIndex + 9, numPages2);

                //            if (newEndIndex === numPages2) {
                //                newStartIndex = Math.max(1, numPages2 - 9);
                //            }


                //            pagination.empty();

                //            var previousLink = $('<a class="TblLeavesTypes_SearchRecords_pagination_Class" style="margin: 0 2px;" href="#">Previous</a>');
                //            pagination.append(previousLink);

                //            for (var i = newStartIndex; i <= newEndIndex; i++) {
                //                var link = $('<a class="TblLeavesTypes_SearchRecords_pagination_Class" style="margin: 0 2px;" href="#">' + i + '</a>');
                //                pagination.append(link);
                //            }

                //            var nextLink = $('<a class="TblLeavesTypes_SearchRecords_pagination_Class" style="margin: 0 2px;" href="#">Next</a>');
                //            pagination.append(nextLink);

                //            // Update active class on current page link
                //            $('.TblLeavesTypes_SearchRecords_pagination_Class').removeClass('active');
                //            $('.TblLeavesTypes_SearchRecords_pagination_Class').eq(page - newStartIndex + 1).addClass('active').css('cursor', 'unset');;
                //        }



                //    }
                //}

            },
            error: function () {
                loaddingimg.css('display', 'none');
                $("#Main_Span_Error").text("Something Error");
            }
        })
        
    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}


//create new page function
function CreateNewLeaveTypes() {
    try {
        debugger;
        $(".ErrorMessageSpan").empty();

        loaddingimg.css('display', 'block');

        $.ajax({
            url: "/Attendance/CreateLeaveTypePageView",
            type: "GET",
            success: fun2,
            error: function () {
                $("#Main_Span_Error").text("Something Error");
                loaddingimg.css('display', 'none');
            }
        })
        function fun2(response) {
            $("#SearchLeaveTypePagePartialView").hide();
            $("#CreateLeaveTypePageView_id").html(response);
            //$("#imgAuditIconAllowPastDays").hide();
            loaddingimg.css('display', 'none');
        }
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
}

function BackTOSearhLeaveTypes(event) {
    try {

        loaddingimg.css('display', 'block');
        LeaveTypesCAllingTableView(event);

        $("#SearchLeaveTypePagePartialView").show();

       // SearchLeaveTypePagePartialViewFunction();
        //  LeaveTypesCAllingTableView(event);
        $("#CreateLeaveTypePageView_id").empty();

        $(".ErrorMessageSpan").empty();

        loaddingimg.css('display', 'none');
    } catch (x) {

        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
}


function FN_ClearValues(Formid, ListBoxId) {
    try {
        document.getElementById(Formid).reset(); // Reset the form

        $('#' + ListBoxId).text('');
        $("#TextareaDescriptioncountSPAN").text('50');
        $("#TextareacountSPAN").text('250 Character(s) remaining.');

        $(".ErrorMessageSpan").empty();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}



//THIS for counting characters of textarea

// $("#TxtDescription").on("input", function () {

function CharacterCountingFunction(TextAreaId, CountLimit, Spanid) {
    debugger;
    // var inputVal = $(this).val();
    var textareavalue = $("#" + TextAreaId).val();
    var maxlength = CountLimit;
    var textareacount = maxlength - textareavalue.length;
    if (textareacount <= 0) {


        // Remove any special characters from the input value using regex
        inputVal = textareavalue.slice(0, -1);

        // Set the input value back into the textbox
        $("#" + TextAreaId).val(inputVal);
    }
    $("#" + Spanid).text(textareacount + " Character(s) remaining.");
};
       // });