//const { table } = require("node:console");

//const { debug } = require("node:util");

//const { debug } = require("node:util");

//----------  Change The Academic Year To get Fees 
$(document).ready(function () {
   
        searchTransactions_Admin();
    
})

//-----------------------------  Search Gov Found Transactions
$(document).on('click', '#SerachSEM #sub_tblSEM', function (event) {
    event.stopImmediatePropagation();
    searchTransactions_Admin();

});
function searchTransactions_Admin() {

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
    var approvals = $(formid).find("input[name=Approvals]:checked").val();

    $.ajax({
        url: "/Videos/SearchtblGovFundRecieved?FundRecievedFromId=" + TypeofExpenditure + "&Amount=" + Amount + '&PaymentModeId=' + PaymentMode + '&YearId=' + YearId + '&MonthId=' + MonthId + '&VendorName=' + Recipient + '&VendorCategory=' + VendorCategory + '&Paymentdate=' + Paymentdate_sem +'&Approvals='+approvals,
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
                        columns: [1, 2, 3, 4, 5, 6, 7, 8]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'Simple Expense Management Report',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8]
                    },



                },


                {
                    extend: 'print',
                    title: 'Simple Expense Management Report',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6,7,8]
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

                        return row.amount + '<input type="text" value=' + row.govFundId + ' hidden/>'

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

                        return row.description

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
                    data: "Approvals",

                    render: function (data, type, row, meta) {
                        if (row.approvals == null || row.approvals == "") {

                            return '<div class="SEMapprovals"><img src="/Images_IMP/approvals_1.png" id="Approvals" title="Approvals" /><img src="/Images_IMP/Rejects.png" id="Rejects" title="Reject" /><img src="/Images_IMP/comments_01.png" id="Comments" title="Write Comments" /></div>'
                        }
                        else if (row.approvals == "0") {
                            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/Rejects.png" id="Rejects"  title="Reject" /><i class="fa fa-edit" title="Edit" ></i></div>'
                        }
                        else {
                            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/approvals_1.png" id="Approvals" title="Approvals" /><i class="fa fa-edit" title="Edit" ></i></div>'
                        }

                    }
                }, {
                    data: "ExpenditureType",

                    render: function (data, type, row, meta) {
                        if (row.expenditureType == 0) {
                            return '<span>Credit</span>';

                        }
                        else {
                            return '<span>Debit</span>';

                        }

                    }
                }
            ]


        });
        newTable.column(1).order('asc').draw();
    
        
    }
}


//------------------------------------------------     Click Approvals 


$(document).on('click', '#tblSEMsearchresults td:nth-child(7) .SEMapprovals #Approvals', function (event) {event.stopImmediatePropagation();var parent = $(event.target).closest('tr'); var GovFundId = $(parent).find('td').find('input[type="text"]').val();SemAdminApprovals(GovFundId, "1", null, parent);});
//------------------------------------------------     Click Rejects
$(document).on('click', '#tblSEMsearchresults td:nth-child(7) .SEMapprovals #Rejects', function (event) {
    event.stopImmediatePropagation();
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    SemAdminApprovals(GovFundId, "0", null, parent);
});
//------------------------------------------------      give Comments
var GovFundIdforSEM = 0;
var ParentforSEM = 0;
$(document).on('click', '#tblSEMsearchresults td:nth-child(7) .SEMapprovals #Comments', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    $("#popupContainerapprovals").css('display', 'block');
    GovFundIdforSEM = GovFundId;
    ParentforSEM = parent;
    var data = {
        GovFundId: GovFundId,
        partial: "313"
    };
    CommonAjaxFunction('GET', '/Videos/AddExpenditure', data, function (response) {
        $("#popupContainerapprovals #approvalsdiscrption").html(response);
        var paymentmodeval = $('#approvalsdiscrption #dropdown_PaymentMode_SEM_view').val();
        dropdownchangeSEM(paymentmodeval);
        $("#approvalsdiscrption #footer").css('display', 'none');
        $("#newtextares").find('textarea').val(" ");
        $("#newtextares").find("#submitapprovals").val("Submit");
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

});
//---------------------------------------         Clickon comments Submuit
$(document).on('click', '#popupinnerapprovals #submitapprovals', function () {
   // debugger;
 var radiobtn=   $("#popupinnerapprovals").find('input[name=Approvalsradio]:checked').val();
    var discrption = $("#newtextares").find('textarea').val();
    SemAdminApprovals(GovFundIdforSEM, radiobtn, discrption, ParentforSEM);
    $('#popupContainerapprovals').css('display', 'none');

})
//-----------------------------------------------------  Click On Edit
$(document).on('click', '#tblSEMsearchresults td:nth-child(7) .SEMapprovalsafter .fa-edit', function (event) {
    event.stopImmediatePropagation();
   
    loaddingimg.css('display', 'block');
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    $("#popupContainerapprovals").css('display', 'block');
    GovFundIdforSEM = GovFundId;
    ParentforSEM = parent;
    var data = {
        GovFundId: GovFundId,
        partial: "313"
    };
    CommonAjaxFunction('GET', '/Videos/AddExpenditure', data, function (response) {
        
        $("#popupContainerapprovals #approvalsdiscrption").html(response);
        var paymentmodeval = $('#approvalsdiscrption #dropdown_PaymentMode_SEM_view').val();
        dropdownchangeSEM(paymentmodeval);
        $("#approvalsdiscrption #footer").css('display', 'none');
        $("#newtextares").find('textarea').val(" ");
        var data2 = {
            GovFundId: GovFundId
        }
        CommonAjaxFunction('GET', '/Videos/GetApprovalComments', data2, function (response2) {
         //   debugger;
            if (response2.length != 0) {
                $("#newtextares").find('textarea').val(response2[0].text);
                if (response2[0].value == "0") {
                    $('#newtextares').find('.form-group #reject').prop('checked', true);
                } else {
                    $('#newtextares').find('.form-group #approva').prop('checked', true);
                }
                $("#newtextares").find("#submitapprovals").val("Update");
            }
            loaddingimg.css('display', 'none');
        }, function (status, error) {
            loaddingimg.css('display', 'none');
        }, false);

        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

});


$(document).on('click', '#close-popup', function (event) {
    event.stopImmediatePropagation();
    $('#popupContainerapprovals').css('display', 'none');
});


function SemAdminApprovals(GovFundId, isapproval, Discrption, change) {
   // debugger;
    document.getElementById("loading").style.display = "block";
    var data = {
        GovFundId: GovFundId,
        Approvals: isapproval,
        AprovalDescription:Discrption
    };
    CommonAjaxFunction('GET', '/Videos/SEMAdminApprovals', data, function (response) {
       
        document.getElementById("loading").style.display = "none";
        if (isapproval == 0) {
            $(change).find('td:nth-child(7)').html('<div class="SEMapprovalsafter"><img src="/Images_IMP/Rejects.png" id="Rejects"  title="Reject" /><i class="fa fa-edit" title="Edit" ></i></div>');
            $('.alert-danger p').html("<span>Rejected successfully</span> <img src='/Images_IMP/Rejects.png' style='height: 20px; width: 20px;' />");
            $(".alert-danger").show().delay(4000).fadeOut();

        }
        else {
            $(change).find('td:nth-child(7)').html('<div class="SEMapprovalsafter"><img src="/Images_IMP/approvals_1.png" id="Approvals" title="Approvals" /><i class="fa fa-edit" title="Edit" ></i></div>');
            $('.alert-success p').html("approved successfully <img src='/Images_IMP/approvals_1.png'  style=' height:20px;width:20px;' />");
            $(".alert-success").show().delay(4000).fadeOut()
        }
    }, function (status, error) {
        document.getElementById("loading").style.display = "none";
    }, false);
}


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



