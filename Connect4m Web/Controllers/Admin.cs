using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static Connect4m_Web.Models.Attendenceproperites.UserScreen;

namespace Connect4m_Web.Controllers
{
    [Authorize]

    public class Admin : Controller
    {
        // Uri baseaddress = new Uri("https://localhost:44331/api/UsersScreens");
        //HttpClient client;


        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;

        private readonly IUserService _userService;
        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)
        private readonly int UserId;
        private readonly int InstanceId;
        private readonly int InstanceClassificationId;
        private readonly int Roleid;
        private readonly int StudentUserid;

        public Admin(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
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





        #region Manage Notice 

        #region  Main manage notice search screen
        
        public IActionResult ManageNotices()
        {     
            return View();
        }

        public IActionResult MNNoticetype_dd()
        {
            int CategoryTypeId = 5;
            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/MN_NoticeTypeDD?InstanceId=" + InstanceId + "&CategoryTypeId=" + CategoryTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }       
            return Json(li);           
        }

        public IActionResult ManageNotices_TableData(string Subject, string StartDate, string ExpiryDate, int ENoticeTypeId, int IsSMSTemplate)
        {
            List<NoticeTypes> item = new List<NoticeTypes>();

            string SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                  "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                  "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
                  "</REQUESTCREDIT>";
            string SMSFromText = "ADSTEK";
            string Action = "credits";
            int CreatedBy = UserId;
            int GetAll = 0;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_Noticestabledata?InstanceId=" + InstanceId + "&Subject=" + Subject + "&StartDate=" + StartDate + "&ExpiryDate=" + ExpiryDate + "&ENoticeTypeId=" + ENoticeTypeId + "&IsSMSTemplate=" + IsSMSTemplate + "&GetAll=" + GetAll + "&SMSTextInXML="+ SMSTextInXML+ "&SMSFromText="+ SMSFromText+ "&Action="+ Action+ "&CreatedBy="+ CreatedBy).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
            }

            ViewBag.NoticeCount = item.Count();
            return Json(item);

            //return PartialView("_ManageNotices_TableData", item);
        }

        #endregion





        #endregion






        #region Create Notice        

        [HttpGet]
        public IActionResult ManageNotices_Create()//int InstanceId, int Userid
        {
            //ViewBag.InstanceId = InstanceId;
            //ViewBag.Userid = Userid;

            return View();
            //return PartialView("_ManageNotices_Create");
        }

    

        [HttpPost]
        public IActionResult ManageNotices_Create(NoticeTypes obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
                "</REQUESTCREDIT>";
            obj.SMSFromText = "ADSTEK";
            obj.Action = "credits";

            var instanceId = InstanceId;
            var Documentattachement = obj.AttachedDocument;
            Random random = new Random();
            int randomNumber = random.Next(1000, 999999);

            if (Documentattachement != null)
            {
                obj.NoticeDocument = Documentattachement.FileName;

                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Managenoticesdocs");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string instanceFolderPath = Path.Combine(folderPath, "Instanceid" + instanceId);

                if (!Directory.Exists(instanceFolderPath))
                {
                    Directory.CreateDirectory(instanceFolderPath);
                }

                string output = Regex.Replace(Documentattachement.FileName, @"^\d+", "");
                var filenamedoc = randomNumber + output;
                var fileNamedoc = Path.GetFileName(filenamedoc);
                var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                string uploadsdoc = Path.Combine("wwwroot", "Managenoticesdocs", "Instanceid" + instanceId, fileNamedoc);
                obj.DocSize = randomNumber.ToString();
                using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                {
                    Documentattachement.CopyTo(fileSrteam);
                }
            }


            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticesInsert", content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
               // items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }

        public IActionResult NoticeTypedd()//int InstanceId
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

        public IActionResult Managenotices_saveNposting(TemplateDetails_SMS obj, NoticeTypes objs)
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                    "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                    "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
                    "</REQUESTCREDIT>";
                obj.SMSFromText = "ADSTEK";
                obj.Action = "credits";

                objs.DisplayIcon = "";
                objs.DisplayOrder = 2;
                //objs.ShowInLogin = "0";
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                var Documentattachement = objs.AttachedDocument;
                obj.StartDate = obj.SDate;
                obj.EndDate = obj.ExDate;
                //obj.EndDate = ConvertToDateTime(obj.ExDate);
                Random random = new Random();
                int randomNumber = random.Next(1000, 999999);

                if (Documentattachement != null)
                {
                    obj.NoticeDocument = Documentattachement.FileName;
                    
                    string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Managenoticesdocs");

                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    string instanceFolderPath = Path.Combine(folderPath, "Instanceid" + InstanceId);

                    if (!Directory.Exists(instanceFolderPath))
                    {
                        Directory.CreateDirectory(instanceFolderPath);
                    }

                    string output = Regex.Replace(Documentattachement.FileName, @"^\d+", "");
                    var filenamedoc = randomNumber + output;
                    var fileNamedoc = Path.GetFileName(filenamedoc);
                    var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                    string uploadsdoc = Path.Combine("wwwroot", "Managenoticesdocs", "Instanceid" + InstanceId, fileNamedoc);
                    obj.DocSize = randomNumber.ToString();
                    using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                    {
                        Documentattachement.CopyTo(fileSrteam);
                    }
                }
               
                ViewBag.Subject = obj.Subject;
                ViewBag.StartDate = obj.StartDate;
                ViewBag.EndDate = obj.EndDate;
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
                
                if (items.ENoticeId !=0)
                {
                    return View();
                }
                else
                {
                    return Json(items.ENoticeId);
                }
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }
    

        #endregion


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


        #region Create SMS
      
        public IActionResult ManageNotices_CreateSMS()
        {
            List<TemplateDetails> item = new List<TemplateDetails>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_Noticesmstemplate?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<TemplateDetails>>(data);
            }
            ViewBag.SMSTemplates = item;
            return View();
        }

        public IActionResult SMS_TemplateandDetails(int TemplateMasterPK)
        {
            List<TemplateDetails> item = new List<TemplateDetails>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_SMSTemplateandDetails?InstanceId=" + InstanceId + "&TemplateMasterPK=" + TemplateMasterPK).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<TemplateDetails>>(data);
            }
            ViewBag.SMSTemplates = item;
            return View();
        }
        [HttpPost]
        public IActionResult ManagenoticeSMS_saveNposting(TemplateDetails_SMS obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
                "</REQUESTCREDIT>";
            obj.SMSFromText = "ADSTEK";
            obj.Action = "credits";


            if (obj.NoticeDocument == null)
            {
                obj.NoticeDocument = "";
            }
            ViewBag.Subject = obj.Subject;
            ViewBag.StartDate = obj.SDate;
            ViewBag.EndDate = obj.ExDate;

            ViewBag.StartDate = obj.StartDate;
            ViewBag.EndDate = obj.EndDate;
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



        [HttpPost]
        public IActionResult SaveandPostBtn_ManageNotices_CreateSMS(TemplateDetails_SMS obj)
        {

            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
                "</REQUESTCREDIT>";
            obj.SMSFromText = "ADSTEK";
            obj.Action = "credits";
            
            
            if (obj.NoticeDocument == null)
            {
                obj.NoticeDocument = "";
            }
            ViewBag.Subject = obj.Subject;
            ViewBag.StartDate = obj.SDate;
            ViewBag.EndDate = obj.ExDate;

            ViewBag.StartDate = obj.StartDate;            
            ViewBag.EndDate = obj.EndDate;
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




        //=====>> Old Method its showing reloading so creating new method Name:-SaveandPostBtn_ManageNotices_CreateSMS
        [HttpPost]
        public IActionResult ENoticeMailSms_INSERT(TemplateDetails_SMS obj)
        {
            obj.DMLTYPE = "GETRECORDS";
            obj.InstanceId = InstanceId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_ENoticemails_smssendinginsert", content).Result;

            SmsSendingResult items = new SmsSendingResult();
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<SmsSendingResult>(data2);
            }
            return new JsonResult(items);
            //return View();
        }
       
        
        #endregion





        #region Department and classification dropdowns


        public IActionResult ManageNotices_InstanceClassificationSearch()
        {
            List<ClassificationList> item = new List<ClassificationList>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USPSMSTD_Classification?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<ClassificationList>>(data);
            }
            ViewBag.Classification = item;
            return Json(item);

        }

        public IActionResult ManageNotices_InstanceSubClassificationSearch(int InstanceClassificationId)
        {
            List<SubclassificationList> item = new List<SubclassificationList>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USPSMSTD_Subclassification?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<SubclassificationList>>(data);
            }
            ViewBag.Subclassification = item;

            return Json(item);
        }
                                               
        public IActionResult ManageNotices_PostNoticeSearchtabledata( string UserName, string InstanceRoleId, string FirstName, string LastName, string InstanceClassificationId, string InstanceSubClassificationId, string InstanceUserCodes, string PortalEmail, string RouteId, string CollegeHostel, string ExcludeUserIds, string Noofusers)
        {
            List<Postnoticetabledate> item = new List<Postnoticetabledate>();

            UserName = UserName ?? "";

            InstanceRoleId = InstanceRoleId ?? "";//-----InstanceRoleId == "" ? default : InstanceRoleId
            FirstName = FirstName ?? "";
            LastName = LastName ?? "";

            if (InstanceClassificationId == "---Select a Department---" || InstanceClassificationId == null)
            {
                InstanceClassificationId = default;
            }
            if (InstanceSubClassificationId == "---Select a class---" || InstanceSubClassificationId == null)
            {
                InstanceSubClassificationId = "";//-----
            }

            InstanceUserCodes = InstanceUserCodes ?? "";
            PortalEmail = PortalEmail ?? "";
            RouteId = RouteId ?? "";//---
            CollegeHostel = CollegeHostel ?? "";//---
            string MultiAdmissionNumber = "";
            ExcludeUserIds = ExcludeUserIds ?? "";//---
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
                var Parameters = new
                {
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
                Multipuleusers NewClass = new Multipuleusers();
                //Srekanth NewClass = new Srekanth();
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

      


        #endregion











        //------Create Notice and SMS  Button click view to start action methods

        private List<SelectListItem> GetNoticetypdedd()//int InstanceId
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

        #region Create SMS and Notice      

        public IActionResult CreateSmsNNotice()
        {
            var noticeTypeData = GetNoticetypdedd();
            ViewBag.Noticetypedd = noticeTypeData;

            return View();
        }
        [HttpPost]
        public IActionResult CreateSmsNNotice(NoticeTypes obj)
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.DisplayIcon = "";
                obj.DisplayOrder = 2;
                //obj.ShowInLogin = "0";
                var instanceId = InstanceId;
                var Documentattachement = obj.AttachedDocument;
                Random random = new Random();
                int randomNumber = random.Next(1000, 999999);

                if (Documentattachement != null)
                {
                    obj.NoticeDocument = Documentattachement.FileName;

                    string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Managenoticesdocs");

                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    string instanceFolderPath = Path.Combine(folderPath, "Instanceid" + instanceId);

                    if (!Directory.Exists(instanceFolderPath))
                    {
                        Directory.CreateDirectory(instanceFolderPath);
                    }

                    string output = Regex.Replace(Documentattachement.FileName, @"^\d+", "");
                    var filenamedoc = randomNumber + output;
                    var fileNamedoc = Path.GetFileName(filenamedoc);
                    var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                    string uploadsdoc = Path.Combine("wwwroot", "Managenoticesdocs", "Instanceid" + instanceId, fileNamedoc);
                    obj.DocSize = randomNumber.ToString();
                    using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                    {
                        Documentattachement.CopyTo(fileSrteam);
                    }
                }

                string jsonData = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticesInsert", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string responseapi = response.Content.ReadAsStringAsync().Result;
                    int i = JsonConvert.DeserializeObject<int>(responseapi);
                    return Json(i);
                }
                return View();
            }
            catch (Exception)
            {              
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }

        //Searchuserstabledata_CSN
        public IActionResult CreateSmsNNotice_PostthisnoticeBtn(NoticeTypes obj)//TemplateDetails_SMS objs,
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                    "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                    "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
                    "</REQUESTCREDIT>";
                obj.SMSFromText = "ADSTEK";
                obj.Action = "credits";

                obj.DisplayIcon = "";
                obj.DisplayOrder = 2;

                var Documentattachement = obj.AttachedDocument;

                Random random = new Random();
                int randomNumber = random.Next(1000, 999999);
                if (Documentattachement != null)
                {
                    obj.NoticeDocument = Documentattachement.FileName;

                    string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Managenoticesdocs");

                    if (!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    string instanceFolderPath = Path.Combine(folderPath, "Instanceid" + InstanceId);

                    if (!Directory.Exists(instanceFolderPath))
                    {
                        Directory.CreateDirectory(instanceFolderPath);
                    }

                    string output = Regex.Replace(Documentattachement.FileName, @"^\d+", "");
                    var filenamedoc = randomNumber + output;
                    var fileNamedoc = Path.GetFileName(filenamedoc);
                    var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                    string uploadsdoc = Path.Combine("wwwroot", "Managenoticesdocs", "Instanceid" + InstanceId, fileNamedoc);
                    obj.DocSize = randomNumber.ToString();
                    using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                    {
                        Documentattachement.CopyTo(fileSrteam);
                    }
                }
                
                ViewBag.Subject = obj.Subject;
                ViewBag.StartDate = obj.StartDate;
                ViewBag.EndDate = obj.EndDate;
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
                if (items.ENoticeId != 0)
                {
                    return View();
                }
                else
                {
                    return Json(items.ENoticeId);
                }               
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }
        


        #endregion



        #region Cool Links              ////----

        public IActionResult ManageCoolLinks()
        {
            //var InstanceId = Request.Cookies["INSTANCEID"];
            //ViewBag.Instanceid = InstanceId;

            //var UserId = Request.Cookies["LoginUserId"];
            //ViewBag.LoginUserId = UserId;


            return View();
        }


        public IActionResult ManageCoolLinks_Tabledata(string LinkName, string LinkURL, string Description)//int InstanceId,
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


        #endregion

        #region  MANAGE HOLIDAYS         ////----

        public IActionResult ManageHolidays()
        {
            return View();
        }

        public IActionResult ManageHolidaysTabledata(Manageholidays obj)
        {
            List<Manageholidays> items = new List<Manageholidays>();
            try
            {
                if (obj.Year == 0)
                {
                    obj.Year = default;
                }
                if (obj.Month == null)
                {
                    obj.Month = default;
                }
                if (obj.Type == 0)
                {
                    obj.Type = default;
                }
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageHolidays_tbl?InstanceId=" + InstanceId + "&Year=" + obj.Year + "&Month=" + obj.Month + "&Type=" + obj.Type).Result;
                //var errorContent = response.Content.ReadAsStringAsync().Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<Manageholidays>>(data);
                }

                ViewBag.Holidayslist = items;
                ViewBag.Holidayslistcount = items.Count();
                return Json(items);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }

        [HttpGet]
        public IActionResult Insert_Holiday()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Insert_Holiday(Manageholidays obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Manageholidays_Insert", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
            //return View();
        }

        [HttpGet]
        public IActionResult Update_Holiday(int HolidayId)
        {
            //exec stp_tblInstanceHolidays_SELECT @HolidayId=3454
            Manageholidays model = new Manageholidays();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Edit_Holiday?HolidayId=" + HolidayId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<Manageholidays>(data);
            }
            ViewBag.Items = model;
            return View();
        }

        [HttpPost]
        public IActionResult Update_Holiday(Manageholidays obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Manageholidays_Update", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
        }


        public IActionResult Delete_Holiday(int HolidayId)
        {
            string items = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Delete_Holiday?HolidayId=" + HolidayId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }

        [HttpGet]
        public IActionResult Holidayspostusers(int HolidayId)
        {
            int CountFlag = 1;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Holidaysuserposting?InstanceId=" + InstanceId + "&CountFlag=" + CountFlag + "&CreatedBy=" + UserId + "&HolidayId=" + HolidayId).Result;
            TemplateDetails_SMS items = new TemplateDetails_SMS();
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<TemplateDetails_SMS>(data);
            }

            ViewBag.List = items;
            return View();
        }

        [HttpPost]
        public IActionResult Holidayspostusers(Manageholidays obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Manageholidays_Mailsmspostinguser", content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            return Json(items);
        }
        #endregion

        #region    ManageQuote  ////---
        public IActionResult ManageQuote()
        {
            return View();
        }

        public IActionResult ManageQuoteTabledata(Managequote obj)
        {
            List<Managequote> items = new List<Managequote>();
            try
            {
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageQuote_tbl?InstanceId=" + InstanceId + "&Quote=" + obj.Quote + "&DisplayDate=" + obj.DisplayDate).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<Managequote>>(data);
                }

                ViewBag.Holidayslist = items;
                ViewBag.Holidayslistcount = items.Count();
                return Json(items);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }

        [HttpGet]
        public IActionResult Insert_Quote()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Insert_Quote(Managequote obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageQuote_Insert", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
            //return View();
        }

        [HttpGet]
        public IActionResult Update_Quote(int Quoteid)
        {

            Managequote model = new Managequote();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Edit_ManageQuote?Quoteid=" + Quoteid).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<Managequote>(data);
            }
            ViewBag.Items = model;
            return View();
        }

        [HttpPost]
        public IActionResult Update_Quote(Managequote obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageQuote_Update", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
        }


        public IActionResult Delete_Quote(int QuoteId)
        {
            string items = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Delete_ManageQuote?QuoteId=" + QuoteId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }

        #endregion


        #region  MANAGE DEPARTMENT  ///----

        public IActionResult ManageClassification()
        {
            return View();
        }

        public IActionResult ManageClassificationTabledata(ManageClassification obj)
        {
            List<ManageClassification> items = new List<ManageClassification>();
            try
            {
                obj.InstanceId = InstanceId;
                if (obj.ClassificationDescription == null)
                {
                    obj.ClassificationDescription = "";
                }
                if (obj.ClassificationName == null)
                {
                    obj.ClassificationName = "";
                }
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageClassification_tbl?InstanceId=" + InstanceId + "&ClassificationDescription=" + obj.ClassificationDescription + "&ClassificationName=" + obj.ClassificationName).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<ManageClassification>>(data);
                }

                ViewBag.Holidayslist = items;
                ViewBag.Holidayslistcount = items.Count();
                return Json(items);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }

        [HttpGet]
        public IActionResult Insert_Classification()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Insert_Classification(ManageClassification obj)
        {
            string items = "";
            obj.ProgramTypeId = 0;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Classification_Insert", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);

        }

        [HttpGet]
        public IActionResult Update_Classification(int InstanceClassificationId)
        {
            //exec stp_tblInstanceHolidays_SELECT @HolidayId=3454
            ManageClassification model = new ManageClassification();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Edit_Classification?InstanceClassificationId=" + InstanceClassificationId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<ManageClassification>(data);
            }
            ViewBag.Items = model;
            return View();
        }

        [HttpPost]
        public IActionResult Update_Classification(ManageClassification obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Classification_Update", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
        }


        public IActionResult Delete_Classification(int InstanceClassificationId)
        {
            string items = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Delete_Classification?InstanceClassificationId=" + InstanceClassificationId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }

        #endregion


        #region  MANAGE BEST PERFORMERS  ///----

        public IActionResult ManageBestPerformer()
        {
            return View();
        }

        public IActionResult ManageBestPerformerTabledata(BestPerformer obj)
        {
            List<BestPerformer> items = new List<BestPerformer>();
            try
            {
                if (obj.Title == null)
                {
                    obj.Title = default;
                }
                if (obj.IsWelcomePage == null)
                {
                    obj.IsWelcomePage = default;
                }

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Managebestperformer_tbl?InstanceId=" + InstanceId + "&Title=" + obj.Title + "&IsWelcomePage=" + obj.IsWelcomePage).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<BestPerformer>>(data);
                }

                ViewBag.Holidayslist = items;
                ViewBag.Holidayslistcount = items.Count();
                return Json(items);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }




        [HttpGet]
        public IActionResult Insert_ManageBestPerformer()
        {
            return View();
        }

        public IActionResult Adding_BestPerformer_dds()
        {
            BestPerformer model = new BestPerformer();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BestPerformer_dds?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<BestPerformer>(data);
            }
            ViewBag.Classification = model.ClassificationList;
            ViewBag.Rolelist = model.RoleList;

            return Json(model);
            //return View();
        }


        public IActionResult Adding_BestPerformer_Subclassification_dd(int InstanceClassificationId)
        {
            BestPerformer model = new BestPerformer();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BestPerformer_Subclassification_dds?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<BestPerformer>(data);
            }
            return Json(model);
        }

        [HttpPost]
        public IActionResult Adding_BestPerformer_Searchtabledata(BestPerformer obj)
        {
            List<BestPerformer> items = new List<BestPerformer>();
            try
            {
                obj.InstanceId = InstanceId;
                string data1 = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Adding_BestPerformertbl", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<BestPerformer>>(data);
                }

                return Json(items);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }

        [HttpPost]
        public IActionResult Insert_ManageBestPerformer(BestPerformer obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

            var instanceId = InstanceId;
            var Documentattachement = obj.EventPhoto; //EventPhoto
            Random random = new Random();
            int randomNumber = random.Next(1000, 999999);
            if (Documentattachement != null)
            {
                obj.Eventphotos = Documentattachement.FileName;

                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Eventbestperformersdocs");

                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }

                string instanceFolderPath = Path.Combine(folderPath, "Instanceid" + instanceId);

                if (!Directory.Exists(instanceFolderPath))
                {
                    Directory.CreateDirectory(instanceFolderPath);
                }

                string output = Regex.Replace(Documentattachement.FileName, @"^\d+", "");
                var filenamedoc = randomNumber + output;
                var fileNamedoc = Path.GetFileName(filenamedoc);
                var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                string uploadsdoc = Path.Combine("wwwroot", "Eventbestperformersdocs", "Instanceid" + instanceId, fileNamedoc);
                //obj.DocSize = randomNumber.ToString();
                using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                {
                    Documentattachement.CopyTo(fileSrteam);
                }
            }


            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Managebestperformer_Insert", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
            //return View();
        }

        [HttpGet]
        public IActionResult Update_ManageBestPerformer(int PerformerId)
        {
            //exec stp_tblInstanceHolidays_SELECT @HolidayId=3454
            BestPerformer model = new BestPerformer();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Managebestperformer_Edit?PerformerId=" + PerformerId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<BestPerformer>(data);
            }
            ViewBag.Items = model;
            return View();
        }

        [HttpPost]
        public IActionResult Update_ManageBestPerformer(Manageholidays obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Manageholidays_Update", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
        }


        public IActionResult Delete_ManageBestPerformer(int PerformerId)
        {
            string items = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Managebestperformer_Delete?PerformerId=" + PerformerId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }

        #endregion


        #region  MANAGE CLASSES  ///----

        public IActionResult ManageSubClassification()
        {
            return View();
        }

        public IActionResult InstanceClassification_DD()
        {
            ManageSubClassification model = new ManageSubClassification();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageClassification_dd?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<ManageSubClassification>(data);
            }
            return Json(model);
        }

        public IActionResult Subclass_Classteacher_DD()
        {
            string RoleName = "TEACHER,DISCIPLINE ADMINISTRATOR,CO-CLASS TEACHER,PROGRAM LEADER,CLASS TEACHER,EXECUTIVE ASSISTANT,ASSOCIATE DIRECTOR,DISCIPLINE DATA ENTRY COORDINATOR,DISCIPLINE LEADER,COUNSELLOR,TEACHER ADMIN,HR COORDINATOR,HR MANAGER,IT COORDINATOR,PROGRAM COORDINATOR,ADMISSIONSTUDENT,ADMISSIONPARENT,ADMISSION ADMINISTRATOR,CCE CO-ORDINATOR";
            ManageSubClassification model = new ManageSubClassification();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageClassTeacher_dd?InstanceId=" + InstanceId + "&RoleName=" + RoleName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<ManageSubClassification>(data);
            }
            return Json(model);
        }


        public IActionResult Subclass_CoClassteacher_DD()
        {
            string RoleName = "TEACHER,DISCIPLINE ADMINISTRATOR,CO-CLASS TEACHER,PROGRAM LEADER,CLASS TEACHER,ASSOCIATE DIRECTOR,DISCIPLINE DATA ENTRY COORDINATOR,DISCIPLINE LEADER,COUNSELLOR,TEACHER ADMIN,HR COORDINATOR,HR MANAGER,IT COORDINATOR,PROGRAM COORDINATOR,ADMISSIONSTUDENT,ADMISSIONPARENT,ADMISSION ADMINISTRATOR,CCE CO-ORDINATOR";
            ManageSubClassification model = new ManageSubClassification();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageClassTeacher_dd?InstanceId=" + InstanceId + "&RoleName=" + RoleName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<ManageSubClassification>(data);
            }
            return Json(model);
        }

        public IActionResult Subclass_Tabledata(ManageSubClassification obj)
        {
            List<ManageSubClassification> items = new List<ManageSubClassification>();
            try
            {
                //exec stp_tblInstanceSubClassification_SEARCH @InstanceId = 545,@InstanceClassificationId = 0,@SubClassificationName = '',@SubClassificationDescription = ''

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManagesubClassificationtbl?InstanceId=" + InstanceId + "&InstanceClassificationId=" + obj.InstanceClassificationId + "&SubClassificationName=" + obj.SubClassificationName + "&SubClassificationDescription=" + obj.SubClassificationDescription).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<ManageSubClassification>>(data);
                }
                return Json(items);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }





        [HttpGet]
        public IActionResult Insert_ManageSubClassification()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Insert_ManageSubClassification(ManageSubClassification obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageSubClassification_Insert_", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            //IsActive
            return View();
        }


        [HttpGet]
        public IActionResult Update_ManageSubClassification(int PerformerId)
        {
            //exec stp_tblInstanceHolidays_SELECT @HolidayId=3454
            BestPerformer model = new BestPerformer();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Managebestperformer_Edit?PerformerId=" + PerformerId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<BestPerformer>(data);
            }
            ViewBag.Items = model;
            return View();
        }

        [HttpPost]
        public IActionResult Update_ManageSubClassification(Manageholidays obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Manageholidays_Update", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
        }


        public IActionResult Delete_ManageSubClassification(int PerformerId)
        {
            string items = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Managebestperformer_Delete?PerformerId=" + PerformerId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }

        #endregion





       
       
    }
}
