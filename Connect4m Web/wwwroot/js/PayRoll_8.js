
//-------------------------------------- For Salary report   25-09-2023


$(document).ready(function () {
  //  searchManageDetails();
    setProgressBar(8, '.c-8');
})




//------------------------------------------------------------    Get Report
$("#Serach_SR").submit(function (event) {
    event.preventDefault();
    var formElement = document.getElementById('Serach_SR');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationmelength = validationMessages.length;
        if (validationmelength == 0) {
            searchManageDetails();
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
    }, 50);

});




//----------------------- Drop Down Change 
$(document).on('change', '#dropdown_Category_SR', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    subcategorydropdown(attributeval, "dropdown_SubCategory_SR");
});
function subcategorydropdown(attributeval, id) {

    var formid = $('#Serach_SR');
    document.getElementById("loading").style.display = "block";
    var extraparameters = [];
    extraparameters.push($(formid).find("#InstanceidforSR").val());
    extraparameters.push(attributeval);


    var data = {
        methodname: 'GetSubcategoryME',
        text: "PayrollSubCategoryName",
        value: "PayrollSubCategoryId",
        parameters: extraparameters
    };

    CommonAjaxFunction('POST', '/PayRoll/CommonDropdown', data, function (response) {

        var dropdown = $('#' + id); // Change this to match the generated ID
        dropdown.empty();
        dropdown.append($('<option></option>').val('').text('-------select-------'));
        if (response.length == 0 && id == "dropdown_SubCategory_SR") {
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

//==============  Search
function searchManageDetails() {
    $("#hideshowreport").css('display', 'block');
    loaddingimg.css('display', 'block');
    var formElement = document.getElementById('Serach_SR');
    var data = {
        CategoryId: $(formElement).find("#dropdown_Category_SR").val(),
        SubCategoryId: $(formElement).find("#dropdown_SubCategory_SR").val(),
        MonthNo: $(formElement).find("#dropdown_Months_SR").val(),
        YearNo: $(formElement).find("#dropdown_Years_SR").val(),
        ClassificationId: $(formElement).find("#dropdown_Department_SR").val(),
    }


    
    CommonAjaxFunction('GET', '/PayRoll/SAlaryReportJson', data, function (response) { bindDatatablePGE(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatablePGE(response) {

          debugger;
        // var formattedDate = GetDateFormat();
        var table = $('#tblSRsearchresults').DataTable();
        table.destroy();
        var formattedDate = GetDateFormat();
        if (response.length != 0) {
            $("#totalrecords_Tranctions_ME").text(response.length-1);
        } else {
            $("#totalrecords_Tranctions_ME").text(response.length);

        }
      //  $("#totalrecords_Tranctions_ME").text(response.Data.length);
        var newTable = $("#tblSRsearchresults").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'SALARY REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [0,1, 2, 3, 4, 5, 6,7]
                    },
                }
                ,
                {
                    extend: 'excel',
                    title: 'SALARY REPORT',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7]
                    },
                },

                {
                    extend: 'print',
                    title: 'SALARY REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5, 6, 7]
                    },
                }


            ],

            bProcessing: false,
            bLengthChange: true,
            bfilter: false,
            bSort: true,

            searching: false,
            paging: true,
            bPaginate: true,
            data: response,
      
            columns: [
                {
                    targets: 1, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        var valuerow = (0 * rowsPerPage) + meta.row + 1;
                        if (valuerow < response.length) {
                            return valuerow;
                        } else {
                            return '';
                        }
                    }
                }, {
                    data: "AdmissionNumber",

                    render: function (data, type, row, meta) {
                        return row.admissionNumber
                    }
                }, {
                    data: "UserName",

                    render: function (data, type, row, meta) {
                        return row.userName
                    }
                },
                {
                    data: "Category",

                    render: function (data, type, row, meta) {
                        return row.category
                    }
                }, {
                    data: "SubCategory",

                    render: function (data, type, row, meta) {
                        return row.subCategory + '<input type="text" value=' + row.userId + ' hidden/>'
                    }
                } ,{
                    data: "ClassificationName",

                    render: function (data, type, row, meta) {
                        return row.classificationName
                    }
                } ,{
                    data: "GrossSalary",

                    render: function (data, type, row, meta) {
                        return row.grossSalary
                    }
                } ,{
                    data: "Amount",

                    render: function (data, type, row, meta) {
                        return row.amount 
                    }
                }

            ]


        });
        try {
            newTable.column(0).order('desc').draw();
            
         
          var lastRow = newTable.row(newTable.rows().count() - 1).nodes().to$();
            var lastCell = lastRow.find('td:last');
            lastCell.css({ 'font-weight': '900', 'color': 'black' });

          //  newTable.row.add([' ', ' ', '', ' ', ' ', ' ', ' ', response.sumofAmount]).draw();

        } catch {

        }

        loaddingimg.css('display', 'none');
    }

}


//============================= date change when yar and month chnged

//-------------------------------------  Month and year CHANGE
$("#Serach_SR #dropdown_Years_SR").on("change", function () { fromandtodatessr() });
$("#Serach_SR #dropdown_Months_SR").on("change", function () { fromandtodatessr() });


function fromandtodatessr() {
    debugger;
    var formid = $('#Serach_SR');
    document.getElementById("loading").style.display = "block";
    var extraparameters = [];
    extraparameters.push($(formid).find("#dropdown_Months_SR").val());
    extraparameters.push($(formid).find("#dropdown_Years_SR").val());




    var data = {
        methodname: 'GetFromandTodates',
        text: "StartDate",
        value: "EndDate",
        parameters: extraparameters
    };
    CommonAjaxFunction('POST', '/PayRoll/CommonDropdown', data, function (response) {
        if (response.length != 0) {

            $(formid).find("#dateforSR").css('display','contents');
            $(formid).find("#startdate_SR").text(response[0].text);
            $(formid).find("#enddate_SR").text(response[0].value);
        } else {
            $(formid).find("#dateforSR").css('display', 'none');

            $(formid).find("#startdate_PGE").text("");
            $(formid).find("#enddate_PGE").text("");
        }
        document.getElementById("loading").style.display = "none";
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

}
