function CallToAjax(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}
function handleAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {

    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        contentType: false,
        processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };

    if (hasFileUpload) {
        ajaxOptions.processData = false;
        ajaxOptions.contentType = false;
    }

    $.ajax(ajaxOptions);
}


$(document).ready(function () {
    debugger;
    //======>>> Classification Dropdown
    fetchDataAndPopulateDropdown(
        '/Attendance/FastAttendanceClassification',         // URL for data fetching
        '#Ddldepartment',                                   // Dropdown selector
        'value',                                             // Field name for option text
        'text',                                             // Field name for option values       
        'manageClassification'                              // Response value return class name
    );

    //=======>>> Slots Dropdown
    fetchDataAndPopulateDropdown(
        '/Attendance/FastAttendancegetSlots',         // URL for data fetching
        '#Ddslots',                                   // Dropdown selector
        'slotId',                                             // Field name for option text
        'slotName',                                             // Field name for option values
        'slotSubjectnames'                              // Response value return class name
    );

});


function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    CallToAjax('GET', url,
        function (response) {

            debugger;
            var dataToPopulate = Array.isArray(response) ? response : response[Responsevalues] || [];
            populateDropdown(dataToPopulate, dropdownSelector, valueField, textField);
        },
        function (status, error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        }
    );
}

function populateDropdown(data, dropdownSelector, valueField, textField) {
    var dropdown = $(dropdownSelector);
    debugger;
    //dropdown.empty(); // Clear existing options
    dropdown.append($('<option>', {
        value: '',
        text: '---Select---'
    }));
    $.each(data, function (index, item) {
        dropdown.append($('<option>', {
            value: item[valueField],
            text: item[textField]
        }));
    });
}

$('#Ddldepartment').change(function () {
    var selectedValues = $('#Ddldepartment').val();
    debugger;
    Departmentbysubclassdd(selectedValues);
});


function Departmentbysubclassdd(Departmentvalue) {
    $.ajax({
        url: '/Attendance/FastAttendancegetSubclass?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#DdlSubClass';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}


//=======<< Date Compare >>

//function DatesCompare() {
//    try {
//        var StartdateInput = $("#Startdatetxt").val();
//        var Startdate = new Date(StartdateInput);

//        var formattedStartDate = GetDateFormat(Startdate);

//        if (Startdate <= new Date()) {
//            $('#Ermsgsp').text("You cannot select a start date less than or equal to the current date.");
//        } else {
//            $('#Ermsgsp').text("");
//        }
//    } catch (error) {
//        console.log(error);
//    }
//}

//-------------------***Date Compare
/*$(".form-group #Startdatetxt").on("change", DatesCompare);*/
function getCurrentDateFormatted() {
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

$("#Fastattendanceform").on('submit', function () {
    event.preventDefault();
    event.stopImmediatePropagation();
    debugger;
    $("#ErrorMessage").text('');

    var StartdateInput = $("#Startdatetxt").val();
    var Startdate = new Date(StartdateInput);
    var formattedCurrentDate = getCurrentDateFormatted();
    var Subclasstext=$('#DdlSubClass option:selected');
    if (StartdateInput > formattedCurrentDate) {
        $('#ErrorMessage').text("you cannot select the start date less than Effective Date for" + Subclasstext);
       
        return; 
    } else {
        $('#ErrorMessage').text("");
    }

    setTimeout(function () {

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            var Subclassnames = $('#DdlSubClass').val();

            var formData = $('#Fastattendanceform').serialize();

            var url = "/Attendance/Get_FastAttendance_Table";

            handleAjax('GET', url, formData,
                function (resp) {
                    loaddingimg.css('display', 'none');
                    if (resp.returnmessage == "0") {
                        debugger;
                        $('#Fast_Attendance_Table_data').empty();
                        var selectedOptions = $('#DdlSubClass option:selected');
                        var subClassId = resp.subClassid;

                        if (selectedOptions.filter('[value="' + subClassId + '"]').length > 0) {
                            var subclasstext = selectedOptions.filter('[value="' + subClassId + '"]').text();
                            $("#ErrorMessage").text("you cannot select the start date less than Effective Date for " + subclasstext);
                        } 
                    } else if (resp.returnmessage == "1") {
                        return;
                    }else{
                        debugger;                       

                        $("#Fast_Attendance_Table_data").html(resp);
                    }      
                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );

        }
    }, 50);
});

//=====<<** Table in Date Show function **>>
var Dates = $('#Startdatetxt').val();
var SelectedDate = formatDateAndSetText(Dates);
$('#Startdatetexttbltd').text(SelectedDate);

function formatDateAndSetText(inputDate) {
    var dateParts = inputDate.split("-");
    var formattedDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    debugger;
    return formattedDate; 
}







//$("#F_IN_Class").change(fun01);
//function fun01() {
//    debugger;
//    var value = $('#F_IC_Id').val();
//    //var value = $('#Ddldepartment').val();

//    $.ajax({
//        url: "/Attendance/F_Get_Inc_By_Subclass?InstanceClassificationId=" + value,
//        type: "GET",
//        success: fun02
//    });
//    function fun02(response) {
//        /*debugger;*/
//        $("#F_IC_Sub_Id").html(response);
//    }

//}
////Fast Attendance Screen Dropdown script End




//Get Attendance Form button click after fire script start  
//by using form Id 

//$(document).ready(function () {

//    debugger;
//    function validateForm() {
//        var Startdates = $('#FA_StartdateId1').val();
//        var InstanceClassificationId = $('#F_IC_Id').val();
//        var InstanceSubClassificationId = $('#F_IC_Sub_Id').val();
//        var SubjectSlotID = $('#myDropdown').val();

//        var Stdate = new Date($('#FA_StartdateId1').val());
//        var today = new Date();

//        var Year = Stdate.getFullYear();
//        var m = ('0' + (Stdate.getMonth() + 1)).slice(-2);
//        var date = ('0' + Stdate.getDate()).slice(-2);
//        var Rdate = Year + '-' + m + '-' + date;

//        var ToYear = today.getFullYear();
//        var Tom = ('0' + (today.getMonth() + 1)).slice(-2);
//        var Todate = ('0' + today.getDate()).slice(-2);
//        var Gettodaydate = ToYear + '-' + Tom + '-' + Todate;


//        var validationMessage = "";
//        var DatesvalidationMessage = "";
//        var hasError = false;

//        debugger;
//        // Perform your validation checks

//        if (Startdates === "") {

//            validationMessage += "Start Date is Required.<br>";
//            hasError = true;
//        } else if (Rdate > Gettodaydate) {

//            validationMessage += "Start Date should not be greater than today.<br />";
//            hasError = true;
//        }

//        if (InstanceClassificationId === "") {
//            validationMessage += "Department is required.<br>";
//            hasError = true;
//        }

//        if (InstanceSubClassificationId.length === 0) {
//            validationMessage += "Class is required.<br>";
//            hasError = true;
//        }

//        if (SubjectSlotID === "") {
//            validationMessage += "Slot is required.<br>";
//            hasError = true;
//        }

//        return {
//            validationMessage: validationMessage,
//            DatesvalidationMessage: DatesvalidationMessage,
//            hasError: hasError
//        };
//    }

//    $("#F_At_Main_Form").submit(function (event) {
//        debugger;

//        $("#validation1").html(""); // Clear validation message div 1
//        $("#validation2").html(""); // Clear validation message div 2
//        $("#validation3").html(""); // Clear validation message div 2
//        $("#Fast_Attendance_Table_data").empty();

//        $('#ErrorMessage').text('');

//        var validation = validateForm();



//        debugger;
//        if (validation.hasError) {
//            $("#validation1").html(validation.validationMessage);
//            $("#validation2").html("Following fields have invalid data:");
//            $("#validation3").html(validation.DatesvalidationMessage);
           
//        } else {
//            // Perform AJAX request
//            var formData = $(this).serialize();
//            $.ajax({
//                url: "/Attendance/Get_FastAttendance_Table",
//                type: "Get",
//                data: formData,
//                success: function (response) {
//                    debugger;
//                    if (response.returnmessage == "1") {
//                        $("#ErrorMessage").text("you cannot select the start date less than Effective Date for" + response.instanceSubClassid);
//                    } else {                    
//                        $("#Fast_Attendance_Table_data").html(response);
//                    }
//                },
//                error: function () {
//                    alert("An error occurred during the request.");
//                }
//            });
//        }

//        event.preventDefault(); // Prevent default form submission
//    });


//    //$("#F_At_Main_Form").submit(function (event) {
//    //    debugger;

//    //    var Startdates = $('#FA_StartdateId1').val();
//    //    var InstanceClassificationId = $('#F_IC_Id').val();
//    //    var InstanceSubClassificationId = $('#F_IC_Sub_Id').val();
       

//    //    var SubjectSlotID = $('#myDropdown').val();

//    //    //feature Date validation
//    //    var Stdate = new Date($('#FA_StartdateId1').val());
//    //    var today = new Date();

//    //    var Year = Stdate.getFullYear();
//    //    var m = ('0' + (Stdate.getMonth() + 1)).slice(-2);
//    //    var date = ('0' + Stdate.getDate()).slice(-2);
//    //    var Rdate = Year + '-' + m + '-' + date;

//    //    var ToYear = today.getFullYear();
//    //    var Tom = ('0' + (today.getMonth() + 1)).slice(-2);
//    //    var Todate = ('0' + today.getDate()).slice(-2);
//    //    var Gettodaydate = ToYear + '-' + Tom + '-' + Todate;


//    //    event.preventDefault(); // Prevent default form submission

//    //    var validationMessage = "";
//    //    var validation2Message = "";
//    //    var hasError = false;

//    //    if (Rdate > Gettodaydate) {
        
//    //        validationMessage += "Start Date should not be greater than today.<br>";
//    //        hasError = true;
//    //    }     


//    //    if (Startdates === "") {
//    //        validationMessage += "Start Date is Required.<br>";
//    //        hasError = true;
//    //    }

//    //    if (InstanceClassificationId === "") {

//    //        validationMessage += "Department is required.<br>";
//    //        hasError = true;
//    //    }

//    //    if (InstanceSubClassificationId.length === 0) {

//    //        validationMessage += "Class is required.<br>";
//    //        hasError = true;
//    //    }

//    //    if (SubjectSlotID === "") {

//    //        validationMessage += "Slot is required.<br>";
//    //        hasError = true;
//    //    }
        
//    //    if (hasError) {
//    //        validation2Message = "Following fields have invalid data:<br>";
//    //        $("#validation1").html(validationMessage);
//    //        $("#validation2").html(validation2Message);
           
//    //    } else {

//    //        $("#validation1").html("");
//    //        $("#validation2").html("");
       

//    //        var formData = $(this).serialize(); // Serialize form data


//    //        //var selectedValues = $("#F_IC_Sub_Id").val();
//    //        ////formData += "&SelectedValues=" + selectedValues.join(",");
//    //        //for (var i = 0; i < selectedValues.length; i++) {
//    //        //    formData += "&SelectedValues=" + selectedValues[i];
//    //        //}
//    //        $.ajax({
//    //            url: "/Attendance/Get_FastAttendance_Table",
//    //            type: "Get",
//    //            data: formData,
//    //            success: function (response) {
//    //                /*console.log(response);*/

//    //                $("#Fast_Attendance_Table_data").html(response);

//    //            },
//    //            error: function () {
//    //                // Handle error, if any
//    //                alert("An error occurred during the request.");
//    //            }
//    //        });
//    //    }
//    //});
//});






//Get Attendance Form button click after show table script start && and table view click submit button fire script

$(document).ready(function () {
    $("#submitBtn").click(function (e) {
        debugger;
        //----<New>
        //var formData = $('#Fastattendanceform').serialize();

        
        

        //=====<< First Option >>
        //$(".Fast_TextArea").each(function () {
        //    var textareaValue = $(this).val();
        //    var instanceSubClassificationId = $(this).closest("tr").find("td:first-child").text();

        //    Userids.push({
        //        "instanceSubClassificationId": instanceSubClassificationId,
        //        "textareaValue": textareaValue
        //    });
        //});

        //var requestData = {           
        //    FormData: formData,
        //    Userids: Userids
        //};

        ////===== << Secound Option >>
        ////$(".Fast_TextArea").each(function () {
        ////    var textareaValue = $(this).val();
        ////    // Extract the Index from the textarea ID
        ////    var index = $(this).attr('id').replace('Fast_TextArea_Id', '');

        ////    formData.push({
        ////        "instanceSubClassificationId": $("#Fast_TextArea_Id" + index).closest("tr").find("td:first-child").text(),
        ////        "textareaValue": textareaValue
        ////    });
        ////});

        //var url = "/Attendance/FastAttendance";
        //handleAjax('POST', url, requestData,
        //    function (result) {
        //        if (result == 0) {

        //            $('#ErrorMessage').text("Attendance already posted for " + InstanceSubClassificationName + " class on " + DateSelected + " for " + SubjectSlotName);

        //        }
        //        else if (result == -2) {

        //            $('#ErrorMessage').text("Entered REG. NO. 's are invalid for " + InstanceSubClassificationName + " class on " + DateSelected + " for " + SubjectSlotName + " ");

        //        }
        //        else if (result == 1) {

        //            $('#ErrorMessage').text('Attendance posted successfully.');

        //        }
        //    },
        //    function (status, error) {
        //        console.error("Error fetching data:", error);                
        //    },
        //    true
        //);





        //$.ajax({

        //    url: "/Attendance/FastAttendance?InstanceClassificationId=" + InstanceClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&Startdate=" + Startdate + "&CreatedBy=" + LgUserid,
        //    type: "POST",
        //    //data: { formData: formData },
        //    data: requestData,
        //    success: function (result) {

        //        debugger;
        //        var errorMessage = document.getElementById('ErrorMessage');
        //        if (result == 0) {

        //            $('#ErrorMessage').text("Attendance already posted for " + InstanceSubClassificationName + " class on " + DateSelected + " for " + SubjectSlotName);

        //        }
        //        else if (result == -2) {

        //            $('#ErrorMessage').text("Entered REG. NO. 's are invalid for " + InstanceSubClassificationName + " class on " + DateSelected + " for " + SubjectSlotName + " ");

        //        }
        //        else if (result == 1) {

        //            $('#ErrorMessage').text('Attendance posted successfully.');

        //        }
        //        console.log(result);
        //    },
        //    error: function (xhr, status, error) {
        //        // Handle the error response
        //    }
        //});



        ////----<Old>

        $('#ErrorMessage').text('');

        e.preventDefault();
        debugger;
        var Startdate = $('#Startdatetxt').val();
        var DateSelected = formatDateAndSetText(Startdate);
        var InstanceClassificationId = $('#Ddldepartment').val();
        var InstanceSubClassificationName = $('#DdlSubClass option:selected').text();
        var SubjectSlotID = $('#Ddslots').val();
        var SubjectSlotName = $('#Ddslots option:selected').text();

       
        //var Startdate = $('#FA_StartdateId1').val();
        //var LgUserid = $('#Lg_UserId_FastTxtid').val();
        //var InstanceClassificationId = $('#F_IC_Id').val();
        //var InstanceSubClassificationId = $('#F_IC_Sub_Id').val();
        //var InstanceSubClassificationName = $('#F_IC_Sub_Id option:selected').text();      
        //var SubjectSlotName = $('#myDropdown option:selected').text();

        var formData = [];

        $(".Fast_TextArea").each(function () {
            var textareaValue = $(this).val();
            var instanceSubClassificationId = $(this).closest("tr").find("td:first-child").text();

            formData.push({
                "instanceSubClassificationId": instanceSubClassificationId,
                "textareaValue": textareaValue
            });
        });

        $.ajax({
            url: "/Attendance/FastAttendance?InstanceClassificationId=" + InstanceClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&Startdate=" + Startdate,
            type: "POST",
            data: { formData: formData },
            success: function (result) {              
                debugger;

                $('#submitBtn').prop('disabled', false);
               
                if (result == 0) {
                    $('#ErrorMessage').text("Attendance already posted for " + InstanceSubClassificationName + " class on " + DateSelected + " for " + SubjectSlotName);
                 }
                else if (result == -2) {

                    $('#ErrorMessage').text("Entered REG. NO. 's are invalid for " + InstanceSubClassificationName + " class on " + DateSelected + " for " + SubjectSlotName + " ");

                } else if (result == -3) {
                    $('#ErrorMessage').text("You Cannot Post Attendance as No Students Exists in " + InstanceSubClassificationName + "  " + SubjectSlotName + " ");

                }
                else if (result == 1) {
                    $('#ErrorMessage').text('Attendance posted successfully.');                                     
                }
                console.log(result);
            },
            error: function (xhr, status, error) {
                // Handle the error response
            }
        });
    });

});

//Get Attendance Form button click after show table script End && and table view click submit button fire script