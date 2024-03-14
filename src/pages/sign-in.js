import React, { useEffect, useState } from "react";
import FooterThree from "../components/Layout/Footer/FooterStyleThree";
import SignInMain from "../components/SignIn/SignInMain";
import HeaderFour from "../components/Layout/Header/HeaderStyleFour";
import Header from "../components/Layout/Header/Header";
import Footer from "../components/Layout/Footer/Footer";
import NoSSR from "react-no-ssr";
import { useRouter } from "next/router";
import { getUserType } from "../axios";

function SignIn() {
  const [logedIn, setlogedIn] = useState(() => {
    return getUserType();
  });

  const router = useRouter();

  useEffect(() => {
    if (logedIn) {
      router.push(`/`);
    }
  }, []);
  return (
    <>
      {!logedIn && (
        <>
          <NoSSR>
            <Header pageTitle="Sign In to learn for care" descr="Sign in to access your account" key="Sign In"/>
          </NoSSR>
          <NoSSR>
            <SignInMain />
          </NoSSR>
          <Footer />
        </>
      )}
    </>
  );
}

export default SignIn;
