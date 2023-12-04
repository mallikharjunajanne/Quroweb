
//----------------------------------Nav Links Maintain  1)    Course Content

//const { debug } = require("node:util");

//const { debug } = require("node:console");

//const { main } = require("@popperjs/core");

//const { debug } = require("console");
//const { DEFAULT_ECDH_CURVE } = require("node:tls");

var hours; var minutes; var seconds;





$(document).on('click', '.topnav #Course-Contents', function (event) {
    event.stopImmediatePropagation();
    setCookie("belowbuttons","#Course-Contents", 5);
    $.ajax({
        url: '/Videos/Coursecontents',
        type: 'GET',
        success: function (response) {
            //   document.getElementById('below-video-content').innerHTML = response;
            $('#below-video-content').html(response);
            window.scrollTo(0, 100);
            //console.log("!st Link");
            //console.log($('#below-video-content').html());
        }
    })
   



})


$(document).on('click', '.topnav #create-notes-navlink', function (event) {
    event.stopImmediatePropagation();
    setCookie("belowbuttons", "#create-notes-navlink", 5);
    $.ajax({
        url: '/Videos/Createnotes',
        type: 'GET',
        success: function (response) {
            //   document.getElementById('below-video-content').innerHTML = response;
            $('#below-video-content').html(response);
            notebooktimemain();
            Listofnotes();
            window.scrollTo(0, 100);
            //console.log("2nd Link");
            //console.log($('#below-video-content').html());

        }
    })



})
$(document).on('click', '#notebook-save-cancel #bookmark-save', function (event) {
    debugger;
    setCookie("belowbuttons", "#bookmark-save", 5);
    event.stopImmediatePropagation();
    var subjectvideoid = document.getElementById('VLD_SubjectVideoId').value;
    var noteval = $(this).closest(".video-write-notes").find("#notes_textarea").val();
    var notesid = $(this).closest(".video-write-notes").find("#notesid").val();
    var obj2 = {
        timeHours: hours,
        timeMinutes: minutes,
        timeSeconds: seconds,
        notesDescription: noteval,
        Subjectvideoid: subjectvideoid,
        notesId: notesid

    };
    CommonAjaxFunction('POST', '/Videos/InsertingNotes', obj2, function (response) {
        document.getElementById('create-bookmark-container').style.display = 'flex';
        document.querySelector('.video-write-notes').style.display = 'none';
        notebooktimemain();
        $('.alert-success').text("Successfully Created Your Note");
        $(".alert-success").show().delay(3000).fadeOut()
        playVideo();
        Listofnotes();
        window.scrollTo(0, 100);

    }, function (status, error) {

    }, false);


    //$.ajax({
    //    url: '/Videos/InsertingNotes',
    //    type: 'GET',
    //    data: obj2,
     
      
    //    success: function (response) {
    //        document.getElementById('create-bookmark-container').style.display = 'flex';
    //        document.querySelector('.video-write-notes').style.display = 'none';
    //        notebooktimemain();
    //        $('.alert-success').text("Successfully Created Your Note");
    //        $(".alert-success").show().delay(3000).fadeOut()
    //        playVideo();
    //        Listofnotes();
    //        window.scrollTo(0, 100);


    //    }
    //})
})
function Listofnotes() {
    $('#Append_ListOfNotes').html("");
    var subjectvideoid = document.getElementById('VLD_SubjectVideoId').value;
    $.ajax({
        url: '/Videos/ListofNotes?subjectvideoid=' + subjectvideoid,
        type: 'GET',
        success: function (response) {
            $('#Append_ListOfNotes').html(response);
        }
    })

}
//----------------------------------  Edit THe Note In Below The vvideo links


$(document).on('click', '#main_listofnotes .fa-edit', function (event) {
    event.stopImmediatePropagation();
    debugger;

    $(this).closest('#main_listofnotes').find('.video-write-notes').css('display', 'block');
    $(this).closest('#listofnotessub2').css('dispaly', 'block');

   //// $('#create-bookmark-container').click();
   // document.getElementById('create-bookmark-container').style.display = 'none';
   // document.querySelector('.video-write-notes').style.display = 'block';
   // pauseVideo();
   // var parent = $(this).closest("#main_listofnotes").find(".video-write-notes");
   // var notesid = $(parent).find('#notesid').text();
   // var time = $(parent).find('span').text();
   // var notesdescrption = $(parent).find('#notes_textarea').val();
   // var maindiv = $('#below-video-content').find('.video-write-notes');
   // $(maindiv).find('input[type=text]').val(notesid);
   // $(maindiv).find('#bookmark-current-time-after').text(time);
   // $(maindiv).find('textarea').val(notesdescrption);




})

//------------------------------------ Delete the notes in below the video link

$(document).on('click', '#LMS_listofnotes .fa-trash-o', function (event) {
    event.stopImmediatePropagation();
    var notesid = $(this).closest('#main_listofnotes').find('#notesid').val();
    Swal.fire({
        title: "Are you sure you want to delete this Notes?",
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
                url: '/Videos/DeleteNotes?NoteId=' + notesid,
                type: 'GET',
                success: function () {
                    $('.alert-danger').text("Successfully Deleted The Note..!");
                    $(".alert-danger").show().delay(3000).fadeOut()
                    Listofnotes();
                }
            })
        }
    });
    
})
//----------------------------------------------- Generate Pdf
//$(document).on('click', '#genratepdfnotes', function (event) {
//    event.stopImmediatePropagation;
//    $('#myyFormpdf').css('display', 'block');

//})



$(document).on('click', '#genratepdfnotes', function (event) {
    event.stopImmediatePropagation;
    var subjectvideoid = $('#VLD_SubjectVideoId').val();

    //if (pdfdisplayname != "") {

    //    $('.alert-success').text("PDF Generated Successfully....!");
    //    $(".alert-success").show().delay(4000).fadeOut();
    //    window.location.href = '/Videos/GeneratePdf?SubjectVideoId=' + subjectvideoid + '&pdfdisplayname=' + pdfdisplayname;
    //    $('#myyFormpdf').css('display', 'none');
    //}
    //else {
    //    $('.alert-danger').text("Please Enter The PDF Display Name");
    //    $(".alert-danger").show().delay(4000).fadeOut();
//}
    Swal.fire({
        title: "<div><span style='color:red'>*</span> PDF Name</div><div><input type='text' id='pdfDistext' style='width:56%;background:aliceblue;height:34px;'/></div>",
             text: "  ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Set Display Name "
    }).then((result) => {
   
        var pdfdisplayname = $('#pdfgenerationtext').val();

        // If user confirms deletion
        if (result.isConfirmed) {
            var pdfdisplayname = $('#pdfDistext').val();
  

            if (pdfdisplayname.trim() !== "") {

                Swal.fire("Success", "Pdf Generated SuccessFully..", "success").then(function () {
                    window.location.href = '/Videos/GeneratePdf?SubjectVideoId=' + subjectvideoid + '&pdfdisplayname=' + pdfdisplayname;
                });

            }
            else {
                Swal.fire("Error", "Please Enter Pdf Name", "error");

            }
        }
    });
})
    //------------------------------------------- Show All Pdfs

    $(document).on('click', '.topnav #GettingAllGeneratedPdfs', function (event) {

      
        event.stopImmediatePropagation();
        setCookie("belowbuttons", "#GettingAllGeneratedPdfs", 5);

        $.ajax({
            url: '/Videos/ListofPdfs',
            type: 'GET',
            success: function (response) {
                $('#below-video-content').html(response);
            }
        })
    })

















//--------------------------------------------------   Getting Results
$(document).on('click', '.topnav #ViewMarks', function (event) {
    event.stopImmediatePropagation();
    setCookie("belowbuttons", "#ViewMarks", 5);

    $.ajax({
        url: '/Videos/GettingResults',
        type: 'GET',
        success: function (response) {
          
            $('#below-video-content').html(response);
           
            window.scrollTo(0, 100);
           

        }
    })



})


$(".box a").hover(function () {
    /* alert("hii");*/
    debugger;
    var tooltip = $(this).find(".tooltiptext");
    var tooltipWidth = tooltip.outerWidth();
    /*    var tooltipArrow = tooltip.find("::after");*/
    var windowWidth = $(window).width();
    var leftPosition = $(this).position().left;
    var isLastItem = $(this).nextAll(".tooltip").length === 0;

    if (isLastItem && (leftPosition + tooltipWidth + 100 > windowWidth)) {
        tooltip.css("left", "auto");
        tooltip.css("right", "110%");
        /* tooltipArrow.style.right='0%';*/

        //tooltipArrow.css({
        //    "left": "auto",
        //    "right": "110%"
        //});
    }
});



//// Example usage
//var currentTimeInSeconds = Math.floor(Date.now() / 1000); // Get current time in seconds
//var convertedTime = convertTimeToHMS(currentTimeInSeconds);

//console.log(convertedTime.hours + "h " + convertedTime.minutes + "m " + convertedTime.seconds + "s");

$(document).on('click', '#create-bookmark-container', function () {
    document.getElementById('create-bookmark-container').style.display = 'none';
    document.querySelector('.video-write-notes').style.display = 'block';
    $(".video-write-notes").find('#notes_textarea').val(' ');
    pauseVideo();
    document.getElementById('bookmark-current-time-after').innerHTML = hours + ':' + minutes + ':' + seconds;
})

$(document).on('click', '#notebook-save-cancel #bookmark-cancel', function () {
    debugger;
    document.getElementById('create-bookmark-container').style.display = 'flex';
    $(this).closest('.video-write-notes').css('display', 'none');
   // document.querySelector('.video-write-notes').style.display = 'none';
    notebooktimemain();
    
})