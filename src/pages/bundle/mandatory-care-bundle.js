import React from "react";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import Footer from "../../components/Layout/Footer/Footer";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import NoSSR from "react-no-ssr";
import MandatoryBundle from "../../components/CourseGrid/MandatoryBundle";

class MandateBundle extends React.Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="Mandatory Care Bundle, Mental Capacity Act & DoLS,Training Course" descr="Mandatory Care Bundle, care certificate bundles, Health and Safety, Safeguarding Children, Care Certificate, mandatory courses, training courses, Role in Care"/>
            </NoSSR>
            <MandatoryBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default MandateBundle;