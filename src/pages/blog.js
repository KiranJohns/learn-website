import React from "react";
import HeaderThree from "../components/Layout/Header/HeaderStyleThree";
import FooterThree from "../components/Layout/Footer/FooterStyleThree";
import BlogMain from "../components/Blog/BlogMain";
import HeaderOpaque from "../components/Layout/Header/HeaderOpaque";
import Footer from "../components/Layout/Footer/Footer";
import Cta from "../components/Home/CtaSection";
import NoSSR from "react-no-ssr";

class Blog extends React.Component {
  static getInitialProps({ store }) {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <NoSSR>
          <HeaderOpaque pageTitle="Care course, online, Childcare, Mental health" descr="Legal responsibilities, food environment, food safety, child is at risk of abuse, health and safety at work"/>
        </NoSSR>
        <BlogMain />
        {/* <Cta /> */}
        <Footer />
      </React.Fragment>
    );
  }
}

export default Blog;
