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

var contestsFunc=function(usr,cb){
	var url="http://codeforces.com/contests/with/"+usr;
	var contests=[];
	var contest={};
	var tempstr;

	request(url,(err,resp,body)=>{
		if(!err){
			//console.log(body);
			var $=cheerio.load(body);

			$('table.user-contests-table tbody').eq(0).children('tr').each(function(){
				var temp=$(this).children('td');
				var contest_sl_no=$(temp).eq(0).text();
				var contest_name=$(temp).eq(1).text();
				var rank=$(temp).eq(2).text();
				var solved=$(temp).eq(3).text();
				var rating_change=$(temp).eq(4).text();
				var new_rating=$(temp).eq(5).text();

				//parse all these data to remove spaces and \n  and convert some strings to number
				contest_sl_no=parseInt(contest_sl_no);

				contest_name=contest_name.replace(/\n/g,' ');
				contest_name=contest_name.split(' ');
				contest_name=contest_name.filter((item)=>item!=='');
				tempstr=contest_name[0];
				for(var i=1;i<contest_name.length;i++){
					tempstr=tempstr+' '+contest_name[i];
				}
				contest_name=tempstr;

				rank=rank.replace(/\n/g,' ');
				rank=rank.split(' ');
				rank=rank.filter((item)=>item!=='');
				rank=rank[0];
				rank=parseInt(rank);

				solved=solved.replace(/\n/g,' ');
				solved=solved.split(' ');
				solved=solved.filter((item)=>item!=='');
				solved=solved[0];
				solved=parseInt(solved);

				rating_change=rating_change.replace(/\n/g,' ');
				rating_change=rating_change.split(' ');
				rating_change=rating_change.filter((item)=>item!=='');
				rating_change=rating_change[0];
				rating_change=parseInt(rating_change);

				new_rating=new_rating.replace(/\n/g,' ');
				new_rating=new_rating.split(' ');
				new_rating=new_rating.filter((item)=>item!=='');
				new_rating=new_rating[0];
				new_rating=parseInt(new_rating);

				contest={
					contest_sl_no,
					contest_name,
					rank,
					solved,
					rating_change,
					new_rating
				};

				//console.log(contest);
				contests.push(contest);
			});
			cb(null,contests);
			//console.log("scraped:\n ",contests);
		}else{
			cb('Could not fetch contest page');
		}
	});

}



module.exports={
	contestsFunc
};
