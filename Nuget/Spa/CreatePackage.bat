::make sure nuget is up to date

::nuget Update -self

SET sourceDir=Spa
SET destinationDir=Spa\content

::Clear any existing content files 
RMDIR %destinationDir% /S /Q

::clear any existing packages from this folder
DEL AngularJs.StarterKit.Spa.*.nupkg /F /Q

::copy source files

echo D | xcopy /Y /E ..\%sourceDir%\spa %destinationDir%\spa

echo F | xcopy /Y ..\%sourceDir%\App_Start\SpaBundleConfig.cs "%destinationDir%\App_Start\SpaBundleConfig.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\App_Start\SpaRouteConfig.cs "%destinationDir%\App_Start\SpaRouteConfig.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Content\spa.css "%destinationDir%\Content\spa.css"
echo F | xcopy /Y ..\%sourceDir%\Content\fadeAnimation.css "%destinationDir%\Content\fadeAnimation.css"

echo F | xcopy /Y ..\%sourceDir%\Controllers\SpaController.cs "%destinationDir%\Controllers\SpaController.cs.pp"
echo F | xcopy /Y ..\%sourceDir%\Views\Spa\Index.cshtml "%destinationDir%\Views\Spa\Index.cshtml"
echo F | xcopy /Y ..\%sourceDir%\Views\web.config "%destinationDir%\Views\web.config.pp"

::sort out the namespace in cs files

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& 'C:\Work\AwesomeWeb\Angular.Net.SecureStarter\Nuget\Spa\transformations.ps1'"

::create the nuget package
nuget pack spa\AngularJs.StarterKit.spa.nuspec

DEL C:\Users\Jon\Documents\USS Work\LocalNuget\AngularJs.StarterKit.spa.*.nupkg /F /Q

echo F | xcopy /Y AngularJs.StarterKit.spa.*.nupkg "C:\Users\Jon\Documents\USS Work\LocalNuget\AngularJs.StarterKit.spa.*.nupkg"