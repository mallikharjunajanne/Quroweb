

$(document).ready(function () {
    if ($("#SearchRoleWise").css('display')=='block') {
        searchRoles();
    }
})
try {

    if (tabletargetpagetblSEMsearchresults == undefined) {
        var tabletargetpagetblSEMsearchresults = 0;
    }
}
catch {
    var tabletargetpagetblSEMsearchresults = 0;
}
//===============================

$(document).on('click', '#Serach_MR #sub_tblMR', function () {
    tabletargetpagetblSEMsearchresults = 0;
    searchRoles();

})

//==========================================================  Search Roles 
function searchRoles() {

   // document.getElementById("loading").style.display = "block";
    loaddingimg.css('display', 'block');
    var formid = $('#Serach_MR');
    var SalaryAttributeMasterId = $(formid).find("#RoleName").val();
    var SalaryAttributeType = $(formid).find("#RoleDescription").val();

    $.ajax({
        url: "/Rolewise/SearchRoles?RoleName=" + SalaryAttributeMasterId + "&RoleDescription=" + SalaryAttributeType,
        type: "GET",
        dataType: "JSON",
        success: bindDatatableMR

    });

    //--------------------------------------------------------Bind Data into Data Table 

    function bindDatatableMR(response) {
        //

       // var formattedDate = GetDateFormat();
        //   var num = 0;
        var table = $('#tblMRsearchresults').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_MR").text(response.length);
        //  alert("hi1");

        var newTable=    $("#tblMRsearchresults").DataTable({
             dom: 'Bfrtip',
     

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
             buttons: [],

            //  stateSave:true,
            data: response,
            columns: [

               
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

                        return row.roleName

                    }
                },
                {
                    data: "RoleDescirption",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.roleDescirption

                    }
                },
                {
                    data: "FolderSize",

                    render: function (data, type, row, meta) {
                        return row.folderSize
                    }
                },
               
                {

                    render: function (data, type, row, meta) {
                        //  length++;

                        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;margin-top:3%;cursor: pointer;" title="Delete"><input type="text" value=' + row.instanceRoleId + ' hidden/></i>'

                    }
                }
            ]


        });
        newTable.page(tabletargetpagetblSEMsearchresults).draw('page');
        table.on('draw', function () {
            $('#tblMRsearchresults').find('td:nth-child(2)').attr('title', 'Edit');
        });
        $('#tblMRsearchresults').find('td:nth-child(2)').attr('title', 'Edit');
        loaddingimg.css('display', 'none');
    }
}
//----------------------------------------------------------- Click on Create Role 
$(document).on('click', '#addnewRoleformanage', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');
    $('#SearchRoleWise').css('display', 'none');

    CommonAjaxFunction('GET', '/Rolewise/CreateRole', null, function (response) {
        $('#CreateRoleScreenAll').css('display', 'block');
        $('#CreateRoleScreenAll').html(response);
        loaddingimg.css('display', 'none');
    },
        function (response) {
            loaddingimg.css('display', 'none');
        }, false
        )

})

//-------------------------------------------      delete Roles   

$(document).on('click', '#tblMRsearchresults .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    //debugger;
    var data = {
        InstanceRoleId: $(this).find('input[type="text"]').val()
    };
    var table = $('#tblMRsearchresults').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    CommonDeleteFunction('Role', 'GET', '/Rolewise/DeleteRole', data, function (response) {
        $('.alert-success p').text("Record Deleted Successfully.");
        $(".alert-success").show().delay(5000).fadeOut()
        searchRoles();
    });
})
//----------------------------------------------------------------  Check Box Click to get Parent Role Menu
$(document).on('click', '.Rolecheckbox input[type=checkbox]', function (event) {
    event.stopImmediatePropagation();
    //debugger;
    if ($(this).closest('.col-12').find('.parentcheckboxes').length>0) {
        if ($(this).closest('.col-12').find('.parentcheckboxes').css('display') === 'none') {
            $(this).closest('.row').css('height', 'auto');
            $(this).closest('.col-12').find('div:eq(1)').css('display', 'contents');
        } else {
            $(this).closest('.row').css('height', '34px');
            $(this).closest('.col-12').find('input[type=checkbox]').prop('checked', false);
            $(this).closest('.col-12').find('div:eq(1)').css('display', 'none');

        }
    }
})
//==================================================================================  Click On Save
$("#Create_Role").submit(function (event) {

       //  event.stopImmediatePropagation();
    event.preventDefault();
    loaddingimg.css('display', 'block');


  // debugger;
  //  alert("hiii");
    var formdata_CSA = $(this).serialize();
   // var formdata = new FormData();
    checkroleavailabilty();
    var formElement = document.getElementById('Create_Role');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationMessages2 = formElement.getElementsByClassName('error2');

        var validationmelength = validationMessages.length;
        

        var checksall = $('#Create_Role').find('.col-10').find('[type="checkbox"]');
        for (var i = 0; i < checksall.length; i++) {
            if ($(checksall[i]).prop('checked')) {
                formdata_CSA += '&AuthMenuIds=' + $(checksall[i]).val();
            }
        }

        // Now, you have an array of objects with name-value pairs
        // If you need to convert it back to a serialized string, you can use jQuery.param
       // var serializedData = $.param(formdata_CSA);


        if (validationmelength == 0 && validationMessages2.length == 0) {

          //  event.stopImmediatePropagation();
            CommonAjaxFunction('POST', '/Rolewise/CreateRole', formdata_CSA, function (response) {
                $.ajax({
                    url: "/Rolewise/DisplayOrder",
                    type: "GET",
                    success: function (response) {
                        $('#SearchRoleWise').css('display', 'none');
                        $('#ForCreateRole').css('display', 'none');
                        $('#ForDisplayOrder').css('display', 'block');
                        $('#ForDisplayOrder').html(response);
                        DisplayOrder();
                       // loaddingimg.css('display', 'none');

                    }
                });
               
               
            }, function (status, error) {
                loaddingimg.css('display', 'none');

            }, false);
        }
        else {
            window.scrollTo(0, 150);
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
            loaddingimg.css('display', 'none');

        }
    }, 50);

})

//-------------------------------- Check Role Availabilty 
$(document).on('click', '#Create_Role #Checkroleavailability', function (event) {
    event.stopImmediatePropagation();
    checkroleavailabilty();
});
//=================
$(Document).on('change', '#Create_Role #RoleNamecheck', function () { checkroleavailabilty(); });
//================
function checkroleavailabilty() {
    document.getElementById("loading").style.display = "block";
    var rolena = $('#Create_Role').find('#RoleNamecheck').val();
    if (rolena != '') {


        var data = {
            RoleName: rolena,
            RoleId: $('#Create_Role').find('#instanceRoleIdcheck').val()
        };
        CommonAjaxFunction('GET', '/Rolewise/RoleAvailabilty', data, function (response) {
            if (response == '1') {
                $('#Create_Role .compare').addClass('error2');
                $('.compare').css('color', 'red');
                $('#Create_Role .compare').text('Role Name ' + rolena + ' Already Exists.');
            }
            else {
                $('#Create_Role .compare').removeClass('error2');
                $('#Create_Role .compare').text('Available');
                $('.compare').css('color', 'green');

            }
            document.getElementById("loading").style.display = "none";

        }, function (status, error) {
            document.getElementById("loading").style.display = "none";

        }, false);
    }
    else {
        $('#Create_Role .compare').text('');
        $('.alert-danger p').text("Pleae Enter Role Name");
        $(".alert-danger").show().delay(4000).fadeOut()
        loaddingimg.css('display', 'none');

    }

};

//====================================

//========================================================== Bind the  Display Oder data to table  
function DisplayOrder() {

    loaddingimg.css('display', 'block');
   
    $.ajax({
        url: "/Rolewise/DisplayOrder",
        type: "POST",
        dataType: "JSON",
        success: bindDatatableOrders

    });

    //--------------------------------------------------------Bind Data into Data Table 

    function bindDatatableOrders(response) {
          loaddingimg.css('display', 'block');


        // var formattedDate = GetDateFormat();
        //   var num = 0;
        var table = $('#tblDisplayOrder').DataTable();
        table.destroy();
        $("#totalrecords_Tranctions_DO").text(response.length);
        //  alert("hi1");

        var newTable = $("#tblDisplayOrder").DataTable({
            dom: 'Bfrtip',


            bProcessing: false,
            bLengthChange: true,
          
            bfilter: false,
            bSort: false,
            searching: false,
           
            paging: false,
            bPaginate: true,
            buttons: [],
            data: response,
            columns: [


                {
                    targets: 0, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                },
                {
                    data: "Menuname",

                    render: function (data, type, row, meta) {
                        return row.menuname + '<div style="display:none"><input type="text" value="' + row.instanceMenuId +'" /></div>'
                    }
                    },

                {
                    data: "DisplayName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return '<div><input type="text" value="' + row.displayName+'" /></div>'

                    }
                },
                {
                    data: "RoleWiseDisplayOrder",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return '<div><input type="text" value="' + row.roleWiseDisplayOrder + '" class="orders" onkeypress="return(AllowFloat(event))" /></div>'

                    }
                }
            ],
            initComplete: function () {
                // Hide the loading image after DataTable initialization is complete
                loaddingimg.css('display', 'none');
            }

             
        });
       
        
    }
}
//========================   Back To search
$(document).on('click','#dispalyordersupdate #BacktoMenusorders', function (event) {
    event.stopImmediatePropagation();
   // debugger;
    loaddingimg.css('display', 'block');
    $('#ForCreateRole').css('display', 'block');
    $('#CreateRoleScreenAll').css('display', 'block');
    $('#ForDisplayOrder').css('display', 'none');
    $('#ForDisplayOrder').text('');
    $('#SearchRoleWise').css('display', 'none');

    loaddingimg.css('display', 'none');
   // searchRoles();
});//========================   Back To search
$(document).on('click','#dispalyordersupdate #backtosearch_CRorder', function (event) {
    event.stopImmediatePropagation();
   // debugger;
    loaddingimg.css('display', 'block');
    $('#SearchRoleWise').css('display', 'block');
    $('#CreateRoleScreenAll').css('display', 'none');
    $('#CreateRoleScreenAll').text('');


    loaddingimg.css('display', 'none');
    searchRoles();
});

//========================   Back To search
$(document).on('click', '#Create_Role #backtosearch_CR', function (event) {
    event.stopImmediatePropagation();
    // debugger;
    loaddingimg.css('display', 'block');
    $('#SearchRoleWise').css('display', 'block');
    $('#CreateRoleScreenAll').css('display', 'none');
    $('#CreateRoleScreenAll').text('');


    loaddingimg.css('display', 'none');
    searchRoles();
});



//=========================================================================  Click on Table Second Column

$(document).on('click', '#tblMRsearchresults td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    var parent = $(event.target).closest('tr');
    var GovFundId = $(parent).find('td').find('input[type="text"]').val();
    loaddingimg.css('display', 'block');
    var data = {
        InstanceRoleId: GovFundId
    };
    CommonAjaxFunction('GET', '/Rolewise/CreateRole', data, function (response) {
        $('#SearchRoleWise').css('display', 'none');
        $('#CreateRoleScreenAll').css('display', 'block');
        $('#CreateRoleScreenAll').html(response);
        $('#Create_Role #Save_CR').val("Preview Menus");
      
        $('#Create_Role #clearform').removeAttr('type').attr('type', 'button').val('Delete');


        loaddingimg.css('display', 'none');
    }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);
   
})
//=================================================================  cLICK oN uPDATE fOR  Display Order
$(document).on('click', '#dispalyordersupdate #Update_CR', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');

    var errormessage = 'Please check the Duplicate Display Order in Sl.No ';
    var errorappend = $('#dispalyordersupdate .errorofallemployeeattendence');

    var parenttable = $('#tblDisplayOrder tbody tr');
    parenttable.find('.orders').removeClass('errorboxshadow');
    var tablelength = $(parenttable).length;
    var numberoferrors = 0;
    $(errorappend).text(' ');
    var arryorders = [];
    Array.prototype.hastwotimesvalues = function (value) {
        var count = 0;

        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                count++;
                if (count >= 2) {
                    return true;
                }
            }
        }
        return false;
    };
    for (var i = 0; i < tablelength; i++) {
        var working = parseInt($(parenttable[i]).find('td:nth-child(4)').find('input[type="text"]').val()) || 0;
        arryorders.push(working);
        if (working != 0) {


            if (arryorders.hastwotimesvalues(working)) {
                $(errorappend).text(errormessage + " " + (i + 1) + "");
                numberoferrors++;
                window.scrollTo(0, 120);
                $(parenttable[i]).find('td:nth-child(4)').find('input[type="text"]').addClass('errorboxshadow');
                loaddingimg.css('display', 'none');

                break;
            }
        }
    }
    loaddingimg.css('display', 'none');

    if (numberoferrors == 0) {
        // debugger;
        //alert("hiii");
        var batchSize = 80;

        // Step 1: DeleteDisplayOrder (GET request)
        CommonAjaxFunction('GET', '/Rolewise/DeleteDisplayOrder', null, async function (response) {
            // Step 2: UpdateDisplayOrder (POST requests in batches)
            await updateDisplayOrder(response);
        }, function (status, error) {
            // Handle error for the GET request
        }, false);

        async function updateDisplayOrder(response) {
            for (var i = 0; i < tablelength; i += batchSize) {
                loaddingimg.css('display', 'block');
                $('#dispalyordersupdate #Update_CR').attr('disabled', true);
                var formData = new FormData();

                for (var j = i; j < Math.min(i + batchSize, tablelength); j++) {
                    formData.append('MenuId', parseInt($(parenttable[j]).find('td:nth-child(2) input[type="text"]').val()) || 0);
                    formData.append('DisplayNameList', $(parenttable[j]).find('td:nth-child(3) input[type="text"]').val()) || null;
                    formData.append('DisplayOrderList', parseInt($(parenttable[j]).find('td:nth-child(4) input[type="text"]').val()) || 0);
                }

                // CommonAjaxFunction for each batch (POST request)
                await new Promise((resolve, reject) => {
                    CommonAjaxFunction('POST', '/Rolewise/UpdateDisplayOrder', formData, function (response) {
                       
                        resolve();
                    }, function (status, error) {
                        // Handle error for the POST request
                        reject(error);
                    }, true);
                });
            }

            // Hide loading image after the entire for loop is completed
            $('.alert-success p').text("Record Updated Successfully.");
            $(".alert-success").show().delay(5000).fadeOut()
            $(errorappend).text('Record Updated Successfully.');
            loaddingimg.css('display', 'none');
        }
    }


})

//=========================================  Record  Delete Successfully
$(document).on('click', '#Create_Role #clearform', function (event) {
    event.stopImmediatePropagation();
    if ($('#Create_Role #clearform').val() == "Delete") {
       // alert("hii");
       // loaddingimg.css('display', 'block');

        var data = {
            InstanceRoleId: $("#Create_Role #instanceRoleIdcheck").val()

        };
        
        CommonDeleteFunction('Role', 'GET', '/Rolewise/DeleteRole', data, function (response) {
            $('.alert-success p').text("Record Deleted Successfully.");
            $(".alert-success").show().delay(6000).fadeOut()
            searchRoles();
            $('#SearchRoleWise').css('display', 'block');
            $('#CreateRoleScreenAll').css('display', 'none');
           // loaddingimg.css('display', 'none');

        });
    }
})