using Connect4m_Web.Models;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static Connect4m_Web.Models.Attendenceproperites.UserScreen;

namespace Connect4m_Web.Controllers
{
    public class UserScreens : Controller
    {

        // Uri baseaddress = new Uri("https://localhost:44331/api/UsersScreens");
        // HttpClient client;

        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        public UserScreens(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/UsersScreens");
        }


        public IActionResult SchoolWelcomePage()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instanceid = InstanceId;

            var UserId = Request.Cookies["LoginUserId"];
            ViewBag.LoginUserId = UserId;

            List<ENoticeByNoticeType> item = new List<ENoticeByNoticeType>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_ENotice_SelectByNoticeType?InstanceId=" + InstanceId + "&UserId=" + UserId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<ENoticeByNoticeType>>(data);
            }
            ViewBag.items = item[0].CategoryName;
            ViewBag.itemss = item[1].CategoryName;
            return View();
        }

        //----------------------------------------------------
    


        //Created by rk
        public IActionResult RoleMenulist()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var UserId = Request.Cookies["LoginUserId"];

            List<LoginDetailsListModel> Value2 = new List<LoginDetailsListModel>();
            using (var tempClient = _httpClientFactory.CreateClient())
            {
                string originalBaseAddress = client.BaseAddress.ToString();
                tempClient.BaseAddress = new Uri(originalBaseAddress.Replace("/UsersScreens", "/ApplyStudentAttendance"));

                LoginModel val = new LoginModel();
                val.UserId = Convert.ToInt32(UserId);
                val.RoleId = Convert.ToInt32(Request.Cookies["Roleid"]);
                val.InstanceID = Convert.ToInt32(InstanceId);
                string data11 = JsonConvert.SerializeObject(val);
                StringContent content = new StringContent(data11, Encoding.UTF8, "application/json");
                //  HttpResponseMessage response1 = client.PostAsync(client.BaseAddress + "/RoleMenuList", content).Result;
                HttpResponseMessage response1 = tempClient.PostAsync(tempClient.BaseAddress + "/RoleMenuList", content).Result;
                if (response1.IsSuccessStatusCode)
                {
                    string data1 = response1.Content.ReadAsStringAsync().Result;
                    Value2 = JsonConvert.DeserializeObject<List<LoginDetailsListModel>>(data1);
                    //  Value2.GroupBy(x => x.RoleMenuByRoleId[0].ParentMenuId);
                    // Value2.Add(new LoginDetailsListModel { RoleMenuByRoleId = new List<LoginModel>() { Value2.GroupBy(item => item.RoleMenuByRoleId.GroupBy(item2 => item2.MenuUrl != null)) } };

                    //            Value2.Add(new LoginDetailsListModel
                    //            {
                    //                RoleMenuByRoleId = Value2
                    //.GroupBy(item => item.RoleMenuByRoleId.Any(item2 => item2.MenuUrl != null))
                    //.Select(group => new LoginModel()) // Replace LoginModel with the actual type
                    //.ToList()
                    //            });


                    //  Value2[0].RoleMenuByRoleId = Value2.GroupBy(item => item.RoleMenuByRoleId.GroupBy(item2 => item2.MenuUrl != null));
                    // ViewBag.SideHeaderValues = Value2[0].RoleMenuByRoleId;
                    // ViewBag.SideHeaderValues = Value2;
                }
            }
            return Json(Value2);
        }





        [HttpGet]
        public IActionResult Coollinks(int InstanceId)
        {
            List<CoolLinks> item = new List<CoolLinks>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_coollinks?InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;               
                item = JsonConvert.DeserializeObject<List<CoolLinks>>(data);
            }
            item = item.OrderBy(link => link.LinkName).ToList();
            return PartialView("_Coollinks", item);
          
        }
        [HttpGet]
        public IActionResult FlashNews(int InstanceId, int UserId)
        {
            List<NoticeTypes> item = new List<NoticeTypes>();
            string ENoticeType = "Flash News";
            int IsGlobalNotice = 0;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_FlashNews?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId+ "&IsGlobalNotice="+ IsGlobalNotice).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
            }        
            return PartialView("_FlashNews", item);

        }

        public IActionResult E_Noticeboard(int InstanceId, int UserId,string ENoticeType,string IsGlobalNotice)
        {
            List<NoticeTypes> item = new List<NoticeTypes>();
            //string ENoticeType = "Flash News";
           // int IsGlobalNotice = 0;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/USP_FlashNews?InstanceId=" + InstanceId + "&ENoticeType=" + ENoticeType + "&UserId=" + UserId + "&IsGlobalNotice=" + IsGlobalNotice).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<NoticeTypes>>(data);
            }           
            return View();
        }

    }
}
