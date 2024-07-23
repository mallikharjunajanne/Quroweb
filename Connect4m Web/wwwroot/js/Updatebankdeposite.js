$('#Updatebankdepositform').on('submit', function (event) {
    debugger;
    event.preventDefault();
    event.stopPropagation();
    $('#Commoneerrormessage').text('');
    var DateofDeposit = $('#Depositdatetxtid').val();
    var Depositdate = new Date(DateofDeposit);
    var today = new Date();
    if (Depositdate > today) {
        $('#Commoneerrormessage').text('Date of Deposit should not be greater than Todays Date.');
        return;
    }
    setTimeout(function () {
        $('#Commoneerrormessage').text('');
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;
        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            var formData = new FormData($('#Updatebankdepositform')[0]);
            var fileInput = document.getElementById('AttachedDocument');
            var file;
            if (fileInput.files.length > 0) {
                file = fileInput.files[0];
                formData.append('AttachedDocument', file);
            }
            var Depositdate = $('#Depositdatetxtid').val();
            //var Feedepositval = $('#Feedeposittxtid').val();
            formData.append("Datedeposit", Depositdate);

            if (file) {
                var url = "/Admin/Updatemanagebankdeposit?AttachedDocument=" + file;
            }
            else {
                var url = "/Admin/Updatemanagebankdeposit";
            }

            handleAjax('POST', url, formData,
                function (resp) {
                    debugger;
                    loaddingimg.css('display', 'none');
                    switch (resp) {
                        case 'FileExist':
                            $('#Commoneerrormessage').text("File already exists");
                            break;
                        case '1MB':
                            $('#Commoneerrormessage').text("Document size cannot be greater than 1 MB.");
                            break;
                        case 'FileNotExist':
                            $('#Commoneerrormessage').text("Please upload only .doc or .docx or .pdf or .jpeg or .jpg or .png or .gif formats.");
                            break;
                        case '0':
                        case '-1':
                            $('#Commoneerrormessage').text("Record Updated Unsuccessful. Please try again");
                            break;
                        default: // Success case
                            $('#Clearbtn, #submitbtn').prop("disabled", true).css('opacity', '0.3');
                            $('#Commoneerrormessage').text("Record Updated successfully.");
                            break;
                    }
                },
                function (status, error) {
                    loaddingimg.css('display', 'none');
                },
                true
            );
        }
    }, 50);
});


function Showimage(fileName,Instanceid) {
    //D:\QuroConnect4m\Quroweb\Connect4m Web\wwwroot\Bankdepositdoc\Instanceid879\Quro logo.jpeg

    debugger;
    const filePath = `/Bankdepositdoc/Instanceid${Instanceid}/${fileName}`;
    window.open(filePath, '_blank');
}
function Imagedlt() {
    $('#Documentiddiv').hide();
    $('#AttachedDocument').show();
    //document.getElementById('AttachedDocument').value = ''; // Clear file input value
    //document.getElementById('imagePreviewContainer').innerHTML = ''; // Clear image preview
}