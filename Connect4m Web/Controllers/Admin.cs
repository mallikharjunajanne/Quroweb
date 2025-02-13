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
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
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
        #region ADMIN MENU
        [Authorize]
        public IActionResult AdminMenu()
        {
            List<LoginModel> items = new List<LoginModel>();
            var InstanceId = Request.Cookies["INSTANCEID"];
            var UserId = Request.Cookies["LoginUserId"];
            using (var tempClient = _httpClientFactory.CreateClient())
            {
                string originalBaseAddress = client.BaseAddress.ToString();
                tempClient.BaseAddress = new Uri(originalBaseAddress.Replace("/UsersScreens", "/ApplyStudentAttendance"));
                LoginModel val = new LoginModel();
                val.UserId = Convert.ToInt32(UserId);
                val.RoleId = Convert.ToInt32(Request.Cookies["Roleid"]);
                val.InstanceID = Convert.ToInt32(InstanceId);
                val.CategoryId = 10;

                string data11 = JsonConvert.SerializeObject(val);
                StringContent content = new StringContent(data11, Encoding.UTF8, "application/json");              
                HttpResponseMessage response1 = tempClient.PostAsync(tempClient.BaseAddress + "/GetAdminMenuItems_Modified", content).Result;
                if (response1.IsSuccessStatusCode)
                {
                    string data1 = response1.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<LoginModel>>(data1);
                }
            }
            ViewBag.Menuitems = items;
            return View();
        }

        public IActionResult AdminSubMenus(int categoryId)
        {
            List<LoginModel> items = new List<LoginModel>();
            //int GroupId = categoryId;
            //int RoleId= Convert.ToInt32(Request.Cookies["Roleid"]);
            //string InstanceId = InstanceId;
            //int MenuId = 1;
            //string UserId = UserId;

            using (var tempClient = _httpClientFactory.CreateClient())
            {
                string originalBaseAddress = client.BaseAddress.ToString();
                tempClient.BaseAddress = new Uri(originalBaseAddress.Replace("/UsersScreens", "/ApplyStudentAttendance"));
                LoginModel val = new LoginModel();
                val.UserId = Convert.ToInt32(UserId);
                val.RoleId = Convert.ToInt32(Request.Cookies["Roleid"]);
                val.InstanceID = Convert.ToInt32(InstanceId);
                val.CategoryId = categoryId;
                val.MenuId = 1;


                string data11 = JsonConvert.SerializeObject(val);
                StringContent content = new StringContent(data11, Encoding.UTF8, "application/json");
                HttpResponseMessage response1 = tempClient.PostAsync(tempClient.BaseAddress + "/GetAdminSubMenuItems", content).Result;
                if (response1.IsSuccessStatusCode)
                {
                    string data1 = response1.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<LoginModel>>(data1);
                }
            }
            return Json(items);
        }
        #endregion
        //NEW MANAGE NOTICES START HERE

        #region MANAGE NOTICE HOME 

        public IActionResult ManageNotice()
        {
            return View();
        }
        public IActionResult BindCategoryddl()
        {
            List<SelectListItem> items = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Categoryddl?InstanceId=" + InstanceId + "&Userid=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(items);
        }
        public IActionResult BindManagenoticetbl(ManageNotice obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.GetAll = 0;
            List<ManageNotice> list = CommonMethodobj.CommonListMethod<ManageNotice, ManageNotice>(obj, "/BindManagenoticetbl", client);
            return Json(list);

            // OLD METHOD NAMES
            //USP_Noticestabledata  API METHOD
            //NoticeTypes CLASS NAME
            //_ManageNotices_TableData Partial View Name
        }
        public IActionResult ManagenoticetblExporttoexcel(ManageNotice obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<ManagenoticeExporttoexcel> list = CommonMethodobj.CommonListMethod<ManageNotice, ManagenoticeExporttoexcel>(obj, "/ManagenoticetblExporttoexcel", client);
            return Json(list);

            //Exporttoexcel API OLD METHDO NAME
        }
        public IActionResult Deletenotice(int ENoticeId)
        {
            ManageNotice obj = new ManageNotice();
            string items = string.Empty;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.Enoticeid = ENoticeId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Deletenotice", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = data2;
            }
            return Json(items);

            //USP_NoticesDelete  API OLD METHOD
        }
        public IActionResult Editnotice(int ENoticeId)
        {
            Managenoticesinsert managenoticesinsert = new Managenoticesinsert();
            Managenoticesinsert obj = null;

            managenoticesinsert.InstanceId = InstanceId;
            managenoticesinsert.CreatedBy = UserId;
            managenoticesinsert.ENoticeId = ENoticeId;

            List<Managenoticesinsert> list
                = CommonMethodobj.CommonListMethod<Managenoticesinsert, Managenoticesinsert>(managenoticesinsert, "/Editnotice", client);

            List<SelectListItem> items = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Categoryddl?InstanceId=" + InstanceId + "&Userid=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }

            if (list.Count > 0)
            {
                obj = list[0];
                ViewBag.Enoticetypeid = obj.ENoticeTypeId;
                ViewBag.Enoticetypeddl = items;
                return View(obj);
            }
            return Json("1");
            //USP_NoticesEdit
            //Homenoticeupdate
            //List<Homenoticeupdate> item = new List<Homenoticeupdate>();
            //_ManageNotices_Create
        }
        public IActionResult Updatenoticepost(Managenoticesinsert obj)
        {
            string data2 = string.Empty;
            string fileName = string.Empty;
            string filePath = string.Empty;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            var instanceId = InstanceId;
            var Documentattachment = obj.AttachedDocument;

            if (Documentattachment != null)
            {
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Managenoticesdocs", "Instanceid" + instanceId);
                Directory.CreateDirectory(folderPath); // Ensure directory exists

                fileName = Path.GetFileName(Documentattachment.FileName);
                filePath = Path.Combine(folderPath, fileName);

                // Check if file already exists
                if (System.IO.File.Exists(filePath))
                {
                    return Json("File already exists");
                }

                // Update object properties
                obj.NoticeDocument = fileName;
                obj.DocSize = Path.GetFileNameWithoutExtension(fileName);
                      
                obj.AttachedDocument = null; // Reset to prevent unnecessary processing or errors
            }
            obj.AttachedDocument = null;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
           // HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Insertnotice", content).Result;
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Updatenotice", content).Result;
            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                if (data2 == "Not Inserted")
                {
                    return Json(data2);
                }
                else
                {
                    if (Documentattachment != null)
                    {
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            Documentattachment.CopyTo(fileStream);
                        }
                    }

                }
            }
            return Json(data2);
        }
        public IActionResult Updatenotice(Managenoticesinsert obj)
        {
            //NEW //PostUpdatenoticeTemplates :- API CALLING ACTION METHOD 
            try
            {
                //Managenotices_saveNposting
                //ENoticeTypes

                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.DisplayOrder = 2;
                obj.CountFlag = 1;

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
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PostUpdatenoticeTemplates", content).Result;

                SMStemplatedetails items = new SMStemplatedetails();
                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<SMStemplatedetails>(data2);
                }
                ViewBag.List = items;

                //Targetenoticetbl = Count = 6

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


        #region CREATE NOTICE 
        public IActionResult Createnotice()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Createnotice(Managenoticesinsert obj)
        {

            //USP_NoticesInsert API OLD METHOD
            //ENoticeTypes
            string data2 = string.Empty;
            string fileName = string.Empty;
            string filePath = string.Empty;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            var instanceId = InstanceId;
            var Documentattachment = obj.AttachedDocument;

            if (Documentattachment != null)
            {
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Managenoticesdocs", "Instanceid" + instanceId);
                Directory.CreateDirectory(folderPath); // Ensure directory exists

                fileName = Path.GetFileName(Documentattachment.FileName);
                filePath = Path.Combine(folderPath, fileName);

                // Check if file already exists
                if (System.IO.File.Exists(filePath))
                {
                    return Json("File already exists");
                }

                // Save file
                //using (var fileStream = new FileStream(filePath, FileMode.Create))
                //{
                //    Documentattachment.CopyTo(fileStream);
                //}

                // Update object properties
                obj.NoticeDocument = fileName;
                obj.DocSize = Path.GetFileNameWithoutExtension(fileName);
                // Example: Store the file size or any other metadata

                // Optionally, you can delete the original file after processing
                obj.AttachedDocument = null; // Reset to prevent unnecessary processing or errors
            }
            obj.AttachedDocument = null;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Insertnotice", content).Result;
            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                if (data2 == "Not Inserted")
                {
                    return Json(data2);
                }
                else
                {
                    if (Documentattachment != null)
                    {
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            Documentattachment.CopyTo(fileStream);
                        }
                    }

                }
            }
            return Json(data2);
            //return View();
        }

        #endregion

        #region POST NOTICE SECTION
        public IActionResult Noticepost(Managenoticesinsert obj)
        {
            try
            {
                //Managenotices_saveNposting//ENoticeTypes

                //Postnoticesmstemplates
                //USP_NoticessmstemplateInsert API OLD METHOD
                //TemplateDetails_SMS API OLD METHOD

                //obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
                //obj.SMSFromText = "ADSTEK";
                //obj.Action = "credits";
                //obj.DMLTYPE = "GETRECORDS";

                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.DisplayOrder = 2;
                obj.CountFlag = 1;

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
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Postnoticesmstemplates", content).Result;

                SMStemplatedetails items = new SMStemplatedetails();
                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<SMStemplatedetails>(data2);
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
        public IActionResult NoticeClassificatinddl()//ManageNotices_InstanceClassificationSearch
        {
            List<ClassificationList> item = new List<ClassificationList>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BindingNoticeClassificationddl?InstanceId=" + InstanceId + "&Userid=" + UserId).Result;
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USPSMSTD_Classification?InstanceId=" + InstanceId + "&Userid=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<ClassificationList>>(data);
            }
            return Json(item);
        }
        public IActionResult Noticeclassesbysubclassddl(int Classificationid)//ManageNotices_InstanceSubClassificationSearch
        {
            List<SubclassificationList> item = new List<SubclassificationList>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/BindingNoticeclassesbysubclassddl?InstanceId=" + InstanceId + "&Classificationid=" + Classificationid + "&Createdby=" + UserId).Result;
        
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<SubclassificationList>>(data);
            }
            return Json(item);
        }
        public IActionResult NoticeSearchuserstbldata(Noticeuserstbl obj)//ManageNotices_PostNoticeSearchtabledata
        {
            List<Postnoticetabledate> list = new List<Postnoticetabledate>();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

            if (obj.NoOfUsers == "OneTwoZero")
            {
                list = CommonMethodobj.CommonListMethod<Noticeuserstbl, Postnoticetabledate>(obj, "/NoticeSearchuserstbldata", client);
            }
            else
            {
                //obj.ExcludeUserIds ="";
                list = CommonMethodobj.CommonListMethod<Noticeuserstbl, Postnoticetabledate>(obj, "/NoticeSearchuserstbldata", client);
            }
            return Json(list);

            //USPSMSTD_PostNoticeSearchtaledata             API OLD METHODS
            //Allusers_USPSMSTD_PostNoticeSearchtaledata    API OLD METHODS
        }
        public IActionResult NoticeSelectedbyuserids(string UserIds, string Noofusers)
        {
            //USPSMSTD_AddPostNoticeselusersbyuseridstaledata OLD METHOD

            List<Postnoticetabledate> item = new List<Postnoticetabledate>();
            if (Noofusers == "OneTwoZero")
            {
                //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USPSMSTD_AddPostNoticeselusersbyuseridstaledata?UserIds=" + UserIds).Result;
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Selectedbyuseridsaddnotice?UserIds=" + UserIds + "&InstanceId=" + InstanceId + "&Createdby=" + UserId).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data1 = response.Content.ReadAsStringAsync().Result;
                    item = JsonConvert.DeserializeObject<List<Postnoticetabledate>>(data1);
                }
            }
            else
            {
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/AllusersSelectedbyuseridsaddnotice?UserIds=" + UserIds + "&InstanceId=" + InstanceId + "&Createdby=" + UserId).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    item = JsonConvert.DeserializeObject<List<Postnoticetabledate>>(data2);
                }
            }
            return Json(item);
        }

        [HttpPost]
        public IActionResult Noticesms_mailsposting(PostNoticesmsmails obj)
        {
            //Class Name:- Enoticetemplates
            //Method Name:-ENoticeMailSms_INSERT

            obj.DMLTYPE = "GETRECORDS";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.NotificationSubject = "Notices";
            string items = string.Empty;
            ExistingSmsmailsdetails items1 = new ExistingSmsmailsdetails();
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Notice_Notificationsinsert", content).Result;
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Notices_SavePusNotifications", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);

                int Postnoticereturnvalue = int.Parse(items);
                //if (obj.SendEMail == "1" && obj.IncludeParents== "1"|| obj.SendEMail == "0" && obj.IncludeParents == "0"|| obj.SendEMail == "0" && obj.IncludeParents == "1"|| obj.SendEMail == "1" && obj.IncludeParents == "0")
                //{

                //}
                if (obj.SendEMail == "1" && obj.IncludeParents == "1")
                {
                    if (Postnoticereturnvalue > 0)
                    {
                        string data3 = JsonConvert.SerializeObject(obj);
                        StringContent contents = new StringContent(data3, Encoding.UTF8, "application/json");
                        HttpResponseMessage rep = client.PostAsync(client.BaseAddress + "/NOTICE_PUSHNOTIFICATIONS", content).Result;
                        if (rep.IsSuccessStatusCode)
                        {
                            string data4 = rep.Content.ReadAsStringAsync().Result;
                            items1 = JsonConvert.DeserializeObject<ExistingSmsmailsdetails>(data4);
                            return Json(items1);
                        }
                        else
                        {
                            Console.WriteLine("Failed to retrieve data from the API. Status code: " + response.StatusCode);
                        }
                    }
                }
                else if (obj.SendEMail == "1")
                {
                    if (Postnoticereturnvalue > 0)
                    {
                        string data3 = JsonConvert.SerializeObject(obj);
                        StringContent contents = new StringContent(data3, Encoding.UTF8, "application/json");
                        HttpResponseMessage rep = client.PostAsync(client.BaseAddress + "/NOTICE_PUSHNOTIFICATIONS", content).Result;
                        if (rep.IsSuccessStatusCode)
                        {
                            string data4 = rep.Content.ReadAsStringAsync().Result;
                            items1 = JsonConvert.DeserializeObject<ExistingSmsmailsdetails>(data4);
                            return Json(items1);
                        }
                        else
                        {
                            Console.WriteLine("Failed to retrieve data from the API. Status code: " + response.StatusCode);
                        }
                    }
                }
                else if (obj.IncludeParents == "1")
                {
                    if (Postnoticereturnvalue > 0)
                    {
                        string data3 = JsonConvert.SerializeObject(obj);
                        StringContent contents = new StringContent(data3, Encoding.UTF8, "application/json");
                        HttpResponseMessage rep = client.PostAsync(client.BaseAddress + "/NOTICE_PUSHNOTIFICATIONS", content).Result;
                        if (rep.IsSuccessStatusCode)
                        {
                            string data4 = rep.Content.ReadAsStringAsync().Result;
                            items1 = JsonConvert.DeserializeObject<ExistingSmsmailsdetails>(data4);
                            return Json(items1);
                        }
                        else
                        {
                            Console.WriteLine("Failed to retrieve data from the API. Status code: " + response.StatusCode);
                        }
                    }
                }
                else
                {
                    return Json(items);
                }
                //Can not send SMS as the SMS Mode is OFF. ==3
                //if (Postnoticereturnvalue > 0)
                //{
                //    string data3 = JsonConvert.SerializeObject(obj);
                //    StringContent contents = new StringContent(data3, Encoding.UTF8, "application/json");
                //    HttpResponseMessage rep = client.PostAsync(client.BaseAddress + "/NOTICE_PUSHNOTIFICATIONS", content).Result;
                //    if (rep.IsSuccessStatusCode)
                //    {
                //        string data4 = rep.Content.ReadAsStringAsync().Result;
                //        items1 = JsonConvert.DeserializeObject<ExistingSmsmailsdetails>(data4);
                //        return Json(items1);
                //    }
                //    else
                //    {
                //        Console.WriteLine("Failed to retrieve data from the API. Status code: " + response.StatusCode);
                //    }
                //}
            }
            return Json("-1");
        }



        #endregion

        #region CREATE SMS
        public IActionResult Createsms()
        {
            //Templatesms:- OLD CLASS NAME
            //USP_Noticesmstemplate:API METHOD NAME

            SMSTemplates obj = new SMSTemplates();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            
            List<SMSTemplates> list 
                = CommonMethodobj.CommonListMethod<SMSTemplates, SMSTemplates>(obj, "/Bindsmstemplatestbl", client);
            ViewBag.SMSTemplates = list;
            return View();
        }

        public IActionResult SMSNotice_Templatedetails(int TemplateMasterPK)
        {
            //SMSTemplates : OLD CLASS NAME
            //USP_SMSTemplateandDetails: API CALLING METHOD
            //SMS_TemplateandDetails: ACTION METHOD NAME

            SMSTemplates obj = new SMSTemplates();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.TemplateMasterPK = TemplateMasterPK;

            List<SMSTemplates> list
                = CommonMethodobj.CommonListMethod<SMSTemplates, SMSTemplates>(obj, "/SMSNotice_Templatedetails", client);
            ViewBag.SMSTemplates = list;
            return View();
        }

        [HttpPost]
        public IActionResult SMSNotice_SavePosting(SMSTemplates_Insert obj)
        {
            //ManagenoticeSMS_saveNposting : OLD ACTION METHOD NAME
            //InsertTemplatesms : OLD CLASS NAME
            //USP_NoticessmstemplateInsert : OLD API CALLING METHOD NAME
            //TemplateDetails_SMS OLD CLASS NAME DINIKI BADHULU E CLASS NAME USE CHESTUNAM : SMStemplatedetails
            //InsertTemplatesms OLD CLASS NAME DINIKI BADHULU E CLASS NAME USE CHESTUNAM : SMSTemplates_Insert



            obj.DisplayOrder = 1;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;            
            obj.NoticeDocument = " ";
            obj.DocSize = default;
            obj.ShowInLogin = "0";
            obj.IsGlobalNotice = 0;

            //obj.SMSTextInXML = BuildSMSTextInXML("ADS", "Prasad2$$9");
            // obj.SMSFromText = "ADSTEK";
            // obj.Action = "credits";  


            if (obj.NoticeDocument == null)
            {
                obj.NoticeDocument = "";
            }
            ViewBag.Subject = obj.Subject;
            ViewBag.StartDate = obj.StartDate;
            ViewBag.EndDate = obj.ExpiryDate;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/USP_NoticessmstemplateInsert", content).Result;
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Postnoticesmstemplates", content).Result;
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Postnoticesmstemplates_Insert", content).Result;

           // TemplateDetails_SMS items = new TemplateDetails_SMS();
            SMStemplatedetails items = new SMStemplatedetails();
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<SMStemplatedetails>(data2);
                ViewBag.List = items;

                return View();
            }
            return Json("1");            
        }

        [HttpPost]
        public IActionResult NOTICESMSMail_POSTING(PostNoticesmsmails obj)
        {
            //Class Name:- Enoticetemplates
            //Method Name:-ENoticeMailSms_INSERT

            obj.DMLTYPE = "GETRECORDS";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.NotificationSubject = "Notices";
            string items = string.Empty;
            ExistingSmsmailsdetails items1 = new ExistingSmsmailsdetails();
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Notice_Notificationsinsert", content).Result;
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Notices_SavePusNotifications", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);

                int Postnoticereturnvalue = int.Parse(items);

                if ((obj.Studentsms == "1" || obj.Studentsms == "0") && (obj.Parentsms == "1" || obj.Parentsms == "0") &&
                    (obj.Studentmail == "1" || obj.Studentmail == "0") && (obj.Parentmail == "1" || obj.Parentmail == "0"))
                {
                    //if (obj.Studentsms == "1" && obj.Parentsms == "1" && obj.Studentmail == "1" && obj.Parentmail == "1")
                    //{

                    //}
                    //else if (obj.Studentsms == "1" && obj.Parentsms == "1")
                    //{
                    //}
                    //else if (obj.Studentmail == "1" && obj.Parentmail == "1")
                    //{

                    //}
                    //else
                    //{

                    //}


                        if (Postnoticereturnvalue > 0)
                        {
                            string data3 = JsonConvert.SerializeObject(obj);
                            StringContent contents = new StringContent(data3, Encoding.UTF8, "application/json");
                            HttpResponseMessage rep = client.PostAsync(client.BaseAddress + "/CREATESMSNOTICE_PUSHNOTIFICATIONS", contents).Result;
                        if (rep.IsSuccessStatusCode)
                        {
                            string data4 = rep.Content.ReadAsStringAsync().Result;
                            items1 = JsonConvert.DeserializeObject<ExistingSmsmailsdetails>(data4);
                            int studentlist = items1.studentlist.Count();
                            int parentlist = items1.parentlist.Count();

                            if (studentlist == 0 && parentlist == 0)
                            {
                                return Json(items);
                            }
                            return Json(items1);
                        }
                        else
                        {
                            Console.WriteLine("Failed to retrieve data from the API. Status code: " + response.StatusCode);
                        }
                    }
                    
                }  
                else
                {
                    return Json(items);
                }

                //Can not send SMS as the SMS Mode is OFF. ==3
                //if (Postnoticereturnvalue > 0)
                //{
                //    string data3 = JsonConvert.SerializeObject(obj);
                //    StringContent contents = new StringContent(data3, Encoding.UTF8, "application/json");
                //    HttpResponseMessage rep = client.PostAsync(client.BaseAddress + "/CREATESMSNOTICE_PUSHNOTIFICATIONS", contents).Result;
                //    if (rep.IsSuccessStatusCode)
                //    {
                //        string data4 = rep.Content.ReadAsStringAsync().Result;
                //        items1 = JsonConvert.DeserializeObject<ExistingSmsmailsdetails>(data4);
                //        return Json(items1);
                //    }
                //    else
                //    {
                //        Console.WriteLine("Failed to retrieve data from the API. Status code: " + response.StatusCode);
                //    }
                //}
            }
            return Json("-1");
        }

        #endregion

        #region CREATE NOTICE SMS
        public IActionResult Createnoticeandsms()
        {
            return View();
        }



        #endregion

        #endregion

        //NEW MANAGE NOTICES END HERE

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

        #region COOL LINKS

        public IActionResult ManageCoolLinks()
        {
            return View();
        }

        public IActionResult BindCoollinkstbl(CoolLinks links)
        {
            List<CoolLinks> list = new List<CoolLinks>();
            links.InstanceId = InstanceId;
            links.CreatedBy = UserId;
            list = CommonMethodobj.CommonListMethod<CoolLinks, CoolLinks>(links, "/GetCoolLinks", client);
            return Json(list);
        }

        public IActionResult InsertCoollink(int? CoollinkId)
        {
            return View();
        }

        [HttpPost]
        public IActionResult InsertCoollink(CoolLinks obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string Returnvalue = CommonInsertingMethod(obj, "/Insertcoollink");
            return Json(Returnvalue);
        }

        [HttpPost]
        public IActionResult DeleteCoollink(int CoollinkId)
        {
            CoolLinks obj = new CoolLinks();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.Id = CoollinkId;
            string Returnvalue = CommonInsertingMethod(obj, "/Deletecoollink");
            return Json(Returnvalue);
        }

        [HttpGet]
        public IActionResult EditCoollink(int CoollinkId)
        {
            CoolLinks links = new CoolLinks();
            links.Id = CoollinkId;
            links.InstanceId = InstanceId;
            links.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(links);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Editcoollink", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                links = JsonConvert.DeserializeObject<CoolLinks>(data);
            }
            return View(links);
        }

        [HttpPost]
        public IActionResult UpdateCoollink(CoolLinks obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string Returnvalue = CommonInsertingMethod(obj, "/Updatecoollink");
            return Json(Returnvalue);
        }


        #endregion

        #region  MANAGE HOLIDAYS 

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
                string message = ex.Message;
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
            model.HolidayId = model.HolidayId;
            model.Sdate =Convert.ToDateTime(model.StartDate);
            model.Sdate =Convert.ToDateTime(model.StartDate);
            model.Edate = Convert.ToDateTime(model.EndDate);
            model.HolidayName = model.HolidayName;
            model.HType = int.Parse(model.HolidayType);
            ViewBag.Items = model;
            return View(model);
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

        #region MANAGE QUOTE
        public IActionResult ManageQuote()
        {
            return View();
        }

        public IActionResult ManageQuoteTabledata(Managequote quotes)
        {
            List<Managequote> list = new List<Managequote>();
            quotes.InstanceId = InstanceId;
            quotes.CreatedBy = UserId;
            quotes.Quote = quotes.Quote;
            quotes.DisplayDate = quotes.DisplayDate;
            list = CommonMethodobj.CommonListMethod<Managequote, Managequote>(quotes, "/GetManagequotetbl", client);
            return Json(list);
        }

        [HttpGet]
        public IActionResult Insert_Quote()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Insert_Quote(Managequote obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string Returnvalue = CommonInsertingMethod(obj, "/Insertmanagequote");
            return Json(Returnvalue);
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
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string Returnvalue = CommonInsertingMethod(obj, "/Updatemanagequote");
            return Json(Returnvalue);
        }

        public IActionResult Delete_Quote(int QuoteId)
        {
            Managequote obj = new Managequote();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.QuoteId = QuoteId;
            string Returnvalue = CommonInsertingMethod(obj, "/DeleteManagequote");
            return Json(Returnvalue);
        }

        #endregion

        #region MANAGE CALENDAR
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
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/CalendarEvents?InstanceId=" + InstanceId + "&EventTitle=" + obj.EventTitle + "&EventDate=" + obj.dateofevent + "&MonthId=" + obj.MonthId+ "&Createdby="+ UserId).Result;
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Deleteeventcalendar?EventId=" + EventId + "&InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }
        #endregion

        #region  MANAGE DEPARTMENT 

        public IActionResult ManageClassification()
        {
            return View();
        }

        public IActionResult ManageClassificationTabledata(ManageClassification classification)
        {
            try
            {
                List<ManageClassification> classificationslist = new List<ManageClassification>();
                classification.InstanceId = InstanceId;
                classification.CreatedBy = UserId;
                classification.ClassificationDescription ??= "";
                classification.ClassificationName ??= "";
                classificationslist = CommonMethodobj.CommonListMethod<ManageClassification, ManageClassification>(classification, "/Getmanageclassificationtbl", client);
                return Json(classificationslist);
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
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.ProgramTypeId = 0;
            string Returnvalue = CommonInsertingMethod(obj, "/Insertclassification");
            return Json(Returnvalue);
        }

        [HttpGet]
        public IActionResult Update_Classification(int InstanceClassificationId)
        {
            ManageClassification model = new ManageClassification();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/EditClassification?InstanceClassificationId=" + InstanceClassificationId).Result;
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
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string Returnvalue = CommonInsertingMethod(obj, "/Updateclassification");
            return Json(Returnvalue);
        }

        public IActionResult Delete_Classification(int InstanceClassificationId)
        {
            ManageClassification obj = new ManageClassification();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.InstanceClassificationId = InstanceClassificationId;
            string Returnvalue = CommonInsertingMethod(obj, "/Deleteclassification");
            return Json(Returnvalue);
        }

        #endregion

        #region  MANAGE BEST PERFORMERS

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

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Getbestperformertbl?InstanceId=" + InstanceId + "&Title=" + obj.Title + "&IsWelcomePage=" + obj.IsWelcomePage + "&CreatedBy=" + UserId).Result;
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetBestPerformerddls?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Getbestperformerclassficationddlbysubclassddl?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&CreatedBy=" + UserId).Result;
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
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Insertbestperformer", content).Result;
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/EditBestperformer?PerformerId=" + PerformerId).Result;

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
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/UpdateBestperformer", content).Result;
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/DeleteBestperformer?PerformerId=" + PerformerId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = data;
            }

            return Json(items);
        }

        #endregion

        #region  MANAGE CLASSES

        public IActionResult ManageSubClassification()
        {
            return View();
        }
        public IActionResult Subclass_Tabledata(ManageSubClassification obj)
        {
            List<ManageSubClassification> items = new List<ManageSubClassification>();
            try
            {
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
        public IActionResult Insertmanagebankdeposit()
        {
            string[] parameter2 = null;
            List<SelectListItem> li = new List<SelectListItem>();
            li = CommonDropdownData("PaymentModeddl", parameter2, "Mode", "PaymentModeId");
            ViewBag.PaymentModeddl = li.Where(item => item.Text == "Cash" || item.Text == "UPI" || item.Text == "Google Pay" || item.Text == "Phonepe").ToList();
            
            return View();
        }
       
        [HttpPost]
        public IActionResult Insertmanagebankdeposit(Bankdeposit obj)
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.BankName = "HDFC Bank";
                obj.Branchname= "Marredpally";
                obj.Accountnumber= "99998367009696";
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

                //if (obj.FeeDepositId == null || obj.FeeDepositId == 0)
                //{
                    Returnvalue = CommonInsertingMethod(obj, "/Insert_Bankdeposite");
                //}
                //else
                //{
                //    Returnvalue = CommonInsertingMethod(obj, "/Update_Bankdeposit");
                //}
                return Json(Returnvalue);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public IActionResult Updatemanagebankdeposit(int? ManageBankdepositid)
        {
            Bankdeposit obj = new Bankdeposit();

            string[] parameter2 = null;
            List<SelectListItem> li = new List<SelectListItem>();
            li = CommonDropdownData("PaymentModeddl", parameter2, "Mode", "PaymentModeId");
            ViewBag.PaymentModeddl = li.Where(item => item.Text == "Cash" || item.Text == "UPI" || item.Text == "Google Pay" || item.Text == "Phonepe").ToList();


            obj.InstanceId = InstanceId;
            obj.FeeDepositId = ManageBankdepositid;
            List<Bankdeposit> list = CommonMethodobj.CommonListMethod<Bankdeposit, Bankdeposit>(obj, "/Edit_Bankdeposit", client);

            Bankdeposit model = new Bankdeposit();

            if (list != null && list.Any())
            {
                model = list.First();
                model.Datedeposit = model.Datedeposit;
                //model.AttachedDocument = model.DocumentName;
                ViewBag.Documentname = model.DocumentName;
                ViewBag.instanceid = model.InstanceId;
            }
            return View(model);
        }

        [HttpPost]
        public IActionResult Updatemanagebankdeposit(Bankdeposit obj)
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.BankName = "HDFC Bank";
                obj.Branchname = "Marredpally";
                obj.Accountnumber = "99998367009696";
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
                DateTime date = obj.Datedeposit;
                string Returnvalue;
                Returnvalue = CommonInsertingMethod(obj, "/Update_Bankdeposit");

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
            List<SelectListItem> lis = li.Where(item => item.Value == "96").ToList();
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
            obj.InstanceUserCode = obj.InstanceUserCode;
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
                obj.CreatedBy = UserId;
                List<AdmissionProcess> list
                    = CommonMethodobj.CommonListMethod<AdmissionProcess, AdmissionProcess>(obj, "/EditAdmissionDetails", client);
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
            //try
            //{
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.AcademicYear = DateTime.Now.Date.Year.ToString();
            string Returnvalue = CommonInsertingMethod(obj, "/InsertAdmissionDetails");
            return Json(new { ReturnValue = Returnvalue, MethodName = "Insert" });
            //}
            //catch (Exception ex)
            //{
            //    string Errormessage = ex.Message;
            //    return RedirectToAction("QuroAdmissionProcess");
            //}
        }

        [HttpPost]
        public IActionResult QuroAdmissionProcessUpdate(AdmissionProcess obj)
        {
            try
            {
                obj.InstanceId = InstanceId;
                obj.CreatedBy = UserId;
                obj.AcademicYear = DateTime.Now.Year.ToString();
                string Returnvalue = CommonInsertingMethod(obj, "/UpdateAdmissionDetails");

                //1216 Something went wrong 
                //-2 === //User already exists.
                //If lngUpdatereturn > 0 Then
                //    lblMsg.Text = "Data Updated Successfully."
                //    btnApplnSubmit.Enabled = False
                //Else
                //    lblMsg.Text = strRecordUpdationError
                ////End If
                //If lngreturn = "-2" Then
                //    lblMsg.Text = "User already exists."
                //ElseIf lngreturn<> "" Then
                //   regNo = lngreturn
                //    lblMsg.Text = "Data inserted Successfully."

                return Json(new { ReturnValue = Returnvalue, MethodName = "Update" });
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
            List<ConfirmAdmissionProcesstbl> list;
            List<ConfirmAdmissionProcesstbl> ClassSectionddllist;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            list = CommonMethodobj.CommonListMethod<Confirmadmissions, ConfirmAdmissionProcesstbl>(obj, "/Confirmadmissionstbl", client);

            ClassSectionddllist = CommonMethodobj.CommonListMethod<Confirmadmissions, ConfirmAdmissionProcesstbl>(obj, "/GetClassSectionddl", client);
            ViewBag.classsectionddl = ClassSectionddllist;
            string[] parameter2 = new string[] { InstanceId.ToString() }; //InstanceId.ToString(),
            List<SelectListItem> li = new List<SelectListItem>();
            li = CommonDropdownData("BindClassificationDropdown", parameter2, "ClassificationName", "InstanceClassificationId");
            ViewBag.Classificationdropdown = li;

            string[] parameter3 = new string[] { InstanceId.ToString(),obj.ClassId.ToString() }; //InstanceId.ToString(),
            List<SelectListItem> Subclassli = new List<SelectListItem>();
            Subclassli = CommonDropdownData("BindSubclassificationDropdown", parameter3, "ClassificationName", "InstanceClassificationId");
            ViewBag.SubClassificationdropdown = Subclassli;

            return View(list);
        }

        public IActionResult ConfirmAdmissionInsertion(ConfirmAdmissionProcesstbl confirmAdmission)
        {
            int Instanceid=confirmAdmission.InstanceId;
            int UpdatedBy = confirmAdmission.UserId;
            string AdmissionNo = confirmAdmission.AdmNo;
            string ExpectedJoiningDAte = confirmAdmission.DateOfJoining;
            int? RegistrationUserid = confirmAdmission.RegistrationUserid;
            string SubClassificationID = confirmAdmission.Instancesubclassificationid;
            string UserName = confirmAdmission.UserName;
            
            string Returnvalue = CommonInsertingMethod(confirmAdmission, "/CheckAndConfirmAdmissions");
            //return Json(new { ReturnValue = Returnvalue, MethodName = "Insert" });

            //CheckAndConfirmAdmissions // Api calling method name 
            return Json("1216");
        }

        #endregion

        #endregion


        #region MANAGE NOTICE LAST TRY
        public IActionResult Manage_Notices()
        {           
            return View();
        }
        
        public IActionResult _bindCategoryddl()
        {
            string[] parameter2 = new string[] { InstanceId.ToString() , UserId.ToString() };
            List<SelectListItem> li = CommonDropdownData("BindCategoryddl", parameter2, "CategoryName", "CategoryId");
            return Json(li);
        }
        
        public IActionResult _bindManagenoticetbl(_ManageNotice obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.GetAll = 0;
            List<_ManageNotice> list = CommonMethodobj.CommonListMethod<_ManageNotice, _ManageNotice>(obj, "/BindEnoticetbl", client);
            return Json(list);
        }
        
        public IActionResult _ManagenoticetblExporttoexcel(_ManageNotice obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<_ManagenoticeExporttoexcel> list = CommonMethodobj.CommonListMethod<_ManageNotice, _ManagenoticeExporttoexcel>(obj, "/EnoticetblExporttoexcel", client);
            return Json(list);
        }
              
        public IActionResult _DeleteNotice(int ENoticeId)
        {
            _ManageNotice obj = new _ManageNotice();
            obj.Enoticeid = ENoticeId;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string Returnvalue = CommonInsertingMethod(obj, "/EnoticeDelete");
            return Json(Returnvalue);
        }

        #region Create SMS and Notice Scheduling - Save and Post SMS

        [HttpPost]
        public IActionResult _SaveAndPostSMSSchedulingNotice(Createnotice _senderService)
        {
            try
            {
                // Set required properties
                _senderService.InstanceId = InstanceId;
                _senderService.CreatedBy = UserId;

                // Set additional properties
                _senderService.DisplayOrder = 2;
                _senderService.CountFlag = 2;
                _senderService.ShowInLogin = "0";
                _senderService.IsGlobalNotice = 0;

                var documentAttachment = _senderService.AttachedDocument;

                // Handle file attachment if provided
                if (_senderService.ENoticeId == 0 && documentAttachment != null)
                {
                    string fileName = SaveDocument(documentAttachment);
                    if (string.IsNullOrEmpty(fileName))
                    {
                        return Json("File already exists");
                    }
                    _senderService.NoticeDocument = fileName;
                    _senderService.DocSize = Path.GetFileNameWithoutExtension(fileName);
                    _senderService.AttachedDocument = null; // Reset to prevent errors
                }
                else
                {
                    _senderService.NoticeDocument = null;
                    _senderService.AttachedDocument = null;
                }                

                // Prepare for API call
                ViewBag.Subject = _senderService.Subject;
                ViewBag.StartDate = _senderService.StartDate;
                ViewBag.EndDate = _senderService.ExpiryDate;

                var content = new StringContent(JsonConvert.SerializeObject(_senderService), Encoding.UTF8, "application/json");
                var response = client.PostAsync(client.BaseAddress + "/Postsmsmailnoticetemplate", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    var items = JsonConvert.DeserializeObject<NoticeTemplateDetails>(response.Content.ReadAsStringAsync().Result);
                    ViewBag.List = items;                    
                    return View();
                }
                return Json("Error in inserting data");
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "An error occurred while processing the request. Please try again later.");
                return View();
            }
        }

        #endregion

        #region CREATE NOTICE

        public IActionResult _Createnotice()
        {
            string[] parameter2 = new string[] { InstanceId.ToString(), UserId.ToString() };
            ViewBag.viewbaglistvalues = CommonDropdownData("BindCategoryddl", parameter2, "CategoryName", "CategoryId");
            return View();
        }

        [HttpPost]
        public IActionResult _Createnotice(Createnotice _createnotice)
        {
            Random random = new Random();

            _createnotice.InstanceId = InstanceId;
            _createnotice.CreatedBy = UserId;
            var documentAttachment = _createnotice.AttachedDocument;

            int randomNumber = random.Next(1000, 999999);

            if (documentAttachment != null)
            {
                string fileName = SaveDocument(documentAttachment);
                if (string.IsNullOrEmpty(fileName))
                {
                    return Json("File already exists");
                }
                _createnotice.AttachedDocument = null; // Reset to prevent errors
                _createnotice.NoticeDocument = fileName;
                _createnotice.DocSize = randomNumber.ToString(); // Set DocSize to the random number
            }

            string Returnvalue = CommonInsertingMethod(_createnotice, "/SaveNotice");
            return Json(Returnvalue);
        }

        private string SaveDocument(IFormFile documentAttachment)
        {
            try
            {
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Managenoticesdocs", $"Instanceid{InstanceId}");
                Directory.CreateDirectory(folderPath);

                string fileName = Path.GetFileName(documentAttachment.FileName);
                string filePath = Path.Combine(folderPath, fileName);

                // Check if the file already exists
                if (System.IO.File.Exists(filePath))
                {
                    return null; // Return null if file exists
                }

                // Save the document
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    documentAttachment.CopyTo(fileStream);
                }

                return fileName; // Return file name if saved successfully
            }
            catch (Exception ex)
            {
                return null;
                throw;
            }
        }
        #endregion

        #region CREATE SMS
        public IActionResult _Createsms()
        {
            Createsms createsms = new Createsms();
            createsms.InstanceId = InstanceId;
            createsms.CreatedBy = UserId;
            List<Createsms> list= CommonMethodobj.CommonListMethod<Createsms, Createsms>(createsms, "/_Bindsmstemplatestbl", client);
            ViewBag.SMSTemplates = list;            
            return View();
        }

        public IActionResult GetTemplateDetails(int TemplateMasterPK)
        {
            Createsms obj = new Createsms();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.TemplateMasterPK = TemplateMasterPK;
            List<Createsms> list= CommonMethodobj.CommonListMethod<Createsms, Createsms>(obj, "/_GetInstanceTemplateDetails", client);
            return Json(list);            
        }

        [HttpPost]
        public IActionResult _SaveAndPostSMSNotice(InsertSmsTemplateService templateService)
        {
            templateService.DisplayOrder = 1;
            templateService.InstanceId = InstanceId;
            templateService.CreatedBy = UserId;
            templateService.NoticeDocument = templateService.NoticeDocument ?? string.Empty;
            templateService.DocSize = default;
            templateService.ShowInLogin = "0";
            templateService.IsGlobalNotice = 0;

            ViewBag.Subject = templateService.Subject;
            ViewBag.StartDate = templateService.StartDate;
            ViewBag.EndDate = templateService.ExpiryDate;

            var content = new StringContent(JsonConvert.SerializeObject(templateService), Encoding.UTF8, "application/json");
            //var response = client.PostAsync(client.BaseAddress + "/Postnoticesmstemplates_Insert", content).Result;
            var response = client.PostAsync(client.BaseAddress + "/InsertSMSNoticeTemplate", content).Result;

            if (response.IsSuccessStatusCode)
            {
                var items = JsonConvert.DeserializeObject<NoticeTemplateDetails>(response.Content.ReadAsStringAsync().Result);
                ViewBag.List = items;
                //return Json('1');
                return View();
            }

            return Json("1");
        }

        public IActionResult SMSSchedulerInsert(SMSchedulingTimeParameters _senderService)
        {
            string items = string.Empty;

            _senderService.WHATTOSENT = 1;

            string data1 = JsonConvert.SerializeObject(_senderService);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            client.Timeout = TimeSpan.FromMinutes(2);
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertNoticeNotifications", content).Result;//Notice_Notificationsinsert_
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
                int Postnoticereturnvalue = int.Parse(items);
            }
            return View();
        }


        #region SMS Template Posting, Email, and SMS Sending

        public IActionResult GetNoticeClassificatinddl()
        {
            string[] parameter2 = new string[] { InstanceId.ToString(), UserId.ToString() };
            List<SelectListItem> li = CommonDropdownData("bindnoticeClassificationddl", parameter2, "CategoryName", "CategoryId");
            return Json(li);
        }

        public IActionResult GetNoticeClassesbySubClass(int Classificationid)
        {
            string[] parameter2 = new string[] { InstanceId.ToString(), UserId.ToString(), Classificationid.ToString() };
            List<SelectListItem> li = CommonDropdownData("bindnoticeclassesbysubclassddl", parameter2, "SubClassificationName", "InstanceSubClassificationId");
            return Json(li);
        }

        public IActionResult Searchaddusersfornoticedata(addusersfornoticedata addusersfornoticedata)
        {
            addusersfornoticedata.InstanceId = InstanceId;
            addusersfornoticedata.CreatedBy = UserId;
            List<NoticeTableData> list =CommonMethodobj.CommonListMethod<addusersfornoticedata, NoticeTableData>(addusersfornoticedata, "/GetUsersNoticetbldata", client);
            return Json(list);
        }

        public IActionResult GetUsersaddnotice(string UserIds, string Noofusers)
        {
            addusersfornoticedata addusersfornoticedata = new addusersfornoticedata();
            addusersfornoticedata.InstanceId = InstanceId;
            addusersfornoticedata.CreatedBy = UserId;
            addusersfornoticedata.UserIds = UserIds;
            addusersfornoticedata.NoOfUsers = Noofusers;
            List<NoticeTableData> list= CommonMethodobj.CommonListMethod<addusersfornoticedata, NoticeTableData>(addusersfornoticedata, "/GetUsersaddtonotice", client);
            return Json(list);
        }

        public IActionResult SelectUsersForNotice(string UserIds, string Noofusers)
        {
            addusersfornoticedata addusersfornoticedata = new addusersfornoticedata();
            addusersfornoticedata.InstanceId = InstanceId;
            addusersfornoticedata.CreatedBy = UserId;
            addusersfornoticedata.UserIds = UserIds;
            addusersfornoticedata.NoOfUsers = Noofusers;
            List<NoticeTableData> list= CommonMethodobj.CommonListMethod<addusersfornoticedata, NoticeTableData>(addusersfornoticedata, "/GetUsersaddtonotice", client);
            return Json(list);
        }

        public IActionResult RemoveUsersFromNotice(string UserIds, string Noofusers)
        {
            addusersfornoticedata addusersfornoticedata = new addusersfornoticedata();
            addusersfornoticedata.InstanceId = InstanceId;
            addusersfornoticedata.CreatedBy = UserId;
            addusersfornoticedata.UserIds = UserIds;
            addusersfornoticedata.NoOfUsers = Noofusers;
            List<NoticeTableData> list= CommonMethodobj.CommonListMethod<addusersfornoticedata, NoticeTableData>(addusersfornoticedata, "/GetUsersaddtonotice", client);
            return Json(list);
        }

        [HttpPost]
        public IActionResult SendNoticeWithEmailAndSMS(NoticeSenderService _senderService)
        {
            string items = string.Empty;

            _senderService.DMLTYPE = "GETRECORDS";
            _senderService.NotificationSubject = "Notices";
            _senderService.InstanceId = InstanceId;
            _senderService.CreatedBy = UserId;

            string data1 = JsonConvert.SerializeObject(_senderService);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");

            // Set a timeout for the HttpClient
            //client.Timeout = TimeSpan.FromSeconds(30); // Set a 30-second timeout (you can adjust the time)
            client.Timeout = TimeSpan.FromMinutes(2);
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertNoticeNotifications", content).Result;//Notice_Notificationsinsert_
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
                int Postnoticereturnvalue = int.Parse(items);
            }
            return Json("-1");
        }

        //Click the save button to trigger this action method, which will call the API action method to save the timing settings.
        //SMSScheduler
        #endregion


        #endregion

        #region CREATE NOTICE && SMS

        public IActionResult _Createnoticesms()
        {
            string[] parameter2 = new string[] { InstanceId.ToString(), UserId.ToString() };
            ViewBag.viewbaglistvalues = CommonDropdownData("BindCategoryddl", parameter2, "CategoryName", "CategoryId");
            return View();
        }

        [HttpPost]
        public IActionResult _Createnoticesms(Createnotice _createnotice)
        {
            Random random = new Random();

            _createnotice.InstanceId = InstanceId;
            _createnotice.CreatedBy = UserId;
            var documentAttachment = _createnotice.AttachedDocument;

            int randomNumber = random.Next(1000, 999999);

            if (documentAttachment != null)
            {
                string fileName = SaveDocument(documentAttachment);

                // Get the file size in bytes
                FileInfo fileInfo = new FileInfo(fileName);
                long fileSizeInBytes = fileInfo.Length;

                // Convert to KB and store in float (if needed)
                float fileSizeInKB = (float)(fileSizeInBytes / 1024.0);  // Convert bytes to KB
                float fileSizeInMB = (float)(fileSizeInKB / 1024.0);     // Convert KB to MB

                string docsize = Convert.ToString(fileSizeInMB);

                if (string.IsNullOrEmpty(fileName))
                {
                    return Json("File already exists");
                }
                _createnotice.AttachedDocument = null; // Reset to prevent errors
                _createnotice.NoticeDocument = fileName;
                //_createnotice.DocSize = randomNumber.ToString(); // Set DocSize to the random number
                _createnotice.DocSize = docsize; // Set DocSize to the random number
            }

            string Returnvalue = CommonInsertingMethod(_createnotice, "/SaveNotice");
            return Json(Returnvalue);
        }
        
        #endregion


        #endregion

        public string CommonInsertingMethod<T>(T obj, string WebApiMethodname)
        {
            string returnval = "";           
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            client.Timeout = TimeSpan.FromMinutes(2);
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + WebApiMethodname, content).Result;
            if (response.IsSuccessStatusCode)
            {
                return returnval = response.Content.ReadAsStringAsync().Result;
            }
            var returnval1 = response.Content.ReadAsStringAsync().Result;
            HttpStatusCode statusCode = response.StatusCode;
            string returnmessage = statusCode.ToString();
           //return "0";
            return returnmessage;
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