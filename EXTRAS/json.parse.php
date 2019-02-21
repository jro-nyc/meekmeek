<?php

$file = file_get_contents('allAirports.json');
//$json = json_decode($file);
$json = json_decode($file, true);
//$json = $file;
$usArr=array();
//echo $json;
foreach ($json as $value){
	//echo $value;
	//echo 'es Jaime! - ' . $value['iso'] . ' - ' . $value['size'] . '<br/>';
	if($value['iso']==="US" and $value['size']==="large"){
		array_push($usArr ,$value);
		echo 'es Jaime! - ' . $value['iso'] . ' - ' . $value['size'] . '<br/>';
	}
}
echo 'es Jaime!';
//echo $usArr;
$myfile = fopen("testfile.json", "w");
//var_export($usArr);
fwrite($myfile, var_export($usArr));
fclose($myfile);
?> 
<!DOCTYPE html>
<html>

<head>

</head>

<body>
BLAH
	
</body>
</html>

