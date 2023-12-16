import React, { useState, useEffect } from "react";
import Header from "../components/Layout/Header/Header";
import HeaderSuccess from "../components/Layout/Header/HeaderSuccess";
import HeaderOpaque from "../components/Layout/Header/HeaderOpaque";
import SuccessLayout from "../components/Common/sucessLayout";
import NoSSR from "react-no-ssr";
import ShopingCart from "../components/Layout/Header/ShopingCart";
import { useRouter } from 'next/router';
import MyCart from "../components/MyCart/MyCartMain";

const Success = () => {

  const [reloadKey, setReloadKey] = useState(0);

  const forceReload = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };
  const router = useRouter();

  useEffect(() => { 
    
if(localStorage.getItem('reload')){
  setTimeout(() => {
    // window.location.reload()
    router.reload();
  }, 900);
  localStorage.removeItem("reload");
}
  // forceReload()
  
  }, [])
  

  return (
    <>
    <div >
      <NoSSR>
        <HeaderOpaque />
      </NoSSR>
      {/* <NoSSR>
        <div style={{ visibility: "hidden" }}>
          <HeaderSuccess />
        </div>
      </NoSSR> */}
      <NoSSR>
        <div  style={{visibility:'hidden'}}>
          <Header />
        </div>
      </NoSSR>
   
        <div className="behind-content-background" >
          <ShopingCart />
        </div>

        <div className="behind-content-background">
          <MyCart/>
        </div>
     
      
      <NoSSR>
        <SuccessLayout />
      </NoSSR>
      </div>
     
    </>
  );
};

export default Success;
