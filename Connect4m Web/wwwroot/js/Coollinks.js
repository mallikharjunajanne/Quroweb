$(document).ready(function () {
    $('#SearchCoollinkView').show();
    $('#CreateNew_CoollinkView').hide();
    $('#CoollinkUpdateView').hide();

    ManageCoollinks();
});

$("#Searchcoollink_Btn").click(function () {

    $('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');

    ManageCoollinks();
});

function ManageCoollinks() {
    //$('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');

    var InstanceId = $("#InstanceIdTXT").val();

    var LinkName = $("#LinkName").val();
    var LinkURL = $("#LinkURL").val();
    var Description = $("#Description").val();
    var UserId = $("#UserId").val();



    $.ajax({
        url: "/Admin/ManageCoolLinks_Tabledata",
        data: { InstanceId: InstanceId, LinkName: LinkName, LinkURL: LinkURL, Description: Description },
        type: "GET",
        success: function (response) {
            debugger;
            $('#Coollinks_PartailConatiner').html(response);
            pagination();

        }
    });
}

$('#Clearcoollink_Btn').click(function () {


    $('#DeleteMessage').text('');
    $('#validationMessage').text('');
    $('#validation2').text('');

    $('#LinkNameTXT').val('');
    $('#LinkURLTXT').val('');
    $('#DescriptionTXT').val('');
    //ManageCoollinks();
});




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
    ManageCoollinks();
    $('#SearchCoollinkView').show();

});


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
    if (SaveValidation()) {
        var formdatastring = $("form").serialize();
        $('#validation2').text('');
        $('#validationMessage').text('');
        $.ajax({
            url: "/Admin/CoolLinks_INSERT",
            data: formdatastring,
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
    var InstanceId = $('#S_InstanceIdTxt').val();
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






function Dltfunction(Coollinkid) {

    $('#DeleteMessage').text('');

    if (confirm('Are you sure you want to delete the cool link?\nClick' + '"' + 'OK' + '"' + 'to delete or ' + '"' + 'Cancel' + '"' + ' to stop deleting.')) {

        $.ajax({
            url: "/Admin/CoolLinks_DELETE?CoollinkId=" + Coollinkid,
            type: "POST",
            success: function (response) {
                ManageCoollinks();
                $("#DeleteMessage").text('Record deleted successfully.');

            }

        });
    }

}

function EditCoolinkFunction(Coollinkid) {

    $.ajax({
        url: "/Admin/CoolLinks_Edit?CoollinkId=" + Coollinkid,
        type: "GET",
        success: function (response) {

            $('#CoollinkUpdateView').show();
            $('#CreateNew_CoollinkView').hide();
            $('#SearchCoollinkView').hide();


            $('#CoollinkIdEditTxt').val(response[0].coollinkId);
            $('#InstanceIdEditTxt').val(response[0].instanceId);
            $('#linkNameEditTxt').val(response[0].linkName);
            $('#LinkURLEditTxt').val(response[0].linkURL);
            $('#DescriptionEditTxt').val(response[0].description);
        }

    });
}


$("#Delete_Upbtn").click(function () {

    var CoollinkId = $("#CoollinkIdEditTxt").val();

    if (confirm('Are you sure you want to delete the cool link?\nClick' + '"' + 'OK' + '"' + 'to delete or ' + '"' + 'Cancel' + '"' + ' to stop deleting.')) {

        $.ajax({
            url: "/Admin/CoolLinks_DELETE?CoollinkId=" + Coollinkid,
            type: "POST",
            success: function (response) {
                ManageCoollinks();
                //$('#CreateNew_CoollinkView').hide();
                //$('#CoollinkUpdateView').hide();                    
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
    ManageCoollinks();
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