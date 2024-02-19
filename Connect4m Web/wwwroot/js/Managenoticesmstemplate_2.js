function DataCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        processData: false,
        contentType: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}





$("#btnSMSNext").on("click", function () {

    if ($("input[name='Radio1']:checked").length != 0) {
        debugger;
        $('#SmsErrormessage').text('');

        var TemplateMasterPK = $("input[name='Radio1']:checked").val();

  

        var EditSMSSubmitbutton = document.getElementById('btnSMSNext');
        EditSMSSubmitbutton.disabled = true;

        var radioButtons = document.querySelectorAll("input[name='Radio1']");
        radioButtons.forEach(function (radioElement) {
            radioElement.disabled = true;
        });

        loaddingimg.css('display', 'block');
        var data = { TemplateMasterPK: TemplateMasterPK };

        DataCallToAjax('GET', '/Admin/SMS_TemplateandDetails?TemplateMasterPK=' + TemplateMasterPK, null,
            function (response) {
                $('#SmsTemplatedetailsViewDiv_ManageNotices_createsms').html(response);
                loaddingimg.css('display', 'none');
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );

        //$.ajax({
        //    url: "/Admin/SMS_TemplateandDetails?TemplateMasterPK=" + TemplateMasterPK,
        //    type: "GET",
        //    success: function (response) {
        //        debugger;
        //        $('#SmsTemplatedetailsViewDiv_ManageNotices_createsms').html(response);
        //    }
        //});
    } else {

        $('#SmsErrormessage').text("Please select atleast one to continue.");
        return false;
    }
});


$("#btnSMSBackToSearch").click(function () {
    $('#ManageNotices_CreateSMS_ViewDivid').empty();
    location.reload();
});