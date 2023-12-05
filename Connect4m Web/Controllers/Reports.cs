using Microsoft.AspNetCore.Mvc;
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



        //public Reports()
        //{
        //    client = new HttpClient();
        //    client.BaseAddress = baseAddress;
        //}
        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        public Reports(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/AttendanceCtr");
        }



        [HttpGet]
        public IActionResult StudentAttendanceRegister()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var UserId = Request.Cookies["LoginUserId"];

            List<SelectListItem> List = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Str_Classification_DD?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data1 = Response.Content.ReadAsStringAsync().Result;
                List = JsonConvert.DeserializeObject<List<SelectListItem>>(data1);
            }
            ViewBag.Slot_Subjectnames = List;
            return View();
        }

        [HttpGet]
        public IActionResult Get_SClNames_ByInsCl(string InstanceId, string InstanceClassificationId)
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
    
        [HttpPost]
        public IActionResult StudentAttendanceRegister(StudentAttendanceRegister obj)
        {
            //try
            //{


                var instanceid = Request.Cookies["INSTANCEID"];

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/St_At_Reports?InstanceID=" + instanceid + "&Month=" + obj.Month + "&Year=" + obj.Year + "&InstanceClassificationId=" + obj.InstanceClassificationId + "&InstanceSubClassificationId=" + obj.InstanceSubClassificationId, content).Result;


            AttendanceReportData reportData = new AttendanceReportData();



            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                reportData = JsonConvert.DeserializeObject<AttendanceReportData>(data2);
            }


            //if (response.IsSuccessStatusCode)
            //{
            //    var data2 = response.Content.ReadAsStringAsync().Result;

            //    reportData = JsonConvert.DeserializeObject<AttendanceReportData>(data2);
            //}
            // ViewBag.Reportlist = liitems;
            //ViewBag.MyData = Newtonsoft.Json.JsonConvert.SerializeObject(liitems);

            ViewBag.Reportlist = reportData.AttendanceList;
            ViewBag.AttendanceAverage = reportData.AttendanceAverage;
            ViewBag.Stu_wises = reportData.Stu_wise;
            ViewBag.StuAtd_Tbl2 = reportData.Stu_Atd_tbl2;
            ViewBag.M_Stuabs = reportData.M_Stuabs;


            return Json(reportData);
        }

        /*---Fee Challana Reports Action Method Code Start---*/
       
        public IActionResult FeeReceiptNew()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            return View();
        }

        public IActionResult FR_SubClassiFication_DD()
        {
            var instanceid = Request.Cookies["INSTANCEID"];
            
            List<SelectListItem> value1 = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_FR_SubClassificationNames?InstanceId=" + instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value1 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SubClassificationNames = value1;

            return View();
        }


        /*---Fee Challana Reports Action Method Code End---*/
    }
}
