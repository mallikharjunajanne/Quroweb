
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



$(document).ready(function () {

    //CommonDropdownFunction("GET", "/Attendance/DepartmentsDropdown_Caliingfunction", "DdlDepartment", null, false)
   
    fetchDataAndPopulateDropdown(
        '/Reports/Sectionwisedepartment',         // URL for data fetching
        '#DdlDepartment',                         // Dropdown selector
        'instanceClassificationId',               // Field name for option values
        'classificationName',                     // Field name for option text
        'manageClassification'                    // Response value return class name
    );

});




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



/*============**********   CLASS WISE & STUDENT WISE ATTENDANCE REPORT   **********==============*/

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
    Departmentbysubclass(selectedValues);
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
            dropdown.empty();
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
    debugger;
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
    //dropdown.append($('<option>', {
    //    value: '',
    //    text: '---Select---'
    //}));
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

        $('#Main_Span_Error').text('');
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
                    var responsemessage = response.message;
                    if (responsemessage != "Attendance is not posted") {

                   

                    var Tabledatarepsonse = response.attendancemonthreports;
                    var attendancesummarydetails = response.attendancemonthpercantage;

                    // Classwisesectionwiseattendancereportbinddata(response);
                    var fromDate = new Date(document.getElementById('Startdatetxt').value);
                    var toDate = new Date(document.getElementById('Enddatetxt').value);

                     /*   var ClassselectedText = $('#DdlClass option:selected').text();*/
                        var ClassselectedText = $('#DdlClass option:selected').map(function () {
                            return $(this).text();
                        }).get().join(', ');
                        var formattedFromDate = fromDate.toLocaleDateString('en-US');
                        var formattedToDate = toDate.toLocaleDateString('en-US');
                        $('#Selectedepartmentspid').text(ClassselectedText);
                        $('#Fromdatespid').text(formattedFromDate);
                        $('#Enddatespid').text(formattedToDate);

                
                    //    var labelElement = $('<label>').text('Quro Schools');
                    //var headingText = "Attendance for the Classes " + ClassselectedText + " for the period of " + formattedFromDate + " To " + formattedToDate;
                    //$('#Selectedclassnamesdiv').append($('<h6>').append(labelElement));
                    //$('#Selectedclassnamesdiv').append($('<h6>').text(headingText));



                    var table = $('#SectionwiseattendaceReport').length;
                    var tblhead = $('#tablehead');
                    var tableBody = $('#tableBody');
                    var tablefooter = $('#tablefooter');

                    var currentDate = new Date(fromDate);
                    var firstRow = `<tr>
                                      <td rowspan="2" align="center" style="border: 1px solid black;">S.No.</td>
                                      <td rowspan="2" align="center" style="border: 1px solid black;">Class</td>
                                      <td rowspan="2" align="center" style="border: 1px solid black;">Name</td>
                                      <td rowspan="2" align="center" style="border: 1px solid black;">Adm.No.</td>
                                      <td rowspan="2" align="center" style="border: 1px solid black;">Gender</td>
                                      <td  align="center" style="border: 1px solid black;">Date</td>`;
                    var daysInMonth = 0;
                    while (currentDate <= toDate) {
                        var currentMonth = currentDate.toLocaleString('en', { month: 'short' });
                        var currentDay = currentDate.getDate();
                        firstRow += `<td align="center" style="border: 1px solid black;">${currentDay}-${currentMonth}</td>`;

                        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
                        daysInMonth++;
                    }
                        firstRow += `<td  align="center" style="border: 1px solid black;">Total days present</td>
                 <td align="center" style="border: 1px solid black;">Working days</td>
                 </tr>`;
                    var secondRow = '<tr>' +

                        `<td align="center" style="border: 1px solid black;">DOJ/DOW</td>` + // Date column below Name
                        `<td colspan="${daysInMonth + 2}" align="center" style="border: 1px solid black;"></td>` +
                        '</tr>';

                    tblhead.append(firstRow);
                    tblhead.append(secondRow);
                    tableBody.empty();


                        var rowCount = Tabledatarepsonse.length;
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
                        $('<td style="border: 1px solid black;">').text(i + 1).prependTo(tableRow);
                        tableRow.append($('<td style="border: 1px solid black;">').text(rowData.subclassificationName));
                        tableRow.append($('<td style="border: 1px solid black;">').text(rowData.name));
                        tableRow.append($('<td style="border: 1px solid black;">').text(rowData.admissionNumber));
                        tableRow.append($('<td style="border: 1px solid black;">').text(rowData.gender));
                        tableRow.append($('<td style="border: 1px solid black;">').text(rowData.dateOfJoining));
                        ///NEW CODE
                        dynamicColumns.forEach(function (columnValue, index) {
                            // Count the occurrences of <br> tags in the columnValue                                
                            if (index > 0) {
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



                        ///OLD CODE
                        //for (var index = 0; index <= daysInMonth; index++) {
                        //    var columnValue = dynamicColumns[index];
                        //    var cellHtml;

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

                        //    tableRow.append($(cellHtml));
                        //}

                        /*tableRow.append($('<td align="center" style="border: 1px solid black;">').text(dynamicColumns[daysInMonth + 1]));*/

                        tableBody.append(tableRow);
                        rowCount++;
                    }



                    var trElement = tableBody.find('tr:first');
                    var tdCount = trElement.find('td').length;
                    var SummaryRow = $('<tr>');
                        SummaryRow.append($('<td colspan="' + tdCount + '" align="center" style="border: 1px solid black;">').text('Summary').css('text-align', 'center'));
                    tableBody.append(SummaryRow);



                    var colspancounts = tdCount / 4;
                    var firstColspan = Math.floor(colspancounts);
                    var remainingCols = tdCount - firstColspan;

                    var secondColspan = Math.floor(remainingCols / 3); // Dividing the remaining columns into 3 parts
                    var thirdColspan = Math.floor(remainingCols / 3);
                    var fourthColspan = remainingCols - secondColspan - thirdColspan; // Calculating the fourth colspan

                        var numberOfStudentsRow = '<tr>' + `<td  colspan="${firstColspan}" align="center" style="border: 1px solid black;">Class</td>
                               <td  colspan="${secondColspan}" align="center" style="border: 1px solid black;">Presents</td>
                               <td  colspan="${thirdColspan}" align="center" style="border: 1px solid black;">Working Days</td>
                               <td  colspan="${fourthColspan}" align="center" style="border: 1px solid black;">Attendance %</td>
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
                        Percentagerow.append($('<td colspan="' + firstColspan + '" align="center" style="border: 1px solid black;">').text(""));
                        Percentagerow.append($('<td colspan="' + firstSecoundcell + '" align="center" style="border: 1px solid black;">').text("Total Presents of Boys"));
                        Percentagerow.append($('<td colspan="' + SecoundSecoundcell + '" align="center" style="border: 1px solid black;">').text("Total Presents of Girls"));
                        Percentagerow.append($('<td colspan="' + Thirdsecoundcell + '" align="center" style="border: 1px solid black;">').text("Total Presents"));
                        Percentagerow.append($('<td colspan="' + firstthirdcell + '" align="center" style="border: 1px solid black;">').text("Total Working Days for Boys"));
                        Percentagerow.append($('<td colspan="' + Secoundthirdcell + '" align="center" style="border: 1px solid black;">').text("Total Working Days for Girls"));
                        Percentagerow.append($('<td colspan="' + Thirdthirdcell + '" align="center" style="border: 1px solid black;">').text("Total Working Days"));
                        Percentagerow.append($('<td colspan="' + firstfourthcell + '" align="center" style="border: 1px solid black;">').text("Attendance % of Boys"));
                        Percentagerow.append($('<td colspan="' + Secoundfourthcell + '" align="center" style="border: 1px solid black;">').text("Attendance % of Girls"));
                        Percentagerow.append($('<td colspan="' + Thirdfourthcell + '" align="center" style="border: 1px solid black;">').text("Attendance %"));
                         
                    tableBody.append(numberOfStudentsRow);
                    tableBody.append(Percentagerow);

                    debugger;

                 
                        if (attendancesummarydetails.length > 0) {
                            debugger;
                        for (var i = 0; i < attendancesummarydetails.length; i++) {
                            var summaryDetails = attendancesummarydetails[i];
                            var SummarydetailsRow = $('<tr>');
                            SummarydetailsRow.append($('<td colspan="' + firstColspan + '" align="center" style="border: 1px solid black;">').text(summaryDetails.subclass));
                            SummarydetailsRow.append($('<td colspan="' + firstSecoundcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.totalPresentofBoys));
                            SummarydetailsRow.append($('<td colspan="' + SecoundSecoundcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.totalPresentofGirls));
                            SummarydetailsRow.append($('<td colspan="' + Thirdsecoundcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.totalPresents));
                            SummarydetailsRow.append($('<td colspan="' + firstthirdcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.totalWorkingdaysforBoys));
                            SummarydetailsRow.append($('<td colspan="' + Secoundthirdcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.totalWorkingdaysforGirls));
                            SummarydetailsRow.append($('<td colspan="' + Thirdthirdcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.totalWorkingdays));
                            SummarydetailsRow.append($('<td colspan="' + firstfourthcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.attendancepercentageofboys));
                            SummarydetailsRow.append($('<td colspan="' + Secoundfourthcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.attendancepercentageofgirls));
                            SummarydetailsRow.append($('<td colspan="' + Thirdfourthcell + '" align="center" style="border: 1px solid black;">').text(summaryDetails.attendancepercentage));
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
                    }
                    else {
                        $('#Appendsclasswiseandstudentwiseattendancereportdiv').empty();
                        $('#Main_Span_Error').text('Attendance is not Posted for the selected criteria');
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


/*--==  Attendance Report Print ==--*/
//$(document).on('click', '#Attendancereporttblmain #_attendancereportPrint', function (event) {
//    debugger;
//    var printContents = $('#Printattendancereport').html();
//    var originalContents = document.body.innerHTML;
//    document.body.innerHTML = printContents;
//    window.print();
//    document.body.innerHTML = originalContents;
//});


$('#_attendancereportPrint').on('click', function () {
    var printContents = $('#Printattendancereport').html();
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

$('#Reporttblexporttoexcel, #_AttendancereportExportExcel').on('click', function () {
    debugger;
    var className = $('#DdlClass option:selected').map(function () {return $(this).text();}).get().join(', ');
    var Selectedfromdate = document.getElementById("Enddatespid").textContent;
    var Selectedenddate = document.getElementById("Fromdatespid").textContent;

    var headerContent = `
            <div style="display: grid; grid-template-columns: repeat(18, 1fr);">
                <div style="grid-column: 1 / span 18;">
                     <h4 style="margin: 0; text-align: center;">Quro Schools</h4>
                     <p style="margin: 0; text-align: center;">Attendance for the Classes ${className} for the period of${Selectedfromdate} To ${Selectedenddate}</p>
                </div>
            </div>`;

    var table1 = document.getElementById("SectionwiseattendaceReport");
    var table1Clone = table1.cloneNode(true);
    var clonedThead = table1Clone.querySelector("thead");

    var cells = table1.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        debugger;
        if (cells[i].style.display === "none") { // Check if the td element has the hidden attribute       
            debugger;
            cells[i].remove();
        } else {          
         cells[i].style.borderTop = "1px solid black";       
        }
    }

    var FooterContent = `
      <div style="grid-column: 1 / span 18; background-color: #e0e0e0; padding: 20px; border-radius: 5px;">
        <p style="margin: 0; text-align: center;">This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized use, copying, or distribution of this report is strictly prohibited.</p>
      </div>
      `;
    document.body.appendChild(table1Clone);
    var combinedHtml = headerContent + table1Clone.outerHTML + FooterContent;

    const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
    saveAs(blob, 'SectionwiseAttendanceReport.xls');

    // Replace the original table with the cloned table in the document
    table1.parentNode.replaceChild(table1Clone, table1);     
});
