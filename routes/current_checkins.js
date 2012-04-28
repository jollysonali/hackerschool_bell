exports.current_checkins = function(req, res) {
  Foursquare.Venues.getHereNow("4f3933eae4b017ad7cdce1fd", null, aToken, function (error, data) {
    if(error) {
      reportError(test, error.message);
    }
    else {
        res.send(JSON.stringify(data));
    }
  });
};