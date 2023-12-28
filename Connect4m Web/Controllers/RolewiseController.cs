using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Connect4m_Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Connect4m_Web.Controllers
{
    [Authorize]
    public class RolewiseController : Controller
    {
        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;

        private readonly IUserService _userService;
        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)
        private readonly int UserId;
        private readonly int InstanceId;
        private readonly int InstanceClassificationId;
        private readonly int Roleid;
        private readonly int StudentUserid;

        public RolewiseController(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/Roles");
            //=======================================================
            _userService = userService;

            InstanceId = _userService.InstanceId;
            UserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            Roleid = _userService.Roleid;
            StudentUserid = _userService.StudentUserid;


        }

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



        #region Role Menu Insert and Update
        //--------------------------------  Search Rolewise--menu
        public IActionResult SearchRolewise()
        {
            return View();
        }

        public IActionResult SearchRoles(string RoleName, string RoleDescription)
        {
            /// int InstanceId =Convert.ToInt32(Request.Cookies["INSTANCEID"]);
            List<RoleProp> list = new List<RoleProp>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchRole?InstanceId=" + InstanceId + "&RoleName=" + RoleName + "&RoleDescription=" + RoleDescription).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<RoleProp>>(data);
            }
            return Json(list);
        }

        //----------------------------  Delete  Roles
        public IActionResult DeleteRole(int InstanceRoleId)
        {
            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/DeleteRoles?InstanceRoleId=" + InstanceRoleId).Result;
            if (response4.IsSuccessStatusCode)
            {
                string data = response4.Content.ReadAsStringAsync().Result;
                int list4 = JsonConvert.DeserializeObject<int>(data);
                return Json(list4);
            }
            return Json(0);
        }


        //------------------------------------------------------------- --------------------------------------  Create Role
        public IActionResult CreateRole(int InstanceRoleId)
        {

            List<RoleMenu> list = new List<RoleMenu>();
            ParentRoleMenu parentlist = new ParentRoleMenu();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/CreateRole?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<RoleMenu>>(data);
                // var groupedByParentId =  list.GroupBy(item => item.ParentMenuId);


            }
            if (InstanceRoleId != 0)
            {
                HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetUpdate?InstanceRoleId=" + InstanceRoleId + "&InstanceId=" + InstanceId).Result;
                if (response2.IsSuccessStatusCode)
                {
                    string data = response2.Content.ReadAsStringAsync().Result;
                    parentlist = JsonConvert.DeserializeObject<ParentRoleMenu>(data);

                    ViewBag.item3 = parentlist.Secondtable;

                    list = list.Select(item =>
                    {
                        var matchingItem = parentlist.Secondtable.FirstOrDefault(x => x.InstanceMenuId == item.InstanceMenuId);
                        if (matchingItem != null)
                        {
                            item.Ischecked = 1;
                        }
                        return item;
                    }).ToList();


                }
            }
            var groupedByParentId = list.GroupBy(item => item.ParentMenuId != "");

            ViewBag.item1 = groupedByParentId.FirstOrDefault();

            ViewBag.item2 = groupedByParentId.ElementAt(1);
            if (InstanceRoleId != 0)
            {
                RoleProp new1 = parentlist.FirstTable[0];
                return View(new1);
            }
            return View();

        }
        [HttpPost]
        public IActionResult CreateRole(RoleProp obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string commaSeparatedIds = string.Join(",", obj.AuthMenuIds);

            string jsonData = JsonConvert.SerializeObject(obj);
            Response.Cookies.Append("MenuId_Display", commaSeparatedIds);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response;
            if (obj.InstanceRoleId != 0)
            {
                response = client.PostAsync(client.BaseAddress + "/UpdateRoles", content).Result;
            }
            else
            {
                response = client.PostAsync(client.BaseAddress + "/InsertRoles", content).Result;
            }
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list3 = JsonConvert.DeserializeObject<int>(data);
                if (obj.InstanceRoleId != 0)
                {
                    Response.Cookies.Append("Roleid_Display", obj.InstanceRoleId.ToString());

                }
                else
                {
                    Response.Cookies.Append("Roleid_Display", list3.ToString());

                }
                return Json(list3);
            }

            return Json(0);
        }

        public IActionResult RoleAvailabilty(string RoleName, int RoleId)
        {
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/RoleAvailabilty?InstanceId=" + InstanceId + "&RoleName=" + RoleName + "&RoleId=" + RoleId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                string retur = JsonConvert.DeserializeObject<string>(data);
                return Json(retur);
            }
            return Json(0);
        }
        [HttpGet]
        public IActionResult DisplayOrder(int i)
        {
            return View();
        }
        [HttpPost]
        public IActionResult DisplayOrder()
        {
            List<RoleMenu> list = new List<RoleMenu>();
            AftercreteRole obj = new AftercreteRole();
            obj.InstanceId = InstanceId;
            obj.Roleid = Request.Cookies["Roleid_Display"];
            obj.MenuId = Request.Cookies["MenuId_Display"];
            string jsondata = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsondata, Encoding.UTF8, "application/json");


            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/AfterCreateRole", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<RoleMenu>>(data);
                return Json(list);
            }
            return Json(list);



        }
        public IActionResult DeleteDisplayOrder()
        {
            RoleMenu obj = new RoleMenu();
            obj.CreatedBy = UserId;
            obj.InstanceId = InstanceId;
            obj.RoleId = Convert.ToInt32(Request.Cookies["Roleid_Display"]);
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/DeleteDisplayOrder", content).Result;
            //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/AfterCreateRole?InstanceId=" + InstanceId + "&Roleid=" + Request.Cookies["Roleid_Display"] + "&MenuId=" + Request.Cookies["MenuId_Display"]).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list = JsonConvert.DeserializeObject<int>(data);
                return Json(list);
            }

            return Json(0);
        }







        [HttpPost]
        //    Update The Display Order 
        public IActionResult UpdateDisplayOrder(RoleMenu obj)
        {
            obj.CreatedBy = UserId;
            obj.InstanceId = InstanceId;
            obj.RoleId = Convert.ToInt32(Request.Cookies["Roleid_Display"]);
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/UpdateDisplayOrder", content).Result;
            //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/AfterCreateRole?InstanceId=" + InstanceId + "&Roleid=" + Request.Cookies["Roleid_Display"] + "&MenuId=" + Request.Cookies["MenuId_Display"]).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list = JsonConvert.DeserializeObject<int>(data);
                return Json(list);
            }

            return Json(0);
        }

        #endregion


        #region  Mentor Attendance Posting (Post Attendance)

        //------------------------------------------------------------- --------------------------------------  Post Attendance
        public IActionResult PostAttendance()
        {
            string[] parameter = new string[] { InstanceId.ToString() };

            ViewBag.Department = CommonDropdown("GetDepartment", parameter, "ClassificationName", "InstanceClassificationId");    /* new List<SelectListItem>();//---------------------  Getting  Department*/
            ViewBag.Slots = CommonDropdown("GetSlots", parameter, "SlotName", "SlotId");         /* new List<SelectListItem>();//---------------------  Getting  Slots*/
            ViewBag.Mentors = new List<SelectListItem>();   //  CommonDropdown("GetRoleEAP", parameter, "SlotName", "SlotId");  /* new List<SelectListItem> { new SelectListItem { Value = "123", Text = "sree" }, new SelectListItem { Value = "123", Text = "sree" }, new SelectListItem { Value = "123", Text = "sree" } };//----------------*/
            ViewBag.instancceidME = InstanceId;

            return View();

        }

        //==========================  Get Mentor Attendance


        public IActionResult GetMentorAttendance(MentorAttedanceProp obj)
        {
            // obj.ErrorModuleName = "Rolewise/PostAttendanceSave";

            Response.Cookies.Append("Attendancestartdate", obj.StartDate.ToString());
            Response.Cookies.Append("Attendanceslotid", obj.Slots.ToString());
            Response.Cookies.Append("Attendance_InstanceClassificationId", obj.Department.ToString());
            Response.Cookies.Append("AttendanceEndDate", obj.EndDate.ToString());
            obj.CreatedBy = UserId;
            obj.InstanceId = InstanceId;
            obj.RoleName = "TEACHER,CLASS TEACHER";
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            List<MentorAttedancePropList> list = new List<MentorAttedancePropList>();

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GetMentorAttendance", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<MentorAttedancePropList>>(data);
                return Json(list);
            }



            return Json(list);


        }
        public IActionResult PostAttendanceSave()
        {

            return View();

        }

        //=========================================   When Click On Save (post the mentor attendance)


        [HttpPost]
        public IActionResult PostAttendanceSave([FromBody] List<AttendanceData> obj)
        {
            //obj.InstanceId = InstanceId;
            try
            {
                obj[0].CreatedBy = UserId;

                obj[0].startdate = Convert.ToDateTime(Request.Cookies["Attendancestartdate"]);
                obj[0].SubjectSlotID = Request.Cookies["Attendanceslotid"];
                string jsonData = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");


                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/MentorAttendancePosting", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    int list = JsonConvert.DeserializeObject<int>(data);
                    return Json(list);
                }
                return Json(0);
            }
            catch
            {
                return Json(0);
            }

        }




        //==============================  Delete Thew Attendance  

        public IActionResult AttendanceDelete()
        {
            AttendanceDelete obj = new AttendanceDelete();
            try
            {
                //obj.CreatedBy = UserId;
                obj.InstanceId = InstanceId;
                obj.RoleName = "TEACHER,CLASS TEACHER";

                obj.StartDate = Convert.ToDateTime(Request.Cookies["Attendancestartdate"]);
                obj.SubjectSlotID = Convert.ToInt32(Request.Cookies["Attendanceslotid"]);
                obj.EndDate = Convert.ToDateTime(Request.Cookies["AttendanceEndDate"]);
                obj.InstanceClassificationId = Convert.ToInt32(Request.Cookies["Attendance_InstanceClassificationId"]);
                string jsonData = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");


                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/MentorAttendanceDelete", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    int list = JsonConvert.DeserializeObject<int>(data);
                    return Json(list);
                }
                return Json(0);
            }
            catch
            {
                return Json(0);
            }

        }


        #endregion


        #region   Mentor Attendance Register

        //------------------------------------------------------------- --------------------------------------  Search Attendance Register
        public IActionResult StaffAttendanceRegister()
        {
            List<SelectListItem> list5 = new List<SelectListItem>();
            HttpResponseMessage response5 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=MONTH").Result;
            if (response5.IsSuccessStatusCode)
            {
                string data = response5.Content.ReadAsStringAsync().Result;
                list5 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Months = list5;//----------------------------------  Get Months
            Commonclass obj = new Commonclass();
            ViewBag.Years = obj.GetYears();//-------------------------  Get Years

            string[] parameter = new string[] { InstanceId.ToString() };
            ViewBag.instancceidME = InstanceId.ToString();
            ViewBag.Department = CommonDropdown("GetDepartment", parameter, "ClassificationName", "InstanceClassificationId");    /* new List<SelectListItem>();//---------------------  Getting  Department*/
            ViewBag.PayrollCategory = CommonDropdown("GetPayrollCategory", parameter, "PayrollCategoryName", "PayrollCategoryId");         /* new List<SelectListItem>();//---------------------  Getting  Slots*/
            ViewBag.PayRollSubCategory = new List<SelectListItem>();
            ViewBag.LMSCategory = CommonDropdown("GetLMSCategory", parameter, "PayrollCategoryName", "PayrollCategoryId");
            ViewBag.LMSSubCategory = CommonDropdown("GetLMSsubCategory", parameter, "PayrollSubCategoryName", "PayrollSubCategoryId");
            return View();

        }



        [HttpPost]
        public IActionResult StaffAttendanceRegister(StaffAttendance obj)
        {
            List<StaffMonthAttendance> StudentNamesList = new List<StaffMonthAttendance>();
            obj.InstanceId = InstanceId;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SearchStaffAttendance", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                StudentNamesList = JsonConvert.DeserializeObject<List<StaffMonthAttendance>>(data);
                return Json(StudentNamesList);
            }

            return Json(StudentNamesList);
        }


        public IActionResult StaffattendanceSearch()
        {
            return View();
        }

        #endregion

        #region    STAFF MONTHLY LEAVE REPORT
        //------------------------------------------------------------- --------------------------------------  STAFF MONTHLY LEAVE REPORT
        public IActionResult StaffMonthlyLeaveReport() //Rolewise/StaffMonthlyLeaveReport
        {
            List<SelectListItem> list5 = new List<SelectListItem>();
            HttpResponseMessage response5 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=MONTH").Result;
            if (response5.IsSuccessStatusCode)
            {
                string data = response5.Content.ReadAsStringAsync().Result;
                list5 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Months = list5;//----------------------------------  Get Months
         //   Commonclass obj = new Commonclass();
          //  ViewBag.Years = obj.GetYears();//-------------------------  Get Years

            string[] parameter = new string[] { InstanceId.ToString() };
            ViewBag.instancceidME = InstanceId.ToString();
            ViewBag.Department = CommonDropdown("GetDepartment", parameter, "ClassificationName", "InstanceClassificationId");    /* new List<SelectListItem>();//---------------------  Getting  Department*/
          
            ViewBag.EmployeeNames = new List<SelectListItem>();
            return View();

        }



        [HttpPost]
        public IActionResult StaffMonthlyLeaveReport(StaffLeave obj)
        {
            List<StaffMonthLeave> StudentNamesList = new List<StaffMonthLeave>();
            obj.InstanceId = InstanceId;
         
            obj.Year = DateTime.Now.Year.ToString();
            obj.EndYear = DateTime.Now.Year.ToString();

            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SearchStaffMonthlyReport", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                StudentNamesList = JsonConvert.DeserializeObject<List<StaffMonthLeave>>(data);
                return Json(StudentNamesList);
            }

            return Json(StudentNamesList);
        }


        public IActionResult StaffLeaveSearch()
        {
            return View();
        }


        #endregion

    }
}
