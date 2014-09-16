::make sure nuget is up to date
::nuget Update -self

SET sourceDir=Angular.SecureStarter
SET destinationDir=package\content

::Clear any existing content files 
RMDIR %destinationDir% /S /Q

::clear any existing packages from this folder
DEL Angular.SecureStarter.*.nupkg /F /Q

::copy source files

echo D | xcopy /Y /E ..\%sourceDir%\app %destinationDir%\app
echo F | xcopy /Y ..\%sourceDir%\scripts\jquery.utilities.js %destinationDir%\scripts\jquery.utilities.js

echo F | xcopy /Y ..\%sourceDir%\App_Start\BundleConfig.cs "%destinationDir%\App_Start\BundleConfig.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\App_Start\WebApiConfig.cs "%destinationDir%\App_Start\WebApiConfig.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\App_Start\RouteConfig.cs "%destinationDir%\App_Start\RouteConfig.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Content\fadeAnimation.less "%destinationDir%\Content\fadeAnimation.less"
echo F | xcopy /Y ..\%sourceDir%\Content\fadeAnimation.css "%destinationDir%\Content\fadeAnimation.css"
echo F | xcopy /Y ..\%sourceDir%\Content\site.css "%destinationDir%\Content\site.css"

echo F | xcopy /Y ..\%sourceDir%\Controllers\AccountController.cs "%destinationDir%\Controllers\AccountController.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\Controllers\SecuredController.cs "%destinationDir%\Controllers\SecuredController.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Filters\RequireHttpsAttribute.cs "%destinationDir%\Filters\RequireHttpsAttribute.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Models\AccountBindingModels.cs "%destinationDir%\Models\AccountBindingModels.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\Models\AccountViewModels.cs "%destinationDir%\Models\AccountViewModels.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\Models\ApplicationDbInitializer.cs "%destinationDir%\Models\ApplicationDbInitializer.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\Models\IdentityModels.cs "%destinationDir%\Models\IdentityModels.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Providers\ApplicationOAuthProvider.cs "%destinationDir%\Providers\ApplicationOAuthProvider.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Results\ChallengeResult.cs "%destinationDir%\Results\ChallengeResult.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Views\Home\Index.cshtml "%destinationDir%\Views\Home\Index.cshtml"

::sort out the namespace in cs files

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& 'C:\Users\Jon\Documents\USS Work\AwesomeWeb\Angular\Workshop\Angular.SecureStarter\Nuget\transformations.ps1'"

::create the nuget package
nuget pack package\Angular.SecureStarter.nuspec

DEL C:\Users\Jon\Documents\USS Work\LocalNuget\Angular.SecureStarter.*.nupkg /F /Q

echo F | xcopy /Y Angular.SecureStarter.*.nupkg "C:\Users\Jon\Documents\USS Work\LocalNuget\Angular.SecureStarter.*.nupkg"