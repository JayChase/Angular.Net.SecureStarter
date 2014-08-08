$Files = Get-ChildItem ".\package\content\*.pp" -recurse -force
Foreach ($File in $Files)
	{
		(get-content $File) | foreach-object {$_ -replace "Angular.SecureStarter", '$rootnamespace$' -replace "\[RequireHttps\]", ''} | set-content $File	
  }