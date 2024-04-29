////function TblCallToAjax(method, url, data, successCallback, errorCallback) {
////    $.ajax({
////        url: url,
////        type: method,
////        data: data,
////        success: bindDatatables,
////        error: function (xhr, status, error) {
////            errorCallback(xhr.status, error);
////        }
////    });
////}
////function FirsttblCallToAjax(method, url, data, successCallback, errorCallback) {
////    $.ajax({
////        url: url,
////        type: method,
////        data: data,
////        //success: FisrttblbindDatatables,
////        success: BindFirstTable,
////        error: function (xhr, status, error) {
////            errorCallback(xhr.status, error);
////        }
////    });
////}
////function SecoundtblCallToAjax(method, url, data, successCallback, errorCallback) {
////    $.ajax({
////        url: url,
////        type: method,
////        data: data,
////        success: SecountblbindDatatables,
////        error: function (xhr, status, error) {
////            errorCallback(xhr.status, error);
////        }
////    });
////}
////function ThirdtblCallToAjax(method, url, data, successCallback, errorCallback) {
////    $.ajax({
////        url: url,
////        type: method,
////        data: data,
////        success: Admissionstblbinding,
////        error: function (xhr, status, error) {
////            errorCallback(xhr.status, error);
////        }
////    });
////}


//$(document).ready(function () {
//       Page_Load();    
//});

////======>>>>btnSubmit_Click
//$('#Admissionsreportform').submit(function () {
//    debugger;
//    event.preventDefault();

//    var formData = $('#Admissionsreportform').serialize();
//    loaddingimg.css('display', 'block');

//    TblCallToAjax('GET', "/Reports/Quroadmissionreportscounttbl", formData,
//        function (status, error) {
//            loaddingimg.css('display', 'none');
//            alert("Something went wrong Submit event ...!");
//        }
//    );

//});

//function Page_Load() {
//    TblCallToAjax('GET', '/Reports/Quroadmissionreportscounttbl', null,
//        function (status, error) {
//            alert("Something Went Wrong Page Load function....!");
//        }
//    );
//}

//$("#Acadamicyearid_ddl").change(function () {
//    debugger;
//    // Get the selected value of the dropdown
//    var selectedValue = $(this).val();
//    if (selectedValue) {
//        ClassDropdownfun();
//    } else {
//        $('#Subclassification_ddlid').empty();
//    }    
//});

//function ClassDropdownfun() {
//    CommonDropdownAjaxFunction("Subclassification_ddlid", "GET", "/Reports/GetAllClass", null, function (resp) {
//        loaddingimg.css('display', 'none');
//    }, true);
//}

//function BindFirstTable() {
//    debugger;
//    CommonDropdownmultipleAjaxFunction("Instancenames_ddlid", "GET", "/Reports/GetInstancenamesDropdown", null, function (resp) {
//        loaddingimg.css('display', 'none');
//    }, true);      ////======>>>>>stp_tblInstanceAcademicYear_Admission

//    CommonDropdownAjaxFunction("Acadamicyearid_ddl", "GET", "/Reports/GetAcademicYearDropdown", null, function (resp) {
//        loaddingimg.css('display', 'none');
//    }, true);     ////======>>>>>GetAcadamiyearsDropdown

//    // Class Dropdown data function
//    ClassDropdownfun(); ////======>>>>>GetClassDropdown

//    var formattedDate = GetDateFormat();
//    debugger;
//    var table = $('#Admissionssummaryreporttbl').DataTable();
//    table.destroy();
//    $("#Subclassification_Recordscount").text(response.length);


//    var newTable = $("#Admissionscounttbl").DataTable({
//        dom: 'Bfrtip',
//        buttons: [           
//            {
//                extend: 'excel',
//                text: 'Export To Excel', // Button text
//                title: 'Admission Report', // Title for the Excel file
//                messageTop: 'QURO SCHOOL', // Additional message
//                message: "For the Session:" + +"Report On: " + formattedDate,
//                exportOptions: {
//                    columns: [0, 1, 2, 3, 4] // Adjust column indexes based on your DataTable
//                },
//                customize: function (xlsx) {
//                    const sheet = xlsx.xl.worksheets['sheet1.xml'];

//                    // Check if the sheet exists and has the range defined
//                    if (sheet && sheet.sheetData && sheet.sheetData[0]) {
//                        const range = sheet.sheetData[0].attributes['!ref'].value;

//                        for (let col = 0; col < 6; col++) { // Assuming 6 columns, adjust as needed
//                            const colLetter = String.fromCharCode(65 + col); // Convert column index to Excel column letter

//                            for (let row = 1; row <= 100; row++) { // Iterate through rows, adjust the range as needed
//                                const cellRef = colLetter + row;
//                                const cell = $('c[r="' + cellRef + '"]', sheet);

//                                // Add black border to each cell in each column
//                                cell.attr('s', '42');
//                            }
//                        }
//                    } else {
//                        console.error('Sheet or range not found.'); // Log an error if the sheet or range is not found
//                    }
//                }
//            }          
//        ],

//        bProcessing: false,
//        bLengthChange: true,
//        /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
//        bfilter: false,
//        bSort: true,
//        searching: false,
//        //scrollX: true,
//        //scrollY: '400px',
//        /* scrollCollapse: true,*/
//        paging: true,
//        bPaginate: true,
//        //  stateSave:true,
//        data: response,
//        columns: [
//            {
//                targets: 0, // Assuming this is the column index where you want to display numbering
//                render: function (data, type, row, meta) {
//                    var currentPage = table.page.info().page;
//                    var rowsPerPage = table.page.info().length;
//                    return (0 * rowsPerPage) + meta.row + 1;
//                }
//            },
//            {
//                data: "SubClassificationName",

//                render: function (data, type, row, meta) {
//                    //  length++;

//                    return row.subClassificationName

//                }
//            },
//            {
//                data: "ClassificationName",

//                render: function (data, type, row, meta) {
//                    //  length++;

//                    return row.classificationName + '<input type="text" value=' + row.instanceSubclassificaitionId + ' hidden/>'

//                }
//            },
//            {
//                data: "SubClassificationDescription",

//                render: function (data, type, row, meta) {
//                    //  length++;

//                    return row.subClassificationDescription

//                }
//            },
//            {
//                data: "ClassTeacher",

//                render: function (data, type, row, meta) {
//                    //  length++;

//                    return row.classTeacher

//                }
//            },
//            {

//                data: "instanceClassificationId",

//                render: function (data, type, row, meta) {
//                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

//                }
//            }
//        ]
//    });


//    table.on('draw', function () {
//        $('#Admissionscounttbl').find('td:nth-child(3)').attr('title', 'Edit').attr('title', 'Edit').css({
//            color: 'black',
//            'text-decoration': 'underline',
//            cursor: 'pointer',
//            fontWeight: 'bold'
//        });
//        $('#Admissionscounttbl').find('td:nth-child(4)').attr('title', 'Edit').attr('title', 'Edit').css({
//            color: 'black',
//            'text-decoration': 'underline',
//            cursor: 'pointer',
//            fontWeight: 'bold'
//        });
//    });
//    $('#Admissionscounttbl').find('td:nth-child(3)').attr('title', 'Edit').attr('title', 'Edit').css({
//        color: 'black',
//        'text-decoration': 'underline',
//        cursor: 'pointer',
//        fontWeight: 'bold'
//    });
//    $('#Admissionscounttbl').find('td:nth-child(4)').attr('title', 'Edit').attr('title', 'Edit').css({
//        color: 'black',
//        'text-decoration': 'underline',
//        cursor: 'pointer',
//        fontWeight: 'bold'
//    });
//}


//// DATES COMPARING FUNCTION
//function DatesCompare(Sdate, Edate) {
//    try {
//        debugger;
//        var StartdateInput = $("#FromRegistrationdate_txtid").val();
//        var EnddateInput = $("#ToRegistrationdate_txtid").val();

//        var Startdate = new Date(StartdateInput);
//        var Enddate = new Date(EnddateInput);

//        var errorElement = $('#Commonerrormessage');

//        // Clear previous error message
//        errorElement.text("");

//        if (Enddate <= Startdate) {
//            errorElement.text(Sdate + " Should not be greater than " + Edate + ".");
//        }
//    }
//    catch (error) {
//        console.log(error);
//    }
//}

//// Dates input change Event
//$("#FromRegistrationdate_txtid").on("change", function () { DatesCompare("From date", "To date"); });
//$("#ToRegistrationdate_txtid").on("change", function () { DatesCompare("From date", "To date"); });


//$(document).on('click', '#Admissionssummaryreporttbl td:nth-child(3)', function (event) {
//    event.stopImmediatePropagation();
//    debugger;
//    var parent = $(event.target).closest('tr');
//    var Admissionuserid = $(parent).find('td').find('input[type="text"]').val();
//    var table = $('#Admissionsreporttbl').DataTable();
//    tabletargetpagetblSEMsearchresults = table.page.info().page;

//    //Admissionuserid  Parameter type 
//    SecoundtblCallToAjax('GET', '/Reports/GetRegistrationSummaryDetailstbl', null,
//        function (status, error) {
//            alert("Second table data binding something went wrong....!");
//        }
//    );
//})
//$(document).on('click', '#Admissionssummaryreporttbl td:nth-child(4)', function (event) {
//    event.stopImmediatePropagation();
//    debugger;
//    var parent = $(event.target).closest('tr');
//    var Admissionuserid = $(parent).find('td').find('input[type="text"]').val();
//    var table = $('#Admissionsreporttbl').DataTable();
//    tabletargetpagetblSEMsearchresults = table.page.info().page;

//    ThirdtblCallToAjax('GET', '/Reports/GetRegistrationSummaryDetailstbl', null,
//        function (status, error) {
//            alert("Second table data binding something went wrong....!");
//        }
//    );
//})

//function SecountblbindDatatables() {
//    debugger;
//    var formattedDate = GetDateFormat();
//    debugger;
//    var table = $('#AdmissionreportResultstbl').DataTable();
//    table.destroy();
//    $("#Recordscount").text(response.length);


//    var newTable = $("#AdmissionreportResultstbl").DataTable({
//        dom: 'Bfrtip',
//        buttons: [],

//        bProcessing: false,
//        bLengthChange: true,
//        /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
//        bfilter: false,
//        bSort: true,
//        searching: false,
//        //scrollX: true,
//        //scrollY: '400px',
//        /* scrollCollapse: true,*/
//        paging: true,
//        bPaginate: true,
//        //  stateSave:true,
//        data: response,
//        columns: [
//            {
//                targets: 0, // Assuming this is the column index where you want to display numbering
//                render: function (data, type, row, meta) {
//                    var currentPage = table.page.info().page;
//                    var rowsPerPage = table.page.info().length;
//                    return (0 * rowsPerPage) + meta.row + 1;
//                }
//            },
//            {
//                data: "Registration Date",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "Reg No",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "Name",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "DOB",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "Class Applied",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "Father Name",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.classificationName + '<input type="text" value=' + row.instanceSubclassificaitionId + ' hidden/>'
//                }
//            },
//            {
//                data: "Mother name",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationDescription
//                }
//            },
//            {
//                data: "Mobile number",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.classTeacher
//                }
//            },
//            {
//                data: "Email Id",
//                render: function (data, type, row, meta) {
//                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
//                }
//            },
//            {
//                data: "DOJ",
//                render: function (data, type, row, meta) {
//                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
//                }
//            }
//        ]
//    });
//}

//function Admissionstblbinding() {
//    debugger;
//    var formattedDate = GetDateFormat();
//    debugger;
//    var table = $('#AdmissionreportResultstbl').DataTable();
//    table.destroy();
//    $("#Recordscount").text(response.length);


//    var newTable = $("#AdmissionreportResultstbl").DataTable({
//        dom: 'Bfrtip',
//        buttons: [],

//        bProcessing: false,
//        bLengthChange: true,
//        /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
//        bfilter: false,
//        bSort: true,
//        searching: false,
//        //scrollX: true,
//        //scrollY: '400px',
//        /* scrollCollapse: true,*/
//        paging: true,
//        bPaginate: true,
//        //  stateSave:true,
//        data: response,
//        columns: [
//            {
//                targets: 0, // Assuming this is the column index where you want to display numbering
//                render: function (data, type, row, meta) {
//                    var currentPage = table.page.info().page;
//                    var rowsPerPage = table.page.info().length;
//                    return (0 * rowsPerPage) + meta.row + 1;
//                }
//            },
//            {
//                data: "Registration Date",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "Reg No",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "Name",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "DOB",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "Class Applied",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationName
//                }
//            },
//            {
//                data: "Father Name",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.classificationName + '<input type="text" value=' + row.instanceSubclassificaitionId + ' hidden/>'
//                }
//            },
//            {
//                data: "Mother name",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.subClassificationDescription
//                }
//            },
//            {
//                data: "Mobile number",
//                render: function (data, type, row, meta) {
//                    //  length++;
//                    return row.classTeacher
//                }
//            },
//            {
//                data: "Email Id",
//                render: function (data, type, row, meta) {
//                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
//                }
//            },
//            {
//                data: "DOJ",
//                render: function (data, type, row, meta) {
//                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
//                }
//            }
//        ]
//    });
//}


/////===>>> 1St Table "id:-Admissionsreporttbl" EXPORT TO EXCEL  BUTTON EVENT CODE START
//$('#Admissionreportexporttoexcel').on('click', function () {
//    //var formattedDate = GetDateFormat();

//    debugger;
//    var Forthesessiontext = document.getElementById("Acadamicyeariddd").textContent;

//    var headerContent = `
//            <div style="display: grid; grid-template-columns: repeat(18, 1fr);">
//                <div style="grid-column: 1 / span 18;">
//                     <h4 style="margin: 0; text-align: center;">Admission Report</h4>
//                     <h4 style="margin: 0; text-align: center;">Quro Schools</h4>
//                     <h4 style="margin: 0; text-align: center;">For the Session : ${Forthesessiontext}</h4>
//                </div>
//            </div>`;

//    var table1 = document.getElementById("Admissionsreporttbl");
//    var table1Clone = table1.cloneNode(true);

//    table1Clone.style.border = "1px solid black";
//    table1Clone.style.color = "black";
//    table1Clone.style.backgroundColor = "white";

//    var cells = table1.getElementsByTagName("td");
//    for (var i = 1; i < cells.length; i++) {

//        //if (cells[i].style.display === "none") { // Check if the td element has the hidden attribute             
//        //    cells[i].remove();
//        //} else {
//        //cells[i].style.borderTop = "1px solid black";
//        //cells[i].style.borderRight = "1px solid black";
//        //cells[i].style.borderBottom = "1px solid black";
//        //cells[i].style.borderLeft = "1px solid black";
//        cells[i].style.border = "1px solid black";
//        cells[i].style.borderColor = "black";
//        //}
//    }

//    var FooterContent = `
//      <div style="grid-column: 1 / span 10; background-color: #e0e0e0; padding: 20px; border-radius: 5px;">
//        <p style="margin: 0; text-align: center;">This report contains confidential information intended solely for the recipient. Unauthorized use, copying, or distribution is strictly prohibited.</p>
//      </div>
//      `;
//    document.body.appendChild(table1Clone);

//    var combinedHtml = headerContent + table1Clone.outerHTML + FooterContent;
//    //var combinedHtml = headerContent + table1Clone.outerHTML;

//    const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
//    saveAs(blob, 'Admissionsummaryreport.xls');

//    // Replace the original table with the cloned table in the document
//    table1.parentNode.replaceChild(table1Clone, table1);
//});

/////===>>> 2nd table "id:-AdmissionreportResultstbl" Export to excel Button event code start
//$('#Admissionreportexcel').on('click', function () {
//    //var formattedDate = GetDateFormat();

//    debugger;
//    var Forthesessiontext = document.getElementById("Acadamicyeariddd").textContent;

//    var headerContent = `
//            <div style="display: grid; grid-template-columns: repeat(18, 1fr);">
//                <div style="grid-column: 1 / span 18;">
//                     <h4 style="margin: 0; text-align: center;">Admission Report</h4>
//                     <h4 style="margin: 0; text-align: center;">Quro Schools</h4>
//                     <h4 style="margin: 0; text-align: center;">For the Session : ${Forthesessiontext}</h4>
//                </div>
//            </div>`;

//    var table1 = document.getElementById("AdmissionreportResultstbl");
//    var table1Clone = table1.cloneNode(true);

//    table1Clone.style.border = "1px solid black";
//    table1Clone.style.color = "black";
//    table1Clone.style.backgroundColor = "white";

//    var cells = table1.getElementsByTagName("td");
//    for (var i = 1; i < cells.length; i++) {

//        //if (cells[i].style.display === "none") { // Check if the td element has the hidden attribute             
//        //    cells[i].remove();
//        //} else {
//        //cells[i].style.borderTop = "1px solid black";
//        //cells[i].style.borderRight = "1px solid black";
//        //cells[i].style.borderBottom = "1px solid black";
//        //cells[i].style.borderLeft = "1px solid black";
//        cells[i].style.border = "1px solid black";
//        cells[i].style.borderColor = "black";
//        //}
//    }

//    var FooterContent = `
//      <div style="grid-column: 1 / span 10; background-color: #e0e0e0; padding: 20px; border-radius: 5px;">
//        <p style="margin: 0; text-align: center;">This report contains confidential information intended solely for the recipient. Unauthorized use, copying, or distribution is strictly prohibited.</p>
//      </div>
//      `;
//    document.body.appendChild(table1Clone);

//    var combinedHtml = headerContent + table1Clone.outerHTML + FooterContent;
//    //var combinedHtml = headerContent + table1Clone.outerHTML;

//    const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
//    saveAs(blob, 'Registrationuserdetailsreport.xls');

//    // Replace the original table with the cloned table in the document
//    table1.parentNode.replaceChild(table1Clone, table1);
//});

//function GetDateFormat() {
//    var currentDate = new Date();
//    var year = currentDate.getFullYear();
//    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
//    var day = currentDate.getDate().toString().padStart(2, '0');

//    var formattedDate = day + '-' + month + '-' + year;
//    return formattedDate;
//}




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
    debugger;
    BindInstanceDropdown();
    BindAcadamiceyeardropdown();
    BindClassdropdown();
    Pageloadtbldata();


});

function Pageloadtbldata() {
    handleAjax('GET', "/Reports/Quroadmissionreportscounttbl", null,
        function (resp) {
            debugger;
            loaddingimg.css('display', 'none');
            Bindsearchtbl(resp);           
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
}

function Bindsearchtbl(response) {

    debugger;
    //var formattedDate = Dateformate();

    $("#Recordcountstbl").text(response.length);
    //var Selectedyear = $('#ddlAcademicYearId').val();

    var table = $('#Admissionscounttbl').DataTable();
    table.destroy();

    var newTable = $("#Admissionscounttbl").DataTable({
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
                        debugger;
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
                    } else {
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

$('#Admissionsreportform').submit(function (event) {

    event.preventDefault();
    setTimeout(function () {

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        DatesCompare("From date", "To date");

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {


            var formData = $('#Admissionsreportform').serialize();
            //var formData = new FormData($('#ConfirmAdmissions_searchform')[0]);

            handleAjax('GET', "/Admin/Quroadmissionreportscounttbl", formData,
                function (resp) {
                    debugger;
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

function BindInstanceDropdown() {
    CommonDropdownAjaxFunction("ddlInstances", "GET", "/Reports/GetInstancenamesDropdown", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

function BindAcadamiceyeardropdown() {
    CommonDropdownAjaxFunction("ddlAcadamicyear", "GET", "/Reports/GetAcademicYearDropdown", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

function BindClassdropdown() {
    CommonDropdownAjaxFunction("ddlClass", "GET", "/Reports/GetAllClass", null, function (resp) {
        loaddingimg.css('display', 'none');
    }, true);
}

$("#ddlAcadamicyear").change(function () {
    debugger;
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
        debugger;
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


$(document).on('click', '#Admissionscounttbl td:nth-child(3)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Instanceid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#Admissionsreporttbl').DataTable();
    //tabletargetpagetblSEMsearchresults = table.page.info().page;
    
    var data = { "InstanceId": Instanceid, "Userstatusvalue": "1" };

    handleAjax('GET', "/Reports/Registrations_Admissionstbl", data,
        function (resp) {
            debugger;
            loaddingimg.css('display', 'none');
            RegistartionDetails(resp);
            $('#RegisterAdmissiontbldiv').show();
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
})


function RegistartionDetails(response) {
    $("#Registrationstblcount").text(response.filteredList.length);
    var Statusvalue = response.userStatusValue;

    $('#Registrationstbldiv').show();
    $('#RegistartionreportResultstbl').hide();

    var table = $('#AdmissionreportResultstbl').DataTable();
    table.destroy();

    var newTable = $("#AdmissionreportResultstbl").DataTable({
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
                        debugger;
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
                    } else {
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
        //data: response,
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
            }
        ]
    });

}


$(document).on('click', '#Admissionscounttbl td:nth-child(4)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Instanceid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#Admissionsreporttbl').DataTable();
    //tabletargetpagetblSEMsearchresults = table.page.info().page;

    var data = { "InstanceId": Instanceid, "Userstatusvalue": "2" };

    handleAjax('GET', "/Reports/Registrations_Admissionstbl", data,
        function (resp) {
            debugger;
            loaddingimg.css('display', 'none');
            AdmissionsRegistrationDetails(resp);
            $('#RegisterAdmissiontbldiv').show();
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

    $('#Registrationstbldiv').show();
    $('#Admissiontbldiv').hide();

    var table = $('#RegistartionreportResultstbl').DataTable();
    table.destroy();
    var newTable = $("#RegistartionreportResultstbl").DataTable({
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
                        debugger;
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
                    } else {
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
        //data: response,
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
                    // Check if row.doj exists and is not null or undefined
                    if (row.doj && row.doj !== null && row.doj !== undefined) {
                        return row.doj;
                    } else {
                        return ""; 
                    }
                }
                //data: "DOJ",
                //render: function (data, type, row, meta) {
                //    return row.doj
                //}
            }
        ]
    });   
}

