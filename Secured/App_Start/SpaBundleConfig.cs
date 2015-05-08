using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(Secured.App_Start.SpaBundleConfig), "RegisterBundles")]
namespace Secured.App_Start
{    
    public class SpaBundleConfig
    {
        public static void RegisterBundles()
        {
            var bundles = BundleTable.Bundles;

            #region AngularJs.StarterKit.Spa bundles
                        
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-animate.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/spaVendor").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js",
                "~/Scripts/toastr.js"
                ));


            bundles.Add(new ScriptBundle("~/bundles/spa").Include(
                "~/spa/app.js",
                "~/spa/core/core.module.js",
                "~/spa/core/appActivityService.js",
                "~/spa/core/appStatusService.js",
                "~/spa/core/notifierService.js",
                "~/spa/core/navigationService.js",
                "~/spa/core/skDisableWhenBusy.js",
                "~/spa/core/storageService.js",
                "~/spa/core/skAppReady.js",
                "~/spa/core/skFocusOnSetPristine.js"        
                ));

            bundles.Add(new ScriptBundle("~/bundles/common").Include(                
                "~/spa/common/common.module.js",
                "~/spa/common/utilityService.js",
                "~/spa/common/validation/skMatch.js",
                "~/spa/common/validation/skAsyncValidators.js",
                "~/spa/common/validation/skHasError.js",
                "~/spa/common/validation/skUnique.js"                
                ));

            bundles.Add(new ScriptBundle("~/bundles/shell").Include(
                "~/spa/shell/shell.module.js",
                "~/spa/shell/ShellController.js",
                "~/spa/shell/TopNavController.js",
                "~/spa/shell/skTopNav.js",
                "~/spa/shell/skNavLinks.js",
                "~/spa/shell/skNavLink.js",
                "~/spa/shell/skBusyIndicator.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/content").Include(
                "~/spa/content/content.module.js",
                "~/spa/content/welcome/WelcomeController.js",
                "~/spa/content/features/FeaturesController.js",
                "~/spa/content/securedWebapiDemo/SecuredWebApiDemoController.js"
                ));

            bundles.Add(new StyleBundle("~/Content/spaCss").Include(
                "~/Content/bootstrap.css",
                "~/Content/toastr.css",
                "~/Content/fadeAnimation.css",
                "~/Content/spa.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/spaModernizr").Include(
            "~/Scripts/modernizr-*"));

            #endregion
        }
    }
}
