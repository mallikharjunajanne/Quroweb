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

function TblCallToAjax(method, url,  successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        /*data: data,*/
        success: bindDatatables,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}
function CallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data:data,
        success: bindDatatables,
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
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };

    //if (hasFileUpload) {
    //    ajaxOptions.processData = false;
    //    ajaxOptions.contentType = false;
    //}

    $.ajax(ajaxOptions);
}


$(document).ready(function () {
    debugger;
    $('#In_Subclassificationdd').empty;
    $('#In_ClassTeacherdd').empty;
    $('#In_CoClassTeacherdd').empty;


    fetchDataAndPopulateDropdown(
        '/Admin/InstanceClassification_DD',      // URL for data fetching
        '#ddldepartmentid',                      // Dropdown selector      
        'instanceClassificationId',              // Field name for option values
        'classificationName',                    // Field name for option text
        'classificationList'                     // Response value return class name
    );                                           // In Search view Dropdown data bind calling function
    Subclasstabledatabinding();// Subclass table data calling function
});









// DROPDOWN FUNCTION CODE START
function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField,Responsevalues) {
    CallToAjax_Withoutdata('GET', url,
        function (response) {            
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
    //dropdown.empty(); // Clear existing options

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

//Search table data fucntion code start
$('#btnsearch').click(function () {
    debugger;

    $('#Errmsg').text('');
    var formdata = $('#Classificaitionformid').serialize();
    var InstanceClassificationId = $('#ddldepartmentid').val();
    var SubClassificationName = $('#txtclassid').val();
    var SubClassificationDescription = $('#txtdescrid').val();

    var sendData = {
        'InstanceClassificationId': InstanceClassificationId,
        'SubClassificationName': SubClassificationName,
        'SubClassificationDescription': SubClassificationDescription
    };
    
    CallToAjax('GET', '/Admin/Subclass_Tabledata', sendData,

        function (status, error) {

        }
    );

});






//-----------------DataTable Data Dinding Function
function Subclasstabledatabinding() {
    TblCallToAjax('GET', '/Admin/Subclass_Tabledata',

        function (status, error) {

        }
    );
}
function bindDatatables(response) {
    debugger;
    var formattedDate = GetDateFormat();
    debugger;
    var table = $('#ManageSubclassificationtbl').DataTable();
    table.destroy();
    $("#Subclassification_Recordscount").text(response.length); 


    var newTable = $("#ManageSubclassificationtbl").DataTable({
        dom: 'Bfrtip',
        buttons: [ ],

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
        $('#ManageSubclassificationtbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
            color: 'black',
            'text-decoration': 'underline',
            cursor: 'pointer',
            fontWeight: 'bold'
        });
    });
    $('#ManageSubclassificationtbl').find('td:nth-child(2)').attr('title', 'Edit').attr('title', 'Edit').css({
        color: 'black',
        'text-decoration': 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
}
function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}


$('#exportToExcel').click(function () {
    var InstanceClassificationId = $('#ddldepartmentid').val();
    var SubClassificationName = $('#txtclassid').val();
    var SubClassificationDescription = $('#txtdescrid').val();

    var sendData = {
        'InstanceClassificationId': InstanceClassificationId,
        'SubClassificationName': SubClassificationName,
        'SubClassificationDescription': SubClassificationDescription
    };
    handleAjax('GET', '/Admin/Subclassexporttoexcel', sendData,
        function (response) {
            debugger;
            const startColumn = 'A';
            const endColumn = 'N';
            const startColumnIndex = 13;
            var data = response;
            const rowCount = data.length;
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Sheet1');
            var formattedDate = GetDateFormat();
            worksheet.addRow(["Manage Class "]).font = { bold: true };
            worksheet.addRow(["Quro Schools"]).font = { bold: true };
            worksheet.addRow(["Report On:  " + formattedDate]).font = { bold: true };
            worksheet.addRow([""]).font = { bold: false };
           

            // Enable worksheet protection
            worksheet.protection = {
                sheet: true
            };
            worksheet.protection.IsProtected = true;
            worksheet.protection.AllowSelectLockedCells = false;

            // Count the number of rows in the worksheet
            
            var headings = [
                'S.No',
                'Department',
                'Class',
                'Description',
                'Attendance Effecive Date',
                'Attendance End Date',
                'Class Teacher',
                'Class Teacher Emp Code',
                'Class Teacher Mobile Phone',
                'Class Teacher Email',
                'Co-Class Teacher',
                'Co-Class Teacher Emp Code',
                'Co-Class Teacher Mobile Phone',
                'Co-Class Teacher Email'
            ];
         
            worksheet.addRow(headings);

            var sno = 1; // Initialize the serial number
            data.forEach(function (row) {
                var rowData = [];
                rowData.push(sno++);
                rowData.push(row.classificationName);
                rowData.push(row.subClassificationName);
                rowData.push(row.subClassificationDescription);
                rowData.push(row.startDate);
                rowData.push(row.endDate);
                rowData.push(row.classTeacher);
                rowData.push(row.classteacherempcode);
                rowData.push(row.classteachermobile);
                rowData.push(row.classteacheremail);
                rowData.push(row.coClassTeacher);
                rowData.push(row.coclassteacherempcode);
                rowData.push(row.coclassteachermobile);
                rowData.push(row.coClassteacheremail);
                worksheet.addRow(rowData);
            });

            for (var rowNum = 1; rowNum <= 3; rowNum++) {
                // Get the row
                const row = worksheet.getRow(rowNum);

                // Iterate over each cell in the row
                row.eachCell(function (cell) {
                    // Apply cell styles
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: '000000' }, // Black background color
                    };
                    cell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Bold white font color
                    cell.alignment = { horizontal: 'center' }; // Align center horizontally
                });
                worksheet.mergeCells(`A${rowNum}:N${rowNum}`);
                //worksheet.mergeCells('A1:N1');
            }
            worksheet.mergeCells('A4:N4');

            worksheet.getRow(5).eachCell(function (cell) {
                // Customize cell styles for headings here
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '000000' }, // Example background color (black)
                };
                cell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Example font style (bold, white color)

            });

            // Customize cell styles for data rows
            worksheet.eachRow(function (row, rowNumber) {
                if (rowNumber > 1) { // Skip the first row (headings)
                    row.eachCell(function (cell, colNumber) {
                        if (colNumber == 2) {
                            let maxLength = 0;
                            worksheet.getColumn(colNumber).eachCell({ includeEmpty: true }, function (cell) {
                                const length = cell.value ? cell.value.toString().length : 0;
                                maxLength = Math.max(maxLength, length);
                            });
                            // Set the width of the column based on the maximum length of its cells
                            worksheet.getColumn(colNumber).width = maxLength > 0 ? maxLength + 2 : 10;

                            //if (colNumber >= startColumnIndex) {
                            //    cell.style.fill = {
                            //        type: 'pattern',
                            //        pattern: 'solid',
                            //        fgColor: { argb: 'FFFFFF' } // White color
                            //    };
                            //}
                        }
                        else {
                            cell.width = 20;
                        }
                    });
                }               
            });

           /* var rowCount = response.length;*/

            // Loop through rows after the data rows
            //for (var i = rowCount + 2; i <= worksheet.rowCount; i++) {
            //    var row = worksheet.getRow(i);
            //    // Loop through cells in the row and set background color to white
            //    row.eachCell(function (cell) {
            //        cell.style.fill = {
            //            type: 'pattern',
            //            pattern: 'solid',
            //            fgColor: { argb: 'FFFFFF' } // White color
            //        };
            //    });
            //}

         

            workbook.xlsx.writeBuffer().then(function (buffer) {
                var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // Create a download link
                var link = document.createElement("a");
                link.href = URL.createObjectURL(blob);

                // Set the file name
                link.download = "Manage Class.xls";

                // Append the link to the document and trigger the click event
                document.body.appendChild(link);
                link.click();

                // Remove the link from the document
                document.body.removeChild(link);
            });



        },
        function (status, error) {
            // Handle errors
        }
    ); 
});











//-------------------------------------   Click For Update in the list(table)
$(document).on('click', '#ManageSubclassificationtbl td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Subclassid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#ManageSubclassificationtbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    EditSubclassification(Subclassid);
})
function EditSubclassification(Subclassid) {

    $.ajax({
        url: '/Admin/Update_ManageSubClassification?InstanceSubClassificationId=' + Subclassid,
        type: 'GET',
        success: function (response) {
            debugger;
            $('#ManageSubclassification_Containermaindiv').hide();
            $('#ManagesubclassificationInsertUpdatediv').html(response);
        },
        error: function (xhr, status, error) {
            $('#ManageSubclassification_Containermaindiv').show();
            $('#ManagesubclassificationInsertUpdatediv').empty();
        }
    });
}



//------FA FA TRASH ICON DELETE FUNCTION
$(document).on('click', '#ManageSubclassificationtbl .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Subclassid = $(parent).find('td').find('input[type="text"]').val();
    var Subclassname = $(parent).find('td:first').text().trim();
    var table = $('#ManageSubclassificationtbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    Deletefunction(Subclassid, Subclassname);
})



/////------*** CREATE NEW SUBCLASSIFICATION ***-------
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
            $('#ManagesubclassificationInsertUpdatediv').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
});










/////-----**** INSERTING CLASSES ***-----
$('#Insertclassformid').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        $('#Errormessages').text('');

        var validationmelength = validationMessages.length;
      
        if (validationmelength == 0 && validationMessages2.length == 0) {
            debugger;
            var formData = $('#Insertclassformid').serialize();
            var Subclassname = $('#Subclass_txtid').val();
            var Displayorder = $('#Displayordertxtid').val();
            if (Displayorder == "0") {
                $('#Errormessages').text('Display Order cannot be Zero.');
                return;
            }

            var url = '/Admin/Insert_ManageSubClassification';
            handleAjax('POST', url, formData,
                function (response) {
                    debugger;                  
                    if (response == "2") {
                        $('#Errormessages').text("Attendance Effective Date and Attendance End Date should be with in the period of Department 's Effective Date and End Date.");
                    } else if (response == "4") {
                        $('#Errormessages').text("You can't create a new 'SubClassificationName' as the Class Teacher is Associated to other '" + ViewState("SubClassificationName") + "'.");
                    } else if (response == "0") {
                        $('#Errormessages').text('SubClassificationName with Name ' + ' " ' + Subclassname + ' " ' + ' already exists.');
                    } else if (response == "5") {
                        $('#Errormessages').text('Display Order Already Exists.');
                    } else if (response == "") {
                        $('#Errormessages').text('An error occurred.');
                    } else {
                        $('#btnclear, #btnsubmit').prop('disabled', true);
                        $('#Errormessages').text('Record inserted successfully.');
                    }
                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );
        }
    }, 50);
});


$('#btnBackToSearch').click(function () {
    $('#Errormessages').text('');
    location.reload();
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





//CLEAR FUCNTION
function Clearcommonfunction(Formid, ErrorMessageSpanId) {
    document.getElementById(Formid).reset(); // Reset the form 
    if (ErrorMessageSpanId) {
        document.getElementById(ErrorMessageSpanId).innerText = '';
    }
}




$('#Discount_TypeDDId').change(function () {
    var ConcedingTypeId = $('#Discount_TypeDDId').val();
    //Feetypedropdwonfunction(ConcedingTypeId);
    handleAjax('GET', '/FeeSection/pfudiscounttypebydiscountamount', { ConcedingTypeId: ConcedingTypeId },
        function (response) {
            debugger;
            $('#DiscountAmount_TXTID').text(response[0].text).val(response[0].text);
        },
        function (status, error) {


        }, false);
});



function updateCharCount() {
    // Get the textarea element
    var textarea = document.getElementById("description_txt");

    // Get the element to display character count
    var charCount = document.getElementById("char-count");

    // Calculate remaining characters
    var remaining = 1000 - textarea.value.length;

    // Update the character count display
    charCount.textContent = remaining +" Remaing characters";
}

//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {
        debugger;
        var Startdate = new Date($("#Effectivedatetxtid").val());
        var Enddate = new Date($("#Enddatetxtid").val());

        if (Enddate.getTime() === Startdate.getTime()) {
            $('#Errormessages').text("End date and Start date cannot be the same.");
        } else if (Enddate < Startdate) {
            $('#Errormessages').text("End date should be greater than Start date.");
        } else {
            $('#Errormessages').text("");
        }       
    } catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$("#Effectivedatetxtid").on("change", function () { DatesCompare("Attendance Effective Date", "Attendance End Date"); });
$("#Enddatetxtid").on("change", function () { DatesCompare("Attendance Effective Date", "Attendance End Date"); });



$('#btndelete').click(function () {
    event.stopImmediatePropagation();
    var confirmed = confirm("Are you sure you want to delete Class?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        var Subclassificationid = $('#InstanceSubclassificaitionId').val();
        var SubClassificationName = $('#Subclass_txtid').val();
        var datatosend = {
            InstanceSubClassificationId: Subclassificationid
        };
        handleAjax('GET', '/Admin/Delete_ManageSubClassification', datatosend,
            function (response) {
                if (response == "0") {
                    $('#Errormessages').text("You can't delete" + SubClassificationName + "as Users are already Associated.");
                } else if (response == "-2") {
                    $('#Errormessages').text("Elective subjects are associated with" + SubClassificationName + ".");
                } else if (response == "-3") {
                    $('#Errormessages').text("Academic subjects are associated with" + SubClassificationName + ".");
                } else if (response == "-4") {
                    $('#Errormessages').text("Timetable has created for this" + SubClassificationName + ".");
                } else if (response == "-5") {
                    $('#Errormessages').text("Users have been created for this" + SubClassificationName + ".");
                } else if (response == "1") {
                    $('#Errmsg').text("Record deleted successfully.");
                    fetchDataAndPopulateDropdown(
                        '/Admin/InstanceClassification_DD',      // URL for data fetching
                        '#ddldepartmentid',                      // Dropdown selector                        
                        'instanceClassificationId',              // Field name for option values
                        'classificationName',                    // Field name for option text
                        'classificationList'                     // Response value return class name
                    );                                           // In Search view Dropdown data bind calling function
                    $('#ManageSubclassification_Containermaindiv').show();
                    $('#ManagesubclassificationInsertUpdatediv').empty();

                } else {
                    $('#Errormessages').text("Please try again.");
                }
            },
            function (status, error) {
                
            }
        );
    }
});


function Deletefunction(Subclassificationid, SubClassificationName) {
    var confirmed = confirm("Are you sure you want to delete Class?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        var datatosend = {
            InstanceSubClassificationId: Subclassificationid
        };
        handleAjax('GET', '/Admin/Delete_ManageSubClassification', datatosend,
            function (response) {
                if (response == "0") {
                    $('#Errormessages').text("You can't delete" + SubClassificationName + "as Users are already Associated.");
                } else if (response == "-2") {
                    $('#Errormessages').text("Elective subjects are associated with" + SubClassificationName + ".");
                } else if (response == "-3") {
                    $('#Errormessages').text("Academic subjects are associated with" + SubClassificationName + ".");
                } else if (response == "-4") {
                    $('#Errormessages').text("Timetable has created for this" + SubClassificationName + ".");
                } else if (response == "-5") {
                    $('#Errormessages').text("Users have been created for this" + SubClassificationName + ".");
                } else if (response == "1") {
                    $('#Errmsg').text("Record deleted successfully.");
                    Subclasstabledatabinding();
                    $('#ManageSubclassification_Containermaindiv').show();
                    $('#ManagesubclassificationInsertUpdatediv').empty();
                } else {
                    $('#Errmsg').text("Record can't be deleting.");
                }
            },
            function (status, error) {

            }
        );
    }
}


//  UPDATE SUBCLASS BUTTON CLICK FIRE CODE START
$('#Updateclassformid').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        $('#Errormessages').text('');
        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            debugger;
            var formData = $('#Updateclassformid').serialize();
            var Subclassname = $('#Subclass_txtid').val();         
            var Classname = $('#Classificationtxtid option:selected').text();
            var isactive = $('#Isactivechk').is(':checked') ? "1" : "0";
          
            var Displayorder = $('#Displayordertxtid').val();
            if (Displayorder == "0") {
                $('#Errormessages').text('Display Order cannot be Zero.');
                return;
            }

            formData += '&IsActive=' + isactive;
            var url = '/Admin/Update_ManageSubClassification';
            handleAjax('POST', url, formData,
                function (response) {
                    debugger;
                    if (response == "3") {
                        $('#Errormessages').text("Attendance Effective Date and Attendance End Date should be with in the period of" + Classname + "s Effective Date and End Date.");
                    } else if (response == "4") {
                        $('#Errormessages').text("You can't update " + Subclassname + " as the Class Teacher is Associated to othere " + Subclassname + ".");
                    } else if (response == "0") {
                        $('#Errormessages').text('Class with Name "' + Subclassname + '" already exists or the Attendance End Date can\'t be greater than ' + Classname + '\'s Attendance End Date.');
                    } else if (response == "5") {
                        $('#Errormessages').text('Display Already Exists.');
                    } else if (response == "") {
                        $('#Errormessages').text('An error occurred.');
                    } else if (response == "2") {
                        $('#Errormessages').text("You can't update " + Subclassname + " as already marks are posted or Users are already Associated.");
                    } else if (response == "1") {
                        $('#btnclear, #btnsubmit').prop('disabled', true);
                        $('#Errormessages').text('Record Updated successfully.');
                    } else {
                        $('#Errormessages').text('Please try again.');
                    }
                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );
        }
    }, 50);
});


$('#Ubtnbacktosearch').click(function () {
    $('#Errormessages').text('');
    location.reload();
});

//  UPDATE SUBCLASS BUTTON CLICK FIRE CODE END

