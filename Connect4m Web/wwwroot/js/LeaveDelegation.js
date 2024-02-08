



////  To get Partial View of AddUserPage
function AddUserPage_PagePartialViewFunction() {
    try {
        $(".ErrorMessageSpan").empty();

        var ApprovingAuthorityName = $("#DdlUser").val();
        if (ApprovingAuthorityName == "") {
            $("#Main_Span_Error").text("Please Select Approving Authority User first !");
            return;
        }

        debugger;
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/_AddUserPage_PagePartialViewFunction",
            type: "GET",
            success: function (data) {
                debugger;
                // Append the received partial view content to the container
                $("#AddUserPage_Div").html(data);
                DepartmentsDropdown_Caliingfunction('DdlDepartment_AddUserPage');
                DdlDesignation_AddUserPage_Calingfunction('DdlDesignation_AddUserPage');
                Roles_InstanceRole_SELByInstanceId_CallingFunction('DdlRole_AddUserPage');
                //LeaveTypesCAllingTableView(event);
            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
            }

        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}

////  To get Partial View of Add DelegationPage
function AddLeaveDelegationPage_PagePartialViewFunction() {
    try {
        $(".ErrorMessageSpan").empty();
        debugger;
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/_AddLeaveDelegationPage_LeaveDelegation",
            type: "GET",
            success: function (data) {
                debugger;
                $("#TblLeaveDelegationList_SearchedRecords_Div").empty();
                // Append the received partial view content to the container
                $("#AddLeaveDelegationPage_Div").html(data);
                DepartmentsDropdown_Caliingfunction('DdlDepartment');
                Roles_InstanceRole_SELByInstanceId_CallingFunction('DdlRole');
                //LeaveTypesCAllingTableView(event);
            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
            }

        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}

function _TblLeaveDelegationAuthorityList_LeaveDeligation(event) {
     try {
    $(".ErrorMessageSpan").empty();
    event.preventDefault();
    loaddingimg.css('display', 'block');
    var currentPage = "";
    //if ($('#TblLeaveDelegationAuthorityList_SearchedRecords_Div').is(':empty') == false) {
    //    var table = js('#TblLeaveDeligationAuthorityList_SearchedRecords').DataTable();
    //     currentPage = table.page.info().page;
    //    table.destroy();
    //}
    var formdata = new FormData($("#FmAddUserPage_SearchDetails")[0]);
    debugger;
    // Make AJAX call to the controller action
    $.ajax({
        url: "/Attendance/_TblLeaveDelegationAuthorityList_LeaveDeligation",
        type: "POST",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (data) {
            debugger;

            // Append the received partial view content to the container
            $("#TblLeaveDelegationAuthorityList_SearchedRecords_Div").html(data);

            //var ExcelDownloadColumnsNo = [0, 1, 2, 3, 4];
            //TblDataTableWith_OutColumns_CallingFunction("TblLeaveDeligationAuthorityList_SearchedRecords", 'noresponse', 'Noresponse', currentPage, 'LeaveLevels', ExcelDownloadColumnsNo);

            //LeaveTypesCAllingTableView(event);
           // Pagination($("#counts").text(), 'TblLeaveDeligationAuthorityList_SearchedRecords');
            DataBind(currentPage);
            loaddingimg.css('display', 'none');
        },
        error: function () {
            $("#Main_Span_Error").text("Something Error");

            loaddingimg.css('display', 'none');
        }

    });
    } catch (e) {
         $("#Main_Span_Error").text("Something Error");

         loaddingimg.css('display', 'none');
     }
}

function AddUserByRadioBtn(event, HdnDelegationTo_UserId) {
    debugger;
    $(".ErrorMessageSpan").empty();

    var Userid = $("#DdlUser").val();
    if (Userid == HdnDelegationTo_UserId) {
        $("#Main_Span_Error").text("Approving Authority user and Delegate To user should not be same");
        window.scrollTo(0, 0);
        return;
    }
    var Tr = $(event.target).closest('tr');
    var name = Tr.find('td:eq(1)').text();


    $("#DelegationToName").text(name);
    $("#HdnDelegationTo_UserId").val(HdnDelegationTo_UserId);
    $("#LnkSelectUser").text('Change User');
    $("#AddUserPage_Div").empty();
}


//This is for save and Update Leave delegation
function SaveLeavedelegation(event) {
    try {
        debugger;
        event.preventDefault();
        loaddingimg.css('display', 'block');
       
        $(".ErrorMessageSpan").empty();

        var DdlDepartment = $("#DdlDepartment").val();
        var DdlRole = $("#DdlRole").val();
        var DdlUser = $("#DdlUser").val();
        var TxtFromDate = $("#TxtFromDate").val();
        var TxtToDate = $("#TxtToDate").val();
        var HdnDelegationTo_UserId = $("#HdnDelegationTo_UserId").val();


        if (DdlDepartment === "" || DdlRole === "" || DdlUser === "" || TxtFromDate === "" || TxtToDate === "") {
            $("#Main_Span_Error").text('Following fields have invalid data :');
            debugger;
            if (DdlDepartment === "") {
                $("#DdlDepartment_Span_Error").text('Department');
                //$("#TxtLeavetype_Createpage").css({
                //    'border':'2px solid red',
                //})
            }
            if (DdlRole === "") {
                $("#DdlRole_Span_Error").text('Role');
                //$("#TxtLeaveShortName_Createpage").css({
                //    'border':'1px solid red',
                //})
            }
            if (DdlUser === "") {
                $("#DdlUser_Span_Error").text('User');
                //$("#TxtLeavetype_Createpage").css({
                //    'border':'2px solid red',
                //})
            }
            if (TxtFromDate === "") {
                $("#TxtFromDate_Span_Error").text('From Date');
                //$("#TxtLeaveShortName_Createpage").css({
                //    'border':'1px solid red',
                //})

            }
            if (TxtToDate === "") {
                $("#TxtToDate_Span_Error").text('To Date');
                //$("#TxtLeavetype_Createpage").css({
                //    'border':'2px solid red',
                //})
            }
            window.scrollTo(0, 0);
            loaddingimg.css('display', 'none');
            return;
        }
        else if (HdnDelegationTo_UserId === "") {
           // $("#Main_Span_Error").text('Please add User to Delegate.');
            $('.alert-danger p').text('Please add User to Delegate.');
            $(".alert-danger").show().delay(6000).fadeOut();
            window.scrollTo(0, 0);
            loaddingimg.css('display', 'none');
            return;
        }
        else if (true) {
            debugger;
            var date = new Date();
            var Year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);
            var TodayDate = Year + '-' + month + '-' + day;

            if (Date.parse(TodayDate) > Date.parse(TxtFromDate) || Date.parse(TodayDate) > Date.parse(TxtToDate)) {
               // $("#Main_Span_Error").text("Dates cannot be less than Today's Date.");
                $('.alert-danger p').text("Dates cannot be less than Today's Date.");
                $(".alert-danger").show().delay(6000).fadeOut();
                window.scrollTo(0, 0);
                loaddingimg.css('display', 'none');
                return;
            }
            else if (Date.parse(TxtToDate) < Date.parse(TxtFromDate)) {
               // $("#Main_Span_Error").text("From Date cannot be greater than To Date.");
                $('.alert-danger p').text('From Date cannot be greater than To Date.');
                $(".alert-danger").show().delay(6000).fadeOut();
                window.scrollTo(0, 0);
                loaddingimg.css('display', 'none');
                return;
            }
        }

        // var formData = $('#Fm_TblUserLeaveAllocationList_SearchedRecords').serialize();
        var formData = new FormData($("#FmAddLeaveDelegationPage_SaveDetails")[0]);
        //var formData = new FormData(this);
        var ButtonName = $("#BtnSaveId").val();
        // var formData = new FormData(this);
       
        $.ajax({
            url: "/Attendance/LeaveDelegation?ButtonName=" + ButtonName,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                debugger;

                if (response.message == "Record inserted successfully." || response.message == "Record updated successfully.") {
                    $("#BtnSaveId").prop('disabled', true);
                   // $("#Main_Span_Error").text(response.message);
                    $('.alert-success p').text(response.message);
                    $(".alert-success").show().delay(6000).fadeOut()
                }
                else {
                    //$("#Main_Span_Error").text(response.message);
                    $('.alert-danger p').text(response.message);
                    $(".alert-danger").show().delay(6000).fadeOut();
                }
                window.scrollTo(0, 0);
                loaddingimg.css('display', 'none');
            },
            error: function (xhr, status, error) {
                loaddingimg.css('display', 'none');
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}


//This is for Edit
function EditValuesGettingFunction(DdlDepartmentid, DdlRoleId, DelegationFromUserId, DelegationToUserId, DelegationId) {
    try {
        debugger;
        $(".ErrorMessageSpan").empty();

        var Tr = $(this).closest('tr');

        //  var TBLLeavetypeid = Tr.find("td:eq(2)").text();
        loaddingimg.css('display', 'block');

        $.ajax({
            url: "/Attendance/_AddLeaveDelegationPage_LeaveDelegation",
            type: "GET",
            success: function (data) {
                debugger;
                //$("#TblLeaveDelegationList_SearchedRecords_Div").empty();
                // Append the received partial view content to the container

                $("#TblLeaveDelegationList_SearchedRecords_Div").empty();
                $("#AddLeaveDelegationPage_Div").html(data);
                DepartmentsDropdown_Caliingfunction('DdlDepartment', DdlDepartmentid, 'Edit');
                Roles_InstanceRole_SELByInstanceId_CallingFunction('DdlRole', DdlRoleId, 'Edit');

                GetApprovingAuthorityUserName_BY_SelectRoleId(DelegationFromUserId, DdlDepartmentid, DdlRoleId, 'Edit');


                var name = Tr.find('td:eq(2)').text();
                $("#DelegationToName").text(name);
                $("#HdnDelegationTo_UserId").val(DelegationToUserId);
                // var TxtFromDate = Tr.find('td:eq(4)').text().trim();
                // var TxtToDate = Tr.find('td:eq(5)').text();
                debugger;

                var dateParts = Tr.find('td:eq(4)').text().split('-');
                var formattedFromDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
                $("#TxtFromDate").val(formattedFromDate);


                var datePartsTxtToDate = Tr.find('td:eq(5)').text().split('-');
                var formattedTxtToDate = datePartsTxtToDate[2] + '-' + datePartsTxtToDate[1] + '-' + datePartsTxtToDate[0];
                $("#TxtFromDate").val(formattedFromDate);

                $("#TxtToDate").val(formattedTxtToDate);
                $("#HdnLeaveDelegationId").val(DelegationId);
                $("#BtnSaveId").val("Update").text('Update');
                $("#BtnClearSearchForm").prop("disabled", true);

                loaddingimg.css('display', 'none');

            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
                loaddingimg.css('display', 'none');
            }

        });

    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }

};

//This is for delete

//----------------------  Delete popup code start----------------------------
function DeleteLeaveDelegationCallingFunction(LeaveDelegationId) {
    debugger;
    CommonDeleteFunction_Vs1('Delegation Details', "POST", "/Attendance/LeaveDelegation?ButtonName=Delete&LeaveDelegationId=" + LeaveDelegationId, function (response) {

        TblLeaveDelegationList_SearchedRecords_PagePartialViewFunction();
    });
}


function FN_ClearValuesDeleigation(Formid) {
    try {
       // document.getElementById(Formid).reset(); // Reset the form
        $("#DelegationToName").text('');
        
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}

////  To get Partial View of SearchLeaveTypePage
function TblLeaveDelegationList_SearchedRecords_PagePartialViewFunction() {
    try {

        debugger;
        // Make AJAX call to the controller action
        $.ajax({
            url: "/Attendance/_TblLeaveDelegationList_LeaveDeligation",
            type: "GET",
            success: function (data) {
                debugger;
                // Append the received partial view content to the container
                $("#TblLeaveDelegationList_SearchedRecords_Div").html(data);

                Pagination($("#counts").text(), 'TblLeaveDeligationList_SearchedRecords');
                //LeaveTypesCAllingTableView(event);
            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
            }

        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}




function DepartmentsDropdown_Caliingfunction(Dropdownid,DepartmentId,Val,forEditid) {
    try {
        $.ajax({
            url: "/Attendance/DepartmentsDropdown_Caliingfunction",
            type: "GET",
            success: function (response) {
                //  $("#DdlDepartment").empty();
                $("#" + Dropdownid).empty();
                debugger;
                if (Val == "SelectName" || forEditid == "SelectName") {
                    $("#" + Dropdownid).append('<option value="0" >Select a Department</option>');
                } else {
                    $("#" + Dropdownid).append('<option value="">' + "---------Select--------" + '</option>');
                }
                if (Val == "Edit") {
                    $.each(response, function (i, Value2) {

                        if (Value2.value == DepartmentId ) {
                            debugger;
                            $("#" + Dropdownid).append('<option  value="' + Value2.value + '" >' + Value2.text + '</option>');

                            $("#" + Dropdownid+" option").prop("selected", true);
                        }
                        else {
                            $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                        }

                        //$("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                    });
                } else {
                    $.each(response, function (i, Value2) {                 
                        $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                    });
                }
            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
};


function Roles_InstanceRole_SELByInstanceId_CallingFunction(Dropdownid, Roleid,Val) {
    try {
        $.ajax({
            url: "/Attendance/Roles_InstanceRole_SELByInstanceId_CallingFunction",
            type: "GET",
            success: function (response) {
                // $("#DdlRole").empty();
                $("#" + Dropdownid).empty();
                $("#" + Dropdownid).append('<option value="">' + "---------Select--------" + '</option>');


                if (Val == "Edit") {
                    $.each(response, function (i, Value2) {

                        if (Value2.value == Roleid) {
                            debugger;
                            $("#" + Dropdownid).append('<option  value="' + Value2.value + '" >' + Value2.text + '</option>');

                            $("#" + Dropdownid + " option").prop("selected", true);
                        }
                        else {
                            $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                        }


                        $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                    });



                } else {
                    $.each(response, function (i, Value2) {
                        $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                    });
                }
            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
};


function GetApprovingAuthorityUserName_BY_SelectRoleId(Approveruserid, InstanceClassificationIdForEdit, InstanceRoleIdForEdit, val) {
 
    try {
        debugger;
        $(".ErrorMessageSpan").empty();
        var InstanceClassificationId;
        var InstanceRoleId;
        if (val == "Edit") {
             InstanceClassificationId = InstanceClassificationIdForEdit;
             InstanceRoleId = InstanceRoleIdForEdit;
        }
        else {
             InstanceClassificationId = $("#DdlDepartment").val();
             InstanceRoleId = $("#DdlRole").val();
        }
        
        //if (InstanceClassificationId == "") {
        //    $("#User_Id_CreatePage").empty();
        //    return;
        //}
        $.ajax({
            url: "/Attendance/GetApprovingAuthorityUserName_BY_SelectRoleId?InstanceRoleId=" + InstanceRoleId + "&InstanceClassificationId=" + InstanceClassificationId,
            type: "GET",
            success: function (response) {
               
                $("#DdlUser").empty();
                if (response.length > 0) {
                    $("#DdlUser").append('<option value="">' + "---------Select--------" + '</option>');
                }

                if (val == "Edit") {
                    $.each(response, function (i, Value2) {
                        debugger;
                        if (Value2.value == Approveruserid) {
                            debugger;
                            $("#DdlUser").append('<option  value="' + Value2.value + '" >' + Value2.text + '</option>');
                            $("#DdlUser option").prop("selected", true);
                        }
                        else {
                            $("#DdlUser").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                        }
                    });
                }
                else {
                    $.each(response, function (i, Value2) {                     
                            $("#DdlUser").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');                       
                    });
                }


             

                if (val == "Edit") {
                    var DdlUser = $("#DdlUser").val();
                   // var User_Id_CreatePage = $("#User_Id_CreatePage").val();
                    debugger;
                    if (DdlUser === "") {
                        debugger;
                        $("#AddLeaveDelegationPage_Div").empty();
                      
                       // TblLeaveDelegationList_SearchedRecords_PagePartialViewFunction();
                       // $("#AddLeaveDelegationPage_Div").empty();
                    }
                    else {
                        $("#AddLeaveDelegationPage_Div").show();
                        $("#TblLeaveDelegationList_SearchedRecords_Div").empty();
                    }
                }
            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });


        
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }

};

function DdlDesignation_AddUserPage_Calingfunction(Dropdownid) {
    try {
        $.ajax({
            url: "/Attendance/DdlDesignation_AddUserPage_Calingfunction",
            type: "GET",
            success: function (response) {
                //  $("#DdlDepartment").empty();
                $("#" + Dropdownid).empty();
                $("#" + Dropdownid).append('<option value="">' + "---------Select--------" + '</option>');

                $.each(response, function (i, Value2) {
                    $("#" + Dropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                });

            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
};

function DdlClassId_Calingfunction(buttonId, EffectingDropdownid) {
    try {
        $("#ErrorMessageSpan").empty();
        var InstanceClassificationId = $("#" + buttonId).val();
        //var InstanceClassificationId = $("#Department_Id").val();
        debugger;
        $.ajax({
            url: "/Attendance/DdlClassId_Calingfunction?InstanceClassificationId=" + InstanceClassificationId,
            type: "GET",
            success: function (response) {
                // $("#AppliedEmployeesNames_Id").empty();
                $("#" + EffectingDropdownid).empty();


                $("#" + EffectingDropdownid).append('<option value="" >Please select a section</option>');
                $.each(response, function (i, Value2) {

                    $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')

                });
                if (response.length <= 0) {
                    $("#" + EffectingDropdownid).prop('disabled', true);
                } else {
                    $("#" + EffectingDropdownid).prop('disabled', false);
                }

            }
            ,
            error: function (xhr, status, error) {

                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (x) {

        $("#Main_Span_Error").text("Something Error");
    }
};

function BackTOSearhLeaveTypes(event) {
    try {
        TblLeaveDelegationList_SearchedRecords_PagePartialViewFunction();
        //  LeaveTypesCAllingTableView(event);
        $("#AddLeaveDelegationPage_Div").empty();

        $(".ErrorMessageSpan").empty();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}




//get employee name in list box in Leave Cancellation screen
function AppliedEmployeeNames_Caliingfunction(buttonId, EffectingDropdownid, AppliedUserId, val, InstanceClassificationIdForEdit) {
    try {
        debugger;
        var InstanceClassificationId = "";
        if (InstanceClassificationIdForEdit != "0" && InstanceClassificationIdForEdit != "" && InstanceClassificationIdForEdit != undefined) {
            InstanceClassificationId = InstanceClassificationIdForEdit;
        } else {
            InstanceClassificationId = $("#" + buttonId).val();
        }
        //var InstanceClassificationId = $("#" + buttonId).val();

        if (InstanceClassificationId != 0) {
            $.ajax({
                url: "/Attendance/AppliedEmployeeNames_Caliingfunction?InstanceClassificationId=" + InstanceClassificationId,
                type: "GET",
                success: function (response) {
                    // $("#AppliedEmployeesNames_Id").empty();
                    $("#" + EffectingDropdownid).empty();

                    // if (val == "selectname") {
                    $("#" + EffectingDropdownid).append("<option value=''>Please select Employee</option>");
                    // }

                    if (val == "Edit") {
                        $.each(response, function (i, Value2) {

                            if (Value2.value == AppliedUserId) {
                                debugger;
                                $("#" + EffectingDropdownid).append('<option  value="' + Value2.value + '" >' + Value2.text + '</option>');

                                $("#" + EffectingDropdownid + " option").prop("selected", true);
                            }
                            else {
                                $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                            }
                        });


                        //this is for if any value is empty when edit   ,it return same page

                        //var DdlUser = $("#" + EffectingDropdownid).val();
                        //    debugger;
                        //    if (DdlUser === "") {
                        //        debugger;
                        //        $("#profile-tabs").tab('show');
                        //        $("#profile-tabs").click();                              
                        //    }
                        //    else {
                        //        //$("#AddLeaveDelegationPage_Div").show();
                        //        //$("#TblLeaveDelegationList_SearchedRecords_Div").empty();
                        //    }
                    } else {

                        $.each(response, function (i, Value2) {
                            $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
                        });
                    }
                    if (response.length > 0) {
                        $("#" + EffectingDropdownid).prop('disabled', false);
                    } else {
                        $("#" + EffectingDropdownid).prop('disabled', true);
                    }
                },
                error: function (xhr, status, error) {
                    $("#Main_Span_Error").text("Something Error");
                }
            });
        } else {
            $("#" + EffectingDropdownid).empty();
            if (val == "selectname") {
                $("#" + EffectingDropdownid).append("<option value=''>Please select Employee</option>");
            }
            $("#" + EffectingDropdownid).prop('disabled', true);
        }

    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }

};

     