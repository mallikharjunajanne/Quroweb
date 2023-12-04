
//------------------------------------------------------------------------  Date Compare

$(".form-group #StartDate").on("change", function () { datescompare(event, "From Date", "To Date") });
$(".form-group #EndDate").on("change", function () { datescompare(event, "From Date", "To Date") });

$("#Serach_ER").submit(function (event) {
    event.preventDefault();
    loaddingimg.css('display', 'block');

    // event.stopImmediatePropagation();
    var formdata_CSA = $(this).serialize();

    var formElement = document.getElementById('Serach_ER');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationMessages2 = formElement.getElementsByClassName('error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            CommonAjaxFunction('POST', '/Videos/ExpensiveReportList', formdata_CSA, function (response) {
                bindDatatableER(response);
                   // $(".alert-success").show().delay(5000).fadeOut()
                
            }, function (status, error) {
                loaddingimg.css('display', 'none');

            }, false);
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
            loaddingimg.css('display', 'none');

        }
    }, 50);

})






function bindDatatableER(response) {
   // debugger;
    if (response.obj!=null && response.obj.length != 0) {
        $('#dataforexpensivereport').css('display', 'block');
        $("#TotalSearchedAmount").text(response.amount +"/-");
        // var formattedDate = GetDateFormat();
        //   var num = 0;
        var table = $('#tblSEMsearchresultsER').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_SEMER").text(response.obj.length);
        //  alert("hi1");

        var newTable = $("#tblSEMsearchresultsER").DataTable({
            dom: 'Bfrtip',

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
            buttons: [],
            data: response.obj,
            columns: [

                //{
                //    data: "GovFundId",
                //    visible: false,

                //    render: function (data, type, row, meta) {
                //        //  length++;
                //        return row.govFundId
                //    }
                //},
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
                        if (row.expenditureType == 0) {
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

            ]


        });
        newTable.column(0).order('asc').draw();
        // newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
        // table.page(tabletargetpagetblSEMsearchresults).draw('page');
        // newTable.column(1).order('asc').draw();
    }
    else {
        $('#dataforexpensivereport').css('display', 'none');
        $('.alert-danger p').text("No Records Found...!");
        $(".alert-danger").show().delay(6000).fadeOut()
    }
    loaddingimg.css('display', 'none');

   
}


//-------------------------------------------                 View Expenditure Detaills

$(document).on('click', '#tblSEMsearchresultsER #SEM_Expendituredetails', function (event) {
    event.stopImmediatePropagation();
   // loaddingimg.css('display', 'block');

    var parent = $(event.target).closest('tr');

    var GovFundId = $(parent).find('td').find('input[type="text"]').val();

    window.open('/Videos/AddExpenditure?GovFundId=' + GovFundId + '&partial=313', "_blank", "width = 400, height = 400");

    event.stopImmediatePropagation();
    //$.ajax({
    //    url: '/Videos/AddExpenditure?GovFundId=' + $(this).find('input[type="text"]').val() +'&partial=313',
    //    type: "GET",
    //    success: function (result) {

    //    }
    //})
})

//-------------------------------------------------------  Payment Mode Change In Expenditure Details
$(document).on('click', '#tblSEMsearchresultsER #SEMView_document', function (even) {
    even.stopImmediatePropagation();
    var fileextens = "SEMdocs/";
    fileextens = fileextens + $(even.target).find('span').text();


    window.open('/Videos/OpenFile?filename=' + fileextens, "_blank", "width = 400, height = 400");

})

//-----------------------------View Comments

$(document).on('click', '#tblSEMsearchresultsER  .SEMapprovalsafter .fa-eye', function (event) {

    event.stopImmediatePropagation();
   // debugger;
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    loaddingimg.css('display', 'block');
    var data2 = {
        GovFundId: GovFundId
    }
    CommonAjaxFunction('GET', '/Videos/GetApprovalComments', data2, function (response2) {
    //    debugger;
        if (response2.length != 0) {
            $('#popupContainerapprovals').css('display', 'block');
            if (response2[0].text == "") {
                $('#popupContainerapprovals #approvalsdiscrption23').text("NO COMMENTS");
                $('#popupContainerapprovals #approvalsdiscrption23').css("color", 'red');
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