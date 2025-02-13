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

$(document).ready(function () {
    $('#Addnewlinkscontainerdiv').empty();
    tblSearchcallingfun();
});

$("#Searchbtn").click(function () {
    $('#Validationmessage').text('');
    tblSearchcallingfun();
});

function tblSearchcallingfun() {
    var LinkName = $("#Linknametxt").val();
    var LinkURL = $("#Linkurltxt").val();
    var Description = $("#Descriptiontxt").val();
    var dataToSend = {Name: LinkName,Url: LinkURL,Description: Description};
    DataCallToAjax('GET', '/Admin/BindCoollinkstbl', dataToSend,
        function (response) {
            bindDatatable(response);
        }, function (status, error) {
            // Handle error if needed
        }
    );
}

function bindDatatable(response) {
    
    //debugger;
    var table = $('#Coollinkstbl_id').DataTable();
    table.destroy();
    $("#Recordscount").text(response.length);
    var newTable = $("#Coollinkstbl_id").DataTable({
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
            {
                targets: 0, // Assuming this is the column index where you want to display numbering
                render: function (data, type, row, meta) {
                    var currentPage = table.page.info().page;
                    var rowsPerPage = table.page.info().length;
                    return (0 * rowsPerPage) + meta.row + 1;
                }
            },
            {
                data: "Name",
                render: function (data, type, row, meta) {
                  return row.name
                }
            },
            {
                data: "Url",
                render: function (data, type, row, meta) {
                 return row.url + '<input type="text" value=' + row.id + ' hidden/>'
                }
            },
            {
                data: "Description",
                render: function (data, type, row, meta) {
                    return row.description
                }
            },
            {
                data: "Id",
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

function Clearfun(Formid, ErrorMessageSpanId) {
    document.getElementById(Formid).reset(); // Reset the form 
    document.getElementById(ErrorMessageSpanId).innerText = '';
    tblSearchcallingfun();
}

//Add new coollinks appending function start
$('#Addnewcoolinkbtn').click(function () {
    debugger;
    $('#Addnewlinkscontainerdiv').empty();
    var Idtxt = $('Idtxt').val();
    DataCallToAjax('GET', '/Admin/InsertCoollink?Id=' + Idtxt, null,
        function (response) {
            debugger;
            $('#Searchcontainerdiv').hide();
            $('#Addnewlinkscontainerdiv').html(response);
            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
});

$('#Insertform').submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();
    debugger;

    var Id = $("#Idtxt").val();
    var LinkName = $("#Nametxt").val();
    var LinkURL = $("#Urltxt").val();
    var Description = $("#Descriptiontxt").val();
    if (isValidURL(LinkURL)) {
        var dataToSend = { Id: Id, Name: LinkName, Url: LinkURL, Description: Description };
        DataCallToAjax('POST', '/Admin/InsertCoollink', dataToSend,
            function (response) {
                if (response == "0") {
                    $('#Validationmessage').text("Cool Link with Name " + '"' + LinkName + '"' + " already exists.");
                } else if (response == "") {
                    $('#Validationmessage').text("Somthing Went wrong...!");
                } else {
                    $('#Validationmessage').text("Record inserted successfully.");
                    $('#Insertbtn, #Clearbtn').prop('disabled', true);
                }
            },
            function (status, error) {
                // Handle error if needed
            }
        );
    }
    else {
        //console.log('URL is not valid');
        $('#Validationmessage').text('Invalid URL. Please enter a valid URL starting with http:// or https://.');
    }
});

function isValidURL(url) {
    let urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    // Test the URL against the regex pattern
    return urlPattern.test(url);
}

$('#Backtosearchbtn').click(function () {

    $('#Validationmessage').text('');
    $('#Addnewlinkscontainerdiv').empty();
    $('#Searchcontainerdiv').show();
    tblSearchcallingfun();    

    //===>>>
    //$('#UpdatevalidationMessage').text('');
    //$('#validationMessage').text('');
    //$('#validation2').text('');
    //$('#CreateNew_CoollinkView').hide();
    //$('#CoollinkUpdateView').hide();
    //$('#Coollinks_PartailConatiner').show();
    //tblSearchcallingfun();
    //$('#SearchCoollinkView').show();
    //$('#savecoollink_btn, #Clear_savebtn').prop('disabled', false);
});

// Begin the code for editing the record (Edit functionality)
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
    $('#Validationmessage').text('');
    $.ajax({
        url: "/Admin/EditCoollink?CoollinkId=" + Coollinkid,
        type: "GET",
        success: function (response) {
            $('#Searchcontainerdiv').hide();
            $('#Addnewlinkscontainerdiv').html(response);            
        }
    });
}

$(document).on('click', '#Coollinkstbl_id .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var confirmed = confirm("Are you sure you want to delete Coollink?\nClick 'OK' to delete, or 'Cancel' to stop deleting.");
    if (confirmed) {
        $("#Validationmessage").text('');
        //debugger;
        var Coollinkid = $(this).closest('tr').find('input[type="text"]').val();
        var table = $('#Coollinkstbl_id').DataTable();
        var tabletargetpagetblSEMsearchresults = table.page.info().page;
        $.ajax({
            url: "/Admin/DeleteCoollink?CoollinkId=" + Coollinkid,
            type: "POST",
            success: function (response) {
                window.scroll(0, 500);
                tblSearchcallingfun();
                $("#Validationmessage").text('Record deleted successfully.');
            }
        });
    }
});