import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';


class CourseGridMain extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Care Courses"/>
				{/* breadcrumb-end */}

                {/* course tab-start */}
				<CourseGridTab category="Care Certificate" />
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridMain;