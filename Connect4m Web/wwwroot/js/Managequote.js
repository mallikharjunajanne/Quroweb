//------------Manage Holidays Insert Function code Start

//----***** Ajax Common Method *****---------
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

$('#InsertQuote').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            debugger;
            var formdata_ISN = new FormData($('#InsertQuote')[0]);
            var today = new Date();
            var formattedtoday = Splitingdatw(today);
            var data = document.getElementById('Displaydate_txtid').value;
            var Formattegetdate = GettingSplitingdata(data);
            if (Formattegetdate < formattedtoday) {

                $('#Errormessages').text('Display the Quote On should not be less than today.');
                return;
            } else {           
            var formattedDate = formatDate(data);
            CallToAjax('POST', '/Admin/Insert_Quote', formdata_ISN,
                function (response) {
                    debugger;
                    if (response === "Inserted") {
                        $('#Insert_Clearbtn, #Insert_Savebtn').prop('disabled', true);
                        $('#Insert_Clearbtn, #Insert_Savebtn').removeClass("btn btn-pill btn-outline-success btn-air-success")
                        $('#Errormessages').text('Record inserted successfully.');
                    } else if (response === "Not Inserted") {
                        $('#Errormessages').text('Already a Quote is Present on:' + formattedDate);
                    } else if (response === "QuoteExists") {
                       //Already a Quote is Present on: 15 / 12 / 2023
                        $('#Errormessages').text('Already a Quote is Present on:' + formattedDate);
                    } else {
                        // Handle other cases or display a generic error message
                        $('#Errormessages').text('An error occurred.');
                    }
                }, function (status, error) {

                },
                true);
            }
        }
    }, 50);


});

function formatDate(dateString) {
    // Split the string by '-'
    var parts = dateString.split('-');

    // Rearrange the parts in the desired format
    var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0];

    return formattedDate;
}

function Splitingdatw(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-indexed
    var year = date.getFullYear();

    // Ensure that single-digit days and months are padded with a leading zero
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return day + '/' + month + '/' + year;
}
function GettingSplitingdata(date) {
    var parts = date.split('-');

    // Rearrange the parts in the desired format
    var formattedDate = parts[2] + '/' + parts[1] + '/' + parts[0];

    return formattedDate;
   
}

$('#Insert_BackToSearchbtn').click(function () {
    location.reload();
    $('#ManageQuotemaindiv').show();
    $('#Managequotes_Insertdiv2').empty();
    $('#Managequotes_Updatediv3').empty();
})

$('#Insert_Clearbtn').click(function () {
    $('#InsertQuote')[0].reset();
    $('#Errormessages').text('');
});




//----------Main Table Main Screen Code 

$(document).ready(function () {
    function CallToAjax(method, url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: method,
            success: bindDatatable,
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }
   
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

    CallToAjax('GET', '/Admin/ManageQuoteTabledata',

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );



    
    

    $('#addnewmanagequotes').click(function () {
        debugger;
        CallToAjax_Withoutdata('GET', '/Admin/Insert_Quote',
            function (response) {
                debugger;
                $('#ManageQuotemaindiv').hide(); /*Manageholidays_Main1*/
                $('#Managequotes_Updatediv3').empty();/* Manageholidays_Updatediv3*/            
                $('#Managequotes_Insertdiv2').html(response); /*Manageholidays_Insertdiv2*/
            },
            function (status, error) {
                // Handle error if needed
            }
        );
    });

});


//----------Main View Clear Button
$('#Clearbtnquote').click(function () {
    debugger;
    $('#Quote').val('');
    $('#Displaydate').val('');
    location.reload();
});

//-----------------Search Quote
$('#Searchbtn').click(function () {
    SearchQuotes();
});

function SearchQuotes() {
    var inputQuote = $('#Quote').val();
    var inputdate = $('#Displaydate').val();
    debugger;
    var dataToSend = {
        Quote: inputQuote,
        Displaydate: inputdate
    };

    DataCallToAjax('GET', '/Admin/ManageQuoteTabledata', dataToSend,
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
    var table = $('#ManageQuotestbl').DataTable();
    table.destroy();
    $("#Quote_Recordscount").text(response.length);


    var newTable = $("#ManageQuotestbl").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdfHtml5',
                title: 'Manage Holidays Report',
                message: "Report On: " + formattedDate,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                },

            }
            ,
            {
                extend: 'excel',
                title: 'Manage Holidays Report',
                message: "Report On: " + formattedDate,

                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                },
            },


            {
                extend: 'print',
                title: 'Manage Holidays Report',
                message: "Report On: " + formattedDate,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                },
            }


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
                data: "Quote",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.quote

                }
            },           
            {
                data: "DisplayDate",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.displayDate + '<input type="text" value=' + row.quoteId + ' hidden/>'

                }
            },           
            {
                data: "QuoteId",

                render: function (data, type, row, meta) {                  
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'                    

                }
            }           
        ]


    });
    //Pdfs buttons hide this code
    newTable.buttons().container().hide();
    table.on('draw', function () {
        $('#ManageQuotestbl').find('td:nth-child(2)').attr('title', 'Edit');
    });
    $('#ManageQuotestbl').find('td:nth-child(2)').attr('title', 'Edit');
}

function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}


$(document).on('click', '#ManageQuotestbl .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var confirmed = confirm("Are you sure you want to delete Quote?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        debugger;
        var QuoteId = $(this).closest('tr').find('input[type="text"]').val();
        var table = $('#ManageQuotestbl').DataTable();
        var tabletargetpagetblSEMsearchresults = table.page.info().page;

        $.ajax({
            url: '/Admin/Delete_Quote?QuoteId=' + QuoteId,
            type: 'GET',
            success: function (response) {
                $('#Errmsg').text('Record deleted successfully');
                SearchQuotes();
            },
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }
});


//$(document).on('click', '#ManageQuotestbl .fa-trash-o', function (event) {
//    event.stopImmediatePropagation();
//    var confirmed = confirm("Are you sure you want to delete Quote?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
//    if (confirmed) {
              
//       var  QuoteId: $(this).find('input[type="text"]').val();
//        var table = $('#ManageQuotestbl').DataTable();
//        tabletargetpagetblSEMsearchresults = table.page.info().page;

//        $.ajax({
//            url: '/Admin/Delete_Quote?QuoteId=' + QuoteId,
//            type: 'GET',
//            //data: data,
//            success: function (repsonse) {
//                $('#Errmsg').text('Record delete successfully');
//                SearchQuotes();
//            },
//            error: function (xhr, status, error) {
//                errorCallback(xhr.status, error);
//            }
//        });        
//    }
//})


//-------------------------------------   Click For Update in the list(table)
$(document).on('click', '#ManageQuotestbl td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Quoteid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#ManageQuotestbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    EditQuote(Quoteid);
})


function EditQuote(Quoteid) {
    $.ajax({
        url: '/Admin/Update_Quote?Quoteid=' + Quoteid,
        type: 'GET',
        //data: data,
        success: function (response) {
            $('#Managequotes_Insertdiv2').empty();
            $('#ManageQuotemaindiv').hide();
            $('#Managequotes_Updatediv3').html(response);
        },
        error: function (xhr, status, error) {
            //errorCallback(xhr.status, error);
        }
    });
}


$('#UpdateQuote').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {           

            var formdata_Uph = new FormData($('#UpdateQuote')[0]);

            CallToAjax('POST', '/Admin/Update_Quote', formdata_Uph,
                function (response) {
                    debugger;

                    if (response === "Updated") {
                        $('#Dltbtn, #Updatebtn').prop('disabled', true);
                        $('#Dltbtn, #Updatebtn').removeClass('btn btn-pill btn-outline-danger btn-air-danger btn-outline-success btn-air-success btn-outline-info btn-air-info');
                        $('#Errormsg').text('Record updated successfully.');
                    } else if (response === "Not Update") {
                        $('#Errormsg').text('Not Updated');
                    } else if (response === "Display Date Conflict") {
                        $('#Errormsg').text('Not Updated');
                    } else {
                        // Handle other cases or display a generic error message
                        $('#Errormessage').text('An error occurred.');
                    }
                }, function (status, error) {

                },
                true);
        }
    }, 50);


});

$('#Dltbtn').click(function () {
    var QuoteId = $('#QuoteId_txtid').val();
    $.ajax({
        url: '/Admin/Delete_Quote?QuoteId=' + QuoteId,
        type: 'GET',
        //data: data,
        success: function (response) {
            debugger;
            if (response == "Deleted") {
              /*  $('#Dltbtn, #Updatebtn').prop('disabled', true);*/
               /* $('#Dltbtn,').removeClass('.btn .btn-pill .btn-outline-success .btn-air-success');*/
                $('#Errormsg').text('Record deleted successfully.');
                $('#ManageQuotemaindiv').show();
                $('#Managequotes_Insertdiv2').empty();
                $('#Managequotes_Updatediv3').empty();
            } else {
                $('#Errormessage').text('Sommething went wrong...!')
            }
        }
    });
})


$('#BackToSearchUbtn').click(function () {
    location.reload();
    $('#ManageQuotemaindiv').show();
    $('#Managequotes_Insertdiv2').empty();
    $('#Managequotes_Updatediv3').empty();
})
