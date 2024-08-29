
////==>> Select All Function
$('#chkCheckAll').on('click', function () {
   //debugger;
    var isChecked = $(this).prop('checked');

    $('#Admissiontbl tbody input[type="checkbox"]:not(:disabled)').each(function () {
        if ($(this).is(':visible')) {
            $(this).prop('checked', isChecked);
        }
    });
});