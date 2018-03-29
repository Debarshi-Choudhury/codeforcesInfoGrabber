const express = require('express');
const codeforces = require('./codeforces');

var app = express();
const port = process.env.PORT || 3000;


app.get('/',(req,res)=>{
	var usr=req.query.handle;
	codeforces.codeforcesFunc(usr,(err,data)=>{
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