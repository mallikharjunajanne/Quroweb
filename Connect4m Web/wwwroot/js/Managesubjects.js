


$(document).ready(function () {
    searchformanagesubjects();
})

//-----------------------------------------------------------------Class Dropdown getting when department will change
var classfor_ms = document.getElementById('SubClassificationId_MS');

$(document).on('change', '#Insertsubject #Drop_Format-MS', function () {

    var InstanceClassificationId = $(this).find('#dropdown_department_MS').val();
   
    classfor_ms.innerHTML = ' <option>-- Please select a Class --</option>';
    $.ajax({
        url: '/Videos/GetClassfor_MS?InstanceClassificationId=' + InstanceClassificationId,
        type: 'POST',
        success: function (response) {
            if (response.length == 0) {
                classfor_ms.disabled = true;
            }
            else {
                classfor_ms.disabled = false;
            }
            response.forEach(response => {
                const newoption = document.createElement('Option');
                newoption.value = response.value;
                newoption.text = response.text;
                classfor_ms.add(newoption);
            })
        }
    })



});

//-------------------------------    Clear The Form when Click on The Clear Button 


$(document).on('click', '#Insertsubject #clearform', function () {
    classfor_ms.innerHTML = ' <option>-- Please select a Class --</option>';
});


//-------------------------------    Search the Manage  subject  when click On The searh button 


$(document).on('click', '#Insertsubject #sub_tblsubject', function () {
   // debugger;
    searchformanagesubjects();

});



function searchformanagesubjects() {
 //   debugger;
    var SubjectNam = document.querySelector('#Insertsubject #SubjectName_Ms').value;
  
    var SubjectCod = document.querySelector('#Insertsubject #SubjectCode_Ms').value;


  
    var ClassificationI = document.querySelector('#Insertsubject #dropdown_department_MS').value;


   
    var SubClassificationI = document.querySelector('#Insertsubject #SubClassificationId_MS').value;


    searchsubject(SubjectNam, SubjectCod, ClassificationI, SubClassificationI);
}

function searchsubject(SubjectNam, SubjectCod, ClassificationI, SubClassificationI) {
   // debugger;
    $.ajax({
        url: "/Videos/Searchsubjects?SubjectName=" + SubjectNam + "&SubjectCode=" + SubjectCod + '&ClassificationId=' + ClassificationI + '&SubClassificationId=' + SubClassificationI,
        type: "GET",
        dataType: "JSON",
        success: bindDatatable

    });
}



//--------------------------------------------------------Bind Data into Data Table 

function bindDatatable(response) {
   // debugger;
    var table = $('#tblsubjects').DataTable();
    table.destroy();
    $("#totalrecords_sujects_MS").text(response.length);
    //  alert("hi1");
    $("#tblsubjects").DataTable({
        dom: 'Bfrtip',
        buttons: [
           
            
            {
                extend: 'excel',
                exportOptions: {
                    columns: [1]
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
                data: "SubjectName",
              
                render: function (data, type, row, meta) {
                    //  length++;
                    return row.subjectName
                }
            },

            {
                data: "SubjectTypeName",
                visible: false,
                render: function (data, type, row, meta) {
                    //  length++;

                    return row.subjectTypeName

                }
            }
        ]


    });

}

