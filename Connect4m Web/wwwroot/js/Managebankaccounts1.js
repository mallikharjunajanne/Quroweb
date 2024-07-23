
//Insert Feetype Form Submit function
$('#Bankaccountsform').on('submit', function (event) {
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

            var BankName = $('#BankNametxtid').val();
            var AccountNumber = $('#AccountNumbertxtid').val();
            var BranchCode = $('#BranchCodetxtid').val();
            var IFSCCode = $('#IFSCCodetxtid').val();
            var Address = $('#Addresstxtid').val();
            var Description = $('#Descriptiontxtid').val();

            var formData  = $('#Bankaccountsform').serialize();

            CallToAjax('POST', "/FeeSection/Insert_Bankaccounts", formData,
                function (resp) {
                    const errorMessages = {
                        "0": 'Account Number with Name ' + AccountNumber + ' already exists in ' + BankName +' Bank',
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

//BACK TO SEARCH BUUTON CLICK EVENT
$('#Svbacktosearchbtn').click(function () {
    debugger;
    loaddingimg.css('display', 'block');
    location.reload();
    loaddingimg.css('display', 'none');
});


//Update Feetype Form Submit function
$('#Updatebankaccountsform').on('submit', function (event) {
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

            var BankName = $('#BankNametxtid').val();
            var AccountNumber = $('#AccountNumbertxtid').val();
            var BranchCode = $('#BranchCodetxtid').val();
            var IFSCCode = $('#IFSCCodetxtid').val();
            var Address = $('#Addresstxtid').val();
            var Description = $('#Descriptiontxtid').val();

            var formData = $('#Updatebankaccountsform').serialize();


            CallToAjax('POST', "/FeeSection/Edit_Bankaccounts", formData,
                function (resp) {
                    const errorMessages = {
                        "1": 'Some fee installments are already associated with this Bank Account. So you cannot change the account number.',
                        "0": 'Account Number with Name ' + AccountNumber + ' already exists in ' + BankName +' Bank',
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


$('#Deletebtn').click(function () {
    var BankAccountId= $('#BankAccountIdtxtid').val();
    var Bankname = $('#BankNametxtid').val();
    var AccountNumber = $('#AccountNumbertxtid').val();
    DeleteFeeTypes(BankAccountId, Bankname);
});

//===>>> CLEAR FUNCTION
function InsertClearform(formId) {
    debugger;
    var form = document.getElementById(formId);
    if (form) {
        form.reset(); // Reset the form elements
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });
        $('#Errormessage').text('');
    }
}
