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
            //var month_Value = $("#Month option:selected").text();
            //var year_value = $("#Year").val();
            var month = $("#Monthddl option:selected").text();
            var monthID = $("#Monthddl").val();
            var year = $("#Yearddl").val();
            var InstanceClassificationId = $("#Ddldepartment").val();
            var SubClass = $("#DdlSubClass").val();
            var department = $("#Ddldepartment option:selected").text();
            var className = $("#DdlSubClass option:selected").text();

           // var formData = $('#Attendanceregisterreportform').serialize();
           
            
            $.ajax({
                url: "/Reports/StudentAttendanceRegister?Month=" + monthID + "&Year=" + year + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + SubClass, // Replace with your actual endpoint URL
                type: "POST",
                //data: formData,
                success: function (response) {
                    $("#Registertablediv1").show();
                    $("#MONTHIDMONTHID").text(month);
                    $("#YEARID").text(year);
                    $("#Section").text(className);
                    $("#Cl").text(department);

                    //New Tabledata
                    var tblhead = $('#tblhead');
                    var tableBody = $('#tblBody');
                    var tablefooter = $('#tblfooter');


                    debugger;
                    var returnmessage = response.retunmessage;
                    if (returnmessage != "0") {

                    

                    ////this codeeee
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
                            $('<td style="border: 1px solid;">').text(i + 1).prependTo(tableRow);
                            tableRow.append($('<td style="border: 1px solid;">').text(item.name));
                            tableRow.append($('<td style="border: 1px solid;" align="center">').text(item.gender));
                            tableRow.append($('<td style="border: 1px solid;">').text(item.dob));
                            tableRow.append($('<td style="border: 1px solid;" align="center">').text(item.religionName));
                            tableRow.append($('<td style="border: 1px solid;" align="center">').text(item.castName));
                            tableRow.append($('<td style="border: 1px solid;" align="center">').text(item.ews));
                            tableRow.append($('<td style="border: 1px solid;" align="center">').text(item.repeater));
                            tableRow.append($('<td style="border: 1px solid;" align="center">').text(item.dropout));

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
                                debugger;
                                if (index > 0) {


                                    var brCount = (columnValue.match(/<br>/g) || []).length;

                                    // Generate the HTML for the cell
                                    var cellHtml;
                                    if (brCount > 0) {
                                        if (!itstrue) {
                                            cellHtml = `<td rowspan="${rowCount}" align="center" style="border: 1px solid black;">${columnValue}</td>`;
                                            itstrue = false;
                                        } else {
                                            cellHtml = `<td hidden ></td>`;
                                        }
                                        // If <br> tags are present, set rowspan based on the count of <br> tags


                                    }
                                    else {
                                        // If no <br> tags, generate a regular cell
                                        cellHtml = `<td align="center" style="border: 1px solid black;">${columnValue}</td>`;
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
                    Emptyrow.append($('<td style="border: 1px solid black;" colspan="' + tdCount + '">').text(''));
                    tableBody.append(Emptyrow);

                    //====>>> Empty Row create code end

                    //====>>>Total Enrollment Row code start
                    var Stu_wise = response.stu_wise;
                    var currentMonth = Stu_wise && Stu_wise.currentmonth ? Stu_wise.currentmonth : '';
                    $('#Teaching_Days').text(currentMonth);
                    var MonthTotalEnrollment = Stu_wise.m_total;

                    var TeRow = $('<tr>');
                    TeRow.append($('<td  style="border: 1px solid;" colspan="9">').text('Total Enrollment'));
                    for (var i = 1; i <= daysInMonth; i++) {
                        var mTotalObject = MonthTotalEnrollment;
                        var attendanceValue = mTotalObject === 0.0 ? '-' : mTotalObject;
                        TeRow.append($('<td  style="border: 1px solid; font-size: 11px;">').text(attendanceValue));
                        tableBody.append(TeRow);
                    }
                    //====>>>Total Enrollment Row code end

                    //====>>>Student Attendance Row code start                  

                    var Stu_Atd_tbl2 = response.stu_Atd_tbl2;
                    var Student_Attendance = Stu_Atd_tbl2;

                    var SaRow = $('<tr>');
                    SaRow.append($('<td  style="border: 1px solid;" colspan="9">').text('Student Attendance'));
                    var StudentAttendancetotalSum = 0;

                    var AsRow = $('<tr>');
                    AsRow.append($('<td style="border: 1px solid;" colspan="9">').text('Absent Students'));
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
                        var tableAsCell = $('<td style="border: 1px solid;font-size: 11px;">').text(attendanceValue);
                        SaRow.append(tableAsCell);



                        if (attendancePs_Value === '0.0') {
                            attendancePs_Value = "-";
                        } else {
                            AbsentStudentstotalPSum += parseFloat(attendancePs_Value);
                        }
                        var tablepsCell = $('<td style="border: 1px solid;font-size: 11px;">').text(attendancePs_Value);
                        AsRow.append(tablepsCell);
                    }

                    var totalSumCell = $('<td style="border: 1px solid;font-size: 11px;" colspan="8">').text(StudentAttendancetotalSum);
                    SaRow.append(totalSumCell);

                    var totalPSumCell = $('<td style="border: 1px solid;font-size: 11px;" colspan="8">').text(AbsentStudentstotalPSum);
                    AsRow.append(totalPSumCell);

                    tableBody.append(SaRow);
                    tableBody.append(AsRow);
                    //====>>>Student Attendance Row code end

                    //===>>>Total Enrollment SC Row create code start
                    var TotalEnrollmentSCtr = response.st_tbl4_cl;
                    var TESCtr = $('<tr>');
                    TESCtr.append($('<td style="border: 1px solid;" colspan="9">').text('Total Enrollment SC'));
                    for (var k = 0; k < daysInMonth; k++) {
                        var mt_Object = TotalEnrollmentSCtr.m_total;
                        var Mt_Value = mt_Object === '0' ? '-' : mt_Object;
                        var Mt_tableCell = $('<td style="border: 1px solid; font-size: 11px;">').attr('align', 'center').text(Mt_Value);
                        TESCtr.append(Mt_tableCell);
                    }
                    tableBody.append(TESCtr);
                    //===>>>Total Enrollment SC Row create code end

                    //===>>>Attendance SC
                    var Attendancescrow = $('<tr>');
                    Attendancescrow.append($('<td style="border: 1px solid;" colspan="9">').text('Attendance SC'));

                    for (var k = 0; k < daysInMonth; k++) {
                        var mt_Objects = TotalEnrollmentSCtr.m_total;
                        var Mt_Values = mt_Objects === '0' ? '-' : mt_Objects;
                        var Mt_tableCells = $('<td style="border: 1px solid; font-size: 11px;">').attr('align', 'center').text(Mt_Values);
                        Attendancescrow.append(Mt_tableCells);
                    }
                    tableBody.append(Attendancescrow);

                    //===>>>Attendance SC
                    debugger;
                    //===>>>Total Enrollment OBC
                    var T6_tabletr = response.st_tbl6_cl;
                    var T6_tableRow = $('<tr>');
                    T6_tableRow.append($('<td style="border: 1px solid;" colspan="9">').text('Total Enrollment OBC'));
                    for (var a = 0; a < daysInMonth; a++) {
                        var tr_Object = T6_tabletr.m_total;
                        var tr6_Value = tr_Object === '0' ? '-' : tr_Object;
                        var tr_tableCell = $('<td style=" border: 1px solid;font-size: 11px;">').attr('align', 'center').text(tr6_Value);
                        T6_tableRow.append(tr_tableCell);
                    }
                    tableBody.append(T6_tableRow);
                    //===>>>Total Enrollment OBC

                    //===>>>Attendance OBC
                    var T6_trOBC = response.st_tbl6_cl;
                    var T6_tableRowOBC = $('<tr>');
                    T6_tableRowOBC.append($('<td style="border: 1px solid;"colspan="9">').text('Attendance OBC'));
                    for (var b = 0; b < daysInMonth; b++) {
                        var tr_Object = T6_trOBC.m_total;
                        var tr6_Value = tr_Object === '0' ? '-' : tr_Object;
                        var tr_tableCell = $('<td style=" border: 1px solid;font-size: 11px;">').attr('align', 'center').text(tr6_Value);
                        T6_tableRowOBC.append(tr_tableCell);
                    }
                    tableBody.append(T6_tableRowOBC);
                    //===>>>Attendance OBC

                    //===>>>Total Enrollment ST
                    var T8_M_tr = response.st_tbl8_cl;
                    var T8_tableRow = $('<tr>');
                    T8_tableRow.append($('<td style="border: 1px solid;" colspan="9">').text('Total Enrollment ST'));

                    for (var b = 0; b < 30; b++) {
                        var trm_Object = T8_M_tr.m_total;
                        var trm_Value = trm_Object === '0' ? '-' : trm_Object;
                        var trm_tableCell = $('<td style="border: 1px solid;font-size: 11px;">').attr('align', 'center').text(trm_Value);
                        T8_tableRow.append(trm_tableCell);
                    }
                    tableBody.append(T8_tableRow);
                    //===>>>Total Enrollment ST

                    //===>>>Attendance ST
                    var Attendancest_M_tr = response.tE_Muslims_cl;
                    var AttendanceSTRow = $('<tr>');
                    AttendanceSTRow.append($('<td style="border: 1px solid;" colspan="9">').text('Attendance ST'));
                    tableBody.append(AttendanceSTRow);
                    var Stu_Abs_tbl = response.m_Stuabs;
                    var M_StuAbs = Stu_Abs_tbl;

                    var M_tableAbsRow = $('<tr>');
                    M_tableAbsRow.append($('<td style="border: 1px solid;"colspan="9">').text('Student Attendance Muslims'));
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

                        var M_abstableAsCell = $('<td style="border: 1px solid;font-size: 11px;">').text(M_atteValue);
                        M_tableAbsRow.append(M_abstableAsCell);
                    }
                    var M_abstotalSumCell = $('<td style="border: 1px solid;font-size: 11px;"colspan="8">').text(M_abstotalSum);
                    M_tableAbsRow.append(M_abstotalSumCell);

                    tableBody.append(M_tableAbsRow);



                    //===>>>Attendance ST

                    //===>>>Total Enrollment Muslims
                    var TE_M_tr = response.tE_Muslims_cl;
                    var M_tableRow = $('<tr>');
                    M_tableRow.append($('<td style="border: 1px solid black;" colspan="9">').text('Total Enrollment Muslims'));

                    for (var c = 0; c < 30; c++) {
                        var m_Object = TE_M_tr.m_total;
                        var M_Value = m_Object === '0' ? '-' : m_Object;
                        var M_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(M_Value);
                        M_tableRow.append(M_tableCell);
                    }
                    tableBody.append(M_tableRow);
                    //===>>>Total Enrollment Muslims

                    //===>>Student Attendance Muslims
                    var Stu_Abs_tbl = response.m_Stuabs;
                    var M_StuAbs = Stu_Abs_tbl;

                    var M_tableAbsRow = $('<tr>');
                    M_tableAbsRow.append($('<td style="border: 1px solid black;" colspan="9">').text('Student Attendance Muslims'));
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

                        var M_abstableAsCell = $('<td style="font-size: 11px;">').text(M_atteValue);
                        M_tableAbsRow.append(M_abstableAsCell);
                    }
                    var M_abstotalSumCell = $('<td style="border: 1px solid black;" colspan="8">').css('font-size', '11px').text(M_abstotalSum);
                    M_tableAbsRow.append(M_abstotalSumCell);

                    tableBody.append(M_tableAbsRow);
                    //===>>Student Attendance Muslims

                    //====>>> Last Empty Row create code start                                      
                    var LastEmptyrow = $('<tr>');
                    LastEmptyrow.append($('<td style="border: 1px solid black;" colspan="' + tdCount + '">').text(''));
                    tableBody.append(LastEmptyrow);
                    //====>>> Last Empty Row create code end

                    //====>>> Signature of Teacher Row create code start
                    var SignatureofTeacherrow = $('<tr>');
                    SignatureofTeacherrow.append($('<td style="border: 1px solid black;" colspan="' + tdCount + '">').text('Signature of Teacher'));
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
                    tableRow.append($('<td style="border: 1px solid black;">').text('allAvg'));
                    tableRow.append($('<td style="border: 1px solid black;">').text(attendanceAverage.allAvg));
                    tablerows.append($('<td style="border: 1px solid black;">').text('sc'));
                    tablerows.append($('<td style="border: 1px solid black;">').text(attendanceAverage.sc));
                    tblerow.append($('<td style="border: 1px solid black;">').text('st'));
                    tblerow.append($('<td style="border: 1px solid black;">').text(attendanceAverage.st));
                    trow.append($('<td style="border: 1px solid black;">').text('obc'));
                    trow.append($('<td style="border: 1px solid black;">').text(attendanceAverage.obc));
                    tberows.append($('<td style="border: 1px solid black;">').text('muslim'));
                    tberows.append($('<td style="border: 1px solid black;">').text(attendanceAverage.muslim));
                    tlerows.append($('<td style="border: 1px solid black;">').text('girls'));
                    tlerows.append($('<td style="border: 1px solid black;">').text(attendanceAverage.girls));
                    tblbody.append(tableRow)
                    tblbody.append(tablerows)
                    tblbody.append(tblerow)
                    tblbody.append(trow)
                    tblbody.append(tberows)
                    tblbody.append(tlerows)
                    //====>>>>>Average Attendacne for the month Code end

                    var signatureDiv = $('<div>', {
                        style: 'margin-left: 60%; position: absolute; margin-top: -12%;',
                        html: '<span>Signature of Teacher________________________</span>'
                    });
                    $('#Signaturediv').append(signatureDiv);
                    loaddingimg.css('display', 'none');

                    } else {

                        $('#Errormessage').text('Attendance is not Posted for the selected criteria');
                    loaddingimg.css('display', 'none');
                }
                    
                },
                error: function (error) {
                    loaddingimg.css('display', 'none');
                }
            });
        }
    }, 50);
});



/*-- ** STUDENT ATTENDANCE REPORT CODE END  ** --*/






//$("#Str_DP_ID").change(fun151);
///*debugger;*/
//function fun151() {
//    /*debugger;*/
//    var value = $('#Str_Cfn_Id').val();
//    /*alert(value);*/
//    $.ajax({
//        url: "/Attendance/Get_SubClassificationNames_ByInstanceClassifications?InstanceClassificationId=" + value,
//        type: "GET",
//        success: fun160
//    });
//    function fun160(response) {
//        /*debugger;*/
//        $("#Str_INS_DD").html(response);
//    }

//}



$(document).ready(function () {
    /* $("#register_ViewId").hide();*/


    /*debugger;*/




    $("#myForm_").submit(function (event) {
        event.preventDefault();

        validateForm();
        /* debugger;*/
        var month_Value = $("#Month option:selected").text();
        var year_value = $("#Year").val();
        var department = $("#Str_Cfn_Id option:selected").text();
        var className = $("#Str_INS_DD option:selected").text();

        /*alert(month, year);*/
        // Set the text content of the element IDs
        $("#MONTHIDMONTHID").text(month_Value);
        $("#YEARID").text(year_value);
        $("#Section").text(className);
        $("#Cl").text(department);

        $("#register_ViewId").show();


        var formData = $(this).serialize();

        /*debugger;*/

        $.ajax({
            url: "/Reports/StudentAttendanceRegister", // Replace with your actual endpoint URL
            type: "POST",
            data: formData,
            success: function (response) {


                /* $('#tablefooter').empty();*/


                $('#tablefooter').empty();
                $('#Student_Absentes').empty();
                $('#tablehead').empty();
                $('#tableBody').empty();
                $('#AvgTblbody').empty();


                //Mk Last try start


                var tableFooterRows = []; // Array to store the table footer rows

                // Empty row
                var emptyRow = $('<tr>');
                var emptyCell = $('<td colspan="46">').html('&nbsp;');
                emptyRow.append(emptyCell);
                tableFooterRows.push(emptyRow);

                //'No-Of Teaching Days Table data
                var Stu_wise = response.stu_wise;
                var currentMonth = Stu_wise && Stu_wise.currentmonth ? Stu_wise.currentmonth : '';

                $('#Teaching_Days').text(currentMonth);
                var mTotal = Stu_wise.m_total;

                var firstCell = $('<td colspan="9" style="font-size: 11px;">').text('Total Enrollment');
                var tableFooterRow = $('<tr>').append(firstCell);

                for (var i = 0; i < 30; i++) {
                    var mTotalObject = mTotal;
                    var attendanceValue = mTotalObject === 0.0 ? '-' : mTotalObject;
                    var tableCell = $('<td style="font-size: 11px;">').text(attendanceValue);
                    tableFooterRow.append(tableCell);
                }

                tableFooterRows.push(tableFooterRow);



                // Student Attendance and Absent Students rows
                var Stu_Atd_tbl2 = response.stu_Atd_tbl2;
                var Student_Attendance = Stu_Atd_tbl2;
                var S_tblbody = $('#Student_Absentes');

                var S_firstCell = $('<td colspan="9" style="font-size: 11px;">').text('Student Attendance');
                var S_tableFooterRow = $('<tr>').append(S_firstCell);
                var totalSum = 0;

                var S_secoundCell = $('<td colspan="9" style="font-size: 11px;">').text('Absent Students');
                var S_tableSFooterRow = $('<tr>').append(S_secoundCell);
                var totalPSum = 0;

                for (var i = 0; i < Student_Attendance.length; i++) {
                    var attendanceObject = Student_Attendance[i];
                    var attendanceValue = attendanceObject.totalAbsentsinDay;
                    var attendancePs_Value = attendanceObject.totalPresentsinDay;

                    if (attendanceValue === '0.0') {
                        attendanceValue = "-";
                    } else {
                        totalSum += parseFloat(attendanceValue);
                    }

                    var tableAsCell = $('<td style="font-size: 11px;">').text(attendanceValue);
                    S_tableFooterRow.append(tableAsCell);

                    if (attendancePs_Value === '0.0') {
                        attendancePs_Value = "-";
                    } else {
                        totalPSum += parseFloat(attendancePs_Value);
                    }
                    var tablepsCell = $('<td style="font-size: 11px;">').text(attendancePs_Value);
                    S_tableSFooterRow.append(tablepsCell);
                }

                var totalSumCell = $('<td colspan="8">').css('font-size', '11px').text(totalSum);
                S_tableFooterRow.append(totalSumCell);

                var totalPSumCell = $('<td colspan="8">').css('font-size', '11px').text(totalPSum);
                S_tableSFooterRow.append(totalPSumCell);

                tableFooterRows.push(S_tableFooterRow);
                tableFooterRows.push(S_tableSFooterRow);

                //Table4
                // Total Enrollment Muslims row
                debugger;
                var Table4_tr = response.st_tbl4_cl;
                var T4_Trcell = $('<td colspan="9" style="font-size: 11px;">').text('Total Enrollment SC');
                var T4_tableFooterRow = $('<tr>').append(T4_Trcell);

                for (var k = 0; k < 30; k++) {
                    var mt_Object = Table4_tr.m_total;
                    var Mt_Value = mt_Object === '0' ? '-' : mt_Object;
                    var Mt_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(Mt_Value);
                    T4_tableFooterRow.append(Mt_tableCell);
                }

                tableFooterRows.push(T4_tableFooterRow);

                //Table6
                // Total Enrollment Muslims row
                var T6_tr = response.st_tbl6_cl;
                var t6_Trcell = $('<td colspan="9" style="font-size: 11px;">').text('Total Enrollment OBC');
                var T6_tableFooterRow = $('<tr>').append(t6_Trcell);

                for (var a = 0; a < 30; a++) {
                    var tr_Object = T6_tr.m_total;
                    var tr6_Value = tr_Object === '0' ? '-' : tr_Object;
                    var tr_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(tr6_Value);
                    T6_tableFooterRow.append(tr_tableCell);
                }

                tableFooterRows.push(T6_tableFooterRow);

                //Table8
                // Total Enrollment Muslims row
                var T8_M_tr = response.st_tbl8_cl;
                var trm_Trcell = $('<td colspan="9" style="font-size: 11px;">').text('Total Enrollment ST');
                var T8_tableFooterRow = $('<tr>').append(trm_Trcell);

                for (var b = 0; b < 30; b++) {
                    var trm_Object = T8_M_tr.m_total;
                    var trm_Value = trm_Object === '0' ? '-' : trm_Object;
                    var trm_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(trm_Value);
                    T8_tableFooterRow.append(trm_tableCell);
                }

                tableFooterRows.push(T8_tableFooterRow);


                // Total Enrollment Muslims row
                var TE_M_tr = response.tE_Muslims_cl;
                var M_Trcell = $('<td colspan="9" style="font-size: 11px;">').text('Total Enrollment Muslims');
                var M_tableFooterRow = $('<tr>').append(M_Trcell);

                for (var c = 0; c < 30; c++) {
                    var m_Object = TE_M_tr.m_total;
                    var M_Value = m_Object === '0' ? '-' : m_Object;
                    var M_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(M_Value);
                    M_tableFooterRow.append(M_tableCell);
                }

                tableFooterRows.push(M_tableFooterRow);



                //Student Attendance Muslims row 
                var Stu_Abs_tbl = response.m_Stuabs;
                var M_StuAbs = Stu_Abs_tbl;

                var M_AbsCell = $('<td colspan="9" style="font-size: 11px;">').text('Student Attendance');
                var M_tableAbsFooterRow = $('<tr>').append(M_AbsCell);
                var M_abstotalSum = 0;

                for (var i = 0; i < M_StuAbs.length; i++) {
                    var attendanceObject = M_StuAbs[i];
                    var M_attendanceValue = attendanceObject.totalPresentsinDay;
                    var M_atteValue = M_attendanceValue === '0.0' ? '-' : M_attendanceValue;
                    //var attendancePs_Value = attendanceObject.totalPresentsinDay;

                    if (M_abstotalSum === '0') {
                        M_abstotalSum = "-";
                    } else {
                        M_abstotalSum += parseFloat(M_attendanceValue);
                    }

                    var M_abstableAsCell = $('<td style="font-size: 11px;">').text(M_atteValue);
                    M_tableAbsFooterRow.append(M_abstableAsCell);
                }
                var M_abstotalSumCell = $('<td colspan="8">').css('font-size', '11px').text(M_abstotalSum);
                M_tableAbsFooterRow.append(M_abstotalSumCell);

                tableFooterRows.push(M_tableAbsFooterRow);




                // Append the table footer rows to the table footer element
                var tblfooter = $('#tablefooter');
                tblfooter.empty();
                tblfooter.append(tableFooterRows);

                // Append the table footer element to the table
                $('#myTable').append(tblfooter);


































                /*debugger;*/
                // Create thead element
                var thead = $('<thead>').addClass('border-0');
                var tblhead = $('#tablehead');

                //Month wise dates code start
                var month = $("#Month option:selected").text();
                var year = $("#Year").val();

                // Convert month text to month index (0-11)
                var monthIndex = new Date(Date.parse(month + " 1, " + year)).getMonth();

                // Determine the number of days based on the month and year
                var daysInMonth;
                if (monthIndex === 1) { // February
                    daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                } else {
                    daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
                }


                // Create the first row of the table header
                var firstRow = $('<tr>');
                firstRow.append($('<td>').attr('rowspan', '2').attr('align', 'center').html('&nbsp; S.No.&nbsp;'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Name of Student'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Gender'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Date of Birth'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Religion'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Category'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Economically Weaker Section'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Repeater'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Joined Back After dropout thorugh bridge courses'));
                firstRow.append($('<td>').attr('colspan', daysInMonth).attr('align', 'center').text('Day of the month'));
                firstRow.append($('<td>').attr('align', 'center').attr('colspan', '3').text('Present'));
                firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('No of days participated in extracurricular activities'));
                firstRow.append($('<td>').attr('align', 'center').attr('colspan', '2').text('Absent'));
                firstRow.append($('<td>').attr('align', 'center').attr('colspan', '2').text('Attendance%'));




                // Append the table cells for each day of the month
                var secondRow = $('<tr>');
                for (var day = 1; day <= daysInMonth; day++) {
                    secondRow.append($('<td>').attr('align', 'center').attr('style', 'width:8px').text(day));
                }



                // Create the second row of the table header
                //var secondRow = $('<tr>');
                //for (var day = 1; day <= 30; day++) {
                //    secondRow.append($('<td>').attr('align', 'center').attr('style', 'width:8px').text(day));
                //}

                secondRow.append($('<td>').attr('align', 'center').text('Sep'));
                secondRow.append($('<td>').attr('align', 'center').text('Carry Fwd'));
                secondRow.append($('<td>').attr('align', 'center').text('Total'));
                secondRow.append($('<td>').attr('align', 'center').text('Sep'));
                secondRow.append($('<td>').attr('align', 'center').text('Total'));
                secondRow.append($('<td>').attr('align', 'center').text('Month'));
                secondRow.append($('<td>').attr('align', 'center').text('Till Date'));

                // Append rows to the thead
                tblhead.append(firstRow);
                tblhead.append(secondRow);

                // Append thead to the table
                $('#myTable').append(tblhead);



                var tableBody = $('#tableBody');
                tableBody.empty();


                //debugger;



                ////// testing code
                if (response.hasOwnProperty('attendanceList')) {

                    var attendanceList = response.attendanceList;




                    var rowCount = response.attendanceList.length;
                    /* alert("rowCount=" + rowCount );*/

                    var areColumnsAppended = false;

                    var rowspanStartRow = -1; // Row index where the rowspan column starts
                    /* debugger;*/




                    /* debugger;*/

                    for (var i = 0; i <= attendanceList.length; i++) {
                        var item = attendanceList[i];

                        if (item && item.dynamicColumns) {
                            var dynamicColumns = item.dynamicColumns;
                            // Rest of your code handling dynamicColumns
                        }
                        // var dynamicColumns = item.dynamicColumns;





                        if (typeof item === 'undefined') {
                            continue; // Skip the iteration if 'item' is undefined
                        }

                        var tableRow = $('<tr>');


                        $('<td>').text(i + 1).prependTo(tableRow);
                        tableRow.append($('<td>').text(item.name));
                        tableRow.append($('<td align="center">').text(item.gender));
                        tableRow.append($('<td>').text(item.dob));
                        tableRow.append($('<td align="center">').text(item.religionName));
                        tableRow.append($('<td align="center">').text(item.castName));
                        tableRow.append($('<td align="center">').text(item.ews));
                        tableRow.append($('<td align="center">').text(item.repeater));
                        tableRow.append($('<td align="center">').text(item.dropout));


                        /* debugger;*/

                        //3rd time

                        /*debugger;*/
                        //  for (var index = 1; index < 31; index++) {
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



                        /*debugger;*/




                        //tableRow.append($('<td>').text(item.sep));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 1]));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 2]));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 3]));
                        tableRow.append($('<td align="center">').text(dynamicColumns[daysInMonth + 4]));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 5]));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 6]));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 7]));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 8]));

                        ////tableRow.append($('<td>').text(item.sep));
                        //tableRow.append($('<td>').text(item.sep));
                        //tableRow.append($('<td>').text(item.carry_Fwd));
                        //tableRow.append($('<td>').text(item.total));
                        //tableRow.append($('<td align="center">').text(item.totaExracuracitivities));
                        //tableRow.append($('<td>').text(item.totalAbsents)); 
                        //tableRow.append($('<td>').text(item.sep_));
                        //tableRow.append($('<td>').text(item.month)); 
                        //tableRow.append($('<td>').text(item.till_Date)); 

                        tableBody.append(tableRow);
                    }
                }
                else {
                    console.log('AttendanceList not found in the response');
                }
                // Remove the extra rows
                $('#myTable').append(tableBody);

                var tblbody = $('#AvgTblbody');
                tblbody.empty();

                var attendanceAverage = response.attendanceAverage;

                var tableRow = $('<tr>');
                var tablerows = $('<tr>');
                var tblerow = $('<tr>');
                var trow = $('<tr>');
                var tberows = $('<tr>');
                var tlerows = $('<tr>');

                tableRow.append($('<td>').text('allAvg'));
                tableRow.append($('<td>').text(attendanceAverage.allAvg));


                tablerows.append($('<td>').text('sc'));
                tablerows.append($('<td>').text(attendanceAverage.sc));

                tblerow.append($('<td>').text('st'));
                tblerow.append($('<td>').text(attendanceAverage.st));

                trow.append($('<td>').text('obc'));
                trow.append($('<td>').text(attendanceAverage.obc));

                tberows.append($('<td>').text('muslim'));
                tberows.append($('<td>').text(attendanceAverage.muslim));

                tlerows.append($('<td>').text('girls'));
                tlerows.append($('<td>').text(attendanceAverage.girls));





                tblbody.append(tableRow)
                tblbody.append(tablerows)
                tblbody.append(tblerow)
                tblbody.append(trow)
                tblbody.append(tberows)
                tblbody.append(tlerows)







            },
            error: function (error) {
                // Handle the error
            }
        });
    });

    function validateForm() {
        /*debugger;*/
        // Retrieve form field values

        var month = document.getElementById("Month").value;
        var year = document.getElementById("Year").value;
        var department = document.getElementById("Str_Cfn_Id").value;
        var className = document.getElementById("Str_INS_DD").value;









        var validationMessage = "";
        var validation2Message = "";
        var hasError = false;

        if (month === "") {

            validationMessage += "Please Select Month.<br>";
            hasError = true;
        }

        if (year === "") {

            validationMessage += "Please Select Year.<br>";
            hasError = true;
        }

        if (department === "") {

            validationMessage += "Please Select Department.<br>";
            hasError = true;
        }
        if (className === "") {
            validationMessage += "Please Select Class.<br>";
            hasError = true;
        }
        if (hasError) {
            validation2Message = "Following fields have invalid data:<br>";
            $("#validationMessage").html(validationMessage);
            $("#validation2").html(validation2Message);
        } else {

            $("#validationMessage").html("");
            $("#validation2").html("");

        }
    }

});






    $('#printButton').on('click', function () {
       var printContents = $('#printDiv').html();
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    });

$(document).on('click', '#exportButton', function () {
    var formattedDate = GetDateFormat();

    debugger;

    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Sheet1');

    // Set titles
    worksheet.addRows([
        ["Student wise attendance Report"],
        ["Quro Schools"],
        ["Report On:  " + formattedDate],
        [""]
    ]).forEach(row => row.font = { bold: true });

    // Set background color for titles and merge cells
    ['A1', 'A2', 'A3', 'A4'].forEach(cell => {
        worksheet.getCell(cell).fill = { type: 'pattern', pattern: 'gray125' };
        worksheet.mergeCells(cell + ':AG' + cell.substring(1));
    });

    // Process StudentwiseattendaceReport table
    debugger;
    var tableData2 = document.getElementById("Attendancereporttbl");
    for (var i = 0; i < tableData2.rows.length; i++) {
        var row = tableData2.rows[i];
        var colIdx = 0;
        for (var j = 0; j < row.cells.length; j++) {
            var cell = row.cells[j];
            var colspan = cell.colSpan || 1;
            var rowspan = cell.rowSpan || 1;

            if (colspan > 1 || rowspan > 1) {
                worksheet.mergeCells(
                    i + 1,
                    colIdx + 1,
                    i + rowspan,
                    colIdx + colspan
                );

                // Set empty values to the rest of the merged area to avoid duplication
                for (var k = i + 1; k < i + rowspan; k++) {
                    for (var l = colIdx + 1; l < colIdx + colspan; l++) {
                        worksheet.getCell(k + 1, l + 1).value = '';
                    }
                }

                colIdx += colspan;
            } else {
                var addedCell = worksheet.getCell(i + 1, colIdx + 1);
                addedCell.value = cell.innerText;
                colIdx++;
            }
        }
    }

    // Set border and width for cells
    for (var col = 3; col <= 34; col++) {
        worksheet.getColumn(col).width = 30; // Set the width as needed
    }
    worksheet.getColumn(1).width = 12;
    worksheet.getColumn(2).width = 20;

    // Generate .xls file and initiate download
    workbook.xlsx.writeBuffer().then(function (buffer) {
        var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        var link = document.createElement("a");

        link.href = URL.createObjectURL(blob);
        link.download = "Attendancereport.xls";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});



//$(document).on('click', '#exportButton', function () {
//    var formattedDate = GetDateFormat();
//    debugger;
//    // Create a new workbook
//    var workbook = new ExcelJS.Workbook();
//    var worksheet = workbook.addWorksheet('Sheet1');

//    // Additional titles
//    worksheet.addRow(["Student  wise attendace Report"]).font = { bold: true };
//    worksheet.addRow(["Quro Schools"]).font = { bold: true };
//    worksheet.addRow(["Report On:  " + formattedDate]).font = { bold: true };
//    worksheet.addRow([""]).font = { bold: false };

//    // Set background color for titles
//    worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'gray125' };
//    worksheet.getCell('A2').fill = { type: 'pattern', pattern: 'gray125' };
//    worksheet.getCell('A3').fill = { type: 'pattern', pattern: 'gray125' };
//    worksheet.getCell('A4').fill = { type: 'pattern', pattern: 'gray125' };
//    worksheet.getCell('A1').font = { size: 14, bold: true, color: { argb: '000000' } }; // Adjust the size as needed
//    worksheet.getCell('A2').font = { size: 14, bold: true, color: { argb: '000000' } };
//    worksheet.getCell('A3').font = { size: 14, bold: true, color: { argb: '000000' } };




//    // Merge cells for titles and center-align
//    worksheet.mergeCells('A1:AG1');
//    worksheet.mergeCells('A2:AG2');
//    worksheet.mergeCells('A3:AG3');
//    worksheet.mergeCells('A4:AG4');

//    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'center' };
//    worksheet.getCell('B2').alignment = { horizontal: 'center', vertical: 'center' };
//    worksheet.getCell('C3').alignment = { horizontal: 'center', vertical: 'center' };




//    //var tableData1 = document.getElementById("FirstTable");
//    var tableData2 = document.getElementById("Attendancereporttbl");
//    //var tableData3 = document.getElementById("StaffLeaveThirdtable");
//    //var tabedata1length = tableData1.rows.length + tableData2.rows.length + 7;
//    // Loop through rows
//    //==============================================  For Table 1

//    worksheet.mergeCells('A5:F5');
//    worksheet.mergeCells('G5:R5');
//    worksheet.mergeCells('S5:AC5');
//    worksheet.mergeCells('AD5:AG5');

//    worksheet.mergeCells('A6:F6');
//    worksheet.mergeCells('G6:R6');
//    worksheet.mergeCells('S6:AC6');
//    worksheet.mergeCells('AD6:AG6');

//    worksheet.mergeCells('A7:F7');
//    worksheet.mergeCells('G7:R7');
//    worksheet.mergeCells('S7:AC7');
//    worksheet.mergeCells('AD7:AG7');

//    //for (var i = 0; i < tableData1.rows.length; i++) {
//    //    // debugger;
//    //    var row = tableData1.rows[i];
//    //    //  var rowData = [];
//    //    // Loop through cells
//    //    // rowData.push("");
//    //    // for (var j = 0; j < row.cells.length; j++) {
//    //    worksheet.getCell('A' + (i + 5)).value = "";
//    //    worksheet.getCell('G' + (i + 5)).value = row.cells[0].innerText;
//    //    worksheet.getCell('S' + (i + 5)).value = row.cells[1].innerText;

//    //    //   rowData.push(row.cells[j].innerText);
//    //    // }


//    //    // var addedRow = worksheet.addRow(rowData);
//    //}

//    const cellsToAlign = ['G5', 'G6', 'G7'];

//    cellsToAlign.forEach(cellAddress => {
//        worksheet.getCell(cellAddress).alignment = { horizontal: 'right', vertical: 'right' };
//        worksheet.getCell(cellAddress).font = { size: 12, bold: true, color: { argb: '000000' } };
//    });

//    worksheet.getCell('G5').border = {
//        top: { style: 'thin', color: { argb: '000000' } },
//        left: { style: 'thin', color: { argb: '000000' } },
//        bottom: { style: 'thin', color: { argb: '000000' } },
//        right: { style: 'thin', color: { argb: '000000' } }
//    };

//    worksheet.getCell('G6').border = {
//        top: { style: 'thin', color: { argb: '000000' } },
//        left: { style: 'thin', color: { argb: '000000' } },
//        bottom: { style: 'thin', color: { argb: '000000' } },
//        right: { style: 'thin', color: { argb: '000000' } }
//    };

//    worksheet.getCell('G7').border = {
//        top: { style: 'thin', color: { argb: '000000' } },
//        left: { style: 'thin', color: { argb: '000000' } },
//        bottom: { style: 'thin', color: { argb: '000000' } },
//        right: { style: 'thin', color: { argb: '000000' } }
//    };
//    worksheet.getCell('S5').border = {
//        top: { style: 'thin', color: { argb: '000000' } },
//        left: { style: 'thin', color: { argb: '000000' } },
//        bottom: { style: 'thin', color: { argb: '000000' } },
//        right: { style: 'thin', color: { argb: '000000' } }
//    };

//    worksheet.getCell('S6').border = {
//        top: { style: 'thin', color: { argb: '000000' } },
//        left: { style: 'thin', color: { argb: '000000' } },
//        bottom: { style: 'thin', color: { argb: '000000' } },
//        right: { style: 'thin', color: { argb: '000000' } }
//    };

//    worksheet.getCell('S7').border = {
//        top: { style: 'thin', color: { argb: '000000' } },
//        left: { style: 'thin', color: { argb: '000000' } },
//        bottom: { style: 'thin', color: { argb: '000000' } },
//        right: { style: 'thin', color: { argb: '000000' } }
//    };





//    worksheet.addRow([""]).font = { bold: false };  ///  gap between two tables
//    worksheet.mergeCells('A8:AG8');

//    //============================         For Table 2

//    for (var i = 0; i < tableData2.rows.length; i++) {
//        debugger;
//        var row = tableData2.rows[i];
//        var rowData = [];
//        for (var j = 0; j < row.cells.length; j++) {

//            var cellHtml = row.cells[j].outerHTML;
//            var backgroundColor = extractBackgroundColor(cellHtml);
//            var color = "000000";
//            if (backgroundColor == "Red") {
//                backgroundColor = "FF0000";
//                color = "ffffff";
//            }
//            else if (backgroundColor == "Green") {
//                backgroundColor = "008000"; color = "ffffff";
//            } else if (backgroundColor == "Blue") {
//                backgroundColor = "0000FF"; color = "ffffff";
//            } else if (backgroundColor == "orange") {
//                backgroundColor = "FFA500"; color = "ffffff";
//            } else if (backgroundColor == "yellow") {
//                backgroundColor = "FFFF00"; color = "ffffff";
//            } else if (backgroundColor == "Gray") {
//                backgroundColor = "808080"; color = "ffffff";
//            }
//            var cellText = row.cells[j].innerText;
//            var cellStyles = {
//                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: backgroundColor } },
//                font: { bold: true, color: { argb: color } } // Assuming white text color
//            };

//            rowData.push({ text: cellText, style: cellStyles });
//        }
//        var addedRow = worksheet.addRow(rowData.map(cell => cell.text));

//        addedRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
//            var cellStyle = rowData[colNumber - 1].style;
//            cell.fill = cellStyle.fill;
//            cell.font = cellStyle.font;
//        });

//        addedRow.eachCell({ includeEmpty: true }, function (cell) {
//            cell.border = {
//                top: { style: 'thin', color: { argb: '000000' } },
//                left: { style: 'thin', color: { argb: '000000' } },
//                bottom: { style: 'thin', color: { argb: '000000' } },
//                right: { style: 'thin', color: { argb: '000000' } }
//            };
//            // cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Text alignment

//        });



//    }



//    worksheet.addRow([""]).font = { bold: false };



//    //============================         For Table 3

//    //for (var i = 0; i < tableData3.rows.length; i++) {
//    //    debugger;
//    //    //  worksheet.mergeCells('A' + tabedata1length + ':C' + tabedata1length);
//    //    // worksheet.getCell('A' + tabedata1length).alignment = { horizontal: 'center', vertical: 'center' };
//    //    var row = tableData3.rows[i];
//    //    var rowData = [];
//    //    for (var j = 0; j < row.cells.length; j++) {
//    //        var cellHtml = row.cells[j].outerHTML;
//    //        var backgroundColor = extractBackgroundColor(cellHtml);
//    //        if (backgroundColor == "Red") {
//    //            backgroundColor = "FF0000";
//    //        }
//    //        else if (backgroundColor == "Green") {
//    //            backgroundColor = "008000";
//    //        } else if (backgroundColor == "Blue") {
//    //            backgroundColor = "0000FF";
//    //        } else if (backgroundColor == "orange") {
//    //            backgroundColor = "FFA500";
//    //        } else if (backgroundColor == "yellow") {
//    //            backgroundColor = "FFFF00";
//    //        } else if (backgroundColor == "Gray") {
//    //            backgroundColor = "808080";
//    //        }
//    //        var cellText = row.cells[j].innerText;
//    //        var cellStyles = {
//    //            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: backgroundColor } },
//    //            font: { bold: true, color: { argb: '000000' } } // Assuming white text color
//    //        };

//    //        rowData.push({ text: cellText, style: cellStyles });
//    //    }
//    //    var addedRow = worksheet.addRow(rowData.map(cell => cell.text));

//    //    addedRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
//    //        var cellStyle = rowData[colNumber - 1].style;
//    //        cell.fill = cellStyle.fill;
//    //        cell.font = cellStyle.font;
//    //    });

//    //    //worksheet.mergeCells('A' + tabedata1length + ':C' + tabedata1length);
//    //    //worksheet.getCell('A' + tabedata1length).alignment = { horizontal: 'center', vertical: 'center' };

//    //    tabedata1length++;

//    //}

//    //worksheet.mergeCells('A11:AG11');
//    //worksheet.mergeCells('C12:AG12');
//    //worksheet.mergeCells('C13:AG13');
//    //worksheet.mergeCells('C14:AG14');
//    //worksheet.mergeCells('C15:AG15');
//    //worksheet.mergeCells('C16:AG16');
//    //worksheet.mergeCells('C17:AG17');

//    worksheet.addRow([""]).font = { bold: false };  //  Gap Between Second table and below data
//    worksheet.addRow(["This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized"]).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDEB887' } };

//    // Set column widths
//    for (var col = 3; col <= 34; col++) {
//        worksheet.getColumn(col).width = 5; // Set the width as needed
//    }
//    worksheet.getColumn(1).width = 12;
//    worksheet.getColumn(2).width = 20;
//    // worksheet.getColumn(3).width = 17;
//    // worksheet.getColumn(4).width = 9;
//    // Generate .xls file
//    workbook.xlsx.writeBuffer().then(function (buffer) {
//        var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//        // Create a download link
//        var link = document.createElement("a");
//        link.href = URL.createObjectURL(blob);

//        // Set the file name
//        link.download = "tudentAttendanceRegister.xls";

//        // Append the link to the document and trigger the click event
//        document.body.appendChild(link);
//        link.click();

//        // Remove the link from the document
//        document.body.removeChild(link);
//    });
//});


/////////////////////////////  ========================>>>>>>08-02-2024 old code

//$('#Attendanceregisterreportform').on('submit', function () {
//    event.preventDefault();
//    event.stopImmediatePropagation();
//    $('#tblhead').empty();
//    setTimeout(function () {
//        debugger;
//        var validationMessages = $('.field-validation-error');
//        var validationMessages2 = $('.error2');

//        var validationMessagesLength = validationMessages.length;

//        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

//            loaddingimg.css('display', 'block');
//            //var month_Value = $("#Month option:selected").text();
//            //var year_value = $("#Year").val();
//            var month = $("#Monthddl option:selected").text();
//            var monthID = $("#Monthddl").val();
//            var year = $("#Yearddl").val();
//            var InstanceClassificationId = $("#Ddldepartment").val();
//            var SubClass = $("#DdlSubClass").val();
//            var department = $("#Ddldepartment option:selected").text();
//            var className = $("#DdlSubClass option:selected").text();

//            // var formData = $('#Attendanceregisterreportform').serialize();


//            $.ajax({
//                url: "/Reports/StudentAttendanceRegister?Month=" + monthID + "&Year=" + year + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + SubClass, // Replace with your actual endpoint URL
//                type: "POST",
//                //data: formData,
//                success: function (response) {
//                    $("#Registertablediv1").show();
//                    $("#MONTHIDMONTHID").text(month);
//                    $("#YEARID").text(year);
//                    $("#Section").text(className);
//                    $("#Cl").text(department);

//                    //New Tabledata
//                    var tblhead = $('#tblhead');
//                    var tableBody = $('#tblBody');
//                    var tablefooter = $('#tblfooter');


//                    //====>>>> Table head appending code start

//                    var monthIndex = new Date(Date.parse(month + " 1, " + year)).getMonth();
//                    var daysInMonth;
//                    if (monthIndex === 1) {
//                        daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//                    } else {
//                        daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//                    }

//                    var firstRow = $('<tr>');
//                    firstRow.append($('<td>').attr('rowspan', '2').attr('align', 'center').html('&nbsp; S.No.&nbsp;'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Name of Student'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Gender'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').css('white-space', 'normal').text('Date of Birth'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Religion'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Category'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').css('white-space', 'normal').text('Economically Weaker Section'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').text('Repeater'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').css('white-space', 'normal').text('Joined Back After dropout thorugh bridge courses'));
//                    firstRow.append($('<td>').attr('colspan', daysInMonth).attr('align', 'center').text('Day of the month'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('colspan', '3').text('Present'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('rowspan', '2').css('white-space', 'normal').text('No of days participated in extracurricular activities'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('colspan', '2').text('Absent'));
//                    firstRow.append($('<td>').attr('align', 'center').attr('colspan', '2').text('Attendance%'));


//                    var secondRow = $('<tr>');
//                    for (var day = 1; day <= daysInMonth; day++) {
//                        secondRow.append($('<td>').attr('align', 'center').attr('style', 'width:8px').text(day));
//                    }
//                    secondRow.append($('<td>').attr('align', 'center').text(`${month}`));
//                    secondRow.append($('<td>').attr('align', 'center').text('Carry Fwd'));
//                    secondRow.append($('<td>').attr('align', 'center').text('Total'));
//                    secondRow.append($('<td>').attr('align', 'center').text(`${month}`));
//                    secondRow.append($('<td>').attr('align', 'center').text('Total'));
//                    secondRow.append($('<td>').attr('align', 'center').text('Month'));
//                    secondRow.append($('<td>').attr('align', 'center').text('Till Date'));

//                    tblhead.append(firstRow);
//                    tblhead.append(secondRow);

//                    //====>>>> Table head appending code end
//                    //====>>>> Table boy appending code start

//                    //var tableBody = $('#tblBody');
//                    tableBody.empty();
//                    debugger;
//                    if (response.hasOwnProperty('attendanceList')) {

//                        var attendanceList = response.attendanceList;
//                        var rowCount = response.attendanceList.length;

//                        //var areColumnsAppended = false;

//                        var rowspanStartRow = -1; // Row index where the rowspan column starts

//                        for (var i = 0; i <= attendanceList.length; i++) {
//                            var item = attendanceList[i];

//                            if (item && item.dynamicColumns) {
//                                var dynamicColumns = item.dynamicColumns;
//                            }
//                            // var dynamicColumns = item.dynamicColumns;

//                            if (typeof item === 'undefined') {
//                                continue; // Skip the iteration if 'item' is undefined
//                            }

//                            var tableRow = $('<tr>');
//                            $('<td>').text(i + 1).prependTo(tableRow);
//                            tableRow.append($('<td>').text(item.name));
//                            tableRow.append($('<td align="center">').text(item.gender));
//                            tableRow.append($('<td>').text(item.dob));
//                            tableRow.append($('<td align="center">').text(item.religionName));
//                            tableRow.append($('<td align="center">').text(item.castName));
//                            tableRow.append($('<td align="center">').text(item.ews));
//                            tableRow.append($('<td align="center">').text(item.repeater));
//                            tableRow.append($('<td align="center">').text(item.dropout));

//                            for (var index = 1; index <= daysInMonth; index++) {
//                                var columnValue = dynamicColumns[index];
//                                var cellHtml;

//                                if (i === 0) {
//                                    if (columnValue === "S <br> <br> a <br> <br> t <br> <br> u <br> <br> r <br> <br> d <br> <br> a <br> <br> y") {
//                                        cellHtml = `<td rowspan="${rowCount}" align="center">${columnValue}</td>`;
//                                        rowspanStartRow = i;
//                                    } else if (columnValue === "S <br> <br> u <br> <br> n <br> <br> d <br> <br> a <br> <br> y") {
//                                        cellHtml = `<td rowspan="${rowCount}" align="center">${columnValue}</td>`;
//                                        rowspanStartRow = i;
//                                    } else {
//                                        isEveryColumnSaturdaySunday = false;
//                                        cellHtml = `<td align="center">${columnValue}</td>`;
//                                    }
//                                } else {
//                                    if (columnValue === "S <br> <br> a <br> <br> t <br> <br> u <br> <br> r <br> <br> d <br> <br> a <br> <br> y") {
//                                        cellHtml = `<td rowspan="${rowCount}" hidden>${columnValue}</td>`;
//                                        rowspanStartRow = i;
//                                    } else if (columnValue === "S <br> <br> u <br> <br> n <br> <br> d <br> <br> a <br> <br> y") {
//                                        cellHtml = `<td rowspan="${rowCount}" hidden>${columnValue}</td>`;
//                                        rowspanStartRow = i;
//                                    } else {
//                                        isEveryColumnSaturdaySunday = false;
//                                        cellHtml = `<td align="center">${columnValue}</td>`;
//                                    }
//                                }

//                                tableRow.append($(cellHtml));
//                            }
//                            tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 1]));
//                            tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 2]));
//                            tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 3]));
//                            tableRow.append($('<td align="center">').text(dynamicColumns[daysInMonth + 4]));
//                            tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 5]));
//                            tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 6]));
//                            tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 7]));
//                            tableRow.append($('<td>').text(dynamicColumns[daysInMonth + 8]));
//                            tableBody.append(tableRow);
//                        }
//                    }
//                    else {
//                        console.log('AttendanceList not found in the response');
//                    }
//                    //====>>>> Table boy appending code end

//                    //====>>> Empty Row create code start

//                    var trElement = tableBody.find('tr:first');
//                    var tdCount = trElement.find('td').length;
//                    var Emptyrow = $('<tr>');
//                    Emptyrow.append($('<td colspan="' + tdCount + '">').text(''));
//                    tableBody.append(Emptyrow);

//                    //====>>> Empty Row create code end

//                    //====>>>Total Enrollment Row code start
//                    var Stu_wise = response.stu_wise;
//                    var currentMonth = Stu_wise && Stu_wise.currentmonth ? Stu_wise.currentmonth : '';
//                    $('#Teaching_Days').text(currentMonth);
//                    var MonthTotalEnrollment = Stu_wise.m_total;

//                    var TeRow = $('<tr>');
//                    TeRow.append($('<td colspan="9">').text('Total Enrollment'));
//                    for (var i = 1; i <= daysInMonth; i++) {
//                        var mTotalObject = MonthTotalEnrollment;
//                        var attendanceValue = mTotalObject === 0.0 ? '-' : mTotalObject;
//                        TeRow.append($('<td style="font-size: 11px;">').text(attendanceValue));
//                        tableBody.append(TeRow);
//                    }
//                    //====>>>Total Enrollment Row code end

//                    //====>>>Student Attendance Row code start                  

//                    var Stu_Atd_tbl2 = response.stu_Atd_tbl2;
//                    var Student_Attendance = Stu_Atd_tbl2;

//                    var SaRow = $('<tr>');
//                    SaRow.append($('<td colspan="9">').text('Student Attendance'));
//                    var StudentAttendancetotalSum = 0;

//                    var AsRow = $('<tr>');
//                    AsRow.append($('<td colspan="9">').text('Absent Students'));
//                    var AbsentStudentstotalPSum = 0;

//                    for (var i = 0; i < Student_Attendance.length; i++) {
//                        var attendanceObject = Student_Attendance[i];
//                        var attendanceValue = attendanceObject.totalAbsentsinDay;
//                        var attendancePs_Value = attendanceObject.totalPresentsinDay;

//                        if (attendanceValue === '0.0') {
//                            attendanceValue = "-";
//                        } else {
//                            StudentAttendancetotalSum += parseFloat(attendanceValue);
//                        }
//                        var tableAsCell = $('<td style="font-size: 11px;">').text(attendanceValue);
//                        SaRow.append(tableAsCell);



//                        if (attendancePs_Value === '0.0') {
//                            attendancePs_Value = "-";
//                        } else {
//                            AbsentStudentstotalPSum += parseFloat(attendancePs_Value);
//                        }
//                        var tablepsCell = $('<td style="font-size: 11px;">').text(attendancePs_Value);
//                        AsRow.append(tablepsCell);
//                    }

//                    var totalSumCell = $('<td colspan="8">').css('font-size', '11px').text(StudentAttendancetotalSum);
//                    SaRow.append(totalSumCell);

//                    var totalPSumCell = $('<td colspan="8">').css('font-size', '11px').text(AbsentStudentstotalPSum);
//                    AsRow.append(totalPSumCell);

//                    tableBody.append(SaRow);
//                    tableBody.append(AsRow);
//                    //====>>>Student Attendance Row code end

//                    //===>>>Total Enrollment SC Row create code start
//                    var TotalEnrollmentSCtr = response.st_tbl4_cl;
//                    var TESCtr = $('<tr>');
//                    TESCtr.append($('<td colspan="9">').text('Total Enrollment SC'));
//                    for (var k = 0; k < daysInMonth; k++) {
//                        var mt_Object = TotalEnrollmentSCtr.m_total;
//                        var Mt_Value = mt_Object === '0' ? '-' : mt_Object;
//                        var Mt_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(Mt_Value);
//                        TESCtr.append(Mt_tableCell);
//                    }
//                    tableBody.append(TESCtr);
//                    //===>>>Total Enrollment SC Row create code end

//                    //===>>>Attendance SC
//                    var Attendancescrow = $('<tr>');
//                    Attendancescrow.append($('<td colspan="9">').text('Attendance SC'));

//                    for (var k = 0; k < daysInMonth; k++) {
//                        var mt_Objects = TotalEnrollmentSCtr.m_total;
//                        var Mt_Values = mt_Objects === '0' ? '-' : mt_Objects;
//                        var Mt_tableCells = $('<td style="font-size: 11px;">').attr('align', 'center').text(Mt_Values);
//                        Attendancescrow.append(Mt_tableCells);
//                    }
//                    tableBody.append(Attendancescrow);

//                    //===>>>Attendance SC
//                    debugger;
//                    //===>>>Total Enrollment OBC
//                    var T6_tabletr = response.st_tbl6_cl;
//                    var T6_tableRow = $('<tr>');
//                    T6_tableRow.append($('<td colspan="9">').text('Total Enrollment OBC'));
//                    for (var a = 0; a < daysInMonth; a++) {
//                        var tr_Object = T6_tabletr.m_total;
//                        var tr6_Value = tr_Object === '0' ? '-' : tr_Object;
//                        var tr_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(tr6_Value);
//                        T6_tableRow.append(tr_tableCell);
//                    }
//                    tableBody.append(T6_tableRow);
//                    //===>>>Total Enrollment OBC

//                    //===>>>Attendance OBC
//                    var T6_trOBC = response.st_tbl6_cl;
//                    var T6_tableRowOBC = $('<tr>');
//                    T6_tableRowOBC.append($('<td colspan="9">').text('Attendance OBC'));
//                    for (var b = 0; b < daysInMonth; b++) {
//                        var tr_Object = T6_trOBC.m_total;
//                        var tr6_Value = tr_Object === '0' ? '-' : tr_Object;
//                        var tr_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(tr6_Value);
//                        T6_tableRowOBC.append(tr_tableCell);
//                    }
//                    tableBody.append(T6_tableRowOBC);
//                    //===>>>Attendance OBC

//                    //===>>>Total Enrollment ST
//                    var T8_M_tr = response.st_tbl8_cl;
//                    var T8_tableRow = $('<tr>');
//                    T8_tableRow.append($('<td colspan="9">').text('Total Enrollment ST'));

//                    for (var b = 0; b < 30; b++) {
//                        var trm_Object = T8_M_tr.m_total;
//                        var trm_Value = trm_Object === '0' ? '-' : trm_Object;
//                        var trm_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(trm_Value);
//                        T8_tableRow.append(trm_tableCell);
//                    }
//                    tableBody.append(T8_tableRow);
//                    //===>>>Total Enrollment ST

//                    //===>>>Attendance ST
//                    var Attendancest_M_tr = response.tE_Muslims_cl;
//                    var AttendanceSTRow = $('<tr>');
//                    AttendanceSTRow.append($('<td colspan="9">').text('Attendance ST'));
//                    tableBody.append(AttendanceSTRow);
//                    var Stu_Abs_tbl = response.m_Stuabs;
//                    var M_StuAbs = Stu_Abs_tbl;

//                    var M_tableAbsRow = $('<tr>');
//                    M_tableAbsRow.append($('<td colspan="9">').text('Student Attendance Muslims'));
//                    var M_abstotalSum = 0;

//                    for (var i = 0; i < M_StuAbs.length; i++) {
//                        var attendanceObject = M_StuAbs[i];
//                        var M_attendanceValue = attendanceObject.totalPresentsinDay;
//                        var M_atteValue = M_attendanceValue === '0.0' ? '-' : M_attendanceValue;

//                        if (M_abstotalSum === '0') {
//                            M_abstotalSum = "-";
//                        } else {
//                            M_abstotalSum += parseFloat(M_attendanceValue);
//                        }

//                        var M_abstableAsCell = $('<td style="font-size: 11px;">').text(M_atteValue);
//                        M_tableAbsRow.append(M_abstableAsCell);
//                    }
//                    var M_abstotalSumCell = $('<td colspan="8">').css('font-size', '11px').text(M_abstotalSum);
//                    M_tableAbsRow.append(M_abstotalSumCell);

//                    tableBody.append(M_tableAbsRow);



//                    //===>>>Attendance ST

//                    //===>>>Total Enrollment Muslims
//                    var TE_M_tr = response.tE_Muslims_cl;
//                    var M_tableRow = $('<tr>');
//                    M_tableRow.append($('<td colspan="9">').text('Total Enrollment Muslims'));

//                    for (var c = 0; c < 30; c++) {
//                        var m_Object = TE_M_tr.m_total;
//                        var M_Value = m_Object === '0' ? '-' : m_Object;
//                        var M_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(M_Value);
//                        M_tableRow.append(M_tableCell);
//                    }
//                    tableBody.append(M_tableRow);
//                    //===>>>Total Enrollment Muslims

//                    //===>>Student Attendance Muslims
//                    var Stu_Abs_tbl = response.m_Stuabs;
//                    var M_StuAbs = Stu_Abs_tbl;

//                    var M_tableAbsRow = $('<tr>');
//                    M_tableAbsRow.append($('<td colspan="9">').text('Student Attendance Muslims'));
//                    var M_abstotalSum = 0;

//                    for (var i = 0; i < M_StuAbs.length; i++) {
//                        var attendanceObject = M_StuAbs[i];
//                        var M_attendanceValue = attendanceObject.totalPresentsinDay;
//                        var M_atteValue = M_attendanceValue === '0.0' ? '-' : M_attendanceValue;

//                        if (M_abstotalSum === '0') {
//                            M_abstotalSum = "-";
//                        } else {
//                            M_abstotalSum += parseFloat(M_attendanceValue);
//                        }

//                        var M_abstableAsCell = $('<td style="font-size: 11px;">').text(M_atteValue);
//                        M_tableAbsRow.append(M_abstableAsCell);
//                    }
//                    var M_abstotalSumCell = $('<td colspan="8">').css('font-size', '11px').text(M_abstotalSum);
//                    M_tableAbsRow.append(M_abstotalSumCell);

//                    tableBody.append(M_tableAbsRow);
//                    //===>>Student Attendance Muslims

//                    //====>>> Last Empty Row create code start                                      
//                    var LastEmptyrow = $('<tr>');
//                    LastEmptyrow.append($('<td colspan="' + tdCount + '">').text(''));
//                    tableBody.append(LastEmptyrow);
//                    //====>>> Last Empty Row create code end

//                    //====>>> Signature of Teacher Row create code start
//                    var SignatureofTeacherrow = $('<tr>');
//                    SignatureofTeacherrow.append($('<td colspan="' + tdCount + '">').text('Signature of Teacher'));
//                    tableBody.append(SignatureofTeacherrow);
//                    //====>>> Signature of Teacher Row create code end  




//                    //====>>>>>Average Attendacne for the month Code start                    
//                    var tblbody = $('#AvgTblbody');
//                    tblbody.empty();
//                    var attendanceAverage = response.attendanceAverage;
//                    var tableRow = $('<tr>');
//                    var tablerows = $('<tr>');
//                    var tblerow = $('<tr>');
//                    var trow = $('<tr>');
//                    var tberows = $('<tr>');
//                    var tlerows = $('<tr>');
//                    tableRow.append($('<td>').text('allAvg'));
//                    tableRow.append($('<td>').text(attendanceAverage.allAvg));
//                    tablerows.append($('<td>').text('sc'));
//                    tablerows.append($('<td>').text(attendanceAverage.sc));
//                    tblerow.append($('<td>').text('st'));
//                    tblerow.append($('<td>').text(attendanceAverage.st));
//                    trow.append($('<td>').text('obc'));
//                    trow.append($('<td>').text(attendanceAverage.obc));
//                    tberows.append($('<td>').text('muslim'));
//                    tberows.append($('<td>').text(attendanceAverage.muslim));
//                    tlerows.append($('<td>').text('girls'));
//                    tlerows.append($('<td>').text(attendanceAverage.girls));
//                    tblbody.append(tableRow)
//                    tblbody.append(tablerows)
//                    tblbody.append(tblerow)
//                    tblbody.append(trow)
//                    tblbody.append(tberows)
//                    tblbody.append(tlerows)
//                    //====>>>>>Average Attendacne for the month Code end

//                    var signatureDiv = $('<div>', {
//                        style: 'margin-left: 60%; position: absolute; margin-top: -12%;',
//                        html: '<span>Signature of Teacher________________________</span>'
//                    });
//                    $('#Signaturediv').append(signatureDiv);
//                    loaddingimg.css('display', 'none');
//                },
//                error: function (error) {
//                    loaddingimg.css('display', 'none');
//                }
//            });
//        }
//    }, 50);
//});

/////////////////////////////  ========================>>>>>>08-02-2024 old code

