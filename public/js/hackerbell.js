var socket = io.connect('http://'+document.location.host);
socket.on('checkin', function(data){
  console.log('got a checkin!');
  //console.log(JSON.parse(data));
  $("#feeds").prepend("<div class='item'><img src='" + data.user.photo + "'><p>" + data.user.firstName + "</p></div>");
});



//function updateCheckins(data){
  //get dom checkins
  //if live checkin is not in dom then add 
  
//}












/*var delay = 2000; // you can change it
var count = 5; // How much items to animate
var showing = 3; //How much items to show at a time
var i = 0;

function move(i) {
  return function() {
    $('#feed'+i).remove().css('display', 'none').prependTo('#feeds');
    }
}

function shift() {
  var toShow = (i + showing) % count;
  $('#feed'+toShow).slideDown(1000, move(i));
  $('#feed'+i).slideUp(1000, move(i));
    i = (i + 1) % count;
    setTimeout('shift()', delay);
}    

$(document).ready(function() {
  setTimeout('shift()', delay);
}); */