param($installPath, $toolsPath, $package, $project)

$path = [System.IO.Path]
$readmefile = $path::Combine($path::GetDirectoryName($project.FileName), "readme.md")
$DTE.ItemOperations.OpenFile($readmefile)