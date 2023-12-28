
//========================================  Click On Check Box For Select All in the Select tag
$("#Serach_MA #Select_All").click(function () {
  //  $("#Serach_MA #dropdown_Mentors_MA option").prop("selected", $(this).prop("checked"));

    if ($(this).prop("checked")) {
        $("#Serach_MA #dropdown_Mentors_MA option").prop("selected", true);
    } else {
        $("#Serach_MA #dropdown_Mentors_MA option").prop("selected", false);
    }
});


var _Mentorattendancestartdate;
var _Mentorattendancesenddate;
var Attendanceformdate;




$("#Serach_MA").submit(function (event) {
    event.preventDefault();
    //debugger;
   // alert("hii");
    $(".errorofallemployeeattendence").text("");

    loaddingimg.css('display', 'block');
    //month_EAP = $("#Serach_EAP").find("#insertdropdown_Month_EAP option:selected").text();
    //Month_EAP_val = $("#Serach_EAP").find("#insertdropdown_Month_EAP option:selected").val();
    //year_EAP = $("#Serach_EAP").find("#insertdropdown_year_EAP").val();
    var startdate = $("#Serach_MA #StartDate").val();
    var enddate = $("#Serach_MA #EndDate").val();
   _Mentorattendancestartdate = startdate;
    _Mentorattendancesenddate = enddate;
   
     Attendanceformdate = $(this).serialize();

    var formElement = document.getElementById('Serach_MA');
    setTimeout(function () {
        var validationMessages = formElement.getElementsByClassName('field-validation-error');
        var validationMessages2 = formElement.getElementsByClassName('error2');
        var validationmelength = validationMessages.length;
        if (validationmelength == 0 && validationMessages2.length == 0) {
            CommonAjaxFunction('GET', '/Rolewise/PostAttendanceSave', null, function (response) {
                $("#GetMentorAttendenceAppend").html(response);
                $("#Serach_MA #deletebutton #deleteinner").text("");
                $("#Serach_MA #deletebutton #deleteinner").append('<input type="button" value="Delete" class="btn btn-pill btn-outline-danger btn-air-warning" id="deleteattendance" />');
                searchManageMentorAttendence(Attendanceformdate,startdate,enddate);

            }, function (status, error) {

            }, false);
        }
        else {
            $('.alert-danger p').text("Pleae Enter All Required Fields");
            $(".alert-danger").show().delay(5000).fadeOut()
        }
    }, 50);
    loaddingimg.css('display', 'none');

})

var newTableMA;


function searchManageMentorAttendence(data, startdate, enddate) {

    loaddingimg.css('display', 'block');
    CommonAjaxFunction('GET', '/Rolewise/GetMentorAttendance', data, function (response) { bindDatatableME(response, startdate, enddate) }, function (status, error) {
        loaddingimg.css('display', 'none');
    }, false);

    //--------------------------------------------------------Bind Data into Data Table 
    //------------------------------------------------------------------------------Datatable For Getting the list data
    function bindDatatableME(response, startdate, enddate ) {

         debugger;
      
        var table = $('#tblMAsearchresults').DataTable();
        table.destroy();
        var countofdates = 0;

        $("#tblMAsearchresults thead tr th:gt(3)").remove();


        var endDateObj = new Date(enddate);

        for (var date = new Date(startdate); date <= endDateObj; date.setDate(date.getDate() + 1)) {
            var formattedDate = _formatDate(date); // You need a function to format the date as needed
            $("#tblMAsearchresults thead tr").append("<th style='color:green'>" + formattedDate + "</th>");
            countofdates++;
        }



        $("#totalrecords_Tranctions_MA").text(response.length);
        if (response.length != 0) {
            $("#totalrecords_Tranctions_EAP").text(response.length);
            newTableMA = $("#tblMAsearchresults").DataTable({
                dom: 'Bfrtip',
                buttons: [],

                bProcessing: false,
                bLengthChange: true,
                bfilter: false,
                bSort: true,
                searching: false,
                paging: false,
                bPaginate: false,
                /*  scrollX: true,*/
                data: response,
                columns: [


                    {
                        targets: 1, // Assuming this is the column index where you want to display numbering
                        render: function (data, type, row, meta) {
                            var currentPage = table.page.info().page;
                            var rowsPerPage = table.page.info().length;
                            return (0 * rowsPerPage) + meta.row + 1;
                        }
                    }, {
                        data: "Firstname",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.firstname[0]

                        }
                    },

                    {
                        data: "InstanceUserId",

                        render: function (data, type, row, meta) {
                            //  length++;

                            return row.instanceUserId + '<input id="_mentoruserIdlist" type="textbox" value=' + row.userIdlist[0] + ' hidden style="display:none" />'


                        }
                    }, {
                        data: "StudentSMS",

                        render: function (data, type, row, meta) {
                            var iconSrc = row.studentSMS == "1" ? "/Images_IMP/cross.png" : "/Images_IMP/tick_16.png";
                            return '<img src="' + iconSrc + '" title="' + row.studentPhno + '" />';


                        }
                    },
                    ...Array.from({ length: countofdates }, (_, k) => ({
                        data: "Columns",
                        render: function (data, type, row, meta) {
                            var checkboxcheck = row.columns[k] == "1";
                            if (row.columns[k] == "") {
                                $("#tblMAsearchresults thead tr").find('th:eq(' + (4 + k) + ')').css('color', 'red');
                            }


                            return '<input type="checkbox" class="form-check-input" value=' + row.attendanceIds[k] + '  ' + (checkboxcheck ? 'checked' : ' ') + ' />';
                        }
                    }))


                ]


            });
            try {
                newTableMA.column(0).order('asc').draw();
                $("#attendencetable").find('#attendenceposting').remove();
                $("#attendencetable").append('<div style="text-align: center;padding: 11px;" ><input type="button" value="Submit" class="btn btn-pill btn-outline-success btn-air-success" id="attendenceposting" style="background-color: #1a68ff;color: white;" /></div>')
            }
            catch {
                $("#attendencetable").append('<div style="text-align: center;padding: 11px;" ><input type="button" value="Submit" class="btn btn-pill btn-outline-success btn-air-success" id="attendenceposting" style="background-color: #1a68ff;color: white;" /></div>')

            }

            loaddingimg.css('display', 'none');
        }
        else {
            loaddingimg.css('display', 'none');
        }

    }

}


//=======================================================   Click On Submit For  Mentor Attendance Posting
$(document).on('click', '#attendencetable #attendenceposting', function (event) {
    event.stopImmediatePropagation();
    loaddingimg.css('display', 'block');

    var Attendancedataparent = [];

    $("#tblMAsearchresults tbody tr").each(function (i, parentRow) {
        var Attendancedatachild = {
            'AttendUserId': $(parentRow).find("#_mentoruserIdlist").val(),
            'Ispresent': []
        };

        $("#tblMAsearchresults thead th").each(function (j, th) {
            if (j >= 4 && j < $("#tblMAsearchresults thead th").length) {
                var isChecked = $(parentRow).find('td:eq(' + j + ') input[type="checkbox"]').prop('checked');
                Attendancedatachild.Ispresent.push(isChecked ? "1" : "0");
            }
        });

        Attendancedataparent.push(Attendancedatachild);
    });

    $.ajax({
        url: '/Rolewise/PostAttendanceSave',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(Attendancedataparent),
        success: function (response) {
            $(".errorofallemployeeattendence").text("Attendance saved successfully .");
            $('.alert-success p').text("Attendance saved successfully .");
            $(".alert-success").show().delay(6000).fadeOut()
            loaddingimg.css('display', 'none');
            $("#Serach_MA #deletebutton #deleteinner").text("");

           // console.log('Success:', response);
        },
        error: function (status, error) {
            loaddingimg.css('display', 'none');
          //  console.error('Error:', status, error);
        }
    });

});

//================================ click on delete  Delete Attendance

$(document).on('click', '#Serach_MA #deleteattendance', function (event) {
    event.stopImmediatePropagation();
    CommonDeleteFunction('Attendance', 'GET', '/Rolewise/AttendanceDelete', null, function (response) {
        $('.alert-success p').text("Attendance Deleted Sucessfully.");
        $(".alert-success").show().delay(5000).fadeOut()
        $(".errorofallemployeeattendence").text("Attendance Deleted Sucessfully.");
        searchManageMentorAttendence(Attendanceformdate, _Mentorattendancestartdate, _Mentorattendancesenddate);

        // loaddingimg.css('display', 'none');

    });


})




   //----------------------- Drop Down Change 
$(document).on('change', '#Serach_MA #dropdown_Department_MA', function (event) {
    event.stopImmediatePropagation();
    var attributeval = $(this).val();
    _gettingMentors(attributeval, "dropdown_Mentors_MA");
});
function _gettingMentors(attributeval, id) {
   
    var formid = $('#Serach_MA');
    document.getElementById("loading").style.display = "block";
    var extraparameters = [];
    extraparameters.push($(formid).find("#InstanceidforMA").val());
   
    extraparameters.push('TEACHER,CLASS TEACHER');
    extraparameters.push(attributeval);


    var data = {
        methodname: 'GetMentors',
        text: "MentorName",
        value: "UserId",
        parameters: extraparameters
    };

    CommonAjaxFunction('POST', '/Rolewise/CommonDropdown', data, function (response) {

        var dropdown = $('#' + id); // Change this to match the generated ID
        dropdown.empty();
       // dropdown.append($('<option multiple></option>').val(''));//.text('-------select-------'));
        //if (response.length == 0 && id == "dropdown_Mentors_MA") {
        //    $(dropdown).prop("disabled", true);
        //    $(dropdown).css("opacity", 0.5);
        //}
        //else {
        //    $(dropdown).prop("disabled", false);
        //    $(dropdown).css("opacity", 1);
        //}
        response.forEach(function (mentor) {
            var option = $('<option></option>').val(mentor.value).text(mentor.text);
            dropdown.append(option);
        });
        document.getElementById("loading").style.display = "none";
    }, function (status, error) {

    }, false);

}
//====================================  Clear Section in the multilple Select

$(document).on('click', "#Serach_MA #ClearSection", function (event) {
    event.stopImmediatePropagation;
    $("#Serach_MA #Select_All").prop('checked', false);
    $("#Serach_MA #dropdown_Mentors_MA option").prop("selected", false);


})
//============================================  Compare The date
$(".form-group #StartDate").on("change", function () { datescomparepro(event, "start Date", "End Date") });
$(".form-group #EndDate").on("change", function () { datescomparepro(event, "start Date", "End Date") });

//==========================================    Check All check Boxes
$(document).on('click', '#checksall #_checkallattendance', function (event) {
    event.stopImmediatePropagation();
    if ($(this).prop('checked')) {
        $("#tblMAsearchresults").find('input[type="checkbox"]').prop('checked', true);
    } else {
        $("#tblMAsearchresults").find('input[type="checkbox"]').prop('checked', false);

    }

});
