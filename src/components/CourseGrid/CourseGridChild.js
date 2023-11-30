import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleChild from '../Stat/BundleChildCare';

class CourseGridChild extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Child Care Courses"/>
				{/* breadcrumb-end */}

				<BundleChild name="Child Care Bundle"/>
                {/* course tab-start */}
				
				<CourseGridTab category="Child Care Courses" />
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridChild;