



$("#Str_DP_ID").change(fun151);
/*debugger;*/
function fun151() {
    /*debugger;*/
    var value = $('#Str_Cfn_Id').val();
    /*alert(value);*/
    $.ajax({
        url: "/Attendance/Get_SubClassificationNames_ByInstanceClassifications?InstanceClassificationId=" + value,
        type: "GET",
        success: fun160
    });
    function fun160(response) {
        /*debugger;*/
        $("#Str_INS_DD").html(response);
    }

}


$(document).ready(function () {
    $("#register_ViewId").hide();

    /*debugger;*/
    

  

    $("#myForm").submit(function (event) {
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
                var  Table4_tr = response.st_tbl4_cl;
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

               //Mk Last try End



                //debugger;

                //debugger;
                ////Empty row Append
                //var firstCell = $('<td>').attr('colspan', '46').html('&nbsp;');;
                //var tableFooterEmptyRow = $('<tr>').append(firstCell);


                ////'No-Of Teaching Days Table data
                ///* debugger;*/
                //var Stu_wise = response.stu_wise;
                ////var currentMonth = Stu_wise.currentmonth;

                //var currentMonth = Stu_wise && Stu_wise.currentmonth ? Stu_wise.currentmonth : '';

                //$('#Teaching_Days').text(currentMonth);
                //var mTotal = Stu_wise.m_total;



                //var firstCell = $('<td colspan="9" style="font-size: 11px;">').text('Total Enrollment');
                //var tableFooterRow = $('<tr>').append(firstCell);

                //for (var i = 0; i < 30; i++) {
                //    var mTotalObject = mTotal;

                //    var attendanceValue = mTotalObject === 0.0 ? '-' : mTotalObject;

                //    var tableCell = $('<td style="font-size: 11px;">').text(attendanceValue);

                //    tableFooterRow.append(tableCell);
                //}

              





              


               
               
             



               





                
                ///*debugger;*/
                //var Stu_Atd_tbl2 = response.stu_Atd_tbl2;
                //var Student_Attendance = Stu_Atd_tbl2;
                //var S_tblbody = $('#Student_Absentes');

                //// Create the first table cell with colspan 9 and the specified style
                //var S_firstCell = $('<td colspan="9" style="font-size: 11px;">').text('Student Attendance');
                //var S_tableFooterRow = $('<tr>').append(S_firstCell);
                //var totalSum = 0;

                //var secoundCell = $('<td colspan="9" style="font-size: 11px;">').text('Absent Students');
                //var tableSFooterRow = $('<tr>').append(secoundCell);
                //var totalPSum = 0;

                //// Iterate over the values of Student_Attendance and create table cells
                //for (var i = 0; i < Student_Attendance.length; i++) {
                //    var attendanceObject = Student_Attendance[i];
                //    var attendanceValue = attendanceObject.totalAbsentsinDay;
                //    var attendancePs_Value = attendanceObject.totalPresentsinDay;


                //    if (attendanceValue === '0.0') {
                //        attendanceValue = "-";
                //    } else {
                //        // Parse the attendanceValue as a float and add it to the totalSum
                //        totalSum += parseFloat(attendanceValue);
                //    }


                //    var tableAsCell = $('<td  style="font-size: 11px;">').text(attendanceValue);
                   
                //    tableFooterRow.append(tableAsCell);



                //    if (attendancePs_Value === '0.0') {
                //        attendancePs_Value = "-";
                //    } else {
                //        // Parse the attendanceValue as a float and add it to the totalSum
                //        totalPSum += parseFloat(attendancePs_Value);
                //    }
                //    var tablepsCell = $('<td  style="font-size: 11px;">').text(attendancePs_Value);
                    
                //    tableSFooterRow.append(tablepsCell);

                //}
                //var totalSumCell = $('<td colspan="8">').css('font-size', '11px').text(totalSum);
                //S_tableFooterRow.append(totalSumCell);

                //var totalPSumCell = $('<td colspan="8">').css('font-size', '11px').text(totalPSum);
                //tableSFooterRow.append(totalPSumCell);




                ////  Total Enrollment Muslims data tr code start

                //var TE_M_tr = response.tE_Muslims_cl;

                //var M_Trcell = $('<td colspan="9" style="font-size: 11px;">').text('Total Enrollment Muslims');
                //var M_tableFooterRow = $('<tr>').append(M_Trcell);

                //for (var k = 0; k < 30; k++) {
                //    var m_Object = TE_M_tr.m_total;

                //    var M_Value = m_Object === 0.0 ? '-' : m_Object;

                //    var M_tableCell = $('<td style="font-size: 11px;">').attr('align', 'center').text(M_Value);

                //    M_tableFooterRow.append(M_tableCell);
                //}
               
                


                //// Append the table row to the table footer
                //var tblfooter = $('#tablefooter');
                //tblfooter.append(tableFooterEmptyRow);
                //tblfooter.append(tableFooterRow);



                //// Append the table row to the table footer
                ///*var tblfooter = $('#tablefooter');*/

                //tblfooter.append(S_tableFooterRow);

                //tblfooter.append(tableSFooterRow);
                
                //tblfooter.append(M_tableFooterRow);
               








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
                        for (var index = 1; index <= daysInMonth; index++) {
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



                        /*debugger;*/




                         //tableRow.append($('<td>').text(item.sep));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth+1]));
                        tableRow.append($('<td>').text(dynamicColumns[daysInMonth+2]));
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




$(document).ready(function () {
    //document.getElementById("printButton").addEventListener("click", function () {
    //    window.print();
    //});

    $('#printButton').on('click', function () {
        /*debugger;*/
           var printContents = $('#printDiv').html();
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    });
});


