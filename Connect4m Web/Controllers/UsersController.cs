using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Connect4m_Web.Models;
using Microsoft.AspNetCore.Authorization;
using Connect4m_Web.Models.LMSproperties;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Connect4m_Web.Views;

namespace Connect4m_Web.Controllers
{
    //[Authorize]
    public class UsersController : Controller
    {
        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        private readonly IUserService _userService;
        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)
        
        private readonly int UserId;
        private readonly int InstanceId;
        private readonly int InstanceClassificationId;
        private readonly int InstanceSubClassificationId;
        private readonly int Roleid;
        private readonly int StudentUserid;

        CommanMethodClass CommonMethodobj = new CommanMethodClass();

        public UsersController(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/Users");

            //=======================================================
            _userService = userService;

            //InstanceId = _userService.InstanceId;
            //UserId = _userService.LoginUserId;
            //InstanceClassificationId = _userService.InstanceClassificationId;
            //Roleid = _userService.Roleid;
            //StudentUserid = _userService.StudentUserid;
       
            InstanceId = 545;
            UserId = 32891;
            InstanceClassificationId = 806;
            InstanceSubClassificationId = 1171;
            Roleid = 773;
            StudentUserid = 0;
        }

        //=---------------========Manage Users Screen ================

        public IActionResult TblUsersSearch(ManageUsersModel obj)
        {
           // InitializeCookieValues();
            obj.InstanceID = InstanceId;
            List<ManageUsersModel> list = CommonMethodobj.CommonListMethod<ManageUsersModel, ManageUsersModel>(obj, "/TblUsersSearch", client);
            return Json(list);
        }




        public IActionResult ManageUsers()
        {
            //if (url != null)
            //{
               // ViewBag.url = "ManageUsers";
                ViewBag.url = "UserSearchTab";
           // }

            return View(); 
        }
        [HttpPost]
        public IActionResult ManageUsers(ManageUsersModel val)
        {
            return View();
        }

        public IActionResult UserSearchTab()
        {
            //--------------------------  Gettting Salary Attrubute  Master Id  Droppdown
            List<SelectListItem> SalaryAttributeMasterId = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SalaryAttributes?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                SalaryAttributeMasterId = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SalaryAttributeMasterId = SalaryAttributeMasterId;
            //--------------------------  Gettting Salary Attrubute Type is Droppdown
            List<SelectListItem> SalaryAttributeType = new List<SelectListItem>();
            HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/SalaryType").Result;
            if (response2.IsSuccessStatusCode)
            {
                string data = response2.Content.ReadAsStringAsync().Result;
                SalaryAttributeType = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SalaryAttributeType = SalaryAttributeType;
            //--------------------------  Data Add for  Is Active
            List<SelectListItem> IsActive = new List<SelectListItem>
{
    new SelectListItem
    {
        Value = "1",
        Text = "True"
    },
    new SelectListItem
    {
        Value = "2",
        Text = "False"
    }
};

            ViewBag.IsActive = IsActive;

            return View();
        }

    }
}
