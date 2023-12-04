


$(document).ready(function () {

    // Hide the "CreateFeeType_Divid" initially
   /* $("#CreateFeeType_Divid").hide();*/
    /*  alert("Js File Its Working");*/



    // Click event handler for the "Create Fee Type" link
    //$(".NewTypebtn a").click(function (e) {

    //    e.preventDefault(); // Prevent the default link behavior

    //    // Show/hide the div elements based on the link clicked
    //    $("#FeeTypesTbl_Divid").hide();
    //    $("#CreateFeeType_Divid").show();
    //});  


    /*Back to search Button Function code Start*/
   
    $("#backToSearchBtn").click(function (e) {
        e.preventDefault(); 
        debugger;
      
        backToSearch();
    });

    // Function to show/hide the div elements
    function backToSearch() {
       
        $("#FeeTypesTbl_Divid").show();
        $("#CreateFeeType_Divid").hide();
    }
    /*Back to search Button Function code End*/

   
});




$(document).ready(function () {


  


})



