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
            <HeaderOpaque/>
            </NoSSR>
            <MandatoryBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default MandateBundle;