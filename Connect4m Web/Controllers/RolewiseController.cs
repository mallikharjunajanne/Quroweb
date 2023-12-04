using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Connect4m_Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Connect4m_Web.Controllers
{
    public class RolewiseController : Controller
    {
        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        public RolewiseController(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/Roles");


        }

        int InstanceId = 545; public int UserId = 32891;


        //--------------------------------  Search Rolewise--menu
        public IActionResult SearchRolewise()
        {
            return View();
        }

        public IActionResult SearchRoles(string RoleName, string RoleDescription)
        {
            /// int InstanceId =Convert.ToInt32(Request.Cookies["INSTANCEID"]);
            List<RoleProp> list = new List<RoleProp>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/SearchRole?InstanceId=" + InstanceId + "&RoleName=" + RoleName + "&RoleDescription=" + RoleDescription).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<RoleProp>>(data);
            }
            return Json(list);
        }

        //----------------------------  Delete  Roles
        public IActionResult DeleteRole(int InstanceRoleId)
        {
            HttpResponseMessage response4 = client.GetAsync(client.BaseAddress + "/DeleteRoles?InstanceRoleId=" + InstanceRoleId).Result;
            if (response4.IsSuccessStatusCode)
            {
                string data = response4.Content.ReadAsStringAsync().Result;
                int list4 = JsonConvert.DeserializeObject<int>(data);
                return Json(list4);
            }
            return Json(0);
        }


        //------------------------------------------------------------- --------------------------------------  Create Role
        public IActionResult CreateRole(int InstanceRoleId)
        {

            List<RoleMenu> list = new List<RoleMenu>();
            ParentRoleMenu parentlist = new ParentRoleMenu();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/CreateRole?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<RoleMenu>>(data);
                // var groupedByParentId =  list.GroupBy(item => item.ParentMenuId);


            }
            if (InstanceRoleId != 0)
            {
                HttpResponseMessage response2 = client.GetAsync(client.BaseAddress + "/GetUpdate?InstanceRoleId=" + InstanceRoleId + "&InstanceId=" + InstanceId).Result;
                if (response2.IsSuccessStatusCode)
                {
                    string data = response2.Content.ReadAsStringAsync().Result;
                    parentlist = JsonConvert.DeserializeObject<ParentRoleMenu>(data);

                    ViewBag.item3 = parentlist.Secondtable;

                    list = list.Select(item =>
                    {
                        var matchingItem = parentlist.Secondtable.FirstOrDefault(x => x.InstanceMenuId == item.InstanceMenuId);
                        if (matchingItem != null)
                        {
                            item.Ischecked = 1;
                        }
                        return item;
                    }).ToList();


                }
            }
            var groupedByParentId = list.GroupBy(item => item.ParentMenuId != "");

            ViewBag.item1 = groupedByParentId.FirstOrDefault();

            ViewBag.item2 = groupedByParentId.ElementAt(1);
            if (InstanceRoleId != 0)
            {
                RoleProp new1 = parentlist.FirstTable[0];
                return View(new1);
            }
            return View();

        }
        [HttpPost]
        public IActionResult CreateRole(RoleProp obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string commaSeparatedIds = string.Join(",", obj.AuthMenuIds);

            string jsonData = JsonConvert.SerializeObject(obj);
            Response.Cookies.Append("MenuId_Display", commaSeparatedIds);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response;
            if (obj.InstanceRoleId != 0)
            {
                response = client.PostAsync(client.BaseAddress + "/UpdateRoles", content).Result;
            }
            else
            {
                response = client.PostAsync(client.BaseAddress + "/InsertRoles", content).Result;
            }
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list3 = JsonConvert.DeserializeObject<int>(data);
                if (obj.InstanceRoleId != 0)
                {
                    Response.Cookies.Append("Roleid_Display", obj.InstanceRoleId.ToString());

                }
                else
                {
                    Response.Cookies.Append("Roleid_Display", list3.ToString());

                }
                return Json(list3);
            }

            return Json(0);
        }

        public IActionResult RoleAvailabilty(string RoleName, int RoleId)
        {
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/RoleAvailabilty?InstanceId=" + InstanceId + "&RoleName=" + RoleName + "&RoleId=" + RoleId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                string retur = JsonConvert.DeserializeObject<string>(data);
                return Json(retur);
            }
            return Json(0);
        }
        [HttpGet]
        public IActionResult DisplayOrder(int i)
        {
            return View();
        }
        [HttpPost]
        public IActionResult DisplayOrder()
        {
            List<RoleMenu> list = new List<RoleMenu>();
            AftercreteRole obj = new AftercreteRole();
            obj.InstanceId = InstanceId;
            obj.Roleid = Request.Cookies["Roleid_Display"];
            obj.MenuId = Request.Cookies["MenuId_Display"];
            string jsondata = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsondata, Encoding.UTF8, "application/json");


            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/AfterCreateRole", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<RoleMenu>>(data);
                return Json(list);
            }
            return Json(list);



        }
        [HttpPost]

        public IActionResult UpdateDisplayOrder(RoleMenu obj)
        {
            obj.CreatedBy = UserId;
            obj.InstanceId = InstanceId;
            obj.RoleId = Convert.ToInt32(Request.Cookies["Roleid_Display"]);
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/UpdateDisplayOrder", content).Result;
            //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/AfterCreateRole?InstanceId=" + InstanceId + "&Roleid=" + Request.Cookies["Roleid_Display"] + "&MenuId=" + Request.Cookies["MenuId_Display"]).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                int list = JsonConvert.DeserializeObject<int>(data);
                return Json(list);
            }

            return Json(0);
        }






    }
}
