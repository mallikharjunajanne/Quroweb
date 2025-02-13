function Clearfun(Formid, ErrorMessageSpanId) {
    debugger;
    document.getElementById(Formid).reset(); // Reset the form 
    document.getElementById(ErrorMessageSpanId).innerText = '';

    // Clear the validation error message text
    const validationSpans = document.querySelectorAll(`#${Formid} .text-danger`);
    validationSpans.forEach(span => {
        span.innerText = '';  // Clear the validation message text
    });

    // Remove validation styles (e.g., input-validation-error class)
    const formElements = document.getElementById(Formid).elements;
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        // Remove validation error class if it exists
        if (element.classList.contains('field-validation-valid')) {
            element.classList.remove('field-validation-valid');
        }
    }
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

    loaddingimg.css('display', 'block');
    // Prevent the default form submission
    event.preventDefault();
    
    var LinkName = $("#Nametxt").val();
    var LinkURL = $("#Urltxt").val();
    var Description = $("#InsertDescriptiontxt").val();

    //if (!$(this).valid()) {
    //    return;
    //}

    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;
        
        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            if (isValidURL(LinkURL)) {
                var dataToSend = { Name: LinkName, Url: LinkURL, Description: Description };
                DataCallToAjax('POST', '/Admin/InsertCoollink', dataToSend,
                    function (response) {
                        loaddingimg.css('display', 'none');
                        debugger;
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
                loaddingimg.css('display', 'none');
                $('#Validationmessage').text('Invalid URL. Please enter a valid URL starting with http:// or https://.');
            }
        }
        loaddingimg.css('display', 'none');
    }, 50);
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
});

// Begin the code for editing the record (Edit functionality)
$("#Deletebtn").click(function () {

    var CoollinkId = $("#Idtxt").val();

    if (confirm('Are you sure you want to delete the cool link?\nClick' + '"' + 'OK' + '"' + 'to delete or ' + '"' + 'Cancel' + '"' + ' to stop deleting.')) {
        $.ajax({
            url: "/Admin/DeleteCoollink?CoollinkId=" + CoollinkId,
            type: "POST",
            success: function (response) {
                window.scroll(0, 500);
                tblSearchcallingfun();
                $("#Validationmessage").text('Record deleted successfully.');
            }
        });
    }
});

$('#Updatebtn').click(function (event) {
    debugger;
    loaddingimg.css('display', 'block');
    // Prevent the default form submission
    event.preventDefault();
    var Id = $("#Idtxt").val();
    var LinkName = $("#Nametxt").val();
    var LinkURL = $("#Urltxt").val();
    var Description = $("#UpdateDescriptiontxt").val();

    //if (!$(this).valid()) {
    //    return;
    //}

    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {

            if (isValidURL(LinkURL)) {
                var dataToSend = { Id: Id, Name: LinkName, Url: LinkURL, Description: Description };
                DataCallToAjax('POST', '/Admin/UpdateCoollink', dataToSend,
                    function (response) {
                        loaddingimg.css('display', 'none');
                        debugger;
                        if (response == "1") {
                            $('#Validationmessage').text("Record Updated successfully.");
                        }
                        else if (response == "0")
                        {
                            $('#Validationmessage').text("Record update unsuccessful " + '"' + LinkName + '"');
                        }
                    },
                    function (status, error) {
                        // Handle error if needed
                    }
                );
            }
            else {
                loaddingimg.css('display', 'none');
                $('#Validationmessage').text('Invalid URL. Please enter a valid URL starting with http:// or https://.');
            }
        }
    }, 50);
});