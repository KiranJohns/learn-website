import React from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import HeaderOpaque from "../components/Layout/Header/HeaderOpaque";
import NoSSR from "react-no-ssr";
import FailedLayout from "../components/Common/failLayout";

class Failed extends React.Component {
  static getInitialProps({ store }) {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <NoSSR>
          <HeaderOpaque />
        </NoSSR>

        <FailedLayout />
      </React.Fragment>
    );
  }
}

export default Failed;
