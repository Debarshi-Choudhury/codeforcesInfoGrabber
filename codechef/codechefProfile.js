var cheerio = require('cheerio');
var request = require('request');

var codechefProfileFunc = function(user,callback){
  let profile_data = {};
  // console.log("Entered Profile of "+username);
  var url = "http://www.codechef.com/users/" + user;
  request(url,function(err,res,body){

    var $ = cheerio.load(body);
    var star = $('section.user-details ul').children('li').eq(0).find('span').eq(1).text();
    var username = $('section.user-details ul').children('li').eq(0).find('span').eq(2).text();
    var current_rating = $('div.rating-number').text();
    var max_rating = $('div.rating-header small').text();
    var institution = $('section.user-details ul').children('li').eq(5).find('span').eq(0).text();
    // console.log(star);
    // console.log(username);
    // console.log(current_rating);
    // console.log(max_rating);
    // console.log(institution);

    current_rating=parseInt(current_rating);

    max_rating=max_rating.split(' ');
    max_rating=max_rating[2];

    // console.log('max_rating',max_rating);
    if(max_rating==undefined){
      return callback(`User not found with username ${user}`);
    }

    max_rating=max_rating.substring(0,max_rating.length-1);
    max_rating=parseInt(max_rating);

    institution=institution.trim();


    var solved_cnt = $('section.problems-solved h5').eq(0).text();
    solved_cnt = solved_cnt.split('(');
    solved_cnt = solved_cnt[1];
    solved_cnt = solved_cnt.split(')');
    solved_cnt = solved_cnt[0];
    solved_cnt = parseInt(solved_cnt);
    // console.log(solved_cnt);

    var partial_solved_cnt = $('section.problems-solved h5').eq(1).text();
    partial_solved_cnt = partial_solved_cnt.split('(');
    partial_solved_cnt = partial_solved_cnt[1];
    partial_solved_cnt = partial_solved_cnt.split(')');
    partial_solved_cnt = partial_solved_cnt[0];
    partial_solved_cnt = parseInt(partial_solved_cnt);
    // console.log(partial_solved_cnt);

    var solved = [];
    var partial_solved = [];

    var temp = $('section.problems-solved').find('span').children('a');
    $(temp).each(function(i,tmp){
      var x = $(this).attr('href');
      x = x.split(',');
      x = x[0].split('/');
      x = x[x.length-1];
      if(i<solved_cnt)
      {
        solved.push(x);
      }
      else
      {
        partial_solved.push(x);
      }
    });

    // console.log(solved);
    // console.log();
    // console.log(partial_solved);

    var start,end;
    var cnt=0;
    var key,value;
    var stats={};
    var temp2;
    temp=$('script').get()[35].children[0].data;
    // console.log(temp);
    temp2=temp;
    start=temp.search("name:\'solutions_partially_accepted\'");

    temp=temp.substring(start,temp.length);
    start=0;
    while(cnt<6){
      start=temp.search("name:");
      temp=temp.substring(start,temp.length);
      start=0;
      end=6;
      while(temp[end]!='\''){
        end++;
      }
      key=temp.substring(6,end);

      start=temp.search(',y:');
      temp=temp.substring(start+3,temp.length);
      start=0;
      value=0;
      while(true){
        if(!isNaN(parseInt(temp[start]))){
          value=(10*value)+parseInt(temp[start]);
          start++;
        }else{
          cnt++;
          stats[key]=value;
          break;
        }
      }
    }
    // console.log(stats);


    var contests;
    temp=temp2;
    start=temp.search('all_rating =');
    temp=temp.substring(start,temp.length);
    start=13;
    end=temp.search('];');
    end++;

    temp=temp.substring(start,end);
    contests=JSON.parse(temp);
    // console.log(contests);

    for(i=0;i<contests.length;i++){
      contests[i]['getyear']=parseInt(contests[i]['getyear']);
      contests[i]['getmonth']=parseInt(contests[i]['getmonth']);
      contests[i]['getday']=parseInt(contests[i]['getday']);
      contests[i]['rating']=parseInt(contests[i]['rating']);
      contests[i]['rank']=parseInt(contests[i]['rank']);
    }

    profile_data = {
      star,
      username,
      current_rating,
      max_rating,
      institution,
      solved_cnt,
      solved,
      partial_solved,
      // solutions_partially_accepted,
      // time_limit_exceeded,
      // wrong_answers,
      // solutions_accepted,
      // compile_error,
      // runtime_error
      stats,
      contests
    };
    return callback(null,profile_data);
  });
}

module.exports = {
  codechefProfileFunc
};
