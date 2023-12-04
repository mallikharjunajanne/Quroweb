
//--------------------------------------------------------------------------------------     open and close  the video;s button in the pop-up

//const { debug } = require("node:util");

//const { debug } = require("console");

/*const { error } = require("jquery");*/


function toggleGroup(groupNumber) {

    var group = document.getElementById("group" + groupNumber);

    if (group.style.display === "none") {
        group.style.display = "block";

    } else {
        group.style.display = "none";

    }

}
//--------------------------------------------------------------------Swith Buttons 

$(document).on('click', '#fileuploadoff input[type="checkbox"]', function (event) {
    //debugger;
    //alert("Click");
    var removeerrorbutt = $(this).closest('.form-group');
   

    var fileinput = $(this).closest('.form-group').find('#openfilespopup');

   // var displayname = $('#DocsDisplayname');
    if (!this.checked) {
        fileinput.prop('disabled', true);
        document.getElementById('filesdisplaynames').innerHTML = " ";
        var removeerrorbutt = $(this).closest('.form-group');
        removeErrorMessage(removeerrorbutt);

        //document.getElementById('fileinput').innerHTML = " ";
        $('#UploadDocuments').prop('value', '');
       // $('#popupforfilesuploading #popupforfilesuploading').prop('value', '');
        fileinput.css('opacity', 0.3);
       // displayname.prop('disabled', true);
       // displayname.css('opacity', 0.3);
       // displayname.prop('value', ' ');
        var errorMessage = removeerrorbutt.find(".field-validation-error");
        errorMessage.remove();
       
        var fileoutput = $('#popoupoffon input[type="checkbox"]');
        var enable = $(fileoutput).closest('.form-group').find('input[type="button"]');

        fileoutput.prop('checked', true);
        enable.prop('disabled', false);
        enable.css('opacity', 1);

    } else {
        fileinput.prop('disabled', false);
        fileinput.css('opacity', 1);
        //displayname.prop('disabled', false);
       // displayname.css('opacity', 1); 
       // displayname.prop('value', '');
    }
})


$(document).on('click', '#popoupoffon input[type="checkbox"]', function (event) {
    //debugger;
    // alert('hii');
    var removeerrorbutt = $(this).closest('.form-group');
    var fileinput = $(this).closest('.form-group').find('input[type="button"]');
  //  var displayname = $('#DocsDisplayname');
    if (!this.checked) {
        fileinput.prop('disabled', true);
        fileinput.css('opacity', 0.3);
     //   displayname.prop('disabled', false);
      //  displayname.css('opacity', 1);
        removeErrorMessage(removeerrorbutt);

        var fileoutput = $('#fileuploadoff input[type="checkbox"]');
        var enable = $(fileoutput).closest('.form-group').find('#openfilespopup');

        fileoutput.prop('checked', true);
        enable.prop('disabled', false);
        enable.css('opacity', 1);
    } else {
        fileinput.prop('disabled', false);
        fileinput.css('opacity', 1);
       
    }
})










//-------------------------------------------------------------------------------------- pop-up open and close for Video's Uploading

const openPopupButton = document.getElementById('openPopup');
const popupContainer = document.getElementById('popupContainer');

openPopupButton.addEventListener('click', function () {
    popupContainer.classList.add('active');
});
    $(document).on('click', '#close-popup', function (event) {
       // alert("hii");
    if (event.target === this) {
        popupContainer.classList.remove('active');
    }

    });

//-------------------------------------------------------------------------------------- pop-up open and close for Files Uploading

const openPopupButton2 = document.getElementById('openfilespopup');
const popupContainer2 = document.getElementById('popupforfilesuploading');

openPopupButton2.addEventListener('click', function () {
    popupContainer2.classList.add('active');
});
$(document).on('click', '#close-popup', function (event) {
    // alert("hii");
    if (event.target === this) {
        popupContainer2.classList.remove('active');
    }

});

//-------------------------------------------------------------------------------------- Upload Files And  Shows the display name at the below
$(document).on('change', '#UploadDocuments', function (event) {
    uploaddocumentchange("");
});

function uploaddocumentchange(newValue) {
    let docs = document.getElementById('UploadDocuments').files;
    var parent = $('#filesdisplaynames');
    parent.html("");
    for (var e = 0; e < docs.length; e++) {
        var field = docs[e];

        parent.append($('<div style="display:flex"><label>' + field.name + '</label><input type="text" class="form-control" placeholder="Enter Display Name" value="'+newValue+'"name="DocsDisplayname"  /></div><br/>'));

    }
    parent.append($('<input type="button" id="filesubmit" value="Save"/>'))

}


//-------------------------------------------------------------------------------------Upload Files 
$(document).on('click', '#filesubmit', function (event) {
  //  let docs = document.getElementById('UploadDocuments').files;

    var errorslist = fileserror();
    if (errorslist == 0) {
        Swal.fire("Success", "Successfully Uploaded All The Files ", "success");
    }
    else {
          Swal.fire("Error", "Please Once Check All The Fields", "error");
    }

});
function fileserror() {
    var errorsli = 0;
    let docs = document.getElementById('UploadDocuments').files;

    var parent = $('#filesdisplaynames').find('input[type="text"]');


    for (var e = 0; e < parent.length; e++) {
        var field = $(parent[e]).val();
        if (field == "") {
            displayErrorMessage($(parent.closest('div')));
            errorsli++;
        }
        else {
            removeErrorMessage($(parent.closest('div')));
        }



    }
   
    var validtionappendtoupvbutton = $('#validtioncheckforfiles');
    if (errorsli != 0 || docs.length==0) {
        displayErrorMessagedocs(validtionappendtoupvbutton, "Please Once Check In This Popup");
    }
    else {
        removeErrorMessage(validtionappendtoupvbutton);
    }
    if (docs.length == 0) {
        return 1;
    }
    else {
        return errorsli;
    }
  
}





//-------------------------------------------------------------------------------------- Upload Video And It's Shows Above
$(document).on('change', '#video-upload', function (event) {
    //debugger;
    var videoFile = event.target.files[0];
    var videoURL = URL.createObjectURL(videoFile);
    var videoContainer = $(this).closest(".group-content").find("#video-container-src");
    var videoElement = videoContainer.find("video");
    var videoSource = videoContainer.find("source");
    videoSource.attr("src", videoURL);
    videoElement[0].load();
    try {
        videoContainer.find('.filenameupdate').remove();

    }
    catch {}

});


















//function addVideo(videourl) {
//    //debugger;
//   // alert("'byy");
//    var videoelement = document.getElementById('videosrc');
  
//    videoelement.src = videourl;
//    var myVideo = document.getElementById('videosourse');
//    myVideo.load();
  
//}




//---------------------------------------------------------------------------------   Add New Time And Text For UploadIng Chaspters


    $(document).on('click', '#add-new-time', function (event) {
   // var parent = $(event.target).siblings('.row');
    var parent = $(this).closest(".group-content").find("#time-text").find("#textitems");
   
   var maindiv = document.createElement('div');
        maindiv.className = 'chapters';
    var div1 = document.createElement('div');
    div1.className = 'col-2';
    maindiv.appendChild(div1);


     

        var durationPickerDiv = document.createElement("div");
        durationPickerDiv.classList.add("duration-picker", "col-2");

        var input1 = document.createElement("input");
        input1.type = "number";
        input1.classList.add("duration-picker-input");
        input1.min = "0";
        input1.step = "1";
        input1.max = "24";
        input1.placeholder = "HH";

        var separator1 = document.createElement("span");
        separator1.classList.add("duration-picker-separator");
        separator1.textContent = ":";

        var input2 = document.createElement("input");
        input2.type = "number";
        input2.classList.add("duration-picker-input");
        input2.min = "0";
        input2.max = "60";
        input2.step = "1";
        input2.placeholder = "MM";

        var separator2 = document.createElement("span");
        separator2.classList.add("duration-picker-separator");
        separator2.textContent = ":";

        var input3 = document.createElement("input");
        input3.type = "number";
        input3.classList.add("duration-picker-input");
        input3.min = "0";
        input3.max = "60";
        input3.step = "1";
        input3.placeholder = "SS";

        durationPickerDiv.appendChild(input1);
        durationPickerDiv.appendChild(separator1);
        durationPickerDiv.appendChild(input2);
        durationPickerDiv.appendChild(separator2);
        durationPickerDiv.appendChild(input3);

        maindiv.appendChild(durationPickerDiv);



    var div2 = document.createElement('div');
    div2.className = 'col-1';
    maindiv.appendChild(div2);

    var textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.className = 'col-6';
    maindiv.appendChild(textInput);

    var div3 = document.createElement('div');
    div3.className = 'fa fa-trash-o';
    div3.style.color = 'red';
    div3.style.fontSize = '20px';
        maindiv.appendChild(div3);
       
        parent.append(maindiv);

})
//-----------------------------------------------------------------------  Delete Selected Time And Text For UploadIng Chaspters


    $(document).on('click', '#textitems .fa-trash-o', function (event) {
        //debugger;
        //var $siblings = $(this).siblings('div');

        // Remove flex property and the div elements
        //$siblings.css({
        //    'flex': 'unset',
        //    'display': 'inline-block',
        //    'width': 'auto'
        //}).fadeOut(300, function () {
        //    $siblings.remove();
        //});
        
            $(this).siblings('input[type="text"]').remove(); // Remove the text input sibling
            $(this).siblings('input[type="time"]').remove();
            $(this).siblings('.col-2').remove();
            $(this).siblings('.col-1').remove();

            $(this).siblings('div').remove();
            $(this).parent('div').remove();

            $(this).remove(); // Remove the trash icon itself
            $("#delete-video").show().delay(3000).fadeOut()
            document.getElementById("delete-video").innerHTML = "Deleted Successfully.......!";
        
    });

//-------------------------------------------------------      Add New  Question   With Answers




    $(document).on('click', '#add-new-question', function (event) {
        var parent = $(this).closest(".group-content").find("#questions-main").find("#questions");

    //var newQuestionRow = $(".ques").first().clone(); 
    //    newQuestionRow.find("input[type='time']").val("");
    //    newQuestionRow.find("input[type='number']").val("");
    //    newQuestionRow.find(".error-answer").remove();
    //newQuestionRow.find("textarea").val(""); 
    //    newQuestionRow.find("input[type='text']").val("");
    //    parent.append(newQuestionRow);

        parent.append($('<div class="row ques"> <div class= "duration-picker col-1" ><input type="number" class="duration-picker-input" min="0" step="1" placeholder="HH" /><span class="duration-picker-separator">:</span><input type="number" class="duration-picker-input" min="0" step="1" placeholder="MM" /><span class="duration-picker-separator">:</span><input type="number" class="duration-picker-input" min="0" step="1" placeholder="SS" /></div ><div class="textarea"><span>Question</span><textarea class="col-11"></textarea></div><div class="col-6 opt"><span>1)</span><input type="text" class="col-6 1" /></div><div class="col-6 opt"><span>2)</span><input type="text" class="col-6 2" /></div><div class="col-6 opt"><span>3)</span><input type="text" class="col-6 3" /></div> <div class="col-4" style="margin-left:auto"><span>Marks</span> <input id="Marks" type="text" /></div><div class="col-6 opt"><span>4)</span><input type="text" class="col-6 4" /></div><div class="col-4"  style="margin-left:auto"><span>Answer(1/2/3/4)</span> <input id="answer" type="text" /> </div><i class="col-1 fa fa-trash-o" style="font-size:20px;color:red" id="Qusetion-delete"></i><hr /></div >'))



   // $("#questions").append(newQuestionRow);

})

//----------------------   ---------------------------------    Delete Selected    Question   With Answers



    $(document).on('click', '#questions #Qusetion-delete', function (event) {

   // alert("question related");
    var questionRowCount = $('.row.ques').length;

  //  if (questionRowCount != 1) {
        var parent = $(event.target).closest('.row');
        parent.remove();
        $("#delete-video").show().delay(3000).fadeOut()
        document.getElementById("delete-video").innerHTML = "Deleted Successfully.......!";
    //}
    //else {
    //    var parent = $(event.target).closest('.row');
    //        parent.find("input[type='text']").val(""); 
    //        parent.find("input[type='time']").val(""); 
    //        parent.find("textarea").val(""); 
       

    //    $("#delete-video").show().delay(3000).fadeOut()
    //    document.getElementById("delete-video").innerHTML = "Successfully Clear The Values .......!";
    //}
  
})

              //----------------------   ---------------------------------      Add One More for Uploading Video 


document.getElementById("add-one-more-video").addEventListener("click", function () {
    //debugger;
    var groupcount = $('.group-content').length;
  //  alert(groupcount);
    var group = document.querySelector(".group");

        var groupHeader = document.createElement("button");
    groupHeader.classList.add("group-header");
  
    groupHeader.textContent = "Video " + (++groupcount);
    groupHeader.setAttribute("onclick", 'toggleGroup(' + groupcount+')');
        group.append(groupHeader);

    var groupcontent = document.createElement("div");
    groupcontent.classList.add("group-content");
  //  groupcontent.setAttribute('id', uniqueId);
    groupcontent.setAttribute("id", 'group' + groupcount);

    $.ajax({
        url: "/Videos/popup_videouploading",
        type: "GET",
        success: function (response) {
            //debugger;
            groupcontent.innerHTML = response;
         
    
        }
    })

    group.append(groupcontent);

});

    //  //  var group1 = document.querySelector(".group-content");
    //    var clonedContent = $(".group-content").first().clone();
    //    clonedContent.find("input[type='time']").val("");

    //    clonedContent.find("input[type='text']").val("");
    //    clonedContent.find("input[type='file']").val("");
    //    clonedContent.find("#videosrc").attr("src", "");

       
    //    clonedContent.find("textarea").val("");
   
    //clonedContent.attr("id",'group'+ groupcount);
     
    //    $(".group").append(clonedContent);



//-----------------------------------------------------------------------------  Validations    For All In the Pop UP 

//$(document).on("change", "input[type='time']", function (event) {
//    //debugger;
//    var videoElement = $(event.target).closest(".group-content").find("#video-container-src").find("#videosourse")[0];

//    alert(videoElement.duration);


//    const timeValue = $(this).val();
    

//})

//-----------------------------------------------------------------------------       Time Validations


$(document).on("change", ".duration-picker input[type='number']", function (event) {

    timeerrormessage(event);
});


//-----------------------------------------------------------------------------   the Time Validations  For When Video UploadIng


$(document).on("change", ".group-content #video-upload", function (event) {

    timeerrormessage(event);
});

//-----------------------------------------------------------------------------   Validations  For  Options in the question



$(document).on("change", ".row.ques .opt", function (event) {
    optionerrormessage(event);
});

//-----------------------------------------------------------------------------   Validations  For  Textarea (Question)



$(document).on("change", ".row.ques textarea", function (event) {
  
  
 
    var question = $(this).val();

    var quest_error = $(event.target).closest(".textarea");
    if (question == "") {
        displayErrorMessage(quest_error);
    }
    else {
        removeErrorMessage(quest_error);
    }
  
});



//-----------------------------------------------------------------------------   Validations  For   Chapters Dynamically



$(document).on("change", ".chapters input[type='text']", function (event) {
   
    var chaptername = $(this).val();
    //debugger;

    var chaptererror = $(event.target).closest(".chapters").find(".fa-trash-o");
    if (chaptername == "") {
        displayErrorMessage(chaptererror);
    }
    else {
        removeErrorMessage(chaptererror);
    }
});




//----------------------- - - - ---------------------------------------------------   Validations  For  Options in the question  ---- Function 

function optionerrormessage(event) {
    var optionvalue = $(event.target).closest("input[type='text']").val();
    var error = $(event.target).closest('.opt');
    if (optionvalue == "") {
   
        displayErrorMessage(error);
    }
    else {
    
        removeErrorMessage(error);
    }

}


//----------------------- - - - ---------------------------------------------------   the Time Validations  for time method


function timeerrormessage(event) {
    //debugger;
    var videoElement = $(event.target).closest(".group-content").find("#video-container-src").find("#videosourse")[0];
    var videotime = videoElement.duration;
    //  alert(videoElement.duration);

    var durationPicker = $(event.target).closest(".duration-picker");
    var hoursInput = durationPicker.find(".duration-picker-input[placeholder='HH']");
    var minutesInput = durationPicker.find(".duration-picker-input[placeholder='MM']");
    var secondsInput = durationPicker.find(".duration-picker-input[placeholder='SS']");

    var hours = parseInt(hoursInput.val()) || 0;
    var minutes = parseInt(minutesInput.val()) || 0;
    var seconds = parseInt(secondsInput.val()) || 0;

    if (hours > 23) {
        hoursInput.val(23);
    }
    if (minutes > 59) {
        minutesInput.val(59);
    }
    if (seconds > 59) {
        secondsInput.val(59);
    }

    var totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (totalSeconds > videotime) {
        displayErrorMessage(durationPicker);
    } else {
        removeErrorMessage(durationPicker);
    }
}

////------------------  -- -  -  -  - ---------------------------------------------- Display The Error Message

function displayErrorMessage(durationPicker) {
    var errorMessage = durationPicker.find(".error-message");

    if (errorMessage.length === 0) {
      //  durationPicker.css("border-color", "red");
        errorMessage = $("<div class='error-message'>*Error!</div>");
        durationPicker.append(errorMessage);
    }
}

function removeErrorMessage(durationPicker) {
    var errorMessage = durationPicker.find(".error-message");
    if (errorMessage.length > 0) {
        durationPicker.css("border-color", "black");
        errorMessage.remove();
    }
}

////------------------  -- -  -  -  - ---------------------------------------------- Display The Error Message  for Docsmernts

function displayErrorMessagedocs(durationPicker,message) {
    var errorMessage = durationPicker.find(".error-message");

    if (errorMessage.length === 0) {
        //  durationPicker.css("border-color", "red");
        errorMessage = $("<div class='error-message'>"+message+"</div>");
        durationPicker.append(errorMessage);
    }
}

//function removeErrorMessagedocs(durationPicker) {
//    var errorMessage = durationPicker.find(".error-message");
//    if (errorMessage.length > 0) {
//        durationPicker.css("border-color", "black");
//        errorMessage.remove();
//    }
//}


//---------------------------------------------------------------   answer will type only 1/2/3/4

$(document).on("change", "#answer", function (event) {
   
    var answer = $(this).val();
    var errorMessage = $(event.target).closest(".ques").find("i");
    if (parseInt(answer) > 4 || parseInt(answer) == 0 || isNaN(parseInt(answer))) {
      

        displayErrorMessage(errorMessage);
    }
    else {
      
        removeErrorMessage(errorMessage);
    }
})




//---------------------------------------------------------------   Marks  Enter only numbers

$(document).on("change", "#Marks", function (event) {
  //  debugger;
    event.stopImmediatePropagation();
    //alert("hii");
    var answer = $(this).val();
    var errorMessage = $(event.target).closest(".col-4");
    if (parseInt(answer) == 0 || isNaN(parseInt(answer))) {


        displayErrorMessage(errorMessage);
    }
    else {

        removeErrorMessage(errorMessage);
    }
})




//var totalFormData = new FormData();

function insertingallvideos() {
    return new Promise(function (resolve, reject) {
        var retunvalofvi = 0;
        var promises = [];
    //debugger;
    var groupcontent = document.getElementsByClassName("group-content");
    let docs = document.getElementById('UploadDocuments').files;
   
    var videoschecked = $('#popoupoffon input[type="checkbox"]');
    var docschecked = $('#fileuploadoff input[type="checkbox"]');

    if (videoschecked.is(":checked")) {

       // alert("videos Checked");

        for (var a = 0; a < groupcontent.length; a++) {

            var formData = new FormData();
            //-----------------------------------------------------------------------    Find out The Video Sourse
            var groups = groupcontent[a];
            //  var groupcontent = groups[a].getElementsByClassName("group-content")[0];

            var videoElement = $(groups).find("#video-upload")[0];

            var videoFile = videoElement.files[0];
    
            //*************************************  Apped The Video To Form Data
            formData.append("VideoPath", videoFile);//----------

            //-----------------------------------------------------------------------    Video Time Calculate

            var videoElement = $(groups).find("#video-container-src").find("#videosourse")[0];
           
            var videotime = videoElement.duration;
            var fileerror = $(groups).find('.filename');
            var filenameupdate = $(groups).find(".filenameupdate").text();
            //alert($(filenameupdate).find(".filenameupdate").text());
            formData.append("filenameupdate", filenameupdate);//--------->
            if (isNaN(videotime)) {
                if (filenameupdate == null && filenameupdate == '') {
                    displayErrorMessage(fileerror);
                }
            }
            else {
                removeErrorMessage(fileerror);
            }
            formData.append("Duration", videotime);//--------->


            // ---------------------------------------------------------------------------- Display Name

            var displynames = $(groups).find('.displayname');
            var displayname = displynames.find('input[type="text"]').val();

            if (displayname == "") {
                displayErrorMessage(displynames);

            }
            else {
                removeErrorMessage(displynames);

            }

            formData.append("displayname", displayname);//--------->




            //-----------------------------------------------------------------------    Find out the  time and Chapters Names

            var textitems = $(groups).find(".chapters");
            // alert(textitems);

            for (var b = 0; b < textitems.length; b++) {

                var chapter = $(textitems[b]);
                var durationpicker = chapter.find('.duration-picker');
                var hours = chapter.find(".duration-picker-input[placeholder='HH']").val();
                var minutes = chapter.find(".duration-picker-input[placeholder='MM']").val();
                var seconds = chapter.find(".duration-picker-input[placeholder='SS']").val();
                var chaptername = chapter.find("input[type='text']").val();
                var chapterid = chapter.find(".chapterid-input").val();
            
                if (hours == "") {
                    hours = 0;
                }
                if (minutes == "") {
                    minutes = 0;
                }
                if (seconds == "") {
                    seconds = 0;
                }
                var totalSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);

                if (totalSeconds > videotime || isNaN(totalSeconds) || totalSeconds == 0) {
                    displayErrorMessage(durationpicker);
                } else {
                    removeErrorMessage(durationpicker);
                }
                var chaptererror = chapter.find(".fa-trash-o");
                if (chaptername == "") {
                    displayErrorMessage(chaptererror);
                }
                else {
                    removeErrorMessage(chaptererror);
                }

                formData.append('chaptername', chaptername);//----------------->
                formData.append('Chhours', hours);//--------------------->
                formData.append('Chminutes', minutes);//------------->
                formData.append('Chseconds', seconds);//----------->
                formData.append('ChapterIdlist', chapterid);//----------->

            }

            //-----------------------------------------------------------------------    Find out the   Questions and Answers with time

            var questionRowCount = $(groups).find(".row.ques");



            for (var c = 0; c < questionRowCount.length; c++) {

                var questionrow = $(questionRowCount[c]);

                var erroforquestion = questionrow.find('.duration-picker');

                var hoursq = questionrow.find(".duration-picker-input[placeholder='HH']").val();
                var minutesq = questionrow.find(".duration-picker-input[placeholder='MM']").val();
                var secondsq = questionrow.find(".duration-picker-input[placeholder='SS']").val();
                var question = questionrow.find("textarea").val();
                var questionid = questionrow.find('.question-input').val();
                var AnswerId = questionrow.find('.answer-input').val();
             
                var quest_error = questionrow.find(".textarea");

                if (question == "") {
                    displayErrorMessage(quest_error);
                }
                else {
                    removeErrorMessage(quest_error);
                }
          


                var options = questionrow.find('.col-6.opt input');
                var values = [];
                for (var d = 0; d < options.length; d++) {
                    var value = $(options[d]).val();
                    var error = $(options[d]).closest('.opt');
                    if (value == "") {
                        displayErrorMessage(error);
                    }
                    else {
                        removeErrorMessage(error);
                        values.push(value);
                    }
                    formData.append('Options', value);//------------>

                }
                if (hoursq == "") {
                    hoursq = 0;
                }
                if (minutesq == "") {
                    minutesq = 0;
                }
                if (secondsq == "") {
                    secondsq = 0;
                }

                var Questiontime = (parseInt(hoursq) * 3600) + (parseInt(minutesq) * 60) + parseInt(secondsq);

                if (Questiontime > videotime || isNaN(Questiontime) || Questiontime == 0) {
                    displayErrorMessage(erroforquestion);
                } else {
                    removeErrorMessage(erroforquestion);
                }

                formData.append('Questiontime', Questiontime);//------------------->
                var answer = questionrow.find("#answer").val();
                var errorMessage = questionrow.find("i");

                if (parseInt(answer) > 4 || parseInt(answer) == 0 || isNaN(parseInt(answer))) {


                    displayErrorMessage(errorMessage);
                }
                else {

                    removeErrorMessage(errorMessage);
                }
                formData.append('answers', answer);//--------------->

                //------------------------  Marks Checking

                var Marks = questionrow.find("#Marks").val();
                var errorMarks = questionrow.find("#Marks");

                var errorMessageM = $(errorMarks).closest(".col-4");
                if (parseInt(Marks) == 0 || isNaN(parseInt(Marks))) {


                    displayErrorMessage(errorMessageM);
                    totalerrorsinvideos++;
                }
                else {

                    removeErrorMessage(errorMessageM);
                }
                formData.append('Marks', Marks);//--------------->
                formData.append('Quhours', hoursq);//--------------------------->
                formData.append('Quminutes', minutesq);//-------------------->
                formData.append('Quseconds', secondsq);//------------------->
                formData.append('Question', question);//------------------>
                formData.append('QuestionIdlist', questionid);//------------------>
                formData.append('AnswerIdlist', AnswerId);//------------------>



            }
            //debugger;
            //--------------------------------------------------------------------------------Form Append
            var formElementdata = document.getElementById('uploadlecturedocsform');

            var formFields = formElementdata.elements;
            for (var i = 0; i < formFields.length; i++) {
                var field = formFields[i];
                if (field.name) {
                    formData.append(field.name, field.value);
                }
            }


            var radioButtons = document.querySelectorAll('input[type="radio"][name="IsRestriction"]');
            radioButtons.forEach(function (radioButton) {
              
                if (radioButton.checked) {
                  //  alert(radioButton.value);
                    formData.append("IsRestrictionidfor", radioButton.value);
                }
            });
            var disname = $('#filesdisplaynames').find(' input[type="text"]');


            try {

                formData.append("UploadDocuments", $("#UploadDocuments")[0].files[a]);
                formData.append("DocsDisplayname", $(disname[a]).val());
               // console.log($(disname[a]).val());
               // alert($(disname[a]).val());

            }
            catch {
                //  formData.append("UploadDocuments", $("#UploadDocuments")[0].files[a]);
            }



            // totalFormData.append('totadata', formData);


            $.ajax({
                url: '/Videos/UploadLecturedocs',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    promises.push(res)
                }
            })



        }

        //--------------------**********************************************************-if docs is greater than videos
      //  debugger;
        if (docschecked.is(":checked")) {
            if (groupcontent.length < docs.length) {
                //debugger;
                for (var g = groupcontent.length; g < docs.length; g++) {
                    var promise = UploadDocsOnly(g);
                  
                        promises.push(promise);
                }
            }
        }
    }
    else if (docschecked.is(":checked")) {
      //  debugger;
        for (var h = 0; h < docs.length; h++) {
           
            var promise = UploadDocsOnly(h);
           // alert("promise");
            promises.push(promise);
        }
    }

        Promise.all(promises)
            .then(function (returnvalues) {
              //  alert("promise All");
                resolve(returnvalues); // Resolve with an array of return values
            })
            .catch(function (error) {
                reject(error);
            });
    });

}

//---------------------------------------------------***********************  Upload Documents Only 
 function UploadDocsOnly(g) {
  //   debugger;
  //   alert("uploaddoconly");
    return new Promise(function (resolve, reject) {
      //  var returnvaloddoc = 0;
    var formDat = new FormData();
    var disname = $('#filesdisplaynames').find(' input[type="text"]');
 //   alert($(disname[g]).val());

    formDat.append("UploadDocuments", $("#UploadDocuments")[0].files[g]);
    formDat.append("DocsDisplayname", $(disname[g]).val());
  //  console.log($(disname[g]).val());
   // alert($('#filesdisplaynames input[type="text"]')[g].val());
 
    var formElementdataa = document.getElementById('uploadlecturedocsform');

    var formFieldsa = formElementdataa.elements;
    for (var i = 0; i < formFieldsa.length; i++) {
        var field = formFieldsa[i];
        if (field.name) {
            formDat.append(field.name, field.value);
        }
        var radioButtons = document.querySelectorAll('input[type="radio"][name="IsRestriction"]');
        radioButtons.forEach(function (radioButton) {
            if (radioButton.checked) {
                formDat.append("IsRestrictionidfor", radioButton.value);

            }
        });

    }
    $.ajax({
        url: '/Videos/UploadDocsOnly',
        type: 'POST',

        data: formDat,
        processData: false,
        contentType: false,
        success: function (res) {
           
            resolve(res);
          
        }
    })
       
       
    });
}

//-----------------------------------------------------------------------    ********* (checking purpose) When Save Button Click (Checking)


$(document).on("click", "#popupinner #save-all-videos", function () {

    var totalerrorsinvideos = checkvideovalidations();

    if (totalerrorsinvideos == 0) {
        Swal.fire("Success", "All Records Are Saved SuccessFully", "success");
    }
    else {
        Swal.fire("Error", "Please Once Check All Fields", "error");
    }
   
   
    
})
//------------------------------------------------------------------------------  submit button click in videos uploading

/*$(document).on("click", "#uploadlecturedocsform #submitButton", function (event) {*/
async function maininsertingallvideos() {
    try {
        const returnvalueofvideos = await insertingallvideos();
        return returnvalueofvideos;
    } catch (error) {
        console.error(error);
        throw error;
    }
}




$("#uploadlecturedocsform").submit(function (event) {

  //  document.getElementById("loading").style.display = "block";

    event.preventDefault();


   
    //debugger;

   // alert("super Click");
    var videoschecked = $('#popoupoffon input[type="checkbox"]');
    var totalerrorsinvideos = 0;
    var filechecked = $('#fileuploadoff input[type="checkbox"]');
    var totalerrorsinfiles = 0;
  //  var validtionappendtoupvbutton = $('#validtioncheckforvideos');
    if (videoschecked.is(":checked")) {
         totalerrorsinvideos = checkvideovalidations();
    }
    if (filechecked.is(":checked")) {
        totalerrorsinfiles = fileserror();
       // alert(totalerrorsinfiles);
    }
    //else {
    //    removeErrorMessage(validtionappendtoupvbutton);
    //}

    var formElement = document.getElementById('uploadlecturedocsform');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationmelength = validationMessages.length;
      
        if (totalerrorsinvideos == 0 && validationmelength == 0 && totalerrorsinfiles == 0) {
            maininsertingallvideos().then(function (returnvalueofvideos) {
            
          
                var outputmessage = "";
                if (returnvalueofvideos[0] == "-3") {
                    outputmessage = "Please allocate class teacher for the selected subject.";
                    Swal.fire("Error", outputmessage, "error");

                } else {
                    if ($('#videosupdateknown').val() == "1215") {
                        outputmessage = "Successfully Updated All The Files";
                    }
                    else {
                        outputmessage = "Successfully Inserted All The Files";

                    }
                    Swal.fire("Success", outputmessage, "success").then(function () {
                        window.location.href = "/Videos/UploadLecturedocs";//-------------->
                    });
                }
            });
          //  Swal.fire("Success", "Successfully Uploaded All The Files ", "success");

          //  window.location.href = "/Videos/UploadLecturedocs";
        }
        else {
            Swal.fire("Error", "Please Once Check All The Fields", "error");
        }
        

      }, 50);

   
})







//-----------------------------------****************************************-----------------   VALIDATIONS FOR ALL


    function checkvideovalidations() {

    

    var groupcontent = document.getElementsByClassName("group-content");
        var totalerrorsinvideos=0;
    for (var a = 0; a < groupcontent.length; a++) {

     
        //-----------------------------------------------------------------------    Find out The Video Sourse
        var groups = groupcontent[a];
        //  var groupcontent = groups[a].getElementsByClassName("group-content")[0];

        var videoElement = $(groups).find("#video-upload")[0];

        var videoFile = videoElement.files[0];
        //*************************************  Apped The Video To Form Data
     

        //-----------------------------------------------------------------------    Video Time Calculate

        var videoElement = $(groups).find("#video-container-src").find("#videosourse")[0];
        var videotime = videoElement.duration;
        var fileerror = $(groups).find('.filename');

        if (isNaN(videotime)) {
            displayErrorMessage(fileerror);
            totalerrorsinvideos++;
        }
        else {
            removeErrorMessage(fileerror);
          //  //totalerrorsinvideos--;
        }
     //------------------------------------------------------------------------>   Display Name
        var displynames = $(groups).find('.displayname');
        var displayname = displynames.find('input[type="text"]').val();
       
        if (displayname == "") {
            displayErrorMessage(displynames);
            totalerrorsinvideos++;
        }
        else {
            removeErrorMessage(displynames);
            
        }
        //-----------------------------------------------------------------------    Find out the  time and Chapters Names

        var textitems = $(groups).find(".chapters");
        // alert(textitems);

        for (var b = 0; b < textitems.length; b++) {

            var chapter = $(textitems[b]);
            var durationpicker = chapter.find('.duration-picker');
            var hours = chapter.find(".duration-picker-input[placeholder='HH']").val();
            var minutes = chapter.find(".duration-picker-input[placeholder='MM']").val();
            var seconds = chapter.find(".duration-picker-input[placeholder='SS']").val();
            var chaptername = chapter.find("input[type='text']").val();
            if (hours == "") {
                hours = 0;
            }
            if (minutes == "") {
                minutes = 0;
            }
            if (seconds == "") {
                seconds = 0;
            }
            var totalSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds);

            if (totalSeconds > videotime || isNaN(totalSeconds) || totalSeconds == 0) {
                displayErrorMessage(durationpicker);
                totalerrorsinvideos++;
            } else {
                removeErrorMessage(durationpicker);
                //totalerrorsinvideos--;
            }
            var chaptererror = chapter.find(".fa-trash-o");
          
            if (chaptername == "") {
                displayErrorMessage(chaptererror);
                totalerrorsinvideos++;
            }
            else {
                removeErrorMessage(chaptererror);
                //totalerrorsinvideos--;
            }


        }

        //-----------------------------------------------------------------------    Find out the   Questions and Answers with time

        var questionRowCount = $(groups).find(".row.ques");



        for (var c = 0; c < questionRowCount.length; c++) {

            var questionrow = $(questionRowCount[c]);

            var erroforquestion = questionrow.find('.duration-picker');

            var hoursq = questionrow.find(".duration-picker-input[placeholder='HH']").val();
            var minutesq = questionrow.find(".duration-picker-input[placeholder='MM']").val();
            var secondsq = questionrow.find(".duration-picker-input[placeholder='SS']").val();
            var question = questionrow.find("textarea").val();
          

            var quest_error = questionrow.find(".textarea");

            if (question == "") {
                displayErrorMessage(quest_error);
                totalerrorsinvideos++;
            }
            else {
                removeErrorMessage(quest_error);
                //totalerrorsinvideos--;
            }
        

            var options = questionrow.find('.col-6.opt input');
          //  var values = [];
            for (var d = 0; d < options.length; d++) {
                var value = $(options[d]).val();
                var error = $(options[d]).closest('.opt');
                if (value == "") {
                    displayErrorMessage(error);
                    totalerrorsinvideos++;
                }
                else {
                    removeErrorMessage(error);
                   // values.push(value);
                    //totalerrorsinvideos--;
                }
             

            }
            if (hoursq == "") {
                hoursq = 0;
            }
            if (minutesq == "") {
                minutesq = 0;
            }
            if (secondsq == "") {
                secondsq = 0;
            }

            var Questiontime = (parseInt(hoursq) * 3600) + (parseInt(minutesq) * 60) + parseInt(secondsq);

            if (Questiontime > videotime || isNaN(Questiontime) || Questiontime == 0) {
                displayErrorMessage(erroforquestion);
                totalerrorsinvideos++;
            } else {
                removeErrorMessage(erroforquestion);
                //totalerrorsinvideos--;
            }
         
            var answer = questionrow.find("#answer").val();
            var errorMessage = questionrow.find("i");

            if (parseInt(answer) > 4 || parseInt(answer) == 0 || isNaN(parseInt(answer))) {


                displayErrorMessage(errorMessage);
                totalerrorsinvideos++;
            }
            else {

                removeErrorMessage(errorMessage);
                //totalerrorsinvideos--;
            }


            //------------------------  Marks Checking
         
            var Marks = questionrow.find("#Marks").val();
            var errorMarks = questionrow.find("#Marks");
          
            var errorMessageM = $(errorMarks).closest(".col-4");
            if (parseInt(Marks) == 0 || isNaN(parseInt(Marks))) {


                displayErrorMessage(errorMessageM);
                totalerrorsinvideos++;
            }
            else {

                removeErrorMessage(errorMessageM);
            }










          

        }




    }
        var validtionappendtoupvbutton = $('#validtioncheckforvideos');
        if (totalerrorsinvideos != 0) {
            displayErrorMessagedocs(validtionappendtoupvbutton, "Please Once Check In This Popup");
        }
        else {
            removeErrorMessage(validtionappendtoupvbutton);
        }

        return totalerrorsinvideos;
     
}






























//---------------------------------------********************---------------validations in classification   (pdf's upload)
//function docsvalidations() {
//    var totalerrorsindocs = 0;
//    var form = document.getElementById('uploadlecturedocsform');
//    var formsub = $(form);
//    //---------------------------Department
//    var Department = formsub.find('#Department');
//    var Departmenterror = formsub.find('#Department').closest('.form-group');

//    if (Department.val() == "") {
//        displayErrorMessagedocs(Departmenterror, "*Please Select Any One Department");
//        totalerrorsindocs++;
//    }
//    else {
//        removeErrorMessage(Departmenterror);
//    }
//    //---------------------------class  
//    var Department = formsub.find('#ClassificationIds');
//    var Departmenterror = formsub.find('#ClassificationIds').closest('.form-group');

//    if (Department.val() == "") {
//        displayErrorMessagedocs(Departmenterror, "*Please Select Any One Class");
//        totalerrorsindocs++;
//    }
//    else {
//        removeErrorMessage(Departmenterror);
//    }
//    //---------------------------Subject  
//    var Department = formsub.find('#InstanceSubClassificationId');
//    var Departmenterror = formsub.find('#InstanceSubClassificationId').closest('.form-group');

//    if (Department.val() == "") {
//        displayErrorMessagedocs(Departmenterror, "*Please Select Any One Subject");
//        totalerrorsindocs++;
//    }
//    else {
//        removeErrorMessage(Departmenterror);
//    }
//    var fileoutput = $('#fileuploadoff input[type="checkbox"]');
//    //debugger;
//    var docserror = formsub.find('#UploadDocuments').closest('.form-group');
//    var disoplaerror = formsub.find('#DocsDisplayname').closest('.form-group');
//    if (!fileoutput.checked) {
//        //---------------------------Upload Documents  
//        removeErrorMessage(docserror);
//        removeErrorMessage(disoplaerror);
//    }
//    else {


//        var Department = formsub.find('#UploadDocuments');


//        if (Department.val() == "") {
//            displayErrorMessagedocs(docserror, "*Please Choose Any One File ");
//            totalerrorsindocs++;
//        }
//        else {
//            removeErrorMessage(docserror);
//        }
//        //---------------------------Display Name For Upload Docs  
//        var Department = formsub.find('#DocsDisplayname');


//        if (Department.val() == "") {
//            displayErrorMessagedocs(disoplaerror, "*Please Enter Display Name ");
//            totalerrorsindocs++;
//        }
//        else {
//            removeErrorMessage(disoplaerror);
//        }




//    }
//    //---------------------------Points 
//    var Department = formsub.find('#Points');
//    var Departmenterror = formsub.find('#Points').closest('.form-group');

//    if (Department.val() == "") {
//        displayErrorMessagedocs(Departmenterror, "*Please Enter Points");
//        totalerrorsindocs++;
//    }
//    else {
//        removeErrorMessage(Departmenterror);
//    }

//    alert(totalerrorsindocs);

//}

