
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

            //var formData = {
            //    AcademicYearId: AcademicYear,
            //    TermName: TermName,
            //    FeeTypeIds: lstfeetypes,
            //    Description: description
            //};

            CallToAjax('POST', "/FeeSection/Insert_Bankaccounts", formData,
                function (resp) {
                    const errorMessages = {
                        "0": 'Account Number with Name ' + AccountNumber + ' already exists in ' + BankName +' Bank',
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

            //var formData = {
            //    FeeTermId: Feetermid,
            //    AcademicYearId: AcademicYear,
            //    TermName: TermName,
            //    FeeTypeIds: lstfeetypes,
            //    Description: description
            //};

            CallToAjax('POST', "/FeeSection/Edit_Bankaccounts", formData,
                function (resp) {
                    const errorMessages = {
                        "1": 'Some fee installments are already associated with this Bank Account. So you cannot change the account number.',
                        "0": 'Account Number with Name ' + AccountNumber + ' already exists in ' + BankName +' Bank',
                        //"3": 'Cannot Assign Multiple Feetypes having FeetypeStatus ""Fee Backlog"" to a single Fee Term.',
                        //"4": 'Already one Feetype having ""FeeBacklog"" Status is Assigned to another Fee Term for this Year,you cannot Assign Second Fee type having Feebacklog status to another FeeTerm.',
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


////Update View Feetype Delete Function
//function Confirmdltall(Feetermid, Feetermname) {
//    // if (confirm("Are you sure you want to delete this FeeType?\nClick OK to delete or Cancel to stop deleting.")) {
//    debugger;
//    const lstfeetypesids = Array.from(document.getElementById("lstfeetypes").selectedOptions).map(option => option.value);
//    const listBox = document.getElementById("lstfeetypes");
//    const selectedOptions = Array.from(listBox.selectedOptions);
//    const selectedTexts = [];
//    const selectedIds = [];
//    selectedOptions.forEach(option => {
//        selectedTexts.push(option.text);
//        selectedIds.push(option.value);
//    });
//    DeleteFeeTypes(Feetermid, selectedIds, Feetermname, selectedTexts);
//    //}
//}