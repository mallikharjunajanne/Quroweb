//const { debug } = require("node:util");


// Dom elements, global constants
const backward = document.querySelector('.backward');
const currentTime = document.querySelector('.current-time');
const durationVideo = document.querySelector('.duration-video');
const expand = document.querySelector('.expand');
const forward = document.querySelector('.forward');
const informationContainer = document.querySelector('.information-container');
const pause = document.querySelector('.pause');
const play = document.querySelector('.play');
const progress = document.querySelector('.video-progress');
const progressBarr = document.querySelector('.video-progress-filled');
const reduce = document.querySelector('.reduce');
const silence = document.querySelector('.silence');
const videoo = document.querySelector('.video');
const volume = document.querySelector('.volume');
const volumeProgress = document.querySelector('.volume-progress');
const volumeProgressBar = document.querySelector('.volume-progress-filled');
const playerHover = document.querySelector('.player-overlay');
const playercontrols = document.querySelector('.player-controls');
const playercontainer = document.querySelector('.player-container');
const videoheader = document.querySelector('.video-header');
const formpopup = document.querySelector('.form-popup');
const belowvideocontent = document.getElementById('below-video-content');
const thumbnailappend = document.getElementById("thumbnailappend");
const pdfshow = document.getElementById("pdfshow");
const navbelowcontent = document.getElementById("Navandbelowcontent");
var mouseoveronprogressbar = 0;

//videoo.onwaiting = function () {
//    alert("Video is buffering...");
//};



/**
// global functions//
*/
function pauseVideo() {
  videoo.pause();
  pause.hidden = true;
  play.hidden = false;
}

function playVideo() {

    videoo.play();
    setCookie("TotalPoins", videoo.duration, 1);

  play.hidden = true;
  pause.hidden = false;
}

function backwardVideo() {
  videoo.currentTime -= 5;
}

function forwardVideo() {
  videoo.currentTime += 5;
}

function showSilenceIcon() {
  volume.hidden = true;
  silence.hidden = false;
}

function showVolumeIcon() {
  volume.hidden = false;
  silence.hidden = true;
}

function videoTime() {
  let currentMinutes = Math.floor(videoo.currentTime / 60);
  let currentSeconds = Math.floor(videoo.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(videoo.duration / 60);
  let durationSeconds = Math.floor(videoo.duration - durationMinutes * 60);

  currentTime.innerHTML = `${currentMinutes}:${
    currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;

  durationVideo.innerHTML = `${durationMinutes}:${
    durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds
  }`;
}

function expandVideo() {
  if (document.body.webkitRequestFullscreen) {
    // chrome and safari       height: 95%;  .player-overlay
    document.body.webkitRequestFullscreen();
    expand.hidden = true;
      reduce.hidden = false;
      navbelowcontent.hidden = true;
      videoo.style.height = '118%';
      videoo.style.marginTop = '0%';
      videoo.style.marginLeft  = '0px';
      playerHover.style.height = '95%';
      videoheader.style.display = "none";
      panel.style.display = 'none';
      formpopup.style.height = '120%';
      formpopup.style.marginTop = '-2px';
      belowvideocontent.style.marginTop = '64px';
      pdfshow.style.height = '94vh';
  } else {
    // firefox
      document.body.requestFullscreen();
      videoo.style.height = '118%';
      videoo.style.marginTop = '0%';
      videoo.style.marginLeft = '0px';

      playerHover.style.height = '95%';
      videoheader.style.display = "none";
      panel.style.display = 'none';
      formpopup.style.height = '120%';
      formpopup.style.marginTop = '-2px';
      pdfshow.style.height = '94vh';
      belowvideocontent.style.marginTop = '64px';

    expand.hidden = true;
      reduce.hidden = false;
      navbelowcontent.hidden = true;
  }
}

function reduceVideo() {
  if (document.body.webkitRequestFullscreen) {
    // chrome and safari
      document.webkitExitFullscreen();
      videoo.style.height = '88%';
      videoo.style.marginTop = '5%';
    /*  videoo.style.marginLeft = '-88px';*/
      pdfshow.style.height = '76vh';

      playerHover.style.height = '86%';
      videoheader.style.display = "flex";
      panel.style.display = 'flex';

      formpopup.style.height = '86%';
      formpopup.style.marginTop = '4%';
      belowvideocontent.style.marginTop = '0px';
      //height: 123%;  height: 80%;
    //  margin - top: 60px;
    //  margin - top: -2px;
    expand.hidden = false;
      reduce.hidden = true;
      navbelowcontent.hidden = false;

  } else {
    // firefox
      document.mozCancelFullScreen();
      videoo.style.height = '88%';
      videoo.style.marginTop = '5%';
    /*  videoo.style.marginLeft = '-88px';*/

      playerHover.style.height = '86%';
      videoheader.style.display = "flex";
      panel.style.display = 'flex';
      pdfshow.style.height = '76vh';
      formpopup.style.height = '86%';
      formpopup.style.marginTop = '4%';
      belowvideocontent.style.marginTop = '0px';

    expand.hidden = false;
      reduce.hidden = true;
      navbelowcontent.hidden = false;
  }
}

/**
//
*/

/**
// show or hide controls
 */



//progress.addEventListener('mousemove', (event) => {
//    //debugger;
//    const hoveredElement = event.target;
//    if (hoveredElement.className === "video-progress-filled") {
//        alert('yes');
//    } else {
//        alert('no');
//    }
//});





let timeout = 0;


//---------------------------------------------------------------------- handling the Mouse move 


playerHover.addEventListener('mousemove', () => {
    //debugger;
    try {

    if (mouseoveronprogressbar ==0) {
       
        //debugger;
   clearInterval(timeout);
  


    thumbnailappend.innerHTML = '';
    playercontrols.style.opacity = 1;
    playercontainer.style.opacity = 1;
        panel.style.height = '61vh';
        var isHovered = isMouseOverElement(progress, event);
       // console.log(isHovered);
        if (!isHovered) {


            timeout = setTimeout(function () {

                thumbnailappend.innerHTML = '';
                playercontrols.style.opacity = 0;
                playercontainer.style.opacity = 0;
                panel.style.height = '71vh';
                speedDropdown.style.display = "none";

            }, 4000);
        }
        
       
        }
    } catch {

    }
});


function isMouseOverElement(element, event) {
   
    var rect = element.getBoundingClientRect();
    return (
        event.clientX >= rect.left-5 &&
        event.clientX <= rect.right+5 &&
        event.clientY >= rect.top-5 &&
        event.clientY <= rect.bottom+5
    );
}



/**
//
 */

/**
// video functionality
*/
try {


videoo.addEventListener('loadedmetadata', () => {
  videoo.volume = 0.5;
  volumeProgressBar.style.width = '50%';
});
} catch {

}

try {

videoo.addEventListener('timeupdate', () => {
  // video current time & video duration time
  videoTime();

  // progress bar
  const percentage = (videoo.currentTime / videoo.duration) * 100;
  progressBarr.style.width = `${percentage}%`;

  if (videoo.currentTime === videoo.duration) {
    pause.hidden = true;
    play.hidden = false;
  }
});

} catch {

}
try {

videoo.addEventListener('volumechange', () => {
  if (videoo.volume > 0) {
    showVolumeIcon();
  } else {
    showSilenceIcon();
  }
});
} catch {

}
/**
//
*/

// progress bar functionality
progress.addEventListener('click', (event) => {
  const progressTime = (event.offsetX / progress.offsetWidth) * videoo.duration;
  videoo.currentTime = progressTime;
});

// play functionality
play.addEventListener('click', playVideo);

// pause functionality
pause.addEventListener('click', pauseVideo);

// backward functionality
backward.addEventListener('click', () => {
  backwardVideo();
});

// forward functionality
forward.addEventListener('click', () => {
  forwardVideo();
});

// play-pause on the video


informationContainer.addEventListener('click', (event) => {
    const isVideoHeaderClicked = event.target.closest('.video-header');
    if (!isVideoHeaderClicked) {
        if (videoo.paused) {
            playVideo();
        } else {
            pauseVideo();
        }

    }
    
  
});

/**
// volume functionality
*/
videoo.volume = 0.5;
volumeProgressBar.style.width = '50%';
volumeProgress.addEventListener('click', (event) => {
  const progressVolume = (event.offsetX / volumeProgress.offsetWidth) * 1;
  const percentage = progressVolume * 100;
  volumeProgressBar.style.width = `${percentage}%`;
  videoo.volume = progressVolume;
});

volume.addEventListener('click', () => {
  showVolumeIcon;
  videoo.volume = 0;
  volumeProgressBar.style.width = '0';
});

silence.addEventListener('click', () => {
  showSilenceIcon;
  videoo.volume = 0.5;
  volumeProgressBar.style.width = '50%';
});
/**
//
*/

/**
// expand / reduce fullscreen
*/

// expand functionality
expand.addEventListener('click', expandVideo);

// reduce functionality
reduce.addEventListener('click', reduceVideo);

// chrome & safari
document.addEventListener('webkitfullscreenchange', () => {
  if (!document.webkitIsFullScreen) {
    expand.hidden = false;
    reduce.hidden = true;
  }
});

// firefox
document.addEventListener('fullscreenchange', () => {
  if (!document.mozFullScreen) {
    expand.hidden = false;
    reduce.hidden = true;
  }
});

/**
//
*/
let mouseOverVideo = false;
playerHover.addEventListener('mouseenter', function () {
    mouseOverVideo = true;
});

// Event listener for mouse leaving the video
playerHover.addEventListener('mouseleave', function () {
    mouseOverVideo = false;
});



// keyboard functionality
document.addEventListener('keydown', (event) => {
  // space bar - play/plause
    if (event.code === 'Space') {
        if (mouseOverVideo) {
            if (videoo.paused) {
                playVideo();
            } else {
                pauseVideo();
            }
        }
  }

  // letter F - fullscreen
    if (event.code === 'KeyF') {
        if (mouseOverVideo) {
            expandVideo();
        }
  }
   
});





//---------------------------------------- Take   Snapchat  when Mouse Over On progress Bar 

//function generateSnapshot(event) {
//   // var video = document.getElementById("myVideo");
//    var canvas = document.getElementById("snapshot-canvas");
//    var ctx = canvas.getContext("2d");

//    var rect = event.target.getBoundingClientRect();
//    var x = event.clientX - rect.left;

//    var time = (x / rect.width) * videoo.duration;
//    videoo.currentTime = time;

//    videoo.addEventListener("seeked", function () {
//        canvas.width = videoo.videoWidth;
//        canvas.height = videoo.videoHeight;

//        ctx.drawImage(videoo, 0, 0, canvas.width, canvas.height);
//        canvas.style.display = "block";
//    }, { once: true });
//}

//function hideSnapshot() {
//    var canvas = document.getElementById("snapshot-canvas");
//    canvas.style.display = "none";
//});
//const numb = document.querySelector(".numb");
//const outer = document.querySelector(".outer");
//let counter = 0;
//const interval = setInterval(() => {
//    if (counter === 60) {
//        clearInterval(interval);
//       // outer.style.transform = "rotate(0deg)";
//    } else {
//        counter += 1;
//        numb.textContent = counter + "%";
//       // outer.style.transform = `rotate(${(counter / 60) * 360}deg)`;
//    }
//}, 80);


//---------------*****************************       -----                    Take   Snapchat  when Mouse Over On progress Bar ******************************************   Video Thumbnails Generation
const videoPlayer = document.createElement("video");
videoPlayer.id = 'thubnailimages';

progress.addEventListener('mouseleave', function (event) {
    mouseoveronprogressbar = 0;
});
var thumbnailvideoid_T = 0;
var sourceElement_T="";
var videoURL_T = "";
var fileName_T = "";
var file_T = "";


progress.addEventListener('mousemove', function (event) {
  //  debugger;
   // console.log(thumbnailvideoid_T);
    try {

    mouseoveronprogressbar = 1;
    var newthumbnailid = $('#VLD_SubjectVideoId').val();

    var rect = progress.getBoundingClientRect();

    var offsetX = event.clientX - rect.left;
    var percentage = offsetX / rect.width;

    var seekTime = percentage * video.duration;


    if (thumbnailvideoid_T != newthumbnailid) {
        thumbnailvideoid_T = newthumbnailid;

        // const videoElement = document.getElementById("myVideo");
        const sourceElement = videoo.querySelector("source");
        sourceElement_T = sourceElement;
        videoURL_T = sourceElement_T.src;
        fileName_T = videoURL_T.substring(videoURL_T.lastIndexOf("/") + 1);

        fetch(videoURL_T)
            .then(response => response.blob())
            .then(blob => {
                file_T = new File([blob], fileName_T, { type: blob.type });

                videoPlayer.src = URL.createObjectURL(file_T);


                //  videoPlayer.load();

                videoPlayer.currentTime = seekTime;//-------------


                //container.style.display = 'block';
                if (percentage > 0.85) {
                    percentage = 0.85;
                }
                videoPlayer.style.left = (percentage * 100) + '%';

                thumbnailappend.innerHTML = '';
                thumbnailappend.append(videoPlayer);

            })
            .catch(error => {
                console.error("Error retrieving video file:", error);
            });
    }
    else {
        videoPlayer.currentTime = seekTime;
        if (percentage > 0.85) {
            percentage = 0.85;
        }
        videoPlayer.style.left = (percentage * 100) + '%';

        thumbnailappend.innerHTML = '';
        thumbnailappend.append(videoPlayer);
        }
    } catch {

    }


});







//------------------------------------------------------------------    Pay Back Speed  of the video ------------------

const speedButton = document.getElementById("speedButton");
const speedDropdown = document.getElementById("speedDropdown");


// Show the dropdown when hovering over the button
speedButton.addEventListener("mouseenter", function () {
    speedDropdown.style.display = "block";
});

 //Hide the dropdown when moving the cursor away
speedDropdown.addEventListener("mouseleave", function () {
    speedDropdown.style.display = "none";
});

// Set the playback speed when an option is clicked
speedDropdown.addEventListener("click", function (event) {
    const selectedSpeed = event.target.getAttribute("data-speed");
    if (selectedSpeed) {
        setPlaybackSpeed(parseFloat(selectedSpeed));
        speedDropdown.style.display = "none";
    }
});

// Function to set the playback speed
function setPlaybackSpeed(speed) {
    videoo.playbackRate = speed;
    speedButton.innerHTML = speed + 'X';
    speedDropdown.style.display = "none";
}
