$('#Updatebankdepositform').on('submit', function (event) {
    //debugger;
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
                    //debugger;
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

function Imagedlt() {
    $('#Documentiddiv').hide();
    $('#AttachedDocument').show();
    //document.getElementById('AttachedDocument').value = ''; // Clear file input value
    //document.getElementById('imagePreviewContainer').innerHTML = ''; // Clear image preview
}

function Showimage(fileName, Instanceid) {
    debugger;
    // Construct the file path
    const filePath = `/Bankdepositdoc/Instanceid${Instanceid}/${fileName}`;

    // Get the popup and the container inside the modal where the file will be displayed
    const popup = document.getElementById("popup");
    const fileContainer = document.getElementById("popup-file-container");

    // Get the file extension to determine if it's an image or PDF
    const fileExtension = fileName.split('.').pop().toLowerCase();

    // Clear any previous content in the file container
    fileContainer.innerHTML = '';

    // Handle image files
    if (fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif') {
        // Create an image element and set the source
        const img = new Image();
        img.src = filePath;

        // When the image is loaded, show it in the popup
        img.onload = function () {
            fileContainer.appendChild(img);
            popup.style.display = "flex"; // Show the popup modal
        };

        // Handle image loading error
        img.onerror = function () {
            alert('Image could not be loaded. Please check the file path.');
        };
    }
    // Handle PDF files
    else if (fileExtension === 'pdf') {
        // Create an iframe element to show the PDF
        const iframe = document.createElement('iframe');
        iframe.src = filePath;
        iframe.frameBorder = '0';

        // Append the iframe to the container
        fileContainer.appendChild(iframe);
        popup.style.display = "flex"; // Show the popup modal
    } else {
        alert('Unsupported file type.');
    }
}

// Close the popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Hide the popup
}


//function Showimage_(fileName,Instanceid) {
//    //D:\QuroConnect4m\Quroweb\Connect4m Web\wwwroot\Bankdepositdoc\Instanceid879\Quro logo.jpeg

//    debugger;
//    //const filePath = `/Bankdepositdoc/Instanceid${Instanceid}/${fileName}`;
//    //window.open(filePath, '_blank');

//    const filePath = `/Bankdepositdoc/Instanceid${Instanceid}/${fileName}`;

//    // Create a new image element
//    const img = new Image();

//    // Set the src attribute of the image to trigger the loading
//    img.src = filePath;

//    // Set up the onload and onerror event handlers
//    img.onload = function () {
//        // If image loads successfully, open it in a new tab
//        window.open(filePath, '_blank');
//    };

//    img.onerror = function () {
//        // If image fails to load, show an alert
//        alert('Image is not available.');
//    };
//    // Set the src to start loading the image
//    img.src = filePath;
//}





//function _Showimage(fileName, Instanceid) {
//    debugger;
//    // Construct the file path
//    const filePath = `/Bankdepositdoc/Instanceid${Instanceid}/${fileName}`;

//    // Get the popup and image elements
//    const popup = document.getElementById("popup");
//    const popupImage = document.getElementById("popup-image");

//    // Create a new image object to check if the image exists
//    const img = new Image();

//    // Set the image source to load
//    img.src = filePath;

//    // Set up the onload event to show the image in the popup
//    img.onload = function () {
//        // If the image is loaded successfully, update the image source in the modal
//        popupImage.src = filePath;
//        popup.style.display = "flex"; // Show the popup modal
//    };

//    // Set up the onerror event if the image fails to load
//    img.onerror = function () {
//        alert("Image not available. Please check the image path and server permissions.");
//    };

//    // Optionally log the path for debugging
//    console.log("Loading image from path:", filePath);
//}

// Close the popup
//function _closePopup() {
//    const popup = document.getElementById("popup");
//    popup.style.display = "none"; // Hide the popup
//}