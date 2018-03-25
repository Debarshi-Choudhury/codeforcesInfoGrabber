

// request(url,(err,resp,body)=>{
// 	if(!err){
// 		//console.log(body);
// 		var $=cheerio.load(body);

// 		totalpages=$('div.pagination ul').children('li').eq(-2).text();
// 		totalpages=parseInt(totalpages);

// 		$('table.status-frame-datatable tr').each(function(){
// 			curr_class=$(this).attr('class');
// 			if(curr_class!=='first-row'){
// 				verdict=$(this).children('td').eq(5).text().trim();
// 				ques_name=$(this).children('td').eq(3).text();
// 				pos=ques_name.search('-');
// 				ques_name=ques_name.substring(pos+1).trim();

// 				uniq_ques[ques_name]=1;

// 				verdict=verdict.split(' ');
// 				verdict=verdict[0];

// 				if(verdict==='Accepted'){
// 					accepted++;
// 				}else if(verdict==='Wrong'){
// 					wrong_answer++;
// 				}else if(verdict==='Time'){
// 					time_lim_exceed++;
// 				}else if(verdict==='Runtime'){
// 					runtime_error++;
// 				}else if(verdict==='Memory'){
// 					mem_lim_exceed++;
// 				}else if(verdict==='Compilation'){
// 					compilation_error++;
// 				}else if(verdict==='Hacked'){
// 					hacked++;
// 				}

// 				console.log(ques_name);
// 				console.log(verdict);
// 			}
// 		});
// 	}
// });


for(page_number=1;page_number<=4;page_number++){
	url=`http://codeforces.com/submissions/${argv.u}/page/${page_number}`;
	console.log(url);
	request(url,(err,resp,body)=>{
		if(!err){
			var $=cheerio.load(body);

			if(page_number===1){
				totalpages=$('div.pagination ul').children('li').eq(-2).text();
				totalpages=parseInt(totalpages);
			}

			$('table.status-frame-datatable tr').each(function(){
				curr_class=$(this).attr('class');
				if(curr_class!=='first-row'){
					verdict=$(this).children('td').eq(5).text().trim();
					ques_name=$(this).children('td').eq(3).text();
					pos=ques_name.search('-');
					ques_name=ques_name.substring(pos+1).trim();

					uniq_ques[ques_name]=1;

					verdict=verdict.split(' ');
					verdict=verdict[0];

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


