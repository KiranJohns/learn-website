import React from "react";
import Header from "../../../components/Layout/Header/Header";
import FooterPad from "../../../components/Layout/Footer/FooterLess";
import NoSSR from "react-no-ssr";
import ForgotPass from "../../../components/SignIn/ForgotPassword";


function ForgotIn() {
    return (
      <React.Fragment>
        <NoSSR>
          <Header />
        </NoSSR>
        <NoSSR>
          <ForgotPass />
        </NoSSR>
        <FooterPad/>
      </React.Fragment>
    );
  }
  
  export default ForgotIn;