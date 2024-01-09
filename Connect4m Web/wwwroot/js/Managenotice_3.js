/*------=======**** CREATE NOTICE AND SMS SCREEN ****=======------*/
function CallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
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

function GetDropdownAjax(url, additionalData, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: "GET",
        data: additionalData,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

$(document).ready(function () {
    $('#btnppostthisnotice').hide();
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
        debugger;
        var StartdateInput = $("#StartDate").val();
        var EnddateInput = $("#EndDate").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var formattedStartDate = GetDateFormat(Startdate);
        var formattedEndDate = GetDateFormat(Enddate);

        var errorElement = $('.compare');

        if (formattedStartDate != formattedEndDate) {
            if (Enddate <= Startdate) {
                errorElement.addClass('error2');
                errorElement.text(Edate + " must be greater than " + Sdate + ".");
            } else {
                errorElement.text("");
            }
        } else {
            errorElement.text("");
        }
    }
    catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$(".form-group #StartDate").on("change", function () { DatesCompare("Start Date", "End Date"); });
$(".form-group #EndDate").on("change", function () { DatesCompare("Start Date", "End Date"); });



//-----**Dropdown change hide radiobutton hide
$("#ENoticeTypedd_Id").change(function () {

    var Selectedvalue = $('#ENoticeTypedd_Id').val()
    if (Selectedvalue != "") {
        $("#NoticeDisplayloginrRadio_btn").hide();
    } else {
        $("#NoticeDisplayloginrRadio_btn").show();
    }
});



//------** Save button and Save And post button click  fire functions
$('#Insert_Noticeandsms').submit(function (event) {
    event.preventDefault();

    debugger;
    setTimeout(function () {
        //var validationMessages = $('.field-validation-error');
        //var validationMessages2 = $('.error2');

        //var validationmelength = validationMessages.length;

        //if (validationmelength == 0 && validationMessages2.length == 0) {
        //    var formdata_ISN = new FormData($('#Insert_Noticeandsms')[0]);

        //    var fileInput = document.getElementById('AttachedDocument');
        //    if (fileInput.files.length > 0) {
        //        var file = fileInput.files[0];
        //        formdata_ISN.append('AttachedDocument', file);
        //    }
        //    var subjectname = $('#Subjecttxtid').val();
        //    var Clickbuttonid = $(document.activeElement).attr('id');

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            var formdata_ISN = new FormData($('#Insert_Noticeandsms')[0]);

            var fileInput = document.getElementById('AttachedDocument');
            if (fileInput.files.length > 0) {
                var file = fileInput.files[0];
                formdata_ISN.append('AttachedDocument', file);
            }
            debugger;
            var ShowInLogin = $('#radio55').val();
            formdata_ISN.append('ShowInLogin', ShowInLogin);
            var Clickbuttonid = $(document.activeElement).attr('id');
            var subjectname = $('#Subjecttxtid').val();
        switch (Clickbuttonid) {
                case 'btnSave':
                    CallToAjax('POST', '/Admin/CreateSmsNNotice', formdata_ISN,
                        function (response) {
                            debugger;                           
                            if (response != "000" && response != "-1") {
                                $('#btnSave, #btnsaveandpost, #btnClear').prop('disabled', true);
                                $('#btnSave, #btnsaveandpost, #btnClear').removeClass('.btn .btn-pill .btn-outline-warning .btn-air-warning,.btn-outline-success,.btn-outline-info .btn-air-info');
                                $('#btnppostthisnotice').show();

                                $('#Errormessage').text('Record inserted successfully.');
                            } else if (response == "000") {
                                $('#Errormessage').text('Notice with subject' + '"' + subjectname + '"' + ' already exists.');
                            } else {
                                $('#Errormessage').text('Already a file with the same name is attached to another notice. Please upload a new file.');
                            }
                        }, function (status, error) {

                        },
                        true);
                    break;
                case 'btnsaveandpost':
                    CallToAjax('POST', '/Admin/CreateSmsNNotice_PostthisnoticeBtn', formdata_ISN,
                        function (response) {
                            if (response != 0) {
                                debugger;
                                $('#Noticeandsms_Insertingdivid').hide();
                                $('#Noticeandsms_Insertingdivid').empty();
                                $('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);
                            } else if (response == 01) {
                                $("#Errormessage").text("Something went wrong..!");
                            } else {
                                $("#Errormessage").text("Notice with subject " + '"' + subjectname + '"' + " already exists.");
                            }

                        }, function (status, error) {

                        },
                        true);
                    break;
                case 'btnppostthisnotice':   //CreateSmsNNotice_PostthisnoticeBtn
                    CallToAjax('POST', '/Admin/CreateSmsNNotice_PostthisnoticeBtn', formdata_ISN,
                        function (response) {
                            if (response != 0) {
                                debugger;
                                $('#Noticeandsms_Insertingdivid').hide();
                                $('#Noticeandsms_Insertingdivid').empty();
                                $('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);
                            } else {
                                $("#Errormessage").text("Notice with subject " + '"' + subjectname + '"' + " already exists.");
                            }
                        }, function (status, error) {

                        },
                        true);
                    break;
                default:
                    break;
            }
        }
    }, 50);
});




//===========================********** POST NOTICE AND SMS SCREEN **********===========================


$('#Selectallstaffrolecbk').change(function () {
    var StaffcheckboxValues = [];
    debugger;
    $('.checkbox-Name').each(function () {
        var labelValue = $(this).next().text().toLowerCase();

        if (labelValue.includes('student')) {
            $(this).prop('checked', false);
        } else {
            $(this).prop('checked', $('#Selectallstaffrolecbk').prop('checked'));
            StaffcheckboxValues.push($(this).val());
        }
    });
});


$('#Selectallusers_Cbk').change(function () {
    if (this.checked) {
        var checkboxValues = [];
        var AllUserschkbvalues = $('.checkbox-item');
        debugger;
        AllUserschkbvalues.each(function () {
            $(this).prop('checked', false);
            checkboxValues.push($(this).val());
            // Disable or enable checkboxes based on the "select all" checkbox
            $(this).prop('disabled', true);
        });
    } else {
        // Logic when the "select all" checkbox is unchecked
        // This part is missing in your original code
        $('.checkbox-item').prop('disabled', false);
    }
});


function Adduserstosms_notice() {
    var divToShow = document.getElementById('SearchUsers_Postnotice_DivId');
    debugger;
    if (divToShow.style.display === 'none' || divToShow.style.display === '') {
        divToShow.style.display = 'block';
        InstanceClassificationSearch();
    } else {
        divToShow.style.display = 'none';
    }
}

function InstanceClassificationSearch() {
    var url = "/Admin/ManageNotices_InstanceClassificationSearch?InstanceId=" + Instanceid;

    GetDropdownAjax(url, {}, function (response) {
        var $dropdown = $('#Classificationddid');
        $dropdown.empty().append('<option>---Select a Department---</option>');

        $.each(response, function (index, department) {
            $dropdown.append($('<option>', {
                value: department.instanceClassificationId,
                text: department.classificationName
            }));
        });
    }, function (status, error) {
        console.error('Error occurred:', error);
    });
}


$('#Classificationddid').change(function () {
    var selectedvalue = $(this).val();
    var url = "/Admin/ManageNotices_InstanceSubClassificationSearch?InstanceId=" + Instanceid + "&InstanceClassificationId=" + selectedvalue;

    GetDropdownAjax(url, {}, function (response) {
        var $dropdown = $('#Subclassificationddid');
        $dropdown.empty().append('<option>---Select a Department---</option>');

        $.each(response, function (index, department) {
            $dropdown.append($('<option>', {
                value: department.instanceSubClassificationId,
                text: department.subClassificationName
            }));
        });
    }, function (status, error) {
        console.error('Error occurred:', error);
    });
});


//=========>>>> Search button click
$('#CNS_Searchformid').on('submit', function (event) {
    event.preventDefault();
    Searchuserstopostnotice_btnclick_tabledata();
});

//$('#Searchbtn').click(Searchuserstopostnotice_btnclick_tabledata);

function Searchuserstopostnotice_btnclick_tabledata() {

    debugger;
    var Searchformdata = {};

    var form1 = new FormData($('#CNS_Searchformid')[0]);
    var form = document.getElementById("CNS_Searchformid");
    //var formData = new FormData(form);
    //formData.append('InstanceId', Instanceid);
    var userName = $('#Ps_UserNametxt').val() || '';
    var roleId = $('#Instancerole_id').val() || '';
    var firstName = $('#Ps_Firstnametxt').val() || '';
    var lastName = $('#Ps_lastnametxt').val() || '';
    var ClassificationId = $('#Classificationddid').val() || '';
    var SubClassificationId = $('#Subclassificationddid').val() || '';
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
    //Searchformdata.InstanceId = Instanceid;
    Searchformdata.UserName = userName;
    Searchformdata.InstanceRoleId = roleId;
    Searchformdata.FirstName = firstName;
    Searchformdata.LastName = lastName;
    Searchformdata.InstanceClassificationId = ClassificationId;
    Searchformdata.InstanceSubClassificationId = SubClassificationId;
    Searchformdata.InstanceUserCodes = instanceUserCode;
    Searchformdata.PortalEmail = portalEmail;
    Searchformdata.RouteId = routeId;
    Searchformdata.CollegeHostel = collegeHostel;
    Searchformdata.ExcludeUserIds = ExcludeUserIds;
    Searchformdata.Noofusers = Noofusers;

    var queryParameters = $.param(Searchformdata);

    var url = "/Admin/ManageNotices_PostNoticeSearchtabledata?" + queryParameters;

    // var jsonstringfydata = JSON.stringify(Searchformdata);
    // var url = "/Admin/ManageNotices_PostNoticeSearchtabledata";    
    // CallToAjax('GET', url, jsonstringfydata,

    CallToAjax('GET', url, null,
        function (response) {
            debugger;
            $('#PostnoticeSearch_tabledata_Divid').html(response);           
        },
        function (status, error) {
            alert("Something went wrong.....!/n Please try again");
        },
        false);
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

    var form = document.getElementById("CNS_Searchformid");
    var formData = new FormData(form);
    formData.append('InstanceId', Instanceid);
    var userName = $('#Ps_UserNametxt').val() || '';
    var roleId = $('#Instancerole_id').val() || '';
    var firstName = $('#Ps_Firstnametxt').val() || '';
    var lastName = $('#Ps_lastnametxt').val() || '';
    var ClassificationId = $('#Classificationid').val() || '';
    var SubClassificationId = $('#Subclassificationid').val() || '';
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
            InstanceClassificationId: ClassificationId,
            InstanceSubClassificationId: SubClassificationId,
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




