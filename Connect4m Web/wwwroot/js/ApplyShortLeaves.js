
$(document).ready(function () {
    try {
    $("#ApplyShortLeavePage").hide();
    var PrintBTN = document.getElementById("PrintBTN");
    PrintBTN.innerHTML = "";
    $("#accordionoc_VIEW").hide();
    $("table tfoot").hide();
    $("#MonthlyAppliedShortLeaves_SearchRecords_Div").hide();
    TblAppliedShortLeaves_SearchRecords_Calingfunction(event, '12', 'TblAppliedShortLeaves_SearchRecords', 'CountOfRecords_AppliedShortLeaves', 'AppliedShortLeaves_SearchRecords_Div')
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
});


// for counting characters in textarea
$(document).ready(function () {
    try {
    $("#TxtAreaReason").on("input", function () {
        var textareavalue = $("#TxtAreaReason").val();
        var Maxlength = 500;
        var textareacount = Maxlength - textareavalue.length;
        $("#TextareacountSPAN").text(textareacount);
    })
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
})


///this is for save leaves

$("#FmApplyShortLeave").submit(function (event) {
    try {
    event.preventDefault(); // prevent the form from submitting
    $(".ErrorMessageSpan").empty();
   
    var Date = $("#TxtDate").val();
    var FromTimeHrs = $("#FromTimeHours").val();
    var FromTimeMinates = $("#FromTimeMinates").val();
    var ToTimeHrs = $("#ToTimeHours").val();
    var ToTimeMinates = $("#ToTimeMinates").val();
    var Comments = $("#TxtAreaReason").val();
    debugger;
    if (Date === "" || FromTimeHrs === "" || FromTimeMinates === undefined || ToTimeHrs === "" || ToTimeMinates === "" || Comments === "") {
        $("#Main_Span_Error").text('Following fields have invalid data :');
        debugger;
        if (Date === "") {
            $("#Date_Span_Error").text('Date');
        }
        if (FromTimeHrs === "") {
            $("#FromTimeHrs_Span_Error").text('From Time(Hrs.)');
        }
        if (ToTimeHrs === "") {
            $("#ToTimeHrs_Span_Error").text('From Time(Mins.)');
        }
        if (FromTimeMinates === "") {
            $("#FromTimeMinates_Span_Error").text('To Time(Hrs.)');
        }
        if (ToTimeMinates === "") {
            $("#ToTimeMinates_Span_Error").text('To Time(Mins.)');
        }
        if (Comments === "") {
            $("#Comments_Span_Error").text('Reason');
        }

        return;
    }


    // Calculate the time difference in minutes
    var timeDiff = (parseInt(ToTimeHrs) * 60 + parseInt(ToTimeMinates)) - (parseInt(FromTimeHrs) * 60 + parseInt(FromTimeMinates));
    debugger;
    // Check if the time difference is greater than 15 minutes
    if (timeDiff < 15) {
        $("#Main_Span_Error").text('Please select proper timings.');
        return;
    }
    else if (timeDiff > 60) {
        $("#Main_Span_Error").text('You are not allowed to apply Short Leave for more than 1 hr(s).');
        return;
    }
    debugger;
    //var formData = new FormData(this);
   
    var formData = new FormData($("#FmApplyShortLeave")[0]);
        var bt = $("#savebuttonId").val();
        $("#loadingOverlay").show();
    $.ajax({
        url: "/Attendance/ApplyShortLeaves?submitButton=" + bt,
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (responce) {
            if (responce.message == "Short Leave Submitted Successfully." || responce.message == "As you are a final level approver, but there is no Self-Approval defined to you." || responce.message == "Request has Self - Approved Successfully.") {
                $("#Main_Span_Error").text(responce.message);
                $("#savebuttonId").prop("disabled", true);
                $("#clearbutton1").prop("disabled", true);
            }
            else {
                $("#Main_Span_Error").text(responce.message);
            }

            $("#loadingOverlay").hide();

        },
        error: function (xhr, stutus, error) {
            $("#Main_Span_Error").text("Something Error");
        }

    })

    } catch (e) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
});





function LnkApplyShortLeave() {

    $("#TextareacountSPAN").text("500");
    $(".ErrorMessageSpan").empty();
    $("#accordionoc12345").hide();
    $("#accordionoc123456").hide();
    $("#accordionoc_VIEW").hide();
    $("#MonthlyAppliedShortLeaves_SearchRecords_Div").hide();

    $("#TblAppliedShortLeaves_SearchRecords tbody").empty();
    $("#GetMyAppliedLeaves_Table_Print tbody").empty();
    $("#TblMonthlyAppliedShortLeaves_SearchRecords tbody").empty();
    $("#GetMyAppliedLeaves_Table_VIEW tbody").empty();

    $("#ApplyShortLeavePage").show();
    // $("#CreateNewPage").show();
    FN_ClearValues('clearbutton1_CreatePage', 'FmApplyShortLeave', 'TxtAreaReason');
    // $("#SaveLeaveLevels_CreatePage_BTN").val("Save");
    $("#savebuttonId").prop("disabled", false);
    $("#clearbutton1").prop("disabled", false);

}
function BackToDisplayShortLeaves() {
    TblAppliedShortLeaves_SearchRecords_Calingfunction(event, '1', 'TblAppliedShortLeaves_SearchRecords', 'CountOfRecords_AppliedShortLeaves', 'AppliedShortLeaves_SearchRecords_Div')

    $("#accordionoc12345").show();
    $("#accordionoc123456").show();
    $("#ApplyShortLeavePage").hide();
    $(".ErrorMessageSpan").empty();
}
function FN_ClearValues(bUttonid, Formid, ListBoxId) {
    debugger;
    document.getElementById(Formid).reset(); // Reset the form

    $('#' + ListBoxId).text('');
    //  $("#User_Id_CreatePage").empty();
    $(".ErrorMessageSpan").empty();
}





function TblMonthlyAppliedShortLeavesCount_SearchRecords_Calingfunction(event, val, EffectiveTableid, RecordcountSpanId, SearchRecords_Div) {

    try {
    //val for loading page
    debugger;
    if (val != 12) {
        event.preventDefault();
    }
    debugger;
    if ($("#lnkShowMyPermissions").text() == "Hide My Short Leaves") {

        debugger;
        //if ($("#TblApplied_SearchRecords tbody tr").length <= 0) {
        $("#" + SearchRecords_Div).hide();

        $("#" + EffectiveTableid + " tbody").empty();
        $("#" + EffectiveTableid).hide();
        $("#" + RecordcountSpanId).text("");
        $("#" + RecordcountSpanId).text("NO RECORDS");
        $("#lnkShowMyPermissions").text("Show My Short Leaves");
        return;
        // $("#Main_Span_Error").text("No records.");
        }
        $("#loadingOverlay").show();
    $.ajax({
        url: "/Attendance/TblMonthlyAppliedShortLeavesCount_SearchRecords_Calingfunction",//+"&values="+ queryString,
        type: "GET",
        success: function (responce) {
            $("#PrintBTN").text("");
            $("#lnkShowMyPermissions").text("Hide My Short Leaves");
            $("#accordionoc_VIEW").hide();
            $("#GetMyAppliedLeaves_Table_VIEW tbody").empty();
            debugger;
            $("#ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory").text("");
            $("#GetMyAppliedLeaves_Table_VIEW").hide();
            $("#GetMyAppliedLeaves_Table_Print tbody").empty();
            $("#GetMyAppliedLeaves_Table_Print").hide();
            $("#printDetails_Form").hide();
            debugger;

            $("#" + EffectiveTableid + " tbody").empty();
            if (responce.length <= 0) {
                //if ($("#TblApplied_SearchRecords tbody tr").length <= 0) {
                $("#" + SearchRecords_Div).show();

                $("#" + EffectiveTableid).hide();
                $("#" + RecordcountSpanId).text("");
                $("#" + RecordcountSpanId).text("NO RECORDS");
                // $("#Main_Span_Error").text("No records.");
            } else {


                $("#" + RecordcountSpanId).text("");
                //$("#" + RecordcountSpanId).text(" " + responce.length + " RECORD(S) FOUND. ");
                $("#" + RecordcountSpanId).html("YOUR SEARCH RESULTED <span class='number-circle'> " + responce.length + "</span> RECORD(S).");
              
                // $("#TblApplied_SearchRecords tbody").empty();

                $.each(responce, function (i, Value2) {
                    $("#" + EffectiveTableid + " tbody").append(
                        //  $("#TblApplied_SearchRecords tbody").append(
                        " <tr>" +
                        "<td style='text-align: center;'>" + Value2.fromMonthName + "</td>" +
                        "<td style='text-align: center;'>" + Value2.total + " </td>" +
                        "<td style='text-align: center;'>" + Value2.totalpresents + " </td>" +
                        "<td style='text-align: center;'>" + Value2.approved + " </td>" +
                        "<td style='text-align: center;'>" + Value2.approvedNotUsedLeaves + " </td>" +
                        // "<td >" + Value2.leaveNoOfDays1 + " </td>" +
                        "<td style='text-align: center;'>" + Value2.leavesAwaitingApprovalLeaves + " </td>" +
                        "<td style='text-align: center;'> " + Value2.rejected + "</td>" +
                        "<td style='text-align: center;'>" + Value2.cancelled + " </td>" +
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
        },
        error: function (xhr, status, error) {
            // alert($("#submitButton").val());
            $("#Main_Span_Error").text("Something Error");
            //  alert("Error");
            // handle the error
        }
    });
        $("#loadingOverlay").hide();
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}



//this is for View  and Cancel and Print details
$('#TblAppliedShortLeaves_SearchRecords').on('click', 'td span', function () {
    try {
    $("#MonthlyAppliedShortLeaves_SearchRecords_Div").hide();
    $("#lnkShowMyPermissions").text("Show My Short Leaves");
    $("#TblMonthlyAppliedShortLeaves_SearchRecords tbody").empty();
    $("#TblMonthlyAppliedShortLeaves_SearchRecords").hide();
    $("#CountOfRecords_MonthlyAppliedShortLeaves").text("");
    $("#CountOfRecords_MonthlyAppliedShortLeaves").text("NO RECORDS");

    var TR = $(this).closest('tr');
    var Batchid = $(this).closest('tr').find('#Batchid').val();
    /*alert(Batchid)*/

    var BTNtext = $(this).text();

    $(".ErrorMessageSpan").empty();

    debugger;
    if (BTNtext == "View") {
        window.scrollTo(0, document.body.scrollHeight);

        $.ajax({
            url: "/Attendance/GetMyAppliedLeaves_ViewDetails_CAllingFUC?Batchid=" + Batchid,
            type: "GET",
            success: function (response) {
                debugger;

                var PrintBTN = document.getElementById("PrintBTN");
                PrintBTN.innerHTML = "";
                if (response.length <= 0) {
                    $("#GetMyAppliedLeaves_Table_VIEW tbody").empty();
                    debugger;
                    $("#ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory").text("VIEW STATUS (" + response.length + "  RECORD(S) FOUND).")

                    $("#GetMyAppliedLeaves_Table_VIEW").hide();

                    $("#accordionoc_VIEW").show();
                    $("#GetMyAppliedLeaves_Table_Print tbody").empty();
                    $("#GetMyAppliedLeaves_Table_Print").hide();
                    $("#printDetails_Form").hide();

                }
                else {


                    var createdDate;
                    $.each(response, function (i, value122) {
                        $("#GetMyAppliedLeaves_Table_VIEW tbody").empty();
                        debugger;
                        $("#ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory").text("VIEW STATUS (" + response.length + "  RECORD(S) FOUND).")

                        createdDate = value122.createdDate;
                        createdDate = createdDate.split("T")[0];
                        $("#GetMyAppliedLeaves_Table_VIEW tbody").append("<tr>" +

                            "<td>" + value122.submittedby + "</td>" +
                            "<td >" + value122.assignedTo + " </td>" +
                            "<td>" + value122.comments + " </td>" +
                            "<td>" + value122.approvalstatus + " </td>" +
                            "<td >" + value122.overallRequestStatus + " </td>" +

                            "<td>" + createdDate + " </td>" +

                            "</tr>"
                        );

                    });


                    $("#GetMyAppliedLeaves_Table_VIEW").show();
                    $("#accordionoc_VIEW").show();
                    $("#GetMyAppliedLeaves_Table_Print tbody").empty();
                    $("#GetMyAppliedLeaves_Table_Print").hide();
                    $("#printDetails_Form").hide();
                }


            }
            ,
            error: function (xhr, status, erro) {
                $("#Main_Span_Error").text("Something Error");
            }

        })
    }

    else if (BTNtext == "Cancel") {

        var returnconform = confirm("Are you sure you want to Cancel the Leave.");
        if (returnconform == true) {
            debugger;
            $.ajax({
                url: "/Attendance/Cancel_ShortLeavesOfStaff_CallingFun?Batchid=" + Batchid + "&submitButton=" + BTNtext,
                type: "GET",
                success: function (response) {
                    debugger;
                    $('#Main_Span_Error').text(response.message);
                    window.scrollTo(0, 0);
                    if (response.message == "Short Leave Cancelled Successfully") {
                        debugger;
                        TblAppliedShortLeaves_SearchRecords_Calingfunction(event, '1', 'TblAppliedShortLeaves_SearchRecords', 'CountOfRecords_AppliedShortLeaves', 'AppliedShortLeaves_SearchRecords_Div');

                        //  GetMyAppliedLeaves_CallingMethod();
                        var printid_ForView = 1;
                        MyAppliedShortLeaves_PrintTable_CallingFun(Batchid, printid_ForView, 'GetMyAppliedLeaves_Table_VIEW', 'Main_Span_Error', 'PrintBTN', 'GetMyAppliedLeaves_Table_Print', 'ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory', 'SchoolnameTable_instancename', 'SchoolnameTable_ADDRESS', 'TotalNoofDays_TABLE', 'printDetails_Form', 'accordionoc_VIEW');

                    }
                    else {
                        var PrintBTN = document.getElementById("PrintBTN");
                        PrintBTN.innerHTML = "";
                        // $("#accordionoc_VIEW").hide();
                        // $("#GetMyAppliedLeaves_Table_VIEW tbody").empty();

                        $("#GetMyAppliedLeaves_Table_VIEW").hide();

                        $("#accordionoc_VIEW").hide();
                        $("#GetMyAppliedLeaves_Table_Print tbody").empty();
                        $("#GetMyAppliedLeaves_Table_Print").hide();
                        $("#printDetails_Form").hide();

                    }
                },
                error: function (xhr, status, error) {
                    $("#Main_Span_Error").text("Something Error");
                }

            });
        }
    }
    else {
        MyAppliedShortLeaves_PrintTable_CallingFun(Batchid, '1', 'GetMyAppliedLeaves_Table_VIEW', 'Main_Span_Error', 'PrintBTN', 'GetMyAppliedLeaves_Table_Print', 'ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory', 'SchoolnameTable_instancename', 'SchoolnameTable_ADDRESS', 'TotalNoofDays_TABLE', 'printDetails_Form', 'accordionoc_VIEW');
    }
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
});

//This is for calling function to my applied print details in Table

function MyAppliedShortLeaves_PrintTable_CallingFun(Batchid, printid_ForView, GetMyAppliedLeaves_Table_VIEWid, countspanid, PrintBTNid, EffectiveTableid, HeadSpanNameid, Schoolname, SchoolAddress, TotalNoOfDays, PrintDetailsFormid, TotalDivId) {

    try {
    debugger;
    $.ajax({
        url: "/Attendance/MyAppliedShortLeaves_PrintTable_CallingFun?Batchid=" + Batchid,
        type: "GET",
        success: function (response) {

            window.scrollTo(0, document.body.scrollHeight);

            $("#" + GetMyAppliedLeaves_Table_VIEWid + "  tbody").empty();

            $("#" + GetMyAppliedLeaves_Table_VIEWid).hide();
            if (printid_ForView != 1) {
                $('#' + countspanid).empty();
            }



            //var printbtn = "<a id='A1' href='#' onclick='javascript: CallPrint('PrintBTN_TABLEID')'>PRINT</a>";
            //$("#PrintBTN").text(printbtn)
            var PrintBTN = document.getElementById(PrintBTNid);
            PrintBTN.innerHTML = "";
            PrintBTN.innerHTML = "PRINT";
            debugger;
            var Totaldays = "";
            var sno = 1;
            $("#" + EffectiveTableid + " tbody").empty();

            $("#" + HeadSpanNameid).text("PRINT SHORT LEAVE DETAILS")


            $.each(response, function (i, value122) {


                Totaldays = value122.totalTime;

                $("#" + Schoolname).text(value122.instanceName)

                $("#" + SchoolAddress).text(value122.address)

                $("#" + EffectiveTableid + " tbody").append("<tr style='border: 1px solid;'>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + sno + "</td > " +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.submittedby + "</td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.department + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.dateofJoin + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.submittedto + " </td>" +

                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leavetype + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveFromdate + " </td>" +

                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.fromTime + " </td>" +


                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.toTime + " </td>" +



                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveStatus + " </td>" +
                    "</tr>"
                );
                sno++;

                if (response.length > 1 || response[0].availableLeaves < 0) {

                    $("#" + EffectiveTableid + "  tr td:nth-child(10)").hide();
                    $("#" + EffectiveTableid + "  tr th:nth-child(10)").hide();
                }
                else {
                    $("#" + EffectiveTableid + "  tr tr:nth-child(10)").show();
                    $("#" + EffectiveTableid + "  tr th:nth-child(10)").show();
                }
                $("#" + TotalNoOfDays + " tbody").empty();
                $("#" + TotalNoOfDays + " tbody").append("<tr>" +
                    "<td class='bonafidetxt' nowrap='' style='border: 1px solid;' align='center'>" + Totaldays + "</td>" +
                    +"</tr>");
            });
            $("#" + EffectiveTableid).show();
            $("#" + TotalDivId).show();
            $("#" + PrintDetailsFormid).show();

        }
        ,
        error: function (xhr, status, erro) {
            $("#Main_Span_Error").text("Something Error");
        }
    })
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}



function TblAppliedShortLeaves_SearchRecords_Calingfunction(event, val, EffectiveTableid, RecordcountSpanId, SearchRecords_Div) {
    try {
    //val for loading page
    debugger;
    if (val != 12) {
        event.preventDefault();
    }
    $.ajax({
        url: "/Attendance/TblAppliedShortLeaves_SearchRecords_Calingfunction",//+"&values="+ queryString,
        type: "GET",
        success: function (responce) {
            debugger;
            $("#" + EffectiveTableid + " tbody").empty();
            if (responce.length <= 0) {
                //if ($("#TblApplied_SearchRecords tbody tr").length <= 0) {
                // $("#" + SearchRecords_Div).hide();
               
                $("#" + EffectiveTableid).hide();
                $("#" + RecordcountSpanId).text("");
                $("#" + RecordcountSpanId).text("NO RECORDS");
                // $("#Main_Span_Error").text("No records.");
            } else {
                $("#" + RecordcountSpanId).text("");
                $("#" + RecordcountSpanId).html("YOUR SEARCH RESULTED <span class='number-circle'> " + responce.length + "</span> RECORD(S).");
          
                // $("#TblApplied_SearchRecords tbody").empty();
                var ViewBTN;
                var CancelBTN;
                var PrintBTN;
                $.each(responce, function (i, Value2) {
                    ViewBTN = "<div style='text-align:center;font-size:12px;' ><span id='ViewBtn' style='cursor:pointer;' class='badge badge-info' title='View Transaction History of Leave Status'>View</span>  <input type='text' id='Batchid' value='" + Value2.batchid + "' hidden/> </div >";

                    //DeleteBTN = "<p class='fa fa-trash -o' title='Click to delete this record' style='font-size:18px; color:red; cursor:pointer; '><input type='text' hidden  id='id_For_Delete' value=''></p>";
                    if (Value2.leaveStatus == "Self-Approved" || Value2.leaveStatus == "Submitted" || Value2.leaveStatus == "Approved") {
                        //ViewBTN = "<div ><span class='badge badge-info' title='View Transaction History of Leave Status'>View</span>  <input type='text' id='Batchid' value='" + Value2.batchid+"' hidden/> </div >";
                        if (Value2.leaveCancelledFlag) {
                            CancelBTN = "Cancelled";
                        } else {
                            CancelBTN = "<div style='text-align:center;font-size:13px;' ><span id='CancelBtn' style='cursor:pointer;' class='badge badge-primary' title='You can cancel an applied leave which is having startdate as future date to current date'>Cancel</span>   </div >";
                        }
                        /*C: \Users\rakeshp\source\repos\Connect4m_Web\Connect4m_Web\wwwroot\Themes\assets\images\tree\print.png*/

                        // PrintBTN = "<div ><span><input type='image' title='You can Print an applied leave ' src='/tree/print.png' style='border - width: 0px;'></span> </div >";
                        // PrintBTN = "<div ><span title='You can Print an applied leave ' class='fa fa-print' style='font-size: 20px;cursor:pointer; color: red' onclick=\"MyAppliedShortLeaves_PrintTable_CallingFun( '" + Value2.batchid + "', '1', 'GetMyAppliedLeaves_Table_VIEW', 'Main_Span_Error', 'PrintBTN', 'GetMyAppliedLeaves_Table_Print', 'ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory', 'SchoolnameTable_instancename', 'SchoolnameTable_ADDRESS', 'TotalNoofDays_TABLE', 'printDetails_Form', 'accordionoc_VIEW');\" ></span ></div > ";
                        PrintBTN = "<div style='text-align:center;'><span id=PrintBtn'  title='You can Print an applied leave ' class='fa fa-print' style='font-size: 20px;cursor:pointer; color: red'  ></span ></div > ";
                    }
                    else {
                        // ViewBTN = "";
                        CancelBTN = "";
                        PrintBTN = "";
                    }


                    $("#" + EffectiveTableid + " tbody").append(
                        //  $("#TblApplied_SearchRecords tbody").append(
                        " <tr>" +
                        "<td >" + ViewBTN + " </td>" +
                        "<td>" + Value2.leaveReason + "</td>" +
                        "<td>" + Value2.leaveAppliedDate + " </td>" +

                        "<td>" + Value2.fromTime + " </td>" +
                        "<td>" + Value2.toTime + " </td>" +
                        "<td >" + Value2.totalTime + " </td>" +
                        // "<td >" + Value2.leaveNoOfDays1 + " </td>" +

                        "<td>" + Value2.leaveStatus + " </td>" +

                        "<td style='text-align:center;'> " + CancelBTN + "</td>" +
                        "<td >" + PrintBTN + " </td>" +
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
                debugger;
                $('#TblAppliedShortLeaves_SearchRecords_pagination').empty();
                var table = $('#' + EffectiveTableid);
                var tbody = table.find('tbody');

                var rowsPerPage = 10; // Number of rows to display per page
                var numPages = Math.ceil(responce.length / rowsPerPage);
                var currentPage = 1; // Default current page

                var pagination = $('#TblAppliedShortLeaves_SearchRecords_pagination');
                pagination.empty();

                // Create pagination links
                var previousLink = $('<a class="TblAppliedShortLeaves_SearchRecords_pagination_Class" style="margin: 0 2px;" href="#">Previous</a>');
                pagination.append(previousLink);

                var startIndex = 1; // Start index for pagination links
                var endIndex = Math.min(numPages, 10); // End index for pagination links

                for (var i = startIndex; i <= endIndex; i++) {
                    var link = $('<a class="TblAppliedShortLeaves_SearchRecords_pagination_Class" style="margin: 0 2px;" href="#">' + i + '</a>');
                    pagination.append(link);
                }


                var nextLink = $('<a class="TblAppliedShortLeaves_SearchRecords_pagination_Class" style="margin: 0 2px;" href="#">Next</a>');
                pagination.append(nextLink);

                // Show the first page by default
                showPage(currentPage);

                // Adjust pagination alignment
                pagination.css('text-align', 'center');

                // Handle pagination link click event
                pagination.on('click', '.TblAppliedShortLeaves_SearchRecords_pagination_Class', function (e) {

                    e.preventDefault();

                    var linkText = $(this).text();
                    if (linkText === "Previous") {
                        currentPage = Math.max(currentPage - 1, 1);
                    } else if (linkText === "Next") {
                        currentPage = Math.min(currentPage + 1, numPages);
                    } else {
                        currentPage = parseInt(linkText);
                    }
                    showPage(currentPage);
                });

                // Function to display the specified page
                function showPage(page) {
                    var start = (page - 1) * rowsPerPage;
                    var end = start + rowsPerPage;

                    tbody.find('tr').hide(); // Hide all rows
                    tbody.find('tr').slice(start, end).show(); // Show rows for the specified page

                    // Update pagination links
                    var newStartIndex = Math.max(1, page - 4);
                    var newEndIndex = Math.min(newStartIndex + 9, numPages);

                    if (newEndIndex === numPages) {
                        newStartIndex = Math.max(1, numPages - 9);
                    }

                    pagination.empty();
                    pagination.append(previousLink);

                    for (var i = newStartIndex; i <= newEndIndex; i++) {
                        var link = $('<a class="TblAppliedShortLeaves_SearchRecords_pagination_Class" style="margin: 0 2px;" href="#">' + i + '</a>');
                        pagination.append(link);
                    }

                    pagination.append(nextLink);

                    // Update active class on current page link
                    $('.TblAppliedShortLeaves_SearchRecords_pagination_Class').removeClass('active');
                    $('.TblAppliedShortLeaves_SearchRecords_pagination_Class').eq(page - newStartIndex + 1).addClass('active').css('cursor', 'unset');;
                    debugger;
                    if (responce.length < 11) {
                        $("#" + EffectiveTableid + " tfoot").hide();
                    }
                    else {
                        $("#" + EffectiveTableid + " tfoot").show();
                    }

                }

            }
        },
        error: function (xhr, status, erro) {
            $("#Main_Span_Error").text("Something Error");
        }
    });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}

