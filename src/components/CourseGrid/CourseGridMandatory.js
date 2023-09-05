import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';


class CourseGridMandatory extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Mandatory Care Courses"/>
				{/* breadcrumb-end */}

                {/* course tab-start */}
				<CourseGridTab />
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridMandatory;