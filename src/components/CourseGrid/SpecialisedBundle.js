import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleSpecialised from '../Stat/BundleSpecialised';
import CourseGridBundle from '../Elements/Tab/CourseGridBundle';
import BundleSample from '../Elements/Tab/BundleSample';

class SpecialisedBundle extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Specialised Care Bundle"/>
				{/* breadcrumb-end */}
                
                <BundleSpecialised name="Specialised Care Bundle"/>
         
              
                {/* cta-start */}
				<Cta />
                
				{/* cta-end */}
        	</main>
        );
    }
}

export default SpecialisedBundle;

       {/* course tab-start */}
				{/* <BundleSample/> */}
				{/* course tab-end */}