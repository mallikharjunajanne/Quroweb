           /*=====***** MANAGE NOTICE MAIN SCREEN CODE *****=====*/

/* ------***** MANAGE NOTICE MAIN SCREEN  CODE START *****-------- */
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
function CallToAjax(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: bindDatatable,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function FileCallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
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


    function populateDropdown(Noticedropdown) {
        debugger;
        var classificationDropdown = $('#ENoticetypeid');
        classificationDropdown.append($('<option>', {
            value: '',
            text: '------Select------'
        }));
        $.each(Noticedropdown, function (index, item) {        
            classificationDropdown.append($('<option>', {
                value: item.value,
                text: item.text
            }));
        });
    }



    // Call to retrieve data for classification dropdown
     //Home Search Notices Dropdown use this method
    CallToAjax_Withoutdata('GET', '/Admin/MNNoticetype_dd',
        function (response) {
            populateDropdown(response); // Assuming response is an array of items
        },
        function (status, error) {
            // Handle errors here
        }
    );



    // Call to retrieve data for holidays table
    //Home Search Notices Dropdown use this method
    CallToAjax('GET', '/Admin/ManageNotices_TableData', null,
        function (response) {
            debugger;
          
        },
        function (status, error) {
            // Handle errors here
        }
    );
});

function HomeManageNoticetabledata() {
    CallToAjax('GET', '/Admin/ManageNotices_TableData', null,
        function (response) {
            debugger;

        },
        function (status, error) {
            // Handle errors here
        }
    );
}



function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}

////-----Table data bind function
 //Home Search Notices Dropdown use this method
function bindDatatable(response) {

    var formattedDate = GetDateFormat();
    debugger;
    var table = $('#ManageNoticetbl').DataTable();
    table.destroy();
    $("#ManageNoticetblRecordscount").text(response.length);
    debugger;
    var newTable = $("#ManageNoticetbl").DataTable({
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
                data: "Subject",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.subject

                }
            },
            {
                data: "ExpiryDate",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.expiryDate +'<input type="text" value=' + row.eNoticeId + ' hidden/>'

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
                    // return row.holidayId
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                    // return row.holidayId + '<input type="text" value=' + row.holidayId + ' hidden/>'
                    //if (row.expenditureType == 0) {
                    //    return '<span>Credit</span>';

                    //}
                    //else {
                    //    return '<span>Debit</span>';

                    //}

                }
            }
        ]
    });

    table.on('draw', function () {
        $('#ManageNoticetbl').find('td:nth-child(2)').attr('title', 'Edit').css({
            'text-decoration': 'underline',
            'font-weight': 'bold',
            'color': 'black'
        });
    });
    $('#ManageNoticetbl').find('td:nth-child(2)').attr('title', 'Edit').css({
        'text-decoration': 'underline',
        'font-weight': 'bold',
        'color': 'black'
    });
}


//------Notice Search button 
 //Home Search Notices Dropdown use this method
$('#Noticesearchbtn').click(function () {
    $('#ErrorMessage').text("");
    $('#Message_spid').text("");
    debugger;
    var startDate = $("#StartDateTXT").val();
    var endDate = $("#EndDateTXT").val();

    if (startDate > endDate) {
        $('#Message_spid').text("Start date cannot be greater than end date.");
        event.preventDefault(); // Prevent form submission
        return false;
    }
    var searchData = {   
        Subject: $("#SubjectTXT").val(),
        StartDate: $("#StartDateTXT").val(),
        ExpiryDate: $("#EndDateTXT").val(),
        ENoticeTypeId: $("#ENoticetypeid").val(),
        IsSMSTemplate: $("#checkbox-primary").prop("checked") ? 1 : 0
    };
    $.ajax({
        url: "/Admin/ManageNotices_TableData",
        data: searchData,
        type: "GET",
        success: function (response) {
            bindDatatable(response);
        }
    }); 
});


 //Home Search Notices Dropdown use this method
$(document).on('click', '#ManageNoticetbl td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var ENoticeId = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#ManageNoticetbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    HomeENoticeedit(ENoticeId);
})



$(document).on('click', '#ManageNoticetbl .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var confirmed = confirm("Are you sure you want to delete Notice?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        debugger;
        var ENoticeId = $(this).closest('tr').find('input[type="text"]').val();
        //var table = $('#ManageNoticetbl').DataTable();
        //var tabletargetpagetblSEMsearchresults = table.page.info().page;

        loaddingimg.css('display', 'block');
        var data = { ENoticeId: ENoticeId };
        DataCallToAjax('GET', '/Admin/Delete_ENotices_ById', data,
            function (response) {
                HomeManageNoticetabledata();
                $('#ErrorMessage').text("Record deleted successfully.");
                loaddingimg.css('display', 'none');
            },
            function (status, error) {          
                loaddingimg.css('display', 'none');
            }
        );        
    }
});

function HomeENoticeedit(ENoticeId) {
    debugger;
   
    try {
        loaddingimg.css('display', 'block');
        var data = { ENoticeId: ENoticeId };

            DataCallToAjax('GET', '/Admin/Edit_ENotices_ById', data,
            function (response) {
                debugger;
                //$("#InstanceId_UTXT").val(response[0].instanceId);
                //$("#CreatedBy_UTXT").val(response[0].createdBy);
                $("#ENoticeId_UTXT").val(response[0].eNoticeId);

                var eNoticeTypeId = response[0].eNoticeTypeId;

                $('#ENoticeTypeId_UTXT option').each(function () {
                    var ENoticeTypeValue = $(this).val();

                    if (parseInt(ENoticeTypeValue) === parseInt(eNoticeTypeId)) {
                        $(this).prop("selected", true);
                    }
                    else {
                        $(this).prop("Selected", false);
                    }
                });
                $("#Subject_UTXT").val(response[0].subject);

                $("#ENoticeDescription_UTXT").val(response[0].eNoticeDescription);
              
                var showInLoginValue = response[0].showInLogin;

                if (showInLoginValue == 1) {
                    $('#radioinline2').prop('checked', true); // Yes
                } else {
                    $('#radioinline1').prop('checked', true); // No
                }


                debugger;

                var originalstartDate = response[0].startDate;
                var startdateParts = originalstartDate.split(' ')[0].split('-');
                var formattedstartDate = startdateParts[2] + '-' + startdateParts[1] + '-' + startdateParts[0];

                document.getElementById("StartDate_UTXT").value = formattedstartDate;
                
                var originalendtDate = response[0].expiryDate;
                var enddateParts = originalendtDate.split(' ')[0].split('-');
                var formattedendDate = enddateParts[2] + '-' + enddateParts[1] + '-' + enddateParts[0];

                document.getElementById("EndDate_UTXT").value = formattedendDate;

                var FileName = response[0].noticeDocument;

                var characterCount = FileName.length;
                if (characterCount > 0) {
                    $("#currentFileName").text(FileName);
                    $("#NoticeDocument_UTxtFile").hide();
                    $("#deleteFileBtn").show();
                    debugger;
                    $("#NoticeDocument_UTxtFile").on("change click", function () {
                        debugger;
                        var fileName = $(this).val().split("\\").pop() || "";
                        $("#currentFileName").text(fileName);
                    });

                    $("#currentFileName").on("click", function () {
                        debugger;
                        $("#NoticeDocument_UTxtFile").click();
                    });
                }
                else {
                    $("#NoticeDocument_UTxtFile").show();
                    $("#currentFileName").text('');
                    $("#deleteFileBtn").hide();
                }

                $('#Home_SearchNoticesdiv').hide();
                $('#Home_SearchNotices_Updatediv').show();
                loaddingimg.css('display', 'none');
            },
            function (status, error) {
                // Handle errors here
                $('#Home_SearchNoticesdiv').show();
                $('#Home_SearchNotices_Updatediv').hide();
                loaddingimg.css('display', 'none');
            }
        );

    } catch (e) {
        loaddingimg.css('display', 'none');
    }
}

//HOME NOTICE TABLE Export To Excel
$('#lnkexporttoexcel').click(function () {
    debugger;
    var ENoticeTypeId = $('#ENoticetypeid').val();
    var Subject = $('#SubjectTXT').val();
    var StartDate = $('#StartDateTXT').val();
    var EndDate = $('#EndDateTXT').val();
    var IsSMSTemplate = $("#checkbox-primary").prop("checked") ? 1 : 0
    var sendData = {
        'Subject': Subject,
        'StartDate': StartDate,
        'ExpiryDate': EndDate,
        'ENoticeTypeId': ENoticeTypeId,
        'IsSMSTemplate': IsSMSTemplate
    };
    DataCallToAjax('GET', '/Admin/ManagenoticeExporttoexcel', sendData,function (response) {
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
            





           // const startColumn = 'A';
           // const endColumn = 'N';
           // const startColumnIndex = 13;
           // var data = response;
           // const rowCount = data.length;
           // var workbook = new ExcelJS.Workbook();
           // var worksheet = workbook.addWorksheet('Sheet1');
           // var formattedDate = GetDateFormat();
           // worksheet.addRow(["MANAGE NOTICES "]).font = { bold: true };
           // worksheet.addRow(["Quro Schools"]).font = { bold: true };
           // worksheet.addRow(["Report On:  " + formattedDate]).font = { bold: true };
           // worksheet.addRow([""]).font = { bold: false };


           // // Enable worksheet protection
           // worksheet.protection = {
           //     sheet: true
           // };
           // worksheet.protection.IsProtected = true;
           // worksheet.protection.AllowSelectLockedCells = false;

           // // Count the number of rows in the worksheet

           // var headings = [
           //     'Notice Subject',
           //     'End Date(Expiry Date)',
           //     'Posted',
           //     'Repeat SMS to parents',
           //     'Delete'                
           // ];

           // worksheet.addRow(headings);

           //// var sno = 1; // Initialize the serial number
           // data.forEach(function (row) {
           //     var rowData = [];
           //     /*rowData.push(sno++);*/
           //     rowData.push(row.subject);
           //     rowData.push(row.expiryDate);
           //     rowData.push(row.isPosted);               
           //     worksheet.addRow(rowData);
           // });

           // for (var rowNum = 1; rowNum <= 3; rowNum++) {
           //     // Get the row
           //     const row = worksheet.getRow(rowNum);

           //     // Iterate over each cell in the row
           //     row.eachCell(function (cell) {
           //         // Apply cell styles
           //         cell.fill = {
           //             type: 'pattern',
           //             pattern: 'solid',
           //             fgColor: { argb: '000000' }, // Black background color
           //         };
           //         cell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Bold white font color
           //         cell.alignment = { horizontal: 'center' }; // Align center horizontally
           //     });
           //     worksheet.mergeCells(`A${rowNum}:N${rowNum}`);
           //     //worksheet.mergeCells('A1:N1');
           // }
           // worksheet.mergeCells('A4:N4');

           // worksheet.getRow(5).eachCell(function (cell) {
           //     // Customize cell styles for headings here
           //     cell.fill = {
           //         type: 'pattern',
           //         pattern: 'solid',
           //         fgColor: { argb: '000000' }, // Example background color (black)
           //     };
           //     cell.font = { bold: true, color: { argb: 'FFFFFF' } }; // Example font style (bold, white color)

           // });

           // // Customize cell styles for data rows
           // worksheet.eachRow(function (row, rowNumber) {
           //     if (rowNumber > 1) { // Skip the first row (headings)
           //         row.eachCell(function (cell, colNumber) {
           //             if (colNumber == 2) {
           //                 let maxLength = 0;
           //                 worksheet.getColumn(colNumber).eachCell({ includeEmpty: true }, function (cell) {
           //                     const length = cell.value ? cell.value.toString().length : 0;
           //                     maxLength = Math.max(maxLength, length);
           //                 });
           //                 // Set the width of the column based on the maximum length of its cells
           //                 worksheet.getColumn(colNumber).width = maxLength > 0 ? maxLength + 2 : 10;
                          
           //             }
           //             else {
           //                 cell.width = 20;
           //             }
           //         });
           //     }
           // });

           // workbook.xlsx.writeBuffer().then(function (buffer) {
           //     var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

           //     // Create a download link
           //     var link = document.createElement("a");
           //     link.href = URL.createObjectURL(blob);

           //     // Set the file name
           //     link.download = "ManageNotices.xls";

           //     // Append the link to the document and trigger the click event
           //     document.body.appendChild(link);
           //     link.click();

           //     // Remove the link from the document
           //     document.body.removeChild(link);
           // });
        },
        function (status, error) {
            // Handle errors
        }
    );
});

//HOME NOTICE
function updateCharCount() {
    var textarea = document.getElementById("Subject_UTXT");
    var charCount = document.getElementById("charCount");
    var Characterslength = document.getElementById("Characterslength");
    var remaining = 1000 - textarea.value.length;
    charCount.textContent = "Remaining characters: " + remaining;
    Characterslength.textContent = "Typed Characters: " +textarea.value.length;
}
function Charactercounting() {
    var textarea = document.getElementById("ENoticeDescription_UTXT");
    var charCount = document.getElementById("DescriptionCharactercount");
    var charCountlength = document.getElementById("Characterlength");
    var remaining = 6500 - textarea.value.length;
    charCount.textContent = "Remaining characters: " + remaining;
    charCountlength.textContent = "Typed Characters: " + textarea.value.length;
}



//HOME NOTICE UPDATE
$('#BacktosearchNotice_Btn').click(function () {
    debugger;
    $('#UpdateErrorMessage').text('');
    $('#UpdatevalidationMessage').text('');
    $('#Updatevalidation').text('');

    //$('#ManagenoticeMaindiv').show();
    $('#ErrorMessage').text("");

    //managenotice_tabledata();
    //$('#Home_SearchNotices_Updatediv').hide();
    

    HomeManageNoticetabledata();
    $('#Home_SearchNoticesdiv').show();
    $('#Home_SearchNotices_Updatediv').hide();
    $('#NoticeDocument_UTxtFile').val('');
});

//HOME NOTICE UPDATE
$('#Notice_UpdateForm').submit(function () {
    if (UpdateValidation()) {
        $('#UpdateErrorMessage').text('');
        $('#UpdatevalidationMessage').text('');
        $('#Updatevalidation').text('');

        var formdata_ISN = new FormData($('#Notice_UpdateForm')[0]);
        //var formData = new FormData($('#Notice_UpdateForm')[0]);

        var ShowInLoginValue = $("input[name='radio1']:checked").val();
        var file = document.getElementById("NoticeDocument_UTxtFile").files[0];
        var fileInput = document.getElementById('NoticeDocument_UTxtFile');
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            formdata_ISN.append('AttachedDocument', file);
        }
        debugger;
        formdata_ISN.append('ShowInLogin', ShowInLoginValue);
        var Clickbuttonid = $(document.activeElement).attr('id');

       // var Clickbuttonid = "UpdateNotice_Btn";
        switch (Clickbuttonid) {
            case 'UpdateNotice_Btn':
                FileCallToAjax('POST', '/Admin/Edit_ENotices_ById', formdata_ISN,
                    function (response) {
                        if (response == "1") {
                            $('#UpdateNotice_Btn , #btnnoticeupdatepost').prop('disabled', false);
                            $('#UpdateErrorMessage').text("Record updated successfully.");
                        } else if (response == "0") {
                            $('#UpdateErrorMessage').text("Record update not success.");
                        } else if (response == " ") {
                            $('#UpdateErrorMessage').text("You Dont have any permission in this screen.");
                        }
                    }, function (status, error) {

                    },
                    true);
                break;
            case 'btnnoticeupdatepost':      /*CreateSmsNNotice_PostthisnoticeBtn*/
                FileCallToAjax('POST', '/Admin/Managenotices_saveNposting', formdata_ISN,
                    function (response) {
                        debugger;
                        if (response != 0) {
                            $('#Noticeandsms_Insertingdivid').hide();
                            $('#Addnotice_div1').empty();
                            $('#Noticeandsms_Insertingdivid').empty();
                            $('#Postnoticemailsmsdiv').html(response);
                            //$('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);
                        } else {
                            $("#SavevalidationMessage").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                        }
                    }, function (status, error) {

                    },
                    true);
                break;
            case 'btnpostnotice': /*CreateSmsNNotice_PostthisnoticeBtn*/
                FileCallToAjax('POST', '/Admin/Managenotices_saveNposting', formdata_ISN,
                    function (response) {
                        debugger;
                        $('#Noticeandsms_Insertingdivid').hide();
                        $('#Noticeandsms_Insertingdivid').empty();
                        /*$('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);*/
                        $('#Postnoticemailsmsdiv').html(response);

                    }, function (status, error) {


                    },
                    true);
                break;
            default:
                break;
        }
    }
});

function UpdateValidation() {

    debugger;
    var Subject = $('#Subject_UTXT').val();
    var ENoticeTypeId = $('#ENoticeTypeId_UTXT').val();
    //var StartDate = $('#StartDate_UTXT').val();
    //var ExpiryDate = $('#EndDate_UTXT').val();
    var StartDate = new Date($('#StartDate_UTXT').val());
    var ExpiryDate = new Date($('#EndDate_UTXT').val());

    var validationMessage = "";
    var hasError = false;

    if (Subject === "") {
        validationMessage += "Notice Subject<br>";
        hasError = true;
    }

    if (ENoticeTypeId === "") {
        validationMessage += "Notice Type<br>";
        hasError = true;
    }

    if (StartDate === "") {
        validationMessage += " Start date can not be left blank. <br>";
        hasError = true;
    }
    if (ExpiryDate === "") {
        validationMessage += " End date can not be left blank. <br>";
        hasError = true;
    }
    //---
    //if (StartDate > ExpiryDate) {
    //    validationMessage += "Start date can not be greater than end date.<br>";
    //    hasError = true;
    //}
    var currentDate = new Date();
    if (StartDate < currentDate) {
        validationMessage += "Start Date can not be less than today.<br>";
        hasError = true;
    }


    currentDate.setHours(0, 0, 0, 0);
    if (StartDate < currentDate) {
        validationMessage += "Start date can not be greater than end date.<br>";
        hasError = true;
    }

    if (ExpiryDate < currentDate) {
        validationMessage += "End Date can not be less than today.<br>";
        hasError = true;
    }
    //--
    if (StartDate > ExpiryDate) {
        validationMessage += "Start date cannot be greater than end date.<br>";
        hasError = true;
    }
    


    var allowedExtensions = [".doc", ".xls", ".ppt", ".docx", ".xlsx", ".pptx", ".txt", ".jpeg", ".jpg", ".pjpeg", ".gif", ".png", ".pdf"];
    var fileInput = $("#NoticeDocument_UTxtFile")[0]; // Get the DOM element

    if (fileInput.files.length > 0) {
        var fileName = fileInput.files[0].name;
        var fileExtension = fileName.split('.').pop().toLowerCase();

        if (allowedExtensions.indexOf("." + fileExtension) === -1) {

            validationMessage += "Uploaded file extension is invalid. Only " + allowedExtensions.join(", ") + " are supported.";
            event.preventDefault();
            hasError = true;
        }
    }

    if (hasError) {
        $('#Updatevalidation').html("Following fields have invalid data :<br>");
        $("#UpdatevalidationMessage").html(validationMessage);
        return false;
    } else {
        $("#UpdatevalidationMessage").html("");
        return true;
    }
}



//HOME NOTICE UPDATE
$('#DeleteNotice_UpBtn').click(function () {

    $('#ManagenoticeMaindiv').show();
    $('#Home_SearchNotices_Updatediv').hide();

    var ENoticeId = $('#ENoticeId_UTXT').val();
   // DeleteNotice(ENoticeId);

    $.ajax({
        url: "/Admin/Delete_ENotices_ById",
        data: { ENoticeId: ENoticeId },
        type: "GET",
        success: function (response) {
            //managenotice_tabledata();
            HomeManageNoticetabledata();
            $('#ErrorMessage').text("Record deleted successfully.");
        }
    });

});





//--------->>>***** CREATE NOTICE BUTTON CLICK *****<<<-------
$('#Addnotice').click(function () {
    loaddingimg.css('display', 'block');
    $('#btnppostthisnotice').hide();
    $('#Message_spid').text('');

    $.ajax({
        url: "/Admin/ManageNotices_Create",
        type: 'GET',
        success: function (data) {
            debugger;
            $('#Home_SearchNoticesdiv').hide();
            $('#Home_SearchNotices_Updatediv').hide();
            $("#Addnotice_div1").html(data);
            $('#Addsms_div2').empty();           
            $('#Addnoticeandsms_div3').empty();
            $("#Postnoticemailsmsdiv").empty();
            $("#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id").empty();


           
            //$('#ManageNotices_CreateSMS_ViewDivid').empty();
            //$('#ManagenoticeMaindiv').hide();            
            //$("#ManageNotices_CreateSMSNNotice_ViewDivid").empty();
      
       


            loaddingimg.css('display', 'none');
        },
        error: function (error) {
            loaddingimg.css('display', 'none');
        }
    });
});


//--------->>>***** CREATE SMS BUTTON CLICK *****<<<-------
$('#AddnewSMS').click(function () {
    loaddingimg.css('display', 'block');
    $('#Message_spid').text('');

    $.ajax({
        url: "/Admin/ManageNotices_CreateSMS",
        type: 'GET',
        success: function (data) {
            debugger;
            $('#Home_SearchNoticesdiv').hide();
            $('#Home_SearchNotices_Updatediv').hide();
            $('#Addnotice_div1').empty();
            $('#Addsms_div2').html(data);
            $('#Addnoticeandsms_div3').empty();
            $("#Postnoticemailsmsdiv").empty();
            $("#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id").empty();





           // //$('#ManageNotices_CreateSMS_ViewDivid').html(data);
           // $('#ManagenoticeMaindiv').hide();       
           //// $("#ManageNotices_CreateSMSNNotice_ViewDivid").empty();
      

            loaddingimg.css('display', 'none');
        },
        error: function (error) {
            console.log('Error:', error);
            loaddingimg.css('display', 'none');
        }
    });
});



//--------->>>***** CREATE SMS AND NOTICE BUTTON CLICK *****<<<-------
$('#AddnewSMSNNotices').click(function () {

    loaddingimg.css('display', 'block');
    $('#Message_spid').text('');

    $.ajax({
        url: "/Admin/CreateSmsNNotice",
        type: 'GET',
        success: function (data) {
            debugger;
            $('#Home_SearchNoticesdiv').hide();
            $('#Home_SearchNotices_Updatediv').hide();
            $('#Addnotice_div1').empty();
            $('#Addsms_div2').empty();
            $('#Addnoticeandsms_div3').html(data);
            $("#Postnoticemailsmsdiv").empty();
            $("#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id").empty();



            //$('#ManagenoticeMaindiv').hide();      
            //$("#ManageNotices_CreateSMS_ViewDivid").empty();
            //$("#ManageNotices_CreateSMSNNotice_ViewDivid").html(data);

            loaddingimg.css('display', 'none');
        },
        error: function (error) {
            console.log('Error:', error);
            loaddingimg.css('display', 'none');
        }
    });   
});







$('#addnewmanagequotes').click(function () {
    debugger;
    CallToAjax_Withoutdata('GET', '/Admin/Insert_Classification',
        function (response) {
            debugger;
            $('#Manageclassificationmaindiv').hide(); /*ManageQuotemaindiv*/
            $('#Manageclassification_Updatediv3').empty();/* Manageholidays_Updatediv3*/
            $('#Manageclassification_Insertdiv2').html(response); /*Managequotes_Insertdiv2*/
        },
        function (status, error) {
            // Handle error if needed
        }
    );
});

function PostNoticeaddusertoggle() {
    var divToShow = document.getElementById('SearchUser_AddUser_DivId_Postnotice');
    debugger;
    if (divToShow.style.display === 'none' || divToShow.style.display === '') {
        divToShow.style.display = 'block';

        adduserstopostthisnotice$InstanceClassificationSearch();

    } else {
        divToShow.style.display = 'none';
    }
}

function adduserstopostthisnotice$InstanceClassificationSearch() {
   
    $.ajax({
        url: "/Admin/ManageNotices_InstanceClassificationSearch",
        type: "GET",      
        success: function (response) {
            debugger;
            var Classificationdropdown = document.getElementById('Classificationid');
            Classificationdropdown.innerHTML = '<option>---Select a Department---</option>';
            response.forEach(function (department) {
                var option = document.createElement('option'); 
                option.value = department.instanceClassificationId;
                option.textContent = department.classificationName;
                Classificationdropdown.appendChild(option);
            });
        }
    });
}

var Classificationdropdown = document.getElementById('Classificationid');

Classificationdropdown.addEventListener('change', function () {
    
    var selectedClassificationId = Classificationdropdown.value;
  
    adduserstopostthisnotice$Subclassification_on_Classification(selectedClassificationId, Instanceid);
});



function adduserstopostthisnotice$Subclassification_on_Classification(selectedClassificationId, Instanceid) {
    $.ajax({
        url: "/Admin/ManageNotices_InstanceSubClassificationSearch?InstanceId=" + Instanceid + "&InstanceClassificationId=" + selectedClassificationId,
        type: "GET",
        success: function (response) {
         
            var Classificationdropdown = document.getElementById('Subclassificationid');
            Classificationdropdown.innerHTML = '<option>---Select a class---</option>';
            response.forEach(function (subclassification) {
                var option = document.createElement('option');
                option.value = subclassification.instanceSubClassificationId;
                option.textContent = subclassification.subClassificationName;
                Classificationdropdown.appendChild(option);
            });
        }
    });
}
//-----------------------------------------Search and add users to post this notice  this  href click code ends


//---------*** DATE FOMRATE CHANGE FUNCTION START***------------
function convertDateFormat(inputDate) {
    var parts = inputDate.split(' '); // Splitting the date and time
    var datePart = parts[0]; // Extracting the date part

    // Splitting the date into day, month, and year
    var dateParts = datePart.split('-');
    var day = dateParts[0];
    var month = dateParts[1];
    var year = dateParts[2];

    // Creating a new date string in the desired format "YYYY-MM-DD"
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate; // Return the formatted date
}

function getDatesBetween(startDate, endDate) {
    var dates = [];
    var currentDate = new Date(startDate);
    var formattedEndDate = new Date(endDate);

    while (currentDate <= formattedEndDate) {
        dates.push(currentDate.toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}
//---------*** DATE FOMRATE CHANGE FUNCTION END***------------




//------***SCHEDULE SMS BOX SCREEN CODE START***---------

$('#searchButton').click(handle_searchuserstopostnotice_btnclick_tabledata);

function handle_searchuserstopostnotice_btnclick_tabledata() {

    //$('#PostNoticeAddinguserstable_Div').hide();


    var form = document.getElementById("Searchuserstopostnotice_searchform");
    var formData = new FormData(form);
    formData.append('InstanceId', Instanceid);

    var userName = $('#Ps_UserNametxt').val() || '';
    var roleId = $('#Instancerole_id').val() || '';
    var firstName = $('#Ps_Firstnametxt').val() || '';
    var lastName = $('#Ps_lastnametxt').val() || '';
    var instanceClassificationId = $('#Classificationid').val() || '';
    var instanceSubClassificationId = $('#Subclassificationid').val() || '';
    var instanceUserCode = $('#Ps_InstanceUsercode_txt').val() || '';
    var portalEmail = $('#Ps_Emailtxt').val() || '';
    var routeId = $('#Route_id').val() || '';
    var collegeHostel = $('#CollegeHostel_id').val() || '';



    var AddedUsertablecount = $('#Search_result_count').text();
    var ExcludeUserIds;

    if (AddedUsertablecount == "") {
        ExcludeUserIds = '';
    } else {
        var Excludeuserarray = [];
        var tabledata = $("#PostNoticetblid_searchandadduserspostthisnotice_Table tbody tr");
        tabledata.each(function (row, tr) {
            var ninthColumnText = $(tr).find('td:nth-child(10) #Usersidtxt').val();
            Excludeuserarray.push(ninthColumnText);
        });
        ExcludeUserIds = Excludeuserarray.join(',');
    }
    var Noofusers = '9_0_1_4';


    $.ajax({
        type: "POST",
        url: "/Admin/ManageNotices_PostNoticeSearchtabledata",
        data: {
            InstanceId: Instanceid,
            UserName: userName,
            InstanceRoleId: roleId,
            FirstName: firstName,
            LastName: lastName,
            InstanceClassificationId: instanceClassificationId,
            InstanceSubClassificationId: instanceSubClassificationId,
            InstanceUserCodes: instanceUserCode,
            PortalEmail: portalEmail,
            RouteId: routeId,
            CollegeHostel: collegeHostel,
            ExcludeUserIds: ExcludeUserIds,
            Noofusers: Noofusers
        },
        success: function (response) {
            $('#PostnoticeSearch_tabledata_Divid').html(response);
        },
        error: function (error) {
            alert("Something went wrong.....!/n Please try again");
        }
    });

}




//----> Only Twenty Members to Post notice in table checkbox checked fire function code start

function Onlytwenty_users_addpostnotice(ExcludeUsersids) {
    debugger;
    var Usersdata = [];
   

    var leng = $('#PostNoticetblid_searchandadduserspostthisnotice tr').length;
    var trLength = $('#PostNoticetblid_searchandadduserspostthisnotice tr').find('td').length;

    for (var i = 0; i < 20; i++) {
        var Checkboxvalues = $('#User_checkbox_' + i).val();        
        Usersdata.push(Checkboxvalues);
    }
    if (ExcludeUsersids != '') {
        if (ExcludeUsersids.includes(',')) {
            var Splituserids = ExcludeUsersids.split(',');
            for (var i = 0; i < Splituserids.length; i++) {
                Usersdata.push(Splituserids[i].trim());
            }
        } else {
            Usersdata.push(ExcludeUsersids);
        }
    }
    var Userid = Usersdata.join(',');
    var ExcludeUserIds = Usersdata.join(',');
    var rowId = "20";
    AddUsertopostnotice(Userid, rowId, ExcludeUserIds);
}

//----> Only Twenty Members to Post notice in table checkbox checked fire function code end




//----> SELECT ALL USERS CHECKBOX FUNCTION CODE START

function Selectealladdusers_addpostnotice(Userscount, ExcludeUsersid) {
    debugger;
    var AllUsers = [];
    for (var i = 0; i < Userscount; i++) {
        var UserCheckboxvalue = $('#User_checkbox_' + i).val();

        if (ExcludeUsersid != '') {
            AllUsers.push(ExcludeUsersid);
        }

        AllUsers.push(UserCheckboxvalue);
    }
    var Split_allusers = ExcludeUsersid.split(',');
    var Le = Split_allusers.length;
   /* alert(Le);*/

    var Userid = AllUsers.join(',');
    var ExcludeUserIds = AllUsers.join(',');
    var rowId = "ALL";
  
   
    Alluserspostnotice(Userid, rowId, ExcludeUserIds);
}


function Alluserspostnotice(Userid, rowId, ExcludeUserIds) {
    debugger;
    var Userids = "";
    var Noofusers = "ALL";
    if (ExcludeUserIds != '') {
        Userids = Userid + "," + ExcludeUserIds;
    } else {
        Userids = Userid;
    }
    var row = document.getElementById(rowId);
    var checkbox;
    if (rowId == "ALL") {
        checkbox = document.getElementById('Selectealladdusers_addpostnotice_Id');
    } else if (rowId == "20") {
        checkbox = document.getElementById('selecttwentyusersonly');
    } else {
        checkbox = document.getElementById('User_checkbox_' + rowId);
    }

    var rowusers = [];
    var checkedIds = [];
    var validornot;

    if (checkbox.checked) {
        rowusers.push({ "Userid": Userid });
        checkedIds.push({ "rowId": rowId });
        validornot = true;
    }
 
    if (validornot) {
   
        $.ajax({  
          url: "/Admin/SELUsersByUserIds",
            type: "POST",
            data: {
                UserIds: Userids,
                Noofusers: Noofusers,
            },
            success: function (response) {
                $('#PostNoticeAddinguserstable_Div').show();
                $('#PostNoticeAddinguserstable_Div').html(response);             
            }
        });       
        handle_searchuserstopostnotice_without_btnclick_tabledata(Userids, Noofusers);
    } else {
        checkbox.checked = false;
    }

}
//----> SELECT ALL USERS CHECKBOX FUNCTION CODE END




//---------->Add user to Post notice in table checkbox checked fire function code start
function AddUsertopostnotice(Userid, rowId, ExcludeUserIds) {
    debugger;
    var Userids = "";
    var Noofusers = "1_20";
    if (ExcludeUserIds != '') {
        Userids = Userid + "," + ExcludeUserIds;
    } else {
        Userids = Userid;
    }

    var row = document.getElementById(rowId);
    var checkbox;   
    if (rowId == "ALL") {
        checkbox = document.getElementById('Selectealladdusers_addpostnotice_Id');
    } else if (rowId == "20") {
        checkbox = document.getElementById('selecttwentyusersonly');
    } else {
        checkbox = document.getElementById('User_checkbox_' + rowId);
    }
   

    //var checkbox = document.getElementById('User_checkbox_' + rowId);
    var rowusers = [];
    var checkedIds = [];
    var validornot;



    if (checkbox.checked) {

        rowusers.push({ "Userid": Userid });
        checkedIds.push({ "rowId": rowId });
        validornot = true;

    }

    if (validornot) {
        
        handle_searchuserstopostnotice_without_btnclick_tabledata(Userids, Noofusers);

        $.ajax({         
            url: "/Admin/SELUsersByUserIds?UserIds=" + Userids + "&Noofusers=" + Noofusers,
            type: "GET",
            success: function (response) {
                $('#PostNoticeAddinguserstable_Div').show();
                $('#PostNoticeAddinguserstable_Div').html(response);  
            }
        });
    } else {
        checkbox.checked = false;
    }
}
//---------->Add user to Post notice in table checkbox checked fire function code end


function handle_searchuserstopostnotice_without_btnclick_tabledata(Userid, Noofusers) {

    debugger;
    $('#PostNoticeAddinguserstable_Div').hide();

    var form = document.getElementById("Searchuserstopostnotice_searchform");
    var formData = new FormData(form);
    formData.append('InstanceId', Instanceid);
    var userName = $('#Ps_UserNametxt').val() || '';
    var roleId = $('#Instancerole_id').val() || '';
    var firstName = $('#Ps_Firstnametxt').val() || '';
    var lastName = $('#Ps_lastnametxt').val() || '';
    var instanceClassificationId = $('#Classificationid').val() || '';
    var instanceSubClassificationId = $('#Subclassificationid').val() || '';
    var instanceUserCode = $('#Ps_InstanceUsercode_txt').val() || '';
    var portalEmail = $('#Ps_Emailtxt').val() || '';
    var routeId = $('#Route_id').val() || '';
    var collegeHostel = $('#CollegeHostel_id').val() || '';
    var ExcludeUserIds = '';
    if (Userid != "") {
        ExcludeUserIds = Userid;
    } else {
        ExcludeUserIds = '';
    }
    
    $.ajax({
        type: "POST",
        url: "/Admin/ManageNotices_PostNoticeSearchtabledata",
        data: {
            InstanceId: Instanceid,
            UserName: userName,
            InstanceRoleId: roleId,
            FirstName: firstName,
            LastName: lastName,
            InstanceClassificationId: instanceClassificationId,
            InstanceSubClassificationId: instanceSubClassificationId,
            InstanceUserCodes: instanceUserCode,
            PortalEmail: portalEmail,
            RouteId: routeId,
            CollegeHostel: collegeHostel,
            ExcludeUserIds: ExcludeUserIds,
            Noofusers: Noofusers
        },
        success: function (response) {           

            $('#PostnoticeSearch_tabledata_Divid').html(response);
          
        },
        error: function (error) {
            alert("Something went wrong.....!/n Please try again");
        }
    });
}


///----- Rewriting common method
$('#createsmsbacktomanagenoticescr_btn').click(function () {
    location.reload();
    $('#ManagenoticeMaindiv').show();
    //$('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').hide();
    $('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').empty();

});

//----Old method
//$('#createsmsbacktomanagenoticescr_btn').on('click', function () {
//    location.reload();
//    $('#ManagenoticeMaindiv').show();
//    //$('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').hide();
//    $('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').empty();
//});


function Getcheckboxvalues(RolecheckboxSelector, GrpcheckboxSelector, ClscheckboxSelector, SclcheckboxSelector) {
    var checkboxValues = {};
    var selectors = [
        RolecheckboxSelector,
        GrpcheckboxSelector,
        ClscheckboxSelector,
        SclcheckboxSelector
    ];
    selectors.forEach(function (selector) {
        var checkboxes = document.querySelectorAll(selector);
        var checkedCheckboxValues = [];

        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                checkedCheckboxValues.push(checkbox.value);
            }
        });       
        if (selector === RolecheckboxSelector) {
            checkboxValues['Rolecheckbox'] = checkedCheckboxValues;
        } else if (selector === GrpcheckboxSelector) {
            checkboxValues['Grpcheckbox'] = checkedCheckboxValues;
        } else if (selector === ClscheckboxSelector) {
            checkboxValues['Clscheckbox'] = checkedCheckboxValues;
        } else if (selector === SclcheckboxSelector) {
            checkboxValues['Sclcheckbox'] = checkedCheckboxValues;
        }
    });    
    return checkboxValues;
}



function Selectalluserschkvalues() {
    var selectAllCheckbox = document.getElementById('Selectallusers_Checkbox');
    var ForAll;

    if (selectAllCheckbox.checked) {
        ForAll = 1;
    } else {
        ForAll = 0;
    }
    return ForAll;
}




//--------HOME DELETE ICON CLEAR BUTTON
$('#Noticebtnclear').click(function () {
    debugger;
    $('#FmSubjectSearch')[0].reset();
    $('#ErrorMessage').text('');
});