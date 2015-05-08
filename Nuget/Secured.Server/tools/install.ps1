param($installPath, $toolsPath, $package, $project)

$path = [System.IO.Path]
#not working yet delete empty.txt marker file after install
$appData = $path::Combine($path::GetDirectoryName($project.FileName), "App_Data")
Write-Host "hello"
#Write-Host $emptyFile
New-Item -ItemType directory -Path $appData

$readmefile = $path::Combine($path::GetDirectoryName($project.FileName), "readme.md")
$DTE.ItemOperations.Navigate("https://github.com/Useful-Software-Solutions-Ltd/Angular.Net.SecureStarter/wiki")