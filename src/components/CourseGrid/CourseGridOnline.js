import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleOnline from '../Stat/BundleOnline';

class CourseGridOnline extends Component {

    render() {

        return (
            <main>
	            {/* breadcrumb-start */}
				<Breadcrumb pageTitle="Online Care Bundle" />
				{/* <Breadcrumb pageTitle="Mandatory Care Courses" type=""/> */}
				{/* breadcrumb-end */}

				<BundleOnline name="Online Care Bundle"/>

                {/* course tab-start */}
				<CourseGridTab category="Mandatory Care Courses"/>
				{/* course tab-end */}

                {/* cta-start */}
				<Cta />
				{/* cta-end */}
        	</main>
        );
    }
}

export default CourseGridOnline;