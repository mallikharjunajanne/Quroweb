using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

using Connect4m_Web.Models.Attendenceproperites;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Connect4m_Web.Views;

namespace Connect4m_Web.Controllers
{
    [Authorize]

    public class Attendance : Controller
    {
        // Uri baseAddress = new Uri("https://localhost:44331/api/AttendanceCtr");
        // Uri baseAddress = new Uri("https://localhost:44331/api/AttendanceCtr");
        //Uri baseAddress = new Uri("http://192.168.1.142:98/api/FeeSctionCtr");
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
        public Attendance(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/AttendanceCtr");

            //=======================================================
            _userService = userService;
            InstanceId = _userService.InstanceId;
            UserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            Roleid = _userService.Roleid;
            StudentUserid = _userService.StudentUserid;
          

        }
        CommanMethodClass CommonMethodobj = new CommanMethodClass();


        //SMS Related Creaditials
        public string BuildSMSTextInXML(string username, string password)
        {
            string xml = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>" +
                         "<!DOCTYPE REQUESTCREDIT SYSTEM \"http://127.0.0.1/psms/dtd/requestcredit.dtd\">" +
                         "<REQUESTCREDIT USERNAME=" + username + " PASSWORD=" + password + ">" +
                         "</REQUESTCREDIT>";

            return xml;
        }
        public IActionResult LoginPage1()
        {

            //School Admin 

            //int InstanceId = 545;
            //int Roleid = 4629;
            //int LoginUserId = 217606;
            //int InstanceClassificationId = 813;
            //int InstanceSubClassificationId = 1178;
            //int DelegationClasses = 1;


            //Admin Login

            int Roleid = 775;
            int InstanceId = 545;
            int LoginUserId = 32891;
            int InstanceClassificationId = 813;
            int InstanceSubClassificationId = 1178;
            int DelegationClasses = 0;


            // Student Login
            //int Roleid = 775;
            //int InstanceId = 545;
            //int LoginUserId = 29255;
            //int InstanceClassificationId = 813;
            //int InstanceSubClassificationId = 1178;
            //int DelegationClasses = 1;

            //ClassTeacher

            //int LoginUserId = 32886;
            //int InstanceClassificationId = 813;
            //int InstanceSubClassificationId = 1178;
            //int InstanceId = 545;
            //int Roleid = 2092;
            //int DelegationClasses = 1;


            Response.Cookies.Append("INSTANCEID", InstanceId.ToString());
            Response.Cookies.Append("Roleid", Roleid.ToString());

            Response.Cookies.Append("LoginUserId", LoginUserId.ToString());
            Response.Cookies.Append("InstanceClassificationId", InstanceClassificationId.ToString());
            Response.Cookies.Append("InstanceSubClassificationId", InstanceSubClassificationId.ToString());
            Response.Cookies.Append("DelegationClasses", DelegationClasses.ToString());


            return View();
        }

        //Post Attendance Main Method 

        //---this two methods are use many places so please dont touch 1.Get_SubClassificationNames_ByInstanceClassifications 2.Slot_by_subclassification
        public IActionResult Get_SubClassificationNames_ByInstanceClassifications(string InstanceId, string InstanceClassificationId)
        {          
            List<SelectListItem> value1 = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_SubClassificationNames_ByclassificationId?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value1 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SubClassificationNames = value1;

            return View();

        }
        //public IActionResult Slot_by_subclassification(string SubClassificationId, string ClassificationId)
        public IActionResult Slot_by_subclassification(int SubClassificationId, int ClassificationId)
        {
            PostAttendance obj = new PostAttendance();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.InstanceClassificationId = ClassificationId;
            obj.InstanceSubclassificaitionId = SubClassificationId;
            obj.FilterTeachingSubjects = 0;

            List<SelectListItem> list = new List<SelectListItem>();
            list = CommonMethodobj.CommonListMethod<PostAttendance, SelectListItem>(obj, "/Departmentbyslots", client);





            //var instanceid = Request.Cookies["INSTANCEID"];
            //var FilterTeachingSubjects = 0;
            //List<SelectListItem> Value2 = new List<SelectListItem>();
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_Slot_By_Sc?InstanceId=" + instanceid + "&ClassificationId=" + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects).Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    string data = response.Content.ReadAsStringAsync().Result;
            //    Value2 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            //}
            ViewBag.Subjectnames = list;

            return View();

        }

        //Create Columnstring parameter  Method        
        public string GenerateColumnStringds(DateTime StDate, DateTime EDate, int SubjectSlotID)
        {
            StringBuilder columnStringBuilder = new StringBuilder();
            int totalDays = (EDate - StDate).Days + 1;

            // Append the columns for the provided dates
            int count = 0;
            for (int i = 0; i < totalDays; i++)
            {
                DateTime currentDate = StDate.AddDays(i);
                string convertedDate = currentDate.ToString("dd'/'MM'/'yyyy");
                int columnNumber = i + 1;

                columnStringBuilder.AppendFormat("[{0}] as column{1},0 as DisplayIcon{1},[dbo].[fn_Get_AttendanceId](UserId," + SubjectSlotID + ",'{0}',NULL) as AttendanceId{1},", convertedDate, columnNumber);
                count++;
            }
            int leng = 7 - count;
            for (int i = count + 1; i <= 7; i++)
            {
                columnStringBuilder.AppendFormat("NULL as column{0},0 as DisplayIcon{0},NULL as AttendanceId{0},", i);
            }

            return columnStringBuilder.ToString();
        }
        //Create Show Change Activity Columnstring parameter  Method       
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
        public IActionResult Changeactivitytblattendance(Changeactivity obj)
        {
            List<Changeactivitytbl> list = new List<Changeactivitytbl>();
            list = CommonMethodobj.CommonListMethod<Changeactivity, Changeactivitytbl>(obj, "/Changeactivity", client);
            return Json(list);          
        }

        [HttpPost]
        public IActionResult post_ate(string dataList)
        {
            List<PostAttendance> attendanceData = JsonConvert.DeserializeObject<List<PostAttendance>>(dataList);

            //var instanceid = Request.Cookies["INSTANCEID"];
            var fromAddress = new MailAddress("mangasrikanth313@gmail.com", "Srekanth");

            var successMessage = new StringBuilder();
            var failureMessage = new StringBuilder();

            foreach (var data in attendanceData)
            {
                var userId = data.UserId;
                var name = data.Name;
                var date = data.dateValue;
                var emailAddress = data.StudEmail;
                var attendanceStatus = data.Ispresent == "1" ? "Present" : "Absent";

                if (!string.IsNullOrEmpty(emailAddress))
                {
                    var subject = "Attendance Notification";
                    var body = $"Dear {name},\n\nYour attendance status is recorded as {attendanceStatus}.";

                    var message = new MailMessage();
                    message.From = fromAddress;
                    message.To.Add(new MailAddress(emailAddress));
                    message.Subject = subject;
                    message.Body = body;

                    using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
                    {
                        smtpClient.EnableSsl = true;
                        smtpClient.UseDefaultCredentials = false;
                        smtpClient.Credentials = new NetworkCredential("mangasrikanth313@gmail.com", "tyiuriuqbbduqhvd");

                        try
                        {
                            smtpClient.Send(message);
                            successMessage.AppendLine(name);
                        }
                        catch (SmtpException ex)
                        {
                            // Handle specific SMTP-related errors
                            failureMessage.AppendLine(name);
                            Console.WriteLine("SMTP Exception: " + ex.Message);
                        }
                        catch (SocketException ex)
                        {
                            // Handle specific socket-related errors
                            failureMessage.AppendLine(name);
                            Console.WriteLine("Socket Exception: " + ex.Message);
                        }
                        catch (Exception ex)
                        {
                            // Handle other exceptions
                            failureMessage.AppendLine(name);
                            Console.WriteLine("Error sending email: " + ex.Message);
                        }
                    }
                }
            }

            var finalMessage = "Mail successfully sent for students: \n" + successMessage.ToString() + "\n\n";
            finalMessage += "Mail not sent for students: \n" + failureMessage.ToString();

            return Ok(finalMessage);
        }


        //[HttpPost]
        //public IActionResult PostAttendance_(string dataList)
        //{
        //    //List<PostAttendance> attendanceData = JsonConvert.DeserializeObject<List<PostAttendance>>(dataList);
        //    List<Attendanceposting> attendanceData = JsonConvert.DeserializeObject<List<Attendanceposting>>(dataList);
        //    int i = 0;
        //    int IsParent;
        //    var NotificationSubject = "Attendance";
        //    var NoticeTypeId = 1;
        //    //DateTime NotificationDate = DateTime.Now();
        //    string data1 = "";
        //    try
        //    {
        //        //data1.Replace('/', '');
        //        var fromAddress = new MailAddress("mangasrikanth313@gmail.com", "Srekanth");
        //        var successMessage = new List<string>();
        //        var failureMessage = new List<string>();
        //        foreach (var data in attendanceData)
        //        {
        //            var StudentUserid1 = data.studentName;
        //            var Ispresent = data.isPresentValue;
        //            var StudentName = data.studentName;
        //            var dateValue = data.attendancedate;
        //            //var NotificationDate = dateValue+ " 00:00:00";
        //            var NotificationDate = DateTime.Now;
        //            //var selectedValues = data.dropdownValue;
        //            var SplAttenanceComments = data.Comments;
        //            var AttendanceTypeId = data.dropdownValue;
        //            var SubjectSlotID = data.SubjectSlotID;
        //            var ParentName = data.ParentName;
        //            var ParentId = data.ParentId;
        //            var emailAddress = data.StudEmail;
        //            var AttendanceTypetext = data.dropdowntext;

        //            string NotificationMessage = "";
        //            string parentnotificationmessage = "";
        //            var Attendancetextmessage = AttendanceTypetext.Trim() != "" ? AttendanceTypetext : "Absent";
        //            if (Ispresent != "1")
        //            {
        //                NotificationMessage = "Dear " + StudentName + ", your attendance for " + dateValue + " has been posted as Present.";
        //            }
        //            else
        //            {
        //                NotificationMessage = "Dear " + StudentName + ", your attendance for " + dateValue + " has been posted as (" + Attendancetextmessage + ") As Absent.";
        //            }
        //            if (ParentId != "")
        //            {
        //                var ParentNotificationMessage = "Dear Parent (" + ParentName + "), your ward's attendance for " + dateValue + " has been posted as Present.";
        //            }
        //            string apiUrl;
        //            var content = new StringContent(string.Empty);
        //            HttpResponseMessage response;
        //            if (Ispresent != "Disablecheckbox")
        //            {
        //                if (ParentId != null)
        //                {
        //                    i = 1;
        //                    for (int k = 0; k <= i; k++)
        //                    {
        //                        if (k == 0)
        //                        {
        //                            IsParent = k;

        //                            // Logic for IsParent = 0                             
        //                            NotificationMessage = "Dear " + StudentName + ", your attendance for " + dateValue + " has been posted as" + (Ispresent == "1" ? " Present." : " Absent.");

        //                            apiUrl = $"/AttendancePost?InstanceId={InstanceId}&UserId={StudentUserid1}&NotificationMessage={NotificationMessage}&NotificationDate={NotificationDate}&NotificationSubject={NotificationSubject}&NoticeTypeId={NoticeTypeId}&IsParent={IsParent}&SplAttenanceComments={SplAttenanceComments}&Ispresent={Ispresent}&AttendanceTypeId={AttendanceTypeId}&SubjectSlotID={SubjectSlotID}&CreatedBy={UserId}"; //CreatedBy

        //                            response = client.PostAsync(client.BaseAddress + apiUrl, content).Result;
        //                            data1 = response.Content.ReadAsStringAsync().Result;
        //                            if (response.IsSuccessStatusCode)
        //                            {
        //                                //data1 = response.Content.ReadAsStringAsync().Result;
        //                            }
        //                        }
        //                        else if (k == 1)
        //                        {
        //                            IsParent = k;
        //                            // Logic for IsParent = 1

        //                            NotificationMessage = "Dear Parent (" + ParentName + "), your ward's attendance for " + dateValue + " has been posted as" + (Ispresent == "1" ? " Present." : " Absent.");
        //                            apiUrl = $"/AttendancePost?InstanceId={InstanceId}&UserId={ParentId}&NotificationMessage={NotificationMessage}&NotificationDate={NotificationDate}&NotificationSubject={NotificationSubject}&NoticeTypeId={NoticeTypeId}&IsParent={IsParent}&SplAttenanceComments={SplAttenanceComments}&Ispresent={Ispresent}&AttendanceTypeId={AttendanceTypeId}&SubjectSlotID={SubjectSlotID}&CreatedBy={UserId}"; //CreatedBy
        //                                                                                                                                                                                                                                                                                                                                                                                                                                  // content = new StringContent(string.Empty);
        //                            response = client.PostAsync(client.BaseAddress + apiUrl, content).Result;
        //                            data1 = response.Content.ReadAsStringAsync().Result;
        //                            if (response.IsSuccessStatusCode)
        //                            {

        //                            }
        //                        }
        //                    }

        //                }
        //                else
        //                {
        //                    IsParent = 0;
        //                    // Logic for IsParent = 0

        //                    NotificationMessage = "Dear " + StudentName + ", your attendance for " + dateValue + " has been posted as" + (Ispresent == "1" ? " Present." : " Absent.");
        //                    apiUrl = $"/AttendancePost?InstanceId={InstanceId}&UserId={StudentUserid1}&NotificationMessage={NotificationMessage}&NotificationDate={NotificationDate}&NotificationSubject={NotificationSubject}&NoticeTypeId={NoticeTypeId}&IsParent={IsParent}&SplAttenanceComments={SplAttenanceComments}&Ispresent={Ispresent}&AttendanceTypeId={AttendanceTypeId}&SubjectSlotID={SubjectSlotID}&CreatedBy={UserId}"; //CreatedBy
        //                                                                                                                                                                                                                                                                                                                                                                                                                                //var content = new StringContent(string.Empty);
        //                    response = client.PostAsync(client.BaseAddress + apiUrl, content).Result;
        //                    if (response.IsSuccessStatusCode)
        //                    {
        //                        data1 = response.Content.ReadAsStringAsync().Result;
        //                    }
        //                }
        //            }
        //            if (!string.IsNullOrEmpty(emailAddress))
        //            {
        //                var subject = "Attendance Notification";
        //                var body = NotificationMessage;

        //                var message = new MailMessage();
        //                message.From = fromAddress;
        //                message.To.Add(new MailAddress(emailAddress));
        //                message.Subject = subject;
        //                message.Body = body;

        //                using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
        //                {
        //                    smtpClient.EnableSsl = true;
        //                    smtpClient.UseDefaultCredentials = false;
        //                    smtpClient.Credentials = new NetworkCredential("mangasrikanth313@gmail.com", "tyiuriuqbbduqhvd");

        //                    try
        //                    {
        //                        smtpClient.Send(message);
        //                        successMessage.Add(StudentName);
        //                    }
        //                    catch (SmtpException ex)
        //                    {

        //                        failureMessage.Add(StudentName);
        //                        Console.WriteLine("SMTP Exception: " + ex.Message);
        //                    }
        //                    catch (SocketException ex)
        //                    {
        //                        // Handle specific socket-related errors
        //                        failureMessage.Add(StudentName);
        //                        Console.WriteLine("Socket Exception: " + ex.Message);
        //                    }
        //                    catch (Exception ex)
        //                    {
        //                        // Handle other exceptions
        //                        failureMessage.Add(StudentName);
        //                        Console.WriteLine("Error sending email: " + ex.Message);
        //                    }
        //                }
        //            }


        //        }
        //        string successMessage = "";
        //        string failureMessage = "";
        //        int successCount = 0; //successMessage.Count;
        //        int failureCount = 0;//failureMessage.Count;

        //        var result = new
        //        {
        //            Data1 = data1,
        //            SuccessCount = successCount,
        //            SuccessList = successMessage,
        //            FailureCount = failureCount,
        //            FailureList = failureMessage,
        //        };
        //        return Json(data1);
        //        return Json(result);
        //    }
        //    catch (Exception)
        //    {
        //        var result = new
        //        {
        //            Data1 = "",
        //            SuccessCount = 0,
        //            SuccessList = 0,
        //            FailureCount = 0,
        //            FailureList = 0,
        //        };
        //        return Json(result);
        //    }
        //}
       
        [HttpPost]
        public IActionResult PostAttendance(string dataList)
        {  
            List<Attendanceposting> attendanceList = JsonConvert.DeserializeObject<List<Attendanceposting>>(dataList);
            Attendanceposting listvalues = new Attendanceposting();
            listvalues.InstanceId = InstanceId;
            listvalues.CreatedBy = UserId;
            listvalues.NotificationSubject = "Attendance";
            listvalues.NoticeTypeId =1;
            listvalues.DataList = dataList;

            client.Timeout = TimeSpan.FromMinutes(5);

            string updatedDataList = JsonConvert.SerializeObject(listvalues);
            StringContent contents = new StringContent(updatedDataList, Encoding.UTF8, "application/json");
            HttpResponseMessage responses = client.PostAsync(client.BaseAddress + "/Attendanceinserting", contents).Result;
            //string itemss = "";
            List<string> items = new List<string>();
            string data2 = responses.Content.ReadAsStringAsync().Result;
            if (responses.IsSuccessStatusCode)
            {
                items = JsonConvert.DeserializeObject<List<string>>(data2);
                //itemss = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
            //return Json(itemss);

        }

        //empty method please check once delete this method
        public IActionResult SlotidBy_Student_Names(string InstanceClassificationId, string InstanceSubClassificationId, string RoleId)
        {
            //var instanceid = Request.Cookies["INSTANCEID"];
            List<PostAttendance> value1 = new List<PostAttendance>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Slot_By_StudentNames?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&RoleId=" + RoleId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value1 = JsonConvert.DeserializeObject<List<PostAttendance>>(data);
            }
            ViewBag.Student_Names = value1;

            return View();
        }
        //Attendance Summery Method Code End

        #region  PostAttendance
        [HttpGet] /*Post_Attendance*/
        public IActionResult PostAttendance()
        {
            string roleName = Request.Cookies["RoleName"];
            ViewBag.rolename = roleName;

            return View();
        }
        public IActionResult AttendanceClassification()//PostAttendance Classification
        {
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_ClassificationNames_ByinstanceId?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(value);
        }
        public IActionResult AttendanceSubclass(int InstanceClassificationId)
        {
            List<ManageSubClassification> Subclassli = new List<ManageSubClassification>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Getsubclass?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Subclassli = JsonConvert.DeserializeObject<List<ManageSubClassification>>(data);
            }
            return Json(Subclassli);
        }
        public IActionResult Attendanceslot(string ClassificationId, int SubClassificationId, int FilterTeachingSubjects)
        {
            List<ManageSlots> Value2 = new List<ManageSlots>();
            // var FilterTeachingSubjects = 0;

            int loginUserid;
            if (FilterTeachingSubjects == 1)
            {
                loginUserid = UserId;
            }
            else
            {
                loginUserid = default;
            }
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Getslotbysubclass?InstanceId=" + InstanceId + "&ClassificationId=" + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects + "&UserID=" + loginUserid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<ManageSlots>>(data);
            }
            return Json(Value2);
        }
        public IActionResult Deleteattendance(Attendancepost obj)
        {
            obj.InstanceId = InstanceId;
            string updatedDataList = JsonConvert.SerializeObject(obj);
            StringContent contents = new StringContent(updatedDataList, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Deleteattendance", contents).Result;
            string item = "";
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<string>(data);
            }
            return Json(item);
        }
        public ActionResult GetAttedanceDetails(Attendancepost obj)
        {
            //public ActionResult GetAttedanceDetails(string StartDate, string EndDate, string InstanceClassificationId, string InstanceSubClassificationId, string SubjectSlotID, string ViewBagMyData)//Get_attendance
            List<GetAttendancelist> list = new List<GetAttendancelist>();
            //try
            //{
            int SatHolidy = 0;
            int SunHolidy = 1;


            DateTime StDate = obj.StartDate;
            DateTime EDate = obj.EndDate;

            string ColumnString;
            if (obj.ShowChangeActivity == true)
            {
                ColumnString = GenerateShowChangeActivityColumstringColumnString(StDate, EDate, obj.InstancesubjectId).TrimEnd(',');
            }
            else
            {
                ColumnString = GenerateColumnStringds(StDate, EDate, obj.InstancesubjectId).TrimEnd(',');
            }



            //string ColumnString = GenerateColumnStringds(StDate, EDate, obj.InstancesubjectId).TrimEnd(',');
            string startdate = obj.StartDate.ToString("yyyy-MM-dd HH:mm:ss");   //<<<----
            string enddate = obj.EndDate.ToString("yyyy-MM-dd HH:mm:ss");       //<<<----
            string Datestrings = "";
            for (int i = 0; i < 7; i++)
            {
                DateTime currentDate = obj.StartDate.AddDays(i);
                Datestrings += "[" + currentDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture) + "],";
            }
            Datestrings = Datestrings.TrimEnd(',');
            string DateString = Datestrings;
            string StartDates = Convert.ToString(obj.StartDate);
            string dateFormat = obj.StartDate.ToString("dd'/'MM'/'yyyy");


            obj.ColumnString = ColumnString;
            obj.DateString = DateString;
            obj.SatHolidy = SatHolidy;
            obj.SunHolidy = SunHolidy;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;


            //StringBuilder columnStringBuilder = new StringBuilder();
            //int totalDays = (EDate - StDate).Days + 1;

            List<DateTime> dateList = new List<DateTime>();
            int totalDays = (EDate - StDate).Days + 1;






            list = CommonMethodobj.CommonListMethod<Attendancepost, GetAttendancelist>(obj, "/Get_attendance", client);


            GetAttendancelist viewModel = new GetAttendancelist();

            CultureInfo culture = CultureInfo.CreateSpecificCulture("en-US");
            ViewBag.DateList = Enumerable.Range(0, (EDate - StDate).Days + 1).Select(offset => StDate.AddDays(offset).ToString("dd/MM/yyyy", culture)).ToList();
            //ViewBag.DateList = Enumerable.Range(0, (EDate - StDate).Days + 1).Select(offset => StDate.AddDays(offset).ToString("dd/MM/yyyy")).ToList();


            List<Getattendancedetails> attendanceDetails = list[0].getattendancedetails;
            List<GetholidaystoStopPostingAttenance> holidaysNames = list[0].holidaysnames;
            string AttendanceValidateornotretunmessage = list[0].AttendanceValidateornotretunmessage;




            List<List<GetholidaystoStopPostingAttenance>> holidaysList = list.Select(x => x.holidaysnames).ToList();
            List<GetholidaystoStopPostingAttenance> flattenedHolidaysList = list.SelectMany(x => x.holidaysnames).Where(holiday => holiday != null).ToList();

            List<List<Getattendancedetails>> detailsList = list.Select(x => x.getattendancedetails).ToList();
            List<List<DateTime>> datesList = list.Select(x => x.Dates).ToList();


            List<SelectListItem> Attendancetypeslist = new List<SelectListItem>();
            HttpResponseMessage Get_Types_response = client.GetAsync(client.BaseAddress + "/Get_AttendanceTypes_Dd?InstanceId=" + InstanceId).Result;
            if (Get_Types_response.IsSuccessStatusCode)
            {
                string data_DD = Get_Types_response.Content.ReadAsStringAsync().Result;
                Attendancetypeslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data_DD);
            }
            ViewBag.AttendanceLeave_Types = Attendancetypeslist;

            if (holidaysNames.Count > 0)
            {
                return Json(list);
            }
            else if (AttendanceValidateornotretunmessage == "0")
            {
                return Json(list);
            }
            else
            {
                return View(list);
            }
        }


        #region TEACHER LOGIN DROPDOWN DATA BINDING METHODS
        public IActionResult Teacher_attendanceclassification()
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
            //ViewBag.Cl_DD = new SelectList(items, "INSTANCECLASSIFICATIONID", "CLASSIFICATIONNAME");
            // return Json(new SelectList(items, "INSTANCECLASSIFICATIONID", "CLASSIFICATIONNAME"));
            return Json(items);
            //ViewBag.Cl_Subject_DD = new SelectList(itemsubject, "Value", "Text");
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

        #endregion

        #region STUDENT LOGIN ATTENDANCE DETAILS VIEWATTENDANCEDETAILS  

        public IActionResult ViewAttendanceDetails()
        {
            List<SelectListItem> Valueslist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_UserNames_By_Slot?InstanceId=" + InstanceId + "&Userid=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Valueslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Slots = Valueslist;

            return View();
        }

        public IActionResult attendancedetailsSlots()
        {
            List<SelectListItem> Valueslist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_UserNames_By_Slot?InstanceId=" + InstanceId + "&Userid=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Valueslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(Valueslist);
        }

        public IActionResult GetViewAttendanceDetailstbl(Studentattendancedetails obj)
        {
            obj.InstanceId = InstanceId;
            obj.UserId = UserId;
            List<StudentDetailsforattedance> list = CommonMethodobj.CommonListMethod<Studentattendancedetails, StudentDetailsforattedance>(obj, "/Getstudentattendancedetails", client);

            var listcount = list.Count();
            if (listcount <= 0)
            {
                return Json(listcount);
            }
            ViewBag.departmentName = list[0].ClassificationName;
            ViewBag.className = list[0].SubClassificationName;
            ViewBag.AttendanceLastDate = list[0].CreatedDate;
            // ViewBag.PresentCount = value[0].Present;
            ViewBag.UserAttendance = list;
            ViewBag.Records = list.Count();
            return View();
        }

        #endregion

        #region GetAttendanceSummary
        public IActionResult getAttendanceSummary()
        {
            return View();
        }
        #endregion

        public IActionResult Slot_by_UserName(string UserID, string InstanceID)
        {
            List<SelectListItem> Valueslist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_UserNames_By_Slot?InstanceId=" + InstanceId + "&Userid=" + UserID).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Valueslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Slot_Subjectnames = Valueslist;
            return View();
        }

       
        public IActionResult F_Get_Inc_By_Subclass(string InstanceId, string InstanceClassificationId)
        {
            
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fclassificationbysubclassddl?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.InSubclass = value;
            return View();
        }

        #region FAST ATTENDANCE
        [HttpGet]
        public IActionResult FastAttendance()
        {
            string roleName = Request.Cookies["RoleName"];
            ViewBag.rolename = roleName;
            return View();
        }
        public IActionResult FastAttendanceClassification()
        {
            List<SelectListItem> listvalues = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/FClassificationddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                listvalues = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(listvalues);
        }
        public IActionResult FastAttendancegetSlots()
        {
            List<FastAttendance> listvalues = new List<FastAttendance>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/FSlotsddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                listvalues = JsonConvert.DeserializeObject<List<FastAttendance>>(Data);
            }
            return Json(listvalues);
        }
        public IActionResult FastAttendancegetSubclass(int InstanceClassificationId)
        {
            List<SelectListItem> listvalues = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Fclassificationbysubclassddl?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&CreatedBy=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                listvalues = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(listvalues);
        }

        [HttpGet]
        public IActionResult Get_FastAttendance_Table(int InstanceClassificationId, string[] InstanceSubClassificationId, DateTime StartDate, int SlotId)
        {
            List<FastAttendance> value = new List<FastAttendance>();
            try
            {
                FastAttendance fastattendance = new FastAttendance();
                string ColumnString = "NULL as column1,NULL as column2,NULL as column3,NULL as column4,NULL as column5,NULL as column6,NULL as column7";
                string InstanceClassificationIds = Convert.ToString(InstanceClassificationId);
                string SlotIds = Convert.ToString(SlotId);
                string Startdate = Convert.ToString(StartDate);

                foreach (var InstanceSubClassid in InstanceSubClassificationId)
                {
                    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/FAttendancetable?InstanceId=" + InstanceId + "&StartDate=" + Startdate + "&InstanceClassificationId=" + InstanceClassificationIds + "&InstanceSubClassificationIds=" + InstanceSubClassid + "&SubjectSlotID=" + SlotIds + "&ColumnString=" + ColumnString + "&CreatedBy=" + UserId).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string data = response.Content.ReadAsStringAsync().Result;
                        var items = JsonConvert.DeserializeObject<List<FastAttendance>>(data);
                        value.AddRange(items);
                    }
                }

                bool shouldReturnView = true;
                for (int i = 0; i < value.Count; i++)
                {
                    FastAttendance item = value[i];
                    if (item.Returnmessage == null)
                    {
                        //ViewBag.resultCount = value.Count;
                        //return View(value);
                        shouldReturnView = true;
                        //break;
                    }
                    else
                    {
                        var retunObj = new
                        {
                            Returnmessage = item.Returnmessage,
                            SubClassid = item.InstanceSubClassificationId
                        };

                        shouldReturnView = false;
                        return Json(retunObj);
                        break;
                    }
                    continue;
                }
                if (shouldReturnView)
                {
                    ViewBag.resultCount = value.Count;
                    return View(value); // Return the View if no matching item was found
                }

                return Json(new { Returnmessage = "1" });

                //if (value.Any(item => item.Returnmessage != "0"))
                //{
                //    ViewBag.resultCount = value.Count();
                //    return View(value);
                //}
                //else
                //{
                //    var firstItem = value.FirstOrDefault();
                //    var retunObj = new
                //    {
                //        Returnmessage = firstItem.Returnmessage,
                //        SubClassid = firstItem.InstanceSubClassificationId
                //    };
                //    return Json(retunObj);
                //}
            }
            catch (Exception)
            {
                var retunObj = new
                {
                    Returnmessage = "1"
                };
                return Json(retunObj);
            }

        }

        [HttpPost]
        public ActionResult FastAttendance(List<FastAttendance> objList)
        {
            string Data = string.Empty;
            var queryParams = new Dictionary<string, string>
            {
                { "InstanceId", InstanceId.ToString() },
                { "CreatedBy", UserId.ToString() }
            };
            string jsonData = JsonConvert.SerializeObject(objList);
            HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            string requestUrl = client.BaseAddress + "/fastattendanceInsert?" + string.Join("&", queryParams.Select(kvp => $"{kvp.Key}={kvp.Value}"));
            HttpResponseMessage response = client.PostAsync(requestUrl, content).Result;
            if (response.IsSuccessStatusCode)
            {
                 Data = response.Content.ReadAsStringAsync().Result;
                //empty = JsonConvert.DeserializeObject<string>(Data);
            }
            return Json(Data);


            //=========>>>>>>> MAIN IMP CODE START
            //string Returnmessages = string.Empty;
            //foreach (var item in objList)
            //{
            //    item.InstanceId = InstanceId;
            //    item.CreatedBy = UserId;
            //    FastAttendance obj = new FastAttendance
            //    {
            //        InstanceId = item.InstanceId,
            //        CreatedBy = item.CreatedBy,
            //        StartDate = item.StartDate,
            //        InstanceClassificationId = item.InstanceClassificationId,
            //        SlotId = item.SlotId,
            //        Studentsms = item.Studentsms,
            //        Parentsms = item.Parentsms,
            //        InstanceSubClassificationId = item.InstanceSubClassificationId,
            //        Usersids = item.Usersids,
            //        SlotName = item.SlotName
            //    };
            //    string returnValue = CommonInsertingMethod(obj, "/Insertfastattendance");
            //    Returnmessages += returnValue + "; ";
            //}
            //return Json(Returnmessages);
            //=========>>>>>>> MAIN IMP CODE END
        }

        #endregion

        #region   ATTENDANCE DETAILS 
        [HttpGet]
        public IActionResult AttendanceDetails()
        {     
            return View();
        }
        public IActionResult Attendancedetailsdepartment()
        {
            List<SelectListItem> listvalues = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Atdclassificationddl?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                listvalues = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(listvalues);
        }      
        public IActionResult AttendancedetailsSubClass(int InstanceClassificationId)
        {
            List<SelectListItem> listvalues = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/SubclassbyClassificationddl?InstanceId=" + InstanceId + "&UserId=" + UserId+ "&ClassificationId=" + InstanceClassificationId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                listvalues = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(listvalues);
        }       
        public IActionResult AttendancedetailsSlot()
        {
            List<SelectListItem> listvalues = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/GetUsersbyslotsddl?InstanceId=" + InstanceId + "&Userid=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                listvalues = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(listvalues);
        }
        public IActionResult Get_Attendance_Details_Tbl(detailsattendance obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<Detailsforattedance> list = CommonMethodobj.CommonListMethod<detailsattendance, Detailsforattedance>(obj, "/Userwiseattendancedetailstbl", client);
            ViewBag.Records = list.Count();
            if (ViewBag.Records <= 0)
            {
                //ViewBag.NoRecordsFound = "0";
                return Json("0");
            }
            else
            {
                ViewBag.AttendanceDate = list[0].CreatedDate;
                ViewBag.UserAttendance = list;
            }
            return View();
        }

        //Attendance_Details
        #endregion
       
        #region  ATTENDANCE SUMMARY
        [HttpGet]
        public IActionResult Summary()
        {
            return View();
        }
        public IActionResult Get_SubClassificationNames(int InstanceClassificationId)
        {            
            List<SelectListItem> listvalues = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/ClassbySubclassificationddl?InstanceId=" + InstanceId + "&ClassificationId=" + InstanceClassificationId+ "&Createdby="+UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                listvalues = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(listvalues);
        }
        public IActionResult Classwisestudents(int InstanceClassificationId, int InstanceSubClassificationId)
        {
            
            List<PostAttendance> list = new List<PostAttendance>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Slotbystudentnamesddl?Instanceid=" + InstanceId + "&ClassificationId=" + InstanceClassificationId + "&SubClassificationId=" + InstanceSubClassificationId + "&Createdby="+ UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<PostAttendance>>(data);
            }
            //ViewBag.Student_Names = value1;

            return Json(list);
        }
        public IActionResult Get_Attendance_Summary_Details(int Studentuserid)
        {
            List<Attendance_Summary> value = new List<Attendance_Summary>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Getattendancesummarytbl?Studentuserid=" + Studentuserid + "&Instanceid=" + InstanceId + "&Createdby=" + UserId).Result;

            string data = response.Content.ReadAsStringAsync().Result;
            if (response.IsSuccessStatusCode)
            {
                value = JsonConvert.DeserializeObject<List<Attendance_Summary>>(data);
            }
            ViewBag.Records = value.Count();
            return View(value);
        }
        #endregion

        #region ATTENDANCE POSTING   AttendancePosting

        [HttpGet]
        public IActionResult AttendancePosting()
        {
            return View();
        }

        public IActionResult Attendancepostingdepartment() 
        {
            AttendancePost obj = new AttendancePost();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;    
            List<SelectListItem> list = new List<SelectListItem>();
            list = CommonMethodobj.CommonListMethod<AttendancePost, SelectListItem>(obj, "/Departmentddl", client);
            return Json(list);
        }
        public IActionResult Facultynamesdd()
        {
            AttendancePost obj = new AttendancePost();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.RoleName = "TEACHER,CLASS TEACHER";

            List<Facultynames> list = new List<Facultynames>();
            list = CommonMethodobj.CommonListMethod<AttendancePost, Facultynames>(obj, "/Facultynamesddl", client);
            return Json(list);
        }
        public IActionResult AttendancepostingdepartmentbySubclass(int InstanceClassificationId)
        {
            AttendancePost obj = new AttendancePost();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.InstanceClassificationId= InstanceClassificationId;

            List<SelectListItem> list = new List<SelectListItem>();
            list = CommonMethodobj.CommonListMethod<AttendancePost, SelectListItem>(obj, "/Classddl", client);
            return Json(list);
        }
        public IActionResult Attendancepostingdepartmentbyslot(int InstanceSubClassificationId, int InstanceClassificationId)
        {
            AttendancePost obj = new AttendancePost();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.InstanceSubClassificationId = InstanceSubClassificationId;
            obj.InstanceClassificationId = InstanceClassificationId;
            obj.FilterTeachingSubjects = 0;

            List<SelectListItem> list = new List<SelectListItem>();
            list =CommonMethodobj.CommonListMethod<AttendancePost, SelectListItem>(obj, "/Departmentbyslots", client);
            return Json(list);
        }       
        public ActionResult AttendancePosting_Tbl(AttendancePost obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<AttendancePost> list = new List<AttendancePost>();
            //List<AttendancePost> list = CommonMethodobj.CommonListMethod<AttendancePost, AttendancePost>(obj, "/CheckAnyHoliday", client);
            string Checkvalue = CheckAnyHoliday(obj.StartDate);
            if (Checkvalue=="0")
            {
                string Returnvalue = CommonInsertingMethod(obj, "/GetMentorCanPostAttendance");
                if (Returnvalue =="1")
                {
                    ///Main Method
                }
                else if (Returnvalue =="-1")
                { 
                    int DntPostAttDt = 0;
                    string Returnvalues = CommonInsertingMethod(obj, "/GetPeriodsCanPostingAttendance");
                    if (Returnvalues !="-1")
                    {
                         DntPostAttDt = int.Parse(Returnvalues);
                        //Testing Perpose viewbag values  send 
//Main Method created and Main method procedure not here newc4m file 
                        var values = new Dictionary<string, object>
                        {
                            { "Returnvalues", "-1" },
                            { "HolidayName",  DntPostAttDt},
                            { "StartDate", obj.StartDate }
                        };
                        ViewBag.AllValues = values;
                    }
                    else
                    {
                        var values = new Dictionary<string, object>
                        {
                            { "Returnvalues", "-1" },
                            { "HolidayName",  DntPostAttDt},
                            { "StartDate", obj.StartDate }
                        };
                        ViewBag.AllValues = values;
                    }
                }
            }
            else
            {
                var values = new Dictionary<string, object>
                {
                    { "Returnvalues", "0" },
                    { "HolidayName", list[0].HolidayName },
                    { "StartDate", obj.StartDate }
                };
                ViewBag.AllValues = values;
            }
            return View();
        }
        public string CheckAnyHoliday(DateTime Startdate)
        {
            AttendancePost obj = new AttendancePost();
            obj.StartDate = Startdate;
            obj.InstanceId = InstanceId;
            List<AttendancePost> list = CommonMethodobj.CommonListMethod<AttendancePost, AttendancePost>(obj, "/CheckAnyHoliday", client);
            if (list != null && list.Count > 0)
            {
                if (list[0].HolidayName != "0")
                {
                    return list[0].HolidayName;
                    // Set ViewState and other logic when HolidayName is not "0"
                    //ViewState["HolidayName"] = list[0].HolidayName;
                    //CheckAnyHoliday = true; // Assuming CheckAnyHoliday is a boolean variable
                }
                else
                {
                    return "0";
                }
            }
            return "0";
        }

        [HttpPost]
        public IActionResult AttendancePosting(AttendancePosting obj)
        {
            return View();
        }
        #endregion

        #region POST ATTENDANCE PostPeriodAttendance

        public IActionResult PostPeriodAttendance()
        {
            return View();
        }
        
        public IActionResult MentorbyPeriodsddl(int MentorUserid,DateTime StartDate)
        {
            PostPeriodattendance obj = new PostPeriodattendance();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.MentorUserid = MentorUserid;
            obj.StartDate = StartDate;

            List<PostPeriodattendance> list = new List<PostPeriodattendance>();
            list = CommonMethodobj.CommonListMethod<PostPeriodattendance, PostPeriodattendance>(obj, "/Mentorsbyperiods", client);
            return Json(list);
        }

        public IActionResult DepartmentClassnamesbyperiod(int MentorUserid, DateTime StartDate,string PeriodId)
        {
            PostPeriodattendance obj = new PostPeriodattendance();
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.MentorUserid = MentorUserid;
            obj.StartDate = StartDate;
            obj.PeriodId = PeriodId;
            obj.bFlagForLab = 1;

            List<PostPeriodattendance> list = new List<PostPeriodattendance>();
            list = CommonMethodobj.CommonListMethod<PostPeriodattendance, PostPeriodattendance>(obj, "/PeriodbyDepartmentClassnames", client);
            return Json(list);
        }

        public IActionResult PostPeriodAttendancetbl(PostPeriodattendance obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<PostPeriodattendance> list = new List<PostPeriodattendance>();
           
            string Checkvalue = CheckAnyHoliday(obj.StartDate);
            if (Checkvalue == "0")
            {
                string Returnvalue = CommonInsertingMethod(obj, "/GetMentorCanPostAttendance");
                if (Returnvalue == "1")
                {
                    ///Main Method
                }
                else if (Returnvalue == "-1")
                {
                    int DntPostAttDt = 0;
                    string Returnvalues = CommonInsertingMethod(obj, "/GetPeriodsCanPostingAttendance");
                    if (Returnvalues != "-1")
                    {
                        DntPostAttDt = int.Parse(Returnvalues);
                        //Testing Perpose viewbag values  send 
                        //Main Method created and Main method procedure not here newc4m file 
                        var values = new Dictionary<string, object>
                        {
                            { "Returnvalues", "-1" },
                            { "HolidayName",  DntPostAttDt},
                            { "StartDate", obj.StartDate }
                        };
                        ViewBag.AllValues = values;
                    }
                    else
                    {
                        var values = new Dictionary<string, object>
                        {
                            { "Returnvalues", "-1" },
                            { "HolidayName",  DntPostAttDt},
                            { "StartDate", obj.StartDate }
                        };
                        ViewBag.AllValues = values;
                    }
                }
            }
            else
            {
                var values = new Dictionary<string, object>
                {
                    { "Returnvalues", "0" },
                    { "HolidayName", list[0].HolidayName },
                    { "StartDate", obj.StartDate }
                };
                ViewBag.AllValues = values;
            }
            var valuess = new Dictionary<string, object>
                {
                    { "Returnvalues", "0" },
                    { "HolidayName", " " },
                    { "StartDate", obj.StartDate }
                };
            ViewBag.AllValues = valuess;
            return Json(ViewBag.AllValues);
        }

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
    }
}
