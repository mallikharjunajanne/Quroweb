var subject_tool_name=' ';

$(document).ready(function () {
   // document.getElementById("loading").style.display = "block";
    searchsubjecttoos(subject_tool_name);
 //   document.getElementById("loading").style.display = "none";
});

function searchsubjecttoos(SubjectToolName) {
    debugger;
    $.ajax({
        url: "/Videos/Searchsubjecttool?SubjectToolName=" + SubjectToolName,
        type: "GET",
        dataType: "JSON",
        success: bindDatatable

    });
}




//var length = 0;
function bindDatatable(response) {
   
    var table = $('#tblsubjecttools').DataTable();
    table.destroy();
    $("#totalrecords_subtools").text(response.length);
    //  alert("hi1");
    $("#tblsubjecttools").DataTable({
        /*  dom: '',*/
        dom: 'Bfrtip',
        buttons: [
            //{
            //    extend: 'pdfHtml5',
            //    exportOptions: {
            //        columns: [ 1,2 ]
            //    },

            //}
            //,
            {
                extend: 'excel',
                exportOptions: {
                    columns: [ 2, 3]
                },
            }
        ],
        
        bProcessing: false,
        bLengthChange: true,
      /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
        bfilter: false,
        bSort: true,
        searching: false,
        //scrollX: true,
        //scrollY: '400px',
       /* scrollCollapse: true,*/
        paging: true,
        bPaginate: true,
        data: response,
        columns: [


            {
                data: "InstanceSubjectToolId",
                visible: false,
                render: function (data, type, row, meta) {
                    //  length++;
                    return row.instanceSubjectToolId
                }
            },
           
            {
                data: "SubjectToolName",
                render: function (data, type, row, meta) {
                    //  length++;

                    return row.subjectToolName

                }
            },
            {
                data: "Comments",
                render: function (data, type, row, meta) {
                    return row.comments
                }
            },
            {
                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o"><input type="text" value=' + row.instanceSubjectToolId +' hidden/></i>'
                }
            }
        ]


    });

}


$(document).on('click', "#mst_search", function () {
    subject_tool_name = $("#subject_tool_name").val();
    searchsubjecttoos(subject_tool_name);
    $("#th4delete").css("width", "51px");
    $("#th2tool").css("width", "249px");
    $("#th3description").css("width", "546px");

})

$(document).on('click', "#mst_clear", function () {
    $("#subject_tool_name").val("");
    

})



//----------------------------------------------------------------    Delete Subject Tools

// Event listener for the delete button
$(document).on('click','#tblsubjecttools .fa-trash-o',function() {
    // Display SweetAlert confirmation dialog
    var InstanceSubjectToolId = $(this).find('input[type="text"]').val();
  
    Swal.fire({
        title: "Are you sure you want to delete this Subject?",
        text: "  ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        // If user confirms deletion
        if (result.isConfirmed) {
            $.ajax({
                url: "/Videos/Deletesubjecttool?InstanceSubjectToolId=" + InstanceSubjectToolId,
                type: "GET",
                dataType: "JSON",
                success: function (response) {
                  
                  if (response == 1) {
                    Swal.fire(" Not Deleted!", "Marks are Posted for Listening Comprehension and it can not be deleted..!", "error");
                        
                      //  subject_tool_name = $("#subject_tool_name").val();
                      //  searchsubjecttoos(subject_tool_name);
                    }
                  else  if (response == 2) {
                      Swal.fire("Deleted!", "Your Subject has been deleted.", "success");

                        subject_tool_name = $("#subject_tool_name").val();
                        searchsubjecttoos(subject_tool_name);
                    }

                }

            });
          
           
        }
    });
});



//-------------------------------------------------------  Updating Subject Tools    

$(document).on('click', '#tblsubjecttools tbody tr td', function (event) {
    var id = event.target.closest('tr');
    var instanceSubjectToolId= $(id).find('input[type = "text"]').val();
  //  var id = $(this).find('').find('input[type="text"]').val();
 
    if ($(this).find('.fa-trash-o').length==0) {
        window.location.href = "/Videos/Insertsubjecttool?InstanceSubjectToolId=" + instanceSubjectToolId;
       
    }

})

