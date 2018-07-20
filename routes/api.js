var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

router.get('/blogs', function(req, res, next) {
  var BlogSchema = require('../model/blog');
  var BlogModel = mongoose.model('ngnode_blogs',BlogSchema.BlogSchema,'ngnode_blogs');
  BlogModel.find({},function(err,doc){
    //console.log(doc);
    res.json(doc);
  });
});

router.post('/authenticate',function(req,res, next){
  var sess = req.session;
  var input_username = req.body.username;
  var input_password = req.body.password;

  var UserSchema = require('../model/user');
  var userModel = mongoose.model('ngnode_users',UserSchema.UserSchema,'ngnode_users');
  userModel.findOne({username:input_username, password: input_password}).exec(function(err,user){
    if(err){console.log(err); }
    
    //console.log(user);
    if(user){
      if(user.username==input_username && user.password == input_password){
        sess.user_id = user._id;
        sess.email = user.email;
        sess.username = user.username;
        console.log(req.session);
        res.send(true);
      }else{
        res.send(false);
      }
    }else{
      console.log('Username Not Found');
      res.send(false);
    }
  });
  

});

router.get('/checksession',function(req,res, next){
  var sess = req.session;
  //res.json(sess);
  console.log(sess);
   if(sess.email == '' || undefined == sess.email){
     res.send(false);
   }else{
     res.send(sess);
   }
});

router.get('/logout',function(req,res, next){
  var sess = req.session;
  sess.email='';
  res.send(true);
});

// router.get('/setsession',function(req,res, next){
//   var sess = req.session;
//   sess.email = 'chandanp619@gmail.com';
//   res.json(sess);
// });


router.get('/allusers',function(req,res,next){

  var UserSchema = require('../model/user');
  var userModel = mongoose.model('ngnode_users',UserSchema.UserSchema,'ngnode_users');
  userModel.find({}).exec(function(err,user){
    if(err){console.log(err); }
    //console.log(user);
    if(user){
        res.json(user);
      }else{
        res.send(false);
      }
    
  });
  
});


router.post('/addNewUser', function(req,res,next){


  var ObjectId = require('mongodb').ObjectID;
  var UserSchema = require('../model/user');
  var userModel = mongoose.model('ngnode_users',UserSchema.UserSchema,'ngnode_users');

  var input_username = req.body.username;
  var input_password = req.body.password;
  var input_usertype = req.body.usertype;
  var input_email = req.body.email;

  var NewUser = new userModel({
    _id:ObjectId(),
    username:input_username,
    password:input_password,
    email:input_email,
    usertype:input_usertype
  });

  NewUser.save(function(err,user){
    if(err){console.log(err); res.json({"status":"Error in Adding New User"}); }
    
        res.json({"status":"User Added Successfully"});
  });
});

router.get('/getUser/:id',function(req,res,next){
  var uid = req.params.id;
  //res.json({_id:uid});
  var UserSchema = require('../model/user');
  var userModel = mongoose.model('ngnode_users',UserSchema.UserSchema,'ngnode_users');
      userModel.find(function(err,userdata){
        if(err){res.json({"error":"User Not Found"});}
        userdata.forEach(function(elem,index){
          if(elem._id==uid){
            res.json(elem);
          }
        });
        
      });
});

router.get('/deleteUser/:userid',function(req,res,next){
  var uid = req.params.userid;
  console.log('Deleting User: '+uid);
  var UserSchema = require('../model/user');
  var userModel = mongoose.model('ngnode_users',UserSchema.UserSchema,'ngnode_users');
      userModel.deleteOne({"_id":ObjectId(uid)},function(err,userdata){
        if(err){res.json({"error":"User Not Found"});}
            console.log(userdata);
            res.json({'status':'Success'});
         
        
      });
});


router.post('/updateUser', function(req,res,next){


  var UserSchema = require('../model/user');
  var userModel = mongoose.model('ngnode_users',UserSchema.UserSchema,'ngnode_users');

  var input_username = req.body.username;
  var input_password = req.body.password;
  var input_usertype = req.body.usertype;
  var input_email = req.body.email;
  var userID = req.body._id;

  var ExistingUserNewData = {username:input_username,password:input_password,email:input_email,usertype:input_usertype};
  console.log(ExistingUserNewData);
  userModel.update({_id:ObjectId(userID)},ExistingUserNewData, { multi: true }, function(err,user){
    if(err){console.log(err); res.json({"status":"Error in Updating User"}); }
    
        res.json({"status":"User Updated Successfully",userd:user});
  });
});


module.exports = router;