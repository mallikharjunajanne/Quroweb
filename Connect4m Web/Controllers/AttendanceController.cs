
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Connect4m_Web.Models;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

namespace Connect4m_Web.Controllers
{

    public class AttendanceController : Controller  //ManagePastDaysLeave   3777 line [Authorize]
    {
         Uri baseaddress = new Uri("https://localhost:44379/api/ApplyStudentAttendance");
        // Uri baseaddress = new Uri("https://localhost:44379/api/ApplyStudentAttendance");
        //Uri baseaddress = new Uri("http://192.168.1.143:94/api/ApplyStudentAttendance");
        //HttpClient client;
       

        //public AttendanceController()
        //{
        //    client = new HttpClient();
        //    client.BaseAddress = baseaddress;
        //}


        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        private readonly IMemoryCache _memoryCache;
        private int loginCount = 0;

        public AttendanceController(HttpClientFactory httpClientFactory, IConfiguration configuration, IMemoryCache memoryCache)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/ApplyStudentAttendance");
            _memoryCache = memoryCache;//this for storing login counts
        }

        private int IncrementLoginCount(string username)
        {

            // Retrieve the current login count from the cache
            if (_memoryCache.TryGetValue(username, out loginCount))
            {
                // Increment the login count
                loginCount++;
            }
            else
            {
                // If the user doesn't have a login count, initialize it to 1
                loginCount = 1;
            }

            // Store the updated login count in the cache
            _memoryCache.Set(username, loginCount);

            return loginCount; // Return the updated login count
        }
        public async Task<string> GetPublicIpAddress()
        {
            using (var client = new HttpClient())
            {
                var response = await client.GetStringAsync("https://api.ipify.org?format=json");
                dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(response);
                string ipAddress = result.ip;
                return ipAddress;
            }
        }
        public async Task< IActionResult> LoginPage()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            ViewBag.Layout = "LoginPage";
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        //  [ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginPage(LoginModel val)
        {
            try
            {

         
            //installed packeges 
            //Microsoft.AspNetCore.Session
            //Microsoft.AspNetCore.Authentication.Cookies


            // var result = await _signInManager.PasswordSignInAsync(val.Username, val.Password, val.RememberMe, lockoutOnFailure: false);

            if (val.Password == null || val.Username == null)
            {

                //ViewBag.ErrorMessage = "Invalid User ID/Password.";
                //ViewBag.Layout = "LoginPage";
                //return View();
                return Json(0);
            }

            val.Password = HashUtility.HashData((val.Password).Trim());//this for convert code into Binary code

            //  return View();
            val.CHK = "False"; //i gave default  . work on this   it is true when pagesubmission . when session exipire


            val.SubDomineName = "DEVELOP.CONNECT4M.COM";//it is temperory using
                                                        //  val.SubDomineName = HttpContext.Request.Host.Host.ToUpper();

            //val.IPAddress = "183.82.116.209";
            val.IPAddress = await GetPublicIpAddress();//to get IP address


            // val.URL = "http://develop.connect4m.com";
            //currentUrl
            //val.URL = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + HttpContext.Request.QueryString;
            val.URL = HttpContext.Request.GetDisplayUrl();


            val.LoginAttempt = IncrementLoginCount(val.Username);
            val.LoginStatus = 1;

            List<LoginDetailsListModel> Value2 = new List<LoginDetailsListModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/LoginPage", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LoginDetailsListModel>>(data1);
                if (Value2.Count > 0)
                {
                    if (Value2[0].UserDetailsList.Count > 0 && Value2[0].UserDetailsList.Count > 0)
                    {
            //            var claims = new List<Claim>
            //{
            //    new Claim(ClaimTypes.Name, val.Username),
            //    new Claim(ClaimTypes.Role, "Admin")
            //};

            //            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            //            var authProperties = new AuthenticationProperties
            //            {
            //                IsPersistent = true, // Whether to create a persistent cookie
            //                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(1) // Cookie expiration time
            //            };

                     


                        _memoryCache.Set(val.Username, 0);//set a login count is 0 with Username


                        Response.Cookies.Append("Instanceid", Value2[0].UserDetailsList[0].InstanceID.ToString());
                        Response.Cookies.Append("LoginUserId", Value2[0].UserDetailsList[0].UserId.ToString());
                        Response.Cookies.Append("InstanceClassificationId", Value2[0].UserDetailsList[0].InstanceClassificationId.ToString());
                        Response.Cookies.Append("InstanceSubClassificationId", Value2[0].UserDetailsList[0].InstanceSubClassificationId.ToString());
                        Response.Cookies.Append("Roleid", Value2[0].UserDetailsList[0].RoleId.ToString());
                        Response.Cookies.Append("StudentUserid", Value2[0].UserDetailsList[0].StudentUserid.ToString());


                        Response.Cookies.Append("RoleName", Value2[0].UserDetailsList[0].RoleName.ToString());

                        Response.Cookies.Append("ThemeName", Value2[0].UserDetailsList[0].ThemeName.ToString());
                        Response.Cookies.Append("Quote", Value2[0].UserDetailsList[0].Quote.ToString());
                        Response.Cookies.Append("RoleName", Value2[0].UserDetailsList[0].RoleName.ToString());

                        int DelegationClasses = 1;// This for Arjun

                        Response.Cookies.Append("DelegationClasses", DelegationClasses.ToString());
                        Response.Cookies.Append("UserNameHeader_", Value2[0].UserDetailsList[0].FirstName.ToString() +""+ Value2[0].UserDetailsList[0].LastName.ToString());


                        var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, val.Username),
                    new Claim(ClaimTypes.Role, "Admin")
                };

                        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                        var authProperties = new AuthenticationProperties
                        {
                            // Set additional properties if needed
                        };

                 await    HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);

                        return Json("correct");
                    }
                    //else
                    //{
                    //    //ViewBag.Layout = "LoginPage";
                    //    //ViewBag.ErrorMessage = "Invalid User ID/Password.";
                    //    //return View();
                    //    return Json(0);
                    //}
                }
                //else
                //{
                //    ViewBag.Layout = "LoginPage";
                //    ViewBag.ErrorMessage = "Invalid User ID/Password.";
                //    return View();
                //}
            }
            //ViewBag.ErrorMessage = "Invalid User ID/Password.";
            //return View();
            return Json(0);
            }
            catch (Exception)
            {
                return Json(0);
            }
        }

        //public async Task<IActionResult> Logout()

        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> LogoutPage()
        {
            // await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            // Redirect to the logout success page or wherever you prefer
            //  await HttpContext.SignOutAsync();
            // await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);


            return RedirectToAction("LoginPage", "Attendance");
        }


        public IActionResult AccessDenied()
        {
            return View();
        }



        [Authorize]
        public IActionResult GetStudentNameDropdown(string InstanceId,string Value)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            //string Value1 = "38641~8990";
            string[] ids = Value.Split('~');
            string InstanceSubClassificationId = "";
            string InstanceClassificationId = "";
            if (ids.Length !=0)
            {
                 InstanceSubClassificationId = ids[0];
                 InstanceClassificationId = ids[1];
            }
           List<AttendanceModel> value1 = new List<AttendanceModel>();        
            HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/GetStudentNameDropdown2?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId).Result;
                if (response1.IsSuccessStatusCode)
                {
                    string data1 = response1.Content.ReadAsStringAsync().Result;
                    value1 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);


                //value1.RemoveRange(2, 3);
                //if (value1.Count != 0)
                //{
                //    int lenth = value1.Count;
                //    List<int> ar = new List<int>();

                //    for (int i = 0; i < lenth; i++)
                //    {
                //        int Userjoined1 = value1[i].Userjoined;
                //        if (Userjoined1 == 0)
                //        {
                //            ar.Add(i);
                //            string p = "9";
                //            value1.RemoveAt(i);
                //        }
                //    }
                //}



                //value1.RemoveRange(2, 3);
                //if (value1.Count != 0)
                //{
                //    int lenth = value1.Count;
                //    AttendanceModel ar = new AttendanceModel();
                //    ar.Studentid = 101;
                //    ar.StudentName = "hy";
                //    ViewBag.st = ar;
                //    for (int i = 0; i < lenth; i++)
                //    {
                //        int Userjoined1 = value1[i].Userjoined;
                //        if (Userjoined1 == 0)
                //        {
                //            int product = 0;

                //            int product1 = 0;
                //            ar.
                //            ar.Add(ApplyStudentLeave.pro);
                //            ar.Add(product1);
                //            string p = "9";
                //            value1.RemoveAt(i);
                //        }
                //    }
                //}
            }

            //AuthorList.RemoveRange(3, 2);

            // Remove value at a specific index
            //       int indexToRemove = 1; // Index of the value you want to remove
            int lenth = value1.Count;
            for (int i = 0; i < lenth;)
            {
                if (value1[i].Userjoined==0)
                {
                    value1.RemoveAt(i);
                    i = 0;
                    lenth = lenth - 1;
                }
                else
                {
                    i++;
                }
            }

            ViewBag.Studentname = value1;

            //value1.Add(new SelectListItem
            //{
            //    Value = " ",
            //    Text = "--Select--"

            //});

            return new JsonResult(new SelectList(ViewBag.Studentname, "Value", "Text"));
        }
        [Authorize]
        public IActionResult GetAttendancePercentage(int InstanceId, int StudentUserid, string ValueOFInstance)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            string[] ids = ValueOFInstance.Split('~');
            string InstanceSubClassificationId = "";
            string InstanceClassificationId = "";
            if (ids.Length != 0)
            {
                InstanceSubClassificationId = ids[0];
                InstanceClassificationId = ids[1];
            }

            List<AttendanceModel> value1 = new List<AttendanceModel>();
            HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/GetAttendancePercentage2?InstanceId=" + InstanceId + "&StudentUserid=" + StudentUserid+ "&InstanceClassificationId="+ InstanceClassificationId+ "&InstanceSubClassificationId="+ InstanceSubClassificationId).Result;
            if (response1.IsSuccessStatusCode)
            {
                string data1 = response1.Content.ReadAsStringAsync().Result;
                value1 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);

                if (value1.Count==2)
                {
                    ViewBag.AdmissionNum = value1[1].AdmissionNumber;
                }
                double TotWorkingDays = Convert.ToDouble( value1[0].Value);
                double TotPresentDays = Convert.ToDouble(value1[0].Text);
                if (TotWorkingDays != 0 || TotPresentDays != 0)
                {
                    double Attendancepercentage = TotPresentDays / TotWorkingDays;
                    Attendancepercentage = Attendancepercentage * 100;

                    string formatevalue = Attendancepercentage.ToString("0.00");

                    ViewBag.Attendancepercentage = formatevalue;
                }
                else
                {
                    ViewBag.Attendancepercentage = "0";
                }


                //if (TotWorkingDays != 0 || TotPresentDays != 0)
                //{
                //    double Attendancepercentage = TotPresentDays / TotWorkingDays;
                //    Attendancepercentage = Attendancepercentage * 100;



                //    ViewBag.Attendancepercentage = Convert.ToInt32(Attendancepercentage);
                //}
                //else
                //{
                //    ViewBag.Attendancepercentage =0;
                //}
            }
            value1[0].AttendancePercentage = ViewBag.Attendancepercentage;
           
            return new JsonResult(value1);
        }
        [Authorize]
        public IActionResult stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves(string Studentid,int AcadamicYearID, int Month)
        {
            //var Month = 6;

            if (AcadamicYearID==0)
            {
                AcadamicYearID = 1737;//2017-2018
               // 2956  2022-2023
            }
            if (Month==0)
            {
                Month = Convert.ToInt32(DateTime.Now.Month);

            }

            //var AcadamicYearID = 1737;

            //var Month = month;
            //var AcademicYearId = acadamicyear;

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<AttendanceModel> value122 = new List<AttendanceModel>();
            HttpResponseMessage response9 = client.GetAsync(client.BaseAddress + "/stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves2?StudentUserId=" + Studentid + "&InstanceId=" + InstanceId12 + "&Month=" + Month + "&AcademicYearId=" + AcadamicYearID).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                value122 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data9);
            }
            ViewBag.stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves = value122;


            return new JsonResult(ViewBag.stp_tblStudentLeaveDetails_TotalByUserId_ViewStudentLeaves);
        }
        [Authorize]
        public IActionResult StudentApplyLeave_SelectById_ATTENDANCEDETAILS(string Studentid)
        {

            var Month = 0;
            var AcademicYearId = 0;
            var Status = 30;
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<AttendanceModel> value122 = new List<AttendanceModel>();
            HttpResponseMessage response9 = client.GetAsync(client.BaseAddress + "/StudentApplyLeave_SelectById_ATTENDANCEDETAILS2?StudentUserId=" + Studentid + "&InstanceId=" + InstanceId12 + "&Month=" + Month + "&AcademicYearId=" + AcademicYearId + "&Status=" + Status).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                value122 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data9);
            }
            ViewBag.StudentApplyLeave_SelectById_ATTENDANCEDETAILS = value122;

           
            return new JsonResult(ViewBag.StudentApplyLeave_SelectById_ATTENDANCEDETAILS);
        }
        [Authorize]
        public IActionResult stp_tblStudentApplyLeave_SelectById_Admin(string Studentid)
        {

            var Month = 0;
            var AcademicYearId = 0;
            var Status = 30;
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<AttendanceModel> value122 = new List<AttendanceModel>();
            HttpResponseMessage response9 = client.GetAsync(client.BaseAddress + "/StudentApplyLeave_SelectById2?StudentUserId=" + Studentid + "&InstanceId=" + InstanceId12+ "&Month=" + Month + "&AcademicYearId=" + AcademicYearId+ "&Status="+ Status).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                value122 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data9);
            }
            ViewBag.StudentApplyLeave_SelectById = value122;

            return new JsonResult( ViewBag.StudentApplyLeave_SelectById);
        }

        [Authorize]

        public IActionResult stp_tblStudentApplyLeave_DetailsById_ToEDIT(string  Studentid)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
         

            List<AttendanceModel> value1226 = new List<AttendanceModel>();
            HttpResponseMessage response96 = client.GetAsync(client.BaseAddress + "/stp_tblStudentApplyLeave_DetailsById_ToEDIT2?Studentid=" + Studentid ).Result;
            if (response96.IsSuccessStatusCode)
            {
                string data96 = response96.Content.ReadAsStringAsync().Result;
                value1226 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data96);
            }
            ViewBag.stp_tblStudentApplyLeave_DetailsById_ToEDIT = value1226;

            return new JsonResult(ViewBag.stp_tblStudentApplyLeave_DetailsById_ToEDIT);
        }


        [Authorize]
        private bool CheckIfFileNameExists(string fileName,int InstanceID,int Studentid)
        {
            // Perform your server-side logic to check if the file name exists
            // You can access the file system or database to check for existing file names
            // Return true if the file name exists, false otherwise
            var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc/"+InstanceID+"/"+ Studentid+ "");

            //  var uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc/"+ InstanceID + "/ " + Studentid + "");
            // Example implementation:
            // var uploadsPath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads");

            //string filename1 = InstanceID + "/" +Studentid + "/" + fileName;

            var filePath = Path.Combine(uploadsPath, fileName);
            return System.IO.File.Exists(filePath);
        }
        [Authorize]
        public IActionResult ApplyStudentLeave(bool Issuccess=false)
        {


            if (Issuccess==true)
            {
                //var message =JsonConvert.DeserializeObject( HttpContext.Session.GetString("Returnmessage"));//step-4
                //ViewBag.retuenmessage = message;
            }


            ViewBag.StudentId_ByParent = Request.Cookies["StudentUserid"];
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);



            DateTime date = DateTime.Now;

            ////int LoginUserId = 113395;// 217606;
            ////int InstanceId12 = 604;// 545;

            ////int LoginUserId = 217606;  //School Admin
            ////int InstanceClassificationId = 806;
            ////int InstanceSubClassificationId = 1171;
            ////int InstanceId12 = 545;

            //int InstanceId12 = 545;
            //int LoginUserId = 32891; //Admin
            //int InstanceClassificationId = 806;
            //int InstanceSubClassificationId = 1171;
            //int Roleid = 773;
            //Response.Cookies.Append("Instanceid", InstanceId12.ToString());
            //Response.Cookies.Append("LoginUserId", LoginUserId.ToString());


            //Response.Cookies.Append("Roleid", Roleid.ToString());
            //Response.Cookies.Append("InstanceClassificationId", InstanceClassificationId.ToString());
            //Response.Cookies.Append("InstanceSubClassificationId", InstanceSubClassificationId.ToString());

            
            ViewBag.roleid= Request.Cookies["Roleid"];
            //=========This is used for Get appleid details of student

            //List<AttendanceModel> value9 = new List<AttendanceModel>();
            //HttpResponseMessage response9 = client.GetAsync(client.BaseAddress + "/StudentApplyLeave_SelectById2?UserId=" + LoginUserId + "&InstanceId=" + InstanceId12).Result;
            //if (response9.IsSuccessStatusCode)
            //{
            //    string data9 = response9.Content.ReadAsStringAsync().Result;
            //    value9 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data9);
            //}
            //ViewBag.StudentApplyLeave_SelectById = value9;

            //ViewBag.StudentApplyLeave_SelectByIdCOUNT = value9.Count;


            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetClassNameDropdown2?UserId="+ LoginUserId + "&InstanceId="+ InstanceId12).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.Classnames = value;
          



            ViewBag.instanceid = InstanceId12;

            //int InstanceId = 545;
            List<SelectListItem> value2 = new List<SelectListItem>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetLeavetypesDropdown2?InstanceId="+ InstanceId12).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                value2 = JsonConvert.DeserializeObject<List<SelectListItem>>(data2);
            }
            if (Convert.ToInt32(Request.Cookies["Roleid"]) == 776) {
                int lenth19 = value2.Count;

                for (int j = 0; j < lenth19;)
                {
                    if (value2[j].Value == "10" || value2[j].Value == "11")
                    {
                        value2.RemoveAt(j);                      
                        j = 0;
                        lenth19 = lenth19 - 1;
                    }
                    else
                    {
                        j++;
                    }
                }
            }


            ViewBag.LeaveType = value2;



            List<SelectListItem> value22 = new List<SelectListItem>();
            HttpResponseMessage response22 = client.GetAsync(client.BaseAddress + "/AcademicYearID_OF_Student2?InstanceId=" + InstanceId12).Result;
            if (response22.IsSuccessStatusCode)
            {
                string data22 = response22.Content.ReadAsStringAsync().Result;
                value22 = JsonConvert.DeserializeObject<List<SelectListItem>>(data22);

               // value22.Sort((x, y) => AttendanceModel.Compare(value, tex));

                //var sortedData = data.OrderByDescending(d => d).ToList();
                var sortedData = value22.OrderByDescending(d => d.Text).ToList();
                ViewBag.AcademicYearID_OF_Student = sortedData;
            }
           

            ViewBag.Tostop = 1;


            return View();
        }

        [Authorize]
        [HttpPost]
       
        public IActionResult ApplyStudentLeave(AttendanceModel obj/*, IFormFile attachdocument*/, string fileName, string submitButton,int StudentLeaveDetailsID_TO_Delete)
        {
             string successMessage = "";
            if (obj.file != null && obj.file.Length > 0)
            {

                var fileName1 = Path.GetFileName(obj.file.FileName);

                if (CheckIfFileNameExists(fileName1, obj.InstanceID, obj.Studentid))
                {
                    successMessage = "1";
                    return Json(new { success = true, message = successMessage, buttonName = submitButton });
                    // bool isFileNameExists = true;
                    // return Json(isFileNameExists);
                    //return new JsonResult(new { success = true, message = 1 });
                    //return BadRequest("Already a file with the same name is attached to another Leave. Please upload a new file.");
                }


            }

            int LoginUserId =Convert.ToInt32( Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
         //   obj.InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);

           // obj.InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);

            int InstanceSubClassificationId = 0;
            int InstanceClassificationId = 0;
            if (obj.ClassidString!=null)
            {
                string[] ids = obj.ClassidString.Split('~');           
                if (ids.Length != 0)
                {
                    InstanceSubClassificationId =Convert.ToInt32(ids[0]);
                    InstanceClassificationId =Convert.ToInt32(ids[1]);                  
                }
            }
            else
            {
                InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
                InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
            }


            obj.InstanceClassificationId = Convert.ToInt32(InstanceClassificationId);
            obj.InstanceSubClassificationId = Convert.ToInt32(InstanceSubClassificationId);
            //int LoginUserId = 217606;
            //int InstanceId12 =  545;
            obj.SatHolidy = 0;
            obj.SunHolidy = 1;
            obj.UserId = LoginUserId;
            obj.InstanceID = InstanceId12;
            obj.submitButton = submitButton;

            if (submitButton=="Delete")
            {

                obj.StudentLeaveDetailsID = StudentLeaveDetailsID_TO_Delete;
            }
            //if (submitButton == "Delete")
            //{

            //    obj.StudentLeaveDetailsID = StudentLeaveDetailsID_TO_Delete;
            //}

            if (obj.file!=null)
            {

                obj.attachdocument = obj.file.FileName;
            }

            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ApplyStudentLeave2", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;

               // string buttonName = submitButton;

              //  TempData["Showdefaultpage"] = null;

                 successMessage = data1;
                if (data1== "Student Leave Saved Successfully" || data1 == "Student Leave Updated Successfully")
                {

                
                if (obj.file != null && obj.file.Length > 0)
                {

                       
                        //bool fileExists = System.IO.File.Exists(filePath);

                        string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc");

                        //string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc");

                        //string path = Path.Combine("/imagefiles");
                        //string path = Path.Combine( "/imagefiles");

                        //create folder if not exist
                        if (!Directory.Exists(path))
                        Directory.CreateDirectory(path);


                        string path1 = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc/" + obj.InstanceID+"");
                        if (!Directory.Exists(path1))
                            Directory.CreateDirectory(path1);


                        string path12 = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc/" + obj.InstanceID + "/" + obj.Studentid + "");
                        if (!Directory.Exists(path12))
                            Directory.CreateDirectory(path12);

                        //bool fileExists = System.IO.File.Exists(path12);

                        ////get file extension
                        //FileInfo fileInfo = new FileInfo(file.FileName);
                        //string fileName = file.FileName + fileInfo.Extension;
                        string filename = obj.InstanceID + "/" + obj.Studentid + "/" + obj.file.FileName;
                    string fileNameWithPath = Path.Combine(path,filename);

                    using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                    //using (var stream = new FileStream("wwwroot"+fileNameWithPath, FileMode.Create))
                    {
                        obj.file.CopyTo(stream);
                    }

                        string fileNameWithPath1 = "/LeavesDoc/" + obj.file.FileName;
                        //string fileNameWithPath1 = "/StudentLeavesimagefiles/" + obj.file.FileName;

                        // Redirect to a view that displays the uploaded file
                        //return RedirectToAction("UploadFile", new { fileNameWithPath1 });
                    }

                }



                return Json(new { success = true, message = successMessage,buttonName= submitButton });

                //string message = data1;
                //HttpContext.Session.SetString("Returnmessage",JsonConvert.SerializeObject( message));//step-3
            }

            return Json(new { success = false });
        }

        //====================================Apply Staff Leave==================================================

        [Authorize]
        public IActionResult STP_GetSubmittedLeaveRequestsByUserid_ToEDIT(int Batchid,int Userid)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            List<AttendanceModel> value1226 = new List<AttendanceModel>();
            HttpResponseMessage response96 = client.GetAsync(client.BaseAddress + "/STP_GetSubmittedLeaveRequestsByUserid_ToEDIT2?Batchid=" + Batchid + "&InstanceId=" + InstanceId12+ "&UserId=" + Userid).Result;
            if (response96.IsSuccessStatusCode)
            {
                string data96 = response96.Content.ReadAsStringAsync().Result;
                value1226 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data96);
            }
            ViewBag.stp_tblStudentApplyLeave_DetailsById_ToEDIT = value1226;

            return new JsonResult(ViewBag.stp_tblStudentApplyLeave_DetailsById_ToEDIT);
        }

        [Authorize]
        public IActionResult GetLeaveDaysAvailable(int InstanceId, int leavetype,int Userid)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
         //   int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<AttendanceModel> value9 = new List<AttendanceModel>();
            HttpResponseMessage response9 = client.GetAsync(client.BaseAddress + "/GetMyLeaveDetails2?UserId=" + Userid + "&InstanceId=" + InstanceId12).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                value9 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data9);
            }
            string successMessage = "";
            int lenth = value9.Count;
            if (value9.Count != 0)
            {               
                for (int i = 0; i < lenth; i++)
                {
                    if (value9[i].Leavetypeid== leavetype)
                    {
                         successMessage = Convert.ToString(value9[i].AvailableLeaves);               
                        break;
                    }
                }
            }
            double num;
            if (successMessage != "")
            {
                 num = double.Parse(successMessage);
            }
            else
                 num = 0;


            //return new JsonResult(num.ToString("F1"));

            string formattedString = (num % 1 == 0) ? num.ToString("F0") : num.ToString("F1");
            return new JsonResult(formattedString);
        }


        [Authorize]
        public IActionResult GetMysavedLeaves_CallingFunction(int Userid, int leavetype)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);


            List<AttendanceModel> value122 = new List<AttendanceModel>();
            HttpResponseMessage response122 = client.GetAsync(client.BaseAddress + "/GetMySavedLeaves2?UserId=" + Userid + "&InstanceId=" + InstanceId12).Result;
            if (response122.IsSuccessStatusCode)
            {
                string data122 = response122.Content.ReadAsStringAsync().Result;
                value122 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data122);
            }
            ViewBag.GetMySavedLeaves = value122;
            //string successMessage = "";


            //successMessage = value122;



            return new JsonResult(ViewBag.GetMySavedLeaves);
        }

        [Authorize]
        public IActionResult GetMyAppliedLeaves_ViewDetails_CAllingFUC(int Batchid)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);


            List<AttendanceModel> value122 = new List<AttendanceModel>();
            HttpResponseMessage response122 = client.GetAsync(client.BaseAddress + "/GetMyAppliedLeaves_ViewDetails_CAllingFUC2?Batchid=" + Batchid + "&InstanceId=" + InstanceId12).Result;
            if (response122.IsSuccessStatusCode)
            {
                string data122 = response122.Content.ReadAsStringAsync().Result;
                value122 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data122);
            }
            ViewBag.GetMyAppliedLeaves_ViewDetails_CAllingFUC2 = value122;
          


            return new JsonResult(ViewBag.GetMyAppliedLeaves_ViewDetails_CAllingFUC2);
        }


        [Authorize]
        public IActionResult GetMyAppliedLeaves_PrintDetails_CAllingFunction(int Batchid, int Userid)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);


            List<AttendanceModel> value122 = new List<AttendanceModel>();
            HttpResponseMessage response122 = client.GetAsync(client.BaseAddress + "/GetMyAppliedLeaves_PrintDetails_CAllingFunction2?Batchid=" + Batchid + "&InstanceId=" + InstanceId12+ "&LoginUserId="+ Userid).Result;
            if (response122.IsSuccessStatusCode)
            {
                string data122 = response122.Content.ReadAsStringAsync().Result;
                value122 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data122);
            }
            ViewBag.GetMyAppliedLeaves_PrintDetails_CAllingFunction2 = value122;



            return new JsonResult(ViewBag.GetMyAppliedLeaves_PrintDetails_CAllingFunction2);
        }

        [Authorize]

        public IActionResult GetMyLeaveDetails_CallingMethod(int Userid)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<AttendanceModel> LeaveType1 = new List<AttendanceModel>();
            HttpResponseMessage response91 = client.GetAsync(client.BaseAddress + "/GetMyLeaveDetails2?UserId=" + Userid + "&InstanceId=" + InstanceId12).Result;
            if (response91.IsSuccessStatusCode)
            {
                string data91 = response91.Content.ReadAsStringAsync().Result;
                LeaveType1 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data91);
            }
            int lenth = LeaveType1.Count;
            string  AvailableLeaves = "";
            if (LeaveType1.Count != 0)
            {

                for (int i = 0; i < lenth;)
                {
                    if (LeaveType1[i].TotalLeaves == 0 && LeaveType1[i].DaysUsed == 0 && LeaveType1[i].ApprovedNotUsedLeaves == 0 && LeaveType1[i].LeavesAwaitingApprovalLeaves == 0 && LeaveType1[i].AvailableLeaves == 0)
                    {
                        LeaveType1.RemoveAt(i);
                        i = 0;
                        lenth = lenth - 1;
                    }
                    else
                    {
                         AvailableLeaves = LeaveType1[i].AvailableLeaves.ToString("F1");
                        LeaveType1[i].AvailableLeaves = double.Parse(AvailableLeaves);
                        i++;
                    }
                }
            }
            ViewBag.GetMyLeaveDetails = LeaveType1;
            return new JsonResult(ViewBag.GetMyLeaveDetails);
        }

        [Authorize]
        public IActionResult GetMyAppliedLeaves_CallingMethod(int Userid)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
          //  int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);


            List<AttendanceModel> value12 = new List<AttendanceModel>();
            HttpResponseMessage response12 = client.GetAsync(client.BaseAddress + "/GetMyAppliedLeaves2?UserId=" + Userid + "&InstanceId=" + InstanceId12).Result;
            if (response12.IsSuccessStatusCode)
            {
                string data12 = response12.Content.ReadAsStringAsync().Result;
                value12 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data12);
            }
      
            ViewBag.GetMyAppliedLeaves = value12;


            return new JsonResult(ViewBag.GetMyAppliedLeaves);
        }


        [Authorize]
        public IActionResult GetShort_Description_for_Leave_Reason_CallingMethod()// string InstanceClassificationId, string InstanceSubClassificationId)
          {
   
            string CodeName = "LEAVEREASON";

            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetShort_Description_for_Leave_Reason2?CodeName=" + CodeName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            int lenth19 = value.Count;
            if (value.Count != 0)
            {

                for (int j = 0; j < lenth19;)
                {
                    if (value[j].Value == "16" || value[j].Value == "17" || value[j].Value == "18" || value[j].Value == "19")
                    {
                        value.RemoveAt(j);
                        j = 0;
                        lenth19 = lenth19 - 1;

                    }
                    else
                    {
                        j++;
                    }
                }
            }
            ViewBag.GetShort_Description_for_Leave_Reason2 = value;



    return new JsonResult(ViewBag.GetShort_Description_for_Leave_Reason2);
}

        [Authorize]
        public IActionResult GetLeaveTypeDropdown_CallingMethod(int Userid )// string InstanceClassificationId, string InstanceSubClassificationId)
        {
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<AttendanceModel> LeaveType1 = new List<AttendanceModel>();
            HttpResponseMessage response91 = client.GetAsync(client.BaseAddress + "/GetMyLeaveDetails2?UserId=" + Userid + "&InstanceId=" + InstanceId12).Result;
            if (response91.IsSuccessStatusCode)
            {
                string data91 = response91.Content.ReadAsStringAsync().Result;
                LeaveType1 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data91);
            }
            int lenth1 = LeaveType1.Count;
            if (LeaveType1.Count != 0)
            {

                for (int j = 0; j < lenth1;)
                {
                    if (LeaveType1[j].TotalLeaves == 0 && LeaveType1[j].DaysUsed == 0 && LeaveType1[j].ApprovedNotUsedLeaves == 0 && LeaveType1[j].LeavesAwaitingApprovalLeaves == 0 && LeaveType1[j].AvailableLeaves == 0)
                    {
                        if (LeaveType1[j].Leavetypeid == 122)
                        {
                            j++;
                            continue;
                        }
                        else
                        {
                            LeaveType1.RemoveAt(j);
                            j = 0;
                            lenth1 = lenth1 - 1;
                        }
                    }
                    else
                    {
                        j++;
                    }
                }
            }

            int lenth5 = LeaveType1.Count;
            var items = new List<SelectListItem>();
            for (int i = 0; i < lenth5; i++)
            {
                items.Add(new SelectListItem { Value = LeaveType1[i].Leavetypeid.ToString(), Text = LeaveType1[i].Leavetype1.ToString() });
            }
            ViewBag.LeaveType1 = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.LeaveType1);
        }

        [Authorize]
        public IActionResult Delete_Cancel_Staff_Saved_Leaves(int LeaveApplicationId1,string submitButton,int Batchid,int Userid,string Comments)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
            AttendanceModel obj = new AttendanceModel();
            obj.LeaveApplicationId = LeaveApplicationId1;
            obj.submitButton = submitButton;
            obj.Batchid = Batchid;
            obj.InstanceID = InstanceId12;
            obj.UserId = Userid;
            obj.Comments = Comments;
            obj.CreatedBy = LoginUserId;
            obj.InstanceClassificationId = InstanceClassificationId;

            if (submitButton == "Cancel_LeaveCancellation")
            {
                obj.ScreenName = "LeaveCancellation.cshtml";
            }
            else
            {
                obj.ScreenName = "ApplyStaffLeave.cshtml";
            }
         
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response1000 = client.PostAsync(client.BaseAddress + "/Delete_Cancel_Staff_Saved_Leaves2", content).Result;
            if (response1000.IsSuccessStatusCode)
            {
                string data1 = response1000.Content.ReadAsStringAsync().Result;
                //string message1 = data1;
                //var submitButton = ;
                return new JsonResult(new { success = true, message = data1, ButtonName = submitButton });
            }
            return new JsonResult(new { success = false, message = "Something Error" });
        }
        [Authorize]

        public IActionResult _ViewUserCompOffLeavesLapsedDetails(AttendanceModel val,int InstanceId,int UserID,string AcademicYearID,int Lapsed )
        {
            //int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            // val.UserId = LoginUserId;

            val.InstanceID = InstanceId;
            val.AcadamicYearId = AcademicYearID;
            val.UserId = UserID;
            val.LapsedId = Lapsed;
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/_ViewUserCompOffLeavesLapsedDetails", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }
            return PartialView("_ViewUserCompOffLeavesLapsedDetails_ApplyStaffLeave",Value2);
        }
        [Authorize]
        public IActionResult ApplyStaffLeave(int Userid,string ScreenName,bool Issuccess = false)
        {
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            if (Userid != 0)
            {
                ViewBag.Userid = Userid;
            }
            else
            {
                ViewBag.Userid = LoginUserId;
            }
           
            ViewBag.Instanceid = InstanceId12;
            ViewBag.ScreenName = ScreenName;
            if (Issuccess == true)
            {
                //List<AttendanceModel> cart = TempData["MyList"] as List<AttendanceModel>;
                //value.Add(lea)
                
                //ViewBag.AddCart= JsonConvert.SerializeObject( cart);
                //ViewBag.AddCart = HttpContext.Session.GetString("SessionFacilitycheckboxmsg");

                ViewBag.Returnmsg = 1;
            }



            ////---------jquery code
            //List<SelectListItem> value2 = new List<SelectListItem>();
            //HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetLeavetypeDropdown21?InstanceId=" + InstanceId12).Result;
            //if (response2.IsSuccessStatusCode)
            //{
            //    string data2 = response2.Content.ReadAsStringAsync().Result;
            //    value2 = JsonConvert.DeserializeObject<List<SelectListItem>>(data2);
            //}
           

            //ViewBag.LeaveType1 = value2;




            //string CodeName = "LEAVEREASON";

            //List<SelectListItem> value = new List<SelectListItem>();
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetShort_Description_for_Leave_Reason2?CodeName=" + CodeName).Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    string data = response.Content.ReadAsStringAsync().Result;
            //    value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            //}
            //int lenth19 = value.Count;
            //if (value.Count != 0)
            //{

            //    for (int j = 0; j < lenth19;)
            //    {
            //        if (value[j].Value == "16" || value[j].Value == "17" || value[j].Value == "18" || value[j].Value == "19")
            //        {
            //            value.RemoveAt(j);
            //           j = 0;
            //               // j =j-1;
            //            lenth19 = lenth19 - 1;                       
            //        }
            //        else
            //        {
            //            j++;
            //        }
            //    }
            //}


            //ViewBag.GetShort_Description_for_Leave_Reason2 = value;





            ////---------jquery code


            //int LoginUserId = 113395;// 217606;
            //int InstanceId12 = 604;// 545;

            //int LoginUserId = 217606;
            //int InstanceId12 = 545;


            //Recent   14-06-2023
            //List<AttendanceModel> value9 = new List<AttendanceModel>();
            //HttpResponseMessage response9 = client.GetAsync(client.BaseAddress + "/GetMyLeaveDetails2?UserId=" + LoginUserId + "&InstanceId=" + InstanceId12).Result;
            //if (response9.IsSuccessStatusCode)
            //{
            //    string data9 = response9.Content.ReadAsStringAsync().Result;
            //    value9 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data9);
            //}

            //List<AttendanceModel> LeaveType1 = new List<AttendanceModel>();
            //LeaveType1 = value9;


            //int lenth = value9.Count;
            //if (value9.Count!=0)
            //{

            //for (int i = 0; i < lenth;)
            //{
            //    if (value9[i].TotalLeaves == 0 && value9[i].DaysUsed == 0 && value9[i].ApprovedNotUsedLeaves == 0 && value9[i].LeavesAwaitingApprovalLeaves == 0 && value9[i].AvailableLeaves == 0 )
            //    {
            //        value9.RemoveAt(i);
            //        i = 0;
            //        lenth = lenth - 1;
            //    }
            //    else
            //    {
            //        i++;
            //    }
            //}
            //}
            //ViewBag.GetMyLeaveDetails = value9;


            ///------------start------This is for Get My Leave Details

            //List<AttendanceModel> LeaveType1 = new List<AttendanceModel>();
            //HttpResponseMessage response91 = client.GetAsync(client.BaseAddress + "/GetMyLeaveDetails2?UserId=" + LoginUserId + "&InstanceId=" + InstanceId12).Result;
            //if (response91.IsSuccessStatusCode)
            //{
            //    string data91 = response91.Content.ReadAsStringAsync().Result;
            //    LeaveType1 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data91);
            //}




            //string AvailableLeaves = "";
            //int lenth = LeaveType1.Count;
            //if (LeaveType1.Count != 0)
            //{

            //    for (int i = 0; i < lenth;)
            //    {
            //        if (LeaveType1[i].TotalLeaves == 0 && LeaveType1[i].DaysUsed == 0 && LeaveType1[i].ApprovedNotUsedLeaves == 0 && LeaveType1[i].LeavesAwaitingApprovalLeaves == 0 && LeaveType1[i].AvailableLeaves == 0)
            //        {
            //            LeaveType1.RemoveAt(i);
            //            i = 0;
            //            //i = i - 1;
            //            lenth = lenth - 1;
            //        }
            //        else
            //        {
            //            AvailableLeaves = LeaveType1[i].AvailableLeaves.ToString("F1");
            //            LeaveType1[i].AvailableLeaves = double.Parse(AvailableLeaves);
            //            i++;
            //        }
            //    }
            //}
            //ViewBag.GetMyLeaveDetails = LeaveType1;



            ///------------end------This is for Get My Leave Details


            //now this is not using

            //List<AttendanceModel> value1 = new List<AttendanceModel>();
            //HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/GetMySavedLeaves2?UserId=" + LoginUserId + "&InstanceId=" + InstanceId12).Result;
            //if (response1.IsSuccessStatusCode)
            //{
            //    string data1 = response1.Content.ReadAsStringAsync().Result;
            //    value1 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            //}
            //ViewBag.GetMySavedLeaves = value1;



            //List<AttendanceModel> value12 = new List<AttendanceModel>();
            //HttpResponseMessage response12 = client.GetAsync(client.BaseAddress + "/GetMyAppliedLeaves2?UserId=" + LoginUserId + "&InstanceId=" + InstanceId12).Result;
            //if (response12.IsSuccessStatusCode)
            //{
            //    string data12 = response12.Content.ReadAsStringAsync().Result;
            //    value12 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data12);
            //}
            //int lenth3 = value12.Count;


            //ViewBag.GetMyAppliedLeaves = value12;


            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult ApplyStaffLeave(List<AttendanceModel> InputValue, string submitButton, int Userid,string  tableData,string ScreenName)

        //public IActionResult ApplyStaffLeave(List<AttendanceModel> InputValue,string submitButton, int LeaveApplicationId1)

        //public IActionResult ApplyStaffLeave(List<AttendanceModel> InputValue, AttendanceModel obj1, IFormFile file, string submitButton, int LeaveApplicationId1)

        //public IActionResult ApplyStaffLeave( AttendanceModel obj, IFormFile file, string submitButton,int LeaveApplicationId1)


        //public IActionResult ApplyStaffLeave(IFormFile file, [FromBody] List<AttendanceModel> formDataList)
        {
            var length = InputValue.Count;
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
            string successMessage = "";
            if (submitButton == "Add Leaves To Cart" || submitButton == "Update to Cart" || submitButton == "Update Leave")
            {
                if (InputValue[0].file != null && InputValue[0].file.Length > 0)
                {
                    var fileName1 = Path.GetFileName(InputValue[0].file.FileName);
                    if (CheckIfFileNameExists(fileName1, InstanceId12, Userid))
                    {
                        successMessage = "2";
                        return Json(new { success = false, message = successMessage, buttonName = submitButton });
                    }
                }
            }
            List<FormDataModel> tableDataList;

            // Check if tableData is null before deserialization
            if (string.IsNullOrEmpty(tableData))
            {
                // Handle the null tableData scenario here
                // For example, you can create an empty list:
                tableDataList = new List<FormDataModel>();
            }

         else
            {
                // Deserialize the table data
               /* List<FormDataModel>*/ tableDataList = JsonConvert.DeserializeObject<List<FormDataModel>>(tableData);

                // Convert datetime values to DateTime objects
                foreach (var item in tableDataList)
                {
                    item.FromgridDate = DateTime.Parse(item.FromgridDate_String);
                    item.TogridDate = DateTime.Parse(item.TogridDate_Sting);
                }
            }

            var requestData = new
            {
                AttendanceModel_Data = InputValue,
                tableDataList_Data = tableDataList
            };
         
            

                for (int i = 0; i < length; i++)
                {
                    InputValue[i].InstanceID = InstanceId12;
                InputValue[i].Text = ScreenName;
                InputValue[i].UserId = Userid;
                    InputValue[i].CreatedBy = LoginUserId;
                    InputValue[i].InstanceClassificationId = InstanceClassificationId;
                    if (InputValue[i].file != null)
                    {
                        InputValue[i].attachdocument = InputValue[i].file.FileName;
                    }

                    InputValue[i].AllowPastDaysLeaveType = 0;
                    InputValue[i].AllowPastDaysFlagUser = 0;
                    //this for mailsending
                    InputValue[i].NextLevelUserID = 0;

                    InputValue[i].submitButton = submitButton;

                //i changed here  --1
                //if (InputValue[i].RequestStatus == null && InputValue[i].RequestStatus == "")
                if (InputValue[i].RequestStatus == null || InputValue[i].RequestStatus == "")
                {
                    if (submitButton == "Submit Request")
                    {
                        InputValue[i].RequestStatus = "Submitted";
                    }               
                    else
                    {
                        InputValue[i].RequestStatus = "Saved";
                    }
                }
                }
            
            HttpResponseMessage response1000;
          
            if (submitButton == "Save as Draft" || submitButton == "Submit Request" || submitButton=="Delete")
            {
                //"Save as Draft"           
                string data = JsonConvert.SerializeObject(InputValue);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                response1000 = client.PostAsync(client.BaseAddress + "/ApplyStaffLeave2", content).Result;
                if (response1000.IsSuccessStatusCode)
                {
                    string data1 = response1000.Content.ReadAsStringAsync().Result;
                    //string message12 = data1;
                    if ((data1 == "Staff Leave Saved Successfully" || data1 == "Staff Leave Updated Successfully") /*&& (obj.file != null && obj.file.Length > 0)*/)
                    {
                        for (int i = 0; i < length; i++)
                        {
                            if (InputValue[i].file != null && InputValue[i].file.Length > 0)
                            {

                                //string filePath = ""; // Provide the path to the file you want to check

                                //bool fileExists = System.IO.File.Exists(filePath);

                                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc");

                                //string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc");

                                //string path = Path.Combine("/imagefiles");
                                //string path = Path.Combine( "/imagefiles");

                                //create folder if not exist
                                if (!Directory.Exists(path))
                                    Directory.CreateDirectory(path);


                                string path1 = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc/" + InputValue[i].InstanceID + "");
                                if (!Directory.Exists(path1))
                                    Directory.CreateDirectory(path1);


                                string path12 = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/LeavesDoc/" + InputValue[i].InstanceID + "/" + InputValue[i].UserId + "");
                                if (!Directory.Exists(path12))
                                    Directory.CreateDirectory(path12);

                                //bool fileExists = System.IO.File.Exists(path12);

                                ////get file extension
                                //FileInfo fileInfo = new FileInfo(file.FileName);
                                //string fileName = file.FileName + fileInfo.Extension;
                                string filename = InputValue[i].InstanceID + "/" + InputValue[i].UserId + "/" + InputValue[i].file.FileName;
                                string fileNameWithPath = Path.Combine(path, filename);

                                using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                                //using (var stream = new FileStream("wwwroot"+fileNameWithPath, FileMode.Create))
                                {
                                    InputValue[i].file.CopyTo(stream);
                                }

                                string fileNameWithPath1 = "/LeavesDoc/" + InputValue[i].file.FileName;
                            }
                        }
                    }                  
                     successMessage = data1;
                    //return Json(new { success = true, message = successMessage, ViewBag.GetMySavedLeaves });
                    return Json(new { success = true, message = successMessage });
                }
                return Json(new { success = true, message = "Error" });
            }
            else if (submitButton == "Add Leaves To Cart" || submitButton == "Update to Cart" || submitButton == "Update Leave")
            //else if (obj.submitButton == "ADDCART")
            {
                string data = JsonConvert.SerializeObject(requestData);
                //string data = JsonConvert.SerializeObject(InputValue);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                response1000 = client.PostAsync(client.BaseAddress + "/CheckEligibility_To_AddtoCart2", content).Result;
                if (response1000.IsSuccessStatusCode)
                {
                    string data1 = response1000.Content.ReadAsStringAsync().Result;
                    string message1 = data1;
                    return Json(new { success = true, message = message1, ButtonName = submitButton });
                }
                return Json(new { success = false, message = "Error", ButtonName = submitButton });
            }        
            return Json(new { success = true, message = "Error" }); 
        }





        //---------------------------------Leave Levels Module--------------------
        [Authorize]
        public IActionResult Delete_LeaveLevels(int LeaveLevelId, string submitButton)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            LeaveLevelModel obj = new LeaveLevelModel();
            obj.LeaveLevelId = LeaveLevelId;
            obj.submitButton = submitButton;
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response1000 = client.PostAsync(client.BaseAddress + "/Delete_LeaveLevels2", content).Result;
            if (response1000.IsSuccessStatusCode)
            {
                string data1 = response1000.Content.ReadAsStringAsync().Result;
               return new JsonResult(new { success = true, message = data1, ButtonName = submitButton });
            }
            return new JsonResult(new { success = true, message = "Something Error" });
        }
        [Authorize]
        public IActionResult LeaveLevelsDropdown_Caliingfunction()// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<LeaveLevelModel> Value2 = new List<LeaveLevelModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/LeaveLevelsDropdown_Caliingfunction2?InstanceId=" + InstanceId12).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveLevelModel>>(data2);
            }       
            var items = new List<SelectListItem>();
            var l = Value2.Count;
            for (int i = 0; i < l; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].LevelID.ToString(), Text = Value2[i].LevelName.ToString() });
            }
            ViewBag.LeaveLevelsDropdown_Caliingfunction = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.LeaveLevelsDropdown_Caliingfunction);
        }
        [Authorize]

        public IActionResult DepartmentsDropdown_Caliingfunction()// string InstanceClassificationId, string InstanceSubClassificationId)
        {  
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<LeaveLevelModel> Value2 = new List<LeaveLevelModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/DepartmentsDropdown_Caliingfunction2?InstanceId=" + InstanceId12).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveLevelModel>>(data2);
            }

            var items = new List<SelectListItem>();
            var length = Value2.Count;
            for (int i = 0; i < length; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].InstanceClassificationId.ToString(), Text = Value2[i].ClassificationName.ToString() });
            }
            ViewBag.DepartmentsDropdown_Caliingfunction = new SelectList(items, "Value", "Text");       
            return new JsonResult(ViewBag.DepartmentsDropdown_Caliingfunction);
        }

        [Authorize]

        public IActionResult AppliedEmployeeNames_Caliingfunction(int InstanceClassificationId)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            //int InstanceClassificationId = Convert.ToInt32(Request.Cookies["Instanceid"]);

            int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
            List<LeaveLevelModel> Value2 = new List<LeaveLevelModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/AppliedEmployeeNames_Caliingfunction2?InstanceId=" + InstanceId12+ "&InstanceClassificationId="+ InstanceClassificationId+ "&InstanceSubClassificationId="+ InstanceSubClassificationId).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveLevelModel>>(data2);
            }


            var items = new List<SelectListItem>();
            var l = Value2.Count;
            for (int i = 0; i < l; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].Userid.ToString(), Text = Value2[i].FirstName.ToString() });
            }
            ViewBag.AppliedEmployeeNames_Caliingfunction = new SelectList(items,"Value","Text");
            return new JsonResult(ViewBag.AppliedEmployeeNames_Caliingfunction);
        }
        [Authorize]
        public IActionResult Roles_InstanceRole_SELByInstanceId_CallingFunction(int InstanceClassificationId)// string InstanceClassificationId, string InstanceSubClassificationId)
        {

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            //int InstanceClassificationId = Convert.ToInt32(Request.Cookies["Instanceid"]);

            //int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
            List<LeaveLevelModel> Value2 = new List<LeaveLevelModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/Roles_InstanceRole_SELByInstanceId_CallingFunction2?InstanceId=" + InstanceId12 ).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveLevelModel>>(data2);
            }
           
            //sort name by alphabetical order 
            Value2 = Value2.OrderBy(x => x.RoleName).ToList();

            var items = new List<SelectListItem>();
            var l = Value2.Count;
            for (int i = 0; i < l; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].InstanceRoleId.ToString(), Text = Value2[i].RoleName.ToString() });
            }
            ViewBag.Roles_InstanceRole_SELByInstanceId_CallingFunction = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.Roles_InstanceRole_SELByInstanceId_CallingFunction);
        }

        [Authorize]
        public IActionResult GetUserName_BY_SelectRoleId(int InstanceClassificationId,int InstanceRoleId)// string InstanceClassificationId, string InstanceSubClassificationId)
        {

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            //int InstanceClassificationId = Convert.ToInt32(Request.Cookies["Instanceid"]);

            //int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
            //string data = JsonConvert.SerializeObject(InputValue);
            //StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            //response1000 = client.PostAsync(client.BaseAddress + "/ApplyStaffLeave2", content).Result;

            LeaveLevelModel val = new LeaveLevelModel();

            val.InstanceClassificationId = InstanceClassificationId;
            val.InstanceId = InstanceId12;
            val.InstanceDesignationId = InstanceRoleId;
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<LeaveLevelModel> Value2 = new List<LeaveLevelModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/GetUserName_BY_SelectRoleId2", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveLevelModel>>(data2);
            }

            //sort name by alphabetical order 
            Value2 = Value2.OrderBy(x => x.FirstName).ToList();

            var items = new List<SelectListItem>();
            var l = Value2.Count;
            for (int i = 0; i < l; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].Userid.ToString(), Text = Value2[i].FirstName.ToString() });
            }
            ViewBag.GetUserName_BY_SelectRoleId = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.GetUserName_BY_SelectRoleId);
        }

        [Authorize]
        public IActionResult LeaveLevels_In_Table_Caliingfunction(string InstanceClassificationId_DepartMent, string LevelId,string  Userid)//,List<string> values)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            List<LeaveLevelModel> Value2 = new List<LeaveLevelModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/LeaveLevels_In_Table_Caliingfunction2?InstanceId=" + InstanceId12).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveLevelModel>>(data2);
            }
            var lenth = Value2.Count;
            if ((Value2.Count > 0) && InstanceClassificationId_DepartMent != null || LevelId != null || Userid != null)
            {

                if (InstanceClassificationId_DepartMent != null && LevelId == null && Userid == null)
                {
                    for (int i = 0; i < lenth;)
                    {
                        if (Convert.ToInt32(InstanceClassificationId_DepartMent) != Value2[i].InstanceClassificationId)
                        {
                            Value2.RemoveAt(i);
                            i = 0;
                            lenth = lenth - 1;
                        }
                        else
                        {
                            i++;
                        }
                    }
                }
                else if (InstanceClassificationId_DepartMent == null && LevelId != null && Userid == null)
                {
                    for (int i = 0; i < lenth;)
                    {
                        if (Convert.ToInt32(LevelId) != Value2[i].LevelID)
                        {
                            Value2.RemoveAt(i);
                            i = 0;
                            lenth = lenth - 1;
                        }
                        else
                        {
                            i++;
                        }
                    }
                }


                else if (InstanceClassificationId_DepartMent != null && LevelId != null && Userid == null)
                {
                    for (int i = 0; i < lenth;)
                    {
                        if (Convert.ToInt32(LevelId) != Value2[i].LevelID || Convert.ToInt32(InstanceClassificationId_DepartMent) != Value2[i].InstanceClassificationId)
                        {
                            Value2.RemoveAt(i);
                            i = 0;
                            lenth = lenth - 1;
                        }
                        else
                        {
                            i++;
                        }
                    }
                }

                else if (InstanceClassificationId_DepartMent != null && LevelId == null && Userid != null)
                {
                    for (int i = 0; i < lenth;)
                    {
                        if ( Convert.ToInt32(InstanceClassificationId_DepartMent) != Value2[i].InstanceClassificationId)
                        {
                            Value2.RemoveAt(i);
                            i = 0;
                            lenth = lenth - 1;
                        }
                        else
                        {
                            i++;
                        }
                    }

                    List<int> Userid_List = new List<int>();
                    string[] selctedvalues = Userid.Split(',');
                    foreach (var item in selctedvalues)
                    {
                        Userid_List.Add(Convert.ToInt32(item));
                    }
                    int Matchcount = 0;
                    for (int i = 0; i < lenth;)
                    {
                        foreach (int value in Userid_List)
                        {
                            if (Value2[i].AppliedUserId != "")
                            {
                                if (value == Convert.ToInt32(Value2[i].AppliedUserId))
                                {
                                    Matchcount++;
                                }
                            }
                           
                        }
                        if (Matchcount < 1)
                        {
                            Matchcount = 0;
                            Value2.RemoveAt(i);
                            i = 0;
                            lenth = lenth - 1;
                        }
                        else
                        {
                            Matchcount = 0;
                            i++;
                        }

                    }
                }



                else if (InstanceClassificationId_DepartMent != null && LevelId != null && Userid != null)
                {
                   
                    for (int i = 0; i < lenth;)
                    {
                        if (Convert.ToInt32(LevelId) != Value2[i].LevelID || Convert.ToInt32(InstanceClassificationId_DepartMent) != Value2[i].InstanceClassificationId)
                        {
                            Value2.RemoveAt(i);
                            i = 0;
                            lenth = lenth - 1;
                        }
                        else
                        {
                            i++;
                        }
                    }

                    List<int> Userid_List = new List<int>();
                    string[] selctedvalues = Userid.Split(',');
                    foreach (var item in selctedvalues)
                    {
                        Userid_List.Add(Convert.ToInt32(item));
                    }
                    int Matchcount = 0;
                    for (int i = 0; i < lenth;)
                    {

                        foreach (int value in Userid_List)
                        {
                            if (Value2[i].AppliedUserId != "")
                            {

                                if (value == Convert.ToInt32(Value2[i].AppliedUserId))
                            {
                                Matchcount++;

                            }
                            }


                        }
                        if (Matchcount < 1)
                        {
                            Matchcount = 0;
                            Value2.RemoveAt(i);
                            i = 0;
                            lenth = lenth - 1;
                        }
                        else
                        {
                            Matchcount = 0;
                            i++;
                        }

                    }
                }

            }



            ViewBag.LeaveLevels_In_Table_Caliingfunction = Value2;
            return new JsonResult(ViewBag.LeaveLevels_In_Table_Caliingfunction);
        }



        [Authorize]

        public IActionResult LeaveLevels()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult LeaveLevels(LeaveLevelModel obj, string EmployeeUserids)
        {
            int Instanceid = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int loginuserid = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            obj.CreatedBy = loginuserid;
            obj.AppliedUserId = EmployeeUserids;
            obj.InstanceId = Instanceid; //p
     
           // obj.LeaveLevelId = 0;  //how it is dynamic //p

            //string data = JsonConvert.SerializeObject(InputValue);
            //StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            //response1000 = client.PostAsync(client.BaseAddress + "/ApplyStaffLeave2", content).Result;

            //if (response1000.IsSuccessStatusCode)


            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SaveLeaveLevels2", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                return Json(new { success = true, message = data1 });

               // return Json(new { success = true, message = successMessage });
            }
            else
            {
                return Json(new { success = true, message = "Response Fail" });
            }
           
            
        }

        [Authorize]


        //-----------=====-------StudentLeaveApproval------------Start--------======-------------------



        public IActionResult DdlDepartmentId_Calingfunction()// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int DelegationClasses = 1;
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
         
            List<StudentLeaveApprovalModel> Value2 = new List<StudentLeaveApprovalModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/DdlDepartmentId_Calingfunction2?InstanceId=" + InstanceId12+ "&UserId="+ LoginUserId+ "&InstanceSubClassificationId="+ InstanceSubClassificationId+ "&DelegationClasses="+ DelegationClasses).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StudentLeaveApprovalModel>>(data2);
            }

            var items = new List<SelectListItem>();

              for (int i = 0; i < Value2.Count; i++)
                {

                    items.Add(new SelectListItem { Value = Value2[i].InstanceClassificationId.ToString(), Text = Value2[i].ClassificationName.ToString() });
                }
          
          
            ViewBag.DdlDepartmentId_Calingfunction = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.DdlDepartmentId_Calingfunction);
        }
        [Authorize]
        public IActionResult DdlClassId_Calingfunction(int InstanceClassificationId)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int DelegationClasses = 1;

            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            //int InstanceClassificationId = Convert.ToInt32(Request.Cookies["Instanceid"]);

            int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
            List<StudentLeaveApprovalModel> Value2 = new List<StudentLeaveApprovalModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/DdlClassId_Calingfunction2?InstanceId=" + InstanceId12 + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId+"&Userid="+LoginUserId+ "&DelegationClasses="+ DelegationClasses).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StudentLeaveApprovalModel>>(data2);
            }


            var items = new List<SelectListItem>();
            for (int i = 0; i < Value2.Count; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].InstanceSubClassificationId.ToString(), Text = Value2[i].SubClassificationName.ToString() });
            }
            ViewBag.DdlClassId_Calingfunction = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.DdlClassId_Calingfunction);
        }
        [Authorize]
        public IActionResult TblApplied_SearchRecords_Calingfunction(StudentLeaveApprovalModel val,int Status,int Tab, int Departmentid,int Classid,DateTime Fromdate,DateTime Todate,string AdmissionNumber,string LastName,string FirstName)
        {

            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int Roleid = Convert.ToInt32(Request.Cookies["Roleid"]);
            // int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);


            //  StudentLeaveApprovalModel val = new StudentLeaveApprovalModel();
            val.Userid = LoginUserId;
            val.Status = Status;
           // val.Flag = 0;  //i gave default   if any problem check it


            if (Roleid==1086) //if he is principal flaf is 1
            {
                val.Flag = 1;
            }
            else
            {
                val.Flag = 0;
            }

            val.Tab = Tab;
   
            val.Todate = Todate;
            val.Fromdate = Fromdate;
            val.Departmentid = Departmentid;
            val.Classid = Classid;
           // val.InstanceClassificationId = InstanceClassificationId;
            val.InstanceId = InstanceId12;

            val.FirstName = FirstName;
            val.LastName = LastName;
            val.AdmissionNumber = AdmissionNumber;


            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<StudentLeaveApprovalModel> Value2 = new List<StudentLeaveApprovalModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/TblApplied_SearchRecords_Calingfunction2", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StudentLeaveApprovalModel>>(data2);
            }

           
            ViewBag.TblApplied_SearchRecords_Calingfunction = Value2;
           return new JsonResult(ViewBag.TblApplied_SearchRecords_Calingfunction);

           // return Json(new { data = Value2 });

        }



        [Authorize]
        public IActionResult TblAppliedLeavesHistory_SearchRecords_Calingfunction(StudentLeaveApprovalModel val ,int Studentid)
        {
            val.Status = 30;
            val.Month = 0;
            val.AcademicYearId = 0;
            val.StudentId = Studentid;
            val.InstanceId= Convert.ToInt32(Request.Cookies["Instanceid"]);

            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<StudentLeaveApprovalModel> Value2 = new List<StudentLeaveApprovalModel>();          
            HttpResponseMessage response9 = client.PostAsync(client.BaseAddress + "/TblAppliedLeavesHistory_SearchRecords_Calingfunction2", content).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StudentLeaveApprovalModel>>(data9);
            }
            ViewBag.TblAppliedLeavesHistory_SearchRecords_Calingfunction2 = Value2;

            return new JsonResult(ViewBag.TblAppliedLeavesHistory_SearchRecords_Calingfunction2);
        }
        [Authorize]
        public IActionResult TblAppliedLeavesSummery_SearchRecords_Calingfunction(StudentLeaveApprovalModel val, int Studentid)
        {
            val.Status = 30;
            
            val.AcademicYearId = 0;
            val.StudentId = Studentid;
            

            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<StudentLeaveApprovalModel> Value2 = new List<StudentLeaveApprovalModel>();
            HttpResponseMessage response9 = client.PostAsync(client.BaseAddress + "/TblAppliedLeavesSummery_SearchRecords_Calingfunction", content).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StudentLeaveApprovalModel>>(data9);
            }
            ViewBag.TblAppliedLeavesSummery_SearchRecords_Calingfunction = Value2;

            return new JsonResult(ViewBag.TblAppliedLeavesSummery_SearchRecords_Calingfunction);
        }


        [Authorize]
        public IActionResult GetAttendancePercentagebyUserID( int StudentUserid, string ValueOFInstance)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            string[] ids = ValueOFInstance.Split('~');
            //string InstanceSubClassificationId = "";
            //string InstanceClassificationId = "";
            //if (ids.Length != 0)
            //{
            //    InstanceSubClassificationId = ids[0];
            //    InstanceClassificationId = ids[1];
            //}
            int InstanceId = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<StudentLeaveApprovalModel> value1 = new List<StudentLeaveApprovalModel>();
            HttpResponseMessage response1 = client.GetAsync(client.BaseAddress + "/GetAttendancePercentagebyUserID?InstanceId=" + InstanceId + "&StudentUserid=" + StudentUserid ).Result;
            if (response1.IsSuccessStatusCode)
            {
                string data1 = response1.Content.ReadAsStringAsync().Result;
                value1 = JsonConvert.DeserializeObject<List<StudentLeaveApprovalModel>>(data1);

                
                double TotWorkingDays = Convert.ToDouble(value1[0].Value);
                double TotPresentDays = Convert.ToDouble(value1[0].Text);
                if (TotWorkingDays != 0 || TotPresentDays != 0)
                {
                    double Attendancepercentage = TotPresentDays / TotWorkingDays;
                    Attendancepercentage = Attendancepercentage * 100;

                    string formatevalue = Attendancepercentage.ToString("0.00");

                    ViewBag.Attendancepercentage = formatevalue;
                }
                else
                {
                    ViewBag.Attendancepercentage = "0";
                }
            }
       
            return new JsonResult(ViewBag.AttendancePercentage);
        }

        [Authorize]
        public IActionResult StudentLeaveApproval()
        {
            return View();
        }

        //save leave approvals
        [HttpPost]
        [Authorize]

        public IActionResult StudentLeaveApproval(StudentLeaveApprovalModel obj,string submitButtonName)
        {
           
               int loginuserid = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            obj.submitButtonName = submitButtonName;
            if (submitButtonName=="Approve")
            {
                obj.Status = 1;
            }
            else if (submitButtonName == "Reject")
            {
                obj.Status = 0;
            }
            if (obj.Comments==null)
            {
                obj.Comments = "";
            }
            //to check holidays to stop attendance
            obj.SatHoliday = 0;
            obj.SunHoliday = 1;
            obj.Userid = loginuserid;
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
           
            HttpResponseMessage response9 = client.PostAsync(client.BaseAddress + "/StudentLeaveApproval", content).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                return Json(new { success = true, message = data9 });
            }
           
            else
            {
                return Json(new { success = true, message = "Response Fail" });
            }
         
        }



        //-----------=====-------StudentLeaveApproval------------End--------======-------------------








        //-----------=====-------LeaveApproval---------------Start-----======-------------------
        [Authorize]

        public IActionResult DdlDepartmentIdIOfStaff_Calingfunction()// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
           // int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);

            List<StudentLeaveApprovalModel> Value2 = new List<StudentLeaveApprovalModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/DdlDepartmentIdIOfStaff_Calingfunction?InstanceId=" + InstanceId12 + "&UserId=" + LoginUserId ).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StudentLeaveApprovalModel>>(data2);
            }

            var items = new List<SelectListItem>();

            for (int i = 0; i < Value2.Count; i++)
            {

                items.Add(new SelectListItem { Value = Value2[i].InstanceClassificationId.ToString(), Text = Value2[i].ClassificationName.ToString() });
            }
            ViewBag.DdlDepartmentIdIOfStaff_Calingfunction = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.DdlDepartmentIdIOfStaff_Calingfunction);
        }
        [Authorize]
        public IActionResult TblAppliedStaffLeaves_SearchRecords_Calingfunction(StaffLeaveApprovalModel val, int Departmentid, int RoleID, DateTime Fromdate, DateTime Todate, string UserName, string LastName, string FirstName)
        {

            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            // int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);


            //  StudentLeaveApprovalModel val = new StudentLeaveApprovalModel();
            val.Userid = LoginUserId;
          
          

            val.Todate = Todate;
            val.Fromdate = Fromdate;
            val.Departmentid = Departmentid;
            val.Username = UserName;
            // val.InstanceClassificationId = InstanceClassificationId;
            val.InstanceId = InstanceId12;

            val.FirstName = FirstName;
            val.LastName = LastName;
   
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<StaffLeaveApprovalModel> Value2 = new List<StaffLeaveApprovalModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/TblAppliedStaffLeaves_SearchRecords_Calingfunction", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StaffLeaveApprovalModel>>(data2);
            }
            ViewBag.TblAppliedStaffLeaves_SearchRecords_Calingfunction = Value2;
            return new JsonResult(ViewBag.TblAppliedStaffLeaves_SearchRecords_Calingfunction);
        }

        [Authorize]
        public IActionResult TblApprovedStaffLeaves_SearchRecords_Calingfunction(StaffLeaveApprovalModel val, string DepartmentName,  DateTime Fromdate, DateTime Todate,string ApprovedRejectedProp)
        {

            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
         
            val.Userid = LoginUserId;
            val.ApprovedRejectedProp = ApprovedRejectedProp;
            //if (DepartmentName == "All")
            //{
            //    val.ApprovedRejectedProp = "Approved";
            //}
            //else if (DepartmentName == "Rejected")
            //{
            //    val.ApprovedRejectedProp = "Rejected";
            //}
           

            val.Todate = Todate;
            val.Fromdate = Fromdate;
            
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<StaffLeaveApprovalModel> Value2 = new List<StaffLeaveApprovalModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/TblApprovedStaffLeaves_SearchRecords_Calingfunction", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StaffLeaveApprovalModel>>(data2);
            }


            ViewBag.TblApprovedStaffLeaves_SearchRecords_Calingfunction = Value2;
            return new JsonResult(ViewBag.TblApprovedStaffLeaves_SearchRecords_Calingfunction);
        }
        [Authorize]
        public IActionResult TblAppliedStaffLeavesRequestByBatchid_SearchRecords_Calingfunction(StaffLeaveApprovalModel val, int BatchId, int InstanceId)
        {

          //  int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
           // n int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

        
           // val.Userid = LoginUserId;
      
            val.InstanceId = InstanceId;

            val.BatchId = BatchId;

            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<StaffLeaveApprovalModel> Value2 = new List<StaffLeaveApprovalModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/TblAppliedStaffLeavesRequestByBatchid_SearchRecords_Calingfunction", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StaffLeaveApprovalModel>>(data2);
            }


            ViewBag.TblAppliedStaffLeavesRequestByBatchid_SearchRecords_Calingfunction = Value2;
            return new JsonResult(ViewBag.TblAppliedStaffLeavesRequestByBatchid_SearchRecords_Calingfunction);
        }
        [Authorize]
        public IActionResult TblLeaveRequested_SearchRecords_Calingfunction(StaffLeaveApprovalModel val, int RoleID, DateTime Fromdate, DateTime Todate,string LeaveselectedType)
        {
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
             int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
            int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);


            //  StudentLeaveApprovalModel val = new StudentLeaveApprovalModel();
            val.Userid = LoginUserId;
            val.LeaveType = LeaveselectedType;
            val.Todate = Todate;
            val.Fromdate = Fromdate;
            val.RoleID = RoleID;
           
             val.InstanceClassificationId = InstanceClassificationId;

            val.InstanceSubClassificationId = InstanceSubClassificationId;
            val.InstanceId = InstanceId12;

            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<StaffLeaveApprovalModel> Value2 = new List<StaffLeaveApprovalModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/TblLeaveRequested_SearchRecords_Calingfunction", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<StaffLeaveApprovalModel>>(data2);
            }

            //sort name by alphabetical order 
           
            Value2 = Value2.OrderBy(x => x.Name).ToList();

            ViewBag.TblLeaveRequested_SearchRecords_Calingfunction = Value2;
            return new JsonResult(ViewBag.TblLeaveRequested_SearchRecords_Calingfunction);
        }


        [Authorize]

        public IActionResult LeaveApproval()
        {
            return View();
        }
        [HttpPost]
        [Authorize]

        public IActionResult LeaveApproval(StaffLeaveApprovalModel obj,string submitButtonName)
        {

            if (obj.Comments == null)
            {
                obj.Comments = "";
            }

            int loginuserid = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            // obj.submitButtonName = submitButtonName;

            //to check holidays to stop attendance


            obj.CreatedBy = loginuserid;
            obj.NextLevelUserID = 0;
            obj.submitButtonName = submitButtonName ;
            //check this
            obj.DelegationFlag = 0;
           obj.DelegationFrom = 0;
           
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");

            HttpResponseMessage response9 = client.PostAsync(client.BaseAddress + "/LeaveApproval", content).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                return Json(new { success = true, message = data9 });
            }

            else
            {
                return Json(new { success = true, message = "Response Fail" });
            }
          
        }


        //--------------------------------------Apply Short Leaves Module----------------------

        [Authorize]
        public IActionResult TblAppliedShortLeaves_SearchRecords_Calingfunction(AttendanceModel val)
        {
            
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
          //  int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
          //  int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);


            //  StudentLeaveApprovalModel val = new StudentLeaveApprovalModel();
            val.UserId = LoginUserId;
           
            val.InstanceID = InstanceId12;

            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/TblAppliedShortLeaves_SearchRecords_Calingfunction", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }



            ViewBag.TblAppliedShortLeaves_SearchRecords_Calingfunction = Value2;
            return new JsonResult(ViewBag.TblAppliedShortLeaves_SearchRecords_Calingfunction);
        }

        [Authorize]
        public IActionResult MyAppliedShortLeaves_PrintTable_CallingFun(int Batchid)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);


            List<AttendanceModel> value122 = new List<AttendanceModel>();
            HttpResponseMessage response122 = client.GetAsync(client.BaseAddress + "/MyAppliedShortLeaves_PrintTable_CallingFun?Batchid=" + Batchid + "&InstanceId=" + InstanceId12 + "&LoginUserId=" + LoginUserId).Result;
            if (response122.IsSuccessStatusCode)
            {
                string data122 = response122.Content.ReadAsStringAsync().Result;
                value122 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data122);
            }
            ViewBag.MyAppliedShortLeaves_PrintTable_CallingFun = value122;



            return new JsonResult(ViewBag.MyAppliedShortLeaves_PrintTable_CallingFun);
        }
        [Authorize]
        public IActionResult TblMonthlyAppliedShortLeavesCount_SearchRecords_Calingfunction(AttendanceModel val)
        {
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            //  int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
            //  int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);

            //  StudentLeaveApprovalModel val = new StudentLeaveApprovalModel();
            val.UserId = LoginUserId;

            val.InstanceID = InstanceId12;

            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/TblMonthlyAppliedShortLeavesCount_SearchRecords_Calingfunction", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }
            // Custom order for month names (serial order)
            Dictionary<string, int> customOrder = new Dictionary<string, int>
    {
        { "Jan", 1 },
        { "Feb", 2 },
        { "Mar", 3 },
        { "Apr", 4 },
        { "May", 5 },
        { "Jun", 6 },
        { "Jul", 7 },
        { "Aug", 8 },
        { "Sep", 9 },
        { "Oct", 10 },
        { "Nov", 11 },
        { "Dec", 12 }
    };
            Value2 = Value2.OrderBy(item => customOrder[item.FromMonthName]).ToList();

            ViewBag.TblMonthlyAppliedShortLeavesCount_SearchRecords_Calingfunction = Value2;
            return new JsonResult(ViewBag.TblMonthlyAppliedShortLeavesCount_SearchRecords_Calingfunction);
        }

        [Authorize]
        public IActionResult Cancel_ShortLeavesOfStaff_CallingFun(int LeaveApplicationId1, string submitButton, int Batchid)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
           int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
            AttendanceModel obj = new AttendanceModel();
            obj.LeaveApplicationId = LeaveApplicationId1;
            obj.submitButton = submitButton;
            obj.Batchid = Batchid;
            obj.InstanceID = InstanceId12;
            obj.UserId = LoginUserId;
            obj.InstanceClassificationId = InstanceClassificationId;
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response1000 = client.PostAsync(client.BaseAddress + "/Cancel_ShortLeavesOfStaff_CallingFun", content).Result;
            if (response1000.IsSuccessStatusCode)
            {
                string data1 = response1000.Content.ReadAsStringAsync().Result;
           
                return new JsonResult(new { success = true, message = data1, ButtonName = submitButton });
            }
            return new JsonResult(new { success = true, message = "Something Error" });
        }

        [Authorize]
        public IActionResult ApplyShortLeaves()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult ApplyShortLeaves(AttendanceModel obj,string submitButton)
        {
            int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
              int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);

            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            obj.InstanceID = InstanceId12;
            obj.UserId = LoginUserId;
            obj.LeaveApplicationId = 0;
            obj.Daystype = "0";
            obj.RequestStatus = "Submitted";
            obj.marriagechecking_Int = 0;
            obj.InstanceClassificationId = InstanceClassificationId;
            obj.CreatedBy = LoginUserId;
            string data = JsonConvert.SerializeObject(obj);

            //string data = JsonConvert.SerializeObject(InputValue);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
           HttpResponseMessage response1000 = client.PostAsync(client.BaseAddress + "/ApplyShortLeaves", content).Result;
            if (response1000.IsSuccessStatusCode)
            {
                string data1 = response1000.Content.ReadAsStringAsync().Result;
                string message1 = data1;
                return Json(new { success = true, message = message1, ButtonName = submitButton });
            }
            return Json(new { success = true, message = "Error", ButtonName = submitButton });
        }

        [Authorize]
        //--------------------------------------Convert Short Leaves Module----------------------


        public IActionResult GetUserName_BY_SelectRoleId_CallingFunction( int InstanceRoleId)// string InstanceClassificationId, string InstanceSubClassificationId)
        {

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            
            LeaveLevelModel val = new LeaveLevelModel();

            val.InstanceId = InstanceId12;
            val.InstanceRoleId = InstanceRoleId;
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<LeaveLevelModel> Value2 = new List<LeaveLevelModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/GetUserName_BY_SelectRoleId_CallingFunction", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveLevelModel>>(data2);
            }

            //sort name by alphabetical order 
            Value2 = Value2.OrderBy(x => x.FirstName).ToList();

            var items = new List<SelectListItem>();
            for (int i = 0; i < Value2.Count; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].Userid.ToString(), Text = Value2[i].FirstName.ToString() });
            }
            ViewBag.GetUserName_BY_SelectRoleId = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.GetUserName_BY_SelectRoleId);
        }

        [Authorize]
        public IActionResult TblLeaveTypesForconvertion_Calingfunction(AttendanceModel val, int InstanceRoleId, int Monthid,  int Userid)
        {
            //int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
           // int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
           // int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);


            //  StudentLeaveApprovalModel val = new StudentLeaveApprovalModel();
            val.UserId = Userid;
            val.InstanceRoleId = InstanceRoleId;
            val.Monthid = Monthid;
           
            val.InstanceID = InstanceId12;

            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<ConvertShortLeavesModel_ListValues> Value2 = new List<ConvertShortLeavesModel_ListValues>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/TblLeaveTypesForconvertion_Calingfunction", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<ConvertShortLeavesModel_ListValues>>(data2);
            }
  
            //sort name by alphabetical order 

              // Value2 = Value2.OrderBy(x => x.Name).ToList();

              ViewBag.TblLeaveRequested_SearchRecords_Calingfunction = Value2;
            return new JsonResult(ViewBag.TblLeaveRequested_SearchRecords_Calingfunction);
        }
        [Authorize]
        public IActionResult CheckLeaveTypeEligibility_CalingFunction(int UserId,int LeaveTypeid)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            //int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);


            List<AttendanceModel> value9 = new List<AttendanceModel>();
            HttpResponseMessage response9 = client.GetAsync(client.BaseAddress + "/GetMyLeaveDetails2?UserId=" + UserId + "&InstanceId=" + InstanceId12).Result;
            if (response9.IsSuccessStatusCode)
            {
                string data9 = response9.Content.ReadAsStringAsync().Result;
                value9 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data9);
            }
            string successMessage = "";
            var AvailableLeaves = 0.0;
            var TotalLeaves = 0.0;
            var LeavetypeName = "";
            int lenth = value9.Count;
            if (value9.Count != 0)
            {

                for (int i = 0; i < lenth; i++)
                {
                    if (value9[i].Leavetypeid == LeaveTypeid)
                    {
                        TotalLeaves = Convert.ToDouble(value9[i].TotalLeaves);
                        AvailableLeaves = Convert.ToDouble(value9[i].AvailableLeaves);
                        LeavetypeName = Convert.ToString(value9[i].Leavetype1);
                        break;
                    }

                }
            }

            if (TotalLeaves <= 0)
            {
                successMessage = "Leaves are not allocated to selected " + LeavetypeName + " type";
            }
            else if (AvailableLeaves <= 0)
            {
                successMessage = "No available leaves for selected  " + LeavetypeName + " type";
            }
            else if (AvailableLeaves < 1.0)
            {                
                    successMessage = "Only "+AvailableLeaves.ToString("F1")+" "+ LeavetypeName+"(s) available. Please select other leave type.";              
            }
            else
            {
                successMessage = "";
            }



            return new JsonResult(successMessage);
        }
        [Authorize]
        public IActionResult ConvertShortLeaves()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult ConvertShortLeaves(List<AttendanceModel> InputVal)
        {


            int lenth19 = InputVal.Count;
   
                for (int j = 0; j < lenth19;)
                {
                    if (InputVal[j].Checkbox_ByChecked == null)
                    {
                        InputVal.RemoveAt(j);
                    // j = 0;
                    j=0;
                        lenth19 = lenth19 - 1;
                    }
                    else
                    {                      
                        j++;
                    }
                }

            for (int j = 0; j < lenth19;j++)
            {                
                    InputVal[j].InstanceID = Convert.ToInt32(Request.Cookies["Instanceid"]);
                    InputVal[j].CreatedBy = Convert.ToInt32(Request.Cookies["LoginUserId"]);
                    InputVal[j].AcadamicYearId = null;  //----check this is null
                    InputVal[j].SLCount = null;     //----check this is null                                  
            }



           //  return View();

            string data = JsonConvert.SerializeObject(InputVal);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response1000 = client.PostAsync(client.BaseAddress + "/ConvertShortLeaves", content).Result;
            if (response1000.IsSuccessStatusCode)
            {
                string data1 = response1000.Content.ReadAsStringAsync().Result;
                string message1 = data1;
                return Json(new { success = true, message = message1});
            }
            return Json(new { success = false, message = " Something Error"});
        }



        // -------------------------------MANAGE LEAVE TYPES  Module-----------------
        [Authorize]
        public IActionResult _ViewChangeActivities(string SourceId,string AuditKey,string TableName)
        {
            AttendanceModel val = new AttendanceModel();
          
            val.SourceId = SourceId;
            //val.AuditKey = "AllowPastDates";
            //val.TableName = "tblLeaveType";

            val.AuditKey = AuditKey;
            val.TableName = TableName;

            //val.InstanceRoleId = InstanceRoleId;
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/_ViewChangeActivities", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data2);
            }
            return PartialView("_ViewChangeActivities", Value2);     
        }


        [Authorize]
        public IActionResult LoadPartialView()
        {
            return PartialView("_SearchLeaveTypePagePartialView");
        }

        [Authorize]
        public IActionResult EditValuesGettingFunction(int Leavetypeid)
        {
            AttendanceModel val = new AttendanceModel();
            val.Leavetypeid = Leavetypeid;
            val.SourceId =Convert.ToString( Leavetypeid);
            val.AuditKey = "AllowPastDates";
            val.TableName = "tblLeaveType";

            //val.InstanceRoleId = InstanceRoleId;
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/EditValuesGettingFunction", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data2);              
            }
            ViewBag.value = Value2;
            return new JsonResult(ViewBag.value);
            //return new JsonResult(new { success = true, message = "Something Error" });
           // return View();
        }
        [Authorize]
        public IActionResult CreateLeaveTypePageView(int Leavetypeid)
        {
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            if (Leavetypeid != 0)
            {
                AttendanceModel val = new AttendanceModel();
                val.SourceId = Convert.ToString(Leavetypeid);
                val.AuditKey = "AllowPastDates";
                val.TableName = "tblLeaveType";
                //val.InstanceRoleId = InstanceRoleId;
                string data = JsonConvert.SerializeObject(val);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
           
                HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/_ViewChangeActivities", content).Result;
                if (response2.IsSuccessStatusCode)
                {
                    string data2 = response2.Content.ReadAsStringAsync().Result;
                    Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data2);
                }            
            }
            ViewBag.LeavetypeidCount = Value2.Count;
            ViewBag.Leavetypeid = Leavetypeid;
            return View();
        }


        [Authorize]

        public IActionResult LeaveTypesCAllingTableView(string LeaveType,string Description)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            AttendanceModel val = new AttendanceModel();
            val.InstanceID = InstanceId12;
            val.Description = Description;
            val.Leavetype = LeaveType;
            //val.InstanceRoleId = InstanceRoleId;
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/LeaveTypesCAllingTableView", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data2);
            }
            ViewBag.LeaveTypesCAllingTableView = Value2.Count;
           // return new JsonResult(ViewBag.LeaveLevels_In_Table_Caliingfunction);
            return View(Value2);
        }


        [Authorize]
        public IActionResult ManageLeaveTypes()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult ManageLeaveTypes(AttendanceModel obj,string ButtonName,int Leavetypeid)
        {
            if (ButtonName == "Delete")
            {
                obj.Leavetypeid = Leavetypeid;
                obj.submitButton = ButtonName;
            }
            else
            {
                int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
                int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
                obj.InstanceID = InstanceId12;
                obj.CreatedBy = LoginUserId;
                obj.submitButton = ButtonName;
                // return Json(new { success = true, message = "Something Error" });
                if (obj.Carryforward_bool == true)
                {
                    obj.Carryforward = 1;
                }
                else
                {
                    obj.Carryforward = 0;
                }
                if (obj.AllowPastDates_bool == true)
                {
                    obj.AllowPastDates = 1;
                }
                else
                {
                    obj.AllowPastDates = 0;
                }
            }
            //return View();

            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageLeaveTypes", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                
                return Json(new { success = true, message = data1 });
            }
            return Json(new { success = true, message = "Something Error" });
           // return View();
        }





        //--------------------------------LEAVE ALLOCATION SCREEN--------------------------------

        //this is not using
        [Authorize]
        public IActionResult GetTblLeaveAllocationListDvalues_CaliingFunction(AttendanceModel val)
        {

            //int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            //int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            ////  int InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
            ////  int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);


            ////  StudentLeaveApprovalModel val = new StudentLeaveApprovalModel();
            //val.UserId = LoginUserId;

            //val.InstanceID = InstanceId12;

            //List<AttendanceModel> Value2 = new List<AttendanceModel>();
            //string data = JsonConvert.SerializeObject(val);
            //StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GetTblLeaveAllocationListDvalues_CaliingFunction", content).Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    string data1 = response.Content.ReadAsStringAsync().Result;
            //    Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            //}

            //ViewBag.TblAppliedShortLeaves_SearchRecords_Calingfunction = Value2;
            return new JsonResult(ViewBag.TblAppliedShortLeaves_SearchRecords_Calingfunction);
        }


        [Authorize]
        public IActionResult DdlLmsSubCategory_Calingfunction(int PayrollCategoryId)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
           // int DelegationClasses = 1;

          //  int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            //int InstanceClassificationId = Convert.ToInt32(Request.Cookies["Instanceid"]);

            int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/DdlLmsSubCategory_Calingfunction?InstanceId=" + InstanceId12 + "&PayrollCategoryId=" + PayrollCategoryId).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data2);
            }
            var items = new List<SelectListItem>();
            for (int i = 0; i < Value2.Count; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].PayrollSubCategoryId.ToString(), Text = Value2[i].PayrollSubCategoryName.ToString() });
            }
            ViewBag.DdlLmsSubCategory_Calingfunction = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.DdlLmsSubCategory_Calingfunction);
        }
        [Authorize]
        public IActionResult DdlLmsCategory_Calingfunction()// string InstanceClassificationId, string InstanceSubClassificationId)
        {
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            // int InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);

            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/DdlLmsCategory_Calingfunction?InstanceId=" + InstanceId12).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data2);
            }

            var items = new List<SelectListItem>();

            for (int i = 0; i < Value2.Count; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].PayrollCategoryId.ToString(), Text = Value2[i].PayrollCategoryName.ToString() });
            }

            ViewBag.DdlLmsCategory_Calingfunction = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.DdlLmsCategory_Calingfunction);
        }

        [Authorize]
        public IActionResult LeaveAllocationTBLView(AttendanceModel val,string GenderId,int PayrollCategoryId,int PayrollSubCategoryId)
        {
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            val.InstanceID = InstanceId12;
            val.InstanceRoleId = default; //not dynamic
            val.DesignationId = default; //not dynamic
          
            val.GenderId = GenderId;
            val.PayrollCategoryId = PayrollCategoryId;
            val.PayrollSubCategoryId = PayrollSubCategoryId;


            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GetTblLeaveAllocationListDvalues_CaliingFunction", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }
            return View(Value2);
           // return PartialView("_LeaveAllocationTBLView");
        }


        [Authorize]
        public IActionResult LeaveAllocation()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        //public IActionResult LeaveAllocation(List<AttendanceModel> val, string ButtonName)
        public async Task<IActionResult> LeaveAllocation(AttendanceModel allTextboxValues, string ButtonName)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            allTextboxValues.InstanceID = InstanceId12;
            allTextboxValues.CreatedBy = LoginUserId;



            //return Json(new { success = true, message = "Something Error" });
            //return View();

            //List<AttendanceModel> val = new List<AttendanceModel>();
            //int count = 0;
            //foreach (var model in val)
            //{
            //    // Process the dynamic parameters for each row
            //    //var dynamicParams = new Dictionary<string, string>();
            //    var ParamString = "";
            //    var Dayvalue = "";
            //    foreach (var item in model.LeavetypeDaysDynamicDictionary)
            //    {
            //        Dayvalue = $"{item.Key}-{item.Value}";
            //        ParamString += Dayvalue + ",";
            //        //dynamicParams[key] = model.LevetypeDaysDynamicDictionary[key];
            //    }
            //    val[count].ParamString_LeaveNameandDayCount = ParamString.TrimEnd(',');
            //    val[count].InstanceID = InstanceId12;
            //    val[count].CreatedBy = LoginUserId;
            //    count++;
            //}

            //var length = val.Count;
            //for (int i = 0; i < length; i++)
            //{
            //    var model = val[i];
            //    var ParamString = "";
            //    var Dayvalue = "";
            //    var dict = model.LeavetypeDaysDynamicDictionary;
            //    var Keys = new List<string>(dict.Keys);
            //    var KeyLength = Keys.Count;
            //    for (int j = 0; j < KeyLength; j++)
            //    {
            //        var key = Keys[j];
            //        Dayvalue = $"{key}-{dict[key]}";
            //        ParamString += Dayvalue + ",";
            //    }
            //    val[i].Leavetype = ParamString.TrimEnd(',');
            //}


            //string data = JsonConvert.SerializeObject(val);
            //string data = JsonConvert.SerializeObject(allTextboxValues);
            //StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/LeaveAllocation", content).Result;



            //if (response.IsSuccessStatusCode)
            //{
            //    string data1 = response.Content.ReadAsStringAsync().Result;
            //    return Json(new { success = true, message = data1 });
            //}
            // return Json(new { success = false, message = "Something Error" });





            string data = JsonConvert.SerializeObject(allTextboxValues);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");

            using (HttpResponseMessage response = await client.PostAsync(client.BaseAddress + "/LeaveAllocation", content))
            {
                if (response.IsSuccessStatusCode)
                {
                    string data1 = await response.Content.ReadAsStringAsync();
                    return Json(new { success = true, message = data1 });
                }
                return Json(new { success = false, message = "Something Error" });
            }
        }


        //--------------------------Leave Delegation Screen------------------------------

        [Authorize]
        public IActionResult _TblLeaveDelegationAuthorityList_LeaveDeligation(LeaveDelegationModel val)
        {
            //int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            val.InstanceID = InstanceId12;
            List<LeaveDelegationModel> Value2 = new List<LeaveDelegationModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/_TblLeaveDelegationAuthorityList_LeaveDeligation", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveDelegationModel>>(data1);
            }
            Value2 = Value2.OrderBy(x => x.FirstName).ToList();
            return PartialView("_TblLeaveDelegationAuthorityList_LeaveDeligation", Value2);
        }
        [Authorize]
        public IActionResult DdlDesignation_AddUserPage_Calingfunction()// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<LeaveDelegationModel> Value2 = new List<LeaveDelegationModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/DdlDesignation_AddUserPage_Calingfunction?InstanceId=" + InstanceId12).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveDelegationModel>>(data2);
            }
            Value2 = Value2.OrderBy(x => x.Designation).ToList();
            var items = new List<SelectListItem>();
            var L = Value2.Count;
            for (int i = 0; i < L; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].DesignationId.ToString(), Text = Value2[i].Designation.ToString() });
            }
            ViewBag.DdlDesignation_AddUserPage_Calingfunction = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.DdlDesignation_AddUserPage_Calingfunction);
        }

        [Authorize]
        public IActionResult GetApprovingAuthorityUserName_BY_SelectRoleId(int InstanceClassificationId, int InstanceRoleId)// string InstanceClassificationId, string InstanceSubClassificationId)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            LeaveDelegationModel val = new LeaveDelegationModel();
            val.InstanceClassificationId = InstanceClassificationId;
            val.InstanceID = InstanceId12;
            val.InstanceDesignationId = InstanceRoleId;
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<LeaveDelegationModel> Value2 = new List<LeaveDelegationModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/GetApprovingAuthorityUserName_BY_SelectRoleId", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveDelegationModel>>(data2);
            }

            //sort name by alphabetical order 
            Value2 = Value2.OrderBy(x => x.FirstName).ToList();

            var items = new List<SelectListItem>();

            var L = Value2.Count;
            for (int i = 0; i < L; i++)
            {
                items.Add(new SelectListItem { Value = Value2[i].Userid.ToString(), Text = Value2[i].FirstName.ToString() });
            }
            ViewBag.GetApprovingAuthorityUserName_BY_SelectRoleId = new SelectList(items, "Value", "Text");
            return new JsonResult(ViewBag.GetApprovingAuthorityUserName_BY_SelectRoleId);
        }
        [Authorize]
        public IActionResult _AddUserPage_PagePartialViewFunction()
        {
            return PartialView("_AddUserPage_LeaveDelegation");
        }
        [Authorize]
        public IActionResult _AddLeaveDelegationPage_LeaveDelegation( )
        {        
            return PartialView("_AddLeaveDelegationPage_LeaveDelegation");
        }
        [Authorize]

        public IActionResult _TblLeaveDelegationList_LeaveDeligation(LeaveDelegationModel val)
        {
            //int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
           
           // val.UserId = LoginUserId;

            val.InstanceID = InstanceId12;

            List<LeaveDelegationModel> Value2 = new List<LeaveDelegationModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/TblLeaveDelegations_SearchRecords_Calingfunction", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveDelegationModel>>(data1);
            }
           
            return PartialView("_TblLeaveDelegationList_LeaveDelegation",Value2);
        }
        [Authorize]
        public IActionResult LeaveDelegation()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult LeaveDelegation(LeaveDelegationModel val,string ButtonName,int LeaveDelegationId)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            //return Json(new { success = true, message = "Something Error" });

            val.InstanceID = InstanceId12;
            val.CreatedBy = LoginUserId;
            val.BtnName = ButtonName;

            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/LeaveDelegation", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;

                return Json(new { success = true, message = data1 });
            }
            return Json(new { success = false, message = "Something Error" });
            // return RedirectToAction("SuccessPage");
            //return RedirectToAction("SuccessPage");
        }



        //-----------------============Allocate Leaves By LMS Category Screen======----------------

        [Authorize]
        public IActionResult GetAllocateLeavesLeaveCategoryWiseTBLViewCalingFunction(AttendanceModel val, int PayrollCategoryId, int PayrollSubCategoryId)
        {


            // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            val.InstanceID = InstanceId12;
      

            val.PayrollCategoryId = PayrollCategoryId;
            val.PayrollSubCategoryId = PayrollSubCategoryId;


            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GetAllocateLeavesLeaveCategoryWiseTBLViewCalingFunction", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }
            return View(Value2);
            
        }
        [Authorize]
        public IActionResult AllocateLeavesLeaveCategoryWise()
        {
            return View();
        }
        [HttpPost]
        [Authorize]

        public IActionResult AllocateLeavesLeaveCategoryWise(List<AttendanceModel> val)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            //return Json(new { success = true, message = "Something Error" });
            //return View();
            int count = 0;
            foreach (var model in val)
            {

                // Process the dynamic parameters for each row
                //var dynamicParams = new Dictionary<string, string>();
                var ParamString = "";
                var Dayvalue = "";
                foreach (var item in model.LeavetypeDaysDynamicDictionary)
                {
                    Dayvalue = $"{item.Key}-{item.Value}";
                    ParamString += Dayvalue + ",";
                    //dynamicParams[key] = model.LevetypeDaysDynamicDictionary[key];
                }
                val[count].ParamString_LeaveNameandDayCount = ParamString.TrimEnd(',');
                val[count].InstanceID = InstanceId12;
                val[count].CreatedBy = LoginUserId;
                count++;
            }

            //var length = val.Count;
            //for (int i = 0; i < length; i++)
            //{
            //    var model = val[i];
            //    var ParamString = "";
            //    var Dayvalue = "";

            //    var dict = model.LeavetypeDaysDynamicDictionary;
            //    var Keys = new List<string>(dict.Keys);
            //    var KeyLength = Keys.Count;
            //        for (int j = 0; j < KeyLength; j++)
            //    {
            //        var key = Keys[j];
            //        Dayvalue = $"{key}-{dict[key]}";
            //        ParamString += Dayvalue + ",";

            //    }

            //    val[i].Leavetype = ParamString.TrimEnd(',');
            //}



            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/AllocateLeavesLeaveCategoryWise", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;

                return Json(new { success = true, message = data1 });
            }
            return Json(new { success = false, message = "Something Error" });
            // return RedirectToAction("SuccessPage");
            //return RedirectToAction("SuccessPage");
        }



        //----------------------------================Assign Leaves To Staff======------------------
        [Authorize]
        public IActionResult _TblAssignLeavesToStaff_AssignLeavestoStaff(AttendanceModel val,int PayrollCategoryId,int PayrollSubCategoryId)
        {

            // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            val.InstanceID = InstanceId12;


            val.PayrollCategoryId = PayrollCategoryId;
            val.PayrollSubCategoryId = PayrollSubCategoryId;


            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/_TblAssignLeavesToStaff_AssignLeavestoStaff", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }

            return PartialView("_TblAssignLeavesToStaff_AssignLeavestoStaff", Value2);
        }



        [Authorize]
        public IActionResult AssignLeavestoStaff()
        {
            return View();
        }
        [HttpPost]
        [Authorize]

        public IActionResult AssignLeavestoStaff(List<AttendanceModel> val)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int count = 0;
            foreach (var model in val)
            {
               // val[count].ParamString_LeaveNameandDayCount = ParamString.TrimEnd(',');
                val[count].InstanceID = InstanceId12;
                val[count].CreatedBy = LoginUserId;
                count++;
            }


            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/AssignLeavestoStaff", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;

                return Json(new { success = true, message = data1 });
            }
            return Json(new { success = false, message = "Something Error" });
        
        }




        //----------------------------------======== Manage Staff Leave ====--------------------
        [Authorize]

        //this is not using
        public IActionResult _TblStaffUserList_ManageStaffLeave(LeaveDelegationModel val)
        {
            //int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);

            // val.UserId = LoginUserId;

            val.InstanceID = InstanceId12;

            List<LeaveDelegationModel> Value2 = new List<LeaveDelegationModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/_TblStaffUserList_ManageStaffLeave", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<LeaveDelegationModel>>(data1);
            }
            // Value2 = Value2.OrderBy(x => x.FirstName).ToList();

            //return PartialView("_TblStaffUserList_ManageStaffLeave", Value2);
            return Json(Value2);
        }

        [Authorize]
        //this is not using
        public IActionResult _ApplyStaffLeaveByUserId_ManageStaffLeave(int Userid)
        {
            //int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            ViewBag.Userid = Userid;
            ViewBag.Instanceid = InstanceId12;
          
            string CodeName = "LEAVEREASON";

            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetShort_Description_for_Leave_Reason2?CodeName=" + CodeName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            int lenth19 = value.Count;
            if (value.Count != 0)
            {
                for (int j = 0; j < lenth19;)
                {
                    if (value[j].Value == "16" || value[j].Value == "17" || value[j].Value == "18" || value[j].Value == "19")
                    {
                        value.RemoveAt(j);
                        j = 0;
                        // j =j-1;
                        lenth19 = lenth19 - 1;
                    }
                    else
                    {
                        j++;
                    }
                }
            }
            ViewBag.GetShort_Description_for_Leave_Reason2 = value;
            return PartialView("_ApplyStaffLeaveByUserId_ManageStaffLeave");
        }
        [Authorize]
        public IActionResult ManageStaffLeave()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult ManageStaffLeave(List<AttendanceModel> val)
        {
            return Json(new { success = false, message = "Something Error" });

        }



        //----------------------------------------Leave Cancellation---------------------------------

        [Authorize]
        public IActionResult GetSubmittedLeaveRequestsDetailsByUseridLeaveIdforEdit(int LeaveApplicationId, int Userid)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            List<AttendanceModel> value1226 = new List<AttendanceModel>();
            HttpResponseMessage response96 = client.GetAsync(client.BaseAddress + "/GetSubmittedLeaveRequestsDetailsByUseridLeaveIdforEdit?LeaveApplicationId=" + LeaveApplicationId + "&InstanceId=" + InstanceId12 + "&UserId=" + Userid).Result;
            if (response96.IsSuccessStatusCode)
            {
                string data96 = response96.Content.ReadAsStringAsync().Result;
                value1226 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data96);
            }
            ViewBag.GetSubmittedLeaveRequestsDetailsByUseridLeaveIdforEdit = value1226;

            return new JsonResult(ViewBag.GetSubmittedLeaveRequestsDetailsByUseridLeaveIdforEdit);
        }
        [Authorize]
        public IActionResult _EditLeavesPage_LeaveCancellation(int Userid,int LeaveApplicationId)
        {

            // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            ViewBag.Userid = Userid;                    
            ViewBag.Instanceid = InstanceId12;
            ViewBag.LeaveApplicationId = LeaveApplicationId;
            List<AttendanceModel> LeaveType1 = new List<AttendanceModel>();
            HttpResponseMessage response91 = client.GetAsync(client.BaseAddress + "/GetMyLeaveDetails2?UserId=" + Userid + "&InstanceId=" + InstanceId12).Result;
            if (response91.IsSuccessStatusCode)
            {
                string data91 = response91.Content.ReadAsStringAsync().Result;
                LeaveType1 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data91);
            }
            int lenth1 = LeaveType1.Count;
            if (LeaveType1.Count != 0)
            {
                for (int j = 0; j < lenth1;)
                {
                    if (LeaveType1[j].TotalLeaves == 0 && LeaveType1[j].DaysUsed == 0 && LeaveType1[j].ApprovedNotUsedLeaves == 0 && LeaveType1[j].LeavesAwaitingApprovalLeaves == 0 && LeaveType1[j].AvailableLeaves == 0)
                    {
                        if (LeaveType1[j].Leavetypeid == 122)
                        {
                            j++;
                            continue;
                        }
                        else
                        {
                            LeaveType1.RemoveAt(j);
                            j = 0;
                            lenth1 = lenth1 - 1;
                        }
                    }
                    else
                    {
                        j++;
                    }
                }
            }

            int lenth5 = LeaveType1.Count;
            var items = new List<SelectListItem>();
            for (int i = 0; i < lenth5; i++)
            {
                items.Add(new SelectListItem { Value = LeaveType1[i].Leavetypeid.ToString(), Text = LeaveType1[i].Leavetype1.ToString() });
            }
            ViewBag.LeaveType1 = new SelectList(items, "Value", "Text");



            string CodeName = "LEAVEREASON";
            List<SelectListItem> value = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetShort_Description_for_Leave_Reason2?CodeName=" + CodeName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            int lenth19 = value.Count;
            if (value.Count != 0)
            {

                for (int j = 0; j < lenth19;)
                {
                    if (value[j].Value == "16" || value[j].Value == "17" || value[j].Value == "18" || value[j].Value == "19")
                    {
                        value.RemoveAt(j);
                        j = 0;
                        lenth19 = lenth19 - 1;

                    }
                    else
                    {
                        j++;
                    }
                }
            }

            ViewBag.GetShort_Description_for_Leave_Reason2 = value;




            return PartialView("_EditLeavesPage_LeaveCancellation");
        }

        [Authorize]
        public IActionResult _TblLeavesSearchedResultPage_LeaveCancellation(AttendanceModel val)
        {
           // int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            val.InstanceID = InstanceId12;
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            HttpResponseMessage response2 = client.PostAsync(client.BaseAddress + "/_TblLeavesSearchedResultPage_LeaveCancellation", content).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data2);
            }
            Value2 = Value2.OrderBy(x => x.FirstName).ToList();
            // return PartialView("_TblLeavesSearchedResultPage_LeaveCancellation",Value2);
            return Json(Value2);
        }

        [Authorize]
        public IActionResult _LeavesSearchPage_LeaveCancellation()
        {
            return PartialView("_LeavesSearchPage_LeaveCancellation");
        }
        [Authorize]
        public IActionResult LeaveCancellation()
        {
            return View();
        }
        [HttpPost]
        [Authorize]

        public IActionResult LeaveCancellation(AttendanceModel val,int Userid,string submitButton)
        {
            //int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);      
            //val.InstanceID = InstanceId12;
            //val.CreatedBy = Userid;
            //val.submitButton = submitButton;
            
            //string data = JsonConvert.SerializeObject(val);
            //StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/LeaveCancellation", content).Result;
            //if (response.IsSuccessStatusCode)
            //{
            //    string data1 = response.Content.ReadAsStringAsync().Result;
            //    return Json(new { success = true, message = data1 });
            //}
            return Json(new { success = false, message = "Something Error" });
        }




        // --------------------------------------============Manage Compansatory Leaves========-----------------
        [Authorize]
        public IActionResult TblCompensatoryLeavesSummery_CallingFunction(AttendanceModel val,int CompOffLeaveID,string submitButton)
        {

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            val.InstanceID = InstanceId12;
            val.Leavetypeid = CompOffLeaveID;
            val.submitButton = submitButton;
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/TblCompensatoryLeavesSummery_CallingFunction", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }
            return Json(Value2);
        }
        [Authorize]
        public IActionResult TblCompensatoryLeavesDetails_CallingFunction(AttendanceModel val)
        {

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            val.InstanceID = InstanceId12;

            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/TblCompensatoryLeavesDetails_CallingFunction", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }
            return Json(Value2);
        }

        [Authorize]
        public IActionResult ManageCompansatoryLeaves()
        {
            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult ManageCompansatoryLeaves(AttendanceModel val, string ButtonName,int CompOffLeaveID)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            val.InstanceID = InstanceId12;
            val.CreatedBy = LoginUserId;
            val.Text = "X - A,X - B,X - C,NONTEACHING-STAFF";
            val.submitButton = ButtonName;
            if (ButtonName == "Delete")
            {
                val.Leavetypeid = CompOffLeaveID;
            }
            val.Todate = val.Fromdate.AddDays(90);
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageCompansatoryLeaves", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                return Json(new { success = true, message = data1 });
            }
            return Json(new { success = false, message = "Something Error" });
        }

        // --------------------------------------============Manage past days Leaves  Screen========-----------------
        [Authorize]
        public IActionResult TblAllowLeavePastDays_CallingFunction(AttendanceModel val)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            val.InstanceID = InstanceId12;
          
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/TblAllowLeavePastDays_CallingFunction", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data1);
            }
            return Json(Value2);
        }

        [Authorize]
        public IActionResult ManagePastDaysLeave()
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            List<AttendanceModel> Value2 = new List<AttendanceModel>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetLeavetypeDropdown21?InstanceId=" + InstanceId12).Result;
            if (response2.IsSuccessStatusCode)
            {
                string data2 = response2.Content.ReadAsStringAsync().Result;
                Value2 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data2);
            }


            var items = new List<SelectListItem>();

            var L = Value2.Count;
            for (int i = 0; i < L; i++)
            {
                if (Value2[i].AllowPastDates == 0)
                {
                    items.Add(new SelectListItem { Value = Value2[i].Value.ToString(), Text = Value2[i].Text.ToString() });
                }
            }
            ViewBag.LeaveType1 = new SelectList(items, "Value", "Text");        
            return View();
        }
        [HttpPost]
        [Authorize]
        public IActionResult ManagePastDaysLeave(AttendanceModel val,string  ButtonName)
        {
            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);
            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            val.InstanceID = InstanceId12;
            val.CreatedBy = LoginUserId;
            val.submitButton = ButtonName;
            string data = JsonConvert.SerializeObject(val);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManagePastDaysLeave", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                return Json(new { success = true, message = data1 });
            }
            return Json(new { success = false, message = "Something Error" });
        }



        //--------below all for error page
        public IActionResult ErrorPage()
        {
            return View();
        }



        //--------below all for checking

        public IActionResult Leavecheck()
        {


            List<AttendanceModel> value = new List<AttendanceModel>();
            //value.Add(lea)
            AttendanceModel ar = new AttendanceModel();
            ar.Studentid = 101;
            ar.StudentName = "hygbddbbh";

            value.Add(ar);
            ViewBag.st = value;


            return View();
        }
        [HttpPost]
        public IActionResult Leavecheck(AttendanceModel formData, List<AttendanceModel> formData1)
        {

            var form1Data = Request.Form;
            var form2Data = Request.Form;
            var resultsView = form1Data["resultsView" + 0];
            //var fileq = Request.Files.Count;

            var d = form1Data["ClassName"];
            // var t=d[0].
            var d1 = form1Data["StudentName"];

            var d11 = form2Data["ClassName"];

            var d12 = form2Data["StudentName"];
            string name = formData.ClassName;
            string email = formData.StudentName;
            // bool subscribe = formData.Subscribe;
            List<AttendanceModel> value = new List<AttendanceModel>();
            //value.Add(lea)
            AttendanceModel ar = new AttendanceModel();
            ar.Studentid = 101;
            ar.StudentName = "hygbddbbh";

            value.Add(ar);
            ViewBag.st = value;


            return View();
        }


        public IActionResult SubmitFormData()
        {
            //string name = form["name"];
            //string email = form["email"];
            // ...

            return View();
        }

        [HttpPost]
        public IActionResult SubmitFormData(List<FormDataModel> rakesh1, List<IFormFile> Course_PDF)

        //public IActionResult SubmitFormData(IFormCollection form, [FromForm] List<FormDataModel> formDataList, List<List<FormDataModel>> formDataArray)
        {




            //var formData = Request.Form;

            //// Retrieve the values of the list items
            //var listItems = formData["listIte[]"];

            //// Process the list items as needed
            //if (listItems.Count > 0)
            //{
            //    foreach (var listItem in listItems)
            //    {
            //        // Do something with each list item value
            //        // For example, you can store them in a database or perform further processing
            //    }
            //}


            //foreach (var formData in formDataList)
            //{
            //    string name = formData.Name;
            //    string email = formData.Email;
            //    //bool subscribe = formData.Subscribe;
            //    //string city = formData.City;

            //    // ... Perform operations with the form data
            //}

            //foreach (var formDataList1 in formDataArray)
            //{
            //    foreach (var formData in formDataList)
            //    {
            //        // Access the form data in the formData object and perform desired operations
            //        string name = formData.Name;
            //        string email = formData.Email;
            //        //bool subscribe = formData.Subscribe;
            //        //string city = formData.City;

            //        // ...
            //    }
            //}



            return View();
        }


        public IActionResult SubmitFormDataFILE()
        {
            //string name = form["name"];
            //string email = form["email"];
            // ...

            return View();
        }

        [HttpPost]
        public IActionResult SubmitFormDataFILE(/*List<IFormCollection> formDataList,*/ List<FormDataModel> rakesh1, IFormFile file)
        {
            // var file = Request.Form.Files[0]; // Retrieve the uploaded file

            //foreach (var formData in formDataList)
            //{
            //    string name = formData.Name;
            //    string email = formData.Email;
            //    //bool subscribe = formData.Subscribe;
            //    //string city = formData.City;

            //    // ... Perform operations with the form data
            //}


            return View();
        }



        public IActionResult FileTransfer()
        {
            return View();
        }
        [HttpPost]
        public IActionResult FileTransfer(AttendanceModel obj)
        {
            return View();
        }

        [HttpGet]
        public IActionResult SendEmail()
        {
            return View();
        }
        [HttpPost]
        public IActionResult SendEmail(AttendanceModel _objModelMail)
        {



            string to = "ponnarakesh76@gmail.com";
            string subject = "About Request";
            // string body = "request Accepted";

            int LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);

            int InstanceId12 = Convert.ToInt32(Request.Cookies["Instanceid"]);


            List<AttendanceModel> value122 = new List<AttendanceModel>();
            HttpResponseMessage response122 = client.GetAsync(client.BaseAddress + "/GetMySavedLeaves2?UserId=" + LoginUserId + "&InstanceId=" + InstanceId12).Result;
            if (response122.IsSuccessStatusCode)
            {
                string data122 = response122.Content.ReadAsStringAsync().Result;
                value122 = JsonConvert.DeserializeObject<List<AttendanceModel>>(data122);
            }
            var tableRows = "";
            foreach (var item in value122)
            {
                var newRow =
                        "<tr style='background-color: white; height: 24px;'>" +

                        "<td>" + item.LeaveReason + "</td>" +
                        "<td>" + item.LeaveTodate + " </td>" +
                        "<td>" + item.LeaveFromdate + " </td>" +

                        "<td>" + item.LeaveNoOfDays + "</td>" +
                        "<td>" + item.LeaveStatus + " </td>" +

                        "<td>" + item.Batchid + "</td>" +


                        "</tr>";
                tableRows += newRow;
            }




            string body = @"
<!DOCTYPE html PUBLIC ''-//W3C//DTD XHTML 1.0 Transitional//EN'' ''http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd''>
<html xmlns=''http://www.w3.org/1999/xhtml''>
<head>"+tableRows+@"
    <title>Staff Leave Application Approval</title>
    <style type=''text/css''>
        body
        {
            margin-left: 20px;
            margin-top: 20px;
        }
        .emailheadTxt
        {
            font-family: Verdana;
            font-size: 12px;
            font-weight: bold;
            color: #2c2c2c;
        }
        .emailcontentTxt
        {
            font-family: Verdana;
            font-size: 12px;
            font-weight: normal;
            color: #2c2c2c;
        }
    </style>
</head>
<body>
    <table width=''100%'' cellspacing=''0'' cellpadding=''0''>
        <tr>
            <td class=''emailheadTxt''>
                HI Admin,
            </td>
        </tr>
        <tr>
            <td style=''height:15px;''>
            </td>
        </tr>
        <tr>
            <td style=''height:20px;'' class=''emailcontentTxt''>
                Staff Leave request is waiting for your approval.
                <br/>
                <br/>
                <Table border=1 width=''100%''>
                    <tr>
                        <th width=''18%''> Name </th>
                        <th width=''12%''> Department </th>
                        <th width=''12%''> Class </th>
                        <th width=''14%''> Leave Type</th>
                        <th width=''19%''> Reason </th>
                        <th width=''10%''> From Date</th>
                        <th width =''10%''> To Date</th>
                        <th width=''5%'' > Days </th>
                    </tr>
                    <tr align=''Center''>
                        <td width=''18%''> Nayana </td>
                        <td width=''12%''> SENIOR - PROGRAM </td>
                        <td width=''12%''> VIII - A </td>
                        <td width= ''14%''> Medical Leave(ML)</td>
                        <td width =''19%''> Out of Station</td>
                        <td width =''10%'' > 21 Dec 2023</td>
                        <td width =''10%'' > 21 Dec 2023</td>
                        <td width=''5%'' > 1.0 </td>
                    </tr>
                </Table>
            </td>
        </tr>
        <tr>
            <td style=''height:15px;''>
                <br/>
                Do you want to approve this leave? : <a href= ""http://school.connect4m.com/Admin/EmailLeaveApprovalforStaff.aspx?action=1&InstanceId=545&UserId=32886&BatchId=83186"" id= ''lnkApprove'' title= ''Approve Leave'' >
                    Yes </a> &nbsp; (OR )&nbsp; <a title=''Reject Leave'' href=""http://school.connect4m.com/Admin/EmailLeaveApprovalforStaff.aspx?action=2&InstanceId=545&UserId=32886&BatchId=83186"" id=''lnkReject''>
                        No</a>
            </td>
        </tr>
        <tr>
            <td style=''height:15px;'' >
                &nbsp;
            </td>
        </tr>
        <tr>
            <td style=''height:15px;'' >
                <font color=""red"">Note: </font>Click on Yes to approve the Staff Leave request,
                No to reject the leave request.
            </td>
        </tr>
        <tr>
            <td style=''height:15px;'' >
                &nbsp;
            </td>
        </tr>
        <tr>
            <td style = ''height: 20px;'' class=''emailcontentTxt''>
                <h3>Previous Leave Details:</h3>
                <table border = ''1'' width=''100%''>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Leave Type</th>
                        <th>Reason</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Days</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td align = ''center''>  (On behalf of Nayana U)</td>
                        <td align = ''center''>SENIOR-PROGRAM</td>
                        <td align = ''center''> EL</td>
                        <td align = ''center''>Study Related</td>
                        <td align = ''center''>01 Sep 2023</td>
                        <td align = ''center''>01 Sep 2023</td>
                        <td align = ''center''>1.0</td>
                        <td align = ''center''>Saved</td>
                    </tr>
                    <tr>
                        <td align = ''center''>Nayana U</td>
                        <td align = ''center''>SENIOR-PROGRAM</td>
                        <td align = ''center''> ML</td>
                        <td align = ''center''>Out of Station</td>
                        <td align = ''center''>21 Dec 2023</td>
                        <td align = ''center''>21 Dec 2023</td>
                        <td align = ''center''>1.0</td>
                        <td align = ''center''>Submitted</td>
                    </tr>
                    <!-- Add more rows if needed -->
                </table>
                <br />
            </td>
        </tr>
        <!-- Add more content here if needed -->
    </table>

    <!-- Add the rest of the HTML content here -->

    Thank you,
    <br />
    <font style = ''color: #01558A''><b>ADS School</b></font>

</body>
</html>";

            string address ="mangasrikanth313@gmail.com";

            //string pw = "tyiuriuqbbduqhvd";
            string pw = "mtngkehgjyhinhwb";

            int r = 1;
            if (r == 1)
            {

                //var body = NotificationMessage;
                var fromAddress = new MailAddress(address, address);
                var message1 = new MailMessage();
                message1.From = fromAddress;
                message1.To.Add(new MailAddress(to));
                message1.Subject = subject;
                message1.Body = body;

                using (var smtpClient = new System.Net.Mail.SmtpClient("smtp.gmail.com", 587))
                {
                    smtpClient.EnableSsl = true;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(address, pw);
                    smtpClient.Send(message1);
                }
            }




            return View();
        }

    }

}



