

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


$(document).ready(function () {
    $('#Paymentoptionchangediv').hide();

    ///-----------******* DROPDOWN FUNCTION CODE START
    fetchDataAndPopulateDropdown(
        '/Reports/Classification_DD',         // URL for data fetching
        '#FddlDepartment',                    // Dropdown selector
        'instanceSubclassificaitionId',       // Field name for option values
        'subClassificationName',              // Field name for option text
        'subclassificationlist'               // Response value return class name
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


$("#Btnsearch").click(function () {
    debugger;

    var Subclassificationid = $('#FddlDepartment').val();
    var FirstName = $('#Firstnametxtid').val();
    var LastName = $('#Lastnametxtid').val();
    var StudentId = $('#Studentidtxtid').val();
    var onlyDuesValue = $('#Onlydues').is(':checked') ? 1 : 0;
    var requestData = {
        SubClassificationId: Subclassificationid,
        FirstName: FirstName,
        LastName: LastName,
        StudentId: StudentId,
        Due: onlyDuesValue
    };
    var url = "/Reports/ChallandetailsTermwise_tbldata";
    CallToAjax('GET', url, requestData,
        function (response) {
            debugger;
            $("#Userwisepaymenttabldiv1").html(response);
            //bindDatatable(response);
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
});


function GetFeeinstallmentsfeedetailsbyuserid(UserId,event) {  
    var url = "/Reports/Getstatement_Termwisedetails";
    var requestData = {
        TfUserId: UserId
    };
    CallToAjax('GET', url, requestData,
        function (response) {
            debugger;
            
            //bindorganisationfeesummary(response, event);
            $(event).closest('tr').after("<tr><td colspan='7'>" + response + "</td></tr>");
        
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
}


function bindorganisationfeesummary(response,  event) {
    debugger;
    // try {

    //if (response.length > 0) {

    //    loaddingimg.css('display', 'block');
    //    var maintable = '<table class="table table-hover table-bordered" >';
    //    //if (bcolor) {
    //    //    maintable += '<thead  style="background-color:' + bcolor + '" ><tr>';
    //    //}
    //    //else {
    //    //    maintable += '<thead class="table-dark"  ><tr>';

    //    //}
    //    //for (var i = 0; i < headernames.length; i++) {
    //    //    maintable += "<th>" + headernames[i] + "</th>";
    //    //}
    //    maintable += "</tr></thead><tbody>";
    //    //for (var i = 0; i < response.length; i++) {
    //    //    debugger;
    //    //    maintable += '<tr><td class="appendinsidetable" onclick="' + onclickfun + '(\'' + response[i][columnnames[1]] + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + response[i][columnnames[0]] + ' <input type="text" value="' + response[i][columnnames[1]] + '" hidden style="display:none" readonly /></td>';

    //    //    for (var j = startcolunmnindex; j < columnnames.length; j++) {

    //    //        maintable += '<td>' + response[i][columnnames[j]] + '</td>';
    //    //    }
    //    //    maintable += '</tr>';
    //    //}

    //    maintable += '</tbody></table>';

        //if (appendid) {
        //    $(appendid).html(maintable);
        //} else {
        $(event).closest('tr').after("<tr><td colspan='6'>" + response + "</td></tr>");
        //}
  //  }
    loaddingimg.css('display', 'none');
    //} catch {
    //    loaddingimg.css('display', 'none');
    //    alert("error");
    //}

}


var windowOpened = false;

function Getviewreport(userReceiptGenerationID, userID) {
    event.stopImmediatePropagation();

    var url = '/Reports/ViewReceiptInvoiceTermwise?FUserId=' + userID + '&ChallanId=' + userReceiptGenerationID;

    if (!windowOpened) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (response) {
                debugger;
                var newWindow = window.open();
                newWindow.document.write(response);
                newWindow.focus();
            },
            error: function (xhr, status, error) {

            }
        });

        windowOpened = true; // Set the flag to true after opening the window
    }
}

