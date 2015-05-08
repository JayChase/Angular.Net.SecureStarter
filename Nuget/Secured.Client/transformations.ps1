$Files = Get-ChildItem ".\Secured.Client\content\*.pp" -recurse -force
Foreach ($File in $Files)
	{
		(get-content $File) | foreach-object {$_ -replace "namespace Secured", 'namespace $rootnamespace$' -replace "using Secured", 'using $rootnamespace$' -replace "Secured.WebApiApplication", '$rootnamespace$.WebApiApplication' -replace 'Secured.App_Start','$rootnamespace$.App_Start' -replace 'namespace="Secured"','namespace="$rootnamespace$"' -replace "\[RequireHttps\]", ''} | set-content $File	
  }