import React from "react";
import FooterThree from "../components/Layout/Footer/FooterStyleThree";
import HeaderFour from "../components/Layout/Header/HeaderStyleFour";
import SignUpMain from "../components/SignUp/SignUpMain";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import NoSSR from "react-no-ssr";

class SignIn extends React.Component {
  static getInitialProps({ store }) {}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <NoSSR>
          <Header pageTitle="Sign Up to start learning" descr="Welcome to Learn For Care. Unlock a world of knowledge and opportunities by signing up."/>
        </NoSSR>
        <NoSSR>
          <SignUpMain />
        </NoSSR>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default SignIn;
