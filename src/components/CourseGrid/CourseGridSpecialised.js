import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleCare from '../Stat/BundleCare';


class CourseGridSpecialised extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Specialized Care Courses"/>
				{/* breadcrumb-end */}

				<BundleCare name="Specialized Care Courses"/>

                {/* course tab-start */}
				<CourseGridTab category="Specialized Care Courses" />
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridSpecialised;