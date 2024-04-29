using Connect4m_Web.Models.LMSproperties;
using Connect4m_Web.Views;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
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
        CommanMethodClass CommonMethodobj = new CommanMethodClass();


        public string BuildSMSTextInXML(string username, string password)
        {
            string xml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                         "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                         "<REQUESTCREDIT USERNAME=\"{username}\" PASSWORD=\"{password}\">" +
                         "</REQUESTCREDIT>";

            return xml;
        }

        #region Manage Notice 

        #region Home manage notice search screen

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

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_Noticestabledata?InstanceId=" + InstanceId + "&Subject=" + Subject + "&StartDate=" + StartDate + "&ExpiryDate=" + ExpiryDate + "&ENoticeTypeId=" + ENoticeTypeId + "&IsSMSTemplate=" + IsSMSTemplate + "&GetAll=" + GetAll + "&SMSTextInXML=" + SMSTextInXML + "&SMSFromText=" + SMSFromText + "&Action=" + Action + "&CreatedBy=" + CreatedBy).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
            }

            ViewBag.NoticeCount = item.Count();
            return Json(item);

            //return PartialView("_ManageNotices_TableData", item);
        }

        public IActionResult ManagenoticeExporttoexcel(string Subject, string StartDate, string ExpiryDate, int ENoticeTypeId, int IsSMSTemplate)
        {
            List<NoticeTypes> item = new List<NoticeTypes>();

            List<ManagenoticeExporttoexcel> livalues = new List<ManagenoticeExporttoexcel>();


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Exporttoexcel?InstanceId=" + InstanceId + "&Subject=" + Subject + "&StartDate=" + StartDate + "&ExpiryDate=" + ExpiryDate + "&ENoticeTypeId=" + ENoticeTypeId + "&IsSMSTemplate=" + IsSMSTemplate).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                livalues = JsonConvert.DeserializeObject<List<ManagenoticeExporttoexcel>>(data);
            }
            return Json(livalues);
        }

        public IActionResult Edit_ENotices_ById(int ENoticeId)
        {
            List<Homenoticeupdate> item = new List<Homenoticeupdate>();

            string SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
            string SMSFromText = "ADSTEK";
            string Action = "credits";
            int CreatedBy = UserId;





            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_NoticesEdit?ENoticeId=" + ENoticeId + "&SMSTextInXML=" + SMSTextInXML + "&SMSFromText=" + SMSFromText + "&Action=" + Action + "&CreatedBy=" + CreatedBy + "&InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Homenoticeupdate>>(data);
            }

            //return PartialView("_ManageNotices_Create", item);

            return Json(item);
        }

        [HttpPost]
        public IActionResult Edit_ENotices_ById(Homenoticeupdate obj)
        // public IActionResult Edit_ENotices_ById(NoticeTypes obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

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
            obj.AttachedDocument = null;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticesUpdate", content).Result;

            string items = "";
            string data2 = response.Content.ReadAsStringAsync().Result;
            if (response.IsSuccessStatusCode)
            {

                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }

        //HOME DELETE ICON USE THIS METHOD AND .....!
        public IActionResult Delete_ENotices_ById(int ENoticeId)
        {
            string item = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_NoticesDelete?ENoticeId=" + ENoticeId + "&InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<string>(data);
            }

            return Json(item);

        }

        #endregion





        #endregion

        #region Create Notice        

        [HttpGet]
        public IActionResult ManageNotices_Create()
        {
            return View();
            //return PartialView("_ManageNotices_Create");
        }

        [HttpPost]
        public IActionResult ManageNotices_Create(ENoticeTypes obj)
        {
            obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
            obj.SMSFromText = "ADSTEK";
            obj.Action = "credits";
            //int CreatedBy = UserId;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

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

                if (System.IO.File.Exists(filePathdoc))
                {
                    // File already exists, return a JSON response indicating the file exists
                    return Json("File already exists");
                }

                obj.DocSize = randomNumber.ToString();
                using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                {
                    Documentattachement.CopyTo(fileSrteam);
                }
            }
            obj.AttachedDocument = null;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticesInsert", content).Result;

            //string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                string items = data2;
                return Json(items);
            }
            else
            {
                return BadRequest("Error");
            }

            //return Json(items);
        }
        //public IActionResult Managenotices_saveNposting(TemplateDetails_SMS obj, NoticeTypes objs)
        public IActionResult Managenotices_saveNposting(ENoticeTypes obj)
        {
            try
            {
                obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
                obj.SMSFromText = "ADSTEK";
                obj.Action = "credits";
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.DisplayOrder = 2;
                obj.DMLTYPE = "GETRECORDS";
                obj.CountFlag = 1;


                //obj.InstanceId = InstanceId;
                //obj.CreatedBy = UserId;
                //obj.SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                //    "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                //    "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
                //    "</REQUESTCREDIT>";
                //obj.SMSFromText = "ADSTEK";
                //obj.Action = "credits";
                //objs.DisplayIcon = "";
                //objs.DisplayOrder = 2;
                //objs.ShowInLogin = "0";
                //obj.InstanceId = InstanceId;
                //obj.CreatedBy = UserId;
                //obj.StartDate = obj.SDate;
                //obj.EndDate = obj.ExDate;


                var Documentattachement = obj.AttachedDocument;


                //obj.EndDate = ConvertToDateTime(obj.ExDate);
                if (obj.ENoticeId == 0)
                {
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
                        //var filenamedoc = randomNumber + output;
                        var filenamedoc = output;
                        var fileNamedoc = Path.GetFileName(filenamedoc);
                        var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                        string uploadsdoc = Path.Combine("wwwroot", "Managenoticesdocs", "Instanceid" + InstanceId, fileNamedoc);
                        obj.DocSize = randomNumber.ToString();
                        using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                        {
                            Documentattachement.CopyTo(fileSrteam);
                        }
                    }
                }
                ViewBag.Subject = obj.Subject;
                ViewBag.StartDate = obj.StartDate;
                ViewBag.EndDate = obj.ExpiryDate;
                ViewBag.ENoticetypeid = obj.ENoticeTypeId;
                ViewBag.NoticeTypetext = obj.NoticeTypetext;
                ViewBag.ENoticeDescription = obj.ENoticeDescription;

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


        public IActionResult Selecteduserdelete(string Userids)
        {
            string item = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Postnoticeselecteduserdelete?Userids=" + Userids).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<string>(data);
            }
            return Json(item);
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



        #endregion

        #region Create SMS

        public IActionResult ManageNotices_CreateSMS()
        {
            List<Templatesms> item = new List<Templatesms>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_Noticesmstemplate?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;

                item = JsonConvert.DeserializeObject<List<Templatesms>>(data);
            }
            ViewBag.SMSTemplates = item;
            return View();
        }

        public IActionResult SMS_TemplateandDetails(int TemplateMasterPK)
        {

            List<Templatesms> item = new List<Templatesms>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_SMSTemplateandDetails?InstanceId=" + InstanceId + "&TemplateMasterPK=" + TemplateMasterPK).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Templatesms>>(data);
            }
            ViewBag.SMSTemplates = item;
            return View();
        }
        [HttpPost]
        //public IActionResult ManagenoticeSMS_saveNposting(TemplateDetails_SMS obj)
        //public IActionResult ManagenoticeSMS_saveNposting(ENoticeTypes obj)
        public IActionResult ManagenoticeSMS_saveNposting(InsertTemplatesms obj)
        {
            obj.DisplayOrder = 1;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
            obj.NoticeDocument = " ";
            obj.DocSize = default;
            obj.ShowInLogin = "0";
            obj.IsGlobalNotice = 0;
            obj.SMSFromText = "ADSTEK";
            obj.Action = "credits";


            //exec stp_tblENotices_INSERT
            //@InstanceId=545,
            //@ENoticeTypeId=0,
            //@Subject='Dear Staff, Wellcome.',
            //@ENoticeDescription=default,
            //@NoticeDocument='',@DocSize=default,
            //@StartDate='2024-02-17 00:00:00',
            //@ExpiryDate='2024-02-18 00:00:00',
            //@DisplayOrder=1,@DisplayIcon='281',@ShowInLogin=0,@CreatedBy=32891,@CreatedDate='2024-02-17 15:51:21.747',@IsGlobalNotice=0


            //obj.SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
            //    "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
            //    "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
            //    "</REQUESTCREDIT>";





            if (obj.NoticeDocument == null)
            {
                obj.NoticeDocument = "";
            }
            ViewBag.Subject = obj.Subject;
            ViewBag.StartDate = obj.StartDate;
            ViewBag.EndDate = obj.ExpiryDate;



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
        //public IActionResult ENoticeMailSms_INSERT(TemplateDetails_SMS obj)
        public IActionResult ENoticeMailSms_INSERT(Enoticetemplates obj)
        {
            obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
            obj.SMSFromText = "ADSTEK";
            obj.Action = "credits";
            obj.DMLTYPE = "GETRECORDS";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.NotificationSubject = "Notices";

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Notices_SavePusNotifications", content).Result;

            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_ENoticemails_smssendinginsert", content).Result;
            //SmsSendingResult items = new SmsSendingResult();

            if (response.IsSuccessStatusCode)
            {
                //items = JsonConvert.DeserializeObject<SmsSendingResult>(data2);

                string data2 = response.Content.ReadAsStringAsync().Result;
                string items = JsonConvert.DeserializeObject<string>(data2);
                return new JsonResult(items);
            }
            else
            {
                return BadRequest("Failed to insert data.");
            }

        }


        #endregion

        #region Create SMS and Notice      

        public IActionResult CreateSmsNNotice()
        {
            var noticeTypeData = GetNoticetypdedd();
            ViewBag.Noticetypedd = noticeTypeData;

            return View();
        }
        [HttpPost]
        //public IActionResult CreateSmsNNotice(NoticeTypes obj)
        public IActionResult CreateSmsNNotice(ENoticeTypes obj)
        {
            try
            {
                obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
                obj.SMSFromText = "ADSTEK";
                obj.Action = "credits";
                //int CreatedBy = UserId;
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;


                //obj.InstanceId = InstanceId;
                //obj.CreatedBy = UserId;
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
                    var filenamedoc = output;
                    //var filenamedoc = randomNumber + output;
                    var fileNamedoc = Path.GetFileName(filenamedoc);
                    var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                    string uploadsdoc = Path.Combine("wwwroot", "Managenoticesdocs", "Instanceid" + instanceId, fileNamedoc);

                    if (System.IO.File.Exists(filePathdoc))
                    {
                        // File already exists, return a JSON response indicating the file exists
                        return Json("File already exists");
                    }


                    obj.DocSize = randomNumber.ToString();
                    using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                    {
                        Documentattachement.CopyTo(fileSrteam);
                    }
                }
                obj.AttachedDocument = null;

                string jsonData = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticesInsert", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string responseapi = response.Content.ReadAsStringAsync().Result;
                    string item = JsonConvert.DeserializeObject<string>(responseapi);
                    return Json(item);
                }
                else
                {
                    return BadRequest("Error");
                }
                //return View();
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }

        //Searchuserstabledata_CSN
        //public IActionResult CreateSmsNNotice_PostthisnoticeBtn(NoticeTypes obj)//TemplateDetails_SMS objs,
        public IActionResult CreateSmsNNotice_PostthisnoticeBtn(ENoticeTypes obj)//TemplateDetails_SMS objs,
        {
            try
            {
                obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
                obj.SMSFromText = "ADSTEK";
                obj.Action = "credits";
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.DisplayOrder = 2;
                obj.DMLTYPE = "GETRECORDS";
                obj.CountFlag = 1;


                //obj.InstanceId = InstanceId;
                //obj.CreatedBy = UserId;
                //obj.SMSTextInXML = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                //    "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                //    "<REQUESTCREDIT USERNAME=\"ADS\" PASSWORD=\"Prasad2$$9\">" +
                //    "</REQUESTCREDIT>";
                //obj.SMSFromText = "ADSTEK";
                //obj.Action = "credits";
                //obj.DisplayIcon = "";
                //obj.DisplayOrder = 2;

                var Documentattachement = obj.AttachedDocument;
                if (obj.ENoticeId == 0)
                {
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
                        var filenamedoc = output;
                        //var filenamedoc = randomNumber + output;
                        var fileNamedoc = Path.GetFileName(filenamedoc);
                        var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                        string uploadsdoc = Path.Combine("wwwroot", "Managenoticesdocs", "Instanceid" + InstanceId, fileNamedoc);
                        if (System.IO.File.Exists(filePathdoc))
                        {
                            // File already exists, return a JSON response indicating the file exists
                            return Json("File already exists");
                        }

                        obj.DocSize = randomNumber.ToString();
                        using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                        {
                            Documentattachement.CopyTo(fileSrteam);
                        }
                    }
                }
                //==new
                ViewBag.Subject = obj.Subject;
                ViewBag.StartDate = obj.StartDate;
                ViewBag.EndDate = obj.ExpiryDate;
                ViewBag.ENoticetypeid = obj.ENoticeTypeId;
                ViewBag.NoticeTypetext = obj.NoticeTypetext;
                ViewBag.ENoticeDescription = obj.ENoticeDescription;


                //==old
                //ViewBag.Subject = obj.Subject;
                //ViewBag.StartDate = obj.StartDate;
                //ViewBag.EndDate = obj.EndDate;



                string data1 = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticessmstemplateInsert", content).Result;

                TemplateDetails_SMS items = new TemplateDetails_SMS();
                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<TemplateDetails_SMS>(data2);
                }
                ///=====NEW
                ViewBag.List = items;

                if (items.ENoticeId != 0)
                {
                    return View();
                }
                else
                {
                    return Json(items.ENoticeId);
                }

                //====OLD
                //ViewBag.List = items;
                //if (items.ENoticeId != 0)
                //{
                //    return View();
                //}
                //else
                //{
                //    return Json(items.ENoticeId);
                //}
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }

        [HttpPost]
        //public IActionResult ENoticeMailSms_INSERT(TemplateDetails_SMS obj)
        public IActionResult Enoticesmsandnotice_INSERT(Enoticetemplates obj)
        {
            obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
            obj.SMSFromText = "ADSTEK";
            obj.Action = "credits";
            obj.DMLTYPE = "GETRECORDS";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.NotificationSubject = "Notices";

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SMSNotice_SavePusNotifications", content).Result;
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Notices_SavePusNotifications", content).Result;

            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_ENoticemails_smssendinginsert", content).Result;
            //SmsSendingResult items = new SmsSendingResult();

            PostedNoticemessage model = new PostedNoticemessage();

            if (response.IsSuccessStatusCode)
            {
                //items = JsonConvert.DeserializeObject<SmsSendingResult>(data2);

                string data2 = response.Content.ReadAsStringAsync().Result;
                //string items = JsonConvert.DeserializeObject<string>(data2);
                model = JsonConvert.DeserializeObject<PostedNoticemessage>(data2);
                return new JsonResult(model);
            }
            else
            {
                return BadRequest("Failed to insert data.");
            }

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

        public IActionResult ManageNotices_PostNoticeSearchtabledata(string UserName, string InstanceRoleId, string FirstName, string LastName, string InstanceClassificationId, string InstanceSubClassificationId, string InstanceUserCodes, string PortalEmail, string RouteId, string CollegeHostel, string ExcludeUserIds, string Noofusers)
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





        #region Cool Links ////=====

        public IActionResult ManageCoolLinks()
        {
            return View();
        }


        public IActionResult ManageCoolLinks_Tabledata(string LinkName, string LinkURL, string Description)
        {
            List<CoolLinks> item = new List<CoolLinks>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_coollinks?InstanceId=" + InstanceId + "&LinkName=" + LinkName + "&LinkURL=" + LinkURL + "&Description=" + Description).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<CoolLinks>>(data);
            }

            //item = item.OrderBy(link => link.LinkName).ToList();
            //ViewBag.itemscount = item.Count();
            //return PartialView("_ManageCoolLinks_Tabledata", item);

            return Json(item);

        }

        [HttpPost]
        public IActionResult CoolLinks_INSERT(CoolLinks obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
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
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

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

        #region  MANAGE HOLIDAYS ////=====

        public IActionResult ManageHolidays()
        {
            return View();
        }

        public IActionResult ManageHolidaysTabledata(Manageholidays obj)
        {
            List<Manageholidays> items = new List<Manageholidays>();
            try
            {
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageHolidays_tbl?InstanceId=" + InstanceId + "&Year=" + obj.Year + "&Month=" + obj.Monthid + "&Type=" + obj.Type + "&CreatedBy=" + UserId).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<Manageholidays>>(data);
                }

                ViewBag.Holidayslist = items;
                ViewBag.Holidayslistcount = items.Count();
                return Json(items);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                string Issutype = ex.Message;
                string ModuleName = "ManageHolidays";
                string FunctionName = "Holidaysbindingfun";
                //return View();
                return RedirectToAction("CommonErrorpage", new { Message = Issutype, ModuleName = ModuleName, FunctionName = FunctionName });
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
            try
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
                return Json(items);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet]
        public IActionResult Update_Holiday(int HolidayId)
        {
            Manageholidays model = new Manageholidays();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Edit_Holiday?HolidayId=" + HolidayId + "&InstanceId=" + InstanceId + "&Createdby=" + UserId).Result;

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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Delete_Holiday?HolidayId=" + HolidayId + "&InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;

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

        #region    ManageQuote ////=====
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
            return View(model);
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

        #region MANAGE CALENDAR ////=====
        public IActionResult ManageCalendar()
        {
            List<EventsClander> items = new List<EventsClander>();
            ViewBag.EventCalendar = items;
            return View();
        }

        public IActionResult Calendareventstbl(EventsClander obj)
        {
            List<EventsClander> items = new List<EventsClander>();
            try
            {
                obj.InstanceId = InstanceId;


                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/CalendarEvents?InstanceId=" + InstanceId + "&EventTitle=" + obj.EventTitle + "&EventDate=" + obj.dateofevent + "&MonthId=" + obj.MonthId).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<EventsClander>>(data);
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

        public IActionResult CalendareventsInsert()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CalendareventsInsert(EventsClander obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

            string items = "";
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertCalendar", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            return Json(items);
        }
        [HttpGet]
        public IActionResult Update_Calendar(int EventId)
        {
            EventsClander model = new EventsClander();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/EditCalendarevents?EventId=" + EventId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<EventsClander>(data);
            }
            return View(model);
        }

        [HttpPost]
        public IActionResult Update_Calendar(EventsClander obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Updatecalendar", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            return Json(items);
        }


        public IActionResult Delete_Calendar(int EventId)
        {
            string items = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Deleteeventcalendar?EventId=" + EventId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }
        #endregion

        #region  MANAGE DEPARTMENT ////=====

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
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageClassification_tbl?InstanceId=" + InstanceId + "&ClassificationDescription=" + obj.ClassificationDescription + "&ClassificationName=" + obj.ClassificationName + "&CreatedBy=" + UserId).Result;
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

        #region  MANAGE BEST PERFORMERS ////=====

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

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Managebestperformer_tbl?InstanceId=" + InstanceId + "&Title=" + obj.Title + "&IsWelcomePage=" + obj.IsWelcomePage + "&CreatedBy=" + UserId).Result;
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BestPerformer_dds?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BestPerformer_Subclassification_dds?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&CreatedBy=" + UserId).Result;
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
        public IActionResult Update_ManageBestPerformer(BestPerformer obj)
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
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Managebestperformer_Update", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
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

        #region  MANAGE CLASSES ////=====

        public IActionResult ManageSubClassification()
        {
            return View();
        }
        public IActionResult Subclass_Tabledata(ManageSubClassification obj)
        {
            List<ManageSubClassification> items = new List<ManageSubClassification>();
            try
            {
                //exec stp_tblInstanceSubClassification_SEARCH @InstanceId = 545,@InstanceClassificationId = 0,@SubClassificationName = '',@SubClassificationDescription = ''

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManagesubClassificationtbl?InstanceId=" + InstanceId + "&InstanceClassificationId=" + obj.InstanceClassificationId + "&SubClassificationName=" + obj.SubClassificationName + "&SubClassificationDescription=" + obj.SubClassificationDescription + "&CreatedBy=" + UserId).Result;
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


        public IActionResult Subclassexporttoexcel(ManageSubClassification obj)
        {
            List<ManageSubClassification> items = new List<ManageSubClassification>();
            try
            {
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManagesubClassificationtblprint?InstanceId=" + InstanceId + "&InstanceClassificationId=" + obj.InstanceClassificationId + "&SubClassificationName=" + obj.SubClassificationName + "&SubClassificationDescription=" + obj.SubClassificationDescription).Result;
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
            obj.IsActive = 1;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageSubClassification_Insert", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            return Json(items);
        }




        [HttpGet]
        public IActionResult Update_ManageSubClassification(int InstanceSubClassificationId)
        {
            ManageSubClassification model = new ManageSubClassification();

            var dropdownResponse = client.GetAsync(client.BaseAddress + "/ManageClassification_dd?InstanceId=" + InstanceId).Result;
            var dropdownData = dropdownResponse.IsSuccessStatusCode ? dropdownResponse.Content.ReadAsStringAsync().Result : null;
            var dropdownModel = JsonConvert.DeserializeObject<ManageSubClassification>(dropdownData);
            ViewBag.Dropdowndata = dropdownModel?.ClassificationList;


            string roleName = "TEACHER,DISCIPLINE ADMINISTRATOR,CO-CLASS TEACHER,PROGRAM LEADER,CLASS TEACHER,EXECUTIVE ASSISTANT,ASSOCIATE DIRECTOR,DISCIPLINE DATA ENTRY COORDINATOR,DISCIPLINE LEADER,COUNSELLOR,TEACHER ADMIN,HR COORDINATOR,HR MANAGER,IT COORDINATOR,PROGRAM COORDINATOR,ADMISSIONSTUDENT,ADMISSIONPARENT,ADMISSION ADMINISTRATOR,CCE CO-ORDINATOR";
            var classTeacherResponse = client.GetAsync(client.BaseAddress + "/ManageClassTeacher_dd?InstanceId=" + InstanceId + "&RoleName=" + roleName + "&CreatedBy=" + UserId).Result;
            var classTeacherData = classTeacherResponse.IsSuccessStatusCode ? classTeacherResponse.Content.ReadAsStringAsync().Result : null;
            var classTeacherModel = JsonConvert.DeserializeObject<ManageSubClassification>(classTeacherData);
            ViewBag.Classteacherdd = classTeacherModel.ClassteacherList;
            ViewBag.Coclassteacherdd = classTeacherModel.CoClassteacherList;



            HttpResponseMessage editresponse = client.GetAsync(client.BaseAddress + "/Edit_GetSubclass?InstanceSubClassificationId=" + InstanceSubClassificationId).Result;

            if (editresponse.IsSuccessStatusCode)
            {
                string editmodeldata = editresponse.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<ManageSubClassification>(editmodeldata);
            }
            ViewBag.Items = model;
            return View(model);
        }

        [HttpPost]
        public IActionResult Update_ManageSubClassification(ManageSubClassification obj)
        {
            string items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/UpdateSubclass", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            ViewBag.List = items;
            return Json(items);
        }


        public IActionResult Delete_ManageSubClassification(int InstanceSubClassificationId)
        {
            string items = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Subclassdelete?InstanceSubClassificationId=" + InstanceSubClassificationId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }


        #endregion


        public IActionResult CommonErrorpage(string Message, string ModuleName, string FunctionName)
        {
            int instanceid = InstanceId;
            int userid = UserId;
            //string Issutype= "";
            //exec stp_tblErrorLog_INSERT
            //@InstanceId=545,
            //@UserId=32891,
            //@ErrorDescription='Object reference not set to an instance of an object.',@FunctionName='PUSHNotifications',@ModuleName='ManageNotices.aspx',@Message='Object reference not set to an instance of an object.',@Source='App_Web_srpe-7l3',@StackTrace='   at Admin_ManageNotices.btnPostNotice_Click(Object sender, EventArgs e)',@ErrorTime='04/12/2023 18:56:39',@CreatedBy=32891,@CreatedDate='2023-12-04 18:56:39.253'

            return View();
        }

        #region Bank Deposit Details
        public IActionResult ManageBankDeposit()
        {
            return View();
        }

        public IActionResult Paymentmodeddl()
        {
            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PaymentModeddl").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            var Fiterlist = li.Where(item => item.Text == "Cash" || item.Text == "UPI" || item.Text == "Google Pay" || item.Text == "Phonepe").ToList();
            return Json(Fiterlist);
        }

        public IActionResult ManageBankDeposittbl(SearchDeposit obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<Deposittbl> list = CommonMethodobj.CommonListMethod<SearchDeposit, Deposittbl>(obj, "/BankDeposittbl", client);
            return Json(list);
        }

        public IActionResult Insertmanagebankdeposit(int? ManageBankdepositid)
        {
            string[] parameter2 = null;
            List<SelectListItem> li = new List<SelectListItem>();
            li = CommonDropdownData("PaymentModeddl", parameter2, "Mode", "PaymentModeId");
            ViewBag.PaymentModeddl = li.Where(item => item.Text == "Cash" || item.Text == "UPI" || item.Text == "Google Pay" || item.Text == "Phonepe").ToList();

            if (ManageBankdepositid == null)
            {
                ViewBag.Returnmessage = "SaveMethod";
                return View();
            }
            else
            {
                Bankdeposit obj = new Bankdeposit();
                obj.InstanceId = InstanceId;
                obj.FeeDepositId = ManageBankdepositid;
                List<Bankdeposit> list = CommonMethodobj.CommonListMethod<Bankdeposit, Bankdeposit>(obj, "/Edit_Bankdeposit", client);

                Bankdeposit model = new Bankdeposit();
                ViewBag.Returnmessage = "UpdateMethod";
                if (list != null && list.Any())
                {
                    model = list.First(); // Assuming you want the first item from the list
                    //string datedeposit = model.Depositdate.Replace("/","-");
                    //DateTime date = Convert.ToDateTime(datedeposit);
                    //model.Depositdate = date.ToString();
                    string formattedDate = DateTime.ParseExact(model.Depositdate, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("yyyy-MM-dd");
                    model.Depositdate = formattedDate;
                }

                return View(model);
            }
        }

        [HttpPost]
        public IActionResult Insertmanagebankdeposit(Bankdeposit obj)
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;

                var Documentattachement = obj.AttachedDocument;
                Random random = new Random();
                int randomNumber = random.Next(1000, 999999);

                if (Documentattachement != null)
                {
                    string[] allowedExtensions = { ".doc", ".docx", ".pdf", ".jpeg", ".jpg", ".png", ".gif" };
                    string extension = Path.GetExtension(Documentattachement.FileName).ToLower();

                    if (allowedExtensions.Contains(extension))
                    {
                        obj.DocumentName = Documentattachement.FileName;

                        string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Bankdepositdoc");

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
                        var filenamedoc = output;
                        //var filenamedoc = randomNumber + output;
                        var fileNamedoc = Path.GetFileName(filenamedoc);
                        var filePathdoc = Path.Combine(instanceFolderPath, fileNamedoc);
                        string uploadsdoc = Path.Combine("wwwroot", "Bankdepositdoc", "Instanceid" + InstanceId, fileNamedoc);

                        if (System.IO.File.Exists(filePathdoc))
                        {
                            return Json("FileExist");
                            //File already exists
                        }
                        if (Documentattachement.Length > 1024 * 1024) // 1 MB = 1024 bytes * 1024 bytes
                        {
                            return Json("1MB");
                            //Document size cannot be greater than 1 MB.
                        }
                        obj.DocumentSize = randomNumber.ToString();
                        using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                        {
                            Documentattachement.CopyTo(fileSrteam);
                        }
                    }
                    else
                    {
                        return Json("FileNotExist");
                    }
                }
                obj.AttachedDocument = null;
                string Returnvalue;

                if (obj.FeeDepositId == null || obj.FeeDepositId == 0)
                {
                    Returnvalue = CommonInsertingMethod(obj, "/Insert_Bankdeposite");
                }
                else
                {
                    Returnvalue = CommonInsertingMethod(obj, "/Update_Bankdeposit");
                }
                return Json(Returnvalue);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        #endregion



        #region ADMISSION MODULE

        #region MANAGE ADMISSIONS
        public IActionResult QuroAdmissionProcess()
        {           
            return View();
        }
 
        public IActionResult GetInstancenamesDropdown()
        {
            string[] parameter2 = new string[] { InstanceId.ToString() };
            List<SelectListItem> lis = new List<SelectListItem>();
            lis = CommonDropdownData("BindInstancesDropdown", parameter2, "InstanceName", "InstanceId");
            return Json(lis);
        }           
        public IActionResult GetAcademicYearDropdown()
        {
            string[] parameter2 = new string[] { InstanceId.ToString() };
            List<SelectListItem> lis = new List<SelectListItem>();
            lis = CommonDropdownData("BindAcademicYearDropdown", parameter2, "Years", "AcademicYearId");
            return Json(lis);
        }      
        public IActionResult GetAllClass()
        {
            string[] parameter2 = new string[] { InstanceId.ToString() };
            List<SelectListItem> lis = new List<SelectListItem>();
            lis = CommonDropdownData("BindClassDropdown", parameter2, "ClassName", "ClassId");
            return Json(lis);
        }      
        public IActionResult GetAllcountrys()
        {         
            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BindcountryDropdown").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            //List<SelectListItem> lis= li.Where(item => item.Text.Contains("96") && item.Value == "96").ToList();
            List<SelectListItem> lis= li.Where(item => item.Value == "96").ToList();
            return Json(lis);
        }
        public IActionResult GetStatesddl(int CountryId)
        {
            string[] parameter2 = new string[] { CountryId.ToString() }; //InstanceId.ToString(),
            List<SelectListItem> li = new List<SelectListItem>();
            li = CommonDropdownData("BindStatesDropdown", parameter2, "StateName", "StateId");
            return Json(li);
        }
        public IActionResult QuroAdmissionProcesstbl(AdmissionProcesstbl obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<AdmissionProcesstbl> list = CommonMethodobj.CommonListMethod<AdmissionProcesstbl, AdmissionProcesstbl>(obj, "/BindAdmissiontbl", client);
            return Json(list);
        }
      
        public IActionResult QuroAdmissionProcess_New(int? RegistrationUserId)
        {
            AdmissionProcess obj = new AdmissionProcess();
            string instanceIdString = InstanceId.ToString();
            List<SelectListItem> Classli = CommonDropdownData("BindClassDropdown", new[] { instanceIdString }, "ClassName", "ClassId");

            List<SelectListItem> countryList = GetFilteredCountryList("96");

            List<SelectListItem> Statenamesli = CommonDropdownData("BindStatesDropdown", new[] { "96" }, "StateName", "StateId");

            if (RegistrationUserId == null)
            {
                ViewBag.Returnmessage = "SaveMethod";
                ViewBag.EditMode = false;
                ViewBag.Classnames = Classli;
                ViewBag.CountryNames = countryList;
                ViewBag.StateNames = Statenamesli;
                return View();
            }
            else
            {
                obj.InstanceId = InstanceId;
                obj.RegistrationUserId = RegistrationUserId;
                List<AdmissionProcess> list = CommonMethodobj.CommonListMethod<AdmissionProcess, AdmissionProcess>(obj, "/Edit_admission", client);
                ViewBag.Returnmessage = "UpdateMethod";
                obj = list.FirstOrDefault();
                ViewBag.EditMode = true;
                ViewBag.Classnames = Classli;
                ViewBag.CountryNames = countryList;
                ViewBag.StateNames = Statenamesli;
                return View(obj);
            }
        }

        private List<SelectListItem> GetFilteredCountryList(string filterValue)
        {
            List<SelectListItem> countryList = new List<SelectListItem>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BindcountryDropdown").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                countryList = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
                countryList = countryList.Where(item => item.Value == filterValue).ToList();
            }

            return countryList;
        }

        [HttpPost]
        public IActionResult QuroAdmissionProcess_New(AdmissionProcess obj)
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                //if (obj.RegistrationUserId != null)
                //{
                    string Returnvalue = CommonInsertingMethod(obj, "/Insert_admission");
                    return Json(new { ReturnValue = Returnvalue, MethodName = "Insert" });
                    //return Json(Returnvalue);
                //}
                //else
                //{
                //    string Returnvalue = CommonInsertingMethod(obj, "/Update_admission");
                //    return Json(Returnvalue);
                //}
            }
            catch (Exception ex)
            {
                string Errormessage = ex.Message;
                return RedirectToAction("QuroAdmissionProcess");
            }
        }

        [HttpPost]
        public IActionResult QuroAdmissionProcessUpdate(AdmissionProcess obj)
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                string Returnvalue = CommonInsertingMethod(obj, "/Update_admission");

                return Json(new { ReturnValue = Returnvalue, MethodName = "Update" });

                //List<ExaminationModel> list = CommonMethodobj.CommonListMethod<ExaminationModel, ExaminationModel>(obj, "/TblExamListData", client);
                //returnvalue = CommonSaveMethod(obj, "/BulkUploadSubjects");
                //if (returnvalue != "0")
                //{
                //    return Json(new { success = true, message = returnvalue });
                //    //return Json(returnvalue);
                //}
                //else
                //{
                //    return Json(new { success = false, message = "Something Error" });
                //}
                //return Json(Returnvalue);
            }
            catch (Exception ex)
            {
                string Errormessage = ex.Message;
                return RedirectToAction("QuroAdmissionProcess");
            }
        }
        #endregion

        #region CONFIRM ADMISSIONS
        //Datescomparing validation pending
        //Years dropdown dirrectly selected data that time from and to registrationdate feilds are disable

        public IActionResult ManageQuroAdmissions()
        {
            return View();
        }

        public IActionResult ConfirmAdmission()
        {
            return View();
        }

        public IActionResult ManageQuroAdmissionstbl(Confirmadmissions obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;            
            List<ConfirmAdmissionProcesstbl> list = CommonMethodobj.CommonListMethod<Confirmadmissions, ConfirmAdmissionProcesstbl>(obj, "/Confirmadmissionstbl", client);



            string[] parameter2 = new string[] { InstanceId.ToString() }; //InstanceId.ToString(),
            List<SelectListItem> li = new List<SelectListItem>();
            li = CommonDropdownData("BindClassificationDropdown", parameter2, "ClassificationName", "InstanceClassificationId");
            ViewBag.Classificationdropdown = li;

            string[] parameter3 = new string[] { InstanceId.ToString(),obj.ClassId.ToString() }; //InstanceId.ToString(),
            List<SelectListItem> Subclassli = new List<SelectListItem>();
            li = CommonDropdownData("BindSubclassificationDropdown", parameter3, "ClassificationName", "InstanceClassificationId");
            ViewBag.SubClassificationdropdown = Subclassli;

            return View(list);
        }

        #endregion

        #endregion

        public string CommonInsertingMethod<T>(T obj, string WebApiMethodname)
        {
            string returnval = "";           
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + WebApiMethodname, content).Result;
            if (response.IsSuccessStatusCode)
            {
                return returnval = response.Content.ReadAsStringAsync().Result;
            }
            var returnval1 = response.Content.ReadAsStringAsync().Result;
            return "0";
        }


   

        [Authorize]
        public List<SelectListItem> CommonDropdownData(string methodname, string[] Parameters, string text, string value)
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
    }
}
