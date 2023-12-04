using Connect4m_Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.IO;
using System.Linq;


using System.Threading.Tasks;

namespace Connect4m_Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Trail1()
        {
            return View();
        }
        public IActionResult Trail2()
        {
            return View();
        }
        public IActionResult Trail3()
        {
            return View();
        }
        public IActionResult Trail4()
        {
            return View();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]

        public IActionResult Privacy(ContactForm model)
        {
            if (ModelState.IsValid)
            {
                // Process the form data (e.g., send an email)
                return RedirectToAction("Index");
            }

            return View("Trail1"); 
           
        }

        public class ContactForm
        {
            [Required]
            public string Name { get; set; }

            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public string Message { get; set; }
        }

        public IActionResult GetThumbnail()
        {
            return View();
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
