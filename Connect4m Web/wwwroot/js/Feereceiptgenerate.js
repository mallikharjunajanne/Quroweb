
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

$(document).ready(function () {
    debugger;
    CommonDropdownFunction("GET", "/Attendance/DepartmentsDropdown_Caliingfunction", "DdlDepartment", "Select a Department", false)
     $('#Userdetailstablediv').hide();
    $('#Feetermdetailsdiv').hide();
    $('#Challana_Usersdivid').hide();
});

function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    debugger;
    CallToAjax('GET', url,
        function (response) {

            debugger;
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
    debugger;
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



$('#Generatefeereceiptform').submit(function () {
    $("#Errormessage").text('');

    event.preventDefault();
    event.stopImmediatePropagation();
    //var attributeval = $(this).val();

    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            var InstanceClassificationId = $('#DdlDepartment').val();
            var InstanceSubClassificationId = $('#DdlClass').val();
            var footerAdded = false;

            var Data_Formdata = $('#Generatefeereceiptform').serialize();
            var url = "/FeeSection/GenerateFeeReceipt?InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId;
           
            handleAjax('POST', url, null,
                function (response) {
                    debugger;
                    var footerAdded = $('table').data('footerAdded');
                    $('#Userdetailstablediv').show();
                    $('#Feetermdetailsdiv').hide();
                    $('#Challana_Usersdivid').hide();
                                    
                    var CountTabledata = response.length;
                    $('#TableCount').text(CountTabledata);

                    var table = $('#FeeRecipt_Table');
                    var tbody = table.find('tbody');


                    tbody.empty();
                    $.each(response, function (index, bacTable) {
                        var row = $('<tr></tr>');
                        var cell1 = $('<td class="editable-cell"></td>').css({
                            'cursor': 'pointer',
                            'text-align': 'center'
                        });
                        var userId = bacTable.userId;
                        var checkboxId = 'checkbox_' + userId; 
                        var checkbox = $('<input type="checkbox"/>')
                            .attr('id', checkboxId) 
                            .attr('value', userId)
                            .prop('name', 'selectedUserIds[]')
                            .addClass('user-checkbox') 
                            .css({
                                'width': '20px',
                                'height': '20px',
                            });

                        cell1.append(checkbox);
                        var cell2 = $('<td></td>').text(bacTable.firstName);
                        var cell3 = $('<td></td>').text(bacTable.classificationName);
                        var cell4 = $('<td></td>').text(bacTable.subClassificationName);

                        // Append the cells to the row
                        row.append(cell1);
                        row.append(cell2);
                        row.append(cell3);
                        row.append(cell4);

                        $('table tbody').append(row);
                    });


                    if (!footerAdded) {
                        var footerRow = $('<tr></tr>');

                        var goToStep2Button = $('<button></button>').text('Go to Step 2').addClass('go-to-step2-button btn btn-success waves-effect waves-light');
                       
                        var colspan = 4;
                        var centeredCell = $('<td align="center" colspan="' + colspan + '"></td>').append(goToStep2Button);
                        footerRow.append(centeredCell);

                        $('table tfoot').append(footerRow);
                        $('table').data('footerAdded', true);
                    }
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    debugger;
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                },
                true
            );
        }
    }, 50);
});

function checkAllCheckboxes(checked) {
    debugger;
    $('.user-checkbox').prop('checked', checked);
}

// Click event for the "Check All" checkbox
$('#CheckAll_UserIds').click(function () {
    debugger;
    var checked = $(this).prop('checked');
    $('.user-checkbox').prop('checked', checked);
   // checkAllCheckboxes(checked);
});


// Click event for the "Go to Step 2" button
$('table').on('click', '.go-to-step2-button', function () {
    debugger;

    var selectedUserIds = [];

    if ($('.user-checkbox:checked').length === 0) {
        window.scroll(0, 0);
        $('#Feetermdetailsdiv').hide();
        $('#Challana_Usersdivid').hide();

        $('#Errormessage').text('Please Select Atleast one Student to Generate Challan for Fee.');
        return;
    }
    $('#Errormessage').text('');

    //FeeTerms_dropdown_Function();
    //sendFeeType_BY_FeeTermSelectedValue();
    feetermdropdownfunction();

    $('#ErrorMessageChallana_SpanId').text('');

    $('.user-checkbox:checked').each(function () {
        selectedUserIds.push($(this).val());
    });

    // Call the AJAX function to pass the selected user IDs to the Chalan_genarat method
    chalanGenerate(selectedUserIds);
});
function chalanGenerate(userIds) {
    debugger;    
    $('#Feetermdetailsdiv').show();
    console.log("Selected User IDs:", userIds);
    var selectedUserIdsValues = userIds;
}

function feetermdropdownfunction(){
    fetchDataAndPopulateDropdown(                           //==== << ** FeeTerms Dropdown ** >>
        '/FeeSection/GenerateFeeReceipt_New_FeeTerms_DD',          // URL for data fetching
        '#Ddlfeetermid',                                           // Dropdown selector
        'value',                                                   // Field name for option text
        'text',                                                    // Field name for option values
        'manageClassification'                                     // Response value return class name
    );
}

$('#Ddlfeetermid').change(function () {
    debugger;
    var InstanceClassificationdropdownValue = document.getElementById("Ddlfeetermid");
    var selecteValue = InstanceClassificationdropdownValue.value;
    var selectedValuesArray = Array.isArray(selecteValue) ? selecteValue : [selecteValue];

    var commaSeparatedValues = selectedValuesArray.join(',');
    Dropdownfunction(commaSeparatedValues);
});
function Dropdownfunction(selectedValuesArray) {
    $.ajax({
        url: '/FeeSection/GenerateFeeReceipt_New_FeeType_DD?FeeTermIds=' + selectedValuesArray,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#Ddlfeetype';
            var dropdown = $(dropdownSelector);
            var valueField = 'value';
            var textField = 'text';
            dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });
}


$('#feeChallanForm').submit(function () {
    $("#Errormessage").text('');

    event.preventDefault();
    event.stopImmediatePropagation();    

    setTimeout(function () {
        debugger;
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');          

            FeeTypeIds = $('#Ddlfeetype').val();
            FeeTermId = $('#Ddlfeetermid').val();
            debugger;
            //var formData = new FormData(this);
            var selectedUserIds = [];
            $('input.user-checkbox:checked:not(.user-checkbox[value="on"])').each(function () {
                selectedUserIds.push($(this).val());
            });

             var url = '/FeeSection/GenerateFeeReceipt_New_Users_Challan_Result_Tbl?FeeTypeIds=' + FeeTypeIds + '&FeeTermId=' + FeeTermId + '&UserIds=' + selectedUserIds;

            handleAjax('POST', url, null,
                function (response) {
                    debugger;
                    $('#Challana_Usersdivid').show();
                    var ChallanaCount = response.length;

                    $('#Challan_Count_SPID').text(ChallanaCount);

                    if (ChallanaCount > 0) {
                        $('#ErrorMessageChallana_SpanId').text('Challan is already generated for below user(s).');

                    } else if (ChallanaCount == 0) {
                        $('#Challana_Usersdivid').hide();
                        $('#ErrorMessageChallana_SpanId').text('Fees Haven' + "'" + 't scheduled for selected user(s).');
                    }

                    var table = $('#Challan_CreatedUserS_Tbl');
                    var tbody = table.find('#Challan_CreatedUserS_TblBody');

                    $('#validation2GFCS').text('');
                    $('#validationMessageGFCS').text('');

                    tbody.empty();
                    $.each(response, function (index, dataEntry) {
                        var row = $('<tr></tr>');

                        // Create table cells for each column and populate them with data
                        var cell1 = $('<td></td>').text(dataEntry.firstName);
                        var cell2 = $('<td></td>').text(dataEntry.termName);
                        var cell3 = $('<td></td>').text(dataEntry.feeType);
                        var cell4 = $('<td></td>').text(parseFloat(dataEntry.amount).toFixed(2));                        
                        var cell5 = $('<td></td>').text(dataEntry.userReceiptGenerationID).css('font-weight', 'bold');

                        // Append the cells to the row
                        row.append(cell1);
                        row.append(cell2);
                        row.append(cell3);
                        row.append(cell4);
                        row.append(cell5);

                        // Append the row to the table body
                        tbody.append(row);
                    });
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    debugger;
                    console.error("Error fetching data:", error);
                    loaddingimg.css('display', 'none');
                },
                true
            );
        }
    }, 50);
});


