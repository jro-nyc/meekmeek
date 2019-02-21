<?php
$name = $email = $operation = $correct = $incorrect = $wrongProblems = $operationID = "";
$foundRow=false;
echo "in bottom PHP with " . $_SERVER["REQUEST_METHOD"];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	echo "<br/>in get";
    $tried = test_input($_REQUEST["tried"]);
	echo "<br/>tried is " . $tried;
	if($tried !== -1){
		/*
		echo "<br/> in tried";
		$name = test_input($_REQUEST["name"]);
		echo "<br/> name is :" . $name;
		$wrongProblems = test_input($_REQUEST["wrongProblems"]);		
		echo "<br/> wrongProblems is :" . $wrongProblems;			
		$operation = test_input($_REQUEST["tabulateOperation"]);
		echo "<br/> operation is :" . $operation;
		$correct = test_input($_REQUEST["correct"]);
		echo "<br/> correct is :" . $correct;
		$incorrect = test_input($_REQUEST["incorrect"]);
		echo "<br/> incorrect is :" . $incorrect;
		$operationID = test_input($_REQUEST["operationKEY"]);		
		echo "<br/> operationID is :" . $operationID;
	
		echo "<div>" . $name . " got " . $correct . " right and " . $incorrect . " wrong while doing " . $tried . "with " . $operationID . " as the ID</div>";
		*/
	/*
		// sql to create table
		$sql = "CREATE TABLE MyQuizes(
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
		name VARCHAR(32) NOT NULL,
		operation VARCHAR(32) NOT NULL,
		correct int,
		incorrect int,
		wrongProblems VARCHAR(255),	
		operationID int,		
		reg_date TIMESTAMP
		)";		
		*/
		$servername = "localhost";
		$username = "meekmeek_test";
		$password = "t35t/m33k";
		$dbname = "meekmeek_db1";

		$db_conn = mysqli_connect ($servername, $username, $password, $dbname); 
		if (!$db_conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		/*	
		if (mysqli_query($db_conn, $sql)) {
			echo "Table MyQuizes created successfully";
		} else {
			echo "Error creating table: " . mysqli_error($db_conn);
		}		
		*/
		/*
		$result = mysqli_query($db_conn,"SHOW DATABASES"); 
		while ($row = mysqli_fetch_assoc($result)) { echo $row['Database'] . "-<br>"; }
		while ($row = mysqli_fetch_array($result)) { echo $row[0]."^<br>"; }	
		*/
		$sql = "SELECT `operationID` FROM `MyQuizes` WHERE `operationID` = $operationID";//Query to see if we have an existing row with a matching operationID
		//echo $sql . "<br/>";
		$result = mysqli_query($db_conn, $sql);
		//mysqli_info($db_conn);
/*
		while ($row = mysqli_fetch_assoc($result)) { echo $row['Database'] . "|<br>"; }
		while ($row = mysqli_fetch_array($result)) { echo $row[0]."^<br>"; }	
		echo mysqli_info($result) . "<br/>";
		
		if (mysqli_query($db_conn, $sql)) {
			echo "Table MyQuizes read with select and result was:" . mysqli_info($result) . "<br/>"; 
		} else {
			echo "Error selecting table: " . mysqli_error($db_conn);
		}	
*/
		if($result) { //Here we check the length of the results returned, if the rows length >0, then we have a match and will replace the row
			$emparray = array();
			while($row =mysqli_fetch_assoc($result))
				$emparray[] = $row;
			$foundRow=sizeof($emparray);
			echo(json_encode($emparray));           
		}
		else{
			echo(mysqli_error($db_conn));       
		} 
		if($foundRow>0){ //Replace row with more current info if matching entry exists - means same problem set
			$sql = "UPDATE MyQuizes SET name = '$name', operation = '$operation', correct = '$correct', incorrect = '$incorrect', wrongProblems = '$wrongProblems' WHERE operationID = $operationID";
		}
		else{ //Add new row if no matching row
			$sql = "INSERT INTO MyQuizes (name, operation, correct, incorrect, operationID, wrongProblems) VALUES ('$name', '$operation', '$correct', '$incorrect', '$operationID', '$wrongProblems')";
		}
		
		if (mysqli_query($db_conn, $sql)) {
			echo "Table MyQuizes had a row inserted";
		} else {
			echo "Error creating table: " . mysqli_error($db_conn);
		}		
		mysqli_close($db_conn);
	}
}

function test_input($data) {
	//echo '<br/>>' . $data;
	//$data = urldecode($data);
	//$data = trim($data);
	//$data = stripslashes($data);
	//$data = htmlspecialchars($data);
	//echo 'becomes ' . $data;
	return $data;
}
?>

