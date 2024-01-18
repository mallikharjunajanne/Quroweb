function CallToAjax_Withoutdata(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}


function CallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}



$(document).ready(function () {
    $('#Paymentoptionchangediv').hide();

    ///-----------******* DROPDOWN FUNCTION CODE START
    fetchDataAndPopulateDropdown(
        '/Reports/Gettermnamesdd',         // URL for data fetching
        '#Termnamedd',                     // Dropdown selector
        'feeTermId',                       // Field name for option values
        'termName',                        // Field name for option text
        'termnames'                        // Response value return class name
    );


});


function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    debugger;
    CallToAjax_Withoutdata('GET', url,
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
    //dropdown.empty(); // Clear existing options
    //dropdown.append($('<option>', {
    //    value: '',
    //    text: '---Select---'
    //}));
    $.each(data, function (index, item) {
        dropdown.append($('<option>', {
            value: item[valueField],
            text: item[textField]
        }));
    });
}


$("#Btnsearch").click(function () {
    debugger;

    var formData = $('#Feedetailform').serialize();
    var Termids=$('#Termnamedd').val();
    var url = "/Reports/ClassificationWiseFeeDetails";
    CallToAjax('GET', url, formData,
        function (response) {
            var Responselist = response.mainlist;
            var FeeAmount = response.feeAmount;
            var FeeCollected = response.feeCollected;
            var Discount = response.discount;
            var Due = response.due;
            $('#Feesummarytblamountcountspid').text('Fee Amount(DR):' + FeeAmount + '  Fee Collected:' + FeeCollected + '  Discount:' + Discount + '  Due:' + Due);

            var RemoveElement = $(event).closest('tr').next('tr').find('td[colspan="7"]').closest('tr').remove();
            if (RemoveElement.length > 0) {

            } else {
                var headernames = [];
                headernames.push("Department", "Fee Amount(DR)", "Discount", "Fee Collected(CR)", "Due(DR)");

                var columnnames = [];
                columnnames.push("classificaitionName", "instanceClassificaitionId", "amountSet", "discount", "amountPaid", "balance");

                bindorganisationfeesummary(Responselist, headernames, columnnames, "#Feesummarytbls", null, null, "SubClassificationWiseFeeDetailsfun", 2, Termids);
            }
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
});


function SubClassificationWiseFeeDetailsfun(InstanceClassificationId, termIds, event) {
    debugger;
    var requestData = {
        SubClassificationId: InstanceClassificationId,
        FeeTermId: termIds
    };

    var url = "/Reports/SubclassificaitionWiseFeeDetails";
    CallToAjax('GET', url, requestData,
        function (response) {

            var removedElement = $(event).closest('tr').next('tr').find('td[colspan="6"]').closest('tr').remove();
            var RemoveElement = $(event).closest('tr').next('tr').find('td[colspan="7"]').closest('tr');
            if (removedElement.length > 0) {
                //removedElement.remove();
            } else {
                var headernames = [];
                headernames.push("Class", "Fee Amount(DR)", "Discount", "Fee Collected(CR)", "Due(DR)");

                var columnnames = [];
                columnnames.push("subClassificaitionName", "instanceSubClassificaitionId", "subClassificaitionAmountSet", "subClassificaitiondiscount", "subClassificaitionAmountPaid", "subClassificaitionBalance");

                bindorganisationfeesummary(response, headernames, columnnames, null, event, null, 'Userwisefeedetailsfun', 2, termIds);
            }
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
}

function Userwisefeedetailsfun(InstanceClassificationId, termIds, event) {
    debugger;
    var requestData = {
        SubClassificationId: InstanceClassificationId,
        FeeTermId: termIds
    };
    var url = "/Reports/GetUserWiseFeeDetails";
    CallToAjax('GET', url, requestData,
        function (response) {
            var removedElement = $(event).closest('tr').next('tr').find('td[colspan="6"]').closest('tr').remove();
            if (removedElement.length > 0) {
                
            } else {
                var headernames = [];
                headernames.push("Student Name", "Fee Amount(DR)", "Discount", "Fee Collected(CR)", "Due(DR)");

                var columnnames = [];
                columnnames.push("name", "userId", "studentAmountSet", "studentDiscountAmount", "studentCollectedAmount", "studentBalance");

                bindorganisationfeesummary(response, headernames, columnnames, null, event, null, 'ChallanGeneratedDetails', 2, termIds);
            }
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
}


function ChallanGeneratedDetails(UserId, termIds, event) {
    debugger;
    var requestData = {
        UserId: UserId,
        FeeTermId: termIds
    };
    var url = "/Reports/GetChallangenerateddetails";
    CallToAjax('GET', url, requestData,
        function (response) {
            debugger;
            var removedElement = $(event).closest('tr').next('tr').find('td[colspan="6"]').closest('tr').remove();
            if (removedElement.length > 0) {
               
            } else {
                var Resp = response[0].challangenerateddetailstbl1;
                var headernames = [];
                headernames.push("Term", "Fee Type", "Fee Amount(DR)", "Discount", "Fee Collected(CR)", "Due(DR)");

                var columnnames = [];
                columnnames.push("termName", "feeType", "feeAmount", "concedingAmount", "payedAmoount", "dueAmount");

                bindorganisationfeesummary(Resp, headernames, columnnames, null, event, null, null, 1, termIds);
            }
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
}


function bindorganisationfeesummary(response, headernames, columnnames, appendid, event, bcolor, onclickfun, startcolunmnindex, Termids) {
    debugger;
    // try {

    if (response.length > 0) {

        loaddingimg.css('display', 'block');
        var maintable = '<table class="table table-hover table-bordered" >';
        if (bcolor) {
            maintable += '<thead  style="background-color:' + bcolor + '" ><tr>';
        }
        else {
            maintable += '<thead class="table-dark"  ><tr>';

        }
        for (var i = 0; i < headernames.length; i++) {
            maintable += "<th>" + headernames[i] + "</th>";
        }
        maintable += "</tr></thead><tbody>";
        for (var i = 0; i < response.length; i++) {
            debugger;
            maintable += '<tr><td class="appendinsidetable" onclick="' + onclickfun + '(\'' + response[i][columnnames[1]] + '\',\'' + Termids + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + response[i][columnnames[0]] + ' <input type="text" value="' + response[i][columnnames[1]] + '" hidden style="display:none" readonly /></td>';

            for (var j = startcolunmnindex; j < columnnames.length; j++) {

                maintable += '<td>' + response[i][columnnames[j]] + '</td>';
            }
            maintable += '</tr>';
        }

        maintable += '</tbody></table>';

        if (appendid) {
            $(appendid).html(maintable);
        } else {
            $(event).closest('tr').after("<tr><td colspan='6'>" + maintable + "</td></tr>");
        }
    }

    loaddingimg.css('display', 'none');
    //} catch {
    //    loaddingimg.css('display', 'none');
    //    alert("error");
    //}

}
