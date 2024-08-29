

function EditValuesGettingFunction(examid) {
    debugger;
    // $("#loadingOverlay").show();
    //  var data = { Id: examid };
    //CreateNewExams();
    EditNewExams();
    var url = "/Examination/TblExamListData?Id=" + examid;
    performCrudOperationCommonFunction("POST", url, null, function (responce) {
        debugger;
       
        var Acadamicyearid = responce[0].academicYearId;      
        Acadamicyearddl(Acadamicyearid);
        $("#AddNewText_Span_CreatePage").text("UPDATE EXAM NAME");
        //s$("#DdlAcademicYearCreatePage1").val(responce[0].academicYearId);
        $("#TxtExamNameCreatePage1").val(responce[0].examName);
        $("#TxtDisplayorderCreatePage").val(responce[0].displayorder);
        $("#TxtExamidCreatePage").val(responce[0].id);

        $('input[name="ExamForAcademics"][value="' + responce[0].exaternalExam + '"]').prop("checked", true);
       
        $("#BtnSave").attr("value", "Update");
        $("#BtnSave").text("Update");
        $("#BtnClear").prop("disabled", true);
        $('#BtnClear').hide();
        $('#Deletebtn').show();
       
        //this delete button adding by arjun
        var examId = $("#TxtExamidCreatePage").val();
        var onclickFunction = "DeleteExamsById('" + examId + "')"; 
        $("#Deletebtn").attr("onclick", onclickFunction); 
    });
    // $("#loadingOverlay").hide();
}

function Acadamicyearddl(Acadamicyearid) {
    $.ajax({
        url: '/Examination/GetAcademicyearsddl',
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#DdlAcademicYearCreatePage1';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            //dropdown.empty();
            dropdown.append($('<option>', {
                value: ' ',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                //dropdown.append($('<option>', {
                //    value: item[valueField],
                //    text: item[textField]
                //}));

                var option = $('<option>', {
                    value: item[valueField],
                    text: item[textField]
                });

                if (item[valueField] == Acadamicyearid) {
                    option.prop('selected', true); // Select the option if it matches
                }

                dropdown.append(option);

            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}




function SaveExams(event, FormId) {
    try {
        event.preventDefault();
        debugger;
        $(".ErrorMessageSpan").empty();
        var DdlAcademicYearCreatePage = $("#DdlAcademicYearCreatePage1").val();
        var TxtExamNameCreatePage = $("#TxtExamNameCreatePage1").val();
        var TxtExamNameCreatePage1 = $("#TxtExamNameCreatePage").val();
        //if (DdlAcademicYearCreatePage === '' || TxtExamNameCreatePage === '' || $("input[type='radio'].check").is(':checked') == false) {
        if (DdlAcademicYearCreatePage === " " || TxtExamNameCreatePage === '' || $("input[type='radio'].check").is(':checked') == false) {
            $("#Main_Span_Error").text('Following fields have invalid data :');
            window.scrollTo(0, 0);
            //if (DdlAcademicYearCreatePage === '') {
            if (DdlAcademicYearCreatePage === ' ') {
                $("#DdlAcademicYearCreatePage").text("Academic Year");
            }
            if (TxtExamNameCreatePage === '') {
                $("#TxtExamNameCreatePage").text("Exam Name");
            }
            if ($("input[type='radio'].check").is(":checked") == false) {
                $("#RdoExamFor").text("Exam For");
            }
            return;
        }
        $("#loadingOverlay").show();
        var data = new FormData($("#" + FormId)[0]);
        performCrudOperationCommonFunction("POST", "/Examination/ManageExams", data, function (responce) {
            debugger;
            if (responce.message == "Record inserted successfully." || responce.message == "Record updated successfully.") {
                $("#BtnSave").prop('disabled', true);
            }
            $("#Main_Span_Error").text(responce.message);
        }, function (error) {
            $("#Main_Span_Error").text("Something Error");
        }, true);
        $("#loadingOverlay").hide();
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}
//create new page function
function CreateNewExams() {
    debugger;
    $("#loadingOverlay").show();
    performCrudOperationCommonFunction("POST", "/Examination/Create_Update_Pview_ManageExams", "FmExamsSearch", function (response) {
        debugger;
        $("#loadingOverlay").hide();
        $('#DdlAcademicYearCreatePage1').empty();
        Acadamicyearddl(null);
        $("#MainSearchPage").hide();
        $("#CreateNewExams").html(response);
       
    }, function (error) {
        //console.error(error);
    });
}

function EditNewExams() {
    debugger;

    performCrudOperationCommonFunction("POST", "/Examination/Create_Update_Pview_ManageExams", "FmExamsSearch", function (response) {
        debugger;
        $('#DdlAcademicYearCreatePage1').empty();
        //Acadamicyearddl(null);
        $("#MainSearchPage").hide();
        $("#CreateNewExams").html(response);

    }, function (error) {
        //console.error(error);
    });
}


function BackTOSearhExams(event) {
    try {
        $("#loadingOverlay").show();
        TblDataTableWithColumns_CallingFunction(event, 'NoStop', "/Examination/TblExamListData", 'TblExamListData', 'Counts', 'FmExamsSearch', 'Div_TblExamListData', 'Exams', [0, 1, 2, 3]);
        $("#MainSearchPage").show();
        $("#CreateNewExams").empty();
        $(".ErrorMessageSpan").empty();
        $("#loadingOverlay").hide();
    } catch (x) {
        $("#loadingOverlay").hide();
        $("#Main_Span_Error").text("Something Error");
    }
}

function DeleteExamsById(Examid) {
    var Deletemsg = "Exam";
    CommonDeleteFunction_Vs1(Deletemsg, "POST", "/Examination/ManageExams?ButtonName=Delete&DeleteID=" + Examid, function (response) {
        TblDataTableWithColumns_CallingFunction(event, 'NOStop', "/Examination/TblExamListData", 'TblExamListData', 'Counts', 'FmExamsSearch', 'Div_TblExamListData', 'Exams', [0, 1, 2, 3]);
    });
}


function Clearfun(formid) {
    $('#' + formid)[0].reset();
    $('#Main_Span_Error').text('');
    $('#DdlAcademicYearCreatePage').text('');
    $('#TxtExamNameCreatePage').text('');
    $('#RdoExamFor').text('');
}
