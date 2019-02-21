<html>
<title>
Basic Math Exercises
</title>
<head>
<script>
var $opt={
	addEvent: function(el, evt, func) {
		if (!el || typeof(func) != "function") return false;
		if (window.attachEvent) {
			el.attachEvent("on" + evt, func);
		} else if (window.addEventListener) {
			el.addEventListener(evt, func, false);
		}
	},
	tone:function(freq, duration){
		var context = new (window.AudioContext || window.webkitAudioContext)();
		var osc = context.createOscillator(); // instantiate an oscillator
		osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
		osc.frequency.value = freq; // Hz
		osc.connect(context.destination); // connect it to the destination
		osc.start(); // start the oscillator
		osc.stop(context.currentTime + duration);
	},
	lastOperation:'init',
	correctStreak:0,
	streakGoal:10,
	correct:0,
	incorrect:0,
	tried:0,
	name:'Marc',
	checkStreak:function(){
		if(this.correctStreak>=this.streakGoal){
			console.log('You got '+this.correctStreak+' straight!!!');
			document.getElementById("celebration").style.display="block";
			document.getElementById("streakLength").innerHTML=this.correctStreak;
			this.correctStreak=0;
			setTimeout(function(){document.getElementById("celebration").style.display="none";},4000);
		}
	},
	hideOperationChoices:function(){
		var obj=document.querySelector(".operation");
		if(obj){
			if(obj.className.indexOf("hidden")===-1)obj.className+=" hidden";
		}
	},	
	showOperationChoices:function(){
		var obj=document.querySelector(".operation");//debugger;
		if(obj){
			if(obj.className.indexOf("hidden")!==-1)obj.className=obj.className.replace(" hidden","");
		}
	},		
	user:function(user){
		var divs, i, len;
		if(user==='Markie'){
			this.name='Marc';
			divs=document.querySelectorAll('.forJohnny');
			for(i=0,len=divs.length;i<len;i+=1){
				divs[i].style.display='none';
			}
			divs=document.querySelector('#initial');			
			divs.style.display='none';			
		}
		if(user==='Johnny'){
			this.name='Johnny';
			divs=document.querySelectorAll('.forMarc');
			for(i=0,len=divs.length;i<len;i+=1){
				divs[i].style.display='none';
			}
			divs=document.querySelector('#initial');
			divs.style.display='none';
		}		
		
	},
	toneYes:function(){
		var myTones=[{freq:880,duration:.5},{freq:1220,duration:1},{freq:2440,duration:1.5}];
		for(var i=0,len=myTones.length;i<len;i+=1){
			var context = new (window.AudioContext || window.webkitAudioContext)();
			var osc = context.createOscillator(); // instantiate an oscillator
			osc.type = 'triangle'; // this is the default - also square, sawtooth, triangle
			osc.frequency.value = myTones[i].freq; // Hz
			var vol = context.createGain();
			osc.connect(vol);
			vol.connect(context.destination);
			osc.connect(context.destination); // connect it to the destination
			vol.gain.value = 0.1; // from 0 to 1, 1 full volume, 0 is muted
			osc.start(); // start the oscillator
			osc.stop(context.currentTime + myTones[i].duration);
		}
	},	
	toneNo:function(){
		var context = new (window.AudioContext || window.webkitAudioContext)();
		var osc = context.createOscillator(); // instantiate an oscillator
		osc.type = 'sine'; // this is the default - also square, sawtooth, triangle
		osc.frequency.value = 220; // Hz
		var vol = context.createGain();
		vol.gain.value = 0.1; // from 0 to 1, 1 full volume, 0 is muted
		osc.connect(vol)		
		osc.connect(context.destination); // connect it to the destination
		osc.start(); // start the oscillator
		osc.stop(context.currentTime + 1);
	}	
}

var newProblemDiv=function(init){
	if($opt.lastOperation==='div')return;
	//if(init && $opt.tried!==0){
	if((init===true && $opt.tried!==0) || $opt.tried >= 40){
		frm=document.getElementById("testData");
		document.getElementById("name").value=$opt.name;
		document.getElementById("operation").value=$opt.lastOperation;
		document.getElementById("correct").value=$opt.correct;
		document.getElementById("incorrect").value=$opt.incorrect;	
		document.getElementById("tried").value=$opt.incorrect+$opt.correct;	
		document.getElementById("nextOperation").value='div';	

		$opt.correct=$opt.incorrect=$opt.tried=0;
		frm.submit();
		//return;
	}	
	$opt.tried+=1;
	$opt.lastOperation='div';
	$opt.showOperationChoices();
	$opt.digits=[];
	var max=15, total, topDiv=document.getElementById("top"), botDiv=document.getElementById("bot"), operand="\u00f7",
	totalDiv=document.getElementById("total"), answersDiv=document.getElementById("answers"), multDiv=document.getElementById("MultDiv"),
	operandDiv=document.getElementById("botSpacer");
	var topNum=Math.floor(Math.random() * Math.floor(max-1))+1,
	botNum=Math.floor(Math.random() * Math.floor(max-1))+1;
	
	
	
	topDiv.innerHTML=topNum*botNum,
	botDiv.innerHTML=botNum,
	operandDiv.innerHTML=operand;
	totalDiv.innerHTML=topNum;
	$opt.total=topNum*botNum;
	$opt.divisor=topNum;
	totalDiv.className="hide";
	multDiv.className="show";
	var numArray='', i, len;
	for(i=0,len=9;i<=len;i+=1){
		numArray+='<li class="numberValues" data-val="'+i+'">'+i+'</li>';
	}
	var wrapper=['',
	'<div id="answersMULT">',
		'<div class="number-wrapper">',
			'<ul class="number">',
				numArray,
			'</ul>',
			'<ul class="number">',
				'<li class="numberValues" data-val="bksp">\u232B</li>',
				'<li class="numberValues" data-val="answer">\u2713</li>',
			'</ul>',
		'</div>',
	'</div>',
	''].join('');
	multDiv.innerHTML='';
	answersDiv.innerHTML=wrapper;
	$opt.addEvent(document.getElementById("answersMULT"),"click",function(evt){
		var evtX=(evt["srcElement"]?evt["srcElement"]:evt["target"]), tmp;
		console.log("click  "+evt+", and this is a "+evtX.tagName+" with data value of:"+evtX.getAttribute('data-val'));//.innerHTML);//['data-val']);
		var value=evtX.getAttribute('data-val');
		if(/\d/.test(value)){
			$opt.digits.push(value);
			document.getElementById("MultDiv").innerHTML=$opt.digits.join('');
		}
		else if(value==="bksp"){
			$opt.digits.splice($opt.digits.length-1, 1);
			document.getElementById("MultDiv").innerHTML=$opt.digits.join('');
		}
		else if(value==="answer"){
			tmp=$opt.digits.join('');
			if(tmp==$opt.divisor){
				document.getElementById("answers").innerHTML='<div class="correct">'+$opt.divisor+'<br/>\u263A</div>';
				$opt.lastOperation='init';
				$opt.hideOperationChoices();			
				setTimeout(newProblemDiv,1000);	
				$opt.correctStreak+=1;
				$opt.correct+=1;	
				//newProblemDiv();
			}
			else{
				document.getElementById("answers").innerHTML='<div class="incorrect">'+$opt.divisor+'<br/>\u2639</div>';
				multDiv.className+=" wrong";
				$opt.lastOperation='init';
				$opt.hideOperationChoices();			
				setTimeout(newProblemDiv,1000);	
				$opt.correctStreak=0;				
				$opt.incorrect+=1;
				//newProblemDiv();
			}
		}				
	});
	$opt.checkStreak()	
}
var newProblemMult=function(init){
	if($opt.lastOperation==='mult')return;
	//if(init && $opt.tried!==0){
	if((init===true && $opt.tried!==0) || $opt.tried >= 40){
		frm=document.getElementById("testData");
		document.getElementById("name").value=$opt.name;
		document.getElementById("operation").value=$opt.lastOperation;
		document.getElementById("correct").value=$opt.correct;
		document.getElementById("incorrect").value=$opt.incorrect;	
		document.getElementById("tried").value=$opt.incorrect+$opt.correct;	
		document.getElementById("nextOperation").value='mult';	
		$opt.correct=$opt.incorrect=$opt.tried=0;
		frm.submit();
		//return;
	}	
	$opt.tried+=1;	
	$opt.lastOperation='mult';
	$opt.showOperationChoices();
	$opt.digits=[];
	var max=15, total, topDiv=document.getElementById("top"), botDiv=document.getElementById("bot"), operand="&#x00d7;",
	totalDiv=document.getElementById("total"), answersDiv=document.getElementById("answers"), multDiv=document.getElementById("MultDiv"),
	operandDiv=document.getElementById("botSpacer");
	var topNum=Math.floor(Math.random() * Math.floor(max-1))+1,
	botNum=Math.floor(Math.random() * Math.floor(max-1))+1;
	topDiv.innerHTML=topNum,
	botDiv.innerHTML=botNum,
	operandDiv.innerHTML=operand;
	totalDiv.innerHTML=topNum*botNum;
	$opt.total=topNum*botNum;
	totalDiv.className="hide";
	multDiv.className="show";
	var numArray='', i, len;
	for(i=0,len=9;i<=len;i+=1){
		numArray+='<li class="numberValues" data-val="'+i+'">'+i+'</li>';
	}
	var wrapper=['',
	'<div id="answersMULT">',
		'<div class="number-wrapper">',
			'<ul class="number">',
				numArray,
			'</ul>',
			'<ul class="number">',
				'<li class="numberValues" data-val="bksp">\u232B</li>',
				'<li class="numberValues" data-val="answer">\u2713</li>',
			'</ul>',
		'</div>',
	'</div>',
	''].join('');
	answersDiv.innerHTML=wrapper;
	multDiv.innerHTML='';
	$opt.addEvent(document.getElementById("answersMULT"),"click",function(evt){
		var evtX=(evt["srcElement"]?evt["srcElement"]:evt["target"]), tmp;
		console.log("click  "+evt+", and this is a "+evtX.tagName+" with data value of:"+evtX.getAttribute('data-val'));//.innerHTML);//['data-val']);
		var value=evtX.getAttribute('data-val');
		if(/\d/.test(value)){
			$opt.digits.push(value);
			document.getElementById("MultDiv").innerHTML=$opt.digits.join('');
		}
		else if(value==="bksp"){
			$opt.digits.splice($opt.digits.length-1, 1);
			document.getElementById("MultDiv").innerHTML=$opt.digits.join('');
		}
		else if(value==="answer"){
			tmp=$opt.digits.join('');
			if(tmp==$opt.total){
				document.getElementById("answers").innerHTML='<div class="correct">'+$opt.total+'<br/>\u263A</div>';
				$opt.lastOperation='init';
				$opt.hideOperationChoices();			
				setTimeout(newProblemMult,1000);			
				$opt.correctStreak+=1;		
				$opt.correct+=1;
				//newProblemMult();				
			}
			else{
				document.getElementById("answers").innerHTML='<div class="incorrect">'+$opt.total+'<br/>\u2639</div>';
				multDiv.className+=" wrong";
				$opt.lastOperation='init';
				$opt.hideOperationChoices();			
				setTimeout(newProblemMult,1000);		
				$opt.correctStreak=0;				
				$opt.incorrect+=1;					
				//newProblemMult();				
			}
		}				
	});
	$opt.checkStreak()	
}
var newProblemAdd=function(init){
	if($opt.lastOperation==='add')return;
	//if(init && $opt.tried!==0){
	if((init===true && $opt.tried!==0) || $opt.tried >= 40){
		frm=document.getElementById("testData");
		document.getElementById("name").value=$opt.name;
		document.getElementById("operation").value=$opt.lastOperation;
		document.getElementById("correct").value=$opt.correct;
		document.getElementById("incorrect").value=$opt.incorrect;
		document.getElementById("tried").value=$opt.incorrect+$opt.correct;	
		document.getElementById("nextOperation").value='add';	
		$opt.correct=$opt.incorrect=$opt.tried=0;
		frm.submit();
		//return;
	}	
	$opt.tried+=1;
	$opt.lastOperation='add';
	$opt.showOperationChoices();
	var max=11, total, topDiv=document.getElementById("top"), botDiv=document.getElementById("bot"), operand="+",
	totalDiv=document.getElementById("total"), answersDiv=document.getElementById("answers"),
	operandDiv=document.getElementById("botSpacer");
	var topNum=Math.floor(Math.random() * Math.floor(max-1))+1,
	botNum=Math.floor(Math.random() * Math.floor(max-1))+1;
	topDiv.innerHTML=topNum,
	botDiv.innerHTML=botNum,
	operandDiv.innerHTML=operand;
	totalDiv.innerHTML=topNum+botNum;
	$opt.total=topNum+botNum;
	totalDiv.className="hidden";
	var numArray='', i, len;
	for(i=2,len=(max-1)*2;i<=len;i+=1){
		numArray+='<li class="numberValues" data-val="'+i+'">'+i+'</li>';
	}
	var wrapper=['',
	'<div id="answersADD">',
		'<div class="number-wrapper">',
			'<ul class="number">',
				numArray,

			'</ul>',
		'</div>',
	'</div>',
	''].join('');
	answersDiv.innerHTML=wrapper;
	$opt.addEvent(document.getElementById("answersADD"),"click",function(evt){
		var evtX=(evt["srcElement"]?evt["srcElement"]:evt["target"]);
		console.log("click  "+evt+", and this is a "+evtX.tagName+" with data value of:"+evtX.getAttribute('data-val'));//.innerHTML);//['data-val']);
		var value=evtX.getAttribute('data-val');
		if(value==$opt.total){
			document.getElementById("total").className="";
			//$opt.toneYes();
			if(evtX.className.indexOf(" blue")===-1)evtX.className+=" blue";
			document.getElementById("answers").innerHTML='<div class="correct">'+value+'<br/>\u263A</div>';
			$opt.lastOperation='init';
			$opt.hideOperationChoices();			
			setTimeout(newProblemAdd,750);
			$opt.correctStreak+=1;				
			$opt.correct+=1;	
			//newProblemAdd();				
		}
		else{
			//$opt.tone(440,1);
			//$opt.toneNo();
			if(evtX.className.indexOf(" red")===-1)evtX.className+=" red";
			evtX.innerHTML='\u2639';
			$opt.correctStreak+=0;	
			$opt.incorrect+=1;				
		}
		//console.log(value+'=='+$opt.total);	
	});
	$opt.checkStreak()
}
var newProblemSub=function(init){
	if($opt.lastOperation==='sub')return;
	//if(init && $opt.tried!==0){
	if((init===true && $opt.tried!==0) || $opt.tried >= 40){
		frm=document.getElementById("testData");
		document.getElementById("name").value=$opt.name;
		document.getElementById("operation").value=$opt.lastOperation;
		document.getElementById("correct").value=$opt.correct;
		document.getElementById("incorrect").value=$opt.incorrect;	
		document.getElementById("tried").value=$opt.incorrect+$opt.correct;	
		document.getElementById("nextOperation").value='sub';	
		$opt.correct=$opt.incorrect=$opt.tried=0;
		frm.submit();
		//return;
	}	
	$opt.tried+=1;	
	$opt.lastOperation='sub';
	$opt.showOperationChoices();	
	var max=20, total, topDiv=document.getElementById("top"), botDiv=document.getElementById("bot"), operand="&#x2212;",
	totalDiv=document.getElementById("total"), answersDiv=document.getElementById("answers"), tmp,
	operandDiv=document.getElementById("botSpacer");
	var topNum=Math.floor(Math.random() * Math.floor(max-1))+1,
	botNum=Math.floor(Math.random() * Math.floor(max-1))+1;
	if(topNum<botNum){
		tmp=topNum;
		topNum=botNum,botNum=tmp;
	}
	topDiv.innerHTML=topNum,
	botDiv.innerHTML=botNum,
	operandDiv.innerHTML=operand;
	totalDiv.innerHTML=topNum-botNum;
	$opt.total=topNum-botNum;
	totalDiv.className="hidden";
	var numArray='', i, len;
	for(i=0,len=max-1;i<=len;i+=1){
		numArray+='<li class="numberValues" data-val="'+i+'">'+i+'</li>';
	}
	var wrapper=['',
	'<div id="answersSUB">',
		'<div class="number-wrapper">',
			'<ul class="number">',
				numArray,

			'</ul>',
		'</div>',
	'</div>',
	''].join('');
	answersDiv.innerHTML=wrapper;
	$opt.addEvent(document.getElementById("answersSUB"),"click",function(evt){
		var evtX=(evt["srcElement"]?evt["srcElement"]:evt["target"]);
		console.log("click  "+evt+", and this is a "+evtX.tagName+" with data value of:"+evtX.getAttribute('data-val'));//.innerHTML);//['data-val']);
		var value=evtX.getAttribute('data-val');
		if(value==$opt.total){
			document.getElementById("total").className="";
			//$opt.toneYes();
			if(evtX.className.indexOf(" blue")===-1)evtX.className+=" blue";
			document.getElementById("answers").innerHTML='<div class="correct">'+value+'<br/>\u263A</div>';
			$opt.lastOperation='init';
			$opt.hideOperationChoices();
			setTimeout(newProblemSub,750);
			$opt.correctStreak+=1;				
			$opt.correct+=1;	
			//newProblemSub();				

		}
		else{
			//$opt.tone(440,1);
			//$opt.toneNo();
			if(evtX.className.indexOf(" red")===-1)evtX.className+=" red";
			evtX.innerHTML='\u2639';
			$opt.correctStreak=0;	
			$opt.incorrect+=1;			
		}
		//console.log(value+'=='+$opt.total);
		
	});
	$opt.checkStreak()
}
var myImg=new Image();
myImg.src="celebration.gif";
</script>
<style>
.equation{
	float:left;
	width:250px;
}
#answers{
	float:left;
	width:600px;
}
#top, #bot{
	width:150px;
	text-align:right;	
}
.equation{
	font-size:120px;
}
.equation hr{
	border:9px solid;
}
.card{
	margin-left:100px;
	display:block;
}
.hidden{
	visibility:hidden;
}
.again{
	clear:both;padding-left:150px;
}
.again button{
	font-size:40px;
}
#total{
	text-align:right;
	padding-right:30px
}
.red{
	background-color:#fff !important;
	color:#c00 !important;
}
.blue{
	background-color:#0066ff !important;
	color:#fff !important;
}
.incorrect{
	font-size: 200px;
	line-height: 180px;	
    text-align: center;
    width: 300px;
    margin: auto;
	background-color:#c00;
	color:#fff;
}
.correct{
	font-size: 200px;
	line-height: 180px;	
    text-align: center;
    width: 300px;
    margin: auto;
	background-color:#0066ff;
	color:#fff;
}
.equationContainer {
	white-space:nowrap;
}

.equationContainer div{
	display:inline-block;
	white-space:nowrap;
}
.operation div{
	font-weight:bold;
	display:inline-block;
	white-space:nowrap;	
}
.operation {
	padding-left:90px;
}
.operation div{
	font-size:40px;
	margin:5px 30px;
}
#topSpacer, #botSpacer{
	width:50px;
}
hr{
	margin:0;
}
.number-wrapper {
    display: block;
    padding: 5px 10px; 
    text-align: center;
}
.numberValues {
    display: inline-block;
    width: 2.0em;
    height: 2.0em;
    line-height: 2.0em;
    font-size: 2.5em;
    padding: 4px 8px;
    border-radius: 4px;
    margin: 3px 3px;
    background: #ddd;
    color: #333;
    cursor: pointer;
    box-sizing: content-box;
	}
	/************************** HIDING AGAIN BUTTON FOR NOW ****************/
.again, .hide, #MultDiv{display:none;}	
    input[type=radio] {
    border: 0px;
    width: 50px;
    height: 2em;
}
.show{
	display:block !important;
}
#MultDiv{
	text-align:right;
}
.wrong{
	text-decoration:line-through;
}
#celebration{
	display:none;
	position:fixed;
	z-index:5000;
	background-image:url(celebration.gif);
	background-repeat:no-repeat;
	background-size:100%;
	height:100%;
	width:100%;

}
#celebration img{
	width:100%;

}
#celebration div{
	font-size:70px;
	color:#0f8;
	_text-align:center;
	_width:100%;
}
.messages{display:none;}
#initial{
	position:fixed;
	z-index:6000;
	background-color:#fff;
	height:100%;
	width:100%;
}
#initial div{
	font-size:70px;
	color:#000;
	_text-align:center;
	_width:100%;
}
</style>
</head>
<!--<body onload="newProblemAdd(true)">-->
<body>
<div id="initial">
	<div>Who are you?</div>
	<button onclick="$opt.user('Johnny');">Johnny</button>
	<button onclick="$opt.user('Markie');">Markie</button>
</div>
<div id="celebration">
	<!-- <img src="celebration.gif" /> -->
	<div>YOU GOT <span id="streakLength">6</span> STRAIGHT!!!</DIV>
</div>
<div class="operation">
	<div class="forMarc">+<input type="radio" name="operation" value="add" checked onclick="newProblemAdd(true)" ></div>
	<div class="forMarc">&#x2212;<input type="radio" name="operation" value="sub" onclick="newProblemSub(true)" ></div>
	<div class="forJohnny">&#x00d7;<input type="radio" name="operation" value="mult" onclick="newProblemMult(true)" ></div>
	<div class="forJohnny">&#x00f7;<input type="radio" name="operation" value="div" onclick="newProblemDiv(true)"></div>
</div>
<div class="card">
	<div class="equation">
		<div class="equationContainer">
			<div id="topSpacer">&nbsp;</div>
			<div id="top"></div>
		</div>
		<div class="equationContainer">		
			<div id="botSpacer"></div>
			<div id="bot"></div>
		</div>		
		<hr/>
		<div id="total"></div>
		<div id="MultDiv"></div>	
	</div>
	<div id="answers">

	</div>
</div>

<div class="again">
	<button onclick="newProblemAdd()" type="button">Again</button>
</div>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" id="testData">
	<input type="hidden" name="name" id="name" value=""/>
	<input type="hidden" name="operation" id="operation" value=""/>
	<input type="hidden" name="correct" id="correct" value=""/>
	<input type="hidden" name="incorrect" id="incorrect" value=""/>
	<input type="hidden" name="tried" id="tried" value=""/>
	<input type="hidden" name="nextOperation" id="nextOperation" value=""/>
</form>
<div class="messages">
<?php
$name = $email = $operation = $correct = $incorrect = $nextOperation = "";
echo "in bottom PHP with " . $_SERVER["REQUEST_METHOD"];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	echo "<br/>in post";
    $tried = test_input($_POST["tried"]);
	echo "<br/>tried is " . $tried;
	if($tried !== -1){
		echo "<br/> in tried";
		$name = test_input($_POST["name"]);
		echo "<br/> name is :" . $name;
		$operation = test_input($_POST["operation"]);
		echo "<br/> operation is :" . $operation;
		$correct = test_input($_POST["correct"]);
		echo "<br/> name is :" . $name;
		$incorrect = test_input($_POST["incorrect"]);
		echo "<br/> name is :" . $name;
		$nextOperation = test_input($_POST["nextOperation"]);		
		echo "<br/> name is :" . $name;
		echo "<div>" . $name . " got " . $correct . " right and " . $incorrect . " wrong while doing " . $tried . "with " . $nextOperation . " as the next operation</div>";
		//echo '<script>$opt.myNextOperation="' . $nextOperation . '";</script>';
		/*
		// sql to create table
		$sql = "CREATE TABLE MyQuizes(
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
		name VARCHAR(32) NOT NULL,
		operation VARCHAR(32) NOT NULL,
		correct int,
		incorrect int,
		reg_date TIMESTAMP
		)";	*/		
		/*
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
		*/
		/*
		$sql = "INSERT INTO MyQuizes (name, operation, correct, incorrect) VALUES ('.$name.', '.$operation.', '.$correct.', '.$incorrect.')";
		if (mysqli_query($db_conn, $sql)) {
			echo "Table MyQuizes had a row inserted";
		} else {
			echo "Error creating table: " . mysqli_error($db_conn);
		}		
		*/
	}
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>

<div>
<?php echo $name;?> got <?php echo $correct;?> right and <?php echo $incorrect;?> wrong while doing <?php echo $tried;?>  with <?php echo $nextOperation;?> as the next operation</div>
</div>
</div>

<script>
$opt.myNextOperation="<?php echo $nextOperation;?>";
var inputs=document.getElementsByTagName("input"),i,len, n;
$opt.operationInputs={};
for(i=0,len=inputs.length;i<len;i+=1){
	if(inputs[i].type==="radio"){
		$opt.operationInputs[inputs[i].value]=inputs[i];
	}
}

if($opt.myNextOperation==='')$opt.myNextOperation='add';
for(n in $opt.operationInputs){
	if($opt.operationInputs[n].value===$opt.myNextOperation)$opt.operationInputs[n].checked=true;
	else $opt.operationInputs[n].checked=false;
}

if($opt.myNextOperation==='add' ||  $opt.myNextOperation==='')newProblemAdd(true);
else if($opt.myNextOperation==='sub')newProblemSub(true);
else if($opt.myNextOperation==='mult')newProblemMult(true);
else if($opt.myNextOperation==='div')newProblemDiv(true);

</script>

</body>
</html>