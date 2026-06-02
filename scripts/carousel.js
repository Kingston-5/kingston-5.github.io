$(document).ready(function(){


	let currentIndex = 0;
function showSlide(index) {
    const totalSlides = $(".carousel-slide").length;

    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    $(".carousel-slides").css(
        "transform",
        `translateX(-${currentIndex * 100}%)`
    );
}


	
	$(document).on('click', '#next', function() {
    currentIndex++;
    showSlide(currentIndex);
});

$(document).on('click', '#prev', function() {
    currentIndex--;
    showSlide(currentIndex);
});

	const autoAdvanceInterval = 3000; // Change slide every 3 seconds


	/**setInterval(function() {
console.log("interval");
		currentIndex++;
		showSlide(currentIndex);
	}, autoAdvanceInterval);*/
});



