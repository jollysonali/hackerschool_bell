/*
 * GET home page.
 */
var config = require('../config');

var Foursquare = require('node-foursquare')(config);
var aToken;

//this function gets called when the homepage loads
exports.index = function(req, res) {
	//get from 4square api currently checked in users
	//need an oauth token
	
  //known working token '0JQVD5NQSOUWSP1ZBNXFZCLFP11PEA2K0ME03GFP0TLJT54K'
  console.log('===========', aToken);
  Foursquare.Venues.getHereNow("4f3933eae4b017ad7cdce1fd", null, aToken, function (error, data) {
    if(error) {
      reportError(test, error.message);
    }
    else {
			
			res.render('checkins.jade', { title: 'Checkins', checkins: data.hereNow.items });    
    }
  });	
  
};

exports.login = function(req, res) {
  console.log(Foursquare.getAuthClientRedirectUrl());
	res.writeHead(303, { "location": Foursquare.getAuthClientRedirectUrl() });
  res.end();
};

exports.callback = function (req, res) {
  Foursquare.getAccessToken({
    code: req.query.code
  }, function (error, accessToken) {
    if(error) {
      res.send("An error was thrown: " + error.message);
    }
    else {
      // Save the accessToken and redirect.
			console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', accessToken);
			aToken = accessToken;
			res.redirect('/');
    }
  });
};

exports.sonalisBadges = function (req, res) {
  Foursquare.Users.getBadges(null, aToken, function (error, data) {
    if(error) {
      //reportError(test, error.message);
    }
    else {
			var output = [];
			var imgsrc ='';
			var b;
			var img = '';
			for (badge in data.badges){
			  //console.log (badge + 'is the badge');
				b = '';
				img = '';
				b = data.badges[badge];
				img += b.image.prefix + b.image.sizes[0] + b.image.name;
				
				//take all the badges and add the image url onto the output array
				output.push(img);
			}
			res.render('badges.jade', { title: 'Badges', badges: output });
    }
  });
};


exports.hsCheckins = function (req, res, io) {
  console.log(req.body.checkin);
  console.log('this is a console log');
  io.sockets.emit('checkin', req.body.checkin);
};


/*

- when the page loads get everyone who has checked into the venue 
- listen and update when new checkins happen.