
//----------------------  Getting current Date In correct Format
var loaddingimg = $('#loading');
  function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

      var formattedDate = day + '-' + month + '-' + year;
     return formattedDate;
}

//---------------------------   Close The Alert Message 
$('.alert button').click(function (event) {
    event.preventDefault();
    $(this).closest('.alert').css('display', 'none');
})


//----------------------------------------------------------------------------------   Common Ajax Function To all
function CommonAjaxFunction(method, url, data, successCallback, errorCallback, hasFileUpload) {
   // debugger;
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

//------------------  Get Days In Month


function getDaysInMonth(year, month) {
   
    try {
        return new Date(year,month + 1, 0).getDate();
    }
    catch {
        return 0;
    }
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