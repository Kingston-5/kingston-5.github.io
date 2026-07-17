import React from "react";
import { Whatsapp, Top } from '@/assets';
const Home: React.FC = () => {
	return (<>


		{/*<!-- Back to top -->*/}
						<a href="#landing" className="circle-btn back-to-top">
							<img src={Top}/>
						</a>

		{/*<!-- whatsapp CTA -->*/}
						<a id="whatsapp-cta" href="https://wa.me/26879736175?text=Hi%20Qhawe%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20potential%20project%20or%20opportunity."
		 target="_blank" className="circle-btn whatsapp-cta">
							<img src={Whatsapp}/>
						</a>
		{/*<!-- LANDING SECTION --> */}
						<div className="landing" id="landing">


							<div className="landing-content">
								<div className="hero-txt audiowide-regular">
									<h1 className="audiowide-regular">Qhawe (Kingston) Matimela</h1>
									<h3 className="audiowide-regular typing">Software Developer</h3>
								</div>
								<div className="landing-btns">

									<a href="#contact" className="swipe-btn">Talk To Me</a>
									<a href="#work" className="swipe-btn">See My Work</a>


								</div>
							</div>


						</div>
	</>);
};

export default Home;
