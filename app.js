var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/lagou").then(function(db){
	console.log("连接数据库成功");
})
var app = express();
var upload = require("./util/upload");
var User = require("./model/user");
var Position = require("./model/position");

app.use(express.static("pages"));
app.use(express.static("static"));
app.use(express.static("uploadcache"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));


/***************注册**************/
app.post("/register",function(req,res){
	let{username,password,email} = req.body;
	
	User.find({username},function(err,doc){
		console.log(doc)
		if(doc.length){
			res.json({
				code:0,
				msg:"账号已存在！"
			})
		}else{
			// if(doc[0].email == email){
			// 	alert("邮箱已存在！");
			// 	return;
			// }
			var u = new User({
				username,
				password,
				email
			});

			u.save(function(err,doc){
				if(err){
					console.log(err);
				}
				res.json({
					code:1,
					msg:"注册成功！"
				});
			});
		}
	});
});

/***************登录**************/
app.post("/login",function(req,res){
	let{use,pwd} = req.body;
	User.find({username:use},function(err,doc){
	
		if(doc.length){
			if(doc[0].password != pwd){
				res.json({
					code:0,
					msg:"密码错误！"
				});
				return;
			}
			res.json({
				code:1,
				msg:"登录成功！"
			})
		}else{
			res.json({
				code:0,
				msg:"用户名不存在！"
			})
		}
	});
});

/***************加载列表**************/
app.post("/position",function(req,res){
	Position.count({},function(err,doc){
		if(err)
		return;
		res.json({
			code:0,
			list:doc
		})
	});
});
/***************加载职位信息**************/
app.post("/upload/position",function(req,res){
	let{logo, position, company, experience, type, site, pay} = req.body;
	var p = new Position({
		logo,
		position,
		company,
		experience,
		type,
		site,
		pay
	});

	p.save((err,doc)=>{
		if(err)
		   return;
		res.json({
			code:0,
			position:doc
		})
	});

});
/***************删除**************/
app.post("/delete/position",function(req,res){
	var _id = req.body;
	Position.findOneAndRemove({_id},function(err){
		if(err)
			return;
		res.json({
			code:0,
			msg:"删除成功！"
		})
	});
});

/***************修改**************/
app.post("/update/position",function(req,res){
	
	let {id,logo, position, company, experience, type, site, pay,order} = req.body;
	Position.findOneAndUpdate({_id:id},req.body,{new:true},function(err,doc){
		if(err) return;
		res.json({
			code:0,
			doc:doc
		});
	});
});

/***************分页**************/
app.post("/page",function(req,res){
	let {page} = req.body;
	Position.find({},null,{skip:(page-1)*5,limit:5},function(err,doc){
		if(err){
 			return
 		}
 		res.json({
 			code:0,
 			list:doc
 		});
	});
});

app.post("/upload",function(req,res){
	upload.upload(req,res);
});
app.listen(8090,function(){
	console.log("启动成功！！！")
});