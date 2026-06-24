$(document).ready(function(){ 

//whatsap CTA click event
$("#whatsapp-cta").on('click', function(){
	mixpanel.track("Whatsapp CTA clicked", {
  });
  });

$("#email-cta").on('click', function(){
	mixpanel.track("Email CTA clicked", {
  });
  });
  
  $("#phone-cta").on('click', function(){
	mixpanel.track("Phone CTA clicked", {
  });
  });
});
