using DinkToPdf;
using DinkToPdf.Contracts;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Http;
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
using Microsoft.AspNetCore.Authorization;

namespace Connect4m_Web.Controllers
{
    [Authorize]
    public class VideosController : Controller
    {

        //   Uri baseAddress = new Uri("https://localhost:44362/api/LMS");   //Web Api Address 
        // Uri baseAddress = new Uri("http://192.168.1.142:96/api/LMS");   // Local Host Address(publish in local host)
        //  HttpClient client;
        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;

        private readonly IUserService _userService;
        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)
        private readonly int UserId;
        private readonly int InstanceId;
        private readonly int InstanceClassificationId;
        private readonly int Roleid;
        private readonly int StudentUserId;
        //public readonly int DeclaringFinancialYearId = 534;
        public readonly int DeclaringFinancialYearId = 3166;

        private readonly PdfGenerator _pdfGenerator;

        public VideosController(PdfGenerator pdfGenerator, HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {

            this._pdfGenerator = pdfGenerator;

            //_httpClientFactory = httpClientFactory;
            //  client = _httpClientFactory.CreateClient();
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/LMS");

            //=======================================================  Assigning the values ti=o the the private varible
            _userService = userService;

            InstanceId = _userService.InstanceId;
            UserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            Roleid = _userService.Roleid;
            StudentUserId = _userService.LoginUserId;// Changed


        }

        //public int InstanceId = 515;
        //public int UserId = 217606;
        //public int RoleId = 4629;
        //public int StudentUserId = 29255;//-----Student Login

        public IActionResult Login()
        {
            //  InstanceId = 545;
            ViewBag.InitiallyVisible = true;


            return View();
        }

        //############################### // LEARNING MANAGEMENT SYSTEM //############################### //
        #region LEARNING MANAGEMENT SYSTEM 

        public IActionResult Chapter_wise_Video_playing()
        {
            return View();
        }
        public IActionResult popup_videouploading()
        {
            return View();
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // GETTING CLASS NAMES  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult GetClassnames(string ClassificationIds)
        {
            List<SelectListItem> Classlist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetClass?InstanceId=" + InstanceId + "&ClassificationIds=" + ClassificationIds).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Classlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }


            return Json(Classlist);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // GETTING SUBJECY NAMES //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult GetSubjectnames(string ClassificationIds, string InstanceSubClassificationId)
        {
            List<SelectListItem> Subjectlist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetSubject?InstanceId=" + InstanceId + "&ClassificationIds=" + ClassificationIds + "&InstanceSubClassificationId=" + InstanceSubClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Subjectlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }


            return Json(Subjectlist);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // GETTING SUBJECT TOOL NAMES //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult GetSubjecttoolnames(string InstanceSubjectsId)
        {
            List<SelectListItem> Subjecttoollist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetSubjecttool?InstanceId=" + InstanceId + "&InstanceSubjectsId=" + InstanceSubjectsId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Subjecttoollist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }


            return Json(Subjecttoollist);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // UPLOAD LECTURE DOCS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        [HttpGet]
        public IActionResult UploadLecturedocs(int videoId)
        {

            try
            {
                //*********************    Getting department

                List<SelectListItem> Departmentlist = new List<SelectListItem>();
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetDepartment?InstanceId=" + InstanceId).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    Departmentlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
                }
                ViewBag.Departmentlist = Departmentlist;

                if (videoId != 0)
                {

                    List<Uploaddocs> lecturedocslist = new List<Uploaddocs>();
                    HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/ListUpdateuploadlecturedocs?VideoId=" + videoId + "&InstanceId=" + InstanceId).Result;
                    if (response2.IsSuccessStatusCode)
                    {

                        string data = response2.Content.ReadAsStringAsync().Result;
                        lecturedocslist = JsonConvert.DeserializeObject<List<Uploaddocs>>(data);
                        ViewBag.updateknown = "1215";

                        if (lecturedocslist.Count != 0)
                        {
                            var dropdownlist = new List<Uploaddocs>();
                            dropdownlist.Add(new Uploaddocs() { ClassificationIds = lecturedocslist[0].ClassificationIds, InstanceSubClassificationId = lecturedocslist[0].InstanceSubClassificationId, SubjectToolId = lecturedocslist[0].SubjectToolId, InstanceSubjectsId = lecturedocslist[0].InstanceSubjectsId });
                            ViewBag.dropdownlist = dropdownlist;
                            //------------------------------------- getting Chapter List
                            HttpResponseMessage response3 = client.GetAsync(client.BaseAddress + "/ListChapters?SubjectVideoId=" + lecturedocslist[0].SubjectVideoId + "&InstanceId=" + InstanceId).Result;
                            string data3 = response3.Content.ReadAsStringAsync().Result;
                            List<LMSVideoscs> chapterlist = new List<LMSVideoscs>();
                            chapterlist = JsonConvert.DeserializeObject<List<LMSVideoscs>>(data3);
                            ViewBag.Chapterlist = chapterlist;
                            //-------------------------------------------- Getting Questions List
                            // if (chapterlist.Count != 0)
                            //  {
                            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/ListQuestions?SubjectVideoId=" + lecturedocslist[0].SubjectVideoId + "&InstanceId=" + InstanceId).Result;
                            string data4 = response4.Content.ReadAsStringAsync().Result;
                            List<LMSVideoscs> Questinoslist = new List<LMSVideoscs>();
                            Questinoslist = JsonConvert.DeserializeObject<List<LMSVideoscs>>(data4);
                            ViewBag.Questinoslist = Questinoslist;
                            //-------------------------------------------- Getting Options List

                            HttpResponseMessage response5 = client.GetAsync(client.BaseAddress + "/ListAnswers?SubjectVideoId=" + lecturedocslist[0].SubjectVideoId + "&InstanceId=" + InstanceId).Result;
                            string data5 = response5.Content.ReadAsStringAsync().Result;
                            List<LMSVideoscs> Optionslist = new List<LMSVideoscs>();
                            Optionslist = JsonConvert.DeserializeObject<List<LMSVideoscs>>(data5);
                            ViewBag.Optionslist = Optionslist;

                            // }

                        }
                        ViewBag.videpathviewbag = lecturedocslist[0].VideoPath;
                        ViewBag.docsdisplayname = lecturedocslist[0].Displayname;

                        return View(lecturedocslist[0]);

                    }
                }
            }
            catch
            {
                return View();
            }
            // ViewBag.dropdownlist = "1215";
            return View();
        }

        [HttpPost]
        [RequestFormLimits(MultipartBodyLengthLimit = 3221225472)]
        public IActionResult UploadLecturedocs(IFormFile VideoPath, LMSVideoscs obj, string Duration, IFormFile UploadDocuments)
        {
            obj.InstanceId = InstanceId;
            obj.Duration = Duration;
            obj.UserId = UserId;


            Random random = new Random();
            int randomNumber = random.Next(1000, 999999);
            //---------------------------------------------------------------- Upload Video's
            if (VideoPath != null)
            {

                var filename = randomNumber + VideoPath.FileName;
                var fileName = Path.GetFileName(filename);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LMSVideos", fileName);
                string uploads = Path.Combine("wwwroot/LMSVideos/Instance545", fileName);

                obj.VideoPath = filename; //----------------------------------->

                using (var fileSrteam = new FileStream(uploads, FileMode.Create))
                {
                    VideoPath.CopyTo(fileSrteam);
                }
            }
            else
            {
                obj.VideoPath = obj.filenameupdate;
            }
            //------------------------------------------------ Upload Pdf's

            #region
            //---------------  checking if  Pdf Existed  or not
            if (UploadDocuments != null)
            {
                obj.docspath = UploadDocuments.FileName;

                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "LMSDocs", "Instance545");

                string filePath2 = Path.Combine(folderPath, UploadDocuments.FileName);
                FileInfo fileInfo = new FileInfo(filePath2);


                if (!fileInfo.Exists)
                {
                    string input = UploadDocuments.FileName;

                    string output = Regex.Replace(input, @"^\d+", "");
                    var filenamedoc = randomNumber + output;
                    var fileNamedoc = Path.GetFileName(filenamedoc);
                    var filePathdoc = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LMSDocs", fileNamedoc);
                    string uploadsdoc = Path.Combine("wwwroot/LMSDocs/Instance545", fileNamedoc);

                    obj.docspath = filenamedoc;//------------------->

                    using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                    {
                        UploadDocuments.CopyTo(fileSrteam);
                    }

                }
            }

            #endregion
            //else
            //{679851901339FTNS%20Theory-F5%20(1).pdf
            //    obj.docspath ="null";
            //}


            //---------------------------------------------------------> Web Api Connect
            //--addn
            if (UploadDocuments == null)
            {
                obj.docspath = "path.no";
            }

            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Videosuploading", content).Result;




            if (response.IsSuccessStatusCode)
            {
                string responseapi = response.Content.ReadAsStringAsync().Result;
                int i = JsonConvert.DeserializeObject<int>(responseapi);

                return Json(i);

            }









            return Json(0);


        }
        //***********************************************************  UPLOAD DOCS ONLY IN LMS MODULE 
        public IActionResult UploadDocsOnly(LMSVideoscs obj, string Duration, IFormFile UploadDocuments)
        {
            obj.InstanceId = InstanceId;
            obj.Duration = Duration;
            obj.UserId = UserId;
            obj.docspath = UploadDocuments.FileName;
            obj.Duration = "0";

            string input = UploadDocuments.FileName;

            string output = Regex.Replace(input, @"^\d+", "");

            Random random = new Random();
            int randomNumber = random.Next(1000, 999999);
            string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "LMSDocs", "Instance545");
            // Combine the folder path and the file name to get the full file path
            string filePath = Path.Combine(folderPath, obj.docspath);

            // Check if the file exists
            FileInfo fileInfo = new FileInfo(filePath);

            // Check if the file exists
            if (!fileInfo.Exists)
            {

                // if (obj.SubjectVideoId == 0)
                //  {

                if (UploadDocuments != null)
                {

                    var filenamedoc = randomNumber + output;
                    var fileNamedoc = Path.GetFileName(filenamedoc);
                    var filePathdoc = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LMSDocs", fileNamedoc);
                    string uploadsdoc = Path.Combine("wwwroot/LMSDocs/Instance545", fileNamedoc);

                    obj.docspath = filenamedoc;//------------------->

                    using (var fileSrteam = new FileStream(uploadsdoc, FileMode.Create))
                    {
                        UploadDocuments.CopyTo(fileSrteam);
                    }

                }
            }



            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/VideosuploadingDocs", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int i = JsonConvert.DeserializeObject<int>(data);
                return Json(i);
            }


            return Json(0);
        }


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // SEARCH UPLOAD LECTURE DOC'S //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult SearchUploadlecturedocs()
        {
            List<SelectListItem> Departmentlist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetDepartment?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Departmentlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Departmentlist = Departmentlist;

            //string filePath = @"wwwroot/LMSDocs/Instance545/346296SupportCalls-04-03-23.xlsx";
            //byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
            //string base64Data = Convert.ToBase64String(fileBytes);

            //ViewData["Base64Data"] = base64Data;


            return View();
        }

        public IActionResult SearchUploadlecturedocsjson(string ClassificationIds, string InstanceSubClassificationId, string InstanceSubjectsId, int IsVideoUploaded, string SubjectsToolId, int uploaded)
        {
            List<Uploaddocs> list = new List<Uploaddocs>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchUploadlecturedocs?InstanceId=" + InstanceId + "&ClassificationIds=" + ClassificationIds + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&InstanceSubjectsId=" + InstanceSubjectsId + "&IsVideoUploaded=" + IsVideoUploaded + "&InstanceSubjectsToolIds=" + SubjectsToolId + "&uploaded=" + uploaded + "&Createdby=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<Uploaddocs>>(data);
            }
            return Json(list);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // DELETE UPLOAD LECTURE DOCS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult DeleteUploadlecturedocs(int VideoId, int isvideo)

        {

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/DeleteUPloadlecturedocs?InstanceId=" + InstanceId + "&VideoId=" + VideoId + "&CreatedBy=" + UserId + "&isvideo=" + isvideo).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int returnval = JsonConvert.DeserializeObject<int>(data);
                return Json(returnval);
            }



            return Json(0);
        }

        public IActionResult OpenFile(string filename)
        {
            try
            {
                string reportURL;
                if (filename.StartsWith("SEMdocs/"))
                {
                    reportURL = @"wwwroot/" + filename;

                }
                else
                {
                    reportURL = @"wwwroot/LMSDocs/Instance545/" + filename;

                }

                string contentType = "";

                // Convert the filename extension to lowercase for case-insensitive comparison
                string lowercaseExtension = Path.GetExtension(filename).ToLower();

                // Set the content type based on the lowercase file extension
                if (lowercaseExtension == ".pdf")
                {
                    contentType = "application/pdf";
                }
                else if (lowercaseExtension == ".csv")
                {
                    contentType = "text/csv";
                }
                else if (lowercaseExtension == ".xlsx")
                {
                    contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                }
                else if (lowercaseExtension == ".xls")
                {
                    contentType = "application/vnd.ms-excel";
                }
                else if (lowercaseExtension == ".doc" || lowercaseExtension == ".docx")  // Handle Word documents
                {
                    contentType = "application/msword";
                }
                else if (lowercaseExtension == ".jpeg" || lowercaseExtension == ".jpg" || lowercaseExtension == ".png" || lowercaseExtension == ".gif")
                {
                    contentType = "image/" + lowercaseExtension.Substring(1);
                }
                else
                {
                    // Set a default content type if the file extension is not recognized
                    return NotFound(); // Return a 404 Not Found response
                }

                byte[] fileBytes = System.IO.File.ReadAllBytes(reportURL);

                return File(fileBytes, contentType);
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                // Log or handle the exception more specifically
                return StatusCode(500); // Return a 500 Internal Server Error response
            }
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // VIEW LECTURE DOCS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult ViewLectureDocs()
        {

            List<ViewLectureDocsMain> list = new List<ViewLectureDocsMain>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ViewLectureDocs?InstanceId=" + InstanceId + "&UserId=" + StudentUserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ViewLectureDocsMain>>(data);

            }
            int? Value = 0;
            if (list.Count == 0)// Added by arjun
            {
                if (list[0].ViewLectureDocs.Count() > 0)
                {
                    Value = list[0].ViewLectureDocs[0].InstanceClassificationId;

                }
                else if (list[0].ViewLectureDocs2.Count() > 0)
                {
                    Value = list[0].ViewLectureDocs2[0].InstanceClassificationId;
                }
            }

            //int Value = list[0].ViewLectureDocs[0].InstanceClassificationId;
            //HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetallViewvideopoints?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + list[0].ViewLectureDocs[0].InstanceClassificationId + "&InstanceSubClassificationId=" + 0 + "&SubjectId=" + 0).Result;
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetallViewvideopoints?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + Value + "&InstanceSubClassificationId=" + 0 + "&SubjectId=" + 0).Result;
            if (response2.IsSuccessStatusCode)
            {
                List<VideoViewpoints> list3 = new List<VideoViewpoints>();

                string data2 = response2.Content.ReadAsStringAsync().Result;
                list3 = JsonConvert.DeserializeObject<List<VideoViewpoints>>(data2);
                // list2.GroupBy(item => item.SubjectVideoId); 
                //double sumOfViewspoints = list3.Sum(item => item.Viewspoints);
                //double sumOfTotalpoints = list3.Sum(item => item.TotalPoins);

                double sumOfPercentages = list3.Sum(item =>
                {
                    if (item.TotalPoins != 0) // Avoid division by zero
                    {
                        double percentage = (item.Viewspoints / item.TotalPoins) * 100;
                        return percentage;
                    }
                    return 0; // Default to 0 if TotalPoints is 0
                });

                double averagePercentage = (sumOfPercentages / list3.Count);


                // var val = (sumOfViewspoints / sumOfTotalpoints) * 100;
                if (averagePercentage == 0 || double.IsNaN(averagePercentage))
                {
                    ViewBag.GetallViewvideopoints = 0.00;
                }
                else
                {
                    ViewBag.GetallViewvideopoints = averagePercentage;
                }


                //if (decimal.IsNaN(ViewBag.GetallViewvideopoints) || ViewBag.GetallViewvideopoints==null)
                //{
                //    ViewBag.GetallViewvideopoints = 0;
                //}
            }
            return View(list);


        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // VIEW LECTURE DOCS SUB //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult ViewLectureDocsSub(int InstanceClassificationId, int InstanceSubClassificationId)
        {

            List<ViewLectureDocs> list = new List<ViewLectureDocs>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ViewLectureDocsSub?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ViewLectureDocs>>(data);

            }
            return View(list);


        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // VIEW LECTURE DOCS SUB //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult ViewLectureDocsSubVideos(int InstanceClassificationId, int InstanceSubClassificationId, int SubjectId)
        {
            Response.Cookies.Append("VLD_InstanceClassificationId", InstanceClassificationId.ToString());
            Response.Cookies.Append("VLD_InstanceSubClassificationId", InstanceSubClassificationId.ToString());
            Response.Cookies.Append("VLD_SubjectId", SubjectId.ToString());
            //-------------  Gettting Vide o View Points


            List<ViewLectureDocsMainsub> list = new List<ViewLectureDocsMainsub>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ViewLectureDocsSubVideos?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectId=" + SubjectId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ViewLectureDocsMainsub>>(data);
                Response.Cookies.Append("VLD_ClassificationName", list[0].ViewLectureDocs3[0].ClassificationName);
                Response.Cookies.Append("VLD_SubClassificationName", list[0].ViewLectureDocs3[0].SubClassificationName);
                Response.Cookies.Append("VLD_SubjectName", list[0].ViewLectureDocs3[0].SubjectName);


            }
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetallViewvideopoints?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectId=" + SubjectId).Result;
            if (response2.IsSuccessStatusCode)
            {
                List<VideoViewpoints> list3 = new List<VideoViewpoints>();

                string data2 = response2.Content.ReadAsStringAsync().Result;
                list3 = JsonConvert.DeserializeObject<List<VideoViewpoints>>(data2);
                // list2.GroupBy(item => item.SubjectVideoId); 




                ViewBag.GetallViewvideopoints = list3;
            }





            return View(list);


        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // LIST OF CHAPTERS , QUESTIONS AND ANSWERS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult ListChaptersQuestionsAnswers(int SubjectVideoId, int type)
        {

            ViewBag.InstanceClassificationId = Request.Cookies["VLD_InstanceClassificationId"];
            ViewBag.InstanceSubClassificationId = Request.Cookies["VLD_InstanceSubClassificationId"];
            ViewBag.SubjectId = Request.Cookies["VLD_SubjectId"];



            List<Listchaptersquestions> list = new List<Listchaptersquestions>();
            if (type == 1215)// for pdf and others(not a video)
            {
                //  ViewBag.pdfcheckvalue = "1215";

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PDFView?SubjectVideoId=" + SubjectVideoId + "&InstanceId=" + InstanceId + "&Createdby=" + UserId).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    list = JsonConvert.DeserializeObject<List<Listchaptersquestions>>(data);

                }
                // ViewBag.pdfcheckvalue = "369108file (22).pdf";//725488file (22).pdf
                ViewBag.pdfcheckvalue = list[0].Listchapters[0].VideoPath;
            }
            else // for Videos
            {

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ListChaptersQuestionsAnswers?SubjectVideoId=" + SubjectVideoId + "&InstanceId=" + InstanceId).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    list = JsonConvert.DeserializeObject<List<Listchaptersquestions>>(data);

                }



                ViewBag.pdfcheckvalue = "1215";
            }

            return View(list);


        }
       
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // INSERTING RESULTS IN VIDEO PLAYING //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        #region INSERTING RESULTS IN VIDEO PLAYING

        public IActionResult ResultsInserting(int SubjectVideoId, int TotalQuestions, int NumberOfAttempts, string YourAnswer, string ActualAnswer, string DisplayName, string ActualMarks)
        {
            LMSQuRsults obj = new LMSQuRsults();
            obj.SubjectVideoId = SubjectVideoId;
            obj.TotalQuestions = TotalQuestions;
            obj.NumberOfAttempts = NumberOfAttempts;
            obj.YourAnswer = YourAnswer;
            obj.ActualAnswer = ActualAnswer;
            obj.ActualMarks = ActualMarks;
            obj.InstanceId = InstanceId;
            obj.DisplayName = DisplayName;
            obj.StudentUserId = StudentUserId;
            obj.UserId = UserId;
            obj.InstanceClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]);
            obj.InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]);
            obj.SubjectId = Convert.ToInt32(Request.Cookies["VLD_SubjectId"]);

            Random random = new Random();
            int randomNumber = random.Next(1000, 999999);
            obj.TestId = randomNumber;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertingResults", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                // int i = JsonConvert.DeserializeObject<int>(data);
                return Json(data);
            }

            return Json(0);

        }

        #endregion

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // INSERTING RESULTS IN VIDEO PLAYING //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        #region INSERTING RESULTS IN VIDEO PLAYING

        public int PdfsInserting(int SubjectVideoId, string PdfName, string PdfPath)
        {
            GeneratedPdfs obj = new GeneratedPdfs();
            obj.SubjectVideoId = SubjectVideoId;
            obj.PdfName = PdfName;
            obj.PdfPath = PdfPath;
            obj.InstanceId = InstanceId;
            obj.StudentUserId = StudentUserId;
            obj.UserId = UserId;
            obj.InstanceClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]);
            obj.InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]);
            obj.SubjectId = Convert.ToInt32(Request.Cookies["VLD_SubjectId"]);


            // obj.TestId = randomNumber;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertingPdfs", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                // int i = JsonConvert.DeserializeObject<int>(data);
                return 1;
            }

            return 0;

        }

        #endregion

        #region RESULTS SHOWS BY SUBJECTWISE

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // RESULTS SHOWS BY SUBJECTWISE //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult GettingResults()
        {
            List<LMSQuRsults> list = new List<LMSQuRsults>();
            LMSQuRsults obj = new LMSQuRsults();
            obj.InstanceId = InstanceId;

            obj.UserId = StudentUserId;
            obj.InstanceClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]);
            obj.InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]);
            obj.SubjectId = Convert.ToInt32(Request.Cookies["VLD_SubjectId"]);

            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GettingResults", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<LMSQuRsults>>(data);
                //return View(list);
            }


            return View(list);
        }
       
        #endregion


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // INSERTING NOTE IN VIDEO PLAYING //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult InsertingNotes(WriteaNotesInsering obj2)
        {
            WriteaNotes obj = new WriteaNotes();

            obj.TimeHours = obj2.TimeHours;
            obj.TimeMinutes = obj2.TimeMinutes;
            obj.TimeSeconds = obj2.TimeSeconds;
            obj.NotesId = obj2.NotesId;
            obj.NotesDescription = obj2.NotesDescription;
            obj.UserId = UserId;
            obj.SubjectVideoId = obj2.subjectvideoid;
            obj.InstanceId = InstanceId;
            obj.StudentUserId = StudentUserId;
            obj.InstanceClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]);
            obj.InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]);
            obj.SubjectId = Convert.ToInt32(Request.Cookies["VLD_SubjectId"]);
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertingNotes", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int i = JsonConvert.DeserializeObject<int>(data);
                return Json(i);
            }

            return Json(0);

        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // LIST OF NOTES IN VIDEO PLAYING //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult ListofNotes(int SubjectVideoId)
        {
            List<WriteaNotes> list = new List<WriteaNotes>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ListofNotes?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]) + "&InstanceSubClassificationId=" + Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]) + "&SubjectId=" + Convert.ToInt32(Request.Cookies["VLD_SubjectId"]) + "&SubjectVideoId=" + SubjectVideoId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<WriteaNotes>>(data);
                return View(list);
            }


            return View(list);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // DELETE NOTES //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult DeleteNotes(int NoteId)
        {
            WriteaNotes obj = new WriteaNotes();



            obj.InstanceId = InstanceId;
            obj.NotesId = NoteId;
            obj.InstanceClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]);
            obj.InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]);
            obj.SubjectId = Convert.ToInt32(Request.Cookies["VLD_SubjectId"]);
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/DeleteNotes", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int val = JsonConvert.DeserializeObject<int>(data);
                return Json(val);
            }


            return Json(0);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // CONVERT TO PDF (NOTES) //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult GeneratePdf(int SubjectVideoId, string pdfdisplayname)
        {
            string classname = Request.Cookies["VLD_ClassificationName"];
            string subclassname = Request.Cookies["VLD_SubClassificationName"];
            string subjectname = Request.Cookies["VLD_SubjectName"];

            List<WriteaNotes> list = new List<WriteaNotes>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ListofNotes?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]) + "&InstanceSubClassificationId=" + Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]) + "&SubjectId=" + Convert.ToInt32(Request.Cookies["VLD_SubjectId"]) + "&SubjectVideoId=" + SubjectVideoId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<WriteaNotes>>(data);

            }


            string htmlContent = "<html><body><h1 style='text-align:center;background-color:greenyellow;'> NOTE BOOK</h1><table style='width:100%;margin-left:5%;font-weight:600;margin-bottom:21px;'><tr><td style='font-weight:900;text-align:end;'> Department : </td><td> &nbsp;" +
               classname + "</td></tr><tr><td style='font-weight:900;text-align:end;'>Class: </td><td>&nbsp;" +
              subclassname + "</td></tr><tr><td style='font-weight:900;text-align:end;'> Subject :</td><td> &nbsp;" +
             subjectname + "</td></tr></table><div>";

            for (int i = 0; i < list.Count; i++)
            {
                htmlContent += "<div style='font-weight:600;font-size:21px;background-color:antiquewhite;'>" + list[i].TimeHours + ":" + list[i].TimeMinutes + ":" + list[i].TimeSeconds + " </div>";
                htmlContent += "<p style='font-size:19px;font-weight:400;white-space: pre-line;'>" + list[i].NotesDescription + " </p>";
            }

            htmlContent += "</div></body></html>";


            byte[] pdfBytes = _pdfGenerator.GeneratorPdf(htmlContent);
            Random random = new Random();
            int randomNumber = random.Next(1000, 999999);
            //--------------------------  Pdf Store In Folder
            string pdfFileName = randomNumber + pdfdisplayname + ".pdf"; // desired file name


            string pdfFilePath = Path.Combine("wwwroot/Generated PDFs/Instance545", pdfFileName);
            // pdfBytes.ContentType = "application/pdf";
            // System.IO.File.WriteAllBytes(pdfFilePath, pdfBytes);
            using (var fileStream = new FileStream(pdfFilePath, FileMode.Create))
            {
                fileStream.Write(pdfBytes, 0, pdfBytes.Length);
            }

            PdfsInserting(SubjectVideoId, pdfdisplayname, pdfFileName);//------------------------Inserting Pdf's In DataBase


            return File(pdfBytes, "application/pdf", pdfdisplayname + ".pdf");
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // GETTING ALL PDF'S //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult ListofPdfs()
        {
            //  GeneratedPdfs obj = new GeneratedPdfs();
            //  obj.InstanceId = InstanceId;
            //   obj.StudentUserId = StudentUserId;
            //  obj.UserId = StudentUserId;
            int InstanceClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]);
            int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]);
            int SubjectId = Convert.ToInt32(Request.Cookies["VLD_SubjectId"]);


            List<GeneratedPdfs> list = new List<GeneratedPdfs>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ListofPdfs?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectId=" + SubjectId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<GeneratedPdfs>>(data);

            }
            return View(list);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // INSERTING VIEW POINTS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult InsertVideoVewpoins(int SubjectVideoId, double Viewspoints, double TotalPoins, int ChapterId)
        {
            try
            {


                VideoViewpoints obj = new VideoViewpoints();

                obj.InstanceId = InstanceId;
                obj.StudentUserId = StudentUserId;
                obj.UserId = UserId;
                obj.InstanceClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceClassificationId"]);
                obj.InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["VLD_InstanceSubClassificationId"]);
                obj.SubjectId = Convert.ToInt32(Request.Cookies["VLD_SubjectId"]);
                obj.SubjectVideoId = SubjectVideoId;
                obj.Viewspoints = Convert.ToInt32(Viewspoints);
                obj.TotalPoins = Convert.ToInt32(TotalPoins);
                obj.ChapterId = ChapterId;

                //  List<GeneratedPdfs> list = new List<GeneratedPdfs>();
                string jsonData = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/InsertVideoVewpoins", content).Result;
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

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // COURSE CONTENT //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        [HttpGet]
        public IActionResult Coursecontents()
        {

            string InstanceClassificationId = Request.Cookies["VLD_InstanceClassificationId"];
            string InstanceSubClassificationId = Request.Cookies["VLD_InstanceSubClassificationId"];
            string SubjectId = Request.Cookies["VLD_SubjectId"];
            //-------------  Gettting Vide o View Points


            List<ViewLectureDocsMainsub> list = new List<ViewLectureDocsMainsub>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ViewLectureDocsSubVideos?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectId=" + SubjectId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<ViewLectureDocsMainsub>>(data);
                Response.Cookies.Append("VLD_ClassificationName", list[0].ViewLectureDocs3[0].ClassificationName);
                Response.Cookies.Append("VLD_SubClassificationName", list[0].ViewLectureDocs3[0].SubClassificationName);
                Response.Cookies.Append("VLD_SubjectName", list[0].ViewLectureDocs3[0].SubjectName);


            }
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetallViewvideopoints?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectId=" + SubjectId).Result;
            if (response2.IsSuccessStatusCode)
            {
                List<VideoViewpoints> list3 = new List<VideoViewpoints>();

                string data2 = response2.Content.ReadAsStringAsync().Result;
                list3 = JsonConvert.DeserializeObject<List<VideoViewpoints>>(data2);
                // list2.GroupBy(item => item.SubjectVideoId); 




                ViewBag.GetallViewvideopoints = list3;
            }





            return View(list);





            //List<ViewLectureDocsMainsub> list = new List<ViewLectureDocsMainsub>();
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ViewLectureDocsSubVideos?InstanceId=" + InstanceId + "&UserId=" + StudentUserId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectId=" + SubjectId).Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    string data = response.Content.ReadAsStringAsync().Result;
            //    list = JsonConvert.DeserializeObject<List<ViewLectureDocsMainsub>>(data);

            //}
            //return View(list);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // CREATE NOTES //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        [HttpGet]
        public IActionResult Createnotes()
        {
            return View();
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // MANAGE SUBJECT TOOLS FOR SEARCHING OPTIONS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        [HttpGet]
        public IActionResult Insertsubjecttool(int InstanceSubjectToolId)

        {
            if (InstanceSubjectToolId != 0)
            {
                Managesubjecttools list = new Managesubjecttools();
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Listforupdatemst?InstanceSubjectToolId=" + InstanceSubjectToolId).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    list = JsonConvert.DeserializeObject<Managesubjecttools>(data);
                    ViewBag.decidemst = "1215";
                    return View(list);
                }
                return View(list);

            }
            return View();
        }

        [HttpPost]
        public IActionResult Insertsubjecttool(Managesubjecttools obj, int update)
        {
            obj.InstanceId = InstanceId;
            obj.UserId = UserId;
            obj.SubjectTypeName = "Scholastic";
            if (obj.SubjectsDisplayOrder == null)
            {
                obj.SubjectsDisplayOrder = 0;
            }
            string data = JsonConvert.SerializeObject(obj);

            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");

            if (update == 1215)
            {
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Updatesubjecttool", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string responseapi = response.Content.ReadAsStringAsync().Result;
                    return Json(responseapi);

                }
            }
            else
            {


                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Insertsubjecttool", content).Result;
                if (response.IsSuccessStatusCode)
                {
                    string responseapi = response.Content.ReadAsStringAsync().Result;
                    return Json(responseapi);

                }
            }

            return Json(0);


        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // MANAGE SUBJECT TOOLS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        [HttpGet]
        public IActionResult Managesubjecttools()
        {
            return View();
        }

        public IActionResult Searchsubjecttool(string SubjectToolName)
        {

            string subjectTypeName = "Scholastic";
            List<Managesubjecttools> list = new List<Managesubjecttools>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Searchsubjecttool?InstanceId=" + InstanceId + "&SubjectToolName=" + SubjectToolName + "&subjectTypeName=" + subjectTypeName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<Managesubjecttools>>(data);

            }
            return Json(list);
        }

        public IActionResult Deletesubjecttool(int InstanceSubjectToolId)
        {

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Deletesubjecttool?InstanceSubjectToolId=" + InstanceSubjectToolId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                string responseapi = JsonConvert.DeserializeObject<string>(data);
                return Json(responseapi);
            }
            return Json(0);
        }


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // MANAGE SUBJECTS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        [HttpGet]
        public IActionResult Managesubjects()
        {
            List<SelectListItem> Departmentlist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetDepartmentfor_MS?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Departmentlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Departmentlist_MS = Departmentlist;


            return View();
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // GETTING CLASS NAME FOR MANAGE SUBJECTS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult GetClassfor_MS(string InstanceClassificationId)
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

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // SEARCH MANAGE SUBJECTS //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult Searchsubjects(string SubjectName, string SubjectCode, int ClassificationId, int SubClassificationId)

        {

            List<Managesubjects> list = new List<Managesubjects>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Searchsubjects?InstanceId=" + InstanceId + "&SubjectName=" + SubjectName + "&SubjectCode=" + SubjectCode + "&ClassificationId=" + ClassificationId + "&SubClassificationId=" + SubClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<Managesubjects>>(data);

            }
            return Json(list);
        }
        
        public IActionResult UpdateManageSubjects()
        {
            List<SubClassifications> list = new List<SubClassifications>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/MS_SubClassifications?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SubClassifications>>(data);

            }

            return View(list);
        }
        
        public IActionResult Subclassfications_MS(int InstanceClassificationId)
        {
            string RoleName = "TEACHER,CLASS TEACHER";
            //--------------------------------------------------  Subclassfication DAta 

            List<SubClassifications> list = new List<SubClassifications>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/MS_SubClassifications_department?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SubClassifications>>(data);
            }

            //-----------------------------Subject List Data 
            List<SelectListItem> subjectlist = new List<SelectListItem>();
            HttpResponseMessage responsedrop = client.GetAsync(client.BaseAddress + "/GetSubjectfor_MS?InstanceId=" + InstanceId).Result;
            if (responsedrop.IsSuccessStatusCode)
            {
                string data = responsedrop.Content.ReadAsStringAsync().Result;
                subjectlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            subjectlist.Insert(0, new SelectListItem { Value = "", Text = "-- Select --" });

            ViewBag.Subjectlist_MS = subjectlist;

            //------------------------------------Mentors Data 


            List<Mentors> Mentorslist = new List<Mentors>();
            HttpResponseMessage responsemen = client.GetAsync(client.BaseAddress + "/Mentorslist_MS?InstanceId=" + InstanceId + "&RoleName=" + RoleName).Result;
            if (responsemen.IsSuccessStatusCode)
            {
                string data = responsemen.Content.ReadAsStringAsync().Result;
                Mentorslist = JsonConvert.DeserializeObject<List<Mentors>>(data);
            }
            ViewBag.MentorList = Mentorslist;




            Subclassfications_MS viewModel = new Subclassfications_MS
            {
                subclassfication = list,
                mentors = Mentorslist
            };
            if (list.Count == 0)
            {
                return Json(0);
            }
            return View(viewModel);

        }

        #endregion

        //############################### // SIMPLE EXPENSE MANAGEMENT //############################### //

        public SEMproperitesSub GettingAcademicFees(int FinancialYearId)
        {
            //------------------------------------------------------   Getting Remaing Fees and     Fees Collected

            SEMproperitesSub list2 = new SEMproperitesSub();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/Feeremainingamount?InstanceId=" + InstanceId + "&FinancialYearId=" + FinancialYearId + "&CreatedBy=" + UserId).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data = response2.Content.ReadAsStringAsync().Result;
                list2 = JsonConvert.DeserializeObject<SEMproperitesSub>(data);
            }

            return list2;
        }

        public IActionResult SimpleExpenseManagement()
        {
            //------------------------------------------------------   Getting Found Source Names
            Commonclass obj = new Commonclass();
            ViewBag.Years = obj.GetYears();
            List<SelectListItem> list1 = new List<SelectListItem>();
            HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/Foundsourcename?InstanceId=" + InstanceId).Result;
            if (response1.IsSuccessStatusCode)
            {
                string data = response1.Content.ReadAsStringAsync().Result;
                list1 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.FoundSource = list1;


            // ----------------------                                 getting  Payment Mode

            List<SelectListItem> list3 = new List<SelectListItem>();
            HttpResponseMessage response3 = client.GetAsync(client.BaseAddress + "/PaymentMode").Result;
            if (response3.IsSuccessStatusCode)
            {
                string data = response3.Content.ReadAsStringAsync().Result;
                list3 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.PaymentMode = list3;

            // ----------------------                            getting  Academic Years
            List<SelectListItem> list4 = new List<SelectListItem>();
            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/AcademicYear?InstanceId=" + InstanceId).Result;
            if (response4.IsSuccessStatusCode)
            {
                string data = response4.Content.ReadAsStringAsync().Result;
                list4 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.FinancialYear = list4;

            // ----------------------                            getting  Months
            List<SelectListItem> list5 = new List<SelectListItem>();
            HttpResponseMessage response5 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=MONTH").Result;
            if (response5.IsSuccessStatusCode)
            {
                string data = response5.Content.ReadAsStringAsync().Result;
                list5 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.Months = list5;

            List<SelectListItem> list6 = new List<SelectListItem>();
            HttpResponseMessage response6 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=VENDOR CATEGORY").Result;
            if (response6.IsSuccessStatusCode)
            {
                string data = response6.Content.ReadAsStringAsync().Result;
                list6 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.Vendorcategory = list6;

            //int FinancialYearId = 0;
            //SEMproperitesSub list2 = GettingAcademicFees(0);
            SEMproperitesSub list2 = GettingAcademicFees(DeclaringFinancialYearId);
            ViewBag.FeeCollected = list2.FeeCollected;
            ViewBag.Transfered = list2.Transfered;
            ViewBag.RemainingAmount = list2.RemainingAmount;
            ViewBag.DebitedAmount = list2.DebitedAmount;
            ViewBag.ApprovalTotalAmount = list2.ApprovalTotalAmount;
            ViewBag.ApprovalDebitedAmount = list2.ApprovalDebitedAmount;
            ViewBag.RejectedTotalAmount = list2.RejectedTotalAmount;
            ViewBag.RejectedDebitedAmount = list2.RejectedDebitedAmount;
            ViewBag.PendingTotalAmount = list2.PendingTotalAmount;
            ViewBag.PendingDebitedAmount = list2.PendingDebitedAmount;

            return View();
        }
        
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // SEARCH ALL GOV FOUND RECIEVED //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult SearchtblGovFundRecieved(int FundRecievedFromId, /*int FinancialYearId,*/ double Amount, int PaymentModeId, int YearId, int MonthId, string VendorName, string VendorCategory, string Paymentdate, string Approvals)
        {
            //------------------------------------------------------   Getting Remaing Fees and     Fees Collected
            if (Approvals == "undefined")
            {
                Approvals = null;
            }

            //int FinancialYearId = 534;
            int FinancialYearId = DeclaringFinancialYearId;
            //int FinancialYearId = 0;
            //int FinancialYearId = 3007;

            List<SEMtblGovFundRecieved> list = new List<SEMtblGovFundRecieved>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchtblGovFundRecieved?InstanceId=" + InstanceId + "&FundRecievedFromId=" + FundRecievedFromId + "&FinancialYearId=" + FinancialYearId + "&Amount=" + Amount + "&PaymentModeId=" + PaymentModeId + "&YearId=" + YearId + "&MonthId=" + MonthId + "&VendorName=" + VendorName + "&VendorCategory=" + VendorCategory + "&PaymentDate=" + Paymentdate + "&Approvals=" + Approvals).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SEMtblGovFundRecieved>>(data);
            }

            return Json(list);
        }

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // ADD NEW TYPE OF EXPENDITURE //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult AddExpenditure(int GovFundId, int partial)
        {
            //------------------------------------------------------   Getting Found Source Names

            Commonclass obj = new Commonclass();
            ViewBag.Years = obj.GetYears();

            List<SelectListItem> list1 = new List<SelectListItem>();
            HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/Foundsourcename?InstanceId=" + InstanceId).Result;
            if (response1.IsSuccessStatusCode)
            {
                string data = response1.Content.ReadAsStringAsync().Result;
                list1 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.FoundSource = list1;
            // ----------------------                            getting  Months
            List<SelectListItem> list5 = new List<SelectListItem>();
            HttpResponseMessage response5 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=MONTH").Result;
            if (response5.IsSuccessStatusCode)
            {
                string data = response5.Content.ReadAsStringAsync().Result;
                list5 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.Months = list5;

            // ----------------------                                 getting  Payment Mode

            List<SelectListItem> list3 = new List<SelectListItem>();
            HttpResponseMessage response3 = client.GetAsync(client.BaseAddress + "/PaymentMode").Result;
            if (response3.IsSuccessStatusCode)
            {
                string data = response3.Content.ReadAsStringAsync().Result;
                list3 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.PaymentMode = list3;


            List<SelectListItem> list6 = new List<SelectListItem>();
            HttpResponseMessage response6 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=VENDOR CATEGORY").Result;
            if (response6.IsSuccessStatusCode)
            {
                string data = response6.Content.ReadAsStringAsync().Result;
                list6 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.Vendorcategory = list6;

            if (GovFundId != 0)
            {

                HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/ListUpdateExpenditure?InstanceId=" + InstanceId + "&GovFundId=" + GovFundId + "&CreatedBy=" + UserId).Result;
                if (response4.IsSuccessStatusCode)
                {

                    string data = response4.Content.ReadAsStringAsync().Result;
                    SEMtblGovFundRecieved list4 = JsonConvert.DeserializeObject<SEMtblGovFundRecieved>(data);
                    //     var cheqdate=  Convert.ToDateTime(list4.ChequeDDDate);
                    //  list4.ChequeDDDate = cheqdate;
                    if (partial == 313)
                    {
                        return PartialView("ViewExpenditureDetails", list4);
                    }
                    ViewBag.radiobutton = list4.ExpenditureType;
                    return View(list4);
                }
            }

            return View();
        }
       
        [HttpPost]
        public IActionResult AddExpenditure(SEMtblGovFundRecieved obj, IFormFile DocName)
        {
            if (DocName != null)
            {
                Random random = new Random();
                int randomNumber = random.Next(1000, 999999);

                //var filename_ = randomNumber + DocName.FileName;
                var filename = DocName.FileName;
                var fileName = Path.GetFileName(filename);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/SEMdocs", fileName);
                string uploads = Path.Combine("wwwroot/SEMdocs", fileName);

                obj.DocName = filename; //----------------------------------->

                using (var fileSrteam = new FileStream(uploads, FileMode.Create))
                {
                    DocName.CopyTo(fileSrteam);
                }
            }
            else
            {
                obj.DocName = obj.DocNameEdit;
            }
            // if (ModelState.IsValid)
            // {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.FundRecievedFromId = Convert.ToInt32(obj.TypeofExpenditure);
            //obj.FinancialYearId = 534;
            obj.FinancialYearId = DeclaringFinancialYearId;
            //obj.FinancialYearId = 3007;
            //obj.FundCategoryId = 20;

            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/AddExpenditure", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list3 = JsonConvert.DeserializeObject<int>(data);
                return Json(list3);

            }
            // }


            return Json(0);
        }
       
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // DELETE EXPENDITURE //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// 
        public IActionResult DeleteExpenditure(int GovFundId)
        {

            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/DeleteExpenditure?InstanceId=" + InstanceId + "&GovFundId=" + GovFundId + "&CreatedBy=" + UserId).Result;
            if (response4.IsSuccessStatusCode)
            {

                string data = response4.Content.ReadAsStringAsync().Result;
                int list4 = JsonConvert.DeserializeObject<int>(data);

                return Json(list4);
            }


            return Json(0);
        }


        //############################### // SIMPLE EXPENSIVE MANAGEMENT //############################### //
        #region SIMPLE EXPENSIVE MANAGEMENT

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // Admin Approvls By     Simple Expenive Management //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//   
        public IActionResult AdminApprovals()
        {

            //------------------------------------------------------   Getting Found Source Names
            Commonclass obj = new Commonclass();
            ViewBag.Years = obj.GetYears();
            List<SelectListItem> list1 = new List<SelectListItem>();
            HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/Foundsourcename?InstanceId=" + InstanceId).Result;
            if (response1.IsSuccessStatusCode)
            {
                string data = response1.Content.ReadAsStringAsync().Result;
                list1 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.FoundSource = list1;

            // ----------------------                                 getting  Payment Mode

            List<SelectListItem> list3 = new List<SelectListItem>();
            HttpResponseMessage response3 = client.GetAsync(client.BaseAddress + "/PaymentMode").Result;
            if (response3.IsSuccessStatusCode)
            {
                string data = response3.Content.ReadAsStringAsync().Result;
                list3 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.PaymentMode = list3;


            // ----------------------                            getting  Months
            List<SelectListItem> list5 = new List<SelectListItem>();
            HttpResponseMessage response5 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=MONTH").Result;
            if (response5.IsSuccessStatusCode)
            {
                string data = response5.Content.ReadAsStringAsync().Result;
                list5 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.Months = list5;

            List<SelectListItem> list6 = new List<SelectListItem>();
            HttpResponseMessage response6 = client.GetAsync(client.BaseAddress + "/GetMonths?Code=VENDOR CATEGORY").Result;
            if (response6.IsSuccessStatusCode)
            {
                string data = response6.Content.ReadAsStringAsync().Result;
                list6 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);

            }
            ViewBag.Vendorcategory = list6;


            return View();

        }

        public IActionResult SEMAdminApprovals(int GovFundId, int Approvals, string AprovalDescription)
        {

            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/SEMAdminApprovals?InstanceId=" + InstanceId + "&GovFundId=" + GovFundId + "&Approvals=" + Approvals + "&AprovalDescription=" + AprovalDescription).Result;
            if (response4.IsSuccessStatusCode)
            {

                string data = response4.Content.ReadAsStringAsync().Result;
                int list4 = JsonConvert.DeserializeObject<int>(data);

                return Json(list4);
            }


            return Json(0);
        }

        public IActionResult GetApprovalComments(int GovFundId)
        {
            string[] Parameters = new string[] { InstanceId.ToString(), GovFundId.ToString() };
            List<SelectListItem> DropdownList = new List<SelectListItem>();
            CommonDropdown obj = new CommonDropdown();
            obj.procedurename = "GetApprovalComments";
            obj.Parameters = Parameters;
            obj.text = "AprovalDescription";
            obj.value = "Approvals";
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GetApprovalComments", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                DropdownList = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(DropdownList);

        }


        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ // Simple Expensive  Report //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        public IActionResult ExpensiveReport()
        {
            return View();
        }

        public IActionResult ExpensiveReportList(string Approval, DateTime FromDate, DateTime Todate, string ExpenditureType)
        {
            ExpensiveReport list = new ExpensiveReport();

            ExpensiveReportsub obj = new ExpensiveReportsub();
            obj.InstanceId = InstanceId;
            obj.Approval = Approval;

            if (Approval == "2")
            {
                obj.Approval = null;
            }
            obj.FromDate = FromDate;
            obj.Todate = Todate;
            obj.ExpenditureType = ExpenditureType;
            if (ExpenditureType == "2")
            {
                obj.ExpenditureType = null;
            }
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response4 = client.PostAsync(client.BaseAddress + "/ExpenditureReport", content).Result;


            //HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/ExpenditureReport?InstanceId=" + InstanceId + "&Approval=" + Approval + "&FromDate=" + FromDate + "&Todate=" + Todate+ "&ExpenditureType=" + ExpenditureType).Result;
            if (response4.IsSuccessStatusCode)
            {

                string data = response4.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<ExpensiveReport>(data);

                return Json(list);
            }


            return Json(list);
        }

        #endregion
    }
}
