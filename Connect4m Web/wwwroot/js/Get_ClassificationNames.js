

function CallToAjax(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function handleAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {

    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        contentType: false,
        processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };

    if (hasFileUpload) {
        ajaxOptions.processData = false;
        ajaxOptions.contentType = false;
    }

    $.ajax(ajaxOptions);
}
function Ajaxmethod(method, url,data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        contentType: false,
        processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}



//$(document).ready(function () {
  
//    var Rolename = $('#ROLENAMESPANID').val().toUpperCase();
    
//    if (Rolename == "CLASS TEACHER") {

//        //**** ====== *** CLASS TEACHER DROPDOWNS DATA BIND FUNCTION CODE *** ====== ****//

//        $('#Rlenddate').remove();
//        //$('#Rldepartment').remove();
//        //$('#Rlclass').remove();
//        $('#StartDateid').remove();       
//        $('#RlStartdate').text('Date');


//        var currentDate = new Date();
//        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//        var dateString1 = currentDate.toLocaleDateString(undefined, options);  
//        $("#Roldisplaydate").text(dateString1);
     
//        fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
//            '/Attendance/Teacher_attendanceclassification',     // URL for data fetching
//            '#ddlInstanceClassificationSearch',                 // Dropdown selector
//            'value',                                            // Field name for option text
//            'text',                                             // Field name for option values
//            'manageClassification'                              // Response value return class name
//        );

//        $('#Ddldepartment').attr('id', 'ddlInstanceClassificationSearch');
//        $('#DdlSubClass').attr('id', 'ddlInstanceSubclassificationSearch');
//        $('#Ddslotsid').attr('id', 'ddlInstanceSlotSearch');


//        //$(document).on('change', '#ddlInstanceClassificationSearch', function () {
//        //    var selectedValues = $(this).val();
//        //    /*debugger;*/
//        //    fetchDataAndPopulateDropdown(                          //==== << ** Subclassification Dropdown ** >>
//        //        '/Attendance/Teacher_attendancesubclassification', // URL for data fetching
//        //        '#ddlInstanceSubclassificationSearch',             // Dropdown selector
//        //        'value',                                           // Field name for option text
//        //        'text',                                            // Field name for option values
//        //        'manageClassification'                             // Response value return class name
//        //    );
//        //});

//        //$(document).on('change', '#ddlInstanceSubclassificationSearch', function () {
//        //    var ClassificationId = $('#ddlInstanceClassificationSearch').val();
//        //    var SubClassificationId = $(this).val();
//        //    var FilterTeachingSubjects = 1;
//        //    debugger;    
//        //        $.ajax({
//        //            url: '/Attendance/Attendanceslot?ClassificationId=' + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects,
//        //            type: 'GET',
//        //            contentType: 'application/json',
//        //            success: function (response) {
//        //                debugger;
//        //                var dropdownSelector = '#ddlInstanceSlotSearch';
//        //                var dropdown = $(dropdownSelector);
//        //                var valueField = 'instancesubjectId';
//        //                var textField = 'subjectName';
//        //                //dropdown.empty();
//        //                dropdown.append($('<option>', {
//        //                    value: '',
//        //                    text: '---Select---'
//        //                }));
//        //                $.each(response, function (index, item) {
//        //                    dropdown.append($('<option>', {
//        //                        value: item[valueField],
//        //                        text: item[textField]
//        //                    }));
//        //                });
//        //            },
//        //            error: function (xhr, status, error) {

//        //                console.error('Error sending data:', error);
//        //            }
//        //        });
          

//        //});


//        /*--- === *** CLASS TEACHER DROPDOWNS DATA BIND FUNCTION CODE *** === ---*/
//    }
//    else {
       
//        $('#Roldisplaydate').remove();
//        $('#Ddldepartment').empty();

//        //======>>> Classification Dropdown
//        fetchDataAndPopulateDropdown(
//            '/Attendance/AttendanceClassification',             // URL for data fetching
//            '#Ddldepartment',                                   // Dropdown selector
//            'value',                                            // Field name for option text
//            'text',                                             // Field name for option values       
//            'manageClassification'                              // Response value return class name
//        );


//        //$(document).on('change', '#Ddldepartment', function () {
//        //    var selectedValues = $(this).val();
//        //   /* $('#DdlSubClass').val();*/
//        //    $('#DdlSubClass').empty();
//        //    debugger;
//        //    Departmentbysubclassdd(selectedValues);
//        //});

//        //$('#DdlSubClass').change(function () {
//        //    var ClassificationId = $('#Ddldepartment').val();
//        //    var SubClassificationId = $('#DdlSubClass').val();
//        //    var FilterTeachingSubjects = 0;
//        //    $('#Ddslotsid').empty();
//        //    Subclassbyslotsdd(ClassificationId, SubClassificationId, FilterTeachingSubjects);
//        //});
//    }
    
//});



//$(document).on('change', '#ddlInstanceClassificationSearch', function () {
//    var selectedValues = $(this).val();
//    /*debugger;*/
//    fetchDataAndPopulateDropdown(                          //==== << ** Subclassification Dropdown ** >>
//        '/Attendance/Teacher_attendancesubclassification', // URL for data fetching
//        '#ddlInstanceSubclassificationSearch',             // Dropdown selector
//        'value',                                           // Field name for option text
//        'text',                                            // Field name for option values
//        'manageClassification'                             // Response value return class name
//    );
//});

//$(document).on('change', '#ddlInstanceSubclassificationSearch', function () {
//    var ClassificationId = $('#ddlInstanceClassificationSearch').val();
//    var SubClassificationId = $(this).val();
//    var FilterTeachingSubjects = 1;
//    debugger;
//    $.ajax({
//        url: '/Attendance/Attendanceslot?ClassificationId=' + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects,
//        type: 'GET',
//        contentType: 'application/json',
//        success: function (response) {
//            debugger;
//            var dropdownSelector = '#ddlInstanceSlotSearch';
//            var dropdown = $(dropdownSelector);
//            var valueField = 'instancesubjectId';
//            var textField = 'subjectName';
//            //dropdown.empty();
//            dropdown.append($('<option>', {
//                value: '',
//                text: '---Select---'
//            }));
//            $.each(response, function (index, item) {
//                dropdown.append($('<option>', {
//                    value: item[valueField],
//                    text: item[textField]
//                }));
//            });
//        },
//        error: function (xhr, status, error) {

//            console.error('Error sending data:', error);
//        }
//    });


//});


//$(document).off('change', '#Ddldepartment');
//$(document).off('change', '#DdlSubClass');

//$(document).on('change', '#Ddldepartment', function () {
//    var selectedValues = $(this).val();
//    /* $('#DdlSubClass').val();*/
//    $('#DdlSubClass').empty();
//    debugger;
//    Departmentbysubclassdd(selectedValues);
//});

//$('#DdlSubClass').change(function () {
//    var ClassificationId = $('#Ddldepartment').val();
//    var SubClassificationId = $('#DdlSubClass').val();
//    var FilterTeachingSubjects = 0;
//    $('#Ddslotsid').empty();
//    Subclassbyslotsdd(ClassificationId, SubClassificationId, FilterTeachingSubjects);
//});



function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    debugger;
    CallToAjax('GET', url,
        function (response) {

            debugger;
            var dataToPopulate = Array.isArray(response) ? response : response[Responsevalues] || [];
            populateDropdown(dataToPopulate, dropdownSelector, valueField, textField);
        },
        function (status, error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        }
    );
}

function populateDropdown(data, dropdownSelector, valueField, textField) {
    var dropdown = $(dropdownSelector);
    debugger;
   // dropdown.empty(); // Clear existing options
    dropdown.append($('<option>', {
        value: '',
        text: '---Select---'
    }));
    $.each(data, function (index, item) {
        dropdown.append($('<option>', {
            value: item[valueField],
            text: item[textField]
        }));
    });
}


function Departmentbysubclassdd(Departmentvalue) {
    $.ajax({
        url: '/Attendance/AttendanceSubclass?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#DdlSubClass';
            var dropdown = $(dropdownSelector);
            var valueField = 'instanceSubclassificaitionId';
            var textField = 'subClassificationName';
            //dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}

function Subclassbyslotsdd(ClassificationId, SubClassificationId, FilterTeachingSubjects) {
    $.ajax({
        url: '/Attendance/Attendanceslot?ClassificationId=' + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            /*debugger;*/
            var dropdownSelector = '#Ddslotsid';
            var dropdown = $(dropdownSelector);
            var valueField = 'instancesubjectId';
            var textField = 'subjectName';
           // dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}

function GetDateFormat(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
}


//-----**Date Compare function**-------

function DatesCompare(Sdate, Edate) {
    try {
        var StartdateInput = $("#StartDateid").val();
        var EnddateInput = $("#EndDateid").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var formattedStartDate = GetDateFormat(Startdate);
        var formattedEndDate = GetDateFormat(Enddate);

        var errorElement = $('.compare');

        if (formattedStartDate != formattedEndDate) {
            if (Enddate <= Startdate) {
                // $('#Errormessage').text(Edate + " must be greater than " + Sdate + ".");//Start Date should be less than today.
                $('#Errormessage').text('Start Date should be less than today.');//
            } else {
                $('#Errormessage').text("");
            }
        } else {
            $('#Errormessage').text("");
        }
    }
    catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$(".form-group #StartDateid").on("change", function () { DatesCompare("Start Date", "End Date"); });
$(".form-group #EndDateid").on("change", function () { DatesCompare("Start Date", "End Date"); });






$('#Postattendaceformid').on('submit', function () {
    event.preventDefault();
    event.stopImmediatePropagation();
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        $("#Errormessage").text("");
        var validationMessagesLength = validationMessages.length;
       
        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            debugger;
            $('#GetAttendance_Table').empty();
            loaddingimg.css('display', 'block');


            var formData = $('#Postattendaceformid').serialize();
            if ($('#Roldisplaydate').is(':visible')) {
                var roldisplaydateValue = $('#Roldisplaydate').text();
                var parts = roldisplaydateValue.split('/');
                var newDateValue = parts[1] + '/' + parts[0] + '/' + parts[2];
                var startdate = newDateValue;
                var enddate = newDateValue;
                formData += "&StartDate=" + startdate;
                formData += "&EndDate=" + enddate;
            }

            //else {
            //    //formData += "&StartDate=" + startdate;
            //    //formData += "&EndDate=" + enddate;
            //}

            var url = "/Attendance/GetAttedanceDetails";
            handleAjax('GET', url, formData,                
                function (response) {
                    debugger;
                    var DepartmentText;
                    var SubClassText;
                    if ($('#Roldisplaydate').is(':visible')) {
                         DepartmentText = $("#ddlInstanceClassificationSearch option:selected").text();
                         SubClassText = $("#ddlInstanceSubclassificationSearch option:selected").text();
                    } else {
                         DepartmentText = $("#Ddldepartment option:selected").text();
                         SubClassText = $("#DdlSubClass option:selected").text();
                    }
                   
                    var holidaynameslist = response[0].holidaysnames;
                    var validateornotmessage=response[0].attendanceValidateornotretunmessage;
                    var formattedDates = "";
                    if (holidaynameslist && holidaynameslist.length > 0) {

                        for (var i = 0; i < holidaynameslist.length; i++) {
                            var holidayNames = holidaynameslist[i].holidayName;
                            var originalDate = holidaynameslist[i].holidayDate;
                            var formattedDate = new Date(originalDate).toLocaleDateString('en-GB');

                            //var formattedDate = formatDate(originalDate);
                            formattedDates += formattedDate + " (" + holidayNames + "),";
                        }
                        // $("#GetAttendance_Table").html(resp);      

                        formattedDates = formattedDates.slice(0, -1);
                        $('#Errormessage').text('There are holidays/week-offs in the selected date range on ' + formattedDates);
                    }
                    else {
                        debugger;
                        if (validateornotmessage == "0") {
                            $('#Errormessage').text('you cannot select start date less than Effective Date ');
                           
                        } else {
                            debugger;
                            $("#btndelete").show();
                            $("#GetAttendance_Table").html(response);
                            
                            $('#Printattendancereport #Selecteddepartmentclassnamesdiv').text('' + DepartmentText + ' ' + SubClassText);
                        }  
                    }
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    /*debugger;*/
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                },
                true
            );
        }
    }, 50);
});





function formatDate(dateString) {
    /*debugger;*/
    var date = new Date(dateString);
    var formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return formattedDate;
}


function Attendanceposting() {
    debugger;
    /*try {*/
    loaddingimg.css('display', 'block');
        debugger;
    event.preventDefault();
    $("#Errormessage").text("");
    var StudentallValues = new FormData();
    debugger;

    var SubjectSlotID;
    if ($('#Roldisplaydate').is(':visible')) {
        SubjectSlotID = $('#ddlInstanceSlotSearch').val();
    } else {
        SubjectSlotID = $('#Ddslotsid').val();
    }

    
    var rowData = [];
   

    var table = document.getElementById('TableData');
    var tablehead = table.querySelector('thead');
    var tableBody = table.querySelector('tbody');
    //var tableBody = document.querySelector('#TableData tbody');
  
        if (tableBody) {
           
            var rows = tableBody.querySelectorAll('tr');
            var headrows = tablehead.querySelectorAll('tr');
         
            if (rows && rows.length > 0) {
                debugger;
                rows.forEach(function (row, index) {
                  


                            var i = 1;
                            var cells = row.querySelectorAll('td');

                            var Attendancedetails = [];
                            var rowObject = {
                                Studentuserid: cells[1].textContent.trim(),
                                ParentPhNo: cells[2].textContent.trim(),
                                studentName: cells[3].textContent.trim(),
                                InstanceUserCode: cells[4].textContent.trim(),
                                StudentSMS: cells[5].textContent.trim(),
                                ParentSMS: cells[6].textContent.trim(),
                                StudEmail: cells[7].textContent.trim(),
                                ParentEmail: cells[8].textContent.trim(),
                                SubjectSlotID: SubjectSlotID,
                                attendancedetails: Attendancedetails
                            };

                    //var Attendancedetails = {};
                    var Lastdayofattendace;
                    var dropdownValue;
                    var dropdowntext;
                    var textareaValue;
                    var isPresentValue;
                    var attendancedatetext;
                    var hiddenInput
                    var hiddenInputValue
                    var hiddenInputName
                    var i = 1;
                    cells.forEach(function (cell, cellIndex) {
                        hiddenInput = row.querySelector('#Parentdetailstxt');
                        //hiddenInput = document.getElementById('Parentdetailstxt');
                        hiddenInputValue = hiddenInput.value;
                        hiddenInputName = hiddenInput.getAttribute('name');


                        if (cellIndex < 10) {
                            return true;
                        }


                        attendancedatetext = $('#Attendancedate_' + i).text();
                        Lastdayofattendace = $('#Lastdayofattendacetxtid_' + i).val();
                        ckDay = $(cell).find('#ckDay');
                        var displayStyle = ckDay.css('display');

                        if (!ckDay.prop('disabled')) {
                            if (ckDay.prop('checked') && displayStyle === 'inline-block') {
                                isPresentValue = "1";
                                dropdownValue = "";
                                textareaValue = "";
                                dropdowntext = "";
                                Lastdayofattendace = "";

                            }
                            else {
                                isPresentValue = "0";
                                dropdownValue = $(cell).find('#ddDataattType').val();
                                dropdowntext = $(cell).find('#ddDataattType option:selected').text();
                                if (dropdowntext == "--Select--") {
                                    dropdowntext = "";
                                }

                                textareaValue = $(cell).find('#commentTextArea').val();
                                Lastdayofattendace = "";
                            }
                        }

                        var Attendancerowdata = {
                            'attendancedate': attendancedatetext,
                            'isPresentValue': isPresentValue,
                            'dropdownValue': dropdownValue,
                            'Comments': textareaValue,
                            'ParentId': hiddenInputValue,
                            'ParentName': hiddenInputName,
                            'dropdowntext': dropdowntext,
                            'Lastdayofattendace': Lastdayofattendace,
                        };
                        Attendancedetails.push(Attendancerowdata);
                        i++;
                    });

                    rowData.push(rowObject);
                   
                    // rowData.push(Attendancedetails);
                });

                var formData = new FormData();
                formData.append('dataList', JSON.stringify(rowData));
                $.ajax({
                    url: "/Attendance/PostAttendance",
                    type: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        var allOnes = result.every(function (item) {
                            return item === "1";
                        });
                        if (allOnes) {
                            $("#btndelete").hide();
                            $('#Errormessage').text('Attendance saved successfully .');
                        } else {
                            $('#Errormessage').text('Something went wrong please try again.');
                        }
                        //if (result == "1") {
                        //    $('#Errormessage').text('Attendance saved successfully .');
                        //    loaddingimg.css('display', 'none');
                        //}
                        loaddingimg.css('display', 'none');
                    }
                });                
            } else {
                console.log("No rows found in the table body.");
            }
        }
        else {
            console.log("Table data found.");
        }   
    //} catch (e) {
    //    alert("Someting error");
    //}
}

function AttendancedeleteAll() {
    debugger;
    event.preventDefault();
    event.stopImmediatePropagation();
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        $("#Errormessage").text("");
        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
           /* $('#GetAttendance_Table').empty();*/
            loaddingimg.css('display', 'block');
            var formdata = $('#Postattendaceformid').serialize();
            var url = "/Attendance/Deleteattendance";
            handleAjax('GET', url, formdata,
                function (response) {
                    debugger;
                    loaddingimg.css('display', 'none');
                    if (response == "1") {
                        debugger;
                        $('#Errormessage').text('Attendance Deleted Successfully.');
                        //THIS IS ATTENDANCE GETTING CODE
                        //var url = "/Attendance/GetAttedanceDetails";

                        handleAjax('GET', "/Attendance/GetAttedanceDetails", formdata,
                            function (response) {
                                debugger;

                                var DepartmentText = $("#Ddldepartment option:selected").text();
                                var SubClassText = $("#DdlSubClass option:selected").text();
                                var holidaynameslist = response[0].holidaysnames;
                                var validateornotmessage = response[0].attendanceValidateornotretunmessage;
                                var formattedDates = "";
                                if (holidaynameslist && holidaynameslist.length > 0) {

                                    for (var i = 0; i < holidaynameslist.length; i++) {
                                        var holidayNames = holidaynameslist[i].holidayName;
                                        var originalDate = holidaynameslist[i].holidayDate;
                                        var formattedDate = new Date(originalDate).toLocaleDateString('en-GB');

                                        //var formattedDate = formatDate(originalDate);
                                        formattedDates += formattedDate + " (" + holidayNames + "),";
                                    }
                                    // $("#GetAttendance_Table").html(resp);      

                                    formattedDates = formattedDates.slice(0, -1);
                                    $('#Errormessage').text('There are holidays/week-offs in the selected date range on ' + formattedDates);
                                }
                                else {
                                    debugger;
                                    if (validateornotmessage == "0") {
                                        $('#Errormessage').text('you cannot select start date less than Effective Date ');

                                    } else {
                                        debugger;
                                        $("#btndelete").show();
                                        $("#GetAttendance_Table").html(response);

                                        $('#Printattendancereport #Selecteddepartmentclassnamesdiv').text('' + DepartmentText + ' ' + SubClassText);
                                    }
                                }
                                loaddingimg.css('display', 'none');
                            },
                            function (status, error) {
                                /*debugger;*/
                                console.error("Error fetching data:", error);
                                loaddingimg.css('display', 'none');
                            },
                            true
                        );


                     
                    } else if (response == "0") {
                        debugger;
                        $('#Errormessage').text('You Cannot delete the Attendance.');                       
                      
                    } else {
                        $('#Errormessage').text('An error occurred while Deleting attendance records.');
                    }
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                },
                true
            );
        }
    }, 50);
}

function Showchangeactivity(Key, Attendanceid, TableName) {
    /*debugger;*/
    handleAjax('GET', "/Attendance/Changeactivitytblattendance?AuditKey=" + Key + "&SourceId=" + Attendanceid + "&TableName=" + TableName, null,
        function (response) {
            /*debugger;*/
            var tableHTML = '<table style="border-collapse: collapse; width: 100%;">';
            tableHTML += '<tr>';
            tableHTML += '<td colspan="8" style="padding: 0px; text-align: center; border-bottom: 1px solid #ddd;"> View Change Activity </td>';
            tableHTML += '</tr>';

            var headings = ['SNO','Audit Trail ID', 'Audit Key', 'Current Value', 'Previous Value', 'Previous Value Created By', 'Current Value Created By', 'Current Value Created Date'];           
            tableHTML += '<tr>';
            for (var i = 0; i < headings.length; i++) {
                tableHTML += '<th style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd; background-color: #f2f2f2; font-weight: bold;">' + headings[i] + '</th>';
            }
            var sno = 1;
            tableHTML += '</tr>';      
            for (var i = 0; i < response.length; i++) {
                tableHTML += '<tr>';
                tableHTML += '<td style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd;">' + sno + '</td>';
                tableHTML += '<td style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd;">' + response[i].auditTrailId + '</td>';
                tableHTML += '<td style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd;">' + response[i].auditKey + '</td>';
                tableHTML += '<td style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd;">' + response[i].currentValue + '</td>';
                tableHTML += '<td style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd;">' + response[i].previousValue + '</td>';
                tableHTML += '<td style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd;">' + response[i].previousValueCreatedBy + '</td>';
                tableHTML += '<td style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd;">' + response[i].currentValueCreatedBy + '</td>';

                var dateParts = response[i].currentValuecreateddate.split(' ');
                //var datePart = dateParts[0].split('-').reverse().join('/');
                var datePart = dateParts[0].split('-').join('/');
                var timePart = dateParts[1];
                var formattedDate = datePart + ' ' + timePart;

                tableHTML += '<td style="padding: 0px; text-align: left; border-bottom: 1px solid #ddd;">' + formattedDate + '</td>';
                tableHTML += '</tr>';
                sno++;
            }
            tableHTML += '</table>';

            var newWindow = window.open('', '_blank', 'width=700,height=250');
            newWindow.document.write('<html><body>');        
            newWindow.document.write(tableHTML);
            newWindow.document.write('</body></html>');
            newWindow.document.close();
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        },
        true
    );
}


////Class Teacher Login Javascript Code Start
//$(document).ready(function () {


//    var LgUserid = $('#Lg_UserId_Txtid').val();
  
//    var Ct_Roleid = $('#Teacher_Lg_Roleid_Txtid').val();



//    /*alert(LgUserid);*/


//    var currentDate = new Date();
//    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//    var dateString1 = currentDate.toLocaleDateString(undefined, options);

//    var year = currentDate.getFullYear();
//    var month = String(currentDate.getMonth() + 1).padStart(2, '0');
//    var day = String(currentDate.getDate()).padStart(2, '0');


//    var StartDate_EndDate = year + '-' + month + '-' + day;

//    $("#currentDate").text(dateString1);
//   /* debugger;*/
//    /*alert(LgUserid);*/
//    if (LgUserid == 32886) {

//        //---------New code 
//        //$('#Admin_Lg_Div_id').remove();
//        //$('#Ct_Lg_DivId').show();

//        //$('#Cl_Subject_DD_by_slot_Dd').change(fun200);
//        /*alert("If condition alert");*/
       
//    }
//    else {
//        //---------New code 
//      //  $('#Admin_Lg_Div_id').show();
//       // $('#Ct_Lg_DivId').remove();
//       /* $("form #Get_atd_btn").click(fun5);*/
//    }




//    //function fun200() {
//    //    /*  debugger;*/
//    //    var ClassificationId = $('#CT_Classification_Id').val();
//    //    var subClassificationId = $('#CT_InsClassSub_Id').val();

//    //    $.ajax({
//    //        url: "/Attendance/Slot_by_subclassification?ClassificationId=" + ClassificationId + "&SubClassificationId=" + subClassificationId,
//    //        type: "GET",
//    //        success: fun101
//    //    });
//    //    function fun101(response) {
//    //        /*  debugger;*/
//    //        $("#SubjectName").html(response);
//    //    }
//    //}


//   // $("#Get_atd_btn").click(fun201);

//   $("#Get_atd_btn").unbind("click").click(fun201);

   
//    /*function fun201() {*/
//    function fun201(event) {


        

//        var checkbox = $('#chk_seacrh_icon');

//        if (checkbox.is(':checked')) {
//            /*alert("checked is True");*/
//        }
//        else {
//           /* alert("checked is False");*/
//        }



//        event.stopImmediatePropagation();
        
//        $("#MessageID").text("");
//        if (LgUserid == 32886) {
                      
//            var ClassificationId = $('#CT_Classification_Id').val();
//            var subClassificationId = $('#CT_InsClassSub_Id').val();
//            var SubjectSlotID = $("#SubjectName").val();
//            var Startdate = StartDate_EndDate;
//            var EndDate = StartDate_EndDate;


//            var dropdownCt_L = document.getElementById("CT_Classification_Id");
//            var selectedOption1 = dropdownCt_L.options[dropdownCt_L.selectedIndex];
//            var selectedTexts = selectedOption1.text;      
           
//            var dpdownCt_L = document.getElementById("CT_InsClassSub_Id");
//            var selecteOption2 = dpdownCt_L.options[dpdownCt_L.selectedIndex];
//            var selecteTexts = selecteOption2.text;


//            var ViewBagMyData = selectedTexts + " " + selecteTexts;


//            if (ClassificationId == '') {

//                $("#validation2").text("Following fields have invalid data :");
//                $("#validation1").text("Department");

//            } else if (subClassificationId == '') {

//                $("#validation1").text("Class");

//            } else if (SubjectSlotID == '') {

//                $("#validation1").text("Slot");
//            } else {

//                $("#validation1,#validation2").text('');
//                $(this).removeClass('validation1', 'validation2')


//                $.ajax({
//                    url: "/Attendance/GetAttedanceDetails?Startdate=" + Startdate + "&EndDate=" + EndDate + "&InstanceClassificationId=" + ClassificationId + "&InstanceSubClassificationId=" + subClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&ViewBagMyData=" + ViewBagMyData + "&CreatedBy=" + LgUserid,
//                    type: "GET",
//                    success: fun102
//                });
//                function fun102(resp) {
//                    /* debugger;*/
//                    $("#GetAttendance_Table").html(resp);
//                }
//            }
//        }
//        else {      

//            var InstanceClassificationId = $("#CFNID1").val();
//            var InstanceSubClassificationId = $("#SCFNID1").val();
//            var SubjectSlotID = $("#SubjectName").val();
//            var Startdate = $('#StartDateid').val();
//            var EndDate = $("#EndDateid").val();



//            var dropdown = document.getElementById("CFNID1");
//            var selectedOption = dropdown.options[dropdown.selectedIndex];
//            var selectedText = selectedOption.text;
           


           
//            var dpdown = document.getElementById("SCFNID1");
//            var selecteOption = dpdown.options[dpdown.selectedIndex];
//            var selecteText = selecteOption.text;


//            var ViewBagMyData = selectedText + " " + selecteText;



           
//            if (Startdate > EndDate) {

//                $("#validation1").text("Start date cannot be greater than end date.");

//            } else if (InstanceClassificationId == '') {

//                $("#validation2").text("Following fields have invalid data :");
//                $("#validation1").text("Department");

//            } else if (InstanceSubClassificationId == '') {

//                $("#validation2").text("Following fields have invalid data :");
//                $("#validation1").text("Class");

//            } else if (SubjectSlotID == '') {

//                $("#validation2").text("Following fields have invalid data :");
//                $("#validation1").text("Slot");

//            } else if (Startdate == '') {

//                $("#validation2").text("Following fields have invalid data :");
//                $("#validation1").text("Startdate");

//            } else if (EndDate == '') {

//                $("#validation2").text("Following fields have invalid data :");
//                $("#validation1").text("EndDate");

//            } else {

//                $("#validation1,#validation2").text('');
//                $(this).removeClass('validation1', 'validation2')


//                $.ajax({
//                    url: "/Attendance/GetAttedanceDetails?Startdate=" + Startdate + "&EndDate=" + EndDate + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&ViewBagMyData=" + ViewBagMyData + "&CreatedBy=" + LgUserid,
//                    type: "GET",
//                    success: fun6
//                });
//                function fun6(resp) {
//                    /* debugger;*/
//                    $("#GetAttendance_Table").html(resp);
//                }
//            }
//        }


//    }



//});
////Class Teacher Login Javascript Code End










////Admin Login JavaScript code Start

////$("#DCFN10").change(fun101);
////function fun101() {
////    debugger;
////    var value = $('#CFNID1').val();

////    $.ajax({
////        url: "/Attendance/Get_SubClassificationNames_ByInstanceClassifications?InstanceClassificationId=" + value,
////        type: "GET",
////        success: fun1011
////    });
////    function fun1011(response) {
////        /*debugger;*/
////        $("#SCFNID1").html(response);
////    }

////}
////$("#SCFNID2").change(fun102);
////function fun102() {
////    /*  debugger;*/
////    var SubClassificationId = $('#SCFNID1').val();


////    $.ajax({
////        url: "/Attendance/Slot_by_subclassification?SubClassificationId=" + SubClassificationId,
////        type: "GET",
////        success: fun1012
////    });
////    function fun1012(response) {
////        /*  debugger;*/
////        $("#SubjectName").html(response);
////    }

////}






//$("form #submit-btn").click(function () {


//    $("#MessageID").text("");
//    $("#MailS_ErrorMsg").text("");

//    var LgUserid = $('#Lg_UserId_Txtid').val();
//    var SubjectSlotID = $("#SubjectName").val();
//    var leng = $('#TableData tr').length;

//    var dataList = []; // Create an empty array to store the data

   

//    for (var i = 2; i < leng; i++) {
    
//        var data = {}; // Create an object to hold the data for each row

//        var formattedDate  = $("#A_PostingDate").text();

//        var parts = formattedDate.split("/");
//        var day = parts[0];
//        var month = parts[1];
//        var year = parts[2];

       
//        var dateValue = year + "-" + month + "-" + day;
   
//        if (document.getElementById(i).checked == true) {          
//            data.Ispresent = "1";
//            data.Name = document.getElementById(i).title;
//            data.UserId = document.getElementById(i).name;
//            data.comment = "0";
//            data.Dropdownvalue = 0;
//            data.AttendanceTypeId = 0;

//            debugger;
//            if ($("#solid6").is(":checked"))
//            {
//                data.StudEmail = $('#TableData tr:eq(' + i + ') td:eq(8) #Stu_Email').val();                
//            }          
//           data.ParentEmail = $('#TableData tr:eq(' + i + ') td:eq(9) #Pa_Email').val();
//        }
//        else {
         
//            data.Ispresent = "";
//            data.Name = $('#TableData tr:eq(' + i + ') td:eq(3)').text();
//            data.UserId = $('#TableData tr:eq(' + i + ') td:eq(1)').text();
//            data.comment = $('#TableData tr:eq(' + i + ') td:eq(7) #commentTextArea').val();          
//            data.Dropdownvalue = $('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').text();
//            data.AttendanceTypeId = $('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').val();

//            var stEmail = "";            
         
//            if ($(".Email_Stu_Checkboxid").is(":checked"))
//            {
//                stEmail = $('#TableData tr:eq(' + i + ') td:eq(8)').text().trim();               
//            }
//            data.StudEmail = stEmail;

//            if ($(".Email_Par_Checkboxid").is(":checked")) {
//                var ParentEmail = $('#TableData tr:eq(' + i + ') td:eq(9)').text().trim();            
//                data.ParentEmail = ParentEmail;
//            }
            


//            if (data.AttendanceTypeId == null || data.AttendanceTypeId == "--Select--") {
//                data.AttendanceTypeId = 0;
//            }
//            else {
//                data.AttendanceTypeId  =parseInt($('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').val(), 10);
                
//            }
//            if (data.Dropdownvalue == null || data.Dropdownvalue == "--Select--") {
             
//                data.Dropdownvalue = 0;
                
//            }
//            else {
//                data.Dropdownvalue = $('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').text();
            
//                //data.AttendanceTypeId = $('#TableData tr:eq(' + i + ') td:eq(7) .dropdown option:selected').val();
//            }
//        }
//        data.CreatedBy = LgUserid;
//        data.SubjectSlotID = SubjectSlotID;
//        data.dateValue = dateValue;
        
        
//        dataList.push(data);
//    }
   
//    var formData = new FormData();
//    formData.append('dataList', JSON.stringify(dataList));
    
//    $.ajax({
        
//       // url: "/Attendance/Post_Attendance",
//        url: "/Attendance/PostAttendance",
//       // url: "/Attendance/post_ate",  // testing mails url
//        type: "POST",
        
//        data: formData,
//        contentType: false,
//        processData: false,
//        success: function (result) {
//              debugger;

//            var data1 = result.data1;
//            var successCount = result.successCount;
//            var failureList = result.failureList;
//            var successList = result.successList;
//            var successMessage = "";
          

//            if (data1 != 0) {
               
//                document.getElementById('MessageID').innerHTML = "Attendance saved successfully";
//            } else {
               
//                $("#MessageID").text("Attendance Not Posted").fadeOut(5000);
//            }

         
//            if (successList.length > 0) {
              
//                successMessage = "Email successfully sent to Students.For User" + successList.join(", ");
//                document.getElementById('MailS_ErrorMsg').innerHTML = successMessage;
//            } else {
//                var FailureMessage = "Email successfully sent to Students.For User" + failureList.join(", ") +"No Email Id's Exists for Students.";
              
//                document.getElementById('MailS_ErrorMsg').innerHTML = FailureMessage;
//            }    
//        }
//    });
//});

