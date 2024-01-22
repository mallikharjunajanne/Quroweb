

//--------------------------------------  For EMPLOYEE ATTENDANCE POSTING  20-09-2023

/*const { data } = require("jquery");*/




//--------------------------Search  EMPLOYEE ATTENDANCE POSTING
$(document).ready(function () {
   // searchManageEmployeeAttendence();
   // setProgressBar(6, '.c-6');
})

//---------------------------------------------------------------------------------------------   When Click ON Search Button 
var month_EAP = " ";
var Month_EAP_val=" ";
var year_EAP = " ";
$("#Serach_EAP").submit(function (event) {
    event.preventDefault();
    loaddingimg.css('display', 'block');
    month_EAP = $("#Serach_EAP").find("#insertdropdown_Month_EAP option:selected").text();
    Month_EAP_val = $("#Serach_EAP").find("#insertdropdown_Month_EAP option:selected").val();
    year_EAP = $("#Serach_EAP").find("#insertdropdown_year_EAP").val();
    var formdata_CSA = $(this).serialize();

    var formElement = document.getElementById('Serach_EAP');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationmelength = validationMessages.length;
        if (validationmelength == 0) {
            CommonAjaxFunction('GET', '/PayRoll/GetEmployeeAttendence', null, function (response) {
                $("#GetEmployeeAttendenceAppend").html(response);
                searchManageEmployeeAttendence(formdata_CSA);

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




var newTableEAP;





function searchManageEmployeeAttendence(data) {

    loaddingimg.css('display', 'block');
    CommonAjaxFunction('GET', '/PayRoll/GetEmployeeAttendenceJson', data, function (response) { bindDatatableME(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableME(response) {

        // debugger;
        var formattedDate = GetDateFormat();
        var table = $('#tblEAPsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_EAP").text(response.length);
        if (response.length != 0) {


            if (response[0].attendanceMonthly == "0") {
                $('#tblEAPsearchresults').find('th:nth-child(7), th:nth-child(8), th:nth-child(9), th:nth-child(10)').css('color', 'red');
                //$('#tblEAPsearchresults').find('th').css('background-color', 'white');
            }
            else {
                $('#tblEAPsearchresults').find('th:nth-child(7), th:nth-child(8), th:nth-child(9), th:nth-child(10)').css('color', 'green');
               // $('#tblEAPsearchresults').find('th').css('background-color', '#dfd3d3');
            }

            $("#totalrecords_Tranctions_EAP").text(response.length);
             newTableEAP = $("#tblEAPsearchresults").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'pdfHtml5',
                        title: 'EMPLOYEE ATTENDANCE REPORT',
                        orientation: 'landscape',
                        pageSize: 'LEGAL',
                        customize: function (doc) {
                            // Center-align the title
                            doc.content[0].alignment = 'center';

                            // Set the top margin for the title
                            doc.content[0].margin = [0, 0, 0, 10]; // [left, top, right, bottom]

                            // Add line breaks and center-align Month, Year, and Report On
                            doc.content.splice(1, 0,
                                {
                                    text: 'Month: ' + month_EAP,
                                    alignment: 'center'
                                },
                                {
                                    text: 'Year: ' + year_EAP,
                                    alignment: 'center'
                                },
                                {
                                    text: 'Report On: ' + formattedDate,
                                    alignment: 'center'
                                }
                            );
                             var inputFields = $(doc.content).find('input[type="text"]');
                            inputFields.each(function () {
                                var replacement = $(this).val();
                                var placeholder = '<input type="text" value="' + replacement + '" />';
                                $(this).replaceWith(placeholder);
                            });
                        },
                       

                        exportOptions: {
                            format: {
                                body: function (data, row, column, node) {
                                    // Check if the element is an input element
                                    if ($(node).find('input[type="text"]').length) {
                                        // If it's an input element, return its value
                                        return $(node).find('input[type="text"]').val();
                                    } else {
                                        // If it's neither an input nor an img element, return the text content of the cell
                                        return $(node).text();
                                    }
                                }
                            }
                        },

                    }
                    ,
                    {
                        extend: 'excelHtml5',
                        title: 'EMPLOYEE ATTENDANCE REPORT',
                        messageTop: '---->Month: ' + month_EAP + '------->Year: ' + year_EAP + '-------->Report On: ' + formattedDate,
                        customize: function (xlsx) {
                            var sheet = xlsx.xl.worksheets['sheet1.xml'];

                            //// Center-align the title in the worksheet
                            //var titleCell = $(sheet).find('c[r^="A1"]');
                            //titleCell.attr('s', '2'); // Apply a style to center-align
                            $('c[r*="A1"]', sheet).attr('s', '2');

                            // Apply a border to the entire table
                            var rows = $(sheet).find('row');
                            rows.each(function () {
                                $(this).find('c').attr('s', '25'); // Apply a style with a border (s=25) to each cell
                            });
                        },

                        exportOptions: {
                            format: {
                                body: function (data, row, column, node) {
                                    // Check if the element is an input element
                                    if ($(node).find('input[type="text"]').length) {
                                        // If it's an input element, return its value
                                        return $(node).find('input[type="text"]').val();
                                    } else {
                                        // If it's neither an input nor an img element, return the text content of the cell
                                        return $(node).text();
                                    }
                                }
                            }
                        }

                    },
                    //{
                    //    extend: 'excel',
                    //    exportOptions: {
                    //        format: {
                    //            body: function (data, row, column, node) {
                    //                // Check if the element is an input element
                    //                if ($(node).find('input[type="text"]').length) {
                    //                    // If it's an input element, return its value
                    //                    return $(node).find('input[type="text"]').val();
                    //                } else {
                    //                    // If it's neither an input nor an img element, return the text content of the cell
                    //                    return $(node).text();
                    //                }
                    //            }
                    //        }
                    //    }





                    //},

                    {
                        extend: 'print',
                        title: '<center>EMPLOYEE ATTENDANCE REPORT</center>',

                        message: [
                            '<center>Month:' + month_EAP + '</center><center>Year:' + year_EAP + '</center><center>Report On: ' + formattedDate + '</center>'
                        ],


                        exportOptions: {
                            format: {
                                body: function (data, row, column, node) {
                                    // Check if the element is an input element
                                    if ($(node).find('input[type="text"]').length) {
                                        // If it's an input element, return its value
                                        return $(node).find('input[type="text"]').val();
                                    } else {
                                        // If it's neither an input nor an img element, return the text content of the cell
                                        return $(node).text();
                                    }
                                }
                            }
                        },
                    }
                        
                        //body: function (data, row, column, node) {
                        //        return $(data).is("div") ?
                        //            $(data).find('input').val() :
                        //            data;
                        //    }
                        //}


                ],

                bProcessing: false,
                bLengthChange: true,
                bfilter: false,
                bSort: true,
                searching: false,
                paging: false,
                bPaginate: false,
                /*  scrollX: true,*/
                data: response,
                columns: [

                    //{
                    //    //data: "UserId",
                    //    //visible: false,

                    //    render: function (data, type, row, meta) {
                    //        //  length++;
                    //        return row.userId
                    //    }
                    //},
                    {
                        targets: 1, // Assuming this is the column index where you want to display numbering
                        render: function (data, type, row, meta) {
                            var currentPage = table.page.info().page;
                            var rowsPerPage = table.page.info().length;
                            return (0 * rowsPerPage) + meta.row + 1;
                        }
                    }, {
                        data: "AdmissionNumber",
                      
                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.admissionNumber

                        }
                    },

                    {
                        data: "FullName",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.fullName 


                        }
                    }, {
                        data: "Department",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.department + '<textarea  hidden>' + row.userId + '</textarea>'

                        }
                    }, {
                        data: "MobileNumber",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.mobileNumber

                        }
                    }, {
                        data: "PortalEmail",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.portalEmail

                        }
                    }, {
                        data: "WorkingDays",
                       

                        render: function (data, type, row, meta) {
                           
                            if (row.display1 == 1) {
                                return '<input type="text" value="' + row.workingDays + '"  onkeypress="return(AllowFloat(event))"/>  <img src="/Images_IMP/AuditIcon.png" style="width: 16px;" onclick="ShowUserChangeActivityAmount(' + row.attendanceMonthly + ', \'workingDays\', \'AttendanceMonthly\');" />'

                            } else {
                                return '<input type="text" value="' + row.workingDays + '"  onkeypress="return(AllowFloat(event))" />'

                            }
                          
                          

                        }
                    }, {
                        data: "PresentDays",

                        render: function (data, type, row, meta) {

                            if (row.display2 == 1) {
                                return '<input type="text" value="' + row.presentDays + '"  onkeypress="return(AllowFloat(event))" />  <img src="/Images_IMP/AuditIcon.png" style="width: 16px;" onclick="ShowUserChangeActivityAmount(' + row.attendanceMonthly + ', \'presentDays\', \'AttendanceMonthly\');" />'

                            } else {
                                return '<input type="text" value="' + row.presentDays + '"  onkeypress="return(AllowFloat(event))" />'

                            }
                          
                        }
                    }, {
                        data: "NumberofLeaves",

                        render: function (data, type, row, meta) {
                            if (row.display3 == 1) {
                                return '<input type="text" value="' + row.numberofLeaves + '"  onkeypress="return(AllowFloat(event))" />  <img src="/Images_IMP/AuditIcon.png" style="width: 16px;" onclick="ShowUserChangeActivityAmount(' + row.attendanceMonthly + ', \'AbsentDays\', \'AttendanceMonthly\');" />'

                            } else {
                                return '<input type="text" value="' + row.numberofLeaves + '" onkeypress="return(AllowFloat(event))" />'
                            }
                           

                        }
                    }, {
                        data: "LossPayDays",

                        render: function (data, type, row, meta) {
                            if (row.display4 == 1) {
                                return '<input type="text" value="' + row.lossPayDays + '" onkeypress="return(AllowFloat(event))" />  <img src="/Images_IMP/AuditIcon.png" style="width: 16px;" onclick="ShowUserChangeActivityAmount(' + row.attendanceMonthly + ', \'LossOfPayDays\', \'AttendanceMonthly\');" />'

                            } else {
                                return '<input type="text" value="' + row.lossPayDays + '"  onkeypress="return(AllowFloat(event))" />'
                            }
                        }
                    }, {
                        data: "CL",

                        render: function (data, type, row, meta) {
                            if (row.display7 == 1) {
                                return '<input type="text" value="' + row.cl + '"  onkeypress="return(AllowFloat(event))" />  <img src="/Images_IMP/AuditIcon.png" style="width: 16px;" onclick="ShowUserChangeActivityAmount(' + row.attendanceMonthly + ', \'CL\', \'AttendanceMonthly\');" />'

                            } else {
                                return '<input type="text" value="' + row.cl + '"  onkeypress="return(AllowFloat(event))" />'
                            }

                        }
                    }, {
                        data: "OD",

                        render: function (data, type, row, meta) {
                            if (row.display8 == 1) {
                                return '<input type="text" value="' + row.od + '" onkeypress="return(AllowFloat(event))" /> <img src="/Images_IMP/AuditIcon.png" style="width: 16px;" onclick="ShowUserChangeActivityAmount(' + row.attendanceMonthly + ', \'OD\', \'AttendanceMonthly\');" />';


                            } else {
                                return '<input type="text" value="' + row.od + '" onkeypress="return(AllowFloat(event))" />'
                            }
                        }
                    }

                ]


            });
            try {
                newTableEAP.column(0).order('asc').draw();
                $("#attendencetable").find('#attendenceposting').remove();
                $("#attendencetable").append('<div style="text-align: center;padding: 11px;" ><input type="button" value="Submit" class="btn btn-pill btn-outline-success btn-air-success" id="attendenceposting" style="background-color: #1a68ff;color: white;" /></div>')
            }
            catch {
                $("#attendencetable").append('<div style="text-align: center;padding: 11px;" ><input type="button" value="Submit" class="btn btn-pill btn-outline-success btn-air-success" id="attendenceposting" style="background-color: #1a68ff;color: white;" /></div>')

            }
           

        }
        loaddingimg.css('display', 'none');
    }

}

//------------------------------------------------------------------------------      Click on Submit  for Employee attendence posting 

$(document).on('click', '#attendencetable #attendenceposting', function (event) {
    event.stopImmediatePropagation();
  //  debugger;
        //---------------------------------------------------------    All Error Messages
    var errorappend = $('.row .errorofallemployeeattendence');
    
    var Errorworking = "Please Enter the Working days for";
    var ErrorMatchWorking = "Number of working days should not be greater than the number of days in";
    var Errorsum_P_A_W = "Sum of Present days and Absent days must be equal to Working Days for";
    var Errorsum_L_C_O_A = "Absent days should be equal to sum of Loss of Pay days and no. of CLs and no. of ODs for";
    var Errorless_L_A = "Loss of pay days should be lesser than Absent days for";
    //------------------------------------------------------------------------------------------------
    var parenttable = $('#tblEAPsearchresults tbody tr');
    parenttable.find('input[type="text"]').removeClass('errorboxshadow');
    var tablelength = $(parenttable).length;
    var daysInMonth = getDaysInMonth(parseInt(year_EAP), parseInt(Month_EAP_val - 1));
    var numberoferrors = 0;
    for (var i = 0; i < tablelength; i++) {
        var parentname = $(parenttable[i]).find('td:nth-child(3)').text();

        var working = parseInt($(parenttable[i]).find('td:nth-child(7)').find('input[type="text"]').val()) || 0;
        var present = parseInt($(parenttable[i]).find('td:nth-child(8)').find('input[type="text"]').val()) || 0;
        var absent = parseInt($(parenttable[i]).find('td:nth-child(9)').find('input[type="text"]').val()) || 0;
        var lop = parseInt($(parenttable[i]).find('td:nth-child(10)').find('input[type="text"]').val()) || 0;
        var cl = parseInt($(parenttable[i]).find('td:nth-child(11)').find('input[type="text"]').val()) || 0;
        var od = parseInt($(parenttable[i]).find('td:nth-child(12)').find('input[type="text"]').val()) || 0;
       
        if (working == 0) {
            $(errorappend).text(Errorworking + " " + parentname + ".");
            $(parenttable[i]).find('td:nth-child(7)').find('input[type="text"]').addClass('errorboxshadow');
            window.scrollTo(0, 400);
            break;
        } else if (working > daysInMonth) {
            $(errorappend).text(ErrorMatchWorking + " " + month_EAP + " (selected month).");
            $(parenttable[i]).find('td:nth-child(7)').find('input[type="text"]').addClass('errorboxshadow');

            window.scrollTo(0, 400);
            break;
        } else if (working != (present + absent)) {
            $(errorappend).text(Errorsum_P_A_W + " " + parentname + ".");
            $(parenttable[i]).find('td:nth-child(8), td:nth-child(9)').find('input[type="text"]').addClass('errorboxshadow');

            window.scrollTo(0, 400);
            break;
        } else if (absent < lop) {
            $(errorappend).text(Errorless_L_A + " " + parentname + ".");
            $(parenttable[i]).find('td:nth-child(10)').find('input[type="text"]').addClass('errorboxshadow');
            window.scrollTo(0, 400);
            break;
        }
        else if (absent != (lop + cl + od)) {
            $(errorappend).text(Errorsum_L_C_O_A + " " + parentname + ".");
            $(parenttable[i]).find('td:nth-child(10) , td:nth-child(11), td:nth-child(12)').find('input[type="text"]').addClass('errorboxshadow');
            window.scrollTo(0, 400);
            break;
        }
        else {
            numberoferrors++;
        }

    }
   //--------------------------------------------------------------------------- Insert the  Data (attendence Posting)
    if (numberoferrors == tablelength) {
       // debugger;
        var formData = new FormData();
        formData.append('monthNo',Month_EAP_val);
        formData.append('yearNo',year_EAP);
     //   formData.append('AttendanceMonthly', "1");

        loaddingimg.css('display', 'block')
        for (var i = 0; i < tablelength; i++) {
           
           
            formData.append('AdmissionNumber', parseInt($(parenttable[i]).find('td:nth-child(4) textarea').val()) || 0);

            formData.append('Workingdays', parseInt($(parenttable[i]).find('td:nth-child(7) input[type="text"]').val()) || 0);
            formData.append('Presentdays', parseInt($(parenttable[i]).find('td:nth-child(8) input[type="text"]').val()) || 0);
            formData.append('NumberOfLeaves', parseInt($(parenttable[i]).find('td:nth-child(9) input[type="text"]').val()) || 0);
            formData.append('LossOfPayDays', parseInt($(parenttable[i]).find('td:nth-child(10) input[type="text"]').val()) || 0);
            formData.append('CL', parseInt($(parenttable[i]).find('td:nth-child(11) input[type="text"]').val()) || 0);
            formData.append('OD', parseInt($(parenttable[i]).find('td:nth-child(12) input[type="text"]').val()) || 0);
           
        };
      
       
        //--------------------------------------------------------------------   Common Ajax Method For Inserting and Updating The Employee attendence
        CommonAjaxFunction('POST', '/PayRoll/GetEmployeeAttendence', formData, function (response) {
            loaddingimg.css('display', 'none');
            $(errorappend).text('Attendance Saved SuccessFully.');
            $('.alert-success p').text("Attendance Saved SuccessFully.");
            $(".alert-success").show().delay(6000).fadeOut()
        }, function (status, error) {
            loaddingimg.css('display', 'none');
        }, true);


  
    }

})
























//-----------------------------------------------------------------Su Depatment Dropdown getting when department will change
var classfor_EAP = document.getElementById('insertdropdown_InstanceSubClassificationId_EAP');

$(document).on('change', '#Serach_EAP #insertdropdown_InstanceClassificationId_EAP', function (event) {
  //  debugger;
    event.stopImmediatePropagation();
    var InstanceClassificationId = $(this).val();

    classfor_EAP.innerHTML = ' <option value>-- Please select a Class --</option>';
    $.ajax({
        url: '/PayRoll/GetClassfor_EAP?InstanceClassificationId=' + InstanceClassificationId,
        type: 'POST',
        success: function (response) {
            if (response.length == 0) {
                classfor_EAP.disabled = true;
            }
            else {
                classfor_EAP.disabled = false;
            }
            response.forEach(response => {
                const newoption = document.createElement('Option');
                newoption.value = response.value;
                newoption.text = response.text;
                classfor_EAP.add(newoption);
            })
        }
    })
});
//-----------------------------------  Drop Down Change (Total Working Days)  --  set the values same All input Field $
$(document).on('change', '#insertdropdown_DaysDrop_EAP', function (event) {
    event.stopImmediatePropagation();
    var dropval = $(this).val();
    var textboxval = $("#totalWorkingdays").find('input[type="text"]').val();
    var tdinputs;
    if (!isNaN(textboxval)) {
        if (dropval == 1) {
            tdinputs = $('#tblEAPsearchresults').find('td:nth-child(7) input[type="text"]');
        }   else if (dropval == 2) {
            tdinputs = $('#tblEAPsearchresults').find('td:nth-child(8) input[type="text"]');
        }
           else if (dropval == 3) {
            tdinputs = $('#tblEAPsearchresults').find('td:nth-child(9) input[type="text"]');
        }
           else if (dropval == 4) {
            tdinputs = $('#tblEAPsearchresults').find('td:nth-child(10) input[type="text"]');
        }
       else if (dropval == 7) {
            tdinputs = $('#tblEAPsearchresults').find('td:nth-child(11) input[type="text"]');
        }
         else if (dropval == 8) {
            tdinputs = $('#tblEAPsearchresults').find('td:nth-child(12) input[type="text"]');
        }
    }
    if (tdinputs.length != 0) {
        tdinputs.each(function () {
            if ($(this).val() == "") {
                $(this).val(textboxval);
            }
        });
    }

})
