import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import TestimonialThree from '../HomeThree/TestimonialSectionThree';
import About from '../HomeTwo/AboutSection';
import AboutUs from '../HomeTwo/AboutUs';
import WhyChoose from '../HomeTwo/WhyChooseSection';
import Counter from '../Elements/Counter/CounterStyleTwo';
import Banner from '../Home/BannerSection';
import dynamic from 'next/dynamic';
const BrandWithNoSSR = dynamic(() => import('../Elements/Brand/BrandSection'), {
  ssr: false
})


class AboutMain extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="About Us" />
				{/* breadcrumb-end */}
                
                <About/>

                {/* about-start */}
                <div className='mt-10'>
                    <AboutUs />
                </div>
				
				<div className='mt-10'>
				<Counter />
				</div>

        	</main>
        );
    }
}

export default AboutMain;



{/* <BrandWithNoSSR />


testimonial-start 
<TestimonialThree />
 testimonial-end 

 whychoose-start 
<WhyChoose />
whychoose-end 


<Counter />



<Banner />
 */}