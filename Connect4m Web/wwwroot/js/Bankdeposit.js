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
    /*debugger;*/
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
    /*debugger;*/ 

    // Default appending start date and end date 
    setMonthStartEndDates();

    CommonDropdownAjaxFunction("PaymentModeSearchddl", "GET", "/Admin/Paymentmodeddl", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);

    //Table Data Binding function
    Bankdeposittablebindingfun();

});

function Bankdeposittablebindingfun() {
    var formData = $('#BankdepositSearchForm').serialize();
    /*debugger;*/
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
    /*debugger;*/
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
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        },
        true
    );
}

///===>> BACK TO SEARCH  FUNCTION CODE START
$('#Backtosearchlnk').click(function (e) {
    /*debugger;*/
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
    var DateofDeposit = $('#Depositdatetxtid').val();
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
            //var fileInput = document.getElementById('AttachedDocument');
            //var file;
            //if (fileInput.files.length > 0) {
            //    file = fileInput.files[0];
            //    formData.append('AttachedDocument', file);
            //}
            debugger;
            var fileInput = document.getElementById('AttachedDocument');
            var file;
            if (fileInput.files.length > 0) {
                debugger;
                file = fileInput.files[0];
                var fileName = file.name;
                var fileExtension = fileName.split('.').pop().toLowerCase();

                // List of allowed file extensions
                var allowedExtensions = ['doc', 'docx', 'pdf', 'jpeg', 'jpg', 'png', 'gif'];

                // Check if the selected file's extension is in the allowedExtensions array
                if (allowedExtensions.indexOf(fileExtension) !== -1) {
                    // Valid file format, proceed to append to formData
                    formData.append('AttachedDocument', file);
                } else {
                    // Invalid file format, show error message
                    $('#Commoneerrormessage').text('Please upload only .doc, .docx, .pdf, .jpeg, .jpg, .png, or .gif formats.');
                    // Optionally clear the file input field
                    fileInput.value = '';
                    loaddingimg.css('display', 'none');
                    return;
                }
            }


            var Depositdate = $('#Depositdatetxtid').val();
            formData.append("Datedeposit", Depositdate);

            if (file) {
                var url = "/Admin/Insertmanagebankdeposit?AttachedDocument=" + file;
            } else {
                var url = "/Admin/Insertmanagebankdeposit";
            }

            //handleAjax('POST', "/Admin/Insertmanagebankdeposit?AttachedDocument=" + file, formData,
            handleAjax('POST', url, formData,
                function (resp) {
                    debugger;
                    loaddingimg.css('display', 'none');
                    switch (resp) {
                        case 'FileExist':
                            $('#Commoneerrormessage').text("File already exists");
                            break;
                        case '1MB':
                            $('#Commoneerrormessage').text("Document size cannot be greater than 1 MB.");
                            break;
                        case 'FileNotExist':
                            $('#Commoneerrormessage').text("Please upload only .doc or .docx or .pdf or .jpeg or .jpg or .png or .gif formats.");
                            break;
                        case '0':
                        case '-1':
                            $('#Commoneerrormessage').text("Record Insert Unsuccessful. Please try again");
                            break;
                        default: // Success case
                            $('#Clearbtn, #submitbtn').prop("disabled", true).css('opacity', '0.3');
                            $('#Commoneerrormessage').text("Record inserted successfully.");
                            break;
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
        handleAjax('GET', "/Admin/Updatemanagebankdeposit?ManageBankdepositid=" + spanValue, null,
            function (resp) {
                debugger;
                $('#Amountdepositdiv1').empty();
                loaddingimg.css('display', 'none');              
                $('#Bankdipositdiv').hide();
                $('#Amountdepositdiv1').append(resp);
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            },
            true
        );
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
function Clearform(formid) {
    debugger;
    // Retrieve the form element by id
    var form = document.getElementById(formid);

    if (form) {
        // Use the reset method to clear the form
        form.reset();
        Bankdeposittablebindingfun();
        $('#Commoneerrormessage').text('');

        // Clear ASP.NET Core validation messages
        //var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        //validationSpans.forEach(span => {
        //    span.textContent = ''; // Clear validation messages
        //});

    } else {
        console.error("Form with id '" + formid + "' not found.");
    }
}
function InsertClearform(formid) {
    debugger;
    // Retrieve the form element by id
    var form = document.getElementById(formid);

    if (form) {
        // Use the reset method to clear the form
        form.reset();
        //Bankdeposittablebindingfun();
        $('#Commoneerrormessage').text('');

        // Clear ASP.NET Core validation messages
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });

    } else {
        console.error("Form with id '" + formid + "' not found.");
    }
}


//======>>>> EXPORT TO EXCEL FUNCTION CODE START
//$('#Amountdepositdivexporttoexcel, #AmountdepositExportToExcel').on('click', function () {
$('#AmountdepositExportToExcel').on('click', function () {

    var formattedDate = DateFormat();

    var startDate = $('#Startdatetxt').val();
    var endDate = $('#Enddatetxt').val();

    var headerContent = `
            <div style="display: grid; grid-template-columns: repeat(18, 1fr);">
                <div style="grid-column: 1 / span 18;">
                     <h5 style="margin: 0; text-align: center;">Fee Amount Deposit </h5>
                     <h5 style="margin: 0; text-align: center;">Report On:${formattedDate}</h5>
                     <h5 style="margin: 0; text-align: center;">Start Date: ${startDate.replace('/', '-')}</h5>
                     <h5 style="margin: 0; text-align: center;">End Date: ${endDate.replace('/', '-')}</h5>
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