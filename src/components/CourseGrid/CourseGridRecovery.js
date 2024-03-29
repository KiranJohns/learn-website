import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import RecoveryCourses from '../Stat/RecoveryCourse';


class CourseGridRecovery extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Recovery Care Courses"/>
				{/* breadcrumb-end */}

				<RecoveryCourses name="Recovery Care Bundle"/>

                {/* course tab-start */}
				<CourseGridTab category="Recovery Care Course"/>
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridRecovery;