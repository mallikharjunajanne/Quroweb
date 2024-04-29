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

//==>>Clear Button function
$('#btnClear').click(function () {
    debugger;
    $('.text-danger.Validation').each(function () {
        $(this).text(''); // Set the text content to an empty string
    });
    //$('#Ermsgsp').text('');
    $('#DateCompareErrormessage').text('');
});

//==>>>BACK TO SEARCH CREATE SMS AND NOTICE TO NOTICE HOME PAGE 
$('#btnBackToSearch').click(function () {
    debugger;
    $('#Message_spid').text('');
    $('#Addnotice_div1').empty();
    $('#Addsms_div2').empty();
    $('#Addnoticeandsms_div3').empty();
    $('#Home_SearchNoticesdiv').show();
    $('#Home_SearchNotices_Updatediv').hide();
});



function Letterscount() {
    var textarea = document.getElementById("Subjecttxtid");
    var charCount = document.getElementById("LtCounts");
    var Characterslength = document.getElementById("Ltlengths");
    var remaining = 1000 - textarea.value.length;
    charCount.textContent = remaining + " Character(s) remaining.";
    Characterslength.textContent = "Typed Characters: " + textarea.value.length;
}

function remaingcount() {
    debugger;
    var textarea = document.getElementById("ENoticeDescriptiontxt");
    var charCount = document.getElementById("RCount");
    var charCountlength = document.getElementById("RCountlength");
    var remaining = 6500 - textarea.value.length;
    charCount.textContent = remaining + " Character(s) remaining. ";
    charCountlength.textContent = "Typed Characters: " + textarea.value.length;
}

function SpecialCharacters(event) {
    debugger;
    var key = event.key;
    // Check if the pressed key is a single quote or a double quote
    if (key === "'" || key === '"') {
        event.preventDefault();
        return false;
    }
    return true;
}



function GetDateFormat(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');

    return day + '-' + month + '-' + year;
}


//-----**Date Compare function**-------
function DatesCompares(Sdate, Edate) {
    try {
        debugger;
        var StartdateInput = $("#StartDateid").val();
        var EnddateInput = $("#EndDateid").val();

        var Startdate = new Date(StartdateInput);
        var Enddate = new Date(EnddateInput);

        var formattedStartDate = GetDateFormat(Startdate);
        var formattedEndDate = GetDateFormat(Enddate);

        var errorElement = $('.compare');

        if (formattedStartDate != formattedEndDate) {
            if (formattedEndDate <= formattedStartDate) {
            //if (Enddate <= Startdate) {
                //$('#Ermsgsp').text(Edate + " must be greater than " + Sdate + ".");
                $('#DateCompareErrormessage').text(Edate + " must be greater than " + Sdate + ".");
            } else {
                //$('#Ermsgsp').text("");
                $('#DateCompareErrormessage').text("");
            }
        } else {
            //$('#Ermsgsp').text("");
            $('#DateCompareErrormessage').text("");
        }
    }
    catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$("#StartDateid").on("change", function () { DatesCompares("Start Date", "End Date"); });
$("#EndDateid").on("change", function () { DatesCompares("Start Date", "End Date"); });



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

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            $('#Message_spid').text('');

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
            var NoticeTypeId = $('#ENoticeTypedd_Id').val();
            var NoticeTypetext = $('#ENoticeTypedd_Id option:selected').text();
            var ENOTICEID = $('#ENoticesmsinsertedtxtid').val();
            formdata_ISN.append('NoticeTypetext', NoticeTypetext);


           
        switch (Clickbuttonid) {
                case 'btnSave':
                    CallToAjax('POST', '/Admin/CreateSmsNNotice', formdata_ISN,
                        function (response) {
                            debugger;
                            if (response == "Not Inserted") {
                                $("#Message_spid").text("Notice with subject " + '"' + subjectname + '"' + " already exists.");
                            } else if (response == "Error") {
                                $("#Message_spid").text("Something went wrong please try again.");
                            } else if (response =="File already exists") {
                                $('#Message_spid').text('Already a file with the same name is attached to another notice. Please upload a new file.');
                            }else {
                                $('#ENoticeinsertedtxtid').val(response);
                                $('#btnppostthisnotice').show();
                                $('#btnSave, #btnsaveandpost, #btnClear').prop('disabled', true);
                                $("#Message_spid").text("Record inserted successfully.");
                            }
                        }, function (status, error) {

                        },
                        true);
                    break;
            case 'btnsaveandpost':
                formdata_ISN.append('ENoticeId', 0);
                    CallToAjax('POST', '/Admin/CreateSmsNNotice_PostthisnoticeBtn', formdata_ISN,
                        function (response) {
                            if (response != 0) {

                                $('#Noticeandsms_Insertingdivid').hide();
                                $('#Addnotice_div1').empty();
                                $('#Noticeandsms_Insertingdivid').empty();
                                $('#Postnoticemailsmsdiv').html(response);
                                //$('#Noticeandsms_Inserted_Postingemailorsmsdivid').html(response);
                            } else if (response == "File already exists") {
                                //$("#SavevalidationMessage").text("Notice with subject " + '"' + Subject + '"' + " already exists.");
                                $("#Message_spid").text("File with the same name already exists.");
                            } else {
                                $("#Message_spid").text("Notice with subject " + '"' + subjectname + '"' + " already exists.");
                            }                           

                        }, function (status, error) {

                        },
                        true);
                    break;
            case 'btnppostthisnotice':   //CreateSmsNNotice_PostthisnoticeBtn

                formdata_ISN.append('ENoticeId', ENOTICEID);

                    CallToAjax('POST', '/Admin/CreateSmsNNotice_PostthisnoticeBtn', formdata_ISN,
                        function (response) {
                            //$('#Noticeandsms_Insertingdivid').hide();
                            //$('#Addnotice_div1').empty();
                            //$('#Noticeandsms_Insertingdivid').empty();
                            //$('#Postnoticemailsmsdiv').html(response);                            
                            if (response != 0) {

                                $('#Noticeandsms_Insertingdivid').hide();
                                $('#Addnotice_div1').empty();
                                $('#Noticeandsms_Insertingdivid').empty();
                                $('#Postnoticemailsmsdiv').html(response);
                                
                            } else if (response == "File already exists") {                                
                                $("#Message_spid").text("File with the same name already exists.");
                            } else {
                                $("#Message_spid").text("Notice with subject " + '"' + subjectname + '"' + " already exists.");
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
    var url = "/Admin/ManageNotices_InstanceClassificationSearch";

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
    var url = "/Admin/ManageNotices_InstanceSubClassificationSearch?InstanceClassificationId=" + selectedvalue;

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

  /*  if (validornot) {*/

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
    /*formData.append('InstanceId', Instanceid);*/
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
            /*InstanceId: Instanceid,*/
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







$('#OnceNdailydd_id').change(function () {
    var selectedValue = $(this).val();

    if (selectedValue === 'Daily') {
        $('#Dailytxtdiv').hide();
        $('#Daily_div3').hide();
        //$('#Daily_div1, #Daily_div2, #Daily_div3, #Daily_div4').hide();
    } else {
        $('#Dailytxtdiv').show();
        $('#Daily_div3').show();
        //$('#Daily_div1, #Daily_div2, #Daily_div3, #Daily_div4').show();
    }
});


$('#SchedulerClearbtn').click(function () {
    $('#SCHEDULESMSFORMID')[0].reset();
    $('#Scheduleerrormessage').text('');

    //$('#OnceNdailydd_id').val('');
    //$('select.form-control.form-select').val('');
});


$('#SchedulerSubmitbtn').click(function () {
    $('#Scheduleerrormessage').text('');
    debugger;
    var Selectedvalue = $('#OnceNdailydd_id').val();
    var SelectedDate = $('#datetxtid').val();
    var Startdate = $('#Startdatetxtid').val();
    var Enddate = $('#Enddatetxtid').val();
    var formattedStartDate = convertDateFormat(Startdate); //--"YYYY-MM-DD"
    var formattedEndDate = convertDateFormat(Enddate); //--"YYYY-MM-DD"
    var SENDTIME;
    var datesBetween = getDatesBetween(formattedStartDate, formattedEndDate);

    var selectedHour = parseInt($('#TimeHoursdd_id').val(), 10);
    var selectedMinute = parseInt($('#Timeminutesdd_id').val(), 10);

    var currentTime = new Date();
    //var currentHour = currentTime.getHours();
    //var currentMinute = currentTime.getMinutes();

    //if (Selectedvalue && Selectedvalue !== '0') {
    //    if (!isNaN(selectedHour) && !isNaN(selectedMinute)) {
    //        if (SelectedDate == "" && !datesBetween.includes(SelectedDate)) {
    //            if (currentHour >= selectedHour) {
    //                if (currentMinute <= selectedMinute) {
    //                    SENDTIM = SelectedDate + currentHour + ":" + currentMinute + ":" + "00";
    //                }
    //                else {
    //                    $('#Scheduleerrormessage').text('Set Time Should be greater than current time');
    //                    return;
    //                }
    //            }
    //            /*$('#Scheduleerrormessage').text('SMS Schedule date Should be in between Start Date and End Date');*/
    //            return;
    //        } else {
    //            if (currentHour <= selectedHour) {
    //                if (currentMinute <= selectedMinute) {
    //                    SENDTIM = SelectedDate + currentHour + ":" + currentMinute + ":" + "00";
    //                }
    //                else {
    //                    $('#Scheduleerrormessage').text('Set Time Should be greater than current time');
    //                    return;
    //                }
    //            }
    //            else {
    //                $('#Scheduleerrormessage').text('SMS Schedule date Should be in between Start Date and End Date');
    //                return;
    //            }
    //        }
    //    } else {
    //        $('#Scheduleerrormessage').text('Set the Time For the SMS');
    //    }
    //} else {
    //    $("#Scheduleerrormessage").text('Select The Type');
    //    return;
    //}


    var currentDate = new Date();
    var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes();
    var currentHours = currentDate.getHours().toString().padStart(2, '0');
    var currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Adding 1 because months are zero-indexed
    var year = currentDate.getFullYear();
    var currentDateFormatted = day + '-' + month + '-' + year + ' 00:00:00';



    //var selectedHour = parseInt(selectedHourText, 10); // Assuming selectedHourText is the text value of the selected hour
    //var selectedMinute = parseInt(selectedMinuteText, 10); // Assuming selectedMinuteText is the text value of the selected minute


    if (Selectedvalue != "") {
        if (Startdate != "" && Enddate != "") {
            if (selectedHour == "" || selectedMinute == "") {
                $('#Scheduleerrormessage').text('Set the Time For the SMS');
                return;
            }
            //if (Startdate <= currentDate && currentDate <= Enddate) {
            if (Startdate <= currentDateFormatted && currentDateFormatted <= Enddate) {
                if (parseInt(selectedHour.toString() + selectedMinute.toString(), 10) <= parseInt(currentHour.toString() + currentMinute.toString(), 10)) {
                    $('#Scheduleerrormessage').text('Set Time Should be grater than current time');
                    return;
                }
            } else {
                if (selectedHour == "" || selectedMinute == "") {
                    $('#Scheduleerrormessage').text('Set the Time For the SMS');
                    return;
                }
            }
        } else {
            $('#Scheduleerrormessage').text('Set the Start Date and End Date for the Notice');
            return;
        }
    } else {
        $('#Scheduleerrormessage').text('Select The Type');
        return;
    }

    /*if (SelectedDate.is(':visible')) {*/
    if ($('#datetxtid').is(':visible')) {
        if (SelectedDate != "") {
            if (SelectedDate >= Startdate && SelectedDate <= Enddate) {
                ///if (SelectedDate < currentDate) {
                if (SelectedDate < currentDateFormatted) {
                    if (selectedHour == "" || selectedMinute == "") {
                        $('#Scheduleerrormessage').text('Set the Time For the SMS');
                        return;
                    }
                   // if (SelectedDate === currentDateFormatted.toLocaleDateString('en-GB')) {
                    if (SelectedDate === currentDate.toLocaleDateString('en-GB')) {
                        if (parseInt(selectedHour + selectedMinute) <= parseInt(currentHours + currentMinutes)) {
                            $('#Scheduleerrormessage').text("Set Time Should be greater than current time");
                            return;
                        }
                    } else {
                        if (selectedHour === '0' || selectedMinute === '0') {
                            $('#Scheduleerrormessage').text("Set the Time For the SMS");
                            return;
                        }
                    }
                } else {
                    $('#Scheduleerrormessage').text('Set Date Should not be less than today.');
                    return;
                }
            } else {
                $('#Scheduleerrormessage').text('SMS Schedule date Should be in between Start Date and End Date');
                return;
            }
        } else {
            $('#Scheduleerrormessage').text('Please give SMS Schedule date.');
            return;
        }

        // Textbox is visible
        /* alert("show");*/
    }
    //else {
    //    // Textbox is hidden
    //  /*  alert("hide");*/
    //}  

});



$('#Postsmsbtn').click(function () {    
    /*$('#Postsmsbtn').on('click', function () {*/
    $('#lblPostNoticeMsg').text('');
    $(this).prop('disabled', true);
    var S_SmsreturnedValue;
    var P_SmsreturnedValue;
    var S_EmailreturnedValue;
    var P_EmailreturnedValue;

    var chkSMSAll;
    var chkIncludeParents;
    var chkEMailAllStudents;
    var chkEMailAllParents;


    var ForAll;
    var Tableuserids = [];
    var ENoticeId = $('#ENoticetxtid').val();   
    var NotificationMessage = $('#Lbl_Notificationmessageid').text();
    var NoticeTypeId = $('#TxtNoticetypeid').val();
    var NoticeTypeName = $('#TxtNoticetypetext').val();
    var Noticetypdedescription = $('#TxtNoticetypedescription').val();
    var Retunnmessage = "";
    var selectedValue = $("input[name='radio1']:checked").val();

    if (selectedValue === "0") {
        Retunnmessage = NotificationMessage;
    } else if (selectedValue === "1") {
        Retunnmessage = Noticetypdedescription;
    } else if (selectedValue === "2") {
        Retunnmessage = "Subject: " + NotificationMessage + ", Description: " + Noticetypdedescription;
    }

   
    if ($('#Sendsms_chk1').is(':checked')) {
        /*S_SmsreturnedValue = "1";*/
        chkSMSAll = "1";
    } else {
        /*S_SmsreturnedValue = "0";*/
        chkSMSAll = "0";
    }

    if ($('#Sendsms_chk2').is(':checked')) {
        //P_SmsreturnedValue = "1";
        chkIncludeParents = "1";
    } else {
        //P_SmsreturnedValue = "0";
        chkIncludeParents = "0";
    }

    if ($('#Sendsms_chk3').is(':checked')) {
        //S_EmailreturnedValue = "1";
        chkEMailAllStudents = "1";
    } else {
        //S_EmailreturnedValue = "0";
        chkEMailAllStudents = "0";
    }

    if ($('#Sendsms_chk4').is(':checked')) {
        /*P_EmailreturnedValue = "1";*/
        chkEMailAllParents = "1";
    } else {
        /*P_EmailreturnedValue = "0";*/
        chkEMailAllParents = "0";
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

    var selectAllCheckbox = document.getElementById('Selectallusers_Cbk');
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
        SendSMS: chkSMSAll,        
        IncludeParents: chkIncludeParents,

        SendEmailForstudents: chkEMailAllStudents,
        SendEmailForParents: chkEMailAllParents,

        //---------EXTRA DATA
        //chkSMSAll: chkSMSAll,
        //chkIncludeParents: chkIncludeParents,
        //chkEMailAllStudents: chkEMailAllStudents,
        //chkEMailAllParents: chkEMailAllParents,


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
        //url: "/Admin/ENoticeMailSms_INSERT",
        url: "/Admin/Enoticesmsandnotice_INSERT",
        type: "POST",
        data: datatosend,
        success: function (response) {
            debugger;
            var Parentsmsfalse=response.parentsmsfalse;
            var Studentsmsfalse = response.studentsmsfalse;
            var Returnmessages = response.returnmessages;
            var NOTICEINSERTEDMESSAGE = response.noticeinsertedmessage;
            var Mailmethoderror= response.mailmethoderror;
            if (NOTICEINSERTEDMESSAGE == "1") {
                $(this).prop('disabled', true);
                $("#lblPostNoticeMsg").text('Notice Posted Successfully.' + Retunnmessage + ".");
            } else if (NOTICEINSERTEDMESSAGE == "-1") {
                $("#lblPostNoticeMsg").text('Notice Posted Successfully.' + Retunnmessage + ".");
            } else {
                $("#lblPostNoticeMsg").text(response);
            }
        }
    });
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

$('#createsmsbacktomanagenoticescr_btn').click(function () {
    debugger;
    $('#lblPostNoticeMsg').text('');
    $('#Scheduleerrormessage').text('');
    $('#Message_spid').text('');
    $('#SCHEDULESMSFORMID')[0].reset();
    $('#Postnoticemailsmsdiv').empty();
    $('#Home_SearchNotices_Updatediv').hide();
    $('#Home_SearchNoticesdiv').show();
    location.reload();
});