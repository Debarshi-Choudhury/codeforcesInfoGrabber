const yargs=require('yargs');
const request=require('request');
const cheerio=require('cheerio');

const profile=require('./profile');
const contests=require('./contests');


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

profile.profileFunc(argv.u,(err,profileData)=>{
	if(err){
		return console.log(err);
	}
	console.log(profileData);
	contests.contestsFunc(argv.u,(err,contestsData)=>{
		if(err){
			return console.log(err);
		}
		console.log(contestsData);
	});
});
