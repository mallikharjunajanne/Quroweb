function handleAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
    var ajaxOptions = {
        url: url,
        method: method,
        //data: data,
        //contentType: false,
        //processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };
    debugger;
    if (hasFileUpload) {
        ajaxOptions.contentType = false;
        ajaxOptions.processData = false;
        ajaxOptions.data = data;
    } else {
        ajaxOptions.data = JSON.stringify(data);
        ajaxOptions.contentType = 'application/json; charset=utf-8';
        ajaxOptions.processData = false;
    }

    $.ajax(ajaxOptions);
}
function TblCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
       // success: Datatablesbindingfun,
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

    // Default appending start date and end date 
    setMonthStartEndDates();

    //Table Data Binding function
    Bankdeposittablebindingfun();

});

function Bankdeposittablebindingfun() {
    var formData = $('#BankdepositSearchForm').serialize();
    debugger;
    TblCallToAjax('GET', '/Admin/ManageBankDeposittbl', formData,
        function (response) {
            // Assuming response contains data for DataTable binding
            //Datatablesbindingfun(response);
            Tabledatabindingfun(response);
        },
        function (status, error) {
            $('#Commoneerrormessage').text('Something went wrong  in table data binding function...!!!!');
        }
    );
}

// Function to compare dates and show error message
function DatesCompare(Sdate, Edate) {
    try {
        /*debugger;*/
        var StartdateInput = $("#Startdatetxt").val();
        var EnddateInput = $("#Enddatetxt").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var errorElement = $('#Commoneerrormessage');

        // Clear previous error message
        errorElement.text("");

        if (Enddate <= Startdate) {
            errorElement.text(Sdate+ " must be greater than " + Edate + ".");
        } 

    } catch (error) {
        console.log(error);
    }
}

// Dates input change Event
$("#Startdatetxt").on("change", function () {DatesCompare("Start Date", "End Date");});
$("#Enddatetxt").on("change", function () {DatesCompare("Start Date", "End Date");});


// Function to get the first day of the month
function getFirstDayOfMonth(date) {
    /*debugger;*/
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Function to get the last day of the month
function getLastDayOfMonth(date) {
    /*debugger;*/
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Function to set Start Date and End Date inputs to current month's first and last dates
function setMonthStartEndDates() {
    /*debugger;*/
    var today = new Date();
    var firstDayOfMonth = getFirstDayOfMonth(today);
    var lastDayOfMonth = getLastDayOfMonth(today);
   
    $("#Startdatetxt").val(DateFormate(firstDayOfMonth));
    $("#Enddatetxt").val(DateFormate(lastDayOfMonth));
}

// Function to format date as 'YYYY-MM-DD'
function DateFormate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

$('#BankdepositSearchForm').submit(function () {
    debugger;
    event.preventDefault();
    event.stopPropagation();
    $('#Commoneerrormessage').text('');
    var formData = $('#BankdepositSearchForm').serialize();

    TblCallToAjax('GET', '/Admin/ManageBankDeposittbl', formData,
        function (response) {
            // Assuming response contains data for DataTable binding
           // Datatablesbindingfun(response);
            Tabledatabindingfun(response);
        },
        function (status, error) {
            $('#Commoneerrormessage').text('Something went wrong  in table data binding function...!!!!');
        }
    );
});


function Newdiposit() {
    debugger;
    $('#Amountdepositdiv1').empty();

    handleAjax('GET', "/Admin/Insertmanagebankdeposit", null,
        function (resp) {
            loaddingimg.css('display', 'none');
            $('#Bankdipositdiv').hide();
            $('#Amountdepositdiv1').append(resp);

            //CommonDropdownAjaxFunction("Paymentmodeidddl", "GET", "/Admin/Paymentmodeddl", null, function (responce) {
            //    debugger;
            //    loaddingimg.css('display', 'none');
            //}, true);
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        },
        true
    );
}

///===>> BACK TO SEARCH  FUNCTION CODE START
$('#Backtosearchlnk').click(function (e) {
    debugger;
    e.preventDefault();
    $('#Amountdepositdiv1').empty();
    $('#Bankdeposittblid').empty();
    Bankdeposittablebindingfun();
    $('#Bankdipositdiv').show();
    $('#Commoneerrormessage').text('');
    //$('#emailError').text('');
});


///===>>> NEW BANK DEPOSIT FUNCTION CODE START
$('#Bankdepositform').on('submit', function (event) {
    debugger;
    event.preventDefault();
    event.stopPropagation();
    $('#Commoneerrormessage').text('');
    //$('#emailError').text('');
    var DateofDeposit = $('#Depositdatetxt').val();
    var Depositdate = new Date(DateofDeposit);
    var today = new Date();
    if (Depositdate > today) {
        $('#Commoneerrormessage').text('Date of Deposit should not be greater than Todays Date.');
        return;
    }
    setTimeout(function () {
        $('#Commoneerrormessage').text('');
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');

            var formData = new FormData($('#Bankdepositform')[0]);
            var fileInput = document.getElementById('AttachedDocument');
            var file;
            if (fileInput.files.length > 0) {
                file = fileInput.files[0];
                formData.append('AttachedDocument', file);
            }

            var Depositdate = $('#Depositdatetxt').val();
            var Feedepositval = $('#Feedeposittxtid').val();

            formData.append("Depositdate", Depositdate);

            if (file) {
                var url = "/Admin/Insertmanagebankdeposit?AttachedDocument=" + file;
            } else {
                var url = "/Admin/Insertmanagebankdeposit";
            }

            //handleAjax('POST', "/Admin/Insertmanagebankdeposit?AttachedDocument=" + file, formData,
            handleAjax('POST', url, formData,
                function (resp) {
                   

                        if (resp == 'FileExist') {
                            loaddingimg.css('display', 'none');
                            $('#Commoneerrormessage').text("File already exists");
                        }
                        else if (resp == '1MB') {
                            loaddingimg.css('display', 'none');
                            $('#Commoneerrormessage').text("Document size cannot be greater than 1 MB.");
                        }
                        else if (resp == 'FileNotExist') {
                            loaddingimg.css('display', 'none');
                            $('#Commoneerrormessage').text("File Not Exist");
                        }
                        else if (resp == "0") {
                            loaddingimg.css('display', 'none');
                            $('#Commoneerrormessage').text("Record Insert Unsuccessful Please try again");
                        }
                    if (Feedepositval == null) {
                        if (resp == "-1") {
                            loaddingimg.css('display', 'none');
                            $('#Commoneerrormessage').text("Record Insert Unsuccessful Please try again");
                        }
                        else {
                            $('#Clearbtn').prop("disabled", true);
                            $('#submitbtn').css('opacity', '0.3').prop("disabled", true);
                            loaddingimg.css('display', 'none');
                            $('#Commoneerrormessage').text("Record inserted successfully.");
                        }
                    } else {
                        if (resp == "-1") {
                            loaddingimg.css('display', 'none');
                            $('#Commoneerrormessage').text("Record Update Unsuccessful Please try again");
                        }
                        else {
                            $('#Clearbtn').prop("disabled", true);
                            $('#submitbtn').css('opacity', '0.3').prop("disabled", true);
                            loaddingimg.css('display', 'none');
                            $('#Commoneerrormessage').text("Record Update successfully.");
                        }
                    }
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                },
                true
            );
        }
    }, 50);
});

///===>>> BANK DEPOSIT EDIT FUNCTION CODE START
$(document).on('click', '#Bankdeposittblid td:nth-child(1)', function (event) {
    try {
        loaddingimg.css('display', 'block');
        debugger;
        event.stopImmediatePropagation();

        var parent = $(event.target).closest('tr');
        var spanValue = $(parent).find('td:first-child span').text();
        //var ManageBankdepositid = $(parent).find('td').find('input[type="text"]').val();
        //var table = $('#Bankdeposittblid').DataTable();
        //tabletargetpagetblSEMsearchresults = table.page.info().page;

        
        //var data = { ManageBankdepositid: parseInt(ManageBankdepositid) };
        handleAjax('GET', "/Admin/Insertmanagebankdeposit?ManageBankdepositid=" + spanValue, null,
        //handleAjax('GET', "/Admin/Insertmanagebankdeposit?ManageBankdepositid=" + ManageBankdepositid, null,
            function (resp) {
                debugger;
                loaddingimg.css('display', 'none');              
                $('#Bankdipositdiv').hide();
                $('#Amountdepositdiv1').append(resp);

                $('#Clearbtn').hide();

                var INSERTUPDATEVALUE = $('#Insert_Updatespanid').data('value');
                var button = document.getElementById('submitbtn');
                //var form = document.getElementById('Bankdepositform');
                debugger;
                if (INSERTUPDATEVALUE && INSERTUPDATEVALUE.trim() === "UpdateMethod") {
                    button.id = "Updatebtn";
                    button.name = "Update";
                    button.textContent = "Update";
                    button.value = "Update";
                    //    form.id = "UpdateBankdepositform";
                    //    form.setAttribute('name', 'UpdateBankdepositform');
                }
                else {
                    button.id = "Savebtn";
                    button.name = "Submit";
                    button.textContent = "Submit";
                    button.value = "Submit";
                    //    form.id = "Bankdepositform";
                    //    form.setAttribute('name', 'Bankdepositform');
                }
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            },
            true
        );
        //Editfun(Registrationuserid);
    }
    catch (e) {

    }
})

function DateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '/' + month + '/' + year;
    return formattedDate;
}

//======>>>> TABLE DATA BINDING FUNCTION
function Tabledatabindingfun(response) {
    debugger;
    CommonDropdownAjaxFunction("PaymentModeSearchddl", "GET", "/Admin/Paymentmodeddl", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
    // Assuming response is an array of objects containing data

    $("#Recordscount").text(response.length);

    // Clear the existing content of the table
    $('#Bankdeposittbldivid').empty();
    $('#Bankdeposittblid').empty();

    // Create the table element
    var table = document.createElement('table');
    table.id = 'Bankdeposittblid';
    table.classList.add('lnks','table', 'table-hover', 'table-bordered', 'no-footer');
    table.style.borderCollapse = 'collapse';
    table.style.border = '1px solid black';

    // Create thead and append it to the table
    var thead = document.createElement('thead');
    thead.classList.add('table-dark');
    var trHead = document.createElement('tr');
    ['Deposit ID', 'School Name', 'Deposit Amount', 'Bank Name', 'Branch Name', 'Account Number', 'Payment Mode', 'Deposit Date', 'Created Date'].forEach(function (headingText) {
        var th = document.createElement('th');
        th.textContent = headingText;
        th.style.border = '1px solid black';
        th.style.borderCollapse = 'collapse';
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Create tbody and append it to the table
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Append the table to the div with ID 'Bankdeposittbldivid'
    document.getElementById('Bankdeposittbldivid').appendChild(table);

    // Populate the table with data
    response.forEach(function (row, index) {
        var tr = document.createElement('tr');
        tr.classList.add(index % 2 === 0 ? 'even' : 'odd');

        var firstCell = document.createElement('td');
        var span = document.createElement('span');
        span.textContent = row['feeDepositId']; // Assuming 'feeDepositId' is the property name        
        span.setAttribute('data-fee-deposit-id', row['feeDepositId']);        
        span.style.display = 'block';
        firstCell.style.border = '1px solid black';
        firstCell.style.borderCollapse = 'collapse';
        firstCell.appendChild(span);
        tr.appendChild(firstCell);

        ['schoolName', 'depositAmount', 'bankName', 'branchName', 'accountNumber', 'paymentMode', 'depositdate', 'createdDate'].forEach(function (propertyName) { // Corrected 'dipositDate' to 'depositDate'
            var td = document.createElement('td');
            td.textContent = row[propertyName];
            td.style.border = '1px solid black';
            td.style.borderCollapse = 'collapse';
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}

//=====>>>> CLEAR FUNCTION
function Clearcommonfunction(Formid, ErrorMessageSpanId) {
    debugger;
    $('#Paymentmodeidddl').val('');
    $('#Depositamounttxt').val('');
    $('#Depositdatetxt').val('');
    $('#BankNametxt').val('');
    $('#Branchnametxt').val('');
    $('#Accountnumbertxt').val('');
    $('#AttachedDocument').val('');
    $('#Commentstxta').val('');
}




//======>>>> EXPORT TO EXCEL FUNCTION CODE START
$('#Amountdepositdivexporttoexcel, #AmountdepositExportToExcel').on('click', function () {

    var formattedDate = DateFormat();

    debugger;
    var startDate = $('#Startdatetxt').val();
    var endDate = $('#Enddatetxt').val();

    var headerContent = `
            <div style="display: grid; grid-template-columns: repeat(18, 1fr);">
                <div style="grid-column: 1 / span 18;">
                     <h4 style="margin: 0; text-align: center;">Fee Amount Deposit </h4>
                     <h4 style="margin: 0; text-align: center;">Report On:${formattedDate}</h4>
                     <h4 style="margin: 0; text-align: center;">Start Date: ${startDate.replace('/', '-')}</h4>
                     <h4 style="margin: 0; text-align: center;">End Date: ${endDate.replace('/', '-')}</h4>
                </div>
            </div>`;

    var table1 = document.getElementById("Bankdeposittblid");
    var table1Clone = table1.cloneNode(true);
    //table1Clone.style.borderCollapse = "collapse";
    table1Clone.style.border = "1px solid black";

    var cells = table1.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {     
        cells[i].textContent = cells[i].textContent.trim();
        //cells[i].style.borderCollapse = "collapse";
        cells[i].style.border = "1px solid black";     
    }

    var FooterContent = `
      <div style="grid-column: 1 / span 10; background-color: #e0e0e0; padding: 20px; border-radius: 5px;">
        <p style="margin: 0; text-align: center;font-size: 9px;">This report contains confidential information intended solely for the recipient. Unauthorized use, copying, or distribution is strictly prohibited.</p>
      </div>
      `;
    document.body.appendChild(table1Clone);

    var combinedHtml = headerContent + table1Clone.outerHTML + FooterContent;
    //var combinedHtml = headerContent + table1Clone.outerHTML;

    const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
    saveAs(blob, 'FeeAmountDepositReport.xls');

    // Replace the original table with the cloned table in the document
    table1.parentNode.replaceChild(table1Clone, table1);

});





 //CommonDropdownAjaxFunction("PaymentModeSearchddl", "GET", "/Admin/Paymentmodeddl", null, function (responce) {
    //    loaddingimg.css('display', 'none');
    //}, true);

//Dropdown bindining function
    //handleAjax('GET', '/Admin/Paymentmodeddl__', null,
    //    function (response) {
    //        populateDropdown(response, 'PaymentModeSearchddl');
    //    },
    //    function (status, error) {
    //        var Dropdownappending = $('#PaymentModeSearchddl');
    //        Dropdownappending.append($('<option>', {
    //            value: '0000',
    //            text: "500 Error"
    //        }));
    //    },
    //    true
    //);

    //Table Data binding function
    //var Startdate = $('#Startdatetxt').val();
    //var formData = $('#BankdepositSearchForm').serialize();
    //debugger;
    //TblCallToAjax('GET', '/Admin/ManageBankDeposittbl', formData,
    //    function (response) {
    //        // Assuming response contains data for DataTable binding
    //        //Datatablesbindingfun(response);
    //        Tabledatabindingfun(response);
    //    },
    //    function (status, error) {
    //        $('#Commoneerrormessage').text('Something went wrong  in table data binding function...!!!!');
    //    }
    //);

/////===>>> Dropdown Appending function
//function populateDropdown(dropdownvalues,Dropdownid) {
//    debugger;
//    var Dropdownappending = $('#' + Dropdownid);
//    Dropdownappending.append($('<option>', {
//        value: '',
//        text: '------Select------'
//    }));
//    $.each(dropdownvalues, function (index, item) {
//        Dropdownappending.append($('<option>', {
//            value: item.value,
//            text: item.text
//        }));
//    });
//}


//function Datatablesbindingfun(response) {

//    CommonDropdownAjaxFunction("PaymentModeSearchddl", "GET", "/Admin/Paymentmodeddl", null, function (resp) {
//        loaddingimg.css('display', 'none');
//    }, true);

//    debugger;
//    var formattedDate = DateFormat();
//    var startDate = DateFormat($('#Startdatetxt').val());
//    var endDate = DateFormat($('#Enddatetxt').val());

//    debugger;
//    //$('#Bankdeposittblid').empty();
//    $('#Bankdeposittblid tbody').empty();
//    var table = $('#Bankdeposittblid').DataTable();
//    table.destroy();
//    $("#Bankdeposittblid").css("font-size", "12px");
//    $("#Recordscount").text(response.length);

//    var newTable = $("#Bankdeposittblid").DataTable({
//        dom: 'Bfrtip',
//        buttons: [
//            //{
//            //    extend: 'pdfHtml5',
//            //    title: 'Fee Amount Deposit',
//            //    message: "Report On: " + formattedDate,
//            //    //exportOptions: {
//            //    //    columns: [1, 2]
//            //    //},
//            //},
//            {
//                extend: 'excel',
//                title: 'Fee Amount Deposit',
//                message: "Report On: " + formattedDate + "\nStart Date: " + startDate + "\nEnd Date: " + endDate,
//                customize: function (xlsx) {

//                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
//                    sheet.getElementsByTagName('row')[1].setAttribute('ht', '40');
//                    // Set background color to white for the entire sheet
//                    $('sheet', sheet).attr('ss:Color', '#FFFFFF');

//                    // Set border color to white for all cells
//                    $('sheet sheetData row c', sheet).each(function () {
//                        $(this).attr('s', '51'); // Style ID for white border
//                    });

//                    // Set 1px black border for data cells
//                    $('sheet sheetData row c[r^="A"]', sheet).each(function () {
//                        $(this).attr('s', '52'); // Style ID for black border
//                    });
//                }
//            }
//            //,{
//            //    extend: 'print',
//            //    title: 'SMANAGE CATEGORY REPORT',
//            //    message: "Report On: " + formattedDate,
//            //    exportOptions: {
//            //        columns: [1, 2]
//            //    },
//            //}
//        ],
//        bProcessing: false,
//        bLengthChange: true,
//        /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
//        bfilter: true,
//        bSort: false,
//        searching: false,
//        scrollX: true,
//        scrollY: '400px',
//        scrollCollapse: true,
//        paging: true,  
//        bPaginate: true,
//        pageLength: 20,  
//        //  stateSave:true,
//        data: response,
//        columns: [
//            //{
//            //    targets: 0, // Assuming this is the column index where you want to display numbering
//            //    render: function (data, type, row, meta) {
//            //        var currentPage = table.page.info().page;
//            //        var rowsPerPage = table.page.info().length;
//            //        return (0 * rowsPerPage) + meta.row + 1;
//            //    }
//            //},
//            {
//                data: "FeeDepositId",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.feeDepositId
//                }
//            },
//            {
//                data: "SchoolName",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.schoolName
//                }
//            },
//            {
//                data: "DipositAmount",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.dipositAmount + '<input type="text" value=' + row.feeDepositId + ' hidden/>'
//                }
//            },            
//            {
//                data: "BankName",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.bankName
//                }
//            },
//            {
//                data: "BranchName",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.branchName
//                }
//            },
//            {
//                data: "AccountNumber",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.accountNumber
//                }
//            },
//            {
//                data: "PaymentMode",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.paymentMode
//                }
//            },
//            {
//                data: "DipositDate",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.dipositDate
//                }
//            },
//            {
//                data: "CreatedDate",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.createdDate
//                }
//            }
//            //,{
//            //    data: "BranchName",
//            //    render: function (data, type, row, meta) {
//            //        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
//            //    }
//            //}
//        ]

//    });

//    table.on('draw', function () {
//        $('#Admissionssummaryreporttbl').find('td:nth-child(1)').attr('title', 'Edit').attr('title', 'Edit').css({
//            color: 'black',
//            'text-decoration': 'underline',
//            cursor: 'pointer',
//            fontWeight: 'bold'
//        });
//    });
//    $('#Bankdeposittblid').find('td:nth-child(1)').attr('title', 'Edit').attr('title', 'Edit').css({
//        color: 'black',
//        'text-decoration': 'underline',
//        cursor: 'pointer',
//        fontWeight: 'bold'
//    });
//}



///===>> CREATE New BANK DEPOSITE FUNCTION CODE START

 //handleAjax('GET', '/Admin/Paymentmodeddl', null,
    //    function (response) {
    //        debugger;
    //        populateDropdown(response,'Paymentmodeidddl');
    //    },
    //    function (status, error) {
    //        var Dropdownappending = $('#Paymentmodeidddl');
    //        Dropdownappending.append($('<option>', {
    //            value: '0000',
    //            text: "500 Error"
    //        }));
    //    },
    //    true
    //);