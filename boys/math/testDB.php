<?php
$servername = "localhost";
$username = "meekmeek_test";
$password = "t35t/m33k";
$dbname = "meekmeek_db1";

$db_conn = mysqli_connect ($servername, $username, $password, $dbname); 
if (!$db_conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$result = mysqli_query($db_conn,"SHOW DATABASES"); 
while ($row = mysqli_fetch_assoc($result)) { echo $row['Database'] . "|<br>"; }
while ($row = mysqli_fetch_array($result)) { echo $row[0]."^<br>"; }
/*
$db_list = mysqli_list_dbs($db_conn);
while ($row = mysqli_fetch_object($db_list)) { echo $row->Database . "#\n";}
*/
// sql to create table
$sql = "CREATE TABLE MyQuizes(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(32) NOT NULL,
operation VARCHAR(32) NOT NULL,
correct int,
incorrect int,
reg_date TIMESTAMP
)";

if (mysqli_query($db_conn, $sql)) {
    echo "Table MyQuizes created successfully";
} else {
    echo "Error creating table: " . mysqli_error($db_conn);
}


mysqli_close(db_conn);
?>