import React from "react";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import Footer from "../../components/Layout/Footer/Footer";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import NoSSR from "react-no-ssr";
import SpecialisedBundle from "../../components/CourseGrid/SpecialisedBundle";

class SpecialBundle extends React.Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque  pageTitle="Specialised CareBundle, Mental health care, Companies of care" descr="Specialised Care Bundle, health care, child care, social care, companies for care course, care bundle, care and treatment, elderly care, mental health"/>
            </NoSSR>
            <SpecialisedBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default SpecialBundle;