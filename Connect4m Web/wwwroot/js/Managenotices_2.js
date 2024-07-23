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
    $('#btnppostthisnotice').hide();

    CommonDropdownAjaxFunction("Enoticeddl", "GET", "/Admin/BindCategoryddl", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
});


$("#Enoticeddl").change(function () {
    debugger;
    if ($(this).val() != "") {
        $("#NoticeDisplaylogindivid").hide();
    } else {
        $("#NoticeDisplaylogindivid").show();
    }
});
function Clearform(formid) {
    debugger;
    // Retrieve the form element by id
    var form = document.getElementById(formid);

    if (form) {
        // Use the reset method to clear the form
        form.reset();

        // Clear ASP.NET Core validation messages
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });

    } else {
        console.error("Form with id '" + formid + "' not found.");
    }
}
$('#Backtosearchbtn').click(function () {
    $('#Commonerrormessage').text('');
    $('#Noticesadding_Firstdiv').empty();
    $('#Searchnotices_Maindiv').show();
});

$('#Createnoticetypeform').submit(function (event) {
    loaddingimg.css('display', 'block');
    event.preventDefault();

    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationmelength = validationMessages.length;
        $('#Commonerrormessage').text('');

        var startdate = $('#Startdatetxtid').val();
        var Exdatetxt = $('#Exdatetxtid').val();
        if (startdate && Exdatetxt) {
            var startDateObj = new Date(startdate);
            var endDateObj = new Date(Exdatetxt);

            if (startDateObj > endDateObj) {
                $('#Commonerrormessage').text('Start date cannot be greater than end date.');
                return;
            }
        }
        if (validationmelength == 0 && validationMessages2.length == 0) {
            var formdata_ISN = new FormData($('#Createnoticetypeform')[0]);

            var fileInput = document.getElementById('AttachedDocument');
            if (fileInput.files.length > 0) {
                var file = fileInput.files[0];
                formdata_ISN.append('AttachedDocument', file);
            }
            debugger;
            var ShowInLogin = $('#radio55').val();
            formdata_ISN.append('ShowInLogin', ShowInLogin);
            var Clickbuttonid = $(document.activeElement).attr('id');
            var Subject = $('#Subjecttxtid').val();
            var NoticeTypeId = $('#Enoticeddl').val();
            var NoticeTypetext = $('#Enoticeddl option:selected').text();
            var ENOTICEID = $('#Enoticeidtxt').val();
            var Enoticedescriptiontxt = $('#Enoticedescriptiontxt').val();
            formdata_ISN.append('NoticeTypetext', NoticeTypetext);
            formdata_ISN.append('NoticeTypeId', NoticeTypeId);
            formdata_ISN.append('ENoticeDescription', Enoticedescriptiontxt);
            $('#Noticesadding_Seconddiv').empty();
            switch (Clickbuttonid) {
                case 'btnsubmit':
                    FileCallToAjax('POST', '/Admin/Createnotice', formdata_ISN,
                        function (response) {
                            debugger;
                            loaddingimg.css('display', 'none');
                            if (response == "Not Inserted") {
                                $("#Commonerrormessage").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                            } else if (response == "Error") {
                                $("#Commonerrormessage").text("Something went wrong please try again.");
                            } else if (response == "File already exists") {
                                $('#Commonerrormessage').text('Already a file with the same name is attached to another notice. Please upload a new file.');
                            }
                            else {
                                $('#Enoticeidtxt').val(response);
                                $('#btnppostthisnotice').show();
                                $('#btnsubmit, #btnsaveandpost, #btnclear').prop('disabled', true);
                                $("#Commonerrormessage").text("Record inserted successfully.");
                            }
                        }, function (status, error) {
                            loaddingimg.css('display', 'none');
                        },
                        true);
                    break;
                case 'btnsaveandpost':      /*CreateSmsNNotice_PostthisnoticeBtn*/
                    formdata_ISN.append('ENoticeId', 0);
                    FileCallToAjax('POST', '/Admin/Noticepost', formdata_ISN,//Managenotices_saveNposting
                        function (response) {
                            debugger;
                            loaddingimg.css('display', 'none');
                            if (response != 0) {
                                $('#Noticesadding_Firstdiv').empty();
                                $('#Noticesadding_Seconddiv').append(response);
                            } else {
                                $("#Commonerrormessage").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                            }
                        }, function (status, error) {
                            loaddingimg.css('display', 'none');
                            $("#Commonerrormessage").text("Something went wrong please try again.");
                        },
                        true);
                    break;
                case 'btnppostthisnotice':
                    formdata_ISN.append('ENoticeId', ENOTICEID);
                    FileCallToAjax('POST', '/Admin/Noticepost', formdata_ISN,//Managenotices_saveNposting
                        function (response) {
                            debugger;
                            loaddingimg.css('display', 'none');
                            $('#Noticesadding_Firstdiv').empty();
                            $('#Noticesadding_Seconddiv').append(response);
                        }, function (status, error) {
                            loaddingimg.css('display', 'none');
                            $("#Commonerrormessage").text("Something went wrong please try again.");
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
