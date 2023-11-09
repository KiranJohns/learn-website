import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import { getToken } from "../axios";

const Auth = ({ Children }) => {
  // Check if the user is authenticated, if not, redirect to login page
  const [logedIn, setlogedIn] = useState(() => {
    return getToken() ? true : false;
  });

  const router = useRouter();

  useEffect(() => {
    if (!logedIn) {
      router.push("/sign-in");
    }
  }, []);
  
  return <>{logedIn && <Children />}</>;
};

export default Auth;
