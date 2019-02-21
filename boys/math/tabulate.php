<?php
$a[] = "name";
$a[] = "tabulateOperation";
$a[] = "correct";
$a[] = "incorrect";
$a[] = "tried";
$a[] = "correctStreak";
$a[] = "operationKEY";
$allValues = array();
// get the q parameter from URL

foreach ($a as $value){
	if($_REQUEST[$value]){
		$allValues[$value]=$_REQUEST[$value];
	}
	//$allValues[]

}
//echo $allValues

//echo $_GET;
foreach ($a as $value){
	echo $value . '=' . $_REQUEST[$value] . '<br/>';
	//$allValues[]

}
/*
$str='';
foreach($_GET as $key=>$val) {
	$str+=$key+'='+$val+'|';
	
}
echo $str; 
*/

/*
foreach($a as $name) {
	$tmp=$_REQUEST[$a];
	$str+=$a+'='+tmp+'|';
}
echo $str; 
*/

/*
// lookup all hints from array if $q is different from "" 
if ($q !== "") {
    $q = strtolower($q);
    $len=strlen($q);
    foreach($a as $name) {
        if (stristr($q, substr($name, 0, $len))) {
            if ($hint === "") {
                $hint = $name;
            } else {
                $hint .= ", $name";
            }
        }
    }
}

// Output "no suggestion" if no hint was found or output correct values 
echo $hint === "" ? "no suggestion" : $hint;
*/
?>

