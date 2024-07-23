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

function Forgetpasswordbtn() {
    loaddingimg.css('display', 'block');

    var Formdata = $('#Forgetpasswordform').serilaize();
    var UserName = $('$Useridtxt').val();
    var Mobilenumber = $('Mobilenumbertxt').val();

    //DataCallToAjax('POST', '/Attendance/ForgetPassword', Formdata,
    DataCallToAjax('POST', '/Attendance/GetForgetPassworddetails', Formdata,
        function (response) {
            if (response == 0) {
                alert('Please Enter Your Username / Mobile Number');
            }
            if (response == "correct") {
                window.location.href = "/Attendance/LoginPage";
            }

            //$('#Searchnotices_Maindiv').hide();
            //$('#Noticesadding_Firstdiv').append(response);
            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        });
}


$('#Forgetpasswordform_').submit(function () {
    loaddingimg.css('display', 'block');

    var Formdata = $('#Forgetpasswordform').serilaize();
    var UserName = $('$Useridtxt').val();
    var Mobilenumber = $('Mobilenumbertxt').val();
    
    //DataCallToAjax('POST', '/Attendance/ForgetPassword', Formdata,
        DataCallToAjax('POST', '/Attendance/GetForgetPassworddetails', Formdata,
        function (response) {
            if (response == 0) {
                alert('Please Enter Your Username / Mobile Number');
            }
            if (response == "correct") {
                window.location.href = "/Attendance/LoginPage";
            }

            //$('#Searchnotices_Maindiv').hide();
            //$('#Noticesadding_Firstdiv').append(response);
            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        });
});