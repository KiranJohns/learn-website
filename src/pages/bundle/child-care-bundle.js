import React from "react";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import Footer from "../../components/Layout/Footer/Footer";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import NoSSR from "react-no-ssr";
import ChildCBundle from "../../components/CourseGrid/ChildCareBundle";

class ChildBundle extends React.Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="Child Care Bundle, pediatric care, safeguarding children training" descr="Child Care Bundle, health care, child care, social care,companies for care course"/>
            </NoSSR>
            <ChildCBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default ChildBundle;