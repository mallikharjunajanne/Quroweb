using Connect4m_Web.Models.LMSproperties;
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
    public class Admin : Controller
    {
       // Uri baseaddress = new Uri("https://localhost:44331/api/UsersScreens");
        //HttpClient client;


        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        public Admin(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/UsersScreens");
        }

      
        public IActionResult ManageCoolLinks()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instanceid = InstanceId;

            var UserId = Request.Cookies["LoginUserId"];
            ViewBag.LoginUserId = UserId;


            return View();
        }


        public IActionResult ManageCoolLinks_Tabledata(int InstanceId, string LinkName, string LinkURL, string Description)
        {
            List<CoolLinks> item = new List<CoolLinks>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_coollinks?InstanceId=" + InstanceId + "&LinkName=" + LinkName + "&LinkURL=" + LinkURL + "&Description=" + Description).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<CoolLinks>>(data);
            }

            item = item.OrderBy(link => link.LinkName).ToList();
            ViewBag.itemscount = item.Count();
            return PartialView("_ManageCoolLinks_Tabledata", item);

        }

        [HttpPost]
        public IActionResult CoolLinks_INSERT(CoolLinks obj)
        {
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_CoolLinks_INSERT", content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }

        [HttpPost]
        public IActionResult CoolLinks_DELETE(int CoollinkId)
        {
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_CoolLinks_DELETE?CoollinkId=" + CoollinkId).Result;
            string item = "";
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<string>(data);
            }
            return Json(item);
        }

        [HttpGet]
        public IActionResult CoolLinks_Edit(int CoollinkId)
        {
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_CoolLinks_Edit?CoollinkId=" + CoollinkId).Result;
            List<CoolLinks> item = new List<CoolLinks>();
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<CoolLinks>>(data);
            }
            return Json(item);
        }

        [HttpPost]
        public IActionResult CoolLinks_UPDATE(CoolLinks obj)
        {
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_CoolLinks_UPDATE", content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }




        public IActionResult ManageNotices()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instanceid = InstanceId;

            var UserId = Request.Cookies["LoginUserId"];
            ViewBag.LoginUserId = UserId;

            int CategoryTypeId = 5;

            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/MN_NoticeTypeDD?InstanceId=" + InstanceId + "&CategoryTypeId=" + CategoryTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.NoticeTypedd = li;

            return View();
        }


        public IActionResult ManageNotices_TableData(int InstanceId, string Subject, string StartDate, string ExpiryDate, int ENoticeTypeId, int IsSMSTemplate)
        {

            List<NoticeTypes> item = new List<NoticeTypes>();

            int GetAll = 0;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_Noticestabledata?InstanceId=" + InstanceId + "&Subject=" + Subject + "&StartDate=" + StartDate + "&ExpiryDate=" + ExpiryDate + "&ENoticeTypeId=" + ENoticeTypeId + "&IsSMSTemplate=" + IsSMSTemplate + "&GetAll=" + GetAll).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
            }

            ViewBag.NoticeCount = item.Count();
            return PartialView("_ManageNotices_TableData", item);
        }

        [HttpGet]
        public IActionResult ManageNotices_Create(int InstanceId, int Userid)
        {
            ViewBag.InstanceId = InstanceId;
            ViewBag.Userid = Userid;
            return PartialView("_ManageNotices_Create");           
        }
        [HttpPost]
        public IActionResult ManageNotices_Create(NoticeTypes obj)
        {
             string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticesInsert", content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);            
        }

        public IActionResult Edit_ENotices_ById(int ENoticeId)
        {
            List<NoticeTypes> item = new List<NoticeTypes>();                     

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_NoticesEdit?ENoticeId=" + ENoticeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
            }

            //return PartialView("_ManageNotices_Create", item);

            return Json(item);
        }

        [HttpPost]
        public IActionResult Edit_ENotices_ById(NoticeTypes obj)
        {
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticesUpdate", content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }

        public IActionResult Delete_ENotices_ById(int ENoticeId)
        {
            string item = "";

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_NoticesDelete?ENoticeId=" + ENoticeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<string>(data);
            }

            return Json(item);
           
        }
       


        public IActionResult ManageNotices_CreateSMS(int InstanceId)
        {
            List<TemplateDetails> item = new List<TemplateDetails>();      

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_Noticesmstemplate?InstanceId=" + InstanceId ).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<TemplateDetails>>(data);
            }
            ViewBag.SMSTemplates = item;
            return View();
        }

        [HttpPost]
        public IActionResult SaveandPostBtn_ManageNotices_CreateSMS(TemplateDetails_SMS obj)
        {
                     
            if (obj.NoticeDocument == null)
            {
                obj.NoticeDocument = "";
            }
            ViewBag.Subject = obj.Subject;
            ViewBag.StartDate = obj.StartDate;
            ViewBag.EndDate   = obj.EndDate;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticessmstemplateInsert", content).Result;

            TemplateDetails_SMS items = new TemplateDetails_SMS();
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<TemplateDetails_SMS>(data2);
            }
            ViewBag.List = items;

            return View();         
        }




        public IActionResult ManageNotices_InstanceClassificationSearch(int InstanceId)
        {
            List<ClassificationList> item =new  List<ClassificationList>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USPSMSTD_Classification?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<ClassificationList>>(data);
            }
            ViewBag.Classification = item;
            return Json(item);
            
        }

        public IActionResult ManageNotices_InstanceSubClassificationSearch(int InstanceId,int InstanceClassificationId)
        {
            List<SubclassificationList> item = new List<SubclassificationList>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USPSMSTD_Subclassification?InstanceId=" + InstanceId+ "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<SubclassificationList>>(data);
            }
            ViewBag.Subclassification = item;
            
            return Json(item);
        }      

        public IActionResult ManageNotices_PostNoticeSearchtabledata(int InstanceId, string UserName,string InstanceRoleId, string FirstName,string LastName,string InstanceClassificationId,string InstanceSubClassificationId,string InstanceUserCodes,string PortalEmail, string RouteId,string CollegeHostel,string ExcludeUserIds,string Noofusers)
        {           
            List<Postnoticetabledate> item = new List<Postnoticetabledate>();             
            UserName = UserName ?? "";
            InstanceRoleId = InstanceRoleId ?? "";
            FirstName = FirstName ?? "";
            LastName = LastName ?? "";
            //InstanceClassificationId = InstanceClassificationId ?? "";
            if (InstanceClassificationId == "---Select a Department---" || InstanceClassificationId== null)
            {
                InstanceClassificationId = default;
            }
            if (InstanceSubClassificationId == "---Select a class---" || InstanceSubClassificationId== null)
            {
                InstanceSubClassificationId = "";
            }
            //InstanceSubClassificationId = InstanceSubClassificationId ?? "";
            InstanceUserCodes = InstanceUserCodes ?? "";
            PortalEmail = PortalEmail ?? "";
            RouteId = RouteId ?? "";
            CollegeHostel = CollegeHostel ?? "";
            string MultiAdmissionNumber = "";
            ExcludeUserIds = ExcludeUserIds ?? "";
            if (Noofusers == "9_0_1_4" || Noofusers == "1_20")
            {
                string Querystrings = $"?InstanceId={InstanceId}&UserName={UserName}&RoleId={InstanceRoleId}&FirstName={FirstName}&LastName={LastName}&InstanceClassificationId={InstanceClassificationId}&InstanceUserCode={InstanceUserCodes}&PortalEmail={PortalEmail}&InstanceSubClassificationId={InstanceSubClassificationId}&RouteId={RouteId}&ExcludeUserIds={ExcludeUserIds}&CollegeHostel={CollegeHostel}&MultiAdmissionNumber={MultiAdmissionNumber}";
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USPSMSTD_PostNoticeSearchtaledata" + Querystrings).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data1 = response.Content.ReadAsStringAsync().Result;
                    item = JsonConvert.DeserializeObject<List<Postnoticetabledate>>(data1);
                }
            }
            else
            {
                string RoleId = InstanceRoleId;
                string InstanceUserCode = InstanceUserCodes;
                var Parameters = new { 
                    InstanceId,
                    UserName, 
                    RoleId,
                    FirstName,
                    LastName,
                    InstanceClassificationId,
                    InstanceUserCode,
                    PortalEmail,
                    InstanceSubClassificationId,
                    RouteId,
                    ExcludeUserIds,
                    CollegeHostel,
                    MultiAdmissionNumber
                };
                string data1 = JsonConvert.SerializeObject(Parameters);
                StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Allusers_USPSMSTD_PostNoticeSearchtaledata", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    item = JsonConvert.DeserializeObject<List<Postnoticetabledate>>(data2);
                }
            }


            item = item.OrderBy(x => x.FirstName).ToList();
            ViewBag.SMSTemplates = item;
            ViewBag.SMSTemplateScount = item.Count();
            ViewBag.ExcludeUserIds = ExcludeUserIds;       
            return View(item);
        }

        public IActionResult SELUsersByUserIds(string UserIds, string Noofusers)
        {
            List<Postnoticetabledate> item = new List<Postnoticetabledate>();
            if (Noofusers == "1_20")
            {
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USPSMSTD_AddPostNoticeselusersbyuseridstaledata?UserIds=" + UserIds).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data1 = response.Content.ReadAsStringAsync().Result;
                    item = JsonConvert.DeserializeObject<List<Postnoticetabledate>>(data1);
                }
            }
            else
            {
                Srekanth NewClass = new Srekanth();
                NewClass.Userids = UserIds;
                string data1 = JsonConvert.SerializeObject(NewClass);
                //string data1 = UserIds;
                StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/AllUsers_USPSMSTD_AddPostNoticeselusersbyuseridstaledata", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    item = JsonConvert.DeserializeObject<List<Postnoticetabledate>>(data2);
                }
            }
            item = item.OrderBy(x => x.FirstName).ToList();
            ViewBag.SMSTemplates = item;
            ViewBag.SMSTemplateScount = item.Count();

            return View(item);
        }


        public IActionResult SMS_TemplateandDetails(int InstanceId, int TemplateMasterPK)
        {
            List<TemplateDetails> item = new List<TemplateDetails>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_SMSTemplateandDetails?InstanceId=" + InstanceId+ "&TemplateMasterPK="+ TemplateMasterPK).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<TemplateDetails>>(data);
            }
            ViewBag.SMSTemplates = item;          
            return View();
        }



        public IActionResult NoticeTypedd(int InstanceId)
        {
            int CategoryTypeId = 5;

            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/MN_NoticeTypeDD?InstanceId=" + InstanceId + "&CategoryTypeId=" + CategoryTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.NoticeTypedd = li;
            return Json(li);
        }


        //------Create Notice and SMS  Button click view to start action methods

        private List<SelectListItem> GetNoticetypdedd(int InstanceId)
        {
            int CategoryTypeId = 5;

            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/MN_NoticeTypeDD?InstanceId=" + InstanceId + "&CategoryTypeId=" + CategoryTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }

            return li;
        }      
        public IActionResult CreateSmsNNotice(int InstanceId)
        {
            var noticeTypeData = GetNoticetypdedd(InstanceId);
            ViewBag.Noticetypedd = noticeTypeData;
            return View();
        }

        //------Create Notice and SMS  Button click view to start action methods
    }
}
