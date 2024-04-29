
//======================================This is For Delete
$(document).ready(function () {
    $(document).on("click", '#DeleteSubClassification', function (event) {
        event.stopImmediatePropagation();
        debugger;

        var Subjectname = $("#Subjectname").val();
        CommonDeleteFunction('POST', '/Examination/ManageSubjects?ButtonName=Delete&SubjectName=' + Subjectname, 'Subject', function (response) {
            loaddingimg.css('display', 'block');
            TblDataTableWithColumns_CallingFunction(event, 'NoStop', "/Examination/TblSubjectListData", 'TblSubjectListData', 'Counts', 'FmSubjectSearch', 'Div_TblSubjectListData', '', []);
            $("#DivSearchSubjectsPage").show();
            $("#CreateNewSubjects").empty();
            $(".ErrorMessageSpan").empty();
            loaddingimg.css('display', 'none');
            $("Main_Span_Error").text(response.message);
        });
    });
});

function EditValuesGettingFunction(subjectText) {
    debugger;
    var data = { SubjectName: subjectText };
    loaddingimg.css('display', 'block');

    performCrudOperationCommonFunction("GET", "/Examination/UpdateManageSubjects", data, function (response) {
        debugger;
        //  $("#CreateNewSubjects").html(response);
        $("#DivSearchSubjectsPage").hide();
        $("#CreateNewSubjects").html(response);

        $("#Saveclassfication_MS").val("Update");
        $("#Saveclassfication_MS").text("Update"); // Adding by Arjun
        $("#SpnCardHeaderName").text("UPDATE SUBJECT");
        loaddingimg.css('display', 'none');
    }, function (error) {
        // alert(error)
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error1");
        //console.error(error);
    });

    //  CreateNewSubjects();
    //var url = "/Examination/TblExamListData?Id=" + examid;
    //performCrudOperationCommonFunction("POST", url, null, function (responce) {
    //    debugger;
    //    $("#AddNewText_Span_CreatePage").text("UPDATE EXAM NAME");
    //    $("#DdlAcademicYearCreatePage1").val(responce[0].academicYearId);
    //    $("#TxtExamNameCreatePage1").val(responce[0].examName);
    //    $("#TxtDisplayorderCreatePage").val(responce[0].displayorder);
    //    $("#TxtExamidCreatePage").val(responce[0].id);

    //    $('input[name="ExamForAcademics"][value="' + responce[0].exaternalExam + '"]').prop("checked", true);
    //   $("#Saveclassfication_MS").val("Update");
    //  $("#BtnClear").prop("disabled", true);
    //});

}

function CreateNewSubjects() {
    try {
        loaddingimg.css('display', 'block');
        debugger;
        performCrudOperationCommonFunction("GET", "/Examination/UpdateManageSubjects?Buttonname=Create", "", function (response) {
            debugger;
            $("#DivSearchSubjectsPage").hide();
            $("#CreateNewSubjects").html(response);
            $("#Saveclassfication_MS").text("Save"); //Adding by Arjun
        }, function (error) {
            $("#Main_Span_Error").text("Something Error");
            //console.error(error);
        });
        loaddingimg.css('display', 'none');
    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}

function BackTOSearhExams(event) {
    try {
        loaddingimg.css('display', 'block');
        TblDataTableWithColumns_CallingFunction(event, 'NoStop', "/Examination/TblSubjectListData", 'TblSubjectListData', 'Counts', 'FmSubjectSearch', 'Div_TblSubjectListData', '', []);
        $("#DivSearchSubjectsPage").show();
        $("#CreateNewSubjects").empty();
        $(".ErrorMessageSpan").empty();
        loaddingimg.css('display', 'none');
    } catch (x) {
        loaddingimg.css('display', 'none');
        $("#Main_Span_Error").text("Something Error");
    }
}
//----this below code is writen by sreekanth Manga
//$(document).ready(function () {
//    searchformanagesubjects();
//})

////-----------------------------------------------------------------Class Dropdown getting when department will change
//var classfor_ms = document.getElementById('SubClassificationId_MS');

//$(document).on('change', '#Insertsubject #Drop_Format-MS', function () {

//    var InstanceClassificationId = $(this).find('#dropdown_department_MS').val();
   
//    classfor_ms.innerHTML = ' <option>-- Please select a Class --</option>';
//    $.ajax({
//        url: '/Videos/GetClassfor_MS?InstanceClassificationId=' + InstanceClassificationId,
//        type: 'POST',
//        success: function (response) {
//            if (response.length == 0) {
//                classfor_ms.disabled = true;
//            }
//            else {
//                classfor_ms.disabled = false;
//            }
//            response.forEach(response => {
//                const newoption = document.createElement('Option');
//                newoption.value = response.value;
//                newoption.text = response.text;
//                classfor_ms.add(newoption);
//            })
//        }
//    })



//});

////-------------------------------    Clear The Form when Click on The Clear Button 


//$(document).on('click', '#Insertsubject #clearform', function () {
//    classfor_ms.innerHTML = ' <option>-- Please select a Class --</option>';
//});


////-------------------------------    Search the Manage  subject  when click On The searh button 


//$(document).on('click', '#Insertsubject #sub_tblsubject', function () {
//   // debugger;
//    searchformanagesubjects();

//});



//function searchformanagesubjects() {
// //   debugger;
//    var SubjectNam = document.querySelector('#Insertsubject #SubjectName_Ms').value;
  
//    var SubjectCod = document.querySelector('#Insertsubject #SubjectCode_Ms').value;


  
//    var ClassificationI = document.querySelector('#Insertsubject #dropdown_department_MS').value;


   
//    var SubClassificationI = document.querySelector('#Insertsubject #SubClassificationId_MS').value;


//    searchsubject(SubjectNam, SubjectCod, ClassificationI, SubClassificationI);
//}

//function searchsubject(SubjectNam, SubjectCod, ClassificationI, SubClassificationI) {
//   // debugger;
//    $.ajax({
//        url: "/Videos/Searchsubjects?SubjectName=" + SubjectNam + "&SubjectCode=" + SubjectCod + '&ClassificationId=' + ClassificationI + '&SubClassificationId=' + SubClassificationI,
//        type: "GET",
//        dataType: "JSON",
//        success: bindDatatable

//    });
//}



////--------------------------------------------------------Bind Data into Data Table 

//function bindDatatable(response) {
//   // debugger;
//    var table = $('#tblsubjects').DataTable();
//    table.destroy();
//    $("#totalrecords_sujects_MS").text(response.length);
//    //  alert("hi1");
//    $("#tblsubjects").DataTable({
//        dom: 'Bfrtip',
//        buttons: [
           
            
//            {
//                extend: 'excel',
//                exportOptions: {
//                    columns: [1]
//                },
//            }
//        ],
       
//        bProcessing: false,
//        bLengthChange: true,
//        /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
//        bfilter: false,
//        bSort: true,
//        searching: false,
//        //scrollX: true,
//        //scrollY: '400px',
//        /* scrollCollapse: true,*/
//        paging: true,
//        bPaginate: true,
//        data: response,
//        columns: [

//            {
//                data: "SubjectName",
              
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subjectName
//                }
//            },

//            {
//                data: "SubjectTypeName",
//                visible: false,
//                render: function (data, type, row, meta) {
//                    //  length++;

//                    return row.subjectTypeName

//                }
//            }
//        ]


//    });

//}

