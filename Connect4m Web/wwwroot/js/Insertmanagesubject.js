//----------------------------- When Click On check Box (classification) in Manage Subject get Subclassfication
$(document).on('click','.Department_list input[type="checkbox"]', function (event) {
   
    var InstanceClassificationId = $(this).val();
    var closest = $(event.target).closest('#classficationnames_MS');
    var subclassificationappend = $(closest).find('#subclassificationappend');
    if ($(this).prop('checked')) {
        $.ajax({
            url: "/Videos/Subclassfications_MS?InstanceClassificationId=" + InstanceClassificationId,
            type: "GET",

            success: function (response) {
                if (response == 0) {
                    subclassificationappend.html("");
                }
                else {
                    subclassificationappend.html(response);
                }
               

               
            }

        });
    }
    else {
        subclassificationappend.html("");
    }

})
