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
function CallToAjaxMethod(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: bindDatatable,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}


$(document).ready(function () {

    // Month selected value
    populateMonthDropdown('Eventmonthddl');

    //Table data binding function
    /* Tabledatebindingfunction();*/

    var MonthId = $('#Eventmonthddl').val();
    var EventTitle = $('#txteventtitleid').val();
    var EventDate = $('#txteventdateid').val();
    debugger;
    var dataToSend = {
        MonthId: MonthId,
        EventTitle: EventTitle,
        EventDate: EventDate
    };


    CallToAjaxMethod('GET', '/Admin/Calendareventstbl', dataToSend,

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );


});



function populateMonthDropdown(selectId) {
    const selectElement = document.getElementById(selectId);
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are zero-based

    // Array of month names
    const months = [
        { value: '01', text: 'January' },
        { value: '02', text: 'February' },
        { value: '03', text: 'March' },
        { value: '04', text: 'April' },
        { value: '05', text: 'May' },
        { value: '06', text: 'June' },
        { value: '07', text: 'July' },
        { value: '08', text: 'August' },
        { value: '09', text: 'September' },
        { value: '10', text: 'October' },
        { value: '11', text: 'November' },
        { value: '12', text: 'December' }
    ];

    // Populate the select element with options
    months.forEach(month => {
        const option = document.createElement('option');
        option.value = month.value;
        option.textContent = month.text;
        if (parseInt(month.value, 10) === currentMonth) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    });
}


$('#Addnewevent').click(function () {

    DataCallToAjax('GET', '/Admin/CalendareventsInsert', null,
        function (response) {
            debugger;
            $('#Managecalendarmaindiv').hide();
            $('#UpdateManagecalendardiv3').empty();
            $('#InsertManagecalendardiv2').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
});



$('#Eventsinsertingform').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {

            var formdata_Uph = new FormData($('#Eventsinsertingform')[0]);

            CallToAjax('POST', '/Admin/CalendareventsInsert', formdata_Uph,
                function (response) {
                    debugger;
                    if (response === "0") {
                        $('#Errormessage').text('An error occurred.');
                    } else {
                        $('#Errormessage').text('Record inserted successfully.');
                    }
                },
                function (status, error) {
                    $('#Errormessage').text('');
                },
                true);
        }
    }, 50);

});


$('#Searchbtn').click(function () {
    SearchCalendar();
});

function SearchCalendar() {

    var Monthid = $('#Eventmonthddl').val();
    var Eventtitle = $('#txteventtitleid').val();
    var eventdate=$('#txteventdateid').val();   
    debugger;

    var dataToSend = {
        Monthid: Monthid,
        Eventtitle: Eventtitle,
        dateofevent: eventdate,
    };

    DataCallToAjax('GET', '/Admin/Calendareventstbl', dataToSend,
        function (response) {
            bindDatatable(response);
        }, function (status, error) {
            // Handle error if needed
        }
    );
}


//-----------------DataTable Data Dinding Function
function bindDatatable(response) {

    var formattedDate = GetDateFormat();
    debugger;
    var table = $('#Managecalendartbl').DataTable();
    table.destroy();
    $("#calendartblcount").text(response.length);


    var newTable = $("#Managecalendartbl").DataTable({
        dom: 'Bfrtip',
        buttons: [
            //{
            //    extend: 'pdfHtml5',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,
            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },

            //}
            //,
            //{
            //    extend: 'excel',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,

            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },
            //},


            //{
            //    extend: 'print',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,
            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },
            //}


        ],

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
            //    targets: 0, // Assuming this is the column index where you want to display numbering
            //    render: function (data, type, row, meta) {
            //        var currentPage = table.page.info().page;
            //        var rowsPerPage = table.page.info().length;
            //        return (0 * rowsPerPage) + meta.row + 1;
            //    }
            //},

            {
                data: "EventTitle",
                render: function (data, type, row, meta) {
                    return row.eventTitle
                }
            },
            {
                data: "eventdate",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.eventdate + '<input type="text" value=' + row.eventId + ' hidden/>'

                }
            },
            {
                data: "EventId",

                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                }
            }
        ]


    });
    //Pdfs buttons hide this code
    newTable.buttons().container().hide();
    table.on('draw', function () {
        $('#Managecalendartbl').find('td:nth-child(1)').attr('title', 'Edit');
    });
    $('#Managecalendartbl').find('td:nth-child(1)').attr('title', 'Edit').css({
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


$(document).on('click', '#Managecalendartbl .fa-trash-o', function (event) {
    event.stopImmediatePropagation();

    var parent = $(event.target).closest('tr');
    var EventId = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#Managecalendartbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    Deletefunction(EventId);
});

function Deletefunction(EventId) {
    var confirmed = confirm("Are you sure you want to delete Event?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        var data = { EventId: EventId };

        CallToAjax('POST', '/Admin/Delete_Calendar', data,
            function (response) {
                if (response == '1') {
                    $('#Errormessage').text('Record deleted successfully');
                    Tabledatebindingfunction();
                } else {
                    $('#Errormessage').text('Record Can' + "'" + 't be deleted successfully');
                }
            },
            function (status, error) {

                $('#Errormessage').text('');

            }, true);
    }
}



$(document).on('click', '#Managecalendartbl td:nth-child(1)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var EventId = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#Managecalendartbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    Tbleditfunction(EventId);
})


function Tbleditfunction(EventId) {
    $.ajax({
        url: '/Admin/Update_Calendar?EventId=' + EventId,
        type: 'GET',
        //data: data,
        success: function (response) {
            debugger;
            $('#InsertManagecalendardiv2').empty();
            $('#Managecalendarmaindiv').hide();
            $('#UpdateManagecalendardiv3').html(response);
        },
        error: function (xhr, status, error) {
            $('#Errormessage').text('Edit values appending times showing error function name' + "'" + "Tbleditfunction" + "'");
        }
    });
}


$('#Eventsupdatingform').submit(function () {
    event.preventDefault();
    debugger;
    setTimeout(function () {

        try {
            var validationMessages = $('.field-validation-error');
            var validationMessages2 = $('.error2');

            var validationmelength = validationMessages.length;

            if (validationmelength == 0 && validationMessages2.length == 0) {

                var formdata = new FormData($('#Eventsupdatingform')[0]);

                CallToAjax('POST', '/Admin/Update_Calendar', formdata,
                    function (response) {
                        debugger;
                        if (response === "0") {
                            $('#btnclear, #btnupdate').prop('disabled', true);
                            $('#Errormessage').text('Record can'+"'"+'t be update.');
                        } else if (response == "1") {
                            $('#btnclear, #btnupdate').prop('disabled', true);
                            $('#Errormessage').text('Record inserted successfully.');
                        } else {
                            $('#Errormessage').text('Record can' + "'" + 't be update.');
                        }
                    },
                    function (status, error) {
                        $('#Errormessage').text('');
                    },
                    true);
            }
        } catch (e) {
            $('#Errormessage').text('Updating function showing error formname' + '"' +'Eventsupdatingform'+'"');
        }
    }, 50);
});






function updateCharCount() {
    var textarea = document.getElementById('EventDescriptionid');
    var charCount = document.getElementById('charCount');
    var length = textarea.value.length;
    var remaining = 8000 - length;
    charCount.textContent = remaining + ' Characters remaining.';
}

$('#BackToSearchUbtn').click(function () {

    location.reload();
    $('#Errormessage').text('');
    $('#Managecalendarmaindiv').show();
    $('#InsertManagecalendardiv2').empty();
    $('#UpdateManagecalendardiv3').empty();
    
});

$('#btnbacktosearch').click(function () {
    location.reload();
    $('#Errormessage').text('');
    $('#Managecalendarmaindiv').show();
    $('#InsertManagecalendardiv2').empty();
    $('#UpdateManagecalendardiv3').empty();
});




//PREVIEW BUTTON CLICK SHOW CALENDAR PRIVIEW
$('#Calendarpriviewid').click(function () {
    var Selectedmonthid = $('#Eventmonthddl').val();
    var data = { MonthId: Selectedmonthid};
    DataCallToAjax('GET', '/UserScreens/CalendarEvents', data,
        function (response) {
            debugger;
            $('#Managecalendarmaindiv').hide();
            $('#previewofcalendardiv4').show();
            $('#Previewofcalendardiv5').html(response);
            
            //$('#UpdateManagecalendardiv3').empty();
            //$('#InsertManagecalendardiv2').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );

    //Controller=UserScreens
    //Method name=CalendarEvents
});

$('#Priviewbacktosearchbtn').click(function () {
    $('#Managecalendarmaindiv').show();
    $('#previewofcalendardiv4').hide();
    $('#Previewofcalendardiv5').empty();
});


$('#btnprieviewcalendarprint').click(function () {
    var content = $('#previewofcalendardiv4').html();

    // Create a new window for printing
    var printWindow = window.open('', '_blank');
    printWindow.document.open();

    // Set up the HTML content to be printed
    printWindow.document.write('<html><head><title>Print Preview</title></head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Print the content
    printWindow.print();
});