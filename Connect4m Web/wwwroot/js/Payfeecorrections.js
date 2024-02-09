function CallToAjax(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}
function handleAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {

    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
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

var Studentspanuserid = $('#Studentuseridspid').val();


$(document).ready(function () {

    $('#Searchuserfields_tabledatadiv1').show();
    $('#Userfeedetailsdiv2').hide();
    $('#Feechallandiv').hide();
    $('#Feedetailsupdateandedit_tablediv').hide();

    fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
        '/FeeSection/Pfudepartmentdd',                      // URL for data fetching
        '#Ddldepartment',                                   // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        'manageClassification'                              // Response value return class name
    );
    fetchDataAndPopulateDropdown(                           //==== << ** Studentquota Dropdown ** >>
        '/FeeSection/PfuStudentquota',                      // URL for data fetching
        '#ddlstudentquota',                                 // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        null                                                // Response value return class name
    );
    fetchDataAndPopulateDropdown(                           //==== << ** Studentquota Dropdown ** >>
        '/FeeSection/PfuPaymentdd',                      // URL for data fetching
        '#paymentmodeddl',                                 // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        null                                                // Response value return class name
    );

    fetchDataAndPopulateDropdown(                           //==== << ** Studentquota Dropdown ** >>
        '/FeeSection/Pfubankaccountsdd',                      // URL for data fetching
        '#bankaccountsddl',                                 // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        null                                                // Response value return class name
    );


    //fetchDataAndPopulateDropdown(                           //==== << ** Studentquota Dropdown ** >>
    //    '/FeeSection/PFC_challanaddl',                      // URL for data fetching
    //    '#Challan_DDId',                                 // Dropdown selector
    //    'value',                                            // Field name for option text
    //    'text',                                             // Field name for option values
    //    null                                                // Response value return class name
    //);

    $('.hideable').hide();

    //// Add event listener to the dropdown to handle show/hide
    $('#paymentmodeddl').on('change', function () {
        const selectedValue = $(this).val();

        if (selectedValue === "500" || selectedValue === "501") {
            // Hide the divs if 500 or 501 is selected
            $('.hideable').show();
        } else {
            // Show the divs for any other selection
            $('.hideable').hide();
            $('#Chequetxtid').text('');
            $('#Chequedatedttxtid').text('');
            $('#Chequebanknametxtid').text('');
            $('#Payble_TxtId').text('');

            $('#bankaccountsddl').prop('selectedIndex', 0);
        }
    });

});

function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    /*debugger;*/
    CallToAjax('GET', url,
        function (response) {

            /*debugger;*/
            var dataToPopulate = Array.isArray(response) ? response : response[Responsevalues] || [];
            populateDropdown(dataToPopulate, dropdownSelector, valueField, textField);
        },
        function (status, error) {
            // Handle errors here
            console.error("Error fetching data:", error);
        }
    );
}

function populateDropdown(data, dropdownSelector, valueField, textField) {
    var dropdown = $(dropdownSelector);
    /* debugger;*/
    dropdown.empty(); // Clear existing options
    dropdown.append($('<option>', {
        value: '',
        text: '---Select---'
    }));
    $.each(data, function (index, item) {
        dropdown.append($('<option>', {
            value: item[valueField],
            text: item[textField]
        }));
    });
}


$('#Ddldepartment').change(function () {
    var ClassificationId = $('#Ddldepartment').val();
    Departmentbysubclassdd(ClassificationId);
});

function Departmentbysubclassdd(Departmentvalue) {
    fetchDataAndPopulateDropdown(                                                                //==== << ** Subclassification Dropdown ** >>
        '/FeeSection/PfuSubClass?InstanceClassificationId=' + Departmentvalue,                      // URL for data fetching
        '#DdlClass',                                                                             // Dropdown selector
        'value',                                                                                    // Field name for option text
        'text',                                                                                     // Field name for option values
        null                                                                                        // Response value return class name
    );
}

function nextpages(url, data) {
    return new Promise((resolve, reject) => {
        /*debugger;*/

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
        /* debugger;*/

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


$('button[type=submit]').click(function () {
    $('#clickedButton').val($(this).val());
});
/*----*/
$('#Payfeebyuserssearchform').submit(function () {
    event.preventDefault();
    event.stopImmediatePropagation();

    setTimeout(function () {

        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            /* debugger;*/
            $('#Studentdetailsid').text('');
            $('#Studentfeedetailsscheduledornotspanid').text('');




            var otherFormData = $('#Payfeebyuserssearchform').serialize();
            var submitButtonValue = $(document.activeElement).val();
            var formData = otherFormData + "&Actionbuttonname=" + submitButtonValue;
            //CommonAjaxFunction('POST', '/FeeSection/Payfeeforuserssearchtbl', formData, function (response) {

            handleAjax('POST', '/FeeSection/Payfeeforuserssearchtbl', formData,
                function (response) {
                    /*debugger;*/

                    bindDatatable(response, submitButtonValue);
                    //bindDatatables(response, submitButtonValue);
                    loaddingimg.css('display', 'none');

                }, function (status, error) {
                    loaddingimg.css('display', 'none');
                }, false);
        }
    }, 50);
});
/*----*/


function bindDatatable(response, submitButtonValue) {


     debugger;
    
    var table = $('#Searchpayfeeuserstbl').DataTable();
    table.destroy();
    
    if (submitButtonValue === 'Search') {
        $('#TableCount').text(response.length);
        $('#FeeTextId').text('');
    } else if (submitButtonValue === 'NoFee') {
        $('#TableCount').text(response.length);
        $('#FeeTextId').text('For No Fee');
    }


    var newTable = $("#Searchpayfeeuserstbl").DataTable({
        dom: 'Bfrtip',
        buttons: [],

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
                data: "FirstName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.firstName

                }
            },
            {
                data: "InstanceUserCode",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.instanceUserCode

                }
            },
            {
                data: "RoleName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.roleName + '<input type="text" value=' + row.userId + ' hidden/>'

                }
            },
            {
                data: "ClassificationName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.classificationName

                }
            }, {
                data: "SubClassificationName",

                render: function (data, type, row, meta) {
                    //  length++;
                    return row.subClassificationName
                }
            }, {
                data: "MobilePhone",

                render: function (data, type, row, meta) {
                    //  length++;
                    return row.mobilePhone
                }
            }, {
                data: "PortalEmail",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.portalEmail
                }
            }            
        ]

    });

    table.on('draw', function () {
        $('#Searchpayfeeuserstbl').find('td:nth-child(1)').attr('title', 'Edit').css({
            'text-decoration': 'underline',
            'font-weight': 'bold'
        });;
    });
    $('#Searchpayfeeuserstbl').find('td:nth-child(1)').attr('title', 'Edit').css({
        'text-decoration': 'underline',
        'font-weight': 'bold'
    });;

    loaddingimg.css('display', 'none');
}

$(document).on('click', '#Searchpayfeeuserstbl td:nth-child(1)', function (event) {
    event.stopImmediatePropagation();

    loaddingimg.css('display', 'block');

    $('#Studentdetails_Spid').text('');
    $('#Studentfeedetailsscheduledornotspanid').text('');

    var parent = $(event.target).closest('tr');
    var StudentUserId = $(parent).find('td').find('input[type="text"]').val();

    var StudentName = $(parent).find('td:eq(0)').text();
    var Studentdepartment = $(parent).find('td:eq(3)').text();
    var Studentclass = $(parent).find('td:eq(4)').text();

    //var table = $('#Searchpayfeeuserstbl').DataTable();
    //tabletargetpagetblSEMsearchresults = table.page.info().page;
    Editfunction(StudentUserId, StudentName, Studentdepartment, Studentclass);

})


function Editfunction(StudentUserId, StudentName, Studentdepartment, Studentclass) {


    //handleAjax('GET', `/FeeSection/Getfeedetailsbyuser`, { UserId: StudentUserId },
       // handleAjax('GET', `/FeeSection/PFC_GetFeeTermDetialsByUserId`, { UserId: StudentUserId },
            handleAjax('GET', `/FeeSection/Pfcuserwisefeedetails`, { UserId: StudentUserId },
            function (response) {
                debugger;
         


                var Feetermsdropdownvalues = response.feetermsnames;
                //var Feetermsdropdownvalues = response[0].feetermsnames;
                var previousduestbl = response.Previousduesli;
                var feedetialsbyuseridtbl = response.feedetialsli;//--
                var totalpayedamounttbl = response.userpayedli;
                var termsdd = response.termdetaisli;//--
                var Managefeedetailsfeeterms = response.managefeedetailsfeeterms;//--
                $('#Challan_DDId').empty();

            if (Feetermsdropdownvalues.length != 0) {

                for (var i = 0; i < termsdd.length; i++) {
                    debugger;
                    var optionForTermId = $('<option></option>').val(termsdd[i].feeTermId).text(termsdd[i].termName);
                    $('#ddltermid').append(optionForTermId);
                }
                for (var k = 0; k < Managefeedetailsfeeterms.length; k++) {
                    var optionForFeetermid = $('<option></option>').val(Managefeedetailsfeeterms[k].feeTermId).text(Managefeedetailsfeeterms[k].termName);
                    $('#ddlFeetermid').append(optionForFeetermid);
                }
                for (var k = 0; k < Feetermsdropdownvalues.length; k++) {
                    var optionForFeetermid = $('<option></option>').val(Feetermsdropdownvalues[k].userReceiptGenerationID).text(Feetermsdropdownvalues[k].termNameReceiptNo);
                    $('#Challan_DDId').append(optionForFeetermid);
                }
                $('#Studentdetailsid').text('Selected User :' + StudentName + '-' + Studentdepartment + "-" + Studentclass);
                $('#Studentuseridspid').val(StudentUserId);
                
              
                Userfeedetailstblfunction(feedetialsbyuseridtbl, totalpayedamounttbl);
                $('#Feedetailsusernamespanid').text(StudentName);

                //Dropdowns calling functions
               // Bankaccountddfunction();
                //Paymentddfunction();

                $('#Searchuserfields_tabledatadiv1').hide();
                $('#Userfeedetailsdiv2').show();
                $('#Feechallandiv').hide();
                $('#Feedetailsupdateandedit_tablediv').hide();

                $('#Studentfeedetailsscheduledornotspanid').text('');
            }
            else {
                $('#Studentfeedetailsscheduledornotspanid').text("Fee Haven't Scheduled for '" + StudentName + "'");
                $('#Searchuserfields_tabledatadiv1').show();
                $('#Userfeedetailsdiv2').hide();
                $('#Feechallandiv').hide();
                $('#Feedetailsupdateandedit_tablediv').hide();
            }


            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }, false);
}




function Userfeedetailstblfunction(feedetialsbyuseridtbl, totalpayedamounttbl) {
    try {
        debugger;
        $('#Quantitydivid').hide();
        //$('#Feedetailsusernamespanid').text(StudentName);//=====>>>>Old code(11)
        var feedetailtbl = feedetialsbyuseridtbl;
        var feedetailtotalpayedamounttbl = totalpayedamounttbl;

        var totalAmount = 0;
        var Dueamounttotal = 0;
        var ChalanaAmount = 0;
        var totalFee = 0;
        var totalDueAmount = 0;
        var dueAmount = 0;
        var totalAmountPayed = 0;
        var payedamount = 0;


        var table = $('#Search_By_User_FeeTableData_Id');
        var tbody = table.find('tbody');
        var tfoot = table.find('tfoot');

        tbody.empty();
        tfoot.empty();



        $.each(feedetailtbl, function (index, UsersDueFeetbls) {

            //debugger;

            var SNO = index + 1;
            var SNOID = SNO + 1;


            var row = $('<tr></tr>').attr('id', 'row_' + (index + 1));

            var searchIcon = $('<span class="search-icon">&#128269;</span>');

            var cell0 = $('<td id="snoid0"></td>').css('text-align', 'center').text(SNO);
            var cell1 = $('<td id="termname1"></td>').css('text-align', 'center').text(UsersDueFeetbls.termName);
            var cell2 = $('<td id="feetype2"></td>').css('text-align', 'center').text(UsersDueFeetbls.feeType);
            var cell3 = $('<td id="feeamount3"></td>').css('text-align', 'center').text(UsersDueFeetbls.feeAmount);
            totalAmount += parseFloat(UsersDueFeetbls.feeAmount);


            //var cell4 = $('<td></td>').css('text-align', 'center').text(UsersDueFeetbls.discountName);
            //var cell4 = $('<td"></td>').css('text-align', 'center');
            //var firstNameSpan = $('<span hidden>').text(UsersDueFeetbls.concedingTypeId).attr('id', 'concedingTypeId');
            //cell4.append(firstNameSpan).append(displayIcon1Span);
            var cell4 = $('<td id="concedingtypename4"></td>').css('text-align', 'center').text(UsersDueFeetbls.discountName);
            var concedingTypeIdSpan = $('<span>').text(UsersDueFeetbls.concedingTypeId).attr('id', 'concedingTypespanid').hide();
            var Quantityvalue = $('<span>').text(UsersDueFeetbls.quantity).attr('id', 'quantityvalueid').hide();
            var Discountnamespan = $('<span>').text(UsersDueFeetbls.discountName).attr('id', 'discountnamespid').hide();
            cell4.append(concedingTypeIdSpan).append(Quantityvalue).append(Discountnamespan);



            var cell5 = "";
            var concedingAmount = UsersDueFeetbls.concedingAmount;
            ChalanaAmount += parseFloat(UsersDueFeetbls.concedingAmount);
            if (concedingAmount === "0.00") {
                cell5 = $('<td id="concedingamount5"></td>').css('text-align', 'center').text("Nill");
            } else {
                cell5 = $('<td id="concedingamount5"></td>').css('text-align', 'center').text(UsersDueFeetbls.concedingAmount);
            }


            var cell16 = $('<td id="Edit16"></td>')
                .css({
                    'text-align': 'center',
                    'color': 'black',
                    'font-weight': 'bold',
                    'cursor': 'pointer'
                });
            var editSpan = $('<span id="Editfeeamountspanid">Edit</span>')
                .attr('onclick', 'EditFeeAmount("' + UsersDueFeetbls.feeTermId + '", "' + UsersDueFeetbls.userfeeactivityId + '")');
            cell16.append(editSpan);



            var PayAmount = UsersDueFeetbls.payedAmount;
            var cell6 = "";

            if (PayAmount === "0.00") {

                cell6 = $('<td id="payedAmount6"></td>').css('text-align', 'center').text("Nill");
                searchIcon.hide();
                //cell16.text('').hide();
                //$('#Editfeeamountspanid').off('click').removeAttr('onclick').text('');
                ////$('#Editfeeamountspanid').removeAttr('onclick').text('');
                ///*$('#Editfeeamountspanid').text('');*/
                cell16.text('');
            } else {
                cell6 = $('<td id="payedAmount6"></td>').css('text-align', 'center').text(UsersDueFeetbls.payedAmount);
            }


            var cell7 = "";
            var dueAmount = UsersDueFeetbls.dueAmount;
            Dueamounttotal += parseFloat(UsersDueFeetbls.dueAmount);
            if (dueAmount === "0.00") {

                cell7 = $('<td id="dueAmount7"></td>').css('text-align', 'center').text("Nill");

            } else {

                cell7 = $('<td id="dueAmount7"></td>').css('text-align', 'center').text(UsersDueFeetbls.dueAmount);
            }

            // var cell7 = $('<td></td>').css('text-align', 'center').text(UsersDueFeetbls.dueAmount);
            var cell8 = $('<td id="dueDate8"></td>').css('text-align', 'center').text(UsersDueFeetbls.dueDate);



            /* debugger;*/
            var Amount_TXTId = 'AmountTextbox_' + SNOID;
            var cell9 = $('<td id="amounttextbox9"></td>').css({
                'text-align': 'center',
            });
            var textbox = $('<input type="text" />').attr('id', Amount_TXTId).addClass('form-control');
            //var textbox = $('<input type="text" />').css({
            //    'width': '76%',
            //    'height': '28px',
            //    'border': '1px solid',
            //    'border-color': 'violet'
            //}).attr('id', Amount_TXTId);
            textbox.attr('maxlength', 8);

            textbox.on('input', function () {

                this.value = this.value.replace(/\D/g, '');
            });
            cell9.append(textbox);



            var cell10 = $('<td id="Searchfeetermsicon10"></td>')
                .css('text-align', 'center')
                .attr('onclick', 'Searchfeetermsiconfun("' + UsersDueFeetbls.feeTermId + '", "' + UsersDueFeetbls.userfeeactivityId + '")')
                .text('');


            cell10.append(searchIcon);
            var InstallmentName_TXTId = 'InstallmentName_' + SNOID
            var cell11 = $('<td id="textarea11"></td>').css('text-align', 'center');
            var textarea = $('<textarea></textarea>').attr('id', InstallmentName_TXTId).addClass('form-control');
            cell11.append(textarea);





            var cell12 = $('<td hidden id="academicYearId12"></td>').text(UsersDueFeetbls.academicYearId);
            var cell13 = $('<td hidden id="feeTypeId13"></td>').text(UsersDueFeetbls.feeTypeId);
            var cell14 = $('<td hidden id="feeTermId14"></td>').text(UsersDueFeetbls.feeTermId);
            var cell15 = $('<td hidden id="userfeeactivityId15"></td>').text(UsersDueFeetbls.userfeeactivityId);

            /* debugger;*/
            var cell17 = $('<td hidden id="instanceUserCode17"></td>').text(UsersDueFeetbls.instanceUserCode);
            var cell_18 = $('<td hidden id="classificationName18"></td>').text(UsersDueFeetbls.classificationName);
            var cell_19 = $('<td hidden id="subClassificationName19"></td>').text(UsersDueFeetbls.subClassificationName);
            // var cell_20 = $('<td hidden id="firstName"></td>').text(UsersDueFeetbls.firstName);
            var cell_20 = $('<td hidden id="firstName20"></td>');
            var firstNameSpan = $('<span>').text(UsersDueFeetbls.firstName).attr('id', 'firstNameSpanId');
            var displayIcon1Span = $('<span>').text(UsersDueFeetbls.displayIcon1).attr('id', 'displayIcon1SpanId');
            cell_20.append(firstNameSpan).append(displayIcon1Span);
            var cell21 = $('<td id="receiptNo"></td>').text(UsersDueFeetbls.receiptNo);



            row.append(cell0);
            row.append(cell1);
            row.append(cell2);
            row.append(cell3);
            row.append(cell4);
            row.append(cell5);
            row.append(cell6);
            row.append(cell7);
            row.append(cell8);
            row.append(cell9);
            row.append(cell10);
            row.append(cell11);
            row.append(cell12);
            row.append(cell13);
            row.append(cell14);
            row.append(cell15);
            row.append(cell16);
            row.append(cell17);

            row.append(cell_18);
            row.append(cell_19);
            row.append(cell_20);
            row.append(cell21);



            tbody.append(row);

        });



        $.each(feedetailtotalpayedamounttbl, function (index, UsersDueFeetblsfooter) {
            totalFee += parseFloat(UsersDueFeetblsfooter.totalFee);
            totalDueAmount += parseFloat(UsersDueFeetblsfooter.totalDueAmount);
            totalAmountPayed += parseFloat(UsersDueFeetblsfooter.totalAmountPayed);
            payedamount += parseFloat(UsersDueFeetblsfooter.payedamount);
            dueAmount += parseFloat(UsersDueFeetblsfooter.dueAmount);
        });

        // Update the table footer cells
        tfoot.append($('<tr></tr>')
            .append($('<td colspan="3"></td>').css('text-align', 'center').text('TOTAL'))
            .append($('<td></td>').css('text-align', 'center').text(totalAmount.toFixed(2)))
            .append($('<td></td>').css('text-align', 'center').text(totalDueAmount.toFixed(2)))
            .append($('<td></td>').css('text-align', 'center').text(ChalanaAmount.toFixed(2)))
            .append($('<td></td>').css('text-align', 'center').text(payedamount.toFixed(2)))
            .append($('<td></td>').css('text-align', 'center').text(Dueamounttotal.toFixed(2)))
            .append('<td></td>')
            .append('<td></td>')
            .append('<td></td>')
            .append('<td></td>')
            .append('<td></td>')
        );

        loaddingimg.css('display', 'none');
    }
    catch {
        loaddingimg.css('display', 'none');
        //$('#loadingSpinnerContainer').hide();
        $('#UserName_Classification_subclasification_ID').html('');
        $('#ErrorMessage').html('Something Went Wrong Please Try Again......!');

        $('#Search_Pay_For_UsersFileds_Divid').show();

        $('#SearchPayFor_UsersTbl_Divid').show();
        $('#TableDate_forUsers_DivId').show();
        $('#GetFeeTermDetialsByUser_DIVID').hide();
        $('#tblFeeInstallments_GetFeeDetialsByUserFeeId').hide();
        $('#FeePaid_ChallanaCreated_DivId').hide();
    }
}



$('#searchbtnterms').on("click", function () {
    debugger;
    const SelectedFeeTermsids = $('#ddltermid').val();
    var userId = $('#Studentuseridspid').val();

    $('#Update_SubmitvalidationMessage').text('');

    Searchfeetermsbtnclickfunction(userId, SelectedFeeTermsids);
    //Editfunction(StudentUserId, StudentName, Studentdepartment, Studentclass)



});
function Searchfeetermsbtnclickfunction(userId, SelectedFeeTermsids) {

    handleAjax('GET', `/FeeSection/PFCfeedetails_byfeetermstableData?UserId=${userId}&FeeTermIds=${SelectedFeeTermsids}`, null,
        function (response) {
            debugger;
            //var Feetermsdropdownvalues = response[0].feetermdetialsbyuserId;
            //var previousduestbl = response[0].feedetialsbyuseridforpreviousdues;
            var feedetialsbyuseridtbl = response.feedetialsli;//--
            var totalpayedamounttbl = response.userpayedli;
            //var termsdd = response[0].feetermsdd;

            Userfeedetailstblfunction(feedetialsbyuseridtbl, totalpayedamounttbl);
            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }, false);
}



function Paymentddfunction() {
    fetchDataAndPopulateDropdown(                           //==== << ** Studentquota Dropdown ** >>
        '/FeeSection/PfuPaymentdd',                      // URL for data fetching
        '#paymentmodeddl',                                 // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        null                                                // Response value return class name
    );
}
function Bankaccountddfunction() {
    fetchDataAndPopulateDropdown(                           //==== << ** Studentquota Dropdown ** >>
        '/FeeSection/Pfubankaccountsdd',                      // URL for data fetching
        '#bankaccountsddl',                                 // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        null                                                // Response value return class name
    );
}






/*========================= =====SEARCH ICON CLICK FIRE FUNCTION CODE START =================================*/


function Searchfeetermsiconfun(feeTermId, userfeeactivityId) {


    debugger;
    //exec stp_tblFeeInstallments_GetFeeDetialsByUserFeeId UserId=80781,FeeTermId=4582,UserFeeId1=417163

    var UserId = $('#Studentuseridspid').val();
    var FeeTermId = feeTermId;
    var UserFeeId1 = userfeeactivityId;


    var Editformdata = {
        UserId: UserId,
        FeeTermId: FeeTermId,
        UserFeeId1: UserFeeId1
    }
    $.ajax({
        //url: '/FeeSection/PFU_PaidAmount_Edit_User',
        //url: '/FeeSection/Pfusingleuserpaidamount_edit',
        //url: '/FeeSection/PfusingleuserpaidamountSearchicon',
        url: '/FeeSection/PFUC_PaidAmount_Edit_User',
        type: 'GET',
        data: Editformdata,
        success: function (response) {
            debugger;
            var newWindow = window.open('', 'UserDetails', 'width=600,height=600,scrollbars=yes,resizable=yes');
            var tableHtml = '<div style="overflow-x: auto;">';
            tableHtml += '<table class="Search_FeeTable">';
            tableHtml += '<thead><tr><th colspan="12"  class="records-header">NO OF RECORDS: ' + response.length + '</th></tr>'; // Add the number of records
            tableHtml += '<tr><th>SNO</th><th>Fee Term</th><th>Fee Type</th><th>Challan No</th><th>Paid Amt</th><th>Paid On</th><th>Collected By</th><th>Payment Mode</th><th>Account Number</th><th>Bank Name</th><th>Comments</th><th>Description</th></tr></thead>';

            tableHtml += '<tbody>';

            var rowNumber = 1;

            response.forEach(function (item) {
                tableHtml += '<tr><td style="width: 10%;">' + rowNumber + '</td><td style="width: 20%;">' + item.termName + '</td><td style="width: 30%;">' + item.feeType + '</td><td style="width: 30%;">' + item.receiptNo + '</td><td style="width: 30%;">' + item.amount + '</td><td style="width: 30%;">' + item.createdDate + '</td><td style="width: 30%;">' + item.collectedBy + '</td><td style="width: 30%;">' + item.mode + '</td><td style="width: 30%;">' + item.accountNumber + '</td><td style="width: 30%;">' + item.bankName + '</td><td style="width: 30%;">' + item.installmentName + '</td><td style="width: 30%;">' + item.description + '</td></tr>';

                rowNumber++;
            });
            tableHtml += '</tbody>';

            tableHtml += '</table>';
            tableHtml += '</div>';


            var styleElement = document.createElement('style');
            styleElement.innerHTML = `
    .Search_FeeTable {
      width: 100%; /* Adjust the width as needed */
      border-collapse: collapse;
      border: 1px solid #DC2;
      margin-top: 18px;
      background-color: white;
      margin-left: 7px;
    }
    .Search_FeeTable td {
      border: 1px solid #DC5;
      /* padding: 0px; */
      font-family: auto;
      width: 31%;
    }
    .Search_FeeTable th {
      border: 1px solid #DC5;
      /* padding: 0px; */
      font-family: auto;
          width: 31%;
    }
    .Search_FeeTable tfoot {
      background-color: lightgoldenrodyellow;
    }
.records-header {
      background-color: slategrey;
      color: white;
      font-size: 13px;
      text-align: left;
    }
  `;

            // Write the table HTML and styles to the new window's document
            newWindow.document.write('<html><head></head><body>' + tableHtml + '</body></html>');
            newWindow.document.head.appendChild(styleElement);
            newWindow.document.close();
        }



    });



}

/*========================= =====SEARCH ICON CLICK FIRE FUNCTION CODE END =================================*/

function ValidationChequeDetails() {


    //var ChequeDDNo = document.getElementById('Cheque_DD_TxtId');
    //var ChequeDDDate = document.getElementById('Cheque_DD_DateTxtId');
    //var ChequeDDBankName = document.getElementById('Cheque_DD_BankName_TxtId');
    //var ChequeDDBankBranch = document.getElementById('ChequeDDBankBranch_TXTID');

    //var validationMessage = document.getElementById('SubmitvalidationMessage');
    //var validationMessages = document.getElementById('SubmitvalidationMessages');
    const dropdownValidationMessage = document.getElementById('Validationmsgspid');
    const textValidationMessage = document.getElementById('SubmitvalidationMessage');
    const lineBreak = document.createElement('br');
    let isTextValid = true;
    let isDropdownValid = true;

    textValidationMessage.innerHTML = '';  // Clear text validation message
    dropdownValidationMessage.innerHTML = ''; // Clear dropdown validation message

    // Validation for dropdowns
    const dropdownFields = [
        //{ elementId: 'bankaccountsddl', displayId: 'bankaccountsddl', message: 'Please select a bank.' },
        { elementId: 'paymentmodeddl', displayId: 'paymentmodeddl', message: 'Please select a payment mode.' }
    ];

    dropdownFields.forEach(({ elementId, displayId, message }) => {
        const dropdown = document.getElementById(elementId);
        const selectedValue = dropdown.value.trim();

        if (!selectedValue) {
            dropdownValidationMessage.appendChild(document.createTextNode(message));
            dropdownValidationMessage.appendChild(lineBreak.cloneNode());
            isDropdownValid = false;
        }
    });

    // Validation for text inputs
    const textFields = [
        { elementIds: 'Chequetxtid', displayIds: 'Chequeddno', messages: 'Please enter Cheque/DD No.' },
        { elementIds: 'Chequedatedttxtid', displayIds: 'Chequedddate', messages: 'Please enter Cheque/DD Date.' },
        { elementIds: 'Chequebanknametxtid', displayIds: 'Chequenamlname', messages: 'Please enter Cheque/DD Bank Name.' }
    ];

    textFields.forEach(({ elementIds, displayIds, messages }) => {
        const elements = document.getElementById(elementIds);
        const values = elements.value.trim();

        if (elements.style.display !== 'none' && values === '') {
            textValidationMessage.appendChild(document.createTextNode(messages));
            textValidationMessage.appendChild(lineBreak.cloneNode());
            isTextValid = false;
        }
    });

    const isValid = isDropdownValid && isTextValid;
    return isValid;

}
/* ------------------------------------------------>      Cheque And DD Select Open Some Details Textboxes That Time validation Code is End-------> */

function Payinstallmentsubbtn(event) {
    event.preventDefault();

    //$('#PartailCOntainerViews').show();
    $('#MultipuleUsersFeeChallanas_PartailContainer').html(" ");

    if (ValidationChequeDetails()) {
        debugger;
        var index = 2;
        let validationFailed = false;
        var textboxValues = [];
        var tableData = [];

        var ChequeDDNo = $('#Chequetxtid').val();
        var ChequeDDDates = $('#Chequedatedttxtid').val();
        var ChequeDDBank = $('#Chequebanknametxtid').val();
        var CCDDNameOfCard = ChequeDDNo;
        var CCDDNameofIssuer = ChequeDDBank;
        // var originalDateStr = ChequeDDDates;
        var ChequeDDDate = "";
        var CCDDType = "";
        if (ChequeDDDates != '') {
            var [year, month, day] = ChequeDDDates.split('-');
            CCDDType = `${day}/${month}/${year} 00:00:00`;
            ChequeDDDate = `${ChequeDDDates} 00:00:00`;
        } else {
            ChequeDDDate = "";
            CCDDType = "";
        }
        var ReceiptNo = "";
        var PayableBranchId = "";
        var BankAddress = "";
        var DueAmount = "";

        var tbllength = $('#Search_By_User_FeeTableData_Id tbody tr').length;
        var tableRows = $('#Search_By_User_FeeTableData_Id tbody tr');

       
        var tble = tableRows.length;

        var TextboxIndex = 1;
        //var totalRowTextboxs = tableRows.length;
        var AllTextBoxesValues = [];



        tableRows.each(function () {
            debugger;
            var rowIds = TextboxIndex + 1;
            var textboxValues = $('#AmountTextbox_' + rowIds).val();
            AllTextBoxesValues.push(textboxValues);
            var InstallmentNameValue = $('#InstallmentName_' + rowIds).val();
            TextboxIndex++;
        });



        var allEmpty = AllTextBoxesValues.every(function (value) {
            return $.trim(value) === ""; // Trim and check if empty
        });


        if (allEmpty) {
            $('#SubmitvalidationMessage').text('Please enter fee amount .');
            return false;
        }
        /* --------  All text boxes Empty Show Error Message Code Start -------- */



      






        tableRows.each(function () {
            var formData = [];
            var rowValues = {};

            Bankaccount = $('#bankaccountsddl').val() || null;
            PayementMode = $('#paymentmodeddl').val() || null;
            Description = $('#descriptiontxtid').val() || null;
            AcademicYearId = $('#academicYearId').text() || null;
            FeeTermId = $('#feeTermId').text() || null;
            FeeTypeId = $('#feeTypeId').text() || null;
            UserFeeId1 = $('#userfeeactivityId').text() || null;

            var textboxValues = $('#AmountTextbox_' + index).val();
            var InstallmentNameValue = $('#InstallmentName_' + index).val();

            var feeamountcellvalue = parseFloat($(this).find('td:nth-child(4)').text().trim());//cell4Value
            var Discountamountcellvalue = parseFloat($(this).find('td:nth-child(6)').text().trim());//cell6Value
            var Paidamountcellvalue = parseFloat($(this).find('td:nth-child(7)').text().trim());//cell7Value
            var Dueamountcellvalue = $(this).find('td:nth-child(8)').text().trim();//cell8Text 



            debugger;
            var cell2Text = $(this).find('td:nth-child(2)').text().trim();
            var cell3Text = $(this).find('td:nth-child(3)').text().trim();
            // var cell4Value = parseFloat($(this).find('td:nth-child(4)').text().trim());
            var cell4Text = $(this).find('td:nth-child(4)').text().trim();
            var cell5Text = $(this).find('td:nth-child(5) #discountnamespid').text().trim();
            //var cell5Text = $(this).find('td:nth-child(5)').text().trim();
            //var cell6Value = $(this).find('td:nth-child(6)').text().trim();            
            //var cell7Value = parseFloat($(this).find('td:nth-child(7)').text().trim());            
            var cell7Text = $(this).find('td:nth-child(7)').text().trim();
            var cell8Text = $(this).find('td:nth-child(8)').text().trim();
            var cell9Text = $(this).find('td:nth-child(9)').text().trim();
            var academicYearId_cell13Text = $(this).find('td:nth-child(13)').html().trim();
            var feeTypeId_cell14Text = $(this).find('td:nth-child(14)').html().trim();
            var feeTermId_cell15Text = $(this).find('td:nth-child(15)').html().trim();
            var userfeeactivityId_cell16Text = $(this).find('td:nth-child(16)').html().trim();
            var cell18Text = $(this).find('td:nth-child(18)').text().trim();

            //var cell19Text = $(this).find('td:nth-child(19)').text().trim();
            var Departmentcell19 = $(this).find('td:nth-child(19)').text().trim();

            //var cell20Text = $(this).find('td:nth-child(20)').text().trim();
            var Classnamecell20 = $(this).find('td:nth-child(20)').text().trim();

            //var cell21Text = $(this).find('td:nth-child(21)').text().trim();
            var Studentusernamecell21 = $(this).find('td:nth-child(21) #firstNameSpanId').text().trim();


            //old code           

            var BalanceDue = cell8Text - textboxValues;
            var PaidDueAmount = cell4Text - cell7Text;
            //var Totalfeeamounttominasediscountamount = cell4Value - cell6Value;
            //var Paidamountvaluetoduevalue = Totalfeeamounttominasediscountamount - cell7Value;

            if (textboxValues !== "") {
                var Inttextboxvalue = parseInt(textboxValues);
                if (Inttextboxvalue > PaidDueAmount) {
                    $('#SubmitvalidationMessage').text('FeeAmount should not be Greater than Due, for Term "' + cell2Text + '" and FeeType "' + cell3Text + '"');
                    validationFailed = true; // Set the flag to true to indicate validation failure
                    return false; // Exit the each loop
                }
            }
            rowValues['AmountTextboxValue'] = textboxValues;
            rowValues['InstallmentNameTextareaValue'] = InstallmentNameValue;
            tableData.push(rowValues);

            debugger;

            formData.push({ name: "BankAccountId", value: Bankaccount });
            formData.push({ name: "PaymentModeId", value: PayementMode });
            formData.push({ name: "Description", value: Description });
            //formData.push({ name: "InstanceId", value: InstanceId });
            formData.push({ name: "ReceiptNo", value: ReceiptNo });
            formData.push({ name: "ChequeDDNo", value: ChequeDDNo });
            formData.push({ name: "ChequeDDDate", value: ChequeDDDate });
            formData.push({ name: "ChequeDDBank", value: ChequeDDBank });
            formData.push({ name: "PayableBranchId", value: PayableBranchId });
            formData.push({ name: "CCDDNameOfCard", value: CCDDNameOfCard });
            formData.push({ name: "CCDDType", value: CCDDType });
            formData.push({ name: "CCDDNameofIssuer", value: CCDDNameofIssuer });
            formData.push({ name: "BankAddress", value: BankAddress });
            formData.push({ name: "DueAmount", value: DueAmount });

            //var InstallmentName = InstallmentNameValue;
            formData.push({ name: "InstallmentName", value: InstallmentNameValue });

            var CCDDNo = new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

            formData.push({ name: "CCDDNo", value: CCDDNo });

            if (textboxValues != "") {

                if (parseInt(cell8Text) <= 0) {
                    $('#SubmitvalidationMessage').text('No Due Amount for Term "' + cell2Text + '" and FeeType "' + cell3Text + '"');
                    validationFailed = true;
                    return false;
                }

                formData.push({ name: "AcademicYearId", value: academicYearId_cell13Text });
                formData.push({ name: "FeeTermId", value: feeTermId_cell15Text });
                formData.push({ name: "FeeTypeId", value: feeTypeId_cell14Text });
                formData.push({ name: "UserFeeId1", value: userfeeactivityId_cell16Text });

                //Challana Details This Values
                formData.push({ name: "Challana_TermName", value: cell2Text });
                formData.push({ name: "Challana_FeeType", value: cell3Text });
                formData.push({ name: "Challana_FeeAmount", value: feeamountcellvalue });//cell4Value
                formData.push({ name: "Challana_DiscountType", value: cell5Text });
                formData.push({ name: "Challana_DiscountAmount", value: Discountamountcellvalue });//cell6Value
                formData.push({ name: "Challana_PaidAmount", value: Paidamountcellvalue });// cell7Value
                formData.push({ name: "Challana_PayingAmount", value: textboxValues });
                formData.push({ name: "Challana_DueAmount", value: Dueamountcellvalue });//cell8Text
                formData.push({ name: "Challana_BalanceDue", value: BalanceDue });
                formData.push({ name: "Challana_DueDate", value: cell9Text });
                formData.push({ name: "Challana_UserRegId", value: cell18Text });
                formData.push({ name: "Challana_ClassificationName", value: Departmentcell19 });
                formData.push({ name: "Challana_subclassificationName", value: Classnamecell20 });
                formData.push({ name: "Challana_UserName", value: Studentusernamecell21 });


                //testing Last Values 

                // var Amount = textboxValues;
                formData.push({ name: "Amount", value: textboxValues });

                debugger;
                if (cell18Text != "") {


                    $.ajax({
                        url: '/FeeSection/PFUC_AmountPay_Recipt',
                        type: 'POST',
                        data: formData,
                        success: function (response) {

                            debugger;

                            $('#GetFeeTermDetialsByUser_DIVID').hide();
                            $('#PartailCOntainerViews').show();
                            $('#FeePaidMessage').text('Fee paid Successfully ');
                            $('#Errormessage').text('Fee paid Successfully ');
                            $('#Studentdetailsid').text('');

                            $('#btnsubmit').prop('disabled', true);

                            $('#ddltermid').empty();
                            $('#ddlFeetermid').empty();
                            $('#bankaccountsddl').prop('selectedIndex', 0);
                            $('#paymentmodeddl').prop('selectedIndex', 0);

                            $('#MANAGEFEEDETAILSFORM')[0].reset();

                            $('#Searchuserfields_tabledatadiv1').hide();
                            $('#Userfeedetailsdiv2').hide();
                            $('#Feechallandiv').show();
                            $('#Feedetailsupdateandedit_tablediv').hide();
                            $('#Feereceipt_partailcontaindiv').append(response);
                            // $('#SingleUserEdit_PartailContainer').html(response);

                            //if (response != 0) {

                            //    var RECEIPTNO = response;

                            //    $('#FeePaid_ChallanaCreated_DivId').show();
                            //    $('#Search_Pay_For_UsersFileds_Divid').hide();
                            //    $('#TableDate_forUsers_DivId').hide();

                            //    $('#GetFeeTermDetialsByUser_DIVID').hide();
                            //    $('#tblFeeInstallments_GetFeeDetialsByUserFeeId').hide();

                            //    $('#Description_TXTAId').val('');
                            //    BankAccounts_dropdown_Function();
                            //    Payment_Mode_dropdown_Function();

                            //    $('#UserName_Classification_subclasification_ID').hide();
                            //    $('#AMountPaidSubmit_Message').text('Fee paid Successfully ');

                            //    var Challana_Data = {

                            //        Challana_TermName: cell2Text,
                            //        Challana_FeeType: cell3Text,
                            //        Challana_FeeAmount: cell4Value,
                            //        Challana_DiscountType: cell5Text,
                            //        Challana_DiscountAmount: cell6Value,
                            //        Challana_PaidAmount: cell7Value,
                            //        Challana_PayingAmount: textboxValues,
                            //        Challana_DueAmount: cell8Text,
                            //        Challana_BalanceDue: BalanceDue,
                            //        Challana_DueDate: cell9Text,
                            //        Challana_UserRegId: cell18Text,
                            //        Challana_ClassificationName: cell19Text,
                            //        Challana_subclassificationName: cell20Text,
                            //        Challana_UserName: cell21Text,
                            //        Challana_RECEIPTNO: RECEIPTNO
                            //    };

                            //    //resetChallanaData();
                            //    debugger;
                            //    challana_Data_Users.push(Challana_Data);

                            //    displayFormattedDateTime();
                            //    ChallaFunctionNames(challana_Data_Users);


                            //}

                        }


                    });
                } else {

                    $("#SubmitvalidationMessage").text('Challan is not generated for ' + cell3Text + ' in ' + cell2Text + '.');

                    return false;
                }

            }

            index++;
        });



        if (validationFailed) {
            // Handle the case where validation failed
            // For example, you can prevent form submission or perform other actions
            return;
        }





        var allTextboxesFilled = textboxValues.every(value => value !== '');



        console.log('Textbox Values:', textboxValues);

    }


}
function EditFeeAmount(feeTermId, userfeeactivityId) {

    debugger;
    $('#ErrorMessages_EditUsers').text('');
    $('#loadingSpinnerContainer').show();
    $('#SingleUserEdit_PartailContainer').show();
    $('#Update_SubmitvalidationMessage').text('');

    $('#Challan_partialView_Container').css('display', 'none');
    //$('#Challan_partialView_Container').text('');
    loaddingimg.css('display', 'block');
    var UserId = $('#Studentuseridspid').val();
    var FeeTermId = feeTermId;
    var UserFeeId1 = userfeeactivityId;



    var Editformdata = {
        UserId: UserId,
        FeeTermId: FeeTermId,
        UserFeeId1: UserFeeId1
    }

    $('#GetFeeTermDetialsByUser_DIVID').hide();

    $('#tblFeeInstallments_GetFeeDetialsByUserFeeId').show();

    $.ajax({
        url: '/FeeSection/PFU_FC_PaidAmount_Edit_User',
        //url: '/FeeSection/PFUC_PaidAmount_Edit_User',
        type: 'GET',
        data: Editformdata,
        success: function (response) {
            debugger;
          
            $('#ddltermid').prop('selectedIndex', 0);
            $('#ddlFeetermid').prop('selectedIndex', 0);
            $('#bankaccountsddl').prop('selectedIndex', 0);
            $('#paymentmodeddl').prop('selectedIndex', 0);
            $('#MANAGEFEEDETAILSFORM')[0].reset();

            $('#Searchuserfields_tabledatadiv1').hide();
            $('#Userfeedetailsdiv2').hide();
            $('#Feechallandiv').hide();
            $('#Feedetailsupdateandedit_tablediv').show();
            //
            //$('#SingleUserEdit_PartailContainer').html(response);
            $('#Feedetailsupdateandedittablediv').html(response);
            loaddingimg.css('display', 'none');
            //var responsecount = response.length;
            //$('#RecordsCounts').text(responsecount);


            //var table = $('#Search_FeeDetails_ByUserUpdate');
            //var tbody = table.find('tbody');
            //var RowNumber = 1;

            //tbody.empty();


            //$.each(response, function (index, item) {

            //    var SNO = index + 1;
            //    var SNOID = SNO + 1;

            //    var row = $('<tr></tr>');
            //    var cell1 = $('<td></td>').text(RowNumber);
            //    var cell2 = $('<td></td>').text(item.termName);
            //    var cell3 = $('<td></td>').text(item.feeType);


            //    //var cell4 = $('<td></td>').text(item.amount);
            //    var AmountUpdate_TXTId = 'AmountTextbox_' + SNOID;
            //    var cell4 = $('<td></td>').css('text-align', 'center');
            //    var textbox = $('<input type="text" />').css({
            //        'height': '23px',
            //        'width': '68%'
            //    }).attr('id', AmountUpdate_TXTId).val(item.amount);
            //    textbox.attr('maxlength', 8);
            //    cell4.append(textbox);


            //    //var cell5 = $('<td></td>').text(item.comments);
            //    var Comments_TxtAId = 'Comments_TxtAId' + SNOID;
            //    var cell5 = $('<td></td>').css('text-align', 'center');
            //    var textarea = $('<textarea></textarea>').attr('id', Comments_TxtAId).val(item.installmentName);
            //    cell5.append(textarea);

            //    var cell6 = $('<td></td>').text(item.createdDate);
            //    var cell7 = $('<td></td>').text(item.collectedBy);



            //    row.append(cell1);
            //    row.append(cell2);
            //    row.append(cell3);
            //    row.append(cell4);
            //    row.append(cell5);
            //    row.append(cell6);
            //    row.append(cell7);



            //    tbody.append(row);
            //    RowNumber++;
            //});

        },
        error: function () {
            // Handle error if the AJAX request fails
            // Hide the spinner in case of error as well
          
            alert('Error: Failed to fetch data.');
        }
    });
}


function backToSearchfun(event) {
    event.preventDefault();
    debugger;
    $('#Studentdetailsid').text('');
    $('#Studentfeedetailsscheduledornotspanid').text('');
    $('#Studentuseridspid').val('');
    $('#ddltermid').empty();
    $('#ddlFeetermid').empty();

    $('#bankaccountsddl').prop('selectedIndex', 0);
    $('#paymentmodeddl').prop('selectedIndex', 0);

    $('#Update_SubmitvalidationMessage').text('');
    $('#SubmitvalidationMessage').text('');

    $('#validationMessage').text('');
    $('#validation').text('');

    $('#MANAGEFEEDETAILSFORM')[0].reset();
    $('#Searchuserfields_tabledatadiv1').show();
    $('#Userfeedetailsdiv2').hide();
    $('#Feechallandiv').hide();
    $('#Feedetailsupdateandedit_tablediv').hide();

    $('.hideable').hide();

    $('#Cheque_DD_TxtId').val('');
    $('#Cheque_DD_DateTxtId').val('');
    $('#Cheque_DD_BankName_TxtId').val('');
    $('#ChequeDDBankBranch_TXTID').val('');
    $('#Description_TXTAId').val('');
    $('#SubmitvalidationMessages').text('');

}




$('#DDlTermid').change(function () {
    debugger;
    var FeetermId = $('#ddlFeetermid').val();
    Dropdwonfunction(FeetermId);
});

function Dropdwonfunction(FeetermId) {
    fetchDataAndPopulateDropdown(                                                                //==== << ** FeeType Dropdown ** >>
        '/FeeSection/PFUC_Termidbyfeetype?FeeTermId=' + FeetermId,                                 // URL for data fetching
        '#ddlfeetype',                                                                             // Dropdown selector
        'value',                                                                                    // Field name for option text
        'text',                                                                                     // Field name for option values
        null                                                                                        // Response value return class name
    );

    document.getElementById("Span_IconId_Quantity").style.display = "none";
    //document.getElementById("Quantitydivid").style.display = "none";
    $('#Quantitydivid').hide();
}


//$('#ddlfeetype').change(function () {
$('#ddlfeetypedivid').change(function () {
    debugger;
    var FeetypeId = $('#ddlfeetype').val();
    Feetypedropdwonfunction(FeetypeId);
});
function Feetypedropdwonfunction(FeetypeId) {
    //PFUC_Feetypeby_Discounttype
    
    debugger;
    handleAjax('GET', '/FeeSection/Pfucfeetypebydiscountdd', { FeetypeId: FeetypeId },
        function (response) {
            var FeeTypedropdownText = $('#ddlfeetype option:selected').text();
            var FeeTermdropdownText = $('#ddlFeetermid option:selected').text();
        

            const subddData = response.discountTypeList;
            const pfuQuantityList = response.quantityList;
            document.getElementById("Span_IconId_Quantity").style.display = "none";
            //document.getElementById("Quantitydivid").style.display = "none";
            $('#Quantitydivid').hide();

            debugger;

            const dropdown = document.getElementById("Discount_TypeDDId");
            dropdown.innerHTML = "";
            for (let i = 0; i < subddData.length; i++) {
                const item = subddData[i];
                const option = document.createElement("option");
                option.value = item.value;
                option.textContent = item.text;
                dropdown.appendChild(option);
            }

            const table = document.getElementById("Search_By_User_FeeTableData_Id");

            const rows = table.getElementsByTagName("tr");

            var j = 0;
            var option;
            for (let i = 1; i < rows.length; i++) {

                const numberOfOptions = dropdown.options.length;

                const row = rows[i];
                const feeTermCell = row.cells[1];
                const feeTypeCell = row.cells[2];
                const PaidAmountCell = row.cells[5];
                const DueAmountCell = row.cells[6];
                const feeTerm = feeTermCell.textContent.trim();
                const feeType = feeTypeCell.textContent.trim();
                //const PaidAmount = PaidAmountCell.textContent.trim();
                //const DueAmount = DueAmountCell.textContent.trim();
                if (feeTerm === FeeTermdropdownText && feeType === FeeTypedropdownText) {

                    $('#Addfeeuserbtn').val('Update').html('Update');
                    //$('#Addfeeuserbtn').val('Update');                       
                    //$('#Addfeeuserbtn').text('Update');
                    const feeAmount = row.cells[3].textContent.trim();
                    const dueDate = row.cells[8].textContent.trim();
                    const Discount_Amount = row.cells[5].textContent.trim();
                    const PaidAmount = row.cells[7].textContent.trim();
                    const DueAmount = row.cells[6].textContent.trim();
                    const displayIcon1Value = row.querySelector("#displayIcon1SpanId").textContent;
                    const concedingTypespanid = row.cells[4].querySelector("#concedingTypespanid").textContent;
                    const quantityvalueid = row.cells[4].querySelector("#quantityvalueid").textContent;

                    debugger;
                    if (pfuQuantityList && pfuQuantityList.length > 0) {
                        debugger;
                        $('#QuantityAmount_TxtID').val(quantityvalueid);
                        $('#Quantityamountvaluesetfeewisetxtid').val(pfuQuantityList[0].amount);
                        $('#Quantitydivid').show();
                    }
                    else {
                        $('#QuantityAmount_TxtID').val('');
                        $('#Quantitydivid').hide();
                    }

                    for (let k = 0; k < numberOfOptions; k++) {
                        const optionValue = dropdown.options[k].value;

                        if (typeof optionValue !== 'undefined' && optionValue === concedingTypespanid) {
                            dropdown.options[k].selected = true;
                            //break; // Exit the loop after selecting the option
                        }
                    }

                    //debugger;
                    //if (Discount_Amount != "") {
                        
                    //}else {
                        
                    //}

                    debugger;
                    if (displayIcon1Value != "1") {
                        document.getElementById("Span_IconId_Quantity").style.display = "none";
                    } else {
                        document.getElementById("Span_IconId_Quantity").style.display = "block";
                    }

                    function convertToDateInputFormat(dateString) {
                        const parts = dateString.split('/');
                        if (parts.length !== 3) return ""; // Invalid date format
                        const [day, month, year] = parts;
                        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                    }

                    debugger;
                    if (Discount_Amount === "Nill") {
                        var Discount_Amounts = "0.0";
                        document.getElementById("Spandiscountamouniconid").style.display = "none";
                    } else {
                        var Discount_Amounts = Discount_Amount;
                        document.getElementById("Spandiscountamouniconid").style.display = "block";
                    }
                    const inputElement = document.getElementById('DueDate_TxtID');


                    const formattedDate = convertToDateInputFormat(dueDate);
                    inputElement.value = formattedDate;

                    document.getElementById("paidAmount_TXTID").value = PaidAmount;
                    document.getElementById("DiscountAmount_TXTID").value = Discount_Amounts;
                    document.getElementById("FeeAmount_TxtID").value = feeAmount;


                    break;
                }
                else {
                    debugger;
                    $('#FeeAmount_TxtID').val('');
                    $('#DueDate_TxtID').val('');
                    $('#Quantitydivid').show();
                    if (pfuQuantityList && pfuQuantityList.length > 0) {
                        $('#Quantityamountvaluesetfeewisetxtid').val(pfuQuantityList[0].amount);
                    }
                    document.getElementById("Span_IconId_Quantity").style.display = "none";
                    $('#Addfeeuserbtn').val('Submit');
                    $('#Addfeeuserbtn').text('Submit');
                }
            }
            //bindDatatable(response, submitButtonValue);
            loaddingimg.css('display', 'none');

        }, function (status, error) {
            loaddingimg.css('display', 'none');
        }, false);
}

$('#Discount_TypeDDId').change(function () {
    var ConcedingTypeId = $('#Discount_TypeDDId').val();
    //Feetypedropdwonfunction(ConcedingTypeId);
    handleAjax('GET', '/FeeSection/pfudiscounttypebydiscountamount', { ConcedingTypeId: ConcedingTypeId },
        function (response) {
            debugger;
            $('#DiscountAmount_TXTID').text(response[0].text).val(response[0].text);
        },
        function (status, error) {


        }, false);
});


///======>>> SET FEE AMOUNT
function setFeeAmount(input) {
    debugger;
    // Get the entered quantity from the input field
    var quantity = parseFloat(input.value) || 0;
    var Quantitywisesetfeeamounttxt = $('#Quantityamountvaluesetfeewisetxtid').val();
    // Calculate the total amount by multiplying the quantity with 500
    var totalAmount = quantity * Quantitywisesetfeeamounttxt;

    // Update the value of the Total Amount text box
    document.getElementById('FeeAmount_TxtID').value = totalAmount.toFixed(2); // Using toFixed to limit decimal places
}

function isNumber(event) {
   
    var inputValue = event.key;


    if (!/^\d*\.?\d*$/.test(inputValue)) {

        event.preventDefault();
    }
}




$('#Addfeeuserbtn').click(function () {
    if (AddFeeValidation()) {
        debugger;
        $('#validationMessage').text('');
        $('#Update_SubmitvalidationMessage').text('');

        var StudentuserId = $("#Studentuseridspid").val();
        var FeeTerm = $('#ddlFeetermid').val();
        var FeeType = $('#ddlfeetype').val();
        var DiscountType = $("#Discount_TypeDDId").val();
        var DiscountAmount = $('#DiscountAmount_TXTID').val();
        var Quantity = $("#QuantityAmount_TxtID").val();
        var Feeamount = $("#FeeAmount_TxtID").val();
        var Duedate = $('#DueDate_TxtID').val();
        var Comments = $("#Comments_TxtID").val();
        var ChallanId = $("#Challan_DDId").val();
        var AcademicYearId = 1;

        var UpdateFee_SaveFeeData = {
            StudentuserId: StudentuserId,
            FeeTermId: FeeTerm,//FeeTermId
            FeeTypeId: FeeType,//FeeTypeId
            ConcedingTypeId: DiscountType,
            ConcedingAmount: DiscountAmount,
            Quantity: Quantity,
            FeeAmount: Feeamount,//Amount
            DueDate: Duedate, //Duedate
            Comments: Comments,
            AcademicYearId: AcademicYearId,
            ChallanId: ChallanId//ChallanId
        };
        $.ajax({

            //url: '/FeeSection/SaveFee_UpdateFee_ByTblUser',
           // url: '/FeeSection/Pfuuserfee_BulkUpdate',
            url: '/FeeSection/PFC_SaveFee_UpdateFee_ByTblUser',
            type: 'POST',
            data: UpdateFee_SaveFeeData,
            success: function (response) {
                debugger;

                if (response == "1") {
                    $('#Update_SubmitvalidationMessage').text('Record Inserted Succesfully');
                    Searchfeetermsbtnclickfunction(StudentuserId, null);
                } else if (response == "2") {
                    $('#Update_SubmitvalidationMessage').text('Record Updated Succesfully');
                    Searchfeetermsbtnclickfunction(StudentuserId, null);
                } else if (response == "3") {
                    $('#Update_SubmitvalidationMessage').text('User Already Fee payed, Record can not be Updated');
                } else if (response == "4") {
                    $('#Update_SubmitvalidationMessage').text('For User Already Fee set, Record can not be Updated');
                } else {

                }
            }

        });



    }
});

function AddFeeValidation() {

    debugger;
    $('#Update_SubmitvalidationMessage').text('');

    var buttonValue = $('#Addfeeuserbtn').val();

    var FeeTerm = $('#ddlFeetermid').val();
    var FeeType = $('#ddlfeetype').val();
    var DiscountType = $("#Discount_TypeDDId").val();
    var DiscountAmount = $('#DiscountAmount_TXTID').val();
    var Quantitytxtval = $("#QuantityAmount_TxtID").val();
    var Feeamount = $("#FeeAmount_TxtID").val();
    var Duedate = $('#DueDate_TxtID').val();

    var Update_SubmitvalidationMessage = "";
    var hasError = false;
    const selectedDate = new Date(Duedate);
    const currentdate = new Date();

    if (FeeTerm === "") {
        Update_SubmitvalidationMessage += "Please select Fee Term.<br>";
        hasError = true;
    }
    if (FeeType === "") {
        Update_SubmitvalidationMessage += "Please select Fee Type.<br>";
        hasError = true;
    }
    if (buttonValue == "Update") {
        debugger;
        if (DiscountType !== "") {
            var FeeTypedropdownText = $('#ddlfeetype option:selected').text();
            var FeeTermdropdownText = $('#ddlFeetermid option:selected').text();
            debugger;
            //const table = document.getElementById("Studentfeedetailstbl");
            const table = document.getElementById("Search_By_User_FeeTableData_Id");
            const rows = table.getElementsByTagName("tr");
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const feeTermCell = row.cells[1];
                const feeTypeCell = row.cells[2];
                const PaidAmountCell = row.cells[6];
                const feeTerm = feeTermCell.textContent.trim();
                const feeType = feeTypeCell.textContent.trim();
                //const PaidAmount = PaidAmountCell.textContent.trim();
                //const DueAmount = DueAmountCell.textContent.trim();

                if (feeTerm === FeeTermdropdownText && feeType === FeeTypedropdownText) {
                    const parsedDiscountAmount = parseInt(DiscountAmount);
                    const parsedPaidAmount = parseInt(PaidAmountCell.textContent);
                    if (PaidAmountCell.textContent.trim().toLowerCase() !== "nill") {
                        if (PaidAmountCell.textContent !== "") {
                            if (parseInt(DiscountAmount) - parseInt(DiscountAmount) >= parseInt(PaidAmountCell.textContent)) {
                                // Assuming drSelectedItem and dsSelectedItems are the corresponding variables
                                PaidAmountCell.textContent = DiscountAmount;
                            } else {
                                // Display the error message
                                //Update_SubmitvalidationMessage += "You cannot apply discount for this fee type.<br>";
                                //hasError = true;
                            }
                        }
                    }
                }
            }
        } else {
            // Display the error message
            Update_SubmitvalidationMessage += "Please select Discount Type.<br>";
            hasError = true;
        }
        if (DiscountAmount > Feeamount) {
            Update_SubmitvalidationMessage += "Discount Amount Should not be greater than Fee Amount.<br>";
            hasError = true;
        }
        if (Feeamount === "") {
            Update_SubmitvalidationMessage += "Please Enter Fee Amount.<br>";
            hasError = true;
        }
    } else if (buttonValue == "Submit") {

        if ($('#Quantitydivid').is(':visible')) {
            if (Quantitytxtval = "") {
                Update_validationMessage += "Please Enter Quantity.<br>";
                hasError = true;
            }
        }
        if (Duedate === "") {
            Update_SubmitvalidationMessage += "Please select DueDate.<br>";
            hasError = true;
        }
        if (selectedDate <= currentdate) {

            Update_SubmitvalidationMessage += "Due date should be greater than current date.<br>";
            hasError = true;
        }
        if (DiscountAmount > Feeamount) {
            Update_SubmitvalidationMessage += "Discount Amount Should not be greater than Fee Amount.<br>";
            hasError = true;
        }
    } else {
        $('#Errormessage').text('The button value is missing. Please check and verify, and try again. Button Value: ' + buttonValue);
    }

    if (hasError) {

        $('#validation').html("Following fields have invalid data :");
        $("#validationMessage").html(Update_SubmitvalidationMessage);

        return false; // Return false to prevent form submission

    } else {

        $("#SubmitvalidationMessage").html("");
        return true; // Return true to proceed with form submission
    }

}



function CommonClearfunction(Formid) {
    document.getElementById("Span_IconId_Quantity").style.display = "none";
    document.getElementById(Formid).reset(); // Reset the form   
    $('#Addfeeuserbtn').val('Submit').html('Submit');
    $('#validationMessage').text('');
    $('#validation').text('');
}


function Dltfunction() {
    $('#Update_SubmitvalidationMessage').text('');
    var StudentuserId = $("#Studentuseridspid").val();
    var FeeTerm = $('#ddlFeetermid').val();
    var FeeType = $('#ddlfeetype').val();
    //var DiscountType = $("#Discount_TypeDDId").val();
    //var DiscountAmount = $('#DiscountAmount_TXTID').val();
    //var Quantity = $("#QuantityAmount_TxtID").val();
    //var Feeamount = $("#FeeAmount_TxtID").val();
    //var Duedate = $('#DueDate_TxtID').val();
    //var Comments = $("#Comments_TxtID").val();
    var ChallanId = $("#Challan_DDId").val();

    if (FeeTerm === "") {
        $('#Update_SubmitvalidationMessage').text('Feeterm is required');
        return false;
    }
    if (FeeType === "") {
        $('#Update_SubmitvalidationMessage').text('Feetype is required');
        return false;
    }
    if (ChallanId === "") {
        $('#Update_SubmitvalidationMessage').text('Challanid is required');
        return false;        
    }

    var UpdateFee_SaveFeeData = {
        StudentuserId: StudentuserId,
        FeeTermId: FeeTerm,  //FeeTermId
        FeeTypeId: FeeType,  //FeeTypeId
        ChallanId: ChallanId //ChallanId
        //ConcedingTypeId: DiscountType,
        //ConcedingAmount: DiscountAmount,
        //Quantity: Quantity,
        //FeeAmount: Feeamount,//Amount
        //DueDate: Duedate, //Duedate
        //Comments: Comments,
        //AcademicYearId: AcademicYearId,
        
    };
  
    handleAjax('POST', '/FeeSection/PFUC_Terms_Delte', { data: UpdateFee_SaveFeeData },
        function (response) {

            if (response == "1") {

                $('#Update_SubmitvalidationMessage').text('Fee not set to user.');
            } else if (response == "2") {
        
                Searchfeetermsbtnclickfunction(StudentuserId, null);
                $('#Update_SubmitvalidationMessage').text('Deleted succesfully.');
            }
            loaddingimg.css('display', 'none');

        }, function (status, error) {
            loaddingimg.css('display', 'none');
        }, false);

    //$.ajax({
    //        url: '/FeeSection/PFUC_Terms_Delte?InstanceId=' + InstanceId + "&UserId=" + UserId + "&TermId=" + TermId + "&TypeId=" + TypeId + "&ChallanId=" + ChallanId,
    //        type: 'POST',         
    //        success: function (response) {

    //            if (response == "1") {

    //                $('#Update_SubmitvalidationMessage').text('Fee not set to user.');
    //            } else if (response == "2") {
    //                var userId = $("#userIdTextBox").val();
    //                table_SearchByUser_FeeDues(userId);
    //                $('#Update_SubmitvalidationMessage').text('Deleted succesfully.');
    //            }

    //        }
    //    });

}