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
            <HeaderOpaque/>
            </NoSSR>
            <SpecialisedBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default SpecialBundle;