var Length = 0;



$(document).ready(fun32READYFUNCTION);

//ready function
function fun32READYFUNCTION() {
    debugger;
    //var RoleName = Request.Cookies["RoleName"];

  //  var val = '@roleName';
    //alert(val)
    // $("#HAlfdayLB").hide();

    //var rowcount1 = $("#StudentDataGetting_ID tbody tr").length;

    //if (rowcount1 <= 0) {
    //    $("#StudentDataGetting_ID").hide();
    //}
    //else {
    //    $("#StudentDataGetting_ID").show();
    //}


    //var rowcount1 = $("#StudentAttendanceDetails_Table tbody tr").length;

    //if (rowcount1 <= 0) {
    //    $("#StudentAttendanceDetails_Card").hide();
    //}
    //else {
    //    $("#StudentAttendanceDetails_Card").show();
    //}
    debugger;
    //var ReadyFunction_Count = $("#ReadyFunction_Count").val();
     //var roleid = $("#Roleid").val();
    var RoleName = $("#RoleName").val();
    var StudentId_ByParent = $("#StudentId_ByParent").val();
   // if (roleid == 776 || roleid == 775) {
    if (RoleName == "PARENT" || RoleName == "STUDENT") {
    //if (Context.Request.Cookies["RoleName"] != null && (Context.Request.Cookies["RoleName"].Value.Contains("PARENT") || Context.Request.Cookies["RoleName"].Value.Contains("STUDENT"))) {
    //if (Context.Request.Cookies["RoleName"]?.Value?.Contains("PARENT") == true || Context.Request.Cookies["RoleName"]?.Value?.Contains("STUDENT") == true) {

        // var conunt12 = ReadyFunction_Count + 1;

        // $("#ReadyFunction_Count").val(conunt12);
        /*count++;*/

        $("#ClassNAme_div").empty();
        $("#StudentName_div").empty();
        $("#AdmissionNo_Div").hide();
        $("#Attendence_Div").hide();

        //var StudentId_ByParent = Context.Request.Cookies["StudentUserid"];

        if (RoleName == "PARENT") {
            StudentApplyLeave_SelectById_ATTENDANCEDETAILS(StudentId_ByParent)
            stp_tblStudentApplyLeave_SelectById_ByAdmin(StudentId_ByParent)
        }

        //var Month = $("#Monthid").val();
        //var AcadamicYearID = $("#AcadamicYearID").text();
        //stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves(StudentId_ByParent, Month, AcadamicYearID)

        $("#StudentAttendanceDetails_Card").show();
        $("#profile-tabs").show();
    }

    //else {
    //    $("#StudentAttendanceDetails_Card").hide();
    //    $("#profile-tabs").hide();
    //}
};
//these are for Tabs changimg or entering

// Tab 1
var resetButton = document.getElementById('refreshButton');

resetButton.addEventListener('click', function () {
    loaddingimg.css('display', 'block');

    document.getElementById('myForm').reset(); // Reset the form
   //   $(".ErrorMessageSpan").empty();
    $(".ErrorMessageSpan").empty();
    debugger;
    $("#AttendancePercentage").text('');
    $("#todateLB").show();
    $("#todate").show();
    $("#todate").val('');
    $("#fromdateLB").show();
    $("#HAlfdayLB").hide();
    $("#ErrorrmessageSPAN").show();

    $("#radioinline1").prop("disabled", false);
    $("#radioinline2").prop("disabled", false);
    $("#AdmissionNum").text('');

    $("#savebutton").val("Apply Leave").text("Apply Leave");

    $("#StudentDataGetting_ID_FORM").hide();
    $("#CountOfRecords_StudentLeaves").text('');



    $("#AttachDocumentTB_FileName_LABEL").text('');

    $("#AttachDocumentTB_FileName_LABEL_DELETE").text('');
    $("#TextareacountSPAN").text('500');

    //var StudentId_ByParent = $("#StudentId_ByParent").val();

   // var roleid = $("#Roleid").val();
    var RoleName = $("#RoleName").val();

    $("#ViewStudentLeaves_Table tbody").empty();
    if (RoleName == "PARENT" || RoleName == "STUDENT") {
       // if (Context.Request.Cookies["RoleName"].Value.Contains("PARENT")) {
        stp_tblStudentApplyLeave_SelectById_ByAdmin($("#StudentId_ByParent").val())
    //}
    //if (roleid == 776 || roleid == 775) {
       // else if (!Context.Request.Cookies["RoleName"].Value.Contains("PARENT")) {
        $("#StudentDataGetting_ID").hide();
        $("#StudentDataGetting_ID tbody").empty();
        $("#CountOfRecords_StudentLeaves").text('');
    }

    $("#clearbutton").prop("disabled", false);
    $("#savebutton").prop("disabled", false);
    loaddingimg.css('display', 'none');

});



// Tab 2
// Reset the form ViewStudentLeaves_BTN

var ViewStudentLeaves_BTN = document.getElementById('ViewStudentLeaves_BTN');

ViewStudentLeaves_BTN.addEventListener('click', function () {

    loaddingimg.css('display', 'block');

   // $("#ViewStudentDetails_P_Span").find('span').empty();
    $(".ErrorMessageSpan").empty();

    debugger;
    const today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    $("#Monthid").val(parseInt(month));

    var currentYear = today.getFullYear();
    $("#AcadamicYearID option").each(function () {
        if ($(this).text().indexOf(currentYear) !== -1) {
            // Set the 'selected' attribute to select the option
            $(this).prop("selected", true);
        }
    });

    debugger;
   // var roleid = $("#Roleid").val();
    var RoleName = $("#RoleName").val();

    var StudentId_ByParent = $("#StudentId_ByParent").val();
  //  if (roleid == 776 || roleid == 775) {
    if (RoleName == "PARENT" || RoleName == "STUDENT") {
       // if (Context.Request.Cookies["RoleName"].Value.Contains("PARENT")) {
      
        var Month = $("#Monthid").val();
        var AcadamicYearID = $("#AcadamicYearID").val();
        stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves(StudentId_ByParent, Month, AcadamicYearID, event, "12");//here 12 is gave for not prevent defalut
    }

    loaddingimg.css('display', 'none');

});


function FN_ClearValues() {
    try {
        debugger;
        $("#TextareacountSPAN").text("500");
        
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}


//===========================this is for SAVE and Update

$('#myForm').submit(function (event) {
    try {
        event.preventDefault(); // Prevent the form from submitting
        loaddingimg.css('display', 'block');
          $(".ErrorMessageSpan").empty();
        debugger;
        var Studentid = $("#studentid").val();
        var Fromdate = $("#fromdate").val();
        var Todate = $("#todate").val();
        /*var Examid12 = $("#Examid").val();*/
        var Classidid12 = $("#classid").val();
        var Leavetype = $("#leavetype").val();
        // var valo = $("#mySpan").text();
        var file12 = $('#Attachfile1').prop('files')[0]; // Get the selected file
        //var fileInput23 = $('#Attachfile1')[0];
        // var file12 = fileInput23.files[0];

        //stp_tblStudentApplyLeave_SelectById_ByAdmin(Studentid);
        //StudentApplyLeave_SelectById_ATTENDANCEDETAILS(Studentid)

        //var Month = $("#leavetype").val();
        //var AcadamicYearID = $("#mySpan").text();
        //stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves(Studentid, Month, AcadamicYearID)

        var labelpercent = document.getElementById("AttendancePercentage");

        var AttendancePercentage1 = labelpercent.textContent;
        // var daytype = $("input[type='radio'].check").is(':checked');

        // var attachfile = $("#Attachfile").val();
        /*alert(attachfile)*/

        // Validation logic

        if (Classidid12 === '' || Studentid === '' || Leavetype === '' || Fromdate === '' || Todate === '' || $("input[type='radio'].check").is(':checked') == false) {
            $("#followingfieldsErrorSPAN").text("Following fields have invalid data :");
            
            if (Classidid12 === '') {
                $("#Classid1").text("Class");

            }

            if (Studentid === '') {
                $("#Studentid1").text("Student");
            }
            if (Leavetype === '') {
                $("#Leavetypeid1").text("Leave type");
            }
            if (Fromdate === '') {
                var radiobutton = $("#radioinline2").prop("checked");
                if (radiobutton) {
                    $("#mySpan").text("Date");
                }
                else {
                    $("#mySpan").text("From date");
                }
            }
            if (Todate === '' || Todate == "" || Todate === "") {
                $("#ErrorrmessageSPAN").text("To date");
            }
            if ($("input[type='radio'].check").is(':checked') == false) {
                $("#Daystype1").text("Day type");
            }

            window.scrollTo(0, 0);
            loaddingimg.css('display', 'none');
            return;
        }


        else if (Date.parse(Todate) <= Date.now()) {
            $('.alert-danger p').text("'From Date' should be greater than 'Today's Date'.");
            $(".alert-danger").show().delay(6000).fadeOut();
            loaddingimg.css('display', 'none');
            return;
        }
        else if (Date.parse(Todate) < Date.parse(Fromdate)) {
            //  $("#Datechecking").text("'From Date' cannot be greater than 'To Date'. ");
            //window.scrollTo(0, 0);
            $('.alert-danger p').text("'From Date' cannot be greater than 'To Date'. ");
            $(".alert-danger").show().delay(6000).fadeOut();
            loaddingimg.css('display', 'none');
            return;
        }

        // else if (Fromdate != '' || Todate != '') {
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
   
        //else {

        //      $(".ErrorMessageSpan").empty();
        //}

        //}
        else if (AttendancePercentage1 == "0%") {
            $("#savebutton").prop("disabled", true);
            return;
        }

        else if (file12) {
            //debugger;
            var allowedExtensions = ['.doc', '.docx', '.txt', '.jpeg', '.jpg', '.pjpeg', '.gif', '.png', '.pdf'];
            // Check file size
            var maxSize = 500 * 1024; // 500 KB
            if (file12.size > maxSize) {
               // $("#followingfieldsErrorSPAN").text('File size exceeds the maximum limit of 500 KB.');
                $('#Attachfile1').val('');
                loaddingimg.css('display', 'none');
                $('.alert-danger p').text('File size exceeds the maximum limit of 500 KB.');
                $(".alert-danger").show().delay(6000).fadeOut();
                return;
            }
            // Check the file extension
            var fileExtension = '.' + file12.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                $('#Attachfile1').val('');
              //  $("#followingfieldsErrorSPAN").text('Invalid file extension. Only .doc, .docx, .txt, .jpeg, .jpg, .pjpeg, .gif, .png, and .pdf are supported.');
                loaddingimg.css('display', 'none');
                $('.alert-danger p').text('Invalid file extension. Only .doc, .docx, .txt, .jpeg, .jpg, .pjpeg, .gif, .png, and .pdf are supported.');
                $(".alert-danger").show().delay(6000).fadeOut();
               
                return;
            }
        }
        debugger;

        var formData = new FormData(this); // Create a FormData object
        /* formData = $(this).serialize();*/
        // Append the form data, including the file, to the FormData object

        // formData.append('attachdocument', $('#Attachfile')[0].files[0]);

        /*  formData.append('file', $('#file')[0].files[0]);*/
       
        var bt = $("#savebutton").val();
        // get the form data
        $.ajax({
            url: "/Attendance/ApplyStudentLeave?submitButton=" + bt,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                debugger;
               //   $(".ErrorMessageSpan").empty();
                if (response.message == "1") {
                    $('#Attachfile1').val('');
                   // $("#successMessage").text('Already a file with the same name is attached to another Leave. Please upload a new file.');
                    loaddingimg.css('display', 'none');
                    $('.alert-danger p').text("Already a file with the same name is attached to another Leave. Please upload a new file.");
                    $(".alert-danger").show().delay(6000).fadeOut();                  
                    return;
                }
                var StudentId_ByParent = $("#StudentId_ByParent").val();
               // var roleid = $("#Roleid").val();
                var RoleName = $("#RoleName").val();
                if (response.buttonName == "Update") {

                    //window.scrollTo(0, 0);
                    if (response.message == "Student Leave Updated Successfully") {
                        // $("#savebutton").val("Apply Leave");

                        var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");
                        deletebtn.innerHTML = "";

                        $("#AttachDocumentTB_FileName_LABEL_DELETE").css("display", 'none');

                        var anchorElement = document.getElementById("AttachDocumentTB_FileName_LABEL");
                        anchorElement.innerHTML = "";
                        $("myForm ,#AttachDocumentTB_FileName_TEXTBOX").val('');
                       // if (roleid == 773 || roleid == 776) {
                        if (RoleName == "PARENT" || RoleName == "STUDENT" || RoleName == "ADMINISTRATOR" ) {
                            stp_tblStudentApplyLeave_SelectById_ByAdmin(StudentId_ByParent);
                        }
                        $("#savebutton").prop("disabled", true)
                        $("#clearbutton").prop("disabled", true)
                        loaddingimg.css('display', 'none');
                        $('.alert-success p').text(response.message);
                        $(".alert-success").show().delay(6000).fadeOut();
                    }

                }
                else if (response.message == "Student Leave Saved Successfully") { //(response == "Student Leave not Saved") {
                    //773 = ADMINISTRATOR
                    // if (roleid == 773 || roleid == 776) { 
                    if (RoleName == "PARENT" || RoleName == "STUDENT" || RoleName == "ADMINISTRATOR") {
                        stp_tblStudentApplyLeave_SelectById_ByAdmin(StudentId_ByParent);
                    }
                    //stp_tblStudentApplyLeave_SelectById_ByAdmin(Studentid);

                   // window.scrollTo(0, 0);
                    //  $("#AttendancePercentage").text('');

                    // $("#AdmissionNum").text('');
                    // document.getElementById('myForm').reset(); // Reset the form

                 //   $('#successMessage').text(response.message);
                    $("#savebutton").prop("disabled", true)
                    $("#clearbutton").prop("disabled", true)

                    loaddingimg.css('display', 'none');
                    $('.alert-success p').text(response.message);
                    $(".alert-success").show().delay(6000).fadeOut();
                    /*location.reload();*/

                    //var rowcount1 = $("#ViewStudentLeaves_Table tbody tr").length;
                    //if (rowcount1 <= 0) {
                    //    $("#ViewStudentLeaves_Table").hide();
                    //}
                    //else {
                    //    $("#ViewStudentLeaves_Table").show();
                    //}


                    //$('#myForm').find('div').find('div').each(function () {
                    //    $(this).find('#Textarea,#Attachfile,#fromdate, #classid, #studentid,#leavetype,#AttendancePercentage,#AdmissionNum,#todate,#radioinline1,#radioinline2').val('');
                    //});



                    //$('#myForm').find('input').val('');


                    //$('#myForm').find('div').find('div').each(function () {
                    //    $(this).find('#fromdate, #classid, #studentid').val('');
                    //});

                }
                else {
                    loaddingimg.css('display', 'none');
                    $('.alert-danger p').text(response.message);
                    $(".alert-danger").show().delay(6000).fadeOut();
                    /* document.getElementById('myForm').reset();*/
                    //  $(".ErrorMessageSpan").empty();
                }
                //if (true) {
                //    $('#successMessage').text(response.message);
                //}

               // $('#successMessage').text(response.message);
               // window.scrollTo(0, 0);
                loaddingimg.css('display', 'none');
            },
            error: function (xhr, status, error) {
                loaddingimg.css('display', 'none');
                $("#followingfieldsErrorSPAN").text("Something Error");
                //console.log(xhr.responseText); // Log any error response
            }
        })

    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#followingfieldsErrorSPAN").text("Something Error");
    }

});

//============================================This is for getting values to Update

//$('#StudentDataGetting_ID_FORM').on('click', 'td b', function () {
$('#StudentDataGetting_ID_FORM').on('click', '#Edit_Student_ID', function () {
    try {
        $(".ErrorMessageSpan").empty();
        //  document.getElementById("tab2").style.display = "none";
        var ID = $(this).closest('td').find('#ID_APPEND_For_Edit_Student').val();
        //var ID = $(this).find('#ID_APPEND_For_Edit_Student').val();

        //   window.location.href = "/format/Sale_Format?ID=" + ID;
        loaddingimg.css('display', 'block');
        $.ajax({
            url: "/Attendance/stp_tblStudentApplyLeave_DetailsById_ToEDIT?Studentid=" + ID,
            type: "GET",
            success: function (response) {
                debugger;


                var AdmissionNumCT = $("#AdmissionNumCT").val();
                var AttendancePercentageCT = $("#AttendancePercentageCT").val();


                $("#AdmissionNum").text(AdmissionNumCT);
                $("#AttendancePercentage").text(AttendancePercentageCT);
                var valueToAppend = "";
                var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");
                deletebtn.innerHTML = "";
                if (response[0].attachdocument != "") {
                    valueToAppend = "Delete";
                    $("#AttachDocumentTB_FileName_LABEL_DELETE").css('display', '');
                }
                else {
                    $("#AttachDocumentTB_FileName_LABEL_DELETE").css('display', 'none');
                    valueToAppend = ""
                }

                deletebtn.innerHTML += valueToAppend;


                var anchorElement = document.getElementById("AttachDocumentTB_FileName_LABEL");
                var valueToAppend = response[0].attachdocument;
                anchorElement.innerHTML = "";
                anchorElement.innerHTML += valueToAppend;
                $("myForm ,#AttachDocumentTB_FileName_TEXTBOX").val('');
                $("myForm ,#AttachDocumentTB_FileName_TEXTBOX").val(response[0].attachdocument);
                /* $("#myForm").find('div').find("myForm ,#AttachDocumentTB_FileName").textContent('ok');*/

                var classidCT1 = $("#ClassidCT").val();
                $("myForm ,#classid").val(classidCT1);
                $("myForm ,#studentid").val(response[0].userId);
                $("myForm ,#leavetype").val(response[0].leavetypeid);


               // var Leavetypeid = response[0].leavetypeid;
                var LeavetypeText = $("#leavetype option:selected").text();
               // if (Leavetypeid == "10" || Leavetypeid == "11") {
                if (LeavetypeText.toUpperCase() == "FIRST HALF PRESENT" || LeavetypeText.toUpperCase() == "SECOND HALF PRESENT") {
                    $("#radioinline2").prop("checked", true);
                    $("#todateLB").hide();
                    $("#todate").hide();
                    $("#HAlfdayLB").show();
                    $("#fromdateLB").hide();
                    $("#ErrorrmessageSPAN").hide();
                    $("#radioinline1").prop("disabled", true);
                    $("#radioinline2").prop("disabled", false);
                    $("#fromdate").val('');
                }
                else {
                    $("#radioinline1").prop("checked", true);
                    $("#todateLB").show();
                    $("#todate").show();
                    $("#todate").val('');
                    $("#fromdateLB").show();
                    $("#HAlfdayLB").hide();
                    $("#ErrorrmessageSPAN").show();
                    $("#radioinline2").prop("disabled", true);
                    $("#radioinline1").prop("disabled", false);
                }

                var fromdatestring = response[0].fromdate;
                var dateValue = fromdatestring.split("T")[0];
                var dateInput = document.getElementById("fromdate");
                dateInput.value = dateValue;



                var Todatestring = response[0].todate;
                var Todatevalue = Todatestring.split("T")[0];
                var TodateProperty = document.getElementById("todate");
                TodateProperty.value = Todatevalue;
                //$("#myForm").find('div').find("myForm ,#fromdate").val(fromdatestring);
                /* $("#myForm").find('div').find("myForm ,#todate").val(response[0].todate);*/


                $("myForm ,#Textarea").val(response[0].leavecomments);
               // var textareavalue = $("#Textarea").val();
               // var maxlength = 500;
                //var textareacount = 500 - response[0].leavecomments.length;

                $("#TextareacountSPAN").text(500 - response[0].leavecomments.length);
                //$("#myForm").find('div').find("myForm ,#Attachfile1").val(response[0].attachdocument);
                // $("#myForm").find('div').find("myForm ,#attachdocument").val(attachdocument2);
                /*$('#Attachfile').prop('files', response[0].attachdocument);*/

                debugger;
                /*$("#attachdocument")[0].files = response[0].attachdocument;*/
                //var fileName = response[0].attachdocument;
                //$('#Attachfile').val(fileName);

                //$("#myForm").html(response);


                $("#myForm #Attachfile1").val('');
                $("#AttachDocumentTB_FileName_ForDelete").val('');
                $("#myForm #submitBStudentLeaveDetailsIDutton").val(ID);
                /*   alert(ID)*/
               // $("#savebutton").prop("disabled", false);
                $("#savebutton").val("Update").text("Update").prop("disabled", false);

                $("#myForm #clearbutton").prop("disabled", true);
                /* $("#get_format #submitButton").val("Edit Sales");*/
                loaddingimg.css('display', 'none');
            }
            ,
            error: function (xhr, status, error) {
                loaddingimg.css('display', 'none');
                $("#followingfieldsErrorSPAN").text("Something Error");
                //console.log(xhr.responseText); // Log any error response
            }
        })

    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#followingfieldsErrorSPAN").text("Something Error");
    }
})


//this is for delete
/*$('#StudentDataGetting_ID_FORM').on('click', 'p','#deleteBTN', function () {*/


//===========================================This is for delete Leaves===========================

function DeleteLeaveLevelCallingFunction(LeaveId,StudentId) {
    debugger;
    try {
        $(".ErrorMessageSpan").empty();
     //   title, type, url, data, successcallback
        CommonDeleteFunction('leave Details', "POST", "/Attendance/ApplyStudentLeave?submitButton=Delete&StudentLeaveDetailsID_TO_Delete=" + LeaveId,null, function (response) {
            loaddingimg.css('display', 'block');
            debugger;
            if (response.message == "Student Leave Deleted Successfully") {
                stp_tblStudentApplyLeave_SelectById_ByAdmin(StudentId);
                $('.alert-success p').text(response.message);
                $(".alert-success").show().delay(5000).fadeOut()
            } else {
                $('.alert-danger p').text(response.message);
                $(".alert-danger").show().delay(6000).fadeOut();
            }

            loaddingimg.css('display', 'none');
        });
        loaddingimg.css('display', 'none');
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}

//===================================This is for delete file
$('#myForm').on('click', '#AttachDocumentTB_FileName_LABEL_DELETE', function () {
    try {

        $(".ErrorMessageSpan").empty();
        Swal.fire({
            title: "Are you sure you want to delete this Leave Document ?",
            text: "  ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            // If user confirms deletion
            if (result.isConfirmed) {
              
           
        //   title, type, url, data, successcallback
       // CommonDeleteFunction('Document', "POST", null, null, function (response) {
      //  CommonDeleteFunction('Document', "POST", "/Attendance/DeleteDocumentFunction", null, function (response) {
            loaddingimg.css('display', 'block');
            debugger;
            $("#AttachDocumentTB_FileName_LABEL_DELETE").css('display', 'none');
            var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");
            deletebtn.innerHTML = "";
            var anchorElement = document.getElementById("AttachDocumentTB_FileName_LABEL");
            anchorElement.innerHTML = "";
            $("#AttachDocumentTB_FileName_ForDelete").val($("#AttachDocumentTB_FileName_TEXTBOX").val());
            $("myForm ,#AttachDocumentTB_FileName_TEXTBOX").val('');
          
            loaddingimg.css('display', 'none');
           // });
    }
        })
        loaddingimg.css('display', 'none');

        //var row12 = confirm("Are you sure you want  to delete the leave Details ?");
      
        //if (row12 == true) {

        //    $("#AttachDocumentTB_FileName_LABEL_DELETE").css('display', 'none');
        //    var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");
        //    deletebtn.innerHTML = "";
        //    var anchorElement = document.getElementById("AttachDocumentTB_FileName_LABEL");
        //    anchorElement.innerHTML = "";
        //    $("myForm ,#AttachDocumentTB_FileName_TEXTBOX").val('');
        //}
    } catch (e) {
        $("#followingfieldsErrorSPAN").text("Something Error");
        loaddingimg.css('display', 'none');
    }
});

//=====================================This is for down load image 
//$('.image-link').click(function () {
    $('#AttachDocumentTB_FileName_LABEL').click(function () {
    var imageName = $(this).text();
   // debugger;
    //download($('#barcode').attr('src'), "strcode.png", imageName);

    var Studentid = $("#Studentid").val();
    if (Studentid == "0") {
        Studentid = $("#studentid").val();
    }
    var Instanceid = $("#instanceid").val();

    //var imageName = $(this).text(); // Get the text of the clicked element
    var imageUrl = '/LeavesDoc/' + Instanceid + '/' + Studentid + '/' + imageName; // Replace 'path/to/images/' with the actual path to your images

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
          $(".ErrorMessageSpan").empty();
        $("#followingfieldsErrorSPAN").text("File not found. Please contact the site administrator.");
        window.scrollTo(0, 0);
    }
    //File not found.Please contact site administrator.

    //download($('#barcode').attr('src'), "strcode.png", "/imagefiles/banner_img.jpg");
});

//===============================this is for get details in viewstudents details
function Search_stp_ViewStudentLeaves(event) {
    event.preventDefault();
    // document.getElementById("demo").style.color = "red";


    //var count = 0;
    //$("#SearchBTN_ViewStudentLeaves").click(function () {

    //$(document).off('ready');

    debugger;
    var StudentId_ByParent = $("#StudentId_ByParent").val();
    var Month = $("#Monthid").val();

    var AcadamicYearID = $("#AcadamicYearID").val();
    $("#ViewStudentDetails_P_Span").find('span').empty();
    if (Month === '' || AcadamicYearID === '') {
        $("#followingfieldsErrorSPAN_OF_ViewstudentLeaves").text("Following fields have invalid data :");
        window.scrollTo(0, 0);
        if (Month === '') {
            $("#Monthid_Span").text("Month ");
        }
        if (AcadamicYearID === '') {
            $("#AcadamicYearID_Span").text("Acadamic Year");
        }
        return;
    }
    else {
        debugger;
        stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves(StudentId_ByParent, Month, AcadamicYearID,event)
    }

    //$("#StudentAttendanceDetails_Card").show();
    //});

}
var count = 0;

//============================This is for calling function to 	View student details of Student leaves to parent
function stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves( Studentid, Month, AcadamicYearID, event,val) {
    if (val != "12") {
        event.preventDefault();
    }
    $.ajax({
        url: "/Attendance/stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves?Studentid=" + Studentid + "&Month=" + Month + "&AcadamicYearID=" + AcadamicYearID,
        type: "GET",
        success: function (response) {
            Length = response.length;
            $("#ViewStudentLeaves_Table tbody").empty();
            $("#CountOfRecords_View_Student_Leaves").text(Length);

            var table = js('#ViewStudentLeaves_Table').DataTable();
           var currentPage = table.page.info().page;
            table.destroy();
            if (Length <= 0) {
                $("#ViewStudentLeaves_Table").hide();
               // $("#CountOfRecords_View_Student_Leaves").text("No Records Found");
            } else {
               //var TextcountsofStudents = "YOUR SEARCH RESULTED  " + Length + "  RECORD(S).";
               // $("#CountOfRecords_View_Student_Leaves").text(TextcountsofStudents);
              
                $.each(response, function (i, value122) {
                    $("#ViewStudentLeaves_Table tbody").append("<tr>" +
                        "<td>" + value122.leavetype + "</td>" +
                        "<td >" + value122.total + " </td>" +
                        "<td>" + value122.pending + " </td>" +
                        "<td>" + value122.approved + " </td>" +
                        "<td >" + value122.rejected + " </td>" +
                        "</tr>"
                    );
                });
               // Pagination(Length, 'ViewStudentLeaves_Table')


                var ExcelDownloadColumnsNo = [];
                TblDataTableWith_OutColumns_CallingFunction("ViewStudentLeaves_Table", 'noresponse', lenth, currentPage, 'Noname', ExcelDownloadColumnsNo);
                loaddingimg.css('display', 'none');
                $("#ViewStudentLeaves_Table").show();
            }
            //var rowcount1 = $("#ViewStudentLeaves_Table tbody tr").length;
            //if (rowcount1 <= 0) {
            //    $("#ViewStudentLeaves_Table").hide();
            //}
            //else {
            //    $("#ViewStudentLeaves_Table").show();
            //}
            //$("#StudentDataGetting_ID").show();



            /*  $("#StudentDataGetting_ID tbody").append(response);*/
            /*$("#StudentDataGetting_ID tbody").html(response);*/

        }
    });
}



//================================This is for calling function to 	ATTENDANCE DETAILS of Student leaves to parent
function StudentApplyLeave_SelectById_ATTENDANCEDETAILS(Studentid) {
    try {
        debugger;
    $.ajax({
        url: "/Attendance/StudentApplyLeave_SelectById_ATTENDANCEDETAILS?Studentid=" + Studentid,
        type: "GET",
        success: function (response) {
            var table = js('#StudentAttendanceDetails_Table').DataTable();
            var currentPage = table.page.info().page;
            table.destroy();
            Length = response.length;
            $("#StudentAttendanceDetails_Table tbody").empty();
            if (Length <= 0) {
                $("#StudentAttendanceDetails_Table").hide();
            }
            else {
            $.each(response, function (i, value122) {
                $("#StudentAttendanceDetails_Table tbody").append("<tr>" +
                    "<td>" + value122.totalpresents + "</td>" +
                    "<td >" + value122.totalAbsents + " </td>" +
                    "<td style='color:red;'>" + value122.presentPercentage + " </td>" +
                    "<td>" + value122.absentsPercentage + " </td>" +
                    "</tr>"
                );
            });

                //Pagination(Length, 'StudentAttendanceDetails_Table');
               

                var ExcelDownloadColumnsNo = [];
              
                TblDataTableWith_OutColumns_CallingFunction("StudentDataGetting_ID", 'noresponse', Length, currentPage, 'Noname', ExcelDownloadColumnsNo);
              //  loaddingimg.css('display', 'none');
                $("#StudentAttendanceDetails_Table").show();
            }
        }
        ,
        error: function (xhr, status, error) {
        
            $("#followingfieldsErrorSPAN").text("Something Error");
            loaddingimg.css('display', 'none');
            //console.log(xhr.responseText); // Log any error response
        }
    })

    } catch (e) {
      
        $("#followingfieldsErrorSPAN").text("Something Error");
        loaddingimg.css('display', 'none');
    }
}



//This is for calling function to Student leaves to admin
function stp_tblStudentApplyLeave_SelectById_ByAdmin(Studentid) {
    try {
        debugger; loaddingimg.css('display', 'block');
    $.ajax({
        url: "/Attendance/stp_tblStudentApplyLeave_SelectById_Admin?Studentid=" + Studentid,
        type: "GET",
        success: function (response) {
            var lenth = response.length;
            var table = js('#StudentDataGetting_ID').DataTable();
            var currentPage = table.page.info().page;
            table.destroy();
            $("#StudentDataGetting_ID tbody").empty();
            $("#CountOfRecords_StudentLeaves").text(lenth);
            if (lenth <= 0) {
               // $("#StudentDataGetting_ID_FORM").hide();
                $("#StudentDataGetting_ID").hide();

               // $("#CountOfRecords_StudentLeaves").text("");
               // $("#CountOfRecords_StudentLeaves").text("NO RECORDS");
            } else {

               // var TextcountsofStudents = "YOUR SEARCH RESULTED  " + lenth + "  RECORD(S).";
               // $("#CountOfRecords_StudentLeaves").html("YOUR SEARCH RESULTED <span class='number-circle'> " + lenth + "</span> RECORD(S).");

               // $("#CountOfRecords_StudentLeaves").text(lenth);
            var today = new Date();
            var year = today.getFullYear();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var day = ('0' + today.getDate()).slice(-2);
            /*var dateString = year + '-' + month + '-' + day;*/
            var Todaydate = year + '-' + month + '-' + day;


            var viewfiles = "";

            var username1 = "";
                var AttachDocument;

                var LeaveStatus;
            $.each(response, function (i, value122) {
                var StudentLeaveDetailsID1 = value122.studentLeaveDetailsID;

                var leaveAppliedDate1 = value122.leaveAppliedDate1.split("T")[0];
                var fromdate1 = value122.fromdate.split("T")[0];
                var Todate1 = value122.todate.split("T")[0];

                const fromdateConvert1 = new Date(fromdate1);
                var year1 = fromdateConvert1.getFullYear();
                var month1 = ('0' + (fromdateConvert1.getMonth() + 1)).slice(-2);
                var day1 = ('0' + fromdateConvert1.getDate()).slice(-2);
                /*var dateString = year + '-' + month + '-' + day;*/
                var fromdateConvert12 = day1 + '/' + month1 + '/' + year1;


                const TodateConvert1 = new Date(Todate1);
                var year2 = TodateConvert1.getFullYear();
                var month2 = ('0' + (TodateConvert1.getMonth() + 1)).slice(-2);
                var day2 = ('0' + TodateConvert1.getDate()).slice(-2);
                var TodateConvert12 = day2 + '/' + month2 + '/' + year2;


                const leaveAppliedDateConvert1 = new Date(leaveAppliedDate1);
                var year23 = leaveAppliedDateConvert1.getFullYear();
                var month23 = ('0' + (leaveAppliedDateConvert1.getMonth() + 1)).slice(-2);
                var day23 = ('0' + leaveAppliedDateConvert1.getDate()).slice(-2);
                var leaveAppliedDateConvert12 = day23 + '/' + month23 + '/' + year23;


                /*AttachDocument = value122.attachdocument;*/

                AttachDocument = "<input  type='text'  id='AttachDocumentTB' value='" + value122.attachdocument + "' hidden/>";


                if (value122.attachdocument != "") {
                    //viewfiles = " <a href='/LeavesDoc/" + value122.attachdocument + "'  target='_blank'><font color='blue'><u style='font-weight:700;'>View</u></font></a >";
                    viewfiles = " <a class='badge rounded-pill bg-info bg-glow' href='/LeavesDoc/" + value122.attachdocument + "'  target='_blank'>View</a >";
                      }
                else {
                   // viewfiles = " <font color='blue'><u style='font-weight:700;'>View</u></font>";
                    viewfiles = "<a class='badge rounded-pill bg-secondary bg-glow'>View</a>";
                }


                if (fromdate1 < Todaydate || Todate1 < Todaydate) {
                    //username1 = " <div><a href='#'  disabled='disabled'><font color='blue''><b><u>" + value122.username + "</u></b></font></a><input type='text' hidden readonly id='ID_APPEND_For_Edit_Student' value='" + StudentLeaveDetailsID1 + "'/></div>";

                    //this disable both
                   // username1 = " <font color='blue''><u style='font-weight:700;'>" + value122.username + "</u></font><input type='hidden'  readonly id='ID_APPEND_For_Edit_Student' value='" + StudentLeaveDetailsID1 + "'/>";

                    username1 = "" + value122.username + "<input type='hidden'  readonly id='ID_APPEND_For_Edit_Student' value='" + StudentLeaveDetailsID1 + "'/>";


                    //viewfiles = " <font color='blue'><b><u>View</u></b></font>";

                }
                else if (value122.leaveStatus == "Approved" || value122.leaveStatus == "Rejected") {

                    //this  disabled username1 with remove div
                    //username1 = " <font color='blue''><u style='font-weight:700;'>" + value122.username + "</u></font><input type='hidden'  readonly id='ID_APPEND_For_Edit_Student' value='" + StudentLeaveDetailsID1 + "'/>";
                    username1 = " " + value122.username + "<input type='hidden'  readonly id='ID_APPEND_For_Edit_Student' value='" + StudentLeaveDetailsID1 + "'/>";
                    //if (value122.attachdocument != "") {
                    //    viewfiles = " <a href='/LeavesDoc/" + value122.attachdocument + "'  target='_blank'><font color='blue'><u style='font-weight:800;'>View</u></font></a >";

                    //}
                    //else {
                    //    viewfiles = " <font color='blue'><u style='font-weight:800;'>View</u></font>";
                    //}
                }
                else {
                    //not disabled both with add div
                    //username1 = " <a href='#'  ><font color='blue''><u id='Edit_Student_ID' style='font-weight:700;'>" + value122.username + "</u></font><input type='text' hidden readonly id='ID_APPEND_For_Edit_Student' value='" + StudentLeaveDetailsID1 + "'/></a>";
                    username1 = " <b style='cursor:pointer' id='Edit_Student_ID'>" + value122.username + "<input type='hidden'  readonly id='ID_APPEND_For_Edit_Student' value='" + StudentLeaveDetailsID1 + "'/></b>";
                    // username1 = " <div><font color='blue''><b><u>" + value122.username + "</u></b></font><input type='text' hidden readonly id='ID_APPEND_For_Edit_Student' value='" + StudentLeaveDetailsID1 + "'/></div>";

                    //if (value122.attachdocument != "") {
                    //    viewfiles = " <a href='/LeavesDoc/" + value122.attachdocument + "'  target='_blank'><font color='blue'><u style='font-weight:800;'>View</u></font></a >";

                    //}
                    //else {
                    //    viewfiles = " <font color='blue'><u style='font-weight:800;'>View</u></font>";
                    //}

                }

                var AdmissionNum1 = $("#AdmissionNum").text();

                var AdmissionNum2 = "<input name='AdmissionNumCT' type='hidden' id='AdmissionNumCT' value='" + AdmissionNum1 + "' />";
                var AttendancePercentage1 = $("#AttendancePercentage").text();

                var AttendancePercentage2 = "<input name='AttendancePercentageCT' type='hidden' id='AttendancePercentageCT' value='" + AttendancePercentage1 + "' />";
                var classid1 = $("#classid").val();
                var classid2 = "<input name='Leavetypeid' type='hidden' id='ClassidCT' value='" + classid1 + "' />";
                /*var editbt = " <div class='fa fa-edit'><input type='text' hidden class='ID_APPEND_For_Edit' readonly   /></div>";*/
                var deleteBTN = "";
                if (value122.leaveStatus != "Pending") {
                    deleteBTN = "";
                } else {
                    //deleteBTN = " <i id='deleteBTN' class='ti ti-trash' title='Click to delete this record' style='cursor:pointer;'><input type='hidden'  readonly id='id_For_Delete' value='" + StudentLeaveDetailsID1 + "' /><input type='hidden'  readonly id='StudentId_TOShow' value='" + Studentid + "' /></i>";
                    deleteBTN = " <a id='deleteBTN' class='ti ti-trash' title='Click to delete this record' style='cursor:pointer;' onclick='DeleteLeaveLevelCallingFunction("+ StudentLeaveDetailsID1 + "," + Studentid + ")'></a>";

                }
                if (value122.leaveStatus == "Approved") {
                    LeaveStatus =  "<span class='badge bg-label-success'>Approved</span>"
                } else if (value122.leaveStatus == "Rejected") {
                    LeaveStatus = "<span class='badge bg-label-secondary'>Rejected</span>"
                } else {
                    LeaveStatus =  "<span class='badge bg-label-warning'>Pending</span>"
                }

                //var deleteBTN = " <p class='fa fa-trash-o' style='font-size: 20px; color: red'><input type='text' hidden readonly id='id_For_Delete' value='" + StudentLeaveDetailsID1 + "' /><input type='text' hidden readonly id='StudentId_TOShow' value='" + Studentid + "' /></p>";
                $("#StudentDataGetting_ID tbody").append("<tr>" +
                    "<td style='text-align:center;'>" + ++i + " </td>" +
                    "<td>" + username1 + "" + classid2 + "" + AdmissionNum2 + "" + AttendancePercentage2 + "" + AttachDocument + "</td>" +
                    "<td>" + leaveAppliedDateConvert12 + "</td>" +
                    "<td>" + fromdateConvert12 + " </td>" +
                    "<td>" + TodateConvert12 + " </td>" +
                    "<td>" + value122.leaveNoOfDays + " </td>" +
                    "<td style='text-align:center;'>" + LeaveStatus + " </td>" +
                    "<td>" + value122.approved_Regected_Date + " </td>" +
                    "<td style='text-align:center;'>" + viewfiles + "</td>" +
                    "<td style='text-align:center;'>" + deleteBTN + " </td>" +
                    "</tr>"
                );
            });
           // var rowcount1 = $("#StudentDataGetting_ID tbody tr").length;
                //Pagination(lenth, 'StudentDataGetting_ID')
                
                 
                
                var ExcelDownloadColumnsNo = [];              
                TblDataTableWith_OutColumns_CallingFunction("StudentDataGetting_ID", 'noresponse', lenth, currentPage, 'Noname', ExcelDownloadColumnsNo);
                loaddingimg.css('display', 'none');
                $("#StudentDataGetting_ID_FORM").show();
                $("#StudentDataGetting_ID").show();
            }
            //$('#StudentDataGetting_ID_Table_pagination').empty();
            //debugger
            //var table = $('#StudentDataGetting_ID');
            //var tbody = table.find('tbody');

            //var rowsPerPage = 10; // Number of rows to display per page
            //var numPages = Math.ceil(response.length / rowsPerPage);
            //var currentPage = 1; // Default current page

            //var pagination = $('#StudentDataGetting_ID_Table_pagination');
            //pagination.empty();

            //// Create pagination links
            //var previousLink = $('<a class="StudentDataGetting_ID_Table_pagination_Class" style="margin: 0 2px;" href="#">Previous</a>');
            //pagination.append(previousLink);

            //var startIndex = 1; // Start index for pagination links
            //var endIndex = Math.min(numPages, 10); // End index for pagination links

            //for (var i = startIndex; i <= endIndex; i++) {
            //    var link = $('<a class="StudentDataGetting_ID_Table_pagination_Class" style="margin: 0 2px;" href="#">' + i + '</a>');
            //    pagination.append(link);
            //}


            //var nextLink = $('<a class="StudentDataGetting_ID_Table_pagination_Class" style="margin: 0 2px;" href="#">Next</a>');
            //pagination.append(nextLink);

            //// Show the first page by default
            //showPage(currentPage);

            //// Adjust pagination alignment
            //pagination.css('text-align', 'center');

            //// Handle pagination link click event
            //pagination.on('click', '.StudentDataGetting_ID_Table_pagination_Class', function (e) {

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
            //        var link = $('<a class="StudentDataGetting_ID_Table_pagination_Class" style="margin: 0 2px;" href="#">' + i + '</a>');
            //        pagination.append(link);
            //    }

            //    pagination.append(nextLink);

            //    // Update active class on current page link
            //    $('.StudentDataGetting_ID_Table_pagination_Class').removeClass('active');
            //    $('.StudentDataGetting_ID_Table_pagination_Class').eq(page - newStartIndex + 1).addClass('active').css('cursor', 'unset');;
            //    debugger;
            //    if (response
            //        .length < 11) {
            //        $("#StudentDataGetting_ID tfoot").hide();
            //    }
            //    else {
            //        $("#StudentDataGetting_ID tfoot").show();
            //    }

           // }
            /*  $("#StudentDataGetting_ID tbody").append(response);*/
            /*$("#StudentDataGetting_ID tbody").html(response);*/
        }
        ,
        error: function (xhr, status, error) { 
            $("#followingfieldsErrorSPAN").text("Something Error");
            loaddingimg.css('display', 'none');
            //console.log(xhr.responseText); // Log any error response
        }
    })
    } catch (e) {   
        $("#followingfieldsErrorSPAN").text("Something Error");
        loaddingimg.css('display', 'none');
    }
}


//THIS for counting characters of textarea
$(document).ready(function () {
    $("#Textarea").on("input", function () {
        var textareavalue = $("#Textarea").val();
        var maxlength = 500;
        var textareacount = maxlength - textareavalue.length;

        $("#TextareacountSPAN").text(textareacount);
    });
});


//This is for Add Same date in TODAte Input of hidden

$("#fromdate").change(fun123);

function fun123() {


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


//this is for getting student names by selecting class dropdown

$("#classid").change(fun1);
function fun1() {
    $("#AttendancePercentage").empty();
    $("#AdmissionNum").empty();
    var Value = $("#classid").val();
    if (Value != "") {
        var InstanceId = $("#instanceid").val();

        /* alert(CID);*/
        $.ajax({
            url: "/Attendance/GetStudentNameDropdown?InstanceId=" + InstanceId + "&Value=" + Value,
            dataType: 'json',
            type: "GET",
            success: fun2
        });
        function fun2(response) {
            $("#studentid").empty();
            debugger;
            $("#studentid").append('<option value="">' + "-------select-------" + '</option>')
            $.each(response, function (i, value1) {


                $("#studentid").append('<option value="' + value1.value + '">' + value1.text + '</option>');
            });

            $("#AttendancePercentage").empty();
            $("#AdmissionNum").empty();

            $("#leavetype").val('');


            $("#todateLB").show();
            $("#todate").show();
            $("#todate").val('');
            $("#fromdateLB").show();
            $("#HAlfdayLB").hide();
            $("#ErrorrmessageSPAN").show();
            $("#radioinline2").prop("disabled", false);
            $("#radioinline1").prop("disabled", false);
            $("#radioinline1").prop("checked", false);
            $("#radioinline2").prop("checked", false);


            $("#todate").val('');
            $("#fromdate").val('');
            $("#Textarea").val('');
            $("#Attachfile1").val(null);

            $("#StudentDataGetting_ID_FORM").hide();

            $("#CountOfRecords_StudentLeaves").text('');
            $("#StudentDataGetting_ID tbody").empty();
            // $("#savebutton").prop("disabled", false);
            // $("#clearbutton").prop("disabled", false);

            var deletebtn = document.getElementById("AttachDocumentTB_FileName_LABEL_DELETE");

            deletebtn.innerHTML = "";

            var anchorElement = document.getElementById("AttachDocumentTB_FileName_LABEL");

            anchorElement.innerHTML = "";

            $("#myForm").find('div').find("myForm ,#AttachDocumentTB_FileName_TEXTBOX").val('');





            $("#savebutton").val("Apply Leave");
        }
    } else {
        $("#studentid").empty();
        $("#studentid").append('<option value="">' + "-------select-------" + '<option>');
        $("#AttendancePercentage").empty();
        $("#AdmissionNum").empty();
    }

}



//This for getting Admission number and Attendance percentage
$("#studentid").change(fun11);
function fun11() {
    $("#AdmissionNum").empty();
    $("#AttendancePercentage").empty();

    var Value = $("#classid").val();
    var StudentUserid = $("#studentid").val();
    /*alert(StudentUserid)*/
    var InstanceId = $("#instanceid").val();
    $("#StudentId_ByParent").val(StudentUserid);
    $.ajax({
        url: "/Attendance/GetAttendancePercentage?InstanceId=" + InstanceId + "&StudentUserid=" + StudentUserid + "&ValueOFInstance=" + Value,
        dataType: 'json',
        type: "GET",
        success: fun21
    });
    function fun21(response) {

        $("#AttendancePercentage").append(response[0].attendancePercentage + "%");
        $("#AdmissionNum").append(response[1].admissionNumber);


        $("#leavetype").val('');


        $("#todateLB").show();
        $("#todate").show();
        $("#todate").val('');
        $("#fromdateLB").show();
        $("#HAlfdayLB").hide();
        $("#ErrorrmessageSPAN").show();
        $("#radioinline2").prop("disabled", false);
        $("#radioinline1").prop("disabled", false);
        $("#radioinline1").prop("checked", false);
        $("#radioinline2").prop("checked", false);


        $("#todate").val('');
        $("#fromdate").val('');
        $("#Textarea").val('');
        $("#Attachfile1").val(null);



        //$("#CountOfRecords_StudentLeaves").text('');


        // $("#StudentDataGetting_ID_FORM").hide();
        //$("#StudentDataGetting_ID tbody").empty();


        // $("#savebutton").prop("disabled", false);
        // $("#clearbutton").prop("disabled", false);
        // $("#savebutton").val("Apply Leave");

        if (response[0].attendancePercentage == 0) {


            if ($("#savebutton").prop("disabled") == false) {

                $("#savebutton").prop("disabled", true);
                $("#clearbutton").prop("disabled", true);
            }
        }
        else {

            $("#savebutton").prop("disabled", false);
            $("#clearbutton").prop("disabled", false);
        }

    }


}



//This for Selected Radiobuttons (Fullday or HalfDay) based on leave type
$("#leavetype").change(fun22);
function fun22() {
    var Leavetypeid = $("#leavetype").val();
    /*alert(Leavetypeid)*/

    if (Leavetypeid == "10" || Leavetypeid == "11") {
        $("#radioinline2").prop("checked", true);

        $("#todateLB").hide();
        $("#todate").hide();
        $("#HAlfdayLB").show();
        $("#fromdateLB").hide();
        $("#ErrorrmessageSPAN").hide();
        $("#radioinline1").prop("disabled", true);
        $("#radioinline2").prop("disabled", false);
        $("#fromdate").val('');
    }
    else {
        $("#radioinline1").prop("checked", true);

        $("#todateLB").show();
        $("#todate").show();
        // $("#todate").val('');
        $("#fromdateLB").show();
        $("#HAlfdayLB").hide();
        $("#ErrorrmessageSPAN").show();
        $("#radioinline2").prop("disabled", true);
        $("#radioinline1").prop("disabled", false);
    }

}



$("input[type='radio'].check").click(function () {

    if ($(this).is(':checked')) {

        if ($(this).val() == 1) {
            $("#todateLB").hide();
            $("#todate").hide();
            $("#HAlfdayLB").show();
            $("#fromdateLB").hide();
            $("#ErrorrmessageSPAN").hide();
            $("#fromdate").val('');
        }
        else if ($(this).val() == 0) {
            $("#todateLB").show();
            $("#todate").show();
            $("#todate").val('');
            $("#fromdateLB").show();
            $("#HAlfdayLB").hide();
            $("#ErrorrmessageSPAN").show();
        }
    }
});


//---------------------------------------end using code-----------------


//===========================================This is for delete===========================
//$('#StudentDataGetting_ID_FORM').on('click', '#deleteBTN', function () {

//    try {
//        var StudentLeaveDetailsID_TO_Delete = $(this).closest('td').find('#id_For_Delete').val();

//        var Studentid = $(this).closest('td').find('#StudentId_TOShow').val();
//        var row = $(this).closest("tr");

//        var row12 = confirm("Are you sure you want  to delete the leave Details ?");
//        debugger;
//        if (row12 == true) {

//            var bt = "Delete";
//            /* alert(bt)*/
//            $.ajax({
//                url: "/Attendance/ApplyStudentLeave?submitButton=" + bt + "&StudentLeaveDetailsID_TO_Delete=" + StudentLeaveDetailsID_TO_Delete,
//                type: "POST",
//                success: function (response) {

//                    $(".ErrorMessageSpan").empty();
//                    $('#successMessage').text(response.message);


//                    stp_tblStudentApplyLeave_SelectById_ByAdmin(Studentid);
//                }
//                ,
//                error: function (xhr, status, error) {

//                    $("#followingfieldsErrorSPAN").text("Something Error");
//                    //console.log(xhr.responseText); // Log any error response
//                }
//            })

//            window.scrollTo(0, 0);
//            var rowcount1 = $("#ViewStudentLeaves_Table tbody tr").length;
//            if (rowcount1 <= 0) {
//                $("#ViewStudentLeaves_Table").hide();
//            }
//            else {

//                $("#ViewStudentLeaves_Table").show();
//            }
//        }



//    } catch (e) {

//        $("#followingfieldsErrorSPAN").text("Something Error");
//    }
//});














//$(document).ready(function () {
//    debugger;
//    var valo = $("#followingfieldsErrorSPAN").text();
//    alert(valo)
//    $("#followingfieldsErrorSPAN").on("input", function () {
//        var valo = $("#followingfieldsErrorSPAN").text();
//        alert(valo)
//        if (valo == " ") {
//            $("#followingfieldsErrorSPAN").text('');
//            $(this).removeClass('followingfieldsErrorSPAN');
//            $("#followingfieldsErrorSPAN").hide();
//        }

//    });
//});

//$(document).ready(fun342);
//function fun342() {

//    debugger;
//    $("#followingfieldsErrorSPAN").hide();
//    var valo = $("#mySpan").text();
//    alert(valo)
//    if (valo == "") {
//        $("#followingfieldsErrorSPAN").text('');
//        $(this).removeClass('followingfieldsErrorSPAN');
//    }
//};




//$(document).ready(function () {
//    $("#HAlfdayLB").hide();
//});


//This is for Hide date fields based on click of radio buttons





//This For Shows Following Fields have invalid Data  message
//$("#savebutton").click(fun55);
//function fun55() {

//    //var valo = $("#mySpan").text();
//    //alert(valo)
//    //var valo12 = $("#myPP").val();
//    //alert(valo12)
//    //$("#LAbel12").text(valo);


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





//This for Return Success message
//$("#alertmessage").show().delay(9000).fadeOut();




