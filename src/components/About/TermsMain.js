import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import TestimonialThree from '../HomeThree/TestimonialSectionThree';
import About from '../HomeTwo/AboutSection';
import AboutUs from '../HomeTwo/AboutUs';
import WhyChoose from '../HomeTwo/WhyChooseSection';
import Counter from '../Elements/Counter/CounterStyleTwo';
import Banner from '../Home/BannerSection';
import dynamic from 'next/dynamic';
import TermsSection from '../HomeTwo/TermsSections';

const BrandWithNoSSR = dynamic(() => import('../Elements/Brand/BrandSection'), {
  ssr: false
})


class Terms extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Terms and Conditions" />
				{/* breadcrumb-end */}
                
               

                {/* about-start */}
                <div className='mt-10 '>
                <TermsSection/>
                </div>
				
			

        	</main>
        );
    }
}

export default Terms;