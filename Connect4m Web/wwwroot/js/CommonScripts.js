////const { url } = require("inspector");
////const { type } = require("node:os");

//----------------------  Getting current Date In correct Format
var loaddingimg = $('#loading');

function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var seconds = currentDate.getSeconds().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
    return formattedDate;
}

//  function GetDateFormat() {
//    var currentDate = new Date();
//    var year = currentDate.getFullYear();
//    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
//    var day = currentDate.getDate().toString().padStart(2, '0');

//      var formattedDate = day + '-' + month + '-' + year;
//     return formattedDate;
//}

//---------------------------   Close The Alert Message 
$('.alert button').click(function (event) {
    event.preventDefault();
    $(this).closest('.alert').css('display', 'none');
})


//----------------------------------------------------------------------------------   Common Ajax Function To all
function CommonAjaxFunction(method, url, data, successCallback, errorCallback, hasFileUpload) {
   debugger;
    var ajaxOptions = {
        url: url,
        method: method,
        data:data,
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

//-------------------------------------------------- Common Delete Function 

function CommonDeleteFunction(title, type, url, data, successcallback) {

    Swal.fire({
        title: "Are you sure you want to delete this " + title + "?",
        text: "  ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        // If user confirms deletion
        if (result.isConfirmed) {
            $.ajax({

                url: url,
                data: data,
                type: type,
                success: successcallback

            })
        }
    })
}

//=====================================   Common Dropdown

function CommonDropdownAjaxFunction(id, type, url, data,successcalback,select) {

    var dropdown = $('#' + id);
    dropdown.empty();
    if (select) {
        dropdown.append($('<option></option>').val("").text("-------select-------"));
    }
    CommonAjaxFunction(type, url, data, function (response) {

        response.forEach(function (mentor) {
            var option = $('<option></option>').val(mentor.value).text(mentor.text);
            dropdown.append(option);
        });
        successcalback
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);


    

};

//------------------  Get Days In Month


function getDaysInMonth(year, month) {
   
    try {
        return new Date(year,month + 1, 0).getDate();
    }
    catch {
        return 0;
    }
}

//============================     Format Of Date

function _formatDate(date) {
    // Implement your own date formatting logic as needed
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-based
    var year = date.getFullYear();
    return day + "/" + month + "/" + year;
}



//------------------------------------------------------------------------  Date Compare


function datescompare(event, start, end) {
    event.stopImmediatePropagation();

    // debugger;
    try {
        var startDate = new Date(document.getElementById("StartDate").value);
        var endDate = new Date(document.getElementById("EndDate").value);
        var error = $('#EndDate').closest('.form-group');
        $(error).find('.compare').removeClass('error2');
        if (endDate <= startDate) {


            $(error).find('.compare').addClass('error2');
            $(error).find('.compare').text(end + " must be greater than " + start + ".");

        } else {

            $(error).find('.compare').addClass('');
            $(error).find('.compare').text("");
        }

    } catch {

    }
}
//=========================================================  Date Compare with not greater than today and  date in  between given input days
function datescomparepro(event, start, end) {
    event.stopImmediatePropagation();

    try {
        var startDate = new Date(document.getElementById("StartDate").value);
        var endDate = new Date(document.getElementById("EndDate").value);
        var today = new Date();

        var error = $('#EndDate').closest('.form-group');
        $(error).find('.compare').removeClass('error2');

        if (endDate < startDate) {
            $(error).find('.compare').addClass('error2');
            $(error).find('.compare').text(end + " must be greater than " + start + ".");
        } else if (startDate > today) {
            $(error).find('.compare').addClass('error2');
            $(error).find('.compare').text(start + " should be less than today.");
        } else if (endDate > today) {
            $(error).find('.compare').addClass('error2');
            $(error).find('.compare').text(end + " should be less than today.");
        } else if ((endDate - startDate) / (1000 * 60 * 60 * 24) >= 7) {
            $(error).find('.compare').addClass('error2');
            $(error).find('.compare').text("You cannot post attendance for more than 7 days at a time.");
        } else {
            $(error).find('.compare').addClass('');
            $(error).find('.compare').text("");
        }
    } catch (e) {
        console.error(e);
    }
}











////-----------------------------------------------------------------------------  Errors Find Out In Form
//function FormErrorsLenghth(formElement) {
//   // var formElement = document.getElementById('InsertSEM');
//    setTimeout(function () {
//        var validationMessages = formElement.getElementsByClassName('field-validation-error');
//        var validationmelength = validationMessages.length;

//        if (validationmelength == 0) {
//            ajaxaddexpenditure();
//        }
//        else {
//            $('.alert-danger p').text("Pleae Enter All Required Fields");
//            $(".alert-danger").show().delay(5000).fadeOut()
//        }



//    }, 50);

//}
//else {
//    // Regular data serialization for non-file-upload requests
//    //ajaxOptions.dataType = 'json';
//    //ajaxOptions.contentType = 'application/json';
//    // ajaxOptions.data = data;
//}