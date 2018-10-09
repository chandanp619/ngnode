var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var formidable = require('formidable');
var fs = require('fs');
var slugify = require('slugify');

const crypto = require('crypto');

router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

/**
 * Get a list of visible blogs
 *
 * @section Blogs
 * @type get
 * @url /blogs
 */
router.get('/blogs', function(req, res, next) {
  var BlogSchema = require('../model/blog');
  var BlogModel = mongoose.model('ngnode_blogs',BlogSchema.BlogSchema,'ngnode_blogs');
  BlogModel.find({},function(err,doc){
    //console.log(doc);
    res.json(doc);
  });
});

/**
 * Authenticate an user
 *
 * @section Users
 * @type post
 * @url /authenticate
 * @param {string} username 
 * @param {string} password
 */
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

/**
 * Validate User Session
 *
 * @section Users
 * @type get
 * @url /checksession
 * @param {Object} session 
 */
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

/**
 * User logout
 *
 * @section Users
 * @type get
 * @url /logout
 * @param {Object} session 
 */
router.get('/logout',function(req,res, next){
  var sess = req.session;
  sess.email='';
  res.send(true);
});

/**
 * All Users
 *
 * @section Users
 * @type get
 * @url /allusers
 */
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

/**
 * Add New User
 *
 * @section Users
 * @type post
 * @url /addNewUser
 * @param {String} username 
 * @param {String} password 
 * @param {String} usertype 
 * @param {String} email  
 */
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

/**
 * Get Single User
 *
 * @section Users
 * @type get
 * @url /getUser/:id  
 * @param {ObjectID} id  
 */
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

/**
 * Delete Single User
 *
 * @section Users
 * @type get
 * @url /deleteUser/:userid  
 * @param {ObjectID} userid  
 */
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

/**
 * Get All Pages
 *
 * @section Pages
 * @type get
 * @url /pages 
 */

router.get('/pages', function(req,res,next){

   var UserSchema = require('../model/user');
   var UserModel = mongoose.model('ngnode_users',UserSchema.UserSchema);
   var PageSchema = require('../model/page');
   var PageModel = mongoose.model('ngnode_pages',PageSchema.PageSchema,'ngnode_pages');
  PageModel.find({}).populate({path:'user',select:'username email'}).exec(function(err,pages){
    if(err){console.log(err); }
    //console.log(user);
    if(pages){
        res.json(pages);
      }else{
        res.send(false);
      }
  

  });
});
/**
 * Get Single Page By ID
 *
 * @section Pages
 * @type get
 * @url /page/:id
 * @param {ObjectID} id 
 */
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

router.get('/page/slug/:slug', function(req,res,next){
  var slug = req.params.slug;
  var PageSchema = require('../model/page');
  var pageModel = mongoose.model('ngnode_pages',PageSchema.PageSchema,'ngnode_pages');
      pageModel.findOne({"slug":slug},function(err,page){
        if(err){res.json({"error":"Page Not Found"});}else{
          res.json(page);
        }
      });
});
/**
 * Add New Page
 *
 * @section Pages
 * @type post
 * @url /page/add/
 * @param {ObjectID} xxx 
 */
router.post('/page/add/', function(req,res,next){
  var title = req.body.title;
  var content = req.body.content;
  var slug = slugify(title.toLowerCase());
  var sess = req.session;
  var metaData = req.body.meta;
  var PageModelSchema = require('../model/page');
  var pageModel = mongoose.model('ngnode_pages',PageModelSchema.PageSchema,'ngnode_pages');

  var DataMeta = [];

  metaData.forEach(function(element){
    if(element.key!=""){
      DataMeta.push(element);
    }
  });

  var NewPage = new pageModel({
    _id:ObjectId(),
    title:title,
    content:content,
    slug:slug,
    date:new Date().toLocaleDateString(),
    user:sess.user_id,
    meta:DataMeta
  });

  NewPage.save(function(err,Page){
    if(err){console.log(err); }
    res.json({'status':'success'});

  });
});

router.post('/page/edit/:id', function(req,res,next){
  var PageSchema = require('../model/page');
  var pageModel = mongoose.model('ngnode_pages',PageSchema.PageSchema,'ngnode_pages');
  var id = req.params.id;
  var sess = req.session;
  var input_title = req.body.title;
  var input_slug = req.body.slug;
  var input_date = new Date().toDateString();
  var input_content = req.body.content;
  var metaData = req.body.meta;
  var input_user = sess.user_id;
  var DataMeta = [];

  metaData.forEach(function(element){
    if(element.key!=""){
      DataMeta.push(element);
    }
  });
    

  var ExistingPageNewData = {title:input_title,slug:input_slug,date:input_date,content:input_content,meta:DataMeta,user:input_user};
  console.log(ExistingPageNewData);
  pageModel.update({"_id":ObjectId(id)},ExistingPageNewData, { multi: true }, function(err,user){
    if(err){console.log(err); res.json({"status":"Error in Updating Page"}); }
    
        res.json({"status":"Page Updated Successfully",userd:user});
  });
});

router.get('/page/delete/:id', function(req,res,next){
  var PageID = req.params.id;
  console.log('PG:'+PageID);
  var PageSchema = require('../model/page');
  var pageModel = mongoose.model('ngnode_pages',PageSchema.PageSchema,'ngnode_pages');

  pageModel.deleteOne({"_id":ObjectId(PageID)},function(err){
    if(err){
      res.send('0');
    }else{
      res.send('1');
    }
  });
});


router.get('/allmedia', function(req,res,next){
  var UserSchema = require('../model/user');
  var UserModel = mongoose.model('ngnode_users',UserSchema.UserSchema,'ngnode_users')
  var MediaSchema = require('../model/media');
  var MediaModel = mongoose.model('ngnode_media',MediaSchema.MediaSchema,'ngnode_media');
  MediaModel.find({}).populate('user').exec(function(err,medias){
   if(err){console.log(err); }
   //console.log(user);
   if(medias){
       res.json(medias);
     }else{
       res.send(false);
     }
   
 });
});

router.get('/getMedia/:id', function(req,res,next){
  var MediaSchema = require('../model/media');
  var MediaID = req.params.id;
  var MediaModel = mongoose.model('ngnode_media',MediaSchema.MediaSchema,'ngnode_media');
  MediaModel.findOne({'_id':ObjectId(MediaID)},function(err,media){
   if(err){console.log(err); }
   //console.log(user);
   if(media){
       res.json(media);
     }else{
       res.send(false);
     }
   
 });
});

router.get('/media/delete/:id', function(req,res,next){
  var DelID = ObjectId(req.params.id);
  var MediaSchema = require('../model/media');
  var MediaModel = mongoose.model('ngnode_media',MediaSchema.MediaSchema,'ngnode_media');
  var delMedia = null;
  MediaModel.findOne({'_id':DelID},function(err,data){
    if(err){res.status(400).json({'status':'Error'});}
    delMedia = data;

        MediaModel.deleteOne({'_id':DelID},function(err,dd){
          if(err){res.status(400).json({'status':'Error'});}
          fs.unlink(delMedia.path);
          res.status(200).json({'status':'success'});
        });

  });

  
  
   

});

router.post('/addNewMedia', function(req,res,next){

//console.log(req);
  var ObjectId = require('mongodb').ObjectID;
  var MediaSchema = require('../model/media');
  var MediaModel = mongoose.model('ngnode_media',MediaSchema.MediaSchema,'ngnode_media');
  var sess = req.session;
  var namearr = req.body.mediaUpload.filename.split(".").reverse();
  var ext = namearr[0];
  const secret = 'abcdefg';
  const hashName = crypto.createHmac('sha256', secret).update(req.body.mediaUpload.filename).digest('hex');
  var buf = new Buffer(req.body.mediaUpload.value, 'base64');
  var full_path = './resources/uploads/'+hashName+"."+ext;
  var full_url = 'resources/uploads/'+hashName+"."+ext;
  var newMedia = new MediaModel({
    _id       : ObjectId(),
    filename  : req.body.mediaUpload.filename,
    filetype  : req.body.mediaUpload.filetype,
    value     : req.body.mediaUpload.value,
    date      : new Date().toDateString(),
    path      : full_path,
    url       : full_url,
    user:sess.user_id
  });

  fs.writeFile(full_path,buf,function(err){
    if(err) throw err;

    newMedia.save(function(err,media){
      if (err) throw err;
      res.status(200).send(media);
    });

  });


  
  
  
  
  
  
});


module.exports = router;