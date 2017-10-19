window.doGoogleGraphTest=function(){
	var obj=document.getElementById("graphsContainerBody"), tableInfo=[], nDiv, m, n, nHeader, sel, found=false, selVal=-1, isFF, newGraph,
	isFF=(navigator.userAgent.indexOf("Mozilla")!==-1&&navigator.userAgent.indexOf("Firefox")!==-1?true:false);
	newGraph={	
				A_heroBanner:{"c_ ": "-", "1_get0intro": "17.99%", "2_earnUnlimited": "51.19%"},
				B_benefits:{"1_list": "-12.28%", "c_ ": "-"},
				C_addRewards:{"1_perks": "-6.29%", "c_ ": "-"},
				D_purchaseChart:{"c_ ": "-", "1_none": "5.96%"}
			};
	newGraphConfidence={	
				A_heroBanner:{"c_ ": "-", "1_get0intro": "17.99%", "2_earnUnlimited": "51.19%"},
				B_benefits:{"1_list": "-12.28%", "c_ ": "-"},
				C_addRewards:{"1_perks": "-6.29%", "c_ ": "-"},
				D_purchaseChart:{"c_ ": "-", "1_none": "5.96%"}
			};			
	if(document.cookie.match(/(^|;)\s*opdebugger\=true/))debugger;			
	if(obj){
		for(n in newGraph){
			tableInfo=[];
			if(!document.getElementById('op_'+n)){
				tableInfo.push(["Element", "Percentage Lift",  { role: "style" },  { role: "tooltip" }]);
				nDiv=document.createElement("div");
				nDiv.id='op_'+n;
				nDiv.className="opGraphResults";
				//obj.appendChild(nDiv);
				for(m in newGraph[n]){
					if(m!=='c' && m!=='c ')//Don't show the control
						tableInfo.push([m,parseFloat(newGraph[n][m]),"#0096d6", "oo"+m+"pp"]);
					// /* --- Here is an Example ---
					//var data = google.visualization.arrayToDataTable([
					//	["Element", "Density",  { role: "style" } ],
					//	["4_2_30MinutesBold", 3.99,"#0096d6"],
					//	["5_LimitedAvailability", -4, "#0096d6"],
					//	["1_Expire30minute", -0.3676, "#0096d6"],
					//
					// */
				}
				//tableInfo.push(m,newGraph[n][m],"#0096d6")
				if(tableInfo.length>1){
					obj.appendChild(nDiv);
					var data = google.visualization.arrayToDataTable(tableInfo);
			
					var view = new google.visualization.DataView(data);
					view.setColumns([0, 1,
                       { calc: "stringify",
                         sourceColumn: 1,
                         type: "string",
                         role: "annotation" },
                       2]);
					//4 October - Need to add size parameters to work in Firefox
					if(isFF){
						var options = {
							title: n,
							textAlign: "center",
							//fontSize: 16,
							align:"center",
							width: 575,//4 Oct
							height: 200,//4 Oct
							bar: {groupWidth: "75%"},	//4 Oct			
							legend: { position: "none" },							
							//legend: { position: "left",textAlign:"left", fontSize: 14},
							annotations: {
								textStyle: {
									fontName: 'Times-Roman',
									fontSize: 20,
									bold: true,
									italic: true,
									// The color of the text.
									color: '#871b47',
									// The color of the text outline.
									auraColor: '#d799ae',
									// The transparency of the text.
									opacity: 0.8
								}
							}	
						};
					}
					else{
						var options = {
							title: n,	
							textAlign: "center",
							//fontSize: 16,
							align:"center",
							legend: { position: "none" },
							//legend: { position: "left",textAlign:"left", fontSize:14},
							annotations: {
								textStyle: {
									fontName: 'Times-Roman',
									fontSize: 20,
									bold: true,
									italic: true,
									// The color of the text.
									color: '#871b47',
									// The color of the text outline.
									auraColor: '#d799ae',
									// The transparency of the text.
									opacity: 0.8
								}
							}								
						};								
						
					}
					var chart = new google.visualization.ColumnChart(document.getElementById('op_'+n));
					chart.draw(view, options);
				}
			}
		}
	}		
}
window.didInitGoogle=false;
window.timerCr = setInterval(function(){
	if(typeof(google) !== 'undefined'){	
		if (!window.didInitGoogle) {
			google.charts.load('current', {
				'packages': ['corechart', 'table']
			});
		}
		window.didInitGoogle = true;	
		if(typeof(google.visualization) !== 'undefined' && typeof(google.visualization.arrayToDataTable) !== 'undefined' &&typeof(google.visualization.ColumnChart) !== 'undefined'){
			clearInterval(window.timerCr);		
			doGoogleGraphTest();
		}
		else{
			console.log('functions not defined')
		}
	}
},100);