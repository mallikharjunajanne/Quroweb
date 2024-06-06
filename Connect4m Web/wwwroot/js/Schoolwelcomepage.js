function CallToAjax(method, url,data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}

function datawithAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}



//InstanceCategory_search

$(document).ready(function () {
   

    /*===== ** INSTANCE CATEGORY_SEARCH CALLING FUNCTION ** =====*/
    CategorytypesNames();
    
});



/*===== ** INSTANCE CATEGORY_SEARCH FUNCTION** =====*/
function CategorytypesNames() {
   
    var url = '/UserScreens/InstanceCategory_search';
    CallToAjax('GET', url, null,
        function (response) {
            debugger;
            
            var Categorytypes = response.itemList;
            var RoleName = response.roleName;
           
            if (RoleName == "ADMINISTRATOR") {
             
                var AddingCategorytypeNames = [
                    "BIRTHDAYS IN SCHOOL FOR THE DAY",
                    "ABSENTEE STUDENTS FOR THE DAY",
                    "COOL LINKS",
                    "LEAVE STATUS",
                    "TIME TABLE",
                    "NEW ADMISSION(S)",
                    "STUDENT(S) UNDER WITHDRAWAL PROCESS",
                    "QUESTIONS POSTED TO ME",
                    "CALENDAR"
                ];
                $('#SchoolwellcomepageFirstbtn').text(Categorytypes[0].categoryName).attr('title', Categorytypes[0].assetTypeId);
                $('#SchoolwellcomepageSecoundbtn').text(AddingCategorytypeNames[0]);
                $('#SchoolwellcomepageThirdbtn').text(Categorytypes[1].categoryName).attr('title', Categorytypes[1].assetTypeId);
                $('#SchoolwellcomepageFourthbtn').text(AddingCategorytypeNames[1]);
                $('#SchoolwellcomepageFifthbtn').text(AddingCategorytypeNames[2]);
                $('#SchoolwellcomepageSixthbtn').text(AddingCategorytypeNames[3]);
                $('#SchoolwellcomepageSeventhbtn').text(AddingCategorytypeNames[4]);
                $('#SchoolwellcomepageEighthbtn').text(AddingCategorytypeNames[5]);
                $('#SchoolwellcomepageNinthbtn').text(AddingCategorytypeNames[6]);
                $('#SchoolwellcomepageTenthbtn').text(AddingCategorytypeNames[7]);
                $('#SchoolwellcomepageEleventhbtn').text(AddingCategorytypeNames[8]);
                /*===== ** FLASH NEWS CALLING FUNCTION ** =====*/
                FirstboxFlashnews();
                Coollinks();
                Calendar();
                PostedQuestions();
                Leavestatus();
                Absenteestudentsfortheday();
                Birthdaysinschool();
                Timetablefun();
                Newadmissiontblfun();
                Studentsunderwithdrawalfun();

            }
            else if (RoleName == "CLASS TEACHER") {
             
                var AddingCategorytypeNames = [
                    "BIRTHDAYS IN SCHOOL FOR THE DAY",
                    "ABSENTEE STUDENTS FOR THE DAY",
                    "COOL LINKS",
                    "LEAVE STATUS",
                    "TIME TABLE",
                    "NEW ADMISSION(S)",
                    "STUDENT(S) UNDER WITHDRAWAL PROCESS",
                    "QUESTIONS POSTED TO ME",
                    "CALENDAR"
                ];
                $('#SchoolwellcomepageFirstbtn').text(Categorytypes[0].categoryName).attr('title', Categorytypes[0].assetTypeId);
                $('#SchoolwellcomepageSecoundbtn').text(AddingCategorytypeNames[0]);
                $('#SchoolwellcomepageThirdbtn').text(Categorytypes[1].categoryName).attr('title', Categorytypes[1].assetTypeId);
                $('#SchoolwellcomepageFourthbtn').text(AddingCategorytypeNames[1]);
                $('#SchoolwellcomepageFifthbtn').text(AddingCategorytypeNames[2]);
                $('#SchoolwellcomepageSixthbtn').text(AddingCategorytypeNames[3]);
                $('#SchoolwellcomepageSeventhbtn').text(AddingCategorytypeNames[4]);
                $('#SchoolwellcomepageEighthbtn').text(AddingCategorytypeNames[5]);
                $('#SchoolwellcomepageNinthbtn').text(AddingCategorytypeNames[6]);
                $('#SchoolwellcomepageTenthbtn').text(AddingCategorytypeNames[7]);
                $('#SchoolwellcomepageEleventhbtn').text(AddingCategorytypeNames[8]);
                /*===== ** FLASH NEWS CALLING FUNCTION ** =====*/
                FirstboxFlashnews();
                Coollinks();
                Calendar();
                PostedQuestions();
                Leavestatus();
                Absenteestudentsfortheday();
                Birthdaysinschool();
                Timetablefun();
                Newadmissiontblfun();
                Studentsunderwithdrawalfun();
            }
            else if (RoleName == "School Admin") {
             
                var AddingCategorytypeNames = [
                    "BIRTHDAYS IN SCHOOL FOR THE DAY",
                    "ABSENTEE STUDENTS FOR THE DAY",
                    "COOL LINKS",
                    "LEAVE STATUS",
                    "TIME TABLE",
                    "NEW ADMISSION(S)",
                    "STUDENT(S) UNDER WITHDRAWAL PROCESS",
                    "QUESTIONS POSTED TO ME",
                    "CALENDAR"
                ];
                $('#SchoolwellcomepageFirstbtn').text(Categorytypes[0].categoryName).attr('title', Categorytypes[0].assetTypeId);
                $('#SchoolwellcomepageSecoundbtn').text(AddingCategorytypeNames[0]);
                $('#SchoolwellcomepageThirdbtn').text(Categorytypes[1].categoryName).attr('title', Categorytypes[1].assetTypeId);
                $('#SchoolwellcomepageFourthbtn').text(AddingCategorytypeNames[1]);
                $('#SchoolwellcomepageFifthbtn').text(AddingCategorytypeNames[2]);
                $('#SchoolwellcomepageSixthbtn').text(AddingCategorytypeNames[3]);
                $('#SchoolwellcomepageSeventhbtn').text(AddingCategorytypeNames[4]);
                $('#SchoolwellcomepageEighthbtn').text(AddingCategorytypeNames[5]);
                $('#SchoolwellcomepageNinthbtn').text(AddingCategorytypeNames[6]);
                $('#SchoolwellcomepageTenthbtn').text(AddingCategorytypeNames[7]);
                $('#SchoolwellcomepageEleventhbtn').text(AddingCategorytypeNames[8]);
                /*===== ** FLASH NEWS CALLING FUNCTION ** =====*/
                FirstboxFlashnews();
                Coollinks();
                Calendar();
                PostedQuestions();
                Leavestatus();
                Absenteestudentsfortheday();
                Birthdaysinschool();
                Timetablefun();
                Newadmissiontblfun();
                Studentsunderwithdrawalfun();
            }
            else if (RoleName == "PARENT") {
                debugger;
             
                var AddingCategorytypeNames = [
                    "BEST PERFORMERS",
                    "COOL LINKS",
                ];
                $('#SchoolwellcomepageFirstbtn').text(Categorytypes[0].categoryName).attr('title', Categorytypes[0].assetTypeId);
                $('#SchoolwellcomepageSecoundbtn').text(AddingCategorytypeNames[0]);
                $('#SchoolwellcomepageThirdbtn').text(Categorytypes[1].categoryName).attr('title', Categorytypes[1].assetTypeId);
                $('#SchoolwellcomepageFourthbtn').text(Categorytypes[2].categoryName).attr('title', Categorytypes[2].assetTypeId);
                $('#SchoolwellcomepageFifthbtn').text(AddingCategorytypeNames[1]);
                $('#SchoolwellcomepageSixthbtn').text(Categorytypes[3].categoryName).attr('title', Categorytypes[3].assetTypeId);
                $('#Sevendiv').remove();
                $('#Eightdiv').remove();
                $('#Ninediv').remove();
                $('#Tendiv').remove();
                $('#Elevendiv').remove();

                /*===== ** FLASH NEWS CALLING FUNCTION ** =====*/
                FirstboxFlashnews();                            
                StudentsecoundboxBestperformer();
                StudentthirdboxEnoticeboard();
                StudentfourthboxWorksheets();
                Coollinks();
                StudentsixthboxWorksheets();
                

            }
            else if (RoleName == "STUDENT") {
                debugger;
             
                var AddingCategorytypeNames = [
                    "BEST PERFORMERS",
                    "COOL LINKS",
                ];
                $('#SchoolwellcomepageFirstbtn').text(Categorytypes[0].categoryName).attr('title', Categorytypes[0].assetTypeId);
                $('#SchoolwellcomepageSecoundbtn').text(AddingCategorytypeNames[0]);
                $('#SchoolwellcomepageThirdbtn').text(Categorytypes[1].categoryName).attr('title', Categorytypes[1].assetTypeId);
                $('#SchoolwellcomepageFourthbtn').text(Categorytypes[2].categoryName).attr('title', Categorytypes[2].assetTypeId);
                $('#SchoolwellcomepageFifthbtn').text(AddingCategorytypeNames[1]);
                $('#SchoolwellcomepageSixthbtn').text(Categorytypes[3].categoryName).attr('title', Categorytypes[3].assetTypeId);
                $('#Sevendiv').remove();
                $('#Eightdiv').remove();
                $('#Ninediv').remove();
                $('#Tendiv').remove();
                $('#Elevendiv').remove();

                /*===== **  CALLING FUNCTION ** =====*/
                Studentfirstboxflashnews();
                StudentsecoundboxBestperformer();
                StudentthirdboxEnoticeboard();
                StudentfourthboxWorksheets();
                Coollinks();
                StudentsixthboxWorksheets();
                
            }
            else {
             
                var AddingCategorytypeNames = [
                    "BIRTHDAYS IN SCHOOL FOR THE DAY",
                    "ABSENTEE STUDENTS FOR THE DAY",
                    "COOL LINKS",
                    "LEAVE STATUS",
                    "TIME TABLE",
                    "NEW ADMISSION(S)",
                    "STUDENT(S) UNDER WITHDRAWAL PROCESS",
                    "QUESTIONS POSTED TO ME",
                    "CALENDAR"
                ];
                $('#SchoolwellcomepageFirstbtn').text(Categorytypes[0].categoryName).attr('title', Categorytypes[0].assetTypeId);
                $('#SchoolwellcomepageSecoundbtn').text(AddingCategorytypeNames[0]);
                $('#SchoolwellcomepageThirdbtn').text(Categorytypes[1].categoryName).attr('title', Categorytypes[1].assetTypeId);
                $('#SchoolwellcomepageFourthbtn').text(AddingCategorytypeNames[1]);
                $('#SchoolwellcomepageFifthbtn').text(AddingCategorytypeNames[2]);
                $('#SchoolwellcomepageSixthbtn').text(AddingCategorytypeNames[3]);
                $('#SchoolwellcomepageSeventhbtn').text(AddingCategorytypeNames[4]);
                $('#SchoolwellcomepageEighthbtn').text(AddingCategorytypeNames[5]);
                $('#SchoolwellcomepageNinthbtn').text(AddingCategorytypeNames[6]);
                $('#SchoolwellcomepageTenthbtn').text(AddingCategorytypeNames[7]);
                $('#SchoolwellcomepageEleventhbtn').text(AddingCategorytypeNames[8]);
                /*===== ** FLASH NEWS CALLING FUNCTION ** =====*/
                FirstboxFlashnews();
                Coollinks();
                Calendar();
                PostedQuestions();
                Leavestatus();
                
            }
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}


/*===== ** FLASH NEWS FUNCTION** =====*/
function FirstboxFlashnews() {
   
    var FlassNews = $('#SchoolwellcomepageFirstbtn').text();
    var FlassNewsIsGlobalNotice = $('#SchoolwellcomepageFirstbtn').attr('title');

    var dataToSend = {
        ENoticeType: FlassNews,
        IsGlobalNotice: FlassNewsIsGlobalNotice
    }; 
    var url = '/UserScreens/FlashNews';
    CallToAjax('GET', url, dataToSend,
        function (response) {
          
            $('#First_PartailConatiner').html(response);            
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

function ThirdboxEnoticeboard() {
    var ENoticeType = $('#SchoolwellcomepageThirdbtn').text();
    var IsGlobalNotice = $('#SchoolwellcomepageThirdbtn').attr('title');

    var dataToSend = {
        ENoticeType: ENoticeType,
        IsGlobalNotice: IsGlobalNotice
    };    
    var url = '/UserScreens/E_Noticeboard';

    CallToAjax('GET', url, dataToSend,
        function (response) {
            $('#Third_PartailConatiner').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

/*===== ** COOL LINKS FUNCTION CODE START ** =====*/

function Coollinks() {
    var Url = '/UserScreens/Coollinks';
    CallToAjax('GET', Url, null,
        function (response) {
            $('#Five_PartailConatiner').html(response);
            pagination();
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}
function pagination() {
   
    var listId = 'Coollinkslist_Ul';
    var paginationDiv = document.getElementById('Pagination_div');
    var itemsPerPage = 10;
    var currentPage = 1;
    var list = document.getElementById(listId);
    var items = Array.from(list.getElementsByTagName('li'));
    var numItems = items.length;
    var totalPages = Math.ceil(numItems / itemsPerPage);

   
    if (numItems >= itemsPerPage) {
        function showPage(page) {
            currentPage = page;
            var startIndex = (page - 1) * itemsPerPage;
            var endIndex = Math.min(startIndex + itemsPerPage, numItems);

            items.forEach(function (item) {
                item.style.display = 'none';
            });

            for (var i = startIndex; i < endIndex; i++) {
                items[i].style.display = 'list-item';
            }
        }

        function updatePagination() {
            paginationDiv.innerHTML = '';

            for (var i = 1; i <= totalPages; i++) {
                var link = document.createElement('a');
                link.href = '#';
                link.textContent = i;
                link.classList.add('pagination-link');
                link.dataset.page = i;
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    var page = parseInt(this.dataset.page);
                    showPage(page);
                    updatePagination();
                });

                if (i === currentPage) {
                    link.classList.add('current-page');
                    link.style.cursor = 'unset';
                    link.style.fontWeight = 'bold';
                    link.style.color = '#ff0000';
                    link.style.margin = '0px 5px';
                }
                paginationDiv.appendChild(link);
            }
        }

        showPage(currentPage);
        updatePagination();
    }
}

/*===== ** COOL LINKS FUNCTION CODE END ** =====*/
function Calendar() {
    CallToAjax('GET', '/UserScreens/CalendarEvents',null,
        function (response) {

            $('#Eleven_PartailConatiner').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}


/*===== ** QUESTIONS POSTED TO ME FUNCTION CODE END ** =====*/
function PostedQuestions() {
    
    var url = '/UserScreens/PostedQuestions';
    CallToAjax('GET', url,null,
        function (response) {
            $('#Tenth_PartailConatiner').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

/*===== ** ABSENTEE STUDENTS FOR THE DAY ** =====*/
function Absenteestudentsfortheday() {
    CallToAjax('GET', '/UserScreens/Absenteestudentsfortheday',null,
        function (response) {
            debugger;
            $('#Four_PartailConatiner').html(response);

        },
        function (status, error) {
            // Handle error if needed
        }
    );
}


/* TIME TABLE  */
function Timetablefun() {
    CallToAjax('GET', '/UserScreens/Timetablecriteria', null,
        function (response) {
            if (response != 0) {
                $('#Seventh_PartailConatiner').html(response);
            } else {
                var spanElement = $('<span>No Data Found</span>');
                $('#Seventh_PartailConatiner').append(spanElement);
            }
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

/* NEW ADMISSION TABLE */
function Newadmissiontblfun() {

    debugger;

    CallToAjax('GET', '/UserScreens/Newadmissionstudents', null,
        function (response) {
            if (response != 0) {
                $('#Eight_PartailConatiner').html(response);
            } else {
                var spanElement = $('<span>No Data Found</span>');
                $('#Eight_PartailConatiner').append(spanElement);
            }
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}
/* Students Under Withdrawal */
function Studentsunderwithdrawalfun() {
    debugger;
    CallToAjax('GET', '/UserScreens/Studentsunderwithdrawal', null,
        function (response) {
            if (response != 0) {
                $('#Ninth_PartailConatiner').html(response);
            } else {
                var spanElement = $('<span>No Data Found</span>');
                $('#Ninth_PartailConatiner').append(spanElement);
            }
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}
function Leavestatus() {
    CallToAjax('GET', '/UserScreens/LeaveStatus',null,
        function (response) {
            
            if (response != 0) {
                $('#Sixth_PartailConatiner').html(response);
            } else {
                var spanElement = $('<span>No Data Found</span>');
                $('#Sixth_PartailConatiner').append(spanElement);
            }           
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

function Birthdaysinschool() {
    CallToAjax('GET', '/UserScreens/BirthdaysByInstance', null,
        function (response) {
            
            if (response != 0) {
                $('#Two_PartailConatiner').html(response);
            } else {
                var spanElement = $('<span>No Data Found</span>');
                $('#Two_PartailConatiner').append(spanElement);
            }
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

/*==== *** STUDENT  HOME PAGE *** ====*/
function Studentfirstboxflashnews() {
    var FlassNews = $('#SchoolwellcomepageFirstbtn').text();
    var FlassNewsIsGlobalNotice = $('#SchoolwellcomepageFirstbtn').attr('title');

    var dataToSend = {
        ENoticeType: FlassNews,
        IsGlobalNotice: FlassNewsIsGlobalNotice
    };
    var url = '/UserScreens/FlashNews';
    CallToAjax('GET', url, dataToSend,
        function (response) {

            $('#First_PartailConatiner').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

function StudentsecoundboxBestperformer() {
    CallToAjax('GET', '/UserScreens/BestPerformer', null,
        function (response) {
            if (response != 0) {
                $('#Two_PartailConatiner').html(response);
            } else {
                var spanElement = $('<span>No Data Found</span>');
                $('#Two_PartailConatiner').append(spanElement);
            }
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

function StudentthirdboxEnoticeboard() {
    var ENoticeType = $('#SchoolwellcomepageThirdbtn').text();
    var IsGlobalNotice = $('#SchoolwellcomepageThirdbtn').attr('title');

    var dataToSend = {
        ENoticeType: ENoticeType,
        IsGlobalNotice: IsGlobalNotice
    };
    var url = '/UserScreens/E_Noticeboard';

    CallToAjax('GET', url, dataToSend,
        function (response) {
            $('#Third_PartailConatiner').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

function StudentfourthboxWorksheets() {
    var ENoticeType = $('#SchoolwellcomepageFourthbtn').text();
    var IsGlobalNotice = $('#SchoolwellcomepageFourthbtn').attr('title');

    var dataToSend = {
        ENoticeType: ENoticeType,
        IsGlobalNotice: IsGlobalNotice
    };
    var url = '/UserScreens/WorkSheet';

    CallToAjax('GET', url, dataToSend,
        function (response) {
            $('#Four_PartailConatiner').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}

function StudentsixthboxWorksheets() {
    var ENoticeType = $('#SchoolwellcomepageSixthbtn').text();
    var IsGlobalNotice = $('#SchoolwellcomepageSixthbtn').attr('title');

    var dataToSend = {
        ENoticeType: ENoticeType,
        IsGlobalNotice: IsGlobalNotice
    };
    var url = '/UserScreens/Achievements';

    CallToAjax('GET', url, dataToSend,
        function (response) {
            $('#Sixth_PartailConatiner').html(response);
        },
        function (status, error) {
            // Handle error if needed
        }
    );
}