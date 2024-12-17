

$(document).ready(function () {

    debugger;
    var Rolename = $('#ROLENAMESPANID').val().toUpperCase();

    if (Rolename == "CLASS TEACHER") {

        //**** ====== *** CLASS TEACHER DROPDOWNS DATA BIND FUNCTION CODE *** ====== ****//

        $('#Rlenddate').hide();
        //$('#Rlenddate').remove();
        //$('#Rldepartment').remove();
        //$('#Rlclass').remove();
        //$('#StartDateid').remove();
        $('#RlStartdate').text('Date');


        //var currentDate = new Date();
        //var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        //var dateString1 = currentDate.toLocaleDateString(undefined, options);
        //$("#Roldisplaydate").text(dateString1);
        // Display current date in dd-mm-yyyy format
        $("#Roldisplaydate").text(getFormattedDate()).show();  // Use previously defined getFormattedDate function
        $("#StartDateid").text(getFormattedDate()).hide();  // Use previously defined getFormattedDate function
        $("#EndDateid").text(getFormattedDate()).hide();  // Use previously defined getFormattedDate function

        $("#Roldisplaydate").show();


        fetchDataAndPopulateDropdown(                           //==== << ** Classification Dropdown ** >>
            '/Attendance/Teacher_attendanceclassification',     // URL for data fetching
            '#ddlInstanceClassificationSearch',                 // Dropdown selector
            'value',                                            // Field name for option text
            'text',                                             // Field name for option values
            'manageClassification'                              // Response value return class name
        );

        $('#Ddldepartment').attr('id', 'ddlInstanceClassificationSearch');
        $('#DdlSubClass').attr('id', 'ddlInstanceSubclassificationSearch');
        $('#Ddslotsid').attr('id', 'ddlInstanceSlotSearch');


        //$(document).on('change', '#ddlInstanceClassificationSearch', function () {
        //    var selectedValues = $(this).val();
        //    /*debugger;*/
        //    fetchDataAndPopulateDropdown(                          //==== << ** Subclassification Dropdown ** >>
        //        '/Attendance/Teacher_attendancesubclassification', // URL for data fetching
        //        '#ddlInstanceSubclassificationSearch',             // Dropdown selector
        //        'value',                                           // Field name for option text
        //        'text',                                            // Field name for option values
        //        'manageClassification'                             // Response value return class name
        //    );
        //});

        //$(document).on('change', '#ddlInstanceSubclassificationSearch', function () {
        //    var ClassificationId = $('#ddlInstanceClassificationSearch').val();
        //    var SubClassificationId = $(this).val();
        //    var FilterTeachingSubjects = 1;
        //    debugger;    
        //        $.ajax({
        //            url: '/Attendance/Attendanceslot?ClassificationId=' + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects,
        //            type: 'GET',
        //            contentType: 'application/json',
        //            success: function (response) {
        //                debugger;
        //                var dropdownSelector = '#ddlInstanceSlotSearch';
        //                var dropdown = $(dropdownSelector);
        //                var valueField = 'instancesubjectId';
        //                var textField = 'subjectName';
        //                //dropdown.empty();
        //                dropdown.append($('<option>', {
        //                    value: '',
        //                    text: '---Select---'
        //                }));
        //                $.each(response, function (index, item) {
        //                    dropdown.append($('<option>', {
        //                        value: item[valueField],
        //                        text: item[textField]
        //                    }));
        //                });
        //            },
        //            error: function (xhr, status, error) {

        //                console.error('Error sending data:', error);
        //            }
        //        });


        //});


        /*--- === *** CLASS TEACHER DROPDOWNS DATA BIND FUNCTION CODE *** === ---*/
    }
    else {

        $('#Roldisplaydate').remove();
        $('#Ddldepartment').empty();
        var Dateformate = getDateFormatted();
        $('#StartDateid').val(getDateFormatted());
        $('#EndDateid').val(Dateformate);    // Use .val() for input fields


        //======>>> Classification Dropdown
        fetchDataAndPopulateDropdown(
            '/Attendance/AttendanceClassification',             // URL for data fetching
            '#Ddldepartment',                                   // Dropdown selector
            'value',                                            // Field name for option text
            'text',                                             // Field name for option values       
            'manageClassification'                              // Response value return class name
        );


        //$(document).on('change', '#Ddldepartment', function () {
        //    var selectedValues = $(this).val();
        //   /* $('#DdlSubClass').val();*/
        //    $('#DdlSubClass').empty();
        //    debugger;
        //    Departmentbysubclassdd(selectedValues);
        //});

        //$('#DdlSubClass').change(function () {
        //    var ClassificationId = $('#Ddldepartment').val();
        //    var SubClassificationId = $('#DdlSubClass').val();
        //    var FilterTeachingSubjects = 0;
        //    $('#Ddslotsid').empty();
        //    Subclassbyslotsdd(ClassificationId, SubClassificationId, FilterTeachingSubjects);
        //});
    }

});

function getFormattedDate() {
    var currentDate = new Date();

    // Get day, month, and year
    var day = String(currentDate.getDate()).padStart(2, '0'); // Ensures 2-digit day
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Ensures 2-digit month
    var year = currentDate.getFullYear();

    // Format the date as dd-mm-yyyy
    return day + '-' + month + '-' + year;
}

function getDateFormatted() {
    var currentDate = new Date();

    // Get day, month, and year
    var day = String(currentDate.getDate()).padStart(2, '0'); // Ensures 2-digit day
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Ensures 2-digit month
    var year = currentDate.getFullYear();

    // Format the date as dd-mm-yyyy
    return year + "-" + month + "-" + day;
}

$(document).on('change', '#ddlInstanceClassificationSearch', function () {
    var selectedValues = $(this).val();
    /*debugger;*/
    fetchDataAndPopulateDropdown(                          //==== << ** Subclassification Dropdown ** >>
        '/Attendance/Teacher_attendancesubclassification', // URL for data fetching
        '#ddlInstanceSubclassificationSearch',             // Dropdown selector
        'value',                                           // Field name for option text
        'text',                                            // Field name for option values
        'manageClassification'                             // Response value return class name
    );
});

$(document).on('change', '#ddlInstanceSubclassificationSearch', function () {
    var ClassificationId = $('#ddlInstanceClassificationSearch').val();
    var SubClassificationId = $(this).val();
    var FilterTeachingSubjects = 1;
    debugger;
    $.ajax({
        url: '/Attendance/Attendanceslot?ClassificationId=' + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {
            debugger;
            var dropdownSelector = '#ddlInstanceSlotSearch';
            var dropdown = $(dropdownSelector);
            var valueField = 'instancesubjectId';
            var textField = 'subjectName';
            dropdown.empty();
            dropdown.append($('<option>', {
                value: '',
                text: '---Select---'
            }));
            $.each(response, function (index, item) {
                dropdown.append($('<option>', {
                    value: item[valueField],
                    text: item[textField]
                }));
            });
        },
        error: function (xhr, status, error) {

            console.error('Error sending data:', error);
        }
    });


});


$(document).off('change', '#Ddldepartment');
$(document).off('change', '#DdlSubClass');

$(document).on('change', '#Ddldepartment', function () {
    var selectedValues = $(this).val();
    /* $('#DdlSubClass').val();*/
    $('#DdlSubClass').empty();
    debugger;
    Departmentbysubclassdd(selectedValues);
});

$('#DdlSubClass').change(function () {
    var ClassificationId = $('#Ddldepartment').val();
    var SubClassificationId = $('#DdlSubClass').val();
    var FilterTeachingSubjects = 0;
    $('#Ddslotsid').empty();
    Subclassbyslotsdd(ClassificationId, SubClassificationId, FilterTeachingSubjects);
});