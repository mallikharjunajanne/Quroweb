
//--------------------------------------  For mANAGE cATEGORY   12-09-2023




//--------------------------Search The CONFIGURE mANage Category
$(document).ready(function () {
        searchManageCategory();
       // setProgressBar(3, '.c-3');
    
})
//---------------------------------------------------------------------------Search
$(document).on('click', '#Serach_MC #sub_tblMC', function (event) {
    event.stopImmediatePropagation();
    searchManageCategory();

});
try {

    if (tabletargetpagetblSEMsearchresults == undefined) {
        var tabletargetpagetblSEMsearchresults = 0;
    }
}
catch {
    var tabletargetpagetblSEMsearchresults = 0;
}

function searchManageCategory() {

    loaddingimg.css('display', 'block');
   
    var formid = $('#Serach_MC');
    var data = {
        PayrollCategoryName: $(formid).find("#PayrollCategoryName").val(),
         isLeaveApplicable:$("input[name='isLeaveApplicable']:checked").val()

    };
    CommonAjaxFunction('GET', '/PayRoll/SearchManageCategoryJson', data, function (response) { bindDatatableMC(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableMC(response) {
       

        var formattedDate = GetDateFormat();
        var table = $('#tblMCsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_MC").text(response.length);
        var newTable = $("#tblMCsearchresults").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'MANAGE CATEGORY REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'MANAGE CATEGORY REPORT',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1, 2]
                    },
                },

                {
                    extend: 'print',
                    title: 'SMANAGE CATEGORY REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2]
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
                    data: "PayrollCategoryId",
                    visible: false,

                    render: function (data, type, row, meta) {
                        //  length++;
                        return row.payrollCategoryId
                    }
                },
                {
                    targets: 1, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                },

                {
                    data: "PayrollCategoryName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.payrollCategoryName 

                    }
                },
                {
                    render: function (data, type, row, meta) {
                        //  length++;

                        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"><input type="text" value=' + row.payrollCategoryId + ' hidden/></i>'

                    }
                }

            ]


        });
        try {
            newTable.column(1).order('asc').draw();
            newTable.column(3).nodes().to$().css("text-align", "center");

            newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
            table.on('draw', function () {
                $('#tblMCsearchresults').find('td:nth-child(2)').attr('title', 'Edit Category');
            });
            $('#tblMCsearchresults').find('td:nth-child(2)').attr('title', 'Edit Category');

        } catch {

        }
       
        loaddingimg.css('display', 'none');
    }
  
}

//------------------------------------------------------------------------------   Delete Manage Category


$(document).on('click', '#tblMCsearchresults .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var data = {
        PayrollCategoryId: $(this).find('input[type="text"]').val()
    };
    var table = $('#tblMCsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    CommonDeleteFunction('Category', 'GET', '/PayRoll/DeleteManageCategory', data, function (response) {
        $('.alert-success p').text("Category deleted successfully.");
        $(".alert-success").show().delay(5000).fadeOut()
        searchManageCategory();
    });
})

//---------------------------------------------------------------------------------------------   When Click ON submit Button 
$("#Insert_MC").submit(function (event) {
    event.preventDefault();
    // event.stopImmediatePropagation();
    var formdata_CSA = $(this).serialize();

    var formElement = document.getElementById('Insert_MC');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        
        var validationmelength = validationMessages.length;

        if (validationmelength == 0) {
            loaddingimg.css('display', 'block');
            CommonAjaxFunction('POST', '/PayRoll/CreateManageCategory', formdata_CSA, function (response) {
                debugger;
               
                if (response == "313" || response == "-1" ) {
                    $('.alert-danger p').text("Category Name Already Exists");
                    $(".alert-danger").show().delay(5000).fadeOut()
                    loaddingimg.css('display', 'none');
                }

                else {
                    if ($('#Insert_MC #Save_MC').val() == "Update") {

                        $('.alert-success p').text("Manage Category Updated successfully.");
                    } else {
                        $('.alert-success p').text("Category Inserted successfully.");
                    }
                    CommonAjaxFunction('GET', '/PayRoll/CreateManageCategory', null, function (response) {
                        $('#appendinsertmanagecategory').html('');
                        $('#appendinsertmanagecategory').html(response);
                        loaddingimg.css('display', 'none');
                    }, function (status, error) {
                        loaddingimg.css('display', 'none');
                    }, false);
                    $(".alert-success").show().delay(5000).fadeOut()

                }
            }, function (status, error) {
                loaddingimg.css('display', 'none');
            }, false);
        
          
          //  loaddingimg.css('display', 'none');
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
    }, 50);

})
//--------------------------------------------------------------------------------  Click On Crete Manage Category
//------------------------------------------c
$(document).on('click', '#addnewmanagecategorybtn', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    $('#appendinsertmanagecategory').html('');
   // $('#appendsearchmanagecategory').html('');
    $('#appendsearchmanagecategory').css('display', 'none');
    $('#appendinsertmanagecategory').css('display', 'block');
    CommonAjaxFunction('GET', '/PayRoll/CreateManageCategory', null, function (response) {
        $('#appendinsertmanagecategory').html(response);
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');

    }, false);

})
//---------------------------------------------------------------------------------------  Data Getting For Update
$(document).on('click', '#tblMCsearchresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
var parent = $(event.target).closest('tr');
var GovFundId = $(parent).find('td').find('input[type="text"]').val();
loaddingimg.css('display', 'block');
var data = {
    PayrollCategoryId: GovFundId
};
    CommonAjaxFunction('GET', '/PayRoll/CreateManageCategory', data, function (response) {
        $('#appendinsertmanagecategory').html('');
      //  $('#appendsearchmanagecategory').html('');
        $('#appendsearchmanagecategory').css('display', 'none');
        $('#appendinsertmanagecategory').css('display', 'block');
        $('#appendinsertmanagecategory').html(response);
    $('#Insert_MC #Save_MC').val("Update");
    $('.card #updatesalaryattribute').text("UPDATE");

    $('#Insert_MC #clearform').css('opacity', '0.3');


    $('#Insert_MC #clearform').prop("disabled", true);

    loaddingimg.css('display', 'none');
}, function (status, error) {
    loaddingimg.css('display', 'none');
}, false);
var table = $('#tblMCsearchresults').DataTable();
tabletargetpagetblSEMsearchresults = table.page.info().page;
})

//---------------------------------------------------------------------------------------------  When click on back to search Manage Category

$(document).on('click', '#Insert_MC #backtosearch_MC', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    $('#appendsearchmanagecategory').css('display', 'block');
    $('#appendinsertmanagecategory').css('display', 'none');
    $('#appendinsertmanagecategory').html(" ");
    searchManageCategory();
    loaddingimg.css('display', 'none');
})