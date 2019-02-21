<?php
   class DbAccess
   {
      var $dbCon;
      var $dbConInfo;
      
      function DbAccess( $dbConInfo )
      {
         $this->dbConInfo = $dbConInfo;
         $this->dbCon = mysql_connect( $dbConInfo->getDbServer(),
                                       $dbConInfo->getUsername(),
                                       $dbConInfo->getPassword(),
                                       $dbConInfo->getDbName("KidsMath")

									   )
                        or die( "Unable to connect to the db server" );
      }
	  
      //,$dbConInfo->getDbName("KidsMath")
	  function lookForMatch( $sql){
		  $theQueryResult = mysql_query( $sql, $this->dbCon );
			if($theQueryResult) { //Here we check the length of the results returned, if the rows length >0, then we have a match and will replace the row
				$emparray = array();
				while($row =mysqli_fetch_assoc($result))
					$emparray[] = $row;
				$foundRow=sizeof($emparray);
				//echo(json_encode($emparray));           
			}
			else{
				//echo(mysqli_error($db_conn));       
			} 		  
		  
	  }      
	  function closeDB(){
		  
		  mysql_close($this->dbCon);
		  
	  }
	  
      function fetchColumn( $sql )
      {
         $resultValues = array();
         $theQueryResult = mysql_query( $sql, $this->dbCon );
         
         while( $aRow = mysql_fetch_row( $theQueryResult ) )
         {
            $resultValues[] = $aRow[0];
         }
         
         return $resultValues;
      }
      
      function fetchRow( $sql, $jrCon )
      {
         $resultArray = array();
         //$theQueryResult = mysql_query( $sql, $this->dbCon );
         $theQueryResult = mysql_query( $sql, $jrCon );
         
         if( $aRow = mysql_fetch_array( $theQueryResult ) )
         {
            $resultArray = $aRow;
         }
         
         return $resultArray;
      }
      
      function fetchRows( $sql, $key = NULL, $jrCon  )
      {
		  //echo $sql . '<br/>' . $this->dbCon;	
		  echo $sql . '<br/>' . $jrCon;	
         $resultArray = array();
         //$theQueryResult = mysql_query( $sql, $this->dbCon );
         $theQueryResult = mysql_query( $sql, $jrCon  );
         
         while( $aRow = mysql_fetch_array( $theQueryResult ) )
         {
            if( is_null( $key ) ) { $resultArray[] = $aRow; }
            else { $resultArray[ $aRow[ $key ] ] = $aRow; }
         }
         
         return $resultArray;
      }
      
      function fetchKeyValuePair( $sql )
      {
         $resultArray = array();
         $theQueryResult = mysql_query( $sql, $this->dbCon );
         
         while( $aRow = mysql_fetch_row( $theQueryResult ) )
         {
            $resultArray[ $aRow[0] ] = $aRow[1];
         }
         
         return $resultArray;
      }
      
      function fetchValue( $sql )
      {
         $resultValue = "";
         $theQueryResult = mysql_query( $sql, $this->dbCon );
         
         if( $aRow = mysql_fetch_row( $theQueryResult ) )
         {
            $resultValue = $aRow[0];
         }
         
         return $resultValue;
      }
      
      function insert( $sql, $jrCon )
      {
		  echo $sql . '<br/>' . $jrCon;			  
		  //echo $sql . '<br/>' . $this->dbCon;			  
         if( !( mysql_query( $sql, $jrCon ) ) )
         //if( !( mysql_query( $sql, $this->dbCon ) ) )
         ////if( !( mysqli_query( $this->dbCon, $sql ) ) )
            { return false; }
         else
            { return true; }
      }
      
      function incrementedInsert( $sql )
      {
         $identityValue = "";
         $theInsertResult = mysql_query( $sql, $this->dbCon );
         $identityValue = mysql_insert_id( $this->dbCon );
         return $identityValue;
      }
      
      function update( $sql, $jrCon )
      {
		 // echo $sql . '<br/>' . $this->dbCon;	
		  echo $sql . '<br/>' . $jrCon;	
         //if( !( mysql_query( $sql, $this->dbCon ) ) )
         if( !( mysql_query( $sql, $jrCon ) ) )			 
         ////if( !( mysqli_query( $this->dbCon, $sql ) ) )			 
            { return false; }
         else
            { return true; }
      }
   }
?>