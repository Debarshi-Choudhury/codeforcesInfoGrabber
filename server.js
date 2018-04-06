const express = require('express');
const codeforces = require('./codeforces/codeforces');
const spoj = require('./spoj/spoj');
const codechef = require('./codechef/codechef');

var app = express();
const port = process.env.PORT || 3000;


app.get('/codeforces',(req,res)=>{
	var usr=req.query.handle;
	codeforces.codeforcesFunc(usr,(err,data)=>{
		if(err){
			res.send({error:err})
		}else{
			res.send(data);
		}
	});
});

app.get('/codechef',(req,res)=>{
	var usr=req.query.handle;
	codechef.codechefFunc(usr,(err,data)=>{
		if(err){
			res.send({error:err})
		}else{
			res.send(data);
		}
	});
});

app.get('/spoj',(req,res)=>{
	var usr=req.query.handle;
	spoj.spojFunc(usr,(err,data)=>{
		if(err){
			res.send({error:err})
		}else{
			res.send(data);
		}
	});
});

app.listen(port,()=>{
	console.log('server running at port '+port);
});