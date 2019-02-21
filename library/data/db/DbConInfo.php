<?php
   class DbConInfo
   {
      var $theDbServer;
      var $theUsername;
      var $thePassword;
      var $theDbNames = array();
      var $theTableNames = array();
      
      function DbConInfo()
      {
         $this->theDbServer = "localhost";
         $this->theUsername = "meekmeek_test";
         $this->thePassword = "t35t/m33k";
         $this->theDbNames[ "KidsMath" ] = "meekmeek_db1";
         
         $this->theTableNames[ "MyQuizes" ] = $this->theDbNames[ "KidsMath" ] . ".MyQuizes";
      }
      
      function getDbServer() { return $this->theDbServer; }
      function getUsername() { return $this->theUsername; }
      function getPassword() { return $this->thePassword; }
      function getDbName( $key ) { return $this->theDbNames[ $key ]; }
      function getTableName( $key ) { return $this->theTableNames[ $key ]; }
   }
?>