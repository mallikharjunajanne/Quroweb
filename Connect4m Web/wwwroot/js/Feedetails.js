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
    
    fetchDataAndPopulateDropdown(
        '/Reports/Gettermnamesdd',            // URL for data fetching
        '#lstTerms',                          // Dropdown selector
        'termId',                             // Field name for option values
        'termName',                           // Field name for option text
        'termnames'                           // Response value return class name
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
    debugger;
    var dropdown = $(dropdownSelector); 
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
    var Termids = $('#lstTerms').val();
    var url = "/Reports/ClassificationWiseFeeDetails";
    CallToAjax('GET', url, formData,
        function (response) {
            debugger;
            var Responselist = response.mainlist;
            var FeeAmount = response.feeAmount;
            var FeeCollected = response.feeCollected;
            var Discount = response.discount;
            var Due = response.due;

            if (Responselist.length != 0) {
                $('#Feesummarytblamountcountspid').text('Fee Amount(DR):' + FeeAmount + '  Fee Collected:' + FeeCollected + '  Discount:' + Discount + '  Due:' + Due);
            }
            var RemoveElement = $(event).closest('tr').next('tr').find('td[colspan="7"]').closest('tr').remove();
            if (RemoveElement.length > 0) {

            } else {
                var headernames = [];
                headernames.push("Department", "Fee Amount(DR)", "Discount", "Fee Collected(CR)", "Due(DR)");

                var columnnames = [];
                columnnames.push("classificaitionName", "instanceClassificaitionId", "amountSet", "discount", "amountPaid", "balance");

                 bindorganisationfeesummary(Responselist, headernames, columnnames, "#Feesummarytbls", null, null, "SubClassificationWiseFeeDetailsfun", 2, Termids); //Main Code
                }
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
});
function bindorganisationfeesummary(response, headernames, columnnames, appendid, event, bcolor, onclickfun, startcolunmnindex, Termids) {
    debugger;
    if (response.length > 0) {
        loaddingimg.css('display', 'block');
        var maintable = '<table id="Feetbldata" class="table table-hover table-bordered" >';
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
           // maintable += '<tr><td class="appendinsidetable" onclick="' + onclickfun + '(\'' + response[i][columnnames[1]] + '\',\'' + Termids + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + response[i][columnnames[0]] + ' <input type="text" value="' + response[i][columnnames[1]] + '" hidden style="display:none" readonly /></td>';
            maintable += '<tr><td class="appendinsidetable" onclick="' + onclickfun + '(\'' + response[i][columnnames[1]] + '\',\'' + Termids + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + response[i][columnnames[0]] + '</td>';

            for (var j = startcolunmnindex; j < columnnames.length; j++) {
                maintable += '<td>' + response[i][columnnames[j]] + '</td>';
            }
            maintable += '</tr>';
        }
        maintable += '</tbody></table>';
        if (appendid) {
            $(appendid).html(maintable);
        }
        else {
            $(event).closest('tr').after("<tr><td colspan='6'>" + maintable + "</td></tr>");
        }
    }
    loaddingimg.css('display', 'none');
}
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
               // bindOrganisationFeeSummaryUserWiseFeeDetails(response, headernames, columnnames, null, event, null, 'Userwisefeedetailsfun', 2, termIds);
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
                //bindOrganisationFeeSummaryUserWiseFeeDetails(response, headernames, columnnames, null, event, null, 'ChallanGeneratedDetails', 2, termIds);
            }
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
}1
function ChallanGeneratedDetails(UserId, termIds, event) {
    debugger;
    var requestData = {
        StudentUserid: UserId,
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
                if (Resp.length != 0) {
                    // return;

                    var headernames = [];
                    headernames.push("Term", "Fee Type", "Fee Amount(DR)", "Discount", "Fee Collected(CR)", "Due(DR)","");

                    var columnnames = [];
                    columnnames.push("termName", "feeType", "feeAmount", "concedingAmount", "payedAmount", "dueAmount","displayIcon1");

                    bindorganisationfeesummaryuserwisefeedetails(Resp, headernames, columnnames, null, event, null, null, 1, termIds, UserId);
                }
            }
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
}
function bindorganisationfeesummaryuserwisefeedetails(response, headernames, columnnames, appendid, event, bcolor, onclickfun, startcolunmnindex, Termids, UserId) {
    debugger;
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
            //maintable += '<tr><td class="appendinsidetable" onclick="' + onclickfun + '(\'' + response[i][columnnames[1]] + '\',\'' + Termids + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + response[i][columnnames[0]] + ' <input type="text" value="' + response[i][columnnames[1]] + '" hidden style="display:none" readonly /></td>';
            maintable += '<tr><td class="appendinsidetable" onclick="' + onclickfun + '(\'' + response[i][columnnames[1]] + '\',\'' + Termids + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + response[i][columnnames[0]] + '</td>';

            for (var j = startcolunmnindex; j < 6; j++) {
                maintable += '<td>' + response[i][columnnames[j]] + '</td>';

            }
            if (response[i][columnnames[6]] === "1") {
                maintable += '<td><span onclick="feedetailslnk(\'' + UserId + '\',\'' + response[i]['feeTermId'] + '\', \'' + response[i]['userfeeid'] + '\', this)">🔍</span></td>'; 
            }
            else {
                maintable += '<td> </td>'; // Empty cell if displayIcon1 is not 1
            }
            maintable += '</tr>';
        }
        maintable += '</tbody></table>';

        if (appendid) {
            $(appendid).html(maintable);
        }
        else {
            $(event).closest('tr').after("<tr><td colspan='6'>" + maintable + "</td></tr>");
        }
    }
    loaddingimg.css('display', 'none');

}
function feedetailslnk(Studentuserid, Feetermids, UserFeeId1) {
    debugger;
    var requestData = {
        StudentUserid: Studentuserid,
        FeeTermId: Feetermids,
        UserFeeId1: UserFeeId1
    };
    CallToAjax('GET', "/Reports/GetFeeDetialsByUserFeeId", requestData,
        function (response) {
            debugger;
            var Resp = response;
            var RespCount = Resp.length;
            if (Resp.length != 0) {
                var newWindow = window.open('', 'TableWindow', 'width=800,height=600');
                newWindow.document.write(`<html><head><style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                }
                table {
                    border-collapse: collapse;
                    width: 80%;
                    margin: 20px auto;
                }
                th {
                    background-color: brown;
                    color: white;
                    font-weight: bold;
                    padding: 8px;
                    text-align: left;
                }
                td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #e5e5e5;
                }
               
                .left, .center, .right {
                    width: 33.33%;
                }
                .WhiteLabel {
                    color: white;
                }
            </style>
        </head>
        <body>
            <table border="1">
                <thead>
                    <tr style="color: white;font-weight: bold;padding: 5px;text-align: left;background-color: brown;font-size: 9px;">
                       <td colspan="12" style="border-top-left-radius: 15px;border-top-right-radius: 15px;background-color:cadetblue;">
                              <span id="lblNumRecords" style="color:black;" class="WhiteLabel">Your Search resulted ${RespCount} Record(s).</span>
                        </td>
                     </tr>
                     <tr>
                        ${["S.No", "Fee Term", "Fee Type", "Challan No", "Paid Amt", "Paid On", "Collected By", "Payment Mode", "Account Number", "Bank Name", "Comments", "Description"].map(header => `<th  style="color: white;font-weight: bold;padding: 5px;text-align: left;font-size: 9px;background-color: brown;">${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </body>
    </html>
    `);

                var tbody = newWindow.document.querySelector('tbody');
                var counter = 1; // Initialize counter for S.No
                Resp.forEach(function (data) {
                    var row = `<tr style="color: black;font-weight: bold;padding: 5px;text-align: left;font-size: 9px;">
                        <td>${counter}</td>
                        <td>${data.termName}</td>
                        <td>${data.feeType}</td>
                        <td>${data.installmentId}</td>
                        <td>${data.payedAmount}</td>
                        <td>${data.paymentdate}</td>
                        <td>${data.collectedby}</td>
                        <td>${data.paymentmode}</td>
                        <td>${data.accountNumber}</td>
                        <td>${data.bankName}</td>
                        <td>${''}</td>
                        <td>${''}</td>
                    </tr>`;
                    tbody.innerHTML += row;
                    counter++; // Increment counter for next row
                });

                newWindow.document.close();
            }
        },
        function (status, error) {
            console.error("Error fetching data:", error);
        }
    );
}

$(document).on('click', '#Exporttoexcellnk', function () {

    debugger;
    var table1 = document.getElementById("Feetbldata");
    var table1Clone = table1.cloneNode(true);

    var headers = table1Clone.getElementsByTagName("th");
    for (var i = 0; i < headers.length; i++) {
        headers[i].style.border = "1px solid black";   
        headers[i].style.backgroundColor = "lightblue";
        headers[i].style.padding = "15px";             
    }

    //var cells = table1.getElementsByTagName("td");
    var cells = table1Clone.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        debugger;
        cells[i].style.width = "180px";
        cells[i].style.border = "1px solid black";   
        cells[i].style.backgroundColor = "#f2f2f2";  
        cells[i].style.padding = "8px";              
    }

    debugger;
    //var combinedHtml = table1Clone.outerHTML;
    //const blob = new Blob([combinedHtml], { type: 'application/vnd.ms-excel' });
    //saveAs(blob, 'Fee Details.xls');
    //table1.parentNode.replaceChild(table1Clone, table1);

    var combinedHtml = table1Clone.outerHTML;

    // Adding necessary HTML tags for Excel file
    var htmlToExport = `
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        table { border-collapse: collapse; }
                        th, td { border: 1px solid black; padding: 8px; }
                        th { background-color: lightblue; }
                        td { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    ${combinedHtml}
                </body>
                </html>
            `;

    const blob = new Blob([htmlToExport], { type: 'application/vnd.ms-excel' });
    saveAs(blob, 'Fee Details.xls');
});



///////=======>>>>>> DATA TABLE CODE  IN CASE TO WRITE IN DATATABLE BY
//$("#Btnsearch_").click(function () {
//    debugger;
//    var formData = $('#Feedetailform').serialize();
//    var Termids = $('#lstTerms').val();
//    var url = "/Reports/ClassificationWiseFeeDetails";
//    CallToAjax('GET', url, formData,
//        function (response) {
//            debugger;
//            var Responselist = response.mainlist;
//            var FeeAmount = response.feeAmount;
//            var FeeCollected = response.feeCollected;
//            var Discount = response.discount;
//            var Due = response.due;
//            $('#Feesummarytblamountcountspid').text('Fee Amount(DR):' + FeeAmount + '  Fee Collected:' + FeeCollected + '  Discount:' + Discount + '  Due:' + Due);

//            var headernames = ["Department", "Fee Amount(DR)", "Discount", "Fee Collected(CR)", "Due(DR)"];
//            var columnnames = ["classificaitionName", "instanceClassificaitionId", "amountSet", "discount", "amountPaid", "balance"];

//            bindMainTable(Responselist, headernames, columnnames, "#Feesummarytbls", Termids);
//        },
//        function (status, error) {
//            console.error("Error fetching data:", error);
//        }
//    );
//});
//function bindMainTable(response, headernames, columnnames, appendid, Termids) {
//    if (response.length > 0) {
//        debugger;
//        // Show loading image if applicable
//        loaddingimg.css('display', 'block');

//        // Clear previous DataTable if it exists
//        if ($.fn.DataTable.isDataTable(appendid)) {
//            $(appendid).DataTable().destroy();
//        }

//        // Clear the HTML content inside appendid
//        $(appendid).empty();

//        // Create the table header
//        var table = $('<table>').addClass('table table-hover table-bordered display nowrap').attr('id', 'MainTable');
//        var thead = $('<thead>');
//        var theadRow = $('<tr>');

//        // Append headers with optional background color
//        for (var i = 0; i < headernames.length; i++) {
//            theadRow.append('<th>' + headernames[i] + '</th>');
//        }
//        thead.append(theadRow);
//        table.append(thead);

//        // Append the table to the container
//        $(appendid).append(table);

//        // Initialize DataTable with options
//        $('#MainTable').DataTable({
//            data: response,
//            columns: headernames.map((header, index) => {
//                return {
//                    data: columnnames[index],
//                    title: header,
//                    render: function (data, type, row, meta) {
//                        if (index === 0) { // Assuming the first column needs onclick event
//                            return '<span class="appendinsidetable" onclick="_SubClassificationWiseFeeDetailsfun(\'' + row[columnnames[1]] + '\',\'' + Termids + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + data + '<input type="text" value="' + row[columnnames[1]] + '" hidden style="display:none" readonly /></span>';
//                        } else {
//                            return data;
//                        }
//                    }
//                };
//            }),
//            dom: 'Bfrtip',
//            buttons: [
//                'copy', 'csv', 'excel', 'pdf', 'print'
//            ],
//            scrollX: true,
//            scrollY: '400px',
//            scrollCollapse: true,
//            paging: true,
//            pageLength: 10,
//            bSort: true,
//            bFilter: false,
//        });

//        if (!appendid) {
//            $(appendid).html(table);
//        }
//        else {
//            $(event).closest('tr').after("<tr><td colspan='6'>" + table + "</td></tr>");
//        }

//        // Hide loading image if applicable
//        loaddingimg.css('display', 'none');
//    }
//}
//function _SubClassificationWiseFeeDetailsfun(InstanceClassificationId, termIds, element) {
//    debugger;
//    var requestData = {
//        SubClassificationId: InstanceClassificationId,
//        FeeTermId: termIds
//    };

//    var url = "/Reports/SubclassificaitionWiseFeeDetails";
//    CallToAjax('GET', url, requestData,
//        function (response) {
//            // Remove existing expanded rows if any
//            var removedElement = $(element).closest('tr').next('tr').find('td[colspan="6"]').closest('tr').remove();
//            var RemoveElement = $(element).closest('tr').next('tr').find('td[colspan="7"]').closest('tr');

//            if (removedElement.length > 0) {
//                // Row was removed, so no further action needed
//            } else {
//                var headernames = ["Class", "Fee Amount(DR)", "Discount", "Fee Collected(CR)", "Due(DR)"];
//                var columnnames = ["subClassificaitionName", "instanceSubClassificaitionId", "subClassificaitionAmountSet", "subClassificaitiondiscount", "subClassificaitionAmountPaid", "subClassificaitionBalance"];

//                bindSubTable(response, headernames, columnnames, element, termIds, null);
//            }
//        },
//        function (status, error) {
//            console.error("Error fetching data:", error);
//        }
//    );
//}
//function bindSubTable(response, headernames, columnnames, element, Termids, appendid) {
//    if (response.length > 0) {

//        var table = $('<table>').addClass('table table-hover table-bordered display nowrap').attr('id', 'SubTable');
//        var thead = $('<thead>');
//        var theadRow = $('<tr>');

//        for (var i = 0; i < headernames.length; i++) {
//            theadRow.append('<th>' + headernames[i] + '</th>');
//        }
//        thead.append(theadRow);
//        table.append(thead);
//        $("#MainTable").append(table);
//        if (appendid) {
//            $(appendid).html(table);
//        }
//        else {
//            $(event).closest('tr').after("<tr><td colspan='6'>" + table + "</td></tr>");
//        }
//        $('#SubTable').DataTable({
//            data: response,
//            columns: headernames.map((header, index) => {
//                return {
//                    data: columnnames[index],
//                    title: header,
//                    render: function (data, type, row, meta) {
//                        if (index === 0) { // Assuming the first column needs onclick event
//                            return '<span class="appendinsidetable" onclick="Thirdfunction(\'' + row[columnnames[1]] + '\',\'' + Termids + '\', this)" style="color: #7367f0 !important; cursor: pointer;">' + data + '<input type="text" value="' + row[columnnames[1]] + '" hidden style="display:none" readonly /></span>';
//                        } else {
//                            return data;
//                        }
//                    }
//                };
//            }),
//            paging: false,
//            bFilter: false,
//        });
//    }
//}



