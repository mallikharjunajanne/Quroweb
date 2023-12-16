using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Controllers
{
    public class ManageUsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
