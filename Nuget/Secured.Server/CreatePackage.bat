::make sure nuget is up to date

::nuget Update -self

SET sourceDir=Secured
SET destinationDir=Secured.Server\content

::Clear any existing content files 
RMDIR %destinationDir% /S /Q

::clear any existing packages from this folder
DEL AngularJs.StarterKit.Secured.Server.*.nupkg /F /Q

::copy source files

echo F | xcopy /Y ..\%sourceDir%\Startup.cs "%destinationDir%\App_Start\Startup.cs.pp"

MKDIR ..\%sourceDir%\App_Data

echo F | xcopy /Y ..\%sourceDir%\App_Start\IdentityConfig.cs "%destinationDir%\App_Start\IdentityConfig.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\App_Start\SecuredServerStartup.cs "%destinationDir%\App_Start\SecuredServerStartup.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\App_Start\Startup.Auth.cs "%destinationDir%\App_Start\Startup.Auth.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\App_Start\SecuredServerWebApiConfig.cs "%destinationDir%\App_Start\SecuredServerWebApiConfig.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Controllers\AccountController.cs "%destinationDir%\Controllers\AccountController.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Filters\RequireHttpsAttribute.cs "%destinationDir%\Filters\RequireHttpsAttribute.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Models\AccountBindingModels.cs "%destinationDir%\Models\AccountBindingModels.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\Models\AccountViewModels.cs "%destinationDir%\Models\AccountViewModels.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\Models\ApplicationDbInitializer.cs "%destinationDir%\Models\ApplicationDbInitializer.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\Models\IdentityModels.cs "%destinationDir%\Models\IdentityModels.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Providers\ApplicationOAuthProvider.cs "%destinationDir%\Providers\ApplicationOAuthProvider.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Results\ChallengeResult.cs "%destinationDir%\Results\ChallengeResult.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Web.config.install.xdt "%destinationDir%\Web.config.install.xdt"
echo F | xcopy /Y ..\%sourceDir%\Web.config.uninstall.xdt "%destinationDir%\Web.config.uninstall.xdt"

::sort out the namespace in cs files

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& 'C:\Work\AwesomeWeb\Angular.Net.SecureStarter\Nuget\Secured.Server\transformations.ps1'"

::create the nuget package
nuget pack Secured.Server\AngularJs.StarterKit.Spa.Secured.Server.nuspec

DEL C:\Users\Jon\Documents\USS Work\LocalNuget\AngularJs.StarterKit.Spa.Secured.Server.*.nupkg /F /Q

echo F | xcopy /Y AngularJs.StarterKit.Spa.Secured.Server.*.nupkg "C:\Users\Jon\Documents\USS Work\LocalNuget\AngularJs.StarterKit.Spa.Secured.Server.*.nupkg"