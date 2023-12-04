//const { table } = require("node:console");

//const { response } = require("express");

//const { debug } = require("node:util");

//const { debug } = require("node:util");

//----------  Change The Academic Year To get Fees 
$(document).ready(function () {
    if ($('#appendsearchexpansives').css('display') !== 'none') {
        searchTransactions();
        var dropdown = document.getElementById("dropdown_FinancialYear_SEM");
        dropdown.selectedIndex = dropdown.options.length - 1;
    } else {
        var paymentmodeval = $('#InsertSEM #dropdown_PaymentMode_SEM').val();
        dropdownchangeSEM(paymentmodeval);
        if ($('#InsertSEM #GovFundId_Sem').val() != "0") {
            $('#InsertSEM #Save_SEM').val("Update");
            $('#InsertSEM #clearform').css('opacity', '0.2');
            $('#InsertSEM #clearform').prop('disabled', true);

        }
        else {
            $('#InsertSEM #clearform').prop('disabled', false);

            $('#InsertSEM #clearform').css('opacity', '1');
            $('#InsertSEM #Save_SEM').val("Save");
        }
    }
})
//--------------------------- Getting Academic Fees
$(document).on('change', '#tblSEMfees #Drop_Format_SEM_3', function (event) {
    event.stopImmediatePropagation();
    var tableid = $('#tblSEMfees');
    var yearval = $(this).find('#dropdown_FinancialYear_SEM').val();
    gettingfees(tableid, yearval);
});
function gettingfees(tableid, yearval) {

    
    $.ajax({
        url: '/Videos/GettingAcademicFees?FinancialYearId=' + yearval,
        type: 'GET',
        success: function (response) {
          //  debugger;
            $(tableid).find('#SEM_FeeCollected').text(response.feeCollected);
          //  $(tableid).find('#SEM_Transfered').text(response.transfered);
            $(tableid).find('#DebitedAmount').text(response.debitedAmount);

            $(tableid).find('#TransferedDebitedAmount').text(response.feeCollected+response.transfered- response.debitedAmount);
          //  $(tableid).find('#SEM_RemainingAmount').text(response.feeCollected - response.approvalDebitedAmount + (response.approvalTotalAmount - response.approvalDebitedAmount));
            $(tableid).find('#ApprovalDebitedAmountT').text(response.approvalTotalAmount - response.approvalDebitedAmount );
            $(tableid).find('#ApprovalDebitedAmount').text(response.approvalDebitedAmount );
          //  $(tableid).find('#ApprovalTotalAmount').text(response.approvalTotalAmount);
            $(tableid).find('#RejectedDebitedAmountT').text(response.rejectedTotalAmount - response.rejectedDebitedAmount);
            $(tableid).find('#RejectedDebitedAmount').text(response.rejectedDebitedAmount);
          //  $(tableid).find('#RejectedTotalAmount').text(response.rejectedTotalAmount);
            $(tableid).find('#PendingDebitedAmountT').text(response.pendingTotalAmount - response.pendingDebitedAmount);
            $(tableid).find('#PendingDebitedAmount').text(response.pendingDebitedAmount);
          //  $(tableid).find('#PendingTotalAmount').text(response.pendingTotalAmount);
        }
    })
}
//-----------------------------  Search Gov Found Transactions
$(document).on('click', '#SerachSEM #sub_tblSEM', function (event) {
    event.stopImmediatePropagation();
    searchTransactions();

});
try {
   
    if (tabletargetpagetblSEMsearchresults == undefined) {
        var tabletargetpagetblSEMsearchresults = 0;
    }
}
catch {
    var tabletargetpagetblSEMsearchresults = 0;
}


function searchTransactions() {

    document.getElementById("loading").style.display = "block";
   
    var formid = $('#SerachSEM');
    var TypeofExpenditure = $(formid).find("#dropdown_FoundSource_SEM").val();
    var PaymentMode = $(formid).find("#dropdown_PaymentMode_SEM").val();
    var Amount = $(formid).find("#Amount_SEM").val();
    var Recipient = $(formid).find("#Recipient_SEM").val();
    var Paymentdate_sem = $(formid).find("#Date_SEM").val();
   // alert(Paymentdate_sem);
    var MonthId = $(formid).find("#dropdown_Monthid_SEM").val();
    var YearId = $(formid).find("#dropdown_Yearid_SEM").val();
    var VendorCategory = $(formid).find("#dropdown_Vendor_SEM").val();

    $.ajax({
        url: "/Videos/SearchtblGovFundRecieved?FundRecievedFromId=" + TypeofExpenditure + "&Amount=" + Amount + '&PaymentModeId=' + PaymentMode +'&YearId='+YearId+'&MonthId=' + MonthId + '&VendorName=' + Recipient + '&VendorCategory=' + VendorCategory+ '&Paymentdate=' + Paymentdate_sem,
        type: "GET",
        dataType: "JSON",
        success: bindDatatableSEM

    });
    document.getElementById("loading").style.display = "none";

    //$(document).on('click', '#pageindex', function () {
    //    var table = $('#tblSEMsearchresults').DataTable();
    //    table.page(3).draw('page');
    //})
   

    //--------------------------------------------------------Bind Data into Data Table 
 
    function bindDatatableSEM(response) {
        //
    
        var formattedDate = GetDateFormat();
     //   var num = 0;
        var table = $('#tblSEMsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_SEM").text(response.length);
        //  alert("hi1");
      
        var newTable = $("#tblSEMsearchresults").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'Simple Expense Management Report',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'Simple Expense Management Report',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },
                   
                

                },
                
                
                {
                    extend: 'print',
                    title: 'Simple Expense Management Report',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },
                }


            ],

            bProcessing: false,
            bLengthChange: true,
            /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
            bfilter: false,
            bSort: true,
            searching: false,
            //scrollX: true,
            //scrollY: '400px',
            /* scrollCollapse: true,*/
            paging: true,
            bPaginate: true,
          //  stateSave:true,
            data: response,
            columns: [

                {
                    data: "GovFundId",
                    visible: false,

                    render: function (data, type, row, meta) {
                        //  length++;
                        return row.govFundId
                    }
                },
                {
                    targets: 0, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                },

                {
                    data: "TypeofExpenditure",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.typeofExpenditure

                    }
                },
                {
                    data: "Amount",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.amount

                    }
                },
                {
                    data: "PaymentMode",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.paymentMode

                    }
                },
                {
                    data: "Description",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.description + '<input type="text" value=' + row.govFundId + ' hidden/>'

                    }
                }
                ,
                {
                    data: "PaymentDate",

                    render: function (data, type, row, meta) {
                        var paymentDate = new Date(row.paymentDate);

                        return paymentDate.toLocaleDateString();

                    }
                },
                {
                    data: "DocName",

                    render: function (data, type, row, meta) {
                        if (row.docName.trim() !== "") {
                            return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i><i class="fa fa-eye" title="View document" id="SEMView_document" ><span style="display:none">' + row.docName + '</span> </i>'
                        }
                        else {
                            return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i>'
                        }
                      
                    }
                }, {
                    data: "ExpenditureType",

                    render: function (data, type, row, meta) {
                        if ( row.expenditureType == 0) {
                            return '<span>Credit</span>';

                        }
                        else {
                            return '<span>Debit</span>';

                        }
                      
                    }
                }, {
                    data: "Approvals",

                    render: function (data, type, row, meta) {
                        if (row.approvals == null || row.approvals == "") {

                            return '<div class="SEMapprovals"><img src="/Images_IMP/pending_02.png"  title="Pending" /></div>'
                        }
                        else if (row.approvals == "0") {
                            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/Rejects.png" title="Reject" /><i class="fa fa-eye" style="font-size:20px" title="View Comments" ></i></i></div>'
                        }
                        else {
                            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/approvals_1.png"  title="Approvals" /><i class="fa fa-eye" style="font-size:20px" title="View Comments"  ></i></i></div>'
                        }

                    }
                }
                , {

                    render: function (data, type, row, meta) {
                        //  length++;
                        if (row.approvals == "1") {
                            return ''
                        }
                        else {
                            return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                        }

                    }
                }
            ]


        });
        newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
       // table.page(tabletargetpagetblSEMsearchresults).draw('page');
       newTable.column(1).order('asc').draw();
        table.on('draw', function () {
            $('#tblSEMsearchresults').find('td:nth-child(2)').attr('title', 'Edit');
        });
        $('#tblSEMsearchresults').find('td:nth-child(2)').attr('title', 'Edit');
    }
}


//-------------------------------------------------------  Payment Mode Change In Expenditure Details
$(document).on('click', '#tblSEMsearchresults #SEMView_document', function (even) {
    even.stopImmediatePropagation();
    var fileextens = "SEMdocs/";
    fileextens = fileextens+ $(even.target).find('span').text();
    
  
    window.open('/Videos/OpenFile?filename=' + fileextens, "_blank", "width = 400, height = 400");

})




//-------------------------------------------------------  Payment Mode Change In Expenditure Details


$(document).on('change', '#InsertSEM #dropdown_PaymentMode_SEM', function (event) {

    event.stopImmediatePropagation();
    var paymentmodeval = $(this).val();
    dropdownchangeSEM(paymentmodeval)
   
})
function dropdownchangeSEM(paymentmodeval) {
    document.getElementById("loading").style.display = "block";

   // var paymentmodeval = $(this).val();
    if (paymentmodeval == "506") {

        $('#bankDetails').css('display', 'contents');
        $('#ChequeDetails').hide();
        $('#ChequeDetails').find('input').val('');
        $("#ChequeDetails").find('.field-validation-error').remove();

    } else if (paymentmodeval == "500" || paymentmodeval == "501") {
        $('#bankDetails').hide();
        $("#bankDetails").find('.field-validation-error').remove();

        $('#bankDetails').find('input').val('');
        $('#ChequeDetails').css('display', 'contents');
    }// else if (paymentmodeval == "502") {
    //    $('#bankDetails').hide();
    //    $('#ChequeDetails').hide();
    //}
    else {
        $('#bankDetails').find('input').val('');
        $('#ChequeDetails').find('input').val('');
        $('#bankDetails').hide();
        $("#ChequeDetails").find('.field-validation-error').remove();
        $("#bankDetails").find('.field-validation-error').remove();


        $('#ChequeDetails').hide();
    }
    document.getElementById("loading").style.display = "none";

}




//-------------------------------------------------------insert Expenditure Details
var formdata_SEM;
//var formData_SEM_add;
var expenditurename ;
var paymentmode_SEM;
var paymentdate_SEM;
$("#InsertSEM").submit(function (event) {  //--------------  #code_01
    debugger;
    event.preventDefault();
     expenditurename = $("#InsertSEM #dropdown_FoundSource_SEM option:selected").text();
    paymentmode_SEM = $("#InsertSEM #dropdown_PaymentMode_SEM option:selected").text();
    var inputValue = $("#InsertSEM #paymentdate_SEM").val(); // Assuming #paymentdate_SEM is the ID of your input element

    var dateParts = inputValue.split('-'); // Split the input value using hyphens
    paymentdate_SEM = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]; // Rearrange the parts to "dd-mm-yyyy" format
  //  var radiobutton = $("#radioaddexpenditure").find("#ExpenditureType :checked").val();
    var radiobutton = $("#radioaddexpenditure input[name='ExpenditureType']:checked").val();

  

   /* alert($("#InsertSEM #paymentdate_SEM").val() );*/
    // formData_SEM_add = new FormData();
    formdata_SEM = $(this).serialize();
   
    //formData_SEM_add.append('Obj', formdata_SEM);
    //var formfi = $('#DocmentName').files;
    //var formfi2 = $('#DocmentName')[0].files;
    //var formfi3 = $('#DocmentName')[0].files[0];
    //formData_SEM_add.append('DocmentName', $('#DocmentName')[0].files[0]);
    // formdata_SEM = new FormData($("#InsertSEM")[0]);

   
 
  //  formdata += "&FinancialYearId=" + $("#dropdown_FinancialYear_SEM").val();
    var formElement = document.getElementById('InsertSEM');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationmelength = validationMessages.length;

        if (validationmelength == 0) {
            ajaxaddexpenditure();
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
           


    }, 50);

    function ajaxaddexpenditure() {
       // debugger;
        var formData2 = new FormData($("#InsertSEM")[0]);
        formData2.append('ExpenditureType', radiobutton);

        //debugger;
        $.ajax({
            url: '/Videos/AddExpenditure',
            type: 'POST',
            data: formData2,
            processData: false,
            contentType: false,
            success: function (res) {
                var tableid = $('#tblSEMfees');
                var yearval = $(this).find('#dropdown_FinancialYear_SEM').val();
                gettingfees(tableid, yearval);
                if (res == "1") {

                    if ($('#InsertSEM #Save_SEM').val() == "Save") {
                        $('.alert-success p').text("Type of Expenditure Details Inserted successfully.");
                        $(".alert-success").show().delay(5000).fadeOut()
                        $('#appendprint_SEM').html("");
                        var printtblappend_SEM = "<div id='tblappendprntdiv_sem'>Recent Inserted Expenditure Details </div><table>" +
                            "<tr><th> S.NO</th><th>Type of Expenditure</th><th>Amount</th><th>PaymentMode</th><th>Payment Date</th><th>Print</th></tr>" +
                            "<tr><td>01</td><td>" + expenditurename + "</td><td>" + $("#InsertSEM #Amount_SEM").val() + "</td><td>" + paymentmode_SEM + "</td><td>" + paymentdate_SEM + "</td><td><div class='btn btn-success' id='Print_SEM'>Print</div></td></tr>";

                        $("#appendprint_SEM").append(printtblappend_SEM);

                    }
                    else {
                        $('.alert-success p').text("Type of Expenditure Details updated successfully.");
                        $(".alert-success").show().delay(5000).fadeOut()
                        $('#appendprint_SEM').html("");
                        var printtblappend_SEM = "<div id='tblappendprntdiv_sem'>Recent Inserted Expenditure Details </div><table>" +
                            "<tr><th> S.NO</th><th>Type of Expenditure</th><th>Amount</th><th>PaymentMode</th><th>Payment Date</th><th>Print</th></tr>" +
                            "<tr><td>01</td><td>" + expenditurename + "</td><td>" + $("#InsertSEM #Amount_SEM").val() + "</td><td>" + paymentmode_SEM + "</td><td>" + paymentdate_SEM + "</td><td><div class='btn btn-success' id='Print_SEM'>Print</div></td></tr>";

                        $("#appendprint_SEM").append(printtblappend_SEM);
                        try {
                            $("#InsertSEM #DocNameEdit").css('display', 'none');

                        }
                        catch {

                        }

                    }
                    $('#InsertSEM #dropdown_FoundSource_SEM').prop('selectedIndex', 0);
                    $('#InsertSEM #dropdown_PaymentMode_SEM').prop('selectedIndex', 0);
                    $('#InsertSEM #dropdown_Month_SEM').prop('selectedIndex', 0);
                    $('#InsertSEM #dropdown_Year_SEM').prop('selectedIndex', 0);
                    $('#InsertSEM #dropdown_Vendor_SEM').prop('selectedIndex', 0);


                    $('#InsertSEM').find('.col-4').find('input').val('');
                    $('#InsertSEM').find('textarea').val('');
                    $('#InsertSEM #clearform').prop('disabled', false);

                    $('#InsertSEM #clearform').css('opacity', '1');
                    $('#InsertSEM #Save_SEM').val("Save");
                }
                else {
                    $('.alert-danger p').text("Pleae Enter All Required Fields");
                    $(".alert-danger").show().delay(5000).fadeOut()
                }

            }
        })
    }

    })

//--------------------------------------------------Click On  Add New Ependiture 
$(document).on('click', '#addnewexpenditurebtn', function (event) {
    event.stopImmediatePropagation();
    var table = $('#tblSEMsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
   
    insertupdateSEM(0);

})
//------  Click On Back To Search

$(document).on('click', '#backtosearch_SEM', function (event) {
    event.stopImmediatePropagation();
  
    $('#appendsearchexpansives').css('display', 'block');
    $('#appendforinsertexpensives').html('');
    $('#appendforinsertexpensives').css('display', 'none');
    searchTransactions();
   

})
//-------------------------------------   Click For Update in the list(table)
$(document).on('click', '#tblSEMsearchresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();

    var parent= $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#tblSEMsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    insertupdateSEM(GovFundId);
})

function insertupdateSEM(GovFundId) {

    document.getElementById("loading").style.display = "block";

    $('#appendforinsertexpensives').html('');

    $('#appendsearchexpansives').css('display', 'none');
    $('#appendforinsertexpensives').css('display', 'block');
    //$.ajax({
    //    url: '/Videos/AddExpenditure?GovFundId=' + GovFundId,
    //    type: 'GET',
    //    success: function (response) {
    //        $('#appendforinsertexpensives').html(response);
    //        document.getElementById("loading").style.display = "none";

    //    }
    //})
    var data = {
        GovFundId: GovFundId,
        partial:0
    };


    CommonAjaxFunction('GET', '/Videos/AddExpenditure', data, function (response) {
        $('#appendforinsertexpensives').html(response);
           document.getElementById("loading").style.display = "none";
    }, function (status, error) {
      
    }, false);





}
//--------------------------  Clear The Form   
$(document).on('click', '#InsertSEM #clearform', function (event) {
   
  
    event.stopImmediatePropagation();
    $('#InsertSEM #dropdown_FoundSource_SEM').prop('selectedIndex', 0);
    $('#InsertSEM #dropdown_PaymentMode_SEM').prop('selectedIndex', 0);


    $('#InsertSEM').find('.col-4').find('input').val('');
    $('#InsertSEM').find('textarea').val('');
})

//-------------------------------------------delete Expenditure    

$(document).on('click', '#tblSEMsearchresults .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var table = $('#tblSEMsearchresults').DataTable();

    tabletargetpagetblSEMsearchresults = table.page.info().page;
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();

    Swal.fire({
        title: "Are you sure you want to delete this Expenditure?",
        text: "  ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        // If user confirms deletion
        if (result.isConfirmed) {
            $.ajax({
                url: '/Videos/DeleteExpenditure?GovFundId=' + GovFundId,
                type: "GET",
                success: function () {

                    Swal.fire("Success", "Record Deleted Successfully", "success");
                    searchTransactions();
                   // searchvideosuploading(videosClassificationIds, videosInstanceSubClassificationId, videosInstanceSubjectsId, videosInstanceSubjectsToolIds);

                }
            })
        }
    });

})
//-----------------------------------------------------------   Print The Expenditures 






//$("#appendprint_SEM #Print_SEM").click(function (event) {
    $(document).on('click', '#appendprint_SEM #Print_SEM', function (event) {
        event.stopImmediatePropagation();
    event.preventDefault();
    var data = formdata_SEM.split('&').reduce(function (acc, curr) {
        var pair = curr.split('=');
        acc[pair[0]] = decodeURIComponent(pair[1]);
        return acc;
    }, {});

    var printContent =
            "<table id='Print_SEM_table' style='position:absolute;left:30%;font:14px aria;'>" +
            "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Type of Expenditure:</td><td style='padding:5px;font-weight:500;'>" + expenditurename + "</td></tr>" +
        "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Recipient:</td><td style='padding:5px;font-weight:500;'>" + data.VendorName + "</td></tr>" +
        "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Amount:</td><td style='padding:5px;font-weight:500;'>" + data.Amount + "</td></tr>" +
        "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Payment Mode:</td><td style='padding:5px;font-weight:500;'>" + paymentmode_SEM + "</td></tr>";

    if (data.PaymentMode === "506") {
        printContent +=
            "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Cheque/DD Bank Name:</td><td style='padding:5px;font-weight:500;'>" + data.BankName + "</td></tr>" +
            "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Address of the Bank:</td><td style='padding:5px;font-weight:500;'>" + data.BankAddress + "</td></tr>";
    } else if (data.PaymentMode === "500" || data.PaymentMode === "501") {
        printContent +=
            "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Cheque/DD Number:</td><td style='padding:5px;font-weight:500;'>" + data.ChequeDDNo + "</td></tr>" +
            "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Cheque/DD Date:</td><td style='padding:5px;font-weight:500;'>" + data.ChequeDDDate + "</td></tr>" +
            "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Cheque/DD Bank Name:</td><td style='padding:5px;font-weight:500;'>" + data.ChequeDDBank + "</td></tr>" +
            "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Cheque/DD Bank Branch:</td><td style='padding:5px;font-weight:500;'>" + data.ChequeDDBranch + "</td></tr>" +
            "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Routing/Branch Number:</td><td style='padding:5px;font-weight:500;'>" + data.RoutingNumber + "</td></tr>";
    }

    printContent +=
        "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Payment Date:</td><td style='padding:5px;font-weight:500;'>" + paymentdate_SEM + "</td></tr>" +
        "<tr><td style='text-align:end;padding:5px;font-weight:900;'>Description:</td><td style='padding:5px;font-weight:500;'>" + data.Description + "</td></tr>" +
        "</table>";

// Rest of your print content rendering code

    var printWindow = window.open("", "_blank");
    printWindow.document.open();
        printWindow.document.write("<html><head><title>Simple Expense  </title></head><body><h3 style='margin-left:28%;padding: 4px;text-decoration: underline;'>Simple Expense Management Voucher</h3>");
   
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
})










//-------------------------------------------                 View Expenditure Detaills

$(document).on('click', '#tblSEMsearchresults #SEM_Expendituredetails', function (event) {
    event.stopImmediatePropagation();
    var parent = $(event.target).closest('tr');

    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    window.open('/Videos/AddExpenditure?GovFundId=' + GovFundId+ '&partial=313', "_blank", "width = 400, height = 400");

    event.stopImmediatePropagation();
    //$.ajax({
    //    url: '/Videos/AddExpenditure?GovFundId=' + $(this).find('input[type="text"]').val() +'&partial=313',
    //    type: "GET",
    //    success: function (result) {

    //    }
    //})
})
//-------------------------- Radio Button Change

//$(document).on('click', '#radioaddexpenditure input[name=ExpenditureType]:checked', function (event) {
//    event.stopImmediatePropagation;
//    $('#InsertSEM #clearform').prop('disabled', false);

//    $('#InsertSEM #clearform').css('opacity', '1');
//    $('#InsertSEM #Save_SEM').val("Save");
//    $("form")[0].reset();
//    $('#InsertSEM #dropdown_FoundSource_SEM').prop('selectedIndex', 0);
//    $('#InsertSEM #dropdown_PaymentMode_SEM').prop('selectedIndex', 0);
//    $('#InsertSEM #dropdown_Year_SEM').prop('selectedIndex', 0);
//    $('#InsertSEM #dropdown_Month_SEM').prop('selectedIndex', 0);
//    $('#InsertSEM #dropdown_Vendor_SEM').prop('selectedIndex', 0);
//    $('#InsertSEM').find('.col-4').find('input').val('');
//    $('#InsertSEM').find('#GovFundId_Sem').val('');
//    $('#InsertSEM').find('textarea').val('');

//})

//-----------------------------View Comments

$(document).on('click', '#tblSEMsearchresults td:nth-child(9) .SEMapprovalsafter .fa-eye', function (event) {

    event.stopImmediatePropagation();
   // debugger;
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    loaddingimg.css('display', 'block');
    var data2 = {
        GovFundId: GovFundId
    }
    CommonAjaxFunction('GET', '/Videos/GetApprovalComments', data2, function (response2) {
     //   debugger;
        if (response2.length != 0) {
            $('#popupContainerapprovals').css('display', 'block');
            if (response2[0].text == "") { 
                $('#popupContainerapprovals #approvalsdiscrption23').text("NO COMMENTS");
                $('#popupContainerapprovals #approvalsdiscrption23').css("color",'red');
            } else {
                $('#popupContainerapprovals #approvalsdiscrption23').text(response2[0].text);
                $('#popupContainerapprovals #approvalsdiscrption23').css("color", 'black');

            }
        }

        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
})

$(document).on('click', '#close-popup', function (event) {
    event.stopImmediatePropagation();
    $('#popupContainerapprovals').css('display', 'none');
});