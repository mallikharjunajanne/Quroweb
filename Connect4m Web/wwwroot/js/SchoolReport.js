
//=================================02-01-2024

//const { debug } = require("util");
var financialyearsummary = "";
$("#Searchexpensereport").submit(function (event) {
    event.preventDefault();
    loaddingimg.css('display', 'block');
    var formdata_Expenditure = $(this).serialize();

    var summaryval = $("#Searchexpensereport").find('#summaryradio').find("input[type='radio']:checked").val();
    var data = { summary:summaryval};

    CommonAjaxFunction('GET', '/SchoolReport/SimpleExpenseSummary', data, function (response) {
        // $("#SummaryAppend").val('');

        $("#SummaryAppend").html(response);

    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);


    CommonAjaxFunction('POST', '/SchoolReport/SimpleExpenseSummary', formdata_Expenditure, function (response) {
        bindDatatablesummary(response);
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

});


//===================== Data Append To thee Table

function bindDatatablesummary(response) {

    //debugger;
    try {


        loaddingimg.css('display', 'block');
        var dropval = $("#Searchexpensereport").find("#dropdown_Finanicalyear option:selected").text();
        var dropval1 = dropval.split("-");
        financialyearsummary = dropval;


        $("#datatable1").find("#Counts").text(response.listone.length - 1);

        var tablehead = $('#Tblsummary1 thead');
        var tablebody = $('#Tblsummary1 tbody'); // stop
        //  var count = 0;
        var tableth = "<tr><th>Credit(Income)/Debit(Expenditure</th>" +
            "<th>Apr-" + dropval1[0] + "</th><th>May-" + dropval1[0] + "</th><th>Jun-" + dropval1[0] + "</th><th>Jul-" + dropval1[0] + "</th>" +
            "<th>Aug-" + dropval1[0] + "</th><th>Sep-" + dropval1[0] + "</th><th>Oct-" + dropval1[0] + "</th><th>Nov-" + dropval1[0] + "</th>" +
            "<th>Dec-" + dropval1[0] + "</th><th>Jan-" + dropval1[1] + "</th><th>Feb-" + dropval1[1] + "</th><th>Mar-" + dropval1[1] + "</th><th>Total</th></tr>";
        tablehead.append(tableth);

        for (var i = 0; i < response.listone.length; i++) {

            var tabletr = '<tr>';
            tabletr += "<td>" + response.listone[i].credit_Debit + "</td>";
            tabletr += "<td>" + response.listone[i].apr + "</td><td>" + response.listone[i].may + "</td><td>" + response.listone[i].jun + "</td>";
            tabletr += "<td>" + response.listone[i].jul + "</td><td>" + response.listone[i].aug + "</td><td>" + response.listone[i].sep + "</td>";
            tabletr += "<td>" + response.listone[i].oct + "</td><td>" + response.listone[i].nov + "</td><td>" + response.listone[i].dec + "</td>";
            tabletr += "<td>" + response.listone[i].jan + "</td><td>" + response.listone[i].feb + "</td><td>" + response.listone[i].mar + "</td><td>" + response.listone[i].total + "</td>";

            tablebody.append(tabletr + "</tr>");

        }
        if (response.listtwo.length != 0) {


            $("#datatable2").find("#Counts").text(response.listtwo.length - 1);

            var tablehead2 = $('#Tblsummary2 thead');
            var tablebody2 = $('#Tblsummary2 tbody'); // stop
            //  var count = 0;
            var tableth2 = "<tr><th>Type of Expenditure</th>" +
                "<th>Apr-" + dropval1[0] + "</th><th>May-" + dropval1[0] + "</th><th>Jun-" + dropval1[0] + "</th><th>Jul-" + dropval1[0] + "</th>" +
                "<th>Aug-" + dropval1[0] + "</th><th>Sep-" + dropval1[0] + "</th><th>Oct-" + dropval1[0] + "</th><th>Nov-" + dropval1[0] + "</th>" +
                "<th>Dec-" + dropval1[0] + "</th><th>Jan-" + dropval1[1] + "</th><th>Feb-" + dropval1[1] + "</th><th>Mar-" + dropval1[1] + "</th><th>Total</th></tr>";
            tablehead2.append(tableth2);

            for (var i = 0; i < response.listtwo.length; i++) {

                var tabletr = '<tr>';
                tabletr += "<td>" + response.listtwo[i].typeofExpenditure + "</td>";
                tabletr += "<td>" + response.listtwo[i].apr + "</td><td>" + response.listtwo[i].may + "</td><td>" + response.listtwo[i].jun + "</td>";
                tabletr += "<td>" + response.listtwo[i].jul + "</td><td>" + response.listtwo[i].aug + "</td><td>" + response.listtwo[i].sep + "</td>";
                tabletr += "<td>" + response.listtwo[i].oct + "</td><td>" + response.listtwo[i].nov + "</td><td>" + response.listtwo[i].dec + "</td>";
                tabletr += "<td>" + response.listtwo[i].jan + "</td><td>" + response.listtwo[i].feb + "</td><td>" + response.listtwo[i].mar + "</td><td>" + response.listtwo[i].total + "</td>";

                tablebody2.append(tabletr + "</tr>");

            }


        }


        //    background-color: #add0ef;
        $("#datatable1 tbody tr:last").css('background-color', '#add0ef');
       // $("#datatable1 tbody tr td:last").css('background-color', '#add0ef');
        $("#datatable2 tbody tr:last").css('background-color', '#add0ef');
      //  $("#datatable2 tbody td:last").css('background-color', '#add0ef');


        loaddingimg.css('display', 'none');
    } catch {
        alert("error");
    }

}
//Export Excel
$(document).on('click', '#exportexcelsummary', function () { ExportExcelsummary("Tblsummary1") });
$(document).on('click', '#exportexceldetailesummary', function () { ExportExcelsummary("Tblsummary2") });
//Print
$(document).on('click', '#printsummary', function () { printsummary("Tblsummary1") });
$(document).on('click', '#printdetailesummary', function () { printsummary("Tblsummary2") });



//================================  Excel

//=============================================================================  Export Excel  (Expense Report)




    function ExportExcelsummary(id) {

    
    var formattedDate = GetDateFormat();

    // Create a new workbook
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Sheet1');

    // Additional titles
        worksheet.addRow(["Simple Expense Summary Report "]).font = { bold: true };
        worksheet.addRow(["Quro Schools"]).font = { bold: true };
        worksheet.addRow(["Credit(Income)/Debit(Expenditure) :   Credit(Income)"]).font = { bold: true };// add New
        worksheet.addRow(["Financial Year : " + financialyearsummary]).font = { bold: true };// add  New
      
    worksheet.addRow(["Report On:  " + formattedDate]).font = { bold: true };
    worksheet.addRow([""]).font = { bold: false };

    // Set background color for titles
    worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A2').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A3').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A4').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A5').fill = { type: 'pattern', pattern: 'gray125' };
        worksheet.getCell('A6').fill = { type: 'pattern', pattern: 'gray125' };

    worksheet.getCell('A1').font = { size: 14, bold: true, color: { argb: '000000' } }; // Adjust the size as needed
    worksheet.getCell('A2').font = { size: 14, bold: true, color: { argb: '000000' } };
    worksheet.getCell('A3').font = { size: 14, bold: true, color: { argb: '000000' } };
    worksheet.getCell('A4').font = { size: 14, bold: true, color: { argb: '000000' } };
    worksheet.getCell('A5').font = { size: 14, bold: true, color: { argb: '000000' } };
    //  worksheet.getCell('A5').font = {bold: true, color: { argb: '000000' } };

    // worksheet.getCell('A5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'deb887' } };



    // Merge cells for titles and center-align
    worksheet.mergeCells('A1:N1');
    worksheet.mergeCells('A2:N2');
    worksheet.mergeCells('A3:N3');
    worksheet.mergeCells('A4:N4');
    worksheet.mergeCells('A5:N5');
    worksheet.mergeCells('A6:N6');
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A3').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A4').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A5').alignment = { horizontal: 'center', vertical: 'center' };

    // Add the original table data to the worksheet starting from the 4th row
    var tableData = document.getElementById(id);
   // var tableData2 = document.getElementById("ctl00_ContentPlaceHolder1_tblBusInfo");
 //   var tabedata1length = tableData.rows.length + 8;
    // Loop through rows
    for (var i = 0; i < tableData.rows.length; i++) {
        debugger;
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
        } if (i === tableData.rows.length-1) {
            addedRow.eachCell({ includeEmpty: true }, function (cell) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1ec96a' } };
                cell.font = { bold: true, color: { argb: '000000' } };
            });
        }
        //Add Background Color for Last Cell
        if (i > 0 && i < tableData.rows.length - 1) {
            
            addedRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
                if (colNumber == addedRow.actualCellCount) {
                  
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffff00' } };
                    cell.font = { bold: true, color: { argb: '000000' } };
                }
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

   // worksheet.addRow([""]).font = { bold: false };  ///  gap between two tables

    ////============================         For Table 2

    //for (var i = 0; i < tableData2.rows.length - 1; i++) {
    //    debugger;
    //    var row = tableData2.rows[i];
    //    var rowData = [];
    //    for (var j = 0; j < row.cells.length; j++) {
    //        rowData.push(row.cells[j].innerText);
    //    }
    //    var addedRow = worksheet.addRow(rowData);

    //    addedRow.eachCell({ includeEmpty: true }, function (cell) {
    //        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDEB887' } };
    //        cell.font = { bold: true, color: { argb: '000000' } };


    //    });

    //    worksheet.mergeCells('A' + tabedata1length + ':C' + tabedata1length);
    //    worksheet.getCell('A' + tabedata1length).alignment = { horizontal: 'center', vertical: 'center' };

    //    tabedata1length++;
    //    i++;
    //}

    worksheet.addRow([""]).font = { bold: false };  //  Gap Between Second table and below data
    worksheet.addRow(["This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized"]).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDEB887' } };

    // Set column widths
    for (var col = 2; col <= 35; col++) {
        worksheet.getColumn(col).width = 11; // Set the width as needed
    }
    worksheet.getColumn(1).width = 41;
    //worksheet.getColumn(2).width = 31;
    //worksheet.getColumn(3).width = 17;
    //worksheet.getColumn(4).width = 9;
    // Generate .xls file
    workbook.xlsx.writeBuffer().then(function (buffer) {
        var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a download link
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the file name
        link.download = "SimpleExpenseSummaryReport.xls";

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    });
};




//==================================================  Print
//=============================================================================  Click On Print ( Summary Report)




    function printsummary(id) {

    
    var formattedDate = GetDateFormat();

    //debugger;
    var tabledata1 = document.getElementById(id);
    // var tabledata2 = document.getElementById("ctl00_ContentPlaceHolder1_tblBusInfo");
        var printContent = '</body></html><table width="100%" align="center" style="text-align:center"><tbody><tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; "> Simple Expense Summary Report </td></tr>' +
            '<tr><td colspan="34" align="center" style="background-color:Lightgray; color: Black; "><b>Quro Schools</b></td></tr>' +
            '<tr><td colspan="34" align="center" style="background-color:Lightgray; color: Black; "><b>Credit(Income)/Debit(Expenditure) :   Credit(Income)</b></td></tr>' +
            '<tr><td colspan="34" align="center" style="background-color:Lightgray; color: Black; "><b>Financial Year : ' + financialyearsummary + '</b></td></tr>' +
            '<tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; "> Report On : ' + formattedDate + '</td></tr>' +
            '<tr><td colspan="34"></td></tr>' +
            '</table><table cellspacing="1" cellpadding="0" border="1" id="ctl00_ContentPlaceHolder1_grdCreditDebitDetails" style="background-color:#DDEBF9;width:100%;"><tbody >' +
          
            '<th class="gridtext" align = "center" scope = "col" style = "width:16%;" > Credit(Income) / Debit(Expenditure)</th><th class="gridtext" align="center" scope="col" style="width:6%;">Apr</th><th class="gridtext" align="center" scope="col" style="width:6%;">May</th><th class="gridtext" align="center" scope="col" style="width:6%;">Jun</th><th class="gridtext" align="center" scope="col" style="width:6%;">Jul</th><th class="gridtext" align="center" scope="col" style="width:6%;">Aug</th><th class="gridtext" align="center" scope="col" style="width:6%;">Sep</th><th class="gridtext" align="center" scope="col" style="width:6%;">Oct</th><th class="gridtext" align="center" scope="col" style="width:6%;">Nov</th><th class="gridtext" align="center" scope="col" style="width:6%;">Dec</th><th class="gridtext" align="center" scope="col" style="width:6%;">Jan</th><th class="gridtext" align="center" scope="col" style="width:6%;">Feb</th><th class="gridtext" align="center" scope="col" style="width:6%;">Mar</th><th class="gridtext" align="center" scope="col" style="width:7%;">Total</th></tr >';
        
    printContent += '</tr >';
        for (var i = 1; i < tabledata1.rows.length; i++) {
            if (i == tabledata1.rows.length - 1) {
                printContent += '<tr style="background-color:rgb(173, 208, 239);height:24px;">';

            } else {
                printContent += '<tr style="background-color:White;height:24px;">';

            }
        var row = tabledata1.rows[i];
        for (var j = 0; j < row.cells.length; j++) {
            printContent += '<td class="gridtext" align="center"  style="width:16%;">' + row.cells[j].innerText + '</td>';

        }
        printContent += '</tr>';
    }

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
}





//**************************** Oraganisation  fee summary 03-01-24  **********************************************************




//========================================  Click On Check Box For Select All in the Select tag
$("#Searchfeesummary #Select_All").click(function (event) {
   
    Commoncheckallmultiplelist(event, "Searchfeesummary", "dropdown_LOCATION");
});
$("#Searchfeesummary #Select_Allsub").click(function (event) {
   
    Commoncheckallmultiplelist(event, "Searchfeesummary", "dropdown_sublocation");
});
$("#Searchfeesummary #Select_Allinstances").click(function (event) {
   
    Commoncheckallmultiplelist(event, "Searchfeesummary", "dropdown_Instances");
});

$("#SearchSchoolattendance #Select_Allsch").click(function (event) {

    Commoncheckallmultiplelist(event, "SearchSchoolattendance", "dropdown_SchInstance");
})


//---------------------------------------    For sub Location



function Sublocation(valid,appendid,displaydiv,methodname,text,value,errror,errorbox) {
    loaddingimg.css('display', 'block');
    debugger;
    var array = $("#Searchfeesummary").find("#" + valid).val();
    if (array !== undefined && array !== null && array.length > 0) {
        var parameter1 = array.join(",");

        var extraparameters = [];
        if (displaydiv == "instancesdisplay") {
            $("#Searchfeesummary").find("#" + displaydiv).css("display", 'block');
        }
        else {
            $("#Searchfeesummary").find("#" + displaydiv).css("display", 'flex');
        }
      
        extraparameters.push($("#instancesummary").val());
        extraparameters.push(parameter1);


        var data = {
            methodname: methodname,
            text: text,
            value: value,
            parameters: extraparameters
        };

        CommonAjaxFunction('POST', '/SchoolReport/CommonDropdown', data, function (response) {

            var dropdown = $('#' + appendid); // Change this to match the generated ID
            dropdown.empty();

            response.forEach(function (mentor) {
                var option = $('<option></option>').val(mentor.value).text(mentor.text);
                dropdown.append(option);
            });
            document.getElementById("loading").style.display = "none";
        }, function (status, error) {
            loaddingimg.css('display', 'none');
        }, false);
        $(".card").find('#' + errorbox).text("");
    }
    else {
        loaddingimg.css('display', 'none');
        $(".card").find('#'+errorbox).text("Select The " + errror);
    }
}






//===================================  Submit the  Report fee summary
var _reportstartdate;
var _reportenddate;
var orgfeesummary;




$("#Searchfeesummary").submit(function (event) {
    event.preventDefault();
   debugger;

    var startDate = new Date(document.getElementById("StartDate").value);
    var endDate = new Date(document.getElementById("EndDate").value);
    var error = $('#EndDate').closest('.form-group');
    $(error).find('.compare').removeClass('error2');
    if (endDate <= startDate) {


        $(error).find('.compare').addClass('error2');
        $(error).find('.compare').text("EndDate must be greater than startDate.");

    } else {

        $(error).find('.compare').addClass('');
        $(error).find('.compare').text("");
    }



    $(".errorofallemployeeattendence").text("");

    loaddingimg.css('display', 'block');
   
    var startdate = $("#Searchfeesummary").find('#StartDate').val();
    var enddate = $("#Searchfeesummary").find('#EndDate').val();
    _reportstartdate = startdate;
    _reportenddate = enddate;

     orgfeesummary = $(this).serialize();

    var formElement = document.getElementById('Searchfeesummary');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationMessages2 = formElement.getElementsByClassName('error2');
        var validationmelength = validationMessages.length;
        if (validationmelength == 0 && validationMessages2.length == 0) {
            CommonAjaxFunction('GET', '/SchoolReport/ReportOrganisationFeeSummary', null, function (response) {
                $("#appendallfeesummary").html(response);
                //=========================                                                                                  First Table
                CommonAjaxFunction('GET', '/SchoolReport/FeeEntityInstanceSummaryone', orgfeesummary, function (response) {
                    var headernames = [];
                    headernames.push("College Name", "Students", "Fee Amount", "Discount Amount", "Fee Collected", "Due Amount");

                    var columnnames = [];
                    columnnames.push("instancename", "instanceId", "noUser", "feeAmount", "concedingAmont", "feeCollected","dueAmount");
                    bindorganisationfeesummary(response, headernames, columnnames, "#appendinsidetablemain", null, null,"bindsecondtable",2,true,true,"first");


                }, function (status, error) {

                }, false);


            }, function (status, error) {

            }, false);
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
    }, 50);
    loaddingimg.css('display', 'none');

})
//==================================================   second table
function bindsecondtable(id, event) {
    debugger;
    loaddingimg.css('display', 'block');
    var formData2 = new FormData();
    formData2.append("Instances", id);
    formData2.append("StartDate", _reportstartdate);
    formData2.append("EndDate", _reportenddate);
    CommonAjaxFunction('POST', '/SchoolReport/FeeEntityInstanceSummarytwo', formData2, function (response) {
        var removedElement = $(event).closest('tr').next('tr').find('td[colspan="6"]').closest('tr').remove();

        if (removedElement.length > 0) {

        } else {


            var headernames = [];
            headernames.push("Term Name", "Fee Amount", "Discount Amount", "Fee Collected", "Due Amount");

            var columnnames = [];
            columnnames.push("termName", "feetermid", "feeAmount", "discountAmont", "payAmont", "dueAmount");
            bindorganisationfeesummary(response, headernames, columnnames, null, event, "aquamarine", "bindthirdtable", 2, true,false,"second");
        }
        loaddingimg.css('display', 'none');

    }, function (status, error) {
        loaddingimg.css('display', 'none');

    }, true);


}

//==================================================   Third table
function bindthirdtable(id, event) {
    debugger;
    loaddingimg.css('display', 'block');
    var formData2 = new FormData();
    formData2.append("FeeTermId", id);
    formData2.append("StartDate", _reportstartdate);
    formData2.append("EndDate", _reportenddate);
    CommonAjaxFunction('POST', '/SchoolReport/FeeEntityInstanceSummarythree', formData2, function (response) {
        var removedElement = $(event).closest('tr').next('tr').find('td[colspan="6"]').closest('tr').remove();

        if (removedElement.length > 0) {

        } else {


            var headernames = [];
            headernames.push("Type Name", "Fee Amount", "Discount Amount", "Fee Collected", "Due Amount");

            var columnnames = [];
            columnnames.push("feeType", "feeTypeid", "feeAmount", "discountAmont", "payAmont", "dueAmount");
            bindorganisationfeesummary(response, headernames, columnnames, null, event, "aquamarine", "bindfourthtable", 2, true, false,"third");
        }
        loaddingimg.css('display', 'none');

    }, function (status, error) {
        loaddingimg.css('display', 'none');

    }, true);


}


//==================================================   Fourth table
function bindfourthtable(id, event) {
    debugger;
    loaddingimg.css('display', 'block');
   
    var FeeTermId = $(event).closest('.third').closest('.second').find('table').find('input[type="text"]').val();
    var Instanceid = $(event).closest('.third').closest('.second').closest('.first').find('table').find('input[type="text"]').val();
   // var Instanceid = $(event).closest('td[colspan="6"]').closest('td[colspan="6"]').closest('td[colspan="6"]').find('table').find('input[type="text"]').val();
   
    var formData2 = new FormData();
    formData2.append("Instance", Instanceid);
    formData2.append("FeeTypeId", id);
    formData2.append("FeeTermId", FeeTermId);
    formData2.append("AcademicYearId", "6");
    formData2.append("StartDate", _reportstartdate);
    formData2.append("EndDate", _reportenddate);
    CommonAjaxFunction('POST', '/SchoolReport/FeeEntityInstanceSummaryfour', formData2, function (response) {
        var removedElement = $(event).closest('tr').next('tr').find('td[colspan="6"]').closest('tr').remove();

        if (removedElement.length > 0) {

        } else {

            var headernames = [];
            headernames.push("Section Name", "Students", "FeeAssigned", "PartialPaid", "FullyPaid", "FeeNotPaid");

            var columnnames = [];
            columnnames.push("instanceclassificationname", "instancesubclassificationid", "countSCIDUsers", "feeassigneduser", "partialFeePayed", "fullFeePayed", "feeNotPayed");
            bindorganisationfeesummary(response, headernames, columnnames, null, event, "aquamarine", null, 2, false, true,"fourth");
        }
        loaddingimg.css('display', 'none');

    }, function (status, error) {
        loaddingimg.css('display', 'none');

    }, true);


}






//==================================================   Bind Pocket money details

function bindpockettable() {
    debugger; 
    

    CommonAjaxFunction('GET', '/SchoolReport/PocketMoneyDetails', orgfeesummary, function (response) {
        var headernames = [];
        headernames.push("School Name", "Total Amount Received From Parents", "Total Amount Paid To Students", "Due Amount");

        var columnnames = [];
        columnnames.push("intanceName", "parentPaidAmount", "studentReceivedAmount", "dueAmount");
      
        bindorganisationfeesummary(response, headernames, columnnames, "#appendpocketmoney", null, null, "nofun",1,false,true,"pocket");


    }, function (status, error) {

    }, false);


}


function bindorganisationfeesummary(response, headernames, columnnames, appendid, event,bcolor,onclickfun,startcolunmnindex,linkexceptlastrow,linkallfalse,Class) {
    debugger;
   // try {
    
        if (response.length > 0) {

            loaddingimg.css('display', 'block');
            var maintable = '<table class="table table-hover table-bordered" >';
            if (bcolor) {
                maintable += '<thead  style="background-color:' + bcolor + '" ><tr>';
            }
            else {
                maintable += '<thead class="table-dark"  ><tr>';
            }
            for (var i = 0; i < headernames.length; i++) {
                maintable += "<th>" + headernames[i] + "</th>";
            }
            maintable += "</tr></thead><tbody>";
            for (var i = 0; i < response.length; i++) {
               
                if (linkallfalse) {
                    if (i < response.length - 1) {
                        if (linkexceptlastrow) {
                            maintable += '<tr><td class="appendinsidetable" onclick="' + onclickfun + '(\'' + response[i][columnnames[1]] + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + response[i][columnnames[0]] + ' <input type="text" value="' + response[i][columnnames[1]] + '" hidden style="display:none" readonly /></td>';

                        } else {
                            maintable += '<tr><td class="appendinsidetable">' + response[i][columnnames[0]] + '</td>';
                        }
                    } else {
                        maintable += '<tr><td class="appendinsidetable">' + response[i][columnnames[0]] + '</td>';
                    }
                }
                else {
                    maintable += '<tr><td class="appendinsidetable" onclick="' + onclickfun + '(\'' + response[i][columnnames[1]] + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + response[i][columnnames[0]] + ' <input type="text" value="' + response[i][columnnames[1]] + '" hidden style="display:none" readonly /></td>';
                }
                for (var j = startcolunmnindex; j < columnnames.length; j++) {
                    maintable += '<td>' + response[i][columnnames[j]] + '</td>';
                }
                maintable += '</tr>';
            }

            maintable += '</tbody></table>';

            if (appendid) {
                $(appendid).html("<div class='" + Class+"' >"+maintable+"</div>");
            } else {
                $(event).closest('tr').after("<tr class='" + Class+"'><td colspan='6'>"+maintable+"</td></tr>");
            }
        }
        loaddingimg.css('display', 'none');
    //} catch {
    //    loaddingimg.css('display', 'none');
    //    alert("error");
    //}

}




//********************************************* SCHOOL WISE ATTENDANCE REPORT  (05-01-2024) **************************************

//===============================================  date Compare


$("#SearchSchoolattendance #startdate").on("change", function () { Greaterthantoday("startdate", ".compare", ".col-sm-5", "Attendance From date") });


var _schstartdate;

$("#SearchSchoolattendance").submit(function (event) {
    event.preventDefault();
     debugger;

    loaddingimg.css('display', 'block');

    var startdate = $("#SearchSchoolattendance").find('#startdate').val();
    
    _schstartdate = startdate;
  

   var schoolattendance = $(this).serialize();

    var formElement = document.getElementById('SearchSchoolattendance');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');

        var validationMessages2 = formElement.getElementsByClassName('error2');
        var validationmelength = validationMessages.length;
        if (validationmelength == 0 && validationMessages2.length == 0) {
            CommonAjaxFunction('GET', '/SchoolReport/SearchSchoolwiseAttendanceReport', schoolattendance, function (response) {
                $("#appendallschoolattendance").html(response);
             
                loaddingimg.css('display', 'none');

            }, function (status, error) {
                loaddingimg.css('display', 'none');

            }, false);
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
            loaddingimg.css('display', 'none');

        }
    }, 50);
   
})

//--------------------------------------------------      School Attendance Report Sub

function bindschoolattendancereportsub(id,event) {
    debugger;
    //var formdata = new FormData();
    //formdata.append('InstanceId', id);
    //formdata.append('AttendanceDate', _schstartdate);
    loaddingimg.css('display', 'block');
    var formdata = new FormData();
    formdata.append('SchInstance', id);
    formdata.append('AttendanceFromdate', _schstartdate);


    CommonAjaxFunction('POST', '/SchoolReport/SearchSchoolwiseAttendanceReportsub', formdata, function (response) {
        $("#appendallschoolattendanceSubout").css('display', 'block');
        $("#appendallschoolattendanceSub").text("");
        $("#CountOfRecords_schoolwiseatte").find('span').text(response.length-1);
        var headernames = [];
        headernames.push("School Name", "Class", "Section", "Total Strength", "Present Count", "Absent Count","Attendance Status");

        var columnnames = [];
        columnnames.push("instanceName", "classificationName", "subClassificationName", "totalStrength", "presentCount", "absentCount","atendancePostedStatus");
        bindorganisationfeesummary(response, headernames, columnnames, "#appendallschoolattendanceSub", null, "aquamarine", "nofun", 1, false, true,"attendancesub");
        loaddingimg.css('display', 'none');

    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, true);
   

}




$(document).on('click', '#exportexcelschoolattendance', function () { ExportExcelschoolsattendanceDetails("schoosattendancedetails", _schstartdate,) });

$(document).on('click', '#exportexcelschoolattendancereportsub', function () { ExportExcelschoolwiseattendance("appendallschoolattendanceSub",_schstartdate,) });



//========================    Export Excel for Schools Attendance Details

function ExportExcelschoolsattendanceDetails(id,attendancedate) {


    var formattedDate = GetDateFormat();

    // Create a new workbook
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Sheet1');

    // Additional titles
    worksheet.addRow(["Attendance Detials "]).font = { bold: true };
    worksheet.addRow(["Quro Schools"]).font = { bold: true };
    worksheet.addRow(["Attendance Date:    : " + attendancedate]).font = { bold: true };// add  New

    worksheet.addRow(["Report On:  " + formattedDate]).font = { bold: true };
    worksheet.addRow([""]).font = { bold: false };

    // Set background color for titles
    worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A2').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A3').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A4').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A5').fill = { type: 'pattern', pattern: 'gray125' };
   

    worksheet.getCell('A1').font = { size: 14, bold: true, color: { argb: '000000' } }; // Adjust the size as needed
    worksheet.getCell('A2').font = { size: 14, bold: true, color: { argb: '000000' } };
    worksheet.getCell('A3').font = { size: 14, bold: true, color: { argb: '000000' } };
    worksheet.getCell('A4').font = { size: 14, bold: true, color: { argb: '000000' } };
    
    
    // Merge cells for titles and center-align
    worksheet.mergeCells('A1:E1');
    worksheet.mergeCells('A2:E2');
    worksheet.mergeCells('A3:E3');
    worksheet.mergeCells('A4:E4');
    worksheet.mergeCells('A5:E5');
    
    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A3').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A4').alignment = { horizontal: 'center', vertical: 'center' };
  //  worksheet.getCell('A5').alignment = { horizontal: 'center', vertical: 'center' };

    // Add the original table data to the worksheet starting from the 4th row
    var tableData = document.getElementById(id);
    // var tableData2 = document.getElementById("ctl00_ContentPlaceHolder1_tblBusInfo");
    //   var tabedata1length = tableData.rows.length + 8;
    // Loop through rows
    for (var i = 0; i < tableData.rows.length; i++) {
        debugger;
        var row = tableData.rows[i];
        var rowData = [];
        // Loop through cells
        for (var j = 0; j < row.cells.length; j++) {
            rowData.push(row.cells[j].innerText);
        }


        var addedRow = worksheet.addRow(rowData);
        if (i === 0) {
            addedRow.eachCell({ includeEmpty: true }, function (cell) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'c9851e' } };
                cell.font = { bold: true, color: { argb: '000000' } };
            });
            } 
            if (i === tableData.rows.length - 1) {
            addedRow.eachCell({ includeEmpty: true }, function (cell) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f1f312' } };
                cell.font = { bold: true, color: { argb: '000000' } };
            });
        }
        //Add Background Color for Last Cell
        //if (i > 0 && i < tableData.rows.length - 1) {

        //    addedRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
        //        if (colNumber == addedRow.actualCellCount) {

        //            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffff00' } };
        //            cell.font = { bold: true, color: { argb: '000000' } };
        //        }
        //    });
        //}



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

   

    worksheet.addRow([""]).font = { bold: false };  //  Gap Between Second table and below data
    worksheet.addRow(["This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized"]).fill = { type: 'pattern', pattern: 'solid', size: 7, fgColor: { argb: 'FFDEB887' } };

    // Set column widths
    for (var col = 1; col <= 5; col++) {
        worksheet.getColumn(col).width = 40; // Set the width as needed
    }
   // worksheet.getColumn(1).width = 41;
    //worksheet.getColumn(2).width = 31;
    //worksheet.getColumn(3).width = 17;
    //worksheet.getColumn(4).width = 9;
    // Generate .xls file
    workbook.xlsx.writeBuffer().then(function (buffer) {
        var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a download link
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the file name
        link.download = "SchoolsAttendanceDetails.xls";

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    });
};

function ExportExcelschoolwiseattendance(id, attendancedate) {
  //  var id = $("#appendallschoolattendanceSub").find('table').first().attr('id');
    $("#"+id).find('table').first().attr('id', 'maintable');

    id = "maintable";
    var formattedDate = GetDateFormat();

    // Create a new workbook
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Sheet1');

    // Additional titles
    worksheet.addRow(["Class Wise Attandance Report "]).font = { bold: true };
    worksheet.addRow(["Quro Schools"]).font = { bold: true };
    worksheet.addRow(["Attendance Date:    : " + attendancedate]).font = { bold: true };// add  New

    worksheet.addRow(["Report On:  " + formattedDate]).font = { bold: true };
    worksheet.addRow([""]).font = { bold: false };

    // Set background color for titles
    worksheet.getCell('A1').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A2').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A3').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A4').fill = { type: 'pattern', pattern: 'gray125' };
    worksheet.getCell('A5').fill = { type: 'pattern', pattern: 'gray125' };


    worksheet.getCell('A1').font = { size: 14, bold: true, color: { argb: '000000' } }; // Adjust the size as needed
    worksheet.getCell('A2').font = { size: 14, bold: true, color: { argb: '000000' } };
    worksheet.getCell('A3').font = { size: 14, bold: true, color: { argb: '000000' } };
    worksheet.getCell('A4').font = { size: 14, bold: true, color: { argb: '000000' } };


    // Merge cells for titles and center-align
    worksheet.mergeCells('A1:G1');
    worksheet.mergeCells('A2:G2');
    worksheet.mergeCells('A3:G3');
    worksheet.mergeCells('A4:G4');
    worksheet.mergeCells('A5:G5');

    worksheet.getCell('A1').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A2').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A3').alignment = { horizontal: 'center', vertical: 'center' };
    worksheet.getCell('A4').alignment = { horizontal: 'center', vertical: 'center' };
    //  worksheet.getCell('A5').alignment = { horizontal: 'center', vertical: 'center' };

    // Add the original table data to the worksheet starting from the 4th row
    var tableData = document.getElementById(id);
    // var tableData2 = document.getElementById("ctl00_ContentPlaceHolder1_tblBusInfo");
    //   var tabedata1length = tableData.rows.length + 8;
    // Loop through rows
    for (var i = 0; i < tableData.rows.length; i++) {
        debugger;
        var row = tableData.rows[i];
        var rowData = [];
        // Loop through cells
        for (var j = 0; j < row.cells.length; j++) {
            rowData.push(row.cells[j].innerText);
        }


        var addedRow = worksheet.addRow(rowData);
        if (i === 0) {
            addedRow.eachCell({ includeEmpty: true }, function (cell) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'c9851e' } };
                cell.font = { bold: true, color: { argb: '000000' } };
            });
        }
        if (i === tableData.rows.length - 1) {
            addedRow.eachCell({ includeEmpty: true }, function (cell) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f1f312' } };
                cell.font = { bold: true, color: { argb: '000000' } };
            });
        }
        //Add Background Color for Last Cell
        //if (i > 0 && i < tableData.rows.length - 1) {

        //    addedRow.eachCell({ includeEmpty: true }, function (cell, colNumber) {
        //        if (colNumber == addedRow.actualCellCount) {

        //            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'ffff00' } };
        //            cell.font = { bold: true, color: { argb: '000000' } };
        //        }
        //    });
        //}



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



    worksheet.addRow([""]).font = { bold: false };  //  Gap Between Second table and below data
    worksheet.addRow(["This is a system generated report, contain confidential information intended for a specific individual and purpose, and is intended for the addressee only. Any unauthorized"]).fill = { type: 'pattern', pattern: 'solid', size: 7, fgColor: { argb: 'FFDEB887' } };

    // Set column widths
    for (var col = 1; col <= 8; col++) {
        worksheet.getColumn(col).width = 25; // Set the width as needed
    }
    // worksheet.getColumn(1).width = 41;
    //worksheet.getColumn(2).width = 31;
    //worksheet.getColumn(3).width = 17;
    //worksheet.getColumn(4).width = 9;
    // Generate .xls file
    workbook.xlsx.writeBuffer().then(function (buffer) {
        var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a download link
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        // Set the file name
        link.download = "SchoolWiseAttendance.xls";

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
    });
};


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
        $('.compare').text('');
        
    }
}