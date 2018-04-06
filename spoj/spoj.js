var spojProfile = require('./spojProfile');

var spojFunc = function(username,callback){
  // console.log("hey "+username);
  spojProfile.spojProfileFunc(username,function(err,data){
    if(err){
      // console.log(err);
      return callback(err);
    }
    var sendData={
    	source:'spoj',
    	data
    };
    return callback(null,sendData);
  });
}

// //for Testing Purpose
// spojFunc('',(err,data)=>{
//   console.log(JSON.stringify(data,null,2));
// });

module.exports = {
  spojFunc
};
