import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import CourseGridAll from '../Elements/Tab/CourseGridAll';

class CourseAllMain extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="All courses"/>
				{/* breadcrumb-end */}

                {/* course tab-start */}
				<CourseGridAll/>
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseAllMain;