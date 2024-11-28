function TblCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: bindDatatables,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function handleAjax(method, url, data, successCallback, errorCallback) {
    //debugger;
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

$(document).ready(function () {
    $('#RegisterAdmissiontbldiv').hide();
    //debugger;
    BindInstanceDropdown();
    BindAcadamiceyeardropdown();
    BindClassdropdown();
    //Pageloadtbldata();
});

//#region MAIN TABLE DATA CODE START
function Pageloadtbldata() { 
    var ddlAcadamicyear = $('#ddlAcadamicyear').val();
    var dataToSend = {"Acadamicyearid": ddlAcadamicyear };
    handleAjax('GET', "/Reports/Quroadmissionreportscounttbl", dataToSend,
        function (resp) {
            //debugger;
            loaddingimg.css('display', 'none');
            Bindsearchtbl(resp);           
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
}

function Bindsearchtbl(response) {

    //debugger;
    //var formattedDate = Dateformate();

    $("#Recordcountstbl").text(response.length);
    //var Selectedyear = $('#ddlAcademicYearId').val();

    var table = $('#Admissionscounttbl').DataTable();
    table.destroy();

    var selectedText = $('#ddlAcadamicyear option:selected').text();
    if (selectedText === "Select Academic Year" || selectedText === "") {
        selectedText = "";
    }

    var newTable = $("#Admissionscounttbl").DataTable({
        dom: '<"tops"lf>t<"bottom"ip>',
        buttons: [],

        //dom: 'Bfrtip',
        //buttons: [
        //    {
        //        extend: 'excel',
        //        text: 'Export To Excel',
        //        title: 'Admission Summary Report',
        //        messageTop: 'Quro Schools/For the Session : ',
        //        exportOptions: {
        //            columns: [0, 1, 2, 3] // Adjust column indexes based on your DataTable
        //        },
        //        customize: function (xlsx) {
        //            const sheet = xlsx.xl.worksheets['sheet1.xml'];

        //            if (sheet && sheet.sheetData && sheet.sheetData[0]) {
        //                //debugger;
        //                // Set styles for the title (A1 cell)
        //                const titleCell = $('c[r="A1"]', sheet);
        //                if (titleCell && titleCell[0]) {
        //                    titleCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Manage Admissions</div></v:textbox>';
        //                }

        //                // Set styles for the messageTop (A2 cell)
        //                const messageTopCell = $('c[r="A2"]', sheet);
        //                if (messageTopCell && messageTopCell[0]) {
        //                    messageTopCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Quro Schools</div></v:textbox>';
        //                }

        //                const DateCell = $('c[r="A3"]', sheet);
        //                if (DateCell && DateCell[0]) {
        //                    DateCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">For the Session :' + Selectedyear + '</div></v:textbox>';
        //                }

        //                const range = sheet.sheetData[0].attributes['!ref'].value;
        //                const dataRows = range.split(':')[1].split('')[1]; // Get the range of data rows

        //                for (let col = 0; col < 11; col++) { // Assuming 11 columns (0 to 10), adjust as needed
        //                    const colLetter = String.fromCharCode(65 + col); // Convert column index to Excel column letter
        //                    for (let row = 2; row <= dataRows; row++) { // Start from row 2 (excluding header)
        //                        const cellRef = colLetter + row;
        //                        const cell = $('c[r="' + cellRef + '"]', sheet);
        //                        if (cell && cell[0]) {
        //                            // Add black border to data cells
        //                            cell[0].innerHTML = '<style>td{border: 1px solid black; background-color: white;}</style>' + cell[0].innerHTML;
        //                        }
        //                    }
        //                }
        //            } else {
        //                console.error('Sheet or range not found.'); // Log an error if the sheet or range is not found
        //            }
        //        }
        //    }
        //],
        bProcessing: false,
        bLengthChange: false,
        pageLength: 20,
        bfilter: true,
        bSort: false,
        searching: false,
        scrollX: true,
        scrollY: '400px',
        scrollCollapse: true,
        paging: true,
        bPaginate: false,
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
            //{
            //    data: "InstanceId",
            //    render: function (data, type, row, meta) {                   
            //        //return row.registrationDate.split(' ')[0].replace(/-/g, '/');
            //        return row.instanceId;
            //    }
            //},
            {
                data: "Instancesnames",
                render: function (data, type, row, meta) {
                    return row.instancesnames + '<input type="text" value=' + row.instanceId + ' hidden/>'
                }
            },
            {
                data: "RegistrationCount",
                render: function (data, type, row, meta) {
                    return row.registrationCount
                }
            },
            {
                data: "AdmissionCount",
                render: function (data, type, row, meta) {
                    return row.admissionCount
                }
            }  
        ]
    });

    table.on('draw', function () {
        $('#Admissionscounttbl').find('td:nth-child(3)').attr('title', 'Edit').attr('title', 'Edit').css({
            color: 'black',
            'text-decoration': 'underline',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
    });
    table.on('draw', function () {
        $('#Admissionscounttbl').find('td:nth-child(4)').attr('title', 'Edit').attr('title', 'Edit').css({
            color: 'black',
            'text-decoration': 'underline',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
    });
    $('#Admissionscounttbl').find('td:nth-child(3)').attr('title', 'Edit').attr('title', 'Edit').css({
        color: 'black',
        'text-decoration': 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
    $('#Admissionscounttbl').find('td:nth-child(4)').attr('title', 'Edit').attr('title', 'Edit').css({
        color: 'black',
        'text-decoration': 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
}

$('#Admissionreportexporttoexcel').on('click', function () {

    debugger;
    // Get selected academic year
    var selectedText = $('#ddlAcadamicyear option:selected').text();
    if (selectedText === "Select Academic Year" || selectedText === "") {
        selectedText = "";
    }

    // Header Content (to include title and session year)
    var headerContent = `
    <div style="text-align: center; margin-bottom: 20px;">
        <h4 style="margin: 0;">Admission Summary Report</h4>
        <h4 style="margin: 0;">Quro Schools</h4>
        <h4 style="margin: 0;">For the Session: ${selectedText}</h4>
    </div>`;

    // Clone the original table
    var table1 = document.getElementById("Admissionscounttbl");
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
        cells[i].style.padding = "5px";            // Add padding for better readability
    }

    // Apply styles to table headers (th)
    var headers = table1Clone.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].style.height = "30px";               // Set header row height
        headers[i].style.textAlign = "center";         // Center-align text in header
        headers[i].style.padding = "5px";             // Add padding for readability
        headers[i].style.border = "1px solid black"; // Add border to each cell
        headers[i].style.color = "#000000";         // Set text color (e.g., black) for the header text
        headers[i].style.fontWeight = "bold";      // Optional: Make the header text bold
    }

    // Define the footer content (optional)
    var footerContent = `
    <div style="text-align: center; margin-top: 20px; font-size: 10px; color: gray;">
        <p style="margin: 0;">This report contains confidential information intended solely for the recipient. Unauthorized use, copying, or distribution is strictly prohibited.</p>
    </div>`;

    // Combine the header, table, and footer content into a single HTML string
    var combinedHtml = headerContent + table1Clone.outerHTML + footerContent;

    // Convert the combined HTML content to an Excel-compatible format (using the HTML table)
    var excelBlob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });

    // Use the FileSaver.js library to save the Blob as an Excel file
    saveAs(excelBlob, 'AdmissionsSummaryReport.xls'); // Trigger file download
});
//#endregion

$('#Admissionsreportform').submit(function (event) {

    event.preventDefault();
    setTimeout(function () {
        //debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        DatesCompare("From date", "To date");

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {


            var formData = $('#Admissionsreportform').serialize();
            //var formData = new FormData($('#ConfirmAdmissions_searchform')[0]);

            handleAjax('GET', "/Reports/Quroadmissionreportscounttbl", formData,
                function (resp) {
                    //debugger;
                    loaddingimg.css('display', 'none');
                    Bindsearchtbl(resp);
                    //$('#Confirmadmissionsdiv1').append(resp);
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                }
            );
        }
        //$("#Confirmadmissionsdiv1").empty();
    }, 50);
});

//#region DDLS BINDING FUNCTIONS CODE START
function BindInstanceDropdown() {
    CommonDropdownmultipleAjaxFunction("ddlInstances", "GET", "/Reports/GetInstancenamesDropdown", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

function BindAcadamiceyeardropdown() {
    //CommonDropdownAjaxFunction("ddlAcadamicyear", "GET", "/Reports/GetAcademicYearDropdown", null, function (resp) {
    //    loaddingimg.css('display', 'none');
    //}, true);

    loaddingimg.css('display', 'block');
    $.ajax({
        url: '/Reports/GetAcademicYearDropdown',
        type: 'GET',
        success: function (response) {
            debugger;

            var Academicyearddlid = $('#ddlAcadamicyear');
            Academicyearddlid.empty();

            Academicyearddlid.append($('<option>').val('').text('Select Academic Year'));
            response.sort(function (a, b) {
                var textA = a.text.toUpperCase();
                var textB = b.text.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            response.forEach(function (item) {
                var option = $('<option>').val(item.value).text(item.text);
                // Set the 'selected' attribute for the 2024-2025 year only
                if (item.text === '2024-2025') {
                    option.prop('selected', true);
                }
                Academicyearddlid.append(option);
            });

           
            // After loading options, call your function
            Pageloadtbldata();
        },
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
    loaddingimg.css('display', 'none');

}

function BindClassdropdown() {
    CommonDropdownAjaxFunction("ddlClass", "GET", "/Reports/GetAllClass", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

$("#ddlAcadamicyear").change(function () {
    //debugger;
    var selectedValue = $(this).val();
    if (selectedValue) {
        BindClassdropdown();
    } else {
        $('#ddlClass').empty();
    }
});

//DATE COMPARING FUNCTION
function DatesCompare(Sdate, Edate) {
    try {
        //debugger;
        var StartdateInput = $("#txtFromRegDate").val();
        var EnddateInput = $("#txtToRegDate").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);
        var currentDate = new Date();
        var lngDateDiff = Enddate.getTime() - Startdate.getTime();
        var errorElement = $('#Commonerrormessage');

        // Clear previous error message
        errorElement.text("");

        if (StartdateInput !== "") {
            if (Startdate > currentDate) {
                errorElement.text("From Date Should not be greater than today's date.");
            } else {
                errorElement.text("");
            }
        }

        if (EnddateInput !== "") {
            if (Enddate > currentDate) {
                errorElement.text("To Date Should not be greater than today's date.");
            } else {
                errorElement.text("");
            }
        }

        if (lngDateDiff < 0) {
            errorElement.text("From date Should not be greater than To date.");
        }      
        //else if (currentDate > Enddate) {
        //    errorElement.text("To Date Should not be greater than today.");
        //}
    }
    catch (error) {
        console.log(error);
    }
}

// DATES INPUT CHANGE EVENT
$("#txtFromRegDate").on("change", function () { DatesCompare("From date", "To date"); });
$("#txtToRegDate").on("change", function () { DatesCompare("From date", "To date"); });
//#endregion


//#region REGISTARTION Code
$(document).on('click', '#Admissionscounttbl td:nth-child(3)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Instanceid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#Admissionsreporttbl').DataTable();
    //tabletargetpagetblSEMsearchresults = table.page.info().page;
    var ddlAcadamicyear = $('#ddlAcadamicyear').val();
    var data = { "InstanceId": Instanceid, "Acadamicyearid": ddlAcadamicyear, "Userstatusvalue": "1" };

    handleAjax('GET', "/Reports/Registrations_Admissionstbl", data,
        function (resp) {
            debugger;
            loaddingimg.css('display', 'none');
            RegistartionDetails(resp);
            $('#Registrationstbldiv').show();
            $('#Admissiontbldiv').hide();
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
})

function RegistartionDetails(response) {
    debugger;
    $("#Registrationstblcount").text(response.filteredList.length);
    var Statusvalue = response.userStatusValue;

    //$('#Registrationstbldiv').show();
    //$('#Admissiontbldiv').hide();

    var table = $('#RegistartionreportResultstbl').DataTable();
    table.destroy();

    var newTable = $("#RegistartionreportResultstbl").DataTable({
        dom: '<"tops"lf>t<"bottom"ip>',
        buttons: [],
        //dom: 'Bfrtip',
        //buttons: [
        //    {
        //        extend: 'excel',
        //        text: 'Export To Excel',
        //        title: 'Manage Admissions',
        //        messageTop: 'Quro Schools',
        //        exportOptions: {
        //            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // Adjust column indexes based on your DataTable
        //        },
        //        customize: function (xlsx) {
        //            const sheet = xlsx.xl.worksheets['sheet1.xml'];

        //            if (sheet && sheet.sheetData && sheet.sheetData[0]) {
        //                //debugger;
        //                // Set styles for the title (A1 cell)
        //                const titleCell = $('c[r="A1"]', sheet);
        //                if (titleCell && titleCell[0]) {
        //                    titleCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Manage Admissions</div></v:textbox>';
        //                }

        //                // Set styles for the messageTop (A2 cell)
        //                const messageTopCell = $('c[r="A2"]', sheet);
        //                if (messageTopCell && messageTopCell[0]) {
        //                    messageTopCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Quro Schools</div></v:textbox>';
        //                }

        //                const DateCell = $('c[r="A3"]', sheet);
        //                if (DateCell && DateCell[0]) {
        //                    DateCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">For the Session :' + Selectedyear + '</div></v:textbox>';
        //                }

        //                const range = sheet.sheetData[0].attributes['!ref'].value;
        //                const dataRows = range.split(':')[1].split('')[1]; // Get the range of data rows

        //                for (let col = 0; col < 11; col++) { // Assuming 11 columns (0 to 10), adjust as needed
        //                    const colLetter = String.fromCharCode(65 + col); // Convert column index to Excel column letter
        //                    for (let row = 2; row <= dataRows; row++) { // Start from row 2 (excluding header)
        //                        const cellRef = colLetter + row;
        //                        const cell = $('c[r="' + cellRef + '"]', sheet);
        //                        if (cell && cell[0]) {
        //                            // Add black border to data cells
        //                            cell[0].innerHTML = '<style>td{border: 1px solid black; background-color: white;}</style>' + cell[0].innerHTML;
        //                        }
        //                    }
        //                }
        //            } else {
        //                console.error('Sheet or range not found.'); // Log an error if the sheet or range is not found
        //            }
        //        }
        //    }
        //],
        bProcessing: false,
        bLengthChange: false,
        pageLength: 20,
        bfilter: true,
        bSort: false,
        searching: false,
        scrollX: true,
        scrollY: '400px',
        scrollCollapse: true,
        paging: true,
        bPaginate: false,
        data: response.filteredList,
        columns: [
            {
                targets: 0, // Assuming this is the column index where you want to display numbering
                render: function (data, type, row, meta) {
                    var currentPage = table.page.info().page;
                    var rowsPerPage = table.page.info().length;
                    return (0 * rowsPerPage) + meta.row + 1;
                }
            },
            //{
            //    data: "InstanceId",
            //    render: function (data, type, row, meta) {                   
            //        //return row.registrationDate.split(' ')[0].replace(/-/g, '/');
            //        return row.instanceId;
            //    }
            //},
            {
                data: "Registrationdate",
                render: function (data, type, row, meta) {
                    return row.registrationdate + '<input type="text" value=' + row.instanceUserCode + ' hidden/>';
                }
            },
            {
                data: "InstanceUserCode",
                render: function (data, type, row, meta) {
                    return row.instanceUserCode;
                }
            },
            {
                data: "Name",
                render: function (data, type, row, meta) {
                    return row.name;
                }
            },
            {
                data: "DOB",
                render: function (data, type, row, meta) {
                    return row.dob;
                }
            },
            {
                data: "ClassApplied",
                render: function (data, type, row, meta) {
                    return row.classApplied;
                }
            },
            {
                data: "FatherName",
                render: function (data, type, row, meta) {
                    return row.fatherName;
                }
            },
            {
                data: "MotherName",
                render: function (data, type, row, meta) {
                    return row.motherName;
                }
            },
            {
                data: "Mobilenumber",
                render: function (data, type, row, meta) {                    
                    return row.mobilenumber;
                }
            },
            {
                data: "EmailId",
                render: function (data, type, row, meta) {
                    return row.emailId;
                }
            }
        ]
    });

    //table.on('draw', function () {
    //    $('#RegistartionreportResultstbl').find('td:nth-child(3)').attr('title', 'Edit').attr('title', 'Edit').css({
    //        color: 'black',
    //        'text-decoration': 'underline',
    //        cursor: 'pointer',
    //        fontWeight: 'bold'
    //    });
    //});
   
    //$('#RegistartionreportResultstbl').find('td:nth-child(3)').attr('title', 'Edit').attr('title', 'Edit').css({
    //    color: 'black',
    //    'text-decoration': 'underline',
    //    cursor: 'pointer',
    //    fontWeight: 'bold'
    //});
  
}

$('#Registrationstblexporttoexcelbtn').on('click', function () {

    debugger;
    // Get selected academic year
    var selectedText = $('#ddlAcadamicyear option:selected').text();
    if (selectedText === "Select Academic Year" || selectedText === "") {
        selectedText = "";
    }

    // Header Content (to include title and session year)
    var headerContent = `
    <div style="text-align: center; margin-bottom: 20px;">
        <h4 style="margin: 0;">Registration user Details Report</h4>
        <h4 style="margin: 0;">Quro Schools</h4>
        <h4 style="margin: 0;">For the Session: ${selectedText}</h4>
    </div>`;

    // Clone the original table
    var table1 = document.getElementById("RegistartionreportResultstbl");
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
        cells[i].style.padding = "5px";            // Add padding for better readability
    }

    // Apply styles to table headers (th)
    var headers = table1Clone.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].style.height = "30px";               // Set header row height
        headers[i].style.textAlign = "center";         // Center-align text in header
        headers[i].style.padding = "5px";             // Add padding for readability
        headers[i].style.border = "1px solid black"; // Add border to each cell
        headers[i].style.color = "#000000";         // Set text color (e.g., black) for the header text
        headers[i].style.fontWeight = "bold";      // Optional: Make the header text bold
    }

    // Define the footer content (optional)
    var footerContent = `
    <div style="text-align: center; margin-top: 20px; font-size: 10px; color: gray;">
        <p style="margin: 0;">This report contains confidential information intended solely for the recipient. Unauthorized use, copying, or distribution is strictly prohibited.</p>
    </div>`;

    // Combine the header, table, and footer content into a single HTML string
    var combinedHtml = headerContent + table1Clone.outerHTML + footerContent;

    // Convert the combined HTML content to an Excel-compatible format (using the HTML table)
    var excelBlob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });

    // Use the FileSaver.js library to save the Blob as an Excel file
    saveAs(excelBlob, 'RegUserDetailsReport.xls'); // Trigger file download
});

//#endregion

//#region ADMISSION Code
$(document).on('click', '#Admissionscounttbl td:nth-child(4)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Instanceid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#Admissionsreporttbl').DataTable();
    //tabletargetpagetblSEMsearchresults = table.page.info().page;

    var data = { "InstanceId": Instanceid, "Userstatusvalue": "2" };

    handleAjax('GET', "/Reports/Adsreporttbl", data,
        function (resp) {
            debugger;
            loaddingimg.css('display', 'none');
            AdmissionsRegistrationDetails(resp);          
            $('#Admissiontbldiv').show();
            $('#Registrationstbldiv').hide();
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
})

function AdmissionsRegistrationDetails(response) {
    debugger;
    $("#Admissiontblcount").text(response.filteredList.length);
    var Statusvalue = response.userStatusValue;

    //$('#Admissiontbldiv').show();
    //$('#Registrationstbldiv').hide();

    var table = $('#AdmissionreportResultstbl').DataTable();
    table.destroy();
    var newTable = $("#AdmissionreportResultstbl").DataTable({
        dom: '<"tops"lf>t<"bottom"ip>',
        buttons: [],
        //dom: 'Bfrtip',
        //buttons: [
        //    {
        //        extend: 'excel',
        //        text: 'Export To Excel',
        //        title: 'Manage Admissions',
        //        messageTop: 'Quro Schools',
        //        exportOptions: {
        //            columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // Adjust column indexes based on your DataTable
        //        },
        //        customize: function (xlsx) {
        //            const sheet = xlsx.xl.worksheets['sheet1.xml'];

        //            if (sheet && sheet.sheetData && sheet.sheetData[0]) {
        //                //debugger;
        //                // Set styles for the title (A1 cell)
        //                const titleCell = $('c[r="A1"]', sheet);
        //                if (titleCell && titleCell[0]) {
        //                    titleCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Manage Admissions</div></v:textbox>';
        //                }

        //                // Set styles for the messageTop (A2 cell)
        //                const messageTopCell = $('c[r="A2"]', sheet);
        //                if (messageTopCell && messageTopCell[0]) {
        //                    messageTopCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Quro Schools</div></v:textbox>';
        //                }

        //                const DateCell = $('c[r="A3"]', sheet);
        //                if (DateCell && DateCell[0]) {
        //                    DateCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">For the Session :' + Selectedyear + '</div></v:textbox>';
        //                }

        //                const range = sheet.sheetData[0].attributes['!ref'].value;
        //                const dataRows = range.split(':')[1].split('')[1]; // Get the range of data rows

        //                for (let col = 0; col < 11; col++) { // Assuming 11 columns (0 to 10), adjust as needed
        //                    const colLetter = String.fromCharCode(65 + col); // Convert column index to Excel column letter
        //                    for (let row = 2; row <= dataRows; row++) { // Start from row 2 (excluding header)
        //                        const cellRef = colLetter + row;
        //                        const cell = $('c[r="' + cellRef + '"]', sheet);
        //                        if (cell && cell[0]) {
        //                            // Add black border to data cells
        //                            cell[0].innerHTML = '<style>td{border: 1px solid black; background-color: white;}</style>' + cell[0].innerHTML;
        //                        }
        //                    }
        //                }
        //            } else {
        //                console.error('Sheet or range not found.'); // Log an error if the sheet or range is not found
        //            }
        //        }
        //    }
        //],
        bProcessing: false,
        bLengthChange: false,
        pageLength: 20,
        bfilter: true,
        bSort: false,
        searching: false,
        scrollX: true,
        scrollY: '400px',
        scrollCollapse: true,
        paging: true,        
        bPaginate: false,        
        data: response.filteredList,
        columns: [
            {
                targets: 0,
                render: function (data, type, row, meta) {
                    var currentPage = table.page.info().page;
                    var rowsPerPage = table.page.info().length;
                    return (0 * rowsPerPage) + meta.row + 1;
                }
            },
            {
                data: "Registrationdate",
                render: function (data, type, row, meta) {
                    return row.registrationdate + '<input type="text" value=' + row.instanceUserCode + ' hidden/>'
                }
            },
            {
                data: "InstanceUserCode",
                render: function (data, type, row, meta) {
                    return row.instanceUserCode
                }
            },
            {
                data: "Name",
                render: function (data, type, row, meta) {
                    return row.name
                }
            },
            {
                data: "DOB",
                render: function (data, type, row, meta) {
                    return row.dob
                }
            },
            {
                data: "ClassApplied",
                render: function (data, type, row, meta) {
                    return row.classApplied
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
                data: "Mobilenumber",
                render: function (data, type, row, meta) {
                    return row.mobilenumber
                }
            },
            {
                data: "EmailId",
                render: function (data, type, row, meta) {
                    return row.emailId
                }
            },
            {
                data: "DOJ",
                render: function (data, type, row, meta) {                   
                    if (row.doj && row.doj !== null && row.doj !== undefined) {
                        return row.doj;
                    } else {
                        return ""; 
                    }
                }
            }
        ]
    });
    //table.on('draw', function () {
    //    $('#AdmissionreportResultstbl').find('td:nth-child(3)').attr('title', 'Edit').attr('title', 'Edit').css({
    //        color: 'black',
    //        'text-decoration': 'underline',
    //        cursor: 'pointer',
    //        fontWeight: 'bold'
    //    });
    //});

    //$('#AdmissionreportResultstbl').find('td:nth-child(3)').attr('title', 'Edit').attr('title', 'Edit').css({
    //    color: 'black',
    //    'text-decoration': 'underline',
    //    cursor: 'pointer',
    //    fontWeight: 'bold'
    //});

}

$('#Admissionstblexporttoexcelbtn').on('click', function () {

    debugger;
    // Get selected academic year
    var selectedText = $('#ddlAcadamicyear option:selected').text();
    if (selectedText === "Select Academic Year" || selectedText === "") {
        selectedText = "";
    }

    // Header Content (to include title and session year)
    var headerContent = `
    <div style="text-align: center; margin-bottom: 20px;">
        <h4 style="margin: 0;">Admission user Details Report</h4>
        <h4 style="margin: 0;">Quro Schools</h4>
        <h4 style="margin: 0;">For the Session: ${selectedText}</h4>
    </div>`;

    // Clone the original table
    var table1 = document.getElementById("AdmissionreportResultstbl");
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
        cells[i].style.padding = "5px";            // Add padding for better readability
    }

    // Apply styles to table headers (th)
    var headers = table1Clone.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].style.height = "30px";               // Set header row height
        headers[i].style.textAlign = "center";         // Center-align text in header
        headers[i].style.padding = "5px";             // Add padding for readability
        headers[i].style.border = "1px solid black"; // Add border to each cell
        headers[i].style.color = "#000000";         // Set text color (e.g., black) for the header text
        headers[i].style.fontWeight = "bold";      // Optional: Make the header text bold
    }

    // Define the footer content (optional)
    var footerContent = `
    <div style="text-align: center; margin-top: 20px; font-size: 10px; color: gray;">
        <p style="margin: 0;">This report contains confidential information intended solely for the recipient. Unauthorized use, copying, or distribution is strictly prohibited.</p>
    </div>`;

    // Combine the header, table, and footer content into a single HTML string
    var combinedHtml = headerContent + table1Clone.outerHTML + footerContent;

    // Convert the combined HTML content to an Excel-compatible format (using the HTML table)
    var excelBlob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });

    // Use the FileSaver.js library to save the Blob as an Excel file
    saveAs(excelBlob, 'AdmissionUserDetailsReport.xls'); // Trigger file download
});

//#endregion