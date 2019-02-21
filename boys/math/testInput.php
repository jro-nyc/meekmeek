<html>
<head>
<head>
<?php

/*

// sql to create table
$sql = "CREATE TABLE MyQuizes(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(32) NOT NULL,
operation VARCHAR(32) NOT NULL,
correct int,
incorrect int,
reg_date TIMESTAMP
)";
*/ 
function updatePage( $name, $operation, $correct, $incorrect ){
	echo $name . $operation . $correct . $incorrect;
	/*
	$setParams = array();
	$setParams[] = $this->pagesTbl . ".title = '" . $title . "'";
	$setParams[] = $this->pagesTbl . ".description = '" . $description . "'";
	$setParams[] = $this->pagesTbl . ".keywords = '" . $keywords . "'";

	$whereParams = array();
	$whereParams[] = $this->pagesTbl . ".page_id = '" . $pageId . "'";
	$whereParams[] = $this->pagesTbl . ".parent_page_id = '" . $parentPageId . "'";

	$sql = "UPDATE " . $this->pagesTbl .
	" SET " . implode( ",", $setParams ) .
	" WHERE " . implode( " AND ", $whereParams );

	return $this->updatePageSections( $pageId, $parentPageId, $content ) &&
	$this->dbAccess->update( $sql );
	*/
}
?>
<body>
<div><input name="nm" id="nm" type="text" /></div>
<div><input name="operation" id="operation" type="text" /></div>
<div><input name="correct" id="correct" type="text" /></div>
<div><input name="incorrect" id="incorrect" type="text" /></div>
<button onclick="updatePage(1,2,3,4)" type="button">Send!</button>


</body>
</html>





<body>