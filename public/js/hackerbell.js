var socket = io.connect('http://'+document.location.host);
socket.on('checkin', function(data){
  console.log('got a checkin!');
  //console.log(JSON.parse(data));
  data = JSON.parse(data);
  console.log(data);
  $('#feeds').prepend('<div class="checkin" style="display:none"><img src="' + data.user.photo + '"><p>' + data.user.firstName + '</p></div>');
  $('#feeds .checkin:first-child').slideDown();
});