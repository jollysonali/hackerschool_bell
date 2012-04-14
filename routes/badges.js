
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