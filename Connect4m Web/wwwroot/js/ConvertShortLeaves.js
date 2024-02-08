
//window Ready function
$(document).ready(function () {
    try {
        $("#DivSearchedTablePage").hide();
        $("#TblSearchEmployeesShortLeaves").hide();
        Roles_InstanceRole_SELByInstanceId_CallingFunction();
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
})





//This for Avoid Alphabetes in TextBoxes
$(document).ready(function () {
    // Add event handler for text input fields that have IDs starting with "txtLeavesDeducted_"
    $("input[type='text'][id^='txtLeavesDeducted_']").on('input', function (e) {
        // Get the input value
        var inputVal = $(this).val();

        // Remove any special characters from the input value using regex
        inputVal = inputVal.replace(/[^0-9]/gi, '');

        // Set the input value back into the textbox
        $(this).val(inputVal);
    });
});




///================================================================this is for save leaves

$("#Fm_InTbl_SearchEmployeesShortLeaves").submit(function (event) {
    try {
        event.preventDefault(); // prevent the form from submitting
        $(".ErrorMessageSpan").empty();
 
        debugger;

        //var TableLength = $("#TblSearchEmployeesShortLeaves tbody tr").length;
        var CheckBoxcount = 0;
        var RadioBtncount = 0;
        var name = "";
        var Dedectedleaves_Hidden = 0;
        var Dedectedleaves = 0;
        var DedectedleavesCount = 0;
        var DedectedleavesPersonName = "";
        var row = $("#TblSearchEmployeesShortLeaves tbody tr");
        row.each(function (index) {
            if ($(this).find("td input[type='checkbox']").is(":checked")) { //if check box is checked then it is TRUE
                CheckBoxcount++;
                //if ($(this).find("td:last").find("input[type='radio']:checked").length > 0) {
                if ($(this).find("td:last").find("input[type='radio']:checked").length < 1) { //if radio btn is not checked then it is TRUE
                    name = $(this).find("td").eq(1).text();
                    RadioBtncount++;
                    return false;
                }
                Dedectedleaves_Hidden = $(this).find("td").eq(5).find("#CheckingCondition_txtLeavesDeducted_" + index).val();
                Dedectedleaves = $(this).find("td").eq(5).find("#txtLeavesDeducted_" + index).val();
                if (Dedectedleaves_Hidden < Dedectedleaves) {
                    if (DedectedleavesCount == 0) {
                        DedectedleavesPersonName = $(this).find("td").eq(1).text();
                    }
                    DedectedleavesCount++;
                    // return false;
                }
            }
        });

        debugger;
        //  var ErrorSpanText1 = $(".ErrorMessageSpan#Main_Span_Error").text();
        // var ErrorSpanText=$("#Main_Span_Error").text();
        if (CheckBoxcount < 1) {
            $("#Main_Span_Error").text("Please select at least one check box in the grid.");
            window.scrollTo(0, 0);
            return;
        }
        else if (RadioBtncount > 0) {
            $("#Main_Span_Error").text("Please select to be converted Leave Type for employee " + name + ""); // change dynamic name here look below
            // $("#Main_Span_Error").text("Please select to be converted Leave Type for employee Admin"); // change dynamic name here
            window.scrollTo(0, 0);
            return;
        }
        else if (DedectedleavesCount > 0) {
            $("#Main_Span_Error").text("Remaining Short Leaves to be deducted should not be greater than the remaining for employee " + DedectedleavesPersonName + "");
            window.scrollTo(0, 0);
            return;
        }

       loaddingimg.css('display', 'block');
        debugger;
        //var formData = new FormData(this);
        var formData = new FormData($("#Fm_InTbl_SearchEmployeesShortLeaves")[0]);
        debugger;
        // formData.delete('Row2');
        var bt = $("#BtnConvert").val();
        $.ajax({
            url: "/Attendance/ConvertShortLeaves?submitButton=" + bt,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.message == "Short Leaves Sucessfully converted to Leaves.") {
                   // $("#Main_Span_Error").text(response.message);
                    $("#BtnConvert").prop("disabled", true);

                    TblLeaveTypesForconvertion_Calingfunction(event, '6', 'TblSearchEmployeesShortLeaves');
                    $('.alert-success p').text(response.message);
                    $(".alert-success").show().delay(6000).fadeOut()
                }
                else {
                   // $("#Main_Span_Error").text(response.message);
                    $('.alert-danger p').text(response.message);
                    $(".alert-danger").show().delay(6000).fadeOut();
                }
                window.scrollTo(0, 0);
               loaddingimg.css('display', 'none');
            },
            error: function (xhr, stutus, error) {
               loaddingimg.css('display', 'none');
                $("#Main_Span_Error").text("Something Error");
            }

        })
    }
    catch (e) {
       loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
});


function CheckLeaveTypeEligibility_CalingFunction(RadioButtonId) {
    try {
        $(".ErrorMessageSpan").empty();
        debugger;
        var UserId = $("#" + RadioButtonId).closest("tr").find("td:first").find("#TblInUserid").val();
        var LeaveTypeid = $("#" + RadioButtonId).val();
        $.ajax({
            url: "/Attendance/CheckLeaveTypeEligibility_CalingFunction?UserId=" + UserId + "&LeaveTypeid=" + LeaveTypeid,
            type: "GET",
            success: function (response) {
                debugger;

                $("#Main_Span_Error").text(response);
                if (response != "") {
                    window.scrollTo(0, 0);
                    $("#" + RadioButtonId).prop("checked", false);
                }
            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}


function TblLeaveTypesForconvertion_Calingfunction(event, val, EffectiveTableId) {

    try {
        debugger;
        if (val != 12) {
            event.preventDefault();
        }
        if (val != "6") {
            $(".ErrorMessageSpan").empty();
        }

        var InstanceRoleId = $("#DdlRoles").val();
        var Monthid = $("#DdlMonthid").val();
        var Userid = $("#DdlUsers").val();


        if (InstanceRoleId === "" || Monthid === "") {
            $("#Main_Span_Error").text('Following fields have invalid data :');
            debugger;
            if (Monthid === "") {
                $("#Monthid_Span_Error").text('Month ');
            }
            if (InstanceRoleId === "") {
                $("#InstanceRoleId_Span_Error").text('Role');
            }
            return;
        }

        if (val != 12) {
           loaddingimg.css('display', 'block');
        }

        $.ajax({
            url: "/Attendance/TblLeaveTypesForconvertion_Calingfunction?InstanceRoleId=" + InstanceRoleId + "&Monthid=" + Monthid + "&Userid=" + Userid,//+"&values="+ queryString,
            type: "GET",
            //  data: {values: Userid },
            success: function (response) {
                debugger;
                if (val != "6") {
                    $("#BtnConvert").prop("disabled", false);
                }

                var leavtype = response[0].leavetypes_List;
                var AttendanceModel_Data = response[0].attendanceModel_Data;
                //var disabledname = "";
                if (AttendanceModel_Data.length <= 0) {
                    $("#DivSearchedTablePage").hide();
                    $("#TblSearchEmployeesShortLeaves").hide();
                    //$("#CountOfRecords_SearchEmployeesShortLeaves").text("");
                    //$("#CountOfRecords_SearchEmployeesShortLeaves").text("NO RECORDS");
                    $("#Counts").text("0");

                    $("#Main_Span_Error").text("No Records Found");
                }
                else {
                    debugger;
                   // $("#CountOfRecords_SearchEmployeesShortLeaves").text("");
                   // $("#CountOfRecords_SearchEmployeesShortLeaves").html("YOUR SEARCH RESULTED <span class='number-circle'> " + response.length + "</span> RECORD(S).");
                    $("#Counts").text(response.length);

                    $("#TblSearchEmployeesShortLeaves tbody").empty();
                    var TobeConvertedTotalLeaves = 0;
                    var RemainingSLsDeducted = 0;
                    var tdContainer = "";
                    var Checkboxidcount = 0;
                    for (var i = 0; i < AttendanceModel_Data.length; i++) {
                        TobeConvertedTotalLeaves = 0;
                        RemainingSLsDeducted = 0;
                        tdContainer = "";
                        //this is for calculate To be Converted Total Leaves
                        TobeConvertedTotalLeaves = AttendanceModel_Data[i].total / 3;
                        if (TobeConvertedTotalLeaves < 1) {
                            TobeConvertedTotalLeaves = 0;
                        }

                        //This is for Remaining SLs Deducted
                        RemainingSLsDeducted = TobeConvertedTotalLeaves - AttendanceModel_Data[i].convertedCount;
                        if (RemainingSLsDeducted < 1) {
                            RemainingSLsDeducted = 0;
                            //  disabledname = "disabled";
                        }

                        $("#TblSearchEmployeesShortLeaves tbody").append(
                            // "<tr name='InputVal[" + i + "].TrRowId'>" +
                            "<tr>" +
                            "<td style='text-align:center;'><input class='form-check-input' id='CheckAssignid_" + i + "' name='InputVal[" + i + "].Checkbox_ByChecked' value=" + i + " type='checkbox'  disabled='disabled'><input type='hidden' id='TblInUserid' name='InputVal[" + i + "].Userid' value='" + AttendanceModel_Data[i].userId + "'><input type='hidden' id='TblInMonthid' name='InputVal[" + i + "].Monthid' value='" + Monthid + "'></td>" +
                            "<td>" + AttendanceModel_Data[i].firstName + "</td>" +
                            "<td style='text-align:center;'>" + AttendanceModel_Data[i].total + "</td>" +
                            "<td style='text-align:center;'>" + parseInt(TobeConvertedTotalLeaves) + "</td>" +
                            "<td  style='text-align:center;'>" + AttendanceModel_Data[i].convertedCount + " <input type='hidden' id='convertedCount' name='InputVal[" + i + "].ConvertedCount' value='" + AttendanceModel_Data[i].convertedCount + "'></td>" +
                            "<td style='text-align:center;'><input type='text' class='form-control' name='InputVal[" + i + "].ConvertCount'   id='txtLeavesDeducted_" + i + "' value='" + parseInt(RemainingSLsDeducted) + "'  disabled='disabled'><input  type='hidden'  id='CheckingCondition_txtLeavesDeducted_" + i + "' value='" + parseInt(RemainingSLsDeducted) + "' disabled='disabled'></td>" +
                            "<td id='TdLeavetypes_" + i + "' style='text-align:start;'></td>" +
                            "</tr>"
                        );



                        //var textbox = $('<input type="text" />').css({
                        //    'width': '76%',
                        //    'height': '28px',
                        //    'border': '1px solid',
                        //    'border-color': 'violet'
                        //}).attr('id', "txtLeavesDeducted_" + i ); /.val(UsersDueFeetbls.amountTextBox)/
                        //textbox.attr('maxlength', 8);
                        //  $('#TblSearchEmployeesShortLeaves tbody tr td:nth-child(6n)').append(textbox);


                        // Allow only numbers (digits) by using the input event to restrict input

                        $("input[type='text'][id^='txtLeavesDeducted_']").on('input', function () {
                            debugger;
                            this.value = this.value.replace(/\D/g, '');
                        });


                        tdContainer = $("#TdLeavetypes_" + i);
                        // This is for Append Leave Type in <td>
                        for (var j = 0; j < leavtype.length; j++) {
                            var span = $('<span>', {
                                class: 'RadioButtonclass',
                            });
                            debugger;
                            var input = $('<input>', {
                                type: 'radio',
                                id: 'RdblLeaveTypes_' + Checkboxidcount,
                                name: 'InputVal[' + i + '].Leavetypeid',
                                value: leavtype[j].leaveTypeId,
                                class: 'LeaveTypeRadioBtnClass_' + i + ' form-check-input',
                                disabled: 'disabled',
                                onclick: 'CheckLeaveTypeEligibility_CalingFunction(\'RdblLeaveTypes_' + Checkboxidcount + '\')'
                            });

                            var label = $('<label>', {
                                class:'form-check-label',
                                for: 'RB_LblLeaveTypes_' + i,
                                text: leavtype[j].leaveType,
                            });

                            span.append(input);
                            span.append(label);
                            tdContainer.append(span);
                            span.after('<br/>');
                            Checkboxidcount++;
                        }

                        if (RemainingSLsDeducted >= 1) {
                            $("#CheckAssignid_" + i).removeAttr("disabled");
                            $("#txtLeavesDeducted_" + i).removeAttr("disabled");
                            var radioButtons = $(".LeaveTypeRadioBtnClass_" + i);

                            // Loop through each element and remove the "disabled" attribute
                            radioButtons.each(function () {
                                $(this).removeAttr("disabled");
                            });
                        }
                    }

                    $("#DivSearchedTablePage").show();
                    $("#TblSearchEmployeesShortLeaves").show();


                    var row = $("#TblSearchEmployeesShortLeaves tbody tr");
                    row.each(function (index) {
                        $(this).attr("id", 'Row' + (index + 1));
                        $(this).attr("value", 'Row' + (index + 1));
                    });


                }

               loaddingimg.css('display', 'none');
            },

            error: function (xhr, status, error) {
               loaddingimg.css('display', 'none');
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (e) {
       loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }


}


function GetUserName_BY_SelectRoleId_CallingFunction() {

    try {
        debugger;

        var InstanceRoleId = $("#DdlRoles").val();

        $.ajax({
            url: "/Attendance/GetUserName_BY_SelectRoleId_CallingFunction?InstanceRoleId=" + InstanceRoleId,
            type: "GET",
            success: function (response) {
                $("#DdlUsers").empty();
                if (response.length > 0) {
                    $("#DdlUsers").append('<option value="">' + "---------Select--------" + '</option>');
                }

                $.each(response, function (i, Value2) {
                    $("#DdlUsers").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                });

            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }

};


function Roles_InstanceRole_SELByInstanceId_CallingFunction() {
    try {
        $.ajax({
            url: "/Attendance/Roles_InstanceRole_SELByInstanceId_CallingFunction",
            type: "GET",
            success: function (response) {
                $("#DdlRoles").empty();
                $("#DdlRoles").append('<option value="">' + "---------Select---------" + '</option>');


                $.each(response, function (i, Value2) {
                    $("#DdlRoles").append('<option value="' + Value2.value + '" >' + Value2.text + '</option>');
                });

            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
};


function FN_ClearValues(event, Formid) {
    try {

        document.getElementById(Formid).reset(); // Reset the form

        $(".ErrorMessageSpan").empty();
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}

//To check all check boxes
$('#chkSelectAll').click(function () {
    try {
        debugger;
        var checked = this.checked;
        $(':checkbox:not(:disabled)').prop("checked", checked);
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
});
