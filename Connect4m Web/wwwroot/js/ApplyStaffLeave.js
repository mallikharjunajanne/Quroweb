

function FN_ClearValues1(Formid) {
    try {
        $('#your-p-id').find('span').empty();
        debugger;
        document.getElementById(Formid).reset(); // Reset the form

        debugger;
        //var form = document.getElementById(Formid);
        //var elements = form.elements;
        //for (var i = 0; i < elements.length; i++) {
        //    var element = elements[i];
        //    if (!element.disabled) {
        //        if (element.type === "text" || element.type === "textarea" || element.type === "select-one") {
        //            element.value = "";
        //        } else if (element.type === "checkbox" || element.type === "radio") {
        //            element.checked = false;
        //        }
        //    }
        //}
       $("#todate").val('');
        $("#fromdate").val('');
        $("#DaySession").hide();
       // $("#Descriptionid1").prop("disabled", false);
        $("#Dates_Div").hide();


        $("#Descriptionid1").prop('disabled',false);

        $("#LeavetypeTB").val('');

        //$("#radioinline1").prop("checked", false);
        //$("#radioinline2").prop("checked", false);
        //$("#radioinline12").prop("checked", false);
        //$("#radioinline22").prop("checked", false);

        $("#TextareacountSPAN").text('500');

        $("#GetLeaveDaysAvailableid").text('');

        $("#GetLeaveDaysAvailableidtTotal").text('');
        $("#HdnLeavetypeidForGetcurrectLeavedays").val('');
        $("#HdnGetLeaveDaysAvailabletoLeavetype").val('');


        GetLeaveTypeDropdown_CallingMethod();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}


//for Refresh
function ApplyLeave_refreshpage() {
    document.getElementById('myForm').reset(); // Reset the form

    $('#your-p-id').find('span').empty();

    //$("#listofformat").text(" ");
    GetMysavedLeaves_CallingFunction();

    GetLeaveTypeDropdown_CallingMethod();

    GetShort_Description_for_Leave_Reason_CallingMethod();
    /* $("#myFormCart tbody").remove();*/

    $("#labelLB").text('');
    $(this).removeClass('labelLB');
    $("#Descriptionid1").prop("disabled", false);
    $('#your-p-id').find('span').empty();

    $("#DaySession").hide();
    $("#MedicalLeaveDocument").hide();
   // $("#todateLB").show();
    //$("#todate").show();
    $("#todate").val('');
    $("#fromdate").val('');
    //$("#fromdateLB").show();
   // $("#HAlfdayLB").hide();
    $("#ErrorrmessageSPAN").show();
   
    $("#marriagechecking").prop("disabled", false);


    $("#AttendancePercentage").text('');
    $("#myFormCart tbody").empty();
    $("#myFormCart").hide();
    // $("#AdmissionNum").text('');
    $("#GetLeaveDaysAvailableid").text('');
    $("#savebutton").prop("disabled", false);
    $("#myForm_ClearBtn").prop("disabled", false);
    $("#marriagechecking_Span").show();
    $("#savebutton").val("Add Leaves To Cart");
    $("#EditBTid").val('');

    $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave tbody").empty();
    $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave ").hide();
    $("#accordionoc_Print").hide();
    $("#printDetails_Form_IN_ApplyLeave").hide();

    $("#HdnLeavetypeidForGetcurrectLeavedays").val('');
    $("#HdnGetLeaveDaysAvailabletoLeavetype").val('');
    var printBtn = document.getElementById('PrintBTN_IN_ApplyLeave')
    printBtn.innerHTML = "";
    $("#Dates_Div").hide();

};



////This for Tabs 1 2 3 or Click on Apply leave*@

//---tab 1
//var resetButton = document.getElementById('GetMyLeaveDetails_BTN');
//resetButton.addEventListener('click', function () {
//    GetMyLeaveDetails_CallingMethod();

//});

function MyLeaveTabCalingFunction_Btn() {
    debugger;
    GetMyLeaveDetails_CallingMethod();
}


//ApplyLeave_refreshpage   ---tab 2
//var resetButton = document.getElementById('refreshButton');
//resetButton.addEventListener('click', ApplyLeave_refreshpage);

function ApplyLeaveTabCalingFunction_Btn() {
    debugger;
    ApplyLeave_refreshpage();
}

//---tab 3
//var GetMyAppliedLeaves_BTN = document.getElementById('GetMyAppliedLeaves_BTN');
//GetMyAppliedLeaves_BTN.addEventListener('click', function () {
//    //document.getElementById('GetMyAppliedLeaves_Form').reset(); // Reset the form
//    $('#your-p-id1').find('span').empty();
//    var PrintBTN = document.getElementById("PrintBTN");
//    PrintBTN.innerHTML = "";
//    $("#accordionoc_VIEW").hide();
//    GetMyAppliedLeaves_CallingMethod();
//});

function LeaveStatusTabCalingFunction_Btn() {
    debugger;

    $('#your-p-id1').find('span').empty();
    var PrintBTN = document.getElementById("PrintBTN");
    PrintBTN.innerHTML = "";
    $("#accordionoc_VIEW").hide();
    GetMyAppliedLeaves_CallingMethod();
 
}



$(document).ready(function () {
    var clickedButtonValue = null; // Variable to store the clicked button value

    //This for getting clicked button Name
    $('.submit-btn').click(function () {
        clickedButtonValue = $(this).val(); // Store the clicked button value
    });

    //This is for Sumbmit the cart details from table
    /*$("#myFormCart tbody tr").submit(function (event) {*/
    $("#myFormCart").submit(function (event) {
        try {
            event.preventDefault(); // prevent the form from submitting
            //var clickedButton = $(this).find('tbody tr');
            //alert(clickedButton)
            var count = 0;
            var TopVAlue = "";
            var Reason = "";
            var ReturnTOStop = "";
            $('#myFormCart tbody tr').each(function () {
                //var price = $(this).find("td:nth-child(3)").text()
                debugger;
                // Reason = $(this).find("td:nth-child(3) input").val();
                // Reason = $(this).find("td:nth-child(3)").text().replace(" ","");
                Reason = $(this).find("td:nth-child(3)").find("#DescriptionidtextCT").val().replace(" ", "");
                if (count == 0) {
                    TopVAlue = Reason;
                }
                debugger;
                if (Reason != TopVAlue) {
                    $('#your-p-id').find('span').empty();
                    $('#successMessage').text("You can't apply a Leave Request with different Reasons.Leave Reason should be same for one Leave Request.");
                    ReturnTOStop = "return1";
                    return;
                }
                count++;
            });

            if (ReturnTOStop == "return1") {
                return;
            }

            var bt = clickedButtonValue;

            //var bt = clickedButton.val();

            var Userid = $("#Userid").val();
            var ScreenName = $("#ScreenName").val();
            //You can't apply a Leave Request with different Reasons. Leave Reason should be same for one Leave Request.
            $("#loadingOverlay").show();
            var formData = new FormData(this);
            $.ajax({
                url: "/Attendance/ApplyStaffLeave?submitButton=" + bt + "&Userid=" + Userid + "&ScreenName=" + ScreenName,
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
  
                    GetMysavedLeaves_CallingFunction();
                    debugger;
                    if (response.message.includes("Success12")) {
                        var successMessage = response.message;
                        debugger;

                        ApplyLeave_refreshpage();
                        var Batchid = successMessage.replace("Success12-", "").replace("", "");

                        MyAppliedLeaves_PrintTable_IN_ApplyLeaves(Batchid);
                    }
                    else if (response.message == "Staff Leave Saved Successfully" || response.message == "As you are a final level approver, but there is no Self-Approval defined to you." || response.message == "Staff Leave Deleted Successfully" || response.message == "Staff Leave Updated Successfully" || response.message == "Request has Self - Approved Successfully.") {
                        $('#your-p-id').find('span').empty();
                        debugger;
                        //  $('#myForm').find('input').val('');
                        $("#myFormCart tbody").empty;
                        ApplyLeave_refreshpage();

                        $('#myFormCart').hide();
                        if (response.message == "Staff Leave Saved Successfully") {
                            $('#successMessage').text('');
                        }
                        else {
                            $('#successMessage').text(response.message);
                        }

                        // document.getElementById('myForm').reset();
                        //$("#savebutton").prop("disabled", true)
                        // $("#MedicalLeaveDocument").hide();
                        // $("#GetLeaveDaysAvailableid").text('');
                        debugger;
                    
                        $("#myForm #savebutton").val("Add Leaves To Cart");
                        $("#myForm #savebutton").prop("disabled", false);

                        window.scrollTo(0, 0);
                    }
                    else {
                        $('#successMessage').text(response.message);

                        window.scrollTo(0, 0);
                    }
                    $("#loadingOverlay").hide();
                    //if (result == 1) {
                    //    alert("OK")
                    //    $('#myForm').find('input').val('');
                    //    $("#myFormCart").find('tbody').empty;
                    //    window.scrollTo(0, 0);
                    //}

                    // handle the response from the server
                },
                error: function (xhr, status, error) {
                    $("#loadingOverlay").hide();
                    // alert($("#submitButton").val());
                    $("#followingfieldsErrorSPAN").text("Something Error");
                    // handle the error
                }
            });
        } catch (e) {
            $("#loadingOverlay").hide();
            $("#followingfieldsErrorSPAN").text("Something Error");
        }

    });

    //This Is For save in cart
    $("#myForm").submit(function (event) {
        try {
            debugger;
            event.preventDefault(); // prevent the form from submitting

            $('#your-p-id').find('span').empty();
            window.scrollTo(0, 0);
            //var form = $(this);

            //var isChecked = $("#marriagechecking").prop("checked");
            //if (isChecked) {
            //    var ShortDescriptionforLeave_Reason = "1";
            //}
            var file12 = $('#attachdocument').prop('files')[0]; // Get the selected file

            var Fromdate = $("#fromdate").val();
            var Todate = $("#todate").val();
            /*var Examid12 = $("#Examid").val();*/

            //var Classidid12 = $("#classid").val();
            var Descriptionid = $("#Descriptionid1").val();


            /*  alert(Descriptionid )*/
            var Leavetype = $("#leavetype").val();
            /*  var valo = $("#mySpan").text();*/

            var radioButtonsDaysession1 = document.querySelectorAll('.check1:checked');
            var Daysession1 = Array.from(radioButtonsDaysession1).map(function (button) {
                return button.value;
            });
            var radioButtons = document.querySelectorAll('.check:checked');
            var Daystype12 = Array.from(radioButtons).map(function (button) {
                return button.value;
            });
            var c = 0; 
            if (Descriptionid === '' || Leavetype === '' || Fromdate === '' || Todate === '' || $("input[type='radio'].check").is(':checked') == false || $("input[type='radio'].check1").is(":checked") == false) {
               // $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
                if (Leavetype === '') {
                    $("#LeavetypeERROR").text("Leave Type");
                    c++;
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
                   
                    if ($("input[type='radio'].check1").is(":checked") == false && dayvalue == "1") {
                        $("#DaysessionERROR").text('Day Session'); c++;
                    }
                }
                if (c > 0) {
                    $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
                    return;
                }
               // return;
            }
            else if (Fromdate != '' || Todate != '') {

                /*You can't apply leave for past days*/
                //var today = new Date();
                //var year = today.getFullYear();
                //var month = ('0' + (today.getMonth() + 1)).slice(-2);
                //var day = ('0' + today.getDate()).slice(-2);
                //var dateString = year + '-' + month + '-' + day;
                //var dateString = year + '-' + month;

                //if (Date.parse(Fromdate) < Date.parse(dateString)) {
                //    $("#Datechecking").text("Please Select a 'From Date' should not less than 'Today Date' ");
                //    window.scrollTo(0, 0);
                //    return;
                //}
                //else if (Date.parse(Todate) < Date.parse(dateString)) {
                //    $("#Datechecking").text("Please Select a 'To Date' should not less than 'Today Date' ");
                //    window.scrollTo(0, 0);
                //    return;
                //}
                if (Date.parse(Todate) < Date.parse(Fromdate)) {
                    $("#Datechecking").text("'From Date' cannot be greater than 'To Date'. ");
                    return;
                }
                else {
                    $('#your-p-id').find('span').empty();
                }

            }

            //if (Daystype12 == "1") {
            //    if ($("input[type='radio'].check1").is(':checked') == false) {
            //        $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
            //        $("#DaysessionERROR").text("Day Session");
            //        return;
            //    }
            //}

            if (file12) {
              
                var allowedExtensions = ['.doc', '.docx', '.txt', '.jpeg', '.jpg', '.pjpeg', '.gif', '.png', '.pdf'];
                // Check the file extension
                var fileExtension = '.' + file12.name.split('.').pop().toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    $('#attachdocument').val('');
                    $("#followingfieldsErrorSPAN").text('Invalid file extension. Only .doc, .docx, .txt, .jpeg, .jpg, .pjpeg, .gif, .png, and .pdf are supported.');
                    return;
                }
                // Check file size
                var maxSize = 500 * 1024; // 500 KB
                if (file12.size > maxSize) {
                    $("#followingfieldsErrorSPAN").text('File size exceeds the maximum limit of 500 KB.');
                    $('#attachdocument').val('');
                    return;
                }
            }

            //  var begindate12;
            // var enddate12;
            var n = 1.0;
            var TotalLeaves = 0.5;
            if (Daystype12 == "1") {
                TotalLeaves = 0.5;
            }
            else {
                var fromDate = new Date(Fromdate);
                var toDate = new Date(Todate);
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

            if (btn == "Update to Cart" && LeaveApplicationId != "") {
                //  alert($("#TotaldaysInTable").val())
                LeaveDaysAvailable += parseFloat($("#TotaldaysInTable").val());
                if (LeaveDaysAvailable < 0) {
                    text1 = "You can't apply more than available leaves under " + leavetype12 + " ";

                    $("#followingfieldsErrorSPAN").text(text1);
                    return;
                }
            }
            //else if (LeaveDaysAvailable <= 0 && Leavetype != "122") {
            else if (LeaveDaysAvailable < 0 && Leavetype != "122") {

                // You have no available leaves to apply more under Earned Leave
                var text1 = "";
                var rowid = $("#EditBTid").val();
                //if (LeaveDaysAvailable1 == 0) {
                if (LeaveDaysAvailable1 <= 0) {
                    text1 = "You can't apply more than available leaves under " + leavetype12 + " ";
                }
                else {
                    var yearconvert1;
                    var monthconvert1;
                    var dayconvert1;
                     /*You can't apply leave for past days*/
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

            var formData = new FormData(this);// $(this).serialize(); // get the form data

            var rowid = $("#EditBTid").val();
            var tableData = [];

            // Get table data
            var tableRows = $("#myFormCart tbody tr");
            // var rowidCT="";
            tableRows.each(function () {
                //var EDITbtnID = $(this).closest('tr').find('.ID_APPEND_For_Edit').val();
                var rowidCT = $(this).find("td").find('.ID_APPEND_For_Edit').val();

                if (rowidCT != rowid) {

                    var rowData = {};
                    var columnValue1 = $(this).find("td").eq(3).find("input").val();

                    var columnValue2 = $(this).find("td").eq(4).find("input").val();


                    var columnName1 = "TogridDate_Sting";

                    var columnName2 = "FromgridDate_String";

                    //var columnName1 = $(this).find("td").eq(4).attr('name');

                    //var columnName2 = $(this).find("td").eq(5).attr('name');

                    rowData[columnName1] = columnValue1;
                    rowData[columnName2] = columnValue2;

                    tableData.push(rowData);
                }
            });
            // var formData = new FormData($("#myForm")[0]);
           
            formData.append('tableData', JSON.stringify(tableData));
            var Userid = $("#Userid").val();
            var bt = $("#savebutton").val();
            $("#loadingOverlay").show();
            /* alert(bt)*/
            $.ajax({
                /* url: "/Attendance/ApplyStaffLeave",*/
                url: "/Attendance/ApplyStaffLeave?submitButton=" + bt + "&Userid=" + Userid,
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    if (response.message == "2") {
                        $('#attachdocument').val('');
                        $("#successMessage").text('Already a file with the same name is attached to another Leave. Please upload a new file.');
                        return;
                    }
                    else if (response.message == 1) {

                        var attachdocument_String = $("#attachdocument_String").val();
                        /*  $("#myFormCart tbody tr").remove();*/
                        GetMysavedLeaves_CallingFunction();
                        if (response.buttonName == "Update to Cart") {
                            /*var EDITbtnID = $("#myFormCart).find('#id_For_Edit').val();*/
                            /* alert(EDITbtnID)*/

                            //var id = $("#EditBTid").val();
                            //$('#' + id).closest('tr').empty();
                            //$("#myForm #savebutton").val("Add Leaves To Cart");

                            //$("#myFormCart").find('div').find("myForm ,#marriagechecking").prop("checked", false);


                            //var value =10;

                            //// Remove the row with the retrieved value
                            //$('#myTable tr').each(function () {
                            //    var rowValue = $(this).find('td:first').find('div').find('#id_For_Edit').val(); // Assuming the value is in the first cell of each row
                            //    alert(rowValue)

                            //    if (rowValue === value) {
                            //        $(this).remove();
                            //        return false; // Exit the loop after removing the matching row
                            //    }


                            //}


                            debugger;

                            //This is worked--------------------------------------------------------------
                            var id = $("#EditBTid").val();

                            var ROWid = $('#' + id).closest('tr');

                            var InputValue = ROWid.find('#LeavetypeidCT').attr('name');

                            InputValue = InputValue.split('[')[1].split(']')[0];

                            // $('#' + id).closest('tr').remove();
                            //$('#' + id).closest('tr').
                            //ROWid.find('#Textarea').val()
                            // $("#myForm").find('div').find("myForm ,#Textarea").val(LeavecommentsCT2);


                            var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");

                            deletebtn.innerHTML = "";

                            var anchorElement = document.getElementById("AttachDocumentTB_FileName_LABEL");

                            anchorElement.innerHTML = "";

                            $("#attachdocument_String").val('');


                            //$(document).ready(function () {
                            //    // Retrieve the ID and value from the URL query parameters

                            //    var id = 'id_For_Edit';
                            //    $('#' + id).closest('tr').remove();

                            //    // Remove the row with the retrieved ID and value on page load

                            //    ('#id_For_Edit').closest('tr').empty();
                            //})



                            //$("#myFormCart").find('tbody').find('tr').find("myFormCart ,#id_For_Edit").empty();


                            //$('#myFormCartTable tr').filter(function () {
                            //    return $(this).find('td').find('#id_For_Edit').val() === 10;
                            //}).remove();

                        }


                        var Leavetypeid = $("#leavetype").val();
                        var leavetype = $("#leavetype option:selected").text();


                        var Descriptionid = $("#Descriptionid1").val();
                        var Descriptionidtext = $("#Descriptionid1 option:selected").text();
                        /* alert(Descriptionid + "++" + Descriptionidtext)*/
                        var Fromdate123 = $("#fromdate").val();

                        var Todate123 = $("#todate").val();

                        var Fromdate;
                        var Todate;
                        /*   var begindate12 = Convert.ToDateTime(FromdateCT2);*/
                        if (Fromdate123.indexOf("-") !== -1) {
                            Fromdate = moment(Fromdate123, "YYYY-MM-DD").format("DD/MM/YYYY");
                            Todate = moment(Todate123, "YYYY-MM-DD").format("DD/MM/YYYY");
                            // Date format is "dd/mm/yyyy"

                        } else if (Fromdate123.indexOf("/") !== -1) {
                            Fromdate = Fromdate123;
                            Todate = Todate123;
                        }

                        var radioButtons = document.querySelectorAll('.check:checked');
                        var Daystype12 = Array.from(radioButtons).map(function (button) {
                            return button.value;
                        });
                        var Daystype = "";
                        if (Daystype12 == "0") {
                            Daystype = "Full day";
                        }
                        else if (Daystype12 == "1") {
                            Daystype = "Half day";
                        }

                        if (LeaveDaysAvailable < 0) {
                            LeaveDaysAvailable = 0;
                        }

                        debugger;

                        $("#GetLeaveDaysAvailableid").text(LeaveDaysAvailable.toFixed(1));
                        debugger;
                        //var LeaveApplicationId = $("#LeaveApplicationId").val();
                        var count = 0;
                        if (btn == "Update to Cart") {
                            $('#myFormCart tbody tr').each(function () {
                                LeaveApplicationIdCT = $(this).find("td").find("#LeaveApplicationIdCT").val();
                                debugger;
                                if (LeaveApplicationIdCT != "") {
                                    count++;
                                }
                            });
                            debugger;
                            if (count > 0) {
                                $('#myFormCart tbody tr').each(function () {
                                    //var price = $(this).find("td:nth-child(3)").text()

                                    // Reason = $(this).find("td:nth-child(3) input").val();
                                    debugger;
                                    LeaveApplicationIdCT = $(this).find("td").find("#LeaveApplicationIdCT").val();
                                    debugger;
                                    if (LeaveApplicationIdCT == "") {
                                        debugger;
                                        $(this).remove();
                                    }
                                });
                            }
                        }

                        var radioButtonsDaysession = document.querySelectorAll('.check1:checked');
                        var Daysession = Array.from(radioButtonsDaysession).map(function (button) {
                            return button.value;
                        });

                        var Daysession12 = "";
                        if (Daysession == "1") {
                            Daysession12 = "Morning";
                        }
                        else if (Daysession == "2") {
                            Daysession12 = "Afternoon";
                        }
                        var Leavecomments = $("#Textarea").val();
                        var isChecked = $("#marriagechecking").prop("checked");
                        var marriagechecking = 0;
                        if (isChecked) {
                            marriagechecking = 1;
                        } else {
                            marriagechecking = 0;
                        }

                        var Leavetypeid = $("#leavetype").val();
                        var leavetype = $("#leavetype option:selected").text();


                        var tablelength;
                        if (response.buttonName == "Update to Cart") {
                            var tablelength = InputValue;
                        } else {
                            tablelength = $("#myFormCart tbody tr").length;
                        }

                        var Leavetypeid1 = "<input name='InputValue[" + tablelength + "].Leavetypeid' type='text' id='LeavetypeidCT' value='" + Leavetypeid + "' hidden/>";
                        /*  var leavetype1 = "<input name='leavetype' type='text' id='LeavetypeidCT' value='" + leavetype + "' />";*/
                        var Descriptionid1 = "<input  type='text' id='DescriptionidCT'  value='" + Descriptionid + "' hidden/>";


                        var Descriptionidtext1 = "<input name='InputValue[" + tablelength + "].ShortDescriptionforLeave_Reason' type='text' id='DescriptionidtextCT'  value='" + Descriptionidtext + "' hidden/>";
                        var Fromdate1 = "<input name='InputValue[" + tablelength + "].Fromdate' type='text' id='FromdateCT' value='" + Fromdate + "'  hidden/>";
                        var Todate1 = "<input name='InputValue[" + tablelength + "].Todate' type='text' id='TodateCT' value='" + Todate + "' hidden/>";
                        var Daystype1 = "<input name='InputValue[" + tablelength + "].Daystype' type='text' id='DaystypeCT' value='" + Daystype + "' hidden   />";
                        var Daysession1 = "<input name='InputValue[" + tablelength + "].Daysession' type='text' id='DaysessionCT' value='" + Daysession + "' hidden/>";
                        var Leavecomments1 = "<input name='InputValue[" + tablelength + "].Leavecomments' type='text' id='LeavecommentsCT' value='" + Leavecomments + "' hidden/>";


                        var attachdocument_FILE1 = "<input  type='file'  asp-for='file' class='attachdocumentCT' name='InputValue[" + tablelength + "].file' id='attachdocumentCT" + tablelength + "';  hidden />";
                        var AppliedForMarriageCT = "<input name='InputValue[" + tablelength + "].marriagechecking_Int' type='text' id='marriagecheckingCT' value='" + marriagechecking + "' hidden/>";

                        var Batchid2 = $("#BatchidTextbox").val();


                        var LeaveApplicationId = $("#LeaveApplicationId").val();
                        var Batchid1 = "<input name='InputValue[" + tablelength + "].Batchid' type='text' id='BatchidCT' value='" + Batchid2 + "' hidden/>";
                        var LeaveApplicationId1 = "<input name='InputValue[" + tablelength + "].LeaveApplicationId' type='text' id='LeaveApplicationIdCT' value='" + LeaveApplicationId + "' hidden/>";
                        var attachdocument_String1 = "<input  type='text'  asp-for='attachdocument' name='InputValue[" + tablelength + "].attachdocument' id='attachdocumentCT_String'   value='" + attachdocument_String + "' hidden/>";

                        var editbt = " <div style='text-align:center;'><a class='fa fa-edit' title='Edit' style='font-size: 15px; color: red;cursor:pointer;'></a><input type='text' hidden class='ID_APPEND_For_Edit' readonly   /></div>";

                        //var editbt = " <div class='fa fa-edit' style='font-size: 20px; color: red'><input type='text' hidden class='ID_APPEND_For_Edit' readonly   /></div>";
                        var deleteBTN = " <p class='fa fa-trash-o' title='Click to delete this record' style='font-size: 17px; color: red;cursor:pointer;'><input type='text' hidden readonly id='id_For_Delete' value='" + LeaveApplicationId + "' /></p>";


                        var newRow = "<tr>" +
                            "<td>" + editbt + "" + AppliedForMarriageCT + "" + attachdocument_FILE1 + "" + Batchid1 + "" + LeaveApplicationId1 + "" + attachdocument_String1 + "</td>" +
                            "<td>" + leavetype + "" + Leavetypeid1 + "</td>" +
                            "<td>" + Descriptionidtext + " " + Descriptionid1 + "" + Descriptionidtext1 + "</td>" +
                            "<td>" + Fromdate1 + " " + Fromdate + "</td>" +
                            "<td>" + Todate1 + " " + Todate + "</td>" +
                            "<td>" + Daystype1 + " " + Daystype + "</td>" +
                            "<td>" + Daysession1 + " " + Daysession12 + "</td>" +
                            "<td>" + Leavecomments1 + " " + Leavecomments + "</td>" +
                            "<td>" + TotalLeaves + "</td>" +
                            "<td style='text-align:center;'>" + deleteBTN + "</td>" +
                            "</tr>";
                        if (response.buttonName == "Update to Cart") {
                            $('#' + id).closest('tr').replaceWith(newRow);
                        } else {
                            $("#myFormCart tbody").append(newRow);
                        }

                        Pagination(1, "myFormCart");
                        $("#myFormCart").show();

                      //  var files = $("#attachdocument")[0].files;
                        //console.log(files);
                      //  $('#attachdocumentCT' + tablelength)[0].files = files;

                       // $('#attachdocumentCT' + tablelength)[0].files = $("#attachdocument")[0].files;

                        debugger;

                        if (file12) {
                            var fileinputinForm_Toget = $("#attachdocument")[0].files[0];
                            const Datatransfer = new DataTransfer();
                            Datatransfer.items.add(fileinputinForm_Toget);
                            $('#attachdocumentCT' + tablelength)[0].files = Datatransfer.files;                           
                        }
                        $("#attachdocument").val('');
                        //var filenameinput = document.getElementById("attachdocument");
                        //var attachdocument12 = filenameinput.files[0];

                        //$("#attachdocumentCT").prop('files', [attachdocument12]);
                        $("#fromdate").val('');
                        $("#todate").val('');
                        $("#Textarea").val('');
                        $("#LeaveApplicationId").val('');
                        $("#attachdocument_String").val('');
                        $("#BatchidTextbox").val('');

                     //   $("#myForm").find('div').find("myForm ,#attachdocument").val('');
                  
                      //  $("#myForm").find("#attachdocument").val('');

                        $("#Descriptionid1").val('');
                        $("#Descriptionid1").prop("disabled", false);

                        $("#radioinline11").prop("checked", false);
                        $("#radioinline21").prop("checked", false);

                        $("#labelLB").text('');
                        $(this).removeClass('labelLB');

                        $("#HAlfdayLB").hide();
                        $("#DaySession").hide();
                        $("#MedicalLeaveDocument").hide();
                        $("#todateLB").show();
                        $("#todate").show();
                        $("#todate").val('');
                        $("#fromdateLB").show();
                        $("#HAlfdayLB").hide();
                        $("#ErrorrmessageSPAN").show();
                        $("#DaySession").hide();
                        $("#marriagechecking").prop("disabled", false);
                        $("#radioinline1").prop("checked", false);
                        $("#radioinline2").prop("checked", false);
                        if (btn == "Update to Cart") {
                            $("#myForm_ClearBtn").prop("disabled", true);
                        }
                        $("#Dates_Div").hide();
                        if (Leavetypeid == 122 && LeaveDaysAvailable < 0) {
                            $("#GetLeaveDaysAvailableid").text('');
                        }
                        else {
                            $("#GetLeaveDaysAvailableid").text(LeaveDaysAvailable.toFixed(1));
                        }
                        $("#myFormCart").show();

                        //var today = new Date();
                        //var year = today.getFullYear();
                        //var month = ('0' + (today.getMonth() + 1)).slice(-2);
                        //var day = ('0' + today.getDate()).slice(-2);
                        //var TodaydateString = year + '-' + month + '-' + day;
                        debugger;
                        //if (Date.parse(Fromdate) < Date.parse(TodaydateString) || Date.parse(Todate) < Date.parse(TodaydateString)) {

                        //    $("#myFormCart #Save_as_Draft_BTN").prop("disabled", true);
                        //} else {

                        //    $("#myFormCart #Save_as_Draft_BTN").prop("disabled", false);
                        //}
                        $("#myFormCart #Save_as_Draft_BTN").prop("disabled", false);
                        $("#HdnLeavetypeidForGetcurrectLeavedays").val('');
                          $("#HdnGetLeaveDaysAvailabletoLeavetype").val('');

                        // $("#marriagechecking").prop("checked", false);
                        var isChecked = $("#marriagechecking").prop("checked");
                        debugger;
                        if (isChecked) {
                            $("#Descriptionid1").val("5");
                            //    $("#Descriptionid1").val("Marriage");
                            $("#Descriptionid1").prop("disabled", true);
                            $("#labelLB").text("(Note: All Casual Leaves with combination of Earned Leaves can avail)");

                            // Assuming GetLeaveTypeDropdown_CallingMethod returns a promise
                            GetLeaveTypeDropdown_CallingMethod('marrigechecktrue', Leavetypeid);
                               

                          //  GetLeaveTypeDropdown_CallingMethod('marrigechecktrue');

                            //var leavetypedropdown = $('#leavetype'); // Replace 'myDropdown' with the ID of your dropdown

                            //// Clear the dropdown
                            //leavetypedropdown.empty();

                            //// Add back the desired options
                            //leavetypedropdown.append('<option value="">-------select-------</option>')
                            //leavetypedropdown.append('<option value="120">Casual Leave</option>');
                            //leavetypedropdown.append('<option value="121">Earned Leave</option>');
                            //leavetypedropdown.append('<option value="182">Casuall leave</option>');
                            // $("#GetLeaveDaysAvailableid").text('');
                            $("#marriagechecking").prop("disabled", true);

                          // $("#leavetype").val(Leavetypeid);
                        }
                        //else {
                        //    debugger;
                        //    $("#Descriptionid1").val("");
                        //    $("#Descriptionid1").prop("disabled", false);
                        //    $("#labelLB").text('');
                        //    $(this).removeClass('labelLB');
                        //    $("#GetLeaveDaysAvailableid").text('');
                        //    debugger;
                        //    GetLeaveTypeDropdown_CallingMethod();
                        //}

                        //these are for add id to ID_APPEND_For_Edit
                        var rows = $('#myFormCart  tbody tr .ID_APPEND_For_Edit');
                        rows.each(function (index) {
                            $(this).attr('id', 'row' + (index + 1));
                            $(this).attr('value', 'row' + (index + 1));
                        });
                        $("#savebutton").val("Add Leaves To Cart");
                        $("#EditBTid").val('');
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

        } catch (e) {
            $("#loadingOverlay").hide();
            $("#followingfieldsErrorSPAN").text("Something Error");
        }
    });
});



// Short Descriptions dropdown
function GetShort_Description_for_Leave_Reason_CallingMethod(Descriptionid_Value) {
    try {
    $.ajax({
        url: "/Attendance/GetShort_Description_for_Leave_Reason_CallingMethod",
        dataType: 'json',
        type: "GET",
        success: fun2,
        error(xhr, error, status) {
                $("#followingfieldsErrorSPAN").text("Something Error");
           
        }
    });
    function fun2(response) {
        $("#Descriptionid1").empty();
        debugger;
        $("#Descriptionid1").append('<option value="">' + "-------select-------" + '<option>')
        $.each(response, function (i, value1) {

            $("#Descriptionid1").append('<option value="' + value1.value + '">' + value1.text + '</option>');
        });
        debugger;
        if (Descriptionid_Value == 9) {
            $("#Descriptionid1").val(Descriptionid_Value);
        }
    }
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
}

//Leavetype dropdown
function GetLeaveTypeDropdown_CallingMethod(DisplayMarriagecheckingLeaves, Leavetypeid) {

    try {

        var InstanceId = $("#instanceid").val();
        var Userid = $("#Userid").val();
        $.ajax({
            url: "/Attendance/GetLeaveTypeDropdown_CallingMethod?InstanceId=" + InstanceId + "&Userid=" + Userid,
            dataType: 'json',
            type: "GET",
            success: fun2,

            error(xhr, status, error) {
                $("#followingfieldsErrorSPAN").text("Something Error");
            }
        });
        function fun2(response) {
            $("#leavetype").empty();
            debugger;
            $("#leavetype").append('<option value="">' + "-------select-------" + '<option>')

            var textContent = "";
            if (DisplayMarriagecheckingLeaves == "marrigechecktrue") {
                $.each(response, function (i, value1) {
                    debugger;
                    //var tempElement = $("<div>").html(value1.text);

                    //// Extract the text content without HTML tags
                    //var textContent = tempElement.text();

                    //// Use jQuery to create a new option element
                    //var option = $("<option>");

                    //// Set the extracted text as the option's text content
                    //option.text(textContent);

                    if (value1.value == 120 || value1.value == 121 || value1.value == 182) {

                        $("#leavetype").append('<option value="' + value1.value + '">' + value1.text + '</option>');
                     //   $("#leavetype").append('<option value="' + value1.value + '">' + tmp.innerHTML + '</option>');

                        if (Leavetypeid == value1.value) {
                            $("#leavetype option").prop("selected", true);
                        }
                    }
                });
            } else {
                $.each(response, function (i, value1) {
                    $("#leavetype").append('<option value="' + value1.value + '">' + value1.text + '</option>');


                    //var tempElement = $("<div>").html(value1.text);

                    //// Extract the text content without HTML tags
                    //var textContent = tempElement.text();

                    //// Use jQuery to create a new option element
                    //var option = $("<option>");

                    //// Set the extracted text as the option's text content
                    //option.text(textContent);
                    //$("#leavetype").append(option);
                });
            }
           
        }
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }

}


//This is for edit   click on edit button
$('#myFormCart').on('click', 'td a', function () {
    try {
        $("#loadingOverlay").show();
                $('#your-p-id').find('span').empty();
        var EDITbtnID = $(this).closest('tr').find('.ID_APPEND_For_Edit').val();
        /*      alert(EDITbtnID)*/
        $("#EditBTid").val(EDITbtnID);

        var trvalueTotal = $(this).closest('tr').find("td:nth-child(9)").text();
        $("#TotaldaysInTable").val(trvalueTotal);

        //var tablelength = $("#myFormCart tbody tr").length;
        /*alert(tablelength)*/
        //====This is getting Values

        debugger;
        //var EDITbtnID1 = $(this).find('#id_For_Edit').val();
        var LeavetypeidCT2 = $(this).closest('tr').find('td').find('#LeavetypeidCT').val();
        var DescriptionidCT2 = $(this).closest('tr').find('td').find('#DescriptionidtextCT').val();
        var marriagecheckingCT2 = $(this).closest('tr').find('td').find('#marriagecheckingCT').val();
        var FromdateCT2 = $(this).closest('tr').find('td').find('#FromdateCT').val();
        //var FromdateCT2 = $(this).closest('tr').find('td').find('#FromdateCT').val();
        var TodateCT2 = $(this).closest('tr').find('td').find('#TodateCT').val();
        var DaystypeCT2 = $(this).closest('tr').find('td').find('#DaystypeCT').val();
        var DaysessionCT2 = $(this).closest('tr').find('td').find('#DaysessionCT').val();
        var LeavecommentsCT2 = $(this).closest('tr').find('td').find('#LeavecommentsCT').val();
        /*var attachdocument2 = $(this).closest('tr').find('td').find('#attachdocumentCT').val();*/


        //var attachdocument2 = $(this).closest('tr').find('td').find('#attachdocumentCT' + tablelength).val();

        /*alert(attachdocument2)*/
        var Batchid12 = $(this).closest('tr').find('td').find('#BatchidCT').val();
        var LeaveApplicationIdCT12 = $(this).closest('tr').find('td').find('#LeaveApplicationIdCT').val();
        var attachdocumentCT12 = $(this).closest('tr').find('td').find('#attachdocumentCT_String').val();

        //====This is Posting Values


        $("#myForm").find('div').find("myForm ,#LeaveApplicationId").val(LeaveApplicationIdCT12);


        var file12 = $(this).closest('tr').find('td').find('.attachdocumentCT').prop('files')[0]; // Get the selected file

        var AttachDocumentTB_FileName_LABEL = document.getElementById("AttachDocumentTB_FileName_LABEL");
        var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");
        var DELETE_valueToAppend = "";
        if (file12) {
            DELETE_valueToAppend = ""
            AttachDocumentTB_FileName_LABEL.innerHTML = "";
            $("#attachdocument_String").val('');
        }
        else {
            deletebtn.innerHTML = "";
            if (attachdocumentCT12 != "") {
                DELETE_valueToAppend = "Delete";
            }
            else {
                DELETE_valueToAppend = ""
            }
            AttachDocumentTB_FileName_LABEL.innerHTML = "";
            AttachDocumentTB_FileName_LABEL.innerHTML += attachdocumentCT12.replace(/^\d+/, '');
            $("#attachdocument_String").val('');

            $("#attachdocument_String").val(attachdocumentCT12);
        }
        deletebtn.innerHTML += DELETE_valueToAppend;

        //var valueToAppend = attachdocumentCT12.substr(-9);

        //var fileInput = document.getElementById("attachdocument");
        //fileInput.value = "";
        if (LeavetypeidCT2 == 126 || LeavetypeidCT2 == 143 || attachdocumentCT12 != "") {
            $("#MedicalLeaveDocument").show();

            debugger;
            // $("#attachdocumentCT")[0].files =  $("#attachdocumentCT")[0].files;
            $("#attachdocument")[0].files = $(this).closest('tr').find('td').find('.attachdocumentCT')[0].files;
            // $("#attachdocument")[0].files = $('#attachdocumentCT'+tablelength)[0].files;
            /*$("#myForm").find('div').find("myForm ,#attachdocument").val(attachdocument2);*/
        } else {
            $("#MedicalLeaveDocument").hide();
            $("#MedicalLeaveDocument").val('');
        }
        //var LeaveDaysAvailable1 = $("#GetLeaveDaysAvailableid").text();
        //var TotalLeaves = $("#GetLeaveDaysAvailableidTotal").val();
        //var LeaveDaysAvailable = TotalLeaves - LeaveDaysAvailable1;

        var totalleaves = 0.0;
        var sum = 0.0;
        $('#myFormCart tbody tr').each(function () {
            //var price = $(this).find("td:nth-child(3)").text()
         
            // Reason = $(this).find("td:nth-child(3) input").val();
            TotalLeave = $(this).find("td:nth-child(9)").text();
            sum += parseFloat(TotalLeave);
        });
        var trvalue = $(this).closest('tr').find("td:nth-child(9)").text();
       
        var totalleaves1 = sum - parseFloat(trvalue);
        GetLeaveDaysAvailable(LeavetypeidCT2);

        function GetLeaveDaysAvailable(LeavetypeidCT2) {

            $("#GetLeaveDaysAvailableid").empty();

            var Userid = $("#Userid").val();

            $.ajax({
                url: "/Attendance/GetLeaveDaysAvailable?leavetype=" + LeavetypeidCT2 + "&Userid=" + Userid,
                dataType: 'json',
                type: "GET",
                success: fun215
            });
            function fun215(response) {
                debugger;
                //$("#GetLeaveDaysAvailableid").append(response);
                //$("#GetLeaveDaysAvailableidtTotal").val('');
                //$("#GetLeaveDaysAvailableidtTotal").val(response);


                //  var LeaveApplicationIdCT = $(this).closest('tr').find('td').find("#LeaveApplicationIdCT").val();
                // alert(LeaveApplicationIdCT12)
                debugger;
                if (LeaveApplicationIdCT12 == "") {
              
                    totalleaves = parseFloat(response) - totalleaves1;
                }
                else {
                    totalleaves = parseFloat(response);
                }


                // totalleaves = parseFloat(response) + parseFloat(trvalue);


                /*totalleaves = totalleaves - (sum - parseFloat(trvalue));*/


                $("#GetLeaveDaysAvailableid").append(totalleaves);
                $("#GetLeaveDaysAvailableidtTotal").val('');
                $("#GetLeaveDaysAvailableidtTotal").val(totalleaves);


                $("#HdnLeavetypeidForGetcurrectLeavedays").val(LeavetypeidCT2);
                $("#HdnGetLeaveDaysAvailabletoLeavetype").val(totalleaves);
            }
        }

        $("#Descriptionid1").prop("disabled", false);

        //$("#myForm").find('div').find("myForm ,#Descriptionid1").val(DescriptionidCT2);

        $("#Textarea").val(LeavecommentsCT2);
        // $("#myForm").find('div').find("myForm ,#attachdocument").val(attachdocument2);
        if (marriagecheckingCT2 == "1") {

            $("#myForm").find('div').find("myForm ,#marriagechecking").prop("checked", true);

            $("#Descriptionid1").val("5");
            //    $("#Descriptionid1").val("Marriage");
            $("#Descriptionid1").prop("disabled", true);
            $("#labelLB").text("(Note: All Casual Leaves with combination of Earned Leaves can avail)");

            GetLeaveTypeDropdown_CallingMethod('marrigechecktrue', LeavetypeidCT2);


            //var leavetypedropdown = $('#leavetype'); // Replace 'myDropdown' with the ID of your dropdown

            //// Clear the dropdown
            //leavetypedropdown.empty();

            //// Add back the desired options
            //leavetypedropdown.append('<option value="">-------select-------</option>')
            //leavetypedropdown.append('<option value="120">Casual Leave</option>');
            //leavetypedropdown.append('<option value="121">Earned Leave</option>');
            //leavetypedropdown.append('<option value="182">Casuall leave</option>');
            $("#GetLeaveDaysAvailableid").text('');
        }
        else {
            $("#myForm").find('div').find("myForm ,#marriagechecking").prop("checked", false);
            /* $("#myForm").find('div').find("myForm ,#Descriptionid1").val(DescriptionidCT2);*/
            $("#labelLB").text('');
            $(this).removeClass('labelLB');
            $("#Descriptionid1").prop("disabled", false);
             $("#myForm").find('div').find("myForm ,#leavetype").val(LeavetypeidCT2);
        }

        /*alert(DescriptionidCT2)*/
        //$("#myForm").find('div').find("myForm ,#Descriptionid1").val(DescriptionidCT2);

        $("#Descriptionid1 option:contains('" + DescriptionidCT2 + "')").prop("selected", true);

        $("#DescriptionidTB1").val(DescriptionidCT2);
        debugger;
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


            //    $("#radioinline11").prop("checked", false);
            //$("#radioinline21").prop("checked", false);
            if (DaysessionCT2 == "1") {

                $("#radioinline11").prop("checked", true);
                $("#radioinline21").prop("checked", false);
            }
            else if (DaysessionCT2 == "2") {

                $("#radioinline11").prop("checked", false);
                $("#radioinline21").prop("checked", true);
            }

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

        var dateStr = FromdateCT2;
        var dateStr1 = TodateCT2;
        var Fromdate;
        var Todate;
        /*   var begindate12 = Convert.ToDateTime(FromdateCT2);*/
        if (dateStr.indexOf("/") !== -1) {
            Fromdate = moment(dateStr, "DD/MM/YYYY").format("YYYY-MM-DD");
            Todate = moment(dateStr1, "DD/MM/YYYY").format("YYYY-MM-DD");
            // Date format is "dd/mm/yyyy"
        } else if (dateStr.indexOf("-") !== -1) {
            Fromdate = dateStr;
            Todate = dateStr1;
        }
        //formattedDate = dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
        //alert(formattedDate)

        $("#fromdate").val(Fromdate);
        $("#todate").val(Todate);
        $("#BatchidTextbox").val(Batchid12);

        //$("#myForm").find('div').find("myForm ,#fromdate").val(FromdateCT2);
        //$("#myForm").find('div').find("myForm ,#todate").val(TodateCT2);
        $("#Dates_Div").show();
        $("#myForm_ClearBtn").prop("disabled", true);
        $("#savebutton").val("Update to Cart");
        $("#LblTextareacount").hide();
        $("#loadingOverlay").hide();
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
})

//this for click on saved leaves  then get values for Edit in table

$('#myFormCartREFRESHTable').on('click', 'td a', function () {
    //$('#myFormCartREFRESHTable').on('click', 'div', function () {
    try {
        //  document.getElementById("tab2").style.display = "none";
        printDetails_Form_IN_ApplyLeave_FOR_Hide();
        var ID = $(this).closest('tr').find('#BatchidCT').val();
        /*   alert(ID)*/
        //   window.location.href = "/format/Sale_Format?ID=" + ID;

        var Userid = $("#Userid").val();
        $("#loadingOverlay").show();
        $.ajax({
            url: "/Attendance/STP_GetSubmittedLeaveRequestsByUserid_ToEDIT?Batchid=" + ID + "&Userid=" + Userid,
            type: "GET",
            success: function (response) {
                debugger;
                $("#myFormCart tbody").empty();
                $('#your-p-id').find('span').empty();
                document.getElementById('myForm').reset();


                //$("#listofformat").text(" ");
                // GetMysavedLeaves_CallingFunction();
             
                // GetLeaveTypeDropdown_CallingMethod();

                // GetShort_Description_for_Leave_Reason_CallingMethod();
                /* $("#myFormCart tbody").remove();*/
               
                lengt = response.length;
                debugger;
                for (var i = 0; i < response.length; i++) {

                    var Daysession12 = "";
                    if (response[i].daysession == "Morning") {
                        Daysession12 = "1";
                    }
                    else if (response[i].daysession == "Afternoon") {
                        Daysession12 = "2";
                    }
                    var Batchid1 = "<input name='InputValue[" + i + "].Batchid' type='text' id='BatchidCT' value='" + response[i].batchid + "' hidden/>";
                    var LeaveApplicationId1 = "<input name='InputValue[" + i + "].LeaveApplicationId' type='text' id='LeaveApplicationIdCT' value='" + response[i].leaveApplicationId + "' hidden/>";


                    var Leavetypeid1 = "<input name='InputValue[" + i + "].Leavetypeid' type='text' id='LeavetypeidCT' value='" + response[i].leavetypeid + "' hidden/>";
                    var Descriptionid1 = response[i].leaveReason;


                    var Descriptionidtext1 = "<input name='InputValue[" + i + "].ShortDescriptionforLeave_Reason' type='text' id='DescriptionidtextCT'  value='" + response[i].leaveReason + "' hidden/>";


                    //var fromDate = new Date(response[i].leaveFromdate);
                    //var toDate = new Date(response[i].leaveTodate);

                    //var Fromdate1 = "<input name='Fromdate' type='text' id='FromdateCT' value='" + fromDate + "'  hidden/>";
                    //var Todate1 = "<input name='Todate' type='text' id='TodateCT' value='" + toDate + "' hidden/>";

                    var Fromdate1 = "<input name='InputValue[" + i + "].Fromdate' type='text' id='FromdateCT' value='" + response[i].leaveFromdate + "'  hidden/>";
                    var Todate1 = "<input name='InputValue[" + i + "].Todate' type='text' id='TodateCT' value='" + response[i].leaveTodate + "' hidden/>";
                    var Daystype1 = "<input name='InputValue[" + i + "].Daystype' type='text' id='DaystypeCT' value='" + response[i].daystype + "'    hidden/>";
                    var Daysession1 = "<input name='InputValue[" + i + "].Daysession' type='text' id='DaysessionCT' value='" + Daysession12 + "' hidden/>";
                    var Leavecomments1 = "<input name='InputValue[" + i + "].Leavecomments' type='text' id='LeavecommentsCT' value='" + response[i].leavecomments + "' hidden/>";



                    var tablelength = $("#myFormCart tbody tr").length;

                    var attachdocumentfile1 = "<input  type='file'  asp-for='file' class='attachdocumentCT' name='InputValue[" + i + "].file' id='attachdocumentCT" + tablelength + "'   hidden/>";
                    debugger;
                    var attachdocument1 = "<input  type='text'  asp-for='attachdocument' name='InputValue[" + i + "].attachdocument' id='attachdocumentCT_String'   value='" + response[i].attachdocument + "' hidden/>";
                    var marriagechecking = 0;

                    if (response[i].marriagechecking_String == "True") {
                        marriagechecking = 1;
                    } else {
                        marriagechecking = 0;
                    }

                    var AppliedForMarriageCT = "<input name='InputValue[" + i + "].marriagechecking_Int' type='text' id='marriagecheckingCT' value='" + marriagechecking + "' hidden/>";

                    var editbt = " <div style='text-align:center;'><a class='fa fa-edit' title='Edit' style='font-size: 15px; color: red;cursor: pointer;'></a><input type='text' hidden class='ID_APPEND_For_Edit' readonly   /></div>";

                    //var editbt = " <div class='fa fa-edit' style='font-size: 20px; color: red'><input type='text' hidden class='ID_APPEND_For_Edit' readonly   /></div>";
                    var deleteBTN = " <p class='fa fa-trash-o' title='Click to delete this record' style='font-size: 15px; color: red;cursor: pointer;'><input type='text' hidden readonly id='id_For_Delete' value='" + response[i].leaveApplicationId + "' /></p>";


                    var newRow = "<tr>" +
                        "<td>" + editbt + "" + AppliedForMarriageCT + "" + attachdocumentfile1 + "" + Batchid1 + "" + LeaveApplicationId1 + "" + attachdocument1 + "</td>" +
                        "<td>" + response[i].leavetype + "" + Leavetypeid1 + "</td>" +
                        "<td> " + Descriptionid1 + "" + Descriptionidtext1 + "</td>" +
                        //"<td>" + Descriptionidtext + " " + Descriptionid1 + "" + Descriptionidtext1 + "</td>" +
                        "<td>" + Fromdate1 + " " + response[i].leaveFromdate + "</td>" +
                        "<td>" + Todate1 + " " + response[i].leaveTodate + "</td>" +
                        "<td>" + Daystype1 + "" + response[i].daystype + " </td>" +
                        "<td>" + Daysession1 + "" + response[i].daysession + " </td>" +
                        "<td>" + Leavecomments1 + " " + response[i].leavecomments + "</td>" +
                        "<td>" + response[i].leaveNoOfDays + "</td>" +
                        "<td style='text-align:center;'>" + deleteBTN + "</td>" +
                        "</tr>";
                    $("#myFormCart tbody").append(newRow);             
                }
                $("#myFormCart").show();
                Pagination(response.length, "myFormCart");
                var rows = $('#myFormCart  tbody tr .ID_APPEND_For_Edit');
                rows.each(function (index) {
                    $(this).attr('id', 'row' + (index + 1));
                    $(this).attr('value', 'row' + (index + 1));
                });


                debugger;
                if (response[0].marriagechecking_String == "True") {
                    debugger;
                    $("#marriagechecking").prop("checked", true);
                    $("#marriagechecking").prop("disabled", true);
                    $("#marriagechecking_Span").show();
                    $("#Descriptionid1").val("5");
                    //    $("#Descriptionid1").val("Marriage");
                    $("#Descriptionid1").prop("disabled", true);
                    $("#labelLB").text("(Note: All Casual Leaves with combination of Earned Leaves can avail)");
                    GetLeaveTypeDropdown_CallingMethod('marrigechecktrue');


                    //var leavetypedropdown = $('#leavetype'); // Replace 'myDropdown' with the ID of your dropdown

                    //// Clear the dropdown
                    //leavetypedropdown.empty();

                    //// Add back the desired options
                    //leavetypedropdown.append('<option value="">-------select-------</option>')
                    //leavetypedropdown.append('<option value="120">Casual Leave</option>');
                    //leavetypedropdown.append('<option value="121">Earned Leave</option>');
                    //leavetypedropdown.append('<option value="182">Casuall leave</option>');
                    $("#GetLeaveDaysAvailableid").text('');
                }
                else {
                    GetLeaveTypeDropdown_CallingMethod();
                    $("#marriagechecking").prop("checked", false);
                    $("#marriagechecking").prop("disabled", false);
                    /* $("#myForm").find('div').find("myForm ,#Descriptionid1").val(DescriptionidCT2);*/
                    $("#labelLB").text('');
                    $(this).removeClass('labelLB');
                    $("#Descriptionid1").prop("disabled", false);
                }
                $("#Descriptionid1 option:contains('" + Descriptionid1 + "')").prop("selected", true);

                $("#Descriptionid1").prop("disabled",true);


                debugger;
                $("#AttendancePercentage").text('');
                $("#GetLeaveDaysAvailableid").text('');

                // $("#marriagechecking_Span").show();

                $("#EditBTid").val('');


                $("#MedicalLeaveDocument").hide();
                $("#todateLB").show();
                $("#todate").show();
                $("#todate").val('');
                $("#fromdateLB").show();
                $("#HAlfdayLB").hide();
                $("#ErrorrmessageSPAN").show();
                $("#DaySession").hide();

                $("#radioinline11").prop("checked", false);
                $("#radioinline21").prop("checked", false);

                $("#myFormCart #Save_as_Draft_BTN").prop("disabled", true);
                $("#savebutton").prop("disabled", false);


                $("#Dates_Div").hide();
                $("#savebutton").val("Add Leaves To Cart");

                $("#HdnLeavetypeidForGetcurrectLeavedays").val('');
                $("#HdnGetLeaveDaysAvailabletoLeavetype").val('');

                $("#loadingOverlay").hide();
            },
            error(xhr, status, error) {
                $("#loadingOverlay").hide();
                $("#followingfieldsErrorSPAN").text("Something Error");
            }
        })
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
})
//This is for delete
$('#myFormCart').on('click', 'td p', function () {
    try {
        var row12 = confirm("Are you sure you want  to delete the leave Details ?");
        var LeaveApplicationId = $(this).find('#id_For_Delete').val();
        var Userid = $("#Userid").val();
        var row = $(this).closest("tr");
        /* alert(LeaveApplicationId)*/
        $("#loadingOverlay").show();
        if (row12 == true) {
            if (LeaveApplicationId != 0) {
                var bt = "Delete";
                /* alert(bt)*/
                $.ajax({
                    url: "/Attendance/Delete_Cancel_Staff_Saved_Leaves?submitButton=" + bt + "&LeaveApplicationId1=" + LeaveApplicationId + "&Userid=" + Userid,
                    type: "POST",
                    success: function (response) {
                        debugger;
                        GetMysavedLeaves_CallingFunction();
                        if (response.message == "Staff Leave Deleted Successfully") {
                            $('#your-p-id').find('span').empty();
                            debugger;
                            //$('#myForm').find('input').val('');
                            /*$("#myFormCart tbody").empty;*/
                            // $('#myFormCart').find('tbody').empty();

                            row.remove();
                            //$('#myFormCart').hide();
                            $('#successMessage').text(response.message);
                            //  document.getElementById('myForm').reset();
                            //  $("#savebutton").prop("disabled", true)
                            //  $("#MedicalLeaveDocument").hide();
                            //  $("#GetLeaveDaysAvailableid").text('');


                            var rowcount1 = $("#myFormCart tbody tr").length;
                            if (rowcount1 <= 0) {

                                $("#myFormCart").hide();


                                $("#HAlfdayLB").hide();
                                $("#DaySession").hide();
                                $("#MedicalLeaveDocument").hide();
                                $("#todateLB").show();
                                $("#todate").show();
                                $("#todate").val('');
                                $("#fromdateLB").show();
                                $("#HAlfdayLB").hide();
                                $("#ErrorrmessageSPAN").show();
                                $("#DaySession").hide();
                                $("#marriagechecking").prop("disabled", false);
                                $("#Dates_Div").hide();
                            }
                            else {

                                $("#myFormCart").show();
                            }

                            debugger;
                            window.scrollTo(0, 0);
                        }
                        else {
                            $('#successMessage').text(response.message);
                            window.scrollTo(0, 0);
                        }
                    },
                    error(xhr, status, error) {
                        $("#followingfieldsErrorSPAN").text("Something Error");
                    }
                })
            }
            else {
                row.remove();
                debugger;
                var rowcount1 = $("#myFormCart tbody tr").length;
                if (rowcount1 <= 0) {

                    $("#myFormCart").hide();

                    debugger;
                    $("#HAlfdayLB").hide();
                    $("#DaySession").hide();
                    $("#MedicalLeaveDocument").hide();
                    $("#todateLB").show();
                    $("#todate").show();
                    $("#todate").val('');
                    $("#fromdateLB").show();
                    $("#HAlfdayLB").hide();
                    $("#ErrorrmessageSPAN").show();
                    $("#DaySession").hide();
                    $("#marriagechecking").prop("disabled", false);
                    $("#Dates_Div").hide();
                }
                else {
                    $("#myFormCart").show();
                }
            }
            debugger;
            var rowcount1 = $("#myFormCart tbody tr").length;
            if (rowcount1 <= 0) {
                $("#myFormCart").hide();
                debugger;
                $("#labelLB").text('');
                $(this).removeClass('labelLB');
                $("#Descriptionid1").prop("disabled", false);
                $('#your-p-id').find('span').empty();

                $("#AttendancePercentage").text('');
                $("#myFormCart tbody").empty();
                $("#myFormCart").hide();

                $("#AdmissionNum").text('');
                $("#GetLeaveDaysAvailableid").text('');
                $("#savebutton").prop("disabled", false);
                document.getElementById('myForm').reset(); // Reset the form
                $("#savebutton").val("Add Leaves To Cart");


                $("#HAlfdayLB").hide();
                $("#DaySession").hide();
                $("#MedicalLeaveDocument").hide();
                $("#todateLB").show();
                $("#todate").show();
                $("#todate").val('');
                $("#fromdateLB").show();
                $("#HAlfdayLB").hide();
                $("#ErrorrmessageSPAN").show();
                $("#DaySession").hide();
                $("#Dates_Div").hide();
            }
            //var tbodyIsEmpty = $('#myTbody tr').is(':empty');
        }
        $("#loadingOverlay").hide();
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
})

//This is for down load image 
$('.image-link').click(function () {
    var imageName = $("#attachdocument_String").val();
    /*var imageName = $(this).text();*/
    debugger;
    //download($('#barcode').attr('src'), "strcode.png", imageName);
    var Userid = $("#Userid").val();
    var Instanceid = $("#Instanceid").val();

    //var imageName = $(this).text(); // Get the text of the clicked element
    var imageUrl = '/LeavesDoc/' + Instanceid + '/' + Userid + '/' + imageName; // Replace 'path/to/images/' with the actual path to your images

    // Create a temporary anchor element
    var link = document.createElement('a');
    link.href = imageUrl;

    link.download = imageName;

    // Check if the file exists
    var http = new XMLHttpRequest();
    http.open('HEAD', imageUrl, false);
    http.send();

    if (http.status === 200) {


        // Trigger the download
        link.click();
    } else {
        // File not found, display the message
        $('#your-p-id').find('span').empty();
        $("#followingfieldsErrorSPAN").text("File not found. Please contact the site administrator.");
        window.scrollTo(0, 0);

    }


    //File not found.Please contact site administrator.


    //download($('#barcode').attr('src'), "strcode.png", "/imagefiles/banner_img.jpg");
});

//This is for delete file
$('#myForm').on('click', '#AttachDocumentTB_FileName_LABEL_DELETE', function () {
    var row12 = confirm("Are you sure you want  to delete the leave Details ?");
    debugger;
    if (row12 == true) {
        var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");
        deletebtn.innerHTML = "";
        var anchorElement = document.getElementById("AttachDocumentTB_FileName_LABEL");
        anchorElement.innerHTML = "";
        $("#myForm").find('div').find("myForm ,#attachdocument_String").val('');
    }
});


//this is for View student leaves 
function ViewLapsedDetails(Lapsed, InstanceId, UserID, AcademicYearID) {
    try {
        //OpenIFrameModel("../Admin/ViewUserCompOffLeavesLapsedDetails.aspx?InstanceId=" + InstanceId + "&UserID=" + UserID + "&AcademicYearID=" + AcademicYearID + "&Lapsed=" + Lapsed, 700, 250)
        //return false;
        debugger;
        $.ajax({
            url: "/Attendance/_ViewUserCompOffLeavesLapsedDetails?InstanceId=" + InstanceId + "&UserID=" + UserID + "&AcademicYearID=" + AcademicYearID + "&Lapsed=" + Lapsed,
            type: "GET",
            success: function (response) {
                var screenWidth = screen.availWidth;

                var windowWidth = 700; // Adjust the width of the window as needed
                var windowLeft = screenWidth - windowWidth;

                var newWindow = window.open("", "_blank", "width=" + windowWidth + ",left=" + windowLeft);
                // Write the HTML content to the new window
                //  newWindow.document.open();
                //

                newWindow.document.write(response);
                // newWindow.document.close();
            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    }
    catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }

}

//printing 
function CallPrint(tableid) {

    var printContent = document.getElementById(tableid);
    var windowUrl = 'about:blank';
    var uniqueName = new Date();

    var printWindow = window.open(windowUrl, uniqueName);
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(printContent.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}


//This is for calling function to my LeaveDetails_CallingMethod leaves
function GetMyLeaveDetails_CallingMethod() {
    try {

        var Userid = $("#Userid").val();
    debugger;
        $.ajax({
            url: "/Attendance/GetMyLeaveDetails_CallingMethod?Userid=" + Userid,
            type: "GET",

        success: function (response) {
            debugger;
            $("#MyLeaveDetails_Table tbody").empty();
            var Length = response.length;
            if (Length < 1) {
                $("#LossOfPayMessageId").hide();
                $("#MyLeaveDetails_Table").hide();
            } else {
                
                $.each(response, function (i, LeaveType1) {
                    $("#MyLeaveDetails_Table tbody").append("<tr>" +
                        "<td>" + LeaveType1.leavetype1 + "</td>" +

                        "<td>" + LeaveType1.totalLeaves + "</td>" +
                        "<td>" + LeaveType1.daysUsed + " </td>" +
                        "<td>" + LeaveType1.approvedNotUsedLeaves + " </td>" +
                        "<td>" + LeaveType1.leavesAwaitingApprovalLeaves + " </td>" +
                        "<td>" + LeaveType1.availableLeaves + " </td>" +
                        "</tr>"
                    );
                });
                $("#LossOfPayMessageId").show();
                $("#MyLeaveDetails_Table_Div").show();
                Pagination(Length, 'MyLeaveDetails_Table');
        }

            //$('#MyLeaveDetails_Table_pagination').empty();
            //var table = $('#MyLeaveDetails_Table');
            //var tbody = table.find('tbody');

            //var rowsPerPage = 10; // Number of rows to display per page
            //var numPages = Math.ceil(response.length / rowsPerPage);
            //var currentPage = 1; // Default current page

            //var pagination = $('#MyLeaveDetails_Table_pagination');
            //pagination.empty();

            //// Create pagination links
            //var previousLink = $('<a class="MyLeaveDetails_Table_pagination_Class" style="margin: 0 2px;" href="#">Previous</a>');
            //pagination.append(previousLink);

            //var startIndex = 1; // Start index for pagination links
            //var endIndex = Math.min(numPages, 10); // End index for pagination links

            //for (var i = startIndex; i <= endIndex; i++) {
            //    var link = $('<a class="MyLeaveDetails_Table_pagination_Class" style="margin: 0 2px;" href="#">' + i + '</a>');
            //    pagination.append(link);
            //}


            //var nextLink = $('<a class="MyLeaveDetails_Table_pagination_Class" style="margin: 0 2px;" href="#">Next</a>');
            //pagination.append(nextLink);

            //// Show the first page by default
            //showPage(currentPage);

            //// Adjust pagination alignment
            //pagination.css('text-align', 'center');

            //// Handle pagination link click event
            //pagination.on('click', '.MyLeaveDetails_Table_pagination_Class', function (e) {

            //    e.preventDefault();

            //    var linkText = $(this).text();
            //    if (linkText === "Previous") {
            //        currentPage = Math.max(currentPage - 1, 1);
            //    } else if (linkText === "Next") {
            //        currentPage = Math.min(currentPage + 1, numPages);
            //    } else {
            //        currentPage = parseInt(linkText);
            //    }
            //    showPage(currentPage);
            //});

            //// Function to display the specified page
            //function showPage(page) {
            //    var start = (page - 1) * rowsPerPage;
            //    var end = start + rowsPerPage;

            //    tbody.find('tr').hide(); // Hide all rows
            //    tbody.find('tr').slice(start, end).show(); // Show rows for the specified page

            //    // Update pagination links
            //    var newStartIndex = Math.max(1, page - 4);
            //    var newEndIndex = Math.min(newStartIndex + 9, numPages);

            //    if (newEndIndex === numPages) {
            //        newStartIndex = Math.max(1, numPages - 9);
            //    }

            //    pagination.empty();
            //    pagination.append(previousLink);

            //    for (var i = newStartIndex; i <= newEndIndex; i++) {
            //        var link = $('<a class="MyLeaveDetails_Table_pagination_Class" style="margin: 0 2px;" href="#">' + i + '</a>');
            //        pagination.append(link);
            //    }

            //    pagination.append(nextLink);

            //    // Update active class on current page link
            //    $('.MyLeaveDetails_Table_pagination_Class').removeClass('active');
            //    $('.MyLeaveDetails_Table_pagination_Class').eq(page - newStartIndex + 1).addClass('active').css('cursor', 'unset');;
            //    debugger;
            //    if (response.length < 11) {
            //        $("#MyLeaveDetails_Table tfoot").hide();
            //    }
            //    else {
            //        $("#MyLeaveDetails_Table tfoot").show();
            //    }

            //}


            /*$("#myFormCartREFRESHTable tbody").append(response);*/
        },
             error: function (xhr, status, erro) {
                 $("#followingfieldsErrorSPAN").text("Something Error");
        }
    });
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
}

//This is for calling function to my saved leaves
function GetMysavedLeaves_CallingFunction() {
    try {
        var Userid = $("#Userid").val();

        $.ajax({
            url: "/Attendance/GetMysavedLeaves_CallingFunction?Userid=" + Userid,
            type: "GET",
            success: function (response) {
            var batchid = 0;
            var leaveReason1 = "";
            $("#myFormCartREFRESHTable tbody").empty();



            debugger;
            if (response.length <= 0) {
                $("#accordionoc_myFormCart").hide();
            }
            else {
                $.each(response, function (i, value122) {
                    batchid = value122.batchid


                    leaveReason1 = " <div><a id='LeaveReason_Td' style='cursor:pointer;'>" + value122.leaveReason + "</a><input name='Batchid' type='text' id='BatchidCT' value='" + batchid + "' hidden/></div>";
                    /*  var tablevalues = "";*/
                    // $('#myFormCartREFRESH tbody').append(

                    $("#myFormCartREFRESHTable tbody").append("<tr>" +
                        "<td >" + leaveReason1 + "</td>" +
                        /*   "<td>" + value122.leaveReason + "" + batchid1+"</td>" +*/
                        "<td>" + value122.leaveFromdate + "</td>" +
                        "<td>" + value122.leaveTodate + " </td>" +
                        "<td>" + value122.leaveNoOfDays + " </td>" +
                        "<td>" + value122.leaveStatus + " </td>" +
                        "</tr>"
                    );


                });
                Pagination(response.length, "myFormCartREFRESHTable");

                    $("#accordionoc_myFormCart").show();
                }
            }
        
        ,
        error: function (xhr, status, erro) {
            $("#followingfieldsErrorSPAN").text("Something Error");
        }
    });
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
}


//This is for calling function to my Applied leaves
function GetMyAppliedLeaves_CallingMethod() {
    try {
        var Userid = $("#Userid").val();
        $("#loadingOverlay").show();
        $.ajax({
            url: "/Attendance/GetMyAppliedLeaves_CallingMethod?Userid=" + Userid,
            type: "GET",
            success: function (response) {
                debugger;
                $("#GetMyAppliedLeaves_Table tbody").empty();
                                if (response.length <= 0) {
                    $("#NoRecordsMsg").text('No Record Found');
                    $("#GetMyAppliedLeaves_Table").hide();
                }
                else {
                   
                var ViewBTN;
                var CancelBTN;
                var PrintBTN;
                $.each(response, function (i, value12) {

                    if (value12.leaveStatus == "Self-Approved" || value12.leaveStatus == "Submitted" || value12.leaveStatus == "Approved" || value12.leaveStatus == "") {
                        //ViewBTN = "<div ><span class='badge badge-info' title='View Transaction History of Leave Status'>View</span>  <input type='text' id='Batchid' value='" + value12.batchid+"' hidden/> </div >";
                        ViewBTN = "<div style='text-align:center;font-size:13px;'><span id='ViewBtn' style='cursor:pointer;' class='badge badge-info' title='View Transaction History of Leave Status'>View</span>  <input type='text' id='Batchid' value='" + value12.batchid + "' hidden/> </div >";

                        if (value12.leaveCancelledFlag) {
                            CancelBTN = "Cancelled";
                        } else {
                            CancelBTN = "<div style='text-align:center;font-size:13px;'><span id='CancelBtn' style='cursor:pointer;' class='badge badge-primary' title='You can cancel an applied leave which is having startdate as future date to current date'>Cancel</span>   </div >";
                        }
                        /*C: \Users\rakeshp\source\repos\Connect4m_Web\Connect4m_Web\wwwroot\Themes\assets\images\tree\print.png*/

                        // PrintBTN = "<div ><span><input type='image' title='You can Print an applied leave ' src='/tree/print.png' style='border - width: 0px;'></span> </div >";
                        PrintBTN = "<div style='text-align:center;'><span id=PrintBtn'  title='You can Print an applied leave ' class='fa fa-print' style='font-size: 20px;cursor:pointer; color: red'></span> </div >";
                    }
                    else {
                        ViewBTN = "";
                        CancelBTN = "";
                        PrintBTN = "";
                    }

                    $("#GetMyAppliedLeaves_Table tbody").append("<tr>" +
                        "<td >" + ViewBTN + " </td>" +
                        "<td>" + value12.leaveReason + "</td>" +
                        "<td >" + value12.leavetype1 + " </td>" +
                        "<td>" + value12.leaveFromdate + " </td>" +
                        "<td>" + value12.leaveTodate + " </td>" +
                        "<td >" + value12.leaveNoOfDays1 + " </td>" +

                        "<td>" + value12.leaveStatus + " </td>" +
                        "<td>" + value12.leaveAppliedDate + " </td>" +
                        "<td style='text-align:center;'> " + CancelBTN + "</td>" +
                        "<td >" + PrintBTN + " </td>" +
                        "</tr>"
                    );
                });
                    debugger;
                    Pagination(response.length, "GetMyAppliedLeaves_Table");
                //$("#GetMyAppliedLeaves_Table ").show();
                //$("#accordionoc_VIEW").show();

                    $("#GetMyAppliedLeaves_Table_VIEW tbody").empty();
                    $("#GetMyAppliedLeaves_Table").show();
                }
                $("#loadingOverlay").hide();
            }
            ,
            error: function (xhr, status, erro) {
                $("#loadingOverlay").hide();
                $("#followingfieldsErrorSPAN").text("Something Error");
            }
        });
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
}

//This is for calling function to my applied print details in Table 
function MyAppliedLeaves_PrintTable(Batchid, printid_ForView) {
    debugger;
    try {
        var Userid = $("#Userid").val();
    $.ajax({
        url: "/Attendance/GetMyAppliedLeaves_PrintDetails_CAllingFunction?Batchid=" + Batchid + "&Userid=" + Userid,
        type: "GET",
        success: function (response) {

            window.scrollTo(0, document.body.scrollHeight);

            $("#GetMyAppliedLeaves_Table_VIEW  tbody").empty();

            $("#GetMyAppliedLeaves_Table_VIEW ").hide();
            if (printid_ForView != 1) {
                $('#your-p-id1').find('span').empty();
            }



            //var printbtn = "<a id='A1' href='#' onclick='javascript: CallPrint('PrintBTN_TABLEID')'>PRINT</a>";
            //$("#PrintBTN").text(printbtn)
            var PrintBTN = document.getElementById("PrintBTN");
            PrintBTN.innerHTML = "";
            PrintBTN.innerHTML = "PRINT";
            debugger;
            var Totaldays = 0.0;
            var sno = 1;
            $("#GetMyAppliedLeaves_Table_Print tbody").empty();

            $("#ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory").text("PRINT LEAVE DETAILS ")


            $.each(response, function (i, value122) {


                Totaldays += parseFloat(value122.leaveNoOfDays1);

                $("#SchoolnameTable_instancename").text(value122.instanceName)

                $("#SchoolnameTable_ADDRESS").text(value122.address)

                $("#GetMyAppliedLeaves_Table_Print tbody").append("<tr style='border: 1px solid;'>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + sno + "</td > " +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.submittedby + "</td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.department + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.dateofJoin + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.submittedto + " </td>" +

                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leavetype + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveFromdate + " </td>" +

                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveTodate + " </td>" +


                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveNoOfDays1 + " </td>" +


                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.availableLeaves + " </td>" +

                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveStatus + " </td>" +
                    "</tr>"
                );
                sno++;

                if (response.length > 1 || response[0].availableLeaves < 0) {

                    $("#GetMyAppliedLeaves_Table_Print  tr td:nth-child(10)").hide();
                    $("#GetMyAppliedLeaves_Table_Print  tr th:nth-child(10)").hide();
                }
                else {
                    $("#GetMyAppliedLeaves_Table_Print  tr tr:nth-child(10)").show();
                    $("#GetMyAppliedLeaves_Table_Print  tr th:nth-child(10)").show();
                }
                $("#TotalNoofDays_TABLE tbody").empty();
                $("#TotalNoofDays_TABLE tbody").append("<tr>" +
                    "<td class='bonafidetxt' nowrap='' style='border: 1px solid;' align='center'>" + Totaldays + "</td>" +
                    +"</tr>");
            });
            $("#GetMyAppliedLeaves_Table_Print ").show();
            $("#accordionoc_VIEW").show();
            $("#printDetails_Form").show();

        }
        ,
        error: function (xhr, status, erro) {
            $("#followingfieldsErrorSPAN").text("Something Error");
        }
    });
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
}

//This is for calling function to my appliead print details in Apply Leaves 
function MyAppliedLeaves_PrintTable_IN_ApplyLeaves(Batchid, printid_ForView) {
    try {
        var Userid = $("#Userid").val();

    $.ajax({
        url: "/Attendance/GetMyAppliedLeaves_PrintDetails_CAllingFunction?Batchid=" + Batchid + "&Userid=" + Userid,
        type: "GET",
        success: function (response) {

            window.scrollTo(0, document.body.scrollHeight);

            var PrintBTN = document.getElementById("PrintBTN_IN_ApplyLeave");
            PrintBTN.innerHTML = "";
            PrintBTN.innerHTML = "PRINT";

            var Totaldays = 0.0;
            var sno = 1;
            $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave tbody").empty();

            $("#ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory_IN_ApplyLeave").text("PRINT LEAVE DETAILS ")


            $.each(response, function (i, value122) {


                Totaldays += parseFloat(value122.leaveNoOfDays1);

                $("#SchoolnameTable_instancename_IN_ApplyLeave").text(value122.instanceName)

                $("#SchoolnameTable_ADDRESS_IN_ApplyLeave").text(value122.address)

                $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave tbody").append("<tr style='border: 1px solid;'>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + sno + "</td > " +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.submittedby + "</td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.department + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.dateofJoin + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.submittedto + " </td>" +

                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leavetype + " </td>" +
                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveFromdate + " </td>" +

                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveTodate + " </td>" +


                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveNoOfDays1 + " </td>" +


                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.availableLeaves + " </td>" +

                    "<td style='border: 1px solid;' class='bonafidetxt' nowrap='' align='center'>" + value122.leaveStatus + " </td>" +
                    "</tr>"
                );
                sno++;

                if (response.length > 1 || response[0].availableLeaves < 0) {

                    $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave  tr td:nth-child(10)").hide();
                    $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave  tr th:nth-child(10)").hide();
                }
                else {
                    $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave  tr tr:nth-child(10)").show();
                    $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave  tr th:nth-child(10)").show();
                }
                $("#TotalNoofDays_TABLE_IN_ApplyLeave tbody").empty();
                $("#TotalNoofDays_TABLE_IN_ApplyLeave tbody").append("<tr>" +
                    "<td class='bonafidetxt' nowrap='' style='border: 1px solid;' align='center'>" + Totaldays + "</td>" +
                    +"</tr>");
            });
            $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave ").show();
            $("#accordionoc_Print").show();
            $("#printDetails_Form_IN_ApplyLeave").show();

        }
        ,
        error: function (xhr, status, erro) {
            $("#followingfieldsErrorSPAN").text("Something Error");
        }
    });
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
}


//this is for View  and Cancel and Print details
$('#GetMyAppliedLeaves_Table').on('click', 'td span', function () {
    try {
        var TR = $(this).closest('tr');
        var Batchid = $(this).closest('tr').find('#Batchid').val();
        /*alert(Batchid)*/
        var Userid = $("#Userid").val();
        var BTNtext = $(this).text();

        debugger;
        if (BTNtext == "View") {
            window.scrollTo(0, document.body.scrollHeight);
            $('#your-p-id1').find('span').empty();
            $.ajax({
                url: "/Attendance/GetMyAppliedLeaves_ViewDetails_CAllingFUC?Batchid=" + Batchid,
                type: "GET",
                success: function (response) {
                    debugger;
                    $("#GetMyAppliedLeaves_Table_VIEW tbody").empty();
                    var PrintBTN = document.getElementById("PrintBTN");
                    PrintBTN.innerHTML = "";
                    if (response.length < 1) {                  
                        
                        $("#ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory").text("TOTAL NUMBER OF RECORDS :  0  ")
                        $("#GetMyAppliedLeaves_Table_VIEW").hide();
                    }
                    else {
                        var createdDate;
                        $.each(response, function (i, value122) {

                            debugger;
                            $("#ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory").text("'" + TR.find('td:nth-child(2)').text() + "' LEAVE STATUS ")

                            createdDate = value122.createdDate;
                            createdDate = createdDate.split("T")[0];
                            createdDate = createdDate.split("-").reverse().join("-");
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
                    }


                    $("#accordionoc_VIEW").show();
                    $("#GetMyAppliedLeaves_Table_Print tbody").empty();
                    $("#GetMyAppliedLeaves_Table_Print").hide();
                    $("#printDetails_Form").hide();
                    //debugger;
                    //var len = $("#GetMyAppliedLeaves_Table_VIEW tbody tr").length;
                    //if (len <= 0) {

                    //    $("#ctl00_ContentPlaceHolder1_lblMyLeavesStatusHistory").text("TOTAL NUMBER OF RECORDS : " + len + " ")

                    //    $("#GetMyAppliedLeaves_Table_VIEW").hide();
                    //}

                }
                ,
                error(xhr, status, error) {
                    $("#followingfieldsErrorSPAN").text("Something Error");
                }
            })
        }


        else if (BTNtext == "Cancel") {

            $('#your-p-id1').find('span').empty();
            var returnconform = confirm("Are you sure you want to Cancel the Leave.");
            if (returnconform == true) {
                debugger;
                $.ajax({

                    url: "/Attendance/Delete_Cancel_Staff_Saved_Leaves?Batchid=" + Batchid + "&submitButton=" + BTNtext + "&Userid=" + Userid,
                    type: "GET",
                    success: function (response) {
                        debugger;

                        $('#successMessage1').text(response.message);
                        window.scrollTo(0, 0);
                        if (response.message == "Request Cancelled Successfully") {
                            debugger;
                            GetMyAppliedLeaves_CallingMethod();
                            var printid_ForView = 1;
                            MyAppliedLeaves_PrintTable(Batchid, printid_ForView);

                        }
                        else {

                            var PrintBTN = document.getElementById("PrintBTN");
                            PrintBTN.innerHTML = "";
                            // $("#accordionoc_VIEW").hide();
                            // $("#GetMyAppliedLeaves_Table_VIEW tbody").empty();
                            $("#GetMyAppliedLeaves_Table_Print tbody").empty();

                        }
                    }
                    ,
                    error(xhr, status, error) {
                        $("#followingfieldsErrorSPAN").text("Something Error");
                    }
                });
            }
        }
        else {
            //print details
            debugger;
            //GetMyAppliedLeaves_CallingMethod();
            MyAppliedLeaves_PrintTable(Batchid);

        }
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
});

//This is for Bind Dropdown when checked marriage check box

function marriagecheckingCallingFunction(Pagename) {
   // $("#marriagechecking").click(function () {
        try {
            if (Pagename != "LeaveCancellation") {
                printDetails_Form_IN_ApplyLeave_FOR_Hide();
            }
            //printDetails_Form_IN_ApplyLeave_FOR_Hide();
            var isChecked = $("#marriagechecking").prop("checked");
            debugger;
            if (isChecked) {
                var TB_Length = $("#myFormCart tbody tr").length;
                if (TB_Length > 0) {
                    $('#your-p-id').find('span').empty();
                    $("#followingfieldsErrorSPAN").text("You can't select Marriage Leave now, you have added some leaves to Leave Cart.");
                    // $("#marriagechecking").hide();
                    $("#marriagechecking_Span").hide();
                    $("#marriagechecking").prop("checked", false);
                    $("#labelLB").text('');
                   // $(this).removeClass('labelLB');
                }
                else {
                    $("#Descriptionid1").val("5");
                    //    $("#Descriptionid1").val("Marriage");
                    $("#Descriptionid1").prop("disabled", true);
                    $("#labelLB").text("(Note: All Casual Leaves with combination of Earned Leaves can avail)");

                    GetLeaveTypeDropdown_CallingMethod('marrigechecktrue');
                    //var leavetypedropdown = $('#leavetype'); // Replace 'myDropdown' with the ID of your dropdown

                    //// Clear the dropdown
                    //leavetypedropdown.empty();

                    //// Add back the desired options
                    //leavetypedropdown.append('<option value="">-------select-------</option>')
                    //leavetypedropdown.append('<option value="120">Casual Leave</option>');
                    //leavetypedropdown.append('<option value="121">Earned Leave</option>');
                    //leavetypedropdown.append('<option value="182">Casuall leave</option>');
                    $("#GetLeaveDaysAvailableid").text('');
                }
            }
            else {
                debugger;
                $("#Descriptionid1").val("");
                $("#Descriptionid1").prop("disabled", false);
                $("#labelLB").text('');
                $(this).removeClass('labelLB');
                $("#GetLeaveDaysAvailableid").text('');
                debugger;
                GetLeaveTypeDropdown_CallingMethod();
            }
        } catch (e) {
            $("#followingfieldsErrorSPAN").text("Something Error");
        }
   // });
};

//This for getting Leave Days Available
//$("#leavetype").change(GetLeaveDaysAvailable_CallingFuction);
function GetLeaveDaysAvailable_CallingFuction(Pagename) {
    try {
       // $(".ErrorMessageSpan").empty();
                $('#your-p-id').find('span').empty();
    //var StudentUserid = $("#studentid").val();
    /*alert(StudentUserid)*/
        var leavetype = $("#leavetype").val();
        if (leavetype == "" || leavetype == 0) {
            $("#GetLeaveDaysAvailableid").empty();
            return;
        }
        var Userid = $("#Userid").val();
    $.ajax({
        url: "/Attendance/GetLeaveDaysAvailable?leavetype=" + leavetype + "&Userid=" + Userid,
        dataType: 'json',
        type: "GET",
        success: fun215,
        error(xhr, status, error) {
            $("#followingfieldsErrorSPAN").text("Something Error");
        }
    });
        function fun215(response) {
            $("#GetLeaveDaysAvailableid").empty();
        debugger;
        if (leavetype == "122" && response < 1) {
            $("#GetLeaveDaysAvailableid").append('');
        }
        else {
            debugger;
            var LeavetypeidForGetcurrectLeavedays = $("#HdnLeavetypeidForGetcurrectLeavedays").val();
            var HdnGetLeaveDaysAvailabletoLeavetype = $("#HdnGetLeaveDaysAvailabletoLeavetype").val();
            if (LeavetypeidForGetcurrectLeavedays == leavetype) {
                $("#GetLeaveDaysAvailableid").append(HdnGetLeaveDaysAvailabletoLeavetype);
            }
            else {
                $("#GetLeaveDaysAvailableid").append(response);
            }
        }
            $("#GetLeaveDaysAvailableidtTotal").val('');
            $("#GetLeaveDaysAvailableidtTotal").val(response);

        ///new
        var selectvalue = $("#leavetype option:selected").text();

        $("#LeavetypeTB").val(selectvalue);

            if (Pagename != "LeaveCancellation") {
                marriagecheckbox = $("#marriagechecking").prop("checked");
                if (leavetype == "161") {//restriction leave -161
                    $("#Descriptionid1").empty();
                }
                else if (leavetype == "127") {//On duty -127
                    var Descriptionid_Value = 9;
                    GetShort_Description_for_Leave_Reason_CallingMethod(Descriptionid_Value);
                    /*var val = 9;*/
                    $("#Descriptionid1").val(9);
                    $("#Descriptionid1").prop("disabled", true);
                }
                else if (marriagecheckbox == true) {

                }
                else {
                    GetShort_Description_for_Leave_Reason_CallingMethod();
                    $("#Descriptionid1").prop("disabled", false);
                }
                ///new
                //var Value = $("#leavetype").val();
                if (leavetype == 126 || leavetype == 143) {
                    $("#MedicalLeaveDocument").show();
                } else {
                    $("#MedicalLeaveDocument").hide();
                }
                printDetails_Form_IN_ApplyLeave_FOR_Hide();
                $("#fromdate").val('');
                $("#todate").val('');
            }

        $("#HAlfdayLB").hide();
        $("#DaySession").hide();
        $("#Dates_Div").hide();

        $("#radioinline1").prop("checked", false);
        $("#radioinline2").prop("checked", false);
        $("#radioinline11").prop("checked", false);
        $("#radioinline21").prop("checked", false);  
    }
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
    }

}

function printDetails_Form_IN_ApplyLeave_FOR_Hide() {
    var PrintBTN = document.getElementById("PrintBTN_IN_ApplyLeave");
    PrintBTN.innerHTML = "";
    $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave tbody").empty();
    $("#GetMyAppliedLeaves_Table_Print_IN_ApplyLeave ").hide();
    $("#accordionoc_Print").hide();
    $("#printDetails_Form_IN_ApplyLeave").hide();
}

//this is for getting  medical leave upload document file

$("#Descriptionid1").change(changefun);
function changefun() {
    var selectvalue = $("#Descriptionid1 option:selected").text();

    $("#DescriptionidTB1").val(selectvalue);
    printDetails_Form_IN_ApplyLeave_FOR_Hide();
}

//THIS for counting characters of textarea
$(document).ready(function () {
    $("#Textarea").on("input", function () {
        debugger;
        var textareavalue = $("#Textarea").val();
        var maxlength = 500;
        var textareacount = maxlength - textareavalue.length;
        if (textareacount != 500) {
            $("#LblTextareacount").show();
        }
        $("#TextareacountSPAN").text(textareacount);
    });
});

//This is for Hide date fields based on click of radio buttons
//$(document).ready(function(){
    $("input[type='radio'].check").click(function () {
        try {
            debugger;
            //printDetails_Form_IN_ApplyLeave_FOR_Hide();
            if ($(this).is(':checked')) {
                if ($(this).val() == 1) {
                    $("#todateLB").hide();
                    $("#todate").hide();
                    $("#HAlfdayLB").show();
                    $("#fromdateLB").hide();
                    $("#ErrorrmessageSPAN").hide();
                    $("#DaySession").show();
                    //$("#fromdate").val('');


                    var Todate = $("#todate").val();

                    $("#todate").val(Todate);

                    $("#radioinline11").prop("checked", false);
                    $("#radioinline21").prop("checked", false);


                    $("#Dates_Div").show();
                }
                else if ($(this).val() == 0) {
                    $("#todateLB").show();
                    $("#todate").show();
                    //$("#todate").val('');
                    $("#fromdateLB").show();
                    $("#HAlfdayLB").hide();
                    $("#ErrorrmessageSPAN").show();
                    $("#DaySession").hide();

                    $("#radioinline11").prop("checked", false);
                    $("#radioinline21").prop("checked", false);

                    $("#Dates_Div").show();
                }
            }
        } catch (e) {
            $("#followingfieldsErrorSPAN").text("Something Error");
        }
    });
//});


//This is for Add Same date in TODAte Input of hidden
  $("#fromdate").change(fun1237);
    function fun1237() {
    var cid = $("#fromdate").val();
    $("#todate").val(cid);
    $("#message").hide();
    //var f = $('.check:checked').val();
    ///*alert(f)*/

    //if (f == 1) {
    //    var cid = $("#fromdate").val();

    //    $("#todate").val(cid);
    //    $("#message").hide();
    //}
}


//------------------------------------------this is used for Manage staff leave screen----------------------------



function DepartmentsDropdown_Caliingfunction(Dropdownid, DepartmentId, Val) {
    try {
        $.ajax({
            url: "/Attendance/DepartmentsDropdown_Caliingfunction",
            type: "GET",
            success: function (responce) {
                //  $("#DdlDepartment").empty();
                $("#" + Dropdownid).empty();
                $("#" + Dropdownid).append('<option value="">' + "---------Select--------" + '</option>');
                if (Val == "Edit") {
                    $.each(responce, function (i, Value2) {
                        if (Value2.value == DepartmentId) {
                            debugger;
                            $("#" + Dropdownid).append('<option  value="' + Value2.value + '" >' + Value2.text + '</option>');

                            $("#" + Dropdownid + " option").prop("selected", true);
                        }
                        else {
                            $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                        }
                        $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                    });
                } else {
                    $.each(responce, function (i, Value2) {
                        $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                    });
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


function ApplyStaffLeavePageDiv_CalingFunction(event, Userid) {
    try {
        $(".ErrorMessageSpan").empty();
        event.preventDefault();
        // var formdata = new FormData($("#FmSearchUserPage_SearchDetails")[0]);
        debugger;
        window.scrollTo(0, 0);
        var Tr = $(this).closest('tr');
        var Employeename = Tr.find('td:eq(0)').text();
        var dept = Tr.find('td:eq(2)').text();
        var ScreenName = "ManageStaffLeave";
        $("#loadingOverlay").show();
        $.ajax({
           // url: "/Attendance/_ApplyStaffLeaveByUserId_ManageStaffLeave?Userid=" + Userid,
            url: "/Attendance/ApplyStaffLeave?Userid=" + Userid + "&ScreenName=" + ScreenName,
            type: "GET",
            success: function (data) {
                debugger;
                // Append the received partial view content to the container
                $("#ApplyStaffLeavePageDiv").html(data);
                $("#PageSearchUserPage_SearchDetails_Div").hide();

                $("#MainScreenHeadingId").empty();
                //$("#MainScreenHeadingId").closest("h6").remove();

                $("#home-tab").text('Alloted Leaves');
                $("#TableHeadingId").text('ALLOTED LEAVES DETAILS');

                $("#SpanEmpName").text(Employeename);
                $("#SpanEmpDept").text(dept);

               // $("#EmployeeInfo").show();
                //LeaveTypesCAllingTableView(event);
                // Pagination($("#counts").text(), 'TblLeaveDeligationAuthorityList_SearchedRecords');

                $("#loadingOverlay").hide();
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
            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
};


function DdlLmsCategory_Calingfunction(EffectingDropdownid) {

    try {
        debugger;
        $("#ErrorMessageSpan").empty();
        $.ajax({
            url: "/Attendance/DdlLmsCategory_Calingfunction",
            type: "GET",
            success: function (responce) {
                $("#" + EffectingDropdownid).empty();
                $("#" + EffectingDropdownid).append('<option value="">Select LMS category</option>');
                $.each(responce, function (i, Value2) {
                    $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
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
        debugger;
        document.getElementById(Formid).reset(); // Reset the form

        $("#TblLeaveDeligationAuthorityList_SearchedRecords").empty();

       // $("#Fm_TblLeaveDeligationAuthorityList_SearchedRecords").hide();    
        $("#counts").text('0');
        $(".ErrorMessageSpan").empty();


        if (Formid == 'FmLeavesSearchPage_SearchDetails') {
            $("#DdlEmployee").empty();
            $("#DdlEmployee").append("<option value=''>Please select Employee</option>")
            $("#DdlEmployee").prop("disabled", true);
            $("#TblLeavesSearchedResultPage_Div").hide();
            $("#TblLeaveDeligationAuthorityList_SearchedRecords").empty();
        } else {
            $("#_TblStaffUserList_ManageStaffLeave_SearchedRecords_Div").hide();
            $("#Dates_Div").hide();
            $("#DaySession").hide();
        }
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}


function BackTOSearhUserLeaves(event) {
    try {
        debugger;
        TblDataTableWithColumns_CallingFunction(event, 'noStop', '/Attendance/_TblStaffUserList_ManageStaffLeave', 'TblStaffList_SearchedRecords', 'counts', 'FmSearchUserPage_SearchDetails', '_TblStaffUserList_ManageStaffLeave_SearchedRecords_Div');

      //  _TblStaffUserList_ManageStaffLeave(event);
        $("#PageSearchUserPage_SearchDetails_Div").show();
        //$("#TblLeavesSearchedResultPage_Div").show();
        $("#ApplyStaffLeavePageDiv").empty();
        $(".ErrorMessageSpan").empty();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}

//This is for Hide date fields based on click of radio buttons


//$("input[type='radio'].check").click(function () {
//    debugger;
//    if ($(this).is(':checked')) {
//        var data = $(this).text;
//        alert(data)
//        $("#Dayname").val(data);

//    }
//});


//$("input[type='radio'].check1").click(function () {
//    debugger;
//    if ($(this).is(':checked')) {
//        var data1 = $(this).text;
//        $("#Daysessionname").val(data1);

//    }
//});





//This is for Add Leave TExt in leavetype Input of hidden

//$("#leavetype").change(fun1leavetype);

//function fun1leavetype() {

//    var selectvalue = $("#leavetype option:selected").text();

//    $("#LeavetypeTB").val(selectvalue);

//}




//This For Shows Following Fields have invalid Data  message
//$("#savebutton").click(fun55);
//function fun55() {


//    var Fromdate = $("#fromdate").val();

//    var Todate = $("#todate").val();
//    /*var Examid12 = $("#Examid").val();*/

//    var Classidid12 = $("#classid").val();
//    var Studentid = $("#studentid").val();
//    var Leavetype = $("#leavetype").val();
//    var valo = $("#mySpan").text();
//    /*alert(valo)*/


//    if (Classidid12 == "") {
//        $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
//        window.scrollTo(0, 0);
//    }
//    else if (Studentid == "") {
//        $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
//        window.scrollTo(0, 0);
//    }
//    else if (Leavetype == "") {
//        $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
//        window.scrollTo(0, 0);
//    }
//    else if (Fromdate == "") {
//        $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
//        window.scrollTo(0, 0);
//    }
//    else if (Todate == "") {
//        $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
//        window.scrollTo(0, 0);
//    }
//    else if ($("input[type='radio'].check").is(':checked') == false) {
//        $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
//        window.scrollTo(0, 0);
//    }
//    //else if (Classidid12 == "") {
//    //     $("#followingfieldsErrorSPAN").text("Following Fields Have Invalid data :");
//    // }

//    else {
//        $("#followingfieldsErrorSPAN").text('');
//        $(this).removeClass('followingfieldsErrorSPAN');
//    }
//}




//not using


    //var back = $("#backval").val();
    //if (back != 0) {
    //    //  alert($("#backval").val());
    //    $.ajax({
    //        url: "/Attendance/GetApplyStaffLeave_ApplyLeave_CallingMethod",
    //        type: "GET",
    //        success: fun232
    //    });
    //    function fun232(responce) {
    //        $("#GetApplyStaffLeave_ApplyLeave_CallingMethod").html(responce);
    //    }
    //}




    //This is for Hide date fields based on click of radio buttons


    //$("input[type='radio'].check").click(function () {
    //    debugger;
    //    if ($(this).is(':checked')) {
    //        var data = $(this).val();
    //        alert(data)
    //        $("#Dayname").val(data);

    //    }
    //});


    //$("input[type='radio'].check1").click(function () {
    //    debugger;
    //    if ($(this).is(':checked')) {
    //        var data1 = $(this).val();
    //        $("#Daysessionname").val(data1);

    //    }
    //});





    // This is for calling GetApplyStaffLeave_ApplyLeave_CallingMethod page
    //$("#profile-tabs").click(fun121);


    //function fun121() {
    //    /*alert(1)*/
    //    $.ajax({
    //        url: "/Attendance/GetApplyStaffLeave_ApplyLeave_CallingMethod",
    //        type: "GET",
    //        success: fun23
    //    })
    //    function fun23(responce) {
    //        $("#GetApplyStaffLeave_ApplyLeave_CallingMethod").html(responce);
    //    }
    //}






    //document.getElementById("deleteButton").addEventListener("click", function (event) {
    //    event.preventDefault(); // Prevent the default form submission

    //// Display the confirmation dialog
    //if (confirm("Are you sure you want to delete?")) {
    //    document.getElementById("deleteForm").submit(); // Submit the form if confirmed
    //        }
    //    });
