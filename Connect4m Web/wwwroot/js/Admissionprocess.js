function handleAjax(method, url, data, successCallback, errorCallback) {   
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        //contentType: false,
        //processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };
    $.ajax(ajaxOptions);
}

function TblCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: Bindtable,
        //success: function (response) {
        //    successCallback(response);
        //},
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

// Define a global variable to hold the DataTable instance
var dataTableInstance;

$(document).ready(function () {
    //debugger;

    CommonDropdownAjaxFunction("ddlAcademicYearId", "GET", "/Admin/GetAcademicYearDropdown", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);

    initializeDataTable();
    TabledatabindingPageload();
    $('#parentEmailtxt').on('blur', function () {
        validateEmail(this);
    });
});

$('#AdmissionsSearchform').submit(function () {
    //var Formdata = $('#AdmissionsSearchform').serialize();
    //debugger;
    TabledatabindingPageload();
});

function TabledatabindingPageload() {

    var Formdata = $('#AdmissionsSearchform').serialize();
    debugger;
    TblCallToAjax('GET', "/Admin/QuroAdmissionProcesstbl", Formdata,        
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
}

//===>>>>> CLEAR FUNCTION
function Searchclearfun(formid) {
    var form = document.getElementById(formid);
    debugger;
    if (form) {
        // Use the reset method to clear the form
        form.reset();

        // Clear ASP.NET Core validation messages
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });
        TabledatabindingPageload(); //===>>>  Table calling function
        
    } else {
        console.error("Form with id '" + formid + "' not found.");
    }
}

//===>>>>> Dates compare
function DatesCompare(Sdate, Edate) {
    try {
        //debugger;
        var StartdateInput = $("#Fromregistrationdate_txt").val();
        var EnddateInput = $("#Toregistrationdate_txt").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var errorElement = $('#CommonErrorMessage');

        // Clear previous error message
        errorElement.text("");

        if (Enddate <= Startdate) {
            errorElement.text(Sdate + " Should not be greater than " + Edate + ".");
        }
    }
    catch (error) {
        console.log(error);
    }
}

// Dates input change Event
$("#Fromregistrationdate_txt").on("change", function () { DatesCompare("From date", "To date"); });
$("#Toregistrationdate_txt").on("change", function () { DatesCompare("From date", "To date"); });

$("#ddlAcademicYearId").change(function () {
    //debugger;
    // Get the selected value of the dropdown
    var selectedValue = $(this).val();
    if (selectedValue) {
        ClassDropdownfun();
    } else {
        $('#ddlClass').empty();
    }
});

function ClassDropdownfun() {
    CommonDropdownAjaxFunction("ddlClass", "GET", "/Admin/GetAllClass", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

function CountryDropdown() {
    CommonDropdownAjaxFunction("ddlCountry", "GET", "/Admin/GetAllcountrys", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

function NewAdmissionsclass() {
    CommonDropdownAjaxFunction("ddlAdminssionForClass", "GET", "/Admin/GetAllClass", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

$('#ddlCountry').change(function () {
    //debugger;
    var selectedValue = $(this).val();
    if (selectedValue) {
        ddlCountry_SelectedChanged(selectedValue);
    } else {
        $('#ddlState').empty();
    }
});

function ddlCountry_SelectedChanged(Countryid) {
    CommonDropdownAjaxFunction("ddlState", "GET", "/Admin/GetStatesddl?CountryId=" + Countryid, null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

// TABLE DATA BINDING FUNCTION
function Bindtable_(response) {      

    ClassDropdownfun();

    //debugger;
    var formattedDate = Dateformate();

    $("#Recordscount").text(response.length);
    var Selectedyear = $('#ddlAcademicYearId').val();

    var table = $('#Admissionstbl').DataTable();
    table.destroy();

    var newTable = $("#Admissionstbl").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {              
                extend: 'excel',
                text: 'Export To Excel',
                title: 'Manage Admissions',
                messageTop: 'Quro Schools',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // Adjust column indexes based on your DataTable
                },
                customize: function (xlsx) {
                    const sheet = xlsx.xl.worksheets['sheet1.xml'];

                    if (sheet && sheet.sheetData && sheet.sheetData[0]) {
                        //debugger;
                        // Set styles for the title (A1 cell)
                        const titleCell = $('c[r="A1"]', sheet);
                        if (titleCell && titleCell[0]) {
                            titleCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Manage Admissions</div></v:textbox>';
                        }

                        // Set styles for the messageTop (A2 cell)
                        const messageTopCell = $('c[r="A2"]', sheet);
                        if (messageTopCell && messageTopCell[0]) {
                            messageTopCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Quro Schools</div></v:textbox>';
                        }

                        const DateCell = $('c[r="A3"]', sheet);
                        if (DateCell && DateCell[0]) {
                            DateCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">For the Session :' + Selectedyear + '</div></v:textbox>';
                        }

                        const range = sheet.sheetData[0].attributes['!ref'].value;
                        const dataRows = range.split(':')[1].split('')[1]; // Get the range of data rows

                        for (let col = 0; col < 11; col++) { // Assuming 11 columns (0 to 10), adjust as needed
                            const colLetter = String.fromCharCode(65 + col); // Convert column index to Excel column letter
                            for (let row = 2; row <= dataRows; row++) { // Start from row 2 (excluding header)
                                const cellRef = colLetter + row;
                                const cell = $('c[r="' + cellRef + '"]', sheet);
                                if (cell && cell[0]) {
                                    // Add black border to data cells
                                    cell[0].innerHTML = '<style>td{border: 1px solid black; background-color: white;}</style>' + cell[0].innerHTML;
                                }
                            }
                        }
                    }
                    else {
                        console.error('Sheet or range not found.'); // Log an error if the sheet or range is not found
                    }
                }
            }
        ],
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
                data: "Registrationdate",
                render: function (data, type, row, meta) {                  
                    //return row.registrationDate.split(' ').Replace("-", "/")[0];
                    return row.registrationDate.split(' ')[0].replace(/-/g, '/');
                }
            },
            {
                data: "InstanceUserCode",
                render: function (data, type, row, meta) {
                    return row.instanceUserCode + '<input type="text" value=' + row.registrationUserId + ' hidden/>'
                }
            },
            {
                data: "StudentName",
                render: function (data, type, row, meta) {
                    return row.studentName
                }
            },
            {
                data: "DOB",
                render: function (data, type, row, meta) {
                    var dob = new Date(row.dob);
                    var year = dob.getFullYear();
                    var month = String(dob.getMonth() + 1).padStart(2, '0');
                    var day = String(dob.getDate()).padStart(2, '0');
                    return `${day}/${month}/${year}`;

                    //return row.dob.split(' ')[0].replace(/-/g, '/');
                }
            },
            {
                data: "ClassAppliedFor",
                render: function (data, type, row, meta) {
                    return row.classAppliedFor
                }
            },
            {
                data: "FatherName",
                render: function (data, type, row, meta) {
                    return row.fatherName
                }
            },
            {
                data: "MotherName",
                render: function (data, type, row, meta) {
                    return row.motherName
                }
            },
            {
                data: "MobileNumber",
                render: function (data, type, row, meta) {
                    return row.mobileNumber
                }
            },
            {
                data: "EmailId",
                render: function (data, type, row, meta) {
                    return row.emailId
                    //return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                }
            }          
        ]
    });

    table.on('draw', function () {
        $('#Admissionssummaryreporttbl').find('td:nth-child(4)').attr('title', 'Edit').attr('title', 'Edit').css({
            color: 'black',
            'text-decoration': 'underline',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
    });
    $('#Admissionssummaryreporttbl').find('td:nth-child(4)').attr('title', 'Edit').attr('title', 'Edit').css({
        color: 'black',
        'text-decoration': 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
}

function Bindtable(response) {
    debugger;
    ClassDropdownfun();
    var Selectedyear = $('#ddlAcademicYearId').val();
    $("#Recordscount").text(response.length);
    // Destroy and recreate DataTable with new settings
    var table = $('#Admissionstbl').DataTable();
    table.clear().destroy();

    var newTable = $("#Admissionstbl").DataTable({       
        dom: '<"tops"lf>t<"bottom"ip>',
        buttons: [],
        //dom: 'Bfrtip',
        ////columns: ['Registrationdate', 'InstanceUserCode', 'StudentName', 'DOB', 'ClassAppliedFor', 'FatherName', 'MotherName', 'MobileNumber', 'EmailId']
        //buttons: [
        //    {
        //        extend: 'excelHtml5',
        //        text: "Export to Excel",
        //        title: 'Manage Admissions',        // Title of the exported Excel sheet
        //        messageTop: 'Quro Schools',       // Message to be displayed at the top of the sheet
        //        exportOptions: {
        //            // Export columns based on the column data definitions
        //            columns: [
        //                1, // Registrationdate (index 1)
        //                2, // InstanceUserCode (index 2)
        //                3, // StudentName (index 3)
        //                4, // DOB (index 4)
        //                5, // ClassAppliedFor (index 5)
        //                6, // FatherName (index 6)
        //                7, // MotherName (index 7)
        //                8, // MobileNumber (index 8)
        //                9  // EmailId (index 9)
        //            ]
        //        },                
        //        customize: function (xlsx) {
        //            var sheet = xlsx.xl.worksheets['sheet1.xml'];
        //            debugger;
        //            var styleSheet = xlsx.xl.stylesheet;

        //            // Define a custom border style (style index 25)
        //            var borderStyle = `<border> <left/><right/><top/><bottom/> </border>  <alignment horizontal="center" vertical="center"/>`;

        //            // Add the style definition to the stylesheet (to style index 25)
        //            $(styleSheet).append(borderStyle);


        //            // Loop through each row and apply styles to each cell
        //            $('row', sheet).each(function () {
        //                $(this).find('c').each(function () {
        //                    var cell = $(this);
        //                    // Apply border style (s=25) to all cells, even if the cell is empty
        //                    cell.attr('s', '25'); // Applying border style to the cell

        //                    // If the cell is empty, ensure it still gets a value (empty string)
        //                    //if (!cell.text()) {
        //                    //    cell.text(''); // Set empty cells explicitly
        //                    //}
        //                });
        //            });

        //            // Optional: center-align title (A1)
        //            $('c[r="A1"]', sheet).attr('s', '2');  // Center-align title (A1)
        //        }
        //    }
        //],
        bProcessing: false,
        bLengthChange: false,
        pageLength: 20,
        bfilter: true,
        bSort: true,
        searching: false,
        scrollX: true,
        scrollY: '400px',
        scrollCollapse: true,
        paging: false,
        bPaginate: false,
        data: response,
        columns: [
            {
                targets: 0,
                render: (data, type, row, meta) => meta.row + 1  // Render row number based on page
            },
            {
                data: "Registrationdate",
                //render: (data) => data ? data.split(' ')[0].replace(/-/g, '/') : ''  // Safely format date
                render: (data, type, row) => row.registrationDate.split(' ')[0].replace(/-/g, '/')
                //return row.registrationDate.split(' ')[0].replace(/-/g, '/');
            },
            {
                data: "InstanceUserCode",
                render: (data, type, row) => row.instanceUserCode + `<input type="text" value="${row.registrationUserId}" hidden/>`  // Use 'row' to access full row data
            },
            {
                data: "StudentName",
                render: (data, type, row) => row.studentName
                //render: (data) => data || ''  // Fallback if data is undefined
            },
            {
                data: "DOB",
                render: (data, type, row) => {
                    // Check if the data (DOB) exists before formatting
                    if (row.dob) {
                        var dob = new Date(row.dob); // Parse the data as a Date object
                        var year = dob.getFullYear(); // Extract the year
                        var month = String(dob.getMonth() + 1).padStart(2, '0'); // Get month and ensure two digits
                        var day = String(dob.getDate()).padStart(2, '0'); // Get day and ensure two digits
                        return `${day}/${month}/${year}`; // Return in DD/MM/YYYY format
                    } else {
                        return ''; // Return empty if no data is available
                    }
                }
            },
            {
                data: "ClassAppliedFor",
                render: (data, type, row) => row.classAppliedFor
                //render: (data) => data || ''  // Fallback if data is undefined
            },
            {
                data: "FatherName",
                render: (data, type, row) => row.fatherName
                //render: (data) => data || ''  // Fallback if data is undefined
            },
            {
                data: "MotherName",
                render: (data, type, row) => row.motherName
                //render: (data) => data || ''  // Fallback if data is undefined
            },
            {
                data: "MobileNumber",
                render: (data, type, row) => row.mobileNumber
                //render: (data) => data || ''  // Fallback if data is undefined
            },
            {
                data: "EmailId",
                render: (data, type, row) => row.emailId
                //render: (data) => data || ''  // Fallback if data is undefined
            }
        ]
    });

    // Apply styles to the Edit column after table is drawn
    table.on('draw', function () {
        $('#Admissionssummaryreporttbl').find('td:nth-child(4)').css({
            color: 'black', 'text-decoration': 'underline', cursor: 'pointer', fontWeight: 'bold'
        }).attr('title', 'Edit');
    });

    $('#Admissionssummaryreporttbl').find('td:nth-child(4)').css({
        color: 'black', 'text-decoration': 'underline', cursor: 'pointer', fontWeight: 'bold'
    }).attr('title', 'Edit');
}

///===>>> Email Pattern Isvalid or not function
function validateEmail(input) {
    //debugger;
    const email = input.value.trim();
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/i.test(email);
    const errorSpan = $('#emailError');

    if (!isValid) {
        errorSpan.text('Invalid email format.');
        errorSpan.css('display', 'inline'); // Show the error message
    } else {
        errorSpan.text(''); // Clear the error message
        errorSpan.css('display', 'none'); // Hide the error message
    }
}

function DateofbirtDateCompare() {
    try {
        //debugger;
        var StartdateInput = $("#txtDOB").val();
        var Startdate = new Date(StartdateInput);
       // var todaydate = new Date(); // Get the current date
        var startYear = Startdate.getFullYear();
        var startMonth = (Startdate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it's zero-based
        var startDay = Startdate.getDate().toString().padStart(2, '0');

        var formattedStartDate = startYear + '-' + startMonth + '-' + startDay;



        var todaydate = new Date();
        var year = todaydate.getFullYear();
        var month = (todaydate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it's zero-based
        var day = todaydate.getDate().toString().padStart(2, '0');

        var formattedDate = year + '-' + month + '-' + day;



        var errorElement = $('#CommonErrorMessage');

        errorElement.text("");

        if (formattedStartDate >= formattedDate) {
            errorElement.text("Date of Birth cannot be greater than Current Date.");
        }
    }
    catch (error) {
        console.log(error);
    }
}

// Attach the DatesCompare function to the change event of the Date of Birth input
$("#txtDOB").on("change", DateofbirtDateCompare);

///===>> Create New Application function start
function Newadmission() {
    loaddingimg.css('display', 'block');
    $('#ManageadmissionsContainerdiv1').empty();
    handleAjax('GET', "/Admin/QuroAdmissionProcess_New", null,
        function (resp) {
            loaddingimg.css('display', 'none');
            $('#SearchAdmissionsDiv').hide();
           
            $('#ManageadmissionsContainerdiv1').append(resp);
            $('#Savebtn').val('Submit');
            $('#Savebtn').text('Submit');
            initializeDataTable(); // Initialize DataTable after appending data
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
}

// Function to initialize DataTable
function initializeDataTable() {
   //debugger;
    dataTableInstance = $('#Admissionstbl').DataTable({
        // DataTable initialization options
        // Example: paging: true, searching: true, etc.
    });
}

///===>>>Back to search function start
$('#Backtosearchlnk').click(function (e) {
    //debugger;
    e.preventDefault(); 
    $('#ManageadmissionsContainerdiv1').empty();
    $('#SearchAdmissionsDiv').show();
    clearDataTable();
    TabledatabindingPageload();

    $('#CommonErrorMessage').text('');
    $('#emailError').text('');
});

// Function to clear DataTable and destroy the instance
function clearDataTable() {
    //debugger;
    if (dataTableInstance) {
        dataTableInstance.destroy();
        dataTableInstance = null;
    }
    $('#Admissionstbl').empty();
}

// UPDATE && INSERT FUNCTION
$('#NewAdmissionform_').submit(function (event) {
    //debugger;
    event.preventDefault();
    $('#CommonErrorMessage').text('');
    $('#emailError').text('');

    setTimeout(function () {

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            loaddingimg.css('display', 'block');
            //var formData = $('#NewAdmissionform').serialize();
            var formData = new FormData($('#NewAdmissionform')[0]);

            var Admissionforclass = $('#ddlAdminssionForClass option:selected').text();
            var CountrySelectedtext = $('#ddlCountry option:selected').text();
            var Stateselectedtext = $("#ddlState option:selected").text();
            var RegistrationUserId = $('#txtRegistrationUserId').val();

            var actionUrl = RegistrationUserId != "" ? "/Admin/QuroAdmissionProcessUpdate" : "/Admin/QuroAdmissionProcess_New";
            var additionalData = {
                AdmissionForClass: Admissionforclass,
                Country: CountrySelectedtext,
                State: Stateselectedtext,
                RegistrationUserId: RegistrationUserId
            };
            var ajaxOptions = {
                url: actionUrl,
                method: 'POST',
                data: new FormData($('#NewAdmissionform')[0]), // Create FormData object directly
                processData: false, // Prevent jQuery from processing the data
                contentType: false, // Prevent jQuery from setting contentType
                success: function (resp) {
                    debugger;
                    if (resp.methodName === "Insert") {
                        if (resp.returnValue === "-2") {

                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text("User already exists.");

                        } else if (resp.returnValue === "0") {
                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text("Data inserted Successfully.");
                        }
                    }
                    else if (resp.methodName === "Update") {
                        if (resp.returnValue > 0) {

                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text('Data Updated Successfully.');
                        }
                        else if (resp.returnValue =="1216") {
                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text('Something went wrong. Please try again.');
                        }
                        else {
                            loaddingimg.css('display', 'none');
                            $('#CommonErrorMessage').text('Something went wrong. Please try again.');
                        }
                    }
                },
                error: function (xhr, status, error) {
                    loaddingimg.css('display', 'none');
                }
            };

            // Append additional data to the FormData object
            var formData = ajaxOptions.data;
            for (var key in additionalData) {
                formData.append(key, additionalData[key]);
            }

            // Make the AJAX request
            $.ajax(ajaxOptions);
        }
    }, 50);
});

///===>>> ADMISSIONS EDIT FUNCTION CODE START
$(document).on('click', '#Admissionstbl td:nth-child(4)', function (event) {
    try {
        loaddingimg.css('display', 'block');
        //debugger;
        event.stopImmediatePropagation();             

        var parent = $(event.target).closest('tr');
        var Registrationuserid = $(parent).find('td').find('input[type="text"]').val();
        var table = $('#Admissionstbl').DataTable();
        //tabletargetpagetblSEMsearchresults = table.page.info().page;
        var data = { RegistrationUserId: parseInt(Registrationuserid) };

        handleAjax('GET', "/Admin/QuroAdmissionProcess_New?RegistrationUserId=" + Registrationuserid, null,
            function (resp) {
                loaddingimg.css('display', 'none');
                $('#SearchAdmissionsDiv').hide();
                //debugger;
                $('#ManageadmissionsContainerdiv1').append(resp);
                $('#Savebtn').val('Update');
                $('#Savebtn').text('Update');
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );
       
    }
    catch (e) {

    }
})

function Dateformate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}


// When the "Export to Excel" link is clicked, initiate the export process for the data
$('#_lnkExportExcel').on('click', function () {

    debugger;
    // Get selected academic year
    var selectedText = $('#ddlAcademicYearId option:selected').text();
    if (selectedText === "-------select-------" || selectedText === "") {
        selectedText = "";
    } else {
        selectedText = `For the Session : ${selectedText}`;
    }

    // Get today's date
    var today = new Date();

    // Array of month names
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Get day, month, and year
    var day = today.getDate();
    var month = months[today.getMonth()]; // Get the month as a string
    var year = today.getFullYear();

    // Format the date in dd MMM yyyy format
    var formattedDate = `${day < 10 ? '0' + day : day} ${month} ${year}`;

    // Header Content (to include title and session year)
    var headerContent = `
    <div style="text-align: center; margin-bottom: 20px;">
        <h4 style="margin: 0;">Manage Admissions</h4>
        <h4 style="margin: 0;">Quro Schools</h4>
        <h4 style="margin: 0;">${selectedText}</h4>
        <h4 style="margin: 0;">Report Taken On : ${formattedDate}</h4>
    </div>`;

    // Clone the original table
    var table1 = document.getElementById("Admissionstbl");
    var table1Clone = table1.cloneNode(true); // Clone the table

    // Apply table styles (borders and cell widths)
    table1Clone.style.borderCollapse = "collapse";  // Collapse borders between cells

    // Remove all <input type="text"> elements to prevent them from being exported
    var inputs = table1Clone.getElementsByTagName("input");
    while (inputs.length > 0) {
        inputs[0].parentNode.removeChild(inputs[0]);
    }

    // Apply border and width to all table cells
    var cells = table1Clone.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.border = "1px solid black";  // Add border to each cell
        cells[i].style.padding = "2px";            // Add padding for better readability
        cells[i].style.height = "20px";
        cells[i].style.textAlign = "center";
    }

    // Apply styles to table headers (th)
    var headers = table1Clone.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].style.height = "20px";               // Set header row height
        headers[i].style.textAlign = "center";         // Center-align text in header
        headers[i].style.padding = "2px";             // Add padding for readability
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
    saveAs(excelBlob, 'ManageAdmissions.xls'); // Trigger file download
});