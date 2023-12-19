


//--------------------------  Getting the Year and Month Dropdowns
$(document).ready(function () {

    // Get the current date
   // var currentDate = new Date();
   // var currentMonth = currentDate.getMonth() + 1;
   // var currentYear = currentDate.getFullYear();
    $("#Serach_StaffLeaveReport #dropdown_staff_Start_Month").val(1);
    $("#Serach_StaffLeaveReport #dropdown_staff_End_Month").val(1);

})

//================================   Click On Search

$("#Serach_StaffLeaveReport").submit(function (event) {
    event.preventDefault();
    debugger;
    // alert("hii");
    // $(".errorofallemployeeattendence").text("");

    loaddingimg.css('display', 'block');
    var Attendanceformdata = $(this).serialize();

    var formElement = document.getElementById('Serach_StaffLeaveReport');
    var Frommonth = $("#Serach_StaffLeaveReport #dropdown_staff_Start_Month").val();
    var Tomonth = $("#Serach_StaffLeaveReport #dropdown_staff_End_Month").val();
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
      
        var validationmelength = validationMessages.length;
       
        if (validationmelength == 0) {
            if (Frommonth <= Tomonth) {

                CommonAjaxFunction('GET', '/Rolewise/StaffLeaveSearch', null, function (response) { $("#appendstaffsearchLeave").html(response); $("#appendstaffsearchLeave").css('display', 'block'); searchManageStaffLeave(Attendanceformdata); }, function (status, error) {
                    loaddingimg.css('display', 'none');
                }, false);

            }
            else {
                $('.alert-danger p').text("From Month is Greater than ToMonth");
                $(".alert-danger").show().delay(6000).fadeOut()
            }
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
        
    }, 50);
    loaddingimg.css('display', 'none');

})


//============================================  Data Append To Datatable


function searchManageStaffLeave(data) {

    loaddingimg.css('display', 'block');
    CommonAjaxFunction('POST', '/Rolewise/StaffMonthlyLeaveReport', data, function (response) { bindDatatableSA(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableSA(response) {

        debugger;
        loaddingimg.css('display', 'block');
        $("#totalrecords_Tranctions_StaffLeave").text(response.length);
        $('#tblStaffLeavesearchresults tbody tr').remove();
        var table = $('#tblStaffLeavesearchresults tbody');
        if (response.length != 0) {
            $("#FirstTable #firsttable_Department").text(response[0].classificationName);
            $("#FirstTable #firsttable_Employeename").text(response[0].firstName);
            $("#FirstTable #firsttable_Employeeeid").text(response[0].instanceUserCode);
            var count = 1;

            for (var i = 0; i < response.length; i++) {

                var tabletr = '<tr>';
                tabletr +="<td>" +count+"</td>";
                tabletr +="<td>" +response[i].attendanceMonth+"</td>";
                for (var j = 0; j < response[i].columns.length; j++) {
                    tabletr += response[i].columns[j];
                }
                table.append(tabletr+"</tr>");
                count++;
            }
            $("#_staffLeavePrint").css('display', 'block');
            $("#_staffLeaveExportExcel").css('display', 'block');
            loaddingimg.css('display', 'none');
        }

        else {

            $("#_staffLeavePrint").css('display', 'none');
            $("#_staffLeaveExportExcel").css('display', 'none');
            loaddingimg.css('display', 'none');
        }

    }

}




//==================================================    Change Departmentto get Employee Details

$(document).on('change', '#Serach_StaffLeaveReport #dropdown_instanceclassficationstaffLeave', function (event) {
    event.stopImmediatePropagation();

    loaddingimg.css('display', 'block');
    var formid = $('#Serach_StaffLeaveReport');

    var extraparameters = [];
    extraparameters.push($(formid).find("#InstanceidforSMLR").val());
    extraparameters.push($(this).val());
    var data = {
        methodname: 'GetEmployeeDetails',
        text: "FirstName",
        value: "UserId",
        Parameters: extraparameters
    };
    CommonDropdownAjaxFunction("dropdown_staff_Userid", "POST", "/Rolewise/CommonDropdown", data, function (responce) {
        loaddingimg.css('display', 'none');
    }, true);
   
})



//================================  Excel

//=============================================================================  Export Excel  (Staff Leave  Report)


$(document).on('click', '#_staffLeaveExportExcel', function () {
    var formattedDate = GetDateFormat();

    // Create a new workbook
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Sheet1');

    // Additional titles
    worksheet.addRow(["Leave Report"]).font = { bold: true };
    worksheet.addRow(["Quro Schools"]).font = { bold: true };
    worksheet.addRow(["Report On:  " + formattedDate]).font = { bold: true };
    worksheet.addRow([""]).font = { bold: false };

    // Set background color for titles
    worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A2').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A3').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A4').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A1').font = { size: 14, bold: true, color: { argb: '000000' } }; // Adjust the size as needed
    worksheet.getCell('A2').font = { size: 14, bold: true, color: { argb: '000000' } };
    worksheet.getCell('A3').font = { size: 14, bold: true, color: { argb: '000000' } };
   



    // Merge cells for titles and center-align
    worksheet.mergeCells('A1:AG1');
    worksheet.mergeCells('A2:AG2');
    worksheet.mergeCells('A3:AG3');
    worksheet.mergeCells('A4:AG4');

    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('B2').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('C3').alignment = { horizontal: 'center', vertical: 'center' };

    //worksheet.getCell('G5').alignment = { horizontal: 'right', vertical: 'right' };
    //worksheet.getCell('G6').alignment = { horizontal: 'right', vertical: 'right' };
    //worksheet.getCell('G7').alignment = { horizontal: 'right', vertical: 'right' };

    // Add the original table data to the worksheet starting from the 4th row
    var tableData1 = document.getElementById("FirstTable");
    var tableData2 = document.getElementById("tblStaffLeavesearchresults");
    var tableData3 = document.getElementById("StaffLeaveThirdtable");
    var tabedata1length = tableData1.rows.length +tableData2.rows.length + 7;
    // Loop through rows
    //==============================================  For Table 1

    worksheet.mergeCells('A5:F5');
    worksheet.mergeCells('G5:R5');
    worksheet.mergeCells('S5:AC5');
    worksheet.mergeCells('AD5:AG5');

    worksheet.mergeCells('A6:F6');
    worksheet.mergeCells('G6:R6');
    worksheet.mergeCells('S6:AC6');
    worksheet.mergeCells('AD6:AG6');

    worksheet.mergeCells('A7:F7');
    worksheet.mergeCells('G7:R7');
    worksheet.mergeCells('S7:AC7');
    worksheet.mergeCells('AD7:AG7');
  
    for (var i = 0; i < tableData1.rows.length; i++) {
       // debugger;
        var row = tableData1.rows[i];
      //  var rowData = [];
        // Loop through cells
       // rowData.push("");
       // for (var j = 0; j < row.cells.length; j++) {
            worksheet.getCell('A' + (i + 5)).value = "";
            worksheet.getCell('G' + (i + 5)).value = row.cells[0].innerText;
            worksheet.getCell('S' + (i + 5)).value = row.cells[1].innerText;
            
         //   rowData.push(row.cells[j].innerText);
       // }


       // var addedRow = worksheet.addRow(rowData);
    }

    const cellsToAlign = ['G5', 'G6', 'G7'];

    cellsToAlign.forEach(cellAddress => {
        worksheet.getCell(cellAddress).alignment = { horizontal: 'right', vertical: 'right' };
        worksheet.getCell(cellAddress).font = { size: 12, bold: true, color: { argb: '000000' } };
    });

    worksheet.getCell('G5').border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
    };

    worksheet.getCell('G6').border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
    };

    worksheet.getCell('G7').border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
    };
    worksheet.getCell('S5').border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
    };

    worksheet.getCell('S6').border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
    };

    worksheet.getCell('S7').border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } }
    };



    

    worksheet.addRow([""]).font = { bold: false };  ///  gap between two tables
    worksheet.mergeCells('A8:AG8');

    //============================         For Table 2

    for (var i = 0; i < tableData2.rows.length; i++) {
       // debugger;
        var row = tableData2.rows[i];
        var rowData = [];
        for (var j = 0; j < row.cells.length; j++) {
          //  rowData.push(row.cells[j].innerText);
            var cellHtml = row.cells[j].outerHTML;
            var backgroundColor = extractBackgroundColor(cellHtml);
            var color = "000000";
            if (backgroundColor == "Red") {
                backgroundColor = "FF0000";
                color = "ffffff";
            }
            else if (backgroundColor == "Green") {
                backgroundColor = "008000"; color = "ffffff";
            }else if (backgroundColor == "Blue") {
                backgroundColor = "0000FF"; color = "ffffff";
            } else if (backgroundColor == "orange") {
                backgroundColor = "FFA500"; color = "ffffff";
            } else if (backgroundColor == "yellow") {
                backgroundColor = "FFFF00"; color = "ffffff";
            } else if (backgroundColor == "Gray") {
                backgroundColor = "808080"; color = "ffffff";
            }
            var cellText = row.cells[j].innerText;
            var cellStyles = {
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: backgroundColor } },
                font: { bold: true, color: { argb: color } } // Assuming white text color
            };

            rowData.push({ text: cellText, style: cellStyles });
        }
        var addedRow = worksheet.addRow(rowData.map(cell => cell.text));

        addedRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
            var cellStyle = rowData[colNumber - 1].style;
            cell.fill = cellStyle.fill;
            cell.font = cellStyle.font;
        });

        addedRow.eachCell({ includeEmpty: true }, function (cell) {
            cell.border = {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } }
            };
           // cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Text alignment

        });



    }

   

    worksheet.addRow([""]).font = { bold: false };



    //============================         For Table 3

    for (var i = 0; i < tableData3.rows.length; i++) {
        debugger;
       //  worksheet.mergeCells('A' + tabedata1length + ':C' + tabedata1length);
       // worksheet.getCell('A' + tabedata1length).alignment = { horizontal: 'center', vertical: 'center' };
        var row = tableData3.rows[i];
        var rowData = [];
        for (var j = 0; j < row.cells.length; j++) {
            var cellHtml = row.cells[j].outerHTML;
            var backgroundColor = extractBackgroundColor(cellHtml);
            if (backgroundColor == "Red") {
                backgroundColor = "FF0000";
            }
            else if (backgroundColor == "Green") {
                backgroundColor = "008000";
            } else if (backgroundColor == "Blue") {
                backgroundColor = "0000FF";
            } else if (backgroundColor == "orange") {
                backgroundColor = "FFA500";
            } else if (backgroundColor == "yellow") {
                backgroundColor = "FFFF00";
            } else if (backgroundColor == "Gray") {
                backgroundColor = "808080";
            }
            var cellText = row.cells[j].innerText;
            var cellStyles = {
                fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: backgroundColor } },
                font: { bold: true, color: { argb: '000000' } } // Assuming white text color
            };

            rowData.push({ text: cellText, style: cellStyles });
        }
        var addedRow = worksheet.addRow(rowData.map(cell => cell.text));

        addedRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
            var cellStyle = rowData[colNumber - 1].style;
            cell.fill = cellStyle.fill;
            cell.font = cellStyle.font;
        });

          //worksheet.mergeCells('A' + tabedata1length + ':C' + tabedata1length);
        //worksheet.getCell('A' + tabedata1length).alignment = { horizontal: 'center', vertical: 'center' };

        tabedata1length++;

    }

    //worksheet.mergeCells('A11:AG11');
    //worksheet.mergeCells('C12:AG12');
    //worksheet.mergeCells('C13:AG13');
    //worksheet.mergeCells('C14:AG14');
    //worksheet.mergeCells('C15:AG15');
    //worksheet.mergeCells('C16:AG16');
    //worksheet.mergeCells('C17:AG17');

    worksheet.addRow([""]).font = { bold: false };  //  Gap Between Second table and below data
    worksheet.addRow(["This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized"]).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDEB887' } };

    // Set column widths
    for (var col = 3; col <= 34; col++) {
        worksheet.getColumn(col).width = 5; // Set the width as needed
    }
    worksheet.getColumn(1).width = 12;
    worksheet.getColumn(2).width = 20;
   // worksheet.getColumn(3).width = 17;
   // worksheet.getColumn(4).width = 9;
    // Generate .xls file
    workbook.xlsx.writeBuffer().then(function (buffer) {
        var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a download link
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the file name
        link.download = "Staff Monthly LeaveReport.xls";

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    });
});

function extractBackgroundColor(html) {
    var match = /background-color\s*:\s*([^;]+);/i.exec(html);
    return match ? match[1] : 'ffffff'; // Default color if not found
}



//==================================================  Print
//=============================================================================  Click On Print ( for staff Attendance Report)


$(document).on('click', '#_staffLeavePrint', function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var formattedDate = GetDateFormat();

    //debugger;
    var tabledata1 = document.getElementById("FirstTable");
    var tabledata2 = document.getElementById("tblStaffLeavesearchresults");
    //var tabledata3 = document.getElementById("StaffLeaveThirdtable");





    // var tabledata2 = document.getElementById("ctl00_ContentPlaceHolder1_tblBusInfo");
    var printContent = '</body></html><table width="100%" align="center" style="text-align:center;"><tbody><tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; ">Leave Report</td></tr>' +
        '<tr><td colspan="34" align="center" style="background-color:Lightgray; color: Black; "><b><u>Quro Schools</u></b></td></tr>' +
        '<tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; "> Report On : ' + formattedDate + '</td></tr>' +
        '<tr><td colspan="34"></td></tr>' +
        '<tr><td colspan="34">';
        //for (var i = 0; i < tabl1.rows.length; i++) {
    //==============================================================  Adding First Table
    printContent += '<table border="1" style="margin-left: 42%;"><tbody><tr><td align="Right"><b>Department:</b></td><td align="Left">' + tabledata1.rows[0].cells[1].innerText + '</td></tr><tr><td align="Right"><b>Employee Name:</b></td><td align="Left">' + tabledata1.rows[1].cells[1].innerText + ' </td></tr><tr><td align="Right"><b>Employee Id:</b></td><td align="Left">' + tabledata1.rows[2].cells[1].innerText + '</td></tr></tbody></table>';
    //}


    printContent += '<tr></tr><table width = "100%" border="1"> <tbody><tr>' +
        '<th><b>S.No</b> </th><th><b>AttendanceMonth</b></th>';
    for (var i = 1; i <= 31; i++) {
        printContent += '<th> <b>' + i + '</b></th>';
    }

    printContent += '</tr >';
    for (var i = 1; i < tabledata2.rows.length; i++) {
        printContent += '<tr>';
        var row = tabledata2.rows[i];
        for (var j = 0; j < row.cells.length; j++) {
            var cellHtml = row.cells[j].outerHTML;
            var backgroundColor = extractBackgroundColor(cellHtml);
            if (j >= 0 && j <= 1) {
                printContent += '  <td style="background-color:white"><font color="black">' + row.cells[j].innerText + '</font></td>';

            }
            else {
                printContent += '  <td style="background-color:' + backgroundColor + '"><font color="white">' + row.cells[j].innerText + '</font></td>';

            }
        }
        printContent += '</tr>';
    }
    printContent += '</tbody></table></td></tr><tr><td></td></tr>';
    printContent += '<table><tbody><tr><td align="Right"><b>Present :</b></td><td align="Left" style="background-color:Green;">&nbsp;&nbsp;&nbsp;</td></tr><tr><td align="Right"><b>On Duty :</b></td><td align="Left" style="background-color:Gray;">&nbsp;</td></tr><tr><td align="Right"><b>Short Leave :</b></td><td align="Left" style="background-color:yellow;">&nbsp;</td></tr><tr><td align="Right"><b>Half Day :</b></td><td align="Left" style="background-color:orange;">&nbsp;</td></tr><tr><td align="Right"><b>School Leave :</b></td><td align="Left" style="background-color:Blue;">&nbsp;</td></tr><tr><td align="Right"><b>Full Day :<b></b></b></td><td align="Left" style="background-color:Red;"></td></tr></tbody></table>';
   
    printContent += '<div colspan="34" align="center" style="background-color:Lightgray;color:Black;">This is a system generated report contains confidential information intended for a specific individual and a purpose.  Any unauthorized use, copying, or distribution of this report is strictly prohibited.</div>';
  //  printContent += '</tbody></table></body></html>';
 //   printContent += '</tr>';

    var printWindow = window.open("", "_blank");
    printWindow.document.open();
    //  printWindow.document.write("<html><head><title>Simple Expense  </title></head><body><h3 style='margin-left:28%;padding: 4px;text-decoration: underline;'>Simple Expense Management Voucher</h3>");

    printWindow.document.write(printContent);
    // printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
})




