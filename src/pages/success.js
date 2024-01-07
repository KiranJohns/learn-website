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
import Spinner from "react-bootstrap/Spinner";
import store from "../redux/store";

const Success = () => {
  const makeRequest = fetchData();
  const [loading, setLoading] = useState(true);

  function getCartItem() {
    makeRequest("GET", "/cart/get")
      .then((res) => {
        console.log(res);
        setLoading(false);
        store.dispatch({
          type: "SET_CART",
          payload: JSON.stringify(res.data.response),
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          setLoading(false);
          store.dispatch({
            type: "SET_CART",
          });
        }
      });
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      getCartItem();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div style={{height: '100vh',display: 'flex',alignItems: 'center', justifyContent: 'center'}}>
          <Spinner animation="grow" variant="primary" />
        </div>
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <NoSSR>
              <div>
                <Header />
              </div>
            </NoSSR>
            {/* <NoSSR>
                <div style={{ visibility: "hidden" }}>
                  <HeaderSuccess />
                </div>
              </NoSSR> */}
            <NoSSR>
              <div className="behind-content-background">
                <HeaderOpaque />
              </div>
            </NoSSR>

            <div className="behind-content-background">
              <ShopingCart />
            </div>

            <div className="behind-content-background">
              <MyCart />
            </div>

            <NoSSR>
              <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
              <SuccessLayout />
              </div>
            </NoSSR>
          </div>
        </>
      )}
    </>
  );
};

export default Success;
