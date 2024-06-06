
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
function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    /*debugger;*/
    CallToAjax('GET', url,null,
        function (response) {

            /*debugger;*/
            var dataToPopulate = Array.isArray(response) ? response : response[Responsevalues] || [];
            populateDropdown(dataToPopulate, dropdownSelector, valueField, textField);
        },
        function (status, error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        }
    );
}
function populateDropdown(data, dropdownSelector, valueField, textField) {
    var dropdown = $(dropdownSelector);
    /*debugger;*/
    dropdown.empty(); // Clear existing options
    dropdown.append($('<option>', {
        value: '',
        text: '---Select---'
    }));
    $.each(data, function (index, item) {
        dropdown.append($('<option>', {
            value: item[valueField],
            text: item[textField]
        }));
    });
}


$(document).ready(function () {
    debugger;
    Pageload();
    fetchDataAndPopulateDropdown(                           //==== << ** Academic Year Dropdown ** >>
        '/FeeSection/GetAcadamicyeardd',                    // URL for data fetching
        '#ddlAcademicYearSearch',                           // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        ' '                                                 // Response value return class name
    );
});

function Pageload() {
    debugger;
    var TermName = "";
    var AcademicYearId = null;
     var formdata = {
         TermName: TermName,
         AcademicYearId: AcademicYearId
        }

    handleAjaxtabledata('GET', "/FeeSection/Bindtblfeeterm", formdata,
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

    var table = $('#Feetermstbl').DataTable();
    table.destroy();

    var newTable = $("#Feetermstbl").DataTable({
        dom: 'Bfrtip',
        buttons: [],
        bProcessing: false,
        bLengthChange: true,
        /* lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
        pageLength: 20,
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
                data: "TermName",
                render: function (data, type, row, meta) {
                    return row.termName
                }
            },
            {
                data: "FeeType",
                render: function (data, type, row, meta) {
                    return `${row.feeType}<input type="text" title="${row.feeTypeId}" value="${row.feeTermId}" hidden/>`;
                }
            },
            {
                data: "Description",
                render: function (data, type, row, meta) {
                    return row.description
                }
            },
            {
                data: "feeTermId",
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
        $('#Feetermstbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
            color: 'black',
            'text-decoration': 'underline',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
    });
    $('#Feetermstbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
        color: 'black',
        'text-decoration': 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
}

$('#btnsearch').click(function () {
    debugger;
    //var Feeterm = $('#txtFeeterm').val();
    //var AcademicYear = $('#ddlAcademicYearSearch').val();
    var Formdata = $('#Searchfeetermform').serialize();
    handleAjaxtabledata('GET', "/FeeSection/Bindtblfeeterm", Formdata,
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
    $('#Addnewfeeterm_div1').empty();
    debugger;
    CallToAjax('GET', "/FeeSection/Insert_feeterms", null,
        function (resp) {
            loaddingimg.css('display', 'none');
            $('#SearchFeeterm_tbldiv').hide();
            $('#Addnewfeeterm_div1').append(resp);

            Bindacadamicyearddl();
            Bindfeetypeddl();
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
}

function Bindacadamicyearddl() {
    fetchDataAndPopulateDropdown(                           //==== << ** Acadamicyear Dropdown ** >>
        '/FeeSection/GetAcadamicyeardd',                    // URL for data fetching
        '#ddlAcademicYear',                               // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        ' '                                                 // Response value return class name
    );
}
function Bindfeetypeddl() {
    fetchDataAndPopulateDropdown(                           //==== << ** Feetype Dropdown ** >>
        '/FeeSection/Getfeetypesdd',                        // URL for data fetching
        '#lstfeetypes',                                      // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        ' '                                                 // Response value return class name
    );
}


$(document).on('click', '#Feetermstbl td:nth-child(2)', function (event) {
    try {
        loaddingimg.css('display', 'block');
        debugger;
        event.stopImmediatePropagation();

        var parent = $(event.target).closest('tr');
        var FeeTermId = $(parent).find('td').find('input[type="text"]').val();
        //var FeeTermIds = $(this).find('input[type="text"]').val();
        //var FeeTypeId = $(this).find('input[type="text"]').attr('title');
        var table = $('#Feetypestbl').DataTable();
        //tabletargetpagetblSEMsearchresults = table.page.info().page;

        //var formdata = {
        //    Feetypeid: Feetypeid,
        //    Concedingtypeid: Concedingtypeid
        //}

        CallToAjax('GET', "/FeeSection/FeeTerm_Edit?FeeTermId=" + FeeTermId, null,
            function (resp) {
                debugger;
                loaddingimg.css('display', 'none');
                $('#SearchFeeterm_tbldiv').hide();
                $('#Addnewfeeterm_div1').append(resp);
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );

    }
    catch (e) {

    }
})

$(document).on('click', '#Feetermstbl td:nth-child(5) .fa-trash-o', function (event) {
    try {
        loaddingimg.css('display', 'block');
        debugger;
        event.stopImmediatePropagation();

        var parent = $(event.target).closest('tr');
        var FeeTermId = $(parent).find('td').find('input[type="text"]').val();
        var TermName = $(parent).find('td:eq(1)').text();
        var FeetypeName = $(parent).find('td:eq(2)').text();
        var Description = $(parent).find('td:eq(3)').text();
        var FeeTypeId = $(parent).find('td').find('input[type="text"]').attr('title');

        var table = $('#Feetypestbl').DataTable();
        //tabletargetpagetblSEMsearchresults = table.page.info().page;

        DeleteFeeTypes(FeeTermId, FeeTypeId, TermName, FeetypeName)

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
        $('#Errormessage').text('');
    }
}

//===>>> DELETE FUNCTION
function DeleteFeeTypes(FeeTermId, FeeTypeId, TermName, FeetypeName) {//Feetypeid, FeetypeName, selectedIds, selectedTexts
    if (confirm("Are you sure you want to delete this FeeTerm?\nClick OK to delete or Cancel to stop deleting.")) {
        debugger;
        var formdata = {
            FeeTermId: FeeTermId,
            FeeTypeId: FeeTypeId
        }
        CallToAjax('GET', "/FeeSection/Deletefeeterm", formdata,
            function (resp) {
                debugger;
                loaddingimg.css('display', 'none');
                const errorMessages = {
                   // "1": 'Record is successfully deleted.',
                    "0": 'This Fee Type is Associated with Few Students you cannot delete it.',
                    "2": 'FeeType ' + FeetypeName + ' is Deleted For the FeeTerm ' + TermName,
                };
                const errorMessage = errorMessages[resp] || 'Record is successfully deleted.';
                $('#Commonerrormessage').text(errorMessage);

                Pageload();               
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );
    }
}


//====>>>>> NEXT PAGE && PREVIOUS PAGES BUTTON
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