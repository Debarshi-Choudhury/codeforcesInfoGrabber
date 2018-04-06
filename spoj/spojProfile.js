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


var spojProfileFunc=function(usr,cb){

	var url=`http://www.spoj.com/users/${usr}/`;
	var spojProfile={};

	request(url,(err,resp,body)=>{
		if(!err){
			//console.log(body);
			var $=cheerio.load(body);

			var user_name;
			var handle;
			var points;
			var institution;
			var profile_pic;
			var address;
			var world_rank;
			var classical_probs_solved;

			var accepted;
			var time_lim_exceed;
			var runtime_error;
			var wrong_answer;
			var compilation_error;

			var solved_classical_problem_list=[];
			var todo_classical_problem_list=[];


			var temp,start,end,hold;
			user_name=$('#user-profile-left h3').eq(0).text();

			if(user_name===''){
				return cb(`User not found with username ${usr}`);
			}

			handle=$('#user-profile-left h4').eq(0).text();
			handle=handle.substring(1,handle.length);

			temp=$('#user-profile-left p').eq(2).text();
			world_rank=temp;
			end=0;
			while(true){
				if(temp[end]===')'){
					break;
				}else if(temp[end]==='('){
					start=end;
				}
				end++;
			}
			points=temp.substring(start+1,end);
			points=points.split(' ');
			points=points[0];
			points=parseFloat(points);

			if(world_rank.search('Leader')===-1){
				end=start;
				start=0;
				while(true){
					if(temp[start]==='#'){
						break;
					}
					start++;
				}
				world_rank=world_rank.substring(start+1,end);
				world_rank=parseInt(world_rank);
			}else{
				world_rank=1;
			}

			address=$('#user-profile-left p').eq(0).text();
			address=address.trim();

			institution=$('#user-profile-left p').eq(3).text();
			start=12+institution.search('Institution:');
			end=institution.length;
			institution=institution.substring(start,end);
			institution=institution.trim();

			profile_pic=$('#user-profile-left img').eq(0).attr('src');

			classical_probs_solved=$('div.col-md-12').eq(1).find('dd').eq(0).text();
			classical_probs_solved=parseInt(classical_probs_solved);

			temp=$('script').get()[10].children[0].data;
			start=temp.search('Submissions');
			end=start+11;
			while(true){
				if(temp[end]===']'){
					break;
				}
				end++;
			}
			temp=temp.substring(start,end);
			temp=temp.split(',');
			accepted=parseInt(temp[1]);
			time_lim_exceed=parseInt(temp[2]);
			runtime_error=parseInt(temp[3]);
			wrong_answer=parseInt(temp[4]);
			compilation_error=parseInt(temp[5]);


			temp=$("#user-profile-tables table").eq(0).find('td').each(function(){
				hold=$(this).text();
				if(hold.length>0){
					solved_classical_problem_list.push(hold);
				}
			});

			temp=$("#user-profile-tables table").eq(1).find('td').each(function(){
				hold=$(this).text();
				if(hold.length>0){
					todo_classical_problem_list.push(hold);
				}
			});


			spojProfile={
				user_name,
				handle,
				points,
				institution,
				profile_pic,
				address,
				world_rank,
				classical_probs_solved,
				accepted,
				time_lim_exceed,
				runtime_error,
				wrong_answer,
				compilation_error,
				solved_classical_problem_list,
				todo_classical_problem_list
			};
			cb(null,spojProfile);
			// console.log("scraped:\n ",spojProfile);
		}else{
			cb('Could not fetch spoj profile page');
		}
	});
}

// spojProfileFunc(argv.u,(err,data)=>{
// 	if(err){
// 		return console.log(err);
// 	}
// 	console.log(data);
// });

module.exports={
	spojProfileFunc
};
