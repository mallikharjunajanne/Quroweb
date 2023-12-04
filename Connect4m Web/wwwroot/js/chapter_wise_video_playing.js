////$(document).ready(function () {

//------------------------>  Very Danger     <--------------------const { ajax } = require("jquery");

////    var selectTop;
////    var mustChangeScrollTop = false;

////    $('.multi-select').on('scroll', function (e) {
////        if (mustChangeScrollTop) {
////            $(this).scrollTop(selectTop);
////            mustChangeScrollTop = false;
////        }
////        return true;
////    });

////    $('.multi-select option').on('mousedown', function (e) {
////        e.preventDefault();

////        selectTop = $(this).parent().scrollTop();
////        $(this).prop('selected', $(this).prop('selected') ? false : true);
////        mustChangeScrollTop = true;

////        return false;
////    });

////});

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
/*var listItems = document.getElementsByTagName('li');*/



var listItems = $("#chapters-panel li");
var seekTimes = []; // Array of seek times in seconds
var currentIndex = 0;
var i = 0;
var length = listItems.length;

function extractShowtimeFromOnClick(attrValue) {
    // Parse the onclick attribute value to extract the showtime
    var startIndex = attrValue.indexOf("(");
    var endIndex = attrValue.indexOf(")");
    var showtime = parseInt(attrValue.substring(startIndex + 1, endIndex));
   
    return showtime;
}

// Iterate over all li elements and extract the showtime from onclick attribute

for (var ijk = 0; ijk < listItems.length; ijk++) {
   // debugger;
    var li = listItems[ijk];
    var onclickValue = li.getAttribute("onclick");
    var showtimeValue = extractShowtimeFromOnClick(onclickValue);
    seekTimes.push(showtimeValue);
    if (ijk == listItems.length - 1) {
        captureFrame();
    }
}








function captureFrame() {
  //  debugger;
    var seekTime = seekTimes[currentIndex];
    var tolerance = 0.5; // Tolerance in seconds to capture frame near the desired time

   // video.currentTime = seekTime - tolerance;

   // var timeupdateHandler = function () {
        const videoPlayer1 = document.createElement("video");
    videoPlayer1.controls = false;
    videoPlayer1.disablePictureInPicture = true;

        const sourceElement = video.querySelector("source");
        const videoURL = sourceElement.src;
        const fileName = videoURL.substring(videoURL.lastIndexOf("/") + 1);

        fetch(videoURL)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], fileName, { type: blob.type });



                videoPlayer1.src = URL.createObjectURL(file);


                //  videoPlayer.load();

                videoPlayer1.currentTime = seekTime;


                //container.style.display = 'block';
                
               
             
             //   thumbnailappend.innerHTML = '';
              //  thumbnailappend.append(videoPlayer);

            })
            .catch(error => {
                console.error("Error retrieving video file:", error);
            });







        //-------------------------------------new above
      //  var currentTime = video.currentTime;
       // var difference = Math.abs(currentTime - seekTime);

        //if (difference <= tolerance) {
           
        //    canvas.width = video.videoWidth;
        //    canvas.height = video.videoHeight;
        //    context.drawImage(video, 0, 0, canvas.width, canvas.height);
        //    var imageURI = canvas.toDataURL(); // Get the captured image as a data URI
        //    if (i <= length) {
        //        var imageElement = listItems[i].querySelector('img');
        //        // Display the captured image
        //        // var imageElement = document.createElement('img');
        //        //  alert(imageURI);
        //        imageElement.src = imageURI;
        //        // document.body.appendChild(imageElement);

        //    }
    var imageElement = listItems[i].querySelector('#thumbnailappendchapters');
    imageElement.append(videoPlayer1);
            i++;
            currentIndex++;

            if (currentIndex < seekTimes.length) {
                captureFrame();
            }
        }
   // };

  //  video.addEventListener('timeupdate', timeupdateHandler);
//}


//video.currentTime = 00;
function seekToTime(time) {
   // alert("hii");
    //debugger;
    video.currentTime = time;
  //  video.play();
    playVideo();
}

var panel = document.getElementById("chapters-panel");
var showButton = document.getElementById("show-panel-button");
var HideButton = document.getElementById("Hide-panel-button");


//****************************************************************            scrolling  values  in the panel when mouse over on Chapters
//var scrollpanel = document.getElementById("scroll-panel");


var panel = document.getElementById('chapters-panel');
var items = panel.getElementsByClassName('chapter-list"');

panel.addEventListener('mousemove', function (e) {
   // //debugger;
    var selectedItems = panel.getElementsByTagName('li');

    // Determine if the mouse is moving over a selected item
    var isOverSelectedItem = Array.from(selectedItems).some(function (item) {
        var rect = item.getBoundingClientRect();
        return e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom;
    });

    // If the mouse is over a selected item, scroll the panel
    if (isOverSelectedItem) {
        var containerRect = panel.getBoundingClientRect();

        // Scroll up if the mouse is close to the top edge
        if (e.clientY < containerRect.top + 90) {
            panel.scrollTop -= 15;
        }

        // Scroll down if the mouse is close to the bottom edge
        if (e.clientY > containerRect.bottom-90) {
            panel.scrollTop += 15;
        }
    }
});





//panel.addEventListener('mousemove', function (event) {
  
//    console.log(mh);
//    console.log( qh);
//  //  console.log("pageX: " + ($(window).width() - event.pageX) + ", pageY: " + ($(window).height() - event.pageY));
//});




showButton.style.display = "none";
function showPanel() {
    panel.style.display = "block";
    showButton.style.display = "none";
    HideButton.style.display = "block";
}
function HidePanel() {
    panel.style.display = "none";
    showButton.style.display = "block";
    HideButton.style.display = "none";
}
//document.getElementById("10").className = "hoverclass";
//document.getElementById("10").style.backgroundColor = "green";
var seektimearrys = [];
/* var listItems = document.getElementsByTagName('li');*/
for (var ik = 0; ik < length; ik++) {
    var onclickAttribute = listItems[ik].getAttribute('onclick');
   
    var time = onclickAttribute.match(/\d+/)[0];

    seektimearrys.push(time);
}
seektimearrys.sort(function (a, b) {
    return a - b;
});
                      //******************* show the chapter dependes upon video time


var QuestionshowtimeArray = [];

var forms = document.getElementsByClassName("form-container");
for (var i = 0; i < forms.length; i++) {
   
    var formId = forms[i].id;
    var QuestionshowtimeValue = parseInt(formId);
    QuestionshowtimeArray.push(QuestionshowtimeValue);
}

//console.log(QuestionshowtimeArray);



function chapterstimer() {
   var timehover = setInterval(hovercolor, 1000);

    function hovercolor() {

        /* alert("hii");*/
      // debugger;
        var videotime = video.currentTime;
       // console.log(videotime);
        setCookie("viewpoints", videotime, 1);

        for (var questime = 0; questime < QuestionshowtimeArray.length; questime++) {
            var questionpresentation = QuestionshowtimeArray[questime];
            if (videotime >= questionpresentation && videotime < questionpresentation+1) {
                pauseVideo();
           
                clearInterval(timehover);
                var myyForm2 = $("#myyForm");
                $(myyForm2).find('.' + questionpresentation).css("display", "block");
            // alert($(myyForm2).find('.' + questionpresentation).length);
                $(myyForm2).css("display", "block");
                _Texttimer(questionpresentation);
            }
        }
        if (videotime + 1 >= video.duration) {
            clearInterval(timehover);
    
            Calculatemarks();
        }
       
        for (var ij = 0; ij < seektimearrys.length; ij++) {
            // //debugger;
            if (ij == length - 1) {
                $("#chapters-panel li").removeClass("hoverclass");
                $("#chapters-panel li").css("background-color", "#f9f9f9");

                $("#" + seektimearrys[ij]).addClass("hoverclass");
                $("#" + seektimearrys[ij]).css("background-color", "aquamarine");
            }
            if (videotime > seektimearrys[ij] && videotime < seektimearrys[ij + 1]) {

                $("#chapters-panel li").removeClass("hoverclass");
                $("#chapters-panel li").css("background-color", "#f9f9f9");

                $("#" + seektimearrys[ij]).addClass("hoverclass");
                $("#" + seektimearrys[ij]).css("background-color", "aquamarine");


                //  document.getElementById("40").className = "hoverclass";
                //  $("#" + seektimearrys[ij]).addClass("hoverclass");

                //    $(seektimearrys[ij]).addClass("hoverclass");
                //  var mousehovercolor = document.getElementById(seektimearrys[i]).classList.add("hoverclass");

                //   alert(videotime);
                break;
            }
           else if (video.currentTime < seektimearrys[0]) {
                $("#chapters-panel li").removeClass("hoverclass");
                $("#chapters-panel li").css("background-color", "#f9f9f9");
            }




        }

    }
}
// ************************************** Prograss bar  With Marks

//const videoContainer = document.getElementById('video-container');
//const progressBar = document.getElementById('progressBar');
//const progressBarFill = document.getElementById('progressBarFill');
//const marksContainer = document.getElementById('marksContainer');

//video.addEventListener('timeupdate', updateProgressBar);
//progressBar.addEventListener('click', seek);
//function seek(event) {
//    const progressBarWidth = progressBar.clientWidth;
//    const clickX = event.clientX - progressBar.getBoundingClientRect().left;
//    const percentage = clickX / progressBarWidth;
//    const time = percentage * video.duration;
//    video.currentTime = time;
//}

//function updateProgressBar() {
//    const progress = (video.currentTime / video.duration) * 100;
//    progressBarFill.style.width = `${progress}%`;
//}

////videoContainer.addEventListener('click', togglePlay);

////function togglePlay() {
////    if (video.paused || video.ended) {
////        video.play();
////    } else {
////        video.pause();
////    }
////}

//const marksData = [
//    { time: 30 },
//    { time: 60 },
//    { time: 90 }
//];

//marksData.forEach(markData => {
//    const mark = document.createElement('div');
//    mark.classList.add('mark');
//    mark.setAttribute('data-time', markData.time);
//    mark.style.left = `${(markData.time / video.duration) * 100}%`;
//    marksContainer.appendChild(mark);

//    mark.addEventListener('click', () => {
//        video.currentTime = markData.time;
//    });
//});

//******************************* Form Popup For Written Test

document.getElementById("myyForm").style.display = "none";
function closeForm() {
    document.getElementById("myyForm").style.display = "none";
}

//********************************* Timer For Writen text When View The  Video

function _Texttimer(questionpresentation) {
  

/*window.onload = function () {*/
    var minute = 0;
    var sec = 10;
    var _interval = setInterval(function () {
       /* //debugger;*/
        document.getElementById("timer").innerHTML = minute + ":" + sec;


        if (sec == 00) {


            if (minute == 0) {
                clearInterval(_interval);
                var myyForm2 = $("#myyForm");
                $(myyForm2).find('#' + questionpresentation).css("display", "none");
                $(myyForm2).css("display", "none");
                playVideo();
                chapterstimer();
            }
            else {
                minute--;
                sec = 60;
            }

        }
        else {
            sec--;
        }
    }, 1000);
    }
/*}*/

//****************************************************************************     link active below the  video section
const navLinks = document.querySelectorAll('.topnav button');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
       
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to the clicked link
        this.classList.add('active');
    });
});



// Function to handle full-screen change event
function handleFullScreenChange() {
    if (document.fullscreenElement || document.webkitFullscreenElement ||
        document.mozFullScreenElement || document.msFullscreenElement) {
       
      
        
        // Add event listener to prevent "ESC" key when video is in full-screen
        document.addEventListener("keydown", preventEscOnFullScreen);
    } else {
        reduceVideo();
        // Video is exited from full-screen mode
      

        // Remove event listener when video exits full-screen
        document.removeEventListener("keydown", preventEscOnFullScreen);
    }
}

// Function to prevent "ESC" key when video is in full-screen
function preventEscOnFullScreen(event) {
    if (event.key === "Escape" || event.keyCode === 27 ||
        event.key === "f" || event.key === "F" || event.keyCode === 70) {
     
        // Prevent the default behavior of the "ESC" and "F" key press
        event.preventDefault();
    }
    
}

// Function to go full screen
function goFullScreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

// Function to exit full screen
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Add event listener for full-screen change event
document.addEventListener("fullscreenchange", handleFullScreenChange);
document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
document.addEventListener("mozfullscreenchange", handleFullScreenChange);
document.addEventListener("MSFullscreenChange", handleFullScreenChange);
//const goBackButton = document.getElementById("goBackButton");

//// Add click event listener to the "Go back" button
//goBackButton.addEventListener("click", function () {
   
//    // Navigate back in the browser's history
//    history.back();
//});
//------------------------------------------------------------------  Radio Buttons Click  in the Questins and Answers
$(document).on('click', '#VLD_Optionslistsub .box', function () {
    var radiobutt = $(this).find('input[type="radio"]').is(':checked');
    $(this).closest('.content').find('.box').removeClass('clickedclass');
    if (radiobutt) {
        $(this).find('input[type="radio"]').prop('checked', false);
        $(this).closest('.box').removeClass('clickedclass');
    }
    else {
        $(this).find('input[type="radio"]').prop('checked', true);
        $(this).closest('.box').addClass('clickedclass');
    }
})


$(document).on('click', '#textsubmit', function (event) {
    var myyForm2 = $("#myyForm");

    $(myyForm2).css("display", "none");
    playVideo();
    event.preventDefault();
})
 
function Calculatemarks() {
    debugger;

    var result = "";
    var attempts = 0;
    var actualanswers = "";
    var ActualMarks = "";
    var lenghthofform = $("form");
    for (var i = 1; i <= lenghthofform.length; i++) {
        var Assign_i = document.getElementById("answerid+"+i).value;
        var rad1 = document.getElementById("rad1+"+i);
        var rad2 = document.getElementById("rad2+"+i);
        var rad3 = document.getElementById("rad3+"+i);
        var rad4 = document.getElementById("rad4+"+i);
        var answe = document.getElementById("answer+" + i).value;
        var marks = document.getElementById("Marks+" + i).value;
       
        actualanswers = actualanswers + "," + Assign_i + "-" + answe;
        ActualMarks = ActualMarks + "," + Assign_i + "-" + marks;

        if (rad1.checked == true) {
            result = result + "," + Assign_i + "-" + "1";
            attempts = attempts + 1;
        }
        else if (rad2.checked == true) {
            result = result + "," + Assign_i + "-" + "2";
            attempts = attempts + 1;
        }
        else if (rad3.checked == true) {
            result = result + "," + Assign_i + "-" + "3";
            attempts = attempts + 1;
        }
        else if (rad4.checked == true) {
            result = result + "," + Assign_i + "-" + "4";
            attempts = attempts + 1;
        }
    }
    var displayname = $('#displaynameTop').text();
    var formlemngth = lenghthofform.length;
    if (formlemngth != 0) {


        var subjectvideoid = document.getElementById('VLD_SubjectVideoId').value;
        //var formdataresult = new FormData();
        //formdataresult.append('SubjectVideoId', subjectvideoid);
        //formdataresult.append('TotalQuestions', formlemngth);
        //formdataresult.append('NumberOfAttempts', attempts);
        //formdataresult.append('YourAnswer', attempts);
        //formdataresult.append('ActualAnswer', actualanswers);
        $.ajax({
            url: '/Videos/ResultsInserting?SubjectVideoId=' + subjectvideoid + '&TotalQuestions=' + formlemngth + '&NumberOfAttempts=' + attempts + '&YourAnswer=' + result + '&ActualAnswer=' + actualanswers + '&DisplayName=' + displayname +'&ActualMarks='+ActualMarks,
            type: 'POST',
            success: function (response) {
               // var marksResponse = response.split(",");
                Swal.fire("ok", 'Total Questions :'+formlemngth+'<br/> No of Attempts :'+attempts+'<br/> Your Gained Marks : '+response, "success");
            }
            

        })
       // chapterstimer();
    }
}





//$(document).on('click', 'input[type="radio"]', function () {
//    var parent = $(this).closest('form');
//    var label = $(parent).find('label');
//    var circle = $(label).find('.circle');

//    // Reset styles for all labels and circles within the parent content
//    parent.find('label').css({
//        'border-color': '#8E49E8',
//        'background': '#d5bbf7'
//    });
//    parent.find('.circle').css({
//        'border-color': '#8E49E8',
//        'background': '#fff'

//    });

//    // Apply styles to the clicked label and circle
//    label.css({
       
//        'background': '#ddd'
//    });
//    circle.css({
//              'background': '#ccc'
//    });
//});

  