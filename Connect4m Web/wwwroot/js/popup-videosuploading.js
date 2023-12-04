////function toggleGroup(groupNumber) {
   
////    var group = document.getElementById("group" + groupNumber);

////    if (group.style.display === "none") {
////        group.style.display = "block";
    
////    } else {
////        group.style.display = "none";
       
////    }
  
////}


////const openPopupButton = document.getElementById('openPopup');
////const popupContainer = document.getElementById('popupContainer');

////openPopupButton.addEventListener('click', function () {
////    popupContainer.classList.add('active');
    //$.ajax({
    //    url: "/Videos/popup_videouploading",
    //    type: "GET",
    //    success: function (response) {
    //        debugger;
    //        $("#popupinner").html(response);
    //     //   document.getElementById("popupinner").innerHTML=response;
           
    //    }
    //})

//});


//function changevideo(event) {
//    alert("hii");
//}



//popupContainer.addEventListener('click', function (event) {
//    if (event.target === this) {
//        popupContainer.classList.remove('active');
//    }
//});


//-------------  Video Uploading Shown Above 

//document.getElementById('upload-button').addEventListener('click', function () {
//    document.getElementById('video-upload').click();
//});

//document.getElementById('video-upload').addEventListener('change', function (event) {
//    var videoFile = event.target.files[0];
//    var videoURL = URL.createObjectURL(videoFile);

//    var videoContainer = document.getElementById('video-container');
//    videoContainer.innerHTML = '<video controls><source src="' + videoURL + '" type="video/mp4"></video>';
//    videoContainer.style.display = 'block';
//});


//--

////$("#video-upload").change(function () {
////    alert("change");
//});

////------------  ------------------------------------------------------------------  Time Calculate   
//$(document).on("change", ".duration-picker input[type='number']", function (event) {

//    var groupContents = document.getElementsByClassName("group-content");

//    // Add event listeners to each duration picker
//    for (var i = 0; i < groupContents.length; i++) {
//       // alert(groupContents.length);
//        debugger;
//        var groupContent = groupContents[i];
//        var durationPickers = groupContent.getElementsByClassName("duration-picker");

//        for (var i = 0; i < durationPickers.length; i++) {
//            var durationPicker = durationPickers[i];
//            var hoursInput = durationPicker.querySelector(".duration-picker-input[placeholder='HH']");
//            var minutesInput = durationPicker.querySelector(".duration-picker-input[placeholder='MM']");
//            var secondsInput = durationPicker.querySelector(".duration-picker-input[placeholder='SS']");

//            hoursInput.addEventListener("input", calculateDurationInSeconds);
//            minutesInput.addEventListener("input", calculateDurationInSeconds);
//            secondsInput.addEventListener("input", calculateDurationInSeconds);
//        }
//    }

//    // Define the calculateDurationInSeconds function
//    function calculateDurationInSeconds() {
//        var durationPicker = this.parentElement;
//        var hoursInput = durationPicker.querySelector(".duration-picker-input[placeholder='HH']");
//        var minutesInput = durationPicker.querySelector(".duration-picker-input[placeholder='MM']");
//        var secondsInput = durationPicker.querySelector(".duration-picker-input[placeholder='SS']");

//        var hours = parseInt(hoursInput.value) || 0;
//        var minutes = parseInt(minutesInput.value) || 0;
//        var seconds = parseInt(secondsInput.value) || 0;

//        var totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

//        if (totalSeconds > 600) {
//            displayErrorMessage(durationPicker);
//        } else {
//            removeErrorMessage(durationPicker);
//        }
//    }
//});
////---------------------------------------------------------------------- Display The Error Message
//function displayErrorMessage(durationPicker) {
//    if (!durationPicker.classList.contains("error")) {
//        var errorMessage = document.createElement("div");
//        errorMessage.className = "error-message";
//        errorMessage.textContent = "Error!";
//        durationPicker.classList.add("error");

//        durationPicker.appendChild(errorMessage);
//    }
//}
//function removeErrorMessage(durationPicker) {
//  if (durationPicker.classList.contains("error")) {
//    var errorMessage = durationPicker.querySelector(".error-message");
//    if (errorMessage) {
//      errorMessage.remove();
//    }
//    durationPicker.classList.remove("error");
//  }
//}
////------------  ------------------------------------------------------------------  Time Calculate   



            //var values = [];

            //options.each(function (index) {

            //    var value = $(this).val();
            //    if (value == "") {

            //    }
            //    else {
            //        values.push(value);
            //    }

            //});