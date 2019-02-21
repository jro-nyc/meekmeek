<?php
   $file = "/home/lmanno/public_html/files/documents/ahlpromo.pps";
   
   header( "Pragma: public" );
   header( "Expires: 0" );
   header( "Cache-Control: must-revalidate, post-check=0, pre-check=0" );
   header( "Cache-Control: private", false );
   header( "Content-Type: application/force-download" );
   header( "Content-Disposition: attachment; filename=\"ahlpromo.pps\";" );
   header( "Content-Transfer-Encoding: binary" );
   header( "Content-Length: " . filesize( $file ) );
   
   readfile( "$file" );
   exit();
?>