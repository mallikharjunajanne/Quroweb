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

        public IActionResult DdlExams_Callingfunction(ResultsModel obj)
        {
            InitializeCookieValues();
            obj.InstanceID = InstanceId;
            obj.InstanceSubClassificationId = InstanceSubClassificationId;
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

        public IActionResult TblExamSubjects_Calingfunction(ResultsModel obj)
        {
            try
            {
                InitializeCookieValues();
                obj.InstanceID = InstanceId;
                List<MultiplelistValues> list = CommonMethodobj.CommonListMethod<ResultsModel, MultiplelistValues>(obj, "/TblExamSubjects_Calingfunction", client);
                // list = list.OrderBy(x => x.SubjectName).ToList();
                // ViewBag.ResultsModeList = list[0].ResultsModeList;
                return Json(list[0]?.ExamSubjectsList ?? new List<ResultsModel>());
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
                if (MarksUploadtype == "UploadWithOutExcelFile" || Nextstep == "Step3")
                {
                    string[] SubjectNames = val.SubjectsName.Split(',');
                    ViewBag.SubjectNamesList = SubjectNames;
                    ViewBag.ExamSubjectIdList = val.ExamSubjectIdList;
                    ViewBag.MaxMarksList = val.MaxMarksList;
                    ViewBag.PassMarksList = val.PassMarksList;
                    InitializeCookieValues();
                    val.InstanceID = InstanceId;
                    List<MultiplelistValues> list = CommonMethodobj.CommonListMethod<ResultsModel, MultiplelistValues>(val, "/TblStudentsName_Calingfunction", client);
                    ViewBag.MarksUploadtype = MarksUploadtype;
                    ViewBag.colours = list?.FirstOrDefault()?.UsermarksList[0].IsPublished;
                    ViewBag.UsersDetailsList = list?.FirstOrDefault()?.UsermarksList ?? new List<UsermarksModel>();
                    return View();
                }
                else
                {
                    ViewBag.UsersDetailsList =new List<UsermarksModel>();

                    ViewBag.MarksUploadtype = MarksUploadtype;
                    return View();
                }
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
        public IActionResult PublishResults(ResultsModel obj)
        {
            try
            {
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


    }
}
