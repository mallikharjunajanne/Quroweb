//----------------------------04-09-2023

//--------------------------Search The CONFIGURE SALARY ATTRIBUTES
$(document).ready(function () {
    searchSalaryAttributes();
   // setProgressBar(1,'.c-1');
})

$(document).on('click', '#Serach_CSA #sub_tblCSA', function (event) {
    event.stopImmediatePropagation();
    searchSalaryAttributes();

});
try {

    if (tabletargetpagetblSEMsearchresults == undefined) {
        var tabletargetpagetblSEMsearchresults = 0;
    }
}
catch {
    var tabletargetpagetblSEMsearchresults = 0;
}

function searchSalaryAttributes() {

    document.getElementById("loading").style.display = "block";

    var formid = $('#Serach_CSA');
    var SalaryAttributeMasterId = $(formid).find("#dropdown_SalaryAttributeMasterId_CSA").val();
    var SalaryAttributeType = $(formid).find("#dropdown_SalaryAttributeType_CSA").val();
    var SalaryAttributeName = $(formid).find("#SalaryAttributeName").val();
    var StartDate = $(formid).find("#StartDate").val();
    var EndDate = $(formid).find("#EndDate").val();
 
    var IsActive = $(formid).find("#dropdown_IsActive_CSA").val();
    $.ajax({
        url: "/PayRoll/SearchSalaryAttributesJson?SalaryAttributeMasterId=" + SalaryAttributeMasterId + "&SalaryAttributeType=" + SalaryAttributeType + '&SalaryAttributeName=' + SalaryAttributeName + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&IsActive=' + IsActive,
        type: "GET",
        dataType: "JSON",
        success: bindDatatableSEM

    });
   
    //--------------------------------------------------------Bind Data into Data Table 

    function bindDatatableSEM(response) {
        //

        var formattedDate = GetDateFormat();
        //   var num = 0;
        var table = $('#tblCSAsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_CSA").text(response.length);
        //  alert("hi1");

        var newTable = $("#tblCSAsearchresults").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'CONFIGURE SALARY ATTRIBUTES REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'CONFIGURE SALARY ATTRIBUTES REPORT',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },



                },


                {
                    extend: 'print',
                    title: 'CONFIGURE SALARY ATTRIBUTES REPORT',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },
                }


            ],

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
                    data: "SalaryAttributeType",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.salaryAttributeType

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
                       

                        return row.isActive;

                    }
                },
                {

                    render: function (data, type, row, meta) {
                        //  length++;

                        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;margin-top:3%;cursor: pointer;" title="Delete"><input type="text" value=' + row.instanceSalaryAttributeId + ' hidden/></i>'

                    }
                }
            ]


        });
        newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
        table.on('draw', function () {
            $('#tblCSAsearchresults').find('td:nth-child(2)').attr('title', 'Edit');
        });
        $('#tblCSAsearchresults').find('td:nth-child(2)').attr('title', 'Edit');
        loaddingimg.css('display', 'none');
    }
   

}


//-------------------------------------------      delete sALARY Attributes  

$(document).on('click', '#tblCSAsearchresults .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var data = {
        InstanceSalaryAttributeId: $(this).find('input[type="text"]').val()
    };
    var table = $('#tblCSAsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    CommonDeleteFunction('Salary Attribute', 'GET', '/PayRoll/DeleteSAlaryAttribute', data, function (response) {
        $('.alert-success p').text("Record Deleted Successfully.");
        $(".alert-success").show().delay(5000).fadeOut()
        searchSalaryAttributes();
    });
})
//------------------------------------------click on   Add Salary Attribute
$(document).on('click', '#addnewsalaryattributebtn', function (event) {
    event.stopImmediatePropagation();
    //var table = $('#tblCSAsearchresults').DataTable();
    //tabletargetpagetblSEMsearchresults = table.page.info().page;
    loaddingimg.css('display', 'block');
    $('#appendforinsertsalaryattribute').html('');
    $('#appendsearchsalaryattribute').css('display', 'none');
    $('#appendsearchsalaryattribute').html(' ');
    $('#appendforinsertsalaryattribute').css('display', 'block');
CommonAjaxFunction('GET', '/PayRoll/CreateSalaryAttribute', null, function (response) {
    $('#appendforinsertsalaryattribute').html(response);
    loaddingimg.css('display', 'none');
}, function (status, error) {
    loaddingimg.css('display', 'none');

}, false);

})
//------------------------------------------  Change The Dropdown When Click on  Salary Type 

$(document).on('change', '#dropdown_SalaryAttributeType_CSA', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    salaryattributedropdown(attributeval);
});

function salaryattributedropdown(attributeval) {
    // debugger;
    document.getElementById("loading").style.display = "block";

   // var attributeval = $(this).val();
    // alert(attributeval);
    var data = {
        ParentId: attributeval
    };
    CommonAjaxFunction('GET', '/PayRoll/SalDependson', data, function (response) {
        debugger;
        var dropdown = $('#dropdown_SalDependsOn_CSA'); // Change this to match the generated ID
        dropdown.empty();
        dropdown.append($('<option></option>').val('').text('-------select-------'));
        response.forEach(function (department) {

            var option = document.createElement("option");
            option.value = department.value;
            option.text = department.text;

            document.getElementById("dropdown_SalDependsOn_CSA").appendChild(option);
            //   $('#InstanceSubClassificationId').val(instanceSubjectsValues);

        });
        document.getElementById("loading").style.display = "none";
    }, function (status, error) {

    }, false);

}





//---------------------------------------------------------------------------------------------   When Click ON submit Button 
$("#Insert_CSA").submit(function (event) {
    event.preventDefault();
   // event.stopImmediatePropagation();
   var formdata_CSA = $(this).serialize();

var formElement = document.getElementById('Insert_CSA');
setTimeout(function () {
    var validationMessages = formElement.getElementsByClassName('field-validation-error');
    var validationMessages2 = formElement.getElementsByClassName('error2');

    var validationmelength = validationMessages.length;

    if (validationmelength == 0 && validationMessages2.length==0) {
        CommonAjaxFunction('POST', '/PayRoll/CreateSalaryAttribute', formdata_CSA, function (response) {
            if (response == "-3") {
                $('.alert-danger p').text("You have already used this attribute");
                $(".alert-danger").show().delay(5000).fadeOut()
            }
          else  if (response == "-2") {
                $('.alert-danger p').text("You have already used this name");
                $(".alert-danger").show().delay(5000).fadeOut()
            }
          else  if (response == "-1") {
                $('.alert-danger p').text("To Update a particular Salary Attribute, Start Date must be greater than previous End Date.");
                $(".alert-danger").show().delay(6000).fadeOut()
            }
            else  {
                if ($('#Insert_CSA #Save_CSA').val() == "Update") {
                    loaddingimg.css('display', 'block');
                    $('.alert-success p').text("Salary Attribute Updated successfully.");
                    CommonAjaxFunction('GET', '/PayRoll/CreateSalaryAttribute', null, function (response) {
                        $('#appendforinsertsalaryattribute').html('');
                        $('#appendsearchsalaryattribute').css('display', 'none');
                        $('#appendsearchsalaryattribute').html(' ');
                        $('#appendforinsertsalaryattribute').css('display', 'block');
                        $('#appendforinsertsalaryattribute').html(response);
                        loaddingimg.css('display', 'none');
                    }, function (status, error) {
                        loaddingimg.css('display', 'none');
                    }, false);


                } else {
                    $('.alert-success p').text("Salary Attribute Inserted successfully.");
                }
               
                $(".alert-success").show().delay(5000).fadeOut()
            }
        }, function (status, error) {

        }, false);
    }
    else {
        $('.alert-danger p').text("Pleae Enter All Required Fields");
        $(".alert-danger").show().delay(5000).fadeOut()
    }
}, 50);

})
//---------------------------------------------------------------------------------------------  When click on back to search salary Attributes 

$(document).on('click', '#Insert_CSA #backtosearch_CSA', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    CommonAjaxFunction('GET', '/PayRoll/SearchSalaryAttributes', null, function (response) {
        $('#AppendAllPayRolls #InnerPayRoll').html(response);
        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
})
//--------------------------------------------------------------------------------------------- DAta Getting For Updating The Salary Attributes
$(document).on('click', '#tblCSAsearchresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    loaddingimg.css('display', 'block');
    var data = {
        InstanceSalaryAttributeId: GovFundId
    };
    CommonAjaxFunction('GET', '/PayRoll/CreateSalaryAttribute', data, function (response) {
        $('#appendforinsertsalaryattribute').html('');
        $('#appendsearchsalaryattribute').css('display', 'none');
        $('#appendsearchsalaryattribute').html(' ');
        $('#appendforinsertsalaryattribute').css('display', 'block');
        $('#appendforinsertsalaryattribute').html(response);
        $('#Insert_CSA #Save_CSA').val("Update");
        $('.card #updatesalaryattribute').text("UPDATE");

        $('#Insert_CSA #clearform').css('opacity', '0.3');
     

        $('#Insert_CSA #clearform').prop("disabled", true);
        $('#Insert_CSA #dropdown_SalaryAttributeMasterId_CSA').css('opacity', '0.3').css('color', 'red');
        $('#Insert_CSA #dropdown_SalaryAttributeMasterId_CSA').prop("disabled", true);


        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
    var table = $('#tblCSAsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
})
//--------------------------------------------------------------------------------------------------- (DropDown) Change Depend on In the Salary Attribute

$(document).on('change', '#Insert_CSA #dropdown_SalDependsOn_CSA', function (event) {
   
    var attributeval = $(this).val();
    event.stopImmediatePropagation();
    if (attributeval == "1") {
        $("#appendislossofpay").css('display', 'contents');
    }
    else {
        $("#appendislossofpay").css('display', 'none');
        $("#appendislossofpay").find('input[type="checkbox"]').prop("checked", false);
    }

})

//------------------------------------------------------------------------  Date Compare

$(".col-sm-4 #StartDate").on("change", function () { debugger; datescompare(event, "start Date", "End Date") });
$(".col-sm-4 #EndDate").on("change", function () { debugger; datescompare(event, "start Date", "End Date") });