var express           =     require('express')
  , passport          =     require('passport')
  , util              =     require('util')
  , FacebookStrategy  =     require('passport-facebook').Strategy
  , session           =     require('express-session')
  , cookieParser      =     require('cookie-parser')
  , bodyParser        =     require('body-parser')
  , config            =     require('../configuration/config')
  , app               =     express()
  , mongoose          =     require('mongoose')
  , mongodb           =     require('mongodb')
  , MongoClient       =     mongodb.MongoClient
  , assert            =     require('assert')
  , jwt               =     require('jsonwebtoken')
  , ObjectId          =     mongodb.ObjectId
  , superagent        =     require('superagent')
  , S                 =     require('string')
  , graph             =     require('fbgraph')
  , uuid              =     require('node-uuid')
  // , Hapi            =     require('hapi')
  ,bcrypt = require('bcrypt-nodejs')


import {questionModel, userModel, itemModel, activateLinkModel} from "./db/models.js";


app.set('superSecret', 'whatsnew'); // secret variable

 
  var url = 'mongodb://amir:whatsnew@ds049744.mongolab.com:49744/needezo';
  mongoose.connect(url);
  var mongoDB = mongoose.connection;
    mongoDB.on('error', console.error.bind(console, 'connection error:'));
    mongoDB.once('open', function (callback) {
      // yay!
      console.log("DB CONNECTED");
    });
  
  
// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
// Use the FacebookStrategy within Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url ,
    profileFields: ["id","email","displayName","profileUrl","photos"]
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      graph.setAccessToken(accessToken);

      //Check whether the User exists or not using profile.id
      //Further DB code.
      return done(null, {profile:profile,accessToken:accessToken});
    });
  }
));

app.set('views', 'source/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'keyboard cat', key: 'sid',
    resave: true,
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/build',express.static( 'build'));
app.use('/assets',express.static( 'assets'));
app.use('/css',express.static('assets/css'));
app.use('/javascript/client',express.static('/javascript/client'));
app.use('/configuration',express.static('source/configuration'));
app.use(express.static('public'));

//Router code
app.all('/tk/*',ensureAuthenticated,function(req, res, next){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies.token;

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

app.get('/', function(req, res){
  var theToken = null
  
  if(req.cookies.token != undefined) { 
    //onsole.log(res.cookie('token'))
    theToken = req.cookies.token
  }
  res.render('index', { user: req.user , token: theToken });
});


app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});
//Passport Router

app.get('/auth/facebook', passport.authenticate('facebook',{authType: 'rerequest',scope:['publish_pages','publish_actions','email']} ));

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);
app.get('/login', function(req, res, next){
  console.log("HEY");
  res.send("WHta?")
})
app.post('/login', function(req, res, next) {

  // generate the authenticate method and pass the req/res
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({status:false,message:'authentication failed'}); }

    // req / res held in closure
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      var token = jwt.sign(result, app.get('superSecret'), {
        expiresIn: 1440 *60// expires in 24 hours
      });
      req.token = token;
      res.cookie('token',token);
      res.cookie('name',user.displayName);
     // return res.redirect('/');
      return res.json({status:true,user:user});
    });

  })(req, res, next);

});

app.get('/auth/facebook/callback', function(req, res, next) {

  passport.authenticate('facebook',function(err, data, info) {

    if (err) { return next(err); }

    var user = data.profile;
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }

    var userName = "-1";
    var password = "-1";
    var accessToken = data.accessToken;

      userModel.findOne({facebookId:user.id},function(err, document){
        if (err) { return next(err); }
        res.cookie('name',user.displayName);//.replace(" ",""))
        if (!document) {
          var fbDisplayName = user.displayName;//.replace(" ","");
          userModel.create({
            "facebookId":user.id,
              "displayName":fbDisplayName,
              "items":[] ,
              "active":true},
              function (err, result){
                if (err) { return res.redirect('/login');}
                var token = jwt.sign(result, app.get('superSecret'), {
                  expiresIn: 1440 *60// expires in 24 hours
                });
                req.token = token;
                res.cookie('token',token);
                res.cookie('name',fbDisplayName);
                sendWelcomeEmail(user.email);
                return res.redirect('/');
              })
        }else{
          var token = jwt.sign(document, app.get('superSecret'), {
                expiresIn: 1440 *60 // expires in 24 hours
              });
          req.token = token;
          res.cookie('token',token);
          res.cookie('accessToken',accessToken);

          return res.redirect('/');
        }
        console.log(user)
        
      })
    });
  })(req, res, next);
});


app.get('/signup',function(req, res){

  userModel.findOne({userName:req.userName},function(err, document){
    if (err) { res.json({status:false,message:err});return; }
    //res.cookie('name',user.displayName);//.replace(" ",""))
    if (!document) {
      var valPass = validatePassword(req.body.password);
      if(valPass.status == false){
        res.json({status:false,message:valPass.message});
        return;
      }
      if(req.body.fullName.length < 1 ){
        res.json({status:false,message:"You should enter a name"});
        return;
      }
      if(req.userName.length < 1) {
        res.json({status:false,message:"Error: Username must contain only letters, numbers and underscores! and not EMPTY!!"});
        return;
      }
      re = /^\w+$/;
      if(!re.test(req.userName)) {
         res.json({status:false,message:"Error: Username must contain only letters, numbers and underscores!"});
        return;
      }

      userModel.create({
          "name":req.body.fullName,
          "items":[] ,
          "gotits":[],
          "userName":userName,
          "password":password
        },
          function (err, result){
            if (err) { return res.redirect('/login');}
            var token = jwt.sign(result, app.get('superSecret'), {
              expiresIn: 1440 *60// expires in 24 hours
            });
            req.token = token;
            res.cookie('token',token);
            res.cookie('name',userName);
            return res.redirect('/');
          })
    }else{
      res.json({status:false,message:"This Username is already used"});
    }
  })

});



app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/fetchItems/:page', function(req, res){
  var page = req.params.page;
  if(typeof page != "Number")
    return;

  if(page > 20){
    return;
  }
  if(page < 0){
    page = 0;
  }

  itemModel.find({}).
  skip(page * 40)
  limit(40).
  select({ title:1, description:1, price:1, location:1, city:1, country:1, lastEdit:1, imageUrl:1, }).
  exec(function(err, items){
    if (err){res.json({status:false,message:'Something went wrong'}); console.log(err);return;}
    res.json({status:true,items:items});
  });
})

app.post('/tk/addItem/', function(req, res){
  var start = process.hrtime();
  start = start[1];
  var title = req.body.title;
  var description = req.body.description;
  var imageUrls = req.body.imageUrls;
  var location = req.body.location;
  var state = req.body.state;
  var country = req.body.country;
  var displayName = req.user.displayName;
  var price = req.body.price;
  var item = null;
  

  if(location.x === undefined){
    console.log("S")
    location = [0,0]
  }else{
    location = [location.x,location.y];
  }
  try{
    item = new itemModel({date:new Date(), 
      price:price, 
      userId:req.user.userId, 
      displayName:displayName, 
      title:title, 
      description:description, 
      location:location, 
      imageUrls:imageUrls, 
      state:state, 
      country:country });

  }catch(e){
    res.json({status:false,message:'Something went wrong'});
    console.log(e);
    return ; 
  }
  if(item == null)
    res.json({status:false,message:'Something went wrong'});
  // MongoDB will create the _id when inserted
  item.save(function (err) {
    if (err) {res.json({status:false,message:'Something went wrong'}); console.log(err);return;};
      if((process.hrtime()[1]-start)* 1e-6  < 1300)
      {
        setTimeout(function() {
          res.json({status:true,message:'Item has been added'});
        },1300 - (process.hrtime()[1]-start)*1e-6);
      }else{
        res.json({status:true,message:'Item has been added'});
      }
     
  })

})

app.post('/tk/deleteItem',function(req, res){
  var itemId = new ObjectId(req.body.itemId);
  itemModel.find({_id:itemId}).remove(function(err){
    if (err){res.json({status:false,message:'Something went wrong'}); console.log(err);return;}
    res.json({status:true,message:"Item has been deleted"});
  });
})

//app.post('/tk/updateItem')

app.post('/tk/fetchItems/:page',function(req, res){
  var page = req.params.page;
  if(typeof page != "Number")
    return;

  if(page > 20){
    return;
  }
  if(page < 0){
    page = 0;
  }

  itemModel.find({userId:req.user.userId}).
  skip(page * 40)
  limit(40).
  select({ title:1, description:1, price:1, location:1, city:1, country:1, lastEdit:1, imageUrl:1, }).
  exec(function(err, items){
    if (err){res.json({status:false,message:'Something went wrong'}); console.log(err);return;}
    res.json({status:true,items:items});
  });
})

app.post('/tk/fetchItem',function(req, res){
  var page = req.params.page;
  if(typeof page != "Number")
    return;

  if(page > 20){
    return;
  }
  if(page < 0){
    page = 0;
  }

  itemModel.findOne({userId:req.user.userId,_id:new ObjectId(req.body.itemId)}).
  skip(page * 40)
  limit(40).
  select({ title:1, description:1, price:1, location:1, city:1, country:1, lastEdit:1, imageUrl:1, }).
  exec(function(err, items){
    if (err){res.json({status:false,message:'Something went wrong'}); console.log(err);return;}
    res.json({status:true,items:items});
  });
})

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var generator = require('xoauth2').createXOAuth2Generator({
    user: 'finger.9a@gmail.com',
    clientId: "921941074539-1285987oio4hrfcod6l123esss2r0se8.apps.googleusercontent.com",
      clientSecret: "OhPDoeeaC_aJvxp4gLFfdDB8",
      refreshToken: "1/F0tDJjYyA_9CT_awWHTJFlRWwPKFkNyyNlrSrL5E7hRIgOrJDtdun6zK6XiATCKT"/*,
    accessToken: '{cached access token}' // optional*/
});
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    userModel.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if(!bcrypt.compareSync(req.body.password, doc.password)){
        return done(null, false, { message: 'Incorrect password.' });
      }

      // var token = jwt.sign(user, app.get('superSecret'), {
      //   expiresIn: 1440 *60// expires in 24 hours
      // });
      // req.token = token;
      // res.cookie('token',token);
      // res.cookie('displayName',user.displayName);
      return done(null, user);
    });
  }
));

app.post('/signupemail',function(req, res){

  if(req.body.password < 5)
    res.json({status:false,message:'Password is too short'});

  if(req.body.displayName < 1)
    res.json({status:false,message:'DisplayName is empty'});

  var email = req.username;
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!filter.test(email)) {
    res.json({status:false,message:'Email is not valid'});
    return ;
  }


  var hash = bcrypt.hashSync(req.body.password);
 
  userModel.findOne({email:email},function(err, doc){
    if(doc !== null){
      console.log(doc)
        res.json({status:false,message:'Email has been used!'});  
        return;
    }else{
      singup(req,res,hash);
    }
  })

})

function singup(req,res,hash){
  var email = req.username;
  var uniqueID = uuid.v4();
  var user = new userModel({active:false, displayName:req.body.displayName, password:hash, date:new Date(), facebookId:null,email:email, items:[] })
  
  user.save(function(err,user){

    var userId = user._id;
    console.log("send email")
   
    var activateLink =  new activateLinkModel({userId:userId,linkId:uniqueID}).save(function(err, link){

    })
    // send mail
    transporter.sendMail({
        from: 'finger.9a@gmail.com',
        to: 'anasvsfs@gmail.com',
        subject: 'Needezo Email Activation',
        text: 'Please click on '+ "http://localhost:3000/activate/"+uniqueID
    }, function(error, response) {
       if (error) {
            console.log(error);
       } else {
            console.log('Message sent');
            res.send("Succesfully check your Email's inbox");
       }
    });
  });
}

function sendWelcomeEmail(email){
  transporter.sendMail({
      from: 'finger.9a@gmail.com',
      to: 'anasvsfs@gmail.com',
      subject: 'Welcome to Needezo',
      text: 'Welcome to Needezo'
  }, function(error, response) {
     if (error) {
          console.log(error);
          return (false);
     } else {
          console.log('Message sent');
          return true;
          //res.send("Succesfully");
     }
  });
}
app.get('/activate/:linkId',function(req, res){
  activateLinkModel.findOne({linkId:req.params.linkId},function(err,doc){
    if(doc !== null){
      userModel.findOne({_id:new ObjectId(doc.userId)},function(err,user){
        user.active = true;
        user.save();
      })
      res.send('Welcom to Needezo');
    }else{
      res.send('Something went wrong');
    }
  })
})

app.post('/oauth2callback',function(req,res){

  console.log("SOMEHITN CAME")
})
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

function validatePassword(pass){
  if(pass.length < 5){
    return {status:false,message:"Password is too short"};
  }else{
    return {status:true,messaeg:"Password is Okay"}
  }
}

app.listen(3000);