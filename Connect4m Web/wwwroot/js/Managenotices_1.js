
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
    $('#Commonerrormessage').text('');
    CommonDropdownAjaxFunction("Enoticetypeddl", "GET", "/Admin/BindCategoryddl", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);

    Tabledatabindingfunction();
});


function Createnotice() {
    $('#Commonerrormessage').text('');
    $('#Noticesadding_Firstdiv').empty();
    $('#Noticesadding_Seconddiv').empty();
    $('#Noticesadding_Thirddiv').empty();
    loaddingimg.css('display', 'block');
    DataCallToAjax('GET', '/Admin/Createnotice', null,
        function (response) {
            $('#Searchnotices_Maindiv').hide();
            $('#Noticesadding_Firstdiv').append(response);
            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        });
}
function Createsms() {
    $('#Commonerrormessage').text('');
    $('#Noticesadding_Firstdiv').empty();
    $('#Noticesadding_Seconddiv').empty();
    $('#Noticesadding_Thirddiv').empty();
    loaddingimg.css('display', 'block');
    DataCallToAjax('GET', '/Admin/Createsms', null,
        function (response) {
            $('#Searchnotices_Maindiv').hide();
            $('#Noticesadding_Firstdiv').append(response);
            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        });
}
function Createnoticesms() {
    $('#Commonerrormessage').text('');
    $('#Noticesadding_Firstdiv').empty();
    $('#Noticesadding_Seconddiv').empty();
    $('#Noticesadding_Thirddiv').empty();
    loaddingimg.css('display', 'block');
    DataCallToAjax('GET', '/Admin/Createnoticeandsms', null,
        function (response) {
            $('#Searchnotices_Maindiv').hide();
            $('#Noticesadding_Firstdiv').append(response);
            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        });
}

function formateDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

$('#Searchbtn').click(function () {
    $('#Dateerrormessage').text('');
    $('#ErrorMessage').text('');
    var startDate = $("#Startdatetxt").val();
    var endDate = $("#Enddatetxt").val();
    if (startDate != '' && endDate!="") {

    
    var formattedStartDate = formateDate(startDate);
    var formattedEndDate = formateDate(endDate);
    if (formattedEndDate <= formattedStartDate) {
        $('#Dateerrormessage').text("Start date cannot be greater than end date.");
        event.preventDefault(); // Prevent form submission
        formattedStartDate = undefined;
        formattedEndDate = undefined;
        return false;
        }
    }
    $('#Dateerrormessage').text("");
    Tabledatabindingfunction();
});

function Tabledatabindingfunction() {
    loaddingimg.css('display', 'block');
    $('#Dateerrormessage').text('');
    var searchData = {
        Enoticeid: $("#Enoticetypeddl").val(),
        Subject: $("#Subjecttxt").val(),
        Startdate: $("#Startdatetxt").val(),
        Expirydate: $("#Enddatetxt").val(),
        IsSMSTemplate: $("#IsSMSTemplate").prop("checked") ? 1 : 0
    };
    $.ajax({
        url: "/Admin/BindManagenoticetbl",
        data: searchData,
        type: "GET",
        success: function (response) {
            debugger;
            loaddingimg.css('display', 'none');
            bindDatatable(response);
        },
        error: function (status, error) {
            loaddingimg.css('display', 'none');
        }
    });
}

function bindDatatable(response) {
    loaddingimg.css('display', 'block');
    debugger;
    var table = $('#Noticestbl').DataTable();
    table.destroy();
    $("#Recordscountspid").text(response.length);
    debugger;
    var newTable = $("#Noticestbl").DataTable({
        dom: '<"top"lf>t<"bottom"ip>',
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
                data: "Subject",
                render: function (data, type, row, meta) {
                    //return row.subject
                    return '<a href="javascript:void(0)" data-subject-id="' + row.enoticeid + '" onclick="handleClick(event, ' + row.enoticeid + ')" style="text-decoration: underline;font-weight:bold;">' + row.subject + '</a>';
                }
            },
            {
                data: "Expirydate",
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
            }, {
                data: "ENoticeId",
                render: function (data, type, row, meta) {
                   return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                    // return row.holidayId + '<input type="text" value=' + row.holidayId + ' hidden/>'
                }
            }
        ]
    });

    //table.on('draw', function () {
    //    $('#Noticestbl').find('td:nth-child(2)').attr('title', 'Edit').css({
    //        'text-decoration': 'underline',
    //        'font-weight': 'bold',
    //        'color': 'black'
    //    });
    //});
    //$('#Noticestbl').find('td:nth-child(2)').attr('title', 'Edit').css({
    //    'text-decoration': 'underline',
    //    'font-weight': 'bold',
    //    'color': 'black'
    //});
    loaddingimg.css('display', 'none');
}

$('#lnkexporttoexcel').click(function () {
    debugger;

    var searchData = {
        Enoticeid: $("#Enoticetypeddl").val(),
        Subject: $("#Subjecttxt").val(),
        Startdate: $("#Startdatetxt").val(),
        Expirydate: $("#Enddatetxt").val(),
        IsSMSTemplate: $("#IsSMSTemplate").prop("checked") ? 1 : 0
    };

    DataCallToAjax('GET', '/Admin/ManagenoticetblExporttoexcel', searchData, function (response) {
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
            <tbody>`;

        // Extract data from the response and populate the table rows
        response.forEach(function (rowData) {
            // Assuming rowData contains the necessary data for each row
            htmlContent += '<tr>';
            htmlContent += `<td style="border: 1px solid">${rowData.subject}</td>`; // Populate 1st cell
            htmlContent += `<td style="border: 1px solid">${rowData.ExpiryDate}</td>`; // Populate 2nd cell
            htmlContent += `<td style="border: 1px solid">${rowData.isPosted === 'False' ? 'Not Posted' : 'Posted'}</td>`; // Populate 3rd cell
            htmlContent += `<td style="border: 1px solid">${rowData.repeatSMStoparents}</td>`; // Populate 4th cell (subject)
            htmlContent += `<td style="border: 1px solid"> </td>`; // Populate 5th cell (subject)
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

$(document).on('click', '#Noticestbl .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var confirmed = confirm("Are you sure you want to delete Notice?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        debugger;
        var ENoticeId = $(this).closest('tr').find('input[type="text"]').val();
        //var table = $('#ManageNoticetbl').DataTable();
        //var tabletargetpagetblSEMsearchresults = table.page.info().page;

        loaddingimg.css('display', 'block');
        var data = { ENoticeId: ENoticeId };
        DataCallToAjax('GET', '/Admin/Deletenotice', data,
            function (response) {
                Tabledatabindingfunction();
                $('#ErrorMessage').text("Record deleted successfully.");
                loaddingimg.css('display', 'none');
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );
    }
});

function handleClick(event, Enoticeid) {
    try {
        $('#Commonerrormessage').text('');
        loaddingimg.css('display', 'block');
        var data = { ENoticeId: Enoticeid };
        DataCallToAjax('GET', '/Admin/Editnotice', data,
            function (response) {
                debugger;
                if (response != "1") {
                    $('#Searchnotices_Maindiv').hide();
                    $('#Noticesadding_Firstdiv').append(response);
                }
                else {
                    $('#Searchnotices_Maindiv').show();
                    $('#Commonerrormessage').text('Something went wrong please try again...!');
                }
                loaddingimg.css('display', 'none');
            },
            function (status, error) {
                // Handle errors here
                $('#Home_SearchNoticesdiv').show();
                $('#Home_SearchNotices_Updatediv').hide();
                loaddingimg.css('display', 'none');
            }
        );

    }
    catch (e) {
        loaddingimg.css('display', 'none');
    }
}

function CharCount() {
    debugger;
    var textarea = document.getElementById("Subjecttxtid");
    var charCount = document.getElementById("charCounts");
    var Characterslength = document.getElementById("Characterslengths");
    var remaining = 1000 - textarea.value.length;
    charCount.textContent = remaining + " Character(s) remaining.";
    Characterslength.textContent = "Typed Characters: " + textarea.value.length;
}

function Charactercount() {
    debugger;
    var textarea = document.getElementById("Enoticedescriptiontxt");
    var charCount = document.getElementById("DescriptionCharacters");
    var charCountlength = document.getElementById("Characterlengths");
    var remaining = 6500 - textarea.value.length;
    charCount.textContent = remaining + " Character(s) remaining. ";
    charCountlength.textContent = "Typed Characters: " + textarea.value.length;
}

function preventSpecialCharacters(event) {
    /*debugger;*/
    var key = event.key;
    // Check if the pressed key is a single quote or a double quote
    if (key === "'" || key === '"') {
        // Prevent the default action of the key press (typing the character)
        event.preventDefault();
        // Optionally, you can display a message to the user informing them that these characters are not allowed
        //alert("Single quotes (') and double quotes (\") are not allowed.");
        return false;
    }
    return true;
}





