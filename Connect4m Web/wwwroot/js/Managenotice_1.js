                  /*=====***** MANAGE NOTICE_1 *****=====*/
/*------=======**** CREATE NOTICE SCREEN JAVASCRIPT CODE START ****=======------*/

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



$(document).ready(function () {
    $("#btnppostthisnotice").hide();

    // $("#Addnotice_div1").empty();
    $("#ManageNotices_CreateSMSNNotice_ViewDivid").empty();
    $("#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id").empty();

  


    /*------**** NOTICE TYPE DROPDOWN BIND THIS PLACE ****--------*/
     $.ajax({
        type: "GET",
        url: "/Admin/NoticeTypedd",
        dataType: "json",
        success: function (data) {
            $("#ENoticeTypeId_STXT").empty();
            debugger;
            $("#ENoticeTypeId_STXT").append('<option value="">---Select---</option>'); 
            $.each(data, function (index, item) {
                $("#ENoticeTypeId_STXT").append($('<option>', {
                    value: item.value,
                    text: item.text
                }));
            });
        },
        error: function (error) {
            console.error("Error fetching data:", error);
        }
    });
    /*------**** NOTICE TYPE DROPDOWN BIND THIS PLACE ****--------*/


   // $("#NoticeDisplaylogin").show();
   
});

$("#ENoticeTypeId_STXT").change(function () {
    debugger;
    if ($(this).val() != "") {
        $("#NoticeDisplaylogindivid").hide();
    } else {
        $("#NoticeDisplaylogindivid").show();
    }
});


$(document).ready(function () {

    //const PostNoticeButton = document.getElementById("PostthisNotice_SaBtn");
    //PostNoticeButton.style.display = "none";
    //debugger;
    //alert("its working ....!");


    //// $("#Addnotice_div1").empty();
    //$("#ManageNotices_CreateSMSNNotice_ViewDivid").empty();
    //$("#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id").empty();

    //NoticeDropdown_CreateNotice_In_View();

    //$("#NoticeDisplaylogin").show();
    //$("#ENoticeTypeId_STXT").change(function () {
    //    debugger;
    //    if ($(this).val() != " ") {
    //        $("#NoticeDisplaylogin").hide();
    //    } else {
    //        $("#NoticeDisplaylogin").show();
    //    }
    //});


    //$.ajax({
    //    type: "GET",
    //    url: "/Admin/NoticeTypedd",
    //    dataType: "json",
    //    success: function (data) {
    //        $("#ENoticeTypeId_STXT").empty();
    //        debugger;
    //        $.each(data, function (index, item) {
    //            $("#ENoticeTypeId_STXT").append($('<option>', {
    //                value: item.value,
    //                text: item.text
    //            }));
    //        });
    //    },
    //    error: function (error) {
    //        console.error("Error fetching data:", error);
    //    }
    //});
});



$('#btnBackToSearch').click(function () {
    debugger;
    $('#Message_spid').text('');
    $('#Addnotice_div1').empty();
    $('#Home_SearchNoticesdiv').show();
    $('#Home_SearchNotices_Updatediv').hide();
   

    //$('#ManageNotices_CreateSMS_ViewDivid').empty();
    //$('#ManagenoticeMaindiv').show();
});




function GetDateFormat(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
}

//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {
        var StartdateInput = $("#Startdatetxt").val();
        var EnddateInput = $("#Exdatetxt").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var formattedStartDate = GetDateFormat(Startdate);
        var formattedEndDate = GetDateFormat(Enddate);

        var errorElement = $('.compare');

        if (formattedStartDate != formattedEndDate) {
            if (Enddate <= Startdate) {
                $('#Ermsgsp').text(Edate + " must be greater than " + Sdate + ".");
            } else {
                $('#Ermsgsp').text("");
            }
        } else {
            $('#Ermsgsp').text("");
        }
    }
    catch (error) {
        console.log(error);
    }
}

//-------------------***Date Compare
$("#Startdatetxt").on("change", function () { DatesCompare("Start Date", "End Date"); });
$("#Exdatetxt").on("change", function () { DatesCompare("Start Date", "End Date"); });




/* ------** SAVE BUTTON AND SAVE AND POST BUTTON CLICK FIRE FUNCTIONS***-------   */

$('#Createnoticetypeform1').submit(function (event) {
    event.preventDefault();

    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationmelength = validationMessages.length;
        $('#Message_spid').text('');

        if (validationmelength == 0 && validationMessages2.length == 0) {
            var formdata_ISN = new FormData($('#Createnoticetypeform1')[0]);

            var fileInput = document.getElementById('AttachedDocument');
            if (fileInput.files.length > 0) {
                var file = fileInput.files[0];
                formdata_ISN.append('AttachedDocument', file);
            }
            debugger;
            var ShowInLogin = $('#radio55').val();
            formdata_ISN.append('ShowInLogin', ShowInLogin);   
            var Clickbuttonid = $(document.activeElement).attr('id');
            var Subject = $('#Subjecttxt').val();
            var NoticeTypeId = $('#ENoticeTypeId_STXT').val();
            var NoticeTypetext = $('#ENoticeTypeId_STXT option:selected').text();
            var ENOTICEID = $('#ENoticeinsertedtxtid').val();
            formdata_ISN.append('NoticeTypetext', NoticeTypetext);

            //$('#TxtNoticetypeid').val(NoticeTypeId);
            //$('#TxtNoticetypetext').val(NoticeTypetext);
            //$('#TxtNoticetypeid').text(NoticeTypeId);
            //$('#TxtNoticetypetext').text(NoticeTypetext);

            switch (Clickbuttonid) {
                case 'btnsubmit':
                    FileCallToAjax('POST', '/Admin/ManageNotices_Create', formdata_ISN,
                        function (response) {
                            //if (response == "Inserted") {

                            //    $('#btnppostthisnotice').show();
                            //    $('#btnsubmit, #btnsaveandpost, #btnclear').prop('disabled', true);
                            //    $("#Message_spid").text("Record inserted successfully.");
                            //    //$("#SavevalidationMessage").text("Record inserted successfully.");

                            //}
                            debugger;
                            if (response == "Not Inserted") {

                                $("#Message_spid").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                                

                            } else if (response == "Error") {
                                $("#Message_spid").text("Something went wrong please try again.");
                            } else if (response == "File already exists") {
                                $('#Message_spid').text('Already a file with the same name is attached to another notice. Please upload a new file.');
                            }
                            else {
                                $('#ENoticeinsertedtxtid').val(response);
                                $('#btnppostthisnotice').show();
                                $('#btnsubmit, #btnsaveandpost, #btnclear').prop('disabled', true);
                                $("#Message_spid").text("Record inserted successfully.");
                            }
                        }, function (status, error) {

                        },
                        true);
                    break;
                case 'btnsaveandpost':      /*CreateSmsNNotice_PostthisnoticeBtn*/
                    formdata_ISN.append('ENoticeId', 0);
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
                                //$("#SavevalidationMessage").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                                $("#Message_spid").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                            }
                        }, function (status, error) {
                            $("#Message_spid").text("Something went wrong please try again.");
                        },
                        true);
                    break;
                case 'btnppostthisnotice': /*CreateSmsNNotice_PostthisnoticeBtn*/
                    
                    formdata_ISN.append('ENoticeId', ENOTICEID);

                    FileCallToAjax('POST', '/Admin/Managenotices_saveNposting', formdata_ISN,
                        function (response) {
                            debugger;
                            //$('#Noticeandsms_Insertingdivid').hide();
                            //$('#Noticeandsms_Insertingdivid').empty();
                            ///*$('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);*/
                            //$('#Postnoticemailsmsdiv').html(response);

                            $('#Noticeandsms_Insertingdivid').hide();
                            $('#Addnotice_div1').empty();
                            $('#Noticeandsms_Insertingdivid').empty();
                            $('#Postnoticemailsmsdiv').html(response);



                        }, function (status, error) {
                            $("#Message_spid").text("Something went wrong please try again.");
                        },
                        true);
                    break;
                default:
                    break;
            }
        }
    }, 50);
});





//---***** Post Notice screen *****------

//----->>Check all
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

    /*$('#Adduserstopostnotice_Div').hide();*/
    $('#Adduserstopostnotice_Div').toggle();

    var ForAll = selectAllCheckbox.checked ? 1 : 0;
    return ForAll;
}



//----->>Select all Staff Role
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

//------>>Search and add users to post this notice
function PostNoticeaddusertogglediv() {
    var divToShow = document.getElementById('SearchUser_AddUser_DivId_Postnotice');
    divToShow.style.display = (divToShow.style.display === 'none' || divToShow.style.display === '') ? 'block' : 'none';
    if (divToShow.style.display === 'block') {
        fetchClassificationData();
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


//--->>> Search button click
$('#Searchuserstopostnotice_searchform').submit(function (event) {
    event.preventDefault();
    handle_searchuserstopostnotice_btnclick_tabledata();
});

function handle_searchuserstopostnotice_btnclick_tabledata() {

    //$('#PostNoticeAddinguserstable_Div').hide();
    debugger;
    var form = document.getElementById("Searchuserstopostnotice_searchform");
    var formData = new FormData(form);
   /* formData.append('InstanceId', Instanceid);*/

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
            /*InstanceId: Instanceid,*/
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
    //$('#PostNoticeAddinguserstable_Div').empty();

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

    /*if (validornot) {*/

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
    //} else {
    //    checkbox.checked = false;
    //}

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
    $('#PostnoticeSearch_tabledata_Divid').empty();

    var form = document.getElementById("Searchuserstopostnotice_searchform");
    var formData = new FormData(form);
    /*formData.append('InstanceId', Instanceid);*/
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
            /*InstanceId: Instanceid,*/
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
            debugger;

            $('#PostNoticeAddinguserstable_Div').show();
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
//$('.text-center').on('click', '#btnPostNotice', function () {
//$('#PostnoticebtnDiv').on('click', '#btnPostNotice', function () {
//$('#Postnoticebtnmaindiv, #PostnoticebtnDiv').on('click', '#btnPostNotice', function () {
//$('#btnPostNotice').off('click').on('click', function (event) {


$('.BTNSCLASS').on('click', '#btnPostNotice', function () {

    event.stopPropagation();

    $('#lblPostNoticeMsg').text('');

    var S_SmsreturnedValue;
    var P_SmsreturnedValue;
    var S_EmailreturnedValue;
    var P_EmailreturnedValue;
    var ForAll;
    var Tableuserids = [];
    var ENoticeId = $('#ENoticetxtid').val();
    var NotificationMessage = $('#Lbl_Notificationmessageid').text();
    var NoticeTypeId = $('#TxtNoticetypeid').val();
    var NoticeTypeName = $('#TxtNoticetypetext').val();
    var Noticetypdedescription = $('#TxtNoticetypedescription').val();

    //var CreatedBy = $('#Loginuser_Txtid').val();
    //var instanceid = Instanceid;
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

    //====Send email All students
    if ($('#Sendsms_chk3').is(':checked')) {
        S_EmailreturnedValue = "1";
    } else {
        S_EmailreturnedValue = "0";
    }

    //===Send email for all parents
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
        //CreatedBy: CreatedBy,
        //instanceid: instanceid,
        NotificationMessage: NotificationMessage,
        NoticeTypeId: NoticeTypeId,
        NoticeTypeName: NoticeTypeName,
        RoleIds: Rolecheckboxvalues,
        GroupIds: Groupcheckboxvalues,
        ClassificationIds: Classificationcheckboxvalues,
        SubClassificationIds: Subclassificationcheckboxvalues,
        //UserIds: Tableuserids,
        SendSMS: S_SmsreturnedValue,
        SendEMail: S_EmailreturnedValue,
        SendEmailForstudents: S_EmailreturnedValue,
        SendEmailForParents: P_EmailreturnedValue,
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



    if (ForAll === 0) {
        if (!anyCheckboxChecked) {
            // If no checkboxes are checked, show the validation message
            $('#lblPostNoticeMsg').text('No Selection Has Been Made. Please Select Any User');
            return; // Prevent further execution
        }
    }

        $.ajax({
            url: "/Admin/ENoticeMailSms_INSERT",
            type: "POST",
            data: datatosend,
            success: function (response) {
                debugger;                
                if (response == "1") {
                    $(this).prop('disabled', true);

                    $("#lblPostNoticeMsg").text('Notice Posted Successfully.' + NotificationMessage + ".");
                } else if (response == "-1") {
                    $("#lblPostNoticeMsg").text('Notice Posted Successfully.' + NotificationMessage + ".");
                } else {
                    $("#lblPostNoticeMsg").text(response);
                }
            }
        });
    
});





/*$('#Noticescreenbacktoscrbtn').click(function () {*/
//$('#PostnoticeBacktosearchbtn').click(function () {

$('#PostnoticebtnDiv').on('click', function () {
    debugger;
    $('#lblPostNoticeMsg').text('');
    $('#Postnoticemailsmsdiv').empty();
    $('#Home_SearchNotices_Updatediv').hide();
    $('#Home_SearchNoticesdiv').show();
    location.reload();
   
    //$('#ManagenoticeMaindiv').show(); 
    //$('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').empty();
});


//=====DELETE ADDED USERS TABLE DATA IN DELETE USER
//$('#PostNoticetblid_searchandadduserspostthisnotice_Table tbody').on('click', '.fa-trash-alt', function () {
//    //exec stp_tblUser_SELUsersByUserIds @UserIds='28560'
//    try {
//        if (confirm('Are you sure you want to delete the User ?\n Click ' + 'OK' + ' to delete, else click ' + 'CANCEL' + 'to stop deleting.')) {
//            var Row = $(this).closest('tr');
//            var DeleteUserid = Row.find('td:nth-child(10) #Usersidtxt').val();
//            var Userid = DeleteUserid;
//            var Noofusers = "1_20";

//            loaddingimg.css('display', 'block');
//            var data = { Userids: Userid };

//            DataCallToAjax('GET', '/Admin/Selecteduserdelete', data,
//                function (response) {


//                    debugger;
//                    $.ajax({
//                        url: "/Admin/SELUsersByUserIds?UserIds=" + Userids + "&Noofusers=" + Noofusers,
//                        type: "GET",
//                        success: function (response) {
//                            $('#PostNoticeAddinguserstable_Div').show();
//                            $('#PostNoticeAddinguserstable_Div').html(response);
//                        }
//                    });
//                    handle_searchuserstopostnotice_without_btnclick_tabledata(Userids, Noofusers);


//                    /*AddUsertopostnotice(Userid, rowId, ExcludeUserIds)*/

//                    //handle_searchuserstopostnotice_without_btnclick_tabledata(Userid, Noofusers);
//                    loaddingimg.css('display', 'none');
    //                },
    //                function (status, error) {
    //                    // Handle errors here
    //                    //$('#Home_SearchNoticesdiv').show();
    //                    //$('#Home_SearchNotices_Updatediv').hide();
    //                    loaddingimg.css('display', 'none');
    //                }
    //            );
//            Row.remove();
//        } 
       
//    }
//    catch (e) {
//        loaddingimg.css('display', 'none');
//    }
//});











function NoticeDropdown_CreateNotice_In_View() {
    //$.ajax({
    //    type: "GET",
    //    url: "/Admin/NoticeTypedd", // Update the URL as per your route configuration
    //    dataType: "json", // Set the expected data type
    //    success: function (data) {
    //        // Clear existing options before appending new ones
    //        $("#ENoticeTypeId_STXT").empty();
    //        debugger;
    //        // Loop through received data and append options to the dropdown
    //        $.each(data, function (index, item) {
    //            $("#ENoticeTypeId_STXT").append($('<option>', {
    //                value: item.value,
    //                text: item.text
    //            }));
    //        });
    //    },
    //    error: function (error) {
    //        console.error("Error fetching data:", error);
    //    }
    //});
}



/*--- CREATE NOTICE SCREEN JAVASCRIPT CODE END  ---*/



/* CREATE NOTICE --1 */

function CharCount() {
    debugger;
    var textarea = document.getElementById("Subjecttxt");
    var charCount = document.getElementById("charCounts");
    var Characterslength = document.getElementById("Characterslengths");
    var remaining = 1000 - textarea.value.length;
    charCount.textContent = remaining + " Character(s) remaining.";
    Characterslength.textContent = "Typed Characters: " + textarea.value.length;
}
function Charactercount() {
    debugger;
    var textarea = document.getElementById("ENoticeDescription_STXT");
    var charCount = document.getElementById("DescriptionCharacters");
    var charCountlength = document.getElementById("Characterlengths");
    var remaining = 6500 - textarea.value.length;
    charCount.textContent = remaining + " Character(s) remaining. ";
    charCountlength.textContent = "Typed Characters: " + textarea.value.length;
}

function preventSpecialCharacters(event) {
  /*debugger;*/
    var key = event.key;
    // Check if the pressed key is a single quote or a double quote
    if (key === "'" || key === '"') {
        // Prevent the default action of the key press (typing the character)
        event.preventDefault();
        // Optionally, you can display a message to the user informing them that these characters are not allowed
        //alert("Single quotes (') and double quotes (\") are not allowed.");
        return false;
    }
    return true;
}
