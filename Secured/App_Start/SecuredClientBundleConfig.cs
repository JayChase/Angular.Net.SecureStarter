using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(Secured.App_Start.SecuredClientBundleConfig), "RegisterBundles",Order=2)]
namespace Secured.App_Start
{    
    public class SecuredClientBundleConfig
    {
        public static void RegisterBundles()
        {
            var bundles = BundleTable.Bundles;

            #region AngularJs.StarterKit.Spa.Secured.Client bundles

            //amend the content bundle to include the secured WebApi demo
            var contentBundle = bundles.GetBundleFor("~/bundles/content");

            if (contentBundle != null)
            {
                contentBundle.Include("~/spa/content/securedWebapiDemo/SecuredWebApiDemoController.js");
            }

            bundles.Add(new ScriptBundle("~/bundles/securityAngularModules").Include(                                
                "~/Scripts/angular-resource.js",
                "~/Scripts/angular-sanitize.js",                
                "~/Scripts/angular-messages.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/security").Include(
               "~/spa/security/security.module.js",
               "~/spa/security/accountResource.js",                              
               "~/spa/security/secureHttpInterceptor.js",
               "~/spa/security/clientIdHttpInterceptor.js",
               "~/spa/security/guardService.js",
               "~/spa/security/userService.js",
               "~/spa/security/skUserInfo.js",               
               "~/spa/security/externalAuthService.js",
               "~/spa/security/restoreUserService.js",
               "~/spa/security/skChangePassword.js",
               "~/spa/security/skCreateLocalLogin.js",
               "~/spa/security/skLoginProvider.js",
               "~/spa/security/skRequiredRoles.js",
               "~/spa/security/skUserLogin.js",
               "~/spa/security/skUserInfo.js",
               "~/spa/security/ManageController.js",
               "~/spa/security/userManagementService.js",
               "~/spa/security/usedLoginProviderFilter.js",
               "~/spa/security/SignInController.js",
               "~/spa/security/ExternalSignInController.js",
               "~/spa/security/ExternalRegisterController.js",
               "~/spa/security/RegisterController.js"
               ));

            #endregion
        }
    }
}
