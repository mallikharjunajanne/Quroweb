function CallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
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

//function CallToAjax(method, url, successCallback, errorCallback) {
//    $.ajax({
//        url: url,
//        type: method,
//        success: bindDatatable,
//        error: function (xhr, status, error) {
//            errorCallback(xhr.status, error);
//        }
//    });
//}
$(document).ready(function () {    
    //ManageCoollinks();
    ManageCoollinksfun();

    

});

$("#Searchcoollink_Btn").click(function () {

    $('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');

    var LinkName = $("#LinkNameTXT").val();
    var LinkURL = $("#LinkURLTXT").val();
    var Description = $("#DescriptionTXT").val();

    ManageCoollinksfun();
    //ManageCoollinks();
});


function ManageCoollinksfun() {
    var LinkName = $("#LinkNameTXT").val();
    var LinkURL = $("#LinkURLTXT").val();
    var Description = $("#DescriptionTXT").val();
    debugger;
    var dataToSend = {
        LinkName: LinkName,
        LinkURL: LinkURL,
        Description: Description
    };
    //{ LinkName: LinkName, LinkURL: LinkURL, Description: Description },

    DataCallToAjax('GET', '/Admin/ManageCoolLinks_Tabledata', dataToSend,
        function (response) {
            bindDatatable(response);
        }, function (status, error) {
            // Handle error if needed
        }
    );
}
function bindDatatable(response) {
    
    debugger;
    var table = $('#Coollinkstbl_id').DataTable();
    table.destroy();
    $("#Recordscount").text(response.length);


    var newTable = $("#Coollinkstbl_id").DataTable({
        dom: 'Bfrtip',
        buttons: [
            //{
            //    extend: 'pdfHtml5',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,
            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },

            //}
            //,
            //{
            //    extend: 'excel',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,

            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },
            //},


            //{
            //    extend: 'print',
            //    title: 'Manage Holidays Report',
            //    message: "Report On: " + formattedDate,
            //    exportOptions: {
            //        columns: [1, 2, 3, 4, 5, 6]
            //    },
            //}
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
                data: "LinkName",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.linkName

                }
            },
            {
                data: "LinkURL",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.linkURL + '<input type="text" value=' + row.coollinkId + ' hidden/>'

                }
            },
            {
                data: "Description",

                render: function (data, type, row, meta) {
                    //  length++;

                    return row.description

                }
            },
            {
                data: "CoollinkId",

                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                }
            }
        ]


    });
    //Pdfs buttons hide this code
    newTable.buttons().container().hide();
    table.on('draw', function () {
        $('#Coollinkstbl_id').find('td:nth-child(2)').attr('title', 'Edit');
    });
    $('#Coollinkstbl_id').find('td:nth-child(2)').attr('title', 'Edit').css({
        color: 'black',
        'text-decoration': 'underline',
        cursor: 'pointer',
        fontWeight: 'bold'
    });
}

function ManageCoollinks() {
    //$('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');



    var LinkName = $("#LinkName").val();
    var LinkURL = $("#LinkURL").val();
    var Description = $("#Description").val();




    $.ajax({
        url: "/Admin/ManageCoolLinks_Tabledata",
        data: { LinkName: LinkName, LinkURL: LinkURL, Description: Description },
        type: "GET",
        success: function (response) {
            debugger;
            $('#Coollinks_PartailConatiner').html(response);
            pagination();

        }
    });
}



function Clearcommonfunction(Formid, ErrorMessageSpanId) {
    document.getElementById(Formid).reset(); // Reset the form 
    document.getElementById(ErrorMessageSpanId).innerText = '';

    $('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');
}
$('#CreateNewCoolllink_Btn').click(function () {

    $('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');
    $('#LinkNameTXT').val('');
    $('#LinkURLTXT').val('');
    $('#DescriptionTXT').val('');


    $('#S_LinkNameTxt').val('');
    $('#S_LinkURLTxt').val('');
    $('#S_DescriptionTxt').val('');


    $('#Coollinks_PartailConatiner').hide();
    $('#SearchCoollinkView').hide();
    $('#CreateNew_CoollinkView').show();
    $('#CoollinkUpdateView').hide();
});

$('#Backtoseach_savebtn').click(function () {

    $('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');
    $('#CreateNew_CoollinkView').hide();
    $('#CoollinkUpdateView').hide();
    $('#Coollinks_PartailConatiner').show();
    ManageCoollinksfun();
    //ManageCoollinks();
    $('#SearchCoollinkView').show();

});




//==== OLD CODE
//$(document).ready(function () {
//    //$('#SearchCoollinkView').show();
//    //$('#CreateNew_CoollinkView').hide();
//    //$('#CoollinkUpdateView').hide();
//    //$('#Coollinks_PartailConatiner').show();

//    //ManageCoollinks();
//});

//$("#Searchcoollink_Btn").click(function () {

//    $('#DeleteMessage').text('');
//    $('#validationMessage').text('');
//    $('#validation2').text('');

//    ManageCoollinks();
//});




//$('#Clearcoollink_Btn').click(function () {
//    $('#DeleteMessage').text('');
//    $('#validationMessage').text('');
//    $('#validation2').text('');
//    $('#LinkNameTXT').val('');
//    $('#LinkURLTXT').val('');
//    $('#DescriptionTXT').val('');
//    //ManageCoollinks();
//});







$('#Clear_savebtn').click(function () {

    $('#DeleteMessage').text('');
    $('#validation2').text('');
    $('#validationMessage').text('');
    $('#S_InstanceIdTxt').val('');
    $('#S_LinkNameTxt').val('');
    $('#S_LinkURLTxt').val('');
    $('#S_DescriptionTxt').val('');

});


$('#savecoollink_btn').click(function () {

    debugger;
    var LinkName = $('#S_LinkNameTxt').val();
    var LinkURL = $('#S_LinkURLTxt').val();
    var Description = $('#S_DescriptionTxt').val();
    if (SaveValidation()) {

        var dataToSend = {
            LinkName: LinkName,
            LinkURL: LinkURL,
            Description: Description
        };

        //var formdatastring = $("form").serialize();
        $('#validation2').text('');
        $('#validationMessage').text('');
        $.ajax({
            url: "/Admin/CoolLinks_INSERT",
            data: dataToSend,
            type: "POST",
            success: function (response) {
                if (response == "1") {
                    $('#validationMessage').text("Record inserted successfully.");
                    const SaveBtn = document.getElementById("savecoollink_btn");
                    const ClearBtn = document.getElementById("Clear_savebtn");                    

                    if (SaveBtn) {
                        SaveBtn.disabled = true;
                    }

                    if (ClearBtn) {
                        ClearBtn.disabled = true;
                    }
                } else if (response == "-1") {
                    $('#validationMessage').text("Cool Link with Name " + '"' + LinkName + '"' + " already exists.");
                } else {
                    $('#validationMessage').text("Somthing Went wrong...!");
                }
            }

        });
    }
});

function SaveValidation() {
    debugger;
    
    var LinkName = $('#S_LinkNameTxt').val();
    var LinkURL = $('#S_LinkURLTxt').val();
    var Description = $('#S_DescriptionTxt').val();

    var validationMessage = "";
    var hasError = false;

    if (LinkName === "") {
        validationMessage += "Cool Link Name<br>";
        hasError = true;
    }

    if (LinkURL === "") {
        validationMessage += "Cool Link URL<br>";
        hasError = true;
    }

    var urlInput = document.getElementById('S_LinkURLTxt');
    var urlError = document.getElementById('urlError');
    var urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!urlPattern.test(urlInput.value)) {
        validationMessage += ('Invalid URL. Please enter a valid URL starting with http:// or https://.');
        hasError = true;
    } 

    if (hasError) {
        $('#validation2').html("Following fields have invalid data :<br>");
        $("#validationMessage").html(validationMessage);
        return false;
    } else {
        $("#validationMessage").html("");
        return true;
    }
}




$(document).on('click', '#Coollinkstbl_id td:nth-child(2)', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var parent = $(event.target).closest('tr');
    var Coollinkid = $(parent).find('td').find('input[type="text"]').val();
    var table = $('#Coollinkstbl_id').DataTable();
    tabletargetpagetblSEMsearchresults = table.page.info().page;
    EditCoolinkFunction(Coollinkid);
})
function EditCoolinkFunction(Coollinkid) {

    $.ajax({
        url: "/Admin/CoolLinks_Edit?CoollinkId=" + Coollinkid,
        type: "GET",
        success: function (response) {

            $('#CoollinkUpdateView').show();
            $('#CreateNew_CoollinkView').hide();
            $('#SearchCoollinkView').hide();
            $('#Coollinks_PartailConatiner').hide();


            $('#CoollinkIdEditTxt').val(response[0].coollinkId);
            $('#InstanceIdEditTxt').val(response[0].instanceId);
            $('#linkNameEditTxt').val(response[0].linkName);
            $('#LinkURLEditTxt').val(response[0].linkURL);
            $('#DescriptionEditTxt').val(response[0].description);
        }

    });
}


$(document).on('click', '#Coollinkstbl_id .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var confirmed = confirm("Are you sure you want to delete Coollink?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        debugger;
        var Coollinkid = $(this).closest('tr').find('input[type="text"]').val();
        var table = $('#Coollinkstbl_id').DataTable();
        var tabletargetpagetblSEMsearchresults = table.page.info().page;
        $.ajax({
            url: "/Admin/CoolLinks_DELETE?CoollinkId=" + Coollinkid,
            type: "POST",
            success: function (response) {
                //ManageCoollinks();
                ManageCoollinksfun();
                $("#DeleteMessage").text('Record deleted successfully.');
            }
        });
    }
});

//function Dltfunction(Coollinkid) {

//    $('#DeleteMessage').text('');

//    if (confirm('Are you sure you want to delete the cool link?\nClick' + '"' + 'OK' + '"' + 'to delete or ' + '"' + 'Cancel' + '"' + ' to stop deleting.')) {

//        $.ajax({
//            url: "/Admin/CoolLinks_DELETE?CoollinkId=" + Coollinkid,
//            type: "POST",
//            success: function (response) {
//                //ManageCoollinks();
//                ManageCoollinksfun();
//                $("#DeleteMessage").text('Record deleted successfully.');

//            }

//        });
//    }

//}



$("#Delete_Upbtn").click(function () {

    var CoollinkId = $("#CoollinkIdEditTxt").val();

    if (confirm('Are you sure you want to delete the cool link?\nClick' + '"' + 'OK' + '"' + 'to delete or ' + '"' + 'Cancel' + '"' + ' to stop deleting.')) {

        $.ajax({
            url: "/Admin/CoolLinks_DELETE?CoollinkId=" + CoollinkId,
            type: "POST",
            success: function (response) {
                //ManageCoollinks();
                ManageCoollinksfun();
                $('#CreateNew_CoollinkView').hide();
                $('#CoollinkUpdateView').hide();
                //$('#SearchCoollinkView').show();
                $('#linkNameEditTxt').val('');
                $('#LinkURLEditTxt').val('');
                $('#DescriptionEditTxt').val('');
                $('#CoollinkIdEditTxt').val('');
                $("#UpdatevalidationMessage").text('Record deleted successfully.');
            }

        });
    }
});


$('#Backtoseach_Upbtn').click(function () {


    $('#UpdatevalidationMessage').text('');
    $('#Updatevalidation2').text('');
    $('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');
    $('#CreateNew_CoollinkView').hide();
    $('#CoollinkUpdateView').hide();
    $('#Coollinks_PartailConatiner').show();
    //ManageCoollinks();
    ManageCoollinksfun();
    $('#SearchCoollinkView').show();

});

$('#Updatecoollink_Btn').click(function () {
    debugger;
    var LinkName = $('#linkNameEditTxt').val();

    if (UpdateValidation()) {
        var Updatedata = $("#UpdateForm").serialize();
        $('#Updatevalidation2').text('');
        $('#UpdatevalidationMessage').text('');
        $.ajax({
            url: "/Admin/CoolLinks_UPDATE",
            data: Updatedata,
            type: "POST",
            success: function (response) {
                if (response == "1") {

                    $('#SearchCoollinkView').hide();
                    $('#CreateNew_CoollinkView').hide();
                    $('#CoollinkUpdateView').show();
                    $('#Coollinks_PartailConatiner').hide();

                    $('#UpdatevalidationMessage').text("Record Updated successfully.");
                    const UpdateBtn = document.getElementById("Updatecoollink_Btn");
                    const Delete_Upbtn = document.getElementById("Delete_Upbtn");

                    if (UpdateBtn) {
                        SaveBtn.disabled = true;
                    }

                    if (Delete_Upbtn) {
                        ClearBtn.disabled = true;
                    }
                } else {
                    $('#UpdatevalidationMessage').text("Record Update unsuccessfully " + '"' + LinkName + '"');
                }
            }

        });
    }

});
function UpdateValidation() {
    var InstanceId = $('#InstanceIdEditTxt').val();
    var LinkName = $('#linkNameEditTxt').val();
    var LinkURL = $('#LinkURLEditTxt').val();
    var Description = $('#DescriptionEditTxt').val();
    var CoollinkIdEditTxt = $('#CoollinkIdEditTxt').val();


    var validationMessage = "";
    var hasError = false;

    if (LinkName === "") {
        validationMessage += "Cool Link Name<br>";
        hasError = true;
    }

    if (LinkURL === "") {
        validationMessage += "Cool Link URL<br>";
        hasError = true;
    }

    //const isValidUrl = (url: string): boolean => {
    //    const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
    //    const result = url.match(urlRegex);

    //    return result !== null;
    //};

    if (hasError) {
        $('#Updatevalidation2').html("Following fields have invalid data :<br>");
        $("#UpdatevalidationMessage").html(validationMessage);
        return false;
    } else {
        $("#UpdatevalidationMessage").html("");
        return true;
    }
}





/*---PAGINATION CODE IS START---*/

//document.addEventListener('DOMContentLoaded', function () {
function pagination() {
    var tableId = 'Coollinkstbl_id';
    var paginationDiv = document.getElementById('Pagination_div');
    var rowsPerPage = 10;
    var currentPage = 1;
    var table = document.getElementById(tableId);
    var rows = Array.from(table.querySelectorAll('tbody tr'));
    var numRows = rows.length;
    var totalPages = Math.ceil(numRows / rowsPerPage);

    if (numRows >= rowsPerPage) {
        function showPage(page) {
            currentPage = page;
            var startIndex = (page - 1) * rowsPerPage;
            var endIndex = Math.min(startIndex + rowsPerPage, numRows);

            rows.forEach(function (row) {
                row.style.display = 'none';
            });

            for (var i = startIndex; i < endIndex; i++) {
                rows[i].style.display = 'table-row';
            }
        }

        function updatePagination() {
            paginationDiv.innerHTML = '';

            for (var i = 1; i <= totalPages; i++) {
                var link = document.createElement('a');
                link.href = '#';
                link.textContent = i;
                link.classList.add('pagination-link');
                link.dataset.page = i;
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    var page = parseInt(this.dataset.page);
                    showPage(page);
                    updatePagination();
                });

                if (i === currentPage) {
                    link.classList.add('current-page');
                    link.style.cursor = 'unset'; 
                    link.style.fontWeight = 'bold'; 
                    link.style.color = '#ff0000';
                    link.style.margin = '0px 5px';
                }
                paginationDiv.appendChild(link);
            }
        }

        showPage(currentPage);
        updatePagination();
    }
}




/*---PAGINATION CODE IS END---*/