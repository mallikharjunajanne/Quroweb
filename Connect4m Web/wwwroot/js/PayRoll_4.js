
//--------------------------------------  For mANAGE cATEGORY   12-09-2023




//--------------------------Search The CONFIGURE mANage Category
$(document).ready(function () {
    searchManageSubCategory();
    setProgressBar(4, '.c-4');

})
//---------------------------------------------------------------------------Search
$(document).on('click', '#Serach_MSC #sub_tblMSC', function (event) {
    event.stopImmediatePropagation();
    searchManageSubCategory();

});
try {

    if (tabletargetpagetblSEMsearchresults == undefined) {
        var tabletargetpagetblSEMsearchresults = 0;
    }
}
catch {
    var tabletargetpagetblSEMsearchresults = 0;
}

function searchManageSubCategory() {

    loaddingimg.css('display', 'block');

    var formid = $('#Serach_MSC');
    var data = {
        PayrollSubCategoryName: $(formid).find("#PayrollSubCategoryName").val(),
        isLeaveApplicable: $("input[name='isLeaveApplicable']:checked").val()

    };
    CommonAjaxFunction('GET', '/PayRoll/SearchManageSubCategoryJson', data, function (response) { bindDatatableMSC(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableMSC(response) {
   

        var formattedDate = GetDateFormat();
        var table = $('#tblMSCsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_MSC").text(response.length);
        var newTable = $("#tblMSCsearchresults").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'MANAGE SUB CATEGORY REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1,2,3,4]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'MANAGE SUB CATEGORY REPORT',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1,2,3,4]
                    },
                },

                {
                    extend: 'print',
                    title: 'MANAGE SUB CATEGORY REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1,2,3,4]
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
                    data: "PayrollSubCategoryId",
                    visible: false,

                    render: function (data, type, row, meta) {
                        //  length++;
                        return row.payrollSubCategoryId
                    }
                },
                {
                    targets: 1, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                }, {
                    data: "PayrollSubCategoryName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.payrollSubCategoryName

                    }
                },

                {
                    data: "PayrollCategoryName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.payrollCategoryName

                    }
                }, {
                    data: "PayrollCategoryDescription",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.payrollCategoryDescription

                    }
                },
                {
                    render: function (data, type, row, meta) {
                        //  length++;

                        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"><input type="text" value=' + row.payrollSubCategoryId + ' hidden/></i>'

                    }
                }

            ]


        });
        try {
          //  newTable.column(1).order('asc').draw();
            newTable.column(5).nodes().to$().css("text-align", "center");

            newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
            table.on('draw', function () {
                $('#tblMSCsearchresults').find('td:nth-child(2)').attr('title', 'Edit Sub Category');
            });
            $('#tblMSCsearchresults').find('td:nth-child(2)').attr('title', 'Edit Sub Category');

        } catch {

        }

        loaddingimg.css('display', 'none');
    }

}

//------------------------------------------------------------------------------   Delete Manage Category


$(document).on('click', '#tblMSCsearchresults .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var data = {
        PayrollSubCategoryId: $(this).find('input[type="text"]').val()
    };
    var table = $('#tblMSCsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    CommonDeleteFunction('Category', 'GET', '/PayRoll/DeleteManageSubCategory', data, function (response) {
        $('.alert-success p').text("Sub Category deleted successfully.");
        $(".alert-success").show().delay(5000).fadeOut()
        searchManageSubCategory();
    });
})

//---------------------------------------------------------------------------------------------   When Click ON submit Button 
$("#Insert_MSC").submit(function (event) {
    event.preventDefault();
    // event.stopImmediatePropagation();
 
    $('#Insert_MSC input[type="radio"]').prop("disabled", false);
    $('#Insert_MSC #dropdown_PayrollCategoryName_MSC').prop("disabled", false);
    var formdata_CSA = $(this).serialize();
  //  formdata_CSA += '&payrollCategoryName=' + $('#Insert_MSC #dropdown_PayrollCategoryName_MSC option:selected').text();


   

    var formElement = document.getElementById('Insert_MSC');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0) {
     
            loaddingimg.css('display', 'block');
            CommonAjaxFunction('POST', '/PayRoll/CreateManageSubCategory', formdata_CSA, function (response) {
                debugger;

                if (response == "313" || response == "-1") {
                    $('.alert-danger p').text("Sub Category Name Already Exists");
                    $(".alert-danger").show().delay(5000).fadeOut()
                    loaddingimg.css('display', 'none');
                }

                else {
                    if ($('#Insert_MSC #Save_MSC').val() == "Update") {

                        $('.alert-success p').text("Manage Sub Category Updated successfully.");
                    } else {
                        $('.alert-success p').text("Sub Category Inserted successfully.");
                    }
                    CommonAjaxFunction('GET', '/PayRoll/CreateManageSubCategory', null, function (response) {
                        $('#appendinsertmanagesubcategory').html('');
                        $('#appendinsertmanagesubcategory').html(response);
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
$(document).on('click', '#addnewmanagesubcategorybtn', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    $('#appendinsertmanagesubcategory').html('');
    // $('#appendsearchmanagecategory').html('');
    $('#appendsearchmanagesubcategory').css('display', 'none');
    $('#appendinsertmanagesubcategory').css('display', 'block');
    CommonAjaxFunction('GET', '/PayRoll/CreateManagesubCategory', null, function (response) {
        $('#appendinsertmanagesubcategory').html(response);
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');

    }, false);

})
//---------------------------------------------------------------------------------------  Data Getting For Update
$(document).on('click', '#tblMSCsearchresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
  
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    loaddingimg.css('display', 'block');
    var data = {
        PayrollSubCategoryId: GovFundId
    };
    CommonAjaxFunction('GET', '/PayRoll/CreateManageSubCategory', data, function (response) {
        $('#appendinsertmanagesubcategory').html('');
        //  $('#appendsearchmanagecategory').html('');
        $('#appendsearchmanagesubcategory').css('display', 'none');
        $('#appendinsertmanagesubcategory').css('display', 'block');
        $('#appendinsertmanagesubcategory').html(response);
        $('#Insert_MSC #Save_MSC').val("Update");
        $('.card #updatesalaryattribute').text("UPDATE");

        $('#Insert_MSC #clearform').css('opacity', '0.3');
        $('#Insert_MSC #dropdown_PayrollCategoryName_MSC').css('opacity', '0.3').css('color','red');
    
       // $('#Insert_MSC input[type="radio"]').css('opacity', '0.3');
        $('#Insert_MSC input[type="radio"]').closest('.form-group').css('opacity', '0.7');


        $('#Insert_MSC #clearform').prop("disabled", true);
        $('#Insert_MSC input[type="radio"]').prop("disabled", true);
        $('#Insert_MSC #dropdown_PayrollCategoryName_MSC').prop("disabled", true);

        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
    var table = $('#tblMSCsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
})

//---------------------------------------------------------------------------------------------  When click on back to search Manage Category

$(document).on('click', '#Insert_MSC #backtosearch_MSC', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    $('#appendsearchmanagesubcategory').css('display', 'block');
    $('#appendinsertmanagesubcategory').css('display', 'none');
    $('#appendinsertmanagesubcategory').html(" ");
    searchManageSubCategory();
    loaddingimg.css('display', 'none');
})