using Connect4m_Web.Models;
using Connect4m_Web.Models.LMSproperties;
using Connect4m_Web.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static Connect4m_Web.Models.Attendenceproperites.UserScreen;

namespace Connect4m_Web.Controllers
{
    [Authorize]
    public class UserScreens : Controller
    {

        // Uri baseaddress = new Uri("https://localhost:44331/api/UsersScreens");
        // HttpClient client;

        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;

        private readonly IUserService _userService;
        //==================  DECLARE THE PRIVATE VARIBLE FOR ASSIGNING THE VALUES FROM IUSERSERVICEINTERFACE(READ COOKIES)
        private readonly int UserId;
        private readonly int InstanceId;
        private readonly int InstanceClassificationId;
        private readonly int Roleid;
        private readonly int StudentUserid;

        public UserScreens(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/UsersScreens");


            //=======================================================
            _userService = userService;

            InstanceId = _userService.InstanceId;
            UserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            Roleid = _userService.Roleid;
            StudentUserid = _userService.StudentUserid;
        }
        CommanMethodClass CommonMethodobj = new CommanMethodClass();

        //===============================  Commonn Dropdown
        public List<SelectListItem> CommonDropdown(string methodname, string[] Parameters, string text, string value)
        {
            List<SelectListItem> DropdownList = new List<SelectListItem>();
            CommonDropdown obj = new CommonDropdown();
            obj.procedurename = methodname;
            obj.Parameters = Parameters;
            obj.text = text;
            obj.value = value;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/" + methodname, content).Result;
            //  HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/"+methodname+"?Parameters=" + Parameters + "&text=" + text + "&value=" + value).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                DropdownList = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return DropdownList;
        }
        public string GetCredits()
        {
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + $"/GetCredits?InstanceId={InstanceId}&Createdby={UserId}").Result;
            return response.IsSuccessStatusCode ? response.Content.ReadAsStringAsync().Result : string.Empty;
        }
        //===============================  Commonn Dropdown
        public IActionResult SchoolWelcomePage()
        {
            try
            {
                string roleName = Request.Cookies["RoleName"];
                ViewBag.LoginRoleName = roleName;

                if (roleName != null)
                {
                    roleName = roleName.ToUpper();
                    if (roleName == "ADMINISTRATOR")
                    {
                        return View();
                    }
                    else if(roleName == "TEACHER")
                    {
                        return View();
                    }
                    else if(roleName == "PARENT")
                    {
                        
                        return View();
                    }
                    else if (roleName == "STUDENT")
                    {
                        
                        return View();
                    }
                    else if (roleName == "School Admin")
                    {
                        return View();
                    }
                    else
                    {
                        return View();
                    }
                }     
                return View();
            }
            catch (Exception)
            {
                return View();
                throw;
            }
        }
        public IActionResult ParentLogin()
        {
            return View();
        }
        public IActionResult StudentLogin()
        {
            return View();
        }
        public IActionResult InstanceCategory_search()
        {
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_ENotice_SelectByNoticeType?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;
            string roleName = Request.Cookies["RoleName"];
            string role = roleName.ToUpper();
            int CategoryTypeId = 5;
            List<Categorytypes> item = new List<Categorytypes>();
             
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Categorytypes?InstanceId=" + InstanceId + "&CategoryTypeId=" + CategoryTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Categorytypes>>(data);
            }
            var result = new
            {
                RoleName = role,
                ItemList = item
            };

            return Json(result);



            //ViewBag.LoginUserid = UserId;
            //ViewBag.list = item; //CategoryTypeId = 5
            //ViewBag.items = item[0].CategoryName;
            //ViewBag.itemss = item[1].CategoryName;
            //return View();
        }

        //ROLE MENU LIST GETING ACTION METHOD 
        public IActionResult RoleMenulist()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var UserId = Request.Cookies["LoginUserId"];

            List<LoginDetailsListModel> Value2 = new List<LoginDetailsListModel>();
            using (var tempClient = _httpClientFactory.CreateClient())
            {
                string originalBaseAddress = client.BaseAddress.ToString();
                tempClient.BaseAddress = new Uri(originalBaseAddress.Replace("/UsersScreens", "/ApplyStudentAttendance"));

                LoginModel val = new LoginModel();
                val.UserId = Convert.ToInt32(UserId);
                val.RoleId = Convert.ToInt32(Request.Cookies["Roleid"]);
                val.InstanceID = Convert.ToInt32(InstanceId);
                string data11 = JsonConvert.SerializeObject(val);
                StringContent content = new StringContent(data11, Encoding.UTF8, "application/json");
                //  HttpResponseMessage response1 = client.PostAsync(client.BaseAddress + "/RoleMenuList", content).Result;
                HttpResponseMessage response1 = tempClient.PostAsync(tempClient.BaseAddress + "/RoleMenuList", content).Result;
                if (response1.IsSuccessStatusCode)
                {
                    string data1 = response1.Content.ReadAsStringAsync().Result;
                    Value2 = JsonConvert.DeserializeObject<List<LoginDetailsListModel>>(data1);
                    //  Value2.GroupBy(x => x.RoleMenuByRoleId[0].ParentMenuId);
                    // Value2.Add(new LoginDetailsListModel { RoleMenuByRoleId = new List<LoginModel>() { Value2.GroupBy(item => item.RoleMenuByRoleId.GroupBy(item2 => item2.MenuUrl != null)) } };

                    //            Value2.Add(new LoginDetailsListModel
                    //            {
                    //                RoleMenuByRoleId = Value2
                    //.GroupBy(item => item.RoleMenuByRoleId.Any(item2 => item2.MenuUrl != null))
                    //.Select(group => new LoginModel()) // Replace LoginModel with the actual type
                    //.ToList()
                    //            });


                    //  Value2[0].RoleMenuByRoleId = Value2.GroupBy(item => item.RoleMenuByRoleId.GroupBy(item2 => item2.MenuUrl != null));
                    // ViewBag.SideHeaderValues = Value2[0].RoleMenuByRoleId;
                    // ViewBag.SideHeaderValues = Value2;
                }
            }
            return Json(Value2);
        }


        #region SCHOOL WELCOME PAGE

        // STUDENT
        public IActionResult BestPerformer()
        {
            //exec stp_tblBestPerformer_Search @InstanceId=545,@Title=default,@IsWelcomePage=1

            string Title = default;
            int IsWelcomePage = 1;

            List<BestPerformer> item = new List<BestPerformer>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ScbestPerformer?InstanceId=" + InstanceId+ "&Title="+ Title+ "&IsWelcomePage="+ IsWelcomePage+"&Createdby="+UserId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<BestPerformer>>(data);
            }            
            return PartialView("_BestPerformer", item);
        }

        public IActionResult WorkSheet(string ENoticeType , int IsGlobalNotice)
        {
            List<Worksheetsdata> item = new List<Worksheetsdata>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ScWorksheet?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId + "&IsGlobalNotice=" + IsGlobalNotice).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Worksheetsdata>>(data);
            }
            return PartialView("_WorkSheet", item);
        }

        public IActionResult Achievements(string ENoticeType, int IsGlobalNotice)
        {
            List<Worksheetsdata> item = new List<Worksheetsdata>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ScWorksheet?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId + "&IsGlobalNotice=" + IsGlobalNotice).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Worksheetsdata>>(data);
            }
            return PartialView("_Achievements", item);
        }

        [HttpGet]
        public IActionResult Coollinks()
        {
            List<CoolLinks> item = new List<CoolLinks>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_coollinks?InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;               
                item = JsonConvert.DeserializeObject<List<CoolLinks>>(data);
            }
            item = item.OrderBy(link => link.LinkName).ToList();
            return PartialView("_Coollinks", item);
          
        }
        [HttpGet]
        public IActionResult FlashNews(string ENoticeType, int IsGlobalNotice)
        {           
            List<Flashnews> item = new List<Flashnews>();  
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_FlashNews?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId+ "&IsGlobalNotice="+ IsGlobalNotice).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Flashnews>>(data);
            }        
            return PartialView("_FlashNews", item);
        }

        [HttpGet]
        public IActionResult BirthdaysByInstance()
        {
            List<BirthdaysByInstance> item = new List<BirthdaysByInstance>();   
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetUserbirthdays?InstanceId=" + InstanceId+"&Createdby="+UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<BirthdaysByInstance>>(data);
            }
            ViewBag.Instanceidbyusephotodoc = "Instanceid" + InstanceId;
            ViewBag.instanceid = InstanceId;
            //ViewBag.PhotoNameFullName = "/UserPhotos/" + InstanceId + "/" + item[0].Photo + "/" + item[0].Photo;
            ViewBag.Usersbirthdays = item;
            return View();           
        }


        public IActionResult Timetablecriteria()
        {
            List<Timetablecriteria> item = new List<Timetablecriteria>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetTimetablecriterias?UserId=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Timetablecriteria>>(data);
            }
            ViewBag.Timetablecriteria = item;
            return View();
        }
        public IActionResult Newadmissionstudents()
        {
            List<Newadmissionstudents> item = new List<Newadmissionstudents>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Newstudentadmission?InstanceId=" + InstanceId+ "&UserId="+ UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Newadmissionstudents>>(data);
            }
            ViewBag.Newstudentadmissions = item;
            return View();
        }
        public IActionResult Studentsunderwithdrawal()
        {
            List<studentwithdrawal> item = new List<studentwithdrawal>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/StudentsUnderWithdrawal?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<studentwithdrawal>>(data);
            }
            ViewBag.Withdrawal = item;
            return View();
        }

        public IActionResult E_Noticeboard(string ENoticeType, int IsGlobalNotice)
        {
            //List<NoticeTypes> item = new List<NoticeTypes>();           
            List<Flashnews> item = new List<Flashnews>();           

            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_FlashNews?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId + "&IsGlobalNotice=" + IsGlobalNotice).Result;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_FlashNews?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId + "&IsGlobalNotice=" + 0).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                //item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
                item = JsonConvert.DeserializeObject<List<Flashnews>>(data);
            }
            ViewBag.Enotice = item;
            return View();
        }
        public IActionResult LeaveStatus()
        {
            studentstaffleaves item = new studentstaffleaves();
            try
            {
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/LeaveStatus?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    item = JsonConvert.DeserializeObject<studentstaffleaves>(data);
                }

                // Clean LeaveType data by removing HTML tags
                var cleanedLeaveTypes = item.leavetypes.Select(lt => RemoveHtmlTags(lt.LeaveType)).ToList();

                // Clean LeaveType for each item in leavetypes using the RemoveHtmlTags function
                var cleanedLeaveType = item.leavetypes.Select(lt => new leavetypes
                {
                    LeaveTypeId = lt.LeaveTypeId,
                    ShortName = lt.ShortName,
                    LeaveType = RemoveHtmlTags(lt.LeaveType), // Clean the LeaveType string
                    ApplicableFor = lt.ApplicableFor,
                    Total = lt.Total,
                    DaysUsed = lt.DaysUsed,
                    Approved = lt.Approved,
                    InProcess = lt.InProcess,
                    Available = lt.Available,
                    AvailableLink = RemoveAnchorTags(lt.AvailableLink)
                }).ToList();


                // Pass the cleaned LeaveType list to the view
                ViewBag.leavetypes = cleanedLeaveType;

                //ViewBag.leavetypes = item.leavetypes;
                ViewBag.studentstaffleavescount = item.studentstaffleavescount;
                ViewBag.studentwithdrawal = item.studentwithdrawal;
                ViewBag.leavestatus = item.leavestatus;
                return View();
            }
            catch (Exception)
            {
                int items = 0;
                return Json(items);                             
            }
        }
        public string RemoveAnchorTags(string input)
        {
            // Regular expression to remove the <a> tag and nested <u> tag content.
            string pattern = @"<a[^>]*>(.*?)<\/a>";

            // Remove the anchor tags and the content inside it (preserving inner text).
            string result = System.Text.RegularExpressions.Regex.Replace(input, pattern, "$1");

            // Optionally remove any remaining tags such as <font>, <b>, <i>, etc.
            result = System.Text.RegularExpressions.Regex.Replace(result, "<[^>]*?>", string.Empty);

            return result;
        }

        // Function to remove HTML tags
        private string RemoveHtmlTags(string input)
        {
            // Step 1: Remove <a> tags and everything inside them (including the <a> and </a> tags themselves)
            string withoutAnchorTags = System.Text.RegularExpressions.Regex.Replace(input, @"<a[^>]*>.*?<\/a>", string.Empty);

            // Step 2: Remove other HTML tags (e.g., <font>, <b>, <i>, etc.)
            string withoutHtmlTags = System.Text.RegularExpressions.Regex.Replace(withoutAnchorTags, "<[^>]*?>", string.Empty);

            // Step 3: Decode HTML entities (like &nbsp; to regular spaces)
            string decoded = System.Web.HttpUtility.HtmlDecode(withoutHtmlTags);

            // Step 4: Remove unwanted text like 'Lapsed: 1', including any leading/trailing spaces or newline characters
            string cleaned = System.Text.RegularExpressions.Regex.Replace(decoded, @"\s*Lapsed\s*[:\r\n]*\s*\d*\s*", string.Empty);

            // Optional: Further clean any extra spaces or newlines
            cleaned = System.Text.RegularExpressions.Regex.Replace(cleaned, @"\s+", " ").Trim();

            return cleaned;


            //// Remove HTML tags
            //string withoutHtmlTags = System.Text.RegularExpressions.Regex.Replace(input, "<[^>]*?>", string.Empty);

            //// Decode HTML entities (e.g., &nbsp; becomes a space)
            //string decoded = System.Web.HttpUtility.HtmlDecode(withoutHtmlTags);

            //return decoded;
            //return System.Text.RegularExpressions.Regex.Replace(input, "<[^>]*?>", string.Empty); // Regex to remove HTML tags
        }
        public IActionResult Absenteestudentsfortheday()
        {
            List<StudentleaveName> item = new List<StudentleaveName>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Studentstaffleaves?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<StudentleaveName>>(data);
            }
            ViewBag.StudentleaveName = item;            

            return View();
        }
        public IActionResult PostedQuestions()
        { 
            List<Posted_Questions> item = new List<Posted_Questions>();
            string CategoryId = "";//Int
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PostedQuestions?InstanceId=" + InstanceId + "&UserId=" + UserId+ "&CategoryId="+ CategoryId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Posted_Questions>>(data);
            }
            ViewBag.PostedQuestions = item;
            return View();
        }
        public IActionResult CalendarEvents(int MonthId)
        {            
            string EventTitle = "";
            DateTime today = DateTime.Today;
            int day = today.Day;
            //int MonthId = today.Month;
            int year = today.Year;
           
            DateTime EventDate = new DateTime(1, 1, 1, 0, 0, 0);
            List<EventsClander> item = new List<EventsClander>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/CalendarEvents?InstanceId=" + InstanceId + "&EventTitle=" + EventTitle + "&EventDate=" + EventDate + "&MonthId=" + MonthId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<EventsClander>>(data);
            }
            ViewBag.EventCalendar = item;
            return View();
        }
        #endregion

        #region STUDENT RESULTS 

        public IActionResult SearchForEresults()
        {
            return View();
        }

        [Authorize]
        public IActionResult Examnamesddl()
        {
            List<Studentresults> items = new List<Studentresults>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Examnamesddl?InstanceId=" + InstanceId+"&Userid="+UserId ).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<Studentresults>>(data);
            }
            return Json(items);
        }
        public IActionResult Examsdetailstbl(Studentresults studentresults)
        {
            ExamResults studentresultsobj = new ExamResults();
            studentresults.InstanceId = InstanceId;
            studentresults.CreatedBy = UserId;
            studentresults.UserId = UserId;
            studentresults.Examid = studentresults.Examid;
            string data11 = JsonConvert.SerializeObject(studentresults);
            StringContent content = new StringContent(data11, Encoding.UTF8, "application/json");
            HttpResponseMessage response1 = client.PostAsync(client.BaseAddress + "/Examdetailstbl", content).Result;
            if (response1.IsSuccessStatusCode)
            {
                string data1 = response1.Content.ReadAsStringAsync().Result;
                studentresultsobj = JsonConvert.DeserializeObject<ExamResults> (data1);

            }

            //List<Studentresults> list = CommonMethodobj.CommonListMethod<Studentresults, Studentresults>(studentresults, "/Examdetailstbl", client);
            return Json(studentresultsobj);
        }

        #endregion

        #region POST ATTENDANCE NEW

        public IActionResult PostAttendance()
        {
            // Initialize parameter array with InstanceId converted to string
            string[] parameter = new string[] { InstanceId.ToString(), UserId.ToString() ,"1"};

            // Retrieve the 'RoleName' cookie value from the request to determine the user role
            string roleName = Request.Cookies["RoleName"];

            // Declare variables to store credit information (Total, Used, Remaining)
            int TotalCredits = 0, UsedCredits = 0, RemCredits = 0;

            // Call GetCredits() function to retrieve the credits as a string
            string Credits = GetCredits();

            if (roleName.ToUpper()== "CLASS TEACHER")
            {
                ViewBag.Department = Teacher_attendanceclassification();
            }
            else
            {
                // Populate the 'Department' dropdown using a helper method to fetch the list of departments
                // The method CommonDropdown fetches the data from the database and binds it to the dropdown
                ViewBag.Department = CommonDropdown("GetDepartment", parameter, "ClassificationName", "InstanceClassificationId");
            }

            // Check if the Credits string is valid and not empty or "0"
            if (!string.IsNullOrEmpty(Credits) && Credits != "0")
            {
                // Split the Credits string into two parts (Limit and Used) based on the delimiter ", "
                var parts = Credits.Split(new[] { ", " }, StringSplitOptions.None);

                // Extract and parse the TotalCredits (Limit) from the first part of the string
                TotalCredits = int.Parse(parts[0].Substring("Limit: ".Length));

                // Extract and parse the UsedCredits from the second part of the string
                UsedCredits = int.Parse(parts[1].Substring("Used: ".Length));

                // Calculate the Remaining Credits by subtracting UsedCredits from TotalCredits
                RemCredits = TotalCredits - UsedCredits;
            }

            // Assign the calculated or default values to the ViewBag for use in the view
            ViewBag.TotalCredits = TotalCredits;  // Total available credits
            ViewBag.UsedCredits = UsedCredits;    // Credits already used
            ViewBag.RemCredits = RemCredits;      // Remaining credits

            // Pass the role name to the ViewBag to display the user's role (if needed in the view)
            ViewBag.rolename = roleName;

            // Return the view to render the page with the populated data
            return View();
        }


        #region METHOD FOR BINDING DROPDOWNS WITHOUT TEACHER LOGIN START
        public IActionResult DepartmentbySubclass(int InstanceClassificationId)
        {
            var response = client.GetAsync($"{client.BaseAddress}/Getsubclass?InstanceId={InstanceId}&InstanceClassificationId={InstanceClassificationId}").Result;
            if (response.IsSuccessStatusCode)
            {
                var data = response.Content.ReadAsStringAsync().Result;
                var Subclassli = JsonConvert.DeserializeObject<List<ManageSubClassification>>(data);
                return Json(Subclassli);
            }
            return Json(new List<ManageSubClassification>());
        }
        public IActionResult Attendanceslot(string ClassificationId, int SubClassificationId, int FilterTeachingSubjects)
        {
            int loginUserid = FilterTeachingSubjects == 1 ? UserId : default;

            var response = client.GetAsync($"{client.BaseAddress}/Getslotbysubclass?InstanceId={InstanceId}&ClassificationId={ClassificationId}&SubClassificationId={SubClassificationId}&FilterTeachingSubjects={FilterTeachingSubjects}&UserID={loginUserid}").Result;

            if (response.IsSuccessStatusCode)
            {
                var data = response.Content.ReadAsStringAsync().Result;
                var Value2 = JsonConvert.DeserializeObject<List<ManageSlots>>(data);
                return Json(Value2);
            }

            return Json(new List<ManageSlots>());
        }

        #endregion

        #region METHOD FOR BINDING TEACHER LOGIN DROPDOWNS START
        private List<SelectListItem> Teacher_attendanceclassification()
        {
            List<Teacherportalattendanceclassification> li = new List<Teacherportalattendanceclassification>();
            int DelegationClasses = 1;

            // Make the API call
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetClassesByTeacher?InstanceId=" + InstanceId + "&UserId=" + UserId + "&DelegationClasses=" + DelegationClasses).Result;
            // Check if the response is successful
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<Teacherportalattendanceclassification>>(data);
            }
            else
            { // Handle the case where the API call fails
              // You can log an error or return an empty list as a fallback
                return new List<SelectListItem>();
            }

            // Use LINQ to transform the data into SelectListItem format
            var items = li.Select(item => new SelectListItem
            {
                Value = item.INSTANCECLASSIFICATIONID.ToString(),
                Text = item.CLASSIFICATIONNAME.ToString()
            }).ToList();

            // Optionally, if you need subject items as well:
            var itemsubject = li.Select(item => new SelectListItem
            {
                Value = item.InstanceSubClassificationId.ToString(),
                Text = item.SubClassificationName.ToString()
            }).ToList();

            // You can return both lists or just one depending on your requirement.
            // For now, returning the 'items' list:
            return items;
        }

        public IActionResult Teacher_attendancesubclassification()
        {
            List<Teacherportalattendanceclassification> li = new List<Teacherportalattendanceclassification>();
            int DelegationClasses = 1;
            HttpResponseMessage CL_Response = client.GetAsync(client.BaseAddress + "/GetClassesByTeacher?InstanceId=" + InstanceId + "&UserId=" + UserId + "&DelegationClasses=" + DelegationClasses).Result;
            if (CL_Response.IsSuccessStatusCode)
            {
                string data = CL_Response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<Teacherportalattendanceclassification>>(data);
            }
            int licount = li.Count();
            var items = new List<SelectListItem>();
            var itemsubject = new List<SelectListItem>();
            for (int i = 0; i < licount; i++)
            {
                items.Add(new SelectListItem { Value = li[i].INSTANCECLASSIFICATIONID.ToString(), Text = li[i].CLASSIFICATIONNAME.ToString() });
                itemsubject.Add(new SelectListItem { Value = li[i].InstanceSubClassificationId.ToString(), Text = li[i].SubClassificationName.ToString() });
            }
            return Json(itemsubject);
        }

        #endregion

        public IActionResult PostAttendanceSave()
        {
            return View();
        }

        //============================ WHEN CLICK ON SAVE (POST THE MENTOR ATTENDANCE)
        //[HttpPost]
        ////public IActionResult PostAttendanceSave([FromBody] List<ClassAttendanceData> obj)
        ////public IActionResult PostAttendanceSave([FromBody] List<ClassAttendanceData> Attendances)
        //public IActionResult PostAttendanceSave_(IFormCollection form)
        //{
        [HttpPost]  // Ensure this attribute is added to indicate the method handles POST requests
        public IActionResult PostAttendanceSave_(IFormCollection form)
        {

            try
            {
                var attendancesJson = form["Attendances"];
                var attendances = JsonConvert.DeserializeObject<List<ClassAttendanceData>>(attendancesJson);

                if (attendances == null || !attendances.Any())
                {
                    return BadRequest("Invalid attendance data.");
                }

                //string date = "9/12/2024"; // Date in MM/dd/yyyy format
                //DateTime dateTime = DateTime.ParseExact(date, "M/d/yyyy", System.Globalization.CultureInfo.InvariantCulture);

                //Console.WriteLine(dateTime.ToString("dd/MM/yyyy"));  // Output: 09/12/2024


                if (attendances != null && attendances.Any())
                {
                    attendances[0].InstanceId = InstanceId;
                    attendances[0].CreatedBy = UserId;
                   // attendances[0].NotificationDate = Convert.ToDateTime(Request.Cookies["Attendancestartdate"]);
                    //attendances[0].SlotId = Convert.ToInt32(Request.Cookies["Attendanceslotid"]);
                    string jsonData = JsonConvert.SerializeObject(attendances);
                    StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/StudentAttendancePosting", content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string data = response.Content.ReadAsStringAsync().Result;
                        int list = JsonConvert.DeserializeObject<int>(data);
                        return Json(list);
                    }
                }
                return Json(0);
            }
            catch
            {
                return Json(0);
            }
        }

        //============================ GET STUDENT ATTENDANCE
        public IActionResult GetStudentAttendance(Studentattendancepost obj)
        {
            Response.Cookies.Append("Attendancestartdate", obj.StartDate.ToString());
            Response.Cookies.Append("Attendanceslotid", obj.SubclassificaitionId.ToString());
            Response.Cookies.Append("Attendance_InstanceClassificationId", obj.Departments.ToString());
            Response.Cookies.Append("AttendanceEndDate", obj.EndDate.ToString());
            obj.CreatedBy = UserId;
            obj.InstanceId = InstanceId;
            obj.SaturdayHoliday = 0;
            obj.SundayHoliday = 1;
            //obj.RoleName = "TEACHER,CLASS TEACHER";
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            List<AttendanceDetailsResponse> list = new List<AttendanceDetailsResponse>();

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GetStudentAttendanceDetails", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<AttendanceDetailsResponse>>(data);
                return Json(list);
            }
            return Json(list);
        }
        public string GenerateShowChangeActivityColumstringColumnString(DateTime StDate, DateTime EDate, int SubjectSlotID)
        {
            StringBuilder columnStringBuilder = new StringBuilder();
            int totalDays = (EDate - StDate).Days + 1;

            //Append the columns for the provided dates 
            int count = 0;
            for (int i = 0; i < totalDays; i++)
            {
                DateTime currentDate = StDate.AddDays(i);
                string convertedDate = currentDate.ToString("dd'/'MM'/'yyyy");
                int columnNumber = i + 1;
                columnStringBuilder.AppendFormat("[{0}] as column{1},[dbo].[fn_Get_AttendanceActivity](UserId," + SubjectSlotID + ",'" + convertedDate + "',NULL) as DisplayIcon{1},[dbo].[fn_Get_AttendanceId](UserId," + SubjectSlotID + ",'{0}',NULL) as AttendanceId{1},", convertedDate, columnNumber);
                count++;
            }
            int leng = 7 - count;
            for (int i = count + 1; i <= 7; i++)
            {
                columnStringBuilder.AppendFormat("NULL as column{0},0 as DisplayIcon{0},NULL as AttendanceId{0},", i);
            }

            return columnStringBuilder.ToString();
        }

        public IActionResult Getstaffleavetypesddl()
        {
            List<CommonDropdown> list = new List<CommonDropdown>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetAttendanceTypesddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<CommonDropdown>>(data);
                return Json(list);
            }
            return Json(list);
        }
        #endregion

    }
}
