import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import MandatoryCourse from '../Stat/MandatoryCourse';

class CourseGridMandatory extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Mandatory Care Courses" />
				{/* <Breadcrumb pageTitle="Mandatory Care Courses" type=""/> */}
				{/* breadcrumb-end */}

				<MandatoryCourse  name="Mandatory Care Bundle"/>

                {/* course tab-start */}
				<CourseGridTab category="Mandatory Care Course"/>
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridMandatory;