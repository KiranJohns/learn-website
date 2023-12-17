import React, { useEffect } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import Confetti from "react-confetti";
import { AiOutlineArrowRight } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import fetchData, { getUserType } from "../../axios";
import store from "../../redux/store";

const SuccessLayout = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push(`/${getUserType()}/dashboard`);
  };

  useEffect(() => {
    if (localStorage.getItem("reload")) {
      localStorage.removeItem("reload");
      // window.location.reload();
    }
  }, []);

  return (
    <div className="row">
      <div
        style={{ marginTop: "4rem", padding: "4rem" }}
        className="col-xxl-12 d-flex flex-column justify-content-center align-items-center"
      >
        <h1 style={{ color: "#124694" }}>Payment successful</h1>
        <h1 style={{ color: "#129444" }}>
          <BsFillPatchCheckFill />
        </h1>
        <h3 style={{ color: "#124694" }}>
          You have successfully purchased the cart items
        </h3>
        <div
          onClick={handleButtonClick}
          className="btn btn-primary"
          style={{ marginTop: "2rem" }}
        >
          Back to dashboard
        </div>
      </div>
    </div>
  );
};

export default SuccessLayout;
