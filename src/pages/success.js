import React from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import HeaderSuccess from "../components/Layout/Header/HeaderSuccess";
import HeaderOpaque from "../components/Layout/Header/HeaderOpaque";
import SucessLayout from "../components/Common/sucessLayout";
import NoSSR from "react-no-ssr";
import ShopingCart from "./ShopingCart";

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
        <NoSSR>
          <div style={{visibility:"hidden"}}>  
             <HeaderOpaque />
          </div>
        </NoSSR>
        <NoSSR>
          <div style={{visibility:"hidden"}}>
          <Header />
          </div>
        </NoSSR>
        <NoSSR>
          <div style={{visibility:"hidden"}}>
          <ShopingCart/>
          </div>
        </NoSSR>

        <NoSSR>
        <SucessLayout />
        </NoSSR>
      </React.Fragment>
    );
  }
}

export default Success;
