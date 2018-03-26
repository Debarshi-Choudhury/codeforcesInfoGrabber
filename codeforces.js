const yargs=require('yargs');
const request=require('request');
const cheerio=require('cheerio');

const profile=require('./profile');
const contests=require('./contests');
const submissions=require('./submissions');


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

profile.profileFunc(argv.u,(err1,profileData)=>{
	if(err1){
		return console.log(err1);
	}
	console.log(profileData);
	contests.contestsFunc(argv.u,(err2,contestsData)=>{
		if(err2){
			return console.log(err2);
		}
		console.log(contestsData);
		submissions.submissionsFunc(argv.u,(err3,submissionsData)=>{
			if(err3){
				return console.log(err3);
			}
			console.log(submissionsData);
		});
	});
});
