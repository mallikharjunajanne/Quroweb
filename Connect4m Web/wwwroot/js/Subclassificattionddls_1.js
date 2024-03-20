

///------*** CREATE NEW SUBCLASSIFICATION ***-------
/*$('#addnewsubclass').click(function () {*/
$('#Addnewclassdiv, #addnewsubclass').click(function () {
    debugger;
    $('#ManagesubclassificationInsertUpdatediv').empty();
   

    ////----Classification dropdown
    //fetchDataAndPopulateDropdown(
    //    '/Admin/InstanceClassification_DD',   // URL for data fetching
    //    '#In_Subclassificationdd',            // Dropdown selector
    //    'instanceClassificationId',           // Field name for option values
    //    'classificationName',                 // Field name for option text
    //    'classificationList'                  // Response value return class name
    //);

    ////----ClassTeacher dropdown
    //fetchDataAndPopulateDropdown(
    //    '/Admin/Subclass_Classteacher_DD',  // URL for data fetching
    //    '#In_ClassTeacherdd',     // Dropdown selector
    //    'userId',                 // Field name for option values
    //    'userName',               // Field name for option text
    //    'classteacherList'        // Response value return class name
    //);

    ////----Co-Class Teacher
    //fetchDataAndPopulateDropdown(
    //    '/Admin/Subclass_CoClassteacher_DD',  // URL for data fetching
    //    '#In_CoClassTeacherdd',     // Dropdown selector
    //    'userId_CO',                   // Field name for option values
    //    'userName_CO',                 // Field name for option text
    //    'coClassteacherList'          // Response value return class name
    //);

    CallToAjax_Withoutdata('GET', '/Admin/Insert_ManageSubClassification',
        function (response) {
            debugger;
            $('#In_Subclassificationdd').empty;
            $('#In_ClassTeacherdd').empty;
            $('#In_CoClassTeacherdd').empty;
            $('#ManageSubclassification_Containermaindiv').hide();
            $('#ManagesubclassificationInsertUpdatediv').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
});




///-----**** INSERTING CLASSES ***-----
$('#Insertclassformid').submit(function (event) {
    event.preventDefault();
    debugger;
    setTimeout(function () {
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');

        $('#Errormessages').text('');

        var validationmelength = validationMessages.length;

        if (validationmelength == 0 && validationMessages2.length == 0) {
            debugger;
            var formData = $('#Insertclassformid').serialize();
            var Subclassname = $('#Subclass_txtid').val();
            var Displayorder = $('#Displayordertxtid').val();
            if (Displayorder != 0) {
                $('#Errormessages').text('Display Order cannot be Zero.');
                return;
            }

            var url = '/Admin/Insert_ManageSubClassification';
            handleAjax('POST', url, formData,
                function (response) {
                    debugger;
                    if (response == "2") {
                        $('#Errormessages').text("Attendance Effective Date and Attendance End Date should be with in the period of Department 's Effective Date and End Date.");
                    } else if (response == "4") {
                        $('#Errormessages').text("You can't create a new 'SubClassificationName' as the Class Teacher is Associated to other '" + ViewState("SubClassificationName") + "'.");
                    } else if (response == "0") {
                        $('#Errormessages').text('SubClassificationName with Name ' + ' " ' + Subclassname + ' " ' + ' already exists.');
                    } else if (response == "5") {
                        $('#Errormessages').text('Display Order Already Exists.');
                    } else if (response == "") {
                        $('#Errormessages').text('An error occurred.');
                    } else {
                        $('#btnclear, #btnsubmit').prop('disabled', true);
                        $('#Errormessages').text('Record inserted successfully.');
                    }
                },
                function (status, error) {
                    console.error("Error fetching data:", error);
                    // Handle error scenario
                },
                true
            );
        }
    }, 50);
});



$('#btnBackToSearch').click(function () {
    $('#Errormessages').text('');
    location.reload();
});


