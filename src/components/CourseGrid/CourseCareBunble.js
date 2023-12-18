import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';

import CourseGridBundle from '../Elements/Tab/CourseGridBundle';
import BundleCare from '../../components/Stat/BundleCare';

class CourseBundle extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Care Bundle"/>
				{/* breadcrumb-end */}
                
               
                {/* course tab-start */}
				<BundleCare name="Care Bundle"/>
				{/* course tab-end */}
              
                {/* cta-start */}
				<Cta />
                
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseBundle