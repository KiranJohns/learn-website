import React from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import HeaderSuccess from "../components/Layout/Header/HeaderSuccess";
import SucessLayout from "../components/Common/sucessLayout";
import NoSSR from "react-no-ssr";

class Success extends React.Component {
  static getInitialProps({ store }) {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <NoSSR>
          <HeaderSuccess />
        </NoSSR>
        <SucessLayout />
      </React.Fragment>
    );
  }
}

export default Success;
