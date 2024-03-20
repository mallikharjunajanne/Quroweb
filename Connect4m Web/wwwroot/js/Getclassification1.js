

$(document).ready(function () {

    var Rolename = $('#ROLENAMESPANID').val().toUpperCase();

    if (Rolename == "CLASS TEACHER") {

        //**** ====== *** CLASS TEACHER DROPDOWNS DATA BIND FUNCTION CODE *** ====== ****//

        $('#Rlenddate').remove();
        //$('#Rldepartment').remove();
        //$('#Rlclass').remove();
        $('#StartDateid').remove();
        $('#RlStartdate').text('Date');


        var currentDate = new Date();
        var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        var dateString1 = currentDate.toLocaleDateString(undefined, options);
        $("#Roldisplaydate").text(dateString1);
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
            //dropdown.empty();
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