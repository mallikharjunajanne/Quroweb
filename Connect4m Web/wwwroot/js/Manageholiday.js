// ------------ MANAGE HOLIDAYS INSERT FUNCTION CODE START ------------
function DataCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function tableajax(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: bindDatatable,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function CallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
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

//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {
        $('#Error_Sp').text("");
        debugger;
        var Startdate = new Date($("#SDate_txtid").val());
        var Enddate = new Date($("#EDate_txtid").val());     

        if (Enddate < Startdate) {
            $('#Error_Sp').text(Edate + " must be greater than " + Sdate + ".");          
        } else {           
            $('#Error_Sp').text("");
        }
    } catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$("#SDate_txtid").on("change", function () { DatesCompare("Start Date", "End Date"); });
$("#EDate_txtid").on("change", function () { DatesCompare("Start Date", "End Date"); });

$('#Insertholiday').submit(function (event) {
    event.preventDefault();
    debugger;
    if (!$(this).valid()) {
  
        if (!$('input[name="default-radio-1"]:checked').val()) {
            $('#HolidaySp_id').text('Please select a Holiday Type');
            return;
        } else {
            $('#HolidaySp_id').text('');
        }
        return;
    }
    var formdata_ISN = new FormData($('#Insertholiday')[0]);
    CallToAjax('POST', '/Admin/Insert_Holiday', formdata_ISN,
        function (response) {
            debugger; 
            if (response == "0") {

                $('#Inserterrormessage').text('Holiday Already Exists Between these Dates Or Holiday Name Already Exists');

            }
            else if (response == "-1") {

                //$('#Inserterrormessage').text('You cannot update restricted holiday because restricted holiday applied by the staff.');
                $('#Inserterrormessage').text('Start Date can not be greater than End Date.');

            }
            else {
                Holidaysbindingfun();
                $('#Savebtn, #Clearbtn').prop('disabled', true);
                $('#Inserterrormessage').text('Record inserted successfully.');


            }
            //else if (response == "-1") {
            //    $('#Inserterrormessage').text('Something went wrong please try again.');
            //}else{
            //    $('#Inserterrormessage').text('Something went wrong please try again.');
            //}
        },
        function (status, error) {

        },
        true);
});

$('#BackToSearchbtn').click(function () {
    $('#Inserterrormessage').text('');
    $('#Manageholidays_Main1').show();
    $('#Manageholidays_Insertdiv2').empty();
    $('#Manageholidays_Updatediv3').empty();   
})

$('#Clearbtn').click(function () {
    $('#Inserterrormessage').text('');
    $('#Insertholiday')[0].reset();
});

// ------------ MANAGE HOLIDAYS INSERT FUNCTION CODE END ------------


//----------Edit Holiday Method code
$(document).ready(function () {

   Holidaysbindingfun();
});

//TABLE DATA BINDING CODE START HERE
function Holidaysbindingfun() {
    debugger;
    tableajax('GET', '/Admin/ManageHolidaysTabledata', null,

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );
}

$('#btnsearch').click(function () {
    var selectedYear = $('#Year').val();
    var selectedMonth = $('#Month').val();
    var selectedHolidayType = $('input[name="default-radio-1"]:checked').val();

    $('#Errormessage').text('');

    debugger;
    var dataToSend = {
        year: selectedYear,
        Monthid: selectedMonth,
        Type: selectedHolidayType
    };

    DataCallToAjax('GET', '/Admin/ManageHolidaysTabledata', dataToSend,
        function (response) {
            bindDatatable(response);
        }, function (status, error) {
            // Handle error if needed
        }
    );
});

$('#addnewmanageholidays').click(function () {
    $('#Updateerrormessage').text('');
    debugger;
    DataCallToAjax('GET', '/Admin/Insert_Holiday',null,    
        function (response) {
            debugger;
            $('#Manageholidays_Main1').hide();
            $('#Manageholidays_Updatediv3').empty();
            $('#Manageholidays_MailSMSPostingdiv4').empty();
            $('#Manageholidays_Insertdiv2').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
});


//-----------------DataTable Data Dinding Function
function bindDatatable(response) {

    var formattedDate = GetDateFormat();
    debugger;
    var table = $('#ManageHolidaystbl').DataTable();
    table.destroy();
    $("#Holidays_Recordscount").text(response.length);

    var newTable = $("#ManageHolidaystbl").DataTable({
        dom: '<"tops"lf>t<"bottom"ip>',
        buttons: [],
        bProcessing: false,
        bLengthChange: false,
        //lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],
        bfilter: true,
        bSort: false,
        searching: false,
        //scrollX: true,
        //scrollY: '400px',
        //scrollCollapse: true,
        paging: true,
        bPaginate: false,
        pageLength: 10,
        //stateSave:true,
        data: response,



        //dom: 'Bfrtip',
        //buttons: [
        //    {
        //        extend: 'print',
        //        text: '<i class="fa-solid fa-print"></i>Print',
        //        title: 'Holidays List',
        //        className: 'btn btn-primary',
        //        titleAttr: 'Print' // Tooltip for accessibility
        //    },
        //    {
        //        extend: 'excelHtml5',
        //        text: '<i class="fa fa-file-excel-o"></i>Export to Excel',
        //        title: 'Holidays List', // Custom title for Excel export
        //        className: 'btn btn-success',
        //        exportOptions: {
        //            columns: [0, 1, 2, 3] // Export columns 1, 2, 3, and 4 (0-based index)
        //        },
        //        customize: function (xlsx) {
        //            // Get the worksheet
        //            var sheet = xlsx.xl.worksheets['sheet1.xml'];

        //            // Add borders to all cells
        //            var cells = $('row c', sheet);
        //            cells.each(function () {
        //                $(this).attr('s', '25'); // Apply border style
        //            });

        //            // Set custom column widths (in Excel style)
        //            // Columns 1, 2, 3, and 4 (0-based index)
        //            var columnWidths = [
        //                { column: 'A', width: 20 }, // Column 1
        //                { column: 'B', width: 25 }, // Column 2
        //                { column: 'C', width: 30 }, // Column 3
        //                { column: 'D', width: 25 }  // Column 4
        //            ];

        //            // Set the column widths
        //            columnWidths.forEach(function (col) {
        //                var colElement = $('col [min="' + col.column + '"]', sheet);
        //                colElement.attr('width', col.width);
        //            });

        //            // Set custom headers (if needed)
        //            var headerRow = $('row', sheet).first();
        //            headerRow.find('c').each(function (index) {
        //                // You can customize the header text or styles here if needed
        //                if (index === 0) {
        //                    $(this).text('Holiday Name'); // Example header customization
        //                }
        //                if (index === 1) {
        //                    $(this).text('Start Date');
        //                }
        //                if (index === 2) {
        //                    $(this).text('End Date');
        //                }
        //                if (index === 3) {
        //                    $(this).text('Holiday Type');
        //                }
        //            });
        //        }
        //    },
        //],
        //bProcessing: false,
        //bLengthChange: true,
        ///*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
        //bfilter: false,
        //bSort: true,
        //searching: false,
        ////scrollX: true,
        ////scrollY: '400px',
        ///* scrollCollapse: true,*/
        //paging: true,
        //bPaginate: true,
        ////  stateSave:true,
        //data: response,
        columns: [

            //{
            //    data: "SNO",
            //    //visible: false,

            //    render: function (data, type, row, meta) {
            //        //  length++;
            //        return row.holidayId
            //    }
            //},
            {
                targets: 0, // Assuming this is the column index where you want to display numbering
                render: function (data, type, row, meta) {
                    var currentPage = table.page.info().page;
                    var rowsPerPage = table.page.info().length;
                    return (0 * rowsPerPage) + meta.row + 1;
                }
            },

            {
                data: "HolidayName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.holidayName

                }
            },
            {
                data: "HolidayType",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.holidayType

                }
            },
            {
                data: "StartDate",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.startDate + '<input type="text" value=' + row.holidayId + ' hidden/>'

                }
            },
            {
                data: "EndDate",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.endDate

                }
            }
            ,
            {
                data: "NoofDays",

                render: function (data, type, row, meta) {
                    return row.noofDays
                    //var paymentDate = new Date(row.paymentDate);

                    // return paymentDate.toLocaleDateString();

                }
            },
            {
                data: "IsPosted",

                render: function (data, type, row, meta) {
                    //return row.isPosted
                    if (row.isPosted == 'False') {
                        return 'Not Posted'
                    } else {
                        return 'Posted'
                    }

                    //if (row.docName.trim() !== "") {
                    //    return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i><i class="fa fa-eye" title="View document" id="SEMView_document" ><span style="display:none">' + row.docName + '</span> </i>'
                    //}
                    //else {
                    //    return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i>'
                    //}

                }
            }, {
                data: "HolidayId",

                render: function (data, type, row, meta) {
                    // return row.holidayId
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                }
            }
            //}, {
            //    data: "Approvals",

            //    render: function (data, type, row, meta) {
            //        if (row.approvals == null || row.approvals == "") {

            //            return '<div class="SEMapprovals"><img src="/Images_IMP/pending_02.png"  title="Pending" /></div>'
            //        }
            //        else if (row.approvals == "0") {
            //            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/Rejects.png" title="Reject" /><i class="fa fa-eye" style="font-size:20px" title="View Comments" ></i></i></div>'
            //        }
            //        else {
            //            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/approvals_1.png"  title="Approvals" /><i class="fa fa-eye" style="font-size:20px" title="View Comments"  ></i></i></div>'
            //        }

            //    }
            //}
            //, {

            //    render: function (data, type, row, meta) {
            //        //  length++;
            //        if (row.approvals == "1") {
            //            return ''
            //        }
            //        else {
            //            return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

            //        }

            //    }
            //}
        ]

    });
   
    table.on('draw', function () {
        $('#ManageHolidaystbl').find('td:nth-child(2)').attr('title', 'Edit').css({
            color: 'black',
            'text-decoration': 'underline',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
    });
    $('#ManageHolidaystbl').find('td:nth-child(2)').attr('title', 'Edit').css({
        color: 'black',
        'text-decoration': 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
}

function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}

function Clearform(formid) {
    debugger;
    // Retrieve the form element by id
    var form = document.getElementById(formid);

    if (form) {
        // Use the reset method to clear the form
        form.reset();
        Holidaysbindingfun();
        // Clear ASP.NET Core validation messages
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });

    } else {
        console.error("Form with id '" + formid + "' not found.");
    }
}

$(document).on('click', '#ManageHolidaystbl .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var HolidayId = $(this).closest('tr').find('input[type="text"]').val();

    Deletefun(HolidayId);


    //var confirmed = confirm("Are you sure you want to delete Holiday?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    //if (confirmed) {
    //    debugger;
    //    var HolidayId = $(this).closest('tr').find('input[type="text"]').val();
    //    var table = $('#ManageHolidaystbl').DataTable();
    //    var tabletargetpagetblSEMsearchresults = table.page.info().page;

    //    $.ajax({
    //        url: '/Admin/Delete_Holiday?HolidayId=' + HolidayId,
    //        type: 'GET',
    //        //data: data,
    //        success: function (response) {
    //            debugger;
    //            if (response == "1") {
    //                $('#Errormessage').text('Record deleted successfully.');
    //                Holidaysbindingfun();
    //            } else {
    //                $('#Errormessage').text('Sommething went wrong...!')
    //            }
    //        }
    //    });
    //}
});

$(document).on('click', '#ManageHolidaystbl td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Holidayid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#ManageHolidaystbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    Editholiday(Holidayid);
})

function Editholiday(Holidayid) {
    $.ajax({
        url: '/Admin/Update_Holiday?HolidayId=' + Holidayid,
        type: 'GET',
        //data: data,
        success: function (response) {          
            $('#Manageholidays_Insertdiv2').empty();
            $('#Manageholidays_Main1').hide();
            $('#Manageholidays_Updatediv3').html(response);
        },
        error: function (xhr, status, error) {
            //errorCallback(xhr.status, error);
        }
    });
}

$('#UpdateHoliday').submit(function (event) {
    event.preventDefault();
    loaddingimg.css('display', 'block');
    $('#HolidaytypeSpid').text('');
    debugger;
    if (!$(this).valid()) {
        debugger;
        if (!$('input[name="Holidaytyperadio1"]:checked').val()) {
            $('#HolidaytypeSpid').text('Please select a Holiday Type');
            return;
        } else {
            $('#HolidaytypeSpid').text('');
        }
        return;
    }
    
   
    var selectedValue = $('.mji input[name="default-radio-1"]:checked').val();
    var formdata_Uph = new FormData($('#UpdateHoliday')[0]);
    formdata_Uph.append("HType", selectedValue);

    CallToAjax('POST', '/Admin/Update_Holiday', formdata_Uph,
        function (response) {
            debugger;
            if (response == "0") {
                loaddingimg.css('display', 'none');
                $('#Updateerrormessage').text('Holiday Already Exists Between these Dates Or Holiday Name Already Exists');
            }
            else if (response == "2") {
                loaddingimg.css('display', 'none');
                $('#Updateerrormessage').text('You cannot update restricted holiday because restricted holiday applied by the staff.');
            }
            else if (response == "1") {
                loaddingimg.css('display', 'none');
                $('#Updateerrormessage').text('Record updated successfully.');
                $('#Dltbtn, #CEFTHbtn,#Updatebtn').prop('disabled', true);
            }
            else {
                loaddingimg.css('display', 'none');
                $('#Updateerrormessage').text('Something went wrong please try again.');
            }
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        },
        true);
    loaddingimg.css('display', 'none');
});

$('#Dltbtn').click(function () {
    var HolidayId = $('#HolidayId').val();
    Deletefun(HolidayId);

    //$.ajax({
    //    url: '/Admin/Delete_Holiday?HolidayId=' + HolidayId,
    //    type: 'GET',
    //    //data: data,
    //    success: function (response) {
    //        debugger;
    //        if (response == "1") {
    //            $('#Dltbtn, #CEFTHbtn, #Updatebtn').prop('disabled', true);              
               
    //            $('#Errormessage').text('Record deleted successfully.');
    //            CallToAjax('GET', '/Admin/ManageHolidaysTabledata',

    //                //function bindDatatable();
    //                function (status, error) {
    //                    // Handle error if needed
    //                }
    //            );
    //        } else {
    //            $('#Errormessage').text('Something went wrong...!')
    //        }
    //    }
    //});
})

$('#BackToSearchUbtn').click(function () {
    location.reload();
    $('#Updateerrormessage').text('');
    $('#Manageholidays_Main1').show();
    $('#Manageholidays_Insertdiv2').empty();
    $('#Manageholidays_Updatediv3').empty();
})

function Deletefun(HolidayId) {
    var confirmed = confirm("Are you sure you want to delete Holiday?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    var data = { HolidayId: HolidayId };
    if (confirmed) {
        DataCallToAjax('GET', '/Admin/Delete_Holiday', data,
            function (response) {
                debugger;
                location.reload();
                if (response == "1") {
                    $('#Dltbtn, #CEFTHbtn, #Updatebtn').prop('disabled', true);
                    $('#Errormessage').text('Record deleted successfully.');
                   
                    Holidaysbindingfun();
                } else if (response == "") {
                    $('#Errormessage').text('Something went wrong please try again.');
                } else {
                    $('#Errormessage').text('Something went wrong please try again.');
                }

            }, function (status, error) {

            }
        );
    }
}

// ------------ CREATE EXCEPTION FOR HOLIDAY USERS POSTING BUTTON AFTER VIEW IN CODE ------------

$('#CEFTHbtn').click(function () {
    $('#Updateerrormessage').text('');

    var HolidayName = $('#Holidaytxtid').val();
    var Holidayid = $('#HolidayId').val();

    $.ajax({
        url: '/Admin/Holidayspostusers?HolidayId=' + Holidayid,
        type: 'GET',
        //data: data,
        success: function (response) {
              
            $('#Manageholidays_Heaingmaindiv0').hide();
            $('#Manageholidays_Main1').hide();           
            $('#Manageholidays_Updatediv3').empty();
            $('#Manageholidays_MailSMSPostingdiv4').html(response);
            $('#HolidayNamelblid').text(HolidayName);
           // $('#HolidayidlblId').text(Holidayid);
            $('#HolidayidlblId').val(Holidayid);
        }
    });
});

$('#BacktoSearchinpostuserbtn').click(function () {
    debugger;
    $('#Updateerrormessage').text('');
    location.reload();
    $('#Manageholidays_Heaingmaindiv0').show();
    $('#Manageholidays_Main1').show();
    $('#Manageholidays_Insertdiv2').empty();
    $('#Manageholidays_Updatediv3').empty();
    $('#Manageholidays_MailSMSPostingdiv4').empty();

});

function Getcheckboxvalues(RolecheckboxSelector, GrpcheckboxSelector, ClscheckboxSelector, SclcheckboxSelector) {
    var checkboxValues = {};
    var selectors = [
        RolecheckboxSelector,
        GrpcheckboxSelector,
        ClscheckboxSelector,
        SclcheckboxSelector
    ];
    selectors.forEach(function (selector) {
        var checkboxes = document.querySelectorAll(selector);
        var checkedCheckboxValues = [];

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                checkedCheckboxValues.push(checkbox.value);
            }
        });
        if (selector === RolecheckboxSelector) {
            checkboxValues['Rolecheckbox'] = checkedCheckboxValues;
        } else if (selector === GrpcheckboxSelector) {
            checkboxValues['Grpcheckbox'] = checkedCheckboxValues;
        } else if (selector === ClscheckboxSelector) {
            checkboxValues['Clscheckbox'] = checkedCheckboxValues;
        } else if (selector === SclcheckboxSelector) {
            checkboxValues['Sclcheckbox'] = checkedCheckboxValues;
        }
    });
    return checkboxValues;
}

$('#PostSmsMailbtn').on('click', function () {
    debugger;
    var HolidayId= $('#HolidayidlblId').val();  
    var ForAll; 
    var RolecheckboxSelector = 'input[type="checkbox"][name="rolecheckboxs"]';
    var GrpcheckboxSelector = 'input[type="checkbox"][name="Grpcheckboxs"]';
    var ClscheckboxSelector = 'input[type="checkbox"][name="Clscheckboxs"]';
    var SclcheckboxSelector = 'input[type="checkbox"][name="Sclcheckboxs"]';    

    var Allcheckboxvalues = Getcheckboxvalues(RolecheckboxSelector, GrpcheckboxSelector, ClscheckboxSelector, SclcheckboxSelector);
    var Rolecheckboxvalues = Allcheckboxvalues['Rolecheckbox'];
    var Groupcheckboxvalues = Allcheckboxvalues['Grpcheckbox'];
    var Classificationcheckboxvalues = Allcheckboxvalues['Clscheckbox'];
    var Subclassificationcheckboxvalues = Allcheckboxvalues['Sclcheckbox'];

    var anyCheckboxUnchecked = (
        Rolecheckboxvalues.length === 0 ||
        Groupcheckboxvalues.length === 0 ||
        Classificationcheckboxvalues.length === 0 ||
        Subclassificationcheckboxvalues.length === 0
    );
    var selectAllCheckbox = document.getElementById('Selectallusers_Checkbox');
    var ForAll = selectAllCheckbox.checked ? 1 : 0;
    if (anyCheckboxUnchecked && ForAll === 0) {
        $('#Errormessage').text('No Selection has been Made. Please Select Any User.'); // Change this to your desired error message display method
        return;
    }


    
    if (selectAllCheckbox.checked) {
        ForAll = 1;
    } else {
        ForAll = 0;
    }

    var datatosend = {
        HolidayId: HolidayId,       
        RoleIds: Rolecheckboxvalues,
        GroupIds: Groupcheckboxvalues,
        ClassificationIds: Classificationcheckboxvalues,
        SubClassificationIds: Subclassificationcheckboxvalues,
        ForAll: ForAll,      
    };
    
    $.ajax({
        url: "/Admin/Holidayspostusers",
        type: "POST",
        data: datatosend,
        success: function (response) {
            debugger;
            if (response == "1") {
                $('#PostSmsMailbtn').prop('disabled', true);
                $('#PostSmsMailbtn').removeClass('.btn .btn-pill .btn-outline-success .btn-air-success');
                $('#Errormessage').text('Holiday Posted Successfully.');
            } else if (response == "-1") {
                $('#Errormessage').text('Holiday Poste Unsuccessful.');
            } else {
                $('#Errormessage').text('Holiday Poste Unsuccessful.');
            }           
        }
    });
});

// Holidays Export to excel code This Event its not used
$('#lnkExportExcel_').on('click', function () {

    debugger;
    // Get selected academic year
    var selectedText = $('#Year option:selected').text();
    if (selectedText === "---------Select---------" || selectedText === "") {
        selectedText = "";
    } else {
        selectedText = `Year : ${selectedText}`;
    }

    // Get today's date
    var today = new Date();

    // Array of month names
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get day, month and year
    var day = today.getDate();
    var month = months[today.getMonth()]; // Get the month as a string
    var year = today.getFullYear();

    // Format the date in dd MMM yyyy format
    var formattedDate = `${day < 10 ? '0' + day : day} ${month} ${year}`;

    // Use the formatted date
     //`Report Taken On : ${formattedDate}`;

    // Header Content (to include title and session year)
    var headerContent = `
    <div style="text-align: center; margin-bottom: 20px;">
        <h4 style="margin: 0;">Holidays List</h4>
        <h4 style="margin: 0;">Quro Schools</h4>
        <h4 style="margin: 0;">${selectedText}</h4>
        <h4 style="margin: 0;">Report Taken On : ${formattedDate}</h4>
    </div>`;

    // Clone the original table
    var table1 = document.getElementById("ManageHolidaystbl");
    var table1Clone = table1.cloneNode(true); // Clone the table

    // Apply table styles (borders and cell widths)
    table1Clone.style.borderCollapse = "collapse";  // Collapse borders between cells

    // Remove all <input type="text"> elements to prevent them from being exported
    var inputs = table1Clone.getElementsByTagName("input");
    while (inputs.length > 0) {
        inputs[0].parentNode.removeChild(inputs[0]);
    }

    // Apply border and width to all table cells
    var cells = table1Clone.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.border = "1px solid black";  // Add border to each cell
        cells[i].style.padding = "3px";            // Add padding for better readability
    }

    // Apply styles to table headers (th)
    var headers = table1Clone.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].style.height = "20px";               // Set header row height
        headers[i].style.textAlign = "center";         // Center-align text in header
        headers[i].style.padding = "3px";             // Add padding for readability
        headers[i].style.border = "1px solid black"; // Add border to each cell
        headers[i].style.color = "#000000";         // Set text color (e.g., black) for the header text
        headers[i].style.fontWeight = "bold";      // Optional: Make the header text bold
    }

    // Define the footer content (optional)
    var footerContent = `
    <div style="text-align: center; margin-top: 20px; font-size: 10px; color: gray;">
        <p style="margin: 0;">This is a system generated report contains confidential information intended for a specific individual and a purpose. Any unauthorized use, copying, or distribution of this report is strictly prohibited.</p>
    </div>`;

    // Combine the header, table, and footer content into a single HTML string
    var combinedHtml = headerContent + table1Clone.outerHTML + footerContent;

    // Convert the combined HTML content to an Excel-compatible format (using the HTML table)
    var excelBlob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });

    // Use the FileSaver.js library to save the Blob as an Excel file
    saveAs(excelBlob, 'HolidaysList.xls'); // Trigger file download
});

// HOLIDAYS EXPORT TO EXCEL
$('#lnkExportExcel').on('click', function () {

    debugger;
    // Get selected academic year
    var selectedText = $('#Year option:selected').text();
    if (selectedText === "---------Select---------" || selectedText === "") {
        selectedText = "";
    } else {
        selectedText = `Year : ${selectedText}`;
    }

    // Get today's date
    var today = new Date();

    // Array of month names
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get day, month, and year
    var day = today.getDate();
    var month = months[today.getMonth()]; // Get the month as a string
    var year = today.getFullYear();

    // Format the date in dd MMM yyyy format
    var formattedDate = `${day < 10 ? '0' + day : day} ${month} ${year}`;

    // Header Content (to include title and session year)
    var headerContent = `
    <div style="text-align: center; margin-bottom: 20px;">
        <h4 style="margin: 0;">Holidays List</h4>
        <h4 style="margin: 0;">Quro Schools</h4>
        <h4 style="margin: 0;">${selectedText}</h4>
        <h4 style="margin: 0;">Report Taken On : ${formattedDate}</h4>
    </div>`;

    // Clone the original table
    var table1 = document.getElementById("ManageHolidaystbl");
    var table1Clone = table1.cloneNode(true); // Clone the table

    // Apply table styles (borders and cell widths)
    table1Clone.style.borderCollapse = "collapse";  // Collapse borders between cells

    // Remove all <input type="text"> elements to prevent them from being exported
    var inputs = table1Clone.getElementsByTagName("input");
    while (inputs.length > 0) {
        inputs[0].parentNode.removeChild(inputs[0]);
    }

    // Remove the "Delete" column in both the header and the table body
    // 1. Remove "Delete" column header
    var headerCells = table1Clone.getElementsByTagName("th");
    for (var i = 0; i < headerCells.length; i++) {
        if (headerCells[i].innerText.trim() === "Delete") {
            // Remove the "Delete" header column
            for (var j = 0; j < table1Clone.rows.length; j++) {
                table1Clone.rows[j].deleteCell(i); // Remove the "Delete" column from all rows
            }
            break; // Exit the loop after deleting the "Delete" column header
        }
    }
    // 2. Remove the "Delete" column in each row of the table body
    var rows = table1Clone.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        if (cells.length > 0) {  // Skip the header row
            // Loop to find the last column or the "Delete" column based on its index
            for (var j = 0; j < cells.length; j++) {
                if (cells[j].innerText.trim() === "Delete") {
                    rows[i].deleteCell(j); // Delete the "Delete" column cell in each row
                    break; // Exit the loop after deleting the "Delete" column
                }
            }
        }
    }

    // Apply border and width to all table cells
    var cells = table1Clone.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.border = "1px solid black";  // Add border to each cell
        cells[i].style.padding = "3px";            // Add padding for better readability
    }

    // Apply styles to table headers (th)
    var headers = table1Clone.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].style.height = "20px";               // Set header row height
        headers[i].style.textAlign = "center";         // Center-align text in header
        headers[i].style.padding = "3px";             // Add padding for readability
        headers[i].style.border = "1px solid black"; // Add border to each cell
        headers[i].style.color = "#000000";         // Set text color (e.g., black) for the header text
        headers[i].style.fontWeight = "bold";      // Optional: Make the header text bold
    }

    // Define the footer content (optional)
    var footerContent = `
    <div style="text-align: center; margin-top: 20px; font-size: 10px; color: gray;">
        <p style="margin: 0;">This is a system generated report contains confidential information intended for a specific individual and a purpose. Any unauthorized use, copying, or distribution of this report is strictly prohibited.</p>
    </div>`;

    // Combine the header, table, and footer content into a single HTML string
    var combinedHtml = headerContent + table1Clone.outerHTML + footerContent;

    // Convert the combined HTML content to an Excel-compatible format (using the HTML table)
    var excelBlob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });

    // Use the FileSaver.js library to save the Blob as an Excel file
    saveAs(excelBlob, 'HolidaysList.xls'); // Trigger file download
});

// HOLIDAYS PRINT EVENT CODE START HERE
$(document).on('click', '#lnkprint', function (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    debugger;
    // Get selected academic year
    var selectedText = $('#Year option:selected').text();
    if (selectedText === "---------Select---------" || selectedText === "") {
        selectedText = "";
    } else {
        selectedText = `Year : ${selectedText}`;
    }
    // Get today's date
    var today = new Date();

    // Array of month names
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get day, month, and year
    var day = today.getDate();
    var month = months[today.getMonth()]; // Get the month as a string
    var year = today.getFullYear();

    // Format the date in dd MMM yyyy format
    var formattedDate = `${day < 10 ? '0' + day : day} ${month} ${year}`;


    //debugger;
    var tabledata1 = document.getElementById("ManageHolidaystbl");
    // var tabledata2 = document.getElementById("ctl00_ContentPlaceHolder1_tblBusInfo");
    var printContent = '</body></html><table width="100%" align="center" style="text-align:center"><tbody><tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; ">HolidaysList</td></tr>' +
        '<tr><td colspan="34" align="center" style="background-color:Lightgray; color: Black; "><b><u>Quro Schools</u></b></td></tr>' +
        '<tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; ">' + selectedText + '</td></tr>' +
        '<tr><td colspan="34" align="center" style="background-color:Lightgray;color:Black; "> Report On : ' + formattedDate + '</td></tr>' +
        '<tr><td colspan="34"></td></tr>' +
        '<tr><td colspan="34"><table width="100%" align="center" cellspacing="0" cellpadding="0" style="text-align:left; border:1px solid #dfdfdf; font-size:10px; font-family: verdana, arial, helvetica, sans-serif; font-weight:normal;"><tbody><tr>' +
        '<th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">S NO</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">Holiday Name</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">Holiday Type</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">Start Date</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">End Date</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">Number of Days</th><th style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">Status</th>';
    

    printContent += '</tr >';
    for (var i = 1; i < tabledata1.rows.length; i++) {
        printContent += '<tr style="height:24px; border:1px solid #000000;">';
        var row = tabledata1.rows[i];
        for (var j = 0; j < row.cells.length; j++) {
            printContent += '<td style="height:24px; padding-left:4px; border-bottom:1px solid #dfdfdf; border-right:1px solid #dfdfdf;">' + row.cells[j].innerText + '</td>';

        }
        printContent += '</tr>';
    }
    printContent += '</tbody></table></td></tr><tr><td colspan="2" align="left"></td></tr>';
   
    printContent += '<tr><td colspan="6" align="center" style="background-color:Lightgray;color:Black;">This is a system generated report contains confidential information intended for a specific individual and a purpose.  Any unauthorized use, copying, or distribution of this report is strictly prohibited.</td></tr>';
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