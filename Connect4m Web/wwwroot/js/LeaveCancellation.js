
function FN_ClearValuesInLeavecancelllation(Formid) {
    try {
        debugger;
        document.getElementById(Formid).reset(); // Reset the form

        // $('#' + ListBoxId).text('');
        $("#DdlEmployee").empty();
        $("#DdlEmployee").append("<option value=''>Please select Employee</option>")
        $("#DdlEmployee").prop("disabled", true);
        $(".ErrorMessageSpan").empty();
        $("#TblLeavesSearchedResultPage_Div").hide();
        $("#TblLeaveDeligationAuthorityList_SearchedRecords").empty();
        // $("#Fm_TblLeaveDeligationAuthorityList_SearchedRecords").hide();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}

function CommentopenPopup(CommentpopupId, Batchid, Userid) {
    debugger;
    $('.ErrorMessageSpan').empty();
    $("#TxtAreaCancelComment").val('');
    $("#TextareacountSPANOf_POPup").text('500');
    var popup = document.getElementById(CommentpopupId);
    popup.style.display = "block";
    $("#OkBtn").attr("onclick", "CancelLeave_Calingfunction(" + Batchid + "," + Userid + ")");
}



//this is for View  and Cancel and Print details

function CancelLeave_Calingfunction(Batchid, Userid) {
    // $('#GetMyAppliedLeaves_Table').on('click', 'td span', function () {
    try {
        debugger;
        $('.ErrorMessageSpan').empty();
        // var Userid = $("#Userid").val();
        if ($("#TxtAreaCancelComment").val() == "") {
            $("#CancelLeaveError").text("Please Enter Leave Cancel Comments .");
            return;
        }
        $("#loadingOverlay").show();
        document.getElementById('DivCancelComment').style.display = "none";
        var BTNtext = "Cancel_LeaveCancellation";
        var Comments = $("#TxtAreaCancelComment").val(); //"check cancel";       
        $.ajax({
            url: "/Attendance/Delete_Cancel_Staff_Saved_Leaves?Batchid=" + Batchid + "&submitButton=" + BTNtext + "&Userid=" + Userid + "&Comments=" + Comments,
            type: "GET",
            success: function (response) {
                debugger;
                // $('#successMessage').text(response.message);
              
                if (response.message == "Request Cancelled Successfully") {
                    TblDataTableWithColumns_CallingFunction(event, 'Stop', '/Attendance/_TblLeavesSearchedResultPage_LeaveCancellation', 'TblLeaveDeligationAuthorityList_SearchedRecords', 'counts', 'FmLeavesSearchPage_SearchDetails','TblLeavesSearchedResultPage_Div');
                    //  _TblLeavesSearchedResultPage_PagePartialViewFunction(event);
                   // $("#followingfieldsErrorSPAN").text(response.message);
                }             
                $("#followingfieldsErrorSPAN").text(response.message);
                window.scrollTo(0, 0);
            } ,
            error(xhr, status, error) {
                $("#followingfieldsErrorSPAN").text("Something Error");
            }
        });
      //  $("#loadingOverlay").hide();
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
}


//This Is For Update
function FmUpdateLeaves_CalingFunction(event) {
    try {
        debugger;
        event.preventDefault(); // prevent the form from submitting

        $(".ErrorMessageSpan").empty();
       
        //  var file12 = $('#attachdocument').prop('files')[0]; // Get the selected file
        var Fromdate = $("#fromdate").val();
        var Todate = $("#todate").val();
        var Descriptionid = $("#Descriptionid1").val();
        var Leavetype = $("#leavetype").val();
        var radioButtons = document.querySelectorAll('.check:checked');
        var Daystype12 = Array.from(radioButtons).map(function (button) {
            return button.value;
        });
        var c = 0;

        if (Descriptionid === '' || Leavetype === '' || Fromdate === '' || Todate === '' || $("input[type='radio'].check").is(':checked') == false || $("input[type='radio'].check1").is(":checked") == false) {
            //  $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
            if (Leavetype === '') {
                $("#LeavetypeERROR").text("Leave Type"); c++;
            }
            if (Descriptionid === '') {
                $("#DescriptionidERROR").text("Description"); c++;
            }
            if ($("input[type='radio'].check").is(':checked') == false) {
                $("#DaystypeERROR").text("Day type"); c++;
            }

            if ($("input[type='radio'].check").is(":checked") == true) {
                var dayvalue = $("input[type='radio'].check:checked").val();

                if (dayvalue == "1") {
                    if (Fromdate === '') {
                        $("#FromdateERROR").text("Date"); c++;
                    }
                } else {
                    if (Fromdate === '') {
                        $("#FromdateERROR").text("From date"); c++;
                    }
                    if (Todate === '' || Todate == "" || Todate === "") {
                        $("#TodateERROR").text("To date"); c++;
                    }
                }

                if ($("input[type='radio'].check1").is(":checked") == false && $("input[type='radio'].check:checked").val() == "1") {
                    $("#DaysessionERROR").text('Day Session'); c++;
                }

            }

            if (c > 0) {
                $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
                return;
            }
            //return;
        }

        else if (Fromdate != '' || Todate != '') {
            if (Date.parse(Todate) < Date.parse(Fromdate)) {
                $("#Datechecking").text("'From Date' cannot be greater than 'To Date'. ");
                return;
            }
        }

     
        var n = 1.0;
        var TotalLeaves = 0.5;
        if (Daystype12 == "1") {
            TotalLeaves = 0.5;
        }
        else {
            var fromDate = new Date($('#fromdate').val());
            var toDate = new Date($('#todate').val());

            // Calculate the difference in milliseconds between the two dates
            var timeDiff = toDate.getTime() - fromDate.getTime();

            // Convert milliseconds to days
            var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            TotalLeaves = daysDiff + 1;

        }
        var LeaveDaysAvailable1 = $("#GetLeaveDaysAvailableid").text();
        var LeaveDaysAvailable = parseFloat(LeaveDaysAvailable1) - TotalLeaves;

        var leavetype12 = $("#leavetype option:selected").text();




        //  var id = $("#EditBTid").closest("tr").find("td:nth-child(2)").text();
        // var id = $("#EditBTid").closest("tr").find("td:nth-child(6)").text();
        var btn = $("#savebutton").val();
        debugger;
        var LeaveApplicationId = $("#LeaveApplicationId").val();

        //if (btn == "Update Leave" && LeaveApplicationId != "") {
        //    LeaveDaysAvailable += parseFloat($("#TotaldaysInTable").val());
        //    if (LeaveDaysAvailable < 0) {
        //        text1 = "You can't apply more than available leaves under " + leavetype12 + " ";
        //        $("#followingfieldsErrorSPAN").text(text1);
        //        return;
        //    }
        //}
        LeaveDaysAvailable += parseFloat($("#AppliedLeavedays").val());
        if (LeaveDaysAvailable <= 0 && Leavetype != "122") {

            // You have no available leaves to apply more under Earned Leave
            var text1 = "";
            //  var rowid = $("#EditBTid").val();
            if (LeaveDaysAvailable1 <= 0) {
                text1 = "You can't apply more than available leaves under " + leavetype12 + " ";
            }
            else {
                var yearconvert1;
                var monthconvert1;
                var dayconvert1;
                var Fromdateconvert1 = new Date(Fromdate);
                yearconvert1 = Fromdateconvert1.getFullYear();
                monthconvert1 = ('0' + (Fromdateconvert1.getMonth() + 1)).slice(-2);
                dayconvert1 = ('0' + Fromdateconvert1.getDate()).slice(-2);
                var fromdateconvert = dayconvert1 + '-' + monthconvert1 + '-' + yearconvert1;

                var todateconvert1 = new Date(Todate);
                yearconvert1 = todateconvert1.getFullYear();
                monthconvert1 = ('0' + (todateconvert1.getMonth() + 1)).slice(-2);
                dayconvert1 = ('0' + todateconvert1.getDate()).slice(-2);
                var Todateconvert = dayconvert1 + '-' + monthconvert1 + '-' + yearconvert1;

                text1 = "You have only '" + LeaveDaysAvailable1 + "' available  leaves under '" + leavetype12 + "' so you can't apply leave from '" + fromdateconvert + "' to '" + Todateconvert + "'"
            }
            // You can't apply more than available leaves under Casual Leave
            $("#followingfieldsErrorSPAN").text(text1);
            return;
        }

        var formData = new FormData($("#FmUpdateLeaves")[0]);// $(this).serialize(); // get the form data

        $("#loadingOverlay").show();
        var Userid = $("#Userid").val();
        var bt = $("#savebutton").val();
        /* alert(bt)*/
        $.ajax({
            /* url: "/Attendance/ApplyStaffLeave",*/
            url: "/Attendance/ApplyStaffLeave?submitButton=" + bt + "&Userid=" + Userid,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {


                //if (response.message == "2") {
                //    $('#attachdocument').val('');
                //    $("#successMessage").text('Already a file with the same name is attached to another Leave. Please upload a new file.');
                //    return;
                //}

                if (response.message == "Record updated successfully.") {
                    $("#followingfieldsErrorSPAN").text(response.message);
                    $("#savebutton").prop("disabled", true);
                }
                else {
                    $("#followingfieldsErrorSPAN").text(response.message);
                }
                $("#loadingOverlay").hide();
                // handle the response from the server
            },
            error: function (xhr, status, error) {
                // alert($("#submitButton").val());
                $("#loadingOverlay").hide();
                $("#followingfieldsErrorSPAN").text("Something Error");
                // handle the error
            }
        });
        window.scrollTo(0, 0);
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
}


//  To get Partial View of Add LeavesSearchPage
function EditLeavesCalingFunction(Userid, LeaveApplicationId, LeaveRequestStatus, Employeename) {
    try {
        $(".ErrorMessageSpan").empty();
        // event.preventDefault();
        debugger;
        var dept = $(this).closest('tr').find('td:eq(1)').text();

        $("#loadingOverlay").show();
        $.ajax({
            url: "/Attendance/_EditLeavesPage_LeaveCancellation?Userid=" + Userid + "&LeaveApplicationId=" + LeaveApplicationId,
            type: "POST",
            success: function (data) {
                $("#LeavesSearchPage_Div").hide();
                //  $("#TblLeavesSearchedResultPage_Div").empty();
                $("#TblLeavesSearchedResultPage_Div").hide();
                $("#_EditLeavesPage_LeaveCancellation_Div").html(data);
                var Userid = $("#Userid").val();
                debugger;
                $.ajax({
                    url: "/Attendance/GetSubmittedLeaveRequestsDetailsByUseridLeaveIdforEdit?LeaveApplicationId=" + LeaveApplicationId + "&Userid=" + Userid,
                    type: "GET",
                    success: function fun215(response) {
                        $("#AppliedLeavedays").val(response[0].total);
                        $("#SpanEmpName").text(Employeename);

                        $("#SpanEmpDept").text(dept);
                        //====This is getting Values

                        debugger;
                        //var EDITbtnID1 = $(this).find('#id_For_Edit').val();
                        var LeavetypeidCT2 = response[0].leavetypeid;
                        var DescriptionidCT2 = response[0].leaveReason;
                        var marriagecheckingCT2 = response[0].marriagechecking_String;
                        var FromdateCT2 = response[0].fromdate;
                        var TodateCT2 = response[0].todate;
                        var DaystypeCT2 = response[0].daystype;
                        var DaysessionCT2 = response[0].daysession;
                        var LeavecommentsCT2 = response[0].leavecomments;
                        var Batchid12 = response[0].batchid;
                        var LeaveApplicationIdCT12 = response[0].leaveApplicationId;
                        debugger


                        if (response[0].leaveDetails == "1") {
                            $("#imgAuditIconLeavetype").show();
                        } else {
                           // $('#input[type="image"].imgAuditIcon#imgAuditIconLeavetype').remove();
                            $('#imgAuditIconLeavetype').remove();
                        }
                        if (response[0].text == "1") {
                            $("#imgAuditIconFrodate").show();
                        } else {
                            //$('#input[type="image"].imgAuditIcon#imgAuditIconFrodate').remove();
                            $('#imgAuditIconFrodate').remove();
                        }
                        if (response[0].value == "1") {
                            $("#imgAuditIconTodate").show();
                        } else {
                           // $('#input[type="image"].imgAuditIcon#imgAuditIconTodate').remove();
                            $('#imgAuditIconTodate').remove();
                        }

                        // var attachdocumentCT12 = response[0].attachdocument;


                        //====This is Posting Values


                        $("#LeaveApplicationId").val(LeaveApplicationIdCT12);
                        $("#RequestStatus").val(LeaveRequestStatus);

                        //  var file12 = $(this).closest('tr').find('td').find('.attachdocumentCT').prop('files')[0]; // Get the selected file

                        //var AttachDocumentTB_FileName_LABEL = document.getElementById("AttachDocumentTB_FileName_LABEL");
                        //var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");
                        //var DELETE_valueToAppend = "";
                        //if (attachdocumentCT12 == "") {
                        //    DELETE_valueToAppend = ""
                        //    AttachDocumentTB_FileName_LABEL.innerHTML = "";
                        //    $("#FmUpdateLeaves").find('div').find("FmUpdateLeaves ,#attachdocument_String").val('');
                        //}
                        //else {
                        //    deletebtn.innerHTML = "";
                        //    if (attachdocumentCT12 != "") {
                        //        DELETE_valueToAppend = "Delete";
                        //    }
                        //    else {
                        //        DELETE_valueToAppend = ""
                        //    }
                        //    AttachDocumentTB_FileName_LABEL.innerHTML = "";
                        //    AttachDocumentTB_FileName_LABEL.innerHTML += attachdocumentCT12.replace(/^\d+/, '');
                        //    $("#FmUpdateLeaves").find('div').find("FmUpdateLeaves ,#attachdocument_String").val('');
                        //    $("#FmUpdateLeaves").find('div').find("FmUpdateLeaves ,#attachdocument_String").val(attachdocumentCT12);
                        //}
                        //deletebtn.innerHTML += DELETE_valueToAppend;




                        //if (LeavetypeidCT2 == 126 || LeavetypeidCT2 == 143) {
                        //    $("#MedicalLeaveDocument").show();

                        //   // $("#attachdocument")[0].files = $(this).closest('tr').find('td').find('.attachdocumentCT')[0].files;

                        //} else {
                        //    $("#MedicalLeaveDocument").hide();
                        //    $("#MedicalLeaveDocument").val('');
                        //}
                        debugger;


                        //   GetLeaveDaysAvailable(LeavetypeidCT2);

                        //  function GetLeaveDaysAvailable(LeavetypeidCT2) {

                        $("#GetLeaveDaysAvailableid").empty();

                        //  var Userid = $("#Userid").val();

                        var totalleaves = 0.0;
                        $.ajax({
                            url: "/Attendance/GetLeaveDaysAvailable?leavetype=" + LeavetypeidCT2 + "&Userid=" + Userid,
                            dataType: 'json',
                            type: "GET",
                            success: function (response) {
                                debugger;
                               //if (LeaveApplicationIdCT12 == "") {
                                    totalleaves = parseFloat(response);
                                //}
                                //else {
                                //    totalleaves = parseFloat(response);
                                //}

                                $("#GetLeaveDaysAvailableid").append(totalleaves);
                                $("#GetLeaveDaysAvailableidtTotal").val('');
                                $("#GetLeaveDaysAvailableidtTotal").val(totalleaves);


                                $("#HdnLeavetypeidForGetcurrectLeavedays").val(LeavetypeidCT2);
                                $("#HdnGetLeaveDaysAvailabletoLeavetype").val(totalleaves);
                            }
                        });

                        // }


                        //  $("#FmUpdateLeaves").find('div').find("FmUpdateLeaves ,#Descriptionid1").prop("disabled", false);


                        $("#Textarea").val(LeavecommentsCT2);
                        if (marriagecheckingCT2 == "1") {
                            $("#marriagechecking").prop("checked", true);
                            $("#Descriptionid1").val("5");
                            //    $("#Descriptionid1").val("Marriage");
                            $("#Descriptionid1").prop("disabled", true);
                            $("#labelLB").text("(Note: All Casual Leaves with combination of Earned Leaves can avail)");
                            GetLeaveTypeDropdown_CallingMethod('marrigechecktrue', LeavetypeidCT2);
                            $("#GetLeaveDaysAvailableid").text('');
                        }
                        else {
                            $("#marriagechecking").prop("checked", false);
                            $("#labelLB").text('');
                            //$(this).removeClass('labelLB');
                            //  $("#Descriptionid1").prop("disabled", false);
                            $("#leavetype").val(LeavetypeidCT2);
                        }

                        $("#Descriptionid1 option:contains('" + DescriptionidCT2 + "')").prop("selected", true);

                        if ($("#Descriptionid1").val() == '') {
                            debugger;
                            $("#Descriptionid1").append("<option value='0'>" + DescriptionidCT2 + "</option>");
                            $("#Descriptionid1 option:contains('" + DescriptionidCT2 + "')").prop("selected", true);
                        }
                        $("#DescriptionidTB1").val(DescriptionidCT2);

                        if (DaystypeCT2 == "Half day" || DaystypeCT2 == "Half Day") {
                            $("#todateLB").hide();
                            $("#todate").hide();
                            $("#HAlfdayLB").show();
                            $("#fromdateLB").hide();
                            $("#ErrorrmessageSPAN").hide();
                            $("#DaySession").show();
                            $("#fromdate").val('');

                            $("#radioinline1").prop("checked", false);
                            $("#radioinline2").prop("checked", true);

                            if (DaysessionCT2 == "1" || DaysessionCT2 == "Morning") {

                                $("#radioinline11").prop("checked", true);
                                $("#radioinline21").prop("checked", false);
                            }
                            else /*if (DaysessionCT2 == "2")*/ {

                                $("#radioinline11").prop("checked", false);
                                $("#radioinline21").prop("checked", true);
                            }

                            $('#imgAuditIconTodate').remove();
                        }
                        else if (DaystypeCT2 == "Full day" || DaystypeCT2 == "Full Day") {
                            $("#todateLB").show();
                            $("#todate").show();
                            $("#todate").val('');
                            $("#fromdateLB").show();
                            $("#HAlfdayLB").hide();
                            $("#ErrorrmessageSPAN").show();
                            $("#DaySession").hide();
                            $("#radioinline1").prop("checked", true);
                            $("#radioinline2").prop("checked", false);


                            $("#radioinline11").prop("checked", false);
                            $("#radioinline21").prop("checked", false);

                        }

                        $("#fromdate").val(FromdateCT2.split("T")[0]);
                        $("#todate").val(TodateCT2.split("T")[0]);
                        $("#Hdnfromdate").val(FromdateCT2.split("T")[0]);
                        $("#Hdntodate").val(TodateCT2.split("T")[0]);
                        $("#BatchidTextbox").val(Batchid12);
                        $("#Dates_Div").show();
                        $("#loadingOverlay").hide();
                    },
                    error: function (xhr, status, error) {
                        $("#Main_Span_Error").text("Something Error");
                    }
                })
            }
        });
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
}



//  To get Partial View of Add LeavesSearchPage
function _LeavesSearchPage_PagePartialViewFunction() {
    try {
        $(".ErrorMessageSpan").empty();
        debugger;
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/_LeavesSearchPage_LeaveCancellation",
            type: "GET",
            success: function (data) {
                debugger;
                // $("#LeavesSearchPage_Div").empty();

                $("#LeavesSearchPage_Div").html(data);
                DepartmentsDropdown_Caliingfunction('DdlDepartment', '1', 'SelectName');
                TblDataTableWithColumns_CallingFunction(event, 'Stop', '/Attendance/_TblLeavesSearchedResultPage_LeaveCancellation', 'TblLeaveDeligationAuthorityList_SearchedRecords', 'counts', 'FmLeavesSearchPage_SearchDetails','TblLeavesSearchedResultPage_Div');
                //  _TblLeavesSearchedResultPage_PagePartialViewFunction(event, 'stop');
            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
            }

        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}


function BackTOSearhUserLeavestypes(event) {
    try {
        debugger;

        $("#loadingOverlay").show();
        $("#LeavesSearchPage_Div").show();
        // _LeavesSearchPage_PagePartialViewFunction();
        $("#TblLeavesSearchedResultPage_Div").show();
        $("#_EditLeavesPage_LeaveCancellation_Div").empty();

        $(".ErrorMessageSpan").empty();
        // _TblLeavesSearchedResultPage_PagePartialViewFunction(event, "12");
        TblDataTableWithColumns_CallingFunction(event, 'Nostop', '/Attendance/_TblLeavesSearchedResultPage_LeaveCancellation', 'TblLeaveDeligationAuthorityList_SearchedRecords', 'counts', 'FmLeavesSearchPage_SearchDetails','TblLeavesSearchedResultPage_Div');

        $("#loadingOverlay").hide();
    } catch (x) {

        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
}



//This is not Using
//This is for Bind Dropdown when checked marriage check box

//$(document).ready(function () {


//    $("#marriagechecking").click(function () {
//        try {
//            debugger;

//           // printDetails_Form_IN_ApplyLeave_FOR_Hide();
//            var isChecked = $("#marriagechecking").prop("checked");
//            debugger;
//            if (isChecked) {

//                var TB_Length = $("#myFormCart tbody tr").length;
//                if (TB_Length > 0) {
//                    $('#your-p-id').find('span').empty();
//                    $("#followingfieldsErrorSPAN").text("You can't select Marriage Leave now, you have added some leaves to Leave Cart.");
//                    // $("#marriagechecking").hide();
//                    $("#marriagechecking_Span").hide();
//                    $("#marriagechecking").prop("checked", false);
//                    $("#labelLB").text('');
//                    $(this).removeClass('labelLB');
//                }
//                else {


//                    $("#Descriptionid1").val("5");
//                    //    $("#Descriptionid1").val("Marriage");
//                    $("#Descriptionid1").prop("disabled", true);
//                    $("#labelLB").text("(Note: All Casual Leaves with combination of Earned Leaves can avail)");

//                    var leavetypedropdown = $('#leavetype'); // Replace 'myDropdown' with the ID of your dropdown

//                    // Clear the dropdown
//                    leavetypedropdown.empty();

//                    // Add back the desired options
//                    leavetypedropdown.append('<option value="">-------select-------</option>')
//                    leavetypedropdown.append('<option value="120">Casual Leave</option>');
//                    leavetypedropdown.append('<option value="121">Earned Leave</option>');
//                    leavetypedropdown.append('<option value="182">Casuall leave</option>');
//                    $("#GetLeaveDaysAvailableid").text('');
//                }
//            }
//            else {
//                debugger;
//                $("#Descriptionid1").val("");
//                $("#Descriptionid1").prop("disabled", false);
//                $("#labelLB").text('');
//                $(this).removeClass('labelLB');
//                $("#GetLeaveDaysAvailableid").text('');
//                debugger;
//                GetLeaveTypeDropdown_CallingMethod();
//            }
//        } catch (e) {
//            $("#followingfieldsErrorSPAN").text("Something Error");
//        }
//    });
//});
