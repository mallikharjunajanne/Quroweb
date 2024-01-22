
//--------------------------------------  Generate PAyslips  for Employees   25-09-2023

//--------------------------Search The Payslip Generate For Employees
$(document).ready(function () {
    searchManageDetails();
    //setProgressBar(7, '.c-7');
    // Get the current date
    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    $("#fromtodates #dropdown_Months_PGEsearch").val(currentMonth);
    $("#fromtodates #dropdown_Years_PGEsearch").val(currentYear);
    fromandtodates();
   

})
//---------------------------------------------------------------------------Search
$(document).on('click', '#Serach_PGE #sub_tblPGE', function (event) {
    event.stopImmediatePropagation();
    searchManageDetails();

});
function searchManageDetails() {

    loaddingimg.css('display', 'block');

    var formid = $('#Serach_PGE');

    var data = {
        RoleId: $(formid).find("#dropdown_RoleId_PGEsearch").val(),
        UserName: $(formid).find("#UserNamesearch").val(),
        FirstName: $(formid).find("#FirstNamesearch").val(),
        LastName: $(formid).find("#LastNamesearch").val() ,
        AdmissionNumber: $(formid).find("#AdmissionNumbersearch").val(),
        ///  InstanceUserCode: $(formid).find("#InstanceUserCodesearch").val(),
        Category: $(formid).find("#dropdown_Category_PGEsearch").val(),
        SubCategory: $(formid).find("#dropdown_SubCategory_PGEsearch").val(),
        InstanceClassificationId: $(formid).find("#dropdown_Department_PGEsearch").val(),
        DesignationId: $(formid).find("#dropdown_DesignationId_PGEsearch").val()

    };
    CommonAjaxFunction('GET', '/PayRoll/SearchManageDetailsJson', data, function (response) { bindDatatablePGE(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatablePGE(response) {

       //  debugger;
       // var formattedDate = GetDateFormat();
        var table = $('#tblPGEsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_PGE").text(response.length);
        var newTable = $("#tblPGEsearchresults").DataTable({
            dom: 'Bfrtip',

            bProcessing: false,
            bLengthChange: true,
            bfilter: false,
            bSort: true,
           
            searching: false,
            paging: true,
            bPaginate: true,
            data: response,
            buttons:[],
            columns: [
                {
                    targets: 1, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                }, {
                    data: "FirstName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.firstName

                    }
                },

                {
                    data: "AdmissionNumber",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.admissionNumber

                    }
                }, {
                    data: "Category",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.category

                    }
                }, {
                    data: "SubCategory",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.subCategory

                    }
                }, {
                    data: "ClassificationName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.classificationName

                    }
                }, {
                    data: "GrossSalary",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.grossSalary + '<input type="text" value=' + row.userId + ' hidden/>'

                    }
                },
                {
                    data: "DateOfJoining",
                    render: function (data, type, row, meta) {
                        //  length++;
                        if (row.dateOfJoining != null) {
                            var endDate = new Date(row.dateOfJoining);
                            return endDate.toLocaleDateString();
                        } else {
                            return '';
                        }

                    }
                }

            ]


        });
        try {
            newTable.column(0).order('asc').draw();
            // newTable.column(5).nodes().to$().css("text-align", "center");

         //   newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
            newTable.on('draw', function () {
                $('#tblPGEsearchresults').find('td:nth-child(2)').attr('title', 'PaySlip Generation for Employee');
              //  $('#tblPGEsearchresults').find('td:nth-child(2)').css('width', '111px');
            });
            $('#tblPGEsearchresults').find('td:nth-child(2)').attr('title', 'PaySlip Generation for Employee');
          //  $('#tblPGEsearchresults').find('td:nth-child(2)').css('width', '111px');

        } catch {

        }

        loaddingimg.css('display', 'none');
    }

}
//----------------------- Drop Down Change 
$(document).on('change', '#dropdown_Category_PGEsearch', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    subcategorydropdown(attributeval, "dropdown_SubCategory_PGEsearch");
});
function subcategorydropdown(attributeval, id) {

    var formid = $('#Serach_PGE');
    document.getElementById("loading").style.display = "block";
    var extraparameters = [];
    extraparameters.push($(formid).find("#InstanceidforPGE").val());
    extraparameters.push(attributeval);


    var data = {
        methodname: 'GetSubcategoryME',
        text: "PayrollSubCategoryName",
        value: "PayrollSubCategoryId",
        parameters: extraparameters
    };




    //console.log(formdataME);

    CommonAjaxFunction('POST', '/PayRoll/CommonDropdown', data, function (response) {

        var dropdown = $('#' + id); // Change this to match the generated ID
        dropdown.empty();
        dropdown.append($('<option></option>').val('').text('-------select-------'));
        if (response.length == 0 && id == "dropdown_SubCategory_PGEsearch") {
            $(dropdown).prop("disabled", true);
            $(dropdown).css("opacity", 0.5);
        }
        else {
            $(dropdown).prop("disabled", false);
            $(dropdown).css("opacity", 1);
        }
        response.forEach(function (department) {

            var option = document.createElement("option");
            option.value = department.value;
            option.text = department.text;

            document.getElementById(id).appendChild(option);
            //  $('#InstanceSubClassificationId').val(instanceSubjectsValues);

        });
        document.getElementById("loading").style.display = "none";
    }, function (status, error) {

    }, false);

}
//-------------------------------------  Month and year CHANGE
$("#fromtodates #dropdown_Months_PGEsearch").on("change", function () { fromandtodates() });
$("#fromtodates #dropdown_Years_PGEsearch").on("change", function () {fromandtodates() });


function fromandtodates() {

    var formid = $('#fromtodates');
    document.getElementById("loading").style.display = "block";
    var extraparameters = [];
    extraparameters.push($(formid).find("#dropdown_Months_PGEsearch").val());
    extraparameters.push($(formid).find("#dropdown_Years_PGEsearch").val());
 


    var data = {
        methodname: 'GetFromandTodates',
        text: "StartDate",
        value: "EndDate",
        parameters: extraparameters
    };
    CommonAjaxFunction('POST', '/PayRoll/CommonDropdown', data, function (response) {
        if (response.length != 0) {

            $(formid).find("#startdate_PGE").text(response[0].text);
            $(formid).find("#enddate_PGE").text(response[0].value);
        } else {
            $(formid).find("#startdate_PGE").text("");
            $(formid).find("#enddate_PGE").text("");
        }
        document.getElementById("loading").style.display = "none";
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

}
//==========================================      For Getting Payslip When Click on the tAble Second Column  ===============
$(document).on('click', '#tblPGEsearchresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
   // debugger;

    if ($("#fromtodates #startdate_PGE").text() != '' && $("#fromtodates #enddate_PGE").text() != '') {
        $('#errorfordate').css('display', 'none');

        $('#errorfordate').text('');

        var MonthPGE = $("#fromtodates #dropdown_Months_PGEsearch").val();
        var MonthPGEtext = $("#fromtodates #dropdown_Months_PGEsearch option:selected").text();
        var YearPGE = $("#fromtodates #dropdown_Years_PGEsearch").val();

        var parent = $(event.target).closest('tr');
        var GovFundId = $(parent).find('td').find('input[type="text"]').val();
        loaddingimg.css('display', 'block');
        var data = {
            UserId: GovFundId,
            month: MonthPGE,
            monthtext:MonthPGEtext,
            year: YearPGE,
        };
        CommonAjaxFunction('GET', '/PayRoll/PaySlipGeneration', data, function (response) {
              if (response == "sree"){
                $('#errorfordate').text('The Data has Insufficient');
                $('#errorfordate').css('display', 'block');
                $('.alert-danger p').text("The Data has Insufficient");
                $(".alert-danger").show().delay(4000).fadeOut()
            } else if (response != "0") {
                $('#GeneratepaySlipAppend').html('');
                $('#SearchEmployeesForGeneratePayslip').css('display', 'none');
                $('#GeneratepaySlipAppend').css('display', 'block');
                $('#GeneratepaySlipAppend').html(response);

            }
            else  {
                $('#errorfordate').text('Cannot generate Payslip,Please check whether salary attributes date range falls in between the selected month and year,and its sum is equal to 100%.');
                $('#errorfordate').css('display', 'block');
            }
            loaddingimg.css('display', 'none');
        }, function (status, error) {
            loaddingimg.css('display', 'none');
        }, false);
    }
    else {

        $('#errorfordate').text('The Date has Insufficient');
        $('#errorfordate').css('display','block');
        $('.alert-danger p').text("The Date has Insufficient");
        $(".alert-danger").show().delay(4000).fadeOut()
    }
})

//=========================================       Print the PaySlip   =================================

function printPaySlip(divId) {
    var content = $('.mainpayslip').html();
   
    var newWindow =  window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write('<html><head><title>PaySlip</title><link rel="stylesheet" type="text/css" href="/css/Payslipgeneration.css"><link rel="stylesheet" type="text/css" href="/css/CommonStyle.css"><link rel="stylesheet" type="text/css" href="/assets/vendor/css/rtl/core.css"></head><body>');

        newWindow.document.write(content);
   
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    setTimeout(function () {
        newWindow.print();
    }, 100);
   // newWindow.close();
}
//==================================  Back To Search  =====================================
$(document).on('click', '#Backtosearchpayslip', function () {
    $('#SearchEmployeesForGeneratePayslip').css('display', 'block');
    $('#GeneratepaySlipAppend').css('display', 'none');
    $('#GeneratepaySlipAppend').text('');
})

//=============================================================================
$(document).on('click', '#Payslipgenerationinner #PayslipConfirm', function (event) {
    event.stopImmediatePropagation();
    alert("hii");
    loaddingimg.css('display', 'block');
    var parent = $('.earnings_deductions').find('.earnings_deductionssub');
    var formData = new FormData();
    for (var i = 0; i < parent.length; i++) {
        formData.append('SalaryAttributesDetailsId', $(parent[i]).find('.instanceuserid').val());
        formData.append('SalaryAmount', $(parent[i]).find('.salaryforpayin').val());

    }
    CommonAjaxFunction('POST', '/PayRoll/InsertPayslip', formData, function (response) {
        loaddingimg.css('display', 'none');
        $("#printbuttons").append('<div onclick="printPaySlip(\'PaySlip\')" style="margin-left: 37%;"><span class="btn btn-pill btn-outline-success btn-air-success">Print</span></div>');
        $("#Payslipgenerationinner #confirmbutton").text("").css('display', 'none');

        $('.alert-success p').text("Payslip Saved SuccessFully.");
        $(".alert-success").show().delay(6000).fadeOut()
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, true);

})