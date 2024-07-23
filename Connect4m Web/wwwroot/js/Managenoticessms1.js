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


$("#SMSNextbtn").on("click", function () {
    debugger;
    $('#Commonerrormessage').text('');
    if ($("input[name='Templatedetails']:checked").length != 0) {
        debugger;
        
        loaddingimg.css('display', 'block');

        var TemplateMasterPK = $("input[name='Templatedetails']:checked").val();

        document.getElementById('SMSNextbtn').disabled = true;

        var radioButtons = document.querySelectorAll("input[name='Templatedetails']");
        radioButtons.forEach(function (radioElement) {
            radioElement.disabled = true;
        });
        
        DataCallToAjax('GET', '/Admin/SMSNotice_Templatedetails?TemplateMasterPK=' + TemplateMasterPK, null,
            function (response) {
                $('#Createsms_templatesappendingDiv').html(response);
                loaddingimg.css('display', 'none');
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );
    }
    else {
        $('#Commonerrormessage').text("Please select atleast one to continue.");
        loaddingimg.css('display', 'none');
        return false;
    }
});
$("#SMSBacktosearchbtn").click(function () {
    $('#Commonerrormessage').text('');
    $('#Createsms_templatesappendingDiv').empty();
    location.reload();
});



$("#BacktoSmsTemplatebtn").click(function () {
    debugger;

    var button = document.getElementById('SMSNextbtn');
    button.disabled = false;

    $('#Createsms_templatesappendingDiv').empty();

    var radioButtons = document.querySelectorAll("input[name='Templatedetails']");
    radioButtons.forEach(function (radioElement) {
        radioElement.disabled = false;
    });  
});

$("#SaveandPostSMSTemplatebtn").click(function () {
    debugger;
    var today = new Date();
    var StartDate = $('#Startdate_txt').val();
    var ExpiryDate = $('#EndDate_txt').val();
    var Subject = $('#Subject_txt').val();
    var DisplayIcon = $('#DisplayIcon_txt').val();
    var divText = $('#TemplateDescription_divId').text().trim();
    var errorMessage = "";
    var textValues = [];
    $('.textInput').each(function () {
        var inputNumber = $(this).attr('id').replace('txt', '');
        var inputValue = $(this).val();
        var inputName = $(this).attr('name');
        if (inputValue === "") {
            errorMessage += "Please enter text in " + inputNumber + " text box .<br>";
            inputValue = "";
            inputName = "";

        }
        if (inputName == "textValue") {
            textValues.push({ textValue: inputNumber, value: inputValue });
        } else if (inputName == "dateValue") {
            var dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            if (!dateRegex.test(inputValue)) {
                errorMessage += "Incorrect date format in " + inputNumber + "text box .<br>";
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

    var formData = new FormData();
    formData.append('StartDate', StartDate);
    formData.append('ExpiryDate', ExpiryDate);
    formData.append('Subject', Subjecttext);
    formData.append('DisplayIcon', DisplayIcon);

    if (textValues.length === 0) {
        errorMessage += "No text inputs found.<br>";
    }

    if (StartDate === "") {
        errorMessage += "Start date is empty.<br>";
    }

    if (ExpiryDate === "") {
        errorMessage += "End date is empty.<br>";
    }

    if (StartDate > ExpiryDate) {
        errorMessage += "Start date cannot be greater than end date.<br>";
    }
    var expiryDate = new Date(ExpiryDate);
    if (expiryDate < today) {
        errorMessage += "End Date cannot be less than today.";
    }

    if (errorMessage !== "") {
        $("#Commonerrormessage1").html(errorMessage);
        return false;
    }

    if (errorMessage == "") {
        $.ajax({
            url: "/Admin/SMSNotice_SavePosting",            
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                debugger;
                if (response == "1") {
                    $('#Commonerrormessage1').text('');
                }
                else {
                    //$('#Managenotice_CreateSMS_Divid').hide();
                    //$('#ManageNotices_CreateSMS_SaveandPostbtnclick_PostNoticeDiv_id').html(response);
                    $('#Noticesadding_Firstdiv').empty();
                    $('#Searchnotices_Maindiv').hide();
                    $('#Noticesadding_Thirddiv').html(response);

                    // Call the function to create the dropdown
                    createTimeHoursDropdown();
                    CreateMinutesDropdown();
                }
            }
        });
    }
});

function createTimeHoursDropdown() {
    // Get the select element
    var select = document.getElementById("TimeHoursdd_id");

    // Clear existing options
    select.innerHTML = "";
    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--Select--";
    select.appendChild(defaultOption);

    // Loop to generate options for hours (24-hour format)
    for (var i = 0; i < 24; i++) {
        var minute = i.toString().padStart(2, '0');
        var option = document.createElement("option");

        // Set the value and text content to the padded minute
        option.value = minute;
        option.textContent = minute;
        select.appendChild(option);
    }
}

function CreateMinutesDropdown() {
    var select = document.getElementById("Timeminutesdd_id");

    // Clear existing options
    select.innerHTML = "";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--Select--";
    select.appendChild(defaultOption);

    // Loop to generate options for hours (24-hour format)
    for (var i = 0; i < 60; i++) {

        // Create an option element
        var minute = i.toString().padStart(2, '0');
        var option = document.createElement("option");

        // Set the value and text content to the padded minute
        option.value = minute;
        option.textContent = minute;
        select.appendChild(option);
      
    }
}