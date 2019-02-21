
var ballsIntoBoxes=function ballsIntoBoxes(balls, boxes, numberOfRuns)

	var combos={boxes:boxes,balls:balls}, result=[],tmp, tmp2, i, j, n, len, len2, myBoxes={},finalResult={},finalResultPercentage={},
	//numberOfRuns=10000000000;
	numberOfRuns=numberOfRuns;
	for(j=0;j<numberOfRuns;j+=1){
		result=[], myBoxes={};
		for(i=0;i<combos.balls;i+=1){
			tmp=Math.ceil(Math.random()*combos.boxes);
			myBoxes[tmp]=(myBoxes[tmp]?myBoxes[tmp]+=1:1);
		}
		for(n in myBoxes){
			result.push(myBoxes[n]);
		}
		result=result.sort(function(a, b){return b-a}).join('.');

		if(finalResult[result])finalResult[result]+=1;
		else finalResult[result]=1;
		if(!(j%(numberOfRuns/100)))console.log(j/numberOfRuns);
	}
	for(n in finalResult){
		finalResultPercentage[n]=((finalResult[n]/numberOfRuns)*100).toPrecision(4);
	}
	console.log(finalResultPercentage);
	/*  22 combinations 
	1.1.1.1.1.1.1.1:"12.09"
	2.1.1.1.1.1.1:"37.59"
	2.2.1.1.1.1:"28.19"
	2.2.2.1.1:"5.125"
	2.2.2.2:"0.1063"
	3.1.1.1.1.1:"7.512"
	3.2.1.1.1:"6.833"
	3.2.2.1:"0.8545"
	3.3.1.1:"0.2852"
	3.3.2:"0.02191"
	4.1.1.1.1:"0.8538"
	4.2.1.1:"0.4275"
	4.2.2:"0.01652"
	4.3.1:"0.02180"
	4.4:"0.0001830"
	5.1.1.1:"0.05712"
	5.2.1:"0.01313"
	5.3:"0.0002810"
	6.1.1:"0.002233"
	6.2:"0.0001650"
	7.1:"0.00003300"
	8:
	*/
}

















