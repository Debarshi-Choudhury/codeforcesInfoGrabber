// const yargs=require('yargs');
const request=require('request');
const cheerio=require('cheerio');

const profile=require('./profile');
const contests=require('./contests');
const submissions=require('./syncSubmissions');


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

var codeforcesFunc=(usr,cb)=>{
	var finalObject={};

	profile.profileFunc(usr,(err1,profileData)=>{
		if(err1){
			cb(err1);
			return;
		}
		// console.log(profileData);
		contests.contestsFunc(usr,(err2,contestsData)=>{
			if(err2){
				cb(err2);
				return;
			}
			// console.log(contestsData);
			submissions.submissionsFunc(usr,(err3,submissionsData)=>{
				if(err3){
					cb(err3);
					return;
				}
				// console.log(submissionsData);
				finalObject={
					source:'codeforces',
					profileData,
					contestsData,
					submissionsData
				};
				// console.log(JSON.stringify(finalObject,null,2));
				cb(null,finalObject);
			});
		});
	});
}

module.exports={
	codeforcesFunc
};

// //for testing
// codeforcesFunc('xracer108',(err,body)=>{
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(body);
// 	}
// });