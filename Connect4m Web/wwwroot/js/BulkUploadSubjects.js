

//===============================View Subjects details
// function _ViewSubjects(event,InstanceClassificationId, InstanceSubClassificationId) {
function _ViewSubjects(event, Id) {
    try {
        event.preventDefault();
        debugger;
        $(".ErrorMessageSpan").empty();
        if (Id == "DdlClassForSingle" && $("#DdlClassForSingle").val() != "") {
            //  $("#ViewSubjectsSymbol").css("display","block")
            $("#ViewSubjectsSymbol").show();
            return;
        }
        var InstanceClassificationId = $("#DdlDepartmentForSingle").val();
        var InstanceSubClassificationId = $("#DdlClassForSingle").val();
        if (InstanceClassificationId == "" || InstanceSubClassificationId == '') {
            $("#ViewSubjectsSymbol").hide();
            return;
        }
        var Url = "/Examination/TblViewSubjectsList?InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId;
        // Common_ViewChangeActivities(event, Url)
        _ViewChangeActivities(event, '', '', '', Url)
    }
    catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}

//===============================values getting to edit
function EditValuesGettingFunction(subjectId) {
    debugger;
    $(".ErrorMessageSpan").empty();
    var data = { InstanceSubjectId: subjectId, Buttonname: "Update" };
    loaddingimg.css('display', 'block');
    performCrudOperationCommonFunction("GET", "/Examination/UpdateSubjects_PartialView", data, function (response) {
        debugger;
        //  $("#UpdateManageSubjects").html(response);
        $("#SubjectSearchsDiv").hide();
        $("#UpdateManageSubjects").html(response);
        // $("#Saveclassfication_MS").val("Update");
        loaddingimg.css('display', 'none');
    }, function (error) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
        //console.error(error);
    });
}


//This is for to upload a single deprtment and multiple deprtment
// $("#RdlMultipleDept,#RdlSingleDept").off("click").on('click',function (event) {
$(document).on("click", '#RdlMultipleDept,#RdlSingleDept', function (event) {
    debugger;
    $(".ErrorMessageSpan").empty();
    var BtnName = $(this).attr("id");
    var data = { Buttonname: BtnName };
    loaddingimg.css('display', 'block');

    performCrudOperationCommonFunction("GET", "/Examination/UpdateSubjects_PartialView", data, function (response) {
        debugger;
        //  $("#UpdateManageSubjects").html(response);
        $("#SubjectSearchsDiv").hide();
        $("#UpdateManageSubjects").html(response);
        if (BtnName == "RdlSingleDept") {
            CommonDropdownFunction("GET", "/Attendance/DepartmentsDropdown_Caliingfunction", "DdlDepartmentForSingle", "Select a Department", false)
        }
        // $("#Saveclassfication_MS").val("Update");
        loaddingimg.css('display', 'none');
    }, function (error) {

        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
        //console.error(error);
    });
})


function CreateNewSubjects() {
    try {
        //loaddingimg.css('display', 'block');
        //debugger;
        //    $("#SubjectSearchsDiv").hide();
        //    $("#UpdateManageSubjects").empty();
        //    $("#CreateNewSubjects").show();

        //    loaddingimg.css('display', 'none');

        $(".ErrorMessageSpan").empty();
        debugger;
        var data = { Buttonname: "BtnCreateNew" };
        loaddingimg.css('display', 'block');

        performCrudOperationCommonFunction("GET", "/Examination/UpdateSubjects_PartialView", data, function (response) {
            debugger;
            //  $("#UpdateManageSubjects").html(response);
            $("#SubjectSearchsDiv").hide();
            $("#CreateNewSubjects").html(response);
            $("#UpdateManageSubjects").empty();
            // $("#Saveclassfication_MS").val("Update");
            loaddingimg.css('display', 'none');
        }, function (error) {

            loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
            //console.error(error);
        });
    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}

function BackTOSearhExams(event) {
    try {
        loaddingimg.css('display', 'block');
        TblDataTableWithColumns_CallingFunction(event, 'Stop', "/Examination/TblBulkUploadSubjectsList", 'TblBulkUploadSubjectsList', 'Counts', 'FmSubjectSearch', 'Div_TblBulkUploadSubjectsList', '', []);
        $("#SubjectSearchsDiv").show();
        $("#CreateNewSubjects").empty();
        $("#UpdateManageSubjects").empty();
        $(".ErrorMessageSpan").empty();
        loaddingimg.css('display', 'none');
    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}

//=====================================Delete Subject
function DeleteExamsById(InstanceSubjectId) {
    debugger;
    // var UserId = $("#HdnUserId").val();
    var Deletemsg = "Subject";
    CommonDeleteFunctionNew(Deletemsg, "POST", "/Examination/DeleteSubject_CallingFunction?ButtonName=Delete&InstanceSubjectId=" + InstanceSubjectId, function (response) {
        $("#Main_Span_Error").text(response.message);

        TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Examination/TblBulkUploadSubjectsList', 'TblBulkUploadSubjectsList', 'Counts', 'FmSubjectSearch', 'Div_TblBulkUploadSubjectsList', '', []);


    });


    //CommonDeleteFunction('Category', 'GET', '/PayRoll/DeleteManageCategory', data, function (response) {
    //    $('.alert-success p').text("Category deleted successfully.");
    //    $(".alert-success").show().delay(5000).fadeOut()
    //    searchManageCategory();
    //});
    //CommonDeleteFunction(Deletemsg,"POST", "/Examination/DeleteSubject_CallingFunction?ButtonName=Delete&InstanceSubjectId=" + InstanceSubjectId, function (response) {
    //    if (response.message == "Record deleted successfully.") {

    //        TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Examination/TblBulkUploadSubjectsList', 'TblBulkUploadSubjectsList', 'Counts', 'FmSubjectSearch', 'Div_TblBulkUploadSubjectsList', '', []);

    //        $('.alert-success p').text("Record deleted successfully.");
    //        $(".alert-success").show().delay(5000).fadeOut()
    //    } else {
    //        $('.alert-danger p').text("you can not delete subject because results has been posted.");
    //        $(".alert-danger").show().delay(5000).fadeOut()
    //        }
    //    //else {
    //    //    Swal.fire({
    //    //        icon: "error",
    //    //        title: "Failed!",
    //    //        text: (responce.response),
    //    //    });
    //    //}
    //   // $("#Main_Span_Error").text(response.message);
    // });
}

    //$(document).on("click", '#BtnUpdate', function (event) {
    //    try {
    //    event.stopImmediatePropagation();
    //    var ButtonName = $(this).val();
    //    debugger;
    //    $(".ErrorMessageSpan").empty();
    //    var formData = new FormData();
    //    loaddingimg.css('display', 'block');

    //    performCrudOperationCommonFunction('POST', "/Examination/ManageSubjects?ButtonName=" + ButtonName, formData, function (response) {
    //        debugger;
    //        if (response.message == "Record inserted successfully." || response.message == "Record updated successfully.") {
    //            $("#Saveclassfication_MS").prop('disabled', true);
    //        } else if (response.message == "Record deleted successfully.") {
    //            location.reload();
    //        }
    //        $("#Main_Span_Error").text(response.message);
    //        loaddingimg.css('display', 'none');
    //        window.scrollTo(0, 0);
    //    }, function (error) {
    //        // errorCallback function code here
    //    }, true);
    //    } catch (e) {
    //        $("#Main_Span_Error").text("Something Error");
    //        loaddingimg.css('display', 'none');
    //    }

    //});