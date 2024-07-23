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



$('#Updatenoticetypeform').submit(function (event) {
    loaddingimg.css('display', 'block');
    event.preventDefault();

    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationmelength = validationMessages.length;
        $('#Commonerrormessage').text('');

        var startdate = $('#Stdatetxt').val();
        var Exdatetxt = $('#Exdatetxt').val();
        if (startdate && Exdatetxt) {
            var startDateObj = new Date(startdate);
            var endDateObj = new Date(Exdatetxt);

            if (startDateObj > endDateObj) {
                $('#Commonerrormessage').text('Start date cannot be greater than end date.');
                return;
            }
        }
        if (validationmelength == 0 && validationMessages2.length == 0) {
            var formdata_ISN = new FormData($('#Updatenoticetypeform')[0]);

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
            var NoticeTypeId = $('#Enoticetypeddlid').val();
            var NoticeTypetext = $('#Enoticetypeddlid option:selected').text();
            var ENOTICEID = $('#Enoticetxtid').val();
            var Enoticedescriptiontxt = $('#Enoticedescriptiontxt').val();
            formdata_ISN.append('NoticeTypetext', NoticeTypetext);
            formdata_ISN.append('NoticeTypeId', NoticeTypeId);
            formdata_ISN.append('ENoticeDescription', Enoticedescriptiontxt);
            $('#Noticesadding_Seconddiv').empty();
            switch (Clickbuttonid) {
                case 'Updatesubmitbtn':
                    FileCallToAjax('POST', '/Admin/Updatenoticepost', formdata_ISN,
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
                                $('#Updatesubmitbtn, #Updateandpostbtn, #Deletebtn').prop('disabled', true);
                                $("#Commonerrormessage").text("Record updated successfully.");
                            }
                        }, function (status, error) {
                            loaddingimg.css('display', 'none');
                        },
                        true);
                    break;
                case 'Updateandpostbtn':      /*CreateSmsNNotice_PostthisnoticeBtn*/
                    formdata_ISN.append('ENoticeId', 0);
                    //FileCallToAjax('POST', '/Admin/Noticepost', formdata_ISN,//Managenotices_saveNposting
                    FileCallToAjax('POST', '/Admin/Updatenotice', formdata_ISN,//Managenotices_saveNposting
                        function (response) {
                            debugger;
                            loaddingimg.css('display', 'none');
                            //if (response.) {

                            //}
                            if (response != 0) {
                                $('#Noticesadding_Firstdiv').empty();
                                $('#Noticesadding_Seconddiv').append(response);
                            }
                            else {
                                $("#Commonerrormessage").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                            }
                        }, function (status, error) {
                            loaddingimg.css('display', 'none');
                            $("#Commonerrormessage").text("Something went wrong please try again.");
                            console.log("Error status:", status);
                            console.log("Error message:", error.responseText);
                        },
                        true);
                    break;
                case 'UpdatePostnoticebtn':
                    formdata_ISN.append('ENoticeId', ENOTICEID);
                    //FileCallToAjax('POST', '/Admin/Noticepost', formdata_ISN,//Managenotices_saveNposting
                        FileCallToAjax('POST', '/Admin/Updatenotice', formdata_ISN,//Managenotices_saveNposting
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

$('#UpdateBacktosearchbtn').click(function () {
    loaddingimg.css('display', 'block');
    $('#Commonerrormessage').text('');
    $('#Noticesadding_Firstdiv').empty();
    $('#Noticesadding_Seconddiv').empty();
    $('#Noticesadding_Thirddiv').empty();
    $('#Searchnotices_Maindiv').show();
    window.location.reload();
    loaddingimg.css('display', 'None');
});

function DeleteUpdatednotice() {
    loaddingimg.css('display', 'block');
    var confirmed = confirm("Are you sure you want to delete Notice?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        debugger;
        //var ENoticeId = $(this).closest('tr').find('input[type="text"]').val();
        var ENoticeId = $('#Enoticetxtid').val();
        
        loaddingimg.css('display', 'block');
        var data = { ENoticeId: ENoticeId };
        DataCallToAjax('GET', '/Admin/Deletenotice', data,
            function (response) {
                Tabledatabindingfunction();
                $('#Commonerrormessage').text("Record deleted successfully.");
                loaddingimg.css('display', 'none');
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );
    }
}

//Check All Checkboxes
function CheckAllUsers() {
    debugger;
    var selectAllCheckbox = document.getElementById('Selectallusers_Checkbox');
    var AllUserscheckboxes = document.querySelectorAll('.checkbox-item');

    var checkboxValues = [];

    AllUserscheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkboxValues.push(checkbox.value);
        checkbox.disabled = selectAllCheckbox.checked;
    });
    $('#Adduserstopostnotice_Div').toggle();
    //var ForAll = selectAllCheckbox.checked ? 1 : 0;
    //return ForAll;
}


