               /*=====***** MANAGE NOTICE_2 *****=====*/

/*------=======**** CREATE SMS SCREEN JAVASCRIPT CODE START ****=======------*/



////=========>>>Edit SMS Template  btnSMSNext
////=========>>> Edit SMS Template button click fire function
$("#btnSMSNext").on("click", function () {

    if ($("input[name='Radio1']:checked").length != 0) {

        $('#SmsErrormessage').text('');

        var TemplateMasterPK = $("input[name='Radio1']:checked").val();

        var InstanceId = $("#Instance_Txtid").val();

        var EditSMSSubmitbutton = document.getElementById('btnSMSNext');
        EditSMSSubmitbutton.disabled = true;

        var radioButtons = document.querySelectorAll("input[name='Radio1']");
        radioButtons.forEach(function (radioElement) {
            radioElement.disabled = true;
        });

        $.ajax({
            url: "/Admin/SMS_TemplateandDetails?InstanceId=" + InstanceId + "&TemplateMasterPK=" + TemplateMasterPK,
            type: "GET",
            success: function (response) {
                debugger;
                $('#SmsTemplatedetailsViewDiv_ManageNotices_createsms').html(response);
            }
        });
    } else {

        $('#SmsErrormessage').text("Please select one template.");
        return false;
    }
});


$("#btnSMSBackToSearch").click(function () {
    $('#ManageNotices_CreateSMS_ViewDivid').empty();
    location.reload();
});




///===============>>>>>>>>>> SMS TEMPLATES AND <<<<<<<<<<<=============

function GetDateFormat(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
}


//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {      
        var StartdateInput = $("#Startdate_txt").val();
        var EnddateInput = $("#EndDate_txt").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var formattedStartDate = GetDateFormat(Startdate);
        var formattedEndDate = GetDateFormat(Enddate);

        var errorElement = $('.compare');

        if (formattedStartDate != formattedEndDate) {
            if (Enddate <= Startdate) {
                $('#Errormessage').text(Edate + " must be greater than " + Sdate + ".");
            } else {
                $('#Errormessage').text("");
            }
        } else {          
            $('#Errormessage').text("");
        }       
    }
    catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$(".form-group #Startdate_txt").on("change", function () { DatesCompare("Start Date", "End Date"); });
$(".form-group #EndDate_txt").on("change", function () { DatesCompare("Start Date", "End Date"); });



///===============>>>>>>>>>>BACK TO TEMPLATE
$("#btnBackSMSTemplate").click(function () {
   
    var EditSMSSubmitbutton = document.getElementById('btnSMSNext');
    EditSMSSubmitbutton.disabled = false;


    var radioButtons = document.querySelectorAll("input[name='Radio1']");
    radioButtons.forEach(function (radioElement) {
        radioElement.disabled = false;
    });

    $('#SmsTemplatedetailsViewDiv_ManageNotices_createsms').empty();

});



//=====>>>> Save and Post button fire SaveandPost_CreateSmsbtn
$("#btnSaveandPostSMSTemplate").click(function () {
    debugger;
    var instanceid = $('#Instance_Txtid').val();
    var StartDate = $('#Startdate_txt').val();
    var ExpiryDate = $('#EndDate_txt').val();
    var Subject = $('#Subject_txt').val();
    var DisplayIcon = $('#DisplayIcon_txt').val();
    var CreatedBy = $('#Loginuser_Txtid').val();
    var divText = $('#TemplateDescription_divId').text().trim();
    var errorMessage = "";
    var textValues = [];
    $('.textInput').each(function () {
        var inputNumber = $(this).attr('id').replace('txt', '');
        var inputValue = $(this).val();
        var inputName = $(this).attr('name');
        if (inputValue === "") {
            errorMessage += "Please enter text in " + inputNumber + " text box .\n";
            inputValue = "";
            inputName = "";
        }
        if (inputName == "textValue") {
            textValues.push({ textValue: inputNumber, value: inputValue });
        } else if (inputName == "dateValue") {
            var dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            if (!dateRegex.test(inputValue)) {
                errorMessage += "Incorrect date format in " + inputNumber + "text box .\n";
            } else {
                textValues.push({ dateValue: inputNumber, value: inputValue });
            }
        } else if (inputName == "timeValue") {
            textValues.push({ timeValue: inputNumber, value: inputValue });
        } else if (inputName == "numericValue") {
            textValues.push({ numericValue: inputNumber, value: inputValue });
        }
    });
     
    var Subjecttext = Subject;
    var txt = 1;
    var date = 1;
    var time = 1;
    var numeric = 1;
    for (var i = 0; i < textValues.length; i++) {       

        if (textValues[i].textValue != undefined) {
            var textPlaceholder = '{TEXT' + txt + '}';
            if (Subjecttext.includes(textPlaceholder)) {

                Subjecttext = Subjecttext.replace(new RegExp(textPlaceholder, 'g'), textValues[i].value);
                txt++;
            }
        }
        else if (textValues[i].dateValue != undefined) {
            var datePlaceholder = '{DATE' + date + '}';
            if (Subjecttext.includes(datePlaceholder)) {

                Subjecttext = Subjecttext.replace(new RegExp(datePlaceholder, 'g'), textValues[i].value);
                date++;
            }
        }
        else if (textValues[i].timeValue != undefined) {
            var timePlaceholder = '{TIME' + time + '}';
            if (Subjecttext.includes(timePlaceholder)) {

                Subjecttext = Subjecttext.replace(new RegExp(timePlaceholder, 'g'), textValues[i].value);
                time++;
            }
        }
        else if (textValues[i].numericValue != undefined) {
            var numericPlaceholder = '{NUMERIC' + numeric + '}';
            if (Subjecttext.includes(numericPlaceholder)) {

                Subjecttext = Subjecttext.replace(new RegExp(numericPlaceholder, 'g'), textValues[i].value);
                numeric++;
            }

        }
    }

    var DisplayOrder = 1;
    var formData = new FormData();
    formData.append('InstanceId', instanceid);
    formData.append('SDate', StartDate);
    formData.append('ExDate', ExpiryDate);
    formData.append('Subject', Subjecttext);
    formData.append('DisplayIcon', DisplayIcon);
    formData.append('CreatedBy', CreatedBy);
    formData.append('NoticeDocument', '');
    formData.append('DisplayOrder', DisplayOrder);


    $.ajax({
        url: "/Admin/ManagenoticeSMS_saveNposting", //=====>>>New Method Adding
        //url: "/Admin/SaveandPostBtn_ManageNotices_CreateSMS",
        type: "POST",
        data: formData,
        processData: false,  
        contentType: false,
        success: function (response) {
            debugger;
            /*  $('#SmsTemplatedetailsViewDiv_ManageNotices_createsms').hide();*/
            $('#Managenotice_CreateSMS_Divid').hide();
            $('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').html(response);
        }
    });


    /*console.log(Subjecttext);*/

    if (textValues.length === 0) {
        errorMessage += "No text inputs found.\n";
    }

    if (StartDate === "") {
        errorMessage += "Start date is empty.\n";
    }

    if (ExpiryDate === "") {
        errorMessage += "End date is empty.\n";
    }

    if (StartDate > ExpiryDate) {
        errorMessage += "Start date cannot be greater than end date.\n";
    }

    if (errorMessage !== "") {
        $("#Errormessage").text(errorMessage);
        return false;
    }
});






//===========================********** Post Notice screen **********===========================

//=========>>>>Check all
function funCheckAllUsers() {
    debugger;
    var selectAllCheckbox = document.getElementById('Selectallusers_Checkbox');
    var AllUserscheckboxes = document.querySelectorAll('.checkbox-item');

    var checkboxValues = [];

    AllUserscheckboxes.forEach(function (checkbox) {
        checkbox.checked = false;
        checkboxValues.push(checkbox.value);
        checkbox.disabled = selectAllCheckbox.checked;
    });

    var ForAll = selectAllCheckbox.checked ? 1 : 0;
    return ForAll;
}


//=========>>>>Select all Staff Role
function Handleselectallstaffrolecheckbox() {
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

//=========>>>>Search and add users to post this notice
function Postnoticeaddusertogglediv() {
    var divToShow = document.getElementById('SearchUser_AddUser_DivId_Postnotice');
    

    divToShow.style.display = (divToShow.style.display === 'none' || divToShow.style.display === '') ? 'block' : 'none';
    if (divToShow.style.display === 'block') {
        fetchClassificationData();
        $('#Searchuserstopostnotice_searchform')[0].reset();
    }


    //var divToShow = document.getElementById('SearchUser_AddUser_DivId_Postnotice');
    //debugger;
    //if (divToShow.style.display === 'none' || divToShow.style.display === '') {
    //    divToShow.style.display = 'block';

    //    adduserstopostthisnotice$InstanceClassificationSearch();

    //} else {
    //    divToShow.style.display = 'none';
    //}
}
function fetchClassificationData() {
    var Classificationdropdown = document.getElementById('Classificationid');
    if (Classificationdropdown) {
        $.ajax({
            url: "/Admin/ManageNotices_InstanceClassificationSearch",
            //url: "/Admin/ManageNotices_InstanceClassificationSearch?InstanceId=" + Instanceid,
            type: "GET",
            success: function (response) {
                Classificationdropdown.innerHTML = '<option>---Select a Department---</option>';
                response.forEach(function (department) {
                    Classificationdropdown.add(new Option(department.classificationName, department.instanceClassificationId));
                });
            }
        });
    }
}

$("#Classificationid").change(function () {
    var ClassificationIds = $("#Classificationid").val();
    //  alert(ClassificationIds);
    departmentchange(ClassificationIds);

})
function departmentchange(ClassificationIds) {
    $.ajax({
        url: "/Admin/ManageNotices_InstanceSubClassificationSearch?InstanceClassificationId=" + ClassificationIds,
        type: "GET",
        success: function (response) {
            debugger;
            var Classificationdropdown = document.getElementById('Subclassificationid');
            Classificationdropdown.innerHTML = '<option>---Select a class---</option>';
            response.forEach(function (subclassification) {
                var option = document.createElement('option');
                option.value = subclassification.instanceSubClassificationId;
                option.textContent = subclassification.subClassificationName;
                Classificationdropdown.appendChild(option);
            });
        }
    })

}



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


//=========>>>> Search button click
$('#Searchuserstopostnotice_searchform').submit(function (event) {
    event.preventDefault();
    handle_searchuserstopostnotice_btnclick_tabledata();
});

function handle_searchuserstopostnotice_btnclick_tabledata() {

    //$('#PostNoticeAddinguserstable_Div').hide();
    debugger;
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



//  ======>>> *** ONLY TWENTY USERS SELECT *** <<<======  //
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



//  ======>>> *** SELECT ONLY CURRENT PAGE USERS  *** <<<======  //
function chkSelectCurrentPageUsers(Userscount, ExcludeUsersid) {
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



//  ======>>> *** SELECT ALL USERS FUNCTION CODE START *** <<<======  //
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
//  ======>>> *** SELECT ALL USERS FUNCTION CODE END *** <<<======  //


//  ======>>> *** ADD USERS TO POST NOTICE IN TABLE *** <<<======  //
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
//  ======>>> *** ADD USERS TO POST NOTICE IN TABLE *** <<<======  //


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

//=======>>>  *** POST NOTICE SAVE NOTICE BUTTON  ***  <<<=======//
$('#Postnoticebtn').click(function () {
    $('#lblPostNoticeMsg').text('');

    var S_SmsreturnedValue;
    var P_SmsreturnedValue;
    var S_EmailreturnedValue;
    var P_EmailreturnedValue;
    var ForAll;
    var Tableuserids = [];
    var ENoticeId = $('#ENoticetxtid').val();
    var CreatedBy = $('#Loginuser_Txtid').val();
    var instanceid = Instanceid;
    if ($('#Sendsms_chk1').is(':checked')) {
        S_SmsreturnedValue = "1";
    } else {
        S_SmsreturnedValue = "0";
    }

    if ($('#Sendsms_chk2').is(':checked')) {
        P_SmsreturnedValue = "1";
    } else {
        P_SmsreturnedValue = "0";
    }

    if ($('#Sendsms_chk3').is(':checked')) {
        S_EmailreturnedValue = "1";
    } else {
        S_EmailreturnedValue = "0";
    }
    if ($('#Sendsms_chk4').is(':checked')) {
        P_EmailreturnedValue = "1";
    } else {
        P_EmailreturnedValue = "0";
    }

    var RolecheckboxSelector = 'input[type="checkbox"][name="rolecheckbox"]';
    var GrpcheckboxSelector = 'input[type="checkbox"][name="Grpcheckbox"]';
    var ClscheckboxSelector = 'input[type="checkbox"][name="Clscheckbox"]';
    var SclcheckboxSelector = 'input[type="checkbox"][name="Sclcheckbox"]';

    debugger;

    var Allcheckboxvalues = Getcheckboxvalues(RolecheckboxSelector, GrpcheckboxSelector, ClscheckboxSelector, SclcheckboxSelector);
    var Rolecheckboxvalues = Allcheckboxvalues['Rolecheckbox'];
    var Groupcheckboxvalues = Allcheckboxvalues['Grpcheckbox'];
    var Classificationcheckboxvalues = Allcheckboxvalues['Clscheckbox'];
    var Subclassificationcheckboxvalues = Allcheckboxvalues['Sclcheckbox'];

    var selectAllCheckbox = document.getElementById('Selectallusers_Checkbox');
    if (selectAllCheckbox.checked) {
        ForAll = 1;
    } else {
        ForAll = 0;
    }
    if ($("#PostNoticetblid_searchandadduserspostthisnotice_Table tbody tr").length > 0) {
        var tabledata = $("#PostNoticetblid_searchandadduserspostthisnotice_Table tbody tr");
        tabledata.each(function (row, tr) {
            var ninthColumnText = $(tr).find('td:nth-child(10) #Usersidtxt').val();
            Tableuserids.push(ninthColumnText);
        });
    }
    var datatosend = {
        ENoticeId: ENoticeId,
        CreatedBy: CreatedBy,
        instanceid: instanceid,
        RoleIds: Rolecheckboxvalues,
        GroupIds: Groupcheckboxvalues,
        ClassificationIds: Classificationcheckboxvalues,
        SubClassificationIds: Subclassificationcheckboxvalues,
        //UserIds: Tableuserids,
        SendSMS: S_SmsreturnedValue,
        SendEMail: S_EmailreturnedValue,
        IncludeParents: P_EmailreturnedValue
    };
    if (Tableuserids.length > 0) {
        datatosend.UserIds = Tableuserids;
    }
    debugger;
    var anyCheckboxChecked =
        $('#Sendsms_chk1').is(':checked') ||
        $('#Sendsms_chk2').is(':checked') ||
        $('#Sendsms_chk3').is(':checked') ||
        $('#Sendsms_chk4').is(':checked') ||
        Rolecheckboxvalues.length > 0 ||  // Assuming these arrays contain checkbox values
        Groupcheckboxvalues.length > 0 ||
        Classificationcheckboxvalues.length > 0 ||
        Subclassificationcheckboxvalues.length > 0 ||
        Tableuserids.length > 0;

    if (!anyCheckboxChecked) {
        // If no checkboxes are checked, show the validation message
        $('#lblPostNoticeMsg').text('No Selection Has Been Made. Please Select Any User');
        return; // Prevent further execution
    }

    $.ajax({
        url: "/Admin/ENoticeMailSms_INSERT",
        type: "POST",
        data: datatosend,
        success: function (response) {
            debugger;
            var string1 = response.pushNotifications_Notices;
            var Subjecttext = $('#Search_result_count').val();

            var Usersli = response.tblENotice_GetTargetUsers;
            var usersWithoutEmail = [];
            var usersWithoutMobile = [];
            for (var i = 0; i < Usersli.length; i++) {
                var UserfirstName = Usersli[i].firstName;
                if (Usersli[i].mobilePhone === "0") {
                    usersWithoutMobile.push(UserfirstName);
                }
                if (Usersli[i].portalEmail === "0") {
                    usersWithoutEmail.push(UserfirstName);
                }
            }
            if (P_SmsreturnedValue == "1") {
                if (usersWithoutMobile.length > 0) {
                    var mobileMsg = 'Notice Posted Successfully.' + Subjecttext + ' For Users ' + usersWithoutMobile.join(',') + ' No Mobile Number Exists for Parent(s).';
                    $('#lblPostNoticeMsg').append(mobileMsg);
                }
            }

            if (S_SmsreturnedValue == "1") {
                if (usersWithoutMobile.length > 0) {
                    var mobileMsg = 'For Users ' + usersWithoutMobile.join(',') + ' No Mobile Number Exists.';
                    $('#lblPostNoticeMsg').append(mobileMsg);
                }
            }

            if (S_EmailreturnedValue == "1") {
                if (usersWithoutEmail.length > 0) {
                    var emailMsg = 'Email successfully submitted To User(s).For Student(s) ' + usersWithoutEmail.join(',') + 'No EMail Id Exists.';
                    $('#lblPostNoticeMsg').append(emailMsg);
                }
            }

            if (P_EmailreturnedValue == "1") {
                if (usersWithoutEmail.length > 0) {
                    var emailMsg = '.Email successfully submitted to Parent(s).For Parent(s) ' + usersWithoutEmail.join(',') + 'No EMail Id Exists.';
                    $('#lblPostNoticeMsg').append(emailMsg);
                }
            }
        }
    });
});