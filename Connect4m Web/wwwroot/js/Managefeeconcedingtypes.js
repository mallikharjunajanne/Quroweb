
//===========>>>>>>>>>>>>>>>
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
    debugger;
    Pageload();
});

function Pageload() {
    debugger;

    var formdata = $('#Searchfeedescounttypesform').serialize();

    //var TermName = "";
    //var AcademicYearId = null;
    //var formdata = {
    //    TermName: TermName,
    //    AcademicYearId: AcademicYearId
    //}

    handleAjaxtabledata('GET', "/FeeSection/Managefeeconcedingtypestbl", formdata,
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

function Bindtable(response) {


    debugger;
    //var formattedDate = Dateformate();

    $("#Recordscount").text(response.length);
    // var Selectedyear = $('#ddlAcademicYearId').val();

    var table = $('#Discounttbl').DataTable();
    table.destroy();

    var newTable = $("#Discounttbl").DataTable({
        dom: 'Bfrtip',
        buttons: [],
        bProcessing: false,
        bLengthChange: true,
        /* lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
        pageLength: 10,
        bfilter: false,
        bSort: true,
        searching: false,
        scrollX: true,
        scrollY: '400px',
        scrollCollapse: true,
        paging: true,
        bPaginate: true,
        //  stateSave:true,
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
                data: "ConcedingTypeName",
                render: function (data, type, row, meta) {
                    return row.concedingTypeName
                }
            },
            {
                data: "Amount",
                render: function (data, type, row, meta) {
                    //  return `${row.accountNumber}<input type="text" title="${row.bankAccountId}" value="${row.bankAccountId}" hidden/>`;
                    return row.amount + '<input type="text" value=' + row.concedingTypeId + ' hidden/>'
                }
            },
            {
                data: "Description",
                render: function (data, type, row, meta) {
                    return row.description
                }
            },
            {
                data: "ConcedingTypeId",
                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                }
            }
            //{
            //    data: "FatherName",
            //    render: function (data, type, row, meta) {
            //        return row.fatherName
            //    }
            //},
            //{
            //    data: "MotherName",
            //    render: function (data, type, row, meta) {
            //        return row.motherName
            //    }
            //},
            //{
            //    data: "MobileNumber",
            //    render: function (data, type, row, meta) {
            //        return row.mobileNumber
            //    }
            //},

        ]
    });

    table.on('draw', function () {
        $('#Discounttbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
            color: 'black',
            'text-decoration': 'underline',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
    });
    $('#Discounttbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
        color: 'black',
        'text-decoration': 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
}

$('#btnsearch').click(function () {
    debugger;
    var Concedingtypename = $('#Concedingtypenametxt').val();
    
    var formdata = {
        ConcedingTypeName: Concedingtypename
    }
    //var Formdata = $('#Feetypesform').serialize();
    handleAjaxtabledata('GET', "/FeeSection/Managefeeconcedingtypestbl", formdata,
        //function (resp) {
        //    loaddingimg.css('display', 'none');
        //    Bindtable(resp);
        //},
        function (status, error) {
            loaddingimg.css('display', 'none');
        },
        true
    );
});

function lnkAddNew() {
    $('#Addnew_div1').empty();

    CallToAjax('GET', "/FeeSection/Insert_ManageFeeConcedingTypes", null,
        function (resp) {
            loaddingimg.css('display', 'none');
            $('#SearchMaindiv').hide();
            $('#Addnew_div1').append(resp);
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
}

$(document).on('click', '#Discounttbl td:nth-child(2)', function (event) {
    try {
        loaddingimg.css('display', 'block');
        debugger;
        event.stopImmediatePropagation();

        var parent = $(event.target).closest('tr');
        var ConcedingTypeId = $(parent).find('td').find('input[type="text"]').val();
        //var Concedingtypeid = $(parent).find('td').find('input[type="text"]').attr('title');
        var table = $('#Bankaccountstbl').DataTable();
        //tabletargetpagetblSEMsearchresults = table.page.info().page;

        //var formdata = {
        //    Feetypeid: Feetypeid,
        //    Concedingtypeid: Concedingtypeid
        //}

        CallToAjax('GET', "/FeeSection/Update_ManageFeeConcedingTypes?ConcedingTypeId=" + ConcedingTypeId, null,
            function (resp) {
                debugger;
                $('#SearchMaindiv').hide();
                $('#Addnew_div1').append(resp);
                loaddingimg.css('display', 'none');
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );

    }
    catch (e) {

    }
})

$(document).on('click', '#Discounttbl td:nth-child(5) .fa-trash-o', function (event) {
    try {
        loaddingimg.css('display', 'block');
        debugger;
        event.stopImmediatePropagation();

        var parent = $(event.target).closest('tr');
        var ConcedingTypeId = $(parent).find('td').find('input[type="text"]').val();
        var ConcedingTypeName = $(parent).find('td:eq(1)').text();
        //var ConcedingtypeName = $(parent).find('td:eq(2)').text();
        //var Description = $(parent).find('td:eq(3)').text();
        //var Concedingtypeid = $(parent).find('td').find('input[type="text"]').attr('title');

        var table = $('#Discounttbl').DataTable();
        //tabletargetpagetblSEMsearchresults = table.page.info().page;

        DeleteFeeTypes(ConcedingTypeId, ConcedingTypeName)

    }
    catch (e) {

    }
})

//===>>> CLEAR FUNCTION
function clearForm(formId) {
    debugger;
    var form = document.getElementById(formId);
    if (form) {
        form.reset(); // Reset the form elements
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });
        $('#AmountError').text('');
        $('#Commonerrormessage').text('');
    }
    //Table reload
    Pageload();
}

//===>>> DELETE FUNCTION
function DeleteFeeTypes(ConcedingTypeid, ConcedingTypeName) {//Feetypeid, FeetypeName, selectedIds, selectedTexts
    if (confirm("Are you sure you want to delete this Bankname?\nClick OK to delete or Cancel to stop deleting.")) {
        debugger;
        //var formdata = {
        //    Feetypeid: Feetypeid,
        //    Concedingtypeid: concedingtypeIds
        //}
        CallToAjax('GET', "/FeeSection/Delete_ManageFeeConcedingTypes?ConcedingTypeId=" + ConcedingTypeid, null,
            function (resp) {
                debugger;
                loaddingimg.css('display', 'none');
                const errorMessages = {
                    "0": 'This DiscountType is Associated with one of Fee Types you cannot delete it.',
                };
                const errorMessage = errorMessages[resp] || 'Record is successfully deleted.';
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

function nextpages(url, data) {
    return new Promise((resolve, reject) => {
        /*debugger;*/

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

function previouspages(url, data) {
    return new Promise((resolve, reject) => {
        /* debugger;*/

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
