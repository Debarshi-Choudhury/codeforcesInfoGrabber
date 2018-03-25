const yargs=require('yargs');
const request=require('request');
const cheerio=require('cheerio');

const argv=yargs
	.options({
		username:{
			demand:true,
			describe:'codeforces username to fetch data for',
			alias:'u',
			string:true
		}
	})
	.help()
	.alias('help','h')
	.argv;

var url="http://codeforces.com/profile/"+argv.u;
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




		profile={
			user_name,
			user_rank,
			rating,
			max_user_rank,
			max_rating
		};
		//console.log("scraped:\n ",profile);
	}
});

var url="http://codeforces.com/contests/with/"+argv.u;
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
		console.log("scraped:\n ",contests);
	}
});


module.exports={
	profile,
	contests
};

