<?php
//define('__ROOT__', dirname(dirname(__FILE__))); 

//echo __ROOT__;
//echo get_include_path() . '<br/>';
//echo ini_get('include_path');
require_once("../../library/data/db/DbConInfo.php" );
require_once("../../library/data/db/DbAccess.php" );

$name = $email = $operation = $correct = $incorrect = $wrongProblems = $operationID = "";
$foundRow=false;
//echo "in bottom PHP with " . $_SERVER["REQUEST_METHOD"];

//if ("rrr" == "GET") {
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	//echo "<br/>in get";
    $tried = test_input($_REQUEST["tried"]);
	//echo "<br/>tried is " . $tried;
	if($tried !== -1){
		//echo "<br/> in tried";
		$name = test_input($_REQUEST["name"]);
		//echo "<br/> name is :" . $name;
		$wrongProblems = test_input($_REQUEST["wrongProblems"]);		
		//echo "<br/> wrongProblems is :" . $wrongProblems;			
		$operation = test_input($_REQUEST["tabulateOperation"]);
		//echo "<br/> operation is :" . $operation;
		$correct = test_input($_REQUEST["correct"]);
		//echo "<br/> correct is :" . $correct;
		$incorrect = test_input($_REQUEST["incorrect"]);
		//echo "<br/> incorrect is :" . $incorrect;
		$operationID = test_input($_REQUEST["operationKEY"]);		
		//echo "<br/> operationID is :" . $operationID;
	
		$dbConInfo = new DbConInfo();
		//echo $dbConInfo
		$dbAccess = new DbAccess( $dbConInfo );
		$pagesTbl = $dbConInfo->getTableName( "MyQuizes" );		
 ////////
		$sql = "SELECT `operationID` FROM `MyQuizes` WHERE `operationID` = ".$operationID;//Query to see if we have an existing row with a matching operationID
		//$result = $dbAccess->fetchRows($sql);
		$result = $dbAccess->fetchRows($sql, null, $dbAccess->dbCon);
		echo join(" ",$result) .'|';
		
		if($result) { //Here we check the length of the results returned, if the rows length >0, then we have a match and will replace the row
			$emparray = array();
			while($row =mysqli_fetch_assoc($result))
				$emparray[] = $row;
			$foundRow=sizeof($emparray);
			//echo(json_encode($emparray));           
		}
		else{
			//echo(mysqli_error($db_conn));       
		} 		
		if($foundRow>0){ //Replace row with more current info if matching entry exists - means same problem set
			$sql = "UPDATE MyQuizes SET name = '".$name."', operation = '".$operation."', correct = '".$correct."', incorrect = '".$incorrect."', wrongProblems = '".$wrongProblems."' WHERE operationID = ".$operationID;
			//$result = $dbAccess->update($sql);
			$result = $dbAccess->update($sql, $dbAccess->dbCon);
		}
		else{ //Add new row if no matching row
			$sql = "INSERT INTO MyQuizes (name, operation, correct, incorrect, operationID, wrongProblems) VALUES ('".$name."', '".$operation."', '".$correct."', '".$incorrect."', '".$operationID."', '".$wrongProblems."')";
			//$result = $dbAccess->insert($sql);
			$result = $dbAccess->insert($sql, $dbAccess->dbCon);
		}	
		echo ($result?'true':'false');
		//$dbAccess->closeDB();
		
		
/*
		$db_conn = mysqli_connect ($servername, $username, $password, $dbname); 
		if (!$db_conn) {
			die("Connection failed: " . mysqli_connect_error());
		}

		$sql = "SELECT `operationID` FROM `MyQuizes` WHERE `operationID` = $operationID";//Query to see if we have an existing row with a matching operationID
		////echo $sql . "<br/>";
		$result = mysqli_query($db_conn, $sql);
		//mysqli_info($db_conn);

		if($result) { //Here we check the length of the results returned, if the rows length >0, then we have a match and will replace the row
			$emparray = array();
			while($row =mysqli_fetch_assoc($result))
				$emparray[] = $row;
			$foundRow=sizeof($emparray);
			//echo(json_encode($emparray));           
		}
		else{
			//echo(mysqli_error($db_conn));       
		} 
		if($foundRow>0){ //Replace row with more current info if matching entry exists - means same problem set
			$sql = "UPDATE MyQuizes SET name = '$name', operation = '$operation', correct = '$correct', incorrect = '$incorrect', wrongProblems = '$wrongProblems' WHERE operationID = $operationID";
		}
		else{ //Add new row if no matching row
			$sql = "INSERT INTO MyQuizes (name, operation, correct, incorrect, operationID, wrongProblems) VALUES ('$name', '$operation', '$correct', '$incorrect', '$operationID', '$wrongProblems')";
		}
		
		if (mysqli_query($db_conn, $sql)) {
			if($foundRow>0) echo "Table MyQuizes had a row replaced with operationID=" . $operationID;
			else echo "Table MyQuizes had a row INSERTED with operationID=" . $operationID;
		} else {
			echo "Error creating table: " . mysqli_error($db_conn);
		}		
		mysqli_close($db_conn);
		*/
		
		//$dbAccess->closeDB();
	}
}

function test_input($data) {
	////echo '<br/>>' . $data;
	//$data = urldecode($data);
	//$data = trim($data);
	//$data = stripslashes($data);
	//$data = htmlspecialchars($data);
	////echo 'becomes ' . $data;
	return $data;
}
?>

