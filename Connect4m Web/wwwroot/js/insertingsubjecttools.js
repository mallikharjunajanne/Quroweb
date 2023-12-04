

//-----------------------------------------------------------------------  inserting Subject Tools
$(document).ready(function () {


var decide_update_save = $('#Decide_Up_Save').val();
    if (decide_update_save == '1215') {

        $('#sub_tblsubjecttools').val("Update");
        $('#clearform').hide();
    }
    else {
        $('#clearform').show();

    }
})


$("#Insertsubjecttool").submit(function (event) {
    debugger;
    //    alert("edit button click");
    event.preventDefault(); // prevent the form from submitting
    var formData = $(this).serialize(); // get the form data


    if ($("#sub_tblsubjecttools").val() == "Create") {
        //  alert("if condition true"); 
        $.ajax({
            url: "/Videos/Insertsubjecttool",
            type: "POST",
            data: formData,
            success: function (result) {
                if (result == 1) {
                    Swal.fire("Success", "Record inserted successfully...!", "success");
                    document.getElementById("Insertsubjecttool").reset();
                }
                else if (result == 0) {
                    Swal.fire("Error", "Please Enter All Fields", "error");

                }
                else {
                    Swal.fire("Error", "Subject Tool name already Exists..", "error");

                }
            }
        })
    }



    else if ($("#sub_tblsubjecttools").val() == "Update") {
        //  alert("if condition true"); 
        $.ajax({
            url: "/Videos/Insertsubjecttool?update=1215",
            type: "POST",
            data: formData,
            success: function (result) {
                if (result == 1) {
                    Swal.fire("Success", "Record Updated successfully...!", "success");
                   // var form = document.getElementById("Insertsubjecttool");
                    //form.reset(); 
                    $('#Insertsubjecttool').find('input[type="text"]').val('');
                    $('#Insertsubjecttool').find('input[type="number"]').val('');
                  
                    $('#Insertsubjecttool').find('textarea').val('');

                    $('#sub_tblsubjecttools').val("Create");
                    $('#clearform').show();
                  
                  //  window.location.href = "/Videos/Insertsubjecttool";


                }
                else if (result == 0) {
                    Swal.fire("Error", "Please Enter All Fields", "error");

                }
                
            }
        })
    }






});




$(document).on('change', '#Insertsubjecttool textarea', function () {

    var textarealength = $(this).val();
    alert(textarealength);



})