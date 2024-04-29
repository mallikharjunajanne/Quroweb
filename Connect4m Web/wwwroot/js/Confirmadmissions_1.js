
////==>> Select All Function
$('#chkCheckAll').on('click', function () {
    debugger;
    var isChecked = $(this).prop('checked');

    ///*$('.chkRow').prop('checked', isChecked);*/
    ///*$('#Admissiontbl tbody input[type="checkbox"]').prop('checked', isChecked);*/
    //$('#Admissiontbl tbody input[type="checkbox"]:not(:disabled)').filter(':visible').prop('checked', isChecked);
    ///*$('#Admissiontbl tbody input[type="checkbox"]:not(:disabled):visible"]').prop('checked', isChecked);*/


    $('#Admissiontbl tbody input[type="checkbox"]:not(:disabled)').each(function () {
        if ($(this).is(':visible')) {
            $(this).prop('checked', isChecked);
        }
    });

});