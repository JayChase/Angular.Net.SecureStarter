::make sure nuget is up to date

::nuget Update -self

SET sourceDir=Secured
SET destinationDir=SecureStarter\content

::Clear any existing content files 
RMDIR %destinationDir% /S /Q

::clear any existing packages from this folder
DEL Angular.SecureStarter.*.nupkg /F /Q

::sort out the namespace in cs files

::PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& 'C:\Work\AwesomeWeb\Angular.Net.SecureStarter\Nuget\SecureStarter\transformations.ps1'"

::create the nuget package
nuget pack SecureStarter\AngularJs.StarterKit.SecureStarter.nuspec

DEL C:\Users\Jon\Documents\USS Work\LocalNuget\Angular.SecureStarter.*.nupkg /F /Q

echo F | xcopy /Y Angular.SecureStarter.*.nupkg "C:\Users\Jon\Documents\USS Work\LocalNuget\Angular.SecureStarter.*.nupkg"