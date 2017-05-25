var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.locals.loginbean = req.session.loginbean;

  keywords = req.query.keywords;
  kwArr = keywords.split('');
  len = kwArr.length;
  keywords  = '';
  for(i = 0;i<len,i++){
  	if(kwArr[i]!=''){
  		keywords += kwArr[i];
  	}
  }
var cl = new SphinxClient();
cl.SetServer('localhost', 9312);
cl.SetMatchMode(', 9312);
cl.Query('塔吊','goods',function(err, result) {
        if(err){
        	console.log(err);
        	console.log('-------有错-----------');
        }
        console.log(result);
        for(var key in result['matches']){ //循环查出的id
			console.log(key+':===:'+result['matches'][key].id);
		}
} );
  //res.render('index', {});
});


module.exports = router;
