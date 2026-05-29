const projects = [
	{
		"id": 0,
		"title": "Lihawu Health Screening",
		"subtitle": "Professional | Ummo",
		"description": "a health testing system implemented at ports of entry in Eswatini to monitor and manage public health risks. It focuses on screening travelers for diseases and ensuring safe cross-border transportation to protect the health of the population.",
		"link": "this is the link",
		"images": ["./images/lihawu/1.png", "./images/lihawu/2.png"],
		"link": "https://www.linkedin.com/posts/ummo-inc_digitalisation-digitalsurveillance-publichealth-activity-7240226875912962048-qg__"
	}
]


$(document).ready(function(){

	projects.forEach((p) => {

		$("#gallery").append(`
						<div class="card" data-id="${p.id}">
							<img src="${p.images[0]}" alt="Avatar" style="width:100%">
							<div class="container">
								<h4><b>${p.title}</b></h4>
								<p>${p.subtitle}</p>
							</div>
						</div>`);

	});












	// When the user clicks the button, open the modal 
	$(".card").on('click', function(e) {
		let pId = $(this).data('id');
		let project = projects[pId];


		$('.modal-content').append(`	
						<div class="modal-main">

							<div class="carousel-container">

								<div class="carousel">
									<div class="carousel-slides">
									<div class="carousel-slide">
										<img src="${project.images[0]}" alt="Image 1">
									</div>
									<div class="carousel-slide">
										<img src="${project.images[1]}" alt="Image 2">
									</div>

									</div>
									<div class="carousel-controls">

										<button class="swipe-btn" id="prev">prev</button>
										<button class="swipe-btn" id="next">next</button>
									</div>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<div class="modal-text">
								<h4><b>${project.title}</b></h4>
								<p>${project.subtitle}</p>
								<p>${project.description}
							</div>
							<div class="modal-controls">

								<a href="${project.link}" about="__blank" type="button" class="close swipe-btn">
									<span aria-hidden="true">More info</span>
								</a>
									<button type="button" class="close swipe-btn">
									<span aria-hidden="true">x</span>
								</button>
							</div>
						</div>


		`);


		// When the user clicks on <span> (x), close the modal
		$('.close').on('click', function() {
			$('#modalDialog').fadeOut();

			$('.modal-content').empty();

		});

		$('#modalDialog').show();
	});



	// When the user clicks anywhere outside of the modal, close it
	$('main').on('click', function(e){

		if($(e.target).hasClass("modal")){
			$('#modalDialog').fadeOut();
		}
	});
});
