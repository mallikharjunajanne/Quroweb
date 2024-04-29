function handleAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {

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
function CallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        success: bindDatatable,
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
function CallToAjaxdropdown(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function Maintblfunction() {

    CallToAjax('GET', '/FeeSection/Fee_Terms_GetTable', null,

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );
}

function Addnewtermfun(event) {

    event.preventDefault();
    $("#Errormessage").text('');
    $('#Searchfeetermformid')[0].reset();
    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/FeeSection/GetAcadamicyeardd',          // URL for data fetching
        '#Ddlacadamicyearid',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/FeeSection/Getfeetypesdd',          // URL for data fetching
        '#Ddlfeetype',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
    $("#CreateFeeDiscountType_Divid").show();
    $("#FeeTypesDiscountTbl_Divid").hide();
    $("#UpdateEditView_DivId").hide();
}



//$(document).ready(function () {
//    loaddingimg.css('display', 'block');
//    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
//        '/FeeSection/GetAcadamicyeardd',          // URL for data fetching
//        '#ddlAcademicYearSearch',                                   // Dropdown selector
//        'value',                                            // Field name for option text
//        'text',                                             // Field name for option values
//        'manageClassification'                              // Response value return class name
//    );
//    Maintblfunction();

//    $("#Errormessage").text('');
//    $("#CreateFeeDiscountType_Divid").hide();
//    $("#FeeTypesDiscountTbl_Divid").show();
//    $("#UpdateEditView_DivId").hide();


//    loaddingimg.css('display', 'none');
//});








//$('#Searchfeetermformid').submit(function () {
$('#searchbtn').click(function () {
    $("#Errormessage").text('');
    debugger;
    var TermName = $('#FeeTermTxt_Id').val();
    var AcademicYearId = $('#searchddlacadamicyearid').val();
    var formData = new FormData(); 
    formData.append('TermName', TermName);
    formData.append('AcademicYearId', TermName);
   // var formData = $('#Searchfeetermformid').serialize();
    var data = {
        TermName: TermName,
        AcademicYearId: AcademicYearId
    };
    CallToAjax('GET', '/FeeSection/Fee_Terms_GetTable', data,

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );
});


function bindDatatable(response) {

    debugger;

    var CountTabledata = response.length;

    $('#TableCount').text(CountTabledata);
    var table = $('#FeeTerms_Table');
    var tbody = table.find('tbody');


    // Clear the existing table body
    tbody.empty();

    // Iterate over the data and create table rows
    $.each(response, function (index, FeeTermstbls) {
        var row = $('<tr></tr>');



        // Create table cells and populate with data

        var cell1 = $('<td class="editable-cell"></td>').css('cursor', 'pointer');
        var text = $('<span></span>').text(FeeTermstbls.termName).css({
            'color': 'black',
            'font-weight': '600',
            'text-decoration': 'underline'
        }).attr('onclick', 'Feeterm_Edit(' + FeeTermstbls.feeTermId + ')');
        cell1.append(text);


        var cell2 = $('<td></td>').text(FeeTermstbls.feeType);
        var cell3 = $('<td></td>').text(FeeTermstbls.description);
        var cell4 = $('<td></td>').css('text-align', 'center');
        var deleteIcon = $('<i></i>').addClass('fas fa-trash-alt'); // Assuming you're using Font Awesome icons
        deleteIcon.data('row', row);
        cell4.append(deleteIcon);


        var cell5 = $('<td hidden></td>').text(FeeTermstbls.instanceId);
        var cell6 = $('<td hidden></td>').text(FeeTermstbls.academicYearId);
        var cell7 = $('<td hidden></td>').text(FeeTermstbls.feeTypeId);




        // Append the cells to the row
        row.append(cell1);
        row.append(cell2);
        row.append(cell3);
        row.append(cell4);
        row.append(cell5);
        row.append(cell6);
        row.append(cell7);

        // Append the row to the table body
        tbody.append(row);
    });




    /*---------------------------------------------- PAGINATION CODE START ----------------------------------------------*/

    var rowsPerPage = 10; // Number of rows to display per page
    var numPages = Math.ceil(response.length / rowsPerPage);
    var currentPage = 1; // Default current page

    var pagination = $('#FeeTerm_pagination');
    pagination.empty();

    // Create pagination links
    var previousLink = $('<a class="FeeTerm_pagination" style="margin: 0 2px;" href="#">Previous</a>');
    pagination.append(previousLink);

    var startIndex = 1; // Start index for pagination links
    var endIndex = Math.min(numPages, 10); // End index for pagination links

    for (var i = startIndex; i <= endIndex; i++) {
        var link = $('<a class="FeeTerm_pagination" style="margin: 0 2px;" href="#">' + i + '</a>');
        pagination.append(link);
    }

    var nextLink = $('<a class="FeeTerm_pagination" style="margin: 0 2px;" href="#">Next</a>');
    pagination.append(nextLink);

    // Show the first page by default
    showPage(currentPage);

    // Adjust pagination alignment
    pagination.css('text-align', 'center');

    // Handle pagination link click event
    pagination.on('click', '.FeeTerm_pagination', function (e) {
        e.preventDefault();
        var linkText = $(this).text();
        if (linkText === "Previous") {
            currentPage = Math.max(currentPage - 1, 1);
        } else if (linkText === "Next") {
            currentPage = Math.min(currentPage + 1, numPages);
        } else {
            currentPage = parseInt(linkText);
        }
        showPage(currentPage);
    });

    // Function to display the specified page
    function showPage(page) {
        var start = (page - 1) * rowsPerPage;
        var end = start + rowsPerPage;

        tbody.find('tr').hide(); // Hide all rows
        tbody.find('tr').slice(start, end).show(); // Show rows for the specified page

        // Update pagination links
        var newStartIndex = Math.max(1, page - 4);
        var newEndIndex = Math.min(newStartIndex + 9, numPages);

        if (newEndIndex === numPages) {
            newStartIndex = Math.max(1, numPages - 9);
        }

        pagination.empty();
        pagination.append(previousLink);

        for (var i = newStartIndex; i <= newEndIndex; i++) {
            var link = $('<a class="FeeTerm_pagination" style="margin: 0 2px;" href="#">' + i + '</a>');
            pagination.append(link);
        }

        pagination.append(nextLink);

        // Update active class on current page link
        $('.FeeTerm_pagination').removeClass('active');
        $('.FeeTerm_pagination').eq(page - newStartIndex + 1).addClass('active').css('cursor', 'unset');;
    }

}




$('#Createnewtermform').submit(function () {
    $("#Errormessage").text('');
    event.preventDefault();
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            debugger;
            var TermName = $('#FeeTermName').val();
            var formDataArray = $(this).serializeArray();

            var AcademicYear_Id = $("#Ddlacadamicyearid").val();
            //var FeeTermName = $("#FeeTermName").val();
            var FeeTypeIds = $("#Ddlfeetype").val();
            var FeeTermdescription = $("#FeeTermdescription").val();


            formDataArray.push({ name: 'AcademicYearId', value: AcademicYear_Id });
            formDataArray.push({ name: 'TermName', value: TermName });
            formDataArray.push({ name: 'Description', value: FeeTermdescription });
            formDataArray.push({ name: 'FeeTypeIds', value: FeeTypeIds });

            // Convert the formDataArray back to serialized form data
            var formData = $.param(formDataArray);


             //var formData = $('#Createnewtermform').serialize();
             var url = "/FeeSection/ManageFeeTerms";
            //var url = "/FeeSection/ManageFeeTerms?ConcedingTypeName=" + ConcedingTypeName + "&amount=" + amount + "&Description=" + description;
            //handleAjax('POST', url, formData,
            $.ajax({
                url: '/FeeSection/ManageFeeTerms', // Replace with the actual URL and controller name
                type: 'POST',
                data: formData,
                success: function (response) {
                    debugger;
                    if (response == "1") {
                        $("#Errormessage").text("Record inserted successfully!");
                    }
                    else if (response == "2") {
                        $("#Errormessage").text("Record inserted successfully!");
                    }
                    else if (response == "0") {
                        $("#Errormessage").text("Term Name with Name " + '"' + TermName + '"' + " already exists.");
                    }
                    else if (response == response) {
                        $('#Errormessage').text('Record inserted successfully.');
                    }
                    else {
                        $("#Errormessage").text("Failed to insert the record. Please try again.");
                    }

                    loaddingimg.css('display', 'none');
                },
                error: function (status, error) {
                    debugger;
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                }
            });
            //    ,
            //    true
            //);
        }
    }, 50);
});


//======>>>>EDIT
function Feeterm_Edit(FeeTermId) {
    debugger;
    $('#Errormessage').text('');
    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/FeeSection/GetAcadamicyeardd',          // URL for data fetching
        '#AcademicYearEdit_Id',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/FeeSection/Getfeetypesdd',          // URL for data fetching
        '#FTermEdit_ID',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
    $("#CreateFeeDiscountType_Divid").hide();
    $("#FeeTypesDiscountTbl_Divid").hide();
    $("#UpdateEditView_DivId").show();
    Editfunction(FeeTermId);
}

function Editfunction(FeeTermId){
    $.ajax({
        url: '/FeeSection/Fee_Terms_EditGet', // Update with the appropriate URL
        method: 'GET',
        data: {
            FeeTermId: FeeTermId
        },
        success: function (response) {
            debugger;
            var responselength = response.length;
            $('#FeeTermIdTxt_Id').val(response[0].feeTermId);
            $('#InstanceIdTxt_Id').val(response[0].instanceId);

            var academicYearId = response[0].academicYearId.toString();
            $('#AcademicYearEdit_Id').val(academicYearId);
            $('#FeeTermNameTxt_Id').val(response[0].termName);
            $('#FeeTermdescriptionTxt_Id').val(response[0].description);
            debugger;
            for (var i = 0; i < responselength; i++) {
                //var feeTypeId = response[i].feeTypeId.toString();

                var feeTypeId = response[i].feeTypeId.toString();
                var feeType = response[i].feeType;

                // Create option element
                var option = $('<option>', {
                    value: feeTypeId,
                    text: feeType
                });
                option.prop('selected', true);
               // $('#FTermEdit_ID').val(feeTypeId);

                $('#FTermEdit_ID').append(option);
            }
            
        },
        error: function () {
            console.log('Error fetching Fee Type data.');
        }
    });
}



$('#FeeTerms_Table').on('click', '.fa-trash-alt', function () {
    var row = $(this).data('row');

    var InstanceId = $(this).closest('tr').find('td:nth-child(5)').text();
    var FeeTermId = $(this).closest('tr').find('td:nth-child(6)').text();
    var FeeTypeId = $(this).closest('tr').find('td:nth-child(7)').text();
    var FeeTerm = $(this).closest('tr').find('td:nth-child(1)').text();
    var FeeTypeName = $(this).closest('tr').find('td:nth-child(2)').text();


    if (confirm('Are you sure you want to delete the FeeTerm Name?\nClick ' + 'OK' + ' to delete or ' + 'Cancel' + 'to stop deleting.')) {
        deletefeeterm(InstanceId, FeeTermId, FeeTypeId, FeeTypeName, FeeTerm, row);
    }
});

function deletefeeterm(InstanceId, FeeTermId, FeeTypeId, FeeTypeName, FeeTerm, row) {
    $('#Errormessage').text('');
    debugger;

    $.ajax({
        url: '/FeeSection/Delete_FeeTerm',
        method: 'POST',
        data: {
            InstanceId: InstanceId,
            FeeTermId: FeeTermId,
            FeeTypeId: FeeTypeId
        },
        success: function (response) {
            debugger;
            if (response == '2') {
                debugger;
                $('#Errormessage').text('Record deleted successfully.');
                row.remove();

                window.scrollTo(0, 0);
            } else if (response == '1') {
                $('#Errormessage').text('FeeType' + '"' + FeeTerm + '"' + 'is Deleted For the FeeTerm ' + '"' + FeeTypeName + '"');
                row.find('td:eq(4)').empty();
            } else if (response == '0') {
                $('#Errormessage').text('This Fee Term is Associated with Few Students you cannot delete it.');
            }

            else {
                alert('NUll');
            }
        },
        error: function () {
            console.log('Error deleting Fee Type.');
        }
    });
}




//====>>>>>
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
    CallToAjaxdropdown('GET', url,
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