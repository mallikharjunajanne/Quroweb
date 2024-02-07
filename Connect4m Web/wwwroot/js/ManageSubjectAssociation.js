
//===============*******========ManageSubjectAssociation Screen java Script======***********


//============================= This for clear a subject dropdowns
function ClassOnchange() {
    $("#DdlSubject").empty();
    $('#DdlSubjectType option:first').prop("selected", true);
}

//============================= Reset A form
function ClearFunction() {
    $(".ErrorMessageSpan").empty();
    $("#Div_TblUser").hide();
    $("#TblUser tbody").empty();
}
//================================Search Records=====================
$("#FmUsersSearch").submit(function (event) {
    try {
        //debugger;
        event.preventDefault();
        loaddingimg.css('display', 'block');
        $(".ErrorMessageSpan").empty();
        var formElement = document.getElementById('FmUsersSearch');
        setTimeout(function () {
            var validationMessages = formElement.getElementsByClassName('field-validation-error');
            // var validationMessages2 = formElement.getElementsByClassName('error2');
            var validationmelength = validationMessages.length;
            if (validationmelength == 0) {
                TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Examination/TblUserDetailsList', 'TblUser', 'Counts', 'FmUsersSearch', 'Div_TblUser', '', [], false);
                $("#BtnSave").prop("disabled", false);
                $("#chkSelectAll").prop('checked', false);
            } else {
                loaddingimg.css('display', 'none');
                $('.alert-danger p').text("Pleae Enter All Required Fields");
                $(".alert-danger").show().delay(5000).fadeOut();

            }
        }, 50);
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
    //$("#DdlDepartment").removeClass("errorboxshadow");
    //$("#DdlClass").removeClass("errorboxshadow");
    //$("#DdlSubjectType").removeClass("errorboxshadow");
    //$("#DdlSubject").removeClass("errorboxshadow");


    //var SubjectId = $("#DdlSubject").val();
    //var DdlSubjectType = $("#DdlSubjectType").val();
    //var DdlClass = $("#DdlClass").val();
    //var DdlDepartment = $("#DdlDepartment").val();
    //var count = 0;

    //if (DdlDepartment === "") {
    //    $("#DdlDepartment_ErrorSpan").text('Department is Required');
    //    $("#DdlDepartment").addClass("errorboxshadow");
    //    count++;
    //}
    //if (DdlClass === "") {
    //    $("#DdlClass_ErrorSpan").text('Class is Required');
    //    $("#DdlClass").addClass("errorboxshadow");
    //    count++;
    //}
    //if (DdlSubjectType === "") {
    //    $("#DdlSubjectType_ErrorSpan").text("Subject type is Required");
    //    $("#DdlSubjectType").addClass("errorboxshadow");
    //    count++;
    //}
    //if (SubjectId === "" || SubjectId === null) {
    //    $("#DdlSubject_ErrorSpan").text("Subject is Required");
    //    $("#DdlSubject").addClass("errorboxshadow");
    //    count++;
    //}
    //if (count > 0) {
    //    return;
    //} else {
    //    TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Examination/TblUserDetailsList', 'TblUser', 'Counts', 'FmUsersSearch', 'Div_TblUser', '', []);
    //    $("#chkSelectAll").prop('checked', false);
    //    $("#BtnSave").prop('disabled', false);
    //}
})

//================================= This is For Submit ===============
$(document).on("click", '#BtnSave', function (event) {
    try {
        event.preventDefault();
        //  var isAssociated11 = $("input[type='checkbox']#chkSM1S").data("instancesubjectid1");
        //event.stopImmediatePropagation();
        loaddingimg.css('display', 'block');
        debugger;
        var SubjectId = $("#DdlSubject").val();

        var ButtonName = $(this).val();
        debugger;
        $(".ErrorMessageSpan").empty();
        var formData = new FormData($("#FmUsersSearch")[0]);

        // var Subjectname = $("#Subjectname").val();
        var UsersTable = $("#TblUser tbody tr");
        var Usercheckbox;
        var UsersTableCheckBoxcount = 0;
        var shouldExit = false;
        var Userid; var isAssociated;
        //this for check a record
        UsersTable.each(function () {
            Usercheckbox = $(this).find("td input[type='checkbox']#chkSMS");
            if (Usercheckbox.is(":checked")) { //if check box is checked then it is TRUE
                Userid = Usercheckbox.val();
                //var isAssociated = Usercheckbox.attr('class');
                isAssociated = Usercheckbox.data("instancesubjectid");
                if (isAssociated != SubjectId && isAssociated != undefined) {
                    UsersTableCheckBoxcount = 0;
                    shouldExit = true;
                    return false;
                }
                formData.append("UserIdList", parseInt(Userid) || 0);
                UsersTableCheckBoxcount++;
            }
        });
        if (shouldExit) {
            // $("#Main_Span_Error").text("Subjects overlapping.");
            //window.scrollTo(0, 0);
            $('.alert-danger p').text("Subjects overlapping.");
            $(".alert-danger").show().delay(5000).fadeOut()
            loaddingimg.css('display', 'none');
            return;
        }
        else if (UsersTableCheckBoxcount < 1) {
            //$("#Main_Span_Error").text("Select At Least 1 user");
            // window.scrollTo(0, 0);
            $('.alert-danger p').text("Select At Least 1 user");
            $(".alert-danger").show().delay(5000).fadeOut()
            loaddingimg.css('display', 'none');
            return;
        }
        //177947,28728
        var UnselectedUserIDs_Checkboxes = $(UsersTable).find('td:nth-child(2) input[name="selectedUsers"]:not(:checked)');
        var UserIds = UnselectedUserIDs_Checkboxes.map(function () {
            return $(this).val();
        }).get().join(',');
        formData.append("UserIdString", UserIds);

        performCrudOperationCommonFunction('POST', "/Examination/ManageSubjectAssociation?ButtonName=" + ButtonName, formData, function (response) {
            debugger;
            var SubjectText = "";
            if (response.message == "Record inserted successfully.") {
                $("#BtnSave").prop('disabled', true);
                $('.alert-success p').text(response.message);
                $(".alert-success").show().delay(5000).fadeOut()
            }
            if (response.message == "Users Cannot be De-associated either Attendance / Result has been Posted for the subject") {
                SubjectText = $("#DdlSubject option:selected").text();
                $('.alert-success p').text(response.message + SubjectText);
                $(".alert-success").show().delay(5000).fadeOut()
            }
            //$('.alert-danger p').text(response.message);
            //$(".alert-danger").show().delay(6000).fadeOut()
          //  $("#Main_Span_Error").text(response.message + SubjectText);
            loaddingimg.css('display', 'none');
            window.scrollTo(0, 0);
        }, function (error) {
            loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
        }, true);
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
});



//===============*******========ManageSubjectAssociationForMBA Screen java Script======***********

//================================Search Records=====================
$("#FmUsersSearchForMBA").submit(function (event) {
    try {
        //debugger;
        event.preventDefault();
        loaddingimg.css('display', 'block');
        $(".ErrorMessageSpan").empty();
        var formElement = document.getElementById('FmUsersSearchForMBA');
        setTimeout(function () {
            var validationMessages = formElement.getElementsByClassName('field-validation-error');
            // var validationMessages2 = formElement.getElementsByClassName('error2');
            var validationmelength = validationMessages.length;
            if (validationmelength == 0) {
                TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Examination/TblUserDetailsList', 'TblUser', 'Counts', 'FmUsersSearchForMBA', 'Div_TblUser', '', [], false);
                $("#BtnSaveForMBA").prop("disabled", false);
                $("#chkSelectAll").prop('checked', false);
            } else {
                loaddingimg.css('display', 'none');
                $('.alert-danger p').text("Pleae Enter All Required Fields");
                $(".alert-danger").show().delay(5000).fadeOut();

            }
        }, 50);
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }

})

//================================= This is For Submit ===============
$(document).on("click", '#BtnSaveForMBA', function (event) {
    try {
        event.preventDefault();
        //event.stopImmediatePropagation();
        loaddingimg.css('display', 'block');

        var SubjectId = $("#DdlSubject").val();

        var ButtonName = $(this).val();
        debugger;
        $(".ErrorMessageSpan").empty();
        var formData = new FormData($("#FmUsersSearchForMBA")[0]);

        // var Subjectname = $("#Subjectname").val();
        var UsersTable = $("#TblUser tbody tr");
        var Usercheckbox;
        var UsersTableCheckBoxcount = 0;
        var shouldExit = false;
        var Userid; var isAssociated;
        //this for check a record
        UsersTable.each(function () {
            Usercheckbox = $(this).find("td input[type='checkbox']#chkSMS");
            if (Usercheckbox.is(":checked")) { //if check box is checked then it is TRUE
                Userid = Usercheckbox.val();
                //var isAssociated = Usercheckbox.attr('class');
                isAssociated = Usercheckbox.data("instancesubjectid");
                if (isAssociated != SubjectId && isAssociated != undefined) {
                    UsersTableCheckBoxcount = 0;
                    shouldExit = true;
                    return false;
                }
                formData.append("UserIdList", parseInt(Userid) || 0);
                UsersTableCheckBoxcount++;
            }
        });
        if (shouldExit) {
            // $("#Main_Span_Error").text("Subjects overlapping.");
            //window.scrollTo(0, 0);
            $('.alert-danger p').text("Subjects overlapping.");
            $(".alert-danger").show().delay(5000).fadeOut()
            loaddingimg.css('display', 'none');
            return;
        }
        else if (UsersTableCheckBoxcount < 1) {
            //$("#Main_Span_Error").text("Select At Least 1 user");
            // window.scrollTo(0, 0);
            $('.alert-danger p').text("Select At Least 1 user");
            $(".alert-danger").show().delay(5000).fadeOut()
            loaddingimg.css('display', 'none');
            return;
        }
        //177947,28728
        var UnselectedUserIDs_Checkboxes = $(UsersTable).find('td:nth-child(2) input[name="selectedUsers"]:not(:checked)');
        var UserIds = UnselectedUserIDs_Checkboxes.map(function () {
            return $(this).val();
        }).get().join(',');
        formData.append("UserIdString", UserIds);

        performCrudOperationCommonFunction('POST', "/Examination/ManageSubjectAssociationForMBA?ButtonName=" + ButtonName, formData, function (response) {
            debugger;
            var SubjectText = "";
            if (response.message == "Record inserted successfully.") {
                $("#BtnSaveForMBA").prop('disabled', true);
                $('.alert-success p').text(response.message);
                $(".alert-success").show().delay(5000).fadeOut()
            }
            if (response.message == "Users Cannot be De-associated either Attendance / Result has been Posted for the subject") {
                SubjectText = $("#DdlSubject option:selected").text();
                $('.alert-success p').text(response.message + SubjectText);
                $(".alert-success").show().delay(5000).fadeOut()
            }
            //$('.alert-danger p').text(response.message);
            //$(".alert-danger").show().delay(6000).fadeOut()
            // $("#Main_Span_Error").text(response.message + SubjectText);
            loaddingimg.css('display', 'none');
            window.scrollTo(0, 0);
        }, function (error) {
            loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
        }, true);
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
});