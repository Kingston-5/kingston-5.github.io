$(document).ready(function(){


	// When the user clicks the button, open the modal 
    $(".card").on('click', function() {

        $('#modalDialog').show();
    });
    
    // When the user clicks on <span> (x), close the modal
    $('.close').on('click', function() {
        $('#modalDialog').fadeOut();
    });

// When the user clicks anywhere outside of the modal, close it
$('main').on('click', function(e){

	if($(e.target).hasClass("modal")){
        $('#modalDialog').fadeOut();
    }
});

});


