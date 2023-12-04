
//--------------------------------------  For Manage Employees   12-09-2023




//--------------------------Search The CONFIGURE mANage Category
$(document).ready(function () {
    searchManageEmployees();
    setProgressBar(5, '.c-5');
    try {
        $('#Insert_ME #Password').attr("type", "password");
        $('#Insert_ME #ConPassword').attr("type", "password");
    } catch {

    }
   
})
//---------------------------------------------------------------------------Search
$(document).on('click', '#Serach_ME #sub_tblME', function (event) {
    event.stopImmediatePropagation();
    searchManageEmployees();

});
try {

    if (tabletargetpagetblSEMsearchresults == undefined) {
        var tabletargetpagetblSEMsearchresults = 0;
    }
}
catch {
    var tabletargetpagetblSEMsearchresults = 0;
}

function searchManageEmployees() {

    loaddingimg.css('display', 'block');

    var formid = $('#Serach_ME');

    var data = {
        RoleId: $(formid).find("#dropdown_RoleId_ME").val(),
        UserName: $(formid).find("#UserNamesearch").val(),
        FirstName: $(formid).find("#FirstNamesearch").val(),
        LastName: $(formid).find("#LastNamesearch").val(),
        AdmissionNumber: $(formid).find("#AdmissionNumbersearch").val(),
      ///  InstanceUserCode: $(formid).find("#InstanceUserCodesearch").val(),
        Category: $(formid).find("#dropdown_Category_MEsearch").val(),
        SubCategory: $(formid).find("#dropdown_SubCategory_MEsearch").val(),
        InstanceClassificationId: $(formid).find("#dropdown_Department_MEsearch").val(),
        DesignationId: $(formid).find("#dropdown_DesignationId_MEsearch").val()

    };
    CommonAjaxFunction('GET', '/PayRoll/SearchManageEmployeesJson', data, function (response) { bindDatatableME(response) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableME(response) {

       // debugger;
        var formattedDate = GetDateFormat();
        var table = $('#tblMEsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_ME").text(response.length);
        var newTable = $("#tblMEsearchresults").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'MANAGE EMPLOYEES REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4,5,6,7,8]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'MANAGE EMPLOYEES REPORT',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8]
                    },
                },

                {
                    extend: 'print',
                    title: 'MANAGE SUB CATEGORY REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6, 7, 8]
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
                    data: "UserId",
                    visible: false,

                    render: function (data, type, row, meta) {
                        //  length++;
                        return row.userId
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
                    data: "FullName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.fullName

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

                        return row.grossSalary + '<input type="text" value=' + row.userId + ' hidden/></i>'

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
                      //  return row.dateOfJoining + '<input type="text" value=' + row.userId + ' hidden/></i>'

                    }
                }

            ]


        });
        try {
              newTable.column(1).order('asc').draw();
           // newTable.column(5).nodes().to$().css("text-align", "center");

            newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
            table.on('draw', function () {
                $('#tblMEsearchresults').find('td:nth-child(2)').attr('title', 'Edit Employee Details');
                $('#tblMEsearchresults').find('td:nth-child(2)').css('width', '111px');
            });
            $('#tblMEsearchresults').find('td:nth-child(2)').attr('title', 'Edit Employee Details');
            $('#tblMEsearchresults').find('td:nth-child(2)').css('width', '111px');

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
$("#Insert_ME").submit(function (event) {
    event.preventDefault();
    //$('#Insert_MSC input[type="radio"]').prop("disabled", false);
    //$('#Insert_MSC #dropdown_PayrollCategoryName_MSC').prop("disabled", false);
    var identitypass = $('#Insert_ME #IdentityPassword').val();
    var password = $('#Insert_ME #Password').val();
    debugger;
   // 
    var formdata_CSA = $(this).serialize();
    if ($('#Insert_ME #Save_ME').val() == "Update") {
        formdata_CSA += '&update=update';
        if (identitypass != password) {
            var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,10}$/;

            if (!password.match(passwordPattern)) {
                window.scroll(0, 0);
                $("#Insert_ME .passwordfor").find('.compare').addClass('error2');
                $("#Insert_ME .passwordfor").find('.compare').text('Password must have at least 8-10 characters, must contain at least one lower case letter, one upper case letter, one digit and one special character.Allowed special chars are !@#$%^&*()+=')
            }
            else {
                $("#Insert_ME .passwordfor .compare").removeClass('error2');
                $("#Insert_ME .passwordfor").find('.compare').text("");
            }
        }
        else {
            $("#Insert_ME .passwordfor .compare").removeClass('error2');
            $("#Insert_ME .passwordfor").find('.compare').text("");
        }
    }
    else {
        var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,10}$/;

        if (!password.match(passwordPattern)) {
            window.scroll(0, 0);
            $("#Insert_ME .passwordfor").find('.compare').addClass('error2');

            $("#Insert_ME .passwordfor").find('.compare').text('Password must have at least 8-10 characters, must contain at least one lower case letter, one upper case letter, one digit and one special character.Allowed special chars are !@#$%^&*()+=')
        }
        else {
            $("#Insert_ME .passwordfor .compare").removeClass('error2');
            $("#Insert_ME .passwordfor").find('.compare').text("");
        }
    }




    var formElement = document.getElementById('Insert_ME');
    setTimeout(function () {

        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationMessages2 = formElement.getElementsByClassName('error2');
        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {

            //setCookie("AdmissionNumber_ME", $(formElement).find("#AdmissionNumber_ME"), 1);
            //setCookie("FirstName_ME", $(formElement).find("#FirstName_ME"), 1);
            //setCookie("GrossSalary_ME", $(formElement).find("#GrossSalary_ME"), 1);

            loaddingimg.css('display', 'block');
            CommonAjaxFunction('POST', '/PayRoll/CreateManageEmployees', formdata_CSA, function (response) {
              //  debugger;

                if (response == "ADS" || response == "-1") {
                    $('.alert-danger p').text("Employee Exist With This Id");
                    $(".alert-danger").show().delay(7000).fadeOut()
                    loaddingimg.css('display', 'none');
                }

                else {
                    if ($('#Insert_ME #Save_ME').val() == "Update") {

                        $('.alert-success p').text(" Employees Updated successfully.");
                        $('#Insert_ME #Save_ME').attr('disabled', true);
                    } else {
                        $('.alert-success p').text("Employee Inserted successfully.");
                        $(".tabsofME").find("#SalaryAttributes_ME").attr('disabled', false);
                        $(".tabsofME").find("#SalaryAttributes_ME").addClass('tabchanges');
                        $(".tabsofME").find("#EmpDatails_ME").removeClass('tabchanges');

                        salaryattributegetting();
                    }
                    loaddingimg.css('display', 'none');
                    //CommonAjaxFunction('GET', '/PayRoll/CreateManageEmployees', null, function (response) {
                    //    $('#appendinsertmanageemployees').html('');
                    //    $('#appendinsertmanageemployees').html(response);
                    //    loaddingimg.css('display', 'none');
                    //}, function (status, error) {
                    //    loaddingimg.css('display', 'none');
                    //}, false);
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
$(document).on('click', '#addnewmanageemployeesbtn', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    $('#appendinsertmanageemployees').html('');
   
    $('#appendsearchmanageemployees').css('display', 'none');
  //  $('#appendsearchmanageemployees').prop('disabled', true);
    $('#appendinsertmanageemployees').css('display', 'block');
    CommonAjaxFunction('GET', '/PayRoll/CreateManageEmployees', null, function (response) {
        $('#appendinsertmanageemployees').html(response);
        $(".tabsofME").find("#SalaryAttributes_ME").attr('disabled', true);
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');

    }, false);

})
//---------------------------------------------------------------------------------------  Data Getting For Update
$(document).on('click', '#tblMEsearchresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
   
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    loaddingimg.css('display', 'block');
    var data = {
        UserId: GovFundId
    };
    CommonAjaxFunction('GET', '/PayRoll/CreateManageEmployees', data, function (response) {
        $('#appendinsertmanageemployees').html('');

        $('#appendsearchmanageemployees').css('display', 'none');
       // $('#appendsearchmanageemployees').prop('disabled', true);
        $('#appendinsertmanageemployees').css('display', 'block');
        $('#appendinsertmanageemployees').html(response);
        $('#Insert_ME #Save_ME').val("Update");
        $('.card #updatesalaryattribute').text("UPDATE");
        
        $('#Insert_ME #clearform').css('opacity', '0.3');
      //  $('#Insert_ME #dropdown_PayrollCategoryName_MSC').css('opacity', '0.3').css('color', 'red');

        // $('#Insert_MSC input[type="radio"]').css('opacity', '0.3');
     //   $('#Insert_MSC input[type="radio"]').closest('.form-group').css('opacity', '0.7');
        var attributeval = $('#Insert_ME #dropdown_Bank_ME').val();
        bankdetails(attributeval);

        $('#Insert_MSC #clearform').prop("disabled", true);
      //  $('#Insert_MSC input[type="radio"]').prop("disabled", true);
      //  $('#Insert_MSC #dropdown_PayrollCategoryName_MSC').prop("disabled", true);

        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
    var table = $('#tblMEsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
})

//---------------------------------------------------------------------------------------------  When click on back to search Manage Category

$(document).on('click', '#Insert_ME #backtosearch_ME', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    $('#appendsearchmanageemployees').css('display', 'block');
    $('#appendinsertmanageemployees').css('display', 'none');

    $('#appendinsertmanageemployees').html(" ");
    searchManageEmployees();
    loaddingimg.css('display', 'none');
})

//------------------------------------------  Change The Dropdown When Click on   Category's

$(document).on('change', '#dropdown_Category_MEsearch', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    subcategorydropdown(attributeval,"dropdown_SubCategory_MEsearch");
});
///-----------------------------------------------------------  in insert screeen change the dropdown(Category)
$(document).on('change', '#Insert_MEdropdown_Category_ME', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    subcategorydropdown(attributeval,"Insert_MEdropdown_SubCategory_ME");
});




function subcategorydropdown(attributeval,id) {
   
    var formid = $('#Serach_ME');
    document.getElementById("loading").style.display = "block";
    var extraparameters = [];
    extraparameters.push($(formid).find("#InstanceidforME").val());
    extraparameters.push(attributeval);

   
    var data = {
        methodname: 'GetSubcategoryME',
        text: "PayrollSubCategoryName",
        value: "PayrollSubCategoryId",
        parameters: extraparameters
    };
   
 


    //console.log(formdataME);

    CommonAjaxFunction('POST', '/PayRoll/CommonDropdown', data, function (response) {
      
        var dropdown = $('#'+id); // Change this to match the generated ID
        dropdown.empty();
        dropdown.append($('<option></option>').val('').text('-------select-------'));
        if (response.length == 0 && id =="dropdown_SubCategory_MEsearch") {
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
//------------------------------------------  Change The Dropdown When Click on   BANK

$(document).on('change', '#dropdown_Bank_ME', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    bankdetails(attributeval);
});
function bankdetails(attributeval) {
    var formid = $('#Serach_ME');
    document.getElementById("loading").style.display = "block";
    var extraparameters = [];
    extraparameters.push($(formid).find("#InstanceidforME").val());
    extraparameters.push(attributeval);
    var data = {
        methodname: 'GetBankCodeME',
        text: "IFCCode",
        value: "BranchCode",
        parameters: extraparameters
    };
    CommonAjaxFunction('POST', '/PayRoll/CommonDropdown', data, function (response) {
        debugger;
        try {
            $('#Insert_ME').find('#ShiftCodeinsertME').val(response[0].value);
            $('#Insert_ME').find('#IFSCodeinsertME').val(response[0].text);
        } catch {
            $('#Insert_ME').find('#ShiftCodeinsertME').val(" ");
            $('#Insert_ME').find('#IFSCodeinsertME').val(" ");
        }



        document.getElementById("loading").style.display = "none";
    }, function (status, error) {

    }, false);
}
//------------------------------date Compare 
$("#Insert_ME #StartDate").on("change", function () { datescompare(event, "Date of Birth", "Date of Joining") });
$("#Insert_ME #EndDate").on("change", function () { datescompare(event, "Date of Birth", "Date of Joining") });


//---     Manage Employees Salary Attributes 

//-------------------------------------------------------------------------------   Goto Emp Datails

$(document).on('click', '#EmpDatails_ME', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
   
    $('#appendsearchmanageemployees').css('display', 'none');
    $('#appendinsertmanageemployees').css('display', 'block');
    $('.SalaryAttrbutesME').css('display', 'none');
    $('.EmpdetailsMe').css('display', 'block');

    $('#Insert_ME #Save_ME').val("Update");
    $('.card #updatesalaryattribute').text("UPDATE");

    $('#Insert_ME #clearform').css('opacity', '0.3');
    $('#Insert_MSC #clearform').prop("disabled", true);


    loaddingimg.css('display', 'none');
})
//----------------------------------------------------------------------------------------------    click /on Salary Attributes

$(document).on('click', '#SalaryAttributes_ME', function (event) {
    event.stopImmediatePropagation();
    salaryattributegetting();

})
function salaryattributegetting() {
    loaddingimg.css('display', 'block');
    $('#SalaryAttrbutesME').html('');

    $('#appendsearchmanageemployees').css('display', 'none');
    $('#appendinsertmanageemployees').css('display', 'block');
    $('.SalaryAttrbutesME').css('display', 'block');
    $('.EmpdetailsMe').css('display', 'none');


    CommonAjaxFunction('GET', '/PayRoll/CreateManageEmployeesSalary', null, function (response) {
        $('.SalaryAttrbutesME').html(response);

        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');

    }, false);
}
//---------------------------------------------------------  Tab Change 
var navLinksinME = document.querySelectorAll('.tabsofME button');

navLinksinME.forEach(link => {
    link.addEventListener('click', function (e) {

        e.preventDefault();

        // Remove active class from all links
        navLinksinME.forEach(link => link.classList.remove('tabchanges'));

        // Add active class to the clicked link
        this.classList.add('tabchanges');
    });
});