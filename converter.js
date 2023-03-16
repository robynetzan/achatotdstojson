const fs = require("fs");
const csv=require('csvtojson');
const csvFilePath='./otd.csv';

var main = async function(){
	
var otds = await csv()
	.fromFile(csvFilePath)
	.then((jsonObj)=>{
		return(jsonObj);
	});
	
	console.log(otds);
	
	var newOtds = {};
	
	for (var d in otds) {
		
		var date = otds[d].date;
		
		var year = date.slice(0,4);
		var month = date.slice(5,7);
		var day = date.slice(8,10);
		
		if (!newOtds.hasOwnProperty(year)) {
			newOtds[year] = {};
		}
		if (!newOtds[year].hasOwnProperty(month)) {
			newOtds[year][month] = {};
		}
		if (!newOtds[year][month].hasOwnProperty(day)) {
			newOtds[year][month][day] = [];
		}
		
		newOtds[year][month][day].push(otds[d].item);
		
	}
	
	
	
	console.log(newOtds[2018][10]);
	
	fs.writeFileSync("otds.json", JSON.stringify(newOtds, null, 2));
	
}();