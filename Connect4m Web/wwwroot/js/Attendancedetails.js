
function CallToAjax(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

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

$(document).ready(function () {

    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/Attendance/Attendancedetailsdepartment',     // URL for data fetching
        '#Ddldepartment',                 // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
});

function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    debugger;
    CallToAjax('GET', url,
        function (response) {

            debugger;
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
    debugger;
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
$('#Ddldepartment').change(function () {
    var ClassificationId = $('#Ddldepartment').val();
    //var SubClassificationId = $('#DdlSubClass').val();
    // var FilterTeachingSubjects = 0;
    debugger;
    Departmentbysubclassdd(ClassificationId);
});

function Departmentbysubclassdd(Departmentvalue) {
    $.ajax({
        url: '/Attendance/AttendancedetailsSubClass?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#DdlSubClass';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}
$('#DdlSubClass').change(function () {
    var ClassificationId = $('#Ddldepartment').val();
    var SubClassificationId = $('#DdlSubClass').val();
    Classwisestudentnames(ClassificationId, SubClassificationId);

    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/Attendance/AttendancedetailsSlot',                // URL for data fetching
        '#Slotddl',                                         // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );

});


function Classwisestudentnames(Departmentvalue, SubClassificationId) {
    $.ajax({
        url: '/Attendance/Classwisestudents?InstanceClassificationId=' + Departmentvalue + "&InstanceSubClassificationId=" + SubClassificationId,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#Studentnamesddl';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}




$('#Attendancedetailsform').on('submit', function () {
    event.preventDefault();
    event.stopImmediatePropagation();
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;
        var radiobuttonvalue = $("input[class='form-check-input']:checked").val();
        var bFlagForDisplay = $("input[name='bFlagForDisplay']:checked").val();
        if (typeof bFlagForDisplay === "undefined") {
            $('#bFlagForDisplayvalidationmessages').text("Display only for is required");
            return;
        } else {
            $('#bFlagForDisplayvalidationmessages').text('');
        }
        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            $('#bFlagForDisplayvalidationmessages').text('');
            loaddingimg.css('display', 'block');
            var formData = $('#Attendancedetailsform').serialize();
            var url = "/Attendance/Get_Attendance_Details_Tbl";

            handleAjax('GET', url, formData,
                function (response) {
                    debugger;
                    $("#User_Attendance_Tbl").html(response);
                    loaddingimg.css('display', 'none');

                },
                function (status, error) {
                    debugger;
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                },
                true
            );
        }
    }, 50);
});

function bindDatatables(response) {

    var formattedDate = GetDateFormat();
    debugger;
    var table = $('#ManageSubclassificationtbl').DataTable();
    table.destroy();
    $("#Subclassification_Recordscount").text(response.length);


    var newTable = $("#ManageSubclassificationtbl").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdfHtml5',
                title: 'Manage Class', // Title for the Excel file
                messageTop: 'ADS SCHOOL', // Additional message
                message: "Report On: " + formattedDate,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4] // Adjust column indexes based on your DataTable
                }
            },
            {
                extend: 'excel',
                text: 'Excel', // Button text
                title: 'Manage Class', // Title for the Excel file
                messageTop: 'ADS SCHOOL', // Additional message
                message: "Report On: " + formattedDate,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4] // Adjust column indexes based on your DataTable
                },
                customize: function (xlsx) {
                    const sheet = xlsx.xl.worksheets['sheet1.xml'];

                    // Check if the sheet exists and has the range defined
                    if (sheet && sheet.sheetData && sheet.sheetData[0]) {
                        const range = sheet.sheetData[0].attributes['!ref'].value;

                        for (let col = 0; col < 6; col++) { // Assuming 6 columns, adjust as needed
                            const colLetter = String.fromCharCode(65 + col); // Convert column index to Excel column letter

                            for (let row = 1; row <= 100; row++) { // Iterate through rows, adjust the range as needed
                                const cellRef = colLetter + row;
                                const cell = $('c[r="' + cellRef + '"]', sheet);

                                // Add black border to each cell in each column
                                cell.attr('s', '42');
                            }
                        }
                    } else {
                        console.error('Sheet or range not found.'); // Log an error if the sheet or range is not found
                    }
                }
            },

            {
                extend: 'print',
                title: 'Manage Class', // Title for the Excel file
                messageTop: 'ADS SCHOOL', // Additional message
                message: "Report On: " + formattedDate,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4] // Adjust column indexes based on your DataTable
                },
                customize: function (win) {
                    $(win.document.body)
                        .find('h4')
                        .css('text-align', 'center'); // Center align the title

                    $(win.document.body)
                        .find('h5')
                        .css('text-align', 'center'); // Center align the additional message
                }
            }
            //{
            //    extend: 'pdfHtml5',
            //    title: 'Manage Subclassification Report',
            //    message: "Report On: " + formattedDate,
            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },
            //},
            //{
            //    extend: 'excel',
            //    title: 'Manage Subclassification Report',
            //    message: "Report On: " + formattedDate,

            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    }
            //},
            //{
            //    extend: 'print',
            //    title: 'Manage Subclassification Report',
            //    message: "Report On: " + formattedDate,
            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    }
            //}

        ],

        bProcessing: false,
        bLengthChange: true,
        /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
        bfilter: false,
        bSort: true,
        searching: false,
        //scrollX: true,
        //scrollY: '400px',
        /* scrollCollapse: true,*/
        paging: true,
        bPaginate: true,
        //  stateSave:true,
        data: response,
        columns: [

            //{
            //    data: "SNO",
            //    //visible: false,

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
                data: "SubClassificationName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.subClassificationName

                }
            },
            {
                data: "ClassificationName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.classificationName + '<input type="text" value=' + row.instanceSubclassificaitionId + ' hidden/>'

                }
            },
            {
                data: "SubClassificationDescription",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.subClassificationDescription

                }
            },
            {
                data: "ClassTeacher",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.classTeacher

                }
            },
            {

                data: "instanceClassificationId",

                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                }
            }
        ]
    });


    table.on('draw', function () {
        $('#ManageSubclassificationtbl').find('td:nth-child(2)').attr('title', 'Edit');
    });
    $('#ManageSubclassificationtbl').find('td:nth-child(2)').attr('title', 'Edit');
}