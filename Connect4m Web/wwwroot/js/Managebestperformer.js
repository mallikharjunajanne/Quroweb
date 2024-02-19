//----------**** TABLE DATA BIND FUNCTION ****------------
$(document).ready(function () {
    $('#Addeventanduserphoto_Checkboxrelatedmain').hide();
    $('#Addeventanduserphoto_Checkboxrelated1').show();
    $('#Addbestperformerdataaddingaccordionoc2').hide();
    $('#Addbestperformerdataaddingtbl_accordionoc3').hide();
    $('#Updateview_Addbestperformerdataaddingtbl_accordionoc3').hide();
    $('#Updateview_Addbestperformerdataaddingaccordionoc2').hide();

    function CallToAjax(method, url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: method,
            success: bindDatatable,
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }


    CallToAjax('GET', '/Admin/ManageBestPerformerTabledata',

        //function bindDatatable();
        function (status, error) {
            // Handle error if needed
        }
    );

});


function DataCallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function CallToAjax_Withoutdata(method, url, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function FileCallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };
    if (hasFileUpload) {

        ajaxOptions.processData = false;
        ajaxOptions.contentType = false;
    }

    $.ajax(ajaxOptions);
}



//-----------------Search Quote
$('#Mainview_Searchbtn').click(function () {
    SearchQuotes();
});

function SearchQuotes() {
    var Title= $('#Titletxtid').val();
    
   
    var dataToSend = {
        Title: Title
    };

    DataCallToAjax('GET', '/Admin/ManageBestPerformerTabledata', dataToSend,
        function (response) {
            bindDatatable(response);
        }, function (status, error) {
            // Handle error if needed
        }
    );
}


//-----------------DataTable Data Dinding Function
function bindDatatable(response) {

    var formattedDate = GetDateFormat();
    
    var table = $('#Managebestperformertbl').DataTable();
    table.destroy();
    $("#ManagebestperformertblCount").text(response.length);


    var newTable = $("#Managebestperformertbl").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdfHtml5',
                title: 'Manage Holidays Report',
                message: "Report On: " + formattedDate,
                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                },

            }
            ,
            {
                extend: 'excel',
                title: 'Manage Holidays Report',
                message: "Report On: " + formattedDate,

                exportOptions: {
                    columns: [1, 2, 3, 4, 5, 6]
                },
            },


            {
                extend: 'print',
                title: 'Manage Holidays Report',
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

            //{
            //    data: "SNO",
            //    //visible: false,

            //    render: function (data, type, row, meta) {
            //        //  length++;
            //        return row.holidayId
            //    }
            //},
            {
                targets: 0, // Assuming this is the column index where you want to display numbering
                render: function (data, type, row, meta) {
                    var currentPage = table.page.info().page;
                    var rowsPerPage = table.page.info().length;
                    return (0 * rowsPerPage) + meta.row + 1;
                }
            },

            {
                data: "Title",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.title

                }
            },
            {
                data: "FirstName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.firstName + '<input type="text" value=' + row.performerId + ' hidden/>'

                }
            },
             {
                 data: "DisplayUntill",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.displayUntill

                }
            },
            {
                data: "PerformerId",

                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                }
            }
        ]


    });
    //Pdfs buttons hide this code
    newTable.buttons().container().hide();
    table.on('draw', function () {
        $('#Managebestperformertbl').find('td:nth-child(2)').attr('title', 'Edit').css({
            'text-decoration': 'underline',
            'font-weight': 'bold',
            'color': 'black'
        });
    });
    $('#Managebestperformertbl').find('td:nth-child(2)').attr('title', 'Edit').css({
        'text-decoration': 'underline',
        'font-weight': 'bold',
        'color': 'black'
    });
}

function GetDateFormat() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}

//----------Main View Clear Button
$('#Mainview_Clearbtn').click(function () {
   
    $('#Quote').val('');
    $('#Displaydate').val('');
    location.reload();
});



////------*** ICON CLICK DELETE FUNCTION ***------- 
$(document).on('click', '#Managebestperformertbl .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var confirmed = confirm("Are you sure you want to delete the Best Performer?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
     
        var PerformerId = $(this).closest('tr').find('input[type="text"]').val();
        var table = $('#Managebestperformertbl').DataTable();
        var tabletargetpagetblSEMsearchresults = table.page.info().page;
        debugger;
        $.ajax({
            url: '/Admin/Delete_ManageBestPerformer?PerformerId=' + PerformerId,
            type: 'GET',
            success: function (response) {
                $('#Errmsg').text('Record deleted successfully');
                SearchQuotes();
            },
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }
});





///------*** CREATE NEW CLASSIFICATION ***-------
$('#addnewbestperformer').click(function () {
  
    CallToAjax_Withoutdata('GET', '/Admin/Insert_ManageBestPerformer',
        function (response) {
            
            $('#Managebestperoformerdmaindiv').hide(); /*ManageQuotemaindiv*/
            $('#Managebestperoformerd_Updatediv3').empty();/* Managequotes_Updatediv3*/
            $('#Managebestperoformerd_Insertdiv2').html(response); /*Managequotes_Insertdiv2*/
        },
        function (status, error) {
            // Handle error if needed
        }
    );
});



///-----*** Add user and events checkbox show code
$('#Addeventanduserphoto').change(function () {
    
    if ($(this).is(':checked')) {
        $('#Addeventanduserphoto_Checkboxrelatedmain').show();
        $('#Addeventanduserphoto_Checkboxrelated1').hide();
        $(this).val('1');
    } else {        
        $('#Addeventanduserphoto_Checkboxrelatedmain').hide();
        $('#Addeventanduserphoto_Checkboxrelated1').show();
        $(this).val('');
    }
});




///-----*** ADD PERFORMER NAME ADD SHOW CODE START
$('#Addbestperformerabtn').click(function () {
   
    $('#SelectedBestperformerusername_spid').text('Select');

    CallToAjax_Withoutdata('GET', '/Admin/Adding_BestPerformer_dds',
        function (response) {
            
            populateClassificationDropdown(response.classificationList);
            populateRoleDropdown(response.roleList);
        },
        function (status, error) {
            // Handle errors here...!
        }
    );
    $('#Addbestperformerdataaddingaccordionoc2').show();
});


// in update add best performer
$('#UpdateAddbestperformerabtn').click(function () {
    debugger;
    

    CallToAjax_Withoutdata('GET', '/Admin/Adding_BestPerformer_dds',
        function (response) {

            populateClassificationDropdown(response.classificationList);
            populateRoleDropdown(response.roleList);
        },
        function (status, error) {
            // Handle errors here...!
        }
    );
    //$('#Addbestperformerdataaddingaccordionoc2').show();
    $('#Updateview_Addbestperformerdataaddingaccordionoc2').show();
    $('#SelectedBestperformerusername_spid').text('Select');
});


// Function to populate the classification dropdown
function populateClassificationDropdown(classificationList) {
    var classificationDropdown = $('#classificationDropdown');     
    $.each(classificationList, function (index, item) {
        classificationDropdown.append($('<option>', {
           
            value: item.instanceClassificationId, // Replace with your value property from JSON
            text: item.classificationName // Replace with your text property from JSON
        }));
    });
}


// Function to populate the role dropdown
function populateRoleDropdown(roleList) {
    var roleDropdown = $('#roleDropdown');
    roleDropdown.empty();
    $.each(roleList, function (index, item) {
        roleDropdown.append($('<option>', {
            value: item.instanceRoleId, // Replace with your value property from JSON
            text: item.roleName // Replace with your text property from JSON
        }));
    });
}



///------******DEPARTMENT BASEB ON CLASS DROPDOWN FUNCTION CODE START
$('#classificationDropdown').change(function () {
    var selectedValue = $(this).val();
   // CallToAjax_Withoutdata('GET', '/Admin/Adding_BestPerformer_dds',
    var datatosend = {
        InstanceClassificationId: selectedValue
    };
    DataCallToAjax('GET', '/Admin/Adding_BestPerformer_Subclassification_dd', datatosend,
        function (response) {
            
            populateSubclassificationDropdown(response.subclassificationList);
            //populateRoleDropdown(response.roleList);
        },
        function (status, error) {
            // Handle errors here...!
        }
    );
});


///------******Function to populate the classification dropdown
function populateSubclassificationDropdown(subclassificationList) {
    debugger;
    var classificationDropdown = $('#SubclassificationDropdown');
    $.each(subclassificationList, function (index, item) {
        classificationDropdown.append($('<option>', {
            value: item.instanceSubClassificationId, // Replace with your value property from JSON
            //value: item.instanceClassificationId, // Replace with your value property from JSON
            text: item.subClassificationName // Replace with your text property from JSON
        }));
    });
}

$('#Insert_Clearbtn').click(function () {
    $('#Insertbestperoformer')[0].reset();
    $('#Addbestperformerdataaddingaccordionoc2').hide();
    $('#Addbestperformerdataaddingtbl_accordionoc3').hide();
});

$('#Insert_BackToSearchbtn').click(function () {

    location.reload();

});

///-----****Search best performer result functions
$('#SearchUserform_id').submit(function (event) {
   
    event.preventDefault();
    var formData = new FormData($('#SearchUserform_id')[0]);
    
    $.ajax({
        url: '/Admin/Adding_BestPerformer_Searchtabledata',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#Addbestperformerdataaddingtbl_accordionoc3').show();
            
            var formattedDate = GetDateFormat();

            var table = $('#Bestperformertbl').DataTable();
            table.destroy();
            $("#bestperformertbl_Recordscount").text(response.length);


            var newTable = $("#Bestperformertbl").DataTable({
                dom: 'Bfrtip',
                buttons: [ ],

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

                    //{
                    //    data: "SNO",
                    //    //visible: false,

                    //    render: function (data, type, row, meta) {
                    //        //  length++;
                    //        return row.holidayId
                    //    }
                    //},
                    {
                        targets: 0, // Assuming this is the column index where you want to display numbering
                        render: function (data, type, row, meta) {
                            var currentPage = table.page.info().page;
                            var rowsPerPage = table.page.info().length;
                            return (0 * rowsPerPage) + meta.row + 1;
                        }
                    },
                    {
                        data: "UserId",

                        render: function (data, type, row, meta) {

                            /* row.firstName + */
                            return '<input type="radio" name="' + row.firstName + '" value="' + row.userId + '" />';

                        }
                    },
                    {
                        data: "FirstName",

                        render: function (data, type, row, meta) {
                          

                            return row.firstName

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
                        data: "ClassificationName",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.classificationName + '<input type="text" value=' + row.userId + ' hidden/>'

                        }
                    },
                    {
                        data: "PortalEmail",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.portalEmail

                        }
                    }
                    //,
                    //{
                    //    data: "NoofDays",

                    //    render: function (data, type, row, meta) {
                    //        return row.noofDays
                    //        //var paymentDate = new Date(row.paymentDate);

                    //        // return paymentDate.toLocaleDateString();

                    //    }
                    //},
                    //{
                    //    data: "IsPosted",

                    //    render: function (data, type, row, meta) {
                    //        //return row.isPosted
                    //        if (row.isPosted == 'False') {
                    //            return 'Not Posted'
                    //        } else {
                    //            return 'Posted'
                    //        }

                    //        //if (row.docName.trim() !== "") {
                    //        //    return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i><i class="fa fa-eye" title="View document" id="SEMView_document" ><span style="display:none">' + row.docName + '</span> </i>'
                    //        //}
                    //        //else {
                    //        //    return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i>'
                    //        //}

                    //    }
                    //}, {
                    //    data: "HolidayId",

                    //    render: function (data, type, row, meta) {
                    //        // return row.holidayId
                    //        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                    //        // return row.holidayId + '<input type="text" value=' + row.holidayId + ' hidden/>'
                    //        //if (row.expenditureType == 0) {
                    //        //    return '<span>Credit</span>';

                    //        //}
                    //        //else {
                    //        //    return '<span>Debit</span>';

                    //        //}

                    //    }
                    //}
                    //}, {
                    //    data: "Approvals",

                    //    render: function (data, type, row, meta) {
                    //        if (row.approvals == null || row.approvals == "") {

                    //            return '<div class="SEMapprovals"><img src="/Images_IMP/pending_02.png"  title="Pending" /></div>'
                    //        }
                    //        else if (row.approvals == "0") {
                    //            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/Rejects.png" title="Reject" /><i class="fa fa-eye" style="font-size:20px" title="View Comments" ></i></i></div>'
                    //        }
                    //        else {
                    //            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/approvals_1.png"  title="Approvals" /><i class="fa fa-eye" style="font-size:20px" title="View Comments"  ></i></i></div>'
                    //        }

                    //    }
                    //}
                    //, {

                    //    render: function (data, type, row, meta) {
                    //        //  length++;
                    //        if (row.approvals == "1") {
                    //            return ''
                    //        }
                    //        else {
                    //            return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                    //        }

                    //    }
                    //}
                ]


            });
            //$('.dt-buttons').css('display', 'block');
            //table.on('draw', function () {
            //    $('#Bestperformertbl').find('td:nth-child(2)').attr('title', 'Edit');
            //});
            //$('#Bestperformertbl').find('td:nth-child(2)').attr('title', 'Edit');
        },    
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
});




///-----**** INSERTING CLASSIFICATION ***-----
$('#Insertbestperoformer').submit(function (event) {
    event.preventDefault(); 
    
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            var valueToPass; // Declare the variable to store the value
            debugger;
            if ($('#Addeventanduserphoto').is(':checked')) {
                valueToPass = 1; // Assign 1 if the checkbox is checked
            } else {
                valueToPass = 0; // Assign 0 if the checkbox is unchecked
            }
            
            var formdata_ISN = new FormData($('#Insertbestperoformer')[0]);
            formdata_ISN.append("IsEvent", valueToPass);

            FileCallToAjax('POST', '/Admin/Insert_ManageBestPerformer', formdata_ISN,
                function (response) {                   
                    if (response === "Inserted") {
                        $('#Insert_Clearbtn, #Insert_Savebtn').prop('disabled', true);
                        $('#Insert_Clearbtn, #Insert_Savebtn').removeClass("btn btn-pill btn-outline-success btn-air-success")
                        $('#Errormessages').text('Record inserted successfully.');
                    } else if (response === "Not Inserted") {
                        $('#Errormessages').text('Already a Quote is Present on:' + formattedDate);
                    } else if (response === "QuoteExists") {
                       
                        $('#Errormessages').text('Already a Quote is Present on:' + formattedDate);
                    } else {
                        // Handle other cases or display a generic error message
                        $('#Errormessages').text('An error occurred.');
                    }
                }, function (status, error) {

            },
                true);
            /* }*/
        }
    }, 50);

});



///-----**** RADIO BUTTON SELECT USERNAME  FUNCTION CODE START
$(document).on('click', '#Bestperformertbl td:nth-child(2)', function (event) {    
    event.stopImmediatePropagation();
    var selectedRow = $(this).closest('tr');
    var selectedRadio = selectedRow.find('td input[type="radio"]:checked');
    var userId = selectedRadio.val();
    var userName = selectedRadio.attr('name');
    $('#SelectedBestperformerusername_spid').text(userName);
    $('#SelectedBestperformerusername_spid').attr('value', userId);
    $('#SelectedBestperformerusername_txtid').attr('value', userId);
    $('#Addbestperformerdataaddingaccordionoc2').hide();
    $('#Addbestperformerdataaddingtbl_accordionoc3').hide();

})


///-----****Search best performer view fileds clear button code start
$('#Addingusers_Clearbtn').click(function () {
    $('#SearchUserform_id')[0].reset();
});



//-----******UPDATE BEST PERFORMER TABLE DATA
$(document).on('click', '#Managebestperformertbl td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var PerformerId = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#Managebestperformertbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    Editperformer(PerformerId);
})





function Editperformer(PerformerId) {
    $.ajax({
        url: '/Admin/Update_ManageBestPerformer?PerformerId=' + PerformerId,
        type: 'GET',
        //data: data,
        success: function (response) {
            debugger;
            $('#Managebestperoformerd_Insertdiv2').empty();
            $('#Managebestperoformerdmaindiv').hide();
            $('#Managebestperoformerd_Updatediv3').html(response);
        },
        error: function (xhr, status, error) {
            //errorCallback(xhr.status, error);
        }
    });
}






$('#UV_Deletebtn').click(function () {
    var PerformerId = $('#PerformerId_txtid').val();
    $.ajax({
        url: '/Admin/Delete_ManageBestPerformer?PerformerId=' + PerformerId,
        type: 'GET',
        //data: data,
        success: function (response) {
            debugger;
            if (response == "Deleted") {
                $('#Errmsg').text('Record deleted successfully');
                SearchQuotes();
                ///*  $('#Dltbtn, #Updatebtn').prop('disabled', true);*/
                ///* $('#Dltbtn,').removeClass('.btn .btn-pill .btn-outline-success .btn-air-success');*/
                //$('#Errormsg').text('Record deleted successfully.');
                //$('#ManageQuotemaindiv').show();
                //$('#Updateview_Addbestperformerdataaddingaccordionoc2').empty();
                //$('#Updateview_Addbestperformerdataaddingtbl_accordionoc3').empty();
            } else {
                $('#Errormessage').text('Sommething went wrong...!')
            }
        }
    });
})



$('#UpdateView_SearchUserform_id').submit(function (event) {
    debugger;
    event.preventDefault();
    var formData = new FormData($('#UpdateView_SearchUserform_id')[0]);

    $.ajax({
        url: '/Admin/Adding_BestPerformer_Searchtabledata',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#Updateview_Addbestperformerdataaddingtbl_accordionoc3').show();

            var formattedDate = GetDateFormat();

            var table = $('#Updateview_Bestperformertbl').DataTable();
            table.destroy();
            $("#bestperformertbl_Recordscount").text(response.length);


            var newTable = $("#Updateview_Bestperformertbl").DataTable({
                dom: 'Bfrtip',
                buttons: [],

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

                    //{
                    //    data: "SNO",
                    //    //visible: false,

                    //    render: function (data, type, row, meta) {
                    //        //  length++;
                    //        return row.holidayId
                    //    }
                    //},
                    {
                        targets: 0, // Assuming this is the column index where you want to display numbering
                        render: function (data, type, row, meta) {
                            var currentPage = table.page.info().page;
                            var rowsPerPage = table.page.info().length;
                            return (0 * rowsPerPage) + meta.row + 1;
                        }
                    },
                    {
                        data: "UserId",

                        render: function (data, type, row, meta) {

                            /* row.firstName + */
                            return '<input type="radio" name="' + row.firstName + '" value="' + row.userId + '" />';

                        }
                    },
                    {
                        data: "FirstName",

                        render: function (data, type, row, meta) {


                            return row.firstName

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
                        data: "ClassificationName",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.classificationName + '<input type="text" value=' + row.userId + ' hidden/>'

                        }
                    },
                    {
                        data: "PortalEmail",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.portalEmail

                        }
                    }
                    //,
                    //{
                    //    data: "NoofDays",

                    //    render: function (data, type, row, meta) {
                    //        return row.noofDays
                    //        //var paymentDate = new Date(row.paymentDate);

                    //        // return paymentDate.toLocaleDateString();

                    //    }
                    //},
                    //{
                    //    data: "IsPosted",

                    //    render: function (data, type, row, meta) {
                    //        //return row.isPosted
                    //        if (row.isPosted == 'False') {
                    //            return 'Not Posted'
                    //        } else {
                    //            return 'Posted'
                    //        }

                    //        //if (row.docName.trim() !== "") {
                    //        //    return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i><i class="fa fa-eye" title="View document" id="SEMView_document" ><span style="display:none">' + row.docName + '</span> </i>'
                    //        //}
                    //        //else {
                    //        //    return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i>'
                    //        //}

                    //    }
                    //}, {
                    //    data: "HolidayId",

                    //    render: function (data, type, row, meta) {
                    //        // return row.holidayId
                    //        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                    //        // return row.holidayId + '<input type="text" value=' + row.holidayId + ' hidden/>'
                    //        //if (row.expenditureType == 0) {
                    //        //    return '<span>Credit</span>';

                    //        //}
                    //        //else {
                    //        //    return '<span>Debit</span>';

                    //        //}

                    //    }
                    //}
                    //}, {
                    //    data: "Approvals",

                    //    render: function (data, type, row, meta) {
                    //        if (row.approvals == null || row.approvals == "") {

                    //            return '<div class="SEMapprovals"><img src="/Images_IMP/pending_02.png"  title="Pending" /></div>'
                    //        }
                    //        else if (row.approvals == "0") {
                    //            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/Rejects.png" title="Reject" /><i class="fa fa-eye" style="font-size:20px" title="View Comments" ></i></i></div>'
                    //        }
                    //        else {
                    //            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/approvals_1.png"  title="Approvals" /><i class="fa fa-eye" style="font-size:20px" title="View Comments"  ></i></i></div>'
                    //        }

                    //    }
                    //}
                    //, {

                    //    render: function (data, type, row, meta) {
                    //        //  length++;
                    //        if (row.approvals == "1") {
                    //            return ''
                    //        }
                    //        else {
                    //            return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                    //        }

                    //    }
                    //}
                ]


            });
            //$('.dt-buttons').css('display', 'block');
            //table.on('draw', function () {
            //    $('#Bestperformertbl').find('td:nth-child(2)').attr('title', 'Edit');
            //});
            //$('#Bestperformertbl').find('td:nth-child(2)').attr('title', 'Edit');
        },
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
});

///-----**** RADIO BUTTON SELECT USERNAME  FUNCTION CODE START
$(document).on('click', '#Updateview_Bestperformertbl td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    var selectedRow = $(this).closest('tr');
    var selectedRadio = selectedRow.find('td input[type="radio"]:checked');
    var userId = selectedRadio.val();

    debugger;
    var userName = selectedRadio.attr('name');
    $('#SelectedBestperformerusername_spid').text(userName);
    $('#SelectedBestperformerusername_spid').attr('value', userId);
    $('#SelectedBestperformerusername_txtid').attr('value', userId);
    $('#Updateview_Addbestperformerdataaddingaccordionoc2').hide();
    $('#Updateview_Addbestperformerdataaddingtbl_accordionoc3').hide();

})