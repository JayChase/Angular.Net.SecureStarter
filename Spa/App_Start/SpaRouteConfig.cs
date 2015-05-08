using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(Spa.App_Start.SpaRouteConfig), "RegisterRoutes")]
namespace Spa.App_Start
{
    
    public class SpaRouteConfig
    {
        public static void RegisterRoutes()
        {
            var routes = RouteTable.Routes;

            //will stop mvc trying to route to thr physical app folder
            routes.RouteExistingFiles = true;

            routes.MapRoute(
               name: "Spa",
               url: "spa/{*all}",
               defaults: new { controller = "spa", action = "Index", id = UrlParameter.Optional });
        }
    }
}
