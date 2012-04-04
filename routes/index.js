/*
 * GET home page.
 */
var config = require('../config');

var Foursquare = require('node-foursquare')(config);
var aToken;

exports.index = function(req, res) {
	res.render('index.jade', { title: 'Hacker School Checkins' });
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
			aToken = accessToken;
			res.redirect('/hscheckins');
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
var checkin {
              "id": "4e6fe1404b90c00032eeac34",
              "createdAt": 1315955008,
              "type": "checkin",
              "timeZone": "America/New_York",
              "user": {
                  "id": "1",
                  "firstName": "Jimmy",
                  "lastName": "Foursquare",
                  "photo": "https://foursquare.com/img/blank_boy.png",
                  "gender": "male",
                  "homeCity": "New York, NY",
                  "relationship": "self"
              },
              "venue": {
                  "id": "4ab7e57cf964a5205f7b20e3",
                  "name": "foursquare HQ",
                  "contact": {
                      "twitter": "foursquare"
                  },
                  "location": {
                      "address": "East Village",
                      "lat": 40.72809214560253,
                      "lng": -73.99112284183502,
                      "city": "New York",
                      "state": "NY",
                      "postalCode": "10003",
                      "country": "USA"
                  },
                  "categories": [
                      {
                          "id": "4bf58dd8d48988d125941735",
                          "name": "Tech Startup",
                          "pluralName": "Tech Startups",
                          "shortName": "Tech Startup",
                          "icon": "https://foursquare.com/img/categories/building/default.png",
                          "parents": [
                              "Professional & Other Places",
                              "Offices"
                          ],
                          "primary": true
                      }
                  ],
                  "verified": true,
                  "stats": {
                      "checkinsCount": 7313,
                      "usersCount": 565,
                      "tipCount": 128
                  },
                  "url": "http://foursquare.com"
              }
          } */