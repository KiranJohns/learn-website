import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleCare from "../../components/Stat/BundleCare";

class CourseBundle extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Care Course Bundle"/>
				{/* breadcrumb-end */}
                
                 <BundleCare/>
                {/* course tab-start */}
				<CourseGridTab />
				{/* course tab-end */}
              
                {/* cta-start */}
				<Cta />
                
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseBundle