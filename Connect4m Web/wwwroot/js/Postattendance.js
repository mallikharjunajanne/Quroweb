$(document).ready(function () {

    debugger;
    var Rolename = $('#ROLENAMESPANID').val().toUpperCase();  // Get and convert role name to uppercase
    if (Rolename == "CLASS TEACHER") {  // Check if role is Class Teacher
        // Remove unnecessary elements for Class Teacher
        $('#Rlenddate').remove();
        $('#StartDateid').remove();
        $('#RlStartdate').text('Date'); // Update label text

        // Display current date in dd-mm-yyyy format
        $("#Roldisplaydate").text(getFormattedDate()).show();  // Use previously defined getFormattedDate function
        $("#Roldisplaydateymd").text(getDateFormatted()).hide();  // Use previously defined getFormattedDate function
        
        // Update IDs of dropdowns
        $('#Ddldepartment').attr('id', 'ddlInstanceClassificationSearch');
        $('#DdlSubClass').attr('id', 'ddlInstanceSubclassificationSearch');
        $('#Ddslotsid').attr('id', 'ddlInstanceSlotSearch');

    }
    else {  // For roles other than Class Teacher

        $('#Roldisplaydate').remove();  // Remove date display for other roles
        $('#Roldisplaydateymd').remove();  // Remove date display for other roles
        //$('#Ddldepartment').empty();   // Clear department dropdown
        var Dateformate = getDateFormatted(); // Use previously defined getFormattedDate function
        $('#StartDateid').val(getDateFormatted());       
        $('#EndDateid').val(Dateformate);    // Use .val() for input fields
    }
});

function getDateFormatted() {
    var currentDate = new Date();

    // Get day, month, and year
    var day = String(currentDate.getDate()).padStart(2, '0'); // Ensures 2-digit day
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Ensures 2-digit month
    var year = currentDate.getFullYear();

    // Format the date as dd-mm-yyyy
    return year + "-" + month + "-" + day;
}

function getFormattedDate() {
    var currentDate = new Date();

    // Get day, month, and year
    var day = String(currentDate.getDate()).padStart(2, '0'); // Ensures 2-digit day
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Ensures 2-digit month
    var year = currentDate.getFullYear();

    // Format the date as dd-mm-yyyy
    return day + '-' + month + '-' + year;
}

$(document).on('change', '#ddlInstanceClassificationSearch', function () {
    var selectedValues = $(this).val();
    /*debugger;*/
    fetchDataAndPopulateDropdown(                          //==== << ** Subclassification Dropdown ** >>
        '/UserScreens/Teacher_attendancesubclassification', // URL for data fetching
        '#ddlInstanceSubclassificationSearch',             // Dropdown selector
        'value',                                           // Field name for option text
        'text',                                            // Field name for option values
        'manageClassification'                             // Response value return class name
    );
});

$(document).on('change', '#ddlInstanceSubclassificationSearch', function () {
    var ClassificationId = $('#ddlInstanceClassificationSearch').val();
    var SubClassificationId = $(this).val();
    var FilterTeachingSubjects = 1;
    debugger;
    $.ajax({
        url: '/UserScreens/Attendanceslot?ClassificationId=' + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#ddlInstanceSlotSearch';
            var dropdown = $(dropdownSelector);
            var valueField = 'instancesubjectId';
            var textField = 'subjectName';
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


});

$(document).off('change', '#Ddldepartment');
$(document).off('change', '#DdlSubClass');

$(document).on('change', '#Ddldepartment', function () {
    var selectedValues = $(this).val();
    /* $('#DdlSubClass').val();*/
    $('#DdlSubClass').empty();
    //debugger;
    _Departmentbysubclassdd(selectedValues);
});

$('#DdlSubClass').change(function () {
    var ClassificationId = $('#Ddldepartment').val();
    var SubClassificationId = $('#DdlSubClass').val();
    var FilterTeachingSubjects = 0;
    $('#Ddslotsid').empty();
    _Subclassbyslotsdd(ClassificationId, SubClassificationId, FilterTeachingSubjects);
});

function _Departmentbysubclassdd(Departmentvalue) {
    $.ajax({
        url: '/UserScreens/DepartmentbySubclass?InstanceClassificationId=' + Departmentvalue,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            //debugger;
            var dropdownSelector = '#DdlSubClass';
            var dropdown = $(dropdownSelector);
            var valueField = 'instanceSubclassificaitionId';
            var textField = 'subClassificationName';
            //dropdown.empty();
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

function _Subclassbyslotsdd(ClassificationId, SubClassificationId, FilterTeachingSubjects) {
    $.ajax({
        url: '/UserScreens/Attendanceslot?ClassificationId=' + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            //debugger;
            var dropdownSelector = '#Ddslotsid';
            var dropdown = $(dropdownSelector);
            var valueField = 'instancesubjectId';
            var textField = 'subjectName';
            // dropdown.empty();
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



//==================================>>>>>>>>>>>>>>>>>>>>>>>>>

$("#Serach_MA").submit(function (event) {
    event.preventDefault();
    debugger;
    // alert("hii");
    $(".errorofallemployeeattendence").text("");
    $('#Errormessage').text("");

    loaddingimg.css('display', 'block');
    departmentDdl_text = $("#Serach_MA").find("#Ddldepartment option:selected").text();
    SubClassDdl_text = $("#Serach_MA").find("#DdlSubClass option:selected").text();
    //Month_EAP_val = $("#Serach_EAP").find("#insertdropdown_Month_EAP option:selected").val();
    //year_EAP = $("#Serach_EAP").find("#insertdropdown_year_EAP").val();
    var ROLENAME = $('#ROLENAMESPANID').val();
    var startdate;
    var enddate;
    Attendanceformdate = $(this).serialize();
    if (ROLENAME == "CLASS TEACHER") {
        //startdate = $("#Serach_MA #Roldisplaydate").text();
        startdate = $("#Serach_MA #Roldisplaydateymd").text();
        enddate = startdate;
        Attendanceformdate += '&StartDate=' + encodeURIComponent(startdate);
        Attendanceformdate += '&EndDate=' + encodeURIComponent(startdate);
        departmentDdl_text = $("#Serach_MA").find("#ddlInstanceClassificationSearch option:selected").text();
        SubClassDdl_text = $("#Serach_MA").find("#ddlInstanceSubclassificationSearch option:selected").text();
    }
    else {
        startdate = $("#Serach_MA #StartDateid").val();
        enddate = $("#Serach_MA #EndDateid").val();
        var startDateObj = new Date(startdate);
        var endDateObj = new Date(enddate);
        if (startDateObj > endDateObj) {
            $('#Errormessage').text("Start date cannot be greater than end date.");
            loaddingimg.css('display', 'none');//Start date can not be greater than end date.
            return false;
        }
    }
    //var startdate = $("#Serach_MA #StartDateid").val();
    //var enddate = $("#Serach_MA #EndDateid").val();
     //startdate = $("#Serach_MA #StartDateid").val();
     //enddate = $("#Serach_MA #EndDateid").val();
    _Mentorattendancestartdate = startdate;
    _Mentorattendancesenddate = enddate;

    //Attendanceformdate = $(this).serialize();

    var formElement = document.getElementById('Serach_MA');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationMessages2 = formElement.getElementsByClassName('error2');
        var validationmelength = validationMessages.length;
        if (validationmelength == 0 && validationMessages2.length == 0) {
            CommonAjaxFunction('GET', '/UserScreens/PostAttendanceSave', null, function (response) {
                $("#GetStudentAttendenceAppend").html(response);
                $("#Serach_MA #deletebutton #deleteinner").text("");
                $("#Serach_MA #deletebutton #deleteinner").append('<button type="button" class="btn btn-danger waves-effect waves-light btn-sm" value="Delete" id="deleteattendance">Delete</button> ');

                /*<input type="button" value="Delete" class="btn btn-pill btn-outline-danger btn-air-warning" id="deleteattendance" />*/
                search_Student_Attendence(Attendanceformdate, startdate, enddate, departmentDdl_text, SubClassDdl_text);

            }, function (status, error) {

            }, false);
        }
        else {
            $('.alert-danger p').text("Please enter all required fields.");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
    }, 50);
    loaddingimg.css('display', 'none');

})

var newTableMA;

function search_Student_Attendence(data, startdate, enddate, DepartmentText, SubClassText) {

    loaddingimg.css('display', 'block');
    CommonAjaxFunction('GET', '/UserScreens/GetStudentAttendance', data, function (response) { bindDatatableME(response, startdate, enddate, DepartmentText, SubClassText) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableME(response, startdate, enddate, DepartmentText, SubClassText) {

        debugger;
        loaddingimg.css('display', 'block');
        var table = $('#tblSTsearchresults').DataTable();
        table.destroy();
        var countofdates = 0;

        $("#tblSTsearchresults thead tr th:gt(4)").remove();

        

        // Destructuring the first item in the response array
        var { attendanceValidationStatusMessage, holidayList, studentAttendanceDetails } = response[0];
        var formattedDates = "";
       
        if (holidayList && holidayList.length > 0) {
            formattedDates = holidayList.map(item => {
                return new Date(item.holidayDate).toLocaleDateString('en-GB') + " (" + item.holidayName + ")";
            }).join(", ");
            $('#Errormessage').text('There are holidays/week-offs in the selected date range on ' + formattedDates);
            loaddingimg.css('display', 'none');
            return false;
        }
        else {
            if (attendanceValidationStatusMessage == "0") {
                $('#Errormessage').text('You cannot select start date less than Effective Date.');
                loaddingimg.css('display', 'none');
                return false;
            }
            else {
                $('#Printattendancereport #Selecteddepartmentclassnamesdiv').text(DepartmentText + ' ' + SubClassText);
                //loaddingimg.css('display', 'none');
                //return false;

                var endDateObj = new Date(enddate);

                for (var date = new Date(startdate); date <= endDateObj; date.setDate(date.getDate() + 1)) {
                    var formattedDate = _formatDate(date); // You need a function to format the date as needed
                    $("#tblSTsearchresults thead tr").append("<th style='color:green'>" + formattedDate + "</th>");
                    countofdates++;
                }
                $("#totalrecords_Tranctions_MA").text(studentAttendanceDetails.length);
                if (studentAttendanceDetails.length != 0) {
                    //$("#totalrecords_Tranctions_EAP").text(response.length);
                    newTableMA = $("#tblSTsearchresults").DataTable({
                        dom: '<"top"lf>t<"bottom"ip>',
                        buttons: [],
                        bProcessing: false,
                        bLengthChange: true,
                        bfilter: false,
                        bSort: true,
                        searching: false,
                        paging: false,
                        bPaginate: false,
                        //data: response,
                        data: studentAttendanceDetails,
                        columns: [
                            {
                                targets: 1, // Assuming this is the column index where you want to display numbering                        
                                render: function (data, type, row, meta) {
                                    var currentPage = table.page.info().page;
                                    var rowsPerPage = table.page.info().length;
                                    return (0 * rowsPerPage) + meta.row + 1;
                                }
                            },
                            {
                                data: "Firstname",
                                render: function (data, type, row, meta) {
                                    //  length++;

                                    return row.firstname[0]

                                }
                            },
                            {
                                data: "InstanceUserId",
                                render: function (data, type, row, meta) {
                                    //  length++;
                                    return row.instanceUserId + '<input id="_mentoruserIdlist" type="textbox" value=' + row.userIdlist[0] + ' hidden style="display:none" />' + '<input id="_mentorparentuserId" type="textbox" value=' + row.parentId[0] + ' hidden style="display:none" />'
                                        + '<span style="color:' + (row.colorChangeFlag[0] == '0' ? 'black' : 'red') + ';"  hidden style="display:none" >' + row.colorChangeFlag[0] + '</span>';
                                }
                            },
                            {
                                data: "StudentSMS",
                                render: function (data, type, row, meta) {
                                    
                                    // Set the icon based on studentSMS value
                                    var iconSrc = row.studentSMS == "1" ? "/Images_IMP/cross.png" : "/Images_IMP/tick_16.png";

                                    // Conditionally render the input field for studentPhno if it's not empty
                                    var hiddenInputPhno = row.studentPhno[0] ? '<input id="_Studentuserphno" type="text" value="' + row.studentPhno[0] + '" hidden style="display:none" />' : '';

                                    // Add the hidden input for studentSMS
                                    var hiddenInputSMS = row.studentSMS ? '<input id="_studentSMS" type="text" value="' + row.studentSMS + '" hidden style="display:none" />' : '';
                                    var hiddenInputfirstname = '<input id="_StudentName" type="text" value="' + row.firstname[0] + '" hidden style="display:none" />';
                                    var hiddenInputEmail = '<input id="_StudentEmail" type="text" value="' + row.studentEmail[0] + '" hidden style="display:none" />';

                                    return '<img src="' + iconSrc + '" title="' + row.studentPhno + '" />' + hiddenInputPhno + hiddenInputSMS + hiddenInputfirstname + hiddenInputEmail;
                                }
                            },
                            {
                                data: "ParentSMS",
                                render: function (data, type, row, meta) {
                                    var iconSrc_ = row.parentSMS == "1" ? "/Images_IMP/cross.png" : "/Images_IMP/tick_16.png";
                                    var hiddenInputParentPhno_ = '<input id="_mentorparentphno" type="text" value="' + row.parentPhNo[0] + '" hidden style="display:none" />';
                                    var hiddenInputParentSMS_ = row.parentSMS ? '<input id="_parentSMS" type="text" value="' + row.parentSMS + '" hidden style="display:none" />' : '';
                                    var hiddenInputParentfirstname_ = '<input id="_ParentMentorName" type="text" value="' + row.parentName[0] + '" hidden style="display:none" />';
                                    var hiddenInputParentEmail_ = '<input id="_ParentEmail" type="text" value="' + row.parentEmail[0] + '" hidden style="display:none" />';
                                    return '<img src="' + iconSrc_ + '" title="' + row.parentPhNo[0] + '" />' + hiddenInputParentPhno_ + hiddenInputParentSMS_ + hiddenInputParentfirstname_ + hiddenInputParentEmail_;
                                }
                            },
                            ...Array.from({ length: countofdates }, (_, k) => ({
                                data: "Columns",
                                render: function (data, type, row, meta) {
                                    ////????????????????
                                    var checkboxcheck = row.columns[k] == "1";
                                    var splAttenanceComments = row.splAttenanceComments[k] || '';
                                    var lastDateofAttendance = row.lastDateofAttendance[0] || '';

                                    // Handle the case when row.columns[k] is "", "0", or "1"
                                    if (row.columns[k] == "" || row.columns[k] == "0" || row.columns[k] == "1") {
                                        // Style the header if value is "" or "0"
                                        if (row.columns[k] == "" || row.columns[k] == "0") {
                                            $("#tblSTsearchresults thead tr").find('th:eq(' + (5 + k) + ')').css('color', 'red');                                            
                                        }

                                        // Return the checkbox with checked state if value is "1", otherwise unchecked
                                        return `<div class="checkbox-container"style="display:block;">
                            <input type="checkbox" class="form-check-input" value="${row.attendanceIds[k]}" ${row.columns[k] == "1" ? "checked" : ""} /><br><img src="/Images_IMP/details_open.png" alt="Details" class="details-image" /><input id="_lastDateofAttendanceId" type="textbox" value=${lastDateofAttendance} hidden style="display:none" /></div>`;
                                    }

                                    // Handle case when row.columns[k] is a number (not "", "0", or "1") - show a dropdown
                                    else {
                                        loaddingimg.css('display', 'block');
                                        // Placeholder dropdown (loading...)
                                        var dropdownHtml = `<input id="_lastDateofAttendanceId" type="textbox" value=${lastDateofAttendance} hidden style="display:none" /><div class="checkbox-container" style="display:none;"></div><div class="dropdown-container">
                                                    <img src="/Images_IMP/details_open.png" alt="Details" class="details-image" /><br>
                                                    <select id="dropdown-${meta.row}-${meta.col}">
                                                        <option value="">Loading...</option>
                                                    </select></div>`;

                                        // Insert the placeholder dropdown dynamically
                                        $('#dropdown-' + meta.row + '-' + meta.col).closest('td').html(dropdownHtml);
                                        loaddingimg.css('display', 'none');
                                        // Ajax request to fetch data for dropdown options
                                        $.ajax({
                                            url: '/UserScreens/Getstaffleavetypesddl',  // Replace with your API endpoint
                                            type: 'GET',
                                            success: function (ddl_response) {

                                                loaddingimg.css('display', 'block');
                                                var finalDropdownHtml = `<div class="checkbox-container"style="display:none;"></div><div class="dropdown-container">
                                                     <input id="_lastDateofAttendanceId" type="textbox" value=${lastDateofAttendance} hidden style="display:none" />
                                                      <img src="/Images_IMP/details_open.png" alt="Details" class="details-image" />
                                                      <br>
                                                      <select id="dropdown-${meta.row}-${meta.col}">`;
                                                finalDropdownHtml += '<option value="">---Select---</option>';
                                                // Add options to the dropdown from the response
                                                ddl_response.forEach(function (option) {
                                                    var selected = (row.columns[k] == option.value) ? 'selected' : '';
                                                    finalDropdownHtml += `<option value="${option.value}" ${selected}>${option.text}</option>`;
                                                });


                                                finalDropdownHtml += `</select><br>
                                        <button class="btn btn-primary comments-btn btn-xs" id="comments-btn-${meta.row}-${meta.col}">
                            ${splAttenanceComments ? 'Edit Comments' : 'Add Comments'}</button></div>`;


                                                // Update the dropdown HTML in the cell
                                                $('#dropdown-' + meta.row + '-' + meta.col).closest('td').html(finalDropdownHtml);
                                                loaddingimg.css('display', 'none');
                                            },
                                            error: function (error) {
                                                console.error('Error loading dropdown options:', error);

                                                // Show error message if request fails
                                                var errorHtml = `<select id="dropdown-${meta.row}-${meta.col}">
                                                            <option value="">Error loading data</option>
                                                         </select>`;
                                                $('#dropdown-' + meta.row + '-' + meta.col).closest('td').html(errorHtml);
                                                loaddingimg.css('display', 'none');
                                            }
                                        });

                                        return dropdownHtml;  // Return the loading state dropdown
                                    }
                                }
                            }))
                        ]
                        ,
                        createdRow: function (row, data, dataIndex) {
                            // Apply the color change based on the value of colorChangeFlag
                            if (data.colorChangeFlag[0] == '0') {
                                $(row).find('td').css('color', 'black');  // Set text color to black
                            }
                            else {
                                $(row).find('td').css('color', 'red');
                                $(row).find('td').each(function () {
                                    var checkbox = $(this).find('input[type="checkbox"]');
                                    var image = $(this).find('.details-image');
                                    if (checkbox.length) {
                                        // Hide and disable the checkbox
                                        checkbox.hide().prop('disabled', true);
                                        image.hide();
                                    }
                                });
                            }
                        }
                    });
                    try {
                        newTableMA.column(0).order('asc').draw();
                        $("#attendencetable").find('#attendenceposting').remove();
                        $("#attendencetable").append('<div style="text-align: center;padding: 11px;" ><button id="attendenceposting" class="btn btn-primary waves-effect waves-light btn-sm">Submit</button></div>')
                    }
                    catch {
                        $("#attendencetable").append('<div style="text-align: center;padding: 11px;" ><button id="attendenceposting" class="btn btn-primary waves-effect waves-light btn-sm">Submit</button></div>')
                    }

                    loaddingimg.css('display', 'none');
                }
                else {
                    loaddingimg.css('display', 'none');
                }
            }
        }
    }

}
//==================================>>>>>>>>>>>>>>>>>>>>>>>>>

$(document).on('click', '.details-image', function () {
    debugger;
     // Find the closest <td> element that contains the clicked image
    var parent = $(this).closest('td');
    //var lastDateofAttendancevalue = parent.find('#_lastDateofAttendanceId').val(); 
    // Get the index of the <tr> (table row) in the table
    var rowIndex = parent.closest('tr').index();  // Row index

    // Get the index of the <td> (table column) within the row
    var colIndex = parent.index();  // Column index within the row

    var popupId = '#popup-overlay-' + rowIndex + '-' + colIndex;
    var existingPopup = $(popupId);

    if (existingPopup.length > 0) {
        // If the popup already exists, toggle its visibility (show/hide)
        existingPopup.toggle();
    }

    // Open or toggle the checkbox and dropdown visibility
    toggleCheckboxAndDropdown(rowIndex, colIndex);
});

// Open or toggle the checkbox and dropdown visibility
function toggleCheckboxAndDropdown(row, col) {
    debugger;
    var cell = $('#tblSTsearchresults tbody tr').eq(row).find('td').eq(col);   
    $('#dropdown-' + row + '-' + col).val(function () { return $(this).find('option').first().val(); });
    $('#comments-btn-' + row + '-' + col).text('Add comments');
    $('#comments-textarea-' + row + '-' + col).val('');

    // Find the checkbox and dropdown elements in the cell
    var checkboxContainer = cell.find('.checkbox-container');
    var dropdownContainer = cell.find('.dropdown-container');

    // If the checkbox container is visible, hide it and show the dropdown
    if (checkboxContainer.is(':visible')) {
        checkboxContainer.hide();  // Hide the checkbox

        // Check if the dropdown container exists. If not, create it.
        if (dropdownContainer.length === 0) {
            var dropdownHtml = '<div class="checkbox-container"style="display:none;"></div><div class="dropdown-container">' +
                '<img src="/Images_IMP/details_open.png" alt="Details" class="details-image" />' +
                '<br>' +
                '<select id="dropdown-' + row + '-' + col + '">' +
                '<option value="">Loading...</option>' +
                '</select>' +
                '</div>';

            // Append the dropdown container inside the cell
            cell.append(dropdownHtml);

            // Ajax request to fetch data for the dropdown options
            $.ajax({
                url: '/UserScreens/Getstaffleavetypesddl',  // Replace with your API endpoint
                type: 'GET',
                success: function (ddl_response) {
                    var finalDropdownHtml = '<div class="checkbox-container"style="display:none;"></div><div class="dropdown-container">' +
                        '<img src="/Images_IMP/details_open.png" alt="Details" class="details-image" />' +
                        '<br>' +
                        '<select id="dropdown-' + row + '-' + col + '">';
                    finalDropdownHtml += '<option value="">---Select---</option>';
                    ddl_response.forEach(function (option) {
                        finalDropdownHtml += '<option value="' + option.value + '">' + option.text + '</option>';
                    });
                    finalDropdownHtml += '</select>' +
                        '<br>' +
                        '<button class="btn btn-primary comments-btn btn-xs" id="comments-btn-' + row + '-' + col + '">Add Comments</button>' +
                        '</div>';

                    // Replace the content of the dropdown container
                    $('#dropdown-' + row + '-' + col).closest('td').html(finalDropdownHtml);
                },
                error: function (error) {
                    console.error('Error loading dropdown options:', error);
                    var errorHtml = '<select class="select2 form-select select2-hidden-accessible" id="dropdown-' + row + '-' + col + '">';
                    errorHtml += '<option value="">Error loading data</option>';
                    errorHtml += '</select>';
                    $('#dropdown-' + row + '-' + col).closest('td').html(errorHtml);
                }
            });
        } else {
            // If dropdown already exists, just show it
            dropdownContainer.show();
        }
    }
    else {
        // If the dropdown is visible, hide it and show the checkbox container again
        dropdownContainer.hide();
        checkboxContainer.show();

        // Ensure the checkbox container has a checkbox and image
        if (checkboxContainer.find('input[type="checkbox"]').length === 0) {
            var checkboxHtml = '<input type="checkbox" class="form-check-input" value=""/>' +
                '<br>' +
                '<img src="/Images_IMP/details_open.png" alt="Details" class="details-image"/>';

            // Append the checkbox to the checkbox container
            checkboxContainer.append(checkboxHtml);
        }
    }
}

$(document).on('click', '.comments-btn', function () {
    debugger;
    // Get the row and column from the button's ID
    var idParts = this.id.split('-');
    var rowIndex = idParts[2];  // Extracting the column index from the ID
    var colIndex = idParts[3];

    var table = $('#tblSTsearchresults').DataTable();
    var row = table.row(rowIndex).data();  // Get the full row data for this row
    var columnHeader = table.column(colIndex).header();
    // Get the comment for this row and column (ensure row.splAttenanceComments exists)
    var splAttenanceComments = row.splAttenanceComments && row.splAttenanceComments[colIndex - 5] || '';
    var FirstName = row.firstname[0];
    var Selecteddatetext = $(columnHeader).text();
    var spncomments = 'Enter Comments to the date ' + Selecteddatetext + ' for student ' + "'" + FirstName + "'";

    // Open or toggle the comments popup
    toggleCommentsPopup(rowIndex, colIndex, splAttenanceComments, spncomments);
});

// Open or toggle the comments popup
function toggleCommentsPopup(row, col, existingComment = '', spncomments) {
    debugger;
    let savedComment = '';
    var popupId = '#popup-overlay-' + row + '-' + col;
    var textareaId = '#comments-textarea-' + row + '-' + col;
    var savebtnId = '#save-comments-btn-' + row + '-' + col;
    var closebtnId = '#close-popup-btn-' + row + '-' + col;
    

    // Check if the popup already exists
    var existingPopup = $(popupId);

    if (existingPopup.length > 0) {
        // If the popup already exists, toggle its visibility (show/hide)
        existingPopup.toggle();
    }
    else {
       
        // If the popup does not exist, create and append it
        var popupHtml = '<div class="popup-container" id="popup-container-' + row + '-' + col + '">' +
            '<span class="spcomments">' + spncomments + '</span><br>' +
            '<textarea id="comments-textarea-' + row + '-' + col + '" placeholder="Write your comment here...">' + existingComment+'</textarea><br>' +
            '<button class="btn btn-success btn-xs" id="save-comments-btn-' + row + '-' + col + '">Add Comments</button>' +
            '<button class="btn btn-danger btn-xs" id="close-popup-btn-' + row + '-' + col + '">Close</button>' +
            '</div>';

        // Find the specific td (row and column) where the popup should be appended
        var targetTd = $('#tblSTsearchresults tbody tr').eq(row).find('td').eq(col);

        // Append the popup overlay to the target cell (td)
        targetTd.append('<div class="popup-overlay" id="popup-overlay-' + row + '-' + col + '">' + popupHtml + '</div>');

        // Apply the styles for the popup
        $('#popup-overlay-' + row + '-' + col).css({
            width: '250px',  // Set fixed width for the popup
            padding: '10px',
            borderRadius: '10px',
            background: '#fff',
            position: 'absolute',  // Absolute positioning
            marginLeft: '0px',  // Slight margin from the target cell
            height: 'auto',  // Let the height adjust based on content
            border: '2px solid',
            zIndex: 9999,  // Ensure it's on top
            boxSizing: 'border-box',  // Prevent padding and border from affecting width
            backgroundColor: 'lightcyan',
            color: 'black'
        });

        // Fade in the popup to display it
        $('#popup-overlay-' + row + '-' + col).fadeIn();

        // Event listener for the close button (inside popup)
        $(closebtnId).on('click', function () {
            // Save the comment entered in the textarea
            var comment = $(textareaId).val();
            savedComment = comment;  // Store the entered comment in the savedComment variable

            // Fade out the popup and overlay
            $(popupId).fadeOut(function () {
                $('#popup-overlay-' + row + '-' + col).fadeOut();  // Fade out the overlay as well
                $('#comments-textarea-' + row + '-' + col).val(savedComment);  // Fade out the overlay as well
                // No need to explicitly call hide() or remove(), fadeOut already hides the element
            });
        });

        // Event listener for the save button (inside popup)
        $(savebtnId).on('click', function () {
            debugger;
            var comment = $(textareaId).val();
            if (comment) {
                console.log('Comment saved for row ' + row + ', col ' + col + ': ' + comment);
                savedComment = comment;
                $(popupId).fadeOut(function () {
                    $('#popup-overlay-' + row + '-' + col).fadeOut();
                });
            } else {
                alert('Please enter a comment.');
            }
        });
    }
}

//==========================================    Check All check Boxes
$(document).on('click', '#_checkallattendance', function (event) {
    event.stopImmediatePropagation();
    if ($(this).prop('checked')) {
        $("#tblSTsearchresults").find('input[type="checkbox"]').prop('checked', true);
    } else {
        $("#tblSTsearchresults").find('input[type="checkbox"]').prop('checked', false);
    }
});

//=======================================================   Click On Submit For  Mentor Attendance Posting
$(document).on('click', '#attendencetable #attendenceposting', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    debugger;

    // Initialize an empty array to store attendance data for each student.
    var Attendancedataparent = [];
    
    var _DepartmentId = $('#Ddldepartment').val();
    var DepartmentClassNames = $('#Ddldepartment option:selected').text();
    var _SubclassId = $('#DdlSubClass').val();
    var _SubClassNames = $('#DdlSubClass option:selected').text();
    var _SlotId = $('#Ddslotsid').val();
    var _SlotName = $('#Ddslotsid option:selected').text();

    var smsStudentChecked = $('#_chkSMSStudent').prop('checked');
    var smsParentChecked = $('#_chkSMSParent').prop('checked');
    var emailStudentChecked = $('#_chkEmailStudent').prop('checked');
    var emailParentChecked = $('#_chkEmailParents').prop('checked');
    var smsStudentStatus = smsStudentChecked ? true : false;
    var smsParentStatus = smsParentChecked ? true : false;
    var emailStudentStatus = emailStudentChecked ? true : false;
    var emailParentStatus = emailParentChecked ? true : false;

    $("#tblSTsearchresults tbody tr").each(function (i, parentRow) {

        var Attendancedatachild = {
            'StudentAttendanceUserId': $(parentRow).find("#_mentoruserIdlist").val(),
            'Ispresent': [],
            'Comments': [],
            'AttendanceDate': [],
            'Leavetypetext': [],
            'StudentName': $(parentRow).find("#_StudentName").val(),
            'StudentPhno': $(parentRow).find("#_Studentuserphno").val(),
            'StudentSMS': $(parentRow).find("#_studentSMS").val(),
            'StudentEmail': $(parentRow).find("#_StudentEmail").val(),
            'ParentId': $(parentRow).find("#_mentorparentuserId").val(),
            'ParentName': $(parentRow).find("#_ParentMentorName").val(),
            'ParentPhno': $(parentRow).find("#_mentorparentphno").val(),
            'ParentSMS': $(parentRow).find("#_parentSMS").val(),
            'ParentEmail': $(parentRow).find("#_ParentEmail").val(),
            'LastDateofAttendance': $(parentRow).find("#_lastDateofAttendanceId").val(),
            //'LastDateofAttendance': $(parentRow).find("#_lastDateofAttendanceId").val() || "",
            //'MentorName': $(parentRow).find("#_MentorName").val(),
            'DepartmentId': _DepartmentId,
            'DepartmentName': DepartmentClassNames,
            'SubclassId': _SubclassId,
            'SubclassName': _SubClassNames,
            'SlotId': _SlotId,
            'SlotName': _SlotName,
            'StudentSmschk': smsStudentStatus,
            'StudentEmailchk': emailStudentStatus,
            'ParentSmschk': smsParentStatus,
            'ParentEmailchk': emailParentStatus,
        };

        debugger;
        $("#tblSTsearchresults thead th").each(function (j, th) {
            debugger;
            if (j >= 5 && j < $("#tblSTsearchresults thead th").length) {

                var AttendanceheaderText = $("#tblSTsearchresults thead th").eq(j).text();
                Attendancedatachild.AttendanceDate.push(AttendanceheaderText);

                // Find the input in the current cell
                var input = $(parentRow).find('td:eq(' + j + ') input[type="checkbox"], td:eq(' + j + ') select');

                // Check if the input is a checkbox
                if (input.is('input[type="checkbox"]')) {
                    var isChecked = input.prop('checked');
                    Attendancedatachild.Ispresent.push(isChecked ? "1" : "0");
                    Attendancedatachild.Leavetypetext.push("");
                    Attendancedatachild.Comments.push("");
                }
                // Check if the input is a dropdown (select)
                else if (input.is('select')) {
                    debugger;
                    var selectedValue = input.val();
                    var selectedText = input.find("option:selected").text();
                    var Commentstextid = '#comments-textarea-' + i + '-' + j;
                    var Commentstext = $(Commentstextid).val();
                    // You can add logic here to handle the selected value
                    // For example, if you want to store it as a "1" or "0" based on the value, you can check the selected value
                    Attendancedatachild.Ispresent.push(selectedValue); // Or apply any logic if needed
                    Attendancedatachild.Leavetypetext.push(selectedText); // Or apply any logic if needed
                    Attendancedatachild.Comments.push(Commentstext); // Store textarea value
                }
            }
        });

        Attendancedataparent.push(Attendancedatachild);
    });

    // Create a FormData instance
    var formData = new FormData();

    // Append the attendance data to the FormData object
    formData.append("Attendances", JSON.stringify(Attendancedataparent));
   
    //console.log(JSON.stringify({ Attendances: Attendancedataparent }));
    $.ajax({
        url: '/UserScreens/PostAttendanceSave_',  // Ensure this is the correct URL for POST
        type: 'POST', // Make sure this is a POST request, not GET
        data: formData,
        processData: false,  // Don't process the data
        contentType: false,  // Don't set contentType manually
        success: function (response) {
            $(".errorofallemployeeattendence").text("Attendance saved successfully .");
            $('.alert-success p').text("Attendance saved successfully .");
            $(".alert-success").show().delay(6000).fadeOut()
            loaddingimg.css('display', 'none');
            $("#Serach_MA #deletebutton #deleteinner").text("");

            // console.log('Success:', response);
        },
        error: function (status, error) {
            loaddingimg.css('display', 'none');
            //  console.error('Error:', status, error);
        }
    });

});