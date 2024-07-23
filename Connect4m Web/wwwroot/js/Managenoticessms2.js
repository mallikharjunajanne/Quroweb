
//Check All Checkboxes
function CheckAllUsers() {
    debugger;
    var selectAllCheckbox = document.getElementById('Selectallusers_Checkbox');
    var AllUserscheckboxes = document.querySelectorAll('.checkbox-item');

    var checkboxValues = [];

    AllUserscheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkboxValues.push(checkbox.value);
        checkbox.disabled = selectAllCheckbox.checked;
    });


    $('#Adduserstopostnotice_Div').toggle();

    var ForAll = selectAllCheckbox.checked ? 1 : 0;
    return ForAll;
}

//Check All Role Staff Checkboxes only
function handleSelectAllStaffRoleCheckbox() {
    var selectAllStaffRoleCheckbox = document.getElementById('Selectallstaffrole');
    var checkboxes = document.querySelectorAll('.checkbox-Name');
    var StaffcheckboxValues = [];

    selectAllStaffRoleCheckbox.addEventListener('change', function () {
        checkboxes.forEach(function (staffcheckbox) {
            var labelElement = staffcheckbox.nextElementSibling;
            var labelValue = labelElement.textContent.toLowerCase();

            if (labelValue.includes('student')) {
                staffcheckbox.checked = false;
            } else {
                staffcheckbox.checked = selectAllStaffRoleCheckbox.checked;
                StaffcheckboxValues.push(staffcheckbox.value);
            }
        });
    });
}

//Search and add users to post this notice
function PostNoticeaddusertogglediv() {
    var divToShow = document.getElementById('SearchUser_AddUser_DivId_Postnotice');
    divToShow.style.display = (divToShow.style.display === 'none' || divToShow.style.display === '') ? 'block' : 'none';
    if (divToShow.style.display === 'block') {
        fetchClassificationData();
    }
}

function fetchClassificationData() {
    var Classificationdropdown = document.getElementById('Classificationddl');
    if (Classificationdropdown) {
        $.ajax({
            url: "/Admin/NoticeClassificatinddl",
            type: "GET",
            success: function (response) {
                Classificationdropdown.innerHTML = '<option value="">---Select a Department---</option>';
                response.forEach(function (department) {
                    Classificationdropdown.add(new Option(department.classificationName, department.instanceClassificationId));
                });
            }
        });
    }
}

$("#Classificationddl").change(function () {
    var ClassificationIds = $("#Classificationddl").val();

    $.ajax({
        url: "/Admin/Noticeclassesbysubclassddl?Classificationid=" + ClassificationIds,
        // url: "/Admin/ManageNotices_InstanceSubClassificationSearch?InstanceClassificationId=" + ClassificationIds,
        type: "GET",
        success: function (response) {
            debugger;
            var Classificationdropdown = document.getElementById('Subclassddl');
            Classificationdropdown.innerHTML = '<option value="">---Select a class---</option>';
            response.forEach(function (subclassification) {
                var option = document.createElement('option');
                option.value = subclassification.instanceSubClassificationId;
                option.textContent = subclassification.subClassificationName;
                Classificationdropdown.appendChild(option);
            });
        }
    })

})

// Search button click
$('#NoticeUserSeacrhform').submit(function (event) {
    event.preventDefault();
    Searchbtnclick_Usersnoticetbldata();
});

function Searchbtnclick_Usersnoticetbldata() {
    debugger;
    loaddingimg.css('display', 'block');
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
    var MultiAdmissionNumber;
    var currentIds = $('#ExcludeUserIdsspanid').val(); // Get current value from textbox

    var ExcludeUserIds = ''; // New value to add
    var Noofusers = 'OneTwoZero';
    if (currentIds) {
        ExcludeUserIds = currentIds;
    }
    $.ajax({
        type: "POST",
        //url: "/Admin/ManageNotices_PostNoticeSearchtabledata",
        url: "/Admin/NoticeSearchuserstbldata",
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
            MultiAdmissionNumber: MultiAdmissionNumber,
            Noofusers: Noofusers
        },
        success: function (response) {
            bindDatatable(response);
        },
        error: function (error) {
            alert("Something went wrong.....!/n Please try again");
            loaddingimg.css('display', 'none');
        }
    });
}

function bindDatatable(response) {
    debugger;
    loaddingimg.css('display', 'block');
    var listvaluesCount = response.length;
    var Twentystudentuserids;
    var Allstudentuserids;
    if (response && response.length > 0) {
        var slicedResponse = response.slice(0, 20);
        Twentystudentuserids = slicedResponse.map(function (item) {
            return item.studentuserid;
        }).join(',');
        Allstudentuserids = response.map(function (item) {
            return item.studentuserid;
        }).join(',');

    }

    var table = $('#Noticesearchuserstbl').DataTable();
    table.destroy();
    $("#SearchRecordsspid").text(listvaluesCount);
    debugger;
    var newTable = $("#Noticesearchuserstbl").DataTable({
        dom: '<"tops"lf>t<"bottom"ip>',
        buttons: [],
        bProcessing: false,
        bLengthChange: false,
        //lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],
        bfilter: true,
        bSort: false,
        searching: false,
        //scrollX: true,
        //scrollY: '400px',
        //scrollCollapse: true,
        paging: true,
        bPaginate: false,
        pageLength: 20,
        //stateSave:true,
        data: response,
        columns: [
            {
                data: "Studentuserid",
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="form-check-input checkbox-item chkSelect" data-subject-id="' + row.Studentuserid + '" data-enotice-id="' + row.firstName + '" onclick="NoticeAdduserclick(event, \'' + row.studentuserid + '\', \'' + row.instanceUserCode + '\', \'OneTwoZero\')" style="cursor: pointer;">';
                }
            },
            {
                data: "FirstName",
                render: function (data, type, row, meta) {
                    return row.firstName; //+ '<input type="text" value=' + row.FirstName + ' hidden/>'
                }
            },
            {
                data: "AdmissionNumber",
                render: function (data, type, row, meta) {
                    return row.admissionNumber;
                }
            },
            {
                data: "RoleName",
                render: function (data, type, row, meta) {
                    return row.roleName;
                }
            },
            {
                data: "ClassificationName",
                render: function (data, type, row, meta) {
                    return row.classificationName;
                }
            },
            {
                data: "SubClassificationName",
                render: function (data, type, row, meta) {
                    return row.subClassificationName;
                }
            },
            {
                data: "PortalEmail",
                render: function (data, type, row, meta) {
                    return row.portalEmail;
                }
            },
            {
                data: "StudentMobilePhone",
                render: function (data, type, row, meta) {
                    return row.studentMobilePhone;
                }
            },
            {
                data: "ParentMobilePhone",
                render: function (data, type, row, meta) {
                    return row.parentMobilePhone;
                }
            },
            {
                data: "FatherName",
                render: function (data, type, row, meta) {
                    return row.fatherName;
                }
            },
        ],
        initComplete: function () {
            // Append checkboxes to the DataTables DOM
            var $top = $('.tops');
            if (listvaluesCount > 20) {
                $top.append('<label class="control-label col-4" style="color: blue;"><input type="checkbox" class="form-check-input checkbox-item" id="checkbox1" onclick="Twentyusersaddingcheckboxcallingfun(\'' + Twentystudentuserids + '\', \'OneTwoZero\')")"> Select the below 20 user(s).</label>');
                $top.append('<label class="control-label col-6" style="color: blue;"><input type="checkbox" class="form-check-input checkbox-item" id="checkbox2" onclick="Allusersaddingcheckboxcallingfun(\'' + Allstudentuserids + '\', \'AllUsers\')")"> Select all the ' + listvaluesCount + ' user(s) resulted with my search criteria.</label>');
            }
            if (listvaluesCount > 0 && listvaluesCount < 20) {
                $top.append('<label class="control-label col-4" style="color: blue;"><input type="checkbox" class="form-check-input checkbox-item" id="checkbox3"> Select the below ' + listvaluesCount + ' user(s).</label>');
            }
        }
    });
    loaddingimg.css('display', 'none');
}


//WITHOUT SEARCH  TABLE REFRESHING FUNCTION
function Searchbtn_withoutclick_Usersnoticetbldata(Studentuserid, Noofusers) {
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
        type: "POST",
        //url: "/Admin/ManageNotices_PostNoticeSearchtabledata",
        url: "/Admin/NoticeSearchuserstbldata",
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

//SINGLE USER ADD FUNCTION
function NoticeAdduserclick(event, Studentuserid, instanceUserCode, Noofusers) {
    debugger;

    loaddingimg.css('display', 'block');
    var currentIds = $('#ExcludeUserIdsspanid').val(); // Get current value from textbox
    var newIds = Studentuserid; // New value to add

    if (currentIds) {
        // Append new id to existing ids
        newIds = currentIds + ',' + Studentuserid;
        Studentuserid = newIds;
    }
    $('#ExcludeUserIdsspanid').val(newIds); // Update textbox value

    $.ajax({
        url: "/Admin/NoticeSelectedbyuserids?UserIds=" + Studentuserid + "&Noofusers=" + Noofusers,
        //url: "/Admin/SELUsersByUserIds?UserIds=" + Userids + "&Noofusers=" + Noofusers,
        type: "GET",
        success: function (response) {
            $('#PostNoticeAddinguserstable_Div').show();
            Searchbtn_withoutclick_Usersnoticetbldata(Studentuserid, Noofusers);
            Addusersdatatablefunction(response);
            loaddingimg.css('display', 'none');
        }
    });
}

// ADDED TABLE FUNCTION
function Addusersdatatablefunction(response) {
    loaddingimg.css('display', 'block');
    debugger;
    var table = $('#Noticeaddeduserstbl').DataTable();
    table.destroy();
    $("#AddedRecordscountspid").text(response.length);
    debugger;
    var newTable = $("#Noticeaddeduserstbl").DataTable({
        dom: '<"top"lf>t<"bottom"ip>',
        buttons: [],
        bProcessing: false,
        bLengthChange: false,
        //lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],
        bfilter: true,
        bSort: false,
        searching: false,
        //scrollX: true,
        //scrollY: '400px',
        //scrollCollapse: true,
        paging: true,
        bPaginate: false,
        //stateSave:true,
        data: response,
        columns: [
            {
                data: "FirstName",
                render: function (data, type, row, meta) {
                    return row.firstName + '<input type="text" value=' + row.userId + ' id="Usersidtxt" hidden/>';
                }
            },
            {
                data: "AdmissionNumber",
                render: function (data, type, row, meta) {
                    return row.admissionNumber;
                }
            },
            {
                data: "RoleName",
                render: function (data, type, row, meta) {
                    return row.roleName;
                }
            },
            {
                data: "ClassificationName",
                render: function (data, type, row, meta) {
                    return row.classificationName;
                }
            },
            {
                data: "SubClassificationName",
                render: function (data, type, row, meta) {
                    return row.subClassificationName;
                }
            },
            {
                data: "PortalEmail",
                render: function (data, type, row, meta) {
                    return row.portalEmail;
                }
            },
            {
                data: "StudentMobilePhone",
                render: function (data, type, row, meta) {
                    return row.studentMobilePhone;
                }
            },
            {
                data: "ParentMobilePhone",
                render: function (data, type, row, meta) {
                    return row.parentMobilePhone;
                }
            },
            {
                data: "FatherName",
                render: function (data, type, row, meta) {
                    return row.fatherName;
                }
            },
            {
                data: "Studentuserid",
                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete" onclick="handleTrashClick(\'' + row.studentuserid + '\')"></i>';
                }
            }
        ]
    });
    loaddingimg.css('display', 'none');
}


//ADDED TWENTY USERS CHECKBOX CHECK FUNCTION
function Twentyusersaddingcheckboxcallingfun(Studentuserid, Noofusers) {
    loaddingimg.css('display', 'block');
    var currentIds = $('#ExcludeUserIdsspanid').val(); // Get current value from textbox
    var newIds = Studentuserid; // New value to add

    if (currentIds) {
        // Append new id to existing ids
        newIds = currentIds + ',' + Studentuserid;
        Studentuserid = newIds;
    }
    $('#ExcludeUserIdsspanid').val(newIds); // Update textbox value
    $.ajax({
        url: "/Admin/NoticeSelectedbyuserids?UserIds=" + Studentuserid + "&Noofusers=" + Noofusers,
        //url: "/Admin/SELUsersByUserIds?UserIds=" + Userids + "&Noofusers=" + Noofusers,
        type: "GET",
        success: function (response) {
            $('#PostNoticeAddinguserstable_Div').show();
            Searchbtn_withoutclick_Usersnoticetbldata(Studentuserid, Noofusers);
            Addusersdatatablefunction(response);
            loaddingimg.css('display', 'none');
        }
    });
}

//ADDED ALL USERS CHECKBOX CHECK FUNCTION
function Allusersaddingcheckboxcallingfun(Studentuserid, Noofusers) {
    debugger;
    loaddingimg.css('display', 'block');
    var currentIds = $('#ExcludeUserIdsspanid').val(); // Get current value from textbox
    var newIds = Studentuserid; // New value to add

    if (currentIds) {
        // Append new id to existing ids
        newIds = currentIds + ',' + Studentuserid;
        Studentuserid = newIds;
    }
    $('#ExcludeUserIdsspanid').val(newIds); // Update textbox value
    $.ajax({
        url: "/Admin/NoticeSelectedbyuserids?UserIds=" + Studentuserid + "&Noofusers=" + Noofusers,
        //url: "/Admin/SELUsersByUserIds?UserIds=" + Userids + "&Noofusers=" + Noofusers,
        type: "GET",
        success: function (response) {
            $('#PostNoticeAddinguserstable_Div').show();
            Searchbtn_withoutclick_Usersnoticetbldata(Studentuserid, Noofusers);
            Addusersdatatablefunction(response);
            loaddingimg.css('display', 'none');
        }
    });
}


//REMOVE ADDED TABLE TO REMOVE FUNCTION
function handleTrashClick(Removestudentuserid) {
    debugger;
    var Noofusers = 'OneTwoZero';
    var currentIds = $('#ExcludeUserIdsspanid').val();
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
        $('#ExcludeUserIdsspanid').val(newIds);
    }
    $.ajax({
        url: "/Admin/NoticeSelectedbyuserids?UserIds=" + Studentuserid + "&Noofusers=" + Noofusers,
        //url: "/Admin/SELUsersByUserIds?UserIds=" + Userids + "&Noofusers=" + Noofusers,
        type: "GET",
        success: function (response) {
            $('#PostNoticeAddinguserstable_Div').show();
            Searchbtn_withoutclick_Usersnoticetbldata(Studentuserid, Noofusers);
            Addusersdatatablefunction(response);
            loaddingimg.css('display', 'none');
        }
    });

}

//POST BUTTON CLICK FUNCTION
$('#Postnoticebtn').click(function () {
    try {

        //No Selection Has Been Made. Please Select Any User
        $('#Commonerrormessage').text('');
        var $button = $(this);
        debugger;

        //var allChecked = $('.Chkitem:checked').length === $('.Chkitem').length;

        var Tableuserids = [];
        var ForAll = 0;
        var Emailcheked = 0;
        var IncludeParents = 0;

        var Studentsms = 0;
        var Parentsms = 0;
        var Studentmail = 0;
        var Parentmail = 0;

        var ENoticeId = $('#ENoticetxtid').val();
        var NotificationMessage = $('#Lbl_Notificationmessageid').text();
        var NoticeTypeId = $('#TxtNoticetypeid').val();
        var NoticeTypeName = $('#TxtNoticetypetext').val();
        var Noticetypdedescription = $('#TxtNoticetypedescription').val();


        var allCheckedlength = $('.Chkitem:checked').length > 0;
        var ALLUSERCHECKBOXchecked = false;
        if ($('#Selectallusers_Checkbox').prop('checked')) {
            ALLUSERCHECKBOXchecked = true;
            ForAll = 1;
        }

        if (allCheckedlength || ALLUSERCHECKBOXchecked) {

            if ($('#SMSStudentChk1').prop('checked')) {
               // Emailcheked = "1";
                 Studentsms = "1";
            }

            if ($('#SMSParentChk2').prop('checked')) {
                // Emailcheked = "1";
                 Parentsms = "1";
            }

            if ($('#MailStudentChk3').prop('checked')) {
                //Emailcheked = "1";
                Studentmail = "1";
            }

            if ($('#MailParentChk4').prop('checked')) {
               // IncludeParents = "1";
                Parentmail = "1";
            }

            var RolecheckboxSelector = 'input[type="checkbox"][name="rolecheckbox"]';
            var GrpcheckboxSelector = 'input[type="checkbox"][name="Grpcheckbox"]';
            var ClscheckboxSelector = 'input[type="checkbox"][name="Clscheckbox"]';
            var SclcheckboxSelector = 'input[type="checkbox"][name="Sclcheckbox"]';
            var Allcheckboxvalues = Getcheckboxvalues(RolecheckboxSelector, GrpcheckboxSelector, ClscheckboxSelector, SclcheckboxSelector);
            var Rolecheckboxvalues = Allcheckboxvalues['Rolecheckbox'];
            var Groupcheckboxvalues = Allcheckboxvalues['Grpcheckbox'];
            var Classificationcheckboxvalues = Allcheckboxvalues['Clscheckbox'];
            var Subclassificationcheckboxvalues = Allcheckboxvalues['Sclcheckbox'];

            if ($("#Noticeaddeduserstbl tbody tr").length > 0) {
                var tabledata = $("#Noticeaddeduserstbl tbody tr");
                tabledata.each(function (row, tr) {
                    var Zerocolumntext = $(tr).find('td:nth-child(0) #Usersidtxt').val();
                    Tableuserids.push(Zerocolumntext);
                });
            }

            var datatosend = {
                ENoticeId: ENoticeId,
                RoleIds: Rolecheckboxvalues,
                GroupIds: Groupcheckboxvalues,
                ClassificationIds: Classificationcheckboxvalues,
                SubClassificationIds: Subclassificationcheckboxvalues,
                NoticeTypeName: NoticeTypeName,
                UserIds: Tableuserids,
                //SendSMS: S_SmsreturnedValue,
                SendEMail: Emailcheked,
                IncludeParents: IncludeParents,
                Studentsms: Studentsms,
                Parentsms: Parentsms,
                Studentmail: Studentmail,
                Parentmail: Parentmail
            };
            if (Tableuserids.length > 0) {
                datatosend.UserIds = Tableuserids;
            }
            if (!ALLUSERCHECKBOXchecked) {

                var anyCheckboxChecked =
                    //$('#Sendsms_chk1').is(':checked') ||
                    //$('#Sendsms_chk2').is(':checked') ||
                    //$('#Sendsms_chk3').is(':checked') ||
                    //$('#Sendsms_chk4').is(':checked') ||
                    Rolecheckboxvalues.length > 0 ||  // Assuming these arrays contain checkbox values
                    Groupcheckboxvalues.length > 0 ||
                    Classificationcheckboxvalues.length > 0 ||
                    Subclassificationcheckboxvalues.length > 0 ||
                    Tableuserids.length > 0;

                if (!anyCheckboxChecked) {
                    $('#Commonerrormessage').text('No Selection Has Been Made. Please Select Any User');
                    allCheckedlength = false;
                    $(window).scrollTop(0);
                    return; // Prevent further execution
                }
            }

            $.ajax({
                ////url: "/Admin/ENoticeMailSms_INSERT",
                //url: "/Admin/Noticesms_mailsposting",
                url: "/Admin/NOTICESMSMail_POSTING",
                type: "POST",
                data: datatosend,
                success: function (response) {
                    debugger;
                    var Returnmessage = "";

                    if (response == "1") {
                        Returnmessage += 'Notice Posted Successfully. ' + NotificationMessage;
                        $button.prop('disabled', true);
                    } else if (response =="-1") {
                        Returnmessage += 'Notice Not Posted' + NotificationMessage;
                        $button.prop('disabled', false);
                    }
                    else {
                        debugger;
                        var studentlist = response.studentlist;
                        var parentlist = response.parentlist;
                        if ($('#SMSStudentChk1').prop('checked')) {
                            if (studentlist.length > 0) {
                                debugger;
                                Returnmessage += 'Notice Posted Successfully. ' + NotificationMessage + ' SMS sent successfully submitted To User(s). For Student(s): ';
                                for (var i = 0; i < studentlist.length; i++) {
                                    if (studentlist[i] != null) {
                                        Returnmessage += studentlist[i];
                                        if (i < studentlist.length - 1) {
                                            Returnmessage += ', '; // Add comma between students, except for the last one
                                        }
                                    }
                                }
                                Returnmessage += ' No EMail Id Exists.';
                            }
                        }
                        if ($('#SMSParentChk2').prop('checked')) {
                            if (parentlist.length > 0) {
                                debugger;
                                Returnmessage += ' SMS sent successfully submitted To User(s). For Parent(s): ';
                                for (var j = 0; j < parentlist.length; j++) {
                                    if (parentlist[i] != null) {
                                        Returnmessage += parentlist[i];
                                        if (i < parentlist.length - 1) {
                                            Returnmessage += ', '; // Add comma between students, except for the last one
                                        }
                                    }
                                }
                                Returnmessage += ' No EMail Id Exists.';
                            }
                        }
                        if ($('#MailStudentChk3').prop('checked')) {
                            if (studentlist.length > 0) {
                                debugger;
                                Returnmessage += 'Notice Posted Successfully. ' + NotificationMessage + ' Email successfully submitted To User(s). For Student(s): ';
                                for (var i = 0; i < studentlist.length; i++) {
                                    if (studentlist[i] != null) {
                                        Returnmessage += studentlist[i];
                                        if (i < studentlist.length - 1) {
                                            Returnmessage += ', '; // Add comma between students, except for the last one
                                        }
                                    }
                                }
                                Returnmessage += ' No EMail Id Exists.';
                            }
                        }
                        if ($('#MailParentChk4').prop('checked')) {
                            if (parentlist.length > 0) {
                                debugger;
                                Returnmessage += ' Email successfully submitted To User(s). For Parent(s): ';

                                for (var j = 0; j < parentlist.length; j++) {
                                    if (parentlist[j] != null) {
                                        Returnmessage += parentlist[i];
                                        if (i < parentlist.length - 1) {
                                            Returnmessage += ', '; // Add comma between students, except for the last one
                                        }
                                    }
                                }
                                Returnmessage += ' No EMail Id Exists.';

                            }
                        }
                        if (studentlist.length == 0 && parentlist.length == 0) {
                            Returnmessage += 'Notice Posted Successfully. ' + NotificationMessage;
                            $button.prop('disabled', true);
                        }
                    }
                    $('#Commonerrormessage').append(Returnmessage);
                },
                error: function (xhr, status, error) {
                    // Handle error
                    console.error("Error calling API:", error);
                }
            });
        }
        else {

            // Display a message or perform an action if not all checkboxes are checked
            $('#Commonerrormessage').text('No Selection has been Made. Please Select Any User.');
            allCheckedlength = false;
            $(window).scrollTop(0);
            return;
        }

    }
    catch (e) {
        console.error("An error occurred:", e.message);
        alert("Script Error : " + e.message);
    }
});


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

//BACK TO SEARCH 
$('#PostnoticeBacktosearchbtn').click(function () {
    $('#Commonerrormessage').text('');
    window.location.reload();
});