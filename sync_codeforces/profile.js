// const yargs=require('yargs');
const request=require('request');
const cheerio=require('cheerio');

// const argv=yargs
// 	.options({
// 		username:{
// 			demand:true,
// 			describe:'codeforces username to fetch data for',
// 			alias:'u',
// 			string:true
// 		}
// 	})
// 	.help()
// 	.alias('help','h')
// 	.argv;


var profileFunc=function(usr,cb){

	var url="http://codeforces.com/profile/"+usr;
	var profile={};

	request(url,(err,resp,body)=>{
		if(!err){
			//console.log(body);
			var $=cheerio.load(body);

			var user_name=$('div.main-info h1 a').text();
			var user_rank=$('div.user-rank span').text();
			var rating=$('div.info ul').children('li').eq(0).children('span').eq(0).text();
			var max_user_rank=$('div.info ul').children('li').eq(0).find('span').eq(2).text();
			var max_rating=$('div.info ul').children('li').eq(0).find('span').eq(3).text();
			//var contribution=$('div.personal-sidebar').children().eq(0).attr('class');  //find('ul').eq(0).children('li').eq(1).find('span').eq(0).text();

			//parse some of the data to numbers and clean some of the strings
			user_rank=user_rank.trim();

			rating=parseInt(rating);

			max_user_rank=max_user_rank.split(',');
			max_user_rank=max_user_rank[0];

			max_rating=parseInt(max_rating);


			if(user_name.length===0){
				cb('No such user exists with username '+usr);
				return;
			}

			profile={
				user_name,
				user_rank,
				rating,
				max_user_rank,
				max_rating
			};
			cb(null,profile);
			// console.log("scraped:\n ",profile);
		}else{
			cb('Could not fetch profile page');
		}
	});
}


module.exports={
	profileFunc
};
