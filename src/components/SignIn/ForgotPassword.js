import React, { Component, useState } from "react";
import Link from "next/link";

import Modal from "react-responsive-modal";
import store from "../../redux/store";
import fetchRequest from "../../axios";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";

function ForgotPass() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({ confirmPass: "", password: "" });
  let route = useRouter();
  const [token, setToken] = useState(() => {
    return route?.query?.slug || "";
  });
  const makeRequest = fetchData();

  function handleOnChange(e) {
    e.persist();
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }


  function handleClick() {
    setLoading((prev) => true);
    if (userData.password !== userData.confirmPass) {
      toast.error("password not match");
      return;
    }
    makeRequest("POST", "/auth/change-password", {
      password: userData.password,
      token,
    })
      .then(async (res) => {
        setLoading((prev) => false);
        console.log(res);
        location.pathname = "/sign-in";
      })
      .catch((err) => {
        console.log(err);
        setLoading((prev) => false);
        toast.info(err?.data?.errors[0]?.message)
        // console.log(err.data.errors[0]);
        // toast.error(err.data.errors[0].error);
      });
  }
  return (
    <main>
      <section className="signup__area po-rel-z1 pt-125 pb-145">
        <div className="sign__shape">
          <img
            className="man-1"
            src="../../assets/img/icon/sign/man-1.png"
            alt="img not found"
          />
          <img
            className="man-2"
            src="../../assets/img/icon/sign/man-2.png"
            alt="img not found"
          />
          <img
            className="circle"
            src="../../assets/img/icon/sign/circle.png"
            alt="img not found"
          />
          <img
            className="zigzag"
            src="../../assets/img/icon/sign/zigzag.png"
            alt="img not found"
          />
          <img
            className="dot"
            src="../../assets/img/icon/sign/dot.png"
            alt="img not found"
          />
          <img
            className="bg"
            src="../../assets/img/icon/sign/sign-up.png"
            alt="img not found"
          />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="section__title-wrapper text-center mb-20">
                <h2 className="section__title ">
                  Forgot Password
                  <br />{" "}
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__form">
                  <form>
                    <div className="sign__input-wrapper mb-25">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={userData.password}
                          onChange={handleOnChange}
                          onKeyUp={(e) => e.key === "Enter" && handleLogin(e)}
                        />
                        <i className="fas fa-lock"></i>
                        <div
                          id="pasToggle"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <BsFillEyeFill />
                          ) : (
                            <BsEyeSlashFill />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-10">
                      <h5>Confirm password</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="confirmPass"
                          placeholder="Confirm password"
                          value={userData.confirmPass}
                          onChange={handleOnChange}
                          onKeyUp={(e) => e.key === "Enter" && handleClick(e)}
                        />
                        <i className="fas fa-lock"></i>
                      </div>
                    </div>

                    <button
                    onClick={handleClick}
                      type="button"
                      className="e-btn  w-100 mt-20"
                      //   onClick={handleLogin}
                    >
                      {loading ? (
                        <>
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span class="sr-only">Loading...</span>
                        </>
                      ) : (
                        <>
                          <span>Change Password</span>
                        </>
                      )}{" "}
                    </button>
                    {/* <div className="sign__new text-center mt-20">
                      <p>
                        New here{" "}
                        <Link href="/sign-up">
                          <a>Sign Up</a>
                        </Link>
                      </p>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ForgotPass;
