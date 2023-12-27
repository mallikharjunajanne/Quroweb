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

        //--------------->>>>>>>>>>>>>========Manage Users Screen ==============<<<<<<<<<<<<<<<<<<<<==
        //===========================Searched Users details in table
        public IActionResult TblUsersSearch(ManageUsersModel obj)
        {
            // InitializeCookieValues();
           // obj.TcTaken = 1;//i gave default
            obj.InstanceID = InstanceId;
            List<ManageUsersModel> list = CommonMethodobj.CommonListMethod<ManageUsersModel, ManageUsersModel>(obj, "/TblUsersSearch", client);
            return Json(list.OrderBy(x => x.FirstName).ToList());
        }
        //===========================Search Users details 

        //not using
        public IActionResult UserSearchTab(DropdownClass val)
        {
            val.InstanceID = InstanceId;
            List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
            List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);
            List<DropdownClass> DdlPickUpRoute = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpRoute_Calingfunction", client);
            ViewBag.DdlInstanceRole = DdlInstanceRole.OrderBy(x => x.Text).ToList();
            ViewBag.DdlDesignation = DdlDesignation.OrderBy(x => x.Text).ToList();
            ViewBag.DdlPickUpRoute = DdlPickUpRoute.OrderBy(x => x.Text).ToList();
            return View();
        }


        public IActionResult CreateUsers(DropdownClass val)
        {
            ViewBag.url = "GeneralInfoTab";
            return View();
        }
        public IActionResult GeneralInfoTab(DropdownClass val)
        {
            ViewBag.url = "GeneralInfoTab";
            val.InstanceID = InstanceId;
            List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
            List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);
            List<DropdownClass> DdlPickUpRoute = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpRoute_Calingfunction", client);
            ViewBag.DdlInstanceRole = DdlInstanceRole.OrderBy(x => x.Text).ToList();
            ViewBag.DdlDesignation = DdlDesignation.OrderBy(x => x.Text).ToList();
            ViewBag.DdlPickUpRoute = DdlPickUpRoute.OrderBy(x => x.Text).ToList();
            return View();
        }
        public IActionResult PreviousSchoolInformationTab(DropdownClass val)
        {
            ViewBag.url = "GeneralInfoTab";
            val.InstanceID = InstanceId;
            List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
            List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);
            List<DropdownClass> DdlPickUpRoute = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpRoute_Calingfunction", client);
            ViewBag.DdlInstanceRole = DdlInstanceRole.OrderBy(x => x.Text).ToList();
            ViewBag.DdlDesignation = DdlDesignation.OrderBy(x => x.Text).ToList();
            ViewBag.DdlPickUpRoute = DdlPickUpRoute.OrderBy(x => x.Text).ToList();
            return View();
        }
        public IActionResult ParentDetailsTab(DropdownClass val)
        {
            ViewBag.url = "GeneralInfoTab";
            val.InstanceID = InstanceId;
            List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
            List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);
            List<DropdownClass> DdlPickUpRoute = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpRoute_Calingfunction", client);
            ViewBag.DdlInstanceRole = DdlInstanceRole.OrderBy(x => x.Text).ToList();
            ViewBag.DdlDesignation = DdlDesignation.OrderBy(x => x.Text).ToList();
            ViewBag.DdlPickUpRoute = DdlPickUpRoute.OrderBy(x => x.Text).ToList();
            return View();
        }
        public IActionResult EducationDetailsTab(DropdownClass val)
        {
            ViewBag.url = "GeneralInfoTab";
            val.InstanceID = InstanceId;
            List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
            List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);
            List<DropdownClass> DdlPickUpRoute = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpRoute_Calingfunction", client);
            ViewBag.DdlInstanceRole = DdlInstanceRole.OrderBy(x => x.Text).ToList();
            ViewBag.DdlDesignation = DdlDesignation.OrderBy(x => x.Text).ToList();
            ViewBag.DdlPickUpRoute = DdlPickUpRoute.OrderBy(x => x.Text).ToList();
            return View();
        }
        public IActionResult DdlPickUpStop_Calingfunction(DropdownClass val,int RouteId)
        {
               val.Id = RouteId;
            List<DropdownClass> DdlPickUpStop = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpStop_Calingfunction", client);
            return Json(DdlPickUpStop.OrderBy(x => x.FirstName).ToList());
        }

        public IActionResult ManageUsers(DropdownClass val)
        {
            //if (url != null)
            //{
               // ViewBag.url = "ManageUsers";
                ViewBag.url = "UserSearchTab";
            // }
            val.InstanceID = InstanceId;
            List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
            List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);
            List<DropdownClass> DdlPickUpRoute = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpRoute_Calingfunction", client);
            ViewBag.DdlInstanceRole = DdlInstanceRole.OrderBy(x => x.Text).ToList();
            ViewBag.DdlDesignation = DdlDesignation.OrderBy(x => x.Text).ToList();
            ViewBag.DdlPickUpRoute = DdlPickUpRoute.OrderBy(x => x.Text).ToList();
            return View(); 
        }
        [HttpPost]
        public IActionResult ManageUsers(ManageUsersModel val)
        {
            return View();
        }

       
    }
}
