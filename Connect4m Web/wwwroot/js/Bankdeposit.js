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
    }
    else {
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
    //debugger;
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
        //debugger;
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
    //debugger;
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
    //debugger;
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
            //debugger;
            var fileInput = document.getElementById('AttachedDocument');
            var file;
            if (fileInput.files.length > 0) {
                //debugger;
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
                    //debugger;
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
                //debugger;
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
    debugger;
    $("#Recordscount").text(response.length);

    // Clear the existing content of the table
    $('#Bankdeposittbldivid').empty();
    $('#Bankdeposittblid').empty();

    // Create the table element
    var table = document.createElement('table');
    table.id = 'Bankdeposittblid';
    table.classList.add('table','table-bordered','no-footer','dataTable');
    //table.style.borderCollapse = 'collapse';
    //table.style.border = '1px solid black';

    // Create thead and append it to the table
    var thead = document.createElement('thead');
    thead.classList.add('table-dark');
    var trHead = document.createElement('tr');
    ['Deposit ID', 'School Name', 'Deposit Amount', 'Bank Name', 'Branch Name', 'Account Number', 'Payment Mode', 'Deposit Date', 'Created Date'].forEach(function (headingText) {
        var th = document.createElement('th');
        th.textContent = headingText;
        //th.style.border = '1px solid black';
        //th.style.borderCollapse = 'collapse';
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

        //var firstCell_ = document.createElement('td');
        //var anchor = document.createElement('a');
        //anchor.textContent = row['feeDepositId'];
        //anchor.setAttribute('href', 'javascript:void(0)');
        //anchor.setAttribute('data-fee-deposit-id', row['feeDepositId']);
        //anchor.style.color = '#2C2C2C';
        //anchor.style.fontSize = '14px';
        //anchor.style.fontWeight = 'bold';
        ////firstCell_.style.border = '1px solid black';
        ////firstCell_.style.borderCollapse = 'collapse';
        //firstCell_.appendChild(anchor);
        //tr.appendChild(firstCell_);


        var firstCell_ = document.createElement('td');  // Create a new table cell
        var anchor = document.createElement('a');  // Create an anchor tag
        anchor.setAttribute('href', 'javascript:void(0)');  // Set the href attribute
        anchor.setAttribute('data-fee-deposit-id', row['feeDepositId']);  // Add custom attribute
        anchor.style.color = '#2C2C2C';  // Set anchor text color
        anchor.style.fontSize = '14px';  // Set font size
        anchor.style.fontWeight = 'bold';  // Set font weight
        // Create the span element
        var span = document.createElement('span');
        span.textContent = row['feeDepositId'];  // Set the text content of the span to feeDepositId

        // Append the span inside the anchor tag
        anchor.appendChild(span);

        // Append the anchor inside the table cell
        firstCell_.appendChild(anchor);

        // Append the table cell to the row
        tr.appendChild(firstCell_);




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
    //debugger;
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
    //debugger;
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

    debugger;
    var formattedDate = DateFormat();

    var startDate = $('#Startdatetxt').val();
    var endDate = $('#Enddatetxt').val();

    var headerContent = `
            <div style="display: grid; grid-template-columns: repeat(18, 1fr); background-color: #C2BEC0;">
                <div style="grid-column: 1 / span 18;">
                     <h5 style="margin: 0; text-align: center;">Fee Amount Deposit </h5>
                     <h5 style="margin: 0; text-align: center;">Report On:${formattedDate}</h5>
                     <h5 style="margin: 0; text-align: center;">Start Date: ${startDate.replace('/', '-')}</h5>
                     <h5 style="margin: 0; text-align: center;">End Date: ${endDate.replace('/', '-')}</h5>
                </div>
            </div>`;   

    // Clone the original table
    var table1 = document.getElementById("Bankdeposittblid");
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
    var deleteColumnIndex = -1;
    for (var i = 0; i < headerCells.length; i++) {
        if (headerCells[i].innerText.trim() === "Delete") {
            deleteColumnIndex = i;  // Get the index of the "Delete" column header
            headerCells[i].parentNode.deleteCell(i); // Remove the "Delete" column header
            break;  // Exit the loop after deleting the "Delete" column header
        }
    }

    // 2. Remove the "Delete" column from each row in the table body
    var rows = table1Clone.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        var cells_ = rows[i].getElementsByTagName("td");
        if (cells_.length > 0) {  // Skip the header row
            if (deleteColumnIndex !== -1 && cells_.length > deleteColumnIndex) {
                rows[i].deleteCell(deleteColumnIndex); // Remove the "Delete" column from the row
            }
        }
    }

    // Process the account number column to ensure it's treated as text
    for (var i = 0; i < rows.length; i++) {
        var cells1 = rows[i].getElementsByTagName("td");
        if (cells1.length > 0) {          

            // Let's assume the account number is in the 1st column (index 0) or change as needed
            var accountCell = cells1[5];  // Example, change index if needed
            var accountNumber = accountCell.textContent.trim();
            accountCell.textContent = "'" + accountNumber;  // Prepend single quote to ensure it's treated as text
        }
    }


    // Apply border and width to all table cells
    var _cells = table1Clone.getElementsByTagName("td");
    for (var i = 0; i < _cells.length; i++) {
        _cells[i].style.border = "1px solid black";  // Add border to each cell
        _cells[i].style.padding = "3px";            // Add padding for better readability
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
    saveAs(excelBlob, 'FeeAmountDepositReport.xls'); // Trigger file download
});