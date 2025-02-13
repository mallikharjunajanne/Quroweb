function CallToAjax(method, url,data, successCallback, errorCallback) {
    try {
        $.ajax({
            url: url,
            type: method,
            data:data,
            success: bindDatatable,
            error: function (xhr, status, error) {
                throw new Error(`Error: ${xhr.status}, ${error}`);
            }
        });
    } catch (err) {
        handleError(err.message);  // Call the error handler function
    }
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

$(document).ready(function () {
    debugger;
    try {
        CommonDropdownAjaxFunction("ddlNoticeTypeSearch", "Get", "/Admin/_bindcategoryddl", null, function (resp) {
            loaddingimg.css('display', 'none');
        }, true);

        //$('#ddlNoticeTypeSearch').empty();
        bindNoticesTable();
    } catch (err) {
        handleError(err.message);  // Call the error handler function
    }
});

// Handle the form submit
$('#SMNForm').submit(function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    $('#validationErrorMessage').text(" ");
    $('#validationErrorMessage1').text(" ");
    debugger;

    // Collect form data
    var noticeType = $('#ddlNoticeTypeSearch').val();
    var noticeSubject = $('#txtNoticeSubjectSearch').val();
    var startDate = $('#txtStartDateSearch').val();
    var expiryDate = $('#txtExpiryDateSearch').val();
    var isSMSTemplate = $('#chkSMSTemplate').is(':checked') ? 1 : 0;

    // Prepare data object for the AJAX request
    var data = {
        Enoticeid: noticeType,
        Subject: noticeSubject,
        Startdate: startDate,
        Expirydate: expiryDate,
        IsSMSTemplate: isSMSTemplate
    };

    // AJAX request to the server-side action method
    debugger;
    try {
        CallToAjax('GET', '/Admin/_bindManagenoticetbl', data, function (response) {
            // Handle successful response
        }, function (status, error) {
            console.error(`Error: ${status}, ${error}`);
            handleError(error.message);  // Call the error handler function
        });
    }
    catch (err) {
        handleError(err.message);  // Call the error handler function
    }
});

// Home Search Notices Dropdown use this method
function bindNoticesTable() {
    debugger;
    try {
        CallToAjax('GET', '/Admin/_bindManagenoticetbl',null, function (response) {
            // Handle successful response
        }, function (status, error) {
            console.error(`Error: ${status}, ${error}`);
            handleError(error.message);  // Call the error handler function
        });
    } catch (err) {
        handleError(err.message);  // Call the error handler function
    }
}

// This method binds the data (e.g., notices) to the DataTable when a search is performed
function bindDatatable(response) {

    //var formattedDate = GetDateFormat();
    debugger;
    loaddingimg.css('display', 'block');
    var table = $('#SearchResultstbl').DataTable();
    table.destroy();
    $("#searchResultsCount").text(response.length);
    debugger;
    var newTable = $("#SearchResultstbl").DataTable({
        dom: '<"tops"lf>t<"bottom"ip>',
        buttons: [],
        bProcessing: false,       
        bLengthChange: false,        
        pageLength: 20,
        bfilter: true,       // Disable the global search filter        
        bSort: false,          // Enable sorting        
        searching: false,     // Disable the individual column search
        scrollX: true,        // Enable horizontal scrolling
        scrollY: '400px',     // Set vertical scroll height
        scrollCollapse: true, // Allow scroll to collapse if there is less data
        paging: true,         // Enable pagination        
        bPaginate: false,      // Enable pagination
        data: response,
        columns: [
            //{
            //    data: "SNO",
            //    visible: false,
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
                data: "Subject",
                render: function (data, type, row, meta) {
                    return row.subject
                }
            },
            {
                data: "ExpiryDate",
                render: function (data, type, row, meta) {
                    return row.expirydate + '<input type="text" value=' + row.enoticeid + ' hidden/>'
                }
            },
            {
                data: "IsPosted",
                render: function (data, type, row, meta) {
                    if (row.isPosted == 'False') {
                        return 'Not Posted'
                    } else {
                        return 'Posted'
                    }
                }
            },
            {
                data: "ENoticeId",
                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                }
            }
        ]
    });

    loaddingimg.css('display', 'none');
    table.on('draw', function () {
        $('#SearchResultstbl').find('td:nth-child(2)').attr('title', 'Edit').css({
            'text-decoration': 'underline',
            'font-weight': 'bold',
            'color': 'blue',
            'cursor': 'pointer'
        });
    });
    $('#SearchResultstbl').find('td:nth-child(2)').attr('title', 'Edit').css({
        'text-decoration': 'underline',
        'font-weight': 'bold',
        'color': 'blue',
        'cursor': 'pointer'
    });
}

//HOME NOTICE TABLE Export To Excel
$('#lnkexporttoexcel').click(function () {
    debugger;
    var ENoticeTypeId = $('#ddlNoticeTypeSearch').val();
    var Subject = $('#txtNoticeSubjectSearch').val();
    var StartDate = $('#txtStartDateSearch').val();
    var EndDate = $('#txtExpiryDateSearch').val();
    var IsSMSTemplate = $("#chkSMSTemplate").prop("checked") ? 1 : 0
    var sendData = {
        'Subject': Subject,
        'StartDate': StartDate,
        'ExpiryDate': EndDate,
        'ENoticeTypeId': ENoticeTypeId,
        'IsSMSTemplate': IsSMSTemplate
    };
    DataCallToAjax('GET', '/Admin/_ManagenoticetblExporttoexcel', sendData, function (response) {
        debugger;
        // Create a table element with headings
        var htmlContent = `
        <table style="border: 1px solid">
            <thead>
                <tr>
                   <th style="border: 1px solid" colspan="5">MANAGE NOTICES </th>
                </tr>
                <tr>
                    <th style="border: 1px solid">Notice Subject</th>
                    <th style="border: 1px solid">End Date(Expiry Date)</th>
                    <th style="border: 1px solid">Posted</th>
                    <th style="border: 1px solid">Repeat SMS to parents</th>
                    <th style="border: 1px solid">Delete</th>
                </tr>
            </thead>
            <tbody>    `;

        // Extract data from the response and populate the table rows
        response.forEach(function (rowData) {
            // Assuming rowData contains the necessary data for each row
            htmlContent += '<tr>';
            htmlContent += `<td style="border: 1px solid">${rowData.subject}</td>`; // Populate 1st cell
            htmlContent += `<td style="border: 1px solid">${rowData.expiryDate}</td>`; // Populate 2nd cell
            htmlContent += `<td style="border: 1px solid">${rowData.isPosted}</td>`; // Populate 3rd cell
            htmlContent += `<td style="border: 1px solid"> </td>`; // Populate 4th cell (subject)
            htmlContent += `<td style="border: 1px solid"> </td>`; // Populate 4th cell (subject)
            htmlContent += '</tr>';
        });

        // Close the table body and table element
        htmlContent += `
            </tbody>
        </table>
    `;

        // Create Blob with HTML content
        const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });

        // Trigger file download
        saveAs(blob, 'ManageNotices.xls');
    },
        function (status, error) {
            // Handle errors
        }
    );
});

// Event handler for trash icon click in the "Manage Notice" table
$(document).on('click', '#SearchResultstbl .fa-trash-o', function (event) {
    $('#validationErrorMessage').text(" ");
    $('#validationErrorMessage1').text(" ");
    event.stopImmediatePropagation();  // Prevents the event from propagating up the DOM

    // Confirm with the user before deleting
    if (confirm("Are you sure you want to delete this notice?\nClick 'OK' to delete, or 'Cancel' to stop.")) {
        const $row = $(this).closest('tr');  // Get the closest table row
        const ENoticeId = $row.find('input[type="text"]').val();  // Get the ENoticeId from the input field
        loaddingimg.css('display', 'block');  // Show loading indicator
        const data = { ENoticeId: ENoticeId };  // Prepare the data for the API call

        // Make the AJAX call to delete the notice
        DataCallToAjax('GET', '/Admin/_DeleteNotice', data,
            function (response) {
                loaddingimg.css('display', 'none');  // Hide loading indicator first
                if (response == '1216') {
                    // Call the error handler function and display an error message
                    handleError('Procedure something went wrong');
                }
                else {
                    // If successful, reload the table data and show success message
                    bindNoticesTable();
                    $('#validationErrorMessage1').text("Record deleted successfully.");
                }
            },
            function (status, error) {
                // Handle errors (if any)
                loaddingimg.css('display', 'none');  // Hide loading indicator
            }
        );
    }
});

// Optional: Clear the form fields when the Clear button is clicked
$('#btnClearSearch').on('click', function () {
    $('#SMNForm')[0].reset(); // Resets the form fields
    $('#validationErrorMessage').text(" "); // Clear any error messages
    $('#validationErrorMessage1').text(" "); // Clear any error messages
    bindNoticesTable();
});

function handleError(errorMessage) {
    debugger;
    console.error(errorMessage);
    window.location.href = '/ErrorPage';
}

// Common function to handle AJAX requests
function loadData(url, successCallback) {
    
    loaddingimg.css('display', 'block');
    $('#validationErrorMessage, #validationErrorMessage1').text('');

    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            successCallback(data); // Execute the success callback with the returned data
            loaddingimg.css('display', 'none');
        },
        error: function (error) {
            console.log('Error:', error);
            loaddingimg.css('display', 'none');
        }
    });
}

// =========>>> CREATE NOTICE BUTTON CLICK <<<<=========
$('#Addnotice').click(function () {
    loadData("/Admin/_Createnotice", function (data) {
        debugger;
        $('#divSearchResults').hide();
        $("#create-notice-container").html(data);
        $('#create-sms-container, #create-notice-and-sms-container, #post-notice-email-sms-container, #save-and-post-notice-container').empty();
    });
});

// =========>>> CREATE SMS BUTTON CLICK <<<<=========
$('#AddnewSMS').click(function () {
    loadData("/Admin/_Createsms", function (data) {
        debugger;
        $('#divSearchResults').hide();
        $('#create-sms-container').html(data);
        $('#create-notice-container, #create-notice-and-sms-container, #post-notice-email-sms-container, #save-and-post-notice-container').empty();
    });
});

// =========>>> CREATE SMS AND NOTICE BUTTON CLICK <<<<=========
$('#AddnewSMSNNotices').click(function () {
    loadData("/Admin/_Createnoticesms", function (data) {
        debugger;
        $('#divSearchResults').hide();
        $('#create-sms-container, #create-sms-container, #post-notice-email-sms-container, #save-and-post-notice-container').empty();
        $("#create-notice-and-sms-container").html(data);
    });
});
