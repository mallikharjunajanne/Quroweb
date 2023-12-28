using Connect4m_Web.Models;
using Connect4m_Web.Models.LMSproperties;
using Connect4m_Web.Views;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;

using System.IO;
using System.Data;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Spreadsheet;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.Text.RegularExpressions;
/*using System.Drawing*/

namespace Connect4m_Web.Controllers
{
    [Authorize]
    public class ResultsController : Controller
    {
        private string Controllername;

        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        public ResultsController(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            Controllername = "Results";
            client.BaseAddress = new Uri(apiBaseAddress + "/" + Controllername + "");
        }
        private int LoginUserId;
        private int InstanceClassificationId;
        private int InstanceSubClassificationId;
        private int InstanceId;
        private int Roleid;
        private int StudentUserid;
        private string returnvalue;
        CommanMethodClass CommonMethodobj = new CommanMethodClass();


        private void InitializeCookieValues()
        {
            InstanceId = Convert.ToInt32(Request.Cookies["Instanceid"]);
            LoginUserId = Convert.ToInt32(Request.Cookies["LoginUserId"]);
            InstanceClassificationId = Convert.ToInt32(Request.Cookies["InstanceClassificationId"]);
            InstanceSubClassificationId = Convert.ToInt32(Request.Cookies["InstanceSubClassificationId"]);
            Roleid = Convert.ToInt32(Request.Cookies["Roleid"]);
            StudentUserid = Convert.ToInt32(Request.Cookies["StudentUserid"]);
        }

        // -------------------=====================   POST RESULTS  ===============================
        #region
        public IActionResult DdlSubjectTypes_Calingfunction(ResultsModel obj)
        {
            InitializeCookieValues();
            obj.InstanceID = InstanceId;
            List<DropdownClass> list = CommonMethodobj.CommonListMethod<ResultsModel, DropdownClass>(obj, "/DdlSubjectTypes_Calingfunction", client);

            //  List<ResultsModel> list = CommonMethodobj.CommonListMethod(obj, "/DdlSubjectTypes_Calingfunction", client);
            //var itemsList = new List<SelectListItem>();
            //var lenth = list.Count;
            //for (int i = 0; i < lenth; i++)
            //{
            //    itemsList.Add(new SelectListItem { Value = list[i].ExamId.ToString(), Text = list[i].ExamName.ToString() });
            //}
            //return Json(itemsList);

            return Json(list);
        }

        public IActionResult DdlExams_Callingfunction(ResultsModel obj,int ExamtypeId)
        {
            InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.ExamtypeId = ExamtypeId;
            //obj.InstanceSubClassificationId = InstanceSubClassificationId;
            List<DropdownClass> list = CommonMethodobj.CommonListMethod<ResultsModel, DropdownClass>(obj, "/DdlExams_Callingfunction", client);
            list = list.OrderBy(x => x.Text).ToList();
            return Json(list);
        }
        public IActionResult DdlExamMode_Callingfunction(ResultsModel obj)
        {
            InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.Name = "EMODE";//@Code
            obj.InstanceSubClassificationId = InstanceSubClassificationId;
            List<DropdownClass> list = CommonMethodobj.CommonListMethod<ResultsModel, DropdownClass>(obj, "/DdlExamMode_Callingfunction", client);
            return Json(list);
        }

        public IActionResult TblExamSubjects_Calingfunction(ResultsModel obj,string ScreenName)
        {
            try
            {
                InitializeCookieValues();
                obj.InstanceID = InstanceId;
                obj.ScreenName = ScreenName;
                List<MultiplelistValues> list = CommonMethodobj.CommonListMethod<ResultsModel, MultiplelistValues>(obj, "/TblExamSubjects_Calingfunction", client);
                // list = list.OrderBy(x => x.SubjectName).ToList();
                // ViewBag.ResultsModeList = list[0].ResultsModeList;


                //return Json(list[0]?.ResultsModeList ?? new List<ResultsModel>());
    
                return Json(list);
               // return Json(list[0]?.ExamSubjectsList ?? new List<ResultsModel>());
            }
            catch (Exception ex)
            {
                return Json(0);
            }
        }

        public IActionResult PublishResults_Step3(ResultsModel val, string MarksUploadtype,string Nextstep)
        {
            try
            {
                    ViewBag.MarksUploadtype = MarksUploadtype;
                    string[] SubjectNames = val.SubjectsName.Split(',');
                    ViewBag.SubjectNamesList = SubjectNames;
                    ViewBag.ExamSubjectIdList = val.ExamSubjectIdList;
                    ViewBag.MaxMarksList = val.MaxMarksList;
                    ViewBag.PassMarksList = val.PassMarksList;
                    InitializeCookieValues();
                    val.InstanceID = InstanceId;
                    List<MultiplelistValues> list = CommonMethodobj.CommonListMethod<ResultsModel, MultiplelistValues>(val, "/TblStudentsName_Calingfunction", client);
            
                    ViewBag.colours = list?.FirstOrDefault()?.UsermarksList[0].IsPublished;
                    ViewBag.UsersDetailsList = list?.FirstOrDefault()?.UsermarksList ?? new List<UsermarksModel>();
                    return View();
                
                
              
                //if (MarksUploadtype == "UploadWithOutExcelFile" || Nextstep == "Step3")
                //{
                //    string[] SubjectNames = val.SubjectsName.Split(',');
                //    ViewBag.SubjectNamesList = SubjectNames;
                //    ViewBag.ExamSubjectIdList = val.ExamSubjectIdList;
                //    ViewBag.MaxMarksList = val.MaxMarksList;
                //    ViewBag.PassMarksList = val.PassMarksList;
                //    InitializeCookieValues();
                //    val.InstanceID = InstanceId;
                //    List<MultiplelistValues> list = CommonMethodobj.CommonListMethod<ResultsModel, MultiplelistValues>(val, "/TblStudentsName_Calingfunction", client);
                //   // ViewBag.MarksUploadtype = MarksUploadtype;
                //    ViewBag.colours = list?.FirstOrDefault()?.UsermarksList[0].IsPublished;
                //    ViewBag.UsersDetailsList = list?.FirstOrDefault()?.UsermarksList ?? new List<UsermarksModel>();
                //    return View();
                //}
                //else
                //{
                //    ViewBag.UsersDetailsList =new List<UsermarksModel>();

                //    //ViewBag.MarksUploadtype = MarksUploadtype;
                //    return View();
                //}
            }
            catch (Exception ex)
            {
                return View(0);
            }
        }

        public IActionResult PostResults()
        {
            return View();
        }

        [HttpPost]
        public IActionResult PostResults(ResultsModel obj)
        {
            try
            {

                InitializeCookieValues();
                obj.InstanceID = InstanceId;
                obj.CreatedBy = LoginUserId;
                obj.UserId = LoginUserId;
                obj.RoleId = Roleid;
                // obj.ExamModeId = 0;//i gave default for @IsRetest
                if (obj.ExamModeId == 2)
                    obj.ExamModeId = 1;
                else
                    obj.ExamModeId = 0;
                obj.SMSTextInXML = @"<?xml version=""1.0"" encoding=""ISO-8859-1""?>
<!DOCTYPE REQUESTCREDIT SYSTEM ""http://127.0.0.1/psms/dtd/requestcredit.dtd"">
<REQUESTCREDIT USERNAME=""ADS"" PASSWORD=""Prasad2$$9""></REQUESTCREDIT>";
                obj.SMSFromText = "ADSTEK";
                obj.Action = "credits";//send   i gave default
             
                returnvalue = CommonMethodobj.CommonSaveMethod(obj, "/PostResults", client);

                //var jsonResponse = JsonConvert.DeserializeObject<dynamic>(returnvalue);

                //// Extract specific fields
                //string errorMSG = jsonResponse.ErrorMSG;
                //string id = jsonResponse.id;
                if (returnvalue != "0")
                {
                    return Json(new { success = true, message = returnvalue});
                }
                else
                {
                    return Json(new { success = false, message = "Something Error" });
                }
            }
            catch (Exception ex)
            {
                // throw;
                return Json(new { success = false, message = "Something Error" });
            }
        }

        
        [HttpPost]
        public IActionResult PublishResults(ResultsModel obj,string FmFileUpload)
        {
            try
            {var ButtonId = obj.ButtonId;
                if (FmFileUpload == "FmFileUpload" || ButtonId == "BtnExcelValidate")
                {
                    byte[] fileBytes = new byte[0];
                    var text = "";
                    //if (ButtonId == "BtnExcelValidate")
                    //{
                    if (FmFileUpload == "FmFileUpload")
                    {
                        string filePath = Path.Combine("wwwroot/PostResults Images/PostResultsExcelFile", "ExcelFile");

                        // Check if the file exists
                        if (!System.IO.File.Exists(filePath))
                        {
                           // return Json(new { success = false, message = new { SuccessMSG = "File not Uploaded, Please Upload File" } });
                           return Json(new { success = false, message = "File not Uploaded, Please Upload File" });
                        }

                        // Read the file content into a byte array
                        fileBytes = System.IO.File.ReadAllBytes(filePath);
                    }
                    else if (ButtonId == "BtnExcelValidate")
                    {
                        if (obj.File == null || obj.File.Length <= 0)
                        {
                            // return BadRequest("Invalid file");
                            return Json(new { success = false, message = "Invalid file" });
                           // return Json(new { success = false, message = new { SuccessMSG = "Invalid file" } });
                        }
                       // var allowedExtensions = new[] { ".xls" };
                        var fileExtension = Path.GetExtension(obj.File.FileName);

                        if (fileExtension != ".xls" && fileExtension != ".xlsx")
                        {
                            return Json(new { success = false, message = "Invalid file extension.allowed extensions are .xls,.xlsx" });
                        }
                        // string folderPath = "wwwroot/PostResults Images/PostResultsExcelFile";
                        string folderPath = Path.Combine("wwwroot/PostResults Images/PostResultsExcelFile");

                        // Get all files in the folder
                        string[] files = Directory.GetFiles(folderPath);

                        // Iterate through each file and delete it
                        foreach (var file in files)
                        {
                            System.IO.File.Delete(file);
                        }
                    }
                    //else
                    //{
                    //    return Json(new { success = false, message = new { successMSG = "Something Error" } });
                    //   // return Json(new { success = false, message = "Something Error" });
                    //}

                    using (var stream = new MemoryStream())
                    {
                        if (FmFileUpload == "FmFileUpload")
                        {
                            stream.Write(fileBytes, 0, fileBytes.Length);
                        }
                        else if (ButtonId == "BtnExcelValidate")
                        {

                            obj.File.CopyTo(stream);
                        }
                        using (var package = new ExcelPackage(stream))
                        {
                            var worksheet = package.Workbook.Worksheets[0]; // Assuming the data is on the first worksheet
                                                                            // int rowCount = worksheet.Dimension.Rows;
                                                                            //  int colCount = worksheet.Dimension.Columns;                                   // Get the sheet name
                                                                            // string sheetName = worksheet.Name;
                            if (worksheet.Name != obj.SheetName && ButtonId == "BtnExcelValidate")
                            {
                                return Json(new { success = false, message = "Invalid File Name" });
                               // return Json(new { success = false, message = new { SuccessMSG = "Invalid File Name" } });
                            }
                            var row1 = 1; var columnCount = 0;
                            // for (int col = worksheet.Dimension.Start.Row; col <= worksheet.Dimension.End.Column; col++)
                            var length = worksheet.Dimension.End.Column;
                            string[] SubjectNames = obj.SubjectsName.Split(',');
                            string SubjectHeaderName;
                            for (int col = 1; col <= length; col++)
                            {
                                SubjectHeaderName = worksheet.Cells[row1, col].Text;
                              
                                if (SubjectHeaderName == null)
                                {
                                    break;
                                }
                                if (col > 3 && SubjectNames[col - 4] != SubjectHeaderName)
                                {
                                    return Json(new { success = false, message = $"Invalid '{ SubjectHeaderName}' Subject Name" });
                                  //  return Json(new { success = false, message = new { SuccessMSG = $"Invalid '{ SubjectNames[col - 1]}' Subject Name" } });
                                }
                                columnCount++;
                            }
                           //var count= obj.MaxMarksList.Count;
                            if (obj.MaxMarksList.Count + 3 != columnCount )
                            {
                                return Json(new { success = false, message = "Mismatch of Subject" });
                             //   return Json(new { success = false, message = new { SuccessMSG = "Mismatch of Subject" } });
                            }
                             var RowCount1 = 0;
                            for (int row = 2; row <= length; row++)
                            {
                                //var cellValue = worksheet.Cells[row, col1].Text;
                                var cellUserID = worksheet.Cells[row, 1].Text;
                                if (cellUserID == "" || cellUserID == null)
                                {
                                    break;
                                }
                                if ( obj.UseridList[RowCount1] !=Convert.ToInt32(cellUserID))
                                {
                                    return Json(new { success = false, message = $"Invalid '{ cellUserID}' User Id" });
                                    //  return Json(new { success = false, message = new { SuccessMSG = $"Invalid '{ SubjectNames[col - 1]}' Subject Name" } });
                                }
                                RowCount1++;
                            }
                            //var count = obj.UseridList.Count;
                            if (obj.UseridList.Count != RowCount1)
                            {
                                return Json(new { success = false, message = "Mismatch of UserIds" });
                                //   return Json(new { success = false, message = new { SuccessMSG = "Mismatch of Subject" } });
                            }


                            // int rowCount = worksheet.Dimension.Rows;
                            var c = 0;
                            List<int> SubjectIdList = new List<int>();
                            SubjectIdList = obj.SubjectIdList;


                            List<double> PassMarksList = new List<double>();
                            PassMarksList = obj.PassMarksList;

                            List<double> MaxMarksList = new List<double>();
                            MaxMarksList = obj.MaxMarksList;

                            obj.UseridList = new List<int>();
                            obj.SecureMarksList = new List<string>();
                            obj.SubjectIdList = new List<int>();

                            obj.GradeList = new List<string>();
                            obj.PassMarksList = new List<double>();
                            obj.MaxMarksList = new List<double>();
                            var Grade = "";
                            for (int row = 2; row <= RowCount1+1; row++) // Assuming the header is in the first row
                            {
                                c = 0;
                                string UserId = worksheet.Cells[row, 1].Value?.ToString(); // Access each cell's value
                                string StudentName = worksheet.Cells[row, 2].Value?.ToString(); // Access each cell's value

                                for (int col = 4; col <= columnCount; col++)
                                {
                                    var SecuredMarks = worksheet.Cells[row, col].Text;
                                    string SubjectText = worksheet.Cells[1, col].Value?.ToString(); // Access each cell's value

                                    if (SecuredMarks == "" && SecuredMarks != "O" && obj.ButtonId != "BtnSaveAsDraft")
                                    {
                                        text = $"Please enter marks For student '{StudentName}' for subject  '{SubjectText}'";
                                       // return Json(new { success = false, message = new { SuccessMSG = text } });
                                        return Json(new { success = false, message = text });
                                    }
                                   
                                    else if (!Regex.IsMatch(SecuredMarks, @"^[0-9.]+$") && SecuredMarks != "O" && SecuredMarks != "-")
                                    {
                                        text = $"Please enter valid data for Student '{StudentName}' for the subject '{SubjectText}'";
                                        return Json(new { success = false, message = text });
                                        //return Json(new { success = false, message = new { SuccessMSG = text } });
                                    }
                                    else if (SecuredMarks != "O")
                                    {
                                        if (Convert.ToDouble(MaxMarksList[c]) < Convert.ToDouble(SecuredMarks) && SecuredMarks != "O")
                                        {
                                            text = $"For student '{StudentName}' secured marks can not be greater than maximum marks for subject '{SubjectText}'";
                                             return Json(new { success = false, message = text });
                                           // return Json(new { success = false, message = new { SuccessMSG = text } });
                                        }
                                        else if (SecuredMarks.Length > 5)
                                        {
                                            text = $"Marks length should be less than 5 for the user '{StudentName}' for the subject '{SubjectText}'";
                                            return Json(new { success = false, message = text });
                                           // return Json(new { success = false, message = new { SuccessMSG = text } });
                                        }
                                    }
                                    if (ButtonId != "BtnExcelValidate")
                                    {
                                        if (SecuredMarks == "O")
                                        { Grade = "O"; }
                                        else
                                        {
                                            if ((PassMarksList[c]) <= Convert.ToDouble(SecuredMarks) && (SecuredMarks) != "")
                                            {
                                                Grade = "PASS";
                                            }
                                            else if ((PassMarksList[c]) > Convert.ToDouble(SecuredMarks) && SecuredMarks != "")
                                            {
                                                Grade = "FAIL";
                                            }
                                            else if (SecuredMarks == "-")
                                            {
                                                Grade = "ABSENT";
                                                //Grade = "OPTIONAL";
                                            }
                                            else if (SecuredMarks == "" && obj.ButtonId == "BtnPublish")
                                            {
                                                Grade = "OPTIONAL";
                                            }
                                            else
                                            {
                                                Grade = "";
                                            }
                                        }
                                        obj.UseridList.Add(Convert.ToInt32(UserId));
                                        obj.SecureMarksList.Add(SecuredMarks);
                                        obj.GradeList.Add(Grade);
                                        obj.SubjectIdList.Add(SubjectIdList[c]);
                                        obj.PassMarksList.Add(PassMarksList[c]);
                                        obj.MaxMarksList.Add(MaxMarksList[c]);
                                    }
                                    c++;
                                }
                            }

                            if (ButtonId == "BtnExcelValidate")
                            {
                                // Reset the position of the MemoryStream to the beginning
                                stream.Position = 0;
                                // Get the byte array from the MemoryStream
                                fileBytes = stream.ToArray();

                                string fileName = "ExcelFile";//I gave default name

                                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/PostResults Images/PostResultsExcelFile");

                                // Combine the directory path and file name
                                string filePathToSave = Path.Combine(path, fileName);

                                // Write the byte array to a file on the server
                                System.IO.File.WriteAllBytes(filePathToSave, fileBytes);

                                return Json(new { success = true, message = "Valid file. Please click on Save As Draft or Publish." });
                                //return Json(new { success = false, message = new { SuccessMSG = "Valid file. Please click on Save As Draft or Publish." } });
                                }
                        }
                    }
                    // }
                }
                InitializeCookieValues();
                obj.InstanceID = InstanceId;
                obj.CreatedBy = LoginUserId;
                obj.UserId = LoginUserId;
                obj.RoleId = Roleid;
                if (obj.ExamModeId == 2)
                    obj.ExamModeId = 1;
                else
                    obj.ExamModeId = 0;


                obj.SMSTextInXML = @"<?xml version=""1.0"" encoding=""ISO-8859-1""?>
<!DOCTYPE REQUESTCREDIT SYSTEM ""http://127.0.0.1/psms/dtd/requestcredit.dtd"">
<REQUESTCREDIT USERNAME=""ADS"" PASSWORD=""Prasad2$$9""></REQUESTCREDIT>";
                obj.SMSFromText = "ADSTEK";
                obj.Action = "credits";//send   i gave default

                returnvalue = CommonMethodobj.CommonSaveMethod(obj, "/PublishResults", client);
                if (returnvalue != "0")
                {var jsonResponse = JsonConvert.DeserializeObject<dynamic>(returnvalue);

                    //// Extract specific fields
                   // string errorMSG = jsonResponse.SuccessMSG;
                    if (jsonResponse.successMSG == "Results Posted successfully.")
                    {
                        string folderPath = Path.Combine("wwwroot/PostResults Images/PostResultsExcelFile");

                        // Get all files in the folder
                        string[] files = Directory.GetFiles(folderPath);

                        // Iterate through each file and delete it
                        foreach (var file in files)
                        {
                            System.IO.File.Delete(file);
                        }
                    }
                    return Json(new { success = true, message=  returnvalue });
                }
                else
                {
                    return Json(new { success = false, message = "Something Error" });
                }
            }
            catch (Exception ex)
            {
                // throw;
                return Json(new { success = false, message=  "Something Error"  });
            }
        }




        #region Population Management File Export start
        // Open XML [Document.open xml - 3.0.0]
        // Village Export
        //  public string ExportToExcelVillagePopulationExcelData_OpenExcelFormat(List<VillagePopulationDto> value, string fileName)
        //=============================================   Excel Dowload



        public IActionResult ExcelDownload(ResultsModel val)
        {
            string[] subjectNames = val.SubjectsName.Split(',');
            ViewBag.SubjectNamesList = subjectNames;
            ViewBag.ExamSubjectIdList = val.ExamSubjectIdList;
            ViewBag.MaxMarksList = val.MaxMarksList;
            ViewBag.PassMarksList = val.PassMarksList;
            InitializeCookieValues();
            val.InstanceID = InstanceId;

            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Report");

              //  List<UsermarksModel> list = CommonMethodobj.CommonListMethod<ResultsModel, UsermarksModel>(val, "/DataGettingforExcel", client);


                List<MultiplelistValues> list = CommonMethodobj.CommonListMethod<ResultsModel, MultiplelistValues>(val, "/TblStudentsName_Calingfunction", client);

                //ViewBag.colours = list?.FirstOrDefault()?.UsermarksList[0].IsPublished;
                //ViewBag.UsersDetailsList = list?.FirstOrDefault()?.UsermarksList ?? new List<UsermarksModel>();



                //  DataTable periodicTable = GetDataTable_OpenExcelFormat(list, val.SubjectsName);
                DataTable periodicTable = GetDataTable_OpenExcelFormat(list?.FirstOrDefault()?.UsermarksList ?? new List<UsermarksModel>(), val.SubjectsName);

                // Apply bold and red font style for the header row
                var headerStyle = worksheet.Cells["A1:" + GetExcelColumnName(periodicTable.Columns.Count) + "1"].Style;
                headerStyle.Font.Bold = true;
                //  headerStyle.Font.Color.SetColor(Color.Red);

                //  Worksheet protection(diasble the unuseable cells)
                worksheet.Protection.IsProtected = true;
                worksheet.Protection.AllowSelectLockedCells = false;

                //  Set the columns count what we needed
                int needcolumnscount = periodicTable.Columns.Count - subjectNames.Length;

                // Set column headers
                for (int columnIndex = 0; columnIndex < needcolumnscount; columnIndex++)
                {
                    worksheet.Cells[1, columnIndex + 1].Value = periodicTable.Columns[columnIndex].ColumnName;
                    worksheet.Cells[1, columnIndex + 1].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[1, columnIndex + 1].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[1, columnIndex + 1].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[1, columnIndex + 1].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                }

                ////for (int rowInde = 1; rowInde <= worksheet.Dimension.End.Row; rowInde++)
                //for (int rowInde = 2; rowInde <= periodicTable.Rows.Count; rowInde++)
                //{
                //    // Lock the first cell in each row
                //    worksheet.Cells[rowInde, 1].Style.Locked = true;

                //    // Unlock the rest of the cells in the row
                //    for (int columnIndex = 2; columnIndex <= periodicTable.Columns.Count; columnIndex++)
                //    {
                //        worksheet.Cells[rowInde, columnIndex].Style.Locked = false;
                //    }
                //}



                // Set data rows and apply custom border style for null or empty values

                int rowIndex = 2;

                foreach (DataRow row in periodicTable.Rows)
                {
                    if (row.ItemArray.Any(cellValue => cellValue != DBNull.Value && !string.IsNullOrEmpty(cellValue.ToString())))
                    {
                        int CounmnIndexdisable = needcolumnscount;
                       // worksheet.Cells[rowIndex, 1].Style.Locked = true;
                        for (int columnIndex = 0; columnIndex < needcolumnscount; columnIndex++)
                        {
                            var cellValue = row[columnIndex];

                            if (cellValue != DBNull.Value && int.TryParse(cellValue.ToString(), out int numericValue))
                            {
                                // If the value is numeric, set the data type to number and apply a custom number format
                                worksheet.Cells[rowIndex, columnIndex + 1].Value = numericValue;
                                //worksheet.Cells[rowIndex, columnIndex + 1].Style.Numberformat.Format = "0"; // Customize the number format as needed
                            }
                          else  if (cellValue != DBNull.Value && double.TryParse(cellValue.ToString(), out double numericValue1))
                            {
                                // If the value is numeric, set the data type to number and apply a custom number format
                                worksheet.Cells[rowIndex, columnIndex + 1].Value = numericValue1;
                               // worksheet.Cells[rowIndex, columnIndex + 1].Style.Numberformat.Format = "#,##0.00"; // Customize the number format as needed
                            }
                            else
                            {
                                // If the value is not numeric, set the value as string
                                worksheet.Cells[rowIndex, columnIndex + 1].Value = cellValue.ToString();
                            }
                            if (columnIndex > 2)
                            {
                                var newcellval = row[CounmnIndexdisable].ToString().Trim();
                                if (newcellval == "0")
                                {
                                    worksheet.Cells[rowIndex, columnIndex + 1].Value = "O";
                                    worksheet.Cells[rowIndex, columnIndex+1].Style.Locked = true;
                                    worksheet.Cells[rowIndex, columnIndex + 1].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                                    worksheet.Cells[rowIndex, columnIndex + 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightBlue);
                                   // worksheet.Cells[rowIndex, columnIndex + 1].Style.Fill.BackgroundColor.SetColor(Color(255, 200, 200));

                                }
                                else
                                {
                                    worksheet.Cells[rowIndex, columnIndex + 1].Style.Locked = false;
                                }
                                CounmnIndexdisable++;
                            }

                            // Apply regular border style for cells with data
                            worksheet.Cells[rowIndex, columnIndex + 1].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                            worksheet.Cells[rowIndex, columnIndex + 1].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                            worksheet.Cells[rowIndex, columnIndex + 1].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                            worksheet.Cells[rowIndex, columnIndex + 1].Style.Border.Right.Style = ExcelBorderStyle.Thin;

                            //----------------------------  Lock the Cell
                        }

                        rowIndex++;
                    }
                }


                //int rowIndex = 2;
                //foreach (DataRow row in periodicTable.Rows)
                //{




                //    Row newRow = new Row();




                //    if (row.ItemArray.Any(cellValue => cellValue != DBNull.Value && !string.IsNullOrEmpty(cellValue.ToString())))
                //    {
                //        // Add row only if it has at least one non-empty cell
                //        for (int columnIndex = 0; columnIndex < periodicTable.Columns.Count; columnIndex++)
                //        {
                //            var cell = worksheet.Cells[rowIndex, columnIndex + 1];
                //            var cellValue = row[columnIndex];
                //            var cell3 = newRow.AppendChild(new Cell() { DataType = CellValues.String }); // Set the cell data type to string by default


                //            // Apply regular border style for cells with data
                //            cell.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                //            cell.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                //            cell.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                //            cell.Style.Border.Right.Style = ExcelBorderStyle.Thin;


                //            if (row[columnIndex] != DBNull.Value && double.TryParse(row[columnIndex].ToString(), out double numericValue))
                //            {
                //                // If the value is numeric, set the data type to number and apply a custom number format
                //                cell3.DataType = CellValues.Number;
                //                cell3.CellValue = new CellValue(numericValue.ToString());
                //                cell3.Style.Numberformat.Format = "#,##0.00"; // Customize the number format as needed
                //            }
                //            else
                //            {
                //                // If the value is not numeric, set the value as string
                //                cell3.CellValue = new CellValue(row[columnIndex].ToString());
                //            }






                //           // cell.Value = cellValue;
                //        }
                //        rowIndex++;
                //    }
                //}
                int rowIndex1 =1;
                for (int row = periodicTable.Rows.Count; row < periodicTable.Rows.Count + 200; row++)
                {
                    int colslen = periodicTable.Columns.Count- subjectNames.Length;
                    if (rowIndex1 >= rowIndex)
                    {
                        //insideval = rowIndex1;
                        colslen = 0;

                    }

                    for (int columnIndex =colslen; columnIndex < colslen + 200; columnIndex++)
                    {
                      
                       

                        // Set background color to white for cells starting from the 6th row and 8th column onwards
                        worksheet.Cells[rowIndex1, columnIndex + 1].Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                        worksheet.Cells[rowIndex1, columnIndex + 1].Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.White);
                    }
                    rowIndex1++;
                }
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                // Set print area to cover only the used range
                worksheet.PrinterSettings.RepeatRows = worksheet.Cells["1:1"];
                worksheet.PrinterSettings.RepeatColumns = worksheet.Cells["A:" + GetExcelColumnName(periodicTable.Columns.Count)];

                byte[] fileBytes = package.GetAsByteArray();
                return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Report.xlsx");
            }
        }



        // Helper method to convert column index to Excel column name (A, B, ..., AA, AB, ...)
        private string GetExcelColumnName(int columnIndex)
        {
            int dividend = columnIndex + 1;
            string columnName = "";

            while (dividend > 0)
            {
                int modulo = (dividend - 1) % 26;
                columnName = Convert.ToChar(65 + modulo) + columnName;
                dividend = (dividend - modulo) / 26;
            }

            return columnName;
        }


      

        //======================================================  For Documnt.Openxml

        //public IActionResult ExcelDownload(ResultsModel val)
        //{
        //    // ResultsModel val = new ResultsModel();
        //    string movePath = string.Empty;

        //    if (val != null)
        //    {
        //        string[] subjectNames = val.SubjectsName.Split(',');
        //        ViewBag.SubjectNamesList = subjectNames;
        //        ViewBag.ExamSubjectIdList = val.ExamSubjectIdList;//"HINDI CHECK, UPDATE SUBJECT NAME"; //
        //        ViewBag.MaxMarksList = val.MaxMarksList;
        //        ViewBag.PassMarksList = val.PassMarksList;
        //        InitializeCookieValues();
        //        val.InstanceID = InstanceId;

        //        // Create a new Excel package (XLSX)
        //        movePath = "Report.xlsx"; // Change the file extension to .xlsx for Excel format


        //        Stylesheet stylesheet = new Stylesheet();

        //        // Create a font with bold and red color
        //        Font boldRedFont = new Font(new Bold(), new Color() { Rgb = "000000" });

        //        // Add the font to the stylesheet
        //        stylesheet.Fonts = new Fonts();
        //        stylesheet.Fonts.AppendChild(boldRedFont);


        //        // Create a cell format with the bold red font
        //        CellFormat boldRedCellFormat = new CellFormat() { FontId = 0 , BorderId = 0 }; // FontId is the index of the font in the stylesheet

        //        // Add the cell format to the stylesheet
        //        stylesheet.CellFormats = new CellFormats();
        //        stylesheet.CellFormats.AppendChild(boldRedCellFormat);

        //        Border noBorderStyle = new Border();

        //        // Add the border to the stylesheet
        //        stylesheet.Borders = new Borders();
        //        stylesheet.Borders.AppendChild(noBorderStyle);

        //        CellFormat noBorderCellFormat = new CellFormat() { BorderId = 0 }; // BorderId is the index of the border in the stylesheet

        //        // Add the cell format to the stylesheet
        //        stylesheet.CellFormats.AppendChild(noBorderCellFormat);


        //        using (SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.Create(movePath, SpreadsheetDocumentType.Workbook))
        //        {

        //            WorkbookPart workbookPart = spreadsheetDocument.AddWorkbookPart();
        //            workbookPart.Workbook = new Workbook();
        //            //WorkbookPart workbookPart = spreadsheetDocument.AddWorkbookPart();
        //            //workbookPart.Workbook = new Workbook();
        //          //  workbookPart.AddNewPart<WorkbookStylesPart>().Stylesheet = stylesheet;

        //            WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
        //            worksheetPart.Worksheet = new Worksheet(new SheetData());

        //            Sheets sheets = workbookPart.Workbook.AppendChild(new Sheets());
        //            Sheet sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Report" };
        //            sheets.Append(sheet);

        //            // Create a DataTable and populate it with your data
        //            List<UsermarksModel> list = CommonMethodobj.CommonListMethod<ResultsModel, UsermarksModel>(val, "/DataGettingforExcel", client);
        //            DataTable periodicTable = GetDataTable_OpenExcelFormat(list, val.SubjectsName);

        //            // Add headers to the worksheet
        //            SheetData sheetData = worksheetPart.Worksheet.GetFirstChild<SheetData>();
        //            Row headerRow = new Row();

        //            foreach (DataColumn col in periodicTable.Columns)
        //            {
        //                Cell headerCell = new Cell()
        //                {
        //                    DataType = CellValues.String,
        //                    CellValue = new CellValue(col.ColumnName),
        //                    StyleIndex = 1
        //                };
        //                headerRow.Append(headerCell);
        //            }
        //            sheetData.Append(headerRow);


        //            foreach (DataRow row in periodicTable.Rows)
        //            {
        //                Row newRow = new Row();

        //                // Use the GenerateBorder method to create the border style
        //                //  Border borderStyle = GenerateBorder();

        //                foreach (var item in row.ItemArray)
        //                {
        //                    Cell cell = new Cell()
        //                    {
        //                        DataType = CellValues.String,
        //                        CellValue = new CellValue(item.ToString()),
        //                        StyleIndex = 100
        //                        //  StyleIndex = AddCellStyle(worksheetPart, borderStyle)
        //                    };
        //                    newRow.Append(cell);
        //                }
        //                sheetData.Append(newRow);
        //            }





        //            //  Add data rows to the worksheet

        //            foreach (DataRow row in periodicTable.Rows)
        //            {
        //                Row newRow = new Row();
        //                foreach (var item in row.ItemArray)
        //                {
        //                    Cell cell = new Cell()
        //                    {
        //                        DataType = CellValues.String,
        //                        CellValue = new CellValue(item.ToString())
        //                    };
        //                    newRow.Append(cell);
        //                }
        //                sheetData.Append(newRow);
        //            }

        //            SetColumnWidth(worksheetPart, 1, 10);
        //            SetColumnWidth(worksheetPart, 2, 25);

        //            // Set the width for all columns
        //            for (int columnIndex = 2; columnIndex < periodicTable.Columns.Count; columnIndex++)
        //            {
        //                SetColumnWidth(worksheetPart, columnIndex + 1, 10); // Set the width to 25 for all columns
        //            }



        //            workbookPart.AddNewPart<WorkbookStylesPart>().Stylesheet = stylesheet;

        //            // Save the changes
        //            workbookPart.Workbook.Save();
        //        }
        //    }
        //    byte[] fileBytes = System.IO.File.ReadAllBytes(movePath);
        //    return File(fileBytes, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Report.xlsx");


        //}
        public DataTable GetDataTable_OpenExcelFormat(List<UsermarksModel> value,string names)
        {
            DataTable periodicTable = new DataTable();
            string[] subjectNames = names.Split(',');
            try
            {
               // periodicTable.Columns.Add("S.No", typeof(string));
                periodicTable.Columns.Add("User Id", typeof(string));
                periodicTable.Columns.Add("Name", typeof(string));
                periodicTable.Columns.Add("Reg.No", typeof(string));

                for(int m=0;m<subjectNames.Length;m++)
                {
                    periodicTable.Columns.Add(subjectNames[m], typeof(string));
                }
                for(int m=0;m<subjectNames.Length;m++)
                {
                    periodicTable.Columns.Add(subjectNames[m]+"Test", typeof(string));
                }


               // DataRow dr;
                int i = 0;
                int subjectlength = subjectNames.Length;
                foreach (var item in value)
                {
                    i = 3;
                    DataRow dr = periodicTable.NewRow();

                   // dr = periodicTable.Rows.Add();
                    //dr[0] = "" + i.ToString();
                    dr[0] = item.UserId;
                    dr[1] = item.Name;
                    dr[2] = item.InstanceUserCode;
                    for(int k = 0; k < subjectlength; k++)
                    {
                            dr[k + 3] = item.Columns[k];
                        i++;
                    }
                    for(int k = 0; k < subjectlength; k++)
                    {
                            dr[k + i] = item.OptionalSubject[k];
                    }
                    periodicTable.Rows.Add(dr);



                }
            }
            catch (Exception ex)
            {
               // logTrace.logError("PopulationManagementController  && PopulationManagementDataServicesDataProvider", "GetDataTable_VillagePopulation", ex.StackTrace.ToString(), "");
            }
            return periodicTable;
        }

        //// Ward Export
        //public string ExportToExcelWardPopulationExcelData_OpenExcelFormat(List<WardPopulationDto> value, string fileName)
        //{
        //    string movePath = string.Empty;

        //    if (value != null)
        //    {
        //        movePath = projpath + fileName;

        //        // Create a new Excel package (XLSX)
        //        using (SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.Create(movePath, SpreadsheetDocumentType.Workbook))
        //        {
        //            WorkbookPart workbookPart = spreadsheetDocument.AddWorkbookPart();
        //            workbookPart.Workbook = new Workbook();

        //            WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
        //            worksheetPart.Worksheet = new Worksheet(new SheetData());

        //            Sheets sheets = workbookPart.Workbook.AppendChild(new Sheets());
        //            Sheet sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Ward" };
        //            sheets.Append(sheet);

        //            // Create a DataTable and populate it with your data
        //            DataTable periodicTable = GetDataTable_WardPopulation_OpenExcelFormat(value);

        //            // Add headers to the worksheet
        //            SheetData sheetData = worksheetPart.Worksheet.GetFirstChild<SheetData>();
        //            Row headerRow = new Row();

        //            for (int columnIndex = 0; columnIndex < periodicTable.Columns.Count; columnIndex++) // Exclude the last column
        //            {
        //                DataColumn col = periodicTable.Columns[columnIndex];
        //                Cell headerCell = new Cell()
        //                {
        //                    DataType = CellValues.String,
        //                    CellValue = new CellValue(col.ColumnName)
        //                };
        //                headerRow.Append(headerCell);
        //            }

        //            sheetData.Append(headerRow);

        //            // Add data rows to the worksheet
        //            foreach (DataRow row in periodicTable.Rows)
        //            {
        //                Row newRow = new Row();
        //                for (int columnIndex = 0; columnIndex < periodicTable.Columns.Count; columnIndex++) // Exclude the last column
        //                {
        //                    Cell cell = new Cell()
        //                    {
        //                        DataType = CellValues.String,
        //                        CellValue = new CellValue(row[columnIndex].ToString())
        //                    };
        //                    newRow.Append(cell);
        //                }
        //                sheetData.Append(newRow);
        //            }

        //            // Set the width for all columns
        //            for (int columnIndex = 0; columnIndex < periodicTable.Columns.Count; columnIndex++)
        //            {
        //                SetColumnWidth(worksheetPart, columnIndex + 2, 25); // Set the width to 20 for all columns
        //            }

        //            // Hide the "Wardid" column
        //            int indexwardId = periodicTable.Columns.IndexOf("Wardid");
        //            if (indexwardId > -1)
        //            {
        //                SetColumnWidth(worksheetPart, indexwardId + 1, 0); // Hide the "Wardid" column
        //            }

        //            // Save the changes
        //            workbookPart.Workbook.Save();
        //        }
        //    }

        //    return movePath;
        //}
        //public DataTable GetDataTable_WardPopulation_OpenExcelFormat(List<WardPopulationDto> value)
        //{
        //    DataTable periodicTable = new DataTable("PeriodicTable");
        //    try
        //    {
        //        periodicTable.Columns.Add("S.No", typeof(string));
        //        periodicTable.Columns.Add("District Name", typeof(string));
        //        periodicTable.Columns.Add("City Name", typeof(string));
        //        periodicTable.Columns.Add("Ward Name", typeof(string));
        //        periodicTable.Columns.Add("Total pop", typeof(string));
        //        periodicTable.Columns.Add("Wardid", typeof(string));

        //        DataRow dr;
        //        int i = 0;
        //        foreach (var item in value)
        //        {
        //            i = i + 1;
        //            dr = periodicTable.Rows.Add();
        //            dr[0] = "" + i.ToString();
        //            dr[1] = item.district_name;
        //            dr[2] = item.city_name;
        //            dr[3] = item.wardname;
        //            dr[4] = item.totalpop;
        //            dr[5] = Cryptography.WEncrypt(Convert.ToString(item.ward_id));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        logTrace.logError("PopulationManagementController  && PopulationManagementDataServicesDataProvider", "GetDataTable_WardPopulation", ex.StackTrace.ToString(), "");
        //    }
        //    return periodicTable;
        //}

        // Village and Ward common method
        //private void SetColumnWidth(WorksheetPart worksheetPart, int columnIndex, double columnWidth)
        //{
        //    Columns columns = worksheetPart.Worksheet.GetFirstChild<Columns>();
        //    if (columns == null)
        //    {
        //        columns = new Columns();
        //        worksheetPart.Worksheet.InsertBefore(columns, worksheetPart.Worksheet.GetFirstChild<SheetData>());
        //    }

        //    Column column = new Column() { Min = (uint)columnIndex, Max = (uint)columnIndex, Width = columnWidth, CustomWidth = true };
        //    columns.Append(column);
        //}

        //private static void HideRowsAndColumns(WorksheetPart worksheetPart, int totalRows, int totalColumns)
        //{
        //    // Hide remaining rows (if any)
        //    for (int rowIndex = totalRows + 1; rowIndex <= 1048576; rowIndex++)
        //    {
        //        Row row = new Row() { Hidden = true, OutlineLevel = 0, DyDescent = 0.25D, Collapsed = false };
        //        worksheetPart.Worksheet.GetFirstChild<SheetData>().Append(row);
        //    }

        //    // Hide remaining columns (if any)
        //    for (int columnIndex = totalColumns + 1; columnIndex <= 16384; columnIndex++)
        //    {
        //        Column column = new Column() { Min = (UInt32)columnIndex, Max = (UInt32)columnIndex, Hidden = true };
        //        worksheetPart.Worksheet.GetFirstChild<Columns>().Append(column);
        //    }
        //}



        #endregion Population Management File Export end
        #endregion


        // -------------------=====================   POST RESULTS By Excel ===============================
        #region
        public IActionResult PostResultsByExcel()
        {
            return View();
        }

        [HttpPost]
        public IActionResult PostResultsByExcel(ResultsModel obj)
        {
            try
            {
                InitializeCookieValues();
                obj.InstanceID = InstanceId;
                obj.CreatedBy = LoginUserId;
                obj.UserId = LoginUserId;
                obj.RoleId = Roleid;
                // obj.ExamModeId = 0;//i gave default for @IsRetest
                if (obj.ExamModeId == 2)
                    obj.ExamModeId = 1;
                else
                    obj.ExamModeId = 0;
                obj.SMSTextInXML = @"<?xml version=""1.0"" encoding=""ISO-8859-1""?>
<!DOCTYPE REQUESTCREDIT SYSTEM ""http://127.0.0.1/psms/dtd/requestcredit.dtd"">
<REQUESTCREDIT USERNAME=""ADS"" PASSWORD=""Prasad2$$9""></REQUESTCREDIT>";
                obj.SMSFromText = "ADSTEK";
                obj.Action = "credits";//send   i gave default

                returnvalue = CommonMethodobj.CommonSaveMethod(obj, "/PostResults", client);

                //var jsonResponse = JsonConvert.DeserializeObject<dynamic>(returnvalue);

                //// Extract specific fields
                //string errorMSG = jsonResponse.ErrorMSG;
                //string id = jsonResponse.id;
                if (returnvalue != "0")
                {
                    return Json(new { success = true, message = returnvalue });
                }
                else
                {
                    return Json(new { success = false, message = "Something Error" });
                }
            }
            catch (Exception ex)
            {
                // throw;
                return Json(new { success = false, message = "Something Error" });
            }
        }



        #endregion





    }
}
