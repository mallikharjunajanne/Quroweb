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


        //Post Attendance Main Method 


        //---this two methods are use many places so please dont touch 1.Get_SubClassificationNames_ByInstanceClassifications 2.Slot_by_subclassification
        public IActionResult Get_SubClassificationNames_ByInstanceClassifications(string InstanceId, string InstanceClassificationId)
        {
            //var instanceid = Request.Cookies["INSTANCEID"];
            //var instanceid = Request.Cookies["INSTANCEID"];
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
        public IActionResult Slot_by_subclassification(string SubClassificationId, string ClassificationId)
        {
            var instanceid = Request.Cookies["INSTANCEID"];
            var FilterTeachingSubjects = 0;
            List<SelectListItem> Value2 = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_Slot_By_Sc?InstanceId=" + instanceid + "&ClassificationId=" + ClassificationId + "&SubClassificationId=" + SubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Subjectnames = Value2;

            return View();

        }

        public ActionResult GetAttedanceDetails(Attendancepost obj)
        //public ActionResult GetAttedanceDetails(string StartDate, string EndDate, string InstanceClassificationId, string InstanceSubClassificationId, string SubjectSlotID, string ViewBagMyData)//Get_attendance
        {
            List<GetAttendancelist> list = new List<GetAttendancelist>();
            //try
            //{
            int SatHolidy = 0;
            int SunHolidy = 1;


            DateTime StDate = obj.StartDate;
            DateTime EDate = obj.EndDate;
            string ColumnString = GenerateColumnStringds(StDate, EDate, obj.InstancesubjectId).TrimEnd(',');
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



            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_attendance?StartDate=" + startdate 
            //    + "&EndDate=" + enddate + "&InstanceClassificationId=" + obj.InstanceClassificationId 
            //    + "&InstanceSubClassificationId=" + obj.InstanceSubclassificaitionId
            //    + "&SubjectSlotID=" + obj.InstancesubjectId + "&ColumnString=" + ColumnString
            //    + "&DateString=" + DateString + "&InstanceId=" + InstanceId + "&SatHolidy=" + SatHolidy + "&SunHolidy=" + SunHolidy).Result;

            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_attendance?" + ToQueryString(requestData)).Result;



            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_attendance?StartDate=" + startdate + "&EndDate=" + enddate + "&InstanceClassificationId=" + obj.InstanceClassificationId + "&InstanceSubClassificationId=" + obj.InstanceSubclassificaitionId + "&SubjectSlotID=" + obj.InstancesubjectId + "&ColumnString=" + ColumnString + "&DateString=" + DateString + "&InstanceId=" + InstanceId).Result;
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_attendance?StartDate=" + StartDate + "&EndDate=" + EndDate + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&ColumnString=" + ColumnString + "&DateString=" + DateString + "&InstanceId=" + InstanceId).Result;
            //string data = response.Content.ReadAsStringAsync().Result;
            //string data = response.Content.ReadAsStringAsync().Result;
            //if (response.IsSuccessStatusCode)
            //{

            //    //string data = response.Content.ReadAsStringAsync().Result;

            //    Mainlist = JsonConvert.DeserializeObject<List<GetAttendancelist>>(data);
            //}

            //return View();
            //return Json(list, JsonRequestBehavior.AllowGet);

            //-----------------------------Last Try
            // return Json(list);
            //-----------------------------Last Try



            //List<PostAttendance> value = new List<PostAttendance>();
            //string ViewBagMyData="";
            //string StartDate = obj.StartDate.ToString();                
            //string EndDate = obj.EndDate.ToString();
            //string SubjectSlotID =obj.InstancesubjectId;
            //int InstanceClassificationId = int.Parse(obj.InstanceClassificationId);
            //int InstanceSubClassificationId = int.Parse(obj.InstanceSubclassificaitionId);


            ////ViewBag.Departementclass = ViewBagMyData; --->>
            ////var instanceid = Request.Cookies["INSTANCEID"]; --->>

            //string originalDate = StartDate;

            //DateTime SDate = DateTime.Parse(originalDate);

            //string convertedDate = SDate.ToString("dd'/'MM'/'yyyy");


            //DateTime StDate = DateTime.Parse(StartDate);
            //DateTime EDate = DateTime.Parse(EndDate);

            ////string columnString3 = GenerateColumnStringds(StDate, EDate, SubjectSlotID);    --->>
            ////columnString3 = columnString3.TrimEnd(',');---->>
            ////string ColumnString = columnString3;--->>

            //string ColumnString = GenerateColumnStringds(StDate, EDate, SubjectSlotID).TrimEnd(',');
            //string StartDate1 = obj.StartDate.ToString("yyyy-MM-dd HH:mm:ss");//<<<----
            //string EndDate1 = obj.EndDate.ToString("yyyy-MM-dd HH:mm:ss");//<<<----


            //DateTime startDate = DateTime.Parse(StartDate);

            //string Datestrings = "";
            //for (int i = 0; i < 7; i++)
            //{
            //    DateTime currentDate = startDate.AddDays(i);
            //    Datestrings += "[" + currentDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture) + "],";
            //}

            //Datestrings = Datestrings.TrimEnd(',');
            //string DateString = Datestrings;
            //string StartDates = Convert.ToString(StartDate);
            //string dateFormat = startDate.ToString("dd'/'MM'/'yyyy");





            //TempData["Date"] = Convert.ToString(StartDate);
            //if (StartDate == EndDate)
            //{
            //    ViewBag.Date = StartDates;

            //    ViewBag.DateFormate = dateFormat;
            //}
            //else
            //{
            //    ViewBag.Date = StartDates;
            //    ViewBag.EndDate = EndDate;
            //    ViewBag.DateFormate = dateFormat;
            //}

            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_attendance?StartDate=" + StartDate1 + "&EndDate=" + EndDate1 + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&ColumnString=" + ColumnString + "&DateString=" + DateString + "&InstanceId=" + InstanceId).Result;
            ////HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_attendance?StartDate=" + StartDate + "&EndDate=" + EndDate + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&ColumnString=" + ColumnString + "&DateString=" + DateString + "&InstanceId=" + InstanceId).Result;
            //string data = response.Content.ReadAsStringAsync().Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    //string data = response.Content.ReadAsStringAsync().Result;
            //    value = JsonConvert.DeserializeObject<List<PostAttendance>>(data);
            //}



            //List<SelectListItem> Value2 = new List<SelectListItem>();
            //HttpResponseMessage Get_Types_response = client.GetAsync(client.BaseAddress + "/Get_AttendanceTypes_Dd?InstanceId=" + InstanceId).Result;
            //if (Get_Types_response.IsSuccessStatusCode)
            //{
            //    string data_DD = Get_Types_response.Content.ReadAsStringAsync().Result;
            //    Value2 = JsonConvert.DeserializeObject<List<SelectListItem>>(data_DD);
            //}
            //ViewBag.AttendanceLeave_Types = Value2;

            //if (value[0].ErrorMessages == "1")
            //{
            //    string originalDates = StartDate;
            //    DateTime SDates = DateTime.Parse(originalDate);
            //    string convertedDates = SDates.ToString("dd'/'MM'/'yyyy");
            //    ViewBag.E_Message = "There are holidays/week-offs in the selected date range on " + convertedDates + " (Sunday).";

            //    ViewBag.ModelMessage = "1";
            //    return View();
            //}

            //ViewBag.Errormessage = value[0].ErrorMessages;
            //ViewBag.CountAttendanceList = value.Count();

            //return View(value);
            //}
            //catch (Exception)
            //{
            //    //return View();
            //    throw;
            //}


        }




        //Create Columnstring parameter  Method
        // public string GenerateColumnStringds(DateTime StDate, DateTime EDate,string SubjectSlotID)
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
            //List<Attendanceposting> attendanceData = JsonConvert.DeserializeObject<List<Attendanceposting>>(dataList);

            //string items = "";


            //int Instanceid = InstanceId;
            //DateTime NotificationDate = DateTime.Now;
            //string NotificationSubject = "Attendance";
            //int NoticeTypeId = 1;


            //string StudentNotificationMessage = "";
            //string ParentNotificationMessage = "";

            //string data1 = "";
            //string apiUrl;
            //var content = new StringContent(string.Empty);
            //HttpResponseMessage response;


            //foreach (var attendance in attendanceData)
            //{
            //    // Accessing properties of each Attendanceposting object
            //    string studentId = attendance.Studentuserid;
            //    string parentPhone = attendance.ParentPhNo;
            //    string studentName = attendance.studentName;
            //    // Accessing attendancedetails list within each Attendanceposting object
            //    foreach (var detail in attendance.attendancedetails)
            //    {
            //        string attendanceDate = detail.attendancedate;
            //        string isPresent = detail.isPresentValue;
            //        string dropdownValue = detail.dropdownValue;
            //        string comments = detail.Comments;
            //        string parentId = detail.ParentId;
            //        string parentName = detail.ParentName;


            //        string dropdownText = detail.dropdowntext;
            //        string dateValue = detail.attendancedate;                   
                    
            //        if (isPresent == "0")
            //        {
            //            // Check if AttendanceTypetext is empty
            //            string attendanceType = string.IsNullOrEmpty(dropdownText) ? "Absent" : dropdownText.Trim();
            //            // Absent message
            //            StudentNotificationMessage = $"Dear {studentName}, your attendance for {dateValue} has been posted as {attendanceType}."; 
            //        }
            //        else
            //        {
            //            // Present message
            //            StudentNotificationMessage = $"Dear {studentName}, your attendance for {dateValue} has been posted as Present.";
            //        }

            //        int StudentUserid1 = int.Parse(attendance.Studentuserid);
            //        int IsParent = 0;
                    
                   

            //         apiUrl = $"/AttendancePost_?InstanceId={InstanceId}&UserId={StudentUserid1}&IsParent={IsParent}&NotificationDate={NotificationDate}&NotificationSubject={NotificationSubject}&NotificationMessage={StudentNotificationMessage}&NoticeTypeId={NoticeTypeId}&CreatedBy={UserId}";
            //        response = client.PostAsync(client.BaseAddress + apiUrl, content).Result;
            //        data1 = response.Content.ReadAsStringAsync().Result;
            //        //if (response.IsSuccessStatusCode)
            //        //{

            //        //}


            //        if (isPresent == "0")
            //        {
            //            // Check if AttendanceTypetext is empty
            //            string attendanceType = string.IsNullOrEmpty(dropdownText) ? "Absent" : dropdownText.Trim();
            //            // Absent message
            //            ParentNotificationMessage = $"Dear Parent ({parentName}), your ward's attendance for {dateValue} has been posted as {attendanceType}.";
            //        }
            //        else
            //        {
            //            // Present message
            //            ParentNotificationMessage = $"Dear Parent ({parentName}), your ward's attendance for {dateValue} has been posted as Present.";
            //        }

                

            //        if (detail.ParentId !="")
            //        {
            //            int Parentid = int.Parse(detail.ParentId);
            //            int IsParents = 1;

            //            var Apiurl = $"/AttendancePost_?InstanceId={InstanceId}&UserId={Parentid}&IsParent={IsParents}&NotificationDate={NotificationDate}&NotificationSubject={NotificationSubject}&NotificationMessage={ParentNotificationMessage}&NoticeTypeId={NoticeTypeId}&CreatedBy={UserId}";
            //            response = client.PostAsync(client.BaseAddress + Apiurl, content).Result;
            //            data1 = response.Content.ReadAsStringAsync().Result;
            //        }
            //    }
            //}


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
            string itemss = "";
            List<string> items = new List<string>();
            string data2 = responses.Content.ReadAsStringAsync().Result;
            if (responses.IsSuccessStatusCode)
            {
                items = JsonConvert.DeserializeObject<List<string>>(data2);
                //itemss = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
            //return Json(itemss);



            //try
            //{
            //    foreach (var attendance in attendanceData)
            //    {
            //        string studentId = attendance.Studentuserid;
            //        string parentPhone = attendance.ParentPhNo;
            //        string studentName = attendance.studentName;
            //        int SubjectSlotID = attendance.SubjectSlotID;
            //        foreach (var detail in attendance.attendancedetails)
            //        {
            //            string attendanceDate = detail.attendancedate;
            //            string isPresent = detail.isPresentValue;
            //            string dropdownValue = detail.dropdownValue;
            //            string comments = detail.Comments;
            //            string parentId = detail.ParentId;
            //            string parentName = detail.ParentName;


            //            string dropdownText = detail.dropdowntext;
            //            string dateValue = detail.attendancedate;
            //            DateTime date = DateTime.ParseExact(attendanceDate, "dd/MM/yyyy", CultureInfo.InvariantCulture);
            //            string formattedDate = date.ToString("yyyy-MM-dd HH:mm:ss");
            //            if (dropdownValue == "--Select--")
            //            {
            //                dropdownValue = "";
            //            }

            //            StringContent contentss = new StringContent("", Encoding.UTF8, "application/json");
            //            HttpResponseMessage responsess = client.PostAsync(client.BaseAddress + "/AttendanceSpecialCommentsinsert_?UserID="+ studentId+ "&SubjectSlotID="+ SubjectSlotID+ "&Ispresent="+ isPresent+ "&AttendanceDate="+ formattedDate+ "&AttendanceType="+ dropdownValue+ "&SplAttenanceComments="+ comments+ "&CreatedBy="+UserId, contentss).Result;

            //            string data3 = responsess.Content.ReadAsStringAsync().Result;
            //            if (responses.IsSuccessStatusCode)
            //            {

            //                items = JsonConvert.DeserializeObject<string>(data3);
            //            }
            //        }
            //    }

            //    //    foreach (var data in attendanceData)
            //    //{
            //    //    data.InstanceId = InstanceId;
            //    //    data.CreatedBy = UserId;
            //    //}

            //    //string updatedDataJson = JsonConvert.SerializeObject(attendanceData);
            //    //StringContent contents = new StringContent(updatedDataJson, Encoding.UTF8, "application/json");
            //    //HttpResponseMessage responses = client.PostAsync(client.BaseAddress + "/AttendanceSpecialCommentsinsert", content).Result;
            //    //string items = "";
            //    //string data2 = responses.Content.ReadAsStringAsync().Result;
            //    //if (responses.IsSuccessStatusCode)
            //    //{

            //    //    items = JsonConvert.DeserializeObject<string>(data2);
            //    //}
            //    //return Json(items);
            //    return Json(items);
            //}
            //catch (Exception)
            //{
            //    return Json(items);
            //    throw;
            //}




        }

        #region  ATTENDANCE SUMMARY
        [HttpGet]
        public IActionResult Summary()
        {
           return View();
        }


        public IActionResult Get_SubClassificationNames(int InstanceClassificationId)
        {
            List<SelectListItem> List= new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_SubClassificationNames_ByclassificationId?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                List = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            /*ViewBag.SubClassificationNames = value1*/;
            return Json(List);            
        }

        public IActionResult Classwisestudents(int InstanceClassificationId, int InstanceSubClassificationId, string RoleId)
        {
            List<PostAttendance> list = new List<PostAttendance>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Slot_By_StudentNames?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&RoleId=" + RoleId).Result;
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_Attendance_Summary_List?UserID=" + Studentuserid + "&InstanceID=" + InstanceId).Result;

            string data = response.Content.ReadAsStringAsync().Result;
            if (response.IsSuccessStatusCode)
            {
                value = JsonConvert.DeserializeObject<List<Attendance_Summary>>(data);
            }
            ViewBag.Records = value.Count();
            return View(value);
        }
        #endregion

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


        #region   ATTENDANCE DETAILS      Attendance_Details


        [HttpGet]
        public IActionResult AttendanceDetails()
        {

            //var instanceid = Request.Cookies["INSTANCEID"];
            var UserIDs = Request.Cookies["LoginUserId"];

            
            ViewBag.TClassification = null;
            ViewBag.Names = null;
            ViewBag.AdminLogin = null;
            ViewBag.studentuserid = null;

            //if (UserIDs == "29255")
            //{

            //    List<SelectListItem> value = new List<SelectListItem>();

            //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_ClassificationNames_ByinstanceId?InstanceId=" + InstanceId + "&UserID=" + UserIDs).Result;
            //    if (response.IsSuccessStatusCode)
            //    {
            //        string data = response.Content.ReadAsStringAsync().Result;
            //        value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            //    }
            //    ViewBag.Names = value;
            //    ViewBag.AdminLogin = InstanceId;
            //    ViewBag.studentuserid = UserIDs;
              
            //}
            //else 
            //{

            //    List<SelectListItem> TValues = new List<SelectListItem>();

            //    HttpResponseMessage T_response = client.GetAsync(client.BaseAddress + "/T_Classification_DD?InstanceId=" + InstanceId).Result;
            //    if (T_response.IsSuccessStatusCode)
            //    {
            //        string Tdata = T_response.Content.ReadAsStringAsync().Result;
            //        TValues = JsonConvert.DeserializeObject<List<SelectListItem>>(Tdata);
            //    }
            //    ViewBag.TClassification = TValues;

            //}


            //1st fire procedure
            //exec stp_GetSubjectsByUserID @UserID = 29255,@InstanceID = 545
            //After button click procedure
            //exec stp_GetAttedanceDetails @UserID=29255,@InstanceID=545,@StartDate='2023-05-01 00:00:00',@EndDate='2023-05-31 00:00:00',@SubjectSlotID=761

            return View();
        }

        public IActionResult Attendancedetailsdepartment()
        {
            List<SelectListItem> Departmentlist = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Str_Classification_DD?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data1 = Response.Content.ReadAsStringAsync().Result;
                Departmentlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data1);
            }
            //ViewBag.Slot_Subjectnames = Departmentlist;
            return Json(Departmentlist);
        }
        public IActionResult AttendancedetailsSubClass(int InstanceClassificationId)
        {          
            List<SelectListItem> Subclasslist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_SubClassificationNames_ByclassificationId?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Subclasslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            //ViewBag.SubClassificationNames = Subclasslist;

            return Json(Subclasslist);
        }

        public IActionResult AttendancedetailsSlot(string UserID)
        {
            List<SelectListItem> Valueslist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_UserNames_By_Slot?InstanceId=" + InstanceId + "&UserID=" + UserID).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Valueslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            //ViewBag.Slot_Subjectnames = Valueslist;
            return Json(Valueslist);
        }
        public IActionResult Get_Attendance_Details_Tbl(detailsattendance obj)
        {            
            obj.InstanceId = InstanceId;            
            List<Detailsforattedance> list = CommonMethodobj.CommonListMethod<detailsattendance, Detailsforattedance>(obj, "/Details_By_Name", client);
            ViewBag.Records = list.Count();
            if (ViewBag.Records <= 0)
            {
                ViewBag.NoRecordsFound = "0";
            }
            else
            {
                ViewBag.AttendanceDate = list[0].CreatedDate;
                ViewBag.UserAttendance = list;
            }
            return View();

        }

        #endregion


        #region ViewAttendanceDetails   STUDENT LOGIN ATTENDANCE DETAILS

        public IActionResult ViewAttendanceDetails()
        {
            return View();
        }

        public IActionResult attendancedetailsSlots()
        {
            List<SelectListItem> Valueslist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_UserNames_By_Slot?InstanceId=" + InstanceId + "&UserID=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Valueslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(Valueslist);
        }

        public IActionResult GetViewAttendanceDetailstbl(Studentattendancedetails obj)//Attd_det_by_St_Lg
        {
            //var instanceid = Request.Cookies["INSTANCEID"];
            //var UserIDs = Request.Cookies["LoginUserId"];

            //string StartDate = obj.StartDate.ToString("yyyy-MM-dd");
            //string EndDate = obj.EndDate.ToString("yyyy-MM-dd");
            //List<Attendance_Details> value = new List<Attendance_Details>();

            obj.InstanceId = InstanceId;
            obj.UserId = UserId;
            List<StudentDetailsforattedance> list = CommonMethodobj.CommonListMethod<Studentattendancedetails, StudentDetailsforattedance>(obj, "/Getstudentattendancedetails", client);

            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_St_At_Dt_lg?UserID=" + UserId + "&InstanceID=" + InstanceId + "&StartDate=" + obj.StartDate + "&EndDate=" + obj.EndDate + "&SubjectSlotID=" + obj.SubjectSlotID).Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    string data = response.Content.ReadAsStringAsync().Result;
            //    value = JsonConvert.DeserializeObject<List<Attendance_Details>>(data);
            //}
            ViewBag.Records = list.Count();
            if (ViewBag.Records <= 0)
            {
                ViewBag.NoRecordsFound = "0";
            }
            else
            {
                ViewBag.departmentName = list[0].ClassificationName;
                ViewBag.className = list[0].SubClassificationName;
                ViewBag.AttendanceLastDate = list[0].CreatedDate;
                // ViewBag.PresentCount = value[0].Present;
                ViewBag.UserAttendance = list;
            }
           
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
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_UserNames_By_Slot?InstanceId=" + InstanceId + "&UserID=" + UserID).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Valueslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Slot_Subjectnames = Valueslist;
            return View();
        }

        

       
      




        #region FAST ATTENDANCE
        [HttpGet]
        public IActionResult FastAttendance()
        {
            return View();
        }
        public IActionResult FastAttendanceClassification()//Fast_Get_Classification
        {
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(value);
        }
        public IActionResult FastAttendancegetSlots()
        {
            List<FastAttendance> slotslist = new List<FastAttendance>();
            HttpResponseMessage responseSlot = client.GetAsync(client.BaseAddress + "/F_Get_Slots?InstanceId=" + InstanceId).Result;
            if (responseSlot.IsSuccessStatusCode)
            {
                string data1 = responseSlot.Content.ReadAsStringAsync().Result;
                slotslist = JsonConvert.DeserializeObject<List<FastAttendance>>(data1);
            }
            return Json(slotslist);
            //ViewBag.Slot_Subjectnames = Valueslist;
            //return View();
        }

        public IActionResult FastAttendancegetSubclass(int InstanceClassificationId)
        {
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification_By_SubClassification?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            //ViewBag.InSubclass = value;
            return Json(value);
            //return View();
        }

        [HttpGet]
        public IActionResult Get_FastAttendance_Table(int InstanceClassificationId, string[] InstanceSubClassificationId, DateTime StartDate, int SlotId)/*string InstanceID,*/
        {
            List<FastAttendance> value = new List<FastAttendance>();
            try
            {
                string startDate = StartDate.ToString("yyyy-MM-dd HH:mm:ss");
                string endDate = startDate;


                string ColumnString = "NULL as column1,NULL as column2,NULL as column3,NULL as column4,NULL as column5,NULL as column6,NULL as column7";

                foreach (var InstanceSubClassid in InstanceSubClassificationId)
                {
                    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/F_Attendance_TableData?StartDate=" + startDate + "&EndDate=" + endDate + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationIds=" + InstanceSubClassid + "&SubjectSlotID=" + SlotId + "&InstanceID=" + InstanceId + "&ColumnString=" + ColumnString).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string data = response.Content.ReadAsStringAsync().Result;
                        var items = JsonConvert.DeserializeObject<List<FastAttendance>>(data);
                        value.AddRange(items);
                    }
                }
                if (value.Any(item => item.Returnmessage != "0"))
                {
                    ViewBag.resultCount = value.Count();
                    return View(value);
                }
                else
                {
                    var firstItem = value.FirstOrDefault();
                    var retunObj = new
                    {
                        Returnmessage = firstItem.Returnmessage,
                        SubClassid = firstItem.InstanceSubClassificationId
                    };
                    return Json(retunObj);
                }
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
        //public ActionResult FastAttendance(FastAttendance obj, string InstanceClassificationId, string StartDate, string SubjectSlotID, List<Dictionary<string, string>> formData,string CreatedBy)
        public ActionResult FastAttendance(FastAttendance obj, int InstanceClassificationId, DateTime StartDate, int SubjectSlotID, List<Dictionary<string, string>> formData)
        {

            string items = "";
            foreach (var data in formData)
            {
                string startDate = StartDate.ToString("yyyy-MM-dd HH:mm:ss");
                string endDate = startDate;

                var instanceSubClassificationId = data["instanceSubClassificationId"];
                var textareaValue = data["textareaValue"];

                //var textareaValues = textareaValue.Split(',');
                var instanceSubClassificationIds = instanceSubClassificationId.Split(',');

                for (int i = 0; i < instanceSubClassificationIds.Length; i++)
                {
                    var currentInstanceSubClassificationId = instanceSubClassificationIds[i];

                    //for (int j = 0; j < textareaValues.Length; j++)
                    //{
                    //var currentTextareaValue = textareaValues[j];

                    string data1 = JsonConvert.SerializeObject(obj);
                    StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Fast_At_Post?InstanceID=" + InstanceId + "&UserIds=" + textareaValue + "&InstanceClassificationId=" + InstanceClassificationId + "&StartDate=" + startDate + "&InstanceSubClassificationId=" + instanceSubClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&CreatedBy=" + UserId, content).Result;
                    var data2 = "";

                    //{ "type":"https://tools.ietf.org/html/rfc7231#section-6.5.1","title":"One or more validation errors occurred.","status":400,"traceId":"|6e47da35-45210d69253871e0.1.4d2e33eb_","errors":{ "StartDate":["The value '21-08-2023 00:00:00' is not valid."]} }

                    if (response.IsSuccessStatusCode)
                    {
                        data2 = response.Content.ReadAsStringAsync().Result;
                        items = JsonConvert.DeserializeObject<string>(data2);
                    }
                    //}
                }
            }
            return Json(items);
        }


        #endregion



        //======>>>> Deleting Message
        public IActionResult F_Get_Inc_By_Subclass(string InstanceId, string InstanceClassificationId)
        {
            
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification_By_SubClassification?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.InSubclass = value;
            return View();
        }






        //Admin Login Post method Start

        #region AttendancePosting
        
        [HttpGet]
        public IActionResult AttendancePosting()
        {
           
            //var RoleName = "TEACHER,CLASS TEACHER";

            ////ViewBag.LoginUserId = LoginUserId;

            ////Department DD Start code 
            //List<SelectListItem> value = new List<SelectListItem>();
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification?InstanceId=" + InstanceId).Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    string data = response.Content.ReadAsStringAsync().Result;
            //    value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            //}
            //ViewBag.Names = value;
            ////Department DD End code 

            ////Teacher Names DD start Code

            
            ////Teacher Names DD End Code



            return View();
        }

        public IActionResult Attendancepostingdepartment() 
        {
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(value);
        }

        public IActionResult AttendancepostingdepartmentbySubclass(int InstanceClassificationId)
        {

            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification_By_SubClassification?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.InSubclass = value;
            return Json(value);
        }
        public IActionResult Attendancepostingdepartmentbyslot(int InstanceSubClassificationId, int InstanceClassificationId)
        {            
            var FilterTeachingSubjects = 0;
            List<SelectListItem> Value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_Slot_By_Sc?InstanceId=" + InstanceId + "&ClassificationId=" + InstanceClassificationId + "&SubClassificationId=" + InstanceSubClassificationId + "&FilterTeachingSubjects=" + FilterTeachingSubjects).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Subjectnames = Value;
            return Json(Value);
        }



        public IActionResult Facultynamesdd()
        {
            var RoleName = "TEACHER,CLASS TEACHER";
            List<Facultydropdown> Mentornames = new List<Facultydropdown>();

            //List<Detailsforattedance> list = CommonMethodobj.CommonListMethod<detailsattendance, Detailsforattedance>(obj, "/Details_By_Name", client);
            //List<DropdownClass> DdlInstanceSubClassificationIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceSubClassificationId_Calingfunction", client);


            HttpResponseMessage Tl_Response = client.GetAsync(client.BaseAddress + "/Admin_PostSC_Faculty_DD?InstanceId=" + InstanceId + "&RoleName=" + RoleName).Result;
            if (Tl_Response.IsSuccessStatusCode)
            {
                string data = Tl_Response.Content.ReadAsStringAsync().Result;
                Mentornames = JsonConvert.DeserializeObject<List<Facultydropdown>>(data);
            }
            ViewBag.TcNames = Mentornames;
            return Json(Mentornames);
        }
        public ActionResult AttendancePosting_Tbl(AttendancePosting obj)
        {
            return View();
        }

        [HttpPost]
        public IActionResult AttendancePosting(AttendancePosting obj)
        {
            return View();
        }
        #endregion



        [HttpGet]
        public IActionResult PostPeriodAttendance()
        {
            var RoleName = "TEACHER,CLASS TEACHER";


            List<AttendancePosting> Tl_NamesValues = new List<AttendancePosting>();
            HttpResponseMessage Tl_Response = client.GetAsync(client.BaseAddress + "/Admin_PostSC_Faculty_DD?InstanceId=" + InstanceId + "&RoleName=" + RoleName).Result;
            if (Tl_Response.IsSuccessStatusCode)
            {
                string datatl = Tl_Response.Content.ReadAsStringAsync().Result;
                Tl_NamesValues = JsonConvert.DeserializeObject<List<AttendancePosting>>(datatl);
            }
            ViewBag.TcNames = Tl_NamesValues;
            return View();
        }




    }
}
