
////=======>>>>>> WITHOUT DISCOUNT USER FEE DETAILS INSERTING CODE HERE START

let currentSortOrder = 'asc';
function lnkNameSort(Cellnumber) {
    debugger;
    //let currentSortOrder = 'asc';
    const table = document.getElementById("SetFeeForUser_tbody");
    const rows = Array.from(table.rows).slice(0); // Exclude the header row

    rows.sort((a, b) => {
        const x = a.cells[Cellnumber].textContent;
        const y = b.cells[Cellnumber].textContent;
        return currentSortOrder === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
    });

    // Rearrange the rows based on sorted order
    rows.forEach((row, index) => {
        table.appendChild(row);
    });

    // Toggle sorting order for the next click
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
}

function lnkDigitSort(Cellnumber) {
    debugger;
    const table = document.getElementById("SetFeeForUser_tbody");
    const rows = Array.from(table.rows).slice(0); // Exclude the header row

    rows.sort((a, b) => {
        const x = parseFloat(a.cells[Cellnumber].textContent);
        const y = parseFloat(b.cells[Cellnumber].textContent);
        return currentSortOrder === 'asc' ? x - y : y - x;
    });

    // Rearrange the rows based on sorted order
    rows.forEach((row, index) => {
        table.appendChild(row);
    });

    // Toggle sorting order for the next click
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
}

function inputvalidate(amount) {
    debugger;
    var amountinputValue = amount.value;
    var amountnumericValue = amountinputValue.replace(/\D/g, ''); // Remove non-numeric characters
    amount.value = amountnumericValue; // Update the input value
}

function validateNumberInput(inputElement) {
    var inputValue = inputElement.value;
    var numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
    inputElement.value = numericValue; // Update the input value
}

function toggleSameAmount(checkbox, FeeTypeNames, TrCount) {
    debugger;
    var tr = checkbox.closest("tr");
    var tableBody = document.getElementById('SetFeeForUser_tbody');
    var rows = tableBody.getElementsByTagName('tr');
    var container = checkbox.closest('.setContainer');
    var textBox = container.querySelector('.red-border');
    var SetAmounttextbox = textBox.value;
    debugger;
    if (SetAmounttextbox != "") {
        textBox.style.border = "1px solid #D90";
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var tdoftab = $(row).find('td:nth-child(' + TrCount + ')');
            $(tdoftab).find('input[type="text"]').val(SetAmounttextbox);
        }
    }
    else {
        textBox.style.border = "1px solid red";
    }
}

function Feedetailsinserting() {
    debugger;
    loaddingimg.css('display', 'block');

    var rowDataList = [];
    var Duedate = $('#Duedatetxt').val();
    debugger;
    if (Duedate != "") {
        $('#Commonerrormessage').text('');

        debugger;
        $('#SetFeeForUser_tbody tr').each(function () {
            var row = $(this);
            var userId = row.find('td:nth-child(3)').text().trim();
            var feeTermId = $('#ddlTerms').val();
            var academicYearId = $('#ddlYears').val();

            var rowData = {
                StudentUserId: userId,
                FeeTermId: feeTermId,
                AcademicYearId: academicYearId,
                FeeDetails: []
            };

            debugger;
            row.find('td:gt(8)').each(function () {
                var $td = $(this);
                var FeeTypeIds = $td.find('.FeeTypeid_Input').val();
                var PaidAmounts = parseFloat($td.find('.PaidAmount_Input').val());
                var feeAmountValues = parseFloat($td.find('input[type="text"]').val());
                var commentss = $td.find('input[type="text"]').closest('td').find('textarea').val() ?? "";
                var DueDates = $('#Duedatetxt').val();

                if (isNaN(feeAmountValues) || feeAmountValues < PaidAmounts) {
                    var errorMessage = isNaN(feeAmountValues) ? 'Please enter valid fee amount for the following Users where red color is indicated:' : 'The Amount should be Greater than or Equal to Paid Amount / Challan Generated Amount, for the following Users where red color is indicated:';               
                    //$('#validationMessage').text(errorMessage);
                    $('#Commonerrormessage').text(errorMessage);
                    $td.find('input[type="text"]').css({
                        'border': '1px solid red',
                        'background-color': 'rgb(255, 238, 238)'
                    });
                    return false;
                }
                else {
                    $td.find('input[type="text"]').css({
                        'border': '1px solid black',
                        'background-color': 'white'
                    });
                }

                var Details = {
                    FeeTypeId: FeeTypeIds,
                    PaidAmounts: PaidAmounts,
                    FeeAmount: feeAmountValues,
                    //textareas: commentss,
                    DueDates: DueDates,
                    Comments: commentss
                };
                rowData.FeeDetails.push(Details);
            });
            rowDataList.push(rowData);
        });
        //handleAjax('POST', "/FeeSection/InsertUserfeedetails", rowDataList,
        //handleAjax('POST', "/FeeSection/InsertUserfeedetails", { feeDetailsList: JSON.stringify(rowDataList) },
            $.ajax({
                url: "/FeeSection/InsertUserfeedetails",
                type: "POST",
                //contentType: "application/json", // Set the content type
                //data: JSON.stringify(rowDataList), // Convert data to JSON string if needed
                data: { feeDetailsList: JSON.stringify(rowDataList) }, // Convert data to JSON string if needed
                //data: rowDataList, // Convert data to JSON string if needed
                success: function (response) {
                    debugger;
                    //console.log(response);
                    var errorMessage = '';
                    switch (response) {
                        case "1":
                        case "2":
                            errorMessage = 'Fee details assigned successfully for the selected users.';
                            break;
                        case "-1":
                            errorMessage = 'Not Inserted';
                            break;
                        default:
                            errorMessage = 'Something Wrong. Please try again........!';
                            break;
                    }
                    $('#Commonerrormessage').text(errorMessage);
                    loaddingimg.css('display', 'none');
                },
                error: function (status, error) {
                    loaddingimg.css('display', 'none');
                },
            });
        //);

    }
    else {
        window.scroll(0, 0);
        loaddingimg.css('display', 'none');
        $('#Commonerrormessage').text('Please enter due date.');
    }

    loaddingimg.css('display', 'none');
}

////=======>>>>>> WITHOUT DISCOUNT USER FEE DETAILS INSERTING CODE HERE END




////======>>>>>>


//===>> SET AMOUNT CHECKBOX FUNCTION
function Sameamountchkonclick() {
    debugger;
    var checkbox = document.getElementById("Sameamountchk");
    if (checkbox.checked) {
        document.getElementById("Sameamounttxt").style.border = "";
        var SameAmountTxt = $('#Sameamounttxt').val();
        if (SameAmountTxt != "") {
            var tableBody = document.getElementById("Usersdiscounttbl");
            var rows = tableBody.getElementsByTagName('tr');
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var tdoftab10 = $(row).find('td:nth-child(10)');
                $(tdoftab10).find('input[type="text"]').val(SameAmountTxt);
            }
        }
        else {
            document.getElementById("Sameamounttxt").style.border = "1px solid red";
        }
    }
}

//===>> DISCOUNT DROPDOWN ON CHANGE AMOUNT SHOE BESIDE TEXTBOX EVENT 
function handleSelectChange(Selectedelement){
    var userId = Selectedelement.id;
    var selectedValue = Selectedelement.value;
    debugger;
    var dynamicTextBoxId = 'DiscountAmount_TxtId_' + userId;
    var data = { ConcedingTypeId: selectedValue };
    handleAjax('GET', "/FeeSection/DiscounttypebydiscountAmountddl", data,
        function (response) {
            debugger;
            //console.log("Data received:", response);
            //console.log("Dynamic TextBox ID:", dynamicTextBoxId);
            $('#' + dynamicTextBoxId).val(response.amount);
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        },
    );
}

function Discountfeedetailsinserting() {

    loaddingimg.css('display', 'block');
    $('#Commonerrormessage').html('');

    debugger;
    var shouldMakeAjaxCall = true;
    var tbody = document.getElementById("Usersdiscounttbl");
    var rows = tbody.getElementsByTagName("tr");
    var Rowdetails = [];
    var DueDate = $('#Duedatetxt').val();

    debugger;
    if (DueDate != "") {

        for (var i = 0; i < rows.length; i++) {
            debugger;
            var row = rows[i];
            var FirstName = row.cells[1].innerText;
            var UserId = row.cells[2].innerText;
            var FeeTypeid = $('#ddlFeeTypes').val();
            //var FeeTypeid = $('#FeeTypeid_DD').val();
            var AcademicYearId = $('#ddlYears').val();
            var FeeTermId = $('#ddlTerms').val();
            var InstanceUserCode = row.cells[6].innerText;
            var ConcedingTypeId = row.cells[10].querySelector("select").value;
            var Feeamount = row.cells[9].querySelector("input").value;
            var ConcedingAmount = row.cells[11].querySelector("input").value;
            var DueDate = $('#Duedatetxt').val();
            var comments = row.cells[12].querySelector("textarea").value;

            if (Feeamount == "") {
                window.scroll(0, 0);
                loaddingimg.css('display', 'none');
                $('#Commonerrormessage').html("Enter Valid Fee Amount for " + '"' + FirstName + '"' + "");
                shouldMakeAjaxCall = false;
                break;
            }
            if (parseFloat(ConcedingAmount) > parseFloat(Feeamount)) {
                window.scroll(0, 0);
                loaddingimg.css('display', 'none');
                $('#Commonerrormessage').html('Discount Amount Should not be Greater than Fee Amount for' + '"' + FirstName + '"');
                shouldMakeAjaxCall = false;
                break;
            }
            if (parseFloat(ConcedingAmount) == parseFloat(Feeamount)) {
                window.scroll(0, 0);
                loaddingimg.css('display', 'none');
                $('#Commonerrormessage').html('"' + FirstName + '"' + 'has paid Rs.' + Feeamount + ', you cannot Update the Fee amount.The difference of Fee Amount,Discount Amount should be Greater than or Equal to Paid Amount.');
                shouldMakeAjaxCall = false;
                break;
            }
            if (ConcedingAmount == "") {
                window.scroll(0, 0);
                loaddingimg.css('display', 'none');
                $('#Commonerrormessage').html("Enter Valid Discount Amount for " + '"' + FirstName + '"' + "");
                shouldMakeAjaxCall = false;
                break;
            }
            if (ConcedingAmount == "" && ConcedingTypeId != "0") {
                //if (ConcedingTypeId != "0") {
                    window.scroll(0, 0);
                    loaddingimg.css('display', 'none');
                    $('#Commonerrormessage').html("You Should not Enter Discount Amount without Selecting Discount Type for " + '"' + FirstName + '"' + "");
                    shouldMakeAjaxCall = false;
                    break;
                //}
            }
            var rowData = {
                StudentUserId: UserId,
                FeeTermId: FeeTermId,
                AcademicYearId: AcademicYearId,
                ConcedingTypeId: ConcedingTypeId,
                ConcedingAmount: ConcedingAmount,
                FeeTypeId: FeeTypeid,
                FeeAmount: Feeamount,
                DueDates: DueDate,
                Comments: comments,
            };
            Rowdetails.push(rowData);
        }
        if (shouldMakeAjaxCall) {
            var jsonData = JSON.stringify(Rowdetails);
            $.ajax({
                url: '/FeeSection/InsertUserdiscountfeedetails',
                type: 'POST',
                data: { Discountamountuserfeedetails: jsonData },
                success: function (response) {
                    //console.log(response);
                    var errorMessage = '';
                    switch (response) {
                        case "1":
                        case "2":
                            errorMessage = 'Record(s) Submitted Successfully.';
                            break;
                        case "-1":
                            errorMessage = 'Not Inserted';
                            break;
                        default:
                            errorMessage = 'Something Wrong. Please try again........!';
                            break;
                    }
                    $('#Commonerrormessage').text(errorMessage);
                    loaddingimg.css('display', 'none');
                },
                error: function (xhr, status, error) {
                    console.error("An error occurred during the AJAX request.");
                    $('#Commonerrormessage').text('An error occurred. Please try again later.');
                    loaddingimg.css('display', 'none');
                }
            });
        }
    }
    else {
        window.scroll(0, 0);
        loaddingimg.css('display', 'none');
        $('#Commonerrormessage').html("Please enter Due Date.");
    }
}


////======>>>>>>