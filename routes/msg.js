var express = require('express');
var router = express.Router();
var sequelize =require('../models/ModelHeader')();

/* GET home page. */
router.post('/sendmsg', function(req, res, next) {
  loginbean = req.session.loginbean
  res.locals.loginbean = loginbean;
 //  接参
  nicheng = req.body.nicheng;
  arr = nicheng.split(';');
  len = arr.length;
  sql = 'select id from users where nicheng=?';
  sqlmsg = 'insert into msgs set sendid=?,toid=?,message=?';
  sqlupd = 'update users set msgnum=msgnum+1 where id=?';
  flag=0;
  var exec=function(i){
  	toids={}
  	return function(){
  		sequelize.query(sql,{replacements: [arr[i]]}).then(function(rs){
		 	rsjson = JSON.parse(JSON.stringify(rs[0])); //rowdatapacke转json
		 	if(rsjson.length==0){
		 		flag++;
		 		return;
		 	}
		 	toids[i] = rsjson[0].id;
		 	// 然后插入消息表
		 	sequelize.query(sqlmsg,{replacements: [loginbean.id,toids[i],req.body.message]}).then(function(rs){
		 		sequelize.query(sqlupd,{replacements: [toids[i]]}).then(function(rs){
		 			flag++;
		 			if(flag==len){
		 				res.send('1');
		 			}
		 		})
		 	})
		 });
  	}
  }
  for(i=0;i<len;i++){
  	fun=exec(i);
  	fun();
  }
 // 用昵称查找对应的uid
 
 
	// 更新user表msgnum+1
	// 返回客户端，客户端收到后弹成功，关闭模态框

});

router.get('/dele', function(req, res, next) {
	loginbean = req.session.loginbean;
  	res.locals.loginbean = loginbean;
  //用昵称去查找对应的id --user
  	id = parseInt(req.query.id);
  	console.log('------------------通过---------------');
  	sqldel = 'delete from msgs where id=? and toid=?';
  	sequelize.query(sqldel,{replacements:[id,loginbean.id]}).then(function(err,rs){
	  		if(err){
	  			console.log(err)
	  		}
	  		if(loginbean.role > 0){
	  			res.redirect('/home');
	  		}else{
	  			res.redirect('/admin/adminHome');
	  		}
					
				});
	  	});

router.get('/delGoods', function(req, res, next) {
	loginbean = req.session.loginbean;
  	res.locals.loginbean = loginbean;
  //用昵称去查找对应的id --user
  	id = parseInt(req.query.id);
  	console.log('------------------通过---------------');
  	sqldel = 'delete from goods where id=? and uid=?';
  	sequelize.query(sqldel,{replacements:[id,loginbean.id]}).then(function(err,rs){
	  		if(err){
	  			console.log(err)
	  		}
	  		if(loginbean.role > 0){
	  			res.redirect('/home/shopmanage');
	  		}else{
	  			res.redirect('/admin/adminHome');
	  		}
					
				});
	  	});





module.exports = router;

