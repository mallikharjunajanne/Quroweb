﻿
//===================>>>>>>>>>>>>>>>>>>>>====In manage Users Page  Functions START


//==================== to get details for edit
function GettingUserDetails_EditFunction(UserId) {
    debugger; try {
        loaddingimg.css('display', 'block');
        var data = { UserId: UserId };
        CommonAjaxFunction('GET', '/Users/CreateUsers', data, function (response) {
            $('#DivappendCreateNewUsers').html(response);

            //  $("#BtnSaveFormInGeneralInfo").text("Update");
            $('#DivUsersSearchPage').css('display', 'none');
            $('#BtnBackToSearch').css('display', 'block');
            $("#ParentDetailsTab").css("display", " ");
            // $("#BtnSaveFormInGeneralInfo").val("Update");
            //$(".DdlCascadDropdowns").prop("disabled", false);
            window.scrollTo(0, 0);
            loaddingimg.css('display', 'none');

        }, function (status, error) {
            loaddingimg.css('display', 'none');
        }, false);
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
}

//====================To Get Create Users Page
$("#BtnCreateUsers").click(function (event) {
    event.preventDefault();
    debugger;
    loaddingimg.css('display', 'block');
    CommonAjaxFunction('GET', '/Users/CreateUsers', null, function (response) {
        debugger;
        $('#DivappendCreateNewUsers').html(response);
        $('#DivUsersSearchPage').css('display', 'none');
        $('#BtnBackToSearch').css('display', 'block');
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
})






//-================================ BackToSearch
//$("#BtnBackToSearch,#BtnBackToSearchInGeneralInfo").click(function (event) {
$("#BtnBackToSearch").click(function (event) {
    try {
        debugger;
        event.preventDefault();
        //  $(".ErrorMessageSpan").empty();
        loaddingimg.css('display', 'block');
        // $('#BtnBackToSearch').css('display', 'none !important');
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


//  ============ Searched Users Details in Table
$("#FmUsersSearch").submit(function (event) {
    debugger;
    try {
        event.preventDefault();
        //  $(".ErrorMessageSpan").empty();
        loaddingimg.css('display', 'block');
        var formElement = document.getElementById('FmUsersSearch');
        //  $("#TblUserSearchresults tbody").empty();
        setTimeout(function () {
            var validationMessages = formElement.getElementsByClassName('field-validation-error');
            // var validationMessages2 = formElement.getElementsByClassName('error2');
            var validationmelength = validationMessages.length;
            if (validationmelength == 0) {
                loaddingimg.css('display', 'block');
                TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Users/TblUsersSearch', 'TblUserSearchresults', 'Counts', 'FmUsersSearch', 'DivTblUserSearchresults', '', [], true);
                loaddingimg.css('display', 'none');
                loaddingimg.css('display', 'none');
                //  loaddingimg.css('display', 'none');
                //  loaddingimg.css('display', 'none');
            } else {
                $('.alert-danger p').text("Pleae Enter All Required Fields");
                $(".alert-danger").show().delay(5000).fadeOut();
                loaddingimg.css('display', 'none');
            }
        }, 50);

        //setOutTimeAndCheckValidation(function (validationResult) {
        //    debugger;
        //    if (validationResult) {
        //        loaddingimg.css('display', 'block');
        //        // Your TblDataTableWithColumns_CallingFunction_new call goes inside the if condition
        //        TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Users/TblUsersSearch', 'TblUserSearchresults', 'Counts', 'FmUsersSearch', 'DivTblUserSearchresults', '', [], true);
        //        loaddingimg.css('display', 'none');
        //        loaddingimg.css('display', 'none');
        //    } else {
        //        // Handle the case when validation fails, if needed
        //    }
        //});
        //    });
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
})

//=====================Showing Feilds based on Role
function RoleOnChangeFunction(Roleid) {
    debugger;
    $("#DdlTcTaken").val("");
    $("#DdlDesignationId").val("");
    $(".ClsTxtParent").val("");
    //if (Roleid == 775) {
    if ($("#DdlRoleId option:selected").text().toUpperCase() == "STUDENT") {
        $(".ClsParentNameForStudent").css("display", "block");
        $(".ClsTcTaken").css("display", "block");
        $(".ClsEmptyDiv").css("display", "none");
        $(".ClsDesignationId").css("display", "none");
        $("#LblTcTaken").text("Tc Taken");
    } else {
        $(".ClsParentNameForStudent").css("display", "none");
        $(".ClsEmptyDiv").css("display", "block");
        $(".ClsTcTaken").css("display", "block");
        $(".ClsDesignationId").css("display", "block");
        $("#LblTcTaken").text("Hide in the portal");
    }
}

//===================Shows date  fields
function dateWisesearching() {
    $(".ClsDates").css("display", "block");

    //  $("#SpnSearchStartDate").attr('asp-validation-for', 'SearchStartDate');
    // $("#SpnSearchEndDate").attr('asp-validation-for', 'SearchEndDate');
    //if (condition) {
    //    $('[name="SearchStartDate"]').prop('required', true);
    //    $('[name="SearchEndDate"]').prop('required', true);
    //    $('[name="SearchStartDate"]').prev('label').addClass('required'); // Optional: Add a class to the label to indicate it's required
    //    $('[name="SearchEndDate"]').prev('label').addClass('required'); // Optional: Add a class to the label to indicate it's required
    ////}
}
//=================<<<<<<<<<<<<<<<<<<<<======In manage Users Page  Functions END



//===================>>>>>>>>>>>>>>====In CreateUsers Page  Functions START
function MoveTonextpage(url, data, BtnId) {
    debugger;
    document.getElementById("loading").style.display = "block";
    $(".nav-link").removeClass('active');
    $("#" + BtnId).addClass('active');
    data = { UserId: $("#HdnUserIdCreatePage").val() };
    CommonAjaxFunction('GET', '/Users/' + url, data, function (response) {
        $('#AppendAllUSersDetails #InnerUsersTabs').html(response);
        document.getElementById("loading").style.display = "none";
    }, function (status, error) {
        document.getElementById("loading").style.display = "none";
        //  alert("reject");
    }, false);
}
//=====================<<<<<<<<<<<<<<<<<<==In CreateUsers Page  Functions END



//===================>>>>>>>>>>>>>>====In GeneralInfoTab Page  Functions START

//// =======check username is availble or not
//$('#TxtUserName').on('input', function () {
//    try {
//        var UserName = $(this).val();
//        if ((UserName == $("#IdentityUserName").val() && $("#BtnUpdateIdentification").val() == "UpdateDetails")) {
//            $('#SpnUserName').text('');
//            $('.SpnUserNameCls').removeClass('field-validation-error');
//        }
//        else if (UserName !== '') {
//            $.ajax({
//                type: 'GET',
//                url: '/Users/CheckUserAvailability',
//                data: { UserName: $(this).val() },
//                success: function (result) {
//                    if (result.message == "NotAvailble") {
//                        $('#SpnUserName').text('Username Already Exists');
//                        $('.SpnUserNameCls').addBack('field-validation-error');
//                    } else {
//                        $('#SpnUserName').text('');
//                        $('.SpnUserNameCls').removeClass('field-validation-error');
//                    }
//                }
//            });
//        } else {
//            $('#SpnUserName').text('');
//            $('.SpnUserNameCls').removeClass('field-validation-error');
//        }
//    } catch (e) {
//        loaddingimg.css('display', 'none');
//        $("#Main_Span_Error").text("Something Error");
//    }
//});

//=====================Showing Feilds based on Role in General info
function RoleOnChangeFunctionInGeneralTab(Roleid, IsEmpty) {
    //function RoleOnChangeFunctionInGeneralTab(RoleName, IsEmpty) {
    try {
        //function RoleOnChangeFunction(Roleid) {
        debugger;
        //if (!IsEmpty) {
        if ($("#BtnUpdateIdentification").val() != "UpdateDetails") {
            $("#ChkIsUserJoined").prop("checked", false);
            //$(".ClsSessionStudent").val("");
            //$(".ClsClear").val("");
            $(".ClsClear").val("");
            //  $("#DdlDesignationId").val("");
        }
        //if (Roleid == 775) {
        // if (RoleName == "STUDENT") {
        // if ($("#" + Roleid +" option:selected").text().toUpperCase() == "STUDENT") {
        if ($("#DdlRoleIdInGeneralTab option:selected").text().toUpperCase() == "STUDENT") {
            //$(".ClsSessionStudent").css("display", "block");
            ////$(".ClsDivTeachers").css("display", "none");
            //$(".ClsDivTeachers").empty();

            //$("#LblSiblingsInSameCollege").text("Siblings in same School");
            //$("#LblSiblingsOtherCollege").text("Siblings in Other School");
            //$("#LblTcTakenGeneralTab").text("Tc Taken");
            //$("#LblInstanceUserCodeGeneralTab").text("Roll No");
            //$("#ParentDetailsTab").css("display", "");
            //$("#BtnPreview").css('display', '');


            $("#PayRoleinformation_divid").empty();

            $(".ClsSessionStudent").css("display", "block");
            $(".ClsDivTeachers").css("display", "none");
            $("#LblSiblingsInSameCollege").text("Siblings in same School");
            $("#LblSiblingsOtherCollege").text("Siblings in Other School");
            $("#LblTcTakenGeneralTab").text("Tc Taken");
            $("#LblInstanceUserCodeGeneralTab").text("Roll No");
            $("#ParentDetailsTab").css("display", "");
            $("#BtnPreview").css('display', '');


        } else {
            $("#BtnPreview").css('display', 'none !important');

            $("#ParentDetailsTab").css("display", "none");
            $(".ClsSessionStudent").css("display", "none");
            $(".ClsDivTeachers").css("display", "block");

            if (!IsEmpty) {
                $("#PayRoleinformation_divid").empty();
             CommonAjaxFunction('GET', '/Users/ManageUsersPayrole', null, function (response) {
                debugger;
                //$(".ClsDesignationId").html(response);
                 $("#PayRoleinformation_divid").append(response);

                loaddingimg.css('display', 'none');

            }, function (status, error) {
                loaddingimg.css('display', 'none');
            }, false);
            }

            $("#LblSiblingsInSameCollege").text("Child studying in same School");
            $("#LblSiblingsOtherCollege").text("Child studying in Other School ");
            $("#LblTcTakenGeneralTab").text("Hide in the portal");
            $("#LblInstanceUserCodeGeneralTab").text("Employee ID");

            //$("#BtnPreview").css('display', 'none !important');

            //$("#ParentDetailsTab").css("display", "none");
            //$(".ClsSessionStudent").css("display", "none");
            ////$(".ClsDivTeachers").css("display", "block");

            //CommonAjaxFunction('GET', '/Users/ManageUsersPayrole', null, function (response) {
            //    debugger;
            //    //$(".ClsDesignationId").html(response);
            //    $(".ClsDivTeachers").append(response);

            //    //$('#DivappendCreateNewUsers').html(response);
            //    ////  $("#BtnSaveFormInGeneralInfo").text("Update");
            //    //$('#DivUsersSearchPage').css('display', 'none');
            //    //$('#BtnBackToSearch').css('display', 'block');
            //    //$("#ParentDetailsTab").css("display", " ");
            //    // $("#BtnSaveFormInGeneralInfo").val("Update");
            //    //$(".DdlCascadDropdowns").prop("disabled", false);
            //    /* window.scrollTo(0, 0);*/
            //    loaddingimg.css('display', 'none');

            //}, function (status, error) {
            //    loaddingimg.css('display', 'none');
            //}, false);
            //$("#LblSiblingsInSameCollege").text("Child studying in same School");
            //$("#LblSiblingsOtherCollege").text("Child studying in Other School ");
            //$("#LblTcTakenGeneralTab").text("Hide in the portal");
            //$("#LblInstanceUserCodeGeneralTab").text("Employee ID");
        }
        if ($('#TcTakenYes').is(':checked')) {
            TcTakenChecking(1);
        } else {
            TcTakenChecking(0);
        }
    } catch (e) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}
////===================Shows date  fields
//function TcTakenChecking(Tctaken) {
//    debugger
//    if ($("#BtnUpdateIdentification").val() != "UpdateDetails") {
//        $(".ClsTxtTcTakesnYes").val('');
//    }
//    if (Tctaken == 1) {
//        var Roleid = $("#DdlRoleId").val();
//        if (Roleid == 775) {
//            $(".ClsDivTcTakesnYes").css("display", "block");
//            $(".ClsDivTransferDetails").css("display", "block");
//            $("#LblInstanceTransferDetailsGeneralTab").text("Transfer Details");
//        } else {
//            $(".ClsDivTcTakesnYes").css("display", "none");
//            $(".ClsDivTransferDetails").css("display", "block");
//            $("#LblInstanceTransferDetailsGeneralTab").text("Reason for Hiding");
//        }
//    }
//    else {
//        $(".ClsDivTcTakesnYes").css("display", "none");
//        $(".ClsDivTransferDetails").css("display", "none");
//    }

//}



////$("#FmGeneralInfoTab #DtTCdate").on("change", function () { datescompare(event, "Date Of Join", "Tc Date") });
//$("#FmGeneralInfoTab #DtTCdate").on("change", function () { datescompare(event,'DtDateOfJoining','DtTCdate', "Date Of Join", "Tc Date") });



////=====================================Delete Photo 
function DeletePhoto_CallingFunction() {
    // <img src="~/UserPhotos/545/217720/Profile Photo.jpg" />
    debugger;
    var UserId = $("#HdnUserId").val();
    var Deletemsg = "Photo";
    CommonDeleteFunction_Vs1(Deletemsg, "POST", "/Users/DeletePhoto_CallingFunction?ButtonName=Delete&UserId=" + UserId, function (response) {

        if (response.message == "Photo Deleted Sucessfully.") {
            $('.alert-success p').text(response.message);
            $(".alert-success").show().delay(6000).fadeOut()

            //  $("#Main_Span_Error").text(response.message);
            $("#ImgPhotoDisplay").attr("src", "/Images/No imageAvailable.gif");
            $("#FlPhoto").css("display", "block");
            $("#SpnPhotoName").text("");
            $(".ClsFileName").css("display", "none");
        } else {
            $('.alert-danger p').text(response.message);
            $(".alert-danger").show().delay(6000).fadeOut();
           // $("#Main_Span_Error").text(response.message);
        }
        window.scrollTo(0, 0);
    });
}

////=====================================Delete Users 
//$("#BtnDeleteFormInGeneralInfo").click(function (event) {
//    debugger;
//    var UserId = $("#HdnUserId").val();
//    var Deletemsg = "User";
//    CommonDeleteFunction("POST", "/Users/DeleteUser_CallingFunction?ButtonName=Delete&UserId=" + UserId, Deletemsg, function (response) {
//        $("#Main_Span_Error").text(response.message);
//        TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Users/TblUsersSearch', 'TblUserSearchresults', 'Counts', 'FmUsersSearch', 'DivTblUserSearchresults', '', [], true);
//        $("#DivappendCreateNewUsers").empty();
//        $("#DivUsersSearchPage").css('display', 'block');
//        $('#BtnBackToSearch').css('display', 'none');
//    });
//});

//  ===================================== Save Users Details in General Tab & Parent Tab =================
$("#FmGeneralInfoTab,#FmParentDetailsTab,#FmShowProfile").submit(function (event) {
    //$("#FmGeneralInfoTab,#FmParentDetailsTab").submit(function (event) {
    // $("#BtnSaveFormInGeneralInfo").click(function (event) {
    try {
        event.preventDefault();
        loaddingimg.css('display', 'block');
        var formId = event.target.id;
        $(".ErrorMessageSpan").empty();
        var identitypass = $('#IdentityPassword').val();
        var password = $('#Password').val();
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
            //var validationIds = [];
            //var validationIds2 = [];

            //Array.from(validationMessages).forEach(function (element) {
            //    // Get the last child element of each span
            //    var lastChild = element.lastElementChild;
            //    // Check if the last child element exists and is a span
            //    if (lastChild && lastChild.tagName === 'SPAN') {
            //        // Get the ID of the last child span
            //        var id = lastChild.id;
            //        // Push the ID to the array
            //        validationIds.push(id);
            //    }
            //});

            /*var SelectedRolename = $('#DdlRoleIdInGeneralTab option:selected').text();*/
            //var SelectedRoleId = $('#DdlRoleIdInGeneralTab').val();
            //if (SelectedRolename.toUpperCase() == 'STUDENT') {
            //    // DdlCategory == DdlSubCategory
            //    //DdlLMSCategory == DdlLMSSubCategory



            //}

            //if(validationMessages.length == 0 && validationMessages2.length == 0 && SelectedRolename.toUpperCase() != 'STUDENT')
            debugger;
            if (validationMessages.length == 0 && validationMessages2.length == 0) {
                loaddingimg.css('display', 'block');
                //  var formData = new FormData($("#FmGeneralInfoTab")[0]);
                var formData = new FormData($('#' + formId)[0]);
                //var ScreenName = '@ViewData["Title"]';
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
                    formData.append("RoleName", $("#DdlRoleIdInGeneralTab option:selected").text());
                    ControllerName = "ManageUsers";
                }
                //  else {
                //    loaddingimg.css('display', 'none');
                //    $("#Main_Span_Error").text("Something Error");
                //    return;
                //}

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
                           // $(".ClsFileName").css("display", "block");
                            $(".ClsFileName").css("display", "");
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
                    }
                    else {
                        $('.alert-danger p').text(response.message);
                        $(".alert-danger").show().delay(5000).fadeOut()
                    }

                    //  $("#" + formId + " #Main_Span_Error").text(response.message);


                    loaddingimg.css('display', 'none');
                    // window.scrollTo(0, 0);
                }, function (error) {
                    loaddingimg.css('display', 'none');
                    $("#Main_Span_Error").text("Something Error");
                }, true);
            }
            //else if (SelectedRolename != "STUDENT") {
            //    debugger;
            //    var containsAdmissionError = validationIds.indexOf('AdmissionNumberNew-error') !== -1;
            //    if (containsAdmissionError) {
            //        alert('Admission number error found!');
            //    } else {
            //        alert('Admission number error not found.');
            //    }
            //}
            else {
                   //if (SelectedRolename.toUpperCase() == 'STUDENT') {
                   // // DdlCategory == DdlSubCategory
                   //    //DdlLMSCategory == DdlLMSSubCategory
                   //}

                loaddingimg.css('display', 'none');
                $('.alert-danger p').text("Pleae Enter All Required Fields");
                $(".alert-danger").show().delay(5000).fadeOut();
            }
        }, 50);
    } catch (e) {
      
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
})


////function datescompare(event, start, end) {
////    event.stopImmediatePropagation();
////    var startDate = new Date(document.getElementById("DtDateOfJoining").value);
////    var endDate = new Date(document.getElementById("DtTCdate").value);
////    var error = $('#DtTCdate').closest('.form-group');
////    $(error).find('.compare').removeClass('error2');
////    if (endDate <= startDate) {
////        $(error).find('.compare').addClass('error2');
////        $(error).find('.compare').text(endName + " must be greater than " + startName + ".");
////    } else {
////        $(error).find('.compare').addClass('');
////        $(error).find('.compare').text("");
////    }
////
////=====================<<<<<<<<<<<<<<<<<<==In GeneralInfoTab Page  Functions END


////===================>>>>>>>>>>>>>>====In ParentDetailsTab Page  Functions START


function MakePrimaryContact_CallingFunction(ParentId, IsParent) {
    debugger;
    loaddingimg.css('display', 'block');
    //  var StudentId = $("#HdnUserId").val();
    performCrudOperationCommonFunction('POST', "/Users/MakePrimaryContact_CallingFunction?StudentId=" + $("#HdnUserId").val() + "&ParentId=" + ParentId + "&IsParent=" + IsParent, null, function (response) {
        debugger;
    }, function (error) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }, true);
    loaddingimg.css('display', 'none');
}


//==================== to get details for Edit
function GettingParentDetails_EditFunction(ParentId, isParentTable) {
    debugger; try {
        loaddingimg.css('display', 'block');

        MoveTonextpage('CreateNewParents?ParentId=' + ParentId + "&isParentTable=" + isParentTable, null)
        //.then(() => {
        //    loaddingimg.css('display', 'none');
        //});

        // loaddingimg.css('display', 'none');

    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        loaddingimg.css('display', 'none');
    }
}

//=====================<<<<<<<<<<<<<<<<<<==In ParentDetailsTab Page  Functions END








//// if ($('#FmGeneralInfoTab #BtnSaveFormInGeneralInfo').val() == "Update") {
//if ($('#BtnSaveFormInGeneralInfo').val() == "Update") {
//    if (identitypass != password) {

//        if (!password.match(passwordPattern)) {
//            window.scroll(0, 0);
//            $("#FmGeneralInfoTab .passwordfor").find('.ErrorMessageSpan').addClass('error2');
//            $("#FmGeneralInfoTab .passwordfor").find('.ErrorMessageSpan').text('Password must have at least 8-10 characters, must contain at least one lower case letter, one upper case letter, one digit and one special character.Allowed special chars are !@#$%^&*()+=')
//        }
//        else {
//            $("#FmGeneralInfoTab .passwordfor .ErrorMessageSpan").removeClass('error2');
//            $("#FmGeneralInfoTab .passwordfor").find('.ErrorMessageSpan').text("");
//        }
//    }
//    else {
//        $("#FmGeneralInfoTab .passwordfor .ErrorMessageSpan").removeClass('error2');
//        $("#FmGeneralInfoTab .passwordfor").find('.ErrorMessageSpan').text("");
//    }
//}
//else {
//    if (!password.match(passwordPattern)) {
//        window.scroll(0, 0);
//        $("#FmGeneralInfoTab .passwordfor").find('.ErrorMessageSpan').addClass('error2');
//        $("#FmGeneralInfoTab .passwordfor").find('.ErrorMessageSpan').text('Password must have at least 8-10 characters, must contain at least one lower case letter, one upper case letter, one digit and one special character.Allowed special chars are !@#$%^&*()+=')
//    }
//    else {
//        $("#FmGeneralInfoTab .passwordfor .ErrorMessageSpan").removeClass('error2');
//        $("#FmGeneralInfoTab .passwordfor").find('.ErrorMessageSpan').text("");
//    }
//}