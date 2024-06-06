

//--------------------------  Getting the Year and Month Dropdowns
$(document).ready(function () {
   
    // Get the current date
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    $("#Serach_Staffregister #dropdown_staff_month").val(currentMonth);
    $("#Serach_Staffregister #dropdown_staff_Year").val(currentYear);
   

})



$("#Serach_Staffregister").submit(function (event) {
    event.preventDefault();
    //debugger;
    // alert("hii");
   // $(".errorofallemployeeattendence").text("");

    loaddingimg.css('display', 'block');
  var  Attendanceformdata = $(this).serialize();

    var formElement = document.getElementById('Serach_Staffregister');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        //var validationMessages2 = formElement.getElementsByClassName('error2');
        var validationmelength = validationMessages.length;
        if (validationmelength == 0) {

            CommonAjaxFunction('GET', '/Rolewise/StaffattendanceSearch', null, function (response) { $("#appendstaffsearchatendance").html(response); $("#appendstaffsearchatendance").css('display', 'block');    searchManageStaffRegister(Attendanceformdata); }, function (status, error) {
                loaddingimg.css('display', 'none');
            }, false);




           
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
    }, 50);
    loaddingimg.css('display', 'none');

})


//============================================  Data Append To Datatable


function searchManageStaffRegister(data) {

    loaddingimg.css('display', 'block');
    CommonAjaxFunction('POST', '/Rolewise/StaffAttendanceRegister', data, function (response) { bindDatatableSA(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableSA(response) {

        debugger;

        var table = $('#tblStaffattendancesearchresults').DataTable();
        table.destroy();
        $("#tblStaffattendancesearchresults thead tr th:gt(3)").remove();

        for (var valdat = 1; valdat <= 31; valdat++ ) {
            
            $("#tblStaffattendancesearchresults thead tr").append("<th>" + valdat + "</th>");
           
        }

        $("#totalrecords_Tranctions_StaffA").text(response.length);
        if (response.length != 0) {
            //$("#_staffattendancePrint").css('display', 'block');           
            //$("#_staffattendanceExportExcel").css('display', 'block');
            $("#totalrecords_Tranctions_StaffA").text(response.length);
         var   newTableMA = $("#tblStaffattendancesearchresults").DataTable({
                dom: 'Bfrtip',
                buttons: [],

             bProcessing: false,
             bLengthChange: true,
             bfilter: false,
             bSort: false,
             searching: false,
             paging: false,
             bPaginate: false,
                data: response,
                columns: [


                    {
                        targets: 1, // Assuming this is the column index where you want to display numbering
                        render: function (data, type, row, meta) {
                            var currentPage = table.page.info().page;
                            var rowsPerPage = table.page.info().length;
                            return (0 * rowsPerPage) + meta.row + 1;
                        }
                    }, {
                        data: "Name",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.name

                        }
                    },

                    {
                        data: "Month",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.month


                        }
                    }, {
                        data: "Year",

                        render: function (data, type, row, meta) {
                           
                            return row.year


                        }
                    },
                    ...Array.from({ length: 31 }, (_, k) => ({
                        data: "Columns",
                        render: function (data, type, row, meta) {
                            return row.columns[k]
                        }
                    }))


                ]


            });
            try {
               // newTableMA.column(0).order('asc').draw();
                  }
            catch {
            }

            loaddingimg.css('display', 'none');
        }
        else {
            $("#_staffattendancePrint").css('display', 'none');
            $("#_staffattendanceExportExcel").css('display', 'none');
            loaddingimg.css('display', 'none');
        }

    }

}

//==================================================    Change Payroll category

$(document).on('change', '#Serach_Staffregister #dropdown_staff_PayrollCategory', function (event) {
    event.stopImmediatePropagation();
   
    loaddingimg.css('display', 'block');
    var formid = $('#Serach_Staffregister');
   
    var extraparameters = [];
    extraparameters.push($(formid).find("#InstanceidforSAR").val());
    extraparameters.push($(this).val());
    var data = {
        methodname: 'GetPayRollSubCategory',
        text: "PayrollSubCategoryName",
        value: "PayrollSubCategoryId",
        Parameters: extraparameters
    };
    CommonDropdownAjaxFunction("dropdown_staff_PayRollSubCategory", "POST", "/Rolewise/CommonDropdown", data, function (responce) {
        loaddingimg.css('display', 'none');
    }, false);

})

//=====================================================  Change LMS category

$(document).on('change', '#Serach_Staffregister #dropdown_staff_LMSCategory', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');

    var formid = $('#Serach_Staffregister');
    var extraparameters = [];
    extraparameters.push($(formid).find("#InstanceidforSAR").val());

    extraparameters.push($(this).val());


    var data = {
        methodname: 'GetLMSsubCategory',
        text: "PayrollSubCategoryName",
        value: "PayrollSubCategoryId",
        Parameters: extraparameters
    };
    CommonDropdownAjaxFunction("dropdown_staff_LMSSubCategory", "POST", "/Rolewise/CommonDropdown", data, function () {
        loaddingimg.css('display', 'none');
    }, false);

})
//================================  Excel

//=============================================================================  Export Excel  (Staff Attendance Posting)


$(document).on('click', '#_staffattendanceExportExcel', function () {
    var formattedDate = GetDateFormat();

    // Create a new workbook
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Sheet1');

    // Additional titles
    worksheet.addRow(["Attendance Register"]).font = { bold: true };
    worksheet.addRow(["Quro Schools"]).font = { bold: true };
    worksheet.addRow(["Report On:  "+formattedDate]).font = { bold: true };
    worksheet.addRow([""]).font = { bold: false };

    // Set background color for titles
    worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A2').fill = {  type: 'pattern', pattern: 'gray125'   };
    worksheet.getCell('A3').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A4').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A1').font = { size: 14, bold: true, color: { argb: '000000' } }; // Adjust the size as needed
    worksheet.getCell('A2').font = { size: 14, bold: true, color: { argb: '000000' }};
    worksheet.getCell('A3').font = { size: 14, bold: true, color: { argb: '000000' } };
  //  worksheet.getCell('A5').font = {bold: true, color: { argb: '000000' } };

   // worksheet.getCell('A5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'deb887' } };
  


    // Merge cells for titles and center-align
    worksheet.mergeCells('A1:AI1');
    worksheet.mergeCells('A2:AI2');
    worksheet.mergeCells('A3:AI3');
    worksheet.mergeCells('A4:AI4');
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A3').alignment = { horizontal: 'center', vertical: 'center' };

    // Add the original table data to the worksheet starting from the 4th row
    var tableData = document.getElementById("tblStaffattendancesearchresults");
    var tableData2 = document.getElementById("ctl00_ContentPlaceHolder1_tblBusInfo");
    var tabedata1length = tableData.rows.length+6;
    // Loop through rows
    for (var i = 0; i < tableData.rows.length; i++) {
        //debugger;
        var row = tableData.rows[i];
        var rowData = [];
        // Loop through cells
        for (var j = 0; j < row.cells.length; j++) {
            rowData.push(row.cells[j].innerText);
        }

       
        var addedRow = worksheet.addRow(rowData);
        if (i === 0) {
            addedRow.eachCell({ includeEmpty: true }, function (cell) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDEB887' } };
                cell.font = { bold: true, color: { argb: '000000' } };
            });
        }


        // Set borders for each cell in the added row
        addedRow.eachCell({ includeEmpty: true }, function (cell) {
            cell.border = {
                top: { style: 'thin', color: { argb: '000000' } },
                left: { style: 'thin', color: { argb: '000000' } },
                bottom: { style: 'thin', color: { argb: '000000' } },
                right: { style: 'thin', color: { argb: '000000' } }
            };
            cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Text alignment

        });
    }

    worksheet.addRow([""]).font = { bold: false };  ///  gap between two tables

    //============================         For Table 2

    for (var i = 0; i < tableData2.rows.length - 1; i++) {
        debugger;
        var row = tableData2.rows[i];
        var rowData = [];
        for (var j = 0; j < row.cells.length; j++) {
            rowData.push(row.cells[j].innerText);
        }
        var addedRow = worksheet.addRow(rowData);

        addedRow.eachCell({ includeEmpty: true }, function (cell) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDEB887' } };
            cell.font = { bold: true, color: { argb: '000000' } };
           

        });

        worksheet.mergeCells('A' + tabedata1length + ':C' + tabedata1length);
        worksheet.getCell('A'+tabedata1length).alignment = { horizontal: 'center', vertical: 'center' };

        tabedata1length++;
        i++;
    }

    worksheet.addRow([""]).font = { bold: false };  //  Gap Between Second table and below data
    worksheet.addRow(["This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized"]).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDEB887' } };

    // Set column widths
    for (var col = 5; col <= 35; col++) {
        worksheet.getColumn(col).width = 4; // Set the width as needed
    }
    worksheet.getColumn(1).width = 5;
    worksheet.getColumn(2).width = 31;
    worksheet.getColumn(3).width = 17;
    worksheet.getColumn(4).width = 9;
    // Generate .xls file
    workbook.xlsx.writeBuffer().then(function (buffer) {
        var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a download link
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the file name
        link.download = "Staff Attendance.xls";

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    });
});



//==================================================  Print
//=============================================================================  Click On Print ( for staff Attendance Report)


$(document).on('click', '#_staffattendancePrint', function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    var formattedDate = GetDateFormat();

    //debugger;
    var tabledata1 = document.getElementById("tblStaffattendancesearchresults");
   // var tabledata2 = document.getElementById("ctl00_ContentPlaceHolder1_tblBusInfo");
    var printContent = '</body></html><table width="100%" align="center" style="text-align:center"><tbody><tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; ">Attendance Register</td></tr>' +
        '<tr><td colspan="34" align="center" style="background-color:Lightgray; color: Black; "><b><u>Quro Schools</u></b></td></tr>' +
        '<tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; "> Report On : ' + formattedDate+'</td></tr>' +
        '<tr><td colspan="34"></td></tr>' +
        '<tr><td colspan="34"><table width="100%" align="center" cellspacing="0" cellpadding="0" style="text-align:left; border:1px solid #dfdfdf; font-size:10px; font-family: verdana, arial, helvetica, sans-serif; font-weight:normal;"><tbody><tr>' +
        '<th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">S.No</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">Name</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">Month</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">Year</th>';
    for (var i = 1; i <= 31; i++) {
      printContent+=  '<th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">'+i+'</th>';
        }

    printContent += '</tr >';
    for (var i = 1; i < tabledata1.rows.length; i++) {
        printContent += '<tr style="height:24px; border:1px solid #000000;">';
        var row = tabledata1.rows[i];
        for (var j = 0; j < row.cells.length; j++) {
            printContent += '<td style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">' + row.cells[j].innerText+'</td>';
           
        }
        printContent += '</tr>';
    }
    printContent += '</tbody></table></td></tr><tr><td colspan="2" align="left"></td></tr>';
    printContent += '<tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">P   : Present</td></tr><tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">H   : School Leave</td></tr>';
    printContent += '<tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">CL  : Casual Leave</td></tr><tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">ML  : Medical Leave </td></tr>';
    printContent += '<tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">LOP : Loss of pay  </td></tr><tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">EL  : Earned Leave  </td></tr>';
    printContent += '<tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">MAL : Maternity Leave </td></tr><tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">PTL : Paternity Leave</td></tr>';
    printContent += '<tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">PAL : Professional Advancement Leave</td></tr><tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">MAL : Maternity Leave </td></tr>';
    printContent += '<tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">PEL : Previous Earned Leaves</td></tr><tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">OD : ON Duty </td></tr>';
    printContent += '<tr><td colspan="2" align="center" style="background-color:Lightgray;color:Black; ">SL : Short Leave  </td></tr><tr></tr><tr><td colspan="34" align="center"></td></tr>';
    printContent += '<tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black;">This is a system generated report contains confidential information intended for a specific individual and a purpose.  Any unauthorized use, copying, or distribution of this report is strictly prohibited.</td></tr>';
    printContent += '</tbody></table></body></html>';
    printContent += '</tr>';

    var printWindow = window.open("", "_blank");
    printWindow.document.open();
  //  printWindow.document.write("<html><head><title>Simple Expense  </title></head><body><h3 style='margin-left:28%;padding: 4px;text-decoration: underline;'>Simple Expense Management Voucher</h3>");

    printWindow.document.write(printContent);
   // printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
})




//Clear Button function adding by arjun
function clearForm(formId) {
    debugger;
    var form = document.getElementById(formId);
    if (form) {
        form.reset(); // Reset the form elements
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });
        $('#dropdown_staff_month-error').text('');
        $('#dropdown_staff_Year-error').text('');
        $('#appendstaffsearchatendance').empty();
        $('#dropdown_staff_PayRollSubCategory').empty();
        $('#dropdown_staff_LMSSubCategory').empty();

    }
}

$('#dropdown_staff_PayRollSubCategory_Clearselection').click(function () {
    // Reset the dropdown selection to its default value (e.g., "-------select-------")
    $('#dropdown_staff_PayRollSubCategory').val('').trigger('change');
});

$('#dropdown_staff_LMSSubCategory_clearselection').click(function () {
    // Reset the dropdown selection to its default value (e.g., "-------select-------")
    $('#dropdown_staff_LMSSubCategory').val('').trigger('change');
});



























//$(document).on('click', '#_staffattendanceExportExcel', function () {
//    // Get table data
//    var table = document.getElementById("tblStaffattendancesearchresults");

//    // Additional titles
//    var formattedDate = GetDateFormat();
//    var title1 = ["                                                                    Attendance Register"];
//    var title2 = ["                                                                    Quro Schools"];
//    var title3 = ["                                                                    "+formattedDate];


//    // Create a new workbook
//    var wb = XLSX.utils.book_new();

//    // Create a new worksheet
//    var ws = XLSX.utils.aoa_to_sheet([title1, title2, title3]);

//    // Set column width for all columns
//    var columnWidth = [];
//    for (var i = 0; i < table.rows[0].cells.length; i++) {
//        columnWidth[i] = { wpx: table.rows[0].cells[i].offsetWidth };
//    }
//    ws['!cols'] = columnWidth;

//    // Merge cells from A1 to AI
//    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 34 } },
//    { s: { r: 1, c: 0 }, e: { r: 1, c: 34 } },
//    { s: { r: 2, c: 0 }, e: { r: 2, c: 34 } }];
//    // Center-align titles
//    var titleStyle = { halign: 'center', valign: 'center', font: { bold: true } };
//    ws['A1'] = { ...ws['A1'], s: titleStyle };
//    ws['A2'] = { ...ws['A2'], s: titleStyle };
//    ws['A3'] = { ...ws['A3'], s: titleStyle };
  

//    // Append the original table data to the worksheet
//    var origData = XLSX.utils.table_to_sheet(table, { raw: true });
//    XLSX.utils.sheet_add_json(ws, XLSX.utils.sheet_to_json(origData, { header: 1 }), { skipHeader: true, origin: 'A4' });

//    // Add the worksheet to the workbook
//    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

//    // Set table border
//    var range = XLSX.utils.decode_range(ws['!ref']);
//    for (var R = range.s.r; R <= range.e.r; ++R) {
//        for (var C = range.s.c; C <= range.e.c; ++C) {
//            var cell = XLSX.utils.encode_cell({ r: R, c: C });
//            if (!ws[cell]) ws[cell] = { v: undefined };
//            if (!ws[cell].s) ws[cell].s = {};
//            ws[cell].s.border = {
//                top: { style: "thik", color: { rgb: "000000" } },
//                bottom: { style: "thik", color: { rgb: "000000" } },
//                left: { style: "thik", color: { rgb: "000000" } },
//                right: { style: "thik", color: { rgb: "000000" } }
//            };
//        }
//    }

//    // Convert the workbook to an array buffer
//    var arrayBuffer = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });

//    // Convert the array buffer to a Blob
//    var blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//    // Create a download link
//    var link = document.createElement("a");
//    link.href = URL.createObjectURL(blob);

//    // Set the file name
//    link.download = "staff_attendance.xlsx";

//    // Append the link to the document and trigger the click event
//    document.body.appendChild(link);
//    link.click();

//    // Remove the link from the document
//    document.body.removeChild(link);
//});





























//$(document).on('click', '#_staffattendanceExportExcel', function () {
//    // Get table data
//    var table = document.getElementById("tblStaffattendancesearchresults");
//    var rows = table.querySelectorAll('tbody tr');

//    var jsonData = [];

//    rows.forEach(function (row, rowIndex) {
//        var rowData = [];
//        row.querySelectorAll('td').forEach(function (cell, cellIndex) {
//            if (rowIndex === 0) {
//                // For the header row, use the th text content
//                rowData.push(table.querySelector('thead tr').querySelectorAll('th')[cellIndex].textContent.trim());
//            } else {
//                // For other rows, use the td text content
//                rowData.push(cell.textContent.trim());
//            }
//        });
//        jsonData.push(rowData);
//    });

//    // Add custom headers to the sheet
//    var headerData = [
//        ["Attendance Register", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//        ["ADS SCHOOL", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//        ["Report On:", "14/12/2023", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
//    ];

//    // Create a new workbook
//    var data = XLSX.utils.book_new();

//    // Add main data sheet
//    var mainSheet = XLSX.utils.json_to_sheet(jsonData, { header: jsonData[0] });
//    XLSX.utils.book_append_sheet(data, mainSheet, 'Sheet1');

//    // Add header sheet
//    var headerSheet = XLSX.utils.aoa_to_sheet(headerData);
//    XLSX.utils.book_append_sheet(data, headerSheet, 'Headers');

//    //// Customize column widths for the main sheet
//    //mainSheet['!cols'] = Array.from({ length: jsonData[0].length }, function (_, index) {
//    //    return { wch: 20 }; // Adjust the width as needed
//    //});

//    // Set background color for the header cells in the main sheet
//    Object.keys(mainSheet).forEach(function (key) {
//        if (key.match(/[A-Z]+[0-9]+/) && key !== 'A1') {
//            mainSheet[key].s = { fill: { fgColor: { rgb: "007bff" } }, alignment: { horizontal: "center", vertical: "center" } };
//        }
//    });

//    // Remove borders from all columns except the header row in the main sheet
//    mainSheet['!rows'] = [{}, { outlineLevel: 0 }]; // Set outlineLevel for the header row

//    // Create Excel file
//    var blob = XLSX.write(data, { bookType: 'xlsx', bookSST: true, type: 'binary' });

//    // Convert the workbook to a Blob
//    blob = new Blob([s2ab(blob)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//    // Trigger download
//    saveAs(blob, 'data.xlsx');
//});

//// Utility function to convert s to array buffer
//function s2ab(s) {
//    var buf = new ArrayBuffer(s.length);
//    var view = new Uint8Array(buf);
//    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//    return buf;
//}










//$(document).on('click', '#_staffattendanceExportExcel', function () {
//    // Get table data
//    debugger;
//    var table = document.getElementById("tblStaffattendancesearchresults");
//    var data = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });

//    /// Add custom headers to the sheet
//    data.Sheets.Sheet1['!merges'] = [
//        { s: { r: 0, c: 0 }, e: { r: 2, c: 2 } } // Merge cells for the header rows
//    ];

//    // Set background color for the header cells
//    data.Sheets.Sheet1['A1'].s = { fill: { fgColor: { rgb: "007bff" } } };
//    data.Sheets.Sheet1['B1'].s = { fill: { fgColor: { rgb: "007bff" } } };
//    data.Sheets.Sheet1['C1'].s = { fill: { fgColor: { rgb: "007bff" } } };

//    data.Sheets.Sheet1['A2'].s = { fill: { fgColor: { rgb: "0000007d" } } };
//    data.Sheets.Sheet1['B2'].s = { fill: { fgColor: { rgb: "0000007d" } } };
//    data.Sheets.Sheet1['C2'].s = { fill: { fgColor: { rgb: "0000007d" } } };

//    data.Sheets.Sheet1['A3'].s = { fill: { fgColor: { rgb: "0000007d" } } };
//    data.Sheets.Sheet1['B3'].s = { fill: { fgColor: { rgb: "0000007d" } } };
//    data.Sheets.Sheet1['C3'].s = { fill: { fgColor: { rgb: "0000007d" } } };

//    // Customize column widths for the main sheet
//    data.Sheets.Sheet1['!cols'] = [
//        { wch: 20 }, // Width of the first column
//        { wch: 30 }, // Width of the second column
//        { wch: 15 }  // Width of the third column
//    ];

//    // Remove borders from all columns except the header row
//    data.Sheets.Sheet1['!rows'] = [{}, { outlineLevel: 0 }]; // Set outlineLevel for the header row

//    // Create Excel file
//    var blob = XLSX.write(data, { bookType: 'xlsx', bookSST: true, type: 'binary' });

//    // Convert the workbook to a Blob
//    blob = new Blob([s2ab(blob)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

//    // Trigger download
//    saveAs(blob, 'data.xlsx');
//});
   

//// Utility function to convert s to array buffer
//function s2ab(s) {
//    var buf = new ArrayBuffer(s.length);
//    var view = new Uint8Array(buf);
//    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
//    return buf;
//}





