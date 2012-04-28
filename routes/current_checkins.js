exports.current_checkins = function(req, res) {
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