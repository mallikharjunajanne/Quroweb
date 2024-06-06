function handleAjaxMethod(method, url, data, successCallback, errorCallback) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        //contentType: false,
        //processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };
    $.ajax(ajaxOptions);
}




function getCurrentDateFormatted() {
    var currentDate = new Date();

    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

//=====<<** Table in Date Show function **>>
var Dates = $('#Startdatetxt').val();
var SelectedDate = formatDateAndSetText(Dates);
$('#Startdatetexttbltd').text(SelectedDate);

function formatDateAndSetText(inputDate) {
    var dateParts = inputDate.split("-");
    var formattedDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
    //debugger;
    return formattedDate; 
}



$('#btnSubmit').on("click", function () {
    loaddingimg.css('display', 'block');
    $('#ErrorMessage').text('');
    //e.preventDefault();
    debugger;
    var Startdate = $('#Startdatetxt').val();
    var dateSelected = formatDateAndSetText(Startdate);
    var InstanceClassificationId = $('#Ddldepartment').val();
    var ClassificationName = $('#Ddldepartment option:selected').text();
    //var SubClassificationName = $('#DdlSubClass option:selected').text();
    var instanceSubClassificationName = $('#DdlSubClass option:selected').map(function () {return $(this).text();}).get().join(", ");
    var SubjectSlotID = $('#Ddslots').val();
    var subjectSlotName = $('#Ddslots option:selected').text();
    var StudentsmsChecked = $('#Studentsmschk').prop('checked');
    var ParentsmsChecked = $('#Parentsmschk').prop('checked');
    var formData = [];
    $(".txtArea").each(function () {
        var textareaValue = $(this).val();
        if (textareaValue == null) {
            textareaValue = "";
        }
        var instanceSubClassificationId = $(this).closest("tr").find("td:first-child").text();
        var SubClassificationName = $(this).closest("tr").find("td:eq(2)").text().trim();
        formData.push({
            "StartDate": Startdate,
            "InstanceClassificationId": InstanceClassificationId,
            "SlotId": SubjectSlotID,
            "Studentsms": StudentsmsChecked,
            "Parentsms": ParentsmsChecked,
            "instanceSubClassificationId": instanceSubClassificationId,
            "Usersids": textareaValue,
            "SlotName": subjectSlotName,
            "ClassificationName": ClassificationName,
            "SubClassificationName": SubClassificationName,
            //"Userids": textareaValue
           // "textareaValue": textareaValue
        });
    });
    debugger;
    var data = { objList: formData };

    handleAjaxMethod('POST', '/Attendance/FastAttendance', data,
        function (resp) {
            debugger;
            let message="";
            let responseMessages = resp.split("; ");
            if (responseMessages.length >= 2) {
                let firstValue = responseMessages[0].trim();
                let SecoundValue = responseMessages[1].trim();
                let messages = "";
                switch (firstValue) {
                    case '0':
                       // messages = `Attendance already posted for ${instanceSubClassificationName} class on ${dateSelected} for ${subjectSlotName}`;
                        messages = `Attendance already posted for ${SecoundValue} class on ${dateSelected} for ${subjectSlotName}`;
                        break;
                    case '-2':
                        //messages = `Entered REG. NO. 's are invalid for ${instanceSubClassificationName} class on ${dateSelected} for ${subjectSlotName}`;
                        messages = `Entered REG. NO. 's are invalid for ${SecoundValue} class on ${dateSelected} for ${subjectSlotName}`;
                        break;
                    case '-3':
                       //messages = `You cannot post attendance as no students exist in ${instanceSubClassificationName} ${subjectSlotName}`;
                        messages = `You cannot post attendance as no students exist in ${SecoundValue} ${subjectSlotName}`;
                        break;
                    case '-5':
                        messages = 'Entered REG. NO.s are invalid.';
                        break;
                        return;
                    case '1':
                        messages = 'Attendance posted successfully.';
                        $('#btnSubmit').prop('disabled', true);
                        break;
                        return;
                    case 'SMS MODE IS OFF':
                        messages = 'Sms Status Mode is Off, SMS will not send';
                        break;
                        return;
                   case "":
                        messages = ' ';
                        break;
                        return;
                    default:
                        messages = 'An unexpected error occurred.';
                        break;
                        return;
                }
                message += messages;
            }

            //responseMessages.forEach(returnValue => {
            //    let messagess="";
            //    switch (returnValue.trim()) {
                   
            //        case '1':
            //            messagess = 'Attendance posted successfully.';
            //            $('#btnSubmit').prop('disabled', true);
            //            break;
            //            return;
            //        case 'SMS MODE IS OFF':
            //            messagess = 'Sms Status Mode is Off, SMS will not send';
            //            break;
            //            return;
            //        case "":
            //            messagess = ' ';
            //            break;
            //            return;
            //        default:
            //            messages = 'An unexpected error occurred.';
            //            break;
            //            return;
            //    }
            //    message += messagess;
            //});
            if (message.endsWith("; ")) {
                message = message.slice(0, -2);
            }
            $('#ErrorMessage').text(message);
        },
        function (status, error) {
           console.error("Error fetching data:", error);
        }
    );

    loaddingimg.css('display', 'none');
});







