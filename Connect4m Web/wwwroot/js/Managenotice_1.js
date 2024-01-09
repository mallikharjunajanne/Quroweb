
/*------=======**** CREATE NOTICE SCREEN JAVASCRIPT CODE START ****=======------*/

function FileCallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
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
    $("#btnppostthisnotice").hide();

    // $("#Addnotice_div1").empty();
    $("#ManageNotices_CreateSMSNNotice_ViewDivid").empty();
    $("#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id").empty();

  


    /*------**** NOTICE TYPE DROPDOWN BIND THIS PLACE ****--------*/
     $.ajax({
        type: "GET",
        url: "/Admin/NoticeTypedd",
        dataType: "json",
        success: function (data) {
            $("#ENoticeTypeId_STXT").empty();
            debugger;
            $("#ENoticeTypeId_STXT").append('<option value="">---Select---</option>'); 
            $.each(data, function (index, item) {
                $("#ENoticeTypeId_STXT").append($('<option>', {
                    value: item.value,
                    text: item.text
                }));
            });
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        }
    });
    /*------**** NOTICE TYPE DROPDOWN BIND THIS PLACE ****--------*/


   // $("#NoticeDisplaylogin").show();
   
});

$("#ENoticeTypeId_STXT").change(function () {
    debugger;
    if ($(this).val() != "") {
        $("#NoticeDisplaylogindivid").hide();
    } else {
        $("#NoticeDisplaylogindivid").show();
    }
});


$(document).ready(function () {

    //const PostNoticeButton = document.getElementById("PostthisNotice_SaBtn");
    //PostNoticeButton.style.display = "none";
    //debugger;
    //alert("its working ....!");


    //// $("#Addnotice_div1").empty();
    //$("#ManageNotices_CreateSMSNNotice_ViewDivid").empty();
    //$("#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id").empty();

    //NoticeDropdown_CreateNotice_In_View();

    //$("#NoticeDisplaylogin").show();
    //$("#ENoticeTypeId_STXT").change(function () {
    //    debugger;
    //    if ($(this).val() != " ") {
    //        $("#NoticeDisplaylogin").hide();
    //    } else {
    //        $("#NoticeDisplaylogin").show();
    //    }
    //});


    //$.ajax({
    //    type: "GET",
    //    url: "/Admin/NoticeTypedd",
    //    dataType: "json",
    //    success: function (data) {
    //        $("#ENoticeTypeId_STXT").empty();
    //        debugger;
    //        $.each(data, function (index, item) {
    //            $("#ENoticeTypeId_STXT").append($('<option>', {
    //                value: item.value,
    //                text: item.text
    //            }));
    //        });
    //    },
    //    error: function (error) {
    //        console.error("Error fetching data:", error);
    //    }
    //});
});



$('#btnBackToSearch').click(function () {

    $('#Addnotice_div1').empty();
    $('#ManageNotices_CreateSMS_ViewDivid').empty();
    $('#ManagenoticeMaindiv').show();
});


$('#btnClear').click(function () {
    $('#Createnoticetypeform1')[0].reset();
});



function GetDateFormat(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
}


//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {
        var StartdateInput = $("#Startdatetxt").val();
        var EnddateInput = $("#Exdatetxt").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var formattedStartDate = GetDateFormat(Startdate);
        var formattedEndDate = GetDateFormat(Enddate);

        var errorElement = $('.compare');

        if (formattedStartDate != formattedEndDate) {
            if (Enddate <= Startdate) {
                $('#Ermsgsp').text(Edate + " must be greater than " + Sdate + ".");
            } else {
                $('#Ermsgsp').text("");
            }
        } else {
            $('#Ermsgsp').text("");
        }
    }
    catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$(".form-group #Startdatetxt").on("change", function () { DatesCompare("Start Date", "End Date"); });
$(".form-group #Exdatetxt").on("change", function () { DatesCompare("Start Date", "End Date"); });


////-----**Date Compare function**-------
//function DatesCompare(Sdate, Edate) {
//    try {      
//        var Startdate = new Date($("#Startdatetxt").val());
//        var Enddate = new Date($("#Exdatetxt").val());        
//        var errorElement = $('.compare');

//        if (Enddate <= Startdate) {
//            $('#Ermsgsp').text(Edate + " must be greater than " + Sdate + ".");
//            //errorElement.addClass('error2');
//            // errorElement.text();
//        } else {
//            //errorElement.removeClass('error2');
//            //errorElement.text("");
//            $('#Ermsgsp').text("");
//        }
//    }
//    catch (error) {
//        console.log(error);
//    }
//}


////-------------------***Date Compare
//$(".form-group #Startdatetxt").on("change", function () { DatesCompare("Start Date", "End Date"); });
//$(".form-group #Exdatetxt").on("change", function () { DatesCompare("Start Date", "End Date"); });


/* ------** SAVE BUTTON AND SAVE AND POST BUTTON CLICK FIRE FUNCTIONS***-------   */

$('#Createnoticetypeform1').submit(function (event) {
    event.preventDefault();

    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            var formdata_ISN = new FormData($('#Createnoticetypeform1')[0]);

            var fileInput = document.getElementById('AttachedDocument');
            if (fileInput.files.length > 0) {
                var file = fileInput.files[0];
                formdata_ISN.append('AttachedDocument', file);
            }
            debugger;
            var ShowInLogin = $('#radio55').val();
            formdata_ISN.append('ShowInLogin', ShowInLogin);   
            var Clickbuttonid = $(document.activeElement).attr('id');
            var Subject = $('#Subjecttxt').val();

            switch (Clickbuttonid) {
                case 'btnsubmit':
                    FileCallToAjax('POST', '/Admin/ManageNotices_Create', formdata_ISN,                      
                        function (response) {
                            if (response == "Inserted") {
                                $('#btnppostthisnotice').show();
                                $('#btnsubmit, #btnsaveandpost, #btnClear').prop('disabled', true);
                                $('#btnSave, #btnsaveandpost, #btnClear').removeClass('.btn .btn-pill .btn-outline-warning .btn-air-warning,.btn-outline-success,.btn-outline-info .btn-air-info');
                                $("#SavevalidationMessage").text("Record inserted successfully.");

                            } else if (response == "Not Inserted") {                             
                                $("#SavevalidationMessage").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                            }
                        },function (status, error) {

                        },
                        true);
                    break;
                case 'btnsaveandpost':      /*CreateSmsNNotice_PostthisnoticeBtn*/
                    FileCallToAjax('POST', '/Admin/Managenotices_saveNposting', formdata_ISN,
                        function (response) {
                            debugger;
                            $('#Noticeandsms_Insertingdivid').hide();
                            $('#Addnotice_div1').empty();
                            $('#Noticeandsms_Insertingdivid').empty();                            
                            $('#Postnoticemailsmsdiv').html(response);
                            //$('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);
                        }, function (status, error) {

                        },
                        true);
                    break;
                case 'btnppostthisnotice': /*CreateSmsNNotice_PostthisnoticeBtn*/
                    FileCallToAjax('POST', '/Admin/Managenotices_saveNposting', formdata_ISN,
                        function (response) {
                            debugger;
                            $('#Noticeandsms_Insertingdivid').hide();
                            $('#Noticeandsms_Insertingdivid').empty();
                            /*$('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);*/
                            $('#Postnoticemailsmsdiv').html(response);

                        }, function (status, error) {
                            
                            
                        },
                        true);
                    break;
                default:
                    break;
            }
        }
    }, 50);
});


//---***** Post Notice screen *****------

//----->>Check all
function CheckAllUsers() {
    var selectAllCheckbox = document.getElementById('Selectallusers_Checkbox');
    var ForAll;
    if (selectAllCheckbox.checked) {
        ForAll = 1;
    } else {
        ForAll = 0;
    }
    return ForAll;
}

//----->>Select all Staff Role

function handleSelectAllStaffRoleCheckbox() {
    var selectAllStaffRoleCheckbox = document.getElementById('Selectallstaffrole');
    var checkboxes = document.querySelectorAll('.checkbox-Name');
    var StaffcheckboxValues = [];

    selectAllStaffRoleCheckbox.addEventListener('change', function () {
        checkboxes.forEach(function (staffcheckbox) {
            var labelElement = staffcheckbox.nextElementSibling;
            var labelValue = labelElement.textContent.toLowerCase();

            if (labelValue.includes('student')) {
                staffcheckbox.checked = false;
            } else {
                staffcheckbox.checked = selectAllStaffRoleCheckbox.checked;
                StaffcheckboxValues.push(staffcheckbox.value);
            }
        });
    });
}




//$('#Addnotice').click(function () {
//    $('#btnppostthisnotice').hide();

//    $.ajax({
//        url: "/Admin/ManageNotices_Create",  
//        type: 'GET',       
//        success: function (data) {
//            debugger;           
//            $('#ManageNotices_CreateSMS_ViewDivid').html(data);
//            $('#Search_NoticeView').hide();
//            $("#Addnotice_div1").empty();
//            $("#ManageNotices_CreateSMSNNotice_ViewDivid").empty();
//            $("#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id").empty();
//        },
//        error: function (error) {
//            console.log('Error:', error);
//        }
//    });
//});






//$(document).ready(function () {
//    // Execute this function when the document is ready
//    NoticeDropdown_CreateNotice_In_View();
//});

function NoticeDropdown_CreateNotice_In_View() {
    //$.ajax({
    //    type: "GET",
    //    url: "/Admin/NoticeTypedd", // Update the URL as per your route configuration
    //    dataType: "json", // Set the expected data type
    //    success: function (data) {
    //        // Clear existing options before appending new ones
    //        $("#ENoticeTypeId_STXT").empty();
    //        debugger;
    //        // Loop through received data and append options to the dropdown
    //        $.each(data, function (index, item) {
    //            $("#ENoticeTypeId_STXT").append($('<option>', {
    //                value: item.value,
    //                text: item.text
    //            }));
    //        });
    //    },
    //    error: function (error) {
    //        console.error("Error fetching data:", error);
    //    }
    //});
}

//function NoticeDropdown_CreateNotice_In_View() {
//    /* var InstanceIds = $('#Instance_STxt').val();*/
//    debugger;
//    $.ajax({
//        type: "GET",
//        url: "@Url.Action("NoticeTypedd", "Admin")",
//        /*data: { InstanceId: InstanceIds },*/
//        success: function (data) {
//            $.each(data, function (index, item) {
//                debugger;
//                $("#ENoticeTypeId_STXT").append($('<option>', {
//                    value: item.value,
//                    text: item.text
//                }));
//            });
//        },
//        error: function (error) {
//            console.error("Error fetching data:", error);
//        }
//    });
//}


/*--- CREATE NOTICE SCREEN JAVASCRIPT CODE END  ---*/