




   function LeaveLevelsDropdown_Caliingfunction() {
    try {
        $.ajax({
            url: "/Attendance/LeaveLevelsDropdown_Caliingfunction",
            type: "GET",
            success: function (response) {
                $("#Levels_Id").empty();
                $("#Levels_Id").append('<option value="">' + "---------Select--------" + '</option>');

                $("#Levels_Id_CreatePage").empty();
                $("#Levels_Id_CreatePage").append('<option value="">' + "---------Select--------" + '</option>');

                $.each(response, function (i, Value2) {
                    $("#Levels_Id").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
                    $("#Levels_Id_CreatePage").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
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

   function DepartmentsDropdown_Caliingfunction() {
    try {
        $.ajax({
            url: "/Attendance/DepartmentsDropdown_Caliingfunction",
            type: "GET",
            success: function (response) {
                $("#Department_Id").empty();
                $("#Department_Id").append('<option value="">' + "---------Select--------" + '</option>');
                $("#Department_Id_CreatePage").empty();
                $("#Department_Id_CreatePage").append('<option value="">' + "---------Select--------" + '</option>');
                $.each(response, function (i, Value2) {
                    $("#Department_Id").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                    $("#Department_Id_CreatePage").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
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



    // $("#Department_Id").change(AppliedEmployeeNames_Caliingfunction);

    //get employee name in list box
    function AppliedEmployeeNames_Caliingfunction(buttonId, EffectingDropdownid, AppliedUserId, val) {
        try {
            var InstanceClassificationId = $("#" + buttonId).val();
            //var InstanceClassificationId = $("#Department_Id").val();

            $.ajax({
                url: "/Attendance/AppliedEmployeeNames_Caliingfunction?InstanceClassificationId=" + InstanceClassificationId,
                type: "GET",
                success: function (response) {
                    // $("#AppliedEmployeesNames_Id").empty();
                    $("#" + EffectingDropdownid).empty();

                    if (val == "Edit") {
                        $.each(response, function (i, Value2) {
                            if (AppliedUserId == Value2.value) {
                                //   $("#AppliedEmployeesNames_Id_CreatePage option").prop("selected", false);
                                $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
                                //$("#AppliedEmployeesNames_Id_CreatePage option").prop("selected", true);
                                $("#AppliedEmployeesNames_Id_CreatePage").val(Value2.value);
                                // $("#AppliedEmployeesNames_Id_CreatePage option").prop("selected", true);
                            }
                            else {
                                $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
                            }
                        });
                    } else {
                        $.each(response, function (i, Value2) {
                            $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
                        });
                    }
                    //this is for If Value is empty when click on Edit ,It returns Same
                    if (val == "Edit") {
                        var DdlUser = $("#" + EffectingDropdownid).val();
                        if (DdlUser === "") {
                            debugger;
                            BackTOSearhLevels()
                            return;
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

    function Roles_InstanceRole_SELByInstanceId_CallingFunction() {
    try {
        $.ajax({
            url: "/Attendance/Roles_InstanceRole_SELByInstanceId_CallingFunction",
            type: "GET",
            success: function (response) {
                $("#Roles_Id_CreatePage").empty();
                $("#Roles_Id_CreatePage").append('<option value="">' + "---------Select--------" + '</option>');
                $.each(response, function (i, Value2) {
                    $("#Roles_Id_CreatePage").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
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

    function GetUserName_BY_SelectRoleId(Approveruserid, val) {
        debugger;
        try {
            debugger;
            var InstanceClassificationId = $("#Department_Id_CreatePage").val();
            var InstanceRoleId = $("#Roles_Id_CreatePage").val();
            if (InstanceClassificationId == "") {
                $("#User_Id_CreatePage").empty();
                return;
            }
            $.ajax({
                url: "/Attendance/GetUserName_BY_SelectRoleId?InstanceRoleId=" + InstanceRoleId + "&InstanceClassificationId=" + InstanceClassificationId,
                type: "GET",
                success: function (response) {
                    $("#User_Id_CreatePage").empty();
                    if (response.length > 0) {
                        $("#User_Id_CreatePage").append('<option value="">' + "---------Select--------" + '</option>');
                    }

                    $.each(response, function (i, Value2) {
                       
                        if (Value2.value == Approveruserid && val == "Edit") {
                          
                            $("#User_Id_CreatePage").append('<option  value="' + Value2.value + '" >' + Value2.text + '</option>');
                            $("#User_Id_CreatePage option").prop("selected", true);
                        }
                        else {
                            $("#User_Id_CreatePage").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                        }
                    });
        //this is for If Value is empty when click on Edit ,It returns Same
                    if (val == "Edit") {
                        var DdlUser = $("#User_Id_CreatePage").val();
                        if (DdlUser === "") {
                            debugger;
                            BackTOSearhLevels()
                            return;
                        }                     
                    }
                },
                error: function (xhr, status, error) {
                    $("#Main_Span_Error").text("Something Error");
                }
            });

           
            //if (val == "Edit") {
            //    var Levels_Id_CreatePage = $("#Levels_Id_CreatePage").val();
            //    var User_Id_CreatePage = $("#User_Id_CreatePage").val();
            //    debugger;
            //    if (Levels_Id_CreatePage === "" || InstanceClassificationId === "" || InstanceRoleId === "" || User_Id_CreatePage === "" || User_Id_CreatePage === null) {
            //        debugger;
            //        BackTOSearhLevels();
            //        //return;
            //    }
            //}
        } catch (x) {
            $("#Main_Span_Error").text("Something Error");
        }
    };

    function LeaveLevels_In_Table_Caliingfunction(event, val) {
    try {
        debugger;
        if (val != 12) {
            event.preventDefault();
            $("#ErrorMessageSpan").empty();
            loaddingimg.css('display', 'block');
        }     
        var InstanceClassificationId_DepartMent = $("#Department_Id").val();
        var LevelId = $("#Levels_Id").val();
        var Userid = $("#AppliedEmployeesNames_Id").val();
        
        $.ajax({
            url: "/Attendance/LeaveLevels_In_Table_Caliingfunction?InstanceClassificationId_DepartMent=" + InstanceClassificationId_DepartMent + "&LevelId=" + LevelId + "&Userid=" + Userid,//+"&values="+ queryString,
            type: "GET",
            //  data: {values: Userid },
            success: function (response) {

                //if (response.length <= 0) {
                //    $("#LeaveLevels_SearchRecords_Table ").hide();
                //    $("#CountOfRecords_LeaveLevels").text("");
                //    $("#CountOfRecords_LeaveLevels").text("NO RECORDS");
                //    //$("#ExportExcelLink").hide();
                //}
                //else {
                    //$("#CountOfRecords_LeaveLevels").text("");

                //$("#CountOfRecords_LeaveLevels").text("YOUR SEARCH RESULTED " + response.length + " RECORD(S).");  $("#CountOfRecords_LeaveLevels").text("");


                $("#Counts").text("");
                $("#Counts").text(response.length);

                    var table = js('#LeaveLevels_SearchRecords_Table').DataTable();
                    var currentPage = table.page.info().page;
                    table.destroy();


                    //$("#LeaveLevels_SearchRecords_Table tbody").empty();
                    //var LeaveLevelId = "";
                    //var Approveruserid = "";
                    //var AppliedUserId = "";
                    //var DeleteBTN = "";
                    //$.each(response, function (i, Value2) {
                    //    DeleteBTN = "<p class='fa fa-trash -o' title='Click to delete this record' style='font-size:18px; color:red; cursor:pointer; '><input type='text' hidden  id='id_For_Delete' value=''></p>";
                    //    LeaveLevelId = "<input type='text' id='LeaveLevelId_TBL' value='" + Value2.leaveLevelId + "' hidden />";
                    //    Approveruserid = "<input type='text' id='Approveruserid_TBL' value='" + Value2.userid + "' hidden />";
                    //    AppliedUserId = "<input type='text' id='AppliedUserId_TBL' value='" + Value2.appliedUserId + "' hidden />";
                    //    $("#LeaveLevels_SearchRecords_Table tbody").append(
                    //        "<tr>" +
                    //        "<td><a id='Leavelevelid' style='cursor: pointer;font-weight: bold;'>" + Value2.levelName + "</a>" + LeaveLevelId + "<input type='text' id='LevelID_TBL' value='" + Value2.levelID + "' hidden /><input type='text' id='InstanceDesignationId_TBL' value='" + Value2.instanceDesignationId + "' hidden /><input type='text' id='instanceClassificationId_TBL' value='" + Value2.instanceClassificationId + "' hidden /></td>" +
                    //        // "<td><a id='Leavelevelid' style='cursor: pointer;font-weight: bold;'>" + Value2.levelName + "</a></td>" +
                    //        "<td>" + Value2.classificationName + "</td>" +
                    //        "<td>" + Value2.roleName + "</td>" +
                    //        "<td>" + Value2.appliedUserName + " " + AppliedUserId + "</td>" +
                    //        "<td>" + Value2.approverUserName + "" + Approveruserid + "</td>" +
                    //        "<td style='padding: 6px 21px;'>" + DeleteBTN + "</td>" +
                    //        "</tr>"
                    //    );
                    //});



                    //if (val == 12) {
                      

                    var ExcelDownloadColumnsNo = [0, 1, 2, 3, 4,5];
                    TblDataTableWith_OutColumns_CallingFunction("LeaveLevels_SearchRecords_Table", response, response.length, currentPage, 'LeaveLevels', ExcelDownloadColumnsNo, '','LeaveLevels_SearchRecords_Table_Div');
                  //  }

                     //   $("#LeaveLevels_SearchRecords_Table").show();
                  /*  $("#ExportExcelLink").show();*/
                    
               // }
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

    function FN_LeaveLevels_Save(event) {
          try {
                event.preventDefault();
              $(".ErrorMessageSpan").empty();
              loaddingimg.css('display', 'block');
            ScrollToSelected_ID('Main_Span_Error');
            var Levels_Id_CreatePage = $("#Levels_Id_CreatePage").val();
            var Department_Id_CreatePage = $("#Department_Id_CreatePage").val();

            var Roles_Id_CreatePage = $("#Roles_Id_CreatePage").val();
            var User_Id_CreatePage = $("#User_Id_CreatePage").val();


            if (Levels_Id_CreatePage === "" || Department_Id_CreatePage === "" || Roles_Id_CreatePage === "" || User_Id_CreatePage === "" || User_Id_CreatePage === null) {
                $("#Main_Span_Error").text('Following fields have invalid data :');
            debugger;
            if (Levels_Id_CreatePage === "") {
                $("#Levels_Id_CreatePage_Span_Error").text('Level');
            }
            if (Department_Id_CreatePage === "") {
                $("#Department_Id_CreatePage_Span_Error").text('Class/Department');
            }
            if (Roles_Id_CreatePage === "") {
                $("#Roles_Id_CreatePage_Span_Error").text('Role');
            }
            if (User_Id_CreatePage === null || User_Id_CreatePage == "") {
                $("#User_Id_CreatePage_Span_Error").text('User');
                }
                loaddingimg.css('display', 'none');
            return;
        }


            var EmployeeUserids = $("#AppliedEmployeesNames_Id_CreatePage").val();

              var formData = new FormData($("#Form_CreatePage")[0]);
              
            $.ajax({
            url: "/Attendance/LeaveLevels?EmployeeUserids=" + EmployeeUserids,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                debugger;
            //$(".ErrorMessageSpan").empty();
            //$("#Main_Span_Error").text(response.message);

            if (response.message == "Record inserted successfully" || response.message == "Record Updated successfully." || response.message == "Record updated successfully.") {
                $("#SaveLeaveLevels_CreatePage_BTN").prop('disabled', true);
                $('.alert-success p').text(response.message);
                $(".alert-success").show().delay(6000).fadeOut()
            } else {
                $('.alert-danger p').text(response.message);
                $(".alert-danger").show().delay(6000).fadeOut();
            }
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


    // This is for edit
    $("#LeaveLevels_SearchRecords_Table tbody").on("click", "#Leavelevelid", function () {
        try {

            FN_ClearValues('clearbutton1_CreatePage', 'Form_CreatePage', 'AppliedEmployeesNames_Id_CreatePage');
            debugger;

            AddNewLevels('Edit');
            var Tr = $(this).closest('tr');
            loaddingimg.css('display', 'block');

            var LeaveLevelId = Tr.find("#LeaveLevelId_TBL").val();
            //var levelType = Tr.find('td:nth-child(1)').text();
            //var Department = Tr.find('td:nth-child(2)').text();
            //var Rolename = Tr.find('td:nth-child(3)').text();
            debugger;
            var levelTypeId = Tr.find("#LevelID_TBL").val();
            var DepartmentId = Tr.find("#instanceClassificationId_TBL").val();
            var RolenameId = Tr.find("#InstanceDesignationId_TBL").val();

            var AppliedUserId = Tr.find('#AppliedUserId_TBL').val();
            var Approveruserid = Tr.find('#Approveruserid_TBL').val();
            $("#TBLeaveLevelId").val(LeaveLevelId);
            $("#Levels_Id_CreatePage").val(levelTypeId);
            $("#Department_Id_CreatePage").val(DepartmentId);
            $("#Roles_Id_CreatePage").val(RolenameId);


            //below code to select  dropdown value with text
            //$("#Levels_Id_CreatePage option:contains('" + levelType + "')").prop("selected", true);

            //// $("#Department_Id_CreatePage option[value='811']").attr("selected", "selected");
            //$("#Department_Id_CreatePage option:contains('" + Department + "')").prop("selected", true);
            //$("#Roles_Id_CreatePage option:contains('" + Rolename + "')").prop("selected", true);
            debugger;

            if (($("#Levels_Id_CreatePage").val() == 0)) {
                debugger;
                $("#AppliedEmployeesNames_Id_CreatePage").val('');
                $("#AppliedEmployeesNames_Id_CreatePage_Div").hide();
            }
            else {
                debugger;
                $("#AppliedEmployeesNames_Id_CreatePage_Div").show();
                AppliedEmployeeNames_Caliingfunction('Department_Id_CreatePage', 'AppliedEmployeesNames_Id_CreatePage', AppliedUserId, 'Edit');
            }

            GetUserName_BY_SelectRoleId(Approveruserid, 'Edit');
            $("#SaveLeaveLevels_CreatePage_BTN").val("Update");
         
            loaddingimg.css('display', 'none');

        } catch (x) {
            loaddingimg.css('display', 'none');
            $("#Main_Span_Error").text("Something Error");
        }
    });


  //===========================================This is for delete===========================

function DeleteLeaveLevelCallingFunction(LeaveLevelId) {
    debugger;
    CommonDeleteFunction_Vs1('Leave Level', "POST", "/Attendance/Delete_LeaveLevels?submitButton=Delete&LeaveLevelId=" + LeaveLevelId, function (response) {
        LeaveLevels_In_Table_Caliingfunction(event);
    });
}

function LeaveTypeChange() {
    try {
        if ($("#Levels_Id_CreatePage").val() == 0) {
            $("#AppliedEmployeesNames_Id_CreatePage").val('');
            $("#AppliedEmployeesNames_Id_CreatePage_Div").hide();
        }
        else {

            $("#AppliedEmployeesNames_Id_CreatePage_Div").show();
        }
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}


    function AddNewLevels(Editval) {
        try {
            debugger;
            $(".ErrorMessageSpan").empty();
            loaddingimg.css('display', 'block');
           // $("#accordionoc12345").hide();
            $("#SearchPage").hide();
            $("#SearchedTablePage").hide();
            $("#AppliedEmployeesNames_Id_CreatePage_Div").show();
            $("#CreateNewPage").show();
            if (Editval != "Edit") {
                FN_ClearValues('clearbutton1_CreatePage', 'Form_CreatePage', 'AppliedEmployeesNames_Id_CreatePage');
                $("#SaveLeaveLevels_CreatePage_BTN").val("Save");
            }
            $("#SaveLeaveLevels_CreatePage_BTN").prop('disabled', false);
            loaddingimg.css('display', 'none');
    } catch (x) {
            $("#Main_Span_Error").text("Something Error");
            loaddingimg.css('display', 'none');
    }
}

     function BackTOSearhLevels() {
         try {
             loaddingimg.css('display', 'block');
             FN_ClearValues('btnid', 'Form_CreatePage', 'AppliedEmployeesNames_Id_CreatePage')
            LeaveLevels_In_Table_Caliingfunction(event, 12);
           // $("#accordionoc12345").show();
            $("#SearchPage").show();
            $("#SearchedTablePage").show();
             $("#CreateNewPage").hide();
             loaddingimg.css('display', 'none');
        $(".ErrorMessageSpan").empty();
         } catch (x) {
            
             $("#Main_Span_Error").text("Something Error");
             loaddingimg.css('display', 'none');
    }
            }

            //scroll function
function ScrollToSelected_ID(Div_id) {
    try {
        $("html, body").animate({
            scrollTop: $("#" + Div_id).offset().top,
        }, 100);// Adjust the duration (in milliseconds) as needed
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}

            //clear the form values

function FN_ClearValues(bUttonid, Formid, ListBoxId) {
    try {
        debugger;
        document.getElementById(Formid).reset(); // Reset the form

        $('#' + ListBoxId).text('');
        $("#User_Id_CreatePage").empty();
        $(".ErrorMessageSpan").empty();
    } catch (x) {
        $("#Main_Span_Error").text("Something Error");
    }
}

