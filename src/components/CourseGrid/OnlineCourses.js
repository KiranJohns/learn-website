import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import CourseGridTab from '../Elements/Tab/CourseGridTab';
import Cta from '../Home/CtaSection';
import BundleCare from '../Stat/BundleCare';
import OnlineGrid from '../Elements/Tab/OnlineGrid';
import BundleOnline from '../Stat/BundleOnline';



class CourseGridOnline extends Component {

    render() {

        return (
            <main>
            {/* breadcrumb-start */}
            <Breadcrumb pageTitle="Online Care Courses"/>
            {/* breadcrumb-end */}

            <BundleOnline name="Online Care Bundle"/>

            {/* course tab-start */}
            <OnlineGrid category="Online Care Courses" />
            {/* course tab-end */}

            {/* cta-start */}
            <Cta />
            {/* cta-end */}
        </main>
        );
    }
}

export default CourseGridOnline;