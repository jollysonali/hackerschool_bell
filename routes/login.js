exports.login = function(req, res) {
  console.log(Foursquare.getAuthClientRedirectUrl());
	res.writeHead(303, { "location": Foursquare.getAuthClientRedirectUrl() });
  res.end();
};