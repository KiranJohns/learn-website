import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleSpecialised from '../Stat/BundleSpecialised';


class CourseGridSpecialised extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Specialised Care Courses"/>
				{/* breadcrumb-end */}

				<BundleSpecialised name="Specialised Care Bundle"/>

                {/* course tab-start */}
				<CourseGridTab category="Specialized Care Course" />
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridSpecialised;