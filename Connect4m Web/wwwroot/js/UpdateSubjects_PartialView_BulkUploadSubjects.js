var ClickedBtnId = null;
$("button").click(function () {
    // $(".submit-btn").click(function () {
    // Set the value of a hidden input field to the name of the clicked button
    ClickedBtnId = $(this).attr("id");
});
//-----------------------------------This is for Upload Subject details
// $(document).on("click", "#BtnUpload,#BtnUpdate,#BtnSave", function (event) {
$("#FmUpdateSubjects").submit(function (event) {
    debugger;
    try {

        event.preventDefault();
        loaddingimg.css('display', 'block');
        $(".ErrorMessageSpan").empty();
        // var btnid = $(this).attr("id");
        // var btnid = ClickedBtnId;
        //  var file12 = $("#SubjectFileForMultiple").prop('files')[0];
        //  var fileInput = document.getElementById("SubjectFileForMultiple");


        //  var formData = new FormData(this);
        var formData = new FormData($("#FmUpdateSubjects")[0]);
        //var formdata_CSA = $(this).serialize();
        formData.append("ButtonId", ClickedBtnId);
        var formElement = document.getElementById('FmUpdateSubjects');
        setTimeout(function () {
            var validationMessages = formElement.getElementsByClassName('field-validation-error');
            // var validationMessages2 = formElement.getElementsByClassName('error2');
            var validationmelength = validationMessages.length;
            if (validationmelength == 0) {
                debugger;
                // CommonAjaxFunction('POST', '/Examination/BulkUploadSubjects?ButtonName=MultiSubjectsUpdate', formData, function (response) {
                CommonAjaxFunction('POST', '/Examination/BulkUploadSubjects', formData, function (response) {
                    debugger;

                    if (response.message == "Record updated successfully." || response.message == "Subjects inserted successfully.") {
                        $("#" + ClickedBtnId).prop('disabled', true);
                        $('.alert-success p').text(response.message);
                        $(".alert-success").show().delay(5000).fadeOut()
                        // $("#BtnUpdate").prop('disabled', true);
                    } else {

                        $('.alert-danger p').text(response.message);
                        $(".alert-danger").show().delay(5000).fadeOut()
                    }
                    //else if (response.message == "Subjects inserted successfully.") {
                    //    $("#" + ClickedBtnId).prop('disabled', true);
                    //}
                    if (ClickedBtnId == "BtnSave" || ClickedBtnId == "BtnUpload") {
                        $("#SubjectFileForSingle").val('');
                        $("#SubjectFileForMultiple").val('');
                    }

                    // $("#Main_Span_Error").text(response.message);
                    loaddingimg.css('display', 'none');
                    window.scrollTo(0, 0);
                }, function (status, error) {
                    loaddingimg.css('display', 'none');
                }, true);
            } else {
                loaddingimg.css('display', 'none');
                $('.alert-danger p').text("Pleae Enter All Required Fields");
                $(".alert-danger").show().delay(5000).fadeOut();
            }
        }, 50);

    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        // loaddingimg.css('display', 'none');
        loaddingimg.css('display', 'none');
    }
})