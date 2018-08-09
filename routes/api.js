var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var formidable = require('formidable');
var fs = require('fs');


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
      userModel.findOne({"_id":ObjectId(uid)},function(err,userdata){
        if(err){res.json({"error":"User Not Found"});}
        // userdata.forEach(function(elem,index){
        //   if(elem._id==uid){
        //     res.json(elem);
        //   }
        res.json(userdata);
        //});
        
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
  var metaData = req.body.meta;
  var input_image = req.body.image;
  
  var DataMeta = [];

  metaData.forEach(function(element){
    if(element.key!=""){
      DataMeta.push(element);
    }
  });
    

  var ExistingUserNewData = {username:input_username,password:input_password,email:input_email,usertype:input_usertype,meta:DataMeta,image:input_image};
  console.log(ExistingUserNewData);
  userModel.update({"_id":ObjectId(userID)},ExistingUserNewData, { multi: true }, function(err,user){
    if(err){console.log(err); res.json({"status":"Error in Updating User"}); }
    
        res.json({"status":"User Updated Successfully",userd:user});
  });
});

/************************************************************************************************** */

router.get('/pages', function(req,res,next){
   var PageSchema = require('../model/page');
   var PageModel = mongoose.model('ngnode_pages',PageSchema.PageSchema,'ngnode_pages');
  PageModel.find({}).exec(function(err,pages){
    if(err){console.log(err); }
    //console.log(user);
    if(pages){
        res.json(pages);
      }else{
        res.send(false);
      }
    
  });
});

router.get('/page/:id', function(req,res,next){
  var pid = req.params.id;
  //res.json({_id:uid});
  var PageSchema = require('../model/page');
  var pageModel = mongoose.model('ngnode_pages',PageSchema.PageSchema,'ngnode_pages');
      pageModel.findOne({"_id":ObjectId(pid)},function(err,page){
        if(err){res.json({"error":"Page Not Found"});}

        res.json(page);
      
        
      });
});

router.post('/page/add/:id', function(req,res,next){
  
});

router.post('/page/edit/:id', function(req,res,next){
  var PageSchema = require('../model/page');
  var pageModel = mongoose.model('ngnode_pages',UserSchema.UserSchema,'ngnode_pages');

  var input_title = req.body.title;
  var input_slug = req.body.slug;
  var input_date = new Date().toDateString();
  var input_content = req.body.content;
  var metaData = req.body.meta;
  
  var DataMeta = [];

  metaData.forEach(function(element){
    if(element.key!=""){
      DataMeta.push(element);
    }
  });
    

  var ExistingPageNewData = {title:input_title,slug:input_slug,date:input_date,content:input_content,meta:DataMeta};
  console.log(ExistingPageNewData);
  userModel.update({"_id":ObjectId(id)},ExistingPageNewData, { multi: true }, function(err,user){
    if(err){console.log(err); res.json({"status":"Error in Updating Page"}); }
    
        res.json({"status":"Page Updated Successfully",userd:user});
  });
});

router.get('/page/delete/:id', function(req,res,next){
  
});
/**************************************************************************** */

router.get('/allmedia', function(req,res,next){
  var MediaSchema = require('../model/media');
  var MediaModel = mongoose.model('ngnode_media',MediaSchema.MediaSchema,'ngnode_media');
  MediaModel.find({}).exec(function(err,medias){
   if(err){console.log(err); }
   //console.log(user);
   if(medias){
       res.json(medias);
     }else{
       res.send(false);
     }
   
 });
});

router.post('/addNewMedia', function(req,res,next){


  var ObjectId = require('mongodb').ObjectID;
  var MediaSchema = require('../model/media');
  var MediaModel = mongoose.model('ngnode_media',MediaSchema.MediaSchema,'ngnode_media');

  var newMedia = new MediaModel({
    _id       : ObjectId(),
    filename  : req.body.mediaUpload.filename,
    filetype  : req.body.mediaUpload.filetype,
    value     : req.body.mediaUpload.value
  });
  

  newMedia.save(function(err,media){
    res.send(media);
  });
  
  
});


module.exports = router;