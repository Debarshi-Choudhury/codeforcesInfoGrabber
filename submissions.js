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

var url=`http://codeforces.com/submissions/${argv.u}`;
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


pageCount.pageC(url,function(error,pages){
	//console.log(pages);
	if(error){
		console.log(error);
	}else{
		for(var page_number=1;page_number<=pages;page_number++){
			url=`http://codeforces.com/submissions/${argv.u}/page/${page_number}`;
			request(url,(err,resp,body)=>{
				if(!err){
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
			});	
		}

	}

	
	module.exports={
		uniq_ques,
		no_of_uniq_ques,
		accepted,
		wrong_answer,
		time_lim_exceed,
		runtime_error,
		mem_lim_exceed,
		hacked,
		compilation_error
	};

	console.log(module.exports);



});


//no_of_uniq_ques=uniq_ques.length;
