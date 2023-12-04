//--------------------------------------  For Salary attributes For Roles   06-09-2023


//--------------------------Search The CONFIGURE SALARY ATTRIBUTES for Roles
$(document).ready(function () {
    searchSalaryRoleAttributes();
    setProgressBar(2, '.c-2');
   
})

$(document).on('click', '#Serach_SAR #sub_tblSAR', function (event) {
    event.stopImmediatePropagation();
    searchSalaryRoleAttributes();

});
try {

    if (tabletargetpagetblSEMsearchresults == undefined) {
        var tabletargetpagetblSEMsearchresults = 0;
    }
}
catch {
    var tabletargetpagetblSEMsearchresults = 0;
}

function searchSalaryRoleAttributes() {

    loaddingimg.css('display', 'block');
   
    var formid = $('#Serach_SAR');
    var data = {
        RoleName: $(formid).find("#RoleName").val(),
        RoleDescription: $(formid).find("#RoleDescription").val()
    };
    CommonAjaxFunction('GET', '/PayRoll/SearchSalaryAttributesForRolesJson', data, function (response) { bindDatatableSAR(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableSAR(response) {
        $("#Insert_SAR #Datalengthforbasic").val(response.length);
        var formattedDate = GetDateFormat();
        var table = $('#tblSARsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_SAR").text(response.length);
        var newTable = $("#tblSARsearchresults").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'SALARY ATTRIBUTES FOR ROLES REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'SALARY ATTRIBUTES FOR ROLES REPORT',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1, 2, 3]
                    },
                },

                {
                    extend: 'print',
                    title: 'SALARY ATTRIBUTES FOR ROLES REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3]
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
                    data: "InstanceRoleId",
                    visible: false,

                    render: function (data, type, row, meta) {
                        //  length++;
                        return row.instanceRoleId
                    }
                },
                {
                    targets: 0, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                },

                {
                    data: "RoleName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.roleName + '<input type="text" value=' + row.instanceRoleId + ' hidden/>'

                    }
                },
                {
                    data: "RoleDescription",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.roleDescription

                    }
                }

            ]


        });
         newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
        table.on('draw', function () {
            $('#tblSARsearchresults').find('td:nth-child(2)').attr('title', 'Add Attribute');
        });
        $('#tblSARsearchresults').find('td:nth-child(2)').attr('title', 'Add Attribute');
    }
    loaddingimg.css('display', 'none');
}

//--------------------------------------------------------------------------------------------- DAta Getting For Updating The Salary Attributes


$(document).on('click', '#tblSARsearchresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();

    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    UserIdforIndRecords = GovFundId;
    var RoleName = $(this).text();
   

    loaddingimg.css('display', 'block');
    var data = {
        UserId: GovFundId,
        RoleName: RoleName
    };
   
    nextpage("CreateSalaryAttributesForRoles", data)
        .then(() => {
            GetindividualRecords();
        });
        

    var table = $('#tblSARsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;

   
})

//---------------------------------------------------------------------------------------------   When Click ON submit Button 
$("#Insert_SAR").submit(function (event) {
    event.preventDefault();
    // event.stopImmediatePropagation();
    var formdata_CSA = $(this).serialize();
    debugger;
    var formElement = document.getElementById('Insert_SAR');
    setTimeout(function () {
        debugger;
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationmelength = validationMessages.length;
        var validationMessages2 = formElement.getElementsByClassName('error2');
        var lengthoftable = $("#Insert_SAR #Datalengthforbasic").val();
        var lenghtofbasic = 0;
        if (lengthoftable == 0) {
            if ($("#Insert_SAR #dropdown_InstanceSalaryAttributeId_SAR option:selected").text().toLowerCase() == 'basic') {
                lenghtofbasic++;
            }
        }
        if (validationmelength == 0 && validationMessages2.length == 0) {
            CommonAjaxFunction('POST', '/PayRoll/CreateSalaryAttributesForRoles', formdata_CSA, function (response) {
                if ($('#Insert_SAR #Save_SAR').val() == "Update") {

                    nextpage("CreateSalaryAttributesForRoles", null)
                        .then(() => {
                            GetindividualRecords();
                        });
                   
                    $('.alert-success p').text("Salary Attribute Updated successfully.");
                    $(".alert-success").show().delay(5000).fadeOut()
                }
                else {
                if (response == "1") {
                    $('.alert-danger p').text("You have already used this attribute");
                    $(".alert-danger").show().delay(5000).fadeOut()
                }
              else  if (response == "-2") {
                    $('.alert-danger p').text("Selected Start Date and End Date must lie between Salary Attribute Start Date and End Date.");
                    $(".alert-danger").show().delay(5000).fadeOut()
                } else  if (response == "313") {
                    $('.alert-danger p').text("This Role Already Have This Attribute");
                    $(".alert-danger").show().delay(5000).fadeOut()
                }
                else {
                    nextpage("CreateSalaryAttributesForRoles", null)
                        .then(() => {
                            GetindividualRecords();
                        });
                    $('.alert-success p').text("Salary Attribute Inserted successfully.");
                    $(".alert-success").show().delay(5000).fadeOut()
                    }

                   
                }
            }, function (status, error) {

            }, false);
        }
        else if(lenghtofbasic!=0) {
            $('.alert-danger p').text("Please Assign Basic Attribute first");
            $(".alert-danger").show().delay(6000).fadeOut()
                } else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
                }
          
    }, 50);

})

//---------------------------------------------------------------------------------------------  When click on back to search salary Attributes For Roles 


$(document).on('click', '#Insert_SAR #backtosearch_SAR', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    CommonAjaxFunction('GET', '/PayRoll/SearchSalaryAttributesForRoles', null, function (response) {
        $('#AppendAllPayRolls #InnerPayRoll').html(response);
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
})
//------------------------------------------  Change The Dropdown When Click on  Salary Type 

$(document).on('change', '#dropdown_InstanceSalaryAttributeId_SAR', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).find('option:selected').text();
    var data = {
        SalaryAttributeMasterName: attributeval
    };
    loaddingimg.css('display', 'block');
    CommonAjaxFunction('GET', '/PayRoll/Checkispercentage', data, function (response) {
      
        if (response) {
            //-------------Percentage ok
            $("#Insert_SAR #Percentage_SAR").css('display', 'contents');
            $("#Insert_SAR #salary_SAR").css('display', 'none');
            $("#Insert_SAR #ispercentoramount").css('display', 'contents');
            $("#Insert_SAR #salary_SAR input[type='text']").val("");
            $("input[name='IsSalaryPercentage'][value='A']").prop('checked', false);
            $("input[name='IsSalaryPercentage'][value='P']").prop('checked', true);
            $("#Insert_SAR #salary_SAR").find('.field-validation-error').remove();

        } else {
            $("#Insert_SAR #Percentage_SAR").css('display', 'none');
            $("#Insert_SAR #salary_SAR").css('display', 'contents');
            $("#Insert_SAR #ispercentoramount").css('display', 'none');
            $("#Insert_SAR #Percentage_SAR").find('.field-validation-error').remove();
            $("#Insert_SAR #Percentage_SAR input[type='text']").val("");
                $("input[name='IsSalaryPercentage'][value='A']").prop('checked', true);
                $("input[name='IsSalaryPercentage'][value='P']").prop('checked', false);
        }
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
});
//--------------------------------------------------------------------------      GetindividualRecords  In salary Attribute For Roles

function GetindividualRecords() {

    loaddingimg.css('display', 'block');

  
    //var data = {
    //    userId: Userid
     
    //};
    CommonAjaxFunction('GET', '/PayRoll/GetindividualRecords', null, function (response) { bindDatatableSAR_Individualrecords(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 

    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableSAR_Individualrecords(response) {
        debugger;
        var formattedDate = GetDateFormat();
        var table = $('#tblSARinsertresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_SAR_insert").text(response.length);
        var newTable = $("#tblSARinsertresults").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'SALARY ATTRIBUTES FOR ROLES REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3,4,5,6,7]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'SALARY ATTRIBUTES FOR ROLES REPORT',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1, 2, 3,4,5,6,7]
                    },
                },

                {
                    extend: 'print',
                    title: 'SALARY ATTRIBUTES FOR ROLES REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3,4,5,6,7]
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
                    data: "InstanceSalaryAttributeId",
                    visible: false,

                    render: function (data, type, row, meta) {
                        //  length++;
                        return row.instanceSalaryAttributeId
                    }
                },
                {
                    targets: 0, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                },

                {
                    data: "SalaryAttributeName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.salaryAttributeName + '<input type="text" value=' + row.instanceSalaryAttributeId + ' hidden/>'

                    }
                },
                {
                    data: "StartDate",

                    render: function (data, type, row, meta) {
                        //  length++;
                        var startDate = new Date(row.startDate);

                        return startDate.toLocaleDateString();

                    }
                },
                {
                    data: "EndDate",
                            
                    render: function (data, type, row, meta) {
                        var endDate = new Date(row.endDate);

                        return endDate.toLocaleDateString();

                    }
                },
                {
                    data: "Percentage",

                    render: function (data, type, row, meta) {
                        return row.percentage + '%';
                    }
                },
                {
                    data: "Salary",

                    render: function (data, type, row, meta) {
                        return row.salary + '/-';
                    }
                }, 
                 {
                     data: "IsActive",

                    render: function (data, type, row, meta) {
                        return row.isActive
                    }
                }
               

            ]


        });
      //  newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
        table.on('draw', function () {
            $('#tblSARinsertresults').find('td:nth-child(2)').attr('title', 'Edit');
        });
        $('#tblSARinsertresults').find('td:nth-child(2)').attr('title', 'Edit');
        loaddingimg.css('display', 'none');
    }
   
}

//------------------------------------------------------------------------  Date Compare

$(".form-group #StartDate").on("change", function () { datescompare(event, "End Date", "Start Date") });
$(".form-group #EndDate").on("change", function () { datescompare(event, "End Date", "Start Date") });


//-------------------------------------------------------------------------------Data Getting For Update
$(document).on('click', '#tblSARinsertresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();

    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
  
    loaddingimg.css('display', 'block');
    var data = {
        UserId:UserIdforIndRecords,
        RoleName:null,
        SalaryAttributeId:GovFundId
    };
   
    nextpage("CreateSalaryAttributesForRoles", data)
        .then(() => {
         
           // alert("hii");
            GetindividualRecords();
            $("#Insert_SAR #dropdown_InstanceSalaryAttributeId_SAR").prop('disabled', true);
            $("#Insert_SAR #clearform").prop('disabled', true);
            $("#Insert_SAR #Save_SAR").val('Update');
            $('#Insert_SAR #dropdown_InstanceSalaryAttributeId_SAR').css('opacity', '0.3').css('color', 'red');

        });
});

//------------------------------------------------------------------------------------ Radio Button Change
$(document).on('change', '#ispercentoramount input[type="radio"]', function (event) {
    event.stopImmediatePropagation();
    var radiobuttonval = $(this).val();
    if (radiobuttonval == "P") {
        $('#salary_SAR').css('display', 'none');
        $('#Percentage_SAR').css('display', 'contents');
    } else if (radiobuttonval == "A") {
        $('#salary_SAR').css('display', 'contents');
        $('#Percentage_SAR').css('display', 'none');
    }
    $("#salary_SAR").find('input[type="number"]').val('');
    $("#Percentage_SAR").find('input[type="number"]').val('');
    $("#Insert_SAR #salary_SAR").find('.field-validation-error').remove();
    $("#Insert_SAR #Percentage_SAR").find('.field-validation-error').remove();
   
});