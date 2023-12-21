import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import SpecialisedCourse from '../Stat/SpecialisedCourse';


class CourseGridSpecialised extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Specialised Care Courses"/>
				{/* breadcrumb-end */}

				<SpecialisedCourse name="Specialised Care Bundle"/>

                {/* course tab-start */}
				<CourseGridTab category="Specialised Care Course" />
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridSpecialised;