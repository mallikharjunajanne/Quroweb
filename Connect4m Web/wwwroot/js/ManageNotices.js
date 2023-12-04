
//-----------------------------------------Search and add users to post this notice  this  href click code start
//===================Add User Post Notice 

//const { userdata } = require("modernizr");

var Instanceid = $('#Instance_Txtid').val();


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
        url: "/Admin/ManageNotices_InstanceClassificationSearch?InstanceId="+Instanceid,
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

$(document).ready(function () {
    $('#OnceNdailydd_id').change(function () {
        var selectedValue = $(this).val();

        if (selectedValue === 'Daily') {       
            $('#Daily_div1, #Daily_div2, #Daily_div3, #Daily_div4').hide();
        } else {            
            $('#Daily_div1, #Daily_div2, #Daily_div3, #Daily_div4').show();
        }
    });
});

$(document).ready(function () {
    $('#SchedulerClearbtn').click(function () {
        $('#OnceNdailydd_id').val('');
        $('select.form-control.form-select').val('');
    });
});


$(document).ready(function () {
    $('#SchedulerSubmitbtn').click(function () {
        $('#Scheduleerrormessage').text();
        debugger;
        var Selectedvalue = $('#OnceNdailydd_id').val();
        var SelectedDate = $('#datetxtid').val();
        var Startdate = $('#Startdatetxtid').val();
        var Enddate = $('#Enddatetxtid').val();
        var formattedStartDate = convertDateFormat(Startdate); //--"YYYY-MM-DD"
        var formattedEndDate = convertDateFormat(Enddate); //--"YYYY-MM-DD"
        var SENDTIME;
        var datesBetween = getDatesBetween(formattedStartDate, formattedEndDate);
    
        var selectedHour = parseInt($('#TimeHoursdd_id').val(),10);
        var selectedMinute = parseInt($('#Timeminutesdd_id').val(), 10);

        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        var currentMinute = currentTime.getMinutes();        
       
        if (Selectedvalue && Selectedvalue !== '0') {
            if (!isNaN(selectedHour) && !isNaN(selectedMinute)) {
                if (SelectedDate =="" && !datesBetween.includes(SelectedDate)) {
                    if (currentHour >= selectedHour) {
                        if (currentMinute <= selectedMinute) {
                            SENDTIM = SelectedDate + currentHour + ":" + currentMinute + ":" + "00";
                        }
                        else {
                            $('#Scheduleerrormessage').text('Set Time Should be greater than current time');
                            return;
                        }
                    }
                    /*$('#Scheduleerrormessage').text('SMS Schedule date Should be in between Start Date and End Date');*/
                    return;
                } else {
                    if (currentHour <= selectedHour) {
                        if (currentMinute <= selectedMinute) {
                            SENDTIM = SelectedDate + currentHour + ":" + currentMinute + ":" + "00";
                        }
                        else {
                            $('#Scheduleerrormessage').text('Set Time Should be greater than current time');
                            return;
                        }
                    }
                    else{
                        $('#Scheduleerrormessage').text('SMS Schedule date Should be in between Start Date and End Date');
                        return;
                    }
                }
            } else {
                $('#Scheduleerrormessage').text('Set the Time For the SMS');
            }
        } else {
            $("#Scheduleerrormessage").text('Select The Type');
            return;
        }
    });
});

//------***SCHEDULE SMS BOX SCREEN CODE END***---------



//=====SEARCH BUTTON CLICK TABLE DATA SHOWING  FUNCTION CODE START

$(document).ready(function () {
   

   $('#searchButton').click(handle_searchuserstopostnotice_btnclick_tabledata);  
    
});

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
    alert(Le);

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




$('#createsmsbacktomanagenoticescr_btn').on('click', function () {
    //location.reload();
    $('#Search_NoticeView').show();
    //$('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').hide();
    $('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').empty();
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
$('#Postsmsbtn').on('click', function () {
    var S_SmsreturnedValue;
    var P_SmsreturnedValue;
    var S_EmailreturnedValue;
    var P_EmailreturnedValue;
    var ForAll;
    var Tableuserids = [];

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
    var instanceid = Instanceid;
    $.ajax({
        url: "",
        type: "POST",
        data: "",
        success: function (response) {

        }
    });

    alert(ForAll);   

    alert("SMS Value:- " + S_SmsreturnedValue + "P_Sms Value:- " + P_SmsreturnedValue + "S_Email:- " + S_EmailreturnedValue + "P_EmailreturnedValue:-" + P_EmailreturnedValue);
});                                                     

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





//--------------------------=======================================***CREATE NOTICE AND SMS CODE START***================================================--------------------------------

                   //----->NOTICE DROPDOWN FUNCTION CODE
//function NoticeDropdown_UpdateNotice_In_View() {
//    var InstanceIds = $('#Instance_STxt').val();
//    var InstanceIdSS = $('#InstanceIdTXT').val();

//    $.ajax({
//        type: "GET",
//        url: "@Url.Action("NoticeTypedd", "Admin")",
//        data: { InstanceId: InstanceIdSS },
//        success: function (data) {
//            $.each(data, function (index, item) {
//                $("#ENoticeTypeId_UTXT").append($('<option>', {
//                    value: item.value,
//                    text: item.text
//                }));
//            });
//        },
//        error: function (error) {
//            console.error("Error fetching data:", error);
//        }
//    });
//}
//--------------------------=======================================***CREATE NOTICE AND SMS CODE END***================================================--------------------------------
