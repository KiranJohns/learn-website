import React from "react";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import Footer from "../../components/Layout/Footer/Footer";
import CourseBundle from "../../components/CourseGrid/CourseBundle";
import NoSSR from "react-no-ssr";
import RecoverBundle from "../../components/CourseGrid/RecoveryBundle"; 

class RecoveryBundle extends React.Component {
    static getInitialProps({store}) {}

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
            <NoSSR>
            <HeaderOpaque pageTitle="Recovery Care Bundle, WRAP training, Care certificate course" descr="Online care Certificate course, Recovery Care Bundle, elderly care, Mental health care, health care, child care, social care,companies for care course"/>
            </NoSSR>
            <RecoverBundle/>
            <Footer />
            </React.Fragment>
        );
    }
}

export default RecoveryBundle;