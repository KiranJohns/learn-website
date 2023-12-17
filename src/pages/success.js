import React, { useState, useEffect } from "react";
import Header from "../components/Layout/Header/Header";
import HeaderSuccess from "../components/Layout/Header/HeaderSuccess";
import HeaderOpaque from "../components/Layout/Header/HeaderOpaque";
import SuccessLayout from "../components/Common/sucessLayout";
import NoSSR from "react-no-ssr";
import ShopingCart from "../components/Layout/Header/ShopingCart";
import { useRouter } from "next/router";
import MyCart from "../components/MyCart/MyCartMain";
import fetchData from "../axios";

const Success = () => {
  const makeRequest = fetchData()
  const [reloadKey, setReloadKey] = useState(0);

  const forceReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };
  function getCartItem() {
    makeRequest("GET", "/cart/get")
      .then((res) => {
        console.log(res);
        store.dispatch({
          type: "SET_CART",
          payload: JSON.stringify(res.data.response),
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "SET_CART",
          });
        }
      });
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      getCartItem()
    }, 5000);
    return () => {
      clearTimeout(timer)
    }
  }, []);

  return (
    <>
      <div style={{ position: "absolute" }}>
        <NoSSR>
          <div key={reloadKey}>
            <HeaderOpaque />
          </div>
        </NoSSR>
        {/* <NoSSR>
        <div style={{ visibility: "hidden" }}>
          <HeaderSuccess />
        </div>
      </NoSSR> */}
        <NoSSR>
          <div key={reloadKey} className="behind-content-background">
            <Header />
          </div>
        </NoSSR>

        <div className="behind-content-background">
          <ShopingCart />
        </div>

        <div className="behind-content-background">
          <MyCart />
        </div>

        <NoSSR>
          <SuccessLayout />
        </NoSSR>
      </div>
    </>
  );
};

export default Success;
