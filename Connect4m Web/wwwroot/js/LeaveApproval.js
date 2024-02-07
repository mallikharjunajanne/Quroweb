


    function DdlDepartmentId_Calingfunction() {
    
    try {

        $.ajax({
            url: "/Attendance/DdlDepartmentIdIOfStaff_Calingfunction",
            type: "GET",
            success: function (response) {
                $("#DdlDepartmentId").empty();
                $("#DdlDepartmentId").append('<option value="">---------Select---------</option>');
                $.each(response, function (i, Value2) {
                    $("#DdlDepartmentId").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
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
    
    
    function Roles_InstanceRole_SELByInstanceId_CallingFunction() {
    try {
    $.ajax({
        url: "/Attendance/Roles_InstanceRole_SELByInstanceId_CallingFunction",
        type: "GET",
        success: function (response) {
            $("#DdlRoles").empty();
            $("#DdlRoles").append('<option value="">' + "---------Select--------" + '</option>');


            $.each(response, function (i, Value2) {
                $("#DdlRoles").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
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
    
    
    function TblAppliedStaffLeaves_SearchRecords_Calingfunction(event, val, EffectiveTableid, RecordcountSpanId, ExportExcelLink, FromdateId, TodateId, SearchRecords_Div) {
    try {


    //val for loading page
    debugger;
    if (val != 12) {
        event.preventDefault();
        loaddingimg.css('display', 'block');
    }

    var Departmentid = $("#DdlDepartmentId").val();
    var RoleID = $("#DdlRoles").val();
    var Fromdate = $("#" + FromdateId).val();
    var Todate = $("#" + TodateId).val();
    var FirstName = $("#ctl00_ContentPlaceHolder1_txtfirstname").val();
    var LastName = $("#ctl00_ContentPlaceHolder1_txtlastname").val();
        var UserName = $("#ctl00_ContentPlaceHolder1_txtUserName").val();
    debugger;
    $.ajax({
        url: "/Attendance/TblAppliedStaffLeaves_SearchRecords_Calingfunction?Departmentid=" + Departmentid + "&FirstName=" + FirstName + "&UserName=" + UserName + "&LastName=" + LastName + "&RoleID=" + RoleID + "&Fromdate=" + Fromdate + "&Todate=" + Todate,//+"&values="+ queryString,
        type: "GET",
        success: function (response) {
            debugger;
            $("#" + EffectiveTableid + " tbody").empty();
            $("#FmAppliedStaffLeaves_SearchRecords_Div").show();
            if (response.length <= 0) {
                //if ($("#TblApplied_SearchRecords tbody tr").length <= 0) {
                //$("#" + SearchRecords_Div).hide();

                $("#" + EffectiveTableid).hide();
               // $("#" + RecordcountSpanId).text("");
               // $("#" + RecordcountSpanId).text("NO RECORDS");
                $("#" + RecordcountSpanId).text("0");
                $("#" + ExportExcelLink).hide();

                // $("#Main_Span_Error").text("No records.");
            }
            else {
                //$("#" + RecordcountSpanId).text("");
               // $("#" + RecordcountSpanId).html("YOUR SEARCH RESULTED <span class='number-circle'> " + response.length + "</span> RECORD(S).");
                $("#" + RecordcountSpanId).text(response.length);
                // $("#TblApplied_SearchRecords tbody").empty();
                var DeligationRecord = "";
                var LeaveType = "";
                $.each(response, function (i, Value2) {
                    //DeleteBTN = "<p class='fa fa-trash -o' title='Click to delete this record' style='font-size:18px; color:red; cursor:pointer; '><input type='text' hidden  id='id_For_Delete' value=''></p>";

                    if (Value2.delegationRecord =="True") {
                        DeligationRecord = "Yes";
                    }
                    else {
                        DeligationRecord = "No";
                    }

                    if (Value2.leaveType == "P" || Value2.leaveType == " P") {
                        LeaveType = "SL";
                    }
                    else {
                        LeaveType = Value2.leaveType;
                    }

                    $("#" + EffectiveTableid + " tbody").append(
                        //  $("#TblApplied_SearchRecords tbody").append(
                        "<tr>" +

                        "<td >" + Value2.name + "</td>" +

                        "<td>" + Value2.classificationName + " </td>" +
                        "<td>" + Value2.fromdateString + "</td>" +
                        "<td>" + Value2.todateString + "</td>" +
                        "<td>" + LeaveType + "</td>" +
                        "<td>" + Value2.reason + "</td>" +
                        "<td>" + Value2.noOfDays + " </td>" +

                        "<td>" + Value2.requestedDate + "</td>" +

                        //  "<td>" + leaveAppliedDateConvert12 + "</td>" +
                        "<td>" + DeligationRecord + " </td>" +

                        // "<td>" + viewfiles + "</td>" +
                        "<td style='text-align:center;' ><a style='cursor: pointer;' class='badge rounded-pill bg-label-primary' id='ctl00_ContentPlaceHolder1_TblApplied_SearchRecords_lnkApproveReject'>Approve/Reject</a><input  type='hidden' id='StaffId' value='" + Value2.staffId + "' /><input  type='hidden' id='InstanceClassificationId' value='" + Value2.instanceClassificationId + "' /><input  type='hidden' id='InstanceId' value='" + Value2.instanceId + "' /><input  type='hidden' id='BatchId' value='" + Value2.batchId + "' /></td>" +
                        "</tr>"
                    );
                });
                ////these are for add id to ID_APPEND_For_Edit
                //var rows = $("#" + EffectiveTableid + " tbody tr");
                //rows.each(function (index) {
                //    $(this).attr('id', 'row' + (index + 1));
                //    //  $(this).attr('value', 'row' + (index + 1));
                //});

                $("#" + SearchRecords_Div).show();
                $("#" + EffectiveTableid).show();
                $("#" + ExportExcelLink).show();
                $("#Main_Span_Error").empty();
               
            }
            debugger;
            loaddingimg.css('display', 'none');
        }
        ,
        error: function (xhr, status, error) {
            loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
        }

    
    });
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}
    
    
    function TblApprovedStaffLeaves_SearchRecords_Calingfunction(event, val, EffectiveTableid, RecordcountSpanId, FromdateId, TodateId, SearchRecords_Div, ApprovedRejectedProp) {
    try {

    //val for loading page
    debugger;
    if (val != 12) {
        event.preventDefault();
    }

    var DepartmentName = $("#DdlApproved_Rejected").val();
    var Fromdate = $("#" + FromdateId).val();
    var Todate = $("#" + TodateId).val();
        
        if (Fromdate === "") {                       
            if (Todate != "") {
                $("#Main_Span_Error").text('Please Select From Date also');         
                return;
            }         
        }
        if ( Todate === "") {
            if (Fromdate != "") {
                $("#Main_Span_Error").text('Please Select To Date also');
                return;
            }
        }
        if (Date.parse(Fromdate) > Date.parse(Todate)) {
            $("#Main_Span_Error").text("'From Date' cannot be greater than 'To Date'. ");
            return;
        }
            loaddingimg.css('display', 'block');
    $.ajax({
        url: "/Attendance/TblApprovedStaffLeaves_SearchRecords_Calingfunction?DepartmentName=" + DepartmentName + "&Fromdate=" + Fromdate + "&Todate=" + Todate + "&ApprovedRejectedProp=" + ApprovedRejectedProp,//+"&values="+ queryString,
        type: "GET",
        success: function (response) {
            debugger;
            $("#ApprovedLeaves_SearchRecords_Div_For_Print").show();
            $("#" + EffectiveTableid + " tbody").empty();
            if (response.length <= 0) {
                //if ($("#TblApplied_SearchRecords tbody tr").length <= 0) {
                $("#" + SearchRecords_Div).hide();
                //var PrintBTN = document.getElementById("ApprovedLeaves_SearchRecordsPrintBTN");
                //PrintBTN.innerHTML = "";
                $("#ApprovedLeaves_SearchRecordsPrintBTN").css('display', 'none');
                $("#" + EffectiveTableid).hide();
                //$("#" + RecordcountSpanId).text("");
                //$("#" + RecordcountSpanId).text("NO RECORDS");
                $("#" + RecordcountSpanId).text("0");
                // $("#" + ExportExcelLink).hide();
                $("#Main_Span_Error").text("");
                $("#Main_Span_Error").text("No Records found.");
            } else {
                debugger;
                //var PrintBTN = document.getElementById("ApprovedLeaves_SearchRecordsPrintBTN");
                //PrintBTN.innerHTML = "";
                //PrintBTN.innerHTML = "PRINT";
                $("#ApprovedLeaves_SearchRecordsPrintBTN").css('display', 'block');
                $("#Main_Span_Error").text("");
               // $("#" + RecordcountSpanId).text("");
               // $("#" + RecordcountSpanId).html("YOUR SEARCH RESULTED <span class='number-circle'> " + response.length + "</span> RECORD(S).");
                $("#" + RecordcountSpanId).text(response.length);

                // $("#TblApplied_SearchRecords tbody").empty();

                $.each(response, function (i, Value2) {
                    //DeleteBTN = "<p class='fa fa-trash -o' title='Click to delete this record' style='font-size:18px; color:red; cursor:pointer; '><input type='text' hidden  id='id_For_Delete' value=''></p>";



                    $("#" + EffectiveTableid + " tbody").append(
                        //  $("#TblApplied_SearchRecords tbody").append(
                        "<tr>" +
                        "<td>" + Value2.staffName + "</td>" +
                        "<td>" + Value2.classificationName + " </td>" +
                        "<td>" + Value2.reason + "</td>" +
                        "<td>" + Value2.leaveType + "</td>" +
                        "<td>" + Value2.fromdateString + "</td>" +
                        "<td>" + Value2.todateString + "</td>" +
                        "<td>" + Value2.noOfDays + " </td>" +
                        "<td>" + Value2.requestedDate + "</td>" +
                        //  "<td>" + leaveAppliedDateConvert12 + "</td>" +
                        "<td>" + Value2.approvedDate + " </td>" +
                        "</tr>"
                    );
                });
                ////these are for add id to ID_APPEND_For_Edit
                //var rows = $("#" + EffectiveTableid + " tbody tr");
                //rows.each(function (index) {
                //    $(this).attr('id', 'row' + (index + 1));
                //    //  $(this).attr('value', 'row' + (index + 1));
                //});

                $("#" + SearchRecords_Div).show();
                $("#" + EffectiveTableid).show();
                // $("#" + ExportExcelLink).show();
                $("#Main_Span_Error").empty();        
            }
            loaddingimg.css('display', 'none');
        }
        ,
        error: function (xhr, status, error) {
            loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
        }
    });
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}
    
    function TblLeaveRequested_SearchRecords_Calingfunction(event, val, EffectiveTableid, RecordcountSpanId, ExportExcelLink, FromdateId, TodateId, SearchRecords_Div) {
    try {
    //val for loading page
    debugger;
        if (val != 12) {
            event.preventDefault();
        }
    $(".ErrorMessageSpan").empty();
    var LeaveselectedType = $("input[type='radio'].check:checked").val();
    /*    var RoleID = $("#DdlRoles").val();*/
    var RoleID = 0;
    var Fromdate = $("#" + FromdateId).val();
    var Todate = $("#" + TodateId).val();
    if (Fromdate === "" || Todate === "" || LeaveselectedType === undefined || LeaveselectedType === "") {
        $("#Main_Span_Error").text('Following fields have invalid data :');
        debugger;
        if (Fromdate === "") {
            $("#Fromdate_Span_Error").text('From Date');
        }
        if (Todate === "") {
            $("#Todate_Span_Error").text('To Date');
        }
        if (LeaveselectedType === "" || LeaveselectedType == undefined) {
            $("#Leaveselected_Span_Error").text('Leave Status');
        }
        return;
    }
    if (Fromdate != '' || Todate != '') {
        //You can't select future dates, dates should be less than or equal to todays date'
        //To Date Must be Greater than From Date.

        //var today = new Date();
        //var year = today.getFullYear();
        //var month = ('0' + (today.getMonth() + 1)).slice(-2);
        //var day = ('0' + today.getDate()).slice(-2);
        //var dateString = year + '-' + month + '-' + day;
        if (Date.parse(Todate) < Date.parse(Fromdate)) {
            $("#Main_Span_Error").text("To Date Must be Greater than From Date.");
            return;
        }
    }
       // setTimeout(function () {
            loaddingimg.css('display', 'block');
       // }, 100);

        var ExcelDownloadColumnsNo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        TblDataTableWithColumns_CallingFunction(event, 'noStop', "/Attendance/TblLeaveRequested_SearchRecords_Calingfunction?LeaveselectedType=" + LeaveselectedType + "&RoleID=" + RoleID + "&Fromdate=" + Fromdate + "&Todate=" + Todate, 'TblLeaveRequested_SearchRecords', 'LeaveRequestedCounts', 'FmLeaveRequested_SearchRecords', 'LeaveRequested_SearchRecords_Div', 'LeavesRequested', ExcelDownloadColumnsNo, false);
      
    //$.ajax({
    //    url: "/Attendance/TblLeaveRequested_SearchRecords_Calingfunction?LeaveselectedType=" + LeaveselectedType + "&RoleID=" + RoleID + "&Fromdate=" + Fromdate + "&Todate=" + Todate,//+"&values="+ queryString,
    //    type: "GET",
    //    success: function (response) {
            
    //        $("#" + EffectiveTableid + " tbody").empty();
    //        if (response.length <= 0) {
    //            //if ($("#TblApplied_SearchRecords tbody tr").length <= 0) {
    //            //$("#" + SearchRecords_Div).hide();

    //            $("#" + SearchRecords_Div).hide();
    //           // $("#" + EffectiveTableid + " tbody").empty();
    //            $("#" + EffectiveTableid).hide();
    //            $("#" + RecordcountSpanId).text("");
    //            $("#" + RecordcountSpanId).text("NO RECORDS");
    //            $("#" + ExportExcelLink).hide();
    //            var PrintBTN = document.getElementById("LeaveRequested_SearchRecordsPrintBTN");
    //            PrintBTN.innerHTML = "";
    //            $("#Main_Span_Error").text("No Records Found.");
    //        } else {
    //            var PrintBTN = document.getElementById("LeaveRequested_SearchRecordsPrintBTN");
    //            PrintBTN.innerHTML = "";
    //            PrintBTN.innerHTML = "PRINT";
    //            debugger;
    //            $("#" + RecordcountSpanId).text("");
    //            $("#" + RecordcountSpanId).text("YOUR SEARCH RESULTED " + response.length + " RECORD(S).");
    //            //var table = js('#' + EffectiveTableid).DataTable();
    //            //var currentPage = table.page.info().page;
    //            //table.destroy();
    //            //js('#' + EffectiveTableid).DataTable({
    //            //    "columnDefs": [
    //            //        { "visible": false, "targets": [0] } // Hide the first (name) column
    //            //    ]
    //            //});
    //            // $("#TblApplied_SearchRecords tbody").empty();
    //            var count = 0;
    //            var Name = "";
    //            var id = 1;
    //            var id1 = 1;
    //            $.each(response, function (i, Value2) {
    //                if (count == 0) {
    //                    Name = Value2.name;
    //                }
    //                if (Name != Value2.name || count == 0) {
    //                    if (count != 0) {
    //                        id1 = id + 1;
    //                    }
    //                    $("#" + EffectiveTableid + " tbody").append(
    //                        //  $("#TblApplied_SearchRecords tbody").append(
    //                        "<tr>" +
    //                        "<td rowspan='0' id=" + id1 + " style='vertical-align: middle;'>" + Value2.name + "</td>" +
    //                        // "<td>" + Value2.name + "</td>" +
    //                        "<td>" + Value2.classificationName + " </td>" +
    //                        "<td>" + Value2.subClassificationName + " </td>" +
    //                        "<td>" + Value2.leaveType + "</td>" +
    //                        "<td>" + Value2.reason + "</td>" +
    //                        "<td>" + Value2.fromdateString + "</td>" +
    //                        "<td>" + Value2.todateString + "</td>" +
    //                        "<td>" + Value2.noOfDays + " </td>" +
    //                        "<td>" + Value2.requestedDate + "</td>" +
    //                        //  "<td>" + leaveAppliedDateConvert12 + "</td>" +
    //                        "<td>" + Value2.approvedDate + " </td>" +
    //                        "<td>" + Value2.approvalStatus + " </td>" +
    //                        "</tr>"
    //                    );
    //                    if (count != 0) {
                          
    //                        var spanCell = $("#" + id);
    //                        id++;
    //                        var rowspanValue = count; // Set the desired rowspan value
    //                        spanCell.attr("rowspan", rowspanValue);
    //                    }
    //                    count = 1;
    //                    Name = Value2.name;
    //                }
    //                else {
    //                    debugger;
    //                    $("#" + EffectiveTableid + " tbody").append(


    //                        //  $("#TblApplied_SearchRecords tbody").append(
    //                        "<tr>" +

    //                        // "<td rowspan=" + count+">" + Value2.name + "</td>" +

    //                        "<td>" + Value2.classificationName + " </td>" +
    //                        "<td>" + Value2.subClassificationName + " </td>" +
    //                        "<td>" + Value2.leaveType + "</td>" +

    //                        "<td>" + Value2.reason + "</td>" +
    //                        "<td>" + Value2.fromdateString + "</td>" +
    //                        "<td>" + Value2.todateString + "</td>" +

    //                        "<td>" + Value2.noOfDays + " </td>" +

    //                        "<td>" + Value2.requestedDate + "</td>" +

    //                        //  "<td>" + leaveAppliedDateConvert12 + "</td>" +
    //                        "<td>" + Value2.approvedDate + " </td>" +
    //                        "<td>" + Value2.approvalStatus + " </td>" +
    //                        "</tr>"
    //                    );
    //                    count++;
    //                }
    //            });
    //            var spanCell = $("#" + id);
    //            id++;
    //            var rowspanValue = count; // Set the desired rowspan value
    //            spanCell.attr("rowspan", rowspanValue);
    //            //js('#' + EffectiveTableid).DataTable().columns.adjust().draw();

    //            //js('#' + EffectiveTableid).DataTable({
    //            //    "columnDefs": [
    //            //        { "visible": true, "targets": [0] } // Hide the first (name) column
    //            //    ]
    //            //});

    //            //js('#' + EffectiveTableid).DataTable();

    //            debugger;
    //            //var ExcelDownloadColumnsNo = [0, 1, 2, 3, 4];
    //            //TblDataTableWith_OutColumns_CallingFunction(EffectiveTableid, response, response.length, currentPage, 'LeavesRequested', ExcelDownloadColumnsNo, '', SearchRecords_Div);

    //            ////these are for add id to ID_APPEND_For_Edit
    //            //var rows = $("#" + EffectiveTableid + " tbody tr");
    //            //rows.each(function (index) {
    //            //    $(this).attr('id', 'row' + (index + 1));
    //            //    //  $(this).attr('value', 'row' + (index + 1));
    //            //});
    //          //  TblDataTableWithOutColumns_CallingFunction(EffectiveTableid, '10', 'leaaverequestr');
    //            $("#" + SearchRecords_Div).show();
    //            $("#" + EffectiveTableid).show();
    //            $("#" + ExportExcelLink).show();
    //            $("#Main_Span_Error").empty();               
    //        }
    //        debugger;
    //        loaddingimg.css('display', 'none');
    //    }
    //    ,
    //    error: function (xhr, status, error) {
    //        loaddingimg.css('display', 'none');
    //        $("#Main_Span_Error").text("Something Error");
    //    }
    //});
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }

    }
    
    
    function BackTOSearhLevels(event) {
    try {
    // $("#FmAppliedStaffLeaves_SearchRecords_Div").hide();
        TblAppliedStaffLeaves_SearchRecords_Calingfunction(event, '1', 'TblAppliedStaffLeaves_SearchRecords', 'Counts', 'ExportExcelLink_ApproveReject', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'FmAppliedStaffLeaves_SearchRecords_Div')


    $("#BatchId_Popup").val('');
    $("#StaffId_Popup").val('');
    $("#InstanceClassificationId_Popup").val('');
    $("#InstanceId_Popup").val('');FmAppliedStaffLeaves_SearchRecords_Div
    $("#TblApplied_SearchRecords_Tr_Id").val('');
    $("#TXTareaRemarks_Popup").val('');

    $(".ErrorMessageSpan").empty();
    $("#TabApprove_Reject").show();
        $("#ApproveReject_Submitbuttonpage_Div").hide();
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }

}

function FN_ClearValues(valuefornotclear, Formid) {
    try {
    debugger;
    if (Formid == "Fm_ApproveandReject_PopUp") {
        $("#TXTareaRemarks_Popup").val('');
    } else {
      //  document.getElementById(Formid).reset(); // Reset the form
        if (Formid == "LeaveRequested_Form") {
            $("#TblLeaveRequested_SearchRecords tbody").empty();
            $("#TblLeaveRequested_SearchRecords").hide();
           // $("#LeaveRequested_lblNumRecords").text("");
           // $("#LeaveRequested_lblNumRecords").text("NO RECORDS");
          //  $("#ExportExcelLink_LeaveRequested").hide();
           // $("#ExportExcelLink_LeaveRequested").hide();
            $("#LeaveRequested_SearchRecords_Div").hide();
        }
    }
    if (valuefornotclear != "no") {
        $(".ErrorMessageSpan").empty();
        }
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}

    //================================click to display  approve leave screen
    $(document).on('click', '#ctl00_ContentPlaceHolder1_TblApplied_SearchRecords_lnkApproveReject', function (event) {
    try {
        event.preventDefault();

        loaddingimg.css('display', 'block');
    $("#ErrorMessageSpan").empty();
    $("#TblAppliedLeavesHistory_SearchRecords").show();
    var StaffUserName = $(this).closest('tr').find('td').find('u').text();
    var StaffId = $(this).closest('tr').find('td').find("#StaffId").val();
    var InstanceId = $(this).closest('tr').find('td').find("#InstanceId").val();
    var BatchId = $(this).closest('tr').find('td').find("#BatchId").val();
    var InstanceClassificationId = $(this).closest('tr').find('td').find("#InstanceClassificationId").val();
    //  var TblApplied_SearchRecords_Tr_Id = $(this).closest('tr').attr('id');

    $.ajax({
        url: "/Attendance/TblAppliedStaffLeavesRequestByBatchid_SearchRecords_Calingfunction?InstanceId=" + InstanceId + "&BatchId=" + BatchId,//+"&values="+ queryString,
        type: "GET",
        success: function (response) {
            $("#TabApprove_Reject").hide();
            $("#ApproveReject_Submitbuttonpage_Div").show();
            $("#TXTareaRemarks_Popup").val('');
            $("#StaffUserName").text('');
            $("#BatchId_Popup").val('');
            $("#StaffId_Popup").val('');
            $("#InstanceClassificationId_Popup").val('');
            $("#InstanceId_Popup").val('');
            $("#TblApplied_SearchRecords_Tr_Id").val('');
            $("#TextareacountSPAN").text("500");
            //  $("#TXTareaRemarks_Popup").val('');


            $("#StaffUserName").text(StaffUserName);
            $("#BatchId_Popup").val(BatchId);
            $("#StaffId_Popup").val(StaffId);
            $("#InstanceClassificationId_Popup").val(InstanceClassificationId);
            $("#InstanceId_Popup").val(InstanceId);
            //  $("#TblApplied_SearchRecords_Tr_Id").val(TblApplied_SearchRecords_Tr_Id);

         
            if (response.length <= 0) {

                debugger;
                //if ($("#TblApplied_SearchRecords tbody tr").length <= 0) {
                //$("#" + SearchRecords_Div).hide();
                //$("#" + EffectiveTableid).hide();
                //$("#" + RecordcountSpanId).text("");

                //$("#" + ExportExcelLink).hide();
                $("#Main_Span_Error").text("No records.");
            }
            else {
                $("#TblAppliedLeavesHistory_SearchRecords tbody").empty();
                // $("#TblApplied_SearchRecords tbody").empty();
                var viewfiles = "";
               // var LeaveTypeId = "";
                $.each(response, function (i, Value2) {

                    $("#LeaveTypeId_Popup").val(Value2.leaveTypeId);
                    if (Value2.attachedFileName != "") {
                        viewfiles = " <a class='badge rounded-pill bg-label-info' href='/LeavesDoc/" + Value2.attachedFileName + "'  target='_blank' style='cursor:pointer;'>View</a >";
                    }
                    else {
                        viewfiles = " ";
                    }               
                    $("#TblAppliedLeavesHistory_SearchRecords tbody").append(
                        //  $("#TblApplied_SearchRecords tbody").append(

                        "<tr>" +

                        "<td>" + Value2.leaveType + "</td>" +
                        "<td>" + Value2.fromdateString + "</td>" +
                        "<td>" + Value2.todateString + "</td>" +
                        "<td>" + Value2.reason + "</td>" +
                        "<td>" + Value2.noOfDays + " </td>" +
                        "<td>" + Value2.daysession + "</td>" +
                        "<td>" + viewfiles + " </td>" +
                        "<td>" + Value2.requestedDate + "</td>" +
                        // " + Value2.comments + "
                        //"<td>" +
                        //"<i onclick='CommentopenPopup(" + i + ")' style='text-decoration: underline; color: blue; cursor: pointer;'>View Comments</i> " +
                        //"<div id='" + i + "' class='Commentpopup'>" +
                        //"<div id='Commentpopup-content' class='Commentpopup-content' style='padding-top: 0; border-style: groove;'>" +
                        //"<a style='margin-left: 99%; width: -1%;' onclick=\"document.getElementById(" + i + ").style.display='none'\"><span style='font-size: 24px;cursor:pointer'>×</span></a><br/>" +
                        //"<span style='margin-left: 34%;'>Comments</span> " +
                        //"<textarea style='height: 100px; width: 100%;'>" + Value2.comments + "</textarea>" +
                        //"</div></div>" +
                        //"<input type='hidden' id='InstanceId' value='" + Value2.instanceId + "' />" +
                        //"<input type='hidden' id='BatchId' value='" + Value2.batchId + "' />" +
                        //"</td>" +
                        "<td>" + Value2.comments+"</td>"+
                        "</tr>"
                    );

                });
                //these are for add id to ID_APPEND_For_Edit
                var rows = $("#TblAppliedLeavesHistory_SearchRecords tbody tr");
                rows.each(function (index) {
                    $(this).attr('id', 'row' + (index + 1));
                    //  $(this).attr('value', 'row' + (index + 1));
                });

                //$("#" + SearchRecords_Div).show();
                //$("#" + EffectiveTableid).show();
                //$("#" + ExportExcelLink).show();
                $("#Main_Span_Error").empty();
            }
            loaddingimg.css('display', 'none');
        }
        ,
        error: function (xhr, status, error) {
            loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
        }
    });
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
});
    
    
    
    function LeaveApproval_Save(event, submitButtonName) {

    try {
    debugger;
    event.preventDefault();
    $(".ErrorMessageSpan").empty();
    // ScrollToSelected_ID('Main_Span_Error');
        if ($("#StaffId_Popup").val() == '') {
            $('.alert-danger p').text("Something Error");
            $(".alert-danger").show().delay(6000).fadeOut();
            return;
        }
        var formData = new FormData($("#Fm_ApproveandReject_PopUp")[0]);
       // setTimeout(function () {
            loaddingimg.css('display', 'block');
       // }, 500);
    $.ajax({
        url: "/Attendance/LeaveApproval?submitButtonName=" + submitButtonName,
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            debugger;
            $(".ErrorMessageSpan").empty();
           // $("#Main_Span_Error").text(response.message);

            if (response.message == "Leave Approved Successfully." || response.message == "Leave Rejected Successfully.") {
                $("#BtnApprove").prop('disabled', true);
                $("#BtnReject").prop('disabled', true);
                $("#StaffId_Popup").val('');
                $("#TblAppliedLeavesHistory_SearchRecords tbody").empty();
                $("#TblAppliedLeavesHistory_SearchRecords").hide();
                $('.alert-success p').text(response.message);
                $(".alert-success").show().delay(6000).fadeOut()
            } else {
                $('.alert-danger p').text(response.message);
                $(".alert-danger").show().delay(6000).fadeOut();
            }
            loaddingimg.css('display', 'none');

        }
        ,
        error: function (xhr, status, error) {
            loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
        }
    });

    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }

    }
    
    
    
    function lnkApproveReject_callingFun(Formid) {

    try {

    $("#TabApprove_Reject").show();
    $("#ApproveReject_Submitbuttonpage_Div").hide();
    FN_ClearValues("no1", "ApproveReject_Form");
    TblAppliedStaffLeaves_SearchRecords_Calingfunction(event, '1', 'TblAppliedStaffLeaves_SearchRecords', 'ctl00_ContentPlaceHolder1_lblNumRecords', 'ExportExcelLink_ApproveReject', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'FmAppliedStaffLeaves_SearchRecords_Div')

    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}
    
    function lnkApproved_Rejected_callingFun(event) {
    try {
    debugger;
    //var PrintBTN = document.getElementById("ApprovedLeaves_SearchRecordsPrintBTN");
    //PrintBTN.innerHTML = "";
    FN_ClearValues("no1", 'ApproveRejectCompleted_Form');
    // Get the current date
    var currentDate = new Date();

    // Format the date to YYYY-MM-DD
    var formattedDate = currentDate.toISOString().split('T')[0];

    // Set the value of the date input field

    // Set the value of the date input field
    document.getElementById("ctl00_ContentPlaceHolder1_txtSearchFromDate").value = formattedDate;
    document.getElementById("ctl00_ContentPlaceHolder1_txtSearchToDate").value = formattedDate;

    TblApprovedStaffLeaves_SearchRecords_Calingfunction(event, '1', 'TblApprovedLeaves_SearchRecords', 'SpanApprovedLeavesNumRecords', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'ApprovedLeaves_SearchRecords_Div', 'Approved');
    TblApprovedStaffLeaves_SearchRecords_Calingfunction(event, '1', 'TblRejectedLeaves_SearchRecords', 'SpanRejectedLeavesNumRecords', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'RejectedLeaves_SearchRecords_Div', 'Rejected');
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}
    
    function lnkLeaveRequested_callingFun(event) {
    debugger;
    try {
    FN_ClearValues("no1", "LeaveRequested_Form");
    // Get the current date
    //var currentDate = new Date();

    //// Format the date to YYYY-MM-DD
    //var formattedDate = currentDate.toISOString().split('T')[0];
    $("#LeaveRequested_SearchRecords_Div").hide();
    $("#TblLeaveRequested_SearchRecords tbody").empty();
    $("#TblLeaveRequested_SearchRecords ").hide();
    //$("#LeaveRequested_lblNumRecords").text("");
    //$("#LeaveRequested_lblNumRecords").text("NO RECORDS");
    //$("#ExportExcelLink_LeaveRequested").hide();
    //var PrintBTN = document.getElementById("LeaveRequested_SearchRecordsPrintBTN");
    //PrintBTN.innerHTML = "";

    //// Set the value of the date input field
    //document.getElementById("LeaveRequested_txtSearchFromDate").value = formattedDate;
    //document.getElementById("LeaveRequested_txtSearchToDate").value = formattedDate;
    // TblLeaveRequested_SearchRecords_Calingfunction(event, '1', 'TblLeaveRequested_SearchRecords', 'LeaveRequested_lblNumRecords', 'ExportExcelLink_LeaveRequested', 'LeaveRequested_txtSearchFromDate', 'LeaveRequested_txtSearchToDate', 'LeaveRequested_SearchRecords_Div');

    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
    }



   function BtnSearchApproved_Rejected(event) {
    // event.preventDefault;
    try {
    debugger;
        var DepartmentName = $("#DdlApproved_Rejected").val();
        $("#ApprovedLeaves_SearchRecords_Div_For_Print").css("display", 'block');
    if (DepartmentName == "Approved") {
        $("#TblRejectedLeaves_SearchRecords tbody").empty();
        $("#RejectedLeaves_SearchRecords_Div").hide();
        //$("#" + SearchRecords_Div).hide();
        $("#TblRejectedLeaves_SearchRecords").hide();
        //$("#SpanRejectedLeavesNumRecords").text("");
        //$("#SpanRejectedLeavesNumRecords").text("NO RECORDS");
        $("#SpanRejectedLeavesNumRecords").text("0");

        TblApprovedStaffLeaves_SearchRecords_Calingfunction(event, '1', 'TblApprovedLeaves_SearchRecords', 'SpanApprovedLeavesNumRecords', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'ApprovedLeaves_SearchRecords_Div', 'Approved');

    }
    else if (DepartmentName == "Rejected") {
        $("#TblApprovedLeaves_SearchRecords tbody").empty();

        $("#ApprovedLeaves_SearchRecords_Div").hide();
        //$("#" + SearchRecords_Div).hide();
        $("#TblApprovedLeaves_SearchRecords").hide();
        //$("#SpanApprovedLeavesNumRecords").text("");
        //$("#SpanApprovedLeavesNumRecords").text("NO RECORDS");
        $("#SpanApprovedLeavesNumRecords").text("0");
        TblApprovedStaffLeaves_SearchRecords_Calingfunction(event, '1', 'TblRejectedLeaves_SearchRecords', 'SpanRejectedLeavesNumRecords', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'RejectedLeaves_SearchRecords_Div', 'Rejected');

    }
    else {

        TblApprovedStaffLeaves_SearchRecords_Calingfunction(event, '1', 'TblApprovedLeaves_SearchRecords', 'SpanApprovedLeavesNumRecords', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'ApprovedLeaves_SearchRecords_Div', 'Approved');
        TblApprovedStaffLeaves_SearchRecords_Calingfunction(event, '1', 'TblRejectedLeaves_SearchRecords', 'SpanRejectedLeavesNumRecords', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'RejectedLeaves_SearchRecords_Div', 'Rejected');
        }
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}



//   function CallPrint(tableid) {
//       try {
//           debugger;
//    var printContent = document.getElementById(tableid);
//    var windowUrl = 'about:blank';
//    var uniqueName = new Date();

//    var printWindow = window.open(windowUrl, uniqueName);
//    printWindow.document.open();
//        printWindow.document.write('<html><head><title>Print</title></head><body>');
//        printWindow.document.write('<style>table {border-collapse: collapse; width: 100%;} th, td {border: 1px solid black; padding: 8px; text-align: left;}</style>');
//    printWindow.document.write(printContent.outerHTML);
//    printWindow.document.write('</body></html>');
//    printWindow.document.close();
//        printWindow.print();
//           printWindow.close();
//    } catch (e) {
//        $("#Main_Span_Error").text("Something Error");
//    }
//}


   //THIS for counting characters of textarea
   $(document).ready(function () {
    $("#TXTareaRemarks_Popup").on("input", function () {
        var textareavalue = $("#TXTareaRemarks_Popup").val();
        var maxlength = 500;
        var textareacount = maxlength - textareavalue.length;

        $("#TextareacountSPAN").text(textareacount);
    });
});



   function CommentopenPopup(CommentpopupId) {
    var popup = document.getElementById(CommentpopupId);
    popup.style.display = "block";
   }
