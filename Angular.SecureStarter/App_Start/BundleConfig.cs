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
                "~/Scripts/angular-animate.js",
                "~/Scripts/angular-messages.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js",
                "~/Scripts/toastr.js"
                ));


            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                "~/app/app.js",
                "~/app/core/core.module.js",
                "~/app/core/appActivityService.js",
                "~/app/core/appStatusService.js",
                "~/app/core/notifierService.js",
                "~/app/core/navigationService.js",
                "~/app/core/skDisableWhenBusy.js",
                "~/app/core/storageService.js",
                "~/app/core/skAppReady.js",
                "~/app/core/skFocusOnSetPristine.js",                       
                "~/app/common/validation/skMatch.js",
                "~/app/common/validation/skAsyncValidators.js",
                "~/app/common/validation/skHasError.js",
                "~/app/common/validation/skUnique.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/shell").Include(    
                "~/app/shell/shell.module.js",
                "~/app/shell/shellController.js",
                "~/app/shell/topNavController.js",
                "~/app/shell/skNavLinks.js",
                "~/app/shell/skNavLink.js",
                "~/app/shell/skBusyIndicator.js"                       
                ));

            bundles.Add(new ScriptBundle("~/bundles/security").Include(
                "~/app/security/security.module.js",                
                "~/app/security/accountResource.js",
                "~/app/security/signIn.js",
                "~/app/security/signInController.js",
                "~/app/security/registerController.js",
                "~/app/security/secureHttpInterceptor.js",
                "~/app/security/guardService.js",                
                "~/app/security/userService.js",
                "~/app/security/skUserInfo.js",
                "~/app/security/externalSignInController.js",
                "~/app/security/externalRegisterController.js",
                "~/app/security/externalAuthService.js",
                "~/app/security/restoreUserService.js",
                "~/app/security/skChangePassword.js",
                "~/app/security/skCreateLocalLogin.js",
                "~/app/security/skLoginProvider.js",
                "~/app/security/skUserLogin.js",
                "~/app/security/manageController.js",
                "~/app/security/userManagementService.js",
                "~/app/security/usedLoginProviderFilter.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/content").Include(
                "~/app/content/content.module.js",
                "~/app/content/welcome/welcomeController.js",
                "~/app/content/features/featuresController.js",
                "~/app/content/securedWebapiDemo/securedWebApiDemoController.js"
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
