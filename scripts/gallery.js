/** STATIC DATA **/

const projects = [
	{
		"id": 0,
		"title": "Lihawu Health Screening",
		"category": "company-work",
		"subtitle": "Company Work | Ummo",
		"description": "A Minitsy of Health initiative implemented at ports of entry in Eswatini to monitor and manage public health risks. It focuses on screening travelers for diseases and ensuring safe cross-border transportation to protect the health of the population.",
		"link": "this is the link",
		"images": ["./images/lihawu/1.png", "./images/lihawu/2.png"],
		"link": "https://www.linkedin.com/posts/ummo-inc_digitalisation-digitalsurveillance-publichealth-activity-7240226875912962048-qg__"
	},


	{
		"id": 1,
		"title": "Sunrise eCommerce",
		"category": "company-work",
		"subtitle": "Company Work | Centurion (pty) Ltd",
		"description": "Sunrise Hub is a digital service marketplace by Centurion Technologies. We connect individuals, MSMEs & communities to trusted services. From eKYC,eCommerce, digital marketing, certification to payments-all in one place",
		"link": "https://www.facebook.com/sunrisehub/",
		"images": ["./images/sunrise/1.png", "./images/sunrise/2.png", "./images/sunrise/3.png", "./images/sunrise/4.png", "./images/sunrise/5.png", "./images/sunrise/6.png"],

	},
	{
		"id": 2,
		"title": "Kwakhanya PlantIQ",
		"category": "freelance",
		"subtitle": "Freelance",
		"description": "Kwakhanya PlantIQ provides n affordable, hybrid smart irrigation system. key features included offline irrigation management, smart fertigation(automatic fertiliser despensor) push notifications water flow monitoring & analysis and machine learnign powered predictive scheduling.",
		"link": "",
		"images": ["./images/kwakhanya/1.jpeg", "./images/kwakhanya/2.jpeg", "./images/kwakhanya/3.jpeg"],
	},

	{
		"id": 3,
		"title": "Sakhisizwe Tutor App",
		"category": "freelance",
		"subtitle": "Freelance",
		"description": "Sakhisizwe is an offline first desktop student tutor application designed to help improve access to digital learnign materials for students even without access to the internet.",
		"link": "",
		"images": ["./images/sakhisizwe/1.png", "./images/sakhisizwe/2.png", "./images/sakhisizwe/3.png", "./images/sakhisizwe/4.png", "./images/sakhisizwe/5.png", "./images/sakhisizwe/6.png"],

	},

	{
		"id": 4,
		"title": "Superb Choice Brands",
		"category": "freelance",
		"subtitle": "Freelance",
		"description": "Superb choice brands celebrates the beauty and quality of Eswatini craftsmanship. Every product tells a story of local talent, sustainable practices, and community empowerment.",
		"link": "https://superbchoicebrands.net/",
		"images": ["./images/superb/1.png", "./images/superb/2.png", "./images/superb/3.png"],
	},

	{
		"id": 5,
		"title": "Eswatini Verbal Arts Assembly",
		"category": "freelance",
		"subtitle": "Freelance",
		"description": "At Eswatini Verbal Assembly, we believe every voice has the power to inspire, influence, and ignite change. Through comprehensive training, dedicated mentorship, and competitive opportunities, we cultivate the next generation of eloquent leaders.",
		"link": "https://eswatiniverbalarts.org/",
		"images": ["./images/evaa/1.png", "./images/evaa/3.png"],

	},
	{
		"id": 6,
		"title": "Church Management System",
		"category": "freelance",
		"subtitle": "Freelance",
		"description": "Streamlined member registration, profiles, attendance tracking, and communication. Centralized and automated financial transactions, contributions, and reporting for improved transparency and compliance.",
		"link": "",
		"images": ["./images/chms/1.png", "./images/chms/2.png", "./images/chms/3.png", "./images/chms/4.png", "./images/chms/5.png", "./images/chms/6.png"],

	},

	{
		"id": 7,
		"title": "Fundmo",
		"category": "ventures",
		"subtitle": "Ventures | FundMo (pty) Ltd",
		"description": "Co-founded a financial technology startup that developed a mobile money-based crowdfunding platform to help other Startups and social projects to secure the necessary funding they require to make an impact in this world. This project was initiated after a 1st place victory in the MTN MoMo Hackathon.",
		"link": "",
		"images": ["./images/fundmo/1.jpg", "./images/fundmo/2.jpg", "./images/fundmo/3.jpg"],

	},

	{
		"id": 8,
		"title": "Centralised Mobile Money API",
		"category": "academic",
		"subtitle": "Academic | UNESWA B.Sc I.T",
		"description": "Inspired by my work on FundMo, I developed unified API offers a streamlined approach to integrating with multiple Mobile Money providers allowing small scale developers to skip the red tape and go straight to production, facilitating financial service access and supporting Eswatini's FinTech ecosystem growth.",
		"link": "",
		"images": ["./images/api/1.png", "./images/api/2.png", "./images/api/3.png"],

	},
{
		"id": 9,
		"title": "Swatini.shop",
		"category": "freelance",
		"subtitle": "Freelance",
		"description": "swatini.shop was a C2C ecommerce platform that enabled users to quickly list their pre-loved items for. key features included live chat, quick listing.",
		"link": "",
		"images": ["./images/swatini/1.png", "./images/swatini/2.png", "./images/swatini/3.png", "./images/swatini/4.png"],

	}
]

function closeModal() {
    $('.modal-content').empty();
    $('#modalDialog').removeClass('active');
    
}

function renderGallery(filter = "all") {

    $('#gallery').empty();

    const filteredProjects =
        filter === "all"
            ? projects
            : projects.filter(
                p => p.category === filter
            );

    filteredProjects.forEach((p) => {

        $('#gallery').append(`
            <div class="card" data-id="${p.id}">
                <img src="${p.images[0]}" alt="">
                <div class="container">
                    <h4 class="quantico-bold">${p.title}</h4>
                    <p class="quantico-regular">${p.subtitle}</p>
                </div>
            </div>
        `);

    });
}

$(document).ready(function(){


renderGallery();

// filter click
$('.filter').on('click', function() {

    $('.filter').removeClass('active');

    $(this).addClass('active');

    const filter = $(this).data('filter');
    console.log("filter=>", filter);

    renderGallery(filter);
});

//auto-generate counts

$('#all-count').text(projects.length);

$('#company-work-count').text(
    projects.filter(
        p => p.category === 'company-work'
    ).length
);

$('#freelance-count').text(
    projects.filter(
        p => p.category === 'freelance'
    ).length
);

$('#ventures-count').text(
    projects.filter(
        p => p.category === 'ventures'
    ).length
);

$('#academic-count').text(
    projects.filter(
        p => p.category === 'academic'
    ).length
);

	// When the user clicks the button, open the modal 
	$(".card").on('click', function(e) {
		let pId = $(this).data('id');
		let project = projects[pId];
		const slides = project.images.map((img, index) => `
    <div class="carousel-slide">
        <img src="${img}" alt="Image ${index + 1}">
    </div>
`).join('');


		$('.modal-content').html(`	
						<div class="modal-main">

							<div class="carousel-container">

								<div class="carousel">
									<div class="carousel-slides">
									${slides}

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
								<h4 class="quantico-bold">${project.title}</h4>
								<p class="quantico-italic">${project.subtitle}</p>
								<p class="quantico-regular">${project.description}</p>
							</div>
							<div class="modal-controls">

								<a href="${project.link}" target="_blank" type="button" class="close swipe-btn">
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
			closeModal()

		});

		$('#modalDialog').addClass('active');
	});



	// When the user clicks anywhere outside of the modal, close it
$('#modalDialog').on('click', function(e) {
    if (e.target === this) {
        closeModal()
    }
});
});
