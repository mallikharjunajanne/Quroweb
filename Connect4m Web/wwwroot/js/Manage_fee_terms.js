
//$(document).ready(function () {

//    // Hide the "CreateFeeType_Divid" initially

//    $("#CreateFeeDiscountType_Divid").hide();


//    // Click event handler for the "Create Fee Type" link
//    $(".NewTypebtn a").click(function (e) {

//        e.preventDefault(); // Prevent the default link behavior

//        // Show/hide the div elements based on the link clicked
//        $("#FeeTypesDiscountTbl_Divid").hide();
//        $("#CreateFeeDiscountType_Divid").show();
//    });


//    /*Back to search Button Function code Start*/
//    // Click event handler for the "Back to Search" button
//    $("#backToSearchBtn").click(function (e) {
//        e.preventDefault(); // Prevent the default button behavior
//        backToSearch();
//    });

//    // Function to show/hide the div elements
//    function backToSearch() {
//        $("#FeeTypesDiscountTbl_Divid").show();
//        $("#CreateFeeDiscountType_Divid").hide();
//    }
//    /*Back to search Button Function code End*/
//});


//$(document).ready(function () {
//    // Event handler for the delete button
//    function deleteFeeType(deleteLink) {
//        debugger;
//        if (confirm('Are you sure you want to delete this FeeType?\nClick OK to delete or Cancel to stop deleting.')) {
//            var row = $(deleteLink).closest('tr');


//            var InstanceId = row.find('td:hidden:eq(0)').text();
//            /*alert(InstanceId);*/
//            var FeeTermId = row.find('td:hidden:eq(1)').text();
//            /*alert(FeeTermId);*/
//            var FeeTypeId = row.find('td:hidden:eq(2)').text();
//            var FeeTerm = row.find('td:eq(3)').text();
//            var FeeTypeName = row.find('td:eq(4)').text();
//            /*alert(FeeTypeId);*/



//            var url = '/FeeSection/Delete_FeeTerm';
//            var data = {
//                InstanceId: InstanceId,
//                FeeTermId: FeeTermId,
//                FeeTypeId: FeeTypeId
//            };

//            $.ajax({
//                url: url,
//                type: 'POST',
//                data: data,
//                dataType: 'json',
//                success: function (response) {
//                    debugger;
//                    if (response == '1') {
//                        $('#ErrorMessage_SpanId').text('Record deleted successfully.');
//                        row.remove();
//                        window.scrollTo(0, 0);
//                    } else if (response == '2') {                     
//                        $('#ErrorMessage_SpanId').text('FeeType' + '"' + FeeTerm + '"' + 'is Deleted For the FeeTerm ' + '"' + FeeTypeName + '"');
//                        row.find('td:eq(4)').empty();
//                    } else if (response == '0') {
//                        $('#ErrorMessage_SpanId').text('Record not deleted.');
//                    }
                   
//                    else {
//                        alert('NUll');
//                    }
//                    /* location.reload();*/
//                },
//                error: function (xhr, status, error) {
//                    // Handle the error here
//                    console.log(error);
//                    alert('An error occurred during the deletion.');
//                }
//            });
//        }
//    }

//    // Attach the event handler to the delete buttons
//    $('.delete-link').on('click', function () {
//        deleteFeeType(this);
//    });
//});





$(document).ready(function () {

    debugger;
    $("#CreateFeeDiscountType_Divid").hide();
    $("#FeeTypesDiscountTbl_Divid").show();

    debugger;
    Feesection_TbLData_Callingfunction();

});




function Search_FeeTerms(event) {

    debugger;
    event.preventDefault();

    // Get the search input value


    var TermName = $('#FeeTermTxt_Id').val();
    var AcademicYearId = $('#CT_Classification_Id').val();


    // alert('TermName=' + TermName + ', AcademicYearId=' + AcademicYearId);



    // Call the Feesection_TbLData_Callingfunction and pass the search value as a parameter
    Feesection_TbLData_Callingfunction(TermName, AcademicYearId);
}

/*--------------------------  TbLData FUNCTION START-------------------------- */
function Feesection_TbLData_Callingfunction(TermName, AcademicYearId) {

    debugger;

    //$.ajax({
    //    url: '/FeeSection/Fee_Terms_GetTable',
    //    method: 'GET',
    //    data: {
    //        TermName: TermName,
    //        AcademicYearId: AcademicYearId
    //    },
    //    success: function (response) {


    //        debugger;

    //        var CountTabledata = response.length;

    //        $('#TableCount').text(CountTabledata);

    //        console.log(response); // Log the response object in the browser's console



    //        var table = $('#FeesectionTableContainer');
    //        var tbody = table.find('tbody');
    //        var rowsPerPage = 10; // Number of rows to display per page

    //        // Clear the existing table body
    //        tbody.empty();

    //        // Iterate over the data and create table rows
    //        $.each(response, function (index, FeeTermstbls) {
    //            var row = $('<tr></tr>');




    //            // Create table cells and populate with data


    //            var cell1 = $('<td class="editable-cell"></td>').css('cursor', 'pointer');
    //            var text = $('<span></span>').text(FeeTermstbls.TermName).css({
    //                'color': 'black',
    //                'font-weight': '600'
    //            }).attr('onclick', 'FeeType_Edit(' + FeeTermstbls.feeTermId + ')');
    //            cell1.append(text);


    //            var cell2 = $('<td></td>').text(FeeTermstbls.);
    //            var cell3 = $('<td></td>').text(FeeTermstbls.description);
    //            var cell4 = $('<td></td>').css('text-align', 'center');
    //            var deleteIcon = $('<i></i>').addClass('fas fa-trash-alt'); // Assuming you're using Font Awesome icons
    //            deleteIcon.data('row', row);
    //            cell4.append(deleteIcon);


    //            var cell5 = $('<td hidden></td>').text(FeeTermstbls.instanceId);
    //            var cell6 = $('<td hidden></td>').text(FeeTermstbls.concedingTypeId);
    //            var cell7 = $('<td hidden></td>').text(FeeTermstbls.feeTypeId);




    //            // Append the cells to the row
    //            row.append(cell1);
    //            row.append(cell2);
    //            row.append(cell3);
    //            row.append(cell4);
    //            row.append(cell5);
    //            row.append(cell6);
    //            row.append(cell7);

    //            // Append the row to the table body
    //            tbody.append(row);
    //        });

    //        // Perform pagination
    //        var numPages = Math.ceil(response.length / rowsPerPage);
    //        var pagination = $('#FeeTypes_pagination');
    //        pagination.empty();

    //        // Create pagination links
    //        var previousLink = $('<a class="FeeTypes_pagination" style="margin: 0 2px;" href="#">Previous</a>');
    //        pagination.append(previousLink);

    //        for (var i = 1; i <= numPages; i++) {
    //            var link = $('<a class="FeeTypes_pagination" style="margin: 0 2px;" href="#">' + i + '</a>');
    //            pagination.append(link);
    //        }

    //        var nextLink = $('<a class="FeeTypes_pagination" style="margin: 0 2px;" href="#">Next</a>');
    //        pagination.append(nextLink);

    //        // Show the first page by default
    //        showPage(1);

    //        // Adjust pagination alignment
    //        pagination.css('text-align', 'center');

    //        // Handle pagination link click event
    //        pagination.on('click', '.FeeTypes_pagination', function (e) {
    //            e.preventDefault();
    //            var page = $(this).text();
    //            if (page === "Previous") {
    //                var currentPage = $('.FeeTypes_pagination.active').text();
    //                page = parseInt(currentPage) - 1;
    //                if (page < 1) {
    //                    page = 1;
    //                }
    //            } else if (page === "Next") {
    //                var currentPage = $('.FeeTypes_pagination.active').text();
    //                page = parseInt(currentPage) + 1;
    //                if (page > numPages) {
    //                    page = numPages;
    //                }
    //            } else {
    //                page = parseInt(page);
    //            }
    //            showPage(page);
    //        });

    //        // Function to display the specified page
    //        function showPage(page) {
    //            var start = (page - 1) * rowsPerPage;
    //            var end = start + rowsPerPage;

    //            tbody.find('tr').hide(); // Hide all rows
    //            tbody.find('tr').slice(start, end).show(); // Show rows for the specified page

    //            if (response.length <= rowsPerPage) {
    //                pagination.hide();
    //            } else {
    //                pagination.show();
    //            }

    //            $('.FeeTypes_pagination').removeClass('active');
    //            $('.FeeTypes_pagination').eq(page).addClass('active');
    //        }

    //    },
    //    error: function () {
    //        console.log('Error retrieving data.');
    //    }
    //});
}
    /*--------------------------  TbLData FUNCTION End-------------------------- */




//   Feesection_TbLData_Callingfunction(TermName, AcademicYearId) {

   
//    //$.ajax({
//    //    url: '/FeeSection/Fee_Terms_GetTable',
//    //    method: 'GET',
//    //    data: {
//    //        TermName: TermName,
//    //        AcademicYearId: AcademicYearId
//    //    },
//    //    success: function (response) {

//    //        /*    debugger;*/

//    //        var CountTabledata = response.length;

//    //        $('#TableCount').text(CountTabledata);

//    //        console.log(response); // Log the response object in the browser's console



//    //        var table = $('#FeeTerms_Table');
//    //        var tbody = table.find('tbody');
//    //        var rowsPerPage = 10; // Number of rows to display per page

//    //        // Clear the existing table body
//    //        tbody.empty();

//    //        // Iterate over the data and create table rows
//    //        $.each(response, function (index, feeSection) {
//    //            var row = $('<tr></tr>');




//    //            // Create table cells and populate with data


//    //            var cell1 = $('<td class="editable-cell"></td>').css('cursor', 'pointer');
//    //            var text = $('<span></span>').text(feeSection.feeType).css({
//    //                'color': 'black',
//    //                'font-weight': '600'
//    //            }).attr('onclick', 'FeeType_Edit(' + feeSection.feeTypeId + ')');
//    //            cell1.append(text);


//    //            var cell2 = $('<td></td>').text(feeSection.concedingTypeName);
//    //            var cell3 = $('<td></td>').text(feeSection.description);
//    //            var cell4 = $('<td></td>').css('text-align', 'center');
//    //            var deleteIcon = $('<i></i>').addClass('fas fa-trash-alt'); // Assuming you're using Font Awesome icons
//    //            deleteIcon.data('row', row);
//    //            cell4.append(deleteIcon);


//    //            var cell5 = $('<td hidden></td>').text(feeSection.instanceId);
//    //            var cell6 = $('<td hidden></td>').text(feeSection.concedingTypeId);
//    //            var cell7 = $('<td hidden></td>').text(feeSection.feeTypeId);




//    //            // Append the cells to the row
//    //            row.append(cell1);
//    //            row.append(cell2);
//    //            row.append(cell3);
//    //            row.append(cell4);
//    //            row.append(cell5);
//    //            row.append(cell6);
//    //            row.append(cell7);

//    //            // Append the row to the table body
//    //            tbody.append(row);
//    //        });

//    //        // Perform pagination
//    //        var numPages = Math.ceil(response.length / rowsPerPage);
//    //        var pagination = $('#FeeTypes_pagination');
//    //        pagination.empty();

//    //        // Create pagination links
//    //        var previousLink = $('<a class="FeeTypes_pagination" style="margin: 0 2px;" href="#">Previous</a>');
//    //        pagination.append(previousLink);

//    //        for (var i = 1; i <= numPages; i++) {
//    //            var link = $('<a class="FeeTypes_pagination" style="margin: 0 2px;" href="#">' + i + '</a>');
//    //            pagination.append(link);
//    //        }

//    //        var nextLink = $('<a class="FeeTypes_pagination" style="margin: 0 2px;" href="#">Next</a>');
//    //        pagination.append(nextLink);

//    //        // Show the first page by default
//    //        showPage(1);

//    //        // Adjust pagination alignment
//    //        pagination.css('text-align', 'center');

//    //        // Handle pagination link click event
//    //        pagination.on('click', '.FeeTypes_pagination', function (e) {
//    //            e.preventDefault();
//    //            var page = $(this).text();
//    //            if (page === "Previous") {
//    //                var currentPage = $('.FeeTypes_pagination.active').text();
//    //                page = parseInt(currentPage) - 1;
//    //                if (page < 1) {
//    //                    page = 1;
//    //                }
//    //            } else if (page === "Next") {
//    //                var currentPage = $('.FeeTypes_pagination.active').text();
//    //                page = parseInt(currentPage) + 1;
//    //                if (page > numPages) {
//    //                    page = numPages;
//    //                }
//    //            } else {
//    //                page = parseInt(page);
//    //            }
//    //            showPage(page);
//    //        });

//    //        // Function to display the specified page
//    //        function showPage(page) {
//    //            var start = (page - 1) * rowsPerPage;
//    //            var end = start + rowsPerPage;

//    //            tbody.find('tr').hide(); // Hide all rows
//    //            tbody.find('tr').slice(start, end).show(); // Show rows for the specified page

//    //            if (response.length <= rowsPerPage) {
//    //                pagination.hide();
//    //            } else {
//    //                pagination.show();
//    //            }

//    //            $('.FeeTypes_pagination').removeClass('active');
//    //            $('.FeeTypes_pagination').eq(page).addClass('active');
//    //        }

//    //    },
//    //    error: function () {
//    //        console.log('Error retrieving data.');
//    //    }
//    //});

//}