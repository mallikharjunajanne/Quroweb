/*------=======**** CREATE SMS SCREEN JAVASCRIPT CODE START ****=======------*/



////=========>>>Edit SMS Template == btnSMSNext
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
    formData.append('StartDate', StartDate);
    formData.append('EndDate', ExpiryDate);
    formData.append('Subject', Subjecttext);
    formData.append('DisplayIcon', DisplayIcon);
    formData.append('CreatedBy', CreatedBy);
    formData.append('NoticeDocument', '');
    formData.append('DisplayOrder', DisplayOrder);


    $.ajax({
        url: "/Admin/SaveandPostBtn_ManageNotices_CreateSMS",
        type: "POST",
        data: formData,
        processData: false,  // Prevent jQuery from automatically transforming the data into a query string
        contentType: false,
        success: function (response) {
            debugger;
            /*  $('#SmsTemplatedetailsViewDiv_ManageNotices_createsms').hide();*/
            $('#Managenotice_CreateSMS_Divid').hide();
            $('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').html(response);
        }
    });


    console.log(Subjecttext);

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



