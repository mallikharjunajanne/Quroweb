function CallToAjax(method, url, data, successCallback, errorCallback) {
    try {
        $.ajax({
            url: url,
            type: method,
            data: data,
            success: bindDatatable,
            error: function (xhr, status, error) {
                throw new Error(`Error: ${xhr.status}, ${error}`);
            }
        });
    } catch (err) {
        handleError(err.message);  // Call the error handler function
    }
}

function DataCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

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
    debugger;
   
    //CommonDropdownAjaxFunction("ddlnoticetype", "Get", "/Admin/_bindcategoryddl", null, function (resp) {
    //    loaddingimg.css('display', 'none');
    //}, true);

    $("#btnppostthisnotice").hide();
});

$("#ddlnoticetype").change(function () {
    debugger;
    if ($(this).val() != "") {
        $("#notice-display-login-individual").hide();
    } else {
        $("#notice-display-login-individual").show();
    }
});

$('#Createnoticetypeform').submit(function (event) {
    loaddingimg.css('display', 'block');
    event.preventDefault();

    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationmelength = validationMessages.length;

        $('#validationErrorMessage').text('');

        var startdate = $('#Startdatetxt').val();
        var Exdatetxt = $('#Exdatetxt').val();

        if (new Date(startdate) > new Date(Exdatetxt)) {
            $('#validationErrorMessage').text('Start date cannot be greater than end date.');
        }




        //var startdate = $('#Startdatetxt').val();
        //var Exdatetxt = $('#Exdatetxt').val();
        //if (startdate && Exdatetxt) {
        //    var startDateObj = new Date(startdate);
        //    var endDateObj = new Date(Exdatetxt);

        //    if (startDateObj > endDateObj) {
        //        $('#validationErrorMessage').text('Start date cannot be greater than end date.');
        //        return;
        //    }
        //}

        if (validationmelength == 0 && validationMessages2.length == 0) {
            debugger;

            var noticeFormData = new FormData($('#Createnoticetypeform')[0]);

            var fileInput = document.getElementById('AttachedDocumentid');

            //if (fileInput.files.length > 0) {
            //    var file = fileInput.files[0];
            //    noticeFormData.append('AttachedDocument', file);
            //}
            if (fileInput.files?.[0]) {
                noticeFormData.append('AttachedDocument', fileInput.files[0]);
            }

            var Clickbuttonid = $(document.activeElement).attr('id');
            var Subject = $('#Subjecttxt').val();
            var NoticeTypeId = $('#ddlnoticetype').val();
            var NoticeTypetext = $('#ddlnoticetype option:selected').text();
            var ENOTICEID = $('#Noticeidtxt').val();
            var Enoticedescriptiontxt = $('#Enoticedescriptiontxt').val();
            var ShowInLogin = $('#radio55').val();

            noticeFormData.append('ShowInLogin', ShowInLogin);
            noticeFormData.append('NoticeTypetext', NoticeTypetext);
            noticeFormData.append('NoticeTypeId', NoticeTypeId);
            noticeFormData.append('ENoticeDescription', Enoticedescriptiontxt);

            //$('#create-notice-container').empty();
            $('#create-sms-container').empty();
            $('#create-notice-and-sms-container').empty();
            $('#post-notice-email-sms-container').empty();
            $('#save-and-post-notice-container').empty();

            switch (Clickbuttonid) {
                case 'btnSubmit':
                    FileCallToAjax('POST', '/Admin/_Createnotice', noticeFormData,
                        function (response) {
                            debugger;
                            loaddingimg.css('display', 'none');
                            let message;
                            switch (response) {
                                case "Not Inserted":
                                    message = `Notice with subject "${Subject}" already exists.`;
                                    break;
                                case "500":
                                    message = "Something went wrong, please try again.";
                                    break;
                                case "File already exists":
                                    message = 'Already a file with the same name is attached to another notice. Please upload a new file.';
                                    break;
                                case "0":
                                    message: "";
                                default:
                                    $('#Enoticeidtxt').val(response);
                                    $('#btnppostthisnotice').show();
                                    $('#btnSubmit, #btnSubmitandPost, #btnClear').prop('disabled', true);
                                    message = "Record inserted successfully.";
                                    break;
                            }

                            $("#validationErrorMessage").text(message);
                        },
                        function (status, error) {
                            loaddingimg.css('display', 'none');
                        },
                        true);
                    break;
                case 'btnSubmitandPost':
                    noticeFormData.append('ENoticeId', 0);

                    FileCallToAjax('POST', '/Admin/_SaveAndPostSMSSchedulingNotice', noticeFormData,
                        function (response) {
                            loaddingimg.css('display', 'none');
                            debugger;
                            switch (response) {
                                case '0':
                                    $("#validationErrorMessage").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                                    break;
                                default:
                                    $('#Noticesadding_Firstdiv').empty();
                                    $('#Noticesadding_Seconddiv').append(response);
                                    break;
                            }
                        },
                        function (status, error) {
                            loaddingimg.css('display', 'none');
                            $("#validationErrorMessage").text("Something went wrong please try again.");
                        },
                        true);
                    break;
                case 'btnppostthisnotice':
                    noticeFormData.append('ENoticeId', ENOTICEID);

                    FileCallToAjax('POST', '/Admin/_SaveAndPostSMSSchedulingNotice', noticeFormData,
                        function (response) {
                            debugger;
                            switch (response) {
                                case response:  // You can add specific conditions if needed
                                    $('#Noticesadding_Firstdiv').empty();
                                    $('#Noticesadding_Seconddiv').append(response);
                                    break;
                                default:
                                    // Handle the default case if necessary
                                    break;
                            }
                        },
                        function (status, error) {
                            loaddingimg.css('display', 'none');
                            $("#validationErrorMessage").text("Something went wrong please try again.");
                        },
                        true);
                    break;
                default:
                    break;
            }

            loaddingimg.css('display', 'none');
        }

        loaddingimg.css('display', 'none');
    }, 50);
});