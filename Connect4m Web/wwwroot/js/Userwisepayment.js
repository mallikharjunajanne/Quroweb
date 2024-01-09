
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
    var url = "/Reports/userwisepayment_tbldata";
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


function Feestatementbyuserid(Userid, StudentUserName) {
    debugger;
    $.ajax({
        url: '/Reports/userwisepaymentdetailstbldata?FUserid=' + Userid + "&StudentUserName=" + StudentUserName,
        type: 'GET',
        success: function (response) {
            if (response != 0) {
                $('#PayementdetailsSearchpagemaindiv').hide();
                $('#Userwisepaymenttabldiv1').hide();
                $('#Installmentfeedetailsbyuseriddiv2').html(response);
            } else {
                $('#PayementdetailsSearchpagemaindiv').show();
                $('#Userwisepaymenttabldiv1').show();
               //$('#Installmentfeedetailsbyuseriddiv2').hide();
            }            
        },
        error: function (xhr, status, error) {

        }
    });
}

$("#PaymentdetailsBacktosearchbtn").click(function () {
    debugger;
    $('#Errormessagespid').text('');
    $('#PayementdetailsSearchpagemaindiv').show();
    $('#Userwisepaymenttabldiv1').show();
    $('#Installmentfeedetailsbyuseriddiv2').empty(); // Ensure to call the hide() function
});


//====>>>>Delete Fee Challan Details
$(document).on('click', '#Installmentfeedetailstblid .delete-icon', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var Userid = $(this).closest('tr').find('span').attr('value');
    var userpaymentdate = $(this).closest('tr').find('span').attr('title');
    var paymentUserName = $(this).closest('tr').find('span').attr('name');
   // Deleteuserchallan(Userid, paymentdate, paymentUserName);
    Deleteuserchallan(Userid, userpaymentdate);
})


function Deleteuserchallan(Userid, userpaymentdate) {
    try {
        debugger;
        var formattedDate = formatDate(userpaymentdate);
        
        var url = "/Reports/Deletepaymentdatewise";
        var requestData = {
            PaymentUserid: Userid,
            paymentdate: formattedDate
        };

        CallToAjax('GET', url, requestData,
            function (response) {
                debugger;
                if (response == "1") {
                    $('#Errormessagespid').text('Record deleted successfully.');
                    Feestatementbyuserid(Userid)
                } else {
                    $('#Errormessagespid').text('Record was not deleted.');
                }
            },
            function (status, error) {
                console.error("Error fetching data:", error);
            }
        );
    } catch (error) {
        return;
        console.error("An error occurred:", error);
    }
}


///=====>>>>Date change Function
function formatDate(inputDate) {
  
    var parts = inputDate.split('/');

   
    var formattedDate = new Date(parts[2], parts[1] - 1, parts[0]);

  
    var year = formattedDate.getFullYear();
    var month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    var day = formattedDate.getDate().toString().padStart(2, '0');

   
    var formattedDateTime = year + '-' + month + '-' + day + ' 00:00:00';

    return formattedDateTime;
}


function FeestatementDetailsbyuserid(Challanaid, Amount, createddate) {
    debugger;
    $('#Paymentoptionchangediv').show();
    $('#ChallanaIdsptxtid').text(Challanaid);
    $('#Amounttxt').val(Amount);

    //var parts = createddate.split('/');
    //var formattedDate = parts[2] + '-' + parts[0].padStart(2, '0') + '-' + parts[1].padStart(2, '0');


    var currentDate = new Date();
    var formattedDate = currentDate.toISOString().split('T')[0];
    $('#Paymentdatetxt').val(formattedDate);


    ///-----------******* DROPDOWN FUNCTION CODE START
    fetchDataAndPopulateDropdown(
        '/Reports/Paymenttype_DD',         // URL for data fetching
        '#PaymentModedd',                  // Dropdown selector
        'paymentModeId',                   // Field name for option values
        'mode',                            // Field name for option text
        'paymentmodeddlist'                // Response value return class name
    );

}


