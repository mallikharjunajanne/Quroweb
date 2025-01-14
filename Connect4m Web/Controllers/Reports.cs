﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Connect4m_Web.Models.Attendenceproperites;
using Connect4m_Web.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Connect4m_Web.Views;

namespace Connect4m_Web.Controllers
{
    [Authorize]

    public class Reports : Controller
    {
        //Uri baseAddress = new Uri("https://localhost:44331/api/AttendanceCtr");
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
        public Reports(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
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

        #region FeeDetails
        public IActionResult FeeDetails()
        {
            return View();
        }
        public IActionResult Gettermnamesdd()
        {
            List<TermNames> model = new List<TermNames>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetFeeTerms?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<TermNames>>(data);
            }
            return Json(model);
        }
        public IActionResult ClassificationWiseFeeDetails(ReportFeedetails obj)
        {
            string termIds = string.Join(",", obj.FeeTermId?.Count > 0 ? obj.FeeTermId : new List<string> { "" });

            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.Feetermids = termIds;

            List<ClassificationWiseFeedetails> model = CommonMethodobj.CommonListMethod<ReportFeedetails, ClassificationWiseFeedetails>(obj, "/FeedetailsclsWise", client);

            decimal AmountSet = model.Sum(item => item.AmountSet);
            decimal TotalAmountSet = model.Sum(item => item.totalAmountSet);
            decimal AmountPaid = model.Sum(item => item.AmountPaid);
            decimal Discount = model.Sum(item => item.discount);
            decimal Balance = model.Sum(item => item.Balance);

            var result = new
            {
                Mainlist = model,
                FeeAmount = TotalAmountSet,
                FeeCollected = AmountPaid,
                Discount = Discount,
                Due = Balance
            };
            return Json(result);
        }
        public IActionResult SubclassificaitionWiseFeeDetails(ReportFeedetails obj)
        {
            string termIds = string.Join(",", obj.FeeTermId);
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.Feetermids = termIds;

            List<SubclassificationWiseFeedetails> model = CommonMethodobj.CommonListMethod<ReportFeedetails, SubclassificationWiseFeedetails>(obj, "/FeedetailssubclsWise", client);
            return Json(model);
        }
        public IActionResult GetUserWiseFeeDetails(ReportFeedetails obj)
        {
            string termIds = string.Join(",", obj.FeeTermId);
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.Feetermids = termIds;
            List<FeedetailsGetuserwiseFeeDetails> model = CommonMethodobj.CommonListMethod<ReportFeedetails, FeedetailsGetuserwiseFeeDetails>(obj, "/GetUserWiseFeeDetails", client);
            return Json(model);
        }
        public IActionResult GetChallangenerateddetails(ReportFeedetails obj)
        {
            string termIds = string.Join(",", obj.FeeTermId);
            obj.InstanceId = InstanceId;
            obj.StudentUserid = obj.StudentUserid;
            obj.CreatedBy = UserId;
            obj.Feetermids = termIds;
            List<FeedetailsChallanGeneratedDetails> model = CommonMethodobj.CommonListMethod<ReportFeedetails, FeedetailsChallanGeneratedDetails>(obj, "/GetFeedetialsbyuseridchallangenerateddetails", client);
            return Json(model);
        }
        public IActionResult GetFeeDetialsByUserFeeId(ReportFeedetails obj)
        {
            string termIds = string.Join(",", obj.FeeTermId);
            obj.InstanceId = InstanceId;
            obj.StudentUserid = obj.StudentUserid;
            obj.CreatedBy = UserId;
            obj.Feetermids = termIds;
            obj.UserFeeId1 = obj.UserFeeId1;
            List<ChallanGeneratedDetailstbl1> model = CommonMethodobj.CommonListMethod<ReportFeedetails, ChallanGeneratedDetailstbl1>(obj, "/Getfeedetailsbyuserfeedetails", client);
            return Json(model);
        }

        #endregion

        #region Fee Recipt New    
        public IActionResult FeeReceiptNew()
        {
            return View();
        }
        public IActionResult InstanceClassification_DD()
        {
            Feechallanareport model = new Feechallanareport();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageClassification_dd?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<Feechallanareport>(data);
            }
            return Json(model);
        }
        public IActionResult FeeReceiptNew_tbldata(int SubClassificationId, string FirstName, string LastName)
        {
            List<Feechallanareport> model = new List<Feechallanareport>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Feechallanreporttbl?InstanceId=" + InstanceId + "&SubClassificationId=" + SubClassificationId + "&FirstName=" + FirstName + "&LastName=" + LastName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<Feechallanareport>>(data);
            }
            return Json(model);
        }
        public IActionResult Get_FeeReceiptdetails(int FUserid)
        {
            List<Feechallanareport> model = new List<Feechallanareport>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetFeeReceiptdetails?FUserid=" + FUserid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<Feechallanareport>>(data);
            }
            return View(model);
        }
        public IActionResult GetFeeReceiptdetailsByUserIdChallanId(int FUserId, int ChallanId)
        {
            List<FeeReceiptdetails> model1 = new List<FeeReceiptdetails>();
            List<Feetermdetails> model2 = new List<Feetermdetails>();

            HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/GetChellanaDetails_1?FUserid=" + FUserId + "&ChallanId=" + ChallanId).Result;
            if (response1.IsSuccessStatusCode)
            {
                string data = response1.Content.ReadAsStringAsync().Result;
                model1 = JsonConvert.DeserializeObject<List<FeeReceiptdetails>>(data);
            }
            decimal totalAmount = 0;
            foreach (var item in model1)
            {
                if (decimal.TryParse(item.amount, out decimal amountValue))
                {
                    totalAmount += amountValue;
                }
            }

            string totalAmountAsString = ConvertAmountToWords(totalAmount);





            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetChellanaDetails_2?ChallanId=" + ChallanId).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data = response2.Content.ReadAsStringAsync().Result;
                model2 = JsonConvert.DeserializeObject<List<Feetermdetails>>(data);
            }



            ViewBag.Model1 = model1;
            ViewBag.TotalAmountData = new { TotalAmount = totalAmount, TotalAmountAsString = totalAmountAsString };

            var viewModel = new Feechallanareport
            {
                feereceiptdetails = model1,
                TotalAmount = totalAmount,
                TotalAmountAsString = totalAmountAsString,
                feetermdetails = model2
            };

            return View(viewModel);
        }
        public static string ConvertAmountToWords(decimal amount)
        {
            if (amount == 0)
            {
                return "Zero Rupees Only";
            }

            string[] units = { "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" };
            string[] teens = { "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
            string[] tens = { "", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };
            string[] thousandsGroups = { "", "Thousand", "Lakh", "Crore" };

            int group = 0;
            string result = "";

            while (amount > 0)
            {
                int remainder = (int)(amount % 1000);
                amount /= 1000;

                if (remainder > 0)
                {
                    string words = "";

                    int hundreds = remainder / 100;
                    if (hundreds > 0)
                    {
                        words += units[hundreds] + " Hundred ";
                    }

                    int tensUnits = remainder % 100;
                    if (tensUnits >= 20)
                    {
                        words += tens[tensUnits / 10] + " " + units[tensUnits % 10] + " ";
                    }
                    else if (tensUnits >= 11 && tensUnits <= 19)
                    {
                        words += teens[tensUnits - 11] + " ";
                    }
                    else
                    {
                        words += units[tensUnits % 10] + " ";
                    }

                    if (!string.IsNullOrEmpty(words))
                    {
                        words += thousandsGroups[group];
                    }

                    result = words + result;
                }

                group++;
            }

            return result.Trim() + " Rupees Only";
        }
        public IActionResult DeleteUserChallana(int UserReceiptGenerationId)
        {
            string message = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Delete_Challana?InstanceId=" + InstanceId + "&UserReceiptGenerationId=" + UserReceiptGenerationId + "&DeletedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                message = data;
            }
            ViewBag.returnmessage = message;
            return View();
        }
        #endregion

        #region ADMISSION PROCESS REPORTS

        #region ADMISSIONS REPORT        
        public IActionResult QuroAdmissionSummaryReport()
        {
            return View();
        }      
        public IActionResult GetInstancenamesDropdown()
        {
            string[] parameter2 = new string[] { InstanceId.ToString() };
            List<SelectListItem> lis = new List<SelectListItem>();
            lis = CommonDropdownData("GetInstanceNamesDropdown", parameter2, "InstanceName", "InstanceId");
            return Json(lis);
        }
        public IActionResult GetAcademicYearDropdown()
        {
            string[] parameter2 = new string[] { InstanceId.ToString() };
            List<SelectListItem> lis = new List<SelectListItem>();
            lis = CommonDropdownData("GetAcadamiyearsDropdown", parameter2, "Years", "AcademicYearId");
            return Json(lis);
        }
        public IActionResult GetAllClass()
        {
            string[] parameter2 = new string[] { InstanceId.ToString() };
            List<SelectListItem> lis = new List<SelectListItem>();
            lis = CommonDropdownData("GetClassDropdown", parameter2, "ClassName", "ClassId");
            return Json(lis);
        }
        public IActionResult QuroAdmissionSummaryReporttbl(UserScreen.Admissionreport obj)
        {
            //stp_tblRegistrationUserDetails_GetAdmissionReport
            UserScreen.Admissionreport model = new UserScreen.Admissionreport();
            obj.InstanceId = InstanceId;

            List<UserScreen.Admissionreport> list = new List<UserScreen.Admissionreport>();
            list = CommonMethodobj.CommonListMethod<UserScreen.Admissionreport, UserScreen.Admissionreport>(obj, "/Admissionsummaryreport", client);
            return Json(list);
        }
        #endregion

        #region ADMISSION SUMMARY REPORT
        public IActionResult QuroAdmissionsReport()
        {
            return View();
        }
        public IActionResult Quroadmissionreportscounttbl(UserScreen.Admissionreport obj)
        {
            obj.InstanceId = InstanceId;
            List<UserScreen.Admissionsummaryreport> list = CommonMethodobj.CommonListMethod<UserScreen.Admissionreport, UserScreen.Admissionsummaryreport>(obj, "/GetRegistrationSummary", client);
            return Json(list);
        }
        public IActionResult Registrations_Admissionstbl(UserScreen.Admissionreport obj)
        {
            obj.InstanceId = InstanceId;
            List<UserScreen.Admissionsummaryreport> list = CommonMethodobj.CommonListMethod<UserScreen.Admissionreport, UserScreen.Admissionsummaryreport>(obj, "/Admissionsummaryreport", client);

            var Userstatusvalues = obj.Userstatusvalue;
            var filteredList = obj.Userstatusvalue == "1" ? list.Where(item => item.UserStatus == "Registered").ToList() : obj.Userstatusvalue == "2" ? list.Where(item => item.UserStatus == "Admission Confirmed").ToList() : list;

            var result = new
            {
                FilteredList = filteredList,
                UserStatusValue = Userstatusvalues
            };

            //return Json(result);
            return new JsonResult(result);
        }
        public IActionResult Adsreporttbl(UserScreen.Admissionreport obj)
        {
            obj.InstanceId = InstanceId;
            List<UserScreen.Admissionreport> list = new List<UserScreen.Admissionreport>();
            list = CommonMethodobj.CommonListMethod<UserScreen.Admissionreport, UserScreen.Admissionreport>(obj, "/Admissionsummaryreport", client);
            return Json(list);
        }
        #endregion

        #endregion

        #region MONTHLY ATTENDANCE REPORT 
        public IActionResult MonthWiseClassAttendanceReport()
        {
            return View();
        }
        public IActionResult MonthWisedepartmentdd()
        {
            List<ManageClassification> model = new List<ManageClassification>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/MonthwiseDepartmentdd?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<ManageClassification>>(data);
            }
            return Json(model);
        }
        public IActionResult MonthWisesubclassificationdd(string[] InstanceClassificationId)
        {
            string ClassificationIds = string.Join(",", InstanceClassificationId?.Where(x => !string.IsNullOrEmpty(x)) ?? new List<string>());

            List<ManageSubClassification> model = new List<ManageSubClassification>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/MonthwiseSubclassdd?InstanceId=" + InstanceId + "&ClassificationId=" + ClassificationIds+"&Createdby="+UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<ManageSubClassification>>(data);
            }
            return Json(model);
        }
        public IActionResult GetMonthWiseFullStatusofClassAttendanceReporttbldata()
        {
            return View();
        }
        public IActionResult MonthandClassattendancereport(MonthWiseclassattendancereport obj)
        {
            Classmonthattendancereport model = new Classmonthattendancereport();
            obj.InstanceId = InstanceId;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SearchStaffMonthlyReport", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<Classmonthattendancereport>(data);
            }
            return Json(model);
        }
        #endregion

        #region Bank Deposit Details Report
        public IActionResult BankDepositReport()
        {
            return View();
        }
        public IActionResult Depositreporttbl(UserScreen.SearchDeposit obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<UserScreen.Deposittbl> list = CommonMethodobj.CommonListMethod<UserScreen.SearchDeposit, UserScreen.Deposittbl>(obj, "/Bankdepositreporttbl", client);
            return Json(list);
        }

        #endregion

        #region ATTENDANCE REPORT BY WEEKLY AND MONTHLY
        public IActionResult AttendanceReportByMonthlyAndWeekly()
        {
            return View();
        }
        public IActionResult Classificationdd()
        {
            List<ManageClassification> model = new List<ManageClassification>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Classificationdd?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<ManageClassification>>(data);
            }
            return Json(model);
        }
        public IActionResult Subclassificationdd(int InstanceClassificationId)
        {
            List<ManageSubClassification> model = new List<ManageSubClassification>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Subclassificationdd?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<ManageSubClassification>>(data);
            }
            return Json(model);
        }
        #endregion

        #region STUDENT REGISTER StudentAttendanceRegister

        [HttpGet]
        public IActionResult StudentAttendanceRegister()
        {
            return View();
        }
        public IActionResult Reportdepartment()
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
        public IActionResult GetSubclassbydepartment(int InstanceClassificationId)
        {
            List<SelectListItem> Classlist = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_SubClassificationNames_ByclassificationId?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Classlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SubClassificationNames = Classlist;
            return Json(Classlist);
        }

        [HttpPost]
        //public IActionResult StudentAttendanceRegister(Attendanceregisterreport obj)
        public IActionResult StudentAttendanceRegister(int Month, int Year, int InstanceClassificationId, int InstanceSubClassificationId)
        {

            //string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/St_At_Reports?InstanceID=" + InstanceId + "&Month=" + Month + "&Year=" + Year + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId, content).Result;
            AttendanceReportData reportData = new AttendanceReportData();
            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                reportData = JsonConvert.DeserializeObject<AttendanceReportData>(data2);
            }
            return Json(reportData);
        }

        #endregion

        #region  CLASS WISE & STUDENT WISE ATTENDANCE REPORT
        public IActionResult SectionwiseAttendanceReport()
        {
            return View();
        }
        public IActionResult Sectionwisedepartment()
        {
            List<ManageClassification> model = new List<ManageClassification>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SectionwiseDepartmentdd?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<ManageClassification>>(data);
            }
            return Json(model);
        }
        public IActionResult Sectionwisesubclassificationdd(string[] InstanceClassificationId)
        {
            string ClassificationIds = string.Join(",", InstanceClassificationId?.Where(x => !string.IsNullOrEmpty(x)) ?? new List<string>());

            List<ManageSubClassification> model = new List<ManageSubClassification>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SectionwiseSubclassdd?InstanceId=" + InstanceId + "&ClassificationId=" + ClassificationIds).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<ManageSubClassification>>(data);
            }
            return Json(model);
        }
        public IActionResult SectionwiseAttendanceReporttbldata()
        {
            return View();
        }
        public IActionResult SearchsectionwiseAttendanceReporttbldata(ClasswisestudentattendanceReport obj)
        {
            obj.ClassificationIds = string.Join(",", obj.ClassificationId);
            obj.SubclassificationIds = string.Join(",", obj.SubClassificationId);

            // string termIds = string.Join(",", obj.FeeTermId?.Count > 0 ? obj.FeeTermId : new List<string> { "" });

            AttendancereportClasswisestudentwise model = new AttendancereportClasswisestudentwise();
            obj.InstanceId = InstanceId;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SearchSectionwiseAttendanceReport", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<AttendancereportClasswisestudentwise>(data);
            }
            return Json(model);
        }

        #endregion

        #region USERWISE FEE PAYMENT ///PaymentAutomationuserwise
        public IActionResult PaymentAutomationuserwise()
        {
            return View();
        }
        public IActionResult userwisepayment_tbldata(int SubClassificationId, string FirstName, string LastName, string StudentId, int Due)
        {
            List<Userwisepayment> model = new List<Userwisepayment>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Userwisepayenttbl?InstanceId=" + InstanceId + "&SubClassificationId=" + SubClassificationId + "&FirstName=" + FirstName + "&LastName=" + LastName + "&StudentId=" + StudentId + "&Due=" + Due).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<Userwisepayment>>(data);
            }
            return View(model);
            //return Json(model);
        }
        public IActionResult userwisepaymentdetailstbldata(int FUserid, string StudentUserName)
        {
            List<Userwisepayment> model = new List<Userwisepayment>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetFeeDetailsByUserID?UserId=" + FUserid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<Userwisepayment>>(data);
            }
            int count = model.Count();
            if (count != 0)
            {
                ViewBag.username = StudentUserName;
                ViewBag.model = model;
                return View(model);
            }
            else
            {
                return Json(count);
            }

        }
        public IActionResult Deletepaymentdatewise(int PaymentUserid, string paymentdate)
        {
            string value = "";
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/DeleteFeeDetailsByUserID?InstanceId=" + InstanceId + "&Userid=" + PaymentUserid + "&Paymentdate=" + paymentdate + "&LoginUserId=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = data;
            }
            return Json(value);
        }
        public IActionResult Classification_DD()
        {
            Userwisepayment model = new Userwisepayment();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageClassification_dd?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<Userwisepayment>(data);
            }
            return Json(model);
        }
        public IActionResult Paymenttype_DD()
        {
            Userwisepayment model = new Userwisepayment();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Paymenttypes").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<Userwisepayment>(data);
            }
            return Json(model);
        }
        #endregion


        public IActionResult ViewallChallandetailsTermwise()
        {
            return View();
        }
        public IActionResult ChallandetailsTermwise_tbldata(int SubClassificationId, string FirstName, string LastName, string StudentId, int Due)
        {
            List<Termwisechallandetails> model = new List<Termwisechallandetails>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Userwisepayenttbl?InstanceId=" + InstanceId + "&SubClassificationId=" + SubClassificationId + "&FirstName=" + FirstName + "&LastName=" + LastName + "&StudentId=" + StudentId + "&Due=" + Due).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<Termwisechallandetails>>(data);
            }
            return View(model);
        }
        public IActionResult Getstatement_Termwisedetails(int TfUserId)
        {
            List<Termwisechallandetails> model = new List<Termwisechallandetails>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ChallandetailsTermwise?UserId=" + TfUserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                model = JsonConvert.DeserializeObject<List<Termwisechallandetails>>(data);
            }
            int count = model.Count();
            if (count != 0)
            {
                ViewBag.model = model;
                return View(model);
            }
            else
            {
                return Json(count);
            }
        }
        public IActionResult ViewReceiptInvoiceTermwise(int FUserId, int ChallanId)
        {
            List<FeeReceiptdetails> model1 = new List<FeeReceiptdetails>();
            List<Feetermdetails> model2 = new List<Feetermdetails>();

            HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/GetChellanaDetails_1?FUserid=" + FUserId + "&ChallanId=" + ChallanId).Result;
            if (response1.IsSuccessStatusCode)
            {
                string data = response1.Content.ReadAsStringAsync().Result;
                model1 = JsonConvert.DeserializeObject<List<FeeReceiptdetails>>(data);
            }
            decimal totalAmount = 0;
            decimal DiscounttotalAmount = 0;
            decimal BefordiscounttotalAmount = 0;
            foreach (var item in model1)
            {
                if (decimal.TryParse(item.amount, out decimal amountValue))
                {
                    totalAmount += amountValue;
                }
                if (decimal.TryParse(item.DiscountAmt, out decimal DiscountAmtValue))
                {
                    DiscounttotalAmount += DiscountAmtValue;
                }
                if (decimal.TryParse(item.BeforeDiscount, out decimal BeforeDiscountValue))
                {
                    BefordiscounttotalAmount += BeforeDiscountValue;

                }
            }
            string totalAmountAsString = ConvertAmountToWords(totalAmount);





            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetChellanaDetails_2?ChallanId=" + ChallanId).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data = response2.Content.ReadAsStringAsync().Result;
                model2 = JsonConvert.DeserializeObject<List<Feetermdetails>>(data);
            }



            ViewBag.Model1 = model1;
            ViewBag.TotalAmountData = new { TotalAmount = totalAmount, TotalAmountAsString = totalAmountAsString };

            var viewModel = new Feechallanareport
            {
                feereceiptdetails = model1,
                TotalAmount = totalAmount,
                TotalDiscountAmount = DiscounttotalAmount,
                TotalBeforeDiscountAmount = BefordiscounttotalAmount,
                TotalAmountAsString = totalAmountAsString,
                feetermdetails = model2
            };

            return View(viewModel);
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
