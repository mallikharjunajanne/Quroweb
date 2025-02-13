
////==>> Select All Function
$('#chkCheckAll').on('click', function () {
   //debugger;
    var isChecked = $(this).prop('checked');

    $('#Admissiontbl tbody input[type="checkbox"]:not(:disabled)').each(function () {
        if ($(this).is(':visible')) {
            $(this).prop('checked', isChecked);
        }
    });
});

$('#btnAddtoProfile').click(function () {

});


$(document).on('click', '#Confirmadmissiontable #btnAddtoProfile', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    debugger;
    var StrJoinDate = "Expected joining date should not  be less than today's date ";
    var strDupAdmNo = "Admission number already exists ";
    
   // var chkarray = [];//new string[grdUsers.Rows.Count];

    var Attendancedataparent = [];
    //var DepartmentClassNames = $('#dropdown_Department_MA option:selected').text();
    //var SubClassName = $('#ddlInstanceSubclassification option:selected').text();
    //var SlotName = $('#dropdown_Slots_MA option:selected').text();
    //var isChecked = $('#_chkSMSStudent').prop('checked');
    //var checkboxStatus = isChecked ? true : false;
    var usercount = 0; // Initialize user count
    var chkarray = new Array($("#tbladmissionsearchresults tbody tr").length);
    var allChecked = true;
    $("#tbladmissionsearchresults tbody tr").each(function (i, parentRow) {
        // Find the checkbox inside the current row
        var chkselect = $(parentRow).find("#chkSelect");

        // Check if the checkbox is unchecked
        if (!chkselect.prop("checked")) {
            allChecked = false; // If any checkbox is unchecked, set to false
        }
    });
    if (allChecked) {
        $("#tbladmissionsearchresults tbody tr").each(function (i, parentRow) {
            // Find the checkbox inside the current row
            var chkselect = $(parentRow).find("#chkSelect");

            // Check if the checkbox is checked
            if (chkselect.prop("checked") === true) {
                usercount = usercount + 1; // Increment user count if checked
            }

            var ddlSubclassification = $(parentRow).find("#ddlSubclassification").val();
            var txtRegistrationNumber = $(parentRow).find("#txtRegistrationNumber").val();
            var txtDateOfJoining = $(parentRow).find("#txtDateOfJoining").val();
            var txtAdmissionnumber = $(parentRow).find("#txtAdmissionnumber").val();

            // Expected Joining Date Validation
            if (txtDateOfJoining !== "") {
                // Convert the Date of Joining value to a Date object and compare
                var joiningDate = new Date(txtDateOfJoining);
                var currentDate = new Date();

                // If the Date of Joining is earlier than the current date
                if (joiningDate < currentDate) {
                    // Display the message and focus on the checkbox
                    lblDetailsMsg.text(StrJoinDate + " for Reg.No " + txtRegistrationNumber + " at row " + (i + 1));
                    chkCheckAll.focus();
                    return false; // Exit the loop
                }
            }
            else {
                // If the Date of Joining is empty, display a different message
                lblDetailsMsg.text("Select Expected Joining Date for Reg.No " + txtRegistrationNumber + " at row " + (i + 1));
                chkCheckAll.focus();
                return false; // Exit the loop (similar to Exit Sub in VB.NET)
            }

            // Class and Section Validation
            if (ddlSubclassification > 0) {
                // Do something if ddlClass has a valid selection
            }
            else {
                // Show the message if no valid selection
                lblDetailsMsg.text("Assign Class & Section for Reg.No " + txtRegistrationNumber + " at row " + (i + 1));
                chkCheckAll.focus(); // Focus on the checkbox
                return false; // Exit the loop (similar to Exit Sub in VB.NET)
            }

            //Admission Number Validation
            if (txtAdmissionnumber !== "") {
                // Do something if Admission Number is provided
            }
            else {
                lblDetailsMsg.text("Provide Admission No for Reg.No " + txtRegistrationNumber + " at row " + (i + 1));
                chkCheckAll.focus(); // Focus on the checkbox
                return false; // Exit the loop (similar to Exit Sub in VB.NET)
            }

            if (txtAdmissionNumber !== "") {
                admissiono = txtAdmissionNumber;
                //dctAdmissioninfo["AdmissionNo"] = admissiono;

                // Check for duplicate Admission Numbers in the array (chkarray in JS)
                if (!chkarray.includes(admissiono)) {
                    chkarray[i] = admissiono; // Add the admission number to the array
                } else {
                    // Duplicate found, show message
                    lblDetailsMsg.text("Duplicate Admission Numbers are not allowed.");
                    $("#chkCheckAll").focus(); // Focus on the checkbox
                    return false; // Exit the loop, similar to Exit Sub in VB.NET
                }
            }
            //isAdminNoexists = ObjApplicationFormHeritage.CheckAdmissionNoInfo(dctAdmissioninfo)
            //If isAdminNoexists = 1 Then
            //lblDetailsMsg.Text = strDupAdmNo & "given for Reg.No " & lblRegNo.Text & " at row " & i + 1
            //chkCheckAll.Focus()
            //Exit Sub
            //End If

            var Attendancedatachild = {
                'Instancesubclassificationid': $(parentRow).find("#ddlSubclassification").val(),
                'RegistrationNumber': $(parentRow).find("#txtRegistrationNumber").val(),
                'DateOfJoining': $(parentRow).find("#txtDateOfJoining").val(),
                'AdmNo': $(parentRow).find("#txtAdmissionnumber").val(),
                'UserName': $(parentRow).find("#txtUserName").val(),
                'RegistrationUserid': $(parentRow).find("#txtRegistrationUserid").val(),
            };

            Attendancedataparent.push(Attendancedatachild);
            $.ajax({
                url: '/Admin/ConfirmAdmissionInsertion',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(Attendancedataparent),
                success: function (response) {
                    if (response == "1216") {
                        $("#ValidationMessage").text("Error: Invalid admission number. Please try again.");
                        return false;
                    }
                    else if (response == "Fail") {
                        $("#ValidationMessage").text("Error: Invalid admission number. Please try again. Transfering to Student Profile.");
                        return false;
                    }
                    else if (response == "Success") {
                        return true;
                    }
                    else if (response == "Admission number already exists.") {
                        $("#ValidationMessage").text(strDupAdmNo + " given for Reg.No " + txtRegistrationNumber + " at row " + (i + 1));
                        //$("#ValidationMessage").text("Admission number already exists.");
                        return false;
                    }
                    else {
                        $("#ValidationMessage").text("Select User(s) to confirm Admission.");
                        return true;
                    }
                    $("#ValidationMessage").text("Attendance saved successfully .");
                    $(".errorofallemployeeattendence").text("Attendance saved successfully .");
                    $('.alert-success p').text("Attendance saved successfully .");
                    $(".alert-success").show().delay(6000).fadeOut()
                    loaddingimg.css('display', 'none');
                    $("#Serach_MA #deletebutton #deleteinner").text("");

                    // console.log('Success:', response);
                },
                error: function (status, error) {
                    loaddingimg.css('display', 'none');
                    //  console.error('Error:', status, error);
                }
            });





            //var Attendancedatachild = {
            //    'RegistrationNumber': $(parentRow).find("#ddlSubclassification").val(),
            //    'RegistrationNumber': $(parentRow).find("#txtRegistrationNumber").val(),
            //    'RegistrationNumber': $(parentRow).find("#txtDateOfJoining").val(),
            //    'RegistrationNumber': $(parentRow).find("#txtAdmissionnumber").val(),


            //    //'Ispresent': [],
            //    //'studentPhno': $(parentRow).find("#_mentoruserphno").val(),
            //    //'StudentSMS': $(parentRow).find("#_studentSMS").val(),
            //    //'MentorName': $(parentRow).find("#_MentorName").val(),
            //    //'DepartmentClassNames': DepartmentClassNames,
            //    //'SlotName': SlotName,
            //    //'checkboxStatus': checkboxStatus,
            //};

            //debugger;
            //$("#tblMAsearchresults thead th").each(function (j, th) {
            //    //if (j >= 4 && j < $("#tblMAsearchresults thead th").length) {
            //    //    var isChecked = $(parentRow).find('td:eq(' + j + ') input[type="checkbox"]').prop('checked');
            //    //    Attendancedatachild.Ispresent.push(isChecked ? "1" : "0");
            //    //}

            //    if (j >= 4 && j < $("#tblMAsearchresults thead th").length) {
            //        // Find the input in the current cell
            //        var input = $(parentRow).find('td:eq(' + j + ') input[type="checkbox"], td:eq(' + j + ') select');

            //        // Check if the input is a checkbox
            //        if (input.is('input[type="checkbox"]')) {
            //            var isChecked = input.prop('checked');
            //            Attendancedatachild.Ispresent.push(isChecked ? "1" : "0");
            //        }
            //        // Check if the input is a dropdown (select)
            //        else if (input.is('select')) {
            //            var selectedValue = input.val();
            //            // You can add logic here to handle the selected value
            //            // For example, if you want to store it as a "1" or "0" based on the value, you can check the selected value
            //            Attendancedatachild.Ispresent.push(selectedValue); // Or apply any logic if needed
            //        }
            //    }
            //});

            //Attendancedataparent.push(Attendancedatachild);
        });
        // Check if at least one checkbox is selected
        if (usercount > 0) {
            // Proceed with the logic if users are selected
        }
        else {
            // Show validation message if no users are selected
            $("#ValidationMessage").text("Select User(s) to confirm Admission.");
            //$("#ValidationMessage").css("color", "red"); // Optional: Change color for error message
            //// Optionally, set focus on "chkCheckAll" (if it's a checkbox to select all)
            //$("#chkCheckAll").focus();
        }
    }


    //$.ajax({
    //    url: '/Rolewise/PostAttendanceSave',
    //    method: 'POST',
    //    contentType: 'application/json',
    //    data: JSON.stringify(Attendancedataparent),
    //    success: function (response) {
    //        $(".errorofallemployeeattendence").text("Attendance saved successfully .");
    //        $('.alert-success p').text("Attendance saved successfully .");
    //        $(".alert-success").show().delay(6000).fadeOut()
    //        loaddingimg.css('display', 'none');
    //        $("#Serach_MA #deletebutton #deleteinner").text("");

    //        // console.log('Success:', response);
    //    },
    //    error: function (status, error) {
    //        loaddingimg.css('display', 'none');
    //        //  console.error('Error:', status, error);
    //    }
    //});

});