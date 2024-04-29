function TblCallToAjax(method, url,data, successCallback, errorCallback) {
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

$(document).ready(function () {  
    debugger;
    Admissionsummaryreporttblfun();

});

function Admissionsummaryreporttblfun() {
    TblCallToAjax('GET', '/Reports/QuroAdmissionSummaryReporttbl', null,
        function (status, error) {
            alert("Admissionsummaryreporttblfun Something went wrong .... Please try again........!!!!");
        }
    );
}


$("#Acadamicyear_ddlid").change(function () {
    debugger;
    // Get the selected value of the dropdown
    var selectedValue = $(this).val();
    if (selectedValue) {
        ClassDropdownfun();
    } else {
        $('#Class_ddl').empty();
    }
    //// Log the selected value to the console (you can perform other actions here)
    //console.log("Selected value:", selectedValue);
});

function ClassDropdownfun() {
    CommonDropdownAjaxFunction("Class_ddl", "GET", "/Reports/GetAllClass", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

function bindDatatables(response) {
    debugger;
    CommonDropdownmultipleAjaxFunction("Instancesnames_ddl", "GET", "/Reports/GetInstancenamesDropdown", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);

    CommonDropdownAjaxFunction("Acadamicyear_ddlid", "GET", "/Reports/GetAcademicYearDropdown", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);

    // Class Dropdown data function
    ClassDropdownfun();

    debugger;
    var formattedDate = Dateformate();
    debugger;
    var table = $('#Admissionssummaryreporttbl').DataTable();
    table.destroy();
    $("#Admissionreporttblcount").text(response.length);


    var newTable = $("#Admissionssummaryreporttbl").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'excel',
                text: 'Export To Excel',
                title: 'Admission Report',
                messageTop: 'Quro Schools',
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // Adjust column indexes based on your DataTable
                },
                customize: function (xlsx) {
                    const sheet = xlsx.xl.worksheets['sheet1.xml'];

                    if (sheet && sheet.sheetData && sheet.sheetData[0]) {
                        // Set styles for the title (A1 cell)
                        const titleCell = $('c[r="A1"]', sheet);
                        if (titleCell && titleCell[0]) {
                            titleCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Admission Report</div></v:textbox>';
                        }

                        // Set styles for the messageTop (A2 cell)
                        const messageTopCell = $('c[r="A2"]', sheet);
                        if (messageTopCell && messageTopCell[0]) {
                            messageTopCell[0].innerHTML = '<v:rect fillcolor="black" /><v:textbox><div style="color: white;">Quro Schools</div></v:textbox>';
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
                    } else {
                        console.error('Sheet or range not found.'); // Log an error if the sheet or range is not found
                    }
                }
            }
        ],

        bProcessing: false,
        bLengthChange: true,
        /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
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
                    //if (type === 'display' && row.registrationdate) {
                       
                    //    var datepart = row.registrationdate.split(' ');
                    //    return datepart[0]
                    //    //return parts[0];
                    //}
                   return row.registrationdate.replace(/-/g, '/');
                }
            },
            {
                data: "InstanceUserCode",
                render: function (data, type, row, meta) {
                    return row.instanceUserCode /*+ '<input type="text" value=' + row.instanceSubclassificaitionId + ' hidden/>'*/
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
                data: "Status",
                render: function (data, type, row, meta) {
                    if (row.status === "false") {
                        return 'Admission Confirmed';
                    } else if (row.status === "true") {
                        return 'Registered';
                    }
                    // return row.status
                    //return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                }
            }
        ]
    });

    //table.on('draw', function () {
    //    $('#Admissionssummaryreporttbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
    //        color: 'black',
    //        'text-decoration': 'underline',
    //        cursor: 'pointer',
    //        fontWeight: 'bold'
    //    });
    //});
    //$('#Admissionssummaryreporttbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
    //    color: 'black',
    //    'text-decoration': 'underline',
    //    cursor: 'pointer',
    //    fontWeight: 'bold'
    //});
}



// Function to compare dates and show error message
function DatesCompare(Sdate, Edate) {
    try {
        debugger;
        var StartdateInput = $("#FromRegistrationdatetxt").val();
        var EnddateInput = $("#ToRegistrationdatetxt").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var errorElement = $('#Commonerrormessage');

        // Clear previous error message
        errorElement.text("");

        if (Enddate <= Startdate) {
            errorElement.text(Sdate + " Should not be greater than " + Edate + ".");
        }

    } catch (error) {
        console.log(error);
    }
}

// Dates input change Event
$("#FromRegistrationdatetxt").on("change", function () { DatesCompare("From date", "To date"); });
$("#ToRegistrationdatetxt").on("change", function () { DatesCompare("From date", "To date"); });




///===>>> New Admissionform Save Function code start
$('#Admissionsummaryreportform').submit(function () {
    debugger;
    event.preventDefault();

    var formData = $('#Admissionsummaryreportform').serialize();
    loaddingimg.css('display', 'block');

    TblCallToAjax('GET', "/Reports/QuroAdmissionSummaryReporttbl", formData,
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );

});


///===>>> EXPORT TO EXCEL  BUTTON EVENT CODE START
$('#SummaryreportExporttoexcel').on('click', function () {
    //var formattedDate = Dateformate();

    debugger;
    //var Forthesessiontext = document.getElementById("Forthesessiondd").textContent;

    var headerContent = `
            <div style="display: grid; grid-template-columns: repeat(18, 1fr);">
                <div style="grid-column: 1 / span 18;">
                     <h4 style="margin: 0; text-align: center;">Admission Report</h4>
                     <h4 style="margin: 0; text-align: center;">Quro Schools</h4>                     
                </div>
            </div>`;

    var table1 = document.getElementById("Admissionssummaryreporttbl");
    var table1Clone = table1.cloneNode(true);

    table1Clone.style.borderCollapse = "collapse";
   

    var cells = table1.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {      
        cells[i].style.border = "1px solid black";
        //cells[i].style.borderColor = "black";
        cells[i].style.width = "153.312px";
    }

    var FooterContent = `
      <div style="grid-column: 1 / span 10; background-color: #e0e0e0; padding: 20px; border-radius: 5px;">
        <p style="margin: 0; text-align: center;">This report contains confidential information intended solely for the recipient. Unauthorized use, copying, or distribution is strictly prohibited.</p>
      </div>
      `;
    document.body.appendChild(table1Clone);

    var combinedHtml = headerContent + table1Clone.outerHTML + FooterContent;
    //var combinedHtml = headerContent + table1Clone.outerHTML;

    const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
    saveAs(blob, 'AdmissionsReport.xls');

    // Replace the original table with the cloned table in the document
    table1.parentNode.replaceChild(table1Clone, table1);
});


function Dateformate() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}


//=====>>>>>> COMMENTS 

//====>>>> TABLE DATA BINDING ANOTHER WAY CODE
//function bindDatatable(response) {
//    debugger;
//    $("#Admissionreporttblcount").text(response.length);

//    // Clear the existing content of the table
//    $('#Bankdeposittbldivid').empty();
//    $('#Admissionssummaryreporttbl').empty();

//    // Create the table element
//    var table = document.createElement('table');
//    table.id = 'Admissionssummaryreporttbl';
//    table.classList.add('lnks', 'table', 'table-hover', 'table-bordered', 'no-footer');
//    table.style.borderCollapse = 'collapse';
//    table.style.border = '1px solid black';

//    // Create thead and append it to the table
//    var thead = document.createElement('thead');
//    thead.classList.add('table-dark');
//    var trHead = document.createElement('tr');
//    ['S. No.', 'Registration Date', 'Reg No', 'Name', 'DOB', 'Class Applied', 'Father Name', 'Mother name', 'Mobile number', 'Email Id', 'Status'].forEach(function (headingText) {
//        var th = document.createElement('th');
//        th.textContent = headingText;
//        th.style.border = '1px solid black';
//        th.style.borderCollapse = 'collapse';
//        trHead.appendChild(th);
//    });
//    thead.appendChild(trHead);
//    table.appendChild(thead);

//    // Create tbody and append it to the table
//    var tbody = document.createElement('tbody');
//    table.appendChild(tbody);

//    // Append the table to the div with ID 'Bankdeposittbldivid'
//    document.getElementById('Admissionssummaryreporttbl').appendChild(table);

//    var pageSize = 10; // Number of rows per page
//    var currentPage = 1; // Initial page number
//    // Populate the table with data
//    response.slice((currentPage - 1) * pageSize, currentPage * pageSize).forEach(function (row, index) {
//        // response.forEach(function (row, index) {
//        var tr = document.createElement('tr');
//        tr.classList.add(index % 2 === 0 ? 'even' : 'odd');

//        //var serialNumberCell = document.createElement('td');
//        //serialNumberCell.textContent = index + 1; // Add 1 to start serial number from 1 instead of 0
//        //serialNumberCell.style.border = '1px solid black';
//        //serialNumberCell.style.borderCollapse = 'collapse';
//        //tr.appendChild(serialNumberCell);

//        var serialNumberCell = document.createElement('td');
//        serialNumberCell.textContent = ((currentPage - 1) * pageSize) + index + 1; // Calculate serial number based on current page and index
//        serialNumberCell.style.border = '1px solid black';
//        serialNumberCell.style.borderCollapse = 'collapse';
//        tr.appendChild(serialNumberCell);


//        ['registrationdate', 'instanceUserCode', 'name', 'dOB', 'classApplied', 'fatherName', 'motherName', 'mobilenumber', 'emailId', 'status'].forEach(function (propertyName) {
//            var td = document.createElement('td');
//            td.textContent = row[propertyName];
//            td.style.border = '1px solid black';
//            td.style.borderCollapse = 'collapse';
//            tr.appendChild(td);
//        });
//        tbody.appendChild(tr);
//    });
//}
