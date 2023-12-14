import React from "react";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import HeaderSuccess from "../components/Layout/Header/HeaderSuccess";
import HeaderOpaque from "../components/Layout/Header/HeaderOpaque";
import SucessLayout from "../components/Common/successLayout";
import NoSSR from "react-no-ssr";
import ShopingCart from "../components/Layout/Header/ShopingCart";

const Success = () => {
  return (
    <React.Fragment>
      <NoSSR>
        <HeaderOpaque />
      </NoSSR>
      <NoSSR>
        <div style={{ visibility: "hidden" }}>
          <HeaderSuccess />
        </div>
      </NoSSR>
      <NoSSR>
        <div style={{ visibility: "hidden" }}>
          <Header />
        </div>
      </NoSSR>
      <NoSSR>
        <div style={{ visibility: "hidden" }}>
          <ShopingCart />
        </div>
      </NoSSR>

      <NoSSR>
        <SucessLayout />
      </NoSSR>
    </React.Fragment>
  );
};

export default Success;