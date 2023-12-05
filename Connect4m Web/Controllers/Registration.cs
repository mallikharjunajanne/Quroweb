using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Connect4m_Web.Models.Attendenceproperites;
using System;
using System.Collections.Generic;
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

    public class Registration : Controller
    {
        // Uri baseAddress = new Uri("https://localhost:44331/api/Attendance");
        //Uri baseAddress = new Uri("http://192.168.1.142:98/api/FeeSctionCtr");
       // HttpClient client;


        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        public Registration(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/Attendance");
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Register()
        {   
            return View();
        }
        [HttpPost]
        public IActionResult Register(Stu_registration registration)
        {
            string data = JsonConvert.SerializeObject(registration);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/insert_Table", content).Result;
         
            return View();
        }

        

    }
}
