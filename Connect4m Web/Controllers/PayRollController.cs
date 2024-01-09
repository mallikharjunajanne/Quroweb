using Connect4m_Web.Models;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Connect4m_Web.Controllers
{
    [Authorize]               // problem in 02  BASIC
    public class PayRollController : Controller
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


        public PayRollController(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/PayRoll");

            //=======================================================
            _userService = userService;

            InstanceId = _userService.InstanceId;
            UserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            Roleid = _userService.Roleid;
            StudentUserid = _userService.StudentUserid;

        }
        //// public int InstanceId = 545;
        ////-------------------College Admin
        // public int UserId = 11337;
        // public int RoleId = 571;
        // public int StudentUserId = 29255;//-----Student Login


        // public int InstanceId = 515;//------http://collegedev.connect4m.com/    CollegeAdmin
       
        public IActionResult Index()
        {
            return View();
        }
      
        public IActionResult ChangeActivity(string AuditKey, int SourceId, string Name)
        {
            List<ChangeActivity> list = new List<ChangeActivity>();


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ChangeActivity?AuditKey=" + AuditKey + "&SourceId=" + SourceId + "&TableName=tbl" +Name).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ChangeActivity>>(data);
            }

            return  PartialView("_ChangeActivity",list);
        }
        [Authorize]
        public List<SelectListItem> CommonDropdown(string methodname,string[] Parameters,  string text, string value)
        {
            List<SelectListItem> DropdownList = new List<SelectListItem>();
            CommonDropdown obj = new CommonDropdown();
            obj.procedurename = methodname;
            obj.Parameters = Parameters;
            obj.text = text;
            obj.value = value;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/"+methodname, content).Result;
          //  HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/"+methodname+"?Parameters=" + Parameters + "&text=" + text + "&value=" + value).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                DropdownList = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return DropdownList;
        }




        //public static string DecryptString(string key, string cipherText)
        //{
        //    byte[] iv = new byte[16];
        //    byte[] buffer = Convert.FromBase64String(cipherText);
        //    using (Aes aes = Aes.Create())
        //    {
        //        aes.Key = Encoding.UTF8.GetBytes(key);
        //        aes.IV = iv;
        //        ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
        //        using (MemoryStream memoryStream = new MemoryStream(buffer))
        //        {
        //            using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
        //            {
        //                using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
        //                {
        //                    return streamReader.ReadToEnd();
        //                }
        //            }
        //        }
        //    }
        //}

        public IActionResult StepsControl(string url)
        {
            if (url != null)
            {
                ViewBag.url = url;
            }

            // using (var client = _httpClientFactory.CreateClient())
            // {

            //   HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetDepartment?InstanceId=" + 545).Result;



            //  }

            return View();
        }
        //-----------------------------------------  01  ---------------------------CONFIGURE SALARY ATTRIBUTES--------------------------------------------------------------------------------------------------
        #region
        public IActionResult SearchSalaryAttributes()
        {
            //--------------------------  Gettting Salary Attrubute  Master Id  Droppdown
            List<SelectListItem> SalaryAttributeMasterId = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SalaryAttributes?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                SalaryAttributeMasterId = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SalaryAttributeMasterId = SalaryAttributeMasterId;
            //--------------------------  Gettting Salary Attrubute Type is Droppdown
            List<SelectListItem> SalaryAttributeType = new List<SelectListItem>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/SalaryType").Result;
            if (response2.IsSuccessStatusCode)
            {
                string data = response2.Content.ReadAsStringAsync().Result;
                SalaryAttributeType = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SalaryAttributeType = SalaryAttributeType;
            //--------------------------  Data Add for  Is Active
            List<SelectListItem> IsActive = new List<SelectListItem>
{
    new SelectListItem
    {
        Value = "1",
        Text = "True"
    },
    new SelectListItem
    {
        Value = "2",
        Text = "False"
    }
};

            ViewBag.IsActive = IsActive;


            return View();
        }
        //---------------------------------------------------------------------------------------------------  Search Salary Attribute Json Type

        public IActionResult SearchSalaryAttributesJson(int SalaryAttributeMasterId, int SalaryAttributeType, string SalaryAttributeName, string StartDate, string EndDate, int IsActive)
        {
            List<PayRollproperties> list = new List<PayRollproperties>();


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchSAlaryattributes?InstanceId=" + InstanceId + "&SalaryAttributeMasterId=" + SalaryAttributeMasterId + "&SalaryAttributeType=" + SalaryAttributeType + "&SalaryAttributeName=" + SalaryAttributeName + "&StartDate=" + StartDate + "&EndDate=" + EndDate + "&IsActive=" + IsActive).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<PayRollproperties>>(data);
            }

            return Json(list);
        }
        //---------------------------------------------------------------------------------------------------  Delete SAlary Attribute
        public IActionResult DeleteSAlaryAttribute(int InstanceSalaryAttributeId)
        {

            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/DeleteSAlaryAttribute?InstanceSalaryAttributeId=" + InstanceSalaryAttributeId + "&InstanceId=" + InstanceId + "&UpdatedBy=" + UserId).Result;
            if (response4.IsSuccessStatusCode)
            {

                string data = response4.Content.ReadAsStringAsync().Result;
                int list4 = JsonConvert.DeserializeObject<int>(data);

                return Json(list4);
            }


            return Json(0);
        }

        public List<SelectListItem> SalDependson(int ParentId)
        {
            List<SelectListItem> SalaryPayRollDependson = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/DependsOn?ParentId=" + ParentId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                SalaryPayRollDependson = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return SalaryPayRollDependson;
        }



        //------------------------------------------------------------- --------------------------------------  Create Salary Attributes
        public IActionResult CreateSalaryAttribute(int InstanceSalaryAttributeId)
        {
            //--------------------------  Gettting Salary Attrubute  Master Id  Droppdown
            List<SelectListItem> SalaryAttributeMasterId = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SalaryAttributes?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                SalaryAttributeMasterId = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SalaryAttributeMasterId = SalaryAttributeMasterId;
            //--------------------------  Gettting Salary Attrubute Type is Droppdown
            List<SelectListItem> SalaryAttributeType = new List<SelectListItem>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/SalaryType").Result;
            if (response2.IsSuccessStatusCode)
            {
                string data = response2.Content.ReadAsStringAsync().Result;
                SalaryAttributeType = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SalaryAttributeType = SalaryAttributeType;
            //-------------------------- Getting Depend On 
            ViewBag.SalDependsOn = SalDependson(1);
            if (InstanceSalaryAttributeId != 0)
            {
                PayRollproperties list = new PayRollproperties();
                HttpResponseMessage responselist = client.GetAsync(client.BaseAddress + "/GetUpdateSAlaryAttribute?InstanceId=" + InstanceId + "&InstanceSalaryAttributeId=" + InstanceSalaryAttributeId).Result;
                if (responselist.IsSuccessStatusCode)
                {
                    string data = responselist.Content.ReadAsStringAsync().Result;
                    list = JsonConvert.DeserializeObject<PayRollproperties>(data);
                }
                ViewBag.InstanceSalaryAttributeId = InstanceSalaryAttributeId;
                ViewBag.SalDependsOn = SalDependson(Convert.ToInt32(list.SalaryAttributeType));
                return View(list);
            }



            return View();
        }
        [HttpPost]
        public IActionResult CreateSalaryAttribute(PayRollproperties obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response;
            if (obj.InstanceSalaryAttributeId != 0)
            {
                response = client.PostAsync(client.BaseAddress + "/UpdateSAlaryAttribute", content).Result;
            }
            else
            {
                response = client.PostAsync(client.BaseAddress + "/InsertSAlaryAttribute", content).Result;
            }
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list3 = JsonConvert.DeserializeObject<int>(data);
                return Json(list3);
            }

            return Json(0);
        }

        #endregion
        //------------------------------------------02------------------------- Manage Salary Attributes For Roles
        #region
        //-----------------------------------------------------------------------------   Search Salary Attributes For Roles
        public IActionResult SearchSalaryAttributesForRoles()
        {
            return View();
        }
        //----------------------------------------------------------------------------- Getting The Json Data  Search Salary Attributes For Roles
        public IActionResult SearchSalaryAttributesForRolesJson(string RoleName,string RoleDescription)
        {
            List<SalaryAttributesforRoles> list = new List<SalaryAttributesforRoles>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchSAlaryattributesforRoles?InstanceId=" + InstanceId + "&RoleName=" + RoleName + "&RoleDescription=" + RoleDescription).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SalaryAttributesforRoles>>(data);
            }
            return Json(list);
        }
        //----------------------------------------------------------------------------- Getting The Json Data  Search Salary Attributes For Roles
        public IActionResult CreateSalaryAttributesForRoles(int UserId, string RoleName,int SalaryAttributeId)
        {
            if (UserId != 0)
            {
                Response.Cookies.Append("UerIdSAR",UserId.ToString());
            }
          
           
            Response.Cookies.Append("SalaryAttributeId_SAR", SalaryAttributeId.ToString());
            List<SelectListItem> list = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SalaryAttributesforRoles?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            if(RoleName!=null)
            {
                Response.Cookies.Append("RollName_SAR", RoleName);
                ViewBag.RoleName = RoleName;
            }
            else{
                ViewBag.RoleName = Request.Cookies["RollName_SAR"];
            }
          
            ViewBag.InstanceSalaryAttributeId = list;

          
            if (SalaryAttributeId!=0)
            {
             
                HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetUpdateSAlaryAttributeforRoles?SalaryAttributeId=" + SalaryAttributeId).Result;
                if (response2.IsSuccessStatusCode)
                {
                  
                    string data = response2.Content.ReadAsStringAsync().Result;
                    SalaryAttributesforRoles list2 = JsonConvert.DeserializeObject<SalaryAttributesforRoles>(data);
                    
                    Response.Cookies.Append("InstanceSalaryAttributeId_SAR", list2.InstanceSalaryAttributeId.ToString());
                    ViewBag.SalaryAttributeId = SalaryAttributeId;
                    return View(list2);
                }
            }
           
            return View();
        }
        [HttpPost]
        public IActionResult CreateSalaryAttributesForRoles(SalaryAttributesforRoles obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.SalaryAttributeId = Convert.ToInt32(Request.Cookies["SalaryAttributeId_SAR"]);
            if (obj.SalaryAttributeId != 0)
            {
                obj.InstanceSalaryAttributeId =Convert.ToInt32(Request.Cookies["InstanceSalaryAttributeId_SAR"]);
            }
                string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response;
            if (obj.SalaryAttributeId != 0)
            {
                response = client.PostAsync(client.BaseAddress + "/UpdateSalaryAttributesForRoles", content).Result;
            }
            else
            {
                response = client.PostAsync(client.BaseAddress + "/InsertSalaryAttributesForRoles", content).Result;
            }
       
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                string list = JsonConvert.DeserializeObject<string>(data);
                return Json (list);
            }
            return Json(0);
           
        }
        //--------------------------------------------------------------------------------------Check Is Percentage Or Salary Attribute
        public bool Checkispercentage(string SalaryAttributeMasterName)
        {
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Checkispercentage?InstanceId=" + InstanceId + "&SalaryAttributeMasterName="+ SalaryAttributeMasterName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
              bool  list = JsonConvert.DeserializeObject<bool>(data);
                return list;
            }
            return false;
        }

        //----------------------------------------------------------------------------- Getting The Json Data  Search Salary Attributes For Roles
        public IActionResult GetindividualRecords(int userId)
        {
            if (userId == 0)
            {
                userId = Convert.ToInt32(Request.Cookies["UerIdSAR"]);
            }
           
            List<SalaryAttributesforRoles> list = new List<SalaryAttributesforRoles>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetindividualRecords?userId=" + userId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SalaryAttributesforRoles>>(data);
            }
            return Json(list);
        }
        #endregion
        //------------------------------------------03--------------------   Manage Category
        #region
        //-----------------------------------------------------------------------------   Search Manage Category
        public IActionResult SearchManageCatogory()
        {
            return View();
        }

        public IActionResult SearchManageCategoryJson(string PayrollCategoryName, int isLeaveApplicable)
        {
            int IsPayRollApplicable = 1;
            if (isLeaveApplicable == 1)
            {
                IsPayRollApplicable = 0;
            }
            if (isLeaveApplicable == 2)
            {
                isLeaveApplicable = 1;
            }

            List<ManageCategory> list = new List<ManageCategory>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchManageCategory?InstanceId=" + InstanceId + "&PayrollCategoryName=" + PayrollCategoryName + "&isPayrollApplicable=" + IsPayRollApplicable + "&isLeaveApplicable=" + isLeaveApplicable ).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ManageCategory>>(data);
            }
            return Json(list);
        }
        //---------------------------------------------------------------------------------------------------  Delete SAlary Attribute
        public IActionResult DeleteManageCategory(int PayrollCategoryId)
        {

            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/DeleteManageCategory?InstanceId=" + InstanceId + "&PayrollCategoryId=" + PayrollCategoryId + "&UpdatedBy=" + UserId).Result;
            if (response4.IsSuccessStatusCode)
            {

                string data = response4.Content.ReadAsStringAsync().Result;
                int list4 = JsonConvert.DeserializeObject<int>(data);

                return Json(list4);
            }


            return Json(0);
        }
        //------------------------------------------------------------- --------------------------------------  Create Manage Category
        public IActionResult CreateManageCategory(int PayrollCategoryId)
        {
           
            if (PayrollCategoryId != 0)
            {
                ManageCategory list = new ManageCategory();
                HttpResponseMessage responselist = client.GetAsync(client.BaseAddress + "/GetUpdateManageCategory?InstanceId=" + InstanceId + "&PayrollCategoryId=" + PayrollCategoryId).Result;
                if (responselist.IsSuccessStatusCode)
                {
                    string data = responselist.Content.ReadAsStringAsync().Result;
                    list = JsonConvert.DeserializeObject<ManageCategory>(data);
                }
              //  ViewBag.PayrollCategoryId = PayrollCategoryId;
             
                if (list.isLeaveApplicable == 1 && list.isPayrollApplicable==1)
                {
                   
                    list.isLeaveApplicable = 2;
                }
                list.PayrollCategoryId = PayrollCategoryId;

                return View(list);
            }

            return View();
        }
        [HttpPost]
        public IActionResult CreateManageCategory(ManageCategory obj)
        {

            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            if (obj.isLeaveApplicable == 0)
            {
                obj.isPayrollApplicable = 1;
            }
            if (obj.isLeaveApplicable == 2)
            {
                obj.isPayrollApplicable = 1;
                obj.isLeaveApplicable = 1;
            }
            if (obj.PayrollCategoryDescription == null)
            {
                obj.PayrollCategoryDescription = " ";
            }
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response;
           

            if (obj.PayrollCategoryId != 0)
            {
                response = client.PostAsync(client.BaseAddress + "/UpdateManageCategory", content).Result;
            }
            else
            {
                response = client.PostAsync(client.BaseAddress + "/InsertManageCategory", content).Result;
            }

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                string list = JsonConvert.DeserializeObject<string>(data);
                return Json(list);
            }
            return Json(0);

        }


        #endregion

        //-----------------------------------------04---------------------   Manage  Sub Category
        #region
        //-----------------------------------------------------------------------------   Search  Manage Sub Category
        public IActionResult SearchManageSubCatogory()
        {
            return View();
        }

        public IActionResult SearchManageSubCategoryJson(string PayrollSubCategoryName, int isLeaveApplicable)
        {
            int IsPayRollApplicable = 1;
            if (isLeaveApplicable == 1)
            {
                IsPayRollApplicable = 0;
            }
            if (isLeaveApplicable == 2)
            {
                isLeaveApplicable = 1;
            }

            List<ManageSubCategory> list = new List<ManageSubCategory>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchManageSubCategory?InstanceId=" + InstanceId + "&PayrollSubCategoryName=" + PayrollSubCategoryName + "&isPayrollApplicable=" + IsPayRollApplicable + "&isLeaveApplicable=" + isLeaveApplicable).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ManageSubCategory>>(data);
            }
            return Json(list);
        }
        //---------------------------------------------------------------------------------------------------  Delete SAlary Attribute
        public IActionResult DeleteManageSubCategory(int PayrollSubCategoryId)
        {

            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/DeleteManageSubCategory?InstanceId=" + InstanceId + "&PayrollSubCategoryId=" + PayrollSubCategoryId + "&UpdatedBy=" + UserId).Result;
            if (response4.IsSuccessStatusCode)
            {

                string data = response4.Content.ReadAsStringAsync().Result;
                int list4 = JsonConvert.DeserializeObject<int>(data);

                return Json(list4);
            }


            return Json(0);
        }
        //------------------------------------------------------------- --------------------------------------  Create Manage Category
        public IActionResult CreateManageSubCategory(int PayrollSubCategoryId)
        {

            List<SelectListItem> categoryList = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Category?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                categoryList = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.PayrollCategoryId = categoryList;

            if (PayrollSubCategoryId != 0)
            {
                ManageSubCategory list = new ManageSubCategory();
                HttpResponseMessage responselist = client.GetAsync(client.BaseAddress + "/GetUpdateManageSubCategory?PayrollSubCategoryId=" + PayrollSubCategoryId).Result;
                if (responselist.IsSuccessStatusCode)
                {
                    string data = responselist.Content.ReadAsStringAsync().Result;
                    list = JsonConvert.DeserializeObject<ManageSubCategory>(data);
                }
                //  ViewBag.PayrollCategoryId = PayrollCategoryId;

                if (list.isLeaveApplicable == 1 && list.isPayrollApplicable == 1)
                {

                    list.isLeaveApplicable = 2;
                }
                list.PayrollSubCategoryId = PayrollSubCategoryId;

                return View(list);
            }

            return View();
        }
        [HttpPost]
        public IActionResult CreateManageSubCategory(ManageSubCategory obj)
        {

            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            if (obj.isLeaveApplicable == 0)
            {
                obj.isPayrollApplicable = 1;
            }
            if (obj.isLeaveApplicable == 2)
            {
                obj.isPayrollApplicable = 1;
                obj.isLeaveApplicable = 1;
            }
            if (obj.PayrollCategoryDescription == null)
            {
                obj.PayrollCategoryDescription = " ";
            }
           // obj.PayrollCategoryId =(int.Parse(obj.PayrollCategoryName));
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response;


            if (obj.PayrollSubCategoryId != 0)
            {
                response = client.PostAsync(client.BaseAddress + "/UpdateManageSubCategory", content).Result;
            }
            else
            {
                response = client.PostAsync(client.BaseAddress + "/InsertManageSubCategory", content).Result;
            }

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                string list = JsonConvert.DeserializeObject<string>(data);
                return Json(list);
            }
            return Json(0);

        }


        #endregion
        //------------------------------------------05--------------------   Manage Employees
        #region
        //-----------------------------------------------------------------------------   Search  Manage Sub Category





       
        public IActionResult SearchManageEmployees()
        {
            string[] parameter = new string[] { InstanceId.ToString() };

            ViewBag.Department = CommonDropdown("GetDepartmentME", parameter, "ClassificationName", "InstanceClassificationId");
            ViewBag.DesignationId = CommonDropdown("GetDesignationME", parameter, "Designation", "DesignationId");
            ViewBag.RoleId = CommonDropdown("GetRoleME", parameter, "RoleName", "InstanceRoleId");
            ViewBag.Category = CommonDropdown("GetCategoryME", parameter, "PayRollCategoryName", "PayRollCategoryId");
            ViewBag.SubCategory = new List<SelectListItem>();

            ViewBag.instancceidME = InstanceId.ToString();
            return View();
        }

        public IActionResult SearchManageEmployeesJson(int RoleId, string UserName, string FirstName, string LastName,  string AdmissionNumber, string InstanceUserCode, int Category, int SubCategory, int InstanceClassificationId, int DesignationId)
        {
           

            List<ManageEmployees> list = new List<ManageEmployees>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchManageEmployees?RoleId=" + RoleId + "&UserName=" + UserName + "&FirstName=" + FirstName + "&LastName=" + LastName+ "&InstanceId=" + InstanceId + "&AdmissionNumber=" + AdmissionNumber + "&InstanceUserCode=" + InstanceUserCode + "&Category=" + Category + "&SubCategory=" + SubCategory + "&InstanceClassificationId=" + InstanceClassificationId + "&DesignationId=" + DesignationId ).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ManageEmployees>>(data);
            }
            return Json(list);
        }
       
        //------------------------------------------------------------- --------------------------------------  Create Manage Employees
        [HttpGet]
        public IActionResult CreateManageEmployees(int UserId)
        {
            //------------------------------------------------------    Getting All Drop Downns
            string[] parameter = new string[] { InstanceId.ToString() };

            ViewBag.RoleId = CommonDropdown("GetRoleME", parameter, "RoleName", "InstanceRoleId");
            ViewBag.Category = CommonDropdown("GetCategoryME", parameter, "PayRollCategoryName", "PayRollCategoryId");
            ViewBag.SubCategory = new List<SelectListItem>();
            ViewBag.Department = CommonDropdown("GetDepartmentME", parameter, "ClassificationName", "InstanceClassificationId");
            ViewBag.DesignationId = CommonDropdown("GetDesignationME", parameter, "Designation", "DesignationId");
            ViewBag.ReligionId = CommonDropdown("GetReligionME", parameter, "ReligionName", "ReligionId");
            ViewBag.CasteId = CommonDropdown("GetCastME", parameter, "CasteName", "CasteId");
            ViewBag.MaritalStatus = new List<SelectListItem>()
            {
                new SelectListItem{Text = "Single",Value = "1"},
                new SelectListItem{Text = "Married",Value = "2"}
            };
            ViewBag.TeachingType = CommonDropdown("GetTeachingTypeME", parameter, "TeachingType", "TeachingId");
            ViewBag.EmployeeReplacewith = new List<SelectListItem>();
            ViewBag.EmployeeType = CommonDropdown("GetEmployeeTypeME", parameter, "EmployeeType", "EmployeeTypeId");
            ViewBag.CostCenter = CommonDropdown("GetCostCenterME", parameter, "CostCenterName", "CostCenterId");
            ViewBag.BloodGroup = CommonDropdown("GetBloodGroupME", parameter, "BloodGroupName", "BloodGroupId");
            ViewBag.Bank = CommonDropdown("GetBankME", parameter, "BankName", "BankAccountId");
            ViewBag.SecurityQuestionId = CommonDropdown("GetSecurityQuestionME", parameter, "Question", "SecurityQuestionId");



            if (UserId != 0)
            {
                Response.Cookies.Append("UerIdMES", UserId.ToString());
                ManageEmployees list = new ManageEmployees();
                HttpResponseMessage responselist = client.GetAsync(client.BaseAddress + "/GetUpdateManageEmployees?UserId=" + UserId).Result;
                if (responselist.IsSuccessStatusCode)
                {
                    string data = responselist.Content.ReadAsStringAsync().Result;
                    list = JsonConvert.DeserializeObject<ManageEmployees>(data);
                }
                string[] parameter2 = new string[] { InstanceId.ToString(),list.Category };
                ViewBag.SubCategory = CommonDropdown("GetSubcategoryME", parameter2, "PayrollSubCategoryName", "PayrollSubCategoryId");
                list.UserId = UserId;
              
                Response.Cookies.Append("AdmissionNumber", list.AdmissionNumber);
                Response.Cookies.Append("FirstName", list.FirstName);
                Response.Cookies.Append("GrossSalary", list.GrossSalary);
                //     string password=   Encrypt_Decrypt.DecryptString(list.Password);
                //    list.Password = password;
                //    list.ConPassword = password;
                Response.Cookies.Append("IdentityPassword", list.Password);
                ViewBag.identitypassword = list.Password;
                return View(list);
            }

            return View();
        }
        [HttpPost]
        public IActionResult CreateManageEmployees(ManageEmployees obj)
        {

            //string password = Encrypt_Decrypt.DecryptString(obj.Password);
            //obj.Password = password;
            //obj.ConPassword = password
            //this for convert code into Binary code
            
            if (Request.Cookies["IdentityPassword"] != obj.Password)
            {
                obj.Password = HashUtility.HashData((obj.Password).Trim());
            }
            if (obj.update != null)
            {
                obj.UserId = Convert.ToInt32(Request.Cookies["UerIdMES"]);
            }

            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response;
            if (obj.UserId != 0)
            {
                response = client.PostAsync(client.BaseAddress + "/UpdateManageEmployees", content).Result;
            }
            else
            {
                response = client.PostAsync(client.BaseAddress + "/InsertManageEmployees", content).Result;
                Response.Cookies.Append("AdmissionNumber", obj.AdmissionNumber);
                Response.Cookies.Append("FirstName", obj.FirstName);
                Response.Cookies.Append("GrossSalary", obj.GrossSalary);
            }

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
               // string list = JsonConvert.DeserializeObject<string>(data);
               if(obj.update == null)
                {
                    Response.Cookies.Append("UerIdMES", data);
                }

                return Json(data);
            }
            return Json(0);

        }


        //------------------------------------------------------------- --------------------------------------  Create Manage Salary Attributes For Employees
        [HttpGet]
        public IActionResult CreateManageEmployeesSalary(int SalaryAttributeId)
        {
            //------------------------------------------------------    Getting All Drop Downns
            List<SelectListItem> list2 = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SalaryAttributesforRoles?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list2 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.InstanceSalaryAttributeId = list2;
            ViewBag.AdmissionNumber = Request.Cookies["AdmissionNumber"];
            ViewBag.FirstName = Request.Cookies["FirstName"];
            ViewBag.GrossSalary = Request.Cookies["GrossSalary"];

            if (SalaryAttributeId != 0)
            {
                HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetUpdateSAlaryAttributeforRoles?SalaryAttributeId=" + SalaryAttributeId).Result;
                if (response2.IsSuccessStatusCode)
                {
                    string data = response2.Content.ReadAsStringAsync().Result;
                    SalaryAttributesforRoles list3 = JsonConvert.DeserializeObject<SalaryAttributesforRoles>(data);

                  //  Response.Cookies.Append("InstanceSalaryAttributeId_SAR", list3.InstanceSalaryAttributeId.ToString());
                 ViewBag.SalaryAttributeId = SalaryAttributeId;
                    return View(list3);
                }
            }


            return View();
        }

        //--------------------------------------------------------------------        
        [HttpPost]
        public IActionResult CreateManageEmployeesSalary(SalaryAttributesforRoles obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.UserId = Convert.ToInt32(Request.Cookies["UerIdMES"]);
            obj.AuthId = 5;//--------------------   Error
           
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response;
            if (obj.SalaryAttributeId != 0)
            {
                response = client.PostAsync(client.BaseAddress + "/UpdateSalaryAttributesForRoles", content).Result;
            }
            else
            {
                response = client.PostAsync(client.BaseAddress + "/InsertSalaryAttributesForRoles", content).Result;
            }

            if (response.IsSuccessStatusCode)
            {
                string list = "";
                try {
                    string data = response.Content.ReadAsStringAsync().Result;
                     list = JsonConvert.DeserializeObject<string>(data);
                    return Json(list);
                }
                catch
                {
                    return Json(list);
                }

               
            }
            return Json(0);

        }

        //----------------------------------------------------------------------------- Getting The Json Data  Search Salary Attributes For Roles
        public IActionResult GetindividualRecordsEmployees()
        {
            
              int  userId = Convert.ToInt32(Request.Cookies["UerIdMES"]);
            

            List<SalaryAttributesforRoles> list = new List<SalaryAttributesforRoles>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetindividualRecords?userId=" + userId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SalaryAttributesforRoles>>(data);
            }
            return Json(list);
        }
        #endregion

        //-----------------------------------------06---------------------  EMPLOYEE ATTENDANCE POSTING
        #region
        //-----------------------------------------------------------------------------   Search  Employee Attendence 
        public IActionResult SearchEmployeeAttendence()
        {

            string[] parameter = new string[] { InstanceId.ToString() };

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
            ViewBag.RoleId = CommonDropdown("GetRoleEAP", parameter, "RoleName", "InstanceRoleId");//---------------------  Getting  Roles
            ViewBag.Department = CommonDropdown("GetDepartmentME", parameter, "ClassificationName", "InstanceClassificationId");//-----  Getting Department
            ViewBag.SubDepartment = new List<SelectListItem>();

            return View();
        }
       
        //--------------------------------------------------  Search Attendence

        public IActionResult GetEmployeeAttendenceJson(int RoleId, int InstanceClassificationId, string InstanceSubClassificationId, int Month, int year, /*string BioKey,*/ /*int LMSKey,*/ string CategoryId, string SubCategoryID)

        {
           

            List<ManageEmployeeAttendence> list = new List<ManageEmployeeAttendence>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetEmployeeAttendence?InstanceId=" + InstanceId + "&RoleId=" + RoleId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&Month=" + Month + "&year=" + year + "&BioKey=OFF&LMSKey=1&CategoryId=" + CategoryId + "&SubCategoryID=" + SubCategoryID).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ManageEmployeeAttendence>>(data);
            }
            return Json(list);
        }

        //-------------------------------------------------------------------------  Getting Sub Classification

        public IActionResult GetClassfor_EAP(string InstanceClassificationId)
        {
            List<SelectListItem> Subjecttoollist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetClassfor_MS?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Subjecttoollist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }


            return Json(Subjecttoollist);
        }
        //-----------------------------------------------------------------------   Get The Attendence Of Employees
        [HttpGet]
        public IActionResult GetEmployeeAttendence()
        {
            ViewBag.DaysDrop = new List<SelectListItem>()
            {
                new SelectListItem{Text = "Working Days",Value = "1"},
                new SelectListItem{Text = "Present Days",Value = "2"},
                new SelectListItem{Text = "Absent Days",Value = "3"},
                new SelectListItem{Text = "Loss Of Pay Days",Value = "4"},
                new SelectListItem{Text = "CL",Value = "7"},
                new SelectListItem{Text = "OD",Value = "8"},
            };

            return View();
        } //-----------------------------------------------------------------------   post The Attendence Of Employees
        [HttpPost]
        public IActionResult GetEmployeeAttendence(ManageEmployeeAttendenceList obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertEmployeeAttendence", content).Result;
            
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list = JsonConvert.DeserializeObject<int>(data);
                return Json(list);
            }


            return Json(0);
        }


        #endregion

        //-----------------------------------------07---------------------  PAYSLIP GENERATE FOR EMPLOYEE'S
        #region
        //-----------------------------------------------------------------------------   Search  Employee Details 
        public IActionResult SearchEmployeeDetails()
        {

            string[] parameter = new string[] { InstanceId.ToString() };

            ViewBag.instancceidME = InstanceId;
            ViewBag.RoleId = CommonDropdown("GetRoleEAP", parameter, "RoleName", "InstanceRoleId");//---------------------  Getting  Roles
            ViewBag.DesignationId = CommonDropdown("GetDesignationME", parameter, "Designation", "DesignationId");//--------------  Getting Designation
            ViewBag.Category = CommonDropdown("GetCategoryME", parameter, "PayRollCategoryName", "PayRollCategoryId");
            ViewBag.SubCategory = new List<SelectListItem>();
            ViewBag.Department = CommonDropdown("GetDepartmentME", parameter, "ClassificationName", "InstanceClassificationId");//-----  Getting Department

            List<SelectListItem> list5 = new List<SelectListItem>();
            HttpResponseMessage response5 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=MONTH").Result;
            if (response5.IsSuccessStatusCode)
            {
                string data = response5.Content.ReadAsStringAsync().Result;
                list5 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
           // int selectedMonth = DateTime.Now.Month;
            ViewBag.Months = list5;

          //  ViewBag.Months = list5;//----------------------------------  Get Months
            Commonclass obj = new Commonclass();
          //  int selectedYear = DateTime.Now.Year;
            ViewBag.Years = obj.GetYears();//-------------------------  Get Years

            return View();
        }

        public IActionResult SearchManageDetailsJson(string RoleId, string UserName, string FirstName, string LastName, string AdmissionNumber, string InstanceUserCode, string Category, string SubCategory, string InstanceClassificationId, int DesignationId)
        {


            List<ManageEmployees> list = new List<ManageEmployees>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchManageDetails?RoleId=" + RoleId + "&UserName=" + UserName + "&FirstName=" + FirstName + "&LastName=" + LastName + "&InstanceId=" + InstanceId + "&AdmissionNumber=" + AdmissionNumber + "&InstanceUserCode=" + InstanceUserCode + "&Category=" + Category + "&SubCategory=" + SubCategory + "&InstanceClassificationId=" + InstanceClassificationId + "&DesignationId=" + DesignationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ManageEmployees>>(data);
            }
            return Json(list);
        }


        //--------------------------------------------------   PaySlip Generation

        public IActionResult PaySlipGeneration(string UserId, string month,string monthtext, string year)

        {

            ViewBag.monthname = monthtext;
            ViewBag.yearname = year;
            Response.Cookies.Append("PayrollMonth", month);
            Response.Cookies.Append("PayrollYear", year);
            List<GeneratePaySliplList> MainList = new List<GeneratePaySliplList>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/CheckcenPercentage?InstanceId=" + InstanceId + "&UserId=" + UserId + "&month=" + month + "&year=" + year).Result;
            if(response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
               if(data2 != "0")
                {

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PaySlipGeneration?InstanceId=" + InstanceId + "&UserId=" + UserId + "&month=" + month + "&year=" + year).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                MainList = JsonConvert.DeserializeObject<List<GeneratePaySliplList>>(data);
            }
                    if (MainList[0].generatepayslip.Count != 0)
                    {


                        ViewBag.Lossofpayamount = (((Convert.ToDecimal(MainList[0].generatepayslip[0].GrassSalary)) / (Convert.ToDecimal(MainList[0].generatepayslip[0].WorkingDays))) * Convert.ToDecimal(MainList[0].generatepayslip[0].LossofPayDays)).ToString("0.00");
                        var basicPayItem = MainList[2].generatepayslip.FirstOrDefault(cc => cc.SalaryAttributeMasterName == "Basic");

                        if (basicPayItem != null)
                        {
                            //decimal dog = Convert.ToDecimal(basicPayItem.Salary) -Convert.ToDecimal(ViewBag.Lossofpayamount);
                            MainList[2].generatepayslip[0].Salary = (Convert.ToDouble(basicPayItem.Salary) - Convert.ToDouble(ViewBag.Lossofpayamount)).ToString("0.00");
                        }
                        ViewBag.TotalEarnings = MainList[2].generatepayslip.Sum(item => Convert.ToDecimal(item.Salary));
                        ViewBag.TotalDeductions = MainList[1].generatepayslip.Sum(item => Convert.ToDecimal(item.Salary));
                        ViewBag.Netsalary = ViewBag.TotalEarnings - ViewBag.TotalDeductions;
                        Commonclass obj = new Commonclass();
                        ViewBag.NumtoWord = obj.NumberToWords(Convert.ToInt32(ViewBag.Netsalary));
                        Response.Cookies.Append("UserIdforPayslipgen", MainList[0].generatepayslip[0].UserId.ToString());
                        return View(MainList);
                    }
                    else
                    {
                        return Json("sree");
                    }

                }
                else
                {
                    return Json('0');
                }
            }
            else
            {
                return Json('0');
            }

        }
        //===================================================    Payslip Insert (Click On Confirm)

        public IActionResult InsertPayslip(InsertPayslip obj) 
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.UserId =Convert.ToInt32( Request.Cookies["UserIdforPayslipgen"]);
            obj.monthNo =Convert.ToInt32( Request.Cookies["PayrollMonth"]);
            obj.yearNo =Convert.ToInt32( Request.Cookies["PayrollYear"]);
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertPayslip", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list = JsonConvert.DeserializeObject<int>(data);
                return Json(list);
            }

            return Json(0);

        }


        ////-------------------------------------------------------------------------  Getting Sub Classification

        //public IActionResult GetClassfor_EAP(string InstanceClassificationId)
        //{
        //    List<SelectListItem> Subjecttoollist = new List<SelectListItem>();
        //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetClassfor_MS?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data = response.Content.ReadAsStringAsync().Result;
        //        Subjecttoollist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
        //    }


        //    return Json(Subjecttoollist);
        //}
        ////-----------------------------------------------------------------------   Get The Attendence Of Employees
        //[HttpGet]
        //public IActionResult GetEmployeeAttendence()
        //{
        //    ViewBag.DaysDrop = new List<SelectListItem>()
        //    {
        //        new SelectListItem{Text = "Working Days",Value = "1"},
        //        new SelectListItem{Text = "Present Days",Value = "2"},
        //        new SelectListItem{Text = "Absent Days",Value = "3"},
        //        new SelectListItem{Text = "Loss Of Pay Days",Value = "4"},
        //        new SelectListItem{Text = "CL",Value = "7"},
        //        new SelectListItem{Text = "OD",Value = "8"},
        //    };

        //    return View();
        //} //-----------------------------------------------------------------------   post The Attendence Of Employees
        //[HttpPost]
        //public IActionResult GetEmployeeAttendence(ManageEmployeeAttendenceList obj)
        //{
        //    obj.InstanceId = InstanceId;
        //    obj.CreatedBy = UserId;
        //    string jsonData = JsonConvert.SerializeObject(obj);
        //    StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        //    HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertEmployeeAttendence", content).Result;

        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data = response.Content.ReadAsStringAsync().Result;
        //        int list = JsonConvert.DeserializeObject<int>(data);
        //        return Json(list);
        //    }


        //    return Json(0);
        //}


        #endregion

        //-----------------------------------------08---------------------  SALARY REPORT
        #region
        //-----------------------------------------------------------------------------   Search  Salry Report 
        public IActionResult SalaryReport()
        {

            string[] parameter = new string[] { InstanceId.ToString() };

            ViewBag.instancceidME = InstanceId;
           
            ViewBag.Category = CommonDropdown("GetCategoryME", parameter, "PayRollCategoryName", "PayRollCategoryId");
            ViewBag.SubCategory = new List<SelectListItem>();
            ViewBag.Department = CommonDropdown("GetDepartmentME", parameter, "ClassificationName", "InstanceClassificationId");//-----  Getting Department

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

            return View();
        }
        public IActionResult SAlaryReportJson( int CategoryId, int SubCategoryId, string MonthNo, int YearNo, int ClassificationId)
        {


            List<ManageEmployees> list = new List<ManageEmployees>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SAlaryReport?InstanceId=" + InstanceId + "&CategoryId=" + CategoryId + "&SubCategoryId=" + SubCategoryId + "&MonthNo=" + MonthNo + "&YearNo=" + YearNo + "&ClassificationId=" + ClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ManageEmployees>>(data);
            }
            double amount = list.Sum(item =>Convert.ToDouble(item.Amount));
            if (list.Count != 0)
            {
                ManageEmployees newval = new ManageEmployees(); newval.SubCategory = " "; newval.Amount = "SUM : " + amount;
                // return Json(new { Data = list, SumofAmount = amount });  
                list.Add(newval);
            }
              return Json(list);
        }

        //public IActionResult SearchManageDetailsJson(string RoleId, string UserName, string FirstName, string LastName, string AdmissionNumber, string InstanceUserCode, string Category, string SubCategory, string InstanceClassificationId, int DesignationId)
        //{


        //    List<ManageEmployees> list = new List<ManageEmployees>();
        //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchManageDetails?RoleId=" + RoleId + "&UserName=" + UserName + "&FirstName=" + FirstName + "&LastName=" + LastName + "&InstanceId=" + InstanceId + "&AdmissionNumber=" + AdmissionNumber + "&InstanceUserCode=" + InstanceUserCode + "&Category=" + Category + "&SubCategory=" + SubCategory + "&InstanceClassificationId=" + InstanceClassificationId + "&DesignationId=" + DesignationId).Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data = response.Content.ReadAsStringAsync().Result;
        //        list = JsonConvert.DeserializeObject<List<ManageEmployees>>(data);
        //    }
        //    return Json(list);
        //}


        ////--------------------------------------------------  Search Attendence

        //public IActionResult GetEmployeeAttendenceJson(int RoleId, int InstanceClassificationId, string InstanceSubClassificationId, int Month, int year, /*string BioKey,*/ /*int LMSKey,*/ string CategoryId, string SubCategoryID)

        //{


        //    List<ManageEmployeeAttendence> list = new List<ManageEmployeeAttendence>();
        //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetEmployeeAttendence?InstanceId=" + InstanceId + "&RoleId=" + RoleId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&Month=" + Month + "&year=" + year + "&BioKey=OFF&LMSKey=1&CategoryId=" + CategoryId + "&SubCategoryID=" + SubCategoryID).Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data = response.Content.ReadAsStringAsync().Result;
        //        list = JsonConvert.DeserializeObject<List<ManageEmployeeAttendence>>(data);
        //    }
        //    return Json(list);
        //}

        ////-------------------------------------------------------------------------  Getting Sub Classification

        //public IActionResult GetClassfor_EAP(string InstanceClassificationId)
        //{
        //    List<SelectListItem> Subjecttoollist = new List<SelectListItem>();
        //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetClassfor_MS?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data = response.Content.ReadAsStringAsync().Result;
        //        Subjecttoollist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
        //    }


        //    return Json(Subjecttoollist);
        //}
        ////-----------------------------------------------------------------------   Get The Attendence Of Employees
        //[HttpGet]
        //public IActionResult GetEmployeeAttendence()
        //{
        //    ViewBag.DaysDrop = new List<SelectListItem>()
        //    {
        //        new SelectListItem{Text = "Working Days",Value = "1"},
        //        new SelectListItem{Text = "Present Days",Value = "2"},
        //        new SelectListItem{Text = "Absent Days",Value = "3"},
        //        new SelectListItem{Text = "Loss Of Pay Days",Value = "4"},
        //        new SelectListItem{Text = "CL",Value = "7"},
        //        new SelectListItem{Text = "OD",Value = "8"},
        //    };

        //    return View();
        //} //-----------------------------------------------------------------------   post The Attendence Of Employees
        //[HttpPost]
        //public IActionResult GetEmployeeAttendence(ManageEmployeeAttendenceList obj)
        //{
        //    obj.InstanceId = InstanceId;
        //    obj.CreatedBy = UserId;
        //    string jsonData = JsonConvert.SerializeObject(obj);
        //    StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

        //    HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertEmployeeAttendence", content).Result;

        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data = response.Content.ReadAsStringAsync().Result;
        //        int list = JsonConvert.DeserializeObject<int>(data);
        //        return Json(list);
        //    }


        //    return Json(0);
        //}


        #endregion



    }







}
