$("#PFUtermsupdatbtnid").click(function () {
    //$('#ErrorMessages_EditUsers').text('');
    //$('#PFU_TermsFeeTable_IN_Update').text('');
    var UpdateData = [];
    var ChallanDetails = [];


    var table = $('#Search_FeeDetails_ByUserUpdate');
    var rows = table.find('tbody tr');



    /*  debugger;*/
    var ErrorMessageValidation = true;
    var FeeAmountMessageValidation = true;
    var updatedRowCount = 0;

    rows.each(function () {
        var row = $(this);

        var Sno = row.find('td:nth-child(1)').text();
        var Term = row.find('td:nth-child(2)').text();
        var FeeType = row.find('td:nth-child(3)').text();
        var Amount_Txt = row.find('td:nth-child(4) input[type="text"]').val();
        var Amount_Txts = row.find('td:nth-child(4) input[type="text"]').val();
        var Span_AmountSpan = row.find('td:nth-child(4) #AmountTxt_Spanid').text();
        var InstallmentName_Txt = row.find('td:nth-child(5) textarea').val();
        var Span_InstallmentName = row.find('td:nth-child(5) #Installment_Spanid').text();
        var PaidDate = row.find('td:nth-child(6)').text();

        var dateAndTime = PaidDate.split(' ');
        var dateComponents = dateAndTime[0].split('-');
        var day = dateComponents[0];
        var month = dateComponents[1];
        var year = dateComponents[2];
        var formattedDate = day + '/' + month + '/' + year;
        var date = formattedDate;
        var time = dateAndTime[1];

        var FeeAmount = row.find('td:nth-child(9)').text();
        var ReceiptNo = row.find('td:nth-child(10)').text();
        var FirstName = row.find('td:nth-child(11)').text();
        var ClassificationName = row.find('td:nth-child(12)').text();
        var SubClassificationName = row.find('td:nth-child(13)').text();
        var DueDate = row.find('td:nth-child(14)').text();
        var DueAmount = row.find('td:nth-child(15)').text();
        var AdmissionNumber = row.find('td:nth-child(16)').text();
        var ConcedingAmount = row.find('td:nth-child(17)').text();
        var DiscountName = row.find('td:nth-child(18)').text();

        var parsedDueAmount = parseInt(DueAmount);
        if (parsedDueAmount <= 0) {
            ErrorMessageValidation = false;
            return false;
        }
        if (parseInt(Amount_Txt) >= parseInt(FeeAmount)) {

            ErrorMessageValidation = false;
            return false;
        }
        debugger;
        var PaidAmounts = + Amount_Txts;
        if (Amount_Txt != "" && Amount_Txt != "0.0" && Amount_Txt != "0") {

            if (Amount_Txt != Span_AmountSpan || InstallmentName_Txt != Span_InstallmentName) {

                var Amount = Amount_Txt;
                var InstallmentName = InstallmentName_Txt;
                var InstallmentId = row.find('td:nth-child(8)').text();
                var PaidAmount = + PaidAmounts;
                var DueAmount = FeeAmount - PaidAmount;
                var balanceamount = DueAmount - PaidAmount;
                UpdateData.push({ 'InstallmentId': InstallmentId, 'InstallmentName': InstallmentName, 'Amount': Amount });

                ChallanDetails.push({
                    'ReceiptNo': ReceiptNo, 'DiscountName': DiscountName, 'DueDate': DueDate, 'FirstName': FirstName, 'ClassificationName': ClassificationName, 'SubClassificationName': SubClassificationName, 'InstallmentName': InstallmentName, 'Amount_Txt': PaidAmount, 'InstallmentId': InstallmentId, 'PaidDate': date, 'PaidTime': time, 'FeeType': FeeType, 'Term': Term, 'AdmissionNumber': AdmissionNumber, 'FeeAmount': FeeAmount, 'ConcedingAmount': ConcedingAmount, 'DueAmount': DueAmount, 'balanceamount': balanceamount
                });
                updatedRowCount++;
            }
        } else {
            FeeAmountMessageValidation = false;
            return false;
        }
        // ChallanDetails.push({'PaidAmounts': PaidAmounts});
    });



    debugger;

    if (updatedRowCount > 1) {

        //$('#ErrorMessages_EditUsers').text('You cannot update more than one record at a time.');
        $('#Errormessage').text('You cannot update more than one record at a time.');
        return false;

    } else if (!ErrorMessageValidation) {

        //$('#ErrorMessages_EditUsers').text('Entered Amount is Exceeding the Fee Amount, Please Verify the Amount.');
        $('#Errormessage').text('Entered Amount is Exceeding the Fee Amount, Please Verify the Amount.');
        return false;

    } else if (UpdateData.length === 0) {

        // $('#ErrorMessages_EditUsers').text('You are not Updated Any Value');
        $('#Errormessage').text('You are not Updated Any Value');
        return false;

    } else if (!FeeAmountMessageValidation) {

        //$('#ErrorMessages_EditUsers').text('Please enter amount.');
        $('#Errormessage').text('Please enter amount.');
        return false;

    }

    debugger;

    $.ajax({
        type: 'POST',
        url: '/FeeSection/Pfusingleuserfeeinstallment?UpdateData=' + JSON.stringify(UpdateData) + "&ChallanDetails=" + JSON.stringify(ChallanDetails), // Update with your actual controller and action names

        // url: '/FeeSection/PFU_FeeInstallments_BulkFeeUPDATE?UpdateData=' + JSON.stringify(UpdateData) + "&ChallanDetails=" + JSON.stringify(ChallanDetails), // Update with your actual controller and action names

        success: function (result) {
            debugger;
            $('#PFUtermsupdatbtnid').prop('disabled', true);

            $('#Searchuserfields_tabledatadiv1').hide();
            $('#Userfeedetailsdiv2').hide();
            $('#Feechallandiv').show();
            $('#Feedetailsupdateandedit_tablediv').show();

            //$('#Challan_partialView_Container').css({ 'display': 'block' });
            //$('#Challan_partialView_Container').html(result);           
            $('#Feereceipt_partailcontaindiv').html(result);
        },
        error: function (error) {
            // Handle error
        }
    });
});
$('#Pfuchallanbacktosearch_btn').click(function () {
    $('#Studentdetailsid').text('');
    $('#Studentfeedetailsscheduledornotspanid').text('');
    $('#Studentuseridspid').val('');
    $('#ddltermid').empty();
    $('#ddlFeetermid').empty();

    $('#bankaccountsddl').prop('selectedIndex', 0);
    $('#paymentmodeddl').prop('selectedIndex', 0);

    $('#Update_SubmitvalidationMessage').text('');
    $('#Errormessage').text('');

    $('#MANAGEFEEDETAILSFORM')[0].reset();
    $('#Searchuserfields_tabledatadiv1').show();
    $('#Userfeedetailsdiv2').hide();
    $('#Feechallandiv').hide();
    $('#Feedetailsupdateandedit_tablediv').hide();
    $('#Feereceipt_partailcontaindiv').empty();
    $('.hideable').hide();

    $('#Cheque_DD_TxtId').val('');
    $('#Cheque_DD_DateTxtId').val('');
    $('#Cheque_DD_BankName_TxtId').val('');
    $('#ChequeDDBankBranch_TXTID').val('');
    $('#Description_TXTAId').val('');
    $('#SubmitvalidationMessages').text('');

});
$('#Pfuchallanbacktopayfee_btn').click(function () {

    debugger;

    $('#Studentdetailsid').text('');
    $('#Studentfeedetailsscheduledornotspanid').text('');
    $('#Errormessage').text('');
    $('#ddltermid').empty();
    $('#ddlFeetermid').empty();

    $('#bankaccountsddl').prop('selectedIndex', 0);
    $('#paymentmodeddl').prop('selectedIndex', 0);

    $('#MANAGEFEEDETAILSFORM')[0].reset();
    $('#Searchuserfields_tabledatadiv1').hide();
    $('#Userfeedetailsdiv2').show();
    $('#Feechallandiv').hide();
    $('#Feedetailsupdateandedit_tablediv').hide();

    //fee details table refreshing calling function
    var StudentuserId = $('#Studentuseridspid').val();
    Searchfeetermsbtnclickfunction(StudentuserId, null);
    $('#Feereceipt_partailcontaindiv').empty();
    $('.hideable').hide();

    $('#Cheque_DD_TxtId').val('');
    $('#Cheque_DD_DateTxtId').val('');
    $('#Cheque_DD_BankName_TxtId').val('');
    $('#ChequeDDBankBranch_TXTID').val('');
    $('#Description_TXTAId').val('');
    $('#SubmitvalidationMessages').text('');

});
