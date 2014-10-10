using System.Web;
using System.Web.Optimization;

namespace Angular.SecureStarter
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-2.1.1.js",
                        "~/Scripts/jquery.utilities.js"
                        ));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/angular-resource.js",
                "~/Scripts/angular-sanitize.js",
                "~/Scripts/angular-animate.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js",
                "~/Scripts/toastr.js"
                ));


            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/app/app.js",
                "~/app/core/core.js",
                "~/app/core/appActivitySvc.js",
                "~/app/core/appStatusSvc.js",
                "~/app/core/notifierSvc.js",
                "~/app/core/navigationSvc.js",
                "~/app/core/skDisableWhenBusy.js",
                "~/app/core/storageSvc.js",
                "~/app/core/skAppReady.js",                       
                "~/app/common/validation/skMatches.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/shell").Include(    
                "~/app/shell/shell.js",
                "~/app/shell/shellCtrl.js",
                "~/app/shell/topNavCtrl.js",
                "~/app/shell/skNavLinks.js",
                "~/app/shell/skBusyIndicator.js"                         
                ));

            bundles.Add(new ScriptBundle("~/bundles/security").Include(
                "~/app/security/security.js",
                "~/app/security/accountClientSvc.js",
                "~/app/security/signIn.js",
                "~/app/security/signInCtrl.js",
                "~/app/security/registerCtrl.js",
                "~/app/security/secureHttpInterceptor.js",
                "~/app/security/guardSvc.js",                
                "~/app/security/userSvc.js",
                "~/app/security/skUserInfo.js",
                "~/app/security/externalSignInCtrl.js",
                "~/app/security/externalRegisterCtrl.js",
                "~/app/security/externalAuthSvc.js",
                "~/app/security/restoreUserSvc.js",
                "~/app/security/skChangePassword.js",
                "~/app/security/skCreateLocalLogin.js",
                "~/app/security/skLoginProvider.js",
                "~/app/security/skUserLogin.js",
                "~/app/security/manageCtrl.js",
                "~/app/security/userManagementSvc.js",
                "~/app/security/usedLoginProviderFilter.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/content").Include(
                "~/app/content/welcome/welcomeCtrl.js",
                "~/app/content/features/featuresCtrl.js",
                "~/app/content/securedWebapiDemo/securedWebapiDemoCtrl.js"
                ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/toastr.css",
                       "~/Content/fadeAnimation.css",
                      "~/Content/site.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            //BundleTable.EnableOptimizations = true;
        }
    }
}
