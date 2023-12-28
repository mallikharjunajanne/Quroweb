/*------=======**** CREATE NOTICE AND SMS SCREEN ****=======------*/
function CallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
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
    $('#btnppostthisnotice').hide();
});


//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {
        var Startdate = new Date($("#StartDate").val());
        var Enddate = new Date($("#EndDate").val());
        var errorElement = $('.compare');

        if (Enddate <= Startdate) {
            errorElement.addClass('error2');
            errorElement.text(Edate + " must be greater than " + Sdate + ".");
        } else {
            errorElement.removeClass('error2');
            errorElement.text("");
        }
    }
    catch (error) {
        console.log(error);
    }
}

//-------------------***Date Compare
$(".form-group #StartDate").on("change", function () { DatesCompare("Start Date", "End Date"); });
$(".form-group #EndDate").on("change", function () { DatesCompare("Start Date", "End Date"); });


//-----**Dropdown change hide radiobutton hide
$("#ENoticeTypedd_Id").change(function () {

    var Selectedvalue = $('#ENoticeTypedd_Id').val()
    if (Selectedvalue != "") {
        $("#NoticeDisplayloginrRadio_btn").hide();
    } else {
        $("#NoticeDisplayloginrRadio_btn").show();
    }
});



//------** Save button and Save And post button click  fire functions
$('#Insert_Noticeandsms').submit(function (event) {
    event.preventDefault();

    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            var formdata_ISN = new FormData($('#Insert_Noticeandsms')[0]);

            var fileInput = document.getElementById('AttachedDocument');
            if (fileInput.files.length > 0) {
                var file = fileInput.files[0];
                formdata_ISN.append('AttachedDocument', file);
            }

            var Clickbuttonid = $(document.activeElement).attr('id');
            switch (Clickbuttonid) {
                case 'btnSave':
                    CallToAjax('POST', '/Admin/CreateSmsNNotice', formdata_ISN,
                        function (response) {
                            debugger;
                            var subjectname = $('#Subjecttxtid').val();
                            if (response != "000" && response != "-1") {

                                $('#btnSave, #btnsaveandpost, #btnClear').prop('disabled', true);
                                $('#btnSave, #btnsaveandpost, #btnClear').removeClass('.btn .btn-pill .btn-outline-warning .btn-air-warning,.btn-outline-success,.btn-outline-info .btn-air-info');
                                $('#btnppostthisnotice').show();

                                $('#Errormessage').text('Record inserted successfully.');
                            } else if (response == "000") {
                                $('#Errormessage').text('Notice with subject' + '"' + subjectname + '"' + ' already exists.');
                            } else {
                                $('#Errormessage').text('Already a file with the same name is attached to another notice. Please upload a new file.');
                            }
                        }, function (status, error) {

                        },
                        true);
                    break;
                case 'btnsaveandpost':
                    CallToAjax('POST', '/Admin/CreateSmsNNotice_PostthisnoticeBtn', formdata_ISN,
                        function (response) {
                            debugger;
                            $('#Noticeandsms_Insertingdivid').hide();
                            $('#Noticeandsms_Insertingdivid').empty();
                            $('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);

                        }, function (status, error) {

                        },
                        true);
                    break;
                case 'btnppostthisnotice':   //CreateSmsNNotice_PostthisnoticeBtn
                    CallToAjax('POST', '/Admin/CreateSmsNNotice_PostthisnoticeBtn', formdata_ISN,
                        function (response) {
                            debugger;
                            $('#Noticeandsms_Insertingdivid').hide();
                            $('#Noticeandsms_Insertingdivid').empty();
                            $('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);

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






