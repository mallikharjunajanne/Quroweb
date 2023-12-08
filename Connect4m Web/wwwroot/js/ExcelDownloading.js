
//----===================  Click On Get Excel To Upload --File


$(document).on('click', '#FmFileUpload #_Getexceltoupload', function (event) {

    event.stopImmediatePropagation();

      var selectedValues = $("#DdlSubjects option:selected").map(function () {
        return $(this).text();
    }).get();
    if (selectedValues) {
        var selectedValuesString = selectedValues.join(", ");
    }
    var formData = new FormData($("#FmSubjectsSearch")[0]);

    formData.append("SubjectsName", selectedValuesString)


    var TblExamSubject = $("#TblExamSubjects tbody tr");

    TblExamSubject.each(function (index) {
        TblExamSubjectTD = $(this).find("td");

        // var HdnSubjectId = TblExamSubjectTD.find("#SubjectId").val();
        var HdnExamSubjectId = TblExamSubjectTD.find("#ExamSubjectId").val();
        var TxtPassMarks = TblExamSubjectTD.find("#TxtPassMarks").val();
        var TxtMaxMarks = TblExamSubjectTD.find("#TxtMaxMarks").val();

        // formData.append("SubjectIdList", parseInt(HdnSubjectId) || 0);
        formData.append("ExamSubjectIdList", parseInt(HdnExamSubjectId) || 0);
        formData.append("PassMarksList", parseFloat(TxtPassMarks));
        formData.append("MaxMarksList", parseFloat(TxtMaxMarks));
    });

    // var formData = { MarksUploadtype: "UploadWithExcelFile" };
    $("#loadingOverlay").show();
    $("#Div_Step2").hide();
    $("#loadingOverlay").hide();
    //performCrudOperationCommonFunction("POST", "/Results/ExcelDowload", formData, function (response) {
    //    // $("#Div_Step2").hide();
    
    //    $("#loadingOverlay").hide();
    //}, function (error) {
    //    $("#loadingOverlay").hide();
    //    $("#Main_Span_Error").text("Something Error");
    //}, true);

    // Serialize the formData into a URL-encoded string
    var formDataString = new URLSearchParams(formData).toString();

    // Append the serialized formData to the URL
    window.location.href = "/Results/ExcelDownload?" + formDataString;

});

