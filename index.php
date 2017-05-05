<?php
header("Content-Security-Policy: default-src 'self' ; script-src 'self' *.marketinghub.hp.com *.marketinghub.opentext.com *.optimost.com ajax.googleapis.com 'unsafe-eval' 'unsafe-inline';style-src 'self' 'unsafe-inline';img-src 'self' *.marketinghub.hp.com *.marketinghub.opentext.com;"); // FF 23+ Chrome 25+ Safari 7+ Opera 19+
?> 
<!DOCTYPE html>
<!-- <html ng-app="githubViewer">  -->
<html ng-app="myPicturesViewer">

<head>
	<title ng-bind-html="title ">Website Name</title>
	<!-- <script data-require="angular.js@*" data-semver="1.3.0-beta.5" src="https://code.angularjs.org/1.3.0-beta.5/angular.js"></script>  -->
	<script src="/assets/js/customer.placement.2domain.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0-rc.1/angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0-rc.1/angular-route.js"></script>
	<script src="/assets/js/angularTryCatch.js"></script><!-- 15 Sept addition to test CSP with no inline script-->
	<link rel="stylesheet" href="/assets/css/styles.css" />

	<script src="/assets/js/optimost-service.js"></script> 
	<script src="/assets/js/events.includeRoute.js"></script>
	<!-- <script src="/assets/js/customer.placement.js"></script> -->
</head>

<body>
<!-- Placeholder for views-->

	<div ng-view="">
	</div>
	
</body>
<script src="/assets/js/locationChangeTest.js"></script><!-- 15 Sept addition to test CSP with no inline script-->
</html>

