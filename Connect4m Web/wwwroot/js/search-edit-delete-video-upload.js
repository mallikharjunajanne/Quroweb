

var videosClassificationIds = $('#Department').val();
var videosInstanceSubClassificationId = $('#ClassificationIds').val();
var videosInstanceSubjectsId = $('#InstanceSubClassificationId').val();
var videosInstanceSubjectsToolIds = $('#InstanceSubjectsId').val();



$(document).ready(function () {
    // document.getElementById("loading").style.display = "block";
    searchvideosuploading(videosClassificationIds, videosInstanceSubClassificationId, videosInstanceSubjectsId, videosInstanceSubjectsToolIds);
    //   document.getElementById("loading").style.display = "none";
});
function searchvideosuploading(videosClassificationIds, videosInstanceSubClassificationId, videosInstanceSubjectsId, videosInstanceSubjectsToolIds) {
    debugger;
    $.ajax({
        url: "/Videos/SearchUploadlecturedocsjson?ClassificationIds=" + videosClassificationIds + "&InstanceSubClassificationId=" + videosInstanceSubClassificationId + "&InstanceSubjectsId=" + videosInstanceSubjectsId + "&SubjectsToolId=" + videosInstanceSubjectsToolIds ,
        type: "GET",
      
        dataType: "JSON",
        success: bindDatatableforsearchvideos

    });
}





function bindDatatableforsearchvideos(response) {
    var sno = 0;
    var table = $('#tbluploadlecturedocs').DataTable();
    table.destroy();
    $("#totalrecords_uploadlecturedocs").text(response.length);
    //  alert("hi1");
    $("#tbluploadlecturedocs").DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'pdfHtml5',
                //orientation: 'landscape',
                //pageSize: 'LEGAL',
                exportOptions: {
                    columns: [ 3, 4, 5, 6, 7, 8]
                },

            }

            ,
            {
                extend: 'excel',
               
                exportOptions: {
                    columns: [3, 4, 5, 6, 7, 8]
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
        stateSave:true,
        data: response,
        columns: [


            {
                data: "SubjectVideoId",
                visible: false,
                render: function (data, type, row, meta) {
                    //  length++;
                    return row.subjectVideoId
                }
            },
            {
                render: function (data, type, row, meta) {
                    sno++;
                    return sno;
                }
            },

            {
                data: "VideoPath",
                visible: false,
                render: function (data, type, row, meta) {
                    //  length++;

                    return row.videoPath

                }
            },
           
            {
                data: "ClassificationName",
                render: function (data, type, row, meta) {
                    return row.classificationName
                }
            },
            {
                data: "SubClassificationName",
                render: function (data, type, row, meta) {
                    return row.subClassificationName
                }
            },
            {
                data: "SubjectName",
                render: function (data, type, row, meta) {
                    return row.subjectName
                }
            },
            {
                data: "SubjectToolName",
                render: function (data, type, row, meta) {
                    return row.subjectToolName
                }
            },

            {
                data: "IsRestriction",
                render: function (data, type, row, meta) {
                    if(row.isRestriction == "0")
                    {
                        return'<div>False</div>'
                     }
                        else
                      {
                     return' <div>True</div>'
                       }

                 
                }
            },
            {
                data: "Displayname",
                render: function (data, type, row, meta) {

                    return row.displayname
                }
            },
            {
               
                render: function (data, type, row, meta) {
                    var file_name = row.videoPath;
                    var Lowecase = file_name.substring(file_name.lastIndexOf('.') + 1);
                    var file_extension = Lowecase.toLowerCase();
                    if (file_extension == "docx") {
                       
                        return '<img src="/Images/doc.png"  title="View Document" onclick="Opennewwindow(\'' + file_name + '\')" />';
                    }
                    else if (file_extension == "pdf") {
                        return '<img src="/Images/pdf.png" title="View Document" onclick="Opennewwindow(\'' + file_name +'\')"/>'
                    }
                    else if (file_extension == "mp4") {
                        return '<img src="/Images/mp4.png" title="View Document" onclick="Opennewwindow(\'' + file_name +'\')"/>'
                    }
                    else if (file_extension == "gif") {
                        return '<img src="/Images/gif.png" title="View Document" onclick="Opennewwindow(\'' + file_name +'\')"/>'
                    }
                    else if (file_extension == "xlsx" || file_extension == "xls") {
                        return '<img src="/Images/xls.png" title="View Document" onclick="Opennewwindow(\'' + file_name +'\')"/>'
                    }
                    else if (file_extension == "no") {
                        return ' '
                    }
                    else {
                        return '<img src="/Images/png.png" title="View Document" onclick="Opennewwindow(\'' + file_name +'\')"/>'
                    }
                   
                }
            },

                {
                    data: "InstanceSubClassificationId",
                    visible: false,
                render: function (data, type, row, meta) {
                    return row.instanceSubClassificationId
                }

            },

            {
                data: "ClassificationIds",
                visible: false,
                render: function (data, type, row, meta) {
                    return row.classificationIds
                }

            },

            {
                data: "InstanceSubjectsId",
                visible: false,
                render: function (data, type, row, meta) {
                    return row.instanceSubjectsId
                }

            },

            {
                data: "PlayLink",
                visible: false,
                render: function (data, type, row, meta) {
                    return row.playLink
                }

            },
            {
                data: "DeleteLink",
                visible: false,
                render: function (data, type, row, meta) {
                    return row.deleteLink
                }

            },
            {
                data: "IsonlineTest",
                visible: false,
                render: function (data, type, row, meta) {
                    return row.isonlineTest
                }

            },
            {
                data: "SubjectName",
                visible: false,
                render: function (data, type, row, meta) {
                    return row.subjectName
                }

            }, {
                data: "Ext1",
                visible: false,
                render: function (data, type, row, meta) {
                    return row.ext1
                }

            },
            {
                data: "VideoStatus",
              
                render: function (data, type, row, meta) {
                    return row.videoStatus
                }

            },
            
            {
                render: function (data, type, row, meta) {
                    return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;margin-top:15%;"  title="Delete"><input type="text" value=' + row.subjectVideoId + ' hidden/></i>'
                }
            }
        ]


    });
    table.on('draw', function () {
        $('#tbluploadlecturedocs').find('td:nth-child(2)').attr('title', 'Edit');
    });
    $('#tbluploadlecturedocs').find('td:nth-child(2)').attr('title', 'Edit');

}

function Opennewwindow(fileextens) {
    debugger;
    var endsWithVideo = fileextens.endsWith(".mp4");
    if (endsWithVideo) {
        $('#TrailVideoviewbyadmin').css('display', 'block');
        var videoURL = '/LMSVideos/Instance545/' + fileextens;
        var videoContainer = $('#TrailVideoviewbyadmin');
        var videoElement = videoContainer.find("video");
        var videoSource = videoContainer.find("source");
        videoSource.attr("src", videoURL);
        videoElement[0].load();
        videoElement[0].play();
       
        window.scrollTo(0, document.body.scrollHeight);


    } else {
        $('#TrailVideoviewbyadmin').css('display', 'none');
        window.open('/Videos/OpenFile?filename=' + fileextens, "_blank", "width = 400, height = 400");

    }


    //const myWindow = window.open("sree", "", "width=300,height=300");
  //  window.open("data:application/pdf;base64, " + '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');
    //const myWindow = window.open('/Videos/OpenFile', '_blank', "width=300,height=300");

   // const myWindow = window.open("/LMSDocs/Instance545/346296SupportCalls-04-03-23.xlsx", "", "width=300,height=300");
}
$(document).on('click', 'form #videos_uploading_clear', function () {
   
    document.getElementById('Department').selectedIndex = -1;
    document.getElementById('ClassificationIds').innerHTML = "";
    document.getElementById('InstanceSubClassificationId').innerHTML = "";
    document.getElementById('InstanceSubjectsId').innerHTML = "";
})

//------------------------------------------------------------------------------------Search The Videos Uploading Screen
$("#formsearchvideouploading").submit(function (event) {
    debugger;
    
    event.preventDefault();
    videosClassificationIds = $('#Department').val();
    videosInstanceSubClassificationId = $('#ClassificationIds').val();
    videosInstanceSubjectsId = $('#InstanceSubClassificationId').val();
    videosInstanceSubjectsToolIds = $('#InstanceSubjectsId').val();
    searchvideosuploading(videosClassificationIds, videosInstanceSubClassificationId, videosInstanceSubjectsId, videosInstanceSubjectsToolIds);

});

//--------------------------------------------------------------------Delete Upload Lecture Docs
$(document).on('click', '#tbluploadlecturedocs .fa-trash-o', function () {
   // debugger;
    var mp4 = $(this).closest('tr').find('td img').attr('src');
    var isvideo = 0;

    if (mp4 && mp4.startsWith('/Images/mp4.png')) {
        isvideo = 1;
    }


    Swal.fire({
        title: "Are you sure you want to delete this Video?",
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
                url: '/Videos/DeleteUploadlecturedocs?VideoId=' + $(this).find('input[type="text"]').val() + "&isvideo=" + isvideo,
                type: "GET",
                success: function () {

                    Swal.fire("Success", "Record Deleted Successfully", "success");
                    searchvideosuploading(videosClassificationIds, videosInstanceSubClassificationId, videosInstanceSubjectsId, videosInstanceSubjectsToolIds);

                }
            })
        }
    });
  
})
//------------------------------------------------------------------------   (List)  Update the Upload Lecture docs

$(document).on('click', '#tbluploadlecturedocs td:nth-child(2)', function (event) {
    var id = event.target.closest('tr');
    var videoid = $(id).find('input[type = "text"]').val();
   // alert(videoid);
    //  var id = $(this).find('').find('input[type="text"]').val();

    if ($(this).find('.fa-trash-o').length == 0) {
        window.location.href = "/Videos/UploadLecturedocs?videoId=" + videoid;

    }

})



















































//function GetClientReport() {
//   // window.open('/Videos/OpenFile', "_blank");

//    var videoUrl = "LMSVideos/Instance545/434050movie.mp4";

//    var videoElement = document.createElement("video");
//    videoElement.src = videoUrl;
//    videoElement.controls = true;
//    videoElement.autoplay = true;

//    var newWindow = window.open("", "_blank", "width=300,height=300");
//    newWindow.document.write(videoElement.outerHTML);
//};