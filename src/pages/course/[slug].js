import React from "react";
import Footer from "../../components/Layout/Footer/Footer";
import CourseDetailsMain from "../../components/CourseDetails/CourseDetailsMain";
import HeaderFour from "../../components/Layout/Header/HeaderStyleFour";
import Header from "../../components/Layout/Header/Header";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";

class CourseDetails extends React.Component {
  static getInitialProps({ store }) {
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <NoSSR>
        <Header />
        </NoSSR>
        <CourseDetailsMain />
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default CourseDetails;
