<?php
$files = array(
"windows"	=> "NorvosMessengerSetup.exe",
"mac"		=> "NorvosMessengerSetup.whatevermacuses",
"linux"		=> "NorvosMessengerSetup.whateverlinuxuses",
"jar"		=> "NorvosMessenger.jar"
);
$filename = $files[$_GET["type"]];
if(is_null($filename)){
	header("Location: https://norvos.de/#download");
}else{
	$filepath = "/var/www/norvos.de/release/".$filename;
	if(!file_exists($filepath)){
		print("Currently there is no download available for this platform. Please check back later.");
		die();
	}
	header("X-Sendfile: $filepath");
	header("Content-type: application/octet-stream");
	header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
}?>
