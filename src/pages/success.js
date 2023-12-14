import React, { useState, useEffect } from "react";
import Header from "../components/Layout/Header/Header";
import HeaderSuccess from "../components/Layout/Header/HeaderSuccess";
import HeaderOpaque from "../components/Layout/Header/HeaderOpaque";
import SuccessLayout from "../components/Common/sucessLayout";
import NoSSR from "react-no-ssr";
import ShopingCart from "../components/Layout/Header/ShopingCart";

const Success = () => {

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => { 
    setReloadKey((prevKey) => prevKey + 1);
  
  }, [])
  

  return (
    <>
      <NoSSR>
        <HeaderOpaque />
      </NoSSR>
      <NoSSR>
        <div style={{ visibility: "hidden" }}>
          <HeaderSuccess />
        </div>
      </NoSSR>
      <NoSSR>
        <div key={reloadKey} style={{ visibility: "hidden" }}>
          <Header />
        </div>
      </NoSSR>
      <NoSSR>
        <div key={reloadKey} style={{ visibility: "hidden" }}>
          <ShopingCart />
        </div>
      </NoSSR>

      <NoSSR>
        <SuccessLayout />
      </NoSSR>
    </>
  );
};

export default Success;
