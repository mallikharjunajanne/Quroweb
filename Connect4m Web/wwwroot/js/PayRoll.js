//-----------------------------------04-09-2023


//------------------------------------------  To Contros The Steps (8)
function setProgressBar(curStep, backgroundcolor) {
    //debugger;
    var percent = parseFloat(94 / 8) * curStep;
    percent = percent.toFixed();
    $('.progress ' + backgroundcolor).css('background-color', '#500ef6');
    $(".progress #Progressbarouter")
        .css("width", percent + "%");
    for (var i = 1; i <= curStep; i++) {
        $('.progress .c-' + i).css('background-color', '#500ef6');
    }
    for (var i = curStep+1;i<=8;i++) {
        $('.progress .c-' + i).css('background-color', '');
    }
  
    
}

$(document).ready(function () {



  //  $('#AppendAllPayRolls #InnerPayRoll').html($('#StepsControllerAppend').html());
  //  $('#StepsControllerAppend').html("");
   // debugger;
   // var SubjectVideoIdCookie = getCookie("PayRollPage");
   // $('#AppendAllPayRolls #InnerPayRoll').html(SubjectVideoIdCookie);


   //debugger;
   // searchSalaryAttributes();
   // searchSalaryAttributes();
    var urlofpayroll = $("#StepsControllerAppend").val();
   // debugger;
    if (urlofpayroll != undefined) {


        loaddingimg.css('display', 'block');
        CommonAjaxFunction('GET', '/PayRoll/' + urlofpayroll, null, function (response) {
            $('#AppendAllPayRolls #InnerPayRoll').html(response);
            loaddingimg.css('display', 'none');
        }, function (status, error) {
            loaddingimg.css('display', 'none');

        }, false);
    }
})
//-----------------------------------------------------------------------------   Go To Next page/Previous page
function nextpage(url, data) {
    return new Promise((resolve, reject) => {
      //  debugger;
        document.getElementById("loading").style.display = "block";
        CommonAjaxFunction('GET', '/PayRoll/' + url, data, function (response) {
            var lenghtofpayrollid = $('#AppendAllPayRolls #InnerPayRoll').length;
            if (lenghtofpayrollid == 0) {
                
            //    $('#StepsControllerAppend').html("326");

                window.location.href = "/PayRoll/StepsControl?url="+url;
          
                $('#AppendAllPayRolls #InnerPayRoll').html(response);//-- No need 
                document.getElementById("loading").style.display = "none";//----No Need
              
            } else {
                $('#AppendAllPayRolls #InnerPayRoll').html(response);
                document.getElementById("loading").style.display = "none";
            }
          
           
            resolve();

        }, function (status, error) {
         
            document.getElementById("loading").style.display = "none";
          //  alert("reject");
            reject();
        }, false);
    })
}
////------------------------------------------------------------------------  Date Compare


//function datescompare(event,start,end) {
//    event.stopImmediatePropagation();
    
//   // debugger;
//    try {
//    var startDate = new Date(document.getElementById("StartDate").value);
//    var endDate = new Date(document.getElementById("EndDate").value);
//    var error = $('#EndDate').closest('.form-group');
//        $(error).find('.compare').removeClass('error2');
//        if (endDate <= startDate) {

          
//            $(error).find('.compare').addClass('error2');
//            $(error).find('.compare').text(end+" must be greater than "+ start +".");

//    } else {
      
//            $(error).find('.compare').addClass('');
//            $(error).find('.compare').text("");
//        }

//    } catch {

//    }
//}
//----------------------------------------------------------------------------------Track The  Change Activity 
function ShowUserChangeActivityAmount(SourceId, AuditKey, TableName) {
    window.open("/PayRoll/ChangeActivity?AuditKey=" + AuditKey + "&SourceId=" + SourceId + "&Name=" + TableName, "_blank", "width = 400, height = 400");
    return false;
}

function AllowFloat(event) {
  
    var keyCode = event.which || event.keyCode;


    if ((keyCode >= 48 && keyCode <= 57) || keyCode === 46 || keyCode === 8) {
        return true; // Allow the key
    } else {
        return false; // Prevent the key from being entered
    }
}
