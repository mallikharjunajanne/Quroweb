function handleAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {

    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        contentType: false,
        processData: false,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };

    if (hasFileUpload) {
        ajaxOptions.processData = false;
        ajaxOptions.contentType = false;
    }

    $.ajax(ajaxOptions);
}
function CallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        success: bindDatatable,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };
    if (hasFileUpload) {

        ajaxOptions.processData = false;
        ajaxOptions.contentType = false;
    }

    $.ajax(ajaxOptions);
}


function Mainfunction() {
    CallToAjax('GET', '/FeeSection/M_N_A_Tbl', null,

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );
}


$(document).ready(function () {
  
    $('#Managebankaccounttablediv1').show();   //M_Bank_Ac_Tbl_Divid
    $('#CreateBankAccount_Divid').hide();      //CreateBankAccount_Divid
    $('#UpdateBank_Account_Divid').hide();     //UpdateBank_Account_Divid

    Mainfunction();
   



    //fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
    //    '/Attendance/Attendancepostingdepartment',          // URL for data fetching
    //    '#Ddldepartment',                                   // Dropdown selector
    //    'value',                                            // Field name for option text
    //    'text',                                             // Field name for option values
    //    'manageClassification'                              // Response value return class name
    //);
    //fetchDataAndPopulateDropdown(                           //==== << ** Faculty Dropdown ** >>
    //    '/Attendance/Facultynamesdd',                        // URL for data fetching
    //    '#Ddfaculty',                                        // Dropdown selector
    //    'mentorUserid',                                      // Field name for option text
    //    'mentorName',                                        // Field name for option values
    //    'manageClassification'                               // Response value return class name
    //);
});

function Create_NewFeeBankAccount(event) {
    event.preventDefault();
    $("#Errormessage").text('');
    $('#Managebankaccounttablediv1').hide();
    $('#CreateBankAccount_Divid').show();
    $('#UpdateBank_Account_Divid').hide();
}



$('#Searchbanksdata').click(function () {
    debugger;
    var formData = $('#Searchbankaccountsform').serialize();

    CallToAjax('GET', '/FeeSection/M_N_A_Tbl', formData,

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );
});
function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}
function bindDatatable(response) {

    var formattedDate = GetDateFormat();
    debugger;
    var table = $('#BankAccounts_Table').DataTable();
    table.destroy();
    $("#TableCount").text(response.length);

    var newTable = $("#BankAccounts_Table").DataTable({
        dom: 'Bfrtip',
        buttons: [
            //{
            //    extend: 'pdfHtml5',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,
            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },

            //}
            //,
            //{
            //    extend: 'excel',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,

            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },
            //},


            //{
            //    extend: 'print',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,
            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },
            //}


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

            //{
            //    data: "SNO",
            //    //visible: false,

            //    render: function (data, type, row, meta) {
            //        //  length++;
            //        return row.holidayId
            //    }
            //},
            //{
            //    targets: 0, // Assuming this is the column index where you want to display numbering
            //    render: function (data, type, row, meta) {
            //        var currentPage = table.page.info().page;
            //        var rowsPerPage = table.page.info().length;
            //        return (0 * rowsPerPage) + meta.row + 1;
            //    }
            //},

            {
                data: "BankName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.bankName

                }
            },
            {
                data: "AccountNumber",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.accountNumber

                }
            },
            {
                data: "Description",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.description + '<input type="text" value=' + row.bankAccountId + ' hidden/>'

                }
            },          
            {
                data: "BankAccountId",

                render: function (data, type, row, meta) {
                    // return row.holidayId
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                    // return row.holidayId + '<input type="text" value=' + row.holidayId + ' hidden/>'  
                }
            }            
        ]

    });

    table.on('draw', function () {
        $('#BankAccounts_Table').find('td:nth-child(1)').attr('title', 'Edit').css({
            'text-decoration': 'underline',
            'font-weight': 'bold'
        });;
    });
    $('#BankAccounts_Table').find('td:nth-child(1)').attr('title', 'Edit').css({
        'text-decoration': 'underline',
        'font-weight': 'bold'
    });;
}



//-------------------------------------   Click For Update in the list(table)
$(document).on('click', '#BankAccounts_Table td:nth-child(1)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    loaddingimg.css('display', 'block');
    var parent = $(event.target).closest('tr');
    var bankAccountId = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#ManageHolidaystbl').DataTable();
    //tabletargetpagetblSEMsearchresults = table.page.info().page;
    Editbankaccountfunction(bankAccountId);
})
function Editbankaccountfunction(bankAccountId) {
    $.ajax({
        url: '/FeeSection/Bank_Account_EditGet?BankAccountId=' + bankAccountId,
        type: 'GET',
        //data: data,
        success: function (response) {          
            $('#Editbankaccounttxtid').val(response.bankAccountId);
            $('#Edittxtbanknameid').val(response.bankName);
            $('#Edittxtaccountnumberid').val(response.accountNumber);
            $('#Edittxtbranchcodeid').val(response.branchCode);
            $('#Edittxtifsccodeid').val(response.ifCcode);
            $('#Edittxtaddressid').val(response.address);
            $('#Edittxtdescriptionid').val(response.description);
            $('#Managebankaccounttablediv1').hide();
            $('#CreateBankAccount_Divid').hide();
            $('#UpdateBank_Account_Divid').show();
            loaddingimg.css('display', 'none');
        },
        error: function (xhr, status, error) {
            $("#Errormessage").text("Something went wrong please try again.");
            loaddingimg.css('display', 'none');
        }
    });
}







//=== ***<< NEW BANK ACCOUNT INSERTING CODE START >>*** ====
//$('#Newbankaccountform').on('submit', function () {
$('#Newbankaccountform').submit(function () {

    event.preventDefault();
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            var Bankname = $('#txtbanknameid').val();
            var Accountnumber = $('#txtaccountnumberid').val();
            var Branchcode = $('#txtbranchcodeid').val();
            var Ifsccode = $('#txtifsccodeid').val();
            var BankAddress = $('#txtaddressid').val();
            var description = $('#txtdescriptionid').val();


            var bankAccountData = {
                BankName: Bankname,
                AccountNumber: Accountnumber,
                BranchCode: Branchcode,
                IFSCCode: Ifsccode,
                Address: BankAddress,
                Description: description,
            };
            //var Bankname = $('#txtbanknameid').val();
            //var Accountnumber = $('#txtaccountnumberid').val();
            //var Branchcode = $('#txtbranchcodeid').val();
            //var Ifsccode= $('#txtifsccodeid').val();  
            //var BankAddress = $('#txtaddressid').val();
            //var formData = $(this).serialize();
            var url = "/FeeSection/ManageBankAccounts?BankName=" + Bankname + "&AccountNumber=" + Accountnumber + "&Branchcode=" + Branchcode + "&IFSCCode=" + Ifsccode + "&Address=" + BankAddress + "&Description=" + description;
            $.ajax({
                url: url,
                method: 'POST',
                //data: JSON.stringify(bankAccountData),
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    debugger;
                    if (response == "0") {
                        $("#Errormessage").text("Account Number with Name " + '"' + Accountnumber + '"' + " already exists in " + '"' + Bankname + '"' + " Bank");
                    } else {
                        $("#Errormessage").text("Record inserted successfully.");
                    }

                    loaddingimg.css('display', 'none');
                },
                error: function (status, error) {
                    debugger;
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                }
            });
            //handleAjax('POST', url, formData,
            //    function (response) {
            //        debugger;
            //        if (response == "0") {
            //            $("#Errormessage").text("Account Number with Name " + '"' + Accountnumber + '"' + " already exists in " + '"' + Bankname + '"' + " Bank");
            //        } else {
            //            $("#Errormessage").text("Record inserted successfully.");
            //        }                   

            //        loaddingimg.css('display', 'none');
            //    },
            //    function (status, error) {
            //        debugger;
            //        console.error("Error fetching data:", error);
            //        loaddingimg.css('display', 'none');
            //    },
            //    true
            //);
        }
    }, 50);
});
//=== ***<< NEW BANK ACCOUNT INSERTING CODE END >>*** ====





//==== ***<<< NEXT PAGE  &&&  PREVIOUS PAGE FUCNTION >>>***====
function nextpages(url, data) {
    return new Promise((resolve, reject) => {
        debugger;      

        loaddingimg.css('display', 'block');
        handleAjax('GET', `/FeeSection/${url}`, data, (response) => {
            window.location.href = `/FeeSection/${url}`;            
            loaddingimg.css('display', 'none');
            resolve();
        }, (status, error) => {
            loaddingimg.css('display', 'none');
            reject();
        }, false);
    });
}

function previouspages(url, data) {
    return new Promise((resolve, reject) => {
        debugger;

        loaddingimg.css('display', 'block');
        handleAjax('GET', `/FeeSection/${url}`, data, (response) => {
            window.location.href = `/FeeSection/${url}`;
            loaddingimg.css('display', 'none');
            resolve();
        }, (status, error) => {
            loaddingimg.css('display', 'none');
            reject();
        }, false);
    });
}
//==== ***<<< NEXT PAGE  &&&  PREVIOUS PAGE FUCNTION >>>***====


//==== ***<<< BACK TO SEARCH FUCNTION >>>***====
function backtosearch(event) {
    event.preventDefault();
    debugger;
    $('#Newbankaccountform')[0].reset();
    $("#Errormessage").text('');
    CallToAjax('GET', '/FeeSection/M_N_A_Tbl', null,

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );
    $('#Managebankaccounttablediv1').show();
    $('#CreateBankAccount_Divid').hide();
    $('#UpdateBank_Account_Divid').hide();

}



//=====>>>>  *** <<<UPDATE BANK ACCOUNTS >>> *** <<<========

$('#updatebankaccountform').submit(function () {

    event.preventDefault();
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            var BankAccountId = $('#Editbankaccounttxtid').val();
            var Bankname = $('#Edittxtbanknameid').val();
            var Accountnumber = $('#Edittxtaccountnumberid').val();
            var Branchcode = $('#Edittxtbranchcodeid').val();
            var Ifsccode = $('#Edittxtifsccodeid').val();
            var BankAddress = $('#Edittxtaddressid').val();
            var description = $('#Edittxtdescriptionid').val();


            //var UpdateBA_Data = {
            //    BankAccountId: BankAccountId,               
            //    AccountNumber: Accountnumber,
            //    BankName: Bankname,
            //    Address: BankAddress,
            //    BranchCode: Branchcode,
            //    IFCcode: Ifsccode,
            //    Description: description
            //};

           
            //var url = "/FeeSection/ManageBankAccount_EditUpdate";
            var url = "/FeeSection/ManageBankAccount_EditUpdate?BankAccountId=" + BankAccountId + "&BankName=" + Bankname + "&AccountNumber=" + Accountnumber + "&Branchcode=" + Branchcode + "&IFSCCode=" + Ifsccode + "&Address=" + BankAddress + "&Description=" + description;
            $.ajax({
                url: url,
                method: 'POST',
                //data: JSON.stringify(UpdateBA_Data),
                contentType: "application/json",
                dataType: "json",
                success: function (response) {
                    debugger;
                    if (response == "0") {
                        $("#Errormessage").text("Account Number with Name " + '"' + Accountnumber + '"' + " already exists in " + '"' + Bankname + '"' + " Bank");
                    } else {
                        $("#Errormessage").text("Record updated successfully.");
                        $('#Btnupdate').prop('disabled', true);
                        $('#Btndelete').prop('disabled', true);
                    }
                    loaddingimg.css('display', 'none');
                },
                error: function (status, error) {
                    debugger;
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                }
            });
            //handleAjax('POST', url, formData,
            //    function (response) {
            //        debugger;
            //        if (response == "0") {
            //            $("#Errormessage").text("Account Number with Name " + '"' + Accountnumber + '"' + " already exists in " + '"' + Bankname + '"' + " Bank");
            //        } else {
            //            $("#Errormessage").text("Record inserted successfully.");
            //        }                   

            //        loaddingimg.css('display', 'none');
            //    },
            //    function (status, error) {
            //        debugger;
            //        console.error("Error fetching data:", error);
            //        loaddingimg.css('display', 'none');
            //    },
            //    true
            //);
        }
    }, 50);
});

//=== ***<< UPDATE BANK ACCOUNT INSERTING CODE END >>*** ====


function deleteaccount() {
    var BankAccountId = $("#Editbankaccounttxtid").val();
    if (confirm('Are you sure you want to delete this Fee Term?\nClick ' + 'OK' + ' to delete or ' + 'Cancel' + ' to stop deleting.')) {
        accountdeleting(BankAccountId);
    }
}
$(document).on('click', '#BankAccounts_Table .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    //var data = {
    //    InstanceSalaryAttributeId: $(this).find('input[type="text"]').val()
    //};
    debugger;
    var parent = $(event.target).closest('tr');
    var BankAccountId = $(parent).find('td').find('input[type="text"]').val();
  
    //var BankAccountId = $(this).find('input[type="text"]').val();
    if (confirm('Are you sure you want to delete this Fee Term?\nClick ' + 'OK' + ' to delete or ' + 'Cancel' + ' to stop deleting.')) {
        accountdeleting(BankAccountId);
    }
   // var table = $('#tblCSAsearchresults').DataTable();
    //tabletargetpagetblSEMsearchresults = table.page.info().page;
    //CommonDeleteFunction('Salary Attribute', 'GET', '/PayRoll/DeleteSAlaryAttribute', data, function (response) {
    //    $('.alert-success p').text("Record Deleted Successfully.");
    //    $(".alert-success").show().delay(5000).fadeOut()
    //    searchSalaryAttributes();
    //});
})


function accountdeleting(BankAccountId) {
    $.ajax({
        url: '/FeeSection/Bank_account_Delete',
        method: 'POST',
        data: {
            BankAccountId: BankAccountId
        },
        success: function (response) {
            debugger;

            if (response == '0') {
                debugger;
                $('#Errormessage').text('Record deleted successfully.');
                $('#Managebankaccounttablediv1').show();
                $('#CreateBankAccount_Divid').hide();
                $('#UpdateBank_Account_Divid').hide();

                ///====>>> MAIN FUNCTION
                Mainfunction();


            } else if (response == '001324') {
                $('#Errormessage').text('Some fee installments are already associated with this Bank Account. So you cannot delete this account.');

            } else {
                $('#Errormessage').text('Record not deleted.');
            }
        }
    });
}

