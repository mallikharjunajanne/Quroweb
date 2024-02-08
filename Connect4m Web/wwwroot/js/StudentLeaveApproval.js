



$(document).ready(function () {
    try {

  //  $("#FmApplied_SearchRecords_Div").hide();
    $("#TblApplied_SearchRecords").hide();
    $("#ExportExcelLink_ApproveReject").hide();
    // Get the current date
    var currentDate = new Date();

    // Format the date to YYYY-MM-DD
    var formattedDate = currentDate.toISOString().split('T')[0];

    // Set the value of the date input field
    document.getElementById("ctl00_ContentPlaceHolder1_txtSearchFromDate").value = formattedDate;
    document.getElementById("ctl00_ContentPlaceHolder1_txtSearchToDate").value = formattedDate;
    debugger;
        TblApplied_SearchRecords_Calingfunction(event, '12', 'TblApplied_SearchRecords', '32', '0', 'ctl00_ContentPlaceHolder1_lblNumRecords', 'ExportExcelLink_ApproveReject', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'FmApplied_SearchRecords_Div', 'ctl00_ContentPlaceHolder1_txtfirstname', 'ctl00_ContentPlaceHolder1_txtlastname', 'ctl00_ContentPlaceHolder1_txtAdmNo','StudentLeaveApproval');
   // TblApplied_SearchRecords_Calingfunction(event, '12', 'TblApplied_SearchRecords', '32', '0', 'ctl00_ContentPlaceHolder1_lblNumRecords', 'ExportExcelLink_ApproveReject', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate','FmApplied_SearchRecords_Div');ctl00_ContentPlaceHolder1_txtfirstname
    



    DdlDepartmentId_Calingfunction();
    } catch (e) {
   
        $("#Main_Span_Error").text("Something Error");
    }
});




function lnkApproveReject_callingFun(Formid) {
    try {
        debugger;
        $(".ErrorMessageSpan").empty();
        $("#HeadingNAme").text("");
        $("#HeadingNAme").text("LEAVE APPROVAL");
        FN_ClearValues("no");
        // Get the current date
        var currentDate = new Date();

        // Format the date to YYYY-MM-DD
        var formattedDate = currentDate.toISOString().split('T')[0];

        // Set the value of the date input field
        document.getElementById("ctl00_ContentPlaceHolder1_txtSearchFromDate").value = formattedDate;
        document.getElementById("ctl00_ContentPlaceHolder1_txtSearchToDate").value = formattedDate;

        TblApplied_SearchRecords_Calingfunction(event, '1', 'TblApplied_SearchRecords', '32', '0', 'ctl00_ContentPlaceHolder1_lblNumRecords', 'ExportExcelLink_ApproveReject', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'FmApplied_SearchRecords_Div', 'ctl00_ContentPlaceHolder1_txtfirstname', 'ctl00_ContentPlaceHolder1_txtlastname', 'ctl00_ContentPlaceHolder1_txtAdmNo','StudentLeaveApproval');

        // TblApplied_SearchRecords_Calingfunction(event, '1', 'TblApplied_SearchRecords', '32', '0', 'ctl00_ContentPlaceHolder1_lblNumRecords', 'ExportExcelLink_ApproveReject', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'FmApplied_SearchRecords_Div');

        DdlDepartmentId_Calingfunction();
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }

}

function lnkApproved_callingFun(event) {
    try {
        debugger;
        $(".ErrorMessageSpan").empty();
        $("#HeadingNAme").text("");
        $("#HeadingNAme").text("APPROVED LEAVES");
        FN_ClearValues("no");

        // Get the current date
        var currentDate = new Date();

        // Format the date to YYYY-MM-DD
        var formattedDate = currentDate.toISOString().split('T')[0];

        // Set the value of the date input field

        document.getElementById("ctl00_ContentPlaceHolder1_txtStartDate").value = formattedDate;
        document.getElementById("ctl00_ContentPlaceHolder1_txtEndDate").value = formattedDate;

        TblApplied_SearchRecords_Calingfunction(event, '1', 'TblApproved_SearchRecords', '31', '1', 'ctl00_ContentPlaceHolder1_lblApprovedNumRecords', 'ExportExcelLink_Approved', 'ctl00_ContentPlaceHolder1_txtStartDate', 'ctl00_ContentPlaceHolder1_txtEndDate', 'FmApproved_SearchRecords_Div', 'ctl00_ContentPlaceHolder1_txtfirstname', 'ctl00_ContentPlaceHolder1_txtlastname', 'ctl00_ContentPlaceHolder1_txtAdmNo','StudentApprovedLeaves');
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}

function lnkRejected_callingFun(event) {
    try {
        debugger;
        $(".ErrorMessageSpan").empty();
        $("#HeadingNAme").text("");
        $("#HeadingNAme").text("REJECTED LEAVES");
        FN_ClearValues("no");
        // Get the current date
        var currentDate = new Date();

        // Format the date to YYYY-MM-DD
        var formattedDate = currentDate.toISOString().split('T')[0];

        // Set the value of the date input field
        document.getElementById("ctl00_ContentPlaceHolder1_txtRejectFromDate").value = formattedDate;
        document.getElementById("ctl00_ContentPlaceHolder1_txtRejectToDate").value = formattedDate;
        TblApplied_SearchRecords_Calingfunction(event, '1', 'TblRejected_SearchRecords', '30', '2', 'ctl00_ContentPlaceHolder1_lblRejectedNumRecords', 'ExportExcelLink_Rejected', 'ctl00_ContentPlaceHolder1_txtRejectFromDate', 'ctl00_ContentPlaceHolder1_txtRejectToDate', 'FmRejected_SearchRecords_Div', 'ctl00_ContentPlaceHolder1_txtFirstNameReject', 'ctl00_ContentPlaceHolder1_txtLastNameReject', 'ctl00_ContentPlaceHolder1_txtAdmNoReject','StudentRejectedLeaves')
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}

//========================Leabe Approve And Reject function
function StudentLeaveApproval_Save(event, submitButtonName) {
    try {
    debugger;
    event.preventDefault();
    $(".ErrorMessageSpan").empty();
    // ScrollToSelected_ID('Main_Span_Error');

    var formData = new FormData($("#Fm_ApproveandReject_PopUp")[0]);
       loaddingimg.css('display', 'block');
    $.ajax({
        url: "/Attendance/StudentLeaveApproval?submitButtonName=" + submitButtonName,
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            debugger;
            $(".ErrorMessageSpan").empty();
            //$("#Main_Span_Error").text(response.message);

            if (response.message == "Request Approved Successfully." || response.message == "Request Rejected Successfully." || response.message == "Record updated successfully.") {
                // TblApplied_SearchRecords_Calingfunction(event);
                debugger;

                //var id = $("#TblApplied_SearchRecords_Tr_Id").val();
                //debugger;
                //$('#' + id).remove();

                //$("#ctl00_ContentPlaceHolder1_lblNumRecords").text("");
                //$("#ctl00_ContentPlaceHolder1_lblNumRecords").text("YOUR SEARCH RESULTED " + $("#TblApplied_SearchRecords tbody tr").length + " RECORD(S).");

                TblApplied_SearchRecords_Calingfunction(event, '1', 'TblApplied_SearchRecords', '32', '0', 'ctl00_ContentPlaceHolder1_lblNumRecords', 'ExportExcelLink_ApproveReject', 'ctl00_ContentPlaceHolder1_txtSearchFromDate', 'ctl00_ContentPlaceHolder1_txtSearchToDate', 'FmApplied_SearchRecords_Div', 'ctl00_ContentPlaceHolder1_txtfirstname', 'ctl00_ContentPlaceHolder1_txtlastname', 'ctl00_ContentPlaceHolder1_txtAdmNo', 'StudentLeaveApproval');


                //$("#TblAppliedLeavesSummery_SearchRecords tbody").empty();
                //$("#TblAppliedLeavesHistory_SearchRecords tbody").empty();
                //$("#AttendancePercentage").empty();
                ClosePopup();

                document.getElementById('popup').style.display = "none";
                $('.alert-success p').text(response.message);
                $(".alert-success").show().delay(6000).fadeOut()
                //window.scrollTo(0, 0);
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
    } catch (x) {
       loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}


//===============================to see Pop up
$(document).on('click', '#ctl00_ContentPlaceHolder1_TblApplied_SearchRecords_lnkApproveReject', function (event) {
    try {

        loaddingimg.css('display', 'block');
        $(".ErrorMessageSpan").empty();
    var popup = document.getElementById("popup");
    $("#SanctionedradioBtn").prop("checked", true);
    $("#NonSanctionedradioBtn").prop("checked", false);
    // $("#Userid_Popup").val('');
    $("#StudentLeaveDetailsID_Popup").val('');
    $("#TXTareaRemarks_Popup").val('');
    $("#InstanceClassificationId_Popup").val('');
    $("#InstanceSubClassificationId_Popup").val('');
        $("#TblApplied_SearchRecords_Tr_Id").val('');
       // document.getElementById('Fm_ApproveandReject_PopUp').reset();
    var Studentid = $(this).closest('tr').find('td').find("#StudentId").val();
    var StudentLeaveDetailsID = $(this).closest('tr').find('td').find("#StudentLeaveDetailsID").val();
    var InstanceClassificationId = $(this).closest('tr').find('td').find("#InstanceClassificationId").val();
    var InstanceSubClassificationId = $(this).closest('tr').find('td').find("#InstanceSubClassificationId").val();
    var TblApplied_SearchRecords_Tr_Id = $(this).closest('tr').attr('id');

    //  $("#Userid_Popup").val(Studentid);
    $("#StudentLeaveDetailsID_Popup").val(StudentLeaveDetailsID);
    $("#InstanceClassificationId_Popup").val(InstanceClassificationId);
    $("#InstanceSubClassificationId_Popup").val(InstanceSubClassificationId);
    $("#TblApplied_SearchRecords_Tr_Id").val(TblApplied_SearchRecords_Tr_Id);
    TblAppliedLeavesHistory_SearchRecords_Calingfunction(Studentid);
    TblAppliedLeavesSummery_SearchRecords_Calingfunction(Studentid);
    GetAttendancePercentagebyUserID(Studentid);
   // document.getElementById('id01').style.display = "block";
    
    // Call the function initially and whenever the window is resized

    //window.addEventListener('DOMContentLoaded', function () {
    //    adjustTableContainerHeight();
    //});

    //window.addEventListener('resize', function () {
    //    adjustTableContainerHeight();
    //});

    //adjustTableContainerHeight();
        popup.style.display = "block";

        loaddingimg.css('display', 'none');
    function adjustTableContainerHeight() {
        debugger;
        var tableContainer = document.getElementById('FmAppliedLeavesHistory_SearchRecordsForScrollid');
        var table = document.getElementById('TblAppliedLeavesHistory_SearchRecords');

        if (table.offsetHeight > tableContainer.offsetHeight) {
            tableContainer.style.height = table.offsetHeight + 'px';
        } else {
            tableContainer.style.height = '';
        }

        var tableContainer1 = document.getElementById('FmAppliedLeavesSummery_SearchRecordsForScrollid');
        var table1 = document.getElementById('TblAppliedLeavesSummery_SearchRecords');

        if (table1.offsetHeight > tableContainer1.offsetHeight) {
            tableContainer1.style.height = table1.offsetHeight + 'px';
        } else {
            tableContainer1.style.height = '';
        }
    }

    //checkTableHeight();
    //window.addEventListener('resize', checkTableHeight);

    //var table = document.getElementById('TblAppliedLeavesHistory_SearchRecords');
    //var tableContainer = document.querySelector('#FmAppliedLeavesHistory_SearchRecordsForScrollid');

    //function checkTableHeight() {
    //    if (table.offsetHeight > tableContainer.offsetHeight) {
    //        tableContainer.style.overflowY = 'scroll';
    //    } else {
    //        tableContainer.style.overflowY = 'hidden';
    //    }
    //}
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
});



function DdlDepartmentId_Calingfunction() {
    try {
        $("#ErrorMessageSpan").empty();
    $.ajax({
        url: "/Attendance/DdlDepartmentId_Calingfunction",
        type: "GET",
        success: function (response) {
            $("#DdlDepartmentId").empty();
            $("#DdlDepartmentId").append('<option value="">Select a Department</option>');
            $.each(response, function (i, Value2) {
                $("#DdlDepartmentId").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
            });
        },
        error: function (xhr, status, error) {           
            $("#Main_Span_Error").text("Something Error");
        }
    });
    } catch (x) {
        
        $("#Main_Span_Error").text("Something Error");
    }
};

function DdlClassId_Calingfunction(buttonId, EffectingDropdownid) {
    try {
        $("#ErrorMessageSpan").empty();
    var InstanceClassificationId = $("#" + buttonId).val();
        //var InstanceClassificationId = $("#Department_Id").val();
        debugger;
    $.ajax({
        url: "/Attendance/DdlClassId_Calingfunction?InstanceClassificationId=" + InstanceClassificationId,
        type: "GET",
        success: function (response) {
            // $("#AppliedEmployeesNames_Id").empty();
            $("#" + EffectingDropdownid).empty();
            $("#" + EffectingDropdownid).append('<option value="" >Please select a section</option>');
            $.each(response, function (i, Value2) {
                $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
            });
            if (response.length <= 0) {
                $("#" + EffectingDropdownid).prop('disabled', true);
            } else {
                $("#" + EffectingDropdownid).prop('disabled', false);
            }
        },
        error: function (xhr, status, error) {         
            $("#Main_Span_Error").text("Something Error");
        }
    });
    } catch (x) {  
        $("#Main_Span_Error").text("Something Error");
    }
};

function TblApplied_SearchRecords_Calingfunction(event, val, EffectiveTableid, Status, Tab, RecordcountSpanId, ExportExcelLink, FromdateId, TodateId, SearchRecords_Div, Firstnameid, LastNameid, AdmissionNumberid, ExelsheetName) {
    try {
    //val for loading page
    debugger;
    if (val != 12) {
        event.preventDefault();
    }

    var Departmentid = $("#DdlDepartmentId").val();
    var Classid = $("#DdlClassId").val();
    var Fromdate = $("#" + FromdateId).val();
    var Todate = $("#" + TodateId).val();
    var FirstName = $("#" + Firstnameid).val();
    var LastName = $("#" + LastNameid).val();
    var AdmissionNumber = $("#" + AdmissionNumberid).val();
    if (EffectiveTableid == "TblApproved_SearchRecords" || EffectiveTableid == "TblRejected_SearchRecords") {
        if (Fromdate === "" || Todate === "") {
            $("#Main_Span_Error").text('Following fields have invalid data :');
            debugger;
            if (Fromdate === "") {
                $("#Fromdate_Span_Error").text('From Date');
            }
            if (Todate === "") {
                $("#Todate_Span_Error").text('To Date');
            }
            return;
        }
    }
    if (Fromdate != '' || Todate != '') {
        //You can't select future dates, dates should be less than or equal to todays date'
        //To Date Must be Greater than From Date.

        var today = new Date();
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        var dateString = year + '-' + month + '-' + day;
        //var dateString = year + '-' + month;
        debugger;
        if ((Date.parse(Fromdate) > Date.parse(dateString)) || (Date.parse(Todate) > Date.parse(dateString))) {
            $("#Main_Span_Error").text("You can't select future dates, dates should be less than or equal to todays date");
            window.scrollTo(0, 0);
            return;
        }
        if (Date.parse(Todate) < Date.parse(Fromdate)) {
            $("#Main_Span_Error").text("To Date Must be Greater than From Date.");
            return;
        }        
        }
        if (val != 12) {
           loaddingimg.css('display', 'block');
        }
    // var formData = new FormData($("#ApproveReject_Form")[0]);

    $.ajax({
        url: "/Attendance/TblApplied_SearchRecords_Calingfunction?Departmentid=" + Departmentid + "&FirstName=" + FirstName + "&AdmissionNumber=" + AdmissionNumber + "&LastName=" + LastName + "&Classid=" + Classid + "&Fromdate=" + Fromdate + "&Todate=" + Todate + "&Tab=" + Tab + "&Status=" + Status,//+"&values="+ queryString,
        type: "GET",
        success: function (response) {
            if (response.length <= 0) {
                $("#" + SearchRecords_Div).hide();
                $("#" + EffectiveTableid).hide();
                $("#" + RecordcountSpanId).text("");

                $("#" + ExportExcelLink).hide();
                $("#Main_Span_Error").text("No records.");
            }
            else {
               // $("#" + RecordcountSpanId).text("");
               // $("#" + RecordcountSpanId).text("YOUR SEARCH RESULTED " + response.length + " RECORD(S).");
               // $("#" + RecordcountSpanId).html("YOUR SEARCH RESULTED <span class='number-circle'> " + response.length + "</span> RECORD(S).");
                $("#" + RecordcountSpanId).text(response.length);

                var table = js('#' + EffectiveTableid).DataTable();
                var currentPage = table.page.info().page;
                table.destroy();



                $("#" + EffectiveTableid + " tbody").empty();
               // $("#TblApplied_SearchRecords tbody").empty();
               
                var leaveAppliedDate1 = "";
                var fromdate1 = "";
                var Todate1 = "";

                var year1 = "";
                var month1 = "";
                var day1 = "";
                var fromdateConvert12 = "";


                var year2 = "";
                var month2 = "";
                var day2 = "";
                var TodateConvert12 = "";

                var year23 = "";
                var month23 = "";
                var day23 = "";
                var leaveAppliedDateConvert12 = "";

                var viewfiles = "";
                var DisplayApprovalLink = "";
                $.each(response, function (i, Value2) {
                    //DeleteBTN = "<p class='fa fa-trash -o' title='Click to delete this record' style='font-size:18px; color:red; cursor:pointer; '><input type='text' hidden  id='id_For_Delete' value=''></p>";


                    //LeaveLevelId = "<input  type='text' id='LeaveLevelId_TBL' value='" + Value2.leaveLevelId + "' hidden/>";

                    //Approveruserid = "<input  type='text' id='Approveruserid_TBL' value='" + Value2.userid + "' hidden/>";

                    // AppliedUserId = "<input  type='text' id='AppliedUserId_TBL' value='" + Value2.appliedUserId + "' hidden/>";


                    leaveAppliedDate1 = Value2.leaveAppliedDate.split("T")[0];
                    fromdate1 = Value2.fromdate.split("T")[0];
                    Todate1 = Value2.todate.split("T")[0];

                    const fromdateConvert1 = new Date(fromdate1);
                    year1 = fromdateConvert1.getFullYear();
                    month1 = ('0' + (fromdateConvert1.getMonth() + 1)).slice(-2);
                    day1 = ('0' + fromdateConvert1.getDate()).slice(-2);
                    fromdateConvert12 = day1 + '/' + month1 + '/' + year1;


                    const TodateConvert1 = new Date(Todate1);
                    year2 = TodateConvert1.getFullYear();
                    month2 = ('0' + (TodateConvert1.getMonth() + 1)).slice(-2);
                    day2 = ('0' + TodateConvert1.getDate()).slice(-2);
                    TodateConvert12 = day2 + '/' + month2 + '/' + year2;


                    const leaveAppliedDateConvert1 = new Date(leaveAppliedDate1);
                    year23 = leaveAppliedDateConvert1.getFullYear();
                    month23 = ('0' + (leaveAppliedDateConvert1.getMonth() + 1)).slice(-2);
                    day23 = ('0' + leaveAppliedDateConvert1.getDate()).slice(-2);
                    leaveAppliedDateConvert12 = day23 + '/' + month23 + '/' + year23;


                    if (Value2.attachedFileName != "") {
                        viewfiles = " <a class='badge rounded-pill bg-info bg-glow' href='/LeavesDoc/" + Value2.attachedFileName + "'  target='_blank'>View</a >";
                    }
                    else {
                        viewfiles = "<a class='badge rounded-pill bg-secondary bg-glow'>View</a>";
                    }

                    if (EffectiveTableid =="TblApproved_SearchRecords") {
                        $("#" + EffectiveTableid + " tbody").append(
                            //  $("#TblApplied_SearchRecords tbody").append(
                            "<tr>" +
                            //"<td style='text-align:center;>" + ++i + "</td>" +
                            "<td >" + Value2.name + "</td>" +
                            "<td>" + Value2.admissionNumber + "</td>" +
                            "<td>" + Value2.classandSectionName + " </td>" +
                            "<td>" + Value2.leaveType + "</td>" +
                            "<td>" + fromdateConvert12 + "</td>" +
                            "<td>" + TodateConvert12 + "</td>" +
                            "<td>" + Value2.noOfDays + " </td>" +
                            "<td>" + Value2.comments + "</td>" +

                            "<td>" + Value2.leaveAppliedBy + "</td>" +
                            "<td>" + Value2.approvedDate + "</td>" +
                           "<td>" + Value2.approvedBy + "</td>" +
                         
                            "<td style='text-align:center;'>" + viewfiles + "</td>" +
                            "</tr>"
                        );
                    }
                    else if (EffectiveTableid == "TblRejected_SearchRecords") {
                        $("#" + EffectiveTableid + " tbody").append(
                            //  $("#TblApplied_SearchRecords tbody").append(
                            "<tr>" +
                          //  "<td style='text-align:center;>" + ++i + "</td>" +
                            "<td >" + Value2.name + "</td>" +
                            "<td>" + Value2.admissionNumber + "</td>" +
                            "<td>" + Value2.classandSectionName + " </td>" +
                            "<td>" + Value2.leaveType + "</td>" +
                            "<td>" + fromdateConvert12 + "</td>" +
                            "<td>" + TodateConvert12 + "</td>" +
                            "<td>" + Value2.noOfDays + " </td>" +
                            "<td>" + Value2.comments + "</td>" +
                            "<td>" + Value2.leaveAppliedBy + "</td>" +
                            "<td>" + Value2.rejectedDate + " </td>" +
                            "<td>" + Value2.rejectedBy + "</td>" +
                            "<td>" + viewfiles + "</td>" +
                            "</tr>"
                        );
                    } else {
                        debugger;
                        if (Value2.displayApprovalLink=="1") {
                            DisplayApprovalLink = "<a class='badge bg-glow bg-success rounded-pill' style='cursor: pointer;' id='ctl00_ContentPlaceHolder1_TblApplied_SearchRecords_lnkApproveReject'  >Approve/Reject</button><input  type='hidden' id='StudentId' value='" + Value2.studentId + "' /><input  type='hidden' id='StudentLeaveDetailsID' value='" + Value2.studentLeaveDetailsID + "' /><input  type='hidden' id='InstanceClassificationId' value='" + Value2.instanceClassificationId + "' /><input  type='hidden' id='InstanceSubClassificationId' value='" + Value2.instanceSubClassificationId + "' />";
                        }
                        else {
                            DisplayApprovalLink = "";
                        }

                        $("#" + EffectiveTableid + " tbody").append(
                            //  $("#TblApplied_SearchRecords tbody").append(
                            "<tr>" +
                           "<td style='text-align:centre'>" + ++i + "</td>" +
                            "<td >" + Value2.name + "</td>" +
                            "<td>" + Value2.admissionNumber + "</td>" +
                            "<td>" + Value2.classandSectionName + " </td>" +
                            "<td>" + Value2.leaveType + "</td>" +
                            "<td>" + fromdateConvert12 + "</td>" +
                            "<td>" + TodateConvert12 + "</td>" +
                            "<td>" + Value2.noOfDays + " </td>" +
                            "<td>" + Value2.comments + "</td>" +
                            "<td>" + Value2.leaveAppliedBy + "</td>" +

                            "<td>" + leaveAppliedDateConvert12 + "</td>" +
                            "<td>" + Value2.waitingComments + " </td>" +
                           
                            "<td style='text-align:center;'>" + viewfiles + "</td>" +
                            "<td style='text-align:center;'>" + DisplayApprovalLink + "</td>" +
                            "<td>" + Value2.attendanceType + "</td>" +
                            "</tr>"
                        );
                    }
                });
                debugger;
                //Pagination(response.length, EffectiveTableid);
                //these are for add id to ID_APPEND_For_Edit
                var rows = $("#" + EffectiveTableid+ " tbody tr");
                rows.each(function (index) {
                    $(this).attr('id', 'row' + (index + 1));
                    //  $(this).attr('value', 'row' + (index + 1));
                });

                var ExcelDownloadColumnsNo = [];
                if (EffectiveTableid == "TblApproved_SearchRecords" || EffectiveTableid == "TblRejected_SearchRecords") {
                    ExcelDownloadColumnsNo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11];
                } else {
                    ExcelDownloadColumnsNo = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11, 14];

                    var columnDefs = [
                        {
                            target: 14,
                            visible: false,
                            searchable: false
                        }
                    ]
                }
                TblDataTableWith_OutColumns_CallingFunction(EffectiveTableid, response, response.length, currentPage, ExelsheetName, ExcelDownloadColumnsNo, columnDefs);

                $("#" + SearchRecords_Div).show();
                $("#" + EffectiveTableid).show();
             /*   $("#" + ExportExcelLink).show();*/
                $("#Main_Span_Error").empty();
                debugger;
               
                //DataBind();
            }

           loaddingimg.css('display', 'none');
        }
        ,
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


function TblAppliedLeavesHistory_SearchRecords_Calingfunction(Studentid) {
    try {
    // var Studentid = 28566;
       //loaddingimg.css('display', 'block');
    $.ajax({
        url: "/Attendance/TblAppliedLeavesHistory_SearchRecords_Calingfunction?Studentid=" + Studentid,
        type: "GET",
        success: function (response) {
            if (response.length <= 0) {
                $("#TblAppliedLeavesHistory_SearchRecords").hide();
                //TextcountsofStudents = "No Data Found.";
            } else {
               // TextcountsofStudents = "YOUR SEARCH RESULTED <span class='number-circle' style='font-size: 7px;'> " + response.length + "</span>  RECORD(S).";
                // $("#lblLeaveHistoryNumRecordsCounts").html(TextcountsofStudents);
                $("#lblLeaveHistoryNumRecordsCounts").text(response.length);

                $("#TblAppliedLeavesHistory_SearchRecords tbody").empty();

                var viewfiles = "";
                var Sno = 1;
                var fromdate1 = "";
                var Todate1 = "";
                var year1 = "";
                var month1 = "";
                var day1 = "";
                var fromdateConvert12 = "";
                var year2 = "";
                var month2 = "";
                var day2 = "";
                var TodateConvert12 = "";
                $.each(response, function (i, Value2) {
                    //var StudentLeaveDetailsID1 = Value2.studentLeaveDetailsID;


                    fromdate1 = Value2.fromdate.split("T")[0];
                    Todate1 = Value2.todate.split("T")[0];

                    const fromdateConvert1 = new Date(fromdate1);
                    year1 = fromdateConvert1.getFullYear();
                    month1 = ('0' + (fromdateConvert1.getMonth() + 1)).slice(-2);
                    day1 = ('0' + fromdateConvert1.getDate()).slice(-2);
                    /*var dateString = year + '-' + month + '-' + day;*/
                    fromdateConvert12 = day1 + '/' + month1 + '/' + year1;


                    const TodateConvert1 = new Date(Todate1);
                    year2 = TodateConvert1.getFullYear();
                    month2 = ('0' + (TodateConvert1.getMonth() + 1)).slice(-2);
                    day2 = ('0' + TodateConvert1.getDate()).slice(-2);
                    TodateConvert12 = day2 + '/' + month2 + '/' + year2;

                    if (Value2.attachedFileName != "") {
                        viewfiles = " <a class='badge rounded-pill bg-info bg-glow' href='/LeavesDoc/" + Value2.attachedFileName + "'  target='_blank'>View</a >";
                    }
                    else {
                        viewfiles = "<a class='badge rounded-pill bg-secondary bg-glow'>View</a>";
                    }

                    $("#TblAppliedLeavesHistory_SearchRecords tbody").append("<tr>" +

                        "<td>" + Sno + "</td>" +
                        "<td>" + fromdateConvert12 + " </td>" +
                        "<td>" + TodateConvert12 + " </td>" +
                        "<td>" + Value2.leaveType + " </td>" +
                        "<td>" + Value2.remarks + "</td>" +
                        "<td>" + Value2.leaveStatus + " </td>" +

                        "<td style='text-align:center;'>" + viewfiles + "</td>" +

                        "<td>" + Value2.approved_Regected_Date + " </td>" +

                        "</tr>"
                    );
                    Sno++;

                });
            }
            $("#TblAppliedLeavesHistory_SearchRecords").show();
            //var rowcount1 = $("#TblAppliedLeavesHistory_SearchRecords tbody tr").length;
            //if (rowcount1 <= 0) {
            //    $("#TblAppliedLeavesHistory_SearchRecords").hide();
            //}
            //else {

            //    $("#TblAppliedLeavesHistory_SearchRecords").show();
            //}
        }
        ,
        error: function (xhr, status, error) {
           loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
        }
    });
    } catch (x) {
        //$("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
}


function TblAppliedLeavesSummery_SearchRecords_Calingfunction(Studentid) {
    try {
    // var Studentid = 28566;
    $.ajax({
        url: "/Attendance/TblAppliedLeavesSummery_SearchRecords_Calingfunction?Studentid=" + Studentid,
        type: "GET",
        success: function (response) {
            var TextcountsofStudents = 0.0;
            $("#lblLeaveTypesSummaryNumRecordsCounts").text(response.length);
            if (response.length <= 0) {
                TextcountsofStudents = "No Data Found.";
            } else {
                TextcountsofStudents = "YOUR SEARCH RESULTED <span class='number-circle' style='font-size: 7px;'>   " + response.length + "</span>  RECORD(S).";
            }
            // $("#lblLeaveTypesSummaryNumRecordsCounts").html(TextcountsofStudents);
       


            $("#TblAppliedLeavesSummery_SearchRecords tbody").empty();


            var Sno = 1;

            $.each(response, function (i, Value2) {
                $("#TblAppliedLeavesSummery_SearchRecords tbody").append("<tr>" +
                    "<td>" + Sno + "</td>" +
                    "<td>" + Value2.leaveType + " </td>" +
                    "<td>" + Value2.leaveNoOfDays + " </td>" +
                    "</tr>"
                );
                Sno++;

            });

            var rowcount1 = $("#TblAppliedLeavesSummery_SearchRecords tbody tr").length;

            if (rowcount1 <= 0) {
                $("#TblAppliedLeavesSummery_SearchRecords").hide();
            }
            else {

                $("#TblAppliedLeavesSummery_SearchRecords").show();
            }
        } ,
        error: function (xhr, status, error) {
            $("#Main_Span_Error").text("Something Error");
        }
    });
    } catch (x) {
       
        $("#Main_Span_Error").text("Something Error");
    }
}

function GetAttendancePercentagebyUserID(Studentid) {
    try {
        $("#AttendancePercentage").empty();
        var Value = $("#classid").val();
        //var StudentUserid = 28566;      
        //var InstanceId = 545;

        $.ajax({
            url: "/Attendance/GetAttendancePercentagebyUserID?StudentUserid=" + Studentid + "&ValueOFInstance=" + Value,
            dataType: 'json',
            type: "GET",
            success: fun21,
            error: function () {
                $("#Main_Span_Error").text("Something Error");
            }
        });


        function fun21(response) {
            debugger;
            $("#AttendancePercentage").append(response + "%");

        }
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}

//clear the form values

function FN_ClearValues(valuefornotclear) {
    try {
        debugger;

        document.getElementById('ApproveReject_Form').reset();
        document.getElementById('Rejected_Form').reset(); // Reset the form
        document.getElementById('Approved_Form').reset();

        $("#DdlClassId").prop("disabled", true);
        //  $('#' + ListBoxId).text('');
        // $("#User_Id_CreatePage").val('');
        if (valuefornotclear != "no") {
            $(".ErrorMessageSpan").empty();
        }
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}


function FN_ClearValuesForAppliedleaves(Firstnameid, LastNameid, AdmissionNumberid) {
    try {
        $("#" + Firstnameid).val('');

        $("#" + LastNameid).val('');
        $("#" + AdmissionNumberid).val('');
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}

//function ClearAllValuesInPopUpFunction() {
//    $("#TblAppliedLeavesHistory_SearchRecords tbody").empty();
//    $("#TblAppliedLeavesSummery_SearchRecords tbody").empty();
//    $("#AttendancePercentage").empty();
//    document.getElementById('Fm_ApproveandReject_PopUp').reset();
//}
function ClosePopup() {
    $("#popup").css('display', 'none');
    $("#TblAppliedLeavesHistory_SearchRecords tbody").empty();
    $("#TblAppliedLeavesSummery_SearchRecords tbody").empty();
    document.getElementById('Fm_ApproveandReject_PopUp').reset();
}

//this is for View student leaves 

function ViewStudentLeavesHistory(InstanceId, UserID) {
    try {

        var screenWidth = screen.availWidth;

        var windowWidth = 700; // Adjust the width of the window as needed
        var windowLeft = screenWidth - windowWidth;

        var newWindow = window.open("", "_blank", "width=" + windowWidth + ",left=" + windowLeft);
        //  var url = "../UserScreens/ViewStudentLeaveDetails.aspx?InstanceId=" + InstanceId + "&UserID=" + UserID;


        // HTML content for the new window
        // TblAppliedLeavesHistory_SearchRecords_Calingfunction(Studentid);
        // var newWindow = window.open("", "StudentLeaveDetails", "width=900,height=300");
        var tableRows = "";
        $.ajax({
            url: "/Attendance/TblAppliedLeavesHistory_SearchRecords_Calingfunction?Studentid=" + UserID,
            type: "GET",

            success: function (response) {

                var username = "";
                var classandSectionName = " ";
                if (response.length > 0) {
                     username = response[0].username;
                     classandSectionName = response[0].classandSectionName;
                } else {
                     username = "";
                     classandSectionName = " ";
                }
                debugger;
                var viewfiles = "";

                var Sno = 1;



                var fromdate1 = "";
                var Todate1 = "";

                var year1 = "";
                var month1 = "";
                var day1 = "";
                var fromdateConvert12 = "";


                var year2 = "";
                var month2 = "";
                var day2 = "";
                var TodateConvert12 = "";
                debugger;
                $.each(response, function (i, Value2) {
                    //var StudentLeaveDetailsID1 = Value2.studentLeaveDetailsID;


                    fromdate1 = Value2.fromdate.split("T")[0];
                    Todate1 = Value2.todate.split("T")[0];

                    const fromdateConvert1 = new Date(fromdate1);
                    year1 = fromdateConvert1.getFullYear();
                    month1 = ('0' + (fromdateConvert1.getMonth() + 1)).slice(-2);
                    day1 = ('0' + fromdateConvert1.getDate()).slice(-2);
                    /*var dateString = year + '-' + month + '-' + day;*/
                    fromdateConvert12 = day1 + '/' + month1 + '/' + year1;


                    const TodateConvert1 = new Date(Todate1);
                    year2 = TodateConvert1.getFullYear();
                    month2 = ('0' + (TodateConvert1.getMonth() + 1)).slice(-2);
                    day2 = ('0' + TodateConvert1.getDate()).slice(-2);
                    TodateConvert12 = day2 + '/' + month2 + '/' + year2;


                    if (Value2.attachedFileName != "") {
                        viewfiles = " <a href='/LeavesDoc/" + Value2.attachedFileName + "'  target='_blank'><font color='blue'><u style='font-weight:700;'>View</u></font></a >";
                    }
                    else {
                        viewfiles = " <font color='blue'><u style='font-weight:700;'>View</u></font>";
                    }

                    var newRow =
                        "<tr style='background-color: white; height: 24px;'>" +

                        "<td class='gridtext' align='left'>" + Sno + "</td>" +
                        "<td class='gridtext' align='left'>" + fromdateConvert12 + " </td>" +
                        "<td class='gridtext' align='left'>" + TodateConvert12 + " </td>" +

                        "<td class='gridtext' align='left'>" + Value2.remarks + "</td>" +
                        "<td class='gridtext' align='left'>" + Value2.leaveStatus + " </td>" +

                        "<td class='gridtext' align='left'>" + viewfiles + "</td>" +

                        "<td class='gridtext' align='left'>" + Value2.approved_Regected_Date + " </td>" +

                        "</tr>";

                    tableRows += newRow;
                    Sno++;

                });



                var htmlContent = `
                         <!DOCTYPE html>
<html>
<head>
    <title>Student Leave Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            border-collapse: collapse;
            width: 80%;
            margin: 20px auto;
        }
        th {
            background-color: brown;
            color: white;
            font-weight: bold;
            padding: 8px;
            text-align: left;
        }
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        tr:hover {
            background-color: #e5e5e5;
        }
        .Heading {
            background-color: #DDEBF9;
            text-align: center;
            padding: 8px;
        }
        .left, .center, .right {
            width: 33.33%;
        }
        .WhiteLabel {
            color: white;
        }
    </style>
</head>
<body>
    <form  style="
    font-size: 10px;
" id="form1">
        <div>

        </div>


        <table cellspacing="0" cellpadding="0" border="0" align="center" style="width: 80%;" class="tablesideborders">
            <tbody>
                <tr>
                    <td class="Heading" colspan="3">
                        <b>Student Name : `+ username + `</b><br>
                        <b>Department - Class Name : `+ classandSectionName + `</b>
                    </td>
                </tr>
            </tbody>
        </table>


        <table cellspacing="1" cellpadding="0" border="0" id="grdLeaveHistory" style="width: 80%;" align="center" class=" table-responsive  nowap tableid ">
            <tbody>
            <tr style="border-top-left-radius: 15px;">
            <th style="border-top-left-radius: 15px;
  border-top-right-radius: 15px;background-color:cadetblue;" colspan="7">
             <span id="lblNumRecords" style="color:white;" class="WhiteLabel">Your Search resulted `+ response.length + ` Record(s).</span>
            </th>
             </tr>
                <tr align="left" style="
    color: white;
    font-weight: bold;
    padding: 5px;
    text-align: left;
    background-color: brown;
    font-size: 9px;">
                    <th class="gridtext" align="left">Sl. No.</th>
                    <th class="gridtext" align="left">From Date</th>
                    <th class="gridtext" align="left">To Date</th>
                    <th class="gridtext" align="left">Approved / Rejected Remarks</th>
                    <th class="gridtext" align="left">Leave Status</th>
                    <th class="gridtext" align="left" style="width: 60px;">View File</th>
                    <th class="gridtext" align="left">Approved / Rejected Date</th>
                </tr>

`+ tableRows + `
            </tbody>
        </table>
    </form>
</body>
</html> `;
                // Write the HTML content to the new window
                newWindow.document.open();
                newWindow.document.write(htmlContent);
                newWindow.document.close();

            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
            }

        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}