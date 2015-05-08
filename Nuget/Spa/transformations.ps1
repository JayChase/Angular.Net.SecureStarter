$Files = Get-ChildItem ".\spa\content\*.pp" -recurse -force
Foreach ($File in $Files)
	{
		(get-content $File) | foreach-object {$_ -replace "namespace Spa", 'namespace $rootnamespace$' -replace "using Spa", 'using $rootnamespace$' -replace "Spa.WebApiApplication", '$rootnamespace$.WebApiApplication' -replace 'Spa.App_Start','$rootnamespace$.App_Start' -replace 'namespace="Spa"','namespace="$rootnamespace$"' -replace "\[RequireHttps\]", ''} | set-content $File	
  }