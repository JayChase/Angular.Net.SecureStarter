::make sure nuget is up to date

::nuget Update -self

SET sourceDir=Secured
SET destinationDir=Secured.Client\content

::Clear any existing content files 
RMDIR %destinationDir% /S /Q

::clear any existing packages from this folder
DEL AngularJs.StarterKit.spa.secured.client.*.nupkg /F /Q

::copy source files

echo D | xcopy /Y /E ..\%sourceDir%\spa\security %destinationDir%\spa\security
echo F | xcopy /Y ..\%sourceDir%\spa\app.js %destinationDir%\spa\app.js
echo F | xcopy /Y ..\%sourceDir%\spa\shell\skTopNav.* %destinationDir%\spa\shell\skTopNav.*

echo F | xcopy /Y ..\%sourceDir%\spa\content\SecuredWebapiDemo\*.* %destinationDir%\spa\content\SecuredWebapiDemo\*.*
echo F | xcopy /Y ..\%sourceDir%\spa\content\content.module.js %destinationDir%\spa\content\content.module.js

echo F | xcopy /Y ..\%sourceDir%\App_Start\SecuredClientBundleConfig.cs "%destinationDir%\App_Start\SecuredClientBundleConfig.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Controllers\SecuredController.cs "%destinationDir%\Controllers\SecuredController.cs.pp"

echo F | xcopy /Y ..\%sourceDir%\Views\Spa\Index.cshtml "%destinationDir%\Views\Spa\Index.cshtml"

::sort out the namespace in cs files

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& 'C:\Work\AwesomeWeb\Angular.Net.SecureStarter\Nuget\secured.client\transformations.ps1'"

::create the nuget package
nuget pack secured.client\AngularJs.StarterKit.spa.secured.client.nuspec

DEL C:\Users\Jon\Documents\USS Work\LocalNuget\AngularJs.StarterKit.spa.secured.client.*.nupkg /F /Q

echo F | xcopy /Y AngularJs.StarterKit.spa.secured.client.*.nupkg "C:\Users\Jon\Documents\USS Work\LocalNuget\AngularJs.StarterKit.spa.secured.client.*.nupkg"