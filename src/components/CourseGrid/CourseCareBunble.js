import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleCare from "../../components/Stat/BundleCare";
import CourseGridBundle from '../Elements/Tab/CourseGridBundle';
import BundleSample from '../Elements/Tab/BundleSample';

class CourseBundle extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle=" Care Bundle"/>
				{/* breadcrumb-end */}
                
                 <BundleCare/>
                {/* course tab-start */}
				<BundleSample/>
				{/* course tab-end */}
              
                {/* cta-start */}
				<Cta />
                
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseBundle