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

namespace Connect4m_Web.Controllers
{
    public class Attendance : Controller
    {
        // Uri baseAddress = new Uri("https://localhost:44331/api/AttendanceCtr");
       // Uri baseAddress = new Uri("https://localhost:44331/api/AttendanceCtr");
        //Uri baseAddress = new Uri("http://192.168.1.142:98/api/FeeSctionCtr");
       // HttpClient client;


        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;


        public Attendance(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/AttendanceCtr");
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
        [HttpGet]
        public IActionResult Post_Attendance()
        {

            //class teacher        

            T_PostAttendance CL_Model = new T_PostAttendance();
            var InstanceId = Request.Cookies["INSTANCEID"];
            var LoginUserId = Request.Cookies["LoginUserId"];
            var InstanceClassificationId = Request.Cookies["InstanceClassificationId"];
            var InstanceSubClassificationId = Request.Cookies["InstanceSubClassificationId"];
            var Roleid = Request.Cookies["Roleid"];
            var DelegationClasses = Request.Cookies["DelegationClasses"];

            ViewBag.LoginUserId          = LoginUserId;
            ViewBag.InstanceClassificationId    = InstanceClassificationId;
            ViewBag.InstanceSubClassificationId = InstanceSubClassificationId;
            ViewBag.Roleid = Roleid;

            List<T_PostAttendance> Cl_Value = new List<T_PostAttendance>();
            HttpResponseMessage CL_Response = client.GetAsync(client.BaseAddress + "/GetClassesByTeacher?InstanceId=" + InstanceId + "&UserId=" + LoginUserId + "&DelegationClasses=" + DelegationClasses).Result;
            if (CL_Response.IsSuccessStatusCode)
            {
                string Cl_data = CL_Response.Content.ReadAsStringAsync().Result;
                Cl_Value = JsonConvert.DeserializeObject<List<T_PostAttendance>>(Cl_data);
            }

            int lenth5 = Cl_Value.Count;
            var items = new List<SelectListItem>();
            var itemsubject = new List<SelectListItem>();
            for (int i = 0; i < lenth5; i++)
            {
                items.Add(new SelectListItem { Value = Cl_Value[i].INSTANCECLASSIFICATIONID.ToString(), Text = Cl_Value[i].CLASSIFICATIONNAME.ToString() });
                itemsubject.Add(new SelectListItem { Value = Cl_Value[i].InstanceSubClassificationId.ToString(), Text = Cl_Value[i].SubClassificationName.ToString() });
            }
            ViewBag.Cl_DD = new SelectList(items, "Value", "Text");
            ViewBag.Cl_Subject_DD = new SelectList(itemsubject, "Value", "Text");
        




            //Admin Login

            PostAttendance model = new PostAttendance();
            var instanceid = Request.Cookies["INSTANCEID"];


            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_ClassificationNames_ByinstanceId?InstanceId=" + instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Names = value;
            return View();
        }
        public IActionResult Get_SubClassificationNames_ByInstanceClassifications(string InstanceId, string InstanceClassificationId)
        {
            var instanceid = Request.Cookies["INSTANCEID"];
            //var instanceid = Request.Cookies["INSTANCEID"];
            List<SelectListItem> value1 = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_SubClassificationNames_ByclassificationId?InstanceId=" + instanceid + "&InstanceClassificationId=" + InstanceClassificationId).Result;
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


        public ActionResult GetAttedanceDetails(string StartDate, string EndDate, string InstanceClassificationId, string InstanceSubClassificationId, string SubjectSlotID, string ViewBagMyData)//Get_attendance
        {
            if (ModelState.IsValid)
            {
                List<PostAttendance> value = new List<PostAttendance>();

                ViewBag.Departementclass = ViewBagMyData;

                var instanceid = Request.Cookies["INSTANCEID"];

                string originalDate = StartDate;

                DateTime SDate = DateTime.Parse(originalDate);

                string convertedDate = SDate.ToString("dd'/'MM'/'yyyy");


                DateTime StDate = DateTime.Parse(StartDate);
                DateTime EDate = DateTime.Parse(EndDate);
                  
                string columnString3 = GenerateColumnStringds(StDate, EDate, SubjectSlotID);
                columnString3 = columnString3.TrimEnd(',');

                string ColumnString = columnString3;

                DateTime startDate = DateTime.Parse(StartDate);

                string Datestrings = "";
                for (int i = 0; i < 7; i++)
                {
                    DateTime currentDate = startDate.AddDays(i);
                    Datestrings += "[" + currentDate.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture) + "],";
                }

                Datestrings = Datestrings.TrimEnd(',');
                string DateString = Datestrings;


                string StartDates = Convert.ToString(StartDate);

                string dateFormat = startDate.ToString("dd'/'MM'/'yyyy");

                TempData["Date"] = Convert.ToString(StartDate);
                if (StartDate == EndDate)
                {
                    ViewBag.Date = StartDates;

                    ViewBag.DateFormate = dateFormat;
                }
                else
                {
                    ViewBag.Date = StartDates;
                    ViewBag.EndDate = EndDate;
                    ViewBag.DateFormate = dateFormat;
                }

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_attendance?StartDate=" + StartDate + "&EndDate=" + EndDate + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&SubjectSlotID=" + SubjectSlotID + "&ColumnString=" + ColumnString + "&DateString=" + DateString + "&InstanceId=" + instanceid).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    value = JsonConvert.DeserializeObject<List<PostAttendance>>(data);
                }



                List<SelectListItem> Value2 = new List<SelectListItem>();
                HttpResponseMessage Get_Types_response = client.GetAsync(client.BaseAddress + "/Get_AttendanceTypes_Dd?InstanceId=" + instanceid).Result;
                if (Get_Types_response.IsSuccessStatusCode)
                {
                    string data_DD = Get_Types_response.Content.ReadAsStringAsync().Result;
                    Value2 = JsonConvert.DeserializeObject<List<SelectListItem>>(data_DD);
                }
                ViewBag.AttendanceLeave_Types = Value2;

                if (value[0].ErrorMessages == "1")
                {
                    string originalDates = StartDate;
                    DateTime SDates = DateTime.Parse(originalDate);
                    string convertedDates = SDates.ToString("dd'/'MM'/'yyyy");
                    ViewBag.E_Message = "There are holidays/week-offs in the selected date range on " + convertedDates + " (Sunday).";

                    ViewBag.ModelMessage = "1";
                    return View();
                }

                ViewBag.Errormessage = value[0].ErrorMessages;
                ViewBag.CountAttendanceList = value.Count();

                return View(value);
            }
            return View();

        }
        //Create Columnstring parameter  Method
        public string GenerateColumnStringds(DateTime StDate, DateTime EDate,string SubjectSlotID)
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

                columnStringBuilder.AppendFormat("[{0}] as column{1},0 as DisplayIcon{1},[dbo].[fn_Get_AttendanceId](UserId,"+ SubjectSlotID + ",'{0}',NULL) as AttendanceId{1},", convertedDate, columnNumber);
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

            var instanceid = Request.Cookies["INSTANCEID"];
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


        [HttpPost]
        public IActionResult Post_Attendance(string dataList)
        {
            List<PostAttendance> attendanceData = JsonConvert.DeserializeObject<List<PostAttendance>>(dataList);
            

            var instanceid = Request.Cookies["INSTANCEID"];
            var IsParent = "1";
            var NotificationSubject = "Attendance";
            var NoticeTypeId = "1";
            string data1 = "";
            
            var fromAddress = new MailAddress("mangasrikanth313@gmail.com", "Srekanth");
            var successMessage = new List<string>();
            var failureMessage = new List<string>();

            foreach (var data in attendanceData)
            {
                var Userid1 = data.UserId;
                var Ispresent = data.Ispresent;
                var Name1 = data.Name;
                var dateValue = data.dateValue;
                var selectedValues = data.Dropdownvalue;
                var SplAttenanceComments = data.comment;
                var AttendanceTypeId = data.AttendanceTypeId;
                var SubjectSlotID = data.SubjectSlotID;
                var CreatedBy = data.CreatedBy;


                var emailAddress = data.StudEmail;

                var NotificationMessage = "";
                if (Ispresent == "1")
                {
                    NotificationMessage = "Dear Parent (" + Name1 + "), your ward's attendance for " + dateValue + " has been posted as Present";
                }
                else
                {
                    NotificationMessage = "Dear Parent (" + Name1 + "), your ward's attendance for " + dateValue + " has been posted as " + selectedValues + " " + SplAttenanceComments + " Absent";
                }



                if (!string.IsNullOrEmpty(emailAddress))
                {
                    var subject = "Attendance Notification";
                    var body = NotificationMessage;

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
                            successMessage.Add(Name1);
                        }
                        catch (SmtpException ex)
                        {
                           
                            failureMessage.Add(Name1);
                            Console.WriteLine("SMTP Exception: " + ex.Message);
                        }
                        catch (SocketException ex)
                        {
                            // Handle specific socket-related errors
                            failureMessage.Add(Name1);
                            Console.WriteLine("Socket Exception: " + ex.Message);
                        }
                        catch (Exception ex)
                        {
                            // Handle other exceptions
                            failureMessage.Add(Name1);
                            Console.WriteLine("Error sending email: " + ex.Message);
                        }
                    }
                }










                string apiUrl = $"/AttendancePost?InstanceId={instanceid}&UserId={Userid1}&NotificationMessage={NotificationMessage}&NotificationDate={dateValue}&NotificationSubject={NotificationSubject}&NoticeTypeId={NoticeTypeId}&IsParent={IsParent}&SplAttenanceComments={SplAttenanceComments}&Ispresent={Ispresent}&AttendanceTypeId={AttendanceTypeId}&SubjectSlotID={SubjectSlotID}&CreatedBy={CreatedBy}";
                 var content = new StringContent(string.Empty);
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + apiUrl, content).Result;
                
                if (response.IsSuccessStatusCode)
                {
                    data1 = response.Content.ReadAsStringAsync().Result;
                }

               
               
            }

            int successCount = successMessage.Count;
            int failureCount = failureMessage.Count;

            var result = new
            {
                Data1 = data1,
                SuccessCount = successCount,
                SuccessList = successMessage,
                FailureCount = failureCount,
                FailureList = failureMessage,
            };
            //return Json(data1);
            return Json(result);
        }

       // public IActionResult Post_Attendance(PostAttendance obj, string Ispresent, string Name1, string Userid1, string selectedValues, string dateValue, string SplAttenanceComments, string AttendanceTypeId, string SubjectSlotID,string CreatedBy, List<PostAttendance> dataList)
        //{
        //    var instanceid = Request.Cookies["INSTANCEID"];

        //    var NotificationMessage = " ";

        //    if (Ispresent == "1")
        //    {
        //        NotificationMessage = "Dear Parent (" + Name1 + "),your ward''s attendance for" + dateValue + "has been Posted as  " + "Present";
        //        //   comment ==SplAttenanceComments
        //        //   Dropdownvalue==selectedValues
        //    }
        //    else
        //    {
        //        NotificationMessage = "Dear Parent (" + Name1 + "),your ward''s attendance for" + dateValue + "has been Posted as " + selectedValues + " " + SplAttenanceComments + " " + "Absent";
        //    }
        //    //Parameters Start
        //    var IsParent = "1";
        //    var NotificationSubject = "Attendance";
        //    var NoticeTypeId = "1";
        //    //Parameters End

        //    string data = JsonConvert.SerializeObject(obj);
        //    StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
        //    HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/AttendancePost?InstanceId=" + instanceid + "&UserId=" + Userid1 + "&NotificationMessage=" + NotificationMessage + "&NotificationDate=" + dateValue + "&NotificationSubject=" + NotificationSubject + "&NoticeTypeId=" + NoticeTypeId + "&IsParent=" + IsParent + "&SplAttenanceComments=" + SplAttenanceComments + "&Ispresent=" + Ispresent + "&AttendanceTypeId=" + AttendanceTypeId + "&SubjectSlotID=" + SubjectSlotID+ "&CreatedBy="+ CreatedBy, content).Result;
        //    string data1 = "";
        //    if (response.IsSuccessStatusCode)
        //    {
        //        data1 = response.Content.ReadAsStringAsync().Result;
        //    }

        //    return Json(data1);
        //}


        //Attendance Summery Method Code start
        [HttpGet]
        public IActionResult Summary()
        {
            Attendance_Summary model = new Attendance_Summary();
            var instanceid = Request.Cookies["INSTANCEID"];

            //TempData["InstanceId"] = model.InstanceId;

            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_ClassificationNames_ByinstanceId?InstanceId=" + instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Names = value;
            return View();
        }

        public IActionResult SlotidBy_Student_Names(string InstanceClassificationId, string InstanceSubClassificationId, string RoleId)
        {
            var instanceid = Request.Cookies["INSTANCEID"];
            List<PostAttendance> value1 = new List<PostAttendance>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Slot_By_StudentNames?InstanceId=" + instanceid + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&RoleId=" + RoleId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value1 = JsonConvert.DeserializeObject<List<PostAttendance>>(data);
            }
            ViewBag.Student_Names = value1;

            return View();
        }

        public IActionResult Get_Attendance_Summary_Details(string UserID, string InstanceID)
        {
            var instanceid = Request.Cookies["INSTANCEID"];
            List<Attendance_Summary> value = new List<Attendance_Summary>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_Attendance_Summary_List?UserID=" + UserID + "&InstanceID=" + instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<Attendance_Summary>>(data);
            }
            ViewBag.Records = value.Count();
            return View(value);
        }
        //Attendance Summery Method Code End



        [HttpGet]
        public IActionResult Attendance_Details()
        {

            var instanceid = Request.Cookies["INSTANCEID"];
            var UserIDs = Request.Cookies["LoginUserId"];

            ViewBag.InstanceId = instanceid;
            ViewBag.TClassification = null;
            ViewBag.Names = null;
            ViewBag.AdminLogin = null;
            ViewBag.studentuserid = null;

            if (UserIDs == "29255")
            {

                List<SelectListItem> value = new List<SelectListItem>();

                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_ClassificationNames_ByinstanceId?InstanceId=" + instanceid + "&UserID=" + UserIDs).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
                }
                ViewBag.Names = value;
                ViewBag.AdminLogin = instanceid;
                ViewBag.studentuserid = UserIDs;
              
            }
            else 
            {

                List<SelectListItem> TValues = new List<SelectListItem>();

                HttpResponseMessage T_response = client.GetAsync(client.BaseAddress + "/T_Classification_DD?InstanceId=" + instanceid).Result;
                if (T_response.IsSuccessStatusCode)
                {
                    string Tdata = T_response.Content.ReadAsStringAsync().Result;
                    TValues = JsonConvert.DeserializeObject<List<SelectListItem>>(Tdata);
                }
                ViewBag.TClassification = TValues;

            }


            //1st fire procedure
            //exec stp_GetSubjectsByUserID @UserID = 29255,@InstanceID = 545
            //After button click procedure
            //exec stp_GetAttedanceDetails @UserID=29255,@InstanceID=545,@StartDate='2023-05-01 00:00:00',@EndDate='2023-05-31 00:00:00',@SubjectSlotID=761

            return View();
        }


        public IActionResult Slot_by_UserName(string UserID, string InstanceID)
        {
            var instanceid = Request.Cookies["INSTANCEID"];

            List<SelectListItem> Valueslist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_UserNames_By_Slot?InstanceId=" + instanceid + "&UserID=" + UserID).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Valueslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Slot_Subjectnames = Valueslist;

            return View();

        }

        public IActionResult Attd_det_by_St_Lg(Attendance_Details obj)
        {

            var instanceid = Request.Cookies["INSTANCEID"];
            var UserIDs = Request.Cookies["LoginUserId"];

            string StartDate = obj.StartDate.ToString("yyyy-MM-dd");
            string EndDate = obj.EndDate.ToString("yyyy-MM-dd");

            List<Attendance_Details> value = new List<Attendance_Details>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_St_At_Dt_lg?UserID=" + UserIDs + "&InstanceID=" + instanceid + "&StartDate=" + StartDate + "&EndDate=" + EndDate + "&SubjectSlotID=" + obj.InstanceSubjectId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<Attendance_Details>>(data);
            }
            ViewBag.Records = value.Count();
            if (ViewBag.Records <= 0)
            {
                ViewBag.NoRecordsFound = "0";
            }
            else 
            {
                ViewBag.departmentName = value[0].ClassificationName;
                ViewBag.className = value[0].SubClassificationName;
                ViewBag.AttendanceLastDate = value[0].CreatedDate;
                // ViewBag.PresentCount = value[0].Present;
                ViewBag.UserAttendance = value;
            }
            //else
            //{
            //    ViewBag.NoRecordsFound = "0";
            //    return View();
            //}
            return View();

        }


       
        public IActionResult Get_Attendance_Details_Tbl( string StartDate, string EndDate, string UserID, string SlotSubjectsNames,string bFlagForDisplay,int instanceid)
        {
         
            List<Attendance_Details> value = new List<Attendance_Details>();

            //exec stp_GetAttedanceDetailsOfSubjects @UserID=80781,@InstanceID=545,@StartDate='2023-09-29 00:00:00',@EndDate='2023-09-29 00:00:00',@SubjectSlotID=761,@bFlagForDisplay=2


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Details_By_Name?UserID=" + UserID + "&InstanceID=" + instanceid + "&StartDate=" + StartDate + "&EndDate=" + EndDate + "&SubjectSlotID=" + SlotSubjectsNames + "&bFlagForDisplay=" + bFlagForDisplay).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<Attendance_Details>>(data);
            }
            ViewBag.Records = value.Count();
            if (ViewBag.Records <= 0)
            {
                ViewBag.NoRecordsFound = "0";
            }
            else 
            {
                ViewBag.AttendanceDate = value[0].CreatedDate;
                ViewBag.UserAttendance = value;
            }
            


            return View();

        }






        [HttpGet]
        public IActionResult FastAttendance()
        {


            var LoginUserId = Request.Cookies["LoginUserId"];
            var instanceid = Request.Cookies["INSTANCEID"];

            ViewBag.LoginUserId = LoginUserId;

            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification?InstanceId=" + instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Names = value;




            List<FastAttendance> Valueslist = new List<FastAttendance>();
            HttpResponseMessage responseSlot = client.GetAsync(client.BaseAddress + "/F_Get_Slots?InstanceId=" + instanceid).Result;
            if (responseSlot.IsSuccessStatusCode)
            {
                string data1 = responseSlot.Content.ReadAsStringAsync().Result;
                Valueslist = JsonConvert.DeserializeObject<List<FastAttendance>>(data1);
            }
            ViewBag.Slot_Subjectnames = Valueslist;


            return View();
        }

        public IActionResult F_Get_Inc_By_Subclass(string InstanceId, string InstanceClassificationId)
        {
            var instanceid = Request.Cookies["INSTANCEID"];
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification_By_SubClassification?InstanceId=" + instanceid + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.InSubclass = value;
            return View();
        }

        [HttpGet]
        public IActionResult Get_FastAttendance_Table(string InstanceClassificationId, string[] InstanceSubClassificationId, string InstanceID, string StartDate, string SubjectSlotID)
        {

            List<FastAttendance> value = new List<FastAttendance>();

            var instanceid = Request.Cookies["INSTANCEID"];
            string EndDate = StartDate;
            string ColumnString = "NULL as column1,NULL as column2,NULL as column3,NULL as column4,NULL as column5,NULL as column6,NULL as column7";



            foreach (var InstanceSubClassid in InstanceSubClassificationId)
            {
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/F_Attendance_TableData?StartDate=" + StartDate + "&EndDate=" + EndDate + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationIds=" + InstanceSubClassid + "&SubjectSlotID=" + SubjectSlotID + "&ColumnString=" + ColumnString + "&InstanceId=" + instanceid).Result;
                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    var items = JsonConvert.DeserializeObject<List<FastAttendance>>(data);
                    value.AddRange(items);
                }
            }
            ViewBag.resultCount = value.Count();
            return View(value);
        }

        [HttpPost]
        public ActionResult FastAttendance(FastAttendance obj, string InstanceClassificationId, string StartDate, string SubjectSlotID, List<Dictionary<string, string>> formData,string CreatedBy)
        {

            var instanceid = Request.Cookies["INSTANCEID"];
            string items = " ";
            foreach (var data in formData)
            {
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
                    HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Fast_At_Post?InstanceID=" + instanceid + "&UserIds=" + textareaValue + "&InstanceClassificationId=" + InstanceClassificationId + "&StartDate=" + StartDate + "&InstanceSubClassificationId=" + instanceSubClassificationId + "&SubjectSlotID=" + SubjectSlotID+ "&CreatedBy="+ CreatedBy, content).Result;
                    var data2 = "";

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


        
       


        //Admin Login Post method Start
        [HttpGet]
        public IActionResult AttendancePosting()
        {
            var LoginUserId = Request.Cookies["LoginUserId"];
            var instanceid = Request.Cookies["INSTANCEID"];
            var RoleName = "TEACHER,CLASS TEACHER";

            ViewBag.LoginUserId = LoginUserId;

            //Department DD Start code 
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fast_Get_Classification?InstanceId=" + instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Names = value;
            //Department DD End code 

            //Teacher Names DD start Code

            List<Admin_Attendance_Posting> Tl_NamesValues = new List<Admin_Attendance_Posting>();
            HttpResponseMessage Tl_Response = client.GetAsync(client.BaseAddress+ "/Admin_PostSC_Faculty_DD?InstanceId=" + instanceid+ "&RoleName="+ RoleName).Result;
            if (Tl_Response.IsSuccessStatusCode)
            {
                string datatl = Tl_Response.Content.ReadAsStringAsync().Result;
                Tl_NamesValues = JsonConvert.DeserializeObject<List<Admin_Attendance_Posting>>(datatl);
            }
            ViewBag.TcNames = Tl_NamesValues;
            //Teacher Names DD End Code



            return View();
        }

        public ActionResult AttendancePosting_Tbl(Admin_Attendance_Posting obj)
        {
            return View();
        }


        [HttpPost]
        public IActionResult AttendancePosting(Admin_Attendance_Posting obj)
        {
            return View();
        }




        [HttpGet]
        public IActionResult PostPeriodAttendance()
        {
            var LoginUserId = Request.Cookies["LoginUserId"];
            var instanceid = Request.Cookies["INSTANCEID"];
            var RoleName = "TEACHER,CLASS TEACHER";


            List<Admin_Attendance_Posting> Tl_NamesValues = new List<Admin_Attendance_Posting>();
            HttpResponseMessage Tl_Response = client.GetAsync(client.BaseAddress + "/Admin_PostSC_Faculty_DD?InstanceId=" + instanceid + "&RoleName=" + RoleName).Result;
            if (Tl_Response.IsSuccessStatusCode)
            {
                string datatl = Tl_Response.Content.ReadAsStringAsync().Result;
                Tl_NamesValues = JsonConvert.DeserializeObject<List<Admin_Attendance_Posting>>(datatl);
            }
            ViewBag.TcNames = Tl_NamesValues;
            return View();
        }




    }
}
