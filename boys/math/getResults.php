<?php
$name = "";
$foundRow=false;
//echo "in bottom PHP with " . $_SERVER["REQUEST_METHOD"];

if ($_SERVER["REQUEST_METHOD"] == "GET") {
	//echo "<br/>in get";
    $name = test_input($_REQUEST["name"]);
	if($name !== -1){
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

		$sql = "SELECT * FROM `MyQuizes` WHERE `name` = '$name' ORDER BY `reg_date` DESC";//Query to see if we have an existing row with a matching name
		//echo $sql . '<br/>' . $db_conn;
	
		$result = mysqli_query($db_conn, $sql);
		//mysqli_info($db_conn);

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
		/*
		if($foundRow>0){ //Replace row with more current info if matching entry exists - means same problem set
			$sql = "UPDATE MyQuizes SET name = '$name', operation = '$operation', correct = '$correct', incorrect = '$incorrect', wrongProblems = '$wrongProblems' WHERE operationID = $operationID";
		}
		else{ //Add new row if no matching row
			$sql = "INSERT INTO MyQuizes (name, operation, correct, incorrect, operationID, wrongProblems) VALUES ('$name', '$operation', '$correct', '$incorrect', '$operationID', '$wrongProblems')";
		}
		//echo $sql . "<br/>" . $db_conn;
		if (mysqli_query($db_conn, $sql)) {
			if($foundRow>0) echo "Table MyQuizes had a row replaced with operationID=" . $operationID;
			else echo "Table MyQuizes had a row INSERTED with operationID=" . $operationID;
		} else {
			echo "Error creating table: " . mysqli_error($db_conn);
		}	*/	
		mysqli_close($db_conn);
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

