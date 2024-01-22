


$(document).ready(function () {
    debugger;
    //  CommonDropdownFunction("GET", "/Attendance/DepartmentsDropdown_Caliingfunction", "DdlDepartmentGeneralTab", "Select a Department", false)
    // CommonDropdownFunction('GET', '/Users/DdlStudentStatus_Calingfunction?Id=1', 'DdlStudentStatus', '', false)
    if ($('#IsActiveYes').is(':checked')) {
        CommonDropdownFunction('GET', '/Users/DdlStudentStatus_Calingfunction?Id=1', 'DdlStudentStatus', '', false);
    } else {
        CommonDropdownFunction('GET', '/Users/DdlStudentStatus_Calingfunction?Id=0', 'DdlStudentStatus', '', false);
    }
    //-----clicked on update
    if ($("#BtnUpdateIdentification").val() == "UpdateDetails") {
        $("#BtnSaveFormInGeneralInfo").val("Update");
        $("#BtnSaveFormInGeneralInfo").text("Update");
        $(".DdlCascadDropdowns").prop("disabled", false);
        // var Roleid = $("#DdlRoleId").val();
        //var RoleName = $("#DdlRoleId option:selected").text();
        $("#SpnCardHeaderName").text("UPDATE USER");

        //RoleOnChangeFunctionInGeneralTab($("#DdlRoleId option:selected").text().toUpperCase(), true);
       // RoleOnChangeFunctionInGeneralTab("DdlRoleId", true);
        RoleOnChangeFunctionInGeneralTab("DdlRoleIdInGeneralTab", true);
    } else {
        $("#TcTakenNo").prop("checked", true);
        $(".ClsDivTcTakesnYes").css('display', 'none');
        $(".ClsDivTransferDetails").css('display', 'none');
        $("#ParentDetailsTab").css("display", "");
    }
    $('#FmGeneralInfoTab #Password').attr("type", "password");
    $('#FmGeneralInfoTab #ConPassword').attr("type", "password");
});



function TAPhysicallyChallengedDetails_Calling() {
    $("#TAPhysicallyChallengedDetails").text('');
}
//=======================To see the preview and Take Print
//  $("#BtnPreview").click(function () {

function Preview_CalingFunction(UserId) {
    try {
        debugger;
        var Url = "";
        $(".ErrorMessageSpan").empty();
        //  var UserId = 28985;
        // var UserId = 184676;
        if (Url == '' || Url == undefined) {
            Url = "/Users/ManageUsersPreview?UserId=" + UserId;
            //Url = "/Users/ManageUsersPreview?UserId=" + UserId + "&IsParentIdentification=true";
        } else {
            $("#Main_Span_Error").text("Something Error");
            loaddingimg.css('display', 'none');
            return;
        }

        window.open(Url, '_blank');
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
};



//===================>>>>>>>>>>>>>>====In GeneralInfoTab Page  Functions START

// =======check username is availble or not
$('#TxtUserName').on('input', function () {
    try {
        var UserName = $(this).val();
        if ((UserName == $("#IdentityUserName").val() && $("#BtnUpdateIdentification").val() == "UpdateDetails")) {
            $('#SpnUserName').text('');
            $('.SpnUserNameCls').removeClass('field-validation-error');
        }
        else if (UserName !== '') {
            $.ajax({
                type: 'GET',
                url: '/Users/CheckUserAvailability',
                data: { UserName: $(this).val() },
                success: function (result) {
                    if (result.message == "NotAvailble") {
                        $('#SpnUserName').text('Username Already Exists');
                        $('.SpnUserNameCls').addBack('field-validation-error');
                    } else {
                        $('#SpnUserName').text('');
                        $('.SpnUserNameCls').removeClass('field-validation-error');
                    }
                }
            });
        } else {
            $('#SpnUserName').text('');
            $('.SpnUserNameCls').removeClass('field-validation-error');
        }
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
});


//===================Shows date  fields
function TcTakenChecking(Tctaken) {
    debugger
    if ($("#BtnUpdateIdentification").val() != "UpdateDetails") {
        $(".ClsTxtTcTakesnYes").val('');
    }
    if (Tctaken == 1) {
       // var Roleid = $("#DdlRoleId").val();
        //if (Roleid == 775) {
        if ($("#DdlRoleIdInGeneralTab option:selected").text().toUpperCase() == "STUDENT") {
            $(".ClsDivTcTakesnYes").css("display", "block");
            $(".ClsDivTransferDetails").css("display", "block");
            $("#LblInstanceTransferDetailsGeneralTab").text("Transfer Details");
        } else {
            $(".ClsDivTcTakesnYes").css("display", "none");
            $(".ClsDivTransferDetails").css("display", "block");
            $("#LblInstanceTransferDetailsGeneralTab").text("Reason for Hiding");
        }
    }
    else {
        $(".ClsDivTcTakesnYes").css("display", "none");
        $(".ClsDivTransferDetails").css("display", "none");
    }

}



//$("#FmGeneralInfoTab #DtTCdate").on("change", function () { datescompare(event, "Date Of Join", "Tc Date") });
$("#FmGeneralInfoTab #DtTCdate").on("change", function () { datescompare_Vs1(event, 'DtDateOfJoining', 'DtTCdate', "Date Of Join", "Tc Date") });



//=====================================Delete Photo
function DeletePhoto_CallingFunction() {
    // <img src="~/UserPhotos/545/217720/Profile Photo.jpg" />
    debugger;
    var UserId = $("#HdnUserId").val();
    var Deletemsg = "Photo";
    CommonDeleteFunction("POST", "/Users/DeletePhoto_CallingFunction?ButtonName=Delete&UserId=" + UserId, Deletemsg, function (response) {

        if (response.message == "Photo Deleted Sucessfully.") {
            $('.alert-success p').text(response.message);
            $(".alert-success").show().delay(5000).fadeOut()



            //  $("#Main_Span_Error").text(response.message);
            $("#ImgPhotoDisplay").attr("src", "/Images/No imageAvailable.gif");
            $("#FlPhoto").css("display", "block");
            $("#SpnPhotoName").text("");
            $(".ClsFileName").css("display", "none");
        } else {
            $("#Main_Span_Error").text(response.message);
        }
        window.scrollTo(0, 0);
    });
}

//=====================================Delete Users
$("#BtnDeleteFormInGeneralInfo").click(function (event) {
    debugger;
    var UserId = $("#HdnUserId").val();
    var Deletemsg = "User";
    CommonDeleteFunction("POST", "/Users/DeleteUser_CallingFunction?ButtonName=Delete&UserId=" + UserId, Deletemsg, function (response) {
        $("#Main_Span_Error").text(response.message);
        TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Users/TblUsersSearch', 'TblUserSearchresults', 'Counts', 'FmUsersSearch', 'DivTblUserSearchresults', '', [], true);
        $("#DivappendCreateNewUsers").empty();
        $("#DivUsersSearchPage").css('display', 'block');
        $('#BtnBackToSearch').css('display', 'none');

    });
});
//  ============ Save and Update Users Details in General Tab
//$("#FmGeneralInfoTab,#FmParentDetailsTab,#FmShowProfile").submit(function (event) {
$("#FmGeneralInfoTab,#FmShowProfile").submit(function (event) {
    // $("#BtnSaveFormInGeneralInfo").click(function (event) {
    try {
        event.preventDefault();
        loaddingimg.css('display', 'block');
        var formId = event.target.id;
        $(".ErrorMessageSpan").empty();
        var identitypass = $('#FmGeneralInfoTab #IdentityPassword').val();
        var password = $('#FmGeneralInfoTab #Password').val();
        debugger;
        if (password != undefined && password != null && password != "") {
            var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,10}$/;

            // if ($('#FmGeneralInfoTab #BtnSaveFormInGeneralInfo').val() == "Update") {
            if ($('#BtnSaveFormInGeneralInfo').val() == "Update") {
                if (identitypass != password) {

                    if (!password.match(passwordPattern)) {
                        window.scroll(0, 0);
                        $(".passwordfor").find('.ErrorMessageSpan').addClass('error2');
                        $(".passwordfor").find('.ErrorMessageSpan').text('Password must have at least 8-10 characters, must contain at least one lower case letter, one upper case letter, one digit and one special character.Allowed special chars are !@#$%^&*()+=')
                    }
                    else {
                        $(".passwordfor .ErrorMessageSpan").removeClass('error2');
                        $(".passwordfor").find('.ErrorMessageSpan').text("");
                    }
                }
                else {
                    $(".passwordfor .ErrorMessageSpan").removeClass('error2');
                    $(".passwordfor").find('.ErrorMessageSpan').text("");
                }
            }
            else {
                if (!password.match(passwordPattern)) {
                    window.scroll(0, 0);
                    $(".passwordfor").find('.ErrorMessageSpan').addClass('error2');
                    $(".passwordfor").find('.ErrorMessageSpan').text('Password must have at least 8-10 characters, must contain at least one lower case letter, one upper case letter, one digit and one special character.Allowed special chars are !@#$%^&*()+=')
                }
                else {
                    $(".passwordfor .ErrorMessageSpan").removeClass('error2');
                    $(".passwordfor").find('.ErrorMessageSpan').text("");
                }
            }
        }
        //var formElement = document.getElementById('FmGeneralInfoTab');
        var formElement = document.getElementById(formId);
        setTimeout(function () {
            var validationMessages = formElement.getElementsByClassName('field-validation-error');
            var validationMessages2 = formElement.getElementsByClassName('error2');
            if (validationMessages.length == 0 && validationMessages2.length == 0) {
                loaddingimg.css('display', 'block');
                //  var formData = new FormData($("#FmGeneralInfoTab")[0]);
                var formData = new FormData($('#' + formId)[0]);
                formData.append("IdentityPassword", $("#IdentityPassword").val());
                formData.append("ButtonName", $("#BtnSaveFormInGeneralInfo").val());
                formData.append("ScreenName", $("#HdnScreenName").val());
                var ControllerName;
                debugger;
                if (formId == "FmGeneralInfoTab") {
                    ControllerName = "ManageUsers";
                    formData.append("SubCategoryText", $("#DdlSubCategory").val());
                } else if (formId == "FmParentDetailsTab") {
                    ControllerName = "ManageParents";
                    formData.append("Relationship", $("#DdlRelationship").val());
                    //    formData.append("AnnualIncome", $("#DdlLacs").val() + "." + $("#Ddlthousands").val());
                } else if (formId == "FmShowProfile") {
                    ControllerName = "ManageUsers";
                }
                performCrudOperationCommonFunction('POST', "/Users/" + ControllerName, formData, function (response) {
                    debugger;
                    if (response.message.includes("Record inserted successfully.") || response.message.includes("Record updated successfully.")) {
                        $("#BtnSaveFormInGeneralInfo").prop("disabled", true);

                        if (formId == "FmGeneralInfoTab") {
                            $("#HdnUserIdCreatePage").val(response.userid);//Append Id in create view hidden
                        }

                        // var Photoname = $("#FlPhoto")
                        // var imageName = $("#FlPhoto").attr("src").substring($("#FlPhoto").attr("src").lastIndexOf('/') + 1);
                        var photo = $('#FlPhoto').prop('files')[0];
                        $("#ImgPhotoDisplay").attr("src", response.photoUrl);
                        // $("#HdnUserId").val();
                        if (photo) {
                            $("#FlPhoto").css("display", "none");
                            $("#FlPhoto").val('');
                            $(".ClsFileName").css("display", "block");
                            $("#SpnPhotoName").text(photo.name);
                        }
                        //  else {
                        //   // $("#ImgPhotoDisplay").attr("src", "/Images/No imageAvailable.gif");
                        //    $("#FlPhoto").css("display", "block");
                        //    $(".ClsFileName").css("display", "none");
                        //    $("#SpnPhotoName").text('');
                        //}
                        $("#ParentDetailsTab").prop("disabled", false);
                        $('.alert-success p').text(response.message);
                        $(".alert-success").show().delay(5000).fadeOut()
                    } else {
                        $('.alert-danger p').text(response.message);
                        $(".alert-danger").show().delay(5000).fadeOut()
                    }
                   // $("#" + formId + " #Main_Span_Error").text(response.message);
                //    window.scrollTo(0, 0);
                   
                }, function (error) {
                    loaddingimg.css('display', 'none');
                    $("#Main_Span_Error").text("Something Error");
                }, true);
                loaddingimg.css('display', 'none');
            } else {
                loaddingimg.css('display', 'none');
                $('.alert-danger p').text("Pleae Enter All Required Fields");
                $(".alert-danger").show().delay(5000).fadeOut()
            }
        }, 50);
    } catch (e) {
        // loaddingimg.css('display', 'none');
        //   loaddingimg.css('display', 'none');
        loaddingimg.css('display', 'none');
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
})

//-================================ BackToSearch

//$("#BtnBackToSearch,#BtnBackToSearchInGeneralInfo").click(function () {
$("#BtnBackToSearchInGeneralInfo").click(function () {
    try {
        debugger;
        //  $(".ErrorMessageSpan").empty();
        loaddingimg.css('display', 'block');
        $('#BtnBackToSearch').css('display', 'none');
        TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Users/TblUsersSearch', 'TblUserSearchresults', 'Counts', 'FmUsersSearch', 'DivTblUserSearchresults', '', [], true);

        $("#DivUsersSearchPage").css('display', 'block');
        $("#DivappendCreateNewUsers").empty();
        loaddingimg.css('display', 'none');
    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
})



//function datescompare(event, start, end) {
//    event.stopImmediatePropagation();
//    var startDate = new Date(document.getElementById("DtDateOfJoining").value);
//    var endDate = new Date(document.getElementById("DtTCdate").value);
//    var error = $('#DtTCdate').closest('.form-group');
//    $(error).find('.compare').removeClass('error2');
//    if (endDate <= startDate) {
//        $(error).find('.compare').addClass('error2');
//        $(error).find('.compare').text(endName + " must be greater than " + startName + ".");
//    } else {
//        $(error).find('.compare').addClass('');
//        $(error).find('.compare').text("");
//    }
//
//=====================<<<<<<<<<<<<<<<<<<==In GeneralInfoTab Page  Functions END


   // });