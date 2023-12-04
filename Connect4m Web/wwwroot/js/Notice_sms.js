$(document).ready(function () {


});


$("#ENoticeTypedd_Id").change(function () {
    debugger;
    var Selectedvalue = $('#ENoticeTypedd_Id').val()
    if (Selectedvalue != "") {
        $("#NoticeDisplayloginrRadio_btn").hide();
    } else {
        $("#NoticeDisplayloginrRadio_btn").show();
    }
});