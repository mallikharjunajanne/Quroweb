/*-- ** STUDENT ATTENDANCE REPORT CODE START  ** --*/

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
    debugger;
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

$(document).ready(function () {
    debugger;
    $("#Registertablediv1").hide(); //====>>> Register table div hide

    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/Reports/Reportdepartment',                        // URL for data fetching
        '#Ddldepartment',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
});

function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    CallToAjax('GET', url,
        function (response) {
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
    dropdown.empty(); // Clear existing options
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
$('#Ddldepartment').change(function () {
    debugger;
    var ClassificationId = $('#Ddldepartment').val();
    Departmentbysubclassdd(ClassificationId);
});

function Departmentbysubclassdd(Departmentvalue) {
    $.ajax({
        url: '/Reports/GetSubclassbydepartment?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#DdlSubClass';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            dropdown.empty();
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


$('#Attendanceregisterreportform').on('submit', function () {
    try {
        event.preventDefault();
        event.stopImmediatePropagation();
        $('#tblhead').empty();

        setTimeout(function () {
            debugger;
            var validationMessages = $('.field-validation-error');
            var validationMessages2 = $('.error2');

            var validationMessagesLength = validationMessages.length;

            if (validationMessagesLength === 0 && validationMessages2.length === 0) {

                $('#Errormessage').text('');
                loaddingimg.css('display', 'block');              
                var month = $("#Monthddl option:selected").text();
                var monthID = $("#Monthddl").val();
                var year = $("#Yearddl").val();
                var InstanceClassificationId = $("#Ddldepartment").val();
                var SubClass = $("#DdlSubClass").val();
                var department = $("#Ddldepartment option:selected").text();
                var className = $("#DdlSubClass option:selected").text();

                $.ajax({
                    url: "/Reports/StudentAttendanceRegister?Month=" + monthID + "&Year=" + year + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + SubClass, 
                    type: "POST",
                    //data: formData,
                    success: function (response) {
                        $("#Registertablediv1").show();
                        $("#MONTHIDMONTHID").text(month);
                        $("#YEARID").text(year);
                        $("#Section").text(className);
                        $("#Cl").text(department);
                        debugger;
                        var Returnmessage = response.errorMessage;
                        if (Returnmessage == "Attendance is not posted") {
                            $('#Errormessage').text('Attendance is not Posted for the selected criteria');
                            $('#Registertablediv1').hide();
                            loaddingimg.css('display', 'none');
                        }
                        else {
                            //New Tabledata
                            var tblhead = $('#tblhead');
                            var tableBody = $('#tblBody');
                            var tablefooter = $('#tblfooter');


                            debugger;
                            var returnmessage = response.retunmessage;
                            if (returnmessage != "0") {

                                if (response.hasOwnProperty('attendanceList')) {

                                    var attendanceList = response.attendanceList;
                                    var rowCount = response.attendanceList.length;

                                    //====>>>> Table head appending code start

                                    var monthIndex = new Date(Date.parse(month + " 1, " + year)).getMonth();
                                    var daysInMonth;
                                    if (monthIndex === 1) {
                                        daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                                    } else {
                                        daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                                    }

                                    var firstRow = $('<tr>');
                                    firstRow.append($('<td style="border: 1px solid;">').attr('rowspan', '2').attr('align', 'center').html('&nbsp; S.No.&nbsp;'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').text('Name of Student'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').text('Gender'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').css('white-space', 'normal').text('Date of Birth'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').text('Religion'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').text('Category'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').css('white-space', 'normal').text('Economically Weaker Section'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').text('Repeater'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').css('white-space', 'normal').text('Joined Back After dropout thorugh bridge courses'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('colspan', daysInMonth).attr('align', 'center').text('Day of the month'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('colspan', '3').text('Present'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('rowspan', '2').css('white-space', 'normal').text('No of days participated in extracurricular activities'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('colspan', '2').text('Absent'));
                                    firstRow.append($('<td style="border: 1px solid;">').attr('align', 'center').attr('colspan', '2').text('Attendance%'));


                                    var secondRow = $('<tr>');
                                    for (var day = 1; day <= daysInMonth; day++) {
                                        secondRow.append($('<td style="border: 1px solid; width:8px">').attr('align', 'center').text(day));
                                    }
                                    secondRow.append($('<td style="border: 1px solid;">').attr('align', 'center').text(`${month}`));
                                    secondRow.append($('<td style="border: 1px solid;">').attr('align', 'center').text('Carry Fwd'));
                                    secondRow.append($('<td style="border: 1px solid;">').attr('align', 'center').text('Total'));
                                    secondRow.append($('<td style="border: 1px solid;">').attr('align', 'center').text(`${month}`));
                                    secondRow.append($('<td style="border: 1px solid;">').attr('align', 'center').text('Total'));
                                    secondRow.append($('<td style="border: 1px solid;">').attr('align', 'center').text('Month'));
                                    secondRow.append($('<td style="border: 1px solid;">').attr('align', 'center').text('Till Date'));

                                    tblhead.append(firstRow);
                                    tblhead.append(secondRow);

                                    //====>>>> Table head appending code end
                                    //====>>>> Table boy appending code start

                                    //var tableBody = $('#tblBody');
                                    tableBody.empty();












                                    //var areColumnsAppended = false;

                                    var rowspanStartRow = -1; // Row index where the rowspan column starts
                                    var loopExecuted = false;
                                    var itstrue = false;
                                    for (var i = 0; i <= attendanceList.length; i++) {
                                        var item = attendanceList[i];

                                        if (item && item.dynamicColumns) {
                                            var dynamicColumns = item.dynamicColumns;
                                        }
                                        // var dynamicColumns = item.dynamicColumns;

                                        if (typeof item === 'undefined') {
                                            continue; // Skip the iteration if 'item' is undefined
                                        }

                                        var tableRow = $('<tr>');
                                        $('<td style="border: 1px solid; color: black;">').text(i + 1).prependTo(tableRow);
                                        tableRow.append($('<td style="border: 1px solid; color: black;">').text(item.name));
                                        tableRow.append($('<td style="border: 1px solid; color: black;" align="center">').text(item.gender));
                                        tableRow.append($('<td style="border: 1px solid; color: black;">').text(item.dob));
                                        tableRow.append($('<td style="border: 1px solid; color: black;" align="center">').text(item.religionName));
                                        tableRow.append($('<td style="border: 1px solid; color: black;" align="center">').text(item.castName));
                                        tableRow.append($('<td style="border: 1px solid; color: black;" align="center">').text(item.ews));
                                        tableRow.append($('<td style="border: 1px solid; color: black;" align="center">').text(item.repeater));
                                        tableRow.append($('<td style="border: 1px solid; color: black;" align="center">').text(item.dropout));

                                        //for (var index = 1; index <= daysInMonth; index++) {
                                        //    var columnValue = dynamicColumns[index];
                                        //    var cellHtml;

                                        //    if (i === 0) {
                                        //        if (columnValue === "S <br> <br> a <br> <br> t <br> <br> u <br> <br> r <br> <br> d <br> <br> a <br> <br> y") {
                                        //            cellHtml = `<td rowspan="${rowCount}" align="center">${columnValue}</td>`;
                                        //            rowspanStartRow = i;
                                        //        } else if (columnValue === "S <br> <br> u <br> <br> n <br> <br> d <br> <br> a <br> <br> y") {
                                        //            cellHtml = `<td rowspan="${rowCount}" align="center">${columnValue}</td>`;
                                        //            rowspanStartRow = i;
                                        //        } else {
                                        //            isEveryColumnSaturdaySunday = false;
                                        //            cellHtml = `<td align="center">${columnValue}</td>`;
                                        //        }
                                        //    } else {
                                        //        if (columnValue === "S <br> <br> a <br> <br> t <br> <br> u <br> <br> r <br> <br> d <br> <br> a <br> <br> y") {
                                        //            cellHtml = `<td rowspan="${rowCount}" hidden>${columnValue}</td>`;
                                        //            rowspanStartRow = i;
                                        //        } else if (columnValue === "S <br> <br> u <br> <br> n <br> <br> d <br> <br> a <br> <br> y") {
                                        //            cellHtml = `<td rowspan="${rowCount}" hidden>${columnValue}</td>`;
                                        //            rowspanStartRow = i;
                                        //        } else {
                                        //            isEveryColumnSaturdaySunday = false;
                                        //            cellHtml = `<td align="center">${columnValue}</td>`;
                                        //        }
                                        //    }

                                        //    tableRow.append($(cellHtml));
                                        //}  
                                        dynamicColumns.forEach(function (columnValue, index) {
                                            // Count the occurrences of <br> tags in the columnValue
                                            
                                            if (index > 0) {


                                                var brCount = (columnValue.match(/<br>/g) || []).length;

                                                // Generate the HTML for the cell
                                                var cellHtml;
                                                if (brCount > 0) {
                                                    if (!itstrue) {
                                                        cellHtml = `<td rowspan="${rowCount}" align="center" style="border: 1px solid; color: black;">${columnValue}</td>`;
                                                        itstrue = false;
                                                    } else {
                                                        /*cellHtml = `<td hidden></td>`;*/
                                                        //cellHtml = `<td style="display: none;"></td>`;
                                                        cellHtml = '';
                                                    }
                                                    // If <br> tags are present, set rowspan based on the count of <br> tags


                                                }
                                                else {
                                                    // If no <br> tags, generate a regular cell
                                                    cellHtml = `<td align="center" style="border: 1px solid; color: black;">${columnValue}</td>`;
                                                }

                                                // Append the cell to the table row
                                                // tableRow.append($(cellHtml));

                                                /*if (!loopExecuted) {*/
                                                tableRow.append($(cellHtml));
                                                /* }*/
                                            }
                                        });
                                        loopExecuted = true;
                                        itstrue = true;

                                        //tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 1]));
                                        //tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 2]));
                                        //tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 3]));
                                        //tableRow.append($('<td align="center">').text(dynamicColumns[daysInMonth + 4]));
                                        //tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 5]));
                                        //tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 6]));
                                        //tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 7]));
                                        //tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 8]));
                                        tableBody.append(tableRow);
                                    }
                                }
                                else {
                                    console.log('AttendanceList not found in the response');
                                }
                                //====>>>> Table boy appending code end

                                //====>>> Empty Row create code start

                                var trElement = tableBody.find('tr:first');
                                var tdCount = trElement.find('td').length;
                                var Emptyrow = $('<tr>');
                                Emptyrow.append($('<td style="border: 1px solid; color: black; height: 20px;" colspan="' + tdCount + '">').text(''));
                                tableBody.append(Emptyrow);

                                //====>>> Empty Row create code end

                                //====>>>Total Enrollment Row code start
                                var Stu_wise = response.stu_wise;
                                var currentMonth = Stu_wise && Stu_wise.currentmonth ? Stu_wise.currentmonth : '';
                                $('#Teaching_Days').text(currentMonth);
                                var MonthTotalEnrollment = Stu_wise.m_total;

                                var TeRow = $('<tr>');
                                TeRow.append($('<td  style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Total Enrollment'));
                                for (var i = 1; i <= daysInMonth; i++) {
                                    var mTotalObject = MonthTotalEnrollment;
                                    var attendanceValue = mTotalObject === 0.0 ? '-' : mTotalObject;
                                    TeRow.append($('<td  style="border: 1px solid; font-size: 11px;color: black;">').text(attendanceValue));
                                    tableBody.append(TeRow);
                                }
                                //====>>>Total Enrollment Row code end

                                //====>>>Student Attendance Row code start                  

                                var Stu_Atd_tbl2 = response.stu_Atd_tbl2;
                                var Student_Attendance = Stu_Atd_tbl2;

                                var SaRow = $('<tr>');
                                SaRow.append($('<td  style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Student Attendance'));
                                var StudentAttendancetotalSum = 0;

                                var AsRow = $('<tr>');
                                AsRow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Absent Students'));
                                var AbsentStudentstotalPSum = 0;

                                for (var i = 0; i < Student_Attendance.length; i++) {
                                    var attendanceObject = Student_Attendance[i];
                                    var attendanceValue = attendanceObject.totalAbsentsinDay;
                                    var attendancePs_Value = attendanceObject.totalPresentsinDay;

                                    if (attendanceValue === '0.0') {
                                        attendanceValue = "-";
                                    } else {
                                        StudentAttendancetotalSum += parseFloat(attendanceValue);
                                    }
                                    var tableAsCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').text(attendanceValue);
                                    SaRow.append(tableAsCell);



                                    if (attendancePs_Value === '0.0') {
                                        attendancePs_Value = "-";
                                    } else {
                                        AbsentStudentstotalPSum += parseFloat(attendancePs_Value);
                                    }
                                    var tablepsCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').text(attendancePs_Value);
                                    AsRow.append(tablepsCell);
                                }

                                var totalSumCell = $('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="8">').text(StudentAttendancetotalSum);
                                SaRow.append(totalSumCell);

                                var totalPSumCell = $('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="8">').text(AbsentStudentstotalPSum);
                                AsRow.append(totalPSumCell);

                                tableBody.append(SaRow);
                                tableBody.append(AsRow);
                                //====>>>Student Attendance Row code end

                                //===>>>Total Enrollment SC Row create code start
                                var TotalEnrollmentSCtr = response.st_tbl4_cl;
                                var TESCtr = $('<tr>');
                                TESCtr.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Total Enrollment SC'));
                                for (var k = 0; k < daysInMonth; k++) {
                                    var mt_Object = TotalEnrollmentSCtr.m_total;
                                    var Mt_Value = mt_Object === '0' ? '-' : mt_Object;
                                    var Mt_tableCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').attr('align', 'center').text(Mt_Value);
                                    TESCtr.append(Mt_tableCell);
                                }
                                tableBody.append(TESCtr);
                                //===>>>Total Enrollment SC Row create code end

                                //===>>>Attendance SC
                                var Attendancescrow = $('<tr>');
                                Attendancescrow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Attendance SC'));

                                for (var k = 0; k < daysInMonth; k++) {
                                    var mt_Objects = TotalEnrollmentSCtr.m_total;
                                    var Mt_Values = mt_Objects === '0' ? '-' : mt_Objects;
                                    var Mt_tableCells = $('<td style="border: 1px solid; font-size: 11px;color: black;">').attr('align', 'center').text(Mt_Values);
                                    Attendancescrow.append(Mt_tableCells);
                                }
                                tableBody.append(Attendancescrow);

                                //===>>>Attendance SC
                                debugger;
                                //===>>>Total Enrollment OBC
                                var T6_tabletr = response.st_tbl6_cl;
                                var T6_tableRow = $('<tr>');
                                T6_tableRow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Total Enrollment OBC'));
                                for (var a = 0; a < daysInMonth; a++) {
                                    var tr_Object = T6_tabletr.m_total;
                                    var tr6_Value = tr_Object === '0' ? '-' : tr_Object;
                                    var tr_tableCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').attr('align', 'center').text(tr6_Value);
                                    T6_tableRow.append(tr_tableCell);
                                }
                                tableBody.append(T6_tableRow);
                                //===>>>Total Enrollment OBC

                                //===>>>Attendance OBC
                                var T6_trOBC = response.st_tbl6_cl;
                                var T6_tableRowOBC = $('<tr>');
                                T6_tableRowOBC.append($('<td style="border: 1px solid; font-size: 11px;color: black;"colspan="9">').text('Attendance OBC'));
                                for (var b = 0; b < daysInMonth; b++) {
                                    var tr_Object = T6_trOBC.m_total;
                                    var tr6_Value = tr_Object === '0' ? '-' : tr_Object;
                                    var tr_tableCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').attr('align', 'center').text(tr6_Value);
                                    T6_tableRowOBC.append(tr_tableCell);
                                }
                                tableBody.append(T6_tableRowOBC);
                                //===>>>Attendance OBC

                                //===>>>Total Enrollment ST
                                var T8_M_tr = response.st_tbl8_cl;
                                var T8_tableRow = $('<tr>');
                                T8_tableRow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Total Enrollment ST'));
                                debugger;
                                for (var b = 0; b < daysInMonth; b++) {
                                    var trm_Object = T8_M_tr.m_total;
                                    var trm_Value = trm_Object === '0' ? '-' : trm_Object;
                                    var trm_tableCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').attr('align', 'center').text(trm_Value);
                                    T8_tableRow.append(trm_tableCell);
                                }
                                tableBody.append(T8_tableRow);
                                //===>>>Total Enrollment ST

                                //===>>>Attendance ST
                                var Attendancest_M_tr = response.tE_Muslims_cl;
                                var AttendanceSTRow = $('<tr>');
                                AttendanceSTRow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Attendance ST'));
                                for (var b = 0; b < daysInMonth; b++) {
                                    var trm_Object = T8_M_tr.m_total;
                                    var trm_Value = trm_Object === '0' ? '-' : trm_Object;
                                    var trm_tableCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').attr('align', 'center').text(trm_Value);
                                    AttendanceSTRow.append(trm_tableCell);
                                }
                                tableBody.append(AttendanceSTRow);




                                var Stu_Abs_tbl = response.m_Stuabs;
                                var M_StuAbs = Stu_Abs_tbl;

                                var M_tableAbsRow = $('<tr>');
                                M_tableAbsRow.append($('<td style="border: 1px solid; font-size: 11px;color: black;"colspan="9">').text('Student Attendance Muslims'));
                                var M_abstotalSum = 0;

                                for (var i = 0; i < M_StuAbs.length; i++) {
                                    var attendanceObject = M_StuAbs[i];
                                    var M_attendanceValue = attendanceObject.totalPresentsinDay;
                                    var M_atteValue = M_attendanceValue === '0.0' ? '-' : M_attendanceValue;

                                    if (M_abstotalSum === '0') {
                                        M_abstotalSum = "-";
                                    } else {
                                        M_abstotalSum += parseFloat(M_attendanceValue);
                                    }

                                    var M_abstableAsCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').text(M_atteValue);
                                    M_tableAbsRow.append(M_abstableAsCell);
                                }
                                var M_abstotalSumCell = $('<td style="border: 1px solid; font-size: 11px;color: black;"colspan="8">').text(M_abstotalSum);
                                M_tableAbsRow.append(M_abstotalSumCell);

                                tableBody.append(M_tableAbsRow);



                                //===>>>Attendance ST

                                //===>>>Total Enrollment Muslims
                                var TE_M_tr = response.tE_Muslims_cl;
                                var M_tableRow = $('<tr>');
                                M_tableRow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Total Enrollment Muslims'));

                                for (var c = 0; c < 30; c++) {
                                    var m_Object = TE_M_tr.m_total;
                                    var M_Value = m_Object === '0' ? '-' : m_Object;
                                    var M_tableCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').attr('align', 'center').text(M_Value);
                                    M_tableRow.append(M_tableCell);
                                }
                                tableBody.append(M_tableRow);
                                //===>>>Total Enrollment Muslims

                                //===>>Student Attendance Muslims
                                var Stu_Abs_tbl = response.m_Stuabs;
                                var M_StuAbs = Stu_Abs_tbl;

                                var M_tableAbsRow = $('<tr>');
                                M_tableAbsRow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="9">').text('Student Attendance Muslims'));
                                var M_abstotalSum = 0;

                                for (var i = 0; i < M_StuAbs.length; i++) {
                                    var attendanceObject = M_StuAbs[i];
                                    var M_attendanceValue = attendanceObject.totalPresentsinDay;
                                    var M_atteValue = M_attendanceValue === '0.0' ? '-' : M_attendanceValue;

                                    if (M_abstotalSum === '0') {
                                        M_abstotalSum = "-";
                                    } else {
                                        M_abstotalSum += parseFloat(M_attendanceValue);
                                    }

                                    var M_abstableAsCell = $('<td style="border: 1px solid; font-size: 11px;color: black;">').text(M_atteValue);
                                    M_tableAbsRow.append(M_abstableAsCell);
                                }
                                var M_abstotalSumCell = $('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="8">').css('font-size', '11px').text(M_abstotalSum);
                                M_tableAbsRow.append(M_abstotalSumCell);

                                tableBody.append(M_tableAbsRow);
                                //===>>Student Attendance Muslims

                                //====>>> Last Empty Row create code start                                      
                                var LastEmptyrow = $('<tr>');
                                LastEmptyrow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="' + tdCount + '">').text(''));
                                tableBody.append(LastEmptyrow);
                                //====>>> Last Empty Row create code end

                                //====>>> Signature of Teacher Row create code start
                                var SignatureofTeacherrow = $('<tr>');
                                SignatureofTeacherrow.append($('<td style="border: 1px solid; font-size: 11px;color: black;" colspan="' + tdCount + '">').text('Signature of Teacher'));
                                tableBody.append(SignatureofTeacherrow);
                                //====>>> Signature of Teacher Row create code end  




                                //====>>>>>Average Attendacne for the month Code start                    
                                var tblbody = $('#AvgTblbody');
                                tblbody.empty();
                                var attendanceAverage = response.attendanceAverage;
                                var tableRow = $('<tr>');
                                var tablerows = $('<tr>');
                                var tblerow = $('<tr>');
                                var trow = $('<tr>');
                                var tberows = $('<tr>');
                                var tlerows = $('<tr>');
                                tableRow.append($('<td style="border: 1px solid; color: black;">').text('allAvg'));
                                tableRow.append($('<td style="border: 1px solid; color: black;">').text(attendanceAverage.allAvg));
                                tablerows.append($('<td style="border: 1px solid; color: black;">').text('sc'));
                                tablerows.append($('<td style="border: 1px solid; color: black;">').text(attendanceAverage.sc));
                                tblerow.append($('<td style="border: 1px solid; color: black;">').text('st'));
                                tblerow.append($('<td style="border: 1px solid; color: black;">').text(attendanceAverage.st));
                                trow.append($('<td style="border: 1px solid; color: black;">').text('obc'));
                                trow.append($('<td style="border: 1px solid; color: black;">').text(attendanceAverage.obc));
                                tberows.append($('<td style="border: 1px solid; color: black;">').text('muslim'));
                                tberows.append($('<td style="border: 1px solid; color: black;">').text(attendanceAverage.muslim));
                                tlerows.append($('<td style="border: 1px solid; color: black;">').text('girls'));
                                tlerows.append($('<td style="border: 1px solid; color: black;">').text(attendanceAverage.girls));
                                tblbody.append(tableRow)
                                tblbody.append(tablerows)
                                tblbody.append(tblerow)
                                tblbody.append(trow)
                                tblbody.append(tberows)
                                tblbody.append(tlerows)
                                //====>>>>>Average Attendacne for the month Code end

                                ////var signatureDiv = $('<div>', {
                                ////    style: 'margin-left: 60%; position: absolute; margin-top: -12%;',
                                ////    html: '<span>Signature of Teacher________________________</span>'
                                ////});
                                ////$('#Signaturediv').append(signatureDiv);
                                loaddingimg.css('display', 'none');

                            }
                            else {

                                $('#Errormessage').text('Attendance is not Posted for the selected criteria');
                                loaddingimg.css('display', 'none');
                            }
                        }

                    },
                    error: function (error) {
                        loaddingimg.css('display', 'none');
                    }
                });
            }
        }, 50);

    } catch (e) {
        $('#Registertablediv1').hide();
        loaddingimg.css('display', 'none');
        console.error('An error occurred during form submission:', e.message);
    }
});



$('#printButton').on('click', function () {
    var printContents = $('#printDiv').html();
    debugger;
    // Create a new window to print the content
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>');
    printWindow.document.write('thead tr{ border: 1px solid; color: black; }'); // Collapse borders
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<table>');

    // Add table content here
    printWindow.document.write('</table>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close(); // Close the document opened with document.write
    printWindow.print();
});


$(document).on('click', '#exportButton', function () {
    var formattedDate = GetDateFormat();

    debugger;
    var month = document.getElementById("MONTHIDMONTHID").textContent;
    var year = document.getElementById("YEARID").textContent;
    var className = document.getElementById("Cl").textContent;
    var section = document.getElementById("Section").textContent;
    var teachingDays = document.getElementById("Teaching_Days").textContent;
    debugger;
    var Leaverelatedcontent = `<table>
    <tr>
        <td>
            <div>
                <p>NOTE:</p></td>
            </div>
        </td>
    </tr>
    <tr>
        <td>            
            <div>
                <p>P -- Present</p>
                <p>A -- Absent</p>
                <p>OS -- Out of Station</p>
                <p>UW -- Urgent Work</p>
                <p>OL -- Official Leave</p>
            </div>
        </td>
        <td>           
            <div>                
                <p>DA -- Doctor Appointment</p>
                <p>NA -- No Application</p>
                <p>NE -- No Examination</p>
                <p>PL -- Preparatory Leave</p>
                <p>UFR -- Urgent Family Reason</p>
            </div>
        </td>
         <td>
             <div>
                <p>1HP -- First half Present</p>
                <p>2HP -- Second half Present</p>
                <p>IL -- Illness</p>
                <p>O -- Others</p>
             </div>
         </td>         
    </tr>
</table>
`;

    var headerContent = `
            <div style="display: grid; grid-template-columns: repeat(18, 1fr);">
                <div style="grid-column: 1 / span 18;">
                     <h4 style="margin: 0; text-align: center;">Quro Schools</h4>
                     <p style="margin: 0; text-align: center;">Student Attendance Register for the Month of ${month}, ${year}</p>
                     <p style="margin: 0; text-align: center;">Class : ${className} , Section : ${section} , No.Of Teaching Days : ${teachingDays}</p>
                </div>
            </div>`;

    var table1 = document.getElementById("Attendancereporttbl");
    var table2 = document.getElementById("Avaragetbl");
    var table1Clone = table1.cloneNode(true);
    var table2Clone = table2.cloneNode(true);

    var cells = table1.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        debugger;
        if (cells[i].style.display === "none"){ // Check if the td element has the hidden attribute       
            debugger;
            cells[i].remove();        

        } else {
            // Process the visible cell
            cells[i].style.width = "100px"; // Set the width for all cells
        }        
    }

    var cells2 = table2.getElementsByTagName("td");
    for (var j = 0; j < cells2.length; j++) {
        if (cells2[j].hasAttribute("hidden")) {
            cells2[j].parentNode.removeChild(cells2[j]); // Remove hidden cells
        } else {
            cells2[j].style.width = "100px"; // Set width for visible cells
        }
    }
    var FooterContent = `
      <div style="grid-column: 1 / span 18; background-color: #e0e0e0; padding: 20px; border-radius: 5px;">
        <p style="margin: 0; text-align: center;">This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized use, copying, or distribution of this report is strictly prohibited.</p>
      </div>
      `;
   
    var combinedHtml = Leaverelatedcontent + headerContent + table1Clone.outerHTML + table2Clone.outerHTML + FooterContent;

    const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
    saveAs(blob, 'MonthWiseFullStatusofClassAttendanceReport.xls');
    table1.parentNode.replaceChild(table1Clone, table1);
    table2.parentNode.replaceChild(table2Clone, table2);
});