// const yargs=require('yargs');
const request=require('request');
const cheerio=require('cheerio');

var pageCountFunc=function(url,callback){

	request(url,(err,resp,body)=>{
		if(err){
			callback('Some error occurred while retrieving submissions page count.');
		}else{
			var $=cheerio.load(body);

			var totalpages=$('div.pagination ul').children('li').eq(-2).text();
			totalpages=parseInt(totalpages);
			if(isNaN(totalpages)){
				totalpages=1;
			}
			// console.log(url);
			// console.log(totalpages);
			callback(null,totalpages);
		}
	});

};

module.exports={
	pageCountFunc
};
