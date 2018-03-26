const yargs=require('yargs');
const request=require('request');
const cheerio=require('cheerio');
const pageCount=require('./pageCount');

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



var submissionsFunc=function(usr,cb){

	var url=`http://codeforces.com/submissions/${usr}`;
	var curr_class;
	var verdict;
	var ques_name;
	var pos;
	var uniq_ques={};

	var no_of_uniq_ques;
	var accepted=0;
	var wrong_answer=0;
	var time_lim_exceed=0;
	var runtime_error=0;
	var mem_lim_exceed=0;
	var hacked=0;
	var compilation_error=0;

	pageCount.pageCountFunc(url,function(error,pages){
		console.log(pages);
		if(error){
			console.log(error);
		}else{
			var page_number= 1;
			function callNext() {
			   if (page_number>pages) {
					requestEnded();
			   }else {
					page_number++;
			   	request(`http://codeforces.com/submissions/${usr}/page/${page_number-1}`, function(err,resp,body) {
							if(err){
								console.log(`Error while retrieving submission page number ${page_number-1}`);
							}
							else{
								var $=cheerio.load(body);

								$('table.status-frame-datatable tr').each(function(){
									curr_class=$(this).attr('class');
									if(curr_class!=='first-row'){
										verdict=$(this).children('td').eq(5).text().trim();
										ques_name=$(this).children('td').eq(3).text();
										pos=ques_name.search('-');
										ques_name=ques_name.substring(pos+1).trim();

										uniq_ques[ques_name]=1;

										verdict=verdict.split(' ');
										verdict=verdict[0].trim();

										if(verdict==='Accepted'){
											accepted++;
										}else if(verdict==='Wrong'){
											wrong_answer++;
										}else if(verdict==='Time'){
											time_lim_exceed++;
										}else if(verdict==='Runtime'){
											runtime_error++;
										}else if(verdict==='Memory'){
											mem_lim_exceed++;
										}else if(verdict==='Compilation'){
											compilation_error++;
										}else if(verdict==='Hacked'){
											hacked++;
										}

										console.log(ques_name);
										console.log(verdict);
									}
								});
							}
			            // Call the next request inside the callback, so we are sure that the
							//next request is ran just after this request has ended
			            callNext();
			   	});
				}
			}
			callNext();

			function requestEnded(){
			    console.log("Yay Request ended");
				 var submissionsData={
			 		uniq_ques,
			 		no_of_uniq_ques,
			 		accepted,
			 		wrong_answer,
			 		time_lim_exceed,
			 		runtime_error,
			 		mem_lim_exceed,
			 		hacked,
			 		compilation_error,
			 	};
				//console.log(submissionsData);
				cb(null,submissionsData);
			}
		}
	});

}

submissionsFunc(argv.u,(err,submissionsData)=>{
	if(err){
		return console.log(err);
	}
	console.log(submissionsData);
});

module.exports={
	submissionsFunc
}
