using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Secured.Controllers
{
    public class SpaController : Controller
    {
        public ActionResult Index()
        {            
            return View();
        }
    }
}
