


$(document).ready(function () {

    // Hide the "CreateFeeType_Divid" initially

    $("#CreateFeeDiscountType_Divid").hide();


    // Click event handler for the "Create Fee Type" link
    $(".NewTypebtn a").click(function (e) {

        e.preventDefault(); // Prevent the default link behavior

        // Show/hide the div elements based on the link clicked
        $("#FeeTypesDiscountTbl_Divid").hide();
        $("#CreateFeeDiscountType_Divid").show();
    });


    /*Back to search Button Function code Start*/
    // Click event handler for the "Back to Search" button
    $("#backToSearchBtn").click(function (e) {
        e.preventDefault(); // Prevent the default button behavior
        backToSearch();
    });

    // Function to show/hide the div elements
    function backToSearch() {
        $("#FeeTypesDiscountTbl_Divid").show(); 
        $("#CreateFeeDiscountType_Divid").hide();
    }
    /*Back to search Button Function code End*/
});



$(document).ready(function () {
    // Event handler for the delete button
    function deleteFeeType(deleteLink) {
        debugger;
        if (confirm('Are you sure you want to delete this FeeType?\nClick OK to delete or Cancel to stop deleting.')) {
            var row = $(deleteLink).closest('tr');
           

            var ConcedingTypeId = row.find('td:hidden:eq(0)').text();



            var url = '/FeeSection/Delete_Manage_FeeDisountType';
            var data = {                
                ConcedingTypeId: ConcedingTypeId
            };

            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function (response) {
                    debugger;
                    if (response == '1') {
                        $('#ErrorMessage_SpanId').text('Record deleted successfully.');
                        row.remove();
                        window.scrollTo(0, 0);
                    } else if (response == '2') {
                        $('#ErrorMessage_SpanId').text('Deletion failed');
                    } else if (response == '-1') {
                        $('#ErrorMessage_SpanId').text('This DiscountType is Associated with one of Fee Types you cannot delete it.');
                    }
                    else {
                        alert('NUll');
                    }
                    /* location.reload();*/
                },
                error: function (xhr, status, error) {
                    // Handle the error here
                    console.log(error);
                    alert('An error occurred during the deletion.');
                }
            });
        }
    }

    // Attach the event handler to the delete buttons
    $('.delete-link').on('click', function () {
        deleteFeeType(this);
    });
});
