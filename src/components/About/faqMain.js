import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import TestimonialThree from '../HomeThree/TestimonialSectionThree';
import About from '../HomeTwo/AboutSection';
import AboutUs from '../HomeTwo/AboutUs';
import WhyChoose from '../HomeTwo/WhyChooseSection';
import Counter from '../Elements/Counter/CounterStyleTwo';
import Banner from '../Home/BannerSection';
import dynamic from 'next/dynamic';
import FaqSection from '../HomeTwo/FaqSection';

const BrandWithNoSSR = dynamic(() => import('../Elements/Brand/BrandSection'), {
  ssr: false
})


class Faq extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Frequently Asked Questions" />
				{/* breadcrumb-end */}
                
               

                {/* about-start */}
                <div className='mt-10 '>
                <FaqSection/>
                </div>
				
        	</main>
        );
    }
}

export default Faq;