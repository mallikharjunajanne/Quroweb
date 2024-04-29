




//Insert Feetype Form Submit function
$('#Feetermform').on('submit', function (event) {
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

            var AcademicYear = $('#ddlAcademicYear').val();
            var TermName = $('#TermNametxt').val();
            const lstfeetypes = Array.from(document.getElementById("lstfeetypes").selectedOptions).map(option => option.value);
            var description = document.getElementById("descriptiontxt").value;

            var formData = {
                AcademicYearId: AcademicYear,
                TermName: TermName,
                FeeTypeIds: lstfeetypes,        
                Description: description
            };

            CallToAjax('POST', "/FeeSection/Insert_feeterms", formData,
                function (resp) {
                    const errorMessages = {
                        "0": 'Term Name with Name ' + TermName +' already exists.',
                        "-3": 'Cannot Assign Multiple Feetypes having FeetypeStatus ""Fee Backlog"" to a single Fee Term.',
                        "-4": 'Already one Feetype having ""FeeBacklog"" Status is Assigned to another Fee Term for this Year,you cannot Assign Second Fee type having Feebacklog status to another FeeTerm.',
                        "-1":"Something went wrong please try again..!!"
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
$('#UpdateFeetermform').on('submit', function (event) {
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

            var Feetermid = $('#Feetermidtxt').val();
            var AcademicYear = $('#ddlAcademicYear').val();
            var TermName = $('#TermNametxt').val();
            const lstfeetypes = Array.from(document.getElementById("lstfeetypes").selectedOptions).map(option => option.value);
            var description = document.getElementById("descriptiontxt").value;

            var formData = {
                FeeTermId: Feetermid,
                AcademicYearId: AcademicYear,
                TermName: TermName,
                FeeTypeIds: lstfeetypes,
                Description: description
            };

            //CallToAjax('POST', "/FeeSection/FeeType_Edit", formData,
            CallToAjax('POST', "/FeeSection/FeeTermUpdate", formData,
                function (resp) {
                    const errorMessages = {
                        "0": 'FeeTerm with the Name ' + TermName +' already exists.', 
                        "2": 'Cannot Update FeeType(s) for FeeTerm ' + TermName +' ,Few Students are Assocoiated with It.',
                        "3": 'Cannot Assign Multiple Feetypes having FeetypeStatus ""Fee Backlog"" to a single Fee Term.',
                        "4": 'Already one Feetype having ""FeeBacklog"" Status is Assigned to another Fee Term for this Year,you cannot Assign Second Fee type having Feebacklog status to another FeeTerm.',
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
function Confirmdltall(Feetermid, Feetermname) {
    // if (confirm("Are you sure you want to delete this FeeType?\nClick OK to delete or Cancel to stop deleting.")) {
    debugger;
    const lstfeetypesids = Array.from(document.getElementById("lstfeetypes").selectedOptions).map(option => option.value);
    const listBox = document.getElementById("lstfeetypes");
    const selectedOptions = Array.from(listBox.selectedOptions);
    const selectedTexts = [];
    const selectedIds = [];
    selectedOptions.forEach(option => {
        selectedTexts.push(option.text);
        selectedIds.push(option.value);
    }); 
    DeleteFeeTypes(Feetermid, selectedIds, Feetermname, selectedTexts);
    //}
}