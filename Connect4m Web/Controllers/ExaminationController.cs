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
using OfficeOpenXml;
using Microsoft.AspNetCore.Http;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Authorization;

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
        private string Controllername;

        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        public ExaminationController(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            Controllername = "Examination";
            client.BaseAddress = new Uri(apiBaseAddress + "/" + Controllername + "");
        }
        private int LoginUserId;
        private int InstanceClassificationId;
        private int InstanceSubClassificationId;
        private int InstanceId;
        private int Roleid;
        private int StudentUserid;
        private string returnvalue;
        private List<SubjectModel> Editlist = new List<SubjectModel>();


        //private int InitializeInstanceId()
        //{
        //    return Convert.ToInt32(Request.Cookies["Instanceid"]);
        //}

        private void InitializeCookieValues()
        {
            InstanceId = Convert.ToInt32(Request.Cookies["Instanceid"]);
            LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
            InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
            Roleid = Convert.ToInt32(Request.Cookies["Roleid"]);
            StudentUserid = Convert.ToInt32(Request.Cookies["StudentUserid"]);
        }

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
            }
            return "0";
        }


        //--------------------------------------============================= Manage Exams Screen ===================------------------------------
        public IActionResult TblExamListData(ExaminationModel obj, int Id)
        {
            InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.Id = Id;
            List<ExaminationModel> list = CommonListMethod(obj, "/TblExamListData");
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
            InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.CreatedBy = LoginUserId;
            obj.Id = DeleteID;
            obj.ButtonName = ButtonName;
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
                InitializeCookieValues();
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
                InitializeCookieValues();
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
            InitializeCookieValues();
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
                InitializeCookieValues();
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
            InitializeCookieValues();
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
            InitializeCookieValues();
            obj.InstanceID = InstanceId;
            List<SubjectModel> list = CommonListMethod(obj, "/TblBulkUploadSubjectsList");
            list = list.OrderBy(x => x.SubjectName).ToList();
            return Json(list);
        }


        public IActionResult TblViewSubjectsList(SubjectModel obj,int InstanceClassificationId,int InstanceSubClassificationId)
        {
            InitializeCookieValues();
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


        public IActionResult DownloadExcel()
        {
            // Dummy data (replace with your actual data retrieval logic)
            List<YourDataModel> data = GetYourData();

            // Create Excel package
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Sheet1");

                // Define headers
                string[] headers = { "ID", "Name", "Age", "City" };

                // Add headers to the worksheet
                for (int i = 0; i < headers.Length; i++)
                {
                    worksheet.Cells[1, i + 1].Value = headers[i];
                }

                // Auto fit columns for better appearance
                worksheet.Cells.AutoFitColumns();

                // Set content type and return the file
                var stream = new MemoryStream(package.GetAsByteArray());
                return new FileStreamResult(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                {
                    FileDownloadName = "YourData.xlsx"
                };
            }
        }
        private List<YourDataModel> GetYourData()
        {
            // Replace this with your actual data retrieval logic
            return new List<YourDataModel>
        {
            new YourDataModel { Id = 1, Name = "John Doe" },
            new YourDataModel { Id = 2, Name = "Jane Doe" }
            // Add more data as needed
        };
        }


        public IActionResult BulkUploadSubjects()
        {
            return View();
        }

        [HttpPost]
        public IActionResult BulkUploadSubjects(SubjectModel obj, string ButtonName,IFormFile SubjectExelFile)
        {
            if (SubjectExelFile == null || SubjectExelFile.Length <= 0)
            {

                return BadRequest("Invalid file");
            }
            try
            {
                using (var stream = new MemoryStream())
                {
                    SubjectExelFile.CopyTo(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        // Provide the password to decrypt the sheet
                        package.Workbook.Worksheets[0].Protection.SetPassword("rockSt@2r1");

                        var worksheet = package.Workbook.Worksheets[0]; // Assuming the data is in the first sheet

                        int rowCount = worksheet.Dimension.Rows;

                        for (int row = 2; row <= rowCount; row++) // Assuming the header is in the first row
                        {
                            string value = worksheet.Cells[row, 1].Value?.ToString(); // Access each cell's value
                            string value1 = worksheet.Cells[row, 2].Value?.ToString(); // Access each cell's value
                            string value11 = worksheet.Cells[row, 3].Value?.ToString(); // Access each cell's value
                            string value111 = worksheet.Cells[row, 4].Value?.ToString(); // Access each cell's value
                            string value1111 = worksheet.Cells[row, 5].Value?.ToString(); // Access each cell's value
                        }

                        return Json(new { success = true, message = "Data imported successfully" });
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = $"Error: {ex.Message}" });
            }
            return Json(new { success = false, message = "Something Error" });

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





            InitializeCookieValues();
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
            InitializeCookieValues();
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
            InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.Name = "STUDENT";//Gave Default
           
           // SubjectEditValuesListModel obj1 = new SubjectEditValuesListModel();
            List<SubjectEditValuesListModel> list = CommonListMethod(obj, "/TblUserDetailsList");
            //  list = list.OrderBy(x => x.SubjectName).ToList();
            ViewBag.SubjectAssociatedList = list[0].SubjectAssociatedList;
            return Json(list[0].UsersNamesList);
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
                InitializeCookieValues();
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
                InitializeCookieValues();
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
