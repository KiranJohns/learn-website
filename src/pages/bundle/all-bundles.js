import React from "react";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import Footer from "../../components/Layout/Footer/Footer";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import NoSSR from "react-no-ssr";

class BundleAll extends React.Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="CPD approved, Healthcare courses, mandatory, buccal" descr="Elderly care and Childcare course , online care course, Caregiver training, bundle courses, company purchase, Care course, Online care course, pediatric care"/>
            </NoSSR>
            <CourseBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default BundleAll;