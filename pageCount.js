const yargs=require('yargs');
const request=require('request');
const cheerio=require('cheerio');


var pageC=function(url,callback){

	request(url,(err,resp,body)=>{
		if(err){
			callback('Some error occurred.');
		}else{
			var $=cheerio.load(body);

			var totalpages=$('div.pagination ul').children('li').eq(-2).text();
			totalpages=parseInt(totalpages);
			// console.log(url);
			// console.log(totalpages);
			callback(null,totalpages);
		}
	});

};

module.exports={
	pageC
};


