
//Insert Feetype Form Submit function
$('#Newdiscountfeetypeform').on('submit', function (event) {
    debugger;
    event.preventDefault();
    event.stopPropagation();
    $('#Commonerrormessage').text('');

    setTimeout(function () {
        $('#Commonerrormessage').text('');
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            debugger;

            var ConcedingTypeName = $('#ConcedingTypeNametxt').val();
            var Amount = $('#Amounttxt').val();
            var Description = $('#Descriptiontxt').val();
 
            var formData = {
                ConcedingTypeName: ConcedingTypeName,
                Amount: Amount,
                Description: Description
            };

            //var formData = $('#Newdiscountfeetypeform').serilaize();

            CallToAjax('POST', "/FeeSection/Insert_ManageFeeConcedingTypes", formData,
                function (resp) {
                    const errorMessages = {
                        "0": 'Fee DiscountType with the Name ' + ConcedingTypeName + ' already exists.',
                        //"-3": 'Cannot Assign Multiple Feetypes having FeetypeStatus ""Fee Backlog"" to a single Fee Term.',
                        //"-4": 'Already one Feetype having ""FeeBacklog"" Status is Assigned to another Fee Term for this Year,you cannot Assign Second Fee type having Feebacklog status to another FeeTerm.',
                        //"-1": "Something went wrong please try again..!!"
                    };
                    $('#Commonerrormessage').text(errorMessages[resp] || 'Record inserted successfully');
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                },
            );
        }
    }, 50);
});

//Insert View Amount Input Validation On Event
$('#Amounttxt').on('input', function () {
    debugger;
    var amountInput = $(this).val().trim(); // Get the trimmed value from the input
    var digitRegex = /^\d*\.?\d*$/; // Regular expression to match digits only

    // Check if the input matches the digit-only format
    if (digitRegex.test(amountInput)) {
        // Input contains only digits, remove any previous error message
        $('#AmountError').text('');
    }
    else {
        // Input contains letters or special characters, show error message
        $('#AmountError').text('Please enter digits only.');
        // Remove invalid characters from the input value
        $(this).val(amountInput.replace(/[^\d]/g, ''));
    }
});

//BACK TO SEARCH BUUTON CLICK EVENT
$('#Svbacktosearchbtn').click(function () {
    debugger;
    loaddingimg.css('display', 'block');

    location.reload();
    //$('#Addnewfeetype_div1').empty();
    //$('#SearchFeetype_tbldiv').show();
    //$('#Commonerrormessage').text('');

    loaddingimg.css('display', 'none');
});


//Update View Amount Input Validation On Event
$('#Editamounttxt').on('input', function () {
    debugger;
    var amountInput = $(this).val().trim(); // Get the trimmed value from the input
    var digitRegex = /^\d*\.?\d*$/; // Regular expression to match digits only

    // Check if the input matches the digit-only format
    if (digitRegex.test(amountInput)) {
        // Input contains only digits, remove any previous error message
        $('#AmountEditError').text('');
    }
    else {
        // Input contains letters or special characters, show error message
        $('#AmountEditError').text('Please enter digits only.');
        // Remove invalid characters from the input value
        $(this).val(amountInput.replace(/[^\d]/g, ''));
    }
});

//Update Feetype Form Submit function
$('#Updatediscountfeetypeform').on('submit', function (event) {
    debugger;
    event.preventDefault();
    event.stopPropagation();
    $('#Commonerrormessage').text('');

    setTimeout(function () {
        $('#Commonerrormessage').text('');
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            debugger;

            var ConcedingTypeid = $('#EdittxtConcedingTypeid').val();
            var ConcedingTypeName = $('#EdittxtConcedingTypeNameid').val();
            var amount = $('#Edittxtamountid').val();
            var description = $('#Edittxtdescriptionid').val();

            var formData = {
                ConcedingTypeId: ConcedingTypeid,
                ConcedingTypeName: ConcedingTypeName,
                Amount: amount,
                Description: description
            };

           CallToAjax('POST', "/FeeSection/Update_ManageFeeConcedingTypes", formData,
                function (resp) {
                    const errorMessages = {
                        "0": 'Fee Discount Type with the Name ' + ConcedingTypeName + ' already exists.',
                        "2": 'Fee Discount Type Associated with few users you cannot update the Amount.',
                    };
                    $('#Commonerrormessage').text(errorMessages[resp] || 'Record Updated successfully');
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                },
            );
        }
    }, 50);
});

//BACK TO SEARCH BUUTON CLICK EVENT
$('#updbacktosearchbtn').click(function () {

    debugger;
    loaddingimg.css('display', 'block');

    location.reload();

    loaddingimg.css('display', 'none');

});


//Update View Feetype Delete Function
function Confirmdltall(ConcedingTypeIDS, ConcedingTypeNames) {
    // if (confirm("Are you sure you want to delete this FeeType?\nClick OK to delete or Cancel to stop deleting.")) {
    debugger;

    var ConcedingTypeid = $('#EdittxtConcedingTypeid').val();
    var ConcedingTypeName = $('#EdittxtConcedingTypeNameid').val();

    DeleteFeeTypes(ConcedingTypeid, ConcedingTypeName);
    //}
}