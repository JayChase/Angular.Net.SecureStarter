using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Routing;
using System.Web.Mvc;
using System.Web.Routing;

[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(Secured.App_Start.SecuredServerWebApiConfig), "Start")]
namespace Secured.App_Start
{

    public class SecuredServerWebApiConfig
    {

        public static void Start()
        {
            GlobalConfiguration.Configure(Register);
        }


        public static void Register(HttpConfiguration config)
        {
                        
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Use camel case for JSON data.
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // If MapHttpAttributeRoutes has not been called then do so now
            IHttpRoute attributerouteWebApiRoute;
            config.Routes.TryGetValue("MS_attributerouteWebApi", out attributerouteWebApiRoute);

            if (attributerouteWebApiRoute == null)
            {
                config.MapHttpAttributeRoutes();
            }

            // If default api route has not been added then do so now
            IHttpRoute defaultApiRoute;
            config.Routes.TryGetValue("DefaultApi", out defaultApiRoute);

            if (defaultApiRoute == null)
            {
                config.Routes.MapHttpRoute(
                    name: "DefaultApi",
                    routeTemplate: "api/{controller}/{id}",
                    defaults: new { id = RouteParameter.Optional }
                );
            }
        }
    }
}


