﻿function CallToAjax_Withoutdata(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}
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



$(document).ready(function () {
    function CallToAjax_Withoutdata(method, url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: method,
            success: successCallback,
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }
    function CallToAjax(method, url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: method,
            success: bindDatatables,
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }


    fetchDataAndPopulateDropdown(
        '/Admin/InstanceClassification_DD', // URL for data fetching
        '#Classificationdd_Search',  // Dropdown selector
        'instanceClassificationId',  // Field name for option values
        'classificationName',         // Field name for option text
        'classificationList'          // Response value return class name
    );


    //CallToAjax_Withoutdata('GET', '/Admin/Classification_dd',
    //    function (response) {

    //        populateClassificationDropdown(response.classificationList);
    //       // populateRoleDropdown(response.roleList);
    //    },
    //    function (status, error) {
    //        // Handle errors here...!
    //    }
    //);

    //function populateClassificationDropdown(classificationList) {
    //    var classificationDropdown = $('#Classificationdd_Search');
    //    $.each(classificationList, function (index, item) {
    //        classificationDropdown.append($('<option>', {
    //            value: item.instanceClassificationId, 
    //            text: item.classificationName 
    //        }));
    //    });
    //}
 


    CallToAjax('GET', '/Admin/Subclass_Tabledata',

        function (status, error) {

        }
    );
       
});

///-----------******* DROPDOWN FUNCTION CODE START
function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField,Responsevalues) {
    CallToAjax_Withoutdata('GET', url,
        function (response) {
            debugger;
            var dataToPopulate = Array.isArray(response) ? response : response[Responsevalues] || [];
            populateDropdown(dataToPopulate , dropdownSelector, valueField, textField);
        },
        function (status, error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        }
    );
}

function populateDropdown(data, dropdownSelector, valueField, textField) {
    var dropdown = $(dropdownSelector);
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



///-----***** MAIN CLASSIFICATION SEARCH TABLE DATA
$('#Mainview_Searchbtn').click(function () {
    SearchSubclassifications();
});

function SearchSubclassifications() {
    var DepartName = $('#DepartName_txtid').val();
    var Description = $('#Descriptiontxtid').val();
    debugger;
    var dataToSend = {
        ClassificationName: DepartName,
        ClassificationDescription: Description
    };

    TblCallToAjax('GET', '/Admin/Subclass_Tabledata', dataToSend,

        //function bindDatatables();
        function (status, error) {
            // Handle error if needed
        }
    );
}

//-----------------DataTable Data Dinding Function
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

function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}



///------*** CREATE NEW SUBCLASSIFICATION ***-------
$('#addnewsubclass').click(function () {
    debugger;
     //----Classification dropdown
    fetchDataAndPopulateDropdown(
        '/Admin/InstanceClassification_DD',   // URL for data fetching
        '#In_Subclassificationdd',    // Dropdown selector
        'instanceClassificationId',   // Field name for option values
        'classificationName',         // Field name for option text
        'classificationList'          // Response value return class name
    );
     
    //----ClassTeacher dropdown
    fetchDataAndPopulateDropdown(
        '/Admin/Subclass_Classteacher_DD',  // URL for data fetching
        '#In_ClassTeacherdd',     // Dropdown selector
        'userId',                 // Field name for option values
        'userName',               // Field name for option text
        'classteacherList'        // Response value return class name
    );
  
    //----Co-Class Teacher
    fetchDataAndPopulateDropdown(
        '/Admin/Subclass_CoClassteacher_DD',  // URL for data fetching
        '#In_CoClassTeacherdd',     // Dropdown selector
        'userId_CO',                   // Field name for option values
        'userName_CO',                 // Field name for option text
        'coClassteacherList'          // Response value return class name
    );

    CallToAjax_Withoutdata('GET', '/Admin/Insert_ManageSubClassification',
        function (response) {
            debugger;
            $('#ManageSubclassification_Containermaindiv').hide(); 
            $('#ManageSubclassification_Updatecontainerdiv3').empty();
            $('#ManageSubclassification_Insertcontainerdiv2').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
});


$('#IN_Clearbtn').click(function () {
    //$('#Insertclassificationid')[0].reset();
    $('#Class_insertformid')[0].reset();
});

$('#IN_BackToSearchbtn').click(function () {
    location.reload();
});




///-----**** INSERTING CLASSES ***-----
$('#Class_insertformid').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            debugger;
            var formData = $('#Class_insertformid').serialize();
           // var TitleValue = $('#Title').val();
    //debugger;
    //setTimeout(function () {
    //    var validationMessages = $('.field-validation-error');
    //    var validationMessages2 = $('.error2');

    //    var validationmelength = validationMessages.length;

    //    if (validationmelength == 0 && validationMessages2.length == 0) {
    //        debugger;
    //        var formData = $('#Class_insertformid').serialize();
    //        var TitleValue = $('#Title').val();
            $.ajax({
                url: '/Admin/Insert_ManageSubClassification_',
                type: 'POST',
                data: formData,
                success: function (response) {
                    debugger;
                    if (response === "Inserted") {
                        $('#Insert_Clearbtn, #Insert_Savebtn').prop('disabled', true);
                        $('#Insert_Clearbtn, #Insert_Savebtn').removeClass("btn btn-pill btn-air-success")
                        $('#Errormessages').text('Record inserted successfully.');
                    } else if (response === "Not Inserted") {
                        $('#Errormessages').text('Record insert Unsuccessfull');
                    } else if (response === "Exists") {
                        $('#Errormessages').text('Department with Name ' + ' " ' + TitleValue + ' " ' + ' already exists.');
                    } else {
                        $('#Errormessages').text('An error occurred.');
                    }
                },
                error: function (xhr, status, error) {
                    errorCallback(xhr.status, error);
                }
            });
        }
    }, 50);
});








// Function to populate the classification dropdown
function populateClassificationDropdown(classificationList) {
    var classificationDropdown = $('#classificationDropdown');
    $.each(classificationList, function (index, item) {
        classificationDropdown.append($('<option>', {

            value: item.instanceClassificationId, // Replace with your value property from JSON
            text: item.classificationName // Replace with your text property from JSON
        }));
    });
}


// Function to populate the role dropdown
function populateRoleDropdown(roleList) {
    var roleDropdown = $('#roleDropdown');
    $.each(roleList, function (index, item) {
        roleDropdown.append($('<option>', {
            value: item.instanceRoleId, // Replace with your value property from JSON
            text: item.roleName // Replace with your text property from JSON
        }));
    });
}



//------******DEPARTMENT BASEB ON CLASS DROPDOWN FUNCTION CODE START
$('#classificationDropdown').change(function () {
    var selectedValue = $(this).val();
    // CallToAjax_Withoutdata('GET', '/Admin/Adding_BestPerformer_dds',
    var datatosend = {
        InstanceClassificationId: selectedValue
    };
    DataCallToAjax('GET', '/Admin/Adding_BestPerformer_Subclassification_dd', datatosend,
        function (response) {

            populateSubclassificationDropdown(response.subclassificationList);
            //populateRoleDropdown(response.roleList);
        },
        function (status, error) {
            // Handle errors here...!
        }
    );
});