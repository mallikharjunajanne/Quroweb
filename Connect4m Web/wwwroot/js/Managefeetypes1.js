
$(document).ready(function () {
    $('#Amounttxtdiv').hide();

    debugger;

    //Insert View Radio Button Change Event Handler
    $('input[name="Qunatityradio"]').change(function () {
        if (this.value === '1') {
            $('#Amounttxtdiv').show(); // Show the Amounttxtdiv if Yes is selected
        } else {
            $('#Amounttxtdiv').hide(); // Hide the Amounttxtdiv if No is selected
            $('#Amounttxt').val('');
        }
    });


    //Update View Radio Button Change Event Handler
    $('input[name="Qunatityamountradio"]').change(function () {
        if (this.value === '1') {
            $('#EditAmounttxtdiv').show(); // Show the Amounttxtdiv if Yes is selected
        } else {
            $('#EditAmounttxtdiv').hide(); // Hide the Amounttxtdiv if No is selected
            $('#Editamounttxt').val('');
        }
    });
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

//Insert Feetype Form Submit function
$('#Feetypeform').on('submit', function (event) {
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

            const feeType = document.getElementById("Feetypetxt").value;
            const feeTypeStatus = document.querySelector('input[name="Feetypestatus"]:checked')?.value;
            const concedingtypeIds = Array.from(document.getElementById("lstConcedingtypes").selectedOptions).map(option => option.value);
            const quantity = document.querySelector('input[name="Qunatityradio"]:checked')?.value;
            const amount = document.getElementById("Amounttxt").value;
            var description = document.getElementById("descriptiontxt").value;

            var formData = {
                FeeType: feeType,
                Feetypestatus: feeTypeStatus,
                ConcedingtypeIds: concedingtypeIds,
                Quantity: quantity,
                Amount: amount,
                Description: description
            };

            CallToAjax('POST', "/FeeSection/Insert_feetype", formData,
                function (resp) {
                    const errorMessages = {
                        "0": 'Fee Type with Name ' + feeType + ' already exists.',
                        "-2": 'One FeeType with Fee Backlog is Already set to Current Academic Year,You cannot Create Fee Type with Fee BackLog.',
                        "-4": 'Fee Type with Receipt Code ' + 'Your Receipt Code' + ' already exists.'
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
$('#Updatefeetypeform').on('submit', function (event) {
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

            const feetypeId = document.getElementById("FeetypeIdtxt").value;
            const feeType = document.getElementById("UFeetypetxt").value;
            const feeTypeStatus = document.querySelector('input[name="Feetypestatus"]:checked')?.value;
            const concedingtypeIds = Array.from(document.getElementById("UlstConcedingtypes").selectedOptions).map(option => option.value);
            const quantity = document.querySelector('input[name="Qunatityamountradio"]:checked')?.value;
            const amount = document.getElementById("Editamounttxt").value;
            var description = document.getElementById("Udescriptiontxt").value;

            var formData = {
                Feetypeid: feetypeId,
                FeeType: feeType,
                Feetypestatus: feeTypeStatus,
                ConcedingtypeIds: concedingtypeIds,
                Quantity: quantity,
                Amount: amount,
                Description: description
            };

            //CallToAjax('POST', "/FeeSection/FeeType_Edit", formData,
            CallToAjax('POST', "/FeeSection/FeeTypeUpdate", formData,
                function (resp) {
                    const errorMessages = {
                        "0": 'Fee Type with Name ' + feeType + ' already exists.',
                        "2": 'This FeeType has a Relationship with one of DiscountType you cannot Update It.',
                        "3": 'Cannot Update DiscountType(s) for FeeType ' + feeType + ' ,It is Associated with Few Students.',
                        "4": 'One FeeType with Fee Backlog is Already set to Current Academic Year,You cannot Create Fee Type with Fee BackLog.',
                        "5": 'FeeType is Already Associated with Few users you Cannot Update the Fee Type Status.',
                        "-4": 'Fee Type with Receipt Code ' + 'ReceiptCode' + ' already exists.'
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


    // Clear the HTML content inside the container div
    //$('#Addnewfeetype_div1').empty();

    //// Show the search table
    //$('#SearchFeetype_tbldiv').show();

    //// Clear any text in #Commonerrormessage
    //$('#Commonerrormessage').text('');

    // Hide the loading image after completing operations
    loaddingimg.css('display', 'none');

});


//Update View Feetype Delete Function
function Confirmdltall(Feetypeid,FeetypeName) {
    // if (confirm("Are you sure you want to delete this FeeType?\nClick OK to delete or Cancel to stop deleting.")) {
    debugger;
    const concedingtypeIds = Array.from(document.getElementById("UlstConcedingtypes").selectedOptions).map(option => option.value);
    const listBox = document.getElementById("UlstConcedingtypes");
    const selectedOptions = Array.from(listBox.selectedOptions);
    const selectedTexts = [];
    const selectedIds = [];
    selectedOptions.forEach(option => {
        selectedTexts.push(option.text);
        selectedIds.push(option.value);
    });
    DeleteFeeTypes(Feetypeid, FeetypeName, selectedIds, selectedTexts);
    //}
}


