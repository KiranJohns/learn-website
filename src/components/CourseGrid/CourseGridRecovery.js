import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';


class CourseGridRecovery extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Recovery Care Courses"/>
				{/* breadcrumb-end */}

                {/* course tab-start */}
				<CourseGridTab category="Recovery Care Courses"/>
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridRecovery;