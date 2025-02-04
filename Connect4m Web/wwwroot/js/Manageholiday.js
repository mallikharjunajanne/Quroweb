﻿//------------Manage Holidays Insert Function code Start
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
            } else if (response == "2") {
                $('#Inserterrormessage').text('You cannot update restricted holiday because restricted holiday applied by the staff.');
            } else if (response == "") {
                $('#Savebtn, #Clearbtn').prop('disabled', true);                
                $('#Inserterrormessage').text('Record inserted successfully.');
            } else if (response=="-1") {
                $('#Inserterrormessage').text('Something went wrong please try again.');
            }else{
                $('#Inserterrormessage').text('Something went wrong please try again.');
            }
        }, function (status, error) {

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

//------------Manage Holidays Insert Function code End





//----------Edit Holiday Method code

//----------Main Table Main Screen Code 

$(document).ready(function () {

   Holidaysbindingfun();
});

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
        dom: 'Bfrtip',
        buttons: [  ],

        bProcessing: false,
        bLengthChange: true,
        /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
        bfilter: false,
        bSort: true,
        searching: false,
        //scrollX: true,
        //scrollY: '400px',
        /* scrollCollapse: true,*/
        paging: true,
        bPaginate: true,
        //  stateSave:true,
        data: response,
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
                $('#Updateerrormessage').text('Holiday Already Exists Between these Dates Or Holiday Name Already Exists');
            } else if (response == "2") {
                $('#Updateerrormessage').text('You cannot update restricted holiday because restricted holiday applied by the staff.');
            } else if (response == "1") {
                $('#Updateerrormessage').text('Record updated successfully.');
                $('#Dltbtn, #CEFTHbtn,#Updatebtn').prop('disabled', true);
            } else {
                $('#Updateerrormessage').text('Something went wrong please try again.');
            }

        }, function (status, error) {

        },
        true);
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




//---=========****####========= CREATE EXECPTION FOR TO HOLLIDAYS USERS POSTING BUTTON AFTER VIEW IN CODE =========####****=========---------------

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

