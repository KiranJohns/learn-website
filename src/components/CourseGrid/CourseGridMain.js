import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import CareCourse from '../Stat/CareCourse';



class CourseGridMain extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Care Certificate Courses"/>
				{/* breadcrumb-end */}

				<CareCourse name="Care Bundle"/>

                {/* course tab-start */}
				<CourseGridTab category="Care Course" />
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridMain;