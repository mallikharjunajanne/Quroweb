


var ErrorAppend = $("#Main_Span_Error");
$(document).ready(function () {
    $("#loadingOverlay").show();
    //  TblDataTableWithColumns_CallingFunction(event, 'Stop', "/Examination/TblBulkUploadSubjectsList", 'TblBulkUploadSubjectsList', 'Counts', 'FmSubjectSearch', 'Div_TblBulkUploadSubjectsList', '', []);
    CommonDropdownFunction("GET", "/Attendance/DepartmentsDropdown_Caliingfunction", "DdlDepartment", "Select a Department", false)
    CommonDropdownFunction("GET", "/Results/DdlExamMode_Callingfunction", "DdlExammode", "------Select------", false)
    $("#loadingOverlay").hide();
});
var js = jQuery.noConflict(true);




//=============================== upload file yes or No
// function FileUploadingType(event,id) {

$('#RdbNo, #RdbYes').click(function (event) {
    try {
        // event.preventDefault();
        debugger;
        const btnname = $(this).val();
        // const btnname = $(id).val();
        const MarksUploadtype = btnname === "1" ? "UploadWithOutExcelFile" : "UploadWithExcelFile";

        const selectedValues = $("#DdlSubjects option:selected").map(function () {
            return $(this).text();
        }).get();

        const selectedValuesString = selectedValues ? selectedValues.join(", ") : "";

        const formData = new FormData($("#FmSubjectsSearch")[0]);
        formData.append("SubjectsName", selectedValuesString);

        $("#TblExamSubjects tbody tr").each(function () {
            const TblExamSubjectTD = $(this).find("td");
            const HdnExamSubjectId = TblExamSubjectTD.find("#ExamSubjectId").val();
            const TxtPassMarks = TblExamSubjectTD.find("#TxtPassMarks").val();
            const TxtMaxMarks = TblExamSubjectTD.find("#TxtMaxMarks").val();

            formData.append("ExamSubjectIdList", parseInt(HdnExamSubjectId) || 0);
            formData.append("PassMarksList", parseFloat(TxtPassMarks));
            formData.append("MaxMarksList", parseFloat(TxtMaxMarks));
        });

        $("#loadingOverlay").show();

        performCrudOperationCommonFunction("POST", `/Results/PublishResults_Step3?MarksUploadtype=${MarksUploadtype}`, formData,
            function (response) {
                $("#Div_UploadingType").html(response);
                $("#loadingOverlay").hide();
            },
            function (error) {
                $("#loadingOverlay").hide();
                $("#Main_Span_Error").text("Something Error");
            },
            true
        );
    } catch (error) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
});

//}



//-================================ back to step 1
function BackTOStep(event, button) {
    try {
        debugger;
        var btnName = $(button).attr("id");
        $(".ErrorMessageSpan").empty();
        $("#loadingOverlay").show();

        $("#Div_Step3").css('display', 'none');
        $("#Div_UploadingType").empty();


        if (btnName == "BtnBackTo_Step2") {

            TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Results/TblExamSubjects_Calingfunction', 'TblExamSubjects', 'Counts', 'FmSubjectsSearch', 'Div_TblExamSubjects', '', [], false);
            $("#Div_Step2").css('display', 'block');
        } else {
            $("#Div_Step2").css('display', 'none');

            $("#TblExamSubjects tbody").empty();
            $("#Div_Step1").css('display', 'block');
        }

        $("#loadingOverlay").hide();
    } catch (x) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
}


//===============================  Search Records   /Go to step 2 to post result
js("#FmSubjectsSearch2").submit(function (event) {
    debugger;
    try {
        event.preventDefault();
        $(".ErrorMessageSpan").empty();
        var formElement = document.getElementById('FmSubjectsSearch');
        setTimeout(function () {
            var validationMessages = formElement.getElementsByClassName('field-validation-error');
            // var validationMessages2 = formElement.getElementsByClassName('error2');
            var validationmelength = validationMessages.length;
            if (validationmelength == 0) {
                var selectedCount = $('#DdlSubjects option:selected').length;
                if (selectedCount > 1 && $("#DdlExammode").val() == 2) {
                    $("#Main_Span_Error").text("You can not post results for more than 1 subject in ReTest mode.");
                    window.scrollTo(0, 0);
                    return;
                } else if (selectedCount > 14) {
                    $("#Main_Span_Error").text("You can not post results for more than 15 subjects at a time.");
                    window.scrollTo(0, 0);
                    return;
                } $("#loadingOverlay").show();
                TblDataTableWithColumns_CallingFunction(event, 'NoStop', '/Results/TblExamSubjects_Calingfunction', 'TblExamSubjects', 'Counts', 'FmSubjectsSearch', 'Div_TblExamSubjects', '', [], false);
                //Header Text
                $("#DepartmentName").text('Step 2 Selection: ' +
                    $("#DdlDepartment option:selected").text() + ' - ' +
                    $("#DdlClass option:selected").text() + ',' +
                    $("#DdlExam option:selected").text() + ',' +
                    $("#DdlExammode option:selected").text() + '');
                $("#Div_Step2").css('display', 'block');
                $("#Div_Step1").css('display', 'none');
                $("#loadingOverlay").hide();
            } else {
                $('.alert-danger p').text("Pleae Enter All Required Fields");
                $(".alert-danger").show().delay(5000).fadeOut()
            }
        }, 50);
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
})

//===============================  This is For save and go to step3
js(document).on("click", '#BtnSave_Nextpage_Step3', function (event) {
    try {
        event.preventDefault();
        //event.stopImmediatePropagation();

        $("#loadingOverlay").show();
        var ButtonName = $(this).val();
        debugger;
        $(".ErrorMessageSpan").empty();
        var formData = new FormData($("#FmSubjectsSearch")[0]);

        var selectedValues = $("#DdlSubjects option:selected").map(function () {
            return $(this).text();
        }).get();
        //if (selectedValues) {
        //    var selectedValuesString = selectedValues.join(", ");
        //}
        const selectedValuesString = selectedValues ? selectedValues.join(", ") : "";
        formData.append("SubjectsName", selectedValuesString)

        // var Subjectname = $("#Subjectname").val();
        var shouldExit = false;
        var TblExamSubject = $("#TblExamSubjects tbody tr");
        TblExamSubject.find('input[type="text"],input[type="date"]').removeClass("errorboxshadow");
        //this for check a record
        TblExamSubject.each(function (index) {
            TblExamSubjectTD = $(this).find("td");
            //var ExamId = TblExamSubjectTD.find("#ExamSubjectId").val();

            var HdnExamSubjectId = TblExamSubjectTD.find("#ExamSubjectId").val();
            var HdnActualDateConducted = TblExamSubjectTD.find("#ActualDateConducted").val();
            var HdnSubjectId = TblExamSubjectTD.find("#SubjectId").val();
            var SubjectName = TblExamSubjectTD.eq(1).text();
            var TxtDate = TblExamSubjectTD.find("#TxtDate").val();
            var TxtPassMarks = TblExamSubjectTD.find("#TxtPassMarks").val();
            var TxtMaxMarks = TblExamSubjectTD.find("#TxtMaxMarks").val();
            if (TxtDate === "") {
                $(ErrorAppend).text("Conducted date can not be left blank for subject '" + SubjectName + "'");
                TblExamSubjectTD.find("#TxtDate").addClass("errorboxshadow");
                shouldExit = true; // Set the flag to true to exit the loops
                return false; // Exit the inner loop
            }
            else if (TxtPassMarks === "") {
                $(ErrorAppend).text("Pass Marks can not be left blank for subject '" + SubjectName + "'");
                TblExamSubjectTD.find("#TxtPassMarks").addClass("errorboxshadow");
                shouldExit = true; // Set the flag to true to exit the loops
                return false; // Exit the inner loop
            }
            else if (TxtMaxMarks === "") {
                $(ErrorAppend).text("Max Marks can not be left blank for subject '" + SubjectName + "'");
                TblExamSubjectTD.find("#TxtMaxMarks").addClass("errorboxshadow");
                shouldExit = true; // Set the flag to true to exit the loops
                return false; // Exit the inner loop
            }
            else if (!compareDatesNotGreaterThanToday(TxtDate)) {
                $(ErrorAppend).text("Conducted date can not be greater than today for subject '" + SubjectName + "'");
                TblExamSubjectTD.find("#TxtDate").addClass("errorboxshadow");
                shouldExit = true; // Set the flag to true to exit the loops
                return false; // Exit the inner loop
            }
            else if (new Date(TxtDate) < new Date(HdnActualDateConducted)) {
                $(ErrorAppend).text("ReTest Conducted date can not be less than Conducted Date for subject '" + SubjectName + "'");
                TblExamSubjectTD.find("#TxtDate").addClass("errorboxshadow");
                shouldExit = true; // Set the flag to true to exit the loops
                return false; // Exit the inner loop
            }
            else if (parseFloat(TxtMaxMarks) < parseFloat(TxtPassMarks)) {
                $(ErrorAppend).text("Pass Marks can not be greater than Max Marks for subject '" + SubjectName + "'");
                TblExamSubjectTD.find("#TxtPassMarks").addClass("errorboxshadow");
                shouldExit = true; // Set the flag to true to exit the loops
                return false; // Exit the inner loop
            }
            // formData.append("ExamIdList", parseInt(ExamId) || 0);
            formData.append("SubjectIdList", parseInt(HdnSubjectId) || 0);
            formData.append("PassMarksList", parseFloat(TxtPassMarks));
            formData.append("MaxMarksList", parseFloat(TxtMaxMarks));
            formData.append("DateConductedList", TxtDate);

            formData.append("ExamSubjectIdList", parseInt(HdnExamSubjectId) || 0);
        });
        if (shouldExit) {
            //  $("#Main_Span_Error").text("Subjects overlapping.");
            window.scrollTo(0, 0);
            $("#loadingOverlay").hide();
            return;
        }
        performCrudOperationCommonFunction('POST', "/Results/PostResults?ButtonName=" + ButtonName, formData, function (response) {
            debugger;
            var SubjectText = "";
            //var jsonResponse = JSON.parse(response.name);

            if (response.message == "Record inserted successfully.") {
                $("#DepartmentNameStep3").text('Step 2 Selection: ' +
                    $("#DdlDepartment option:selected").text() + ' - ' +
                    $("#DdlClass option:selected").text() + ',' +
                    $("#DdlExam option:selected").text());
                // var data = { MarksUploadtype: "UploadWithExcelFile",Nextstep:"Step3" };
                var MarksUploadtype = "UploadWithExcelFile";
                $("#loadingOverlay").show();
                performCrudOperationCommonFunction("POST", "/Results/PublishResults_Step3?MarksUploadtype=" + MarksUploadtype + "&Nextstep=Step3", formData, function (response) {
                    $("#Div_UploadingType").html(response);
                    $("#Div_Step2").hide();
                    $("#Div_Step3").show();
                    $("#loadingOverlay").hide();
                }, function (error) {
                    $("#loadingOverlay").hide();
                    $("#Main_Span_Error").text("Something Error");
                }, true);

            }
            //if (response.message == "Users Cannot be De-associated either Attendance / Result has been Posted for the subject") {
            //   // SubjectText = $("#DdlSubject option:selected").text();
            //    $("#Main_Span_Error").text(response.message + SubjectText);
            //}
            else
                $("#Main_Span_Error").text(response.message + SubjectText);


            $("#loadingOverlay").hide();
            window.scrollTo(0, 0);
        }, function (error) {
            $("#loadingOverlay").hide();
            $("#Main_Span_Error").text("Something Error");
        }, true);
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
});


//===============================  This is For save as draft and Publish Marks
js(document).on("click", '#BtnSaveAsDraft,#BtnPublish', function (event) {
    try {
        event.preventDefault();

        //event.stopImmediatePropagation();
        var ButtonName = $(this).val();
        var ButtonId = $(this).attr("id");
        debugger;
        $(".ErrorMessageSpan").empty();
        var Alertconfirm = false;
        var HdnSubjectNamesForAlertMsg = $("#HdnSubjectNamesForAlertMsg").val();
        if (HdnSubjectNamesForAlertMsg != "" && ButtonId == "BtnSaveAsDraft") {
            Swal.fire({
                title: "Are you sure?",
                text: ("For Subject(s) '" + HdnSubjectNamesForAlertMsg.slice(0, -1) + "' marks are already published. Do you want to save the published marks as draft? "),
                //type: "warning", -  doesn't exist
                showCancelButton: true,
                showCloseButton: true, // optional
                showConfirmButton: true, // optional
                confirmButtonColor: '#d33',
                confirmButtonText: "Yes",
                icon: "warning",
                //closeOnConfirm: false -  doesn't exist
            })
                .then(function (isConfirm) {
                    if (isConfirm.isConfirmed) {
                        Alertconfirm = true;
                        SaveAsdraftCallingFunction(ButtonId, ButtonName);
                    }
                    else {
                        return; //close popup
                    }
                });
        }
        if (Alertconfirm || HdnSubjectNamesForAlertMsg == "" || ButtonId == "BtnPublish") {

            SaveAsdraftCallingFunction(ButtonId, ButtonName);
        }

    } catch (e) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
});

//===============================  This is For save as draft and Publish Marks calling function
function SaveAsdraftCallingFunction(ButtonId, ButtonName) {
    try {
        debugger;
        $("#loadingOverlay").show();
        var formData = new FormData($("#FmSubjectsSearch")[0]);

        formData.append("ButtonId", ButtonId);
        formData.append("EMAILtoParents", $("#chkEMAILPARENTS").is(':checked'));
        formData.append("EMAILtoStudents", $("#chkEMAILSTUDENTS").is(':checked'));
        formData.append("SMStoParent", $("#chkSMSParent").is(':checked'));
        formData.append("SMStoStudent", $("#chkSMSStudent").is(':checked'));

        var formExists = $('#FmFileUpload').length > 0;
        var FmFileUpload = "";
        if (formExists) {
            var selectedValues = $("#DdlSubjects option:selected").map(function () {
                return $(this).text();
            }).get();
            if (selectedValues) {
                var selectedValuesString = selectedValues.join(", ");
            }
            formData.append("SubjectsName", selectedValuesString);

            var userIdsString = $("#userIdsContainer").data("user-ids");
            var userIdsArray = userIdsString.split(',').map(Number);
            var l = userIdsArray.length;
            for (var i = 0; i < l; i++) {
                formData.append("UseridList", userIdsArray[i]);
            }
            //console.log('At least one form exists on the page.');
            FmFileUpload = "FmFileUpload";
            $('#TblExamSubjects tbody tr').each(function () {
                var ExamSubjectId = $(this).find('td #ExamSubjectId').val();
                var PassMarks = $(this).find('td #TxtPassMarks').val();
                var MaxMarks = $(this).find('td #TxtMaxMarks').val();

                formData.append("SubjectIdList", parseInt(ExamSubjectId) || 0);
                formData.append("PassMarksList", parseFloat(PassMarks));
                formData.append("MaxMarksList", parseFloat(MaxMarks));
            });
        }
        else {
            //console.log('No forms found on the page.');

            var TblExamSubject = $("#TblUsersSearched tbody tr");
            TblExamSubject.find('input[type="text"]').removeClass("errorboxshadow");

            var SecuredMarks;
            var shouldExit = false;
            var MaxMarks;
            var Grade;
            $('#TblUsersSearched tbody tr').each(function () {
                if (shouldExit) {
                    return false; // Exit the outer loop
                }
                var UserId = $(this).find('#UserId').val();
                var Name = $(this).find("td:eq(1)").text();
                $(this).find('td').each(function (tdIndex) {
                    if (tdIndex < 3) {
                        return;
                    }
                    SecuredMarks = $(this).find('input[type="text"]').val();
                    ExamSubjectId = $('#TblUsersSearched thead th:eq(' + tdIndex + ')  #TH_ExamSubjectId').val();
                    MaxMarks = $('#TblUsersSearched thead th:eq(' + tdIndex + ')  #TH_MaxMarks').val();
                    PassMarks = $('#TblUsersSearched thead th:eq(' + tdIndex + ')  #TH_PassMarks').val();
                    SubjectName = $('#TblUsersSearched thead th:eq(' + tdIndex + ')').text();

                    //use this if you add this in js file
                     let hasAlphabetsOrSpecialCharacters = /[^a-zA-Z0-9]|[!@#$%^&*(),.?":{}<>]/.test(SecuredMarks);

                      
                        if (SecuredMarks === "" && !$(this).find('input[type="text"]').prop('disabled') && ButtonId != "BtnSaveAsDraft") {
                        $(ErrorAppend).text("Please enter marks For student '" + Name + "' for subject  '" + SubjectName + "'");
                        $(this).find('input[type="text"]').addClass("errorboxshadow");
                        shouldExit = true; // Set the flag to true to exit the loops
                        return false; // Exit the inner loop
                    }
                    //use this if you add this in js file
                    else if (SecuredMarks != "O" && SecuredMarks != "-" && hasAlphabetsOrSpecialCharacters) {
                          $(ErrorAppend).text("Please enter valid data For student '" + Name + "' for subject  '" + SubjectName + "'");
                          $(this).find('input[type="text"]').addClass("errorboxshadow");
                          shouldExit = true; // Set the flag to true to exit the loops
                          return false; // Exit the inner loop
                      }
                    else if (parseFloat(MaxMarks) < parseFloat(SecuredMarks)) {
                        $(ErrorAppend).text("For student '" + Name + "' secured marks can not be greater than maximum marks for subject '" + SubjectName + "'");
                        $(this).find('input[type="text"]').addClass("errorboxshadow");
                        shouldExit = true; // Set the flag to true to exit the loops
                        return false; // Exit the inner loop
                    }
                    if (parseFloat(PassMarks) <= parseFloat(SecuredMarks) && SecuredMarks != "") {
                        Grade = "PASS";
                    } else if (parseFloat(PassMarks) > parseFloat(SecuredMarks) && SecuredMarks != "") {
                        Grade = "FAIL";
                    } else if (SecuredMarks == "-") {
                        Grade = "ABSENT";
                        //Grade = "OPTIONAL";
                    } else if (SecuredMarks == "" && ButtonId == "BtnPublish") {
                        Grade = "OPTIONAL";
                    } else {
                        Grade = "";
                    }
                    formData.append("UseridList", parseInt(UserId) || 0);
                    formData.append("SubjectIdList", parseInt(ExamSubjectId) || 0);
                    formData.append("SecureMarksList", parseFloat(SecuredMarks) || "");
                    formData.append("GradeList", Grade || "");
                    formData.append("PassMarksList", parseFloat(PassMarks));
                    formData.append("MaxMarksList", parseFloat(MaxMarks));
                });
            });
            if (shouldExit) {
                window.scrollTo(0, 0);
                $('.alert-danger p').text("Please Enter Valid Data.");
                $(".alert-danger").show().delay(5000).fadeOut()
                $("#loadingOverlay").hide();
                return;
            }

            var formDataEntries = Array.from(formData.entries());
            var chunkSize = 1000;
            var chunks = [];

            // Split form data into chunks
            while (formDataEntries.length > 0) {
                chunks.push(formDataEntries.splice(0, chunkSize));
            }

            // Function to send data chunk
            function sendChunk(index) {
                if (index >= chunks.length) {
                    // All chunks sent, perform any final actions
                    return;
                }

                var chunkData = new FormData();
                chunks[index].forEach(function (pair) {
                    chunkData.append(pair[0], pair[1]);
                });

                performCrudOperationCommonFunction('POST', "/Results/PublishResults?ButtonName=" + ButtonName + "&FmFileUpload=" + FmFileUpload, chunkData, function (response) {
                    // Handle response if needed
                    debugger;
                    if (response.message == "Something Error") {
                        $("#Main_Span_Error").text(response.message);
                    }
                    else {
                        var jsonResponse = JSON.parse(response.message);
                        // var SuccessMSG = jsonResponse.successMSG;

                        if (jsonResponse.successMSG == "Results Posted successfully.") {
                            $("#Main_Span_Error").text(jsonResponse.successMSG);
                            if ($("#chkEMAILSTUDENTS").is(':checked')) {
                                $("#StudentEmail_Error").text(jsonResponse.emailNotAvailableStudentNames + "  No EMail Id Exists for Students(s).");
                            }
                            if ($("#chkEMAILPARENTS").is(':checked')) {
                                $("#ParentEmail_Error").text(jsonResponse.emailNotAvailableParentNames + "  No EMail Id Exists for Parent(s).");
                            }
                            if ($("#chkSMSStudent").is(':checked')) {
                                $("#StudentSMS_Error").text("For User(s) " + jsonResponse.phoneNotAvailableStudent + " No Mobile Number Exists for Student(s).");
                            }
                            if ($("#chkSMSParent").is(':checked')) {
                                $("#ParentSMS_Error").text("For User(s) " + jsonResponse.phoneNotAvailableParent + "  No Mobile Number Exists for Parent(s).");
                            }
                            $("#BtnPublish").prop("disabled", true);
                            $("#BtnSaveAsDraft").prop("disabled", true);
                        } else {
                            $("#Main_Span_Error").text(jsonResponse.successMSG);
                        }
                    }
                    $("#loadingOverlay").hide();
                    window.scrollTo(0, 0);
                    // Move on to the next chunk
                    sendChunk(index + 1);
                }, function (error) {
                    // Handle error if needed
                    $("#loadingOverlay").hide();
                    $("#Main_Span_Error").text("Something Error");
                    // Move on to the next chunk
                    sendChunk(index + 1);
                }, true);
            }

            // Start sending chunks
            sendChunk(0);


        }
    } catch (e) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
}

//--to show include class check box
function ShowIncludeClass() {
    if ($("#chkSMSStudent").prop("checked") || $("#chkSMSParent").prop("checked")) {
        $("#SpnSendRating").css("display", "block");
    } else {
        $("#SpnSendRating").css("display", "none");
    }
}

///====>>>>>>>>>>>>>>>>>>>>>>>>>>>>> this is for in step 3 page 

//=============================== validate excel file
//js(document).on("click", "#BtnExcelValidate", function (event) {
$("#FmFileUpload").submit(function (event) {
    try {
        debugger;
        event.preventDefault();
        var ButtonId = "BtnExcelValidate";
        $(".ErrorMessageSpan").empty();
        var formData = new FormData($("#FmSubjectsSearch")[0]);
        var SpnExeclFile = $("#txtSheetName").val();

        var fileInput = document.getElementById("ExcelFile");
        var count = 0;
        if (fileInput.files.length === 0) {
            $("#SpnExeclFile").text("The file is Required");
            count++;
        } if (SpnExeclFile === "") {
            $("#SpnSheetName").text("The Sheet Name is Required");
            count++;
        }
        if (count > 0) {
            return;
        }


        formData.append("File", fileInput.files[0])
        // formData.append("SheetName", $("#txtSheetName").val());
        formData.append("SheetName", SpnExeclFile);
        formData.append("ButtonId", ButtonId);
        var selectedValues = $("#DdlSubjects option:selected").map(function () {
            return $(this).text();
        }).get();
        if (selectedValues) {
            var selectedValuesString = selectedValues.join(", ");
        }
        formData.append("SubjectsName", selectedValuesString);

        var userIdsString = $("#userIdsContainer").data("user-ids");
        var userIdsArray = userIdsString.split(',').map(Number);
        var l = userIdsArray.length;
        for (var i = 0; i < l; i++) {
            formData.append("UseridList", userIdsArray[i]);
        }

        $('#TblExamSubjects tbody tr').each(function () {
            var ExamSubjectId = $(this).find('td #ExamSubjectId').val();
            var PassMarks = $(this).find('td #TxtPassMarks').val();
            var MaxMarks = $(this).find('td #TxtMaxMarks').val();
            formData.append("SubjectIdList", parseInt(ExamSubjectId) || 0);
            formData.append("PassMarksList", parseFloat(PassMarks));
            formData.append("MaxMarksList", parseFloat(MaxMarks));
        });
        performCrudOperationCommonFunction('POST', "/Results/PublishResults", formData, function (response) {
            debugger;
            //  var jsonResponse = JSON.parse(response.message);
            $("#Main_Span_Error").text(response.message);
            if (response.message == "Valid file. Please click on Save As Draft or Publish.") {
                $("#BtnExcelValidate").prop("disabled", true);
                $("#BtnSaveAsDraft").prop("disabled", false);
                $("#BtnPublish").prop("disabled", false);
            }
            $("#ExcelFile").val("");
            $("#loadingOverlay").hide();
            window.scrollTo(0, 0);
        }, function (error) {
            $("#loadingOverlay").hide();
            $("#Main_Span_Error").text("Something Error");
        }, true);

        if (false) {
            var formElement = document.getElementById('FmFileUpload');
            setTimeout(function () {
                var validationMessages = formElement.getElementsByClassName('field-validation-error');
                // var validationMessages2 = formElement.getElementsByClassName('error2');
                var validationmelength = validationMessages.length;
                if (validationmelength == 0) {
                    debugger;
                    performCrudOperationCommonFunction('POST', "/Results/PublishResults", formData, function (response) {
                        debugger;
                        //  var jsonResponse = JSON.parse(response.message);
                        $("#Main_Span_Error").text(response.message);
                        if (response.message == "Valid file. Please click on Save As Draft or Publish.") {
                            $("#BtnExcelValidate").prop("disabled", true);
                            $("#BtnSaveAsDraft").prop("disabled", false);
                            $("#BtnPublish").prop("disabled", false);
                        }
                        $("#ExcelFile").val("");
                        $("#loadingOverlay").hide();
                        window.scrollTo(0, 0);
                    }, function (error) {
                        $("#loadingOverlay").hide();
                        $("#Main_Span_Error").text("Something Error");
                    }, true);
                }
            }, 50);
        }

    } catch (e) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
});