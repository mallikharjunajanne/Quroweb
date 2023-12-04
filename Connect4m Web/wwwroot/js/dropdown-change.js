










//--------Department change to get class names





$("#Department").change(function () {
    var ClassificationIds = $("#Department").val();
  //  alert(ClassificationIds);
    departmentchange(ClassificationIds);
  
})

function departmentchange(ClassificationIds, instanceSubClassificationValues) {
    $.ajax({
        url: "/Videos/GetClassnames?ClassificationIds=" + ClassificationIds,
        type: "GET",
        success: function (response) {
            document.getElementById("ClassificationIds").innerHTML = "";
            document.getElementById("InstanceSubClassificationId").innerHTML = "";
            document.getElementById("InstanceSubjectsId").innerHTML = "";
            response.forEach(function (department) {
                debugger;
                var option = document.createElement("option");


                option.value = department.value;
                option.text = department.text;

                document.getElementById("ClassificationIds").appendChild(option);
            });
           // if (instanceSubClassificationValues != 0 && instanceSubClassificationValues == undefined) {

                $('#ClassificationIds').val(instanceSubClassificationValues);
           // }
        }
    })

}

    
//--------Class Names change to get Subject  names

$("#ClassificationIds").change(function () {
    var ClassificationIds = $("#Department").val();
    var InstanceSubClassificationId = $("#ClassificationIds").val();
    //  alert(ClassificationIds);
    classficationchange(ClassificationIds, InstanceSubClassificationId);

})

function classficationchange(ClassificationIds, InstanceSubClassificationId, instanceSubjectsValues) {
    $.ajax({
        url: "/Videos/GetSubjectnames?ClassificationIds=" + ClassificationIds + "&InstanceSubClassificationId=" + InstanceSubClassificationId,
        type: "GET",
        success: function (response) {
            document.getElementById("InstanceSubClassificationId").innerHTML = "";
            document.getElementById("InstanceSubjectsId").innerHTML = "";

            response.forEach(function (department) {
                debugger;
                var option = document.createElement("option");


                option.value = department.value;
                option.text = department.text;

                document.getElementById("InstanceSubClassificationId").appendChild(option);
                $('#InstanceSubClassificationId').val(instanceSubjectsValues);

            });

        }
    })

}

//--------Subject  Names change to get Subject Tool Names

$("#InstanceSubClassificationId").change(function () {
    
    var InstanceSubjectsId = $("#InstanceSubClassificationId").val();
    //  alert(ClassificationIds);
    instancesubclassficationchange(InstanceSubjectsId);
   

})
function instancesubclassficationchange(InstanceSubjectsId, subjecttoolid) {
    $.ajax({
        url: "/Videos/GetSubjecttoolnames?InstanceSubjectsId=" + InstanceSubjectsId,
        type: "GET",
        success: function (response) {
            document.getElementById("InstanceSubjectsId").innerHTML = "";
            response.forEach(function (department) {
                debugger;
                var option = document.createElement("option");


                option.value = department.value;
                option.text = department.text;

                document.getElementById("InstanceSubjectsId").appendChild(option);
                $('#InstanceSubjectsId').val(subjecttoolid);
            });

        }
    })
}
