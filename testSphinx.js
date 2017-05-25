SphinxClient = require("sphinxapi");
var cl = new  ShinxClient();
cl.SetServer('localhost',9312);
cl.Query('塔吊','goods',function(err, result){
	if(err){
		console.log(err);
		console.log('-------有错------');
	}
	console.log(result);
	for(var key in result['matches']){
		console.log(key+':===:'+result['matches'][key].id);
	}
})