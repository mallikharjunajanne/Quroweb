

//------------------------------------------this is used for Manage staff leave screen----------------------------



function DepartmentsDropdown_Caliingfunction(Dropdownid, DepartmentId, Val) {
    try {
        $.ajax({
            url: "/Attendance/DepartmentsDropdown_Caliingfunction",
            type: "GET",
            success: function (response) {
                //  $("#DdlDepartment").empty();
                $("#" + Dropdownid).empty();
                $("#" + Dropdownid).append('<option value="">' + "---------Select--------" + '</option>');
                if (Val == "Edit") {
                    $.each(response, function (i, Value2) {
                        if (Value2.value == DepartmentId) {
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


function ApplyStaffLeavePageDiv_CalingFunction(event, Userid) {
    try {
        $(".ErrorMessageSpan").empty();

        loaddingimg.css('display', 'block');
        event.preventDefault();
        // var formdata = new FormData($("#FmSearchUserPage_SearchDetails")[0]);
        debugger;
     //   window.scrollTo(0, 0);
        var Tr = $(this).closest('tr');
        var Employeename = Tr.find('td:eq(1)').text();
        var dept = Tr.find('td:eq(3)').text();
        var ScreenName = "ManageStaffLeave";
        $.ajax({
           // url: "/Attendance/_ApplyStaffLeaveByUserId_ManageStaffLeave?Userid=" + Userid,
            url: "/Attendance/ApplyStaffLeave?Userid=" + Userid + "&ScreenName=" + ScreenName,
            type: "GET",
            success: function (data) {
                debugger;
                // Append the received partial view content to the container
                $("#ApplyStaffLeavePageDiv").html(data);
                js("#PageSearchUserPage_SearchDetails_Div").hide();

                js("#MainScreenHeadingId").empty();
                //$("#MainScreenHeadingId").closest("h6").remove();

                js("#TableHeadingId").text('ALLOTED LEAVES DETAILS');
                js
                js("#SpanEmpName").text(Employeename);
                js("#home-tab").text('Alloted Leaves');
                js("#SpanEmpDept").text(dept);

               // $("#EmployeeInfo").show();
                //LeaveTypesCAllingTableView(event);
                // Pagination($("#counts").text(), 'TblLeaveDeligationAuthorityList_SearchedRecords');

               loaddingimg.css('display', 'none');
            },
            error: function () {
               loaddingimg.css('display', 'none');
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (e) {
       loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}


function DdlLmsSubCategory_Calingfunction(buttonId, EffectingDropdownid) {
    try {
        debugger;
        $("#ErrorMessageSpan").empty();
        var PayrollCategoryId = $("#" + buttonId).val();
        if (PayrollCategoryId == "") {
            $("#" + EffectingDropdownid).empty();
            $("#" + EffectingDropdownid).append('<option value="" >Select LMS Sub Category</option>');
            $("#" + EffectingDropdownid).prop('disabled', true);
            return;
        }
        //var InstanceClassificationId = $("#Department_Id").val();

        $.ajax({
            url: "/Attendance/DdlLmsSubCategory_Calingfunction?PayrollCategoryId=" + PayrollCategoryId,
            type: "GET",
            success: function (response) {
                // $("#AppliedEmployeesNames_Id").empty();
                $("#" + EffectingDropdownid).empty();
                $("#" + EffectingDropdownid).append('<option value="" >Select LMS Sub Category</option>');

                $.each(response, function (i, Value2) {
                    $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
                });
                if (response.length <= 0) {
                    $("#" + EffectingDropdownid).prop('disabled', true);
                } else {
                    $("#" + EffectingDropdownid).prop('disabled', false);
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


function DdlLmsCategory_Calingfunction(EffectingDropdownid) {
    try {
        debugger;
        $("#ErrorMessageSpan").empty();
        $.ajax({
            url: "/Attendance/DdlLmsCategory_Calingfunction",
            type: "GET",
            success: function (response) {
                $("#" + EffectingDropdownid).empty();
                $("#" + EffectingDropdownid).append('<option value="">Select LMS category</option>');
                $.each(response, function (i, Value2) {
                    $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                });

            }
            ,
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
};


function FN_ClearValues(Formid) {
    try {
        debugger;
        document.getElementById(Formid).reset(); // Reset the form

        $("#TblLeaveDeligationAuthorityList_SearchedRecords").empty();

       // $("#Fm_TblLeaveDeligationAuthorityList_SearchedRecords").hide();    
        $("#counts").text('0');
        $(".ErrorMessageSpan").empty();


        if (Formid == 'FmLeavesSearchPage_SearchDetails') {
            $("#DdlEmployee").empty();
            $("#DdlEmployee").append("<option value=''>Please select Employee</option>")
            $("#DdlEmployee").prop("disabled", true);
            $("#TblLeavesSearchedResultPage_Div").hide();
            $("#TblLeaveDeligationAuthorityList_SearchedRecords").empty();
        } else {
            $("#_TblStaffUserList_ManageStaffLeave_SearchedRecords_Div").hide();
            $("#Dates_Div").hide();
            $("#DaySession").hide();
        }
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}


function BackTOSearhUserLeaves(event) {
    try {
        debugger;
        TblDataTableWithColumns_CallingFunction(event, 'noStop', '/Attendance/_TblStaffUserList_ManageStaffLeave', 'TblStaffList_SearchedRecords', 'counts', 'FmSearchUserPage_SearchDetails', '_TblStaffUserList_ManageStaffLeave_SearchedRecords_Div');

      //  _TblStaffUserList_ManageStaffLeave(event);
        $("#PageSearchUserPage_SearchDetails_Div").show();
        //$("#TblLeavesSearchedResultPage_Div").show();
        $("#ApplyStaffLeavePageDiv").empty();
        $(".ErrorMessageSpan").empty();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}