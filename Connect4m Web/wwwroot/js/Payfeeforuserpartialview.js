

$(document).ready(function () {


    updateDateTime();


    setInterval(updateDateTime, 1000);


});


$('#Pfuchallanbacktosearchbtn').click(function () {
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




$('#Pfuchallanbacktopayfeebtn').click(function () {

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


function updateDateTime() {
    const currentDate = new Date();
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    const formattedDate = `${month} ${day} ${year}`;
    const formattedTime = `${formattedHours}:${minutes}${amOrPm}`;

    // Update the <span> elements with the formatted date and time
    document.getElementById("dateSpan").textContent = formattedDate;
    document.getElementById("timeSpan").textContent = formattedTime;
}

document.getElementById("Print_Matrix_Button").addEventListener("click", function () {
    // Get the content of the div with id 'MatricChallanaPrint'
    const printContent = document.getElementById("MatricChallanaPrint").innerHTML;
    //const printContent = document.getElementById("MatricChallanaPrintdiv").innerHTML;

    // Create a new window for printing
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print</title></head><body>');

    // Write the content to the new window
    printWindow.document.write(printContent);

    // Close the new window after printing
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
});



document.getElementById("Print_Button").addEventListener("click", function () {
    //const printContent = document.getElementById("Fee_DetailsPrintdiv").innerHTML;
    const printContent = document.getElementById("Fee_DetailsPrint").innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.open();
    printWindow.document.write('<html><head><title>Print Fee Details</title></head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
});


