import React from "react";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import Footer from "../../components/Layout/Footer/Footer";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import NoSSR from "react-no-ssr";
import CourseCareBundle from "../../components/CourseGrid/CourseCareBunble";
import OnlineBundle from "../../components/CourseGrid/OnlineCareBundle";

class CareOnline extends React.Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="Online Care Bundle, Child care, Social Care, Health care online training" desc="Online care Certificate course, health care  and social care sectors, mental health & child care, mental awareness course, elderly care"/>
            </NoSSR>
            <OnlineBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default CareOnline;