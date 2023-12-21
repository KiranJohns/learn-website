import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import ChildCourse from '../Stat/ChildCourse';

class CourseGridChild extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Child Care Courses"/>
				{/* breadcrumb-end */}

				<ChildCourse name="Child Care Bundle"/>
                {/* course tab-start */}
				
				<CourseGridTab category="Child Care Course" />
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridChild;