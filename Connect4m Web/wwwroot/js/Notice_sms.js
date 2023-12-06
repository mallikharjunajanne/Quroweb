
$(document).ready(function () {


});

//----***** Ajax Common Method *****---------
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
    } catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$(".form-group #StartDate").on("change", function () { DatesCompare("Start Date", "End Date"); });
$(".form-group #EndDate").on("change", function () { DatesCompare("Start Date", "End Date"); });



//------** Save button and Save And post button click  fire functions
$('#Insert_Noticeandsms').submit(function (event) {
    event.preventDefault();

    var formdata_ISN = new FormData($('#Insert_Noticeandsms')[0]); // Replace #yourForm with your actual form ID

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

                }, function (status, error) {

                },
                true);
            break;
        case 'btnsaveandpost':
            break;
        default:
            break;
    }
});


//-----**Dropdown change hide radiobutton hide
$("#ENoticeTypedd_Id").change(function () {

    var Selectedvalue = $('#ENoticeTypedd_Id').val()
    if (Selectedvalue != "") {
        $("#NoticeDisplayloginrRadio_btn").hide();
    } else {
        $("#NoticeDisplayloginrRadio_btn").show();
    }
});

