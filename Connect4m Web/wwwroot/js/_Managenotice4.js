function DataCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        processData: false,
        contentType: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function PostNoticeaddusertogglediv() {
    var divToShow = document.getElementById('searchUserAddUserToPostNotice');
    divToShow.style.display = divToShow.style.display === 'block' ? 'none' : 'block';
    if (divToShow.style.display === 'block') fetchClassificationData();
}

function fetchClassificationData() {
    var Classificationdropdown = document.getElementById('Classificationddl');
    if (Classificationdropdown) {
        DataCallToAjax('GET', '/Admin/GetNoticeClassificatinddl', null,
            function (response) {
                debugger;
                Classificationdropdown.innerHTML = '<option value="">---Select a Department---</option>';
                response.forEach(function (department) {
                    Classificationdropdown.add(new Option(department.text, department.value));
                });
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );
    }
}

$("#Classificationddl").change(function () {
    var ClassificationIds = $("#Classificationddl").val();

    DataCallToAjax('GET', '/Admin/GetNoticeClassesbySubClass?Classificationid=' + ClassificationIds, null,
        function (response) {
            debugger;
            var SubClassificationdropdown = document.getElementById('Subclassddl');
            SubClassificationdropdown.innerHTML = '<option value="">---Select a class---</option>';
            response.forEach(function (subclassification) {
                var option = document.createElement('option');
                option.value = subclassification.value;
                option.textContent = subclassification.text;
                SubClassificationdropdown.appendChild(option);
            });
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
})

$('#noticeUserSearchForm').submit(function (event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    searchUsersForNoticeData(); // Call the function to handle the search action
});

function getFormData() {
    return {
        UserName: $('#Usernametxt').val() || '',
        RoleId: $('#Instanceroleddl').val() || '',
        FirstName: $('#Firstnametxt').val() || '',
        LastName: $('#Lastnametxt').val() || '',
        InstanceClassificationId: $('#Classificationddl').val() || '',
        InstanceSubClassificationId: $('#Subclassddl').val() || '',
        InstanceUserCode: $('#Instanceusercodetxt').val() || '',
        PortalEmail: $('#Emailtxt').val() || '',
        RouteId: $('#Routeddl').val() || '',
        CollegeHostel: $('#Collegehostelddl').val() || '',
        ExcludeUserIds: $('#excludeUserIds').val() || '',
        MultiAdmissionNumber: undefined, // Placeholder if needed in the future
        NoOfUsers: 'OneTwoZero'
    };
}

function searchUsersForNoticeData() {
    loaddingimg.css('display', 'block');
    debugger;
    var _data = getFormData();
    $.ajax({
        type: "GET",
        url: "/Admin/Searchaddusersfornoticedata",
        data: _data,
        success: function (response) {
            bindDatatable(response);
            loaddingimg.css('display', 'none');
        },
        error: function (error) {
            alert("Something went wrong.....!/n Please try again");
            loaddingimg.css('display', 'none');
        }
    });
};

function bindDatatable(response) {
    debugger;
    loaddingimg.css('display', 'block');
    var listvaluesCount = response.length;
    var Twentystudentuserids = '', Allstudentuserids = '';

    if (response && listvaluesCount > 0) {
        var slicedResponse = response.slice(0, 20);
        Twentystudentuserids = slicedResponse.map(item => item.studentuserid).join(',');
        Allstudentuserids = response.map(item => item.studentuserid).join(',');
    }

    var table = $('#Noticesearchuserstbl').DataTable();
    table.destroy();
    $("#SearchRecordsspid").text(listvaluesCount);

    var newTable = $("#Noticesearchuserstbl").DataTable({
        dom: '<"tops"lf>t<"bottom"ip>',
        buttons: [],
        bProcessing: false,
        bLengthChange: false,
        bFilter: true,
        bSort: false,
        searching: false,
        paging: true,
        bPaginate: false,
        pageLength: 20,
        data: response,
        columns: [
            { data: "Studentuserid", render: function (data, type, row, meta) {
                    return `<div style="text-align: center;"> <input type="checkbox" class="checkbox-style chkSelect" data-subject-id="${row.studentuserid}" data-enotice-id="${row.firstName}" onclick="NoticeAdduserclick(event, '${row.studentuserid}', '${row.instanceUserCode}', 'OneTwoZero')" style="cursor: pointer;"> <div>`;
                } },
            { data: "FirstName", render: (data, type, row) => row.firstName },
            { data: "AdmissionNumber", render: (data, type, row) => row.admissionNumber },
            { data: "RoleName", render: (data, type, row) => row.roleName },
            { data: "ClassificationName", render: (data, type, row) => row.classificationName },
            { data: "SubClassificationName", render: (data, type, row) => row.subClassificationName },
            { data: "PortalEmail", render: (data, type, row) => row.portalEmail },
            { data: "StudentMobilePhone", render: (data, type, row) => row.studentMobilePhone },
            { data: "ParentMobilePhone", render: (data, type, row) => row.parentMobilePhone },
            { data: "FatherName", render: (data, type, row) => row.fatherName },
        ],
        initComplete: function () {
            var $top = $('.tops');
            if (listvaluesCount > 20) {
                $top.append(`<label class="control-label col-4" style="color: blue;"><input type="checkbox" class="checkbox-style" id="checkbox1" onclick="twentyaddUserToNotice('${Twentystudentuserids}', 'OneTwoZero')"> Select the below 20 user(s).</label>`);
                $top.append(`<label class="control-label col-6" style="color: blue;"><input type="checkbox" class="checkbox-style" id="checkbox2" onclick="Allusersaddingcheckboxcallingfun('${Allstudentuserids}', 'AllUsers')"> Select all the ${listvaluesCount} user(s) resulted with my search criteria.</label>`);
            }
            if (listvaluesCount > 0 && listvaluesCount < 20) {
                $top.append(`<label class="control-label col-4" style="color: blue;"><input type="checkbox" class="form-check-input checkbox-item" id="checkbox3"> Select the below ${listvaluesCount} user(s).</label>`);
            }
        }
    });
    loaddingimg.css('display', 'none');
}

// Function triggered when a checkbox is clicked to add a user to the notice list
function NoticeAdduserclick(event, Studentuserid, instanceUserCode, Noofusers) {
    debugger;
    loaddingimg.css('display', 'block');
    var currentIds = $('#excludeUserIds').val() || '';
    var newIds = currentIds ? currentIds + ',' + Studentuserid : Studentuserid;
    $('#excludeUserIds').val(newIds);

    $.ajax({
        url: `/Admin/GetUsersaddnotice?UserIds=${newIds}&Noofusers=${Noofusers}`,
        type: "GET",
        success: function (response) {
            debugger;
            $('#PostNoticeAddinguserstable_Div').show();
            //Searchbtn_withoutclick_Usersnoticetbldata(newIds, Noofusers);
            fetchUsersForNotice(newIds, Noofusers);
            Addusersdatatablefunction(response);
            loaddingimg.css('display', 'none');
        }
    });
}

function fetchUsersForNotice(Studentuserid, Noofusers) {
    loaddingimg.css('display', 'block');
    debugger;
    var userName = $('#Usernametxt').val() || '';
    var roleId = $('#Instanceroleddl').val() || '';
    var firstName = $('#Firstnametxt').val() || '';
    var lastName = $('#Lastnametxt').val() || '';
    var instanceClassificationId = $('#Classificationddl').val() || '';
    var instanceSubClassificationId = $('#Subclassddl').val() || '';
    var instanceUserCode = $('#Instanceusercodetxt').val() || '';
    var portalEmail = $('#Emailtxt').val() || '';
    var routeId = $('#Routeddl').val() || '';
    var collegeHostel = $('#Collegehostelddl').val() || '';
    var ExcludeUserIds = '';
    if (Studentuserid != "") {
        ExcludeUserIds = Studentuserid;
    } else {
        ExcludeUserIds = '';
    }
    $.ajax({
        type: "GET",
        url: "/Admin/Searchaddusersfornoticedata",
        data: {
            UserName: userName,
            RoleId: roleId,
            FirstName: firstName,
            LastName: lastName,
            InstanceClassificationId: instanceClassificationId,
            InstanceUserCode: instanceUserCode,
            PortalEmail: portalEmail,
            InstanceSubClassificationId: instanceSubClassificationId,
            RouteId: routeId,
            CollegeHostel: collegeHostel,
            ExcludeUserIds: ExcludeUserIds,
            Noofusers: Noofusers
        },
        success: function (response) {
            bindDatatable(response);
            loaddingimg.css('display', 'none');
        },
        error: function (error) {
            alert("Something went wrong.....!/n Please try again");
            loaddingimg.css('display', 'none');
        }
    });
}

function Addusersdatatablefunction(response) {
    debugger;
    loaddingimg.css('display', 'block');

    var table = $('#Noticeaddeduserstbl').DataTable();
    table.clear().destroy();

    $("#AddedRecordscountspid").text(response.length);

    $('#Noticeaddeduserstbl').DataTable({
        dom: '<"top"lf>t<"bottom"ip>',
        data: response,
        paging: false,
        searching: false,
        columns: [
            { data: "FirstName", render: (data, type, row) => `${row.firstName}<input type="text" value="${row.studentuserid}" id="Usersidtxt" hidden/>` },
            { data: "AdmissionNumber", render: (data, type, row) => row.admissionNumber },
            { data: "RoleName", render: (data, type, row) => row.roleName },
            { data: "ClassificationName", render: (data, type, row) => row.classificationName },
            { data: "SubClassificationName", render: (data, type, row) => row.subClassificationName },
            { data: "PortalEmail", render: (data, type, row) => row.portalEmail },
            { data: "StudentMobilePhone", render: (data, type, row) => row.studentMobilePhone },
            { data: "ParentMobilePhone", render: (data, type, row) => row.parentMobilePhone },
            { data: "FatherName", render: (data, type, row) => row.fatherName },
            { data: "Studentuserid", render: (data, type, row) => `<i class="fa fa-trash-o" style="color:red;cursor: pointer;" title="Delete" onclick="handleTrashClick('${row.studentuserid}')"></i>` }
        ]
    });

    loaddingimg.css('display', 'none');
}


//Adds the selected users (up to 20) to the notice by updating the list of excluded user IDs.
function twentyaddUserToNotice(Studentuserid, Noofusers) {
    debugger;
    loaddingimg.css('display', 'block');
    var currentIds = $('#excludeUserIds').val(); // Get current value from textbox
    var newIds = Studentuserid; // New value to add

    if (currentIds) {
        // Append new id to existing ids
        newIds = currentIds + ',' + Studentuserid;
        Studentuserid = newIds;
    }
    $('#excludeUserIds').val(newIds); // Update textbox value
    $.ajax({
        url: "/Admin/SelectUsersForNotice?UserIds=" + Studentuserid + "&Noofusers=" + Noofusers,
        type: "GET",
        success: function (response) {
            $('#PostNoticeAddinguserstable_Div').show();
            fetchUsersForNotice(Studentuserid, Noofusers);
            Addusersdatatablefunction(response);
            loaddingimg.css('display', 'none');
        }
    });
}

//Adds the selected users (up to All) to the notice by updating the list of excluded user IDs.
function Allusersaddingcheckboxcallingfun(Studentuserid, Noofusers) {
    debugger;
    loaddingimg.css('display', 'block');
    var currentIds = $('#excludeUserIds').val(); // Get current value from textbox
    var newIds = Studentuserid; // New value to add

    if (currentIds) {
        // Append new id to existing ids
        newIds = currentIds + ',' + Studentuserid;
        Studentuserid = newIds;
    }
    $('#excludeUserIds').val(newIds); // Update textbox value
    $.ajax({
        url: "/Admin/SelectUsersForNotice?UserIds=" + Studentuserid + "&Noofusers=" + Noofusers,
        type: "GET",
        success: function (response) {
            $('#PostNoticeAddinguserstable_Div').show();
            fetchUsersForNotice(Studentuserid, Noofusers);
            Addusersdatatablefunction(response);
            loaddingimg.css('display', 'none');
        }
    });
}


//Handles the click event to remove a user from the notice by updating the excluded users list and sending it to the server.
function handleTrashClick(Removestudentuserid) {
    debugger;
    var Noofusers = 'OneTwoZero';
    var currentIds = $('#excludeUserIds').val();
    var Studentuserid;
    if (currentIds) {
        // Split currentIds into an array of IDs
        var idArray = currentIds.split(',');

        // Remove Removestudentuserid from idArray
        var index = idArray.indexOf(Removestudentuserid.toString());
        if (index !== -1) {
            idArray.splice(index, 1);
        }

        // Join the remaining IDs back into a string
        var newIds = idArray.join(',');

        // Update Studentuserid with the new value
        Studentuserid = newIds;

        // Update textbox value
        $('#excludeUserIds').val(newIds);
    }
    $.ajax({
        url: "/Admin/RemoveUsersFromNotice?UserIds=" + Studentuserid + "&Noofusers=" + Noofusers,
        type: "GET",
        success: function (response) {
            $('#PostNoticeAddinguserstable_Div').show();
            fetchUsersForNotice(Studentuserid, Noofusers);
            Addusersdatatablefunction(response);
            loaddingimg.css('display', 'none');
        }
    });
}

//Check All Checkboxes
function funCheckAllUsers() {
    debugger;
    var selectAllCheckbox = document.getElementById('checkAllUsers');
    var AllUserscheckboxes = document.querySelectorAll('.checkbox-item');

    var checkboxValues = [];

    AllUserscheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkboxValues.push(checkbox.value);
        checkbox.disabled = selectAllCheckbox.checked;
    });
    $('#Adduserstopostnotice_Div').toggle();
    //var ForAll = selectAllCheckbox.checked ? 1 : 0;
    //return ForAll;
}

//Select All Role Staff Checkboxes Only
//function handleSelectAllStaffRoleCheckbox() {
//    var selectAllStaffRoleCheckbox = document.getElementById('Selectallstaffrole');
//    var checkboxes = document.querySelectorAll('.checkbox-Name');
//    var StaffcheckboxValues = [];

//    selectAllStaffRoleCheckbox.addEventListener('change', function () {
//        checkboxes.forEach(function (staffcheckbox) {
//            var labelElement = staffcheckbox.nextElementSibling;
//            var labelValue = labelElement.textContent.toLowerCase();

//            if (labelValue.includes('student')) {
//                staffcheckbox.checked = false;
//            } else {
//                staffcheckbox.checked = selectAllStaffRoleCheckbox.checked;
//                StaffcheckboxValues.push(staffcheckbox.value);
//            }
//        });
//    });
//}

//Select All Role Staff Checkboxes Only
function handleSelectAllStaffRoleCheckbox() {
    debugger;
    const selectAllStaffRoleCheckbox = document.getElementById('Selectallstaffrole');
    const checkboxes = document.querySelectorAll('.checkbox-Name');
    const StaffcheckboxValues = [];

    selectAllStaffRoleCheckbox.addEventListener('change', () => {
        checkboxes.forEach(staffcheckbox => {
            const labelValue = staffcheckbox.nextElementSibling.textContent.toLowerCase();
            staffcheckbox.checked = labelValue.includes('student') ? false : selectAllStaffRoleCheckbox.checked;

            if (!labelValue.includes('student')) {
                StaffcheckboxValues.push(staffcheckbox.value);
            }
        });
    });
}

// Handle the click event for the "Post Notice" button
$('#btnPostNotice').click(function () {
    try {
        debugger;
        $('#validationErrorMessage4').text('');
        var $button = $(this);
        var Tableuserids = [], ForAll = $('#checkAllUsers').prop('checked') ? 1 : 0;
        var Studentsms = $('#chkSMSStudent').prop('checked') ? 1 : 0, Parentsms = $('#chkSMSParent').prop('checked') ? 1 : 0;
        var Studentmail = $('#chkEmailStudent').prop('checked') ? 1 : 0, Parentmail = $('#chkEmailParent').prop('checked') ? 1 : 0;
        var NoticeId = $('#_ENoticetxtid').val(), NotificationMessage = $('#Notificationmessagelbl').text(),
            NoticeTypeName = $('#_Noticetypetxt').val(), Noticetypeid = $('#_Noticetypeidtxt').val(),Rolecheckboxvalues = Getcheckboxvalues('input[name="rolecheckbox"]'),Groupcheckboxvalues = Getcheckboxvalues('input[name="Grpcheckbox"]'), Classificationcheckboxvalues = Getcheckboxvalues('input[name="Clscheckbox"]'),
            Subclassificationcheckboxvalues = Getcheckboxvalues('input[name="Sclcheckbox"]');

        $("#Noticeaddeduserstbl tbody tr").each(function () {
            Tableuserids.push($(this).find('#Usersidtxt').val());
        });

        var _IsStudentSmsEnabled = Boolean(Studentsms);
        var _IsParentSmsEnabled = Boolean(Parentsms);
        var _IsStudentEmailEnabled = Boolean(Studentmail);
        var _IsParentEmailEnabled = Boolean(Parentmail);
        var _IsForAll = Boolean(ForAll);
        var datatosend = {
            NoticeId, RoleIds: Rolecheckboxvalues, GroupIds: Groupcheckboxvalues, ClassificationIds: Classificationcheckboxvalues,
            SubClassificationIds: Subclassificationcheckboxvalues, UserIds: Tableuserids, IsStudentSmsEnabled: _IsStudentSmsEnabled, IsParentSmsEnabled: _IsParentSmsEnabled, IsStudentEmailEnabled: _IsStudentEmailEnabled, IsParentEmailEnabled: _IsParentEmailEnabled, IsForAll: _IsForAll, Noticetypename: NoticeTypeName, NotificationMessage: NotificationMessage, Noticetypeid: Noticetypeid,
        };

        if (!Tableuserids.length && !Rolecheckboxvalues.length && !Groupcheckboxvalues.length && !Classificationcheckboxvalues.length && !Subclassificationcheckboxvalues.length) {
            $('#validationErrorMessage4').text('No selection has been made. Please select at least one user.');
            return $(window).scrollTop(0);
        }

        var allCheckedlength = $('.Chkitem:checked').length > 0 || $('#checkAllUsers').prop('checked');
        if (!allCheckedlength) {
            $('#validationErrorMessage4').text('No selection has been made. Please select at least one user.');
            $(window).scrollTop(0);
            return;
        }

        $.ajax({
            url: "/Admin/SendNoticeWithEmailAndSMS", type: "POST", data: datatosend,
            success: function (response) {
                var Returnmessage = handleResponse(response, NotificationMessage, Studentsms, Parentsms, Studentmail, Parentmail);
                $('#validationErrorMessage4').append(Returnmessage);
                $button.prop('disabled', response == "1");
            },
            error: function (xhr, status, error) { console.error("Error:", error); }
        });
    }
    catch (e) {
        console.error("Error:", e.message);
        alert("Script Error: " + e.message);
    }
});

function handleResponse(response, NotificationMessage, Studentsms, Parentsms, Studentmail, Parentmail) {
    try {
        var Returnmessage = "";
        if (response == "1") { Returnmessage = 'Notice Posted Successfully. ' + NotificationMessage; }
        else if (response == "-1") { Returnmessage = 'Notice Not Posted ' + NotificationMessage; }
        else {
            var studentlist = response.studentlist || [], parentlist = response.parentlist || [];
            if (Studentsms && studentlist.length) Returnmessage += 'SMS sent to Students: ' + studentlist.join(', ') + '.';
            if (Parentsms && parentlist.length) Returnmessage += 'SMS sent to Parents: ' + parentlist.join(', ') + '.';
            if (Studentmail && studentlist.length) Returnmessage += 'Email sent to Students: ' + studentlist.join(', ') + '.';
            if (Parentmail && parentlist.length) Returnmessage += 'Email sent to Parents: ' + parentlist.join(', ') + '.';
            if (!studentlist.length && !parentlist.length) Returnmessage = 'Notice Posted Successfully. ' + NotificationMessage;
        }
        return Returnmessage;
    }
    catch (e) {
        console.error("Error:", e.message);
        alert("Script Error: " + e.message);
    }
}

function Getcheckboxvalues(selector) {
    var checkedValues = [];
    $(selector + ':checked').each(function () { checkedValues.push($(this).val()); });
    return checkedValues;
}

// Bind change event to the select dropdown
$('#onceDailyTypeSelector').change(function () {
    debugger;
    toggleDateDiv();
});

// Function to show or hide the date container based on the dropdown value
function toggleDateDiv() {
    var selectedValue = $('#onceDailyTypeSelector').val();

    // If "Once" is selected, show the date input container
    if (selectedValue === '1') {
        $('#dailyTextContainer').show();
    }
    // If "Daily" is selected, hide the date input container
    else if (selectedValue === '2') {
        $('#dailyTextContainer').hide();
    }
    // If nothing is selected, also hide the date input container
    else {
        $('#dailyTextContainer').hide();
    }
}

$('#SchedulerSubmitbtn').click(function () {
    debugger;
    var ddlSechedulerType = $('#onceDailyTypeSelector').val();  // Get the selected value
    var Startdate = $('#Startdatetxt').val();
    var Enddate = $('#Enddatetxt').val();
    var SelectedDate = $('#datetxtid').val();
    var ddlSchedulerHr = parseInt($('#TimeHoursddl').val(), 10);
    var ddlSchedulerMin = parseInt($('#Timeminutesddl').val(), 10);

    var currentDate = new Date();
    var currentDateFormatted = currentDate.toLocaleDateString('en-GB');  // Current date in dd/MM/yyyy format
    var currentHour = currentDate.getHours().toString().padStart(2, '0');
    var currentMinute = currentDate.getMinutes().toString().padStart(2, '0');

    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 because months are 0-based
    var day = currentDate.getDate().toString().padStart(2, '0');

    //// Format selected hour and minute to ensure they're two digits
    //var formattedHour = selectedHour.toString().padStart(2, '0');
    //var formattedMinute = selectedMinute.toString().padStart(2, '0');
    //var formattedDateTime = year + '-' + month + '-' + day + ' ' + formattedHour + ':' + formattedMinute + ':00.000';

    //var currentDate = new Date();
    // Default values in case of NaN
    ddlSchedulerHr = isNaN(ddlSchedulerHr) ? 0 : ddlSchedulerHr;
    ddlSchedulerMin = isNaN(ddlSchedulerMin) ? 0 : ddlSchedulerMin;
    // Format the time with proper padding
    var formattedHour = ddlSchedulerHr.toString().padStart(2, '0');
    var formattedMinute = ddlSchedulerMin.toString().padStart(2, '0');

    // Create formatted date and time string
    var formattedDateTime = year + '-' + month + '-' + day + ' ' + formattedHour + ':' + formattedMinute + ':00.000';

    //var formattedDateTime = currentDate.toISOString().slice(0, 19).replace('T', ' ') + '.000';

    //var formattedDateTime = year + '-' + (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' + currentDate.getDate().toString().padStart(2, '0') + ' ' + selectedHour.toString().padStart(2, '0') + ':' + selectedMinute.toString().padStart(2, '0') + ':00.000';


    var isvalid = true;

    // Check for selected value
    if (ddlSechedulerType == 0) {
        $('#validationErrorMessage5').text('Select The Type');
        $('#dailyTextContainer').focus();
        isvalid = false;
        return;
    }

    // Logic when ddlSechedulerType is 1
    if (ddlSechedulerType == 1) {
        if (Startdate !== "" && Enddate !== "") {
            if ((new Date(currentDateFormatted) >= new Date(Startdate)) && (new Date(currentDateFormatted) <= new Date(Enddate))) {
                if (parseInt(ddlSchedulerHr.toString() + ddlSchedulerMin.toString(), 10) <= parseInt(currentHour + currentMinute, 10)) {
                    $('#validationErrorMessage5').text('Set Time Should be greater than current time');
                    isvalid = false;
                    return;
                }
            }
            else {
                if (ddlSchedulerHr == 0 || ddlSchedulerMin == 0) {
                    $('#validationErrorMessage5').text('Set the Time For the SMS');
                    isvalid = false;
                    return;
                }
            }
        }
        else {
            $('#validationErrorMessage5').text('Set the Start Date and End Date for the Notice');
            isvalid = false;
            return;
        }
    }

    // Logic when ddlSechedulerType is 2
    if (ddlSechedulerType == 2) {
        var txtSchedulerDate = $('#txtSchedulerDate').val();

        if (Startdate !== "" && Enddate !== "") {
            if ((new Date(txtSchedulerDate) >= new Date(Startdate)) && (new Date(txtSchedulerDate) <= new Date(Enddate))) {
                if (txtSchedulerDate == currentDateFormatted) {
                    if (parseInt(ddlSchedulerHr.toString() + ddlSchedulerMin.toString(), 10) <= parseInt(currentHour + currentMinute, 10)) {
                        $('#validationErrorMessage5').text('Set Time Should be greater than current time');
                        isvalid = false;
                        return;
                    }
                }
                else {
                    if (ddlSchedulerHr == 0 || ddlSchedulerMin == 0) {
                        $('#validationErrorMessage5').text('Set the Time For the SMS');
                        isvalid = false;
                        return;
                    }
                }
            }
            else {
                $('#validationErrorMessage5').text('Set Date Should be in between Start Date and End Date');
                isvalid = false;
                return;
            }
        }
        else {
            $('#validationErrorMessage5').text('Set the Start Date and End Date for the Notice');
            isvalid = false;
            return;
        }
    }

    if (isvalid) {
        // Prepare data to be sent in the AJAX request
        var dataToSend = {
            TYPE: ddlSechedulerType == 1 ? 'Once' : (ddlSechedulerType == 2 ? 'Daily' : null), // Ensure Selectedvalue is defined and set properly
            Startdate: Startdate, // Ensure Startdate is defined and set properly
            Enddate: Enddate, // Ensure Enddate is defined and set properly
            SENDTIME: formattedDateTime, // formattedDateTime should be the correctly formatted time (e.g., 2010-09-03 14:11:00.000)
            SENDDATE: SelectedDate || '' // Use empty string if SelectedDate is undefined or null
        };
        $.ajax({
            type: 'POST',
            url: '/Admin/SMSSchedulerInsert', // Replace with your actual endpoint URL
            data: dataToSend, // Sending the data object as the request body
            success: function (response) {
                // Handle success (response from server)
                if (response.success) {
                    // Success logic (e.g., show a success message, reset the form, etc.)
                    alert('Scheduler successfully submitted!');
                    // Optionally, reset form or update UI
                } else {
                    // Handle failure (response from server)
                    $('#validationErrorMessage5').text(response.errorMessage || 'An error occurred while submitting.');
                }
            },
            error: function (xhr, status, error) {
                // Handle AJAX error
                $('#validationErrorMessage5').text('An error occurred. Please try again.');
            }
        });
    }
});