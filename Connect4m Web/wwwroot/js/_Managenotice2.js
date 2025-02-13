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




//function GetDateFormat(date) {
//    var year = date.getFullYear();
//    var month = (date.getMonth() + 1).toString().padStart(2, '0');
//    var day = date.getDate().toString().padStart(2, '0');

//    return day + '-' + month + '-' + year;
//}


////-----**Date Compare function**-------
//function DatesCompare(Sdate, Edate) {
//    try {
//        var StartdateInput = $("#Startdate_txt").val();
//        var EnddateInput = $("#EndDate_txt").val();

//        var Startdate = new Date(StartdateInput);
//        var Enddate = new Date(EnddateInput);

//        var formattedStartDate = GetDateFormat(Startdate);
//        var formattedEndDate = GetDateFormat(Enddate);

//        var errorElement = $('.compare');

//        if (formattedStartDate != formattedEndDate) {
//            if (Enddate <= Startdate) {
//                $('#Errormessage').text(Edate + " must be greater than " + Sdate + ".");
//            } else {
//                $('#Errormessage').text("");
//            }
//        } else {
//            $('#Errormessage').text("");
//        }
//    }
//    catch (error) {
//        console.log(error);
//    }
//}


////-------------------***Date Compare
//$(".form-group #Startdate_txt").on("change", function () { DatesCompare("Start Date", "End Date"); });
//$(".form-group #EndDate_txt").on("change", function () { DatesCompare("Start Date", "End Date"); });



//BACK TO TEMPLATE
$("#btnBackToSelectSMSTemplates").click(function () {
    debugger;
    $('#SMSNextbtn').prop('disabled', false);
    $("input[name='Templatedetails']").prop('disabled', false).prop('checked', false);
    $('#append-sms-templates-section').empty();
    $('#hiddendatediv').hide();
    $('#validationErrorMessage, #validationErrorMessage1, #validationErrorMessage2').text('');
    $('#lblSMSTemplateOriginalValue').text('');
    $('#lbltemplateMasterPK').val('');
});


$("#SMSNextbtn").on("click", function () {
    debugger;
    $('#validationErrorMessage2').text('');
    if ($("input[name='Templatedetails']:checked").length != 0) {
        debugger;
        loaddingimg.css('display', 'block');

        var TemplateMasterPK = $("input[name='Templatedetails']:checked").val();
        $('#SMSNextbtn').prop('disabled', true);
        $("input[name='Templatedetails']").prop('disabled', true);
  
        DataCallToAjax('GET', '/Admin/GetTemplateDetails?TemplateMasterPK=' + TemplateMasterPK, null,
            function (response) {
                debugger;
                var smsTemplates = response; // Assuming response contains the template data
                generateTemplateInputs(smsTemplates);
                $('#hiddendatediv').show();
                loaddingimg.css('display', 'none');
            },
            function (status, error) {
                loaddingimg.css('display', 'none');
            }
        );
    }
    else {
        $('#validationErrorMessage2').text("Please select atleast one to continue.");
        loaddingimg.css('display', 'none');
        return false;
    }
});

// Function to replace placeholders in template and generate HTML inputs
function generateTemplateInputs(smsTemplates) {

    $('#lblSMSTemplateOriginalValue').text('');
    $('#lbltemplateMasterPK').val('');
    var container = document.getElementById('append-sms-templates-section'); // Correct target container

    const processedTemplates = new Set();

    smsTemplates.forEach(function (detail, index) {
        var template = detail.templateDescription;
        var j = 1;  // Counter for generating dynamic ids
        debugger;
        if (!processedTemplates.has(template)) {
            processedTemplates.add(template); // Mark this template as processed
            // Loop through the template details and replace placeholders with inputs
            smsTemplates.forEach(function (textdetails) {
                var replacement = "";

                // Check for different placeholders and generate corresponding input fields
                if (textdetails.attributeName.startsWith("{TEXT")) {
                    replacement = `<input type='text' id='txt${j}' class='textInput input-style' name='textValue' maxlength='${textdetails.length}' placeholder='Text' oninput='storeTextboxValue(txt${j}, this)'/>`;
                }
                else if (textdetails.attributeName.startsWith("{DATE")) {
                    replacement = `<input type='text' id='txt${j}' class='textInput input-style' name='dateValue' maxlength='${textdetails.length}' placeholder='dd/mm/yy' onkeypress='return RestrictDateChar(event)' oninput='storeTextboxValue(txt${j}, this)' />`;
                }
                else if (textdetails.attributeName.startsWith("{TIME")) {
                    replacement = `<input type='text' id='txt${j}' class='textInput input-style' name='timeValue' maxlength='${textdetails.length}' placeholder='Time' oninput='storeTextboxValue(txt${j}, this)'/>`;
                }
                else if (textdetails.attributeName.startsWith("{NUMERIC")) {
                    replacement = `<input type='text' id='txt${j}' class='textInput input-style' name='numericValue' maxlength='${textdetails.length}' placeholder='Numeric' onkeypress='return RestrictNumericInput(event)' oninput='storeTextboxValue(txt${j}, this)'/>`;
                }

                // Replace placeholder with the generated input field
                if (replacement && template.includes(textdetails.attributeName)) {
                    template = template.replace(textdetails.attributeName, replacement);
                    j++;  // Increment dynamic ID counter
                }
            });
            $('#lblSMSTemplateOriginalValue').text(detail.templateDescription);
            $('#lbltemplateMasterPK').val(detail.templateMasterPK);

            // Create a div element to hold the modified template
            var divElement = document.createElement('div');
            divElement.classList.add('col-sm', 'col-form-label');
            divElement.style.lineHeight = '2';
            divElement.innerHTML = template;  // Set the generated template HTML

            // Append the div element to the container
            container.appendChild(divElement);
            
        }
    });
}

// Example function for handling the input values (you can modify it as per your needs)
function storeTextboxValue(inputElement, event) {
    console.log(inputElement.id + " value: " + event.target.value);
}

// Restrict input for numeric values
function RestrictNumericInput(event) {
    var key = event.keyCode || event.which;
    if ((key >= 48 && key <= 57) || key === 8 || key === 46) {
        return true;
    }
    return false;
}

// Restrict input for date format (dd/mm/yy)
function RestrictDateChar(event) {
    var key = event.keyCode || event.which;
    if ((key >= 48 && key <= 57) || key === 8 || key === 46) {
        return true;
    }
    return false;
}

// Clear any validation error messages, show search results, and reset containers
$("#SMSBacktosearchbtn").click(function () {
    //debugger;
    $('#validationErrorMessage, #validationErrorMessage1, #validationErrorMessage2').text('');
    $('#lblSMSTemplateOriginalValue').text('');
    $('#lbltemplateMasterPK').val('');
    $('#divSearchResults').show();
    $('#create-notice-container, #create-sms-container, #create-notice-and-sms-container, #post-notice-email-sms-container, #save-and-post-notice-container').empty();
    location.reload();
});

$("#btnSaveAndPostSMSTemplate").click(function () {
    try {
        debugger;
        loaddingimg.css('display', 'block');
        $('#validationErrorMessage2').text('');
        var today = new Date();
        var StartDate = $('#Startdatetxtid').val();
        var ExpiryDate = $('#Exdatetxtid').val();
        var Subject = $('#lblSMSTemplateOriginalValue').text();
        var DisplayIcon = $('#lbltemplateMasterPK').val();
        var divText = $('#append-sms-templates-section').text().trim();
        var errorMessage = "";
        var textValues = [];

        $('.textInput').each(function () {
            var inputNumber = $(this).attr('id').replace('txt', '');
            var inputValue = $(this).val();
            var inputName = $(this).attr('name');

            // Check for empty input fields
            if (inputValue === "") {
                errorMessage += "Please enter text in " + inputNumber + " text box .<br>";
                inputValue = "";
                inputName = "";

            }

            if (inputName == "textValue") {
                textValues.push({ textValue: inputNumber, value: inputValue });
            }
            else if (inputName == "dateValue") {
                var dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
                if (!dateRegex.test(inputValue)) {
                    errorMessage += "Incorrect date format in " + inputNumber + "text box .<br>";
                }
                else {
                    textValues.push({ dateValue: inputNumber, value: inputValue });
                }
            }
            else if (inputName == "timeValue") {
                textValues.push({ timeValue: inputNumber, value: inputValue });
            }
            else if (inputName == "numericValue") {
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


        if (textValues.length === 0) errorMessage += "No text inputs found.<br>";
        if (!StartDate) errorMessage += "Start date is empty.<br>";
        if (!ExpiryDate) errorMessage += "End date is empty.<br>";
        if (StartDate > ExpiryDate) errorMessage += "Start date cannot be greater than end date.<br>";
        if (new Date(ExpiryDate) < today) errorMessage += "End Date cannot be less than today.";

        if (errorMessage) {
            $("#validationErrorMessage2").html(errorMessage);
            return false;
        }

        var formData = new FormData();
        formData.append('StartDate', StartDate);
        formData.append('ExpiryDate', ExpiryDate);
        formData.append('Subject', Subjecttext);
        formData.append('DisplayIcon', DisplayIcon);



        if (errorMessage) {
            $('#validationErrorMessage2').text(errorMessage);  // Set the accumulated error messages in the error message container
        }
        else {
            $('#validationErrorMessage2').text('');  // Clear the error messages if there are no errors
            DataCallToAjax('POST', '/Admin/_SaveAndPostSMSNotice', formData,
                function (response) {
                    debugger;
                    if (response == "1") {
                        $('#validationErrorMessage').text('');
                        $('#divSearchResults').hide();
                        $('#create-notice-container, #create-sms-container, #create-notice-and-sms-container, #save-and-post-notice-container').empty();
                        $('#post-notice-email-sms-container').html(response);
                    }
                    else {
                        $('#divSearchResults').hide();
                        $('#create-notice-container, #create-sms-container, #create-notice-and-sms-container, #save-and-post-notice-container').empty();
                        $('#post-notice-email-sms-container').html(response);
                        createTimeHoursDropdown();
                        CreateMinutesDropdown();
                    }
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                }
            );
        }

    } catch (e) {
        console.error("Error:", e.message);
        alert("Script Error: " + e.message);
    }
});

function createTimeHoursDropdown() {
    debugger;
    var select = document.getElementById("TimeHoursddl");
    select.innerHTML = "<option value=''>--Select--</option>";
    for (var i = 0; i < 24; i++) {
        select.innerHTML += `<option value='${i.toString().padStart(2, '0')}'>${i.toString().padStart(2, '0')}</option>`;
    }
}

function CreateMinutesDropdown() {
    debugger;
    var select = document.getElementById("Timeminutesddl");
    select.innerHTML = "<option value=''>--Select--</option>";
    for (var i = 0; i < 60; i++) {
        var minute = i.toString().padStart(2, '0');
        select.innerHTML += `<option value='${minute}'>${minute}</option>`;
    }
}