/*
 * GET home page.
 */
var config = require('../config');

var Foursquare = require('node-foursquare')(config);
var aToken;

//this function gets called when the homepage loads
exports.home = function(req, res) {
	//get from 4square api currently checked in users
	//need an oauth token
  //console.log('===========', aToken);
  Foursquare.Venues.getHereNow("4f3933eae4b017ad7cdce1fd", null, aToken, function (error, data) {
    if(error) {
      reportError(test, error.message);
    }
    else {
      if (req.url.indexOf('.json') !== -1){
        res.send(JSON.stringify(data));
      } else {
       res.render('checkins.jade', { title: 'Checkins', checkins: data.hereNow.items });     
      }
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
			aToken = accessToken;
			res.redirect('/home');
    }
  });
};

exports.hsCheckins = function (req, res, io) {
  console.log(req.body.checkin);
  console.log('this is a console log');
  io.sockets.emit('checkin', req.body.checkin);
};
