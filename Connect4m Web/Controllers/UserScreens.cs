using Connect4m_Web.Models;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)
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


        //----------------------------------------------------



        //Created by rk
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


        #region SchoolWelcomePage

        // STUDENT
        public IActionResult BestPerformer()
        {
            //exec stp_tblBestPerformer_Search @InstanceId=545,@Title=default,@IsWelcomePage=1

            string Title = default;
            int IsWelcomePage = 1;

            List<BestPerformer> item = new List<BestPerformer>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ScbestPerformer?InstanceId=" + InstanceId+ "&Title="+ Title+ "&IsWelcomePage="+ IsWelcomePage).Result;

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
            List<NoticeTypes> item = new List<NoticeTypes>();  
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_FlashNews?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId+ "&IsGlobalNotice="+ IsGlobalNotice).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
            }        
            return PartialView("_FlashNews", item);

        }

        [HttpGet]
        public IActionResult BirthdaysByInstance()
        {
            List<BirthdaysByInstance> item = new List<BirthdaysByInstance>();       

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BirthdaysByInstance?InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<BirthdaysByInstance>>(data);
            }        
            return PartialView("_BirthdaysByInstance", item);
        }

        public IActionResult E_Noticeboard(string ENoticeType, int IsGlobalNotice)
        {
            List<NoticeTypes> item = new List<NoticeTypes>();           

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_FlashNews?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId + "&IsGlobalNotice=" + IsGlobalNotice).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
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

                ViewBag.leavetypes = item.leavetypes;
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

        //exec stp_tblInstanceQuestions_SelectOthersQuestion @InstanceId=545,@AssignedToId=32891,@CategoryId=default 
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
    }
}
