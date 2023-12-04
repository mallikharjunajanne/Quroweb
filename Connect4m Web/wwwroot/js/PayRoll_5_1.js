
//---------------------------------------------------------------------------------            Getting List For Salary Attributes In Manage Employees
$(document).ready(function () {
    searchSalaryAttributesME();
})



function searchSalaryAttributesME() {
   // var data = $("#Insert_ME").find('#UserIdMe').val();
    document.getElementById("loading").style.display = "block";
    $.ajax({
        url: "/PayRoll/GetindividualRecordsEmployees",
        type: "GET",
        dataType: "JSON",
        success: bindDatatableSEM

    });

    //--------------------------------------------------------Bind Data into Data Table 

    function bindDatatableSEM(response) {
        //

        // var formattedDate = GetDateFormat();
        //   var num = 0;
        var table = $('#tblMEsearchresultssalaryattributes').DataTable();
        table.destroy();

        //  alert("hi1");

        var newTable = $("#tblMEsearchresultssalaryattributes").DataTable({
            dom: '',
            //buttons: [
            //    {
            //        extend: 'pdfHtml5',
            //        title: 'CONFIGURE SALARY ATTRIBUTES REPORT',
            //        message: "Report On: " + formattedDate,
            //        exportOptions: {
            //            columns: [1, 2, 3, 4, 5, 6]
            //        },

            //    }
            //    ,
            //    {
            //        extend: 'excel',
            //        title: 'CONFIGURE SALARY ATTRIBUTES REPORT',
            //        message: "Report On: " + formattedDate,

            //        exportOptions: {
            //            columns: [1, 2, 3, 4, 5, 6]
            //        },



            //    },


            //    {
            //        extend: 'print',
            //        title: 'CONFIGURE SALARY ATTRIBUTES REPORT',
            //        message: "Report On: " + formattedDate,
            //        exportOptions: {
            //            columns: [1, 2, 3, 4, 5, 6]
            //        },
            //    }


            //],

            bProcessing: false,
            bLengthChange: true,
            /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
            bfilter: false,
            bSort: true,
            searching: false,
            //scrollX: true,
            //scrollY: '400px',
            /* scrollCollapse: true,*/
            paging: true,
            bPaginate: true,
            //  stateSave:true,
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

                        return row.salaryAttributeName

                    }
                },
                {
                    data: "Percentage",

                    render: function (data, type, row, meta) {
                        //  length++;
                        if (row.percentage == 0) {
                            return '';
                        } else {
                            return row.percentage

                        }

                    }
                },
                {
                    data: "Salary",

                    render: function (data, type, row, meta) {
                        //  length++;
                        if (row.salary == 0) {
                            return '';
                        } else {
                            return row.salary

                        }
                      

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
                }
                ,
                {
                    data: "IsActive",

                    render: function (data, type, row, meta) {


                        return row.isActive + '<input type="text" value=' + row.instanceSalaryAttributeId + ' hidden/></i>';

                    }
                }

            ]


        });
        newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
        table.on('draw', function () {
            $('#tblMEsearchresultssalaryattributes').find('td:nth-child(2)').attr('title', 'Edit');
        });
        $('#tblMEsearchresultssalaryattributes').find('td:nth-child(2)').attr('title', 'Edit');
        loaddingimg.css('display', 'none');
    }


}



//------------------------------------------  Change The Dropdown When Click on  Salary Type 

$(document).on('change', '#insertdropdown_SalaryAttributeId_ME_salary', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).find('option:selected').text();
    var data = {
        SalaryAttributeMasterName: attributeval
    };
    loaddingimg.css('display', 'block');
    CommonAjaxFunction('GET', '/PayRoll/Checkispercentage', data, function (response) {

        if (response) {
            //-------------Percentage ok
            $("#Insert_MES #percenatgedisplay").css('display', 'contents');
            $("#Insert_MES .form-group #Salary_Me").attr('disabled', true);
            $("#Insert_MES .form-group #percentage_ME").attr('disabled', false);
           
            $("#Insert_MES #Salary_Me").val("");

            $("input[name='IsSalaryPercentage'][value='A']").prop('checked', false);
            $("input[name='IsSalaryPercentage'][value='P']").prop('checked', true);
            $("#Insert_MES #salaryvalidations").find('.field-validation-error').remove();

        } else {
            $("#Insert_MES #percenatgedisplay").css('display', 'none');
            $("#Insert_MES .form-group #Salary_Me").attr('disabled', false);
            $("#Insert_MES .form-group #percentage_ME").attr('disabled', true);

            $("#Insert_MES #percentage_ME").val("");

            $("input[name='IsSalaryPercentage'][value='A']").prop('checked', true);
            $("input[name='IsSalaryPercentage'][value='P']").prop('checked', false);
            $("#Insert_MES #percentagevalidations").find('.field-validation-error').remove();
        }
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
});

//-----------------------------------------------------   Radio Buttons Changed

$(document).on('change', "input[name='IsSalaryPercentage']", function (event) {
    var id = $(this).val();
    if (id == "A") {
      //  $("#Insert_MES #percenatgedisplay").css('display', 'none');
        $("#Insert_MES .form-group #Salary_Me").attr('disabled', false);
        $("#Insert_MES .form-group #percentage_ME").attr('disabled', true);

        $("#Insert_MES #percentage_ME").val("");

        $("input[name='IsSalaryPercentage'][value='A']").prop('checked', true);
        $("input[name='IsSalaryPercentage'][value='P']").prop('checked', false);
        $("#Insert_MES #percentagevalidations").find('.field-validation-error').remove();
    }
    else if (id == "P"){
        if ($("#Insert_MES #percenatgedisplay").css('display') === "contents") {
            $("#Insert_MES #percenatgedisplay").css('display', 'contents');
            $("#Insert_MES .form-group #Salary_Me").attr('disabled', true);
            $("#Insert_MES .form-group #percentage_ME").attr('disabled', false);

            $("#Insert_MES #Salary_Me").val("");

            $("input[name='IsSalaryPercentage'][value='A']").prop('checked', false);
            $("input[name='IsSalaryPercentage'][value='P']").prop('checked', true);
            $("#Insert_MES #salaryvalidations").find('.field-validation-error').remove();
            //$("#Insert_MES #salaryvalidations").removeClass('.field-validation-error');
        }
    }
  
})


//-----------------------------------------  Back To search
$(document).on('click', '#Insert_MES #backtosearch_MESalaryattributes', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    $('#appendsearchmanageemployees').css('display', 'block');
    $('#appendinsertmanageemployees').css('display', 'none');

    $('#appendinsertmanageemployees').html(" ");
    searchManageEmployees();
    loaddingimg.css('display', 'none');
})
//---------------------------------------------------------------------------------------  Data Getting For Update
$(document).on('click', '#tblMEsearchresultssalaryattributes td:nth-child(2)', function (event) {

    event.stopImmediatePropagation();
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    loaddingimg.css('display', 'block');
    var data = {
        salaryAttributeId: GovFundId
    };
    CommonAjaxFunction('GET', '/PayRoll/CreateManageEmployeesSalary', data, function (response) {
        debugger;
        $('.SalaryAttrbutesME').html('');
      
        $('.EmpdetailsMe').css('display', 'none');
       
        $('.SalaryAttrbutesME').css('display', 'block');
        $('.SalaryAttrbutesME').html(response);
        $('#Insert_MES #Save_MEsalary').val("Update");
      

        $('#Insert_MES #clearform').css('opacity', '0.3');
        $('#Insert_MES #insertdropdown_SalaryAttributeId_ME_salary').css('opacity', '0.3').css('color', 'red');
       

        $('#Insert_MES #clearform').prop("disabled", true);
  
        $('#Insert_MES #insertdropdown_SalaryAttributeId_ME_salary').prop("disabled", true);

        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
   
})
//-----------------------------------  Date Change
$("#Insert_MES #StartDateME").on("change", function () { datescompareME(event, "End Date", "Start Date") });
$("#Insert_MES #EndDateME").on("change", function () { datescompareME(event, "End Date", "Start Date") });


function datescompareME(event, start, end) {
    event.stopImmediatePropagation();

    debugger;
    try {
        var startDate = new Date(document.getElementById("StartDateME").value);
        var endDate = new Date(document.getElementById("EndDateME").value);
        var error = $('#EndDateME').closest('.form-group');
        $(error).find('.compare').removeClass('error2');
        if (endDate <= startDate) {


            $(error).find('.compare').addClass('error2');
            $(error).find('.compare').text(end + " must be greater than " + start + ".");

        } else {

            $(error).find('.compare').addClass('');
            $(error).find('.compare').text("");
        }

    } catch {

    }
}






//---------------------------------------------------------------------------------------------   When Click ON submit Button 
$("#Insert_MES").submit(function (event) {
    event.preventDefault();
    loaddingimg.css('display', 'block');
    // event.stopImmediatePropagation();
    $('#Insert_MES #insertdropdown_SalaryAttributeId_ME_salary').prop("disabled", false);
    var formdata_CSA = $(this).serialize();
   // $('#Insert_MES #insertdropdown_SalaryAttributeId_ME_salary').prop("disabled", true);

    var formElement = document.getElementById('Insert_MES');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationmelength = validationMessages.length;
        var validationMessages2 = formElement.getElementsByClassName('error2');
        if (validationmelength == 0 && validationMessages2.length == 0) {
            CommonAjaxFunction('POST', '/PayRoll/CreateManageEmployeesSalary', formdata_CSA, function (response) {
               
           
                    if (response == "313") {
                        $('.alert-danger p').text("You have already used this attribute");
                        $(".alert-danger").show().delay(6000).fadeOut()
                    }
                    else if (response == "-2" || response=="-1") {
                        $('.alert-danger p').text("Selected Start Date and End Date must lie between Salary Attribute Start Date and End Date.");
                        $(".alert-danger").show().delay(6000).fadeOut()
                    }
                   else if ($('#Insert_MES #Save_MEsalary').val() == "Update") {

                     salaryattributegetting();

                    $('.alert-success p').text("Salary Details Updated successfully.");
                    $(".alert-success").show().delay(6000).fadeOut()
                }
                    else {
                        salaryattributegetting();
                        $('.alert-success p').text("Salary Details Inserted successfully.");
                        $(".alert-success").show().delay(6000).fadeOut()
                    }


                
            }, function (status, error) {

            }, false);
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
    }, 50);
    loaddingimg.css('display', 'none');

})