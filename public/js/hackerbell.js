var socket = io.connect('http://'+document.location.host);
socket.on('checkin', function(data){
  console.log('got a checkin!');
  console.log(JSON.parse(data));
});