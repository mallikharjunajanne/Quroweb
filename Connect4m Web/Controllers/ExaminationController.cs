using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Connect4m_Web.Models;
using Newtonsoft.Json;
using System.Text;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using System.IO;

using Microsoft.AspNetCore.Http;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Authorization;
using OfficeOpenXml;
using System.Text.RegularExpressions;
using Connect4m_Web.Views;

namespace Connect4m_Web.Controllers
{
    [Authorize]

    public class ExaminationController : Controller
    {
        //Uri baseaddress = new Uri("https://localhost:44379/api/Examination");
        //HttpClient client;


        //public ExaminationController()
        //{
        //    client = new HttpClient();
        //    client.BaseAddress = baseaddress;
        //}
        //private string Controllername;

        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;

        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)

        private readonly IUserService _userService;
        private readonly int LoginUserId;
        private readonly int InstanceClassificationId;
        private readonly int InstanceSubClassificationId;
        private readonly int InstanceId;
        private readonly int Roleid;
        private readonly int StudentUserid;
        private readonly string RoleName;
        private readonly string UserNameHeader_;

        private string returnvalue;
        private List<SubjectModel> Editlist = new List<SubjectModel>();
        public ExaminationController(HttpClientFactory httpClientFactory, IConfiguration configuration,IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            //Controllername = "Examination";
            client.BaseAddress = new Uri(apiBaseAddress + "/Examination");

            //===================Values Getting====================================
            _userService = userService;

            InstanceId = _userService.InstanceId;
            LoginUserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            InstanceSubClassificationId = _userService.InstanceSubClassificationId;
            Roleid = _userService.Roleid;
            StudentUserid = _userService.StudentUserid;

            RoleName = _userService.RoleName;
            UserNameHeader_ = _userService.UserNameHeader_;
        }

        CommanMethodClass CommonMethodobj = new CommanMethodClass();

        //private int InitializeInstanceId()
        //{
        //    return Convert.ToInt32(Request.Cookies["Instanceid"]);
        //}

        //private void InitializeCookieValues()
        //{
        //    InstanceId = Convert.ToInt32(Request.Cookies["Instanceid"]);
        //    LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
        //    InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
        //    InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
        //    Roleid = Convert.ToInt32(Request.Cookies["Roleid"]);
        //    StudentUserid = Convert.ToInt32(Request.Cookies["StudentUserid"]);
        //}

        public List<T> CommonListMethod<T>(T obj, string WebApiMethodname)
        {
            //  string className = obj.GetType().Name;
            //  List<T> Values = new List<T>();

            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + WebApiMethodname, content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<List<T>>(data1);
            }
            return new List<T>();
        }

        public string CommonSaveMethod<T>(T obj, string WebApiMethodname)
        {
            //return "0";
            string returnval = "";
            //  string className = obj.GetType().Name;
            //  List<T> Values = new List<T>();
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + WebApiMethodname, content).Result;
            if (response.IsSuccessStatusCode)
            {
                return returnval = response.Content.ReadAsStringAsync().Result;
            }var returnval1 = response.Content.ReadAsStringAsync().Result;
            return "0";
        }


        //--------------------------------------============================= Manage Exams Screen ===================------------------------------
        public IActionResult TblExamListData(ExaminationModel obj, int Id)
        {
            //InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.Id = Id;
            List<ExaminationModel> list = CommonMethodobj.CommonListMethod<ExaminationModel, ExaminationModel>(obj, "/TblExamListData", client);

            //List<ExaminationModel> list = CommonListMethod(obj, "/TblExamListData");
            return Json(list);
        }
        public IActionResult Create_Update_Pview_ManageExams()
        {
            return PartialView("_Create_Update_Pview_ManageExams");
        }

        public IActionResult ManageExams()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ManageExams(ExaminationModel obj, int DeleteID, string ButtonName)
        {
            //InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.CreatedBy = LoginUserId;
          
            obj.ButtonName = ButtonName;

            if (ButtonName == "Delete")
            {
                obj.Id = DeleteID;
            }

            returnvalue = CommonSaveMethod(obj, "/CommonSaveMethod");

            if (returnvalue != "0")
            {
                return Json(new { success = true, message = returnvalue });
            }
            else
            {
                return Json(new { success = false, message = "Something Error" });
            }
        }


        // -------------------=====================   MANAGE SUBJECTS   ===============================


        public IActionResult UpdateManageSubjects(Models.SubClassifications obj, string Buttonname, string SubjectName)
        {
            try
            {
                //InitializeCookieValues();
                ViewBag.Buttonname = Buttonname;
                List<Models.SubClassifications> list = CommonListMethod(obj, "/MS_SubClassifications?InstanceId=" + InstanceId);
                if (Buttonname != "Create")
                {
                    SubjectModel obj1 = new SubjectModel();
                    obj1.Name = SubjectName;
                    obj1.InstanceID = InstanceId;
                    Editlist = CommonListMethod(obj1, "/TblSubjectListDataForEdit");
                    ViewBag.SubjectName = Editlist[0].SubjectTypeName;
                    ViewBag.Editlist = Editlist;
                }
                return View(list);
            }
            catch (Exception)
            {
                return View(0);
            }
        }


        public IActionResult Subclassfications_MS( int InstanceClassificationId, string SubjectName, string Buttonname)
        {
            try
            {
                Models.Subclassfications_MS obj = new Models.Subclassfications_MS();
                //InitializeCookieValues();
                //--------------------------------------------------  Subclassfication DAta 
                obj.InstanceID = InstanceId;
                obj.InstanceClassificationId = InstanceClassificationId;
                obj.RoleName = "TEACHER,CLASS TEACHER";
              //  string RoleName1 = "TEACHER,CLASS TEACHER";
                List<Models.Subclassfications_MS> ListOfAll = CommonListMethod<Models.Subclassfications_MS>(obj, "/Subject_department_Mentorslist");

                List<SelectListItem> itemlist = new List<SelectListItem>();
                var length = ListOfAll[0].SubjectTypes.Count;
                for (int i = 0; i < length; i++)
                {
                    itemlist.Add(new SelectListItem { Value = ListOfAll[0].SubjectTypes[i].Value, Text = ListOfAll[0].SubjectTypes[i].Text });
                }
                itemlist.Insert(0, new SelectListItem { Value = "", Text = "-- Select --" });
                ViewBag.Subjectlist_MS = itemlist;
                ViewBag.MentorList = ListOfAll[0].mentors;

                if (Buttonname != "Create")
                {
                    SubjectModel obj1 = new SubjectModel();
                    obj1.Name = SubjectName;
                    obj1.InstanceID = InstanceId;
                    Editlist = CommonListMethod(obj1, "/TblSubjectListDataForEdit");
                }
                ViewBag.Buttonname1 = Buttonname;
                Models.Subclassfications_MS viewModel = new Models.Subclassfications_MS
                {
                    subclassfication = ListOfAll[0].subclassfication,
                    mentors = ListOfAll[0].mentors,
                    editlist = Editlist
                };
                if (ListOfAll[0].subclassfication.Count == 0)
                {
                    return Json(0);
                }
                //ViewBag.Editlist = editlist;
                return View(viewModel);
            }
            catch (Exception)
            {
                //return View(viewModel);
                throw;
            }
        }
        public IActionResult TblSubjectListData(SubjectModel obj)
        {
            //InitializeCookieValues();
            obj.InstanceID = InstanceId;
            List<SubjectModel> list = CommonListMethod(obj, "/TblSubjectListData");
            return Json(list);
        }

        public IActionResult ManageSubjects()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ManageSubjects(SubjectModel obj, string SubjectName, string ButtonName)
        {
            try
            {
                //InitializeCookieValues();
                obj.InstanceID = InstanceId;
                obj.CreatedBy = LoginUserId;
                // obj.Id = DeleteID;
                obj.ButtonName = ButtonName;
                if (ButtonName == "Delete")
                {
                    obj.SubjectTypeName = SubjectName;
                }

                //  return Json(new { success = false, message = "Something Error" });
                returnvalue = CommonSaveMethod(obj, "/ManageSubjects");
                if (returnvalue != "0")
                {
                    return Json(new { success = true, message = returnvalue });
                    //return Json(returnvalue);
                }
                else
                {
                    return Json(new { success = false, message = "Something Error" });
                }
            }
            catch (Exception)
            {
               // throw;
                return Json(new { success = false, message = "Something Error" });
            }
        }



        // -------------------=====================   BULK UPLOAD SUBJECTS   ===============================
        public IActionResult UpdateSubjects_PartialView(int InstanceSubjectId, string Buttonname)
        {
            //InitializeCookieValues();
            ViewBag.Buttonname = Buttonname;
            SubjectEditValuesListModel obj = new SubjectEditValuesListModel();
            obj.InstanceID = InstanceId;
            obj.InstanceSubjectId = InstanceSubjectId;
            obj.MentorRoles = "TEACHER,CLASS TEACHER";
            if (Buttonname == "Update")
            {
                List<SubjectEditValuesListModel> list = CommonListMethod(obj, "/SubjectListTo_Edit");

                // ViewBag.SubjectNames = list[0].SubjectNamesList;
                ViewBag.SubjectNames = list[0].SubjectNamesList.Select(item => new { Value = item.SubjectId, Text = item.SubjectName });
                list[0].MentorsNamesList = list[0].MentorsNamesList.OrderBy(x => x.MentorName).ToList();
                ViewBag.MentorsNames = list[0].MentorsNamesList.Select(item => new { Value = item.MentorUsertid, Text = item.MentorName });
                List<SubjectModel> listedit = new List<SubjectModel>();
                listedit = list[0].EditValuesList;
                ViewBag.editdetailes = listedit;
                SubjectModel obj12 = new SubjectModel();
                obj12.SubjectName = listedit[0].SubjectName;
                //  obj12.SubjectTypeName = listedit[0].SubjectTypeName;
                obj12.SubjectTypeId1 = listedit[0].SubjectTypeId1;
                obj12.IncludeInTotal1 = listedit[0].IncludeInTotal1;
                obj12.SubjectCode = listedit[0].SubjectCode;
                obj12.DisplayOrder1 = listedit[0].DisplayOrder1;
                obj12.AttendanceRequired1 = listedit[0].AttendanceRequired1;
                obj12.TotalPeriods1 = listedit[0].TotalPeriods1;
                obj12.MentorIds1 = listedit[0].MentorIds1;
                //obj12.MentorIds1 = "184677";
                // return View(ViewBag.editdetailes);
                return View(obj12);
            }
            return View();
        }
        public IActionResult TblBulkUploadSubjectsList(SubjectModel obj)
        {
            //InitializeCookieValues();
            obj.InstanceID = InstanceId;
            List<SubjectModel> list = CommonListMethod(obj, "/TblBulkUploadSubjectsList");
            list = list.OrderBy(x => x.SubjectName).ToList();
            return Json(list);
        }

        //=================Delete User
        public IActionResult DeleteSubject_CallingFunction(DropdownClass val, int InstanceSubjectId)
        {
            val.Id = InstanceSubjectId;
           // val.InstanceID = InstanceId;
            returnvalue = CommonMethodobj.CommonSaveMethod(val, "/DeleteSubject_CallingFunction", client);
            if (returnvalue != "0")
            {
                return Json(new { success = true, message = returnvalue });
            }
            else
                return Json(new { success = false, message = "Something Error" });

        }



        public IActionResult TblViewSubjectsList(SubjectModel obj,int InstanceClassificationId,int InstanceSubClassificationId)
        {
            //InitializeCookieValues();
            obj.InstanceID = InstanceId;
            if (InstanceClassificationId == 0 || InstanceSubClassificationId == 0)
            {
                obj.ScreenName = "ViewDepartments_Class";
                ViewBag.ActivityName = "ViewDepartments_Class";
            }
            else
            {
                obj.InstanceClassificationId = InstanceClassificationId;
                obj.InstanceSubClassificationId = InstanceSubClassificationId;
                ViewBag.ActivityName = "ViewSubjects";
            }
            List<SubjectModel> list = CommonListMethod(obj, "/TblViewSubjectsList");
          
            ViewBag.SubjectDetailsList = list;
            return PartialView("_ViewChangeActivities");
        }

        //=============for checking 
        static bool ContainsNonDigits(string input)
        {
            // Use regular expression to check if the string contains non-digits
            return Regex.IsMatch(input, @"\D");
        }


        public IActionResult BulkUploadSubjects()
        {
            return View();
        }

        [HttpPost]
        public IActionResult BulkUploadSubjects(SubjectModel obj, string ButtonName,IFormFile SubjectExelFile)
        {
            //if (obj.ButtonName == "MultiSubjectsUpdate")
            if (obj.ButtonId == "BtnSave" || obj.ButtonId == "BtnUpload")
            {
                #region
                //string HeaderText="";
                int errorCount = 0;
                var text = "";
                if (SubjectExelFile == null || SubjectExelFile.Length <= 0)
                {
                    return Json(new { success = false, message = "Invalid File" });
                }
                var fileExtension = Path.GetExtension(SubjectExelFile.FileName);

                if (fileExtension != ".xls" && fileExtension != ".xlsx")
                {
                    return Json(new { success = false, message = "Invalid file extension.allowed extensions are .xls,.xlsx" });
                }
                #endregion
                using (var stream = new MemoryStream())
                {
                    SubjectExelFile.CopyTo(stream);
                    try
                    {

                    using (var package = new ExcelPackage(stream))
                    {
                        
                        // Provide the password to decrypt the sheet
                        package.Workbook.Worksheets[0].Protection.SetPassword("rockSt@2r1");

                        var worksheet = package.Workbook.Worksheets[0]; // Assuming the data is in the first sheet

                        //if (worksheet == null && worksheet.Dimension?.Rows < 1)
                        //{
                        //    return Json(new { success = false, message = "Sheet is empty,Please Enter the details." });                        
                        //}
                        var Totallength = worksheet.Dimension.End.Column; var columnCount = 0;
                        string UploadingFileHeaderText;
                        string SavedFileHeaderText;
                            //Sheet Header Name
                        List<string> columnNames = new List<string>{"DepartmentId","ClassId","SubjectName","SubjectType","IncludeInTotal","SubjectCode","SubjectsDisplayOrder","AttendanceRequired","TotalPeriods","MentorUserId"};
                        if (obj.ButtonId == "BtnSave"){
                            columnNames.Remove("DepartmentId");
                            columnNames.Remove("ClassId");
                        }
                        //Checking Header text of first row
                        for (int col = 1; col <= Totallength; col++)
                        {
                             UploadingFileHeaderText = worksheet.Cells[1, col].Text;
                            SavedFileHeaderText = columnNames[col-1];
                            if (UploadingFileHeaderText == null){
                                break;
                            }
                            if (UploadingFileHeaderText != SavedFileHeaderText){
                                return Json(new { success = false, message = $"Mismatch of header name in column{col}" });
                                //  return Json(new { success = false, message = new { SuccessMSG = $"Invalid '{ SubjectNames[col - 1]}' Subject Name" } });
                            }
                            columnCount++;
                        }
                        if (columnCount != 8 && obj.ButtonId == "BtnSave"){
                            text = $"Number of columns in excel sheet should be 8.";
                            errorCount++;
                        }
                        else if (columnCount != 10 && obj.ButtonId == "BtnUpload")
                        {
                            text = $"Number of columns in excel sheet should be 10.";
                            errorCount++;
                        }

                        if (errorCount > 0)
                        {
                            return Json(new { success = false, message = text });
                        }
                        //Count of Rows
                        int lastRow = worksheet.Dimension.End.Row;
                        int rowCount = Enumerable.Range(1, lastRow)
                         .Reverse()
                         .FirstOrDefault(row => Enumerable.Range(1, Totallength)
                         .Any(col => !string.IsNullOrEmpty(worksheet.Cells[row, col].Text)));
                            if (rowCount < 2)
                            {
                                return Json(new { success = false, message = "Sheet is empty,Please Enter the details." });

                            }
                            else if (rowCount > 1000)
                            {
                                return Json(new { success = false, message = "Excel sheet should not exceed 1000 rows." });
                            }
                            //  int rowCount = worksheet.Dimension.Rows;


        obj.InstanceClassificationIdList = new List<int>();obj.InstanceSubClassificationIdList = new List<int>();obj.SubjectNameList = new List<string>();obj.SubjectCodeList = new List<string>();obj.IncludeInTotalStringList = new List<string>();obj.SubjectTypeIdString = new List<string>();obj.AttendanceRequired = new List<string>();obj.DisplayOrder = new List<int>();obj.TotalPeriods = new List<string>();obj.MentorIds = new List<string>();
        string InstanceClassificationIdList; string InstanceSubClassificationIdList; string SubjectNameList;string SubjectTypeIdString; string IncludeInTotalStringList;string SubjectCodeList; string DisplayOrder;string AttendanceRequired;string TotalPeriods;string MentorIds;string SubjectTypeIdStringToLower;string IncludeInTotalStringListTolower;
                        int colNums=1;
                        //return Json(new { success = false, message = "Something Error" });
                        for (int row = 2; row <= rowCount; row++) // Assuming the header is in the first row
                        {                            colNums = 1;
                            InstanceClassificationIdList = obj.ButtonId == "BtnSave" ? obj.InstanceClassificationId.ToString() : worksheet.Cells[row, colNums++].Value?.ToString();
                            InstanceSubClassificationIdList = obj.ButtonId == "BtnSave" ? obj.InstanceSubClassificationId.ToString() : worksheet.Cells[row, colNums++].Value?.ToString();
                            SubjectNameList = worksheet.Cells[row, colNums++].Value?.ToString(); // Access each cell's value
                           SubjectTypeIdString = worksheet.Cells[row, colNums++].Value?.ToString(); // Access each cell's value

                           IncludeInTotalStringList = worksheet.Cells[row, colNums++].Value?.ToString(); // Access each cell's value
                           SubjectCodeList = worksheet.Cells[row, colNums++].Value?.ToString(); // Access each cell's value
                           DisplayOrder = worksheet.Cells[row, colNums++].Value?.ToString(); // Access each cell's value

                           AttendanceRequired = worksheet.Cells[row, colNums++].Value?.ToString(); // Access each cell's value
                           TotalPeriods = worksheet.Cells[row, colNums++].Value?.ToString(); // Access each cell's value
                           MentorIds = worksheet.Cells[row, colNums++].Value?.ToString(); // Access each cell's value


                                #region Validations
                                if (string.IsNullOrWhiteSpace(InstanceClassificationIdList) && string.IsNullOrWhiteSpace(InstanceSubClassificationIdList) && string.IsNullOrWhiteSpace(SubjectNameList) && string.IsNullOrWhiteSpace(SubjectTypeIdString) && string.IsNullOrWhiteSpace(IncludeInTotalStringList) && string.IsNullOrWhiteSpace(SubjectCodeList) && string.IsNullOrWhiteSpace(DisplayOrder) && string.IsNullOrWhiteSpace(AttendanceRequired) && string.IsNullOrWhiteSpace(TotalPeriods) && string.IsNullOrWhiteSpace(MentorIds))
                            {
                                continue;
                            }
                                // HeaderText = worksheet.Cells[1, colNums].Value?.ToString();

                                SubjectTypeIdStringToLower = SubjectTypeIdString.ToLower().Trim();
                            IncludeInTotalStringListTolower = IncludeInTotalStringList.ToLower().Trim();

                                if (InstanceClassificationIdList == null)
                            {
                                text = $"Empty cells in DepartmentId Column, Please enter DepartmentId in row{row}.";
                                errorCount++;
                                
                                // return Json(new { success = false, message = text });
                            }
                               
                           else if (InstanceSubClassificationIdList == null)
                            {
                                text = $"Empty cells in ClassId Column, Please enter ClassId in row{row}.";
                                errorCount++;
                            }
                            else if (SubjectNameList == null)
                            {
                                text = $"Empty cells in SubjectName Column, Please enter SubjectName in row{row}.";
                                errorCount++;
                            }
                            else if (SubjectTypeIdString == null)
                            {
                                text = $"Empty cells in SubjectType Column, Please enter SubjectType in row{row}.";
                                errorCount++;
                            }
                            else if (IncludeInTotalStringList == null)
                            {
                                text = $"Empty cells in IncludeInTotal Column, Please enter IncludeInTotal in row{row}.";
                                errorCount++;

                            }
                            else if (SubjectCodeList == null)
                            {
                                text = $"Empty cells in SubjectCode Column, Please enter SubjectCode in row{row}.";
                                errorCount++;
                            }
                            else if (DisplayOrder == null)
                            {
                                text = $"Empty cells in DisplayOrder Column, Please enter DisplayOrder in row{row}.";
                                errorCount++;
                            }
                            else if (AttendanceRequired == null)
                            {
                                text = $"Empty cells in AttendanceRequired Column, Please enter AttendanceRequired in row{row}.";
                                errorCount++;
                            }
                            //else if (TotalPeriods == null)
                            //{
                            //    text = $"Empty cells in TotalPeriods Column, Please enter TotalPeriods in row{row}.";
                            //    errorCount++;
                            //}
                            //else if (MentorIds == null)
                            //{
                            //    text = $"Empty cells in MentorUserId Column, Please enter MentorUserId in row{row}.";
                            //    errorCount++;
                            //}

                           else if (ContainsNonDigits(InstanceClassificationIdList))
                            {
                                text = $"Invalid DepartmentId in row{row}.";
                                errorCount++;
                            }else if (ContainsNonDigits(InstanceSubClassificationIdList))
                            {
                                text = $"Invalid ClassId in row{row}.";
                                errorCount++;
                            }
                            else if (SubjectTypeIdStringToLower != "regular" && SubjectTypeIdStringToLower != "first language" && SubjectTypeIdStringToLower != "second language" && SubjectTypeIdStringToLower != "lab")
                            {
                                text = $"subject type should be Regular,First Language,Second language or Lab in row{row}.";
                                errorCount++;
                            }
                            else if (IncludeInTotalStringListTolower != "true" && IncludeInTotalStringListTolower != "false")
                            {
                                text = $"IncludeInTotal should be TRUE or FALSE  in row{row}.";
                                errorCount++;
                            }
                            else if (ContainsNonDigits(DisplayOrder))
                            {
                                text = $"Invalid DisplayOrder in row{row}.";
                                errorCount++;
                            }else if (Convert.ToInt32( DisplayOrder) > 200)
                            {
                                text = $"Subjects Display Order should not exceed 200 in row{row}.";
                                errorCount++;
                            }else if (ContainsNonDigits(AttendanceRequired))
                            {
                                text = $"Invalid AttendanceRequired in row{row}.";
                                errorCount++;
                            }
                            else if (Convert.ToInt32(AttendanceRequired) > 100)
                            {
                                text = $"AttendanceRequired Should not be greater than 100 in row{row}.";
                                errorCount++;
                            }
                            else if (Convert.ToInt32(AttendanceRequired) > 500)
                            {
                                text = $"Number of Total Periods should be less than 500 in row{row}.";
                                errorCount++;
                            }
                            else if (TotalPeriods != null && ContainsNonDigits(TotalPeriods)  )
                            {
                                text = $"Invalid TotalPeriods in row{row}.";
                                errorCount++;
                            }else if (MentorIds != null && ContainsNonDigits(MentorIds) )
                            {
                                text = $"Invalid Mentor UserId in row{row}.";
                                errorCount++;
                            }
                                #endregion
                                if (errorCount > 0)
                                {
                                    return Json(new { success = false, message = text });
                                }

                                obj.InstanceClassificationIdList.Add(Convert.ToInt32(InstanceClassificationIdList));
                                obj.InstanceSubClassificationIdList.Add(Convert.ToInt32(InstanceSubClassificationIdList));

                                if (SubjectNameList.Length <= 100){
                                    //var length = val.SubjectNameList.Count;
                                    //if (!obj.SubjectNameList.Contains(SubjectNameList) && !obj.InstanceSubClassificationIdList.Contains(Convert.ToInt32(InstanceSubClassificationIdList)))
                                    //    if (!obj.SubjectNameList.Contains(SubjectNameList))
                                    //    {
                                      // obj.SubjectNameList.Add(SubjectNameList);
                                    //}
                                    //else
                                    {
                                        //for (int i = 0; i < rowCount-1; i++)
                                        for (int i = 0; i < row-2; i++)
                                        {
                                            if (obj.SubjectNameList[i] == SubjectNameList && obj.InstanceSubClassificationIdList[i] == Convert.ToInt32(InstanceSubClassificationIdList))
                                            {
                                                    if (obj.ButtonId == "BtnSave")
                                                    {
                                                        return Json(new { success = false, message = "Duplicate Subjects Name in excel sheet." });
                                                    }
                                                    //return Json(new { success = false, message = "Duplicate Subject Names Exist For Same Class." });
                                            }
                                        }
                                        obj.SubjectNameList.Add(SubjectNameList);

                                    }
                                    //if (!obj.SubjectNameList.Contains(SubjectNameList) && !obj.InstanceSubClassificationIdList.Contains(Convert.ToInt32(InstanceSubClassificationIdList)))
                                    //if (!obj.SubjectNameList.Contains(SubjectNameList))
                                    //{
                                    //    obj.SubjectNameList.Add(SubjectNameList);
                                    //} else if (!obj.InstanceSubClassificationIdList[i].Contains(Convert.ToInt32(InstanceSubClassificationIdList)))
                                    //{
                                    //obj.SubjectNameList.Add(SubjectNameList);
                                    //}
                                    //else
                                    //{//Duplicate Subject Names Exist For Same Class.
                                    //    if (obj.ButtonId == "BtnSave")
                                    //    {
                                    //        return Json(new { success = false, message = "Duplicate Subjects Name in excel sheet." });
                                    //    }
                                    //     return Json(new { success = false, message = "Duplicate Subject Names Exist For Same Class." });
                                    //}

                                    ////if (!obj.SubjectNameList.Contains(SubjectNameList) && !obj.InstanceSubClassificationIdList.Contains(Convert.ToInt32(InstanceSubClassificationIdList)))
                                    //if (!obj.SubjectNameList.Contains(SubjectNameList)  )
                                    //{
                                    //    obj.SubjectNameList.Add(SubjectNameList);
                                    //}
                                    ////else if (!obj.InstanceSubClassificationIdList.Contains(Convert.ToInt32(InstanceSubClassificationIdList)))
                                    ////{
                                    ////    obj.SubjectNameList.Add(SubjectNameList);
                                    ////}
                                    //else
                                    //{//Duplicate Subject Names Exist For Same Class.
                                    //    if (obj.ButtonId == "BtnSave")
                                    //    {
                                    //        return Json(new { success = false, message = "Duplicate Subjects Name in excel sheet." });
                                    //    }
                                    //   // return Json(new { success = false, message = "Duplicate Subject Names Exist For Same Class." });
                                    //}
                                }
                                else
                                {
                                    return Json(new { success = false, message = $"subject name should be less than 100 characters in row {row}" });
                                }
                                if (SubjectCodeList.Length <= 50)
                                {
                                    if (!obj.SubjectCodeList.Contains(SubjectCodeList))
                                    {
                                        obj.SubjectCodeList.Add(SubjectCodeList);
                                    }
                                    else
                                    {
                                        return Json(new { success = false, message = "Duplicate Subjects Code in excel sheet." });
                                    }
                                }
                                else
                                {
                                    return Json(new { success = false, message = $"Subject Code should be less than 50 characters row{row}" });

                                }
                                //obj.IncludeInTotal.Add(IncludeInTotalStringList);
                                obj.IncludeInTotalStringList.Add(IncludeInTotalStringList);
                            obj.SubjectTypeIdString.Add(SubjectTypeIdString);
                                if (!obj.DisplayOrder.Contains(Convert.ToInt32(DisplayOrder)))
                                {
                                    obj.DisplayOrder.Add(Convert.ToInt32(DisplayOrder));
                                }
                                else
                                {
                                    return Json(new { success = false, message = "Duplicate Subjects Display Order in excel sheet." });
                                }
                                obj.AttendanceRequired.Add(AttendanceRequired);
                            obj.TotalPeriods.Add(TotalPeriods);
                            obj.MentorIds.Add(MentorIds);
                        }
                            // return Json(new { success = true, message = "Data imported successfully" });
                        }
                    }
                    catch (System.IO.InvalidDataException ex)
                    {
                        return Json(new { success = false, message = "Invalid Excel file format.Please Save as the opened excel sheet in 'Excel Workbook' format." });

                    }
                }
            }
           // return Json(new { success = false, message = "Something Error" });
            obj.SubjectExelFile = null;
          
            
            #region
            // List<List<string>> excelData = new List<List<string>>();

            //using (var stream = new MemoryStream())
            //{
            //    obj.SubjectExelFile.CopyTo(stream);
            //    using (var package = new ExcelPackage(stream))
            //    {
            //        var worksheet = package.Workbook.Worksheets[0]; // Assuming the data is on the first worksheet

            //        var excelData = new List<List<string>>();
            //        for (int row = worksheet.Dimension.Start.Row; row <= worksheet.Dimension.End.Row; row++)
            //        {
            //            var rowValues = new List<string>();
            //            for (int col = worksheet.Dimension.Start.Column; col <= worksheet.Dimension.End.Column; col++)
            //            {
            //                var cellValue = worksheet.Cells[row, col].Text;
            //                rowValues.Add(cellValue);
            //            }
            //            excelData.Add(rowValues);
            //        }

            //      //  return excelData;
            //    }
            //}

            #endregion
            //InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.CreatedBy = LoginUserId;
            obj.ButtonName = ButtonName;
            obj.Name = "School";//I gave default


            obj.MentorName = "TEACHER,CLASS TEACHER";//Mentor RoleName
            returnvalue = CommonSaveMethod(obj, "/BulkUploadSubjects");
            if (returnvalue != "0")
            {
                return Json(new { success = true, message = returnvalue });
                //return Json(returnvalue);
            }
            else
            {
                return Json(new { success = false, message = "Something Error" });
            }
        }

        // -------------------=====================   MANAGE SUBJECTS ASSOCIATION   ===============================

        public IActionResult SubjectTypesDropdown_Calingfunction(SubjectModel obj)
        {
            //InitializeCookieValues();
            obj.InstanceID = InstanceId;
            List<SubjectModel> list = CommonListMethod(obj, "/SubjectTypesDropdown_Calingfunction");
            var itemsList = new List<SelectListItem>();
            var lenth = list.Count;
            for(int i=0;i < lenth; i++)
            {
                itemsList.Add(new SelectListItem { Value = list[i].SubjectTypeId1.ToString(), Text = list[i].SubjectTypeName.ToString() });
            }
            return Json(itemsList);
        } 
        public IActionResult SubjectNamesDropdown_Calingfunction(SubjectModel obj)
        {
          // obj.
            List<SubjectModel> list = CommonListMethod(obj, "/SubjectNamesDropdown_Calingfunction");
            var itemsList = new List<SelectListItem>();
            var lenth = list.Count;
            for(int i=0;i < lenth; i++)
            {
                itemsList.Add(new SelectListItem { Value = list[i].InstanceSubjectId.ToString(), Text = list[i].SubjectName.ToString() });
            }
            return Json(itemsList);
        }
        public IActionResult TblUserDetailsList(SubjectEditValuesListModel obj)
        {
            try
            {
            //InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.Name = "STUDENT";//Gave Default
           
           // SubjectEditValuesListModel obj1 = new SubjectEditValuesListModel();
            List<SubjectEditValuesListModel> list = CommonListMethod(obj, "/TblUserDetailsList");
            //  list = list.OrderBy(x => x.SubjectName).ToList();
            ViewBag.SubjectAssociatedList = list[0].SubjectAssociatedList;
            return Json(list[0].UsersNamesList);
            }
            catch (Exception)
            {
               return Json(0);
            }
        }
        public IActionResult ManageSubjectAssociation()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ManageSubjectAssociation(SubjectModel obj)
        {
            try
            {
                //InitializeCookieValues();
                obj.InstanceID = InstanceId;
                obj.CreatedBy = LoginUserId;               
                returnvalue = CommonSaveMethod(obj, "/ManageSubjectAssociation");
                if (returnvalue != "0")
                {
                    return Json(new { success = true, message = returnvalue });
                }
                else
                {
                    return Json(new { success = false, message = "Something Error" });
                }
            }
            catch (Exception)
            {
               // throw;
                return Json(new { success = false, message = "Something Error" });
            }
        }

        // -------------------=====================   MANAGE SUBJECTS ASSOCIATION FOR MBA   ===============================


        public IActionResult ManageSubjectAssociationForMBA()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ManageSubjectAssociationForMBA(SubjectModel obj)
        {
            try
            {
                //InitializeCookieValues();
                obj.InstanceID = InstanceId;
                obj.CreatedBy = LoginUserId;
                obj.ScreenName = "ManageSubjectAssociationForMBA";
                obj.bFlagMultipleSubjects = 1;//Gave Default
                returnvalue = CommonSaveMethod(obj, "/ManageSubjectAssociation");
                if (returnvalue != "0")
                {
                    return Json(new { success = true, message = returnvalue });
                }
                else
                {
                    return Json(new { success = false, message = "Something Error" });
                }
            }
            catch (Exception)
            {
                // throw;
                return Json(new { success = false, message = "Something Error" });
            }
        }

    }
}
