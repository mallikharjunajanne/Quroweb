function TblCallToAjax(method, url,data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: bindDatatables,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}



function PostingAjax(url, method, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: successCallback, // Pass the success callback without invoking it
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error); // Invoke the error callback if an error occurs
        }
    });
}

//----------**** TABLE DATA BIND FUNCTION ****------------

//function CallToAjax(method, url, successCallback, errorCallback) {
//    $.ajax({
//        url: url,
//        type: method,
//        success: successCallback,
//        error: function (xhr, status, error) {
//            errorCallback(xhr.status, error);
//        }
//    });
//}

//function handleSuccess(response) {
//    debugger;
//    bindDatatables(response);
//    // Process the response data here
//    console.log(response);
//}

//function handleError(status, error) {
//    // Handle errors here
//    console.error("Error occurred:", status, error);
//}

//// Make the AJAX call without using $(document).ready()
//CallToAjax('GET', '/Admin/ManageClassificationTabledata', handleSuccess, handleError);



$(document).ready(function () {
    function CallToAjax(method, url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: method,
            success: bindDatatables,
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }


    CallToAjax('GET', '/Admin/ManageClassificationTabledata',

        function (status, error) {
          
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


//-----------------Search Quote
$('#Mainview_Searchbtn').click(function () {
    Searchclassifications();
});

function Searchclassifications() {
    var DepartName = $('#DepartName_txtid').val();
    var Description = $('#Descriptiontxtid').val();
    debugger;
    var dataToSend = {
        ClassificationName: DepartName,
        ClassificationDescription: Description
    };

    TblCallToAjax('GET', '/Admin/ManageClassificationTabledata', dataToSend,

        //function bindDatatables();
        function (status, error) {
            // Handle error if needed
        }
    );  
}


//-----------------DataTable Data Dinding Function
function bindDatatables(response) {

    var formattedDate = GetDateFormat();
    debugger;
    var table = $('#ManageClassificationtbl').DataTable();
    table.destroy();
    $("#Classification_Recordscount").text(response.length); /*Quote_Recordscount*/


    var newTable = $("#ManageClassificationtbl").DataTable({
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
                data: "ClassificationName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.classificationName

                }
            },
            {
                data: "ClassificationDescription",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.classificationDescription + '<input type="text" value=' + row.instanceClassificationId + ' hidden/>'

                }
            },
            {
                data: "instanceClassificationId",

                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                }
            }
        ]


    });
 
   
    table.on('draw', function () {
        $('#ManageClassificationtbl').find('td:nth-child(2)').attr('title', 'Edit');
    });
    $('#ManageClassificationtbl').find('td:nth-child(2)').attr('title', 'Edit');
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
    //Searchclassifications();   
    $('#DepartName_txtid').val('');
    $('#Descriptiontxtid').val('');
});



////------*** ICON CLICK DELETE FUNCTION ***------- 
$(document).on('click', '#ManageClassificationtbl .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var confirmed = confirm("Are you sure you want to delete Department?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        debugger;
        var InstanceClassificationId = $(this).closest('tr').find('input[type="text"]').val();
        var table = $('#ManageClassificationtbl').DataTable();
        var tabletargetpagetblSEMsearchresults = table.page.info().page;

        $.ajax({
            url: '/Admin/Delete_Classification?InstanceClassificationId=' + InstanceClassificationId,
            //url: '/Admin/Delete_Quote?QuoteId=' + QuoteId,
            type: 'GET',
            success: function (response) {
                $('#Errmsg').text('Record deleted successfully');
                Searchclassifications();
            },
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }
});





///------*** CREATE NEW CLASSIFICATION ***-------
$('#addnewmanagequotes').click(function () {
    debugger;
    CallToAjax_Withoutdata('GET', '/Admin/Insert_Classification',
        function (response) {
            debugger;
            $('#Manageclassificationmaindiv').hide(); /*ManageQuotemaindiv*/
            $('#Manageclassification_Updatediv3').empty();/* Manageholidays_Updatediv3*/
            $('#Manageclassification_Insertdiv2').html(response); /*Managequotes_Insertdiv2*/
        },
        function (status, error) {
            // Handle error if needed
        }
    );
});


//-----**Date Compare function**-------
function DatesCompare(Sdate, Edate) {
    try {
        debugger;
        var Startdate = new Date($("#StartDate_txtid").val());
        var Enddate = new Date($("#EndDate_txtid").val());

        if (Enddate <= Startdate) {
            $('#Error_Sp').text(Edate + " must be greater than " + Sdate + ".");
            
        } else {           
            $('#Error_Sp').text("");
        }
    } catch (error) {
        console.log(error);
    }
}


//-------------------***Date Compare
$(".form-group #StartDate_txtid").on("change", function () { DatesCompare("Start Date", "End Date"); });
$(".form-group #EndDate_txtid").on("change", function () { DatesCompare("Start Date", "End Date"); });



///-----**** INSERTING CLASSIFICATION ***-----
$('#Insertclassificationid').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            debugger;            
            var formData = $('#Insertclassificationid').serialize();
            var TitleValue = $('#Title').val();
            $.ajax({
                url: '/Admin/Insert_Classification',
                type: 'POST',
                data: formData,
                success: function (response) {
                    debugger;
                    if (response === "Inserted") {
                        $('#Insert_Clearbtn, #Insert_Savebtn').prop('disabled', true);
                        $('#Insert_Clearbtn, #Insert_Savebtn').removeClass("btn btn-pill btn-air-success")
                        $('#Errormessages').text('Record inserted successfully.');
                    } else if (response === "Not Inserted") {
                        $('#Errormessages').text('Record insert Unsuccessfull');
                    } else if (response === "Exists") {
                        $('#Errormessages').text('Department with Name ' + ' " ' + TitleValue + ' " ' + ' already exists.');
                    } else {                      
                        $('#Errormessages').text('An error occurred.');
                    }
                },
                error: function (xhr, status, error) {
                    errorCallback(xhr.status, error);
                }
            });
        }
    }, 50);
});



///-----**** INSERTING VIEW BACK TO SEARCH BUTTON ***-----
$('#Insert_BackToSearchbtn').click(function () {
    location.reload();
    //Searchclassifications();
    //$('#Manageclassificationmaindiv').show();
    //$('#Manageclassification_Insertdiv2').empty(); 
    //$('#Manageclassification_Updatediv3').empty();
})



///-----**** INSERTING VIEW CLEAR BUTTON ***-----
$('#Insert_Clearbtn').click(function () {
    $('#Insertclassificationid')[0].reset();
});


//-------------------------------------   Click For Update in the list(table)
$(document).on('click', '#ManageClassificationtbl td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Classificationid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#ManageClassificationtbl').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    Editclassification(Classificationid);
})


function Editclassification(Classificationid) {
    $.ajax({
        url: '/Admin/Update_Classification?InstanceClassificationId=' + Classificationid,
        type: 'GET',    
        success: function (response) {
            $('#Manageclassification_Insertdiv2').empty();
            $('#Manageclassificationmaindiv').hide();
            $('#Manageclassification_Updatediv3').html(response);
        },
        error: function (xhr, status, error) {
            //errorCallback(xhr.status, error);
        }
    });
}



$('#UpdateClassification_formid').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            var formData = new FormData($('#UpdateClassification_formid')[0]);
            var classificationnamevalue = $('#ClassificationNametxtid').val();

            $.ajax({
                url: '/Admin/Update_Classification',
                type: 'POST',
                data: formData,
                contentType: false, // Necessary when using FormData
                processData: false, // Necessary when using FormData
                success: function (response) {
                    if (response === "Updated") {
                        $('#Update_Dltbtn, #Update_upbtn').prop('disabled', true);
                        $('#Update_Dltbtn').removeClass('btn btn-pill btn-outline-danger btn-air-danger').addClass('btn btn-outline-primary');
                        $('#Update_upbtn').removeClass('btn btn-outline-info btn-air-info').addClass('btn btn-outline-warning');
                        $('#Errormessage').text('Record updated successfully.');
                    } else if (response === "Not Update") {
                        $('#Errormessage').text('Record update Unsuccessful.');
                    } else if (response === "Exists") {
                        $('#Errormessage').text('Department with Name "' + classificationnamevalue + '" already exists.');
                    } else {
                        $('#Errormessage').text('An error occurred.');
                    }
                },
                error: function (xhr, status, error) {
                    // Handle error if AJAX call fails
                    $('#Errormessage').text('Error occurred while processing the request.');
                    console.error(error);
                }
            });
        }
    }, 50);  
});

$('#Update_Dltbtn').click(function () {
    var InstanceClassificationId = $('#Classificationtxtid').val();
    $.ajax({
        url: '/Admin/Delete_Classification?InstanceClassificationId=' + InstanceClassificationId,
        type: 'GET',       
        success: function (response) {
            debugger;
            if (response == "Deleted") {
                debugger;
               // $('#Manageclassificationmaindiv').show(); /*Manageclassificationmaindiv*/
               
                //$('#Manageclassification_Insertdiv2').empty(); /*ManageHolidaystbl_containerdivId*/
               // $('#Manageclassification_Updatediv3').empty(); /*Manageclassification_Insertdiv2, Manageclassification_Updatediv3*/
                $('#Errormessage').text('Record deleted successfully.');
               // Searchclassifications();
            } else {
                $('#Errmsg').text('Sommething went wrong...!')
            }
        }
    });
})


$('#Update_BackToSearchbtn').click(function () {
    location.reload();
    //$('#Manageclassificationmaindiv').show(); 
    //$('#Manageclassification_Insertdiv2').empty();
    //$('#Manageclassification_Updatediv3').empty();
    //Searchclassifications();
})

