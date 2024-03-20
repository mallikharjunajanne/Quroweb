
function CallToAjax_Withoutdata(method, url, successCallback, errorCallback) {
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


$(document).ready(function () {
    debugger;
   // CommonDropdownFunction("GET", "/Attendance/DepartmentsDropdown_Caliingfunction", "DdlDepartment", null, false)
    //fetchDataAndPopulateDropdown(
    //    '/Reports/MonthWisedepartmentdd',         // URL for data fetching
    //    '#Ddldepartment',                         // Dropdown selector
    //    'instanceClassificationId',               // Field name for option values
    //    'classificationName',                     // Field name for option text
    //    'manageClassification'                    // Response value return class name
    //);
});





function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return formattedDate;
}



function GetDateFormats(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
}


/*============**********  MONTHLY ATTENDANCE REPORT   **********==============*/

$('#Ddldepartment').change(function () {
    var selectedValues = $('#Ddldepartment').val();
    debugger;
    Departmentbysubclassdd(selectedValues);   
});

function Departmentbysubclassdd(Departmentvalue) {
    $.ajax({
        url: '/Reports/MonthWisesubclassificationdd?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#DdlClass';
            var dropdown = $(dropdownSelector);
            var valueField = 'instanceSubclassificaitionId';
            var textField = 'subClassificationName';
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


$("#Monthlyattendanceformid").on('submit', function () {
    event.preventDefault();
    event.stopImmediatePropagation();
    debugger;
    setTimeout(function () {
        $('#Main_Span_Error').text('');
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            var formData = $('#Monthlyattendanceformid').serialize();
            var url = "/Reports/GetMonthWiseFullStatusofClassAttendanceReporttbldata";

            handleAjax('GET', url, null,
                function (resp) {

                    loaddingimg.css('display', 'block');
                    $('#Appendsmonthwiseattendancereportdiv').html(resp);

                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );

            var urls = "/Reports/MonthandClassattendancereport";
            handleAjax('GET', urls, formData,
                function (response) {
                    var retunmessage = response.returnmessage;
                    if (retunmessage == "0") {
                        $('#Main_Span_Error').text('Attendance is not Posted for the selected criteria');
                        loaddingimg.css('display', 'none');
                    } else {
                        //bindDatatable(response); 
                        $('#Appendsmonthwiseattendancereportdiv').show();
                        debugger;
                        var Tabledatarepsonse = response.classwisemonthreport;
                        var Percentagedetails = response.percentagedetails;
                        var attendancesummarydetails = response.attendancesummary;

                        var table = $('#myTable').length;
                        var tblhead = $('#tablehead');
                        var tableBody = $('#tableBody');
                        var tablefooter = $('#tablefooter');

                        var month = $("#Month").val();
                        var year = $("#Year").val();

                        var DepartmentselectedText = $('#Ddldepartment option:selected').text();
                        var ClassselectedText = $('#DdlClass option:selected').text();

                        $('#Selectedepartmentspid').text(DepartmentselectedText);
                        $('#SelecteSectionspid').text(ClassselectedText);
                        $('#selectedmonthid').text(month);
                        $('#SelectedYearid').text(year);   

                        var monthIndex = new Date(Date.parse(month + " 1, " + year)).getMonth();
                        var monthName = new Date(Date.UTC(year, monthIndex, 1)).toLocaleString('en', { month: 'short' });
                        var daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

                       /* debugger;*/

                        var firstRow = `<tr><td rowspan="2" align="center" style="border: 1px solid;">S.No.</td>
                                            <td rowspan="2" align="center" style="border: 1px solid;">Adm.No.</td>
                                            <td align="center" style="border: 1px solid;">Date</td>`;

                        for (var day = 1; day <= daysInMonth; day++) {
                            firstRow += `<td align="center" style="border: 1px solid;">${day}</td>`;
                        }

                        firstRow += `<td colspan="3" align="center" style="border: 1px solid;">Present</td>
                                      <td colspan="2" align="center" style="border: 1px solid;">Absent</td>
                                       <td colspan="2" align="center" style="border: 1px solid;">Attendance%</td>
                                     </tr>`;

                        var secondRow = '<tr>' +
                            `<td align="center" style="border: 1px solid;">Name</td>` + // Date column below Name
                            `<td colspan="${daysInMonth}" align="center"  style="border: 1px solid;"></td>` +
                            `<td align="center" style="border: 1px solid;">${monthName}</td>` +
                            '<td align="center" style="border: 1px solid;">CarryFwd</td>' +
                            '<td align="center" style="border: 1px solid;">Total</td>' +
                            `<td align="center" style="border: 1px solid;">${monthName}</td>` +
                            '<td align="center" style="border: 1px solid;">Total</td>' +
                            '<td align="center" style="border: 1px solid;">Month</td>' +
                            '<td align="center" style="border: 1px solid;">Till Date</td>' +
                            '</tr>';


                        tblhead.append(firstRow);
                        tblhead.append(secondRow);
                        tableBody.empty();
                        var rowCount = Tabledatarepsonse.length;;
                        var loopExecuted = false;
                        var itstrue = false;
                        for (var i = 0; i < rowCount; i++) {

                            var rowData = Tabledatarepsonse[i];

                            if (rowData && rowData.dynamicColumns) {
                                var dynamicColumns = rowData.dynamicColumns;

                            }
                            if (typeof rowData === 'undefined') {
                                continue; // Skip the iteration if 'item' is undefined
                            }
                            var tableRow = $('<tr>');
                            $('<td style="border: 1px solid;">').text(i + 1).prependTo(tableRow);
                            tableRow.append($('<td  style="border: 1px solid;">').text(rowData.admissionNumber));
                            tableRow.append($('<td  style="border: 1px solid;">').text(rowData.name));

                            debugger;
                            
                            dynamicColumns.forEach(function (columnValue, index) {
                                // Count the occurrences of <br> tags in the columnValue                                
                                if (index>0) {                                
                                var brCount = (columnValue.match(/<br>/g) || []).length;
                                // Generate the HTML for the cell
                                var cellHtml;
                                if (brCount > 0) {
                                    if (!itstrue) {
                                        cellHtml = `<td rowspan="${rowCount}" align="center"  style="border: 1px solid;">${columnValue}</td>`;
                                        itstrue = false;
                                    } else {
                                        /*cellHtml = `<td hidden ></td>`;*/
                                        cellHtml = ` `;
                                    }                                                                   
                                }
                                else {
                                    // If no <br> tags, generate a regular cell
                                    cellHtml = `<td align="center"  style="border: 1px solid;">${columnValue}</td>`;
                                }

                                   // Append the cell to the table row
                                    tableRow.append($(cellHtml));
                                   
                                }
                            });
                            loopExecuted = true;
                            itstrue = true;
                            
                           
                            //for (var index = 0; index <= daysInMonth; index++) {
                            ////for (var index = 1; index <= daysInMonth; index++) {
                            //    var columnValue = dynamicColumns[index];
                            //    var cellHtml;
                            //    debugger;
                            //    if (i === 0) {
                            //        if (columnValue === "S <br> <br> a <br> <br> t <br> <br> u <br> <br> r <br> <br> d <br> <br> a <br> <br> y") {
                            //            cellHtml = `<td rowspan="${rowCount}" align="center" style="border: 1px solid black;">${columnValue}</td>`;
                            //            rowspanStartRow = i;
                            //        } else if (columnValue === "S <br> <br> u <br> <br> n <br> <br> d <br> <br> a <br> <br> y") {
                            //            cellHtml = `<td rowspan="${rowCount}" align="center" style="border: 1px solid black;">${columnValue}</td>`;
                            //            rowspanStartRow = i;
                            //        } else {
                            //            isEveryColumnSaturdaySunday = false;
                            //            cellHtml = `<td align="center" style="border: 1px solid black;">${columnValue}</td>`;
                            //        }
                            //    } else {
                            //        if (columnValue === "S <br> <br> a <br> <br> t <br> <br> u <br> <br> r <br> <br> d <br> <br> a <br> <br> y") {
                            //            cellHtml = `<td rowspan="${rowCount}" hidden>${columnValue}</td>`;
                            //            rowspanStartRow = i;
                            //        } else if (columnValue === "S <br> <br> u <br> <br> n <br> <br> d <br> <br> a <br> <br> y") {
                            //            cellHtml = `<td rowspan="${rowCount}" hidden style="border: 1px solid black;">${columnValue}</td>`;
                            //            rowspanStartRow = i;
                            //        } else {
                            //            isEveryColumnSaturdaySunday = false;
                            //            cellHtml = `<td align="center" style="border: 1px solid black;">${columnValue}</td>`;
                            //        }
                            //    }                         

                            ///===========================
                            //tableRow.append($('<td style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 1]));
                            //tableRow.append($('<td style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 2]));
                            //tableRow.append($('<td style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 3]));
                            //tableRow.append($('<td align="center" style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 4]));
                            //tableRow.append($('<td style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 5]));
                            //tableRow.append($('<td style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 6]));
                            //tableRow.append($('<td style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 7]));
                            //tableRow.append($('<td style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 8]));
                            //tableRow.append($('<td style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 9]));
                            //================================


                            //tableRow.append($('<td align="center">').text(rowData.monthwise));
                            //tableRow.append($('<td align="center">').text(rowData.Carry_Fwd));
                            //tableRow.append($('<td align="center">').text(rowData.total));
                            //tableRow.append($('<td align="center">').text(rowData.monthwise1));
                            //tableRow.append($('<td align="center">').text(rowData.month));
                            //tableRow.append($('<td align="center" style="border: 1px solid black;">').text(rowData.tillDate));

                            tableBody.append(tableRow);

                            rowCount++;
                        }

                        var presentRow = $('<tr>');
                        var absentRow = $('<tr>');
                        var presentTotal = 0;
                        var absentTotal = 0;
                        presentRow.append($('<td colspan="3"  style="border: 1px solid;">').text('Present Students'));
                        absentRow.append($('<td colspan="3"  style="border: 1px solid;">').text('Absent Students'));
                        for (var j = 0; j < Percentagedetails.length; j++) {

                            var percentageData = Percentagedetails[j];

                            var presentValue = parseFloat(percentageData.totalPresentsinDay);
                            var absentValue = parseFloat(percentageData.totalAbsentsinDay);

                            if (!isNaN(presentValue)) {
                                presentTotal += presentValue;
                            }
                            if (!isNaN(absentValue)) {
                                absentTotal += absentValue;
                            }

                        presentRow.append($('<td align="center"  style="border: 1px solid;">').text(presentValue === 0.0 ? '-' : presentValue.toString()));
                        absentRow.append($('<td align="center"  style="border: 1px solid;">').text(absentValue === 0.0 ? '-' : absentValue.toString()));
                        }

                        presentRow.append($('<td colspan="7"  style="border: 1px solid;">').text(presentTotal));
                        absentRow.append($('<td colspan="7"  style="border: 1px solid;">').text(absentTotal));

                        tableBody.append(presentRow);
                        tableBody.append(absentRow);

                        var trElement = tableBody.find('tr:first');
                        var tdCount = trElement.find('td').length;
                        var SummaryRow = $('<tr>');
                        SummaryRow.append($('<td colspan="' + tdCount + '" align="center"  style="border: 1px solid;">').text('Summary').css('text-align', 'center'));
                        tableBody.append(SummaryRow);



                        var numberOfStudentsRow = `<td colspan="17" align="center"  style="border: 1px solid;">Number of Students</td>
    <td colspan="17" align="center"  style="border: 1px solid;">Attendance</td>
    <td colspan="2" rowspan="3" align="center"  style="border: 1px solid;">Holidays</td>
    <td colspan="4"  align="center"  style="border: 1px solid;">Working Days</td>
</tr>`;
                        var holidaysWorkingDaysRow = '<tr>' +
                            `<td colspan="3" align="center"  style="border: 1px solid;">Start of Month</td>` +
                            `<td colspan="5" align="center"  style="border: 1px solid;">End of Month</td>` +
                            `<td colspan="4" align="center"  style="border: 1px solid;">Joinees</td>` +
                            '<td colspan="5" align="center"  style="border: 1px solid;">Withdrawals</td>' +
                            '<td colspan="5" align="center"  style="border: 1px solid;">Boys</td>' +
                            `<td colspan="6" align="center"  style="border: 1px solid;">Girls</td>` +
                            '<td colspan="6" align="center"  style="border: 1px solid;">Total</td>' +
                            '<td colspan="1" align="center"  style="border: 1px solid;">' + monthName + '</td>' +
                            '<td colspan="3" align="center"  style="border: 1px solid;">Since Start of Session</td>' +
                            '</tr>';
                        var boysgirlsrow = '<tr>' +
                            `<td colspan="3" align="center"  style="border: 1px solid;"></td>` +
                            `<td colspan="2" align="center"  style="border: 1px solid;">Boys</td>` +
                            `<td colspan="3" align="center"  style="border: 1px solid;">Girls</td>` +
                            '<td colspan="4" align="center"  style="border: 1px solid;"></td>' +
                            '<td colspan="5" align="center"  style="border: 1px solid;"></td>' +
                            `<td colspan="1" align="center"  style="border: 1px solid;">P(%)</td>` +
                            '<td colspan="2" align="center"  style="border: 1px solid;">A(%)</td>' +
                            '<td colspan="2" align="center"  style="border: 1px solid;">Avg.</td>' +
                            '<td colspan="2" align="center"  style="border: 1px solid;">P(%)</td>' +
                            '<td colspan="2" align="center"  style="border: 1px solid;">A(%)</td>' +
                            '<td colspan="2" align="center"  style="border: 1px solid;">Avg.</td>' +
                            '<td colspan="2" align="center"  style="border: 1px solid;">P(%)</td>' +
                            '<td colspan="2" align="center"  style="border: 1px solid;">A(%)</td>' +
                            '<td colspan="2" align="center"  style="border: 1px solid;">Avg.</td>' +
                            '<td colspan="1" align="center"  style="border: 1px solid;"></td>' +
                            '<td colspan="3" align="center"  style="border: 1px solid;"></td>' +
                            '</tr>';

                        tableBody.append(numberOfStudentsRow);
                        tableBody.append(holidaysWorkingDaysRow);
                        tableBody.append(boysgirlsrow);



                        var SummarydetailsRow = $('<tr>');
                        var Summarydetails = attendancesummarydetails[0];

                        SummarydetailsRow.append($('<td colspan="3" align="center"  style="border: 1px solid;">').text(Summarydetails.startofmonth));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.boys));
                        SummarydetailsRow.append($('<td colspan="3" align="center"  style="border: 1px solid;">').text(Summarydetails.girls));
                        SummarydetailsRow.append($('<td colspan="4" align="center"  style="border: 1px solid;">').text(Summarydetails.joinees));
                        SummarydetailsRow.append($('<td colspan="5" align="center"  style="border: 1px solid;">').text(Summarydetails.withdrawals));
                        SummarydetailsRow.append($('<td colspan="1" align="center"  style="border: 1px solid;">').text(Summarydetails.boysPresent));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.boysAbsent));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.boysAvg));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.girlsPresent));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.girlsAbsent));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.girlsAvg));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.totalPresent));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.totalAbsent));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.totalAvg));
                        SummarydetailsRow.append($('<td colspan="2" align="center"  style="border: 1px solid;">').text(Summarydetails.holidays));
                        SummarydetailsRow.append($('<td colspan="1" align="center"  style="border: 1px solid;">').text(Summarydetails.currentmonth));
                        SummarydetailsRow.append($('<td colspan="3" align="center"  style="border: 1px solid;">').text(Summarydetails.sincestartofsession));


                        tableBody.append(SummarydetailsRow);


                        debugger;

                        var classTeacherLabel = $('<label>').text('Class Teacher').appendTo('#AttendanceSignaturesdiv');
                        var classTeacherInput = $('<label>').text('_____________________').appendTo('#AttendanceSignaturesdiv');

                        // Team Leader
                        var teamLeaderLabel = $('<label>').text('Team Leader').appendTo('#AttendanceSignaturesdiv');
                        var teamLeaderInput = $('<label>').text('_____________________').appendTo('#AttendanceSignaturesdiv');

                        // Principal
                        var principalLabel = $('<label>').text('Principal').appendTo('#AttendanceSignaturesdiv');
                        var principalInput = $('<label>').text('_____________________').appendTo('#AttendanceSignaturesdiv');

                        // Add CSS styles for better presentation
                        $('.tablefooter label').css({
                            'display': 'block', // Display labels on a new line
                            'margin-bottom': '10px' // Add some space below each label
                        });


                        loaddingimg.css('display', 'none');


                    }
                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );
        }
    }, 50);
});





/*============********** MONTHLY ATTENDANCE REPORT PRINT **********==============*/
$('#_monthwiseattendancereportPrint').on('click', function () {
    var printContents = $('#Printmonthwiseattendancereport').html();
    debugger;

    // Create a new window to print the content
    var printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title></title>');
    printWindow.document.write('<style>');
    printWindow.document.write('table,td { border: none; }'); // Collapse borders
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<table>');
    // Add table content here
    printWindow.document.write('</table>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close(); // Close the document opened with document.write
    printWindow.print();
});

$('#_MonthwiseattendancereportExportExcel').on('click', function () {
    var formattedDate = GetDateFormat();

    debugger;
    var month = document.getElementById("selectedmonthid").textContent;
    var year = document.getElementById("SelectedYearid").textContent;
    var className = document.getElementById("Selectedepartmentspid").textContent;
    var section = document.getElementById("SelecteSectionspid").textContent;
    //var teachingDays = document.getElementById("Teaching_Days").textContent;
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
                     <p style="margin: 0; text-align: center;">Attendance for ${className},${section} for the month of ${month}, ${year}</p>
                </div>
            </div>`;

    var table1 = document.getElementById("myTable");
    var table1Clone = table1.cloneNode(true);

    table1Clone.style.border = "1px solid black";
    table1Clone.style.color = "black";
    table1Clone.style.backgroundColor = "white";

    //var styles = window.getComputedStyle(table1);
    //// Apply the styles to the cloned table
    //table1Clone.style.borderCollapse = styles.getPropertyValue("border-collapse");
    //table1Clone.style.border = styles.getPropertyValue("border");
    //table1Clone.style.backgroundColor = styles.getPropertyValue("background-color");
    //// Add more styles as needed
   

    var cells = table1.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        debugger;
        if (cells[i].style.display === "none") { // Check if the td element has the hidden attribute       
            debugger;
            cells[i].remove();

        } else {           
            //cells[i].classList.add("cell-border");
            //cells[i].setAttribute("style", "border: 1px solid black;");
            cells[i].style.borderTop = "1px solid black";
            cells[i].style.borderRight = "1px solid black";
            cells[i].style.borderBottom = "1px solid black";
            cells[i].style.borderLeft = "1px solid black";

        }
    }
    
    var FooterContent = `
      <div style="grid-column: 1 / span 18; background-color: #e0e0e0; padding: 20px; border-radius: 5px;">
        <p style="margin: 0; text-align: center;">This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized use, copying, or distribution of this report is strictly prohibited.</p>
      </div>
      `;
    document.body.appendChild(table1Clone);

    var combinedHtml = Leaverelatedcontent + headerContent + table1Clone.outerHTML + FooterContent;

    const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
    saveAs(blob, 'Monthlyattendnacereport.xls');

    // Replace the original table with the cloned table in the document
    table1.parentNode.replaceChild(table1Clone, table1);


    //document.body.appendChild(table1Clone);
    //var combinedHtml = Leaverelatedcontent + headerContent + table1Clone.outerHTML + FooterContent;

    //const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
    //saveAs(blob, 'Monthlyattendnacereport.xls');
    //table1.parentNode.replaceChild(table1Clone, table1);  
    
});


//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {
        debugger;
        var StartdateInput = $("#Startdatetxt").val();
        var EnddateInput = $("#Enddatetxt").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var formattedStartDate = GetDateFormats(Startdate);
        var formattedEndDate = GetDateFormats(Enddate);

        var errorElement = $('.compare');

        if (formattedStartDate != formattedEndDate) {
            if (Enddate <= Startdate) {
                $('#Errormessage').text(Edate + " must be greater than " + Sdate + ".");
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
$("#Startdatetxt").on("change", function () { DatesCompare("Start Date", "End Date"); });
$("#Enddatetxt").on("change", function () { DatesCompare("Start Date", "End Date"); });




$('#SelectAllDepartmentsChk').change(function () {
    debugger;
    if (this.checked) {
        $('#DdlDepartment option').prop('selected', true);
        var allValues = $('#DdlDepartment').val();
        Departmentbysubclass(allValues);
        console.log(allValues);
    } else {
        $('#DdlDepartment option').prop('selected', false);
    }
});

$('#Selectallsubclasschk').change(function () {
    debugger;
    if (this.checked) {
        $('#DdlClass option').prop('selected', true);
        // var allValues = $('#DdlClass').val();
        //Departmentbysubclass(allValues);
        //console.log(allValues);
    } else {
        $('#DdlClass option').prop('selected', false);
    }
});

$('#DdlDepartment').change(function () {
    var selectedValues = $('#DdlDepartment').val();
    debugger;
    //Departmentbysubclass(selectedValues);
    console.log(selectedValues);
});

function Departmentbysubclass(Departmentvalue) {
    $.ajax({
        url: '/Reports/Sectionwisesubclassificationdd?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#DdlClass';
            var dropdown = $(dropdownSelector);
            var valueField = 'instanceSubclassificaitionId';
            var textField = 'subClassificationName';
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

function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {    
    CallToAjax_Withoutdata('GET', url,
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
    //dropdown.empty(); // Clear existing options
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




$('#DepartmentSearchClearlink').on('click', function () {
   
    $("#SelectAllDepartmentsChk").prop("checked", false);
    $('#DdlDepartment option').prop('selected', false);
    
});

$('#ClassSearchClearlink').on('click', function () {

    $("#Selectallsubclasschk").prop("checked", false);
    $('#DdlClass option').prop('selected', false);

});



$('#Classswisetudentwiseattendancereport').on('submit', function () {
    event.preventDefault(); 
    event.stopImmediatePropagation();
    setTimeout(function () {

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            var SerializeData = $('#Classswisetudentwiseattendancereport').serialize();

            var url = "/Reports/SectionwiseAttendanceReporttbldata";
            debugger;
           
            handleAjax('GET', url, null,
                function (resp) {
                   
                    loaddingimg.css('display', 'block');
                    $('#Appendsclasswiseandstudentwiseattendancereportdiv').html(resp);                   

                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );
         
            var urls = "/Reports/SearchsectionwiseAttendanceReporttbldata";
            handleAjax('GET', urls, SerializeData,
                function (response) {
                    debugger;

                    var Tabledatarepsonse = response.attendancemonthreports;
                    var attendancesummarydetails = response.attendancemonthpercantage;

                  // Classwisesectionwiseattendancereportbinddata(response);
                    var fromDate = new Date(document.getElementById('Startdatetxt').value);
                    var toDate = new Date(document.getElementById('Enddatetxt').value);

                    var ClassselectedText = $('#DdlClass option:selected').text();
                    var formattedFromDate = fromDate.toLocaleDateString('en-US');
                    var formattedToDate = toDate.toLocaleDateString('en-US');
                    $('#Selectedclassspid').text(ClassselectedText);
                    $('#Selectedfromdatespid').text(formattedFromDate);
                    $('#Selectedtodatespid').text(formattedToDate);

                  
                    //var labelElement = $('<label>').text('ADS SCHOOL');
                    //var headingText = "Attendance for the Classes " + ClassselectedText + " for the period of " + formattedFromDate + " To " + formattedToDate;
                    //$('#Selectedclassnamesdiv').append($('<h6>').append(labelElement));
                    //$('#Selectedclassnamesdiv').append($('<h6>').text(headingText));

                    

                    //var table = $('#StudentwiseattendaceReport').length;
                    var tblhead = $('#tablehead');
                    var tableBody = $('#tableBody');
                    var tablefooter = $('#tablefooter');

                    var currentDate = new Date(fromDate);
                    var firstRow = `<tr>
    <td rowspan="2" align="center">S.No.</td>
    <td rowspan="2" align="center">Class</td>
    <td rowspan="2" align="center">Name</td>
    <td rowspan="2" align="center">Adm.No.</td>
    <td rowspan="2" align="center">Gender</td>
    <td  align="center">Date</td>`;
                    var daysInMonth = 0;
                    while (currentDate <= toDate) {
                        var currentMonth = currentDate.toLocaleString('en', { month: 'short' });
                        var currentDay = currentDate.getDate();
                        firstRow += `<td align="center" style="width:8px">${currentDay}-${currentMonth}</td>`;

                        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
                        daysInMonth++;
                    }
                    firstRow += `<td  align="center">Total days present</td>
                 <td align="center">Working days</td>    
                 </tr>`;
                    var secondRow = '<tr>' +

                        `<td align="center">DOJ/DOW</td>` + // Date column below Name
                        `<td colspan="${daysInMonth + 2}" align="center"></td>` +
                        '</tr>';

                    tblhead.append(firstRow);
                    tblhead.append(secondRow);
                    tableBody.empty();


                    var rowCount = Tabledatarepsonse.length;

                    for (var i = 0; i < rowCount; i++) {

                        var rowData = Tabledatarepsonse[i];

                        if (rowData && rowData.dynamicColumns) {
                            var dynamicColumns = rowData.dynamicColumns;

                        }
                        if (typeof rowData === 'undefined') {
                            continue; // Skip the iteration if 'item' is undefined
                        }
                        var tableRow = $('<tr>');
                        $('<td style="border: 1px solid;">').text(i + 1).prependTo(tableRow);
                        tableRow.append($('<td>').text(rowData.subclassificationName));
                        tableRow.append($('<td>').text(rowData.name));
                        tableRow.append($('<td>').text(rowData.admissionNumber));
                        tableRow.append($('<td>').text(rowData.gender));
                        tableRow.append($('<td>').text(rowData.dateOfJoining));

                        debugger;
                        for (var index = 0; index <= daysInMonth; index++) {
                            var columnValue = dynamicColumns[index];
                            var cellHtml;

                            if (index === 0) {
                                // First row, set rowspan
                                cellHtml = `<td rowspan="2" colspan="2" align="center">${columnValue}</td>`;
                            } else {
                                // Other rows, hide cell with rowspan
                                cellHtml = `<td rowspan="2" colspan="2" hidden>${columnValue}</td>`;
                            }

                            tableRow.append($(cellHtml));
                        }
                        //for (var index = 0; index <= daysInMonth; index++) {
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

                        tableRow.append($('<td align="center">').text(dynamicColumns[daysInMonth + 1]));

                        tableBody.append(tableRow);
                        rowCount++;
                    }



                    var trElement = tableBody.find('tr:first');
                    var tdCount = trElement.find('td').length;
                    var SummaryRow = $('<tr>');
                    SummaryRow.append($('<td colspan="' + tdCount + '" align="center">').text('Summary').css('text-align', 'center'));
                    tableBody.append(SummaryRow);



                    var colspancounts = tdCount / 4;
                    var firstColspan = Math.floor(colspancounts);
                    var remainingCols = tdCount - firstColspan;

                    var secondColspan = Math.floor(remainingCols / 3); // Dividing the remaining columns into 3 parts
                    var thirdColspan = Math.floor(remainingCols / 3);
                    var fourthColspan = remainingCols - secondColspan - thirdColspan; // Calculating the fourth colspan

                    var numberOfStudentsRow = '<tr>' + `<td  colspan="${firstColspan}" align="center">Class</td>
                               <td  colspan="${secondColspan}" align="center">Presents</td>
                               <td  colspan="${thirdColspan}" align="center">Working Days</td>
                               <td  colspan="${fourthColspan}" align="center">Attendance %</td>
                               </tr>`;

                    var Secoundcellcell = Math.floor(secondColspan / 3);
                    var Secoundfirstremaining = secondColspan - (Secoundcellcell * 3);
                    var firstSecoundcell = Secoundcellcell;
                    var SecoundSecoundcell = Secoundcellcell;
                    var Thirdsecoundcell = Secoundcellcell + Secoundfirstremaining;

                    var thirdcell = Math.floor(thirdColspan / 3);
                    var Secoundremaining = thirdColspan - (thirdcell * 3);
                    var firstthirdcell = thirdcell;
                    var Secoundthirdcell = thirdcell;
                    var Thirdthirdcell = thirdcell + Secoundremaining;


                    var fourtcell = Math.floor(fourthColspan / 3);
                    var Secoundfourthremaining = fourthColspan - (fourtcell * 3);
                    var firstfourthcell = fourtcell;
                    var Secoundfourthcell = fourtcell;
                    var Thirdfourthcell = fourtcell + Secoundfourthremaining;


                    var Percentagerow = $('<tr>');
                    Percentagerow.append($('<td colspan="' + firstColspan + '" align="center">').text(""));
                    Percentagerow.append($('<td colspan="' + firstSecoundcell + '" align="center">').text("Total Presents of Boys"));
                    Percentagerow.append($('<td colspan="' + SecoundSecoundcell + '" align="center">').text("Total Presents of Girls"));
                    Percentagerow.append($('<td colspan="' + Thirdsecoundcell + '" align="center">').text("Total Presents"));
                    Percentagerow.append($('<td colspan="' + firstthirdcell + '" align="center">').text("Total Working Days for Boys"));
                    Percentagerow.append($('<td colspan="' + Secoundthirdcell + '" align="center">').text("Total Working Days for Girls"));
                    Percentagerow.append($('<td colspan="' + Thirdthirdcell + '" align="center">').text("Total Working Days"));
                    Percentagerow.append($('<td colspan="' + firstfourthcell + '" align="center">').text("Attendance % of Boys"));
                    Percentagerow.append($('<td colspan="' + Secoundfourthcell + '" align="center">').text("Attendance % of Girls"));
                    Percentagerow.append($('<td colspan="' + Thirdfourthcell + '" align="center">').text("Attendance %"));

                    tableBody.append(numberOfStudentsRow);
                    tableBody.append(Percentagerow);

                    debugger;
                   
                    var Summarydetails = attendancesummarydetails[0];
                    if (attendancesummarydetails.length > 0) {
                        for (var i = 0; i < attendancesummarydetails.length; i++) {
                            var summaryDetails = attendancesummarydetails[i];
                            var SummarydetailsRow = $('<tr>');
                            SummarydetailsRow.append($('<td colspan="' + firstColspan + '" align="center">').text(summaryDetails.subclass));
                            SummarydetailsRow.append($('<td colspan="' + firstSecoundcell + '" align="center">').text(summaryDetails.totalPresentofBoys));
                            SummarydetailsRow.append($('<td colspan="' + SecoundSecoundcell + '" align="center">').text(summaryDetails.totalPresentofGirls));
                            SummarydetailsRow.append($('<td colspan="' + Thirdsecoundcell + '" align="center">').text(summaryDetails.totalPresents));
                            SummarydetailsRow.append($('<td colspan="' + firstthirdcell + '" align="center">').text(summaryDetails.totalWorkingdaysforBoys));
                            SummarydetailsRow.append($('<td colspan="' + Secoundthirdcell + '" align="center">').text(summaryDetails.totalWorkingdaysforGirls));
                            SummarydetailsRow.append($('<td colspan="' + Thirdthirdcell + '" align="center">').text(summaryDetails.totalWorkingdays));
                            SummarydetailsRow.append($('<td colspan="' + firstfourthcell + '" align="center">').text(summaryDetails.attendancepercentageofboys));
                            SummarydetailsRow.append($('<td colspan="' + Secoundfourthcell + '" align="center">').text(summaryDetails.attendancepercentageofgirls));
                            SummarydetailsRow.append($('<td colspan="' + Thirdfourthcell + '" align="center">').text(summaryDetails.attendancepercentage));
                            tableBody.append(SummarydetailsRow);
                        }
                    }
                   
                    //SummarydetailsRow.append($('<td colspan="' + firstColspan + '" align="center">').text(Summarydetails.subclass));
                    //SummarydetailsRow.append($('<td colspan="' + firstSecoundcell + '" align="center">').text(Summarydetails.totalPresentofBoys));
                    //SummarydetailsRow.append($('<td colspan="' + SecoundSecoundcell + '" align="center">').text(Summarydetails.totalPresentofGirls));
                    //SummarydetailsRow.append($('<td colspan="' + Thirdsecoundcell + '" align="center">').text(Summarydetails.totalPresents));
                    //SummarydetailsRow.append($('<td colspan="' + firstthirdcell + '" align="center">').text(Summarydetails.totalWorkingdaysforBoys));
                    //SummarydetailsRow.append($('<td colspan="' + Secoundthirdcell + '" align="center">').text(Summarydetails.totalWorkingdaysforGirls));
                    //SummarydetailsRow.append($('<td colspan="' + Thirdthirdcell + '" align="center">').text(Summarydetails.totalWorkingdays));
                    //SummarydetailsRow.append($('<td colspan="' + firstfourthcell + '" align="center">').text(Summarydetails.attendancepercentageofboys));
                    //SummarydetailsRow.append($('<td colspan="' + Secoundfourthcell + '" align="center">').text(Summarydetails.attendancepercentageofgirls));
                    //SummarydetailsRow.append($('<td colspan="' + Thirdfourthcell + '" align="center">').text(Summarydetails.attendancepercentage));

                   


                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );
        }
    }, 50);    
});

function Classwisesectionwiseattendancereportbinddata(response) {
    event.stopPropagation();
    
    debugger;

    var fromDate = new Date(document.getElementById('Startdatetxt').value);
    var toDate = new Date(document.getElementById('Enddatetxt').value);   

    var ClassselectedText = $('#DdlClass option:selected').text();
    var formattedFromDate = fromDate.toLocaleDateString('en-US');
    var formattedToDate = toDate.toLocaleDateString('en-US');

    $('#Selectedclassspid').text(ClassselectedText);
    $('#Selectedfromdatespid').text(formattedFromDate);
    $('#Selectedtodatespid').text(formattedToDate);


    //var labelElement = $('<label>').text('ADS SCHOOL');
    //var headingText = "Attendance for the Classes " + ClassselectedText +" for the period of " + formattedFromDate + " To " + formattedToDate;
    //$('#Selectedclassnamesdiv').append($('<h6>').append(labelElement));
    //$('#Selectedclassnamesdiv').append($('<h6>').text(headingText));  

    var Tabledatarepsonse = response.attendancemonthreports;
    var attendancesummarydetails = response.attendancemonthpercantage;

    var table = $('#StudentwiseattendaceReport').length;
    var tblhead = $('#tablehead');
    var tableBody = $('#tableBody');
    var tablefooter = $('#tablefooter'); 

    var currentDate = new Date(fromDate);
    var firstRow = `<tr>
    <td rowspan="2" align="center">S.No.</td>
    <td rowspan="2" align="center">Class</td>
    <td rowspan="2" align="center">Name</td>
    <td rowspan="2" align="center">Adm.No.</td>
    <td rowspan="2" align="center">Gender</td>
    <td  align="center">Date</td>`;
    var daysInMonth = 0;
    while (currentDate <= toDate) {
        var currentMonth = currentDate.toLocaleString('en', { month: 'short' });
        var currentDay = currentDate.getDate();
        firstRow += `<td align="center" style="width:8px">${currentDay}-${currentMonth}</td>`;

        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        daysInMonth++;
    }
    firstRow += `<td  align="center">Total days present</td>
                 <td align="center">Working days</td>    
                 </tr>`;
    var secondRow = '<tr>' +
        
        `<td align="center">DOJ/DOW</td>` + // Date column below Name
        `<td colspan="${daysInMonth + 2}" align="center"></td>` +
        '</tr>';

    tblhead.append(firstRow);
    tblhead.append(secondRow);
    tableBody.empty();

 
    var rowCount = Tabledatarepsonse.length;

    for (var i = 0; i < rowCount; i++) {

        var rowData = Tabledatarepsonse[i];

        if (rowData && rowData.dynamicColumns) {
            var dynamicColumns = rowData.dynamicColumns;

        }
        if (typeof rowData === 'undefined') {
            continue; // Skip the iteration if 'item' is undefined
        }
        var tableRow = $('<tr>');
        $('<td>').text(i + 1).prependTo(tableRow);
        tableRow.append($('<td>').text(rowData.subclassificationName));
        tableRow.append($('<td>').text(rowData.name));
        tableRow.append($('<td>').text(rowData.admissionNumber));
        tableRow.append($('<td>').text(rowData.gender));
        tableRow.append($('<td>').text(rowData.dateOfJoining));
        

        for (var index = 0; index <= daysInMonth; index++) {
            var columnValue = dynamicColumns[index];
            var cellHtml;
           

            if (i === 0) {
                if (columnValue === "S <br> <br> a <br> <br> t <br> <br> u <br> <br> r <br> <br> d <br> <br> a <br> <br> y") {
                    cellHtml = `<td rowspan="${rowCount}" align="center">${columnValue}</td>`;
                    rowspanStartRow = i;
                } else if (columnValue === "S <br> <br> u <br> <br> n <br> <br> d <br> <br> a <br> <br> y") {
                    cellHtml = `<td rowspan="${rowCount}" align="center">${columnValue}</td>`;
                    rowspanStartRow = i;
                } else {
                    isEveryColumnSaturdaySunday = false;
                    cellHtml = `<td align="center">${columnValue}</td>`;
                }
            } else {
                if (columnValue === "S <br> <br> a <br> <br> t <br> <br> u <br> <br> r <br> <br> d <br> <br> a <br> <br> y") {
                    cellHtml = `<td rowspan="${rowCount}" hidden>${columnValue}</td>`;
                    rowspanStartRow = i;
                } else if (columnValue === "S <br> <br> u <br> <br> n <br> <br> d <br> <br> a <br> <br> y") {
                    cellHtml = `<td rowspan="${rowCount}" hidden>${columnValue}</td>`;
                    rowspanStartRow = i;
                } else {
                    isEveryColumnSaturdaySunday = false;
                    cellHtml = `<td align="center">${columnValue}</td>`;
                }
            }

            tableRow.append($(cellHtml));
        }
        
        tableRow.append($('<td align="center">').text(dynamicColumns[daysInMonth + 1]));
   
        tableBody.append(tableRow);
        rowCount++;
    }


    
    var trElement = tableBody.find('tr:first');
    var tdCount = trElement.find('td').length;
    var SummaryRow = $('<tr>');
    SummaryRow.append($('<td colspan="' + tdCount + '" align="center">').text('Summary').css('text-align', 'center'));
    tableBody.append(SummaryRow);


    
    var colspancounts = tdCount / 4;
    var firstColspan = Math.floor(colspancounts);
    var remainingCols = tdCount - firstColspan;

    var secondColspan = Math.floor(remainingCols / 3); // Dividing the remaining columns into 3 parts
    var thirdColspan = Math.floor(remainingCols / 3);
    var fourthColspan = remainingCols - secondColspan - thirdColspan; // Calculating the fourth colspan

    var numberOfStudentsRow = '<tr>' + `<td  colspan="${firstColspan}" align="center">Class</td>
                               <td  colspan="${secondColspan}" align="center">Presents</td>
                               <td  colspan="${thirdColspan}" align="center">Working Days</td>
                               <td  colspan="${fourthColspan}" align="center">Attendance %</td>
                               </tr>`;
    
    var Secoundcellcell = Math.floor(secondColspan / 3);
    var Secoundfirstremaining = secondColspan - (Secoundcellcell * 3);
    var firstSecoundcell = Secoundcellcell;
    var SecoundSecoundcell = Secoundcellcell;
    var Thirdsecoundcell = Secoundcellcell + Secoundfirstremaining;

    var thirdcell = Math.floor(thirdColspan / 3);
    var Secoundremaining = thirdColspan - (thirdcell * 3);
    var firstthirdcell = thirdcell;
    var Secoundthirdcell = thirdcell;
    var Thirdthirdcell = thirdcell + Secoundremaining;


    var fourtcell = Math.floor(fourthColspan / 3);
    var Secoundfourthremaining = fourthColspan - (fourtcell * 3);
    var firstfourthcell = fourtcell;
    var Secoundfourthcell = fourtcell;
    var Thirdfourthcell = fourtcell + Secoundfourthremaining;



    var Percentagerow = $('<tr>');
    Percentagerow.append($('<td colspan="' + firstColspan + '" align="center">').text(""));
    Percentagerow.append($('<td colspan="' + firstSecoundcell + '" align="center">').text("Total Presents of Boys"));
    Percentagerow.append($('<td colspan="' + SecoundSecoundcell + '" align="center">').text("Total Presents of Girls"));
    Percentagerow.append($('<td colspan="' + Thirdsecoundcell + '" align="center">').text("Total Presents"));
    Percentagerow.append($('<td colspan="' + firstthirdcell + '" align="center">').text("Total Working Days for Boys"));
    Percentagerow.append($('<td colspan="' + Secoundthirdcell + '" align="center">').text("Total Working Days for Girls"));
    Percentagerow.append($('<td colspan="' + Thirdthirdcell + '" align="center">').text("Total Working Days"));
    Percentagerow.append($('<td colspan="' + firstfourthcell + '" align="center">').text("Attendance % of Boys"));
    Percentagerow.append($('<td colspan="' + Secoundfourthcell + '" align="center">').text("Attendance % of Girls"));
    Percentagerow.append($('<td colspan="' + Thirdfourthcell + '" align="center">').text("Attendance %"));

    tableBody.append(numberOfStudentsRow);
    tableBody.append(Percentagerow);

    var SummarydetailsRow = $('<tr>');
    var Summarydetails = attendancesummarydetails[0];
    SummarydetailsRow.append($('<td colspan="' + firstColspan +'" align="center">').text(Summarydetails.subclass));
    SummarydetailsRow.append($('<td colspan="' + firstSecoundcell + '" align="center">').text(Summarydetails.totalPresentofBoys));
    SummarydetailsRow.append($('<td colspan="' + SecoundSecoundcell + '" align="center">').text(Summarydetails.totalPresentofGirls));
    SummarydetailsRow.append($('<td colspan="' + Thirdsecoundcell + '" align="center">').text(Summarydetails.totalPresents));
    SummarydetailsRow.append($('<td colspan="' + firstthirdcell + '" align="center">').text(Summarydetails.totalWorkingdaysforBoys));
    SummarydetailsRow.append($('<td colspan="' + Secoundthirdcell + '" align="center">').text(Summarydetails.totalWorkingdaysforGirls));
    SummarydetailsRow.append($('<td colspan="' + Thirdthirdcell + '" align="center">').text(Summarydetails.totalWorkingdays));
    SummarydetailsRow.append($('<td colspan="' + firstfourthcell + '" align="center">').text(Summarydetails.attendancepercentageofboys));
    SummarydetailsRow.append($('<td colspan="' + Secoundfourthcell + '" align="center">').text(Summarydetails.attendancepercentageofgirls));
    SummarydetailsRow.append($('<td colspan="' + Thirdfourthcell + '" align="center">').text(Summarydetails.attendancepercentage));

    tableBody.append(SummarydetailsRow);  


    loaddingimg.css('display', 'none');
}







///*--==  Attendance Report Print ==--*/
//$(document).on('click', '#Attendancereporttblmain #_attendancereportPrint', function (event) {
//    debugger;
//    var printContents = $('#Printattendancereport').html();
//    var originalContents = document.body.innerHTML;
//    document.body.innerHTML = printContents;
//    window.print();
//    document.body.innerHTML = originalContents;
//});



///*--== Attendance Report Export To Excel ==-*/
//$(document).on('click', '#_AttendancereportExportExcel', function () {
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

   


//          //var tableData1 = document.getElementById("FirstTable");
//    var tableData2 = document.getElementById("StudentwiseattendaceReport");
//          //var tableData3 = document.getElementById("StaffLeaveThirdtable");
//          //var tabedata1length = tableData1.rows.length + tableData2.rows.length + 7;
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
//         debugger;
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
//        link.download = "SectionwiseAttendanceReport.xls";

//        // Append the link to the document and trigger the click event
//        document.body.appendChild(link);
//        link.click();

//        // Remove the link from the document
//        document.body.removeChild(link);
//    });
//});




function extractBackgroundColor(html) {
    var match = /background-color\s*:\s*([^;]+);/i.exec(html);
    return match ? match[1] : 'ffffff'; // Default color if not found
}
