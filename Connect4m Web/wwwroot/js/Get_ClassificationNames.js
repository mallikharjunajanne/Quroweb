

//Class Teacher Login Javascript Code Start
$(document).ready(function () {


    var LgUserid = $('#Lg_UserId_Txtid').val();
  
    var Ct_Roleid = $('#Teacher_Lg_Roleid_Txtid').val();



    /*alert(LgUserid);*/


    var currentDate = new Date();
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    var dateString1 = currentDate.toLocaleDateString(undefined, options);

    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
    var day = String(currentDate.getDate()).padStart(2, '0');


    var StartDate_EndDate = year + '-' + month + '-' + day;

    $("#currentDate").text(dateString1);
   /* debugger;*/
    /*alert(LgUserid);*/
    if (LgUserid == 32886) {

        $('#Admin_Lg_Div_id').remove();
        $('#Ct_Lg_DivId').show();
        $('#Cl_Subject_DD_by_slot_Dd').change(fun200);
        /*alert("If condition alert");*/
       
    }
    else {
        $('#Admin_Lg_Div_id').show();
        $('#Ct_Lg_DivId').remove();
       /* $("form #Get_atd_btn").click(fun5);*/
    }




    function fun200() {
        /*  debugger;*/
        var ClassificationId = $('#CT_Classification_Id').val();
        var subClassificationId = $('#CT_InsClassSub_Id').val();

        $.ajax({
            url: "/Attendance/Slot_by_subclassification?ClassificationId=" + ClassificationId + "&SubClassificationId=" + subClassificationId,
            type: "GET",
            success: fun101
        });
        function fun101(response) {
            /*  debugger;*/
            $("#SubjectName").html(response);
        }
    }


   // $("#Get_atd_btn").click(fun201);

   $("#Get_atd_btn").unbind("click").click(fun201);

   
    /*function fun201() {*/
    function fun201(event) {


        

        var checkbox = $('#chk_seacrh_icon');

        if (checkbox.is(':checked')) {
            /*alert("checked is True");*/
        }
        else {
           /* alert("checked is False");*/
        }



        event.stopImmediatePropagation();
        
        $("#MessageID").text("");
        if (LgUserid == 32886) {
                      
            var ClassificationId = $('#CT_Classification_Id').val();
            var subClassificationId = $('#CT_InsClassSub_Id').val();
            var SubjectSlotID = $("#SubjectName").val();
            var Startdate = StartDate_EndDate;
            var EndDate = StartDate_EndDate;


            var dropdownCt_L = document.getElementById("CT_Classification_Id");
            var selectedOption1 = dropdownCt_L.options[dropdownCt_L.selectedIndex];
            var selectedTexts = selectedOption1.text;      
           
            var dpdownCt_L = document.getElementById("CT_InsClassSub_Id");
            var selecteOption2 = dpdownCt_L.options[dpdownCt_L.selectedIndex];
            var selecteTexts = selecteOption2.text;


            var ViewBagMyData = selectedTexts + " " + selecteTexts;


            if (ClassificationId == '') {

                $("#validation2").text("Following fields have invalid data :");
                $("#validation1").text("Department");

            } else if (subClassificationId == '') {

                $("#validation1").text("Class");

            } else if (SubjectSlotID == '') {

                $("#validation1").text("Slot");
            } else {

                $("#validation1,#validation2").text('');
                $(this).removeClass('validation1', 'validation2')


                $.ajax({
                    url: "/Attendance/GetAttedanceDetails?Startdate=" + Startdate + "&EndDate=" + EndDate + "&InstanceClassificationId=" + ClassificationId + "&InstanceSubClassificationId=" + subClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&ViewBagMyData=" + ViewBagMyData + "&CreatedBy=" + LgUserid,
                    type: "GET",
                    success: fun102
                });
                function fun102(resp) {
                    /* debugger;*/
                    $("#GetAttendance_Table").html(resp);
                }
            }
        }
        else {      

            var InstanceClassificationId = $("#CFNID1").val();
            var InstanceSubClassificationId = $("#SCFNID1").val();
            var SubjectSlotID = $("#SubjectName").val();
            var Startdate = $('#StartDateid').val();
            var EndDate = $("#EndDateid").val();



            var dropdown = document.getElementById("CFNID1");
            var selectedOption = dropdown.options[dropdown.selectedIndex];
            var selectedText = selectedOption.text;
           


           
            var dpdown = document.getElementById("SCFNID1");
            var selecteOption = dpdown.options[dpdown.selectedIndex];
            var selecteText = selecteOption.text;


            var ViewBagMyData = selectedText + " " + selecteText;



           
            if (Startdate > EndDate) {

                $("#validation1").text("Start date cannot be greater than end date.");

            } else if (InstanceClassificationId == '') {

                $("#validation2").text("Following fields have invalid data :");
                $("#validation1").text("Department");

            } else if (InstanceSubClassificationId == '') {

                $("#validation2").text("Following fields have invalid data :");
                $("#validation1").text("Class");

            } else if (SubjectSlotID == '') {

                $("#validation2").text("Following fields have invalid data :");
                $("#validation1").text("Slot");

            } else if (Startdate == '') {

                $("#validation2").text("Following fields have invalid data :");
                $("#validation1").text("Startdate");

            } else if (EndDate == '') {

                $("#validation2").text("Following fields have invalid data :");
                $("#validation1").text("EndDate");

            } else {

                $("#validation1,#validation2").text('');
                $(this).removeClass('validation1', 'validation2')


                $.ajax({
                    url: "/Attendance/GetAttedanceDetails?Startdate=" + Startdate + "&EndDate=" + EndDate + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&ViewBagMyData=" + ViewBagMyData + "&CreatedBy=" + LgUserid,
                    type: "GET",
                    success: fun6
                });
                function fun6(resp) {
                    /* debugger;*/
                    $("#GetAttendance_Table").html(resp);
                }
            }
        }


    }



});

//Class Teacher Login Javascript Code End










//Admin Login JavaScript code Start

$("#DCFN10").change(fun101);
function fun101() {
    debugger;
    var value = $('#CFNID1').val();

    $.ajax({
        url: "/Attendance/Get_SubClassificationNames_ByInstanceClassifications?InstanceClassificationId=" + value,
        type: "GET",
        success: fun1011
    });
    function fun1011(response) {
        /*debugger;*/
        $("#SCFNID1").html(response);
    }

}
$("#SCFNID2").change(fun102);
function fun102() {
    /*  debugger;*/
    var SubClassificationId = $('#SCFNID1').val();


    $.ajax({
        url: "/Attendance/Slot_by_subclassification?SubClassificationId=" + SubClassificationId,
        type: "GET",
        success: fun1012
    });
    function fun1012(response) {
        /*  debugger;*/
        $("#SubjectName").html(response);
    }

}






$("form #submit-btn").click(function () {


    $("#MessageID").text("");
    $("#MailS_ErrorMsg").text("");

    var LgUserid = $('#Lg_UserId_Txtid').val();
    var SubjectSlotID = $("#SubjectName").val();
    var leng = $('#TableData tr').length;

    var dataList = []; // Create an empty array to store the data

   

    for (var i = 2; i < leng; i++) {
    
        var data = {}; // Create an object to hold the data for each row

        var formattedDate  = $("#A_PostingDate").text();

        var parts = formattedDate.split("/");
        var day = parts[0];
        var month = parts[1];
        var year = parts[2];

       
        var dateValue = year + "-" + month + "-" + day;
   
        if (document.getElementById(i).checked == true) {          
            data.Ispresent = "1";
            data.Name = document.getElementById(i).title;
            data.UserId = document.getElementById(i).name;
            data.comment = "0";
            data.Dropdownvalue = 0;
            data.AttendanceTypeId = 0;

            debugger;
            if ($("#solid6").is(":checked"))
            {
                data.StudEmail = $('#TableData tr:eq(' + i + ') td:eq(8) #Stu_Email').val();                
            }          
           data.ParentEmail = $('#TableData tr:eq(' + i + ') td:eq(9) #Pa_Email').val();
        }
        else {
         
            data.Ispresent = "";
            data.Name = $('#TableData tr:eq(' + i + ') td:eq(3)').text();
            data.UserId = $('#TableData tr:eq(' + i + ') td:eq(1)').text();
            data.comment = $('#TableData tr:eq(' + i + ') td:eq(7) #commentTextArea').val();          
            data.Dropdownvalue = $('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').text();
            data.AttendanceTypeId = $('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').val();

            var stEmail = "";            
         
            if ($(".Email_Stu_Checkboxid").is(":checked"))
            {
                stEmail = $('#TableData tr:eq(' + i + ') td:eq(8)').text().trim();               
            }
            data.StudEmail = stEmail;

            if ($(".Email_Par_Checkboxid").is(":checked")) {
                var ParentEmail = $('#TableData tr:eq(' + i + ') td:eq(9)').text().trim();            
                data.ParentEmail = ParentEmail;
            }
            


            if (data.AttendanceTypeId == null || data.AttendanceTypeId == "--Select--") {
                data.AttendanceTypeId = 0;
            }
            else {
                data.AttendanceTypeId  =parseInt($('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').val(), 10);
                
            }
            if (data.Dropdownvalue == null || data.Dropdownvalue == "--Select--") {
             
                data.Dropdownvalue = 0;
                
            }
            else {
                data.Dropdownvalue = $('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').text();
            
                //data.AttendanceTypeId = $('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').val();
            }
        }
        data.CreatedBy = LgUserid;
        data.SubjectSlotID = SubjectSlotID;
        data.dateValue = dateValue;
        
        
        dataList.push(data);
    }
   
    var formData = new FormData();
    formData.append('dataList', JSON.stringify(dataList));
    
    $.ajax({
        
        url: "/Attendance/Post_Attendance",
       // url: "/Attendance/post_ate",  // testing mails url
        type: "POST",
        
        data: formData,
        contentType: false,
        processData: false,
        success: function (result) {
              debugger;

            var data1 = result.data1;
            var successCount = result.successCount;
            var failureList = result.failureList;
            var successList = result.successList;
            var successMessage = "";
          

            if (data1 != 0) {
               
                document.getElementById('MessageID').innerHTML = "Attendance saved successfully";
            } else {
               
                $("#MessageID").text("Attendance Not Posted").fadeOut(5000);
            }

         
            if (successList.length > 0) {
              
                successMessage = "Email successfully sent to Students.For User" + successList.join(", ");
                document.getElementById('MailS_ErrorMsg').innerHTML = successMessage;
            } else {
                var FailureMessage = "Email successfully sent to Students.For User" + failureList.join(", ") +"No Email Id's Exists for Students.";
              
                document.getElementById('MailS_ErrorMsg').innerHTML = FailureMessage;
            }    
        }
    });
});

