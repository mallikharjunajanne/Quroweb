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
function handleAjaxtabledata(method, url, data, successCallback, errorCallback) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        //contentType: false,
        //processData: false,
        success: Bindtable,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };
    $.ajax(ajaxOptions);
}
function CallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,       
        success: function (response) {
            successCallback(response);
        },
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

$(document).ready(function () {
    //debugger;
    Pageload();
});

function SearchClearform() {
    $('#txtFeeTypesSeach').text('');   
    $('#Commonerrormessage').text('');
    handleAjaxtabledata('GET', "/FeeSection/Bindtblfeetype?FeeType=" + '', null,
        
        function (status, error) {
            loaddingimg.css('display', 'none');
        },
        true
    );
}



function Pageload() {
    try {
        //debugger;
        var FeeType = "";
        handleAjaxtabledata('GET', "/FeeSection/Bindtblfeetype?FeeType=" + FeeType, null,
            //function (resp) {
            //    loaddingimg.css('display', 'none');
            //    Bindtable(resp);          
            //},
            function (status, error) {
                loaddingimg.css('display', 'none');
            },
            true
        );
    }
    catch (error) {
        console.error('An unexpected error occurred:', error.message);
        Errorhandle(error);
    }
}

function Bindtable(response) {
    try {
        //ClassDropdownfun();

        //debugger;
        //var formattedDate = Dateformate();

        $("#Recordscount").text(response.length);
        // var Selectedyear = $('#ddlAcademicYearId').val();

        var table = $('#Feetypestbl').DataTable();
        table.destroy();

        var newTable = $("#Feetypestbl").DataTable({
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
            pageLength: 20,
            //stateSave:true,
            data: response,
            columns: [
                {
                    targets: 0, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                },
                {
                    data: "FeeType",
                    render: function (data, type, row, meta) {
                        return `<a href="javascript:void(0)" onclick="handleClick(${row.concedingtypeid}, ${row.feetypeid});" style="color: #2C2C2C;font-size: 14px;font-weight: bold;">${row.feeType}</a>`;
                        ////return row.feeType;
                    }
                },
                {
                    data: "Concedingtypename",
                    render: function (data, type, row, meta) {
                        return `${row.concedingtypename}<input type="text" title="${row.concedingtypeid}" value="${row.feetypeid}" hidden/>`;
                        //return row.concedingtypename + '<input type="text" title='"' + row.concedingtypeid +'"'  value=' + row.feetypeid + ' hidden/>'
                    }
                },
                {
                    data: "Description",
                    render: function (data, type, row, meta) {
                        /*return row.Description;*/
                        return row.description;
                    }
                },
                {
                    data: "Feetypeid",
                    render: function (data, type, row, meta) {
                        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                    }
                }
            ]
        });

        //table.on('draw', function () {
        //    $('#Feetypestbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
        //        color: 'black',
        //        'text-decoration': 'underline',
        //        cursor: 'pointer',
        //        fontWeight: 'bold'
        //    });
        //});
        //$('#Feetypestbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
        //    color: 'black',
        //    'text-decoration': 'underline',
        //    cursor: 'pointer',
        //    fontWeight: 'bold'
        //});
    }
    catch (e) {
        // Clear the table and show an error message
        $('#Feetypestbl').DataTable().clear().destroy();
        $('#Feetypestbl').html(`
            <tr>
                <td colspan="5" style="text-align: center; color: red; font-weight: bold;">
                    ${e.message}
                </td>
            </tr>
        `);
    }
}

$('#btnsearch').click(function () {
    //debugger;
    try {
        var FeeType = $('#txtFeeTypesSeach').val();
        //var Formdata = $('#Feetypesform').serialize();
        handleAjaxtabledata('GET', "/FeeSection/Bindtblfeetype?FeeType=" + FeeType, null,
            //function (resp) {
            //    loaddingimg.css('display', 'none');
            //    Bindtable(resp);
            //},
            function (status, error) {
                loaddingimg.css('display', 'none');
            },
            true
        );
    }
    catch (error) {
        console.error('An unexpected error occurred:', error.message);
        Errorhandle(error);
    }
});

function lnkAddNewfeetype() {
    //debugger;
    try {
        $('#Addnewfeetype_div1').empty();
        CallToAjax('GET', "/FeeSection/Insert_feetype", null,
            function (resp) {
                loaddingimg.css('display', 'none');
                $('#SearchFeetype_tbldiv').hide();

                $('#Addnewfeetype_div1').append(resp);
                //initializeDataTable(); // Initialize DataTable after appending data
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );
    }
    catch (error) {
        console.error('An unexpected error occurred:', error.message);
        Errorhandle(error);
    }
}

function handleClick(concedingtypeid, feeType) {
    debugger;
    var formdata = {
        Feetypeid: feeType,
        Concedingtypeid: concedingtypeid
    }

    CallToAjax('GET', "/FeeSection/FeeType_Edit", formdata,
        function (resp) {
            //debugger;
            loaddingimg.css('display', 'none');
            $('#SearchFeetype_tbldiv').hide();
            $('#Addnewfeetype_div1').append(resp);
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
}


//$(document).on('click', '#Feetypestbl_ td:nth-child(2)', function (event) {
//    try {
//        loaddingimg.css('display', 'block');
//        //debugger;
//        event.stopImmediatePropagation();

//        var parent = $(event.target).closest('tr');
//        var Feetypeid = $(parent).find('td').find('input[type="text"]').val();
//        var Concedingtypeid = $(parent).find('td').find('input[type="text"]').attr('title');
//        var table = $('#Feetypestbl').DataTable();
//        //tabletargetpagetblSEMsearchresults = table.page.info().page;

//        var formdata = {
//            Feetypeid: Feetypeid,
//            Concedingtypeid: Concedingtypeid
//        }

//        CallToAjax('GET', "/FeeSection/FeeType_Edit", formdata,
//            function (resp) {
//                //debugger;
//                loaddingimg.css('display', 'none');                
//                $('#SearchFeetype_tbldiv').hide();
//                $('#Addnewfeetype_div1').append(resp);
//            },
//            function (status, error) {
//                loaddingimg.css('display', 'none');
//            }
//        );
//    }
//    catch (error) {
//        console.error('An unexpected error occurred:', error.message);
//    }
//})



$(document).on('click', '#Feetypestbl td:nth-child(5) .fa-trash-o', function (event) {
    try {
        loaddingimg.css('display', 'block');
        //debugger;
        event.stopImmediatePropagation();

        var parent = $(event.target).closest('tr');
        var Feetypeid = $(parent).find('td').find('input[type="text"]').val();
        var FeetypeName = $(parent).find('td:eq(1)').text();
        var ConcedingtypeName = $(parent).find('td:eq(2)').text();
        var Description = $(parent).find('td:eq(3)').text();
        var Concedingtypeid = $(parent).find('td').find('input[type="text"]').attr('title');
        
        var table = $('#Feetypestbl').DataTable();
        //tabletargetpagetblSEMsearchresults = table.page.info().page;

        DeleteFeeTypes(Feetypeid, FeetypeName, Concedingtypeid, ConcedingtypeName)       

    }
    catch (error) {
        console.error('An unexpected error occurred:', error.message);
    }
})

//===>>> CLEAR FUNCTION
function clearForm(formId) {
    //debugger;
    var form = document.getElementById(formId);
    if (form) {
        form.reset(); // Reset the form elements
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });
        $('#Errormessage').text('');
        $('#Commonerrormessage').text('');
    }
}

//===>>> DELETE FUNCTION
function DeleteFeeTypes(Feetypeid, FeetypeName, concedingtypeIds, concedingtypeanames) {
    try {
        if (confirm("Are you sure you want to delete this FeeType?\nClick OK to delete or Cancel to stop deleting.")) {
           //debugger;
            var formdata = {
                Feetypeid: Feetypeid,
                Concedingtypeid: concedingtypeIds
            }
            CallToAjax('GET', "/FeeSection/Deletefeetype", formdata,
                function (resp) {
                    //debugger;
                    loaddingimg.css('display', 'none');
                    const errorMessages = {
                        "1": 'Record is successfully deleted.',
                        "0": 'This Fee Type is Associated with Few Students you cannot delete it.',
                        "2": 'DiscountType ' + concedingtypeanames + ' is Deleted For the FeeType ' + FeetypeName,
                        // "-4": 'Fee Type with Receipt Code ' + 'Your Receipt Code' + ' already exists.'
                    };
                    const errorMessage = errorMessages[resp] || ' ';
                    $('#Commonerrormessage').text(errorMessage);

                    Pageload();
                    //$('#SearchFeetype_tbldiv').hide();
                    //$('#Addnewfeetype_div1').append(resp);
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                }
            );
        }
    }
    catch (error) {
        console.error('An unexpected error occurred:', error.message);
    }
}

function nextpages(url, data) {
    try {
        return new Promise((resolve, reject) => {
            loaddingimg.css('display', 'block');
            handleAjax('GET', `/FeeSection/${url}`, data, (response) => {
                window.location.href = `/FeeSection/${url}`;
                loaddingimg.css('display', 'none');
                resolve();
            }, (status, error) => {
                loaddingimg.css('display', 'none');
                reject();
            }, false);
        });
    }
    catch (error) {
        console.error('An unexpected error occurred:', error.message);
    }
}

function previouspages(url, data) {
    try {
        return new Promise((resolve, reject) => {
            loaddingimg.css('display', 'block');
            handleAjax('GET', `/FeeSection/${url}`, data, (response) => {
                window.location.href = `/FeeSection/${url}`;
                loaddingimg.css('display', 'none');
                resolve();
            }, (status, error) => {
                loaddingimg.css('display', 'none');
                reject();
            }, false);
        });
    }
    catch (error) {
        console.error('An unexpected error occurred:', error.message);
    }
}


function Errorhandle(error) {
    console.error('An error occurred:', error); // Log the error for debugging purposes

    // Redirect to the error page
    window.location.href = '/Attendance/ErrorPage';
}