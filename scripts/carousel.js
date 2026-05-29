$(document).ready(function(){


	let currentIndex = 0;
	function showSlide(index) {
		if (index < 0) {
			currentIndex = $(".carousel-slide").length - 1;
		} else if (index >= $(".carousel-slide").length) {
			currentIndex = 0;
		}

		$(".carousel-slides").css("transform", `translateX(-${currentIndex * 100}%)`);

	}


	$("#next").on('click', function() {
		console.log("click");
		currentIndex++;
		showSlide(currentIndex);
	});

	$("#prev").click(function() {
		currentIndex--;
		showSlide(currentIndex);
	});

	const autoAdvanceInterval = 3000; // Change slide every 3 seconds


	setInterval(function() {
console.log("interval");
		currentIndex++;
		showSlide(currentIndex);
	}, autoAdvanceInterval);
});



