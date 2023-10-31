import React, { Component, useState } from "react";
import Link from "next/link";

import Modal from "react-responsive-modal";
import store from "../../redux/store";
import fetchRequest from "../../axios";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function SignInMain() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const makeRequest = fetchData();

  function handleOnChange(e) {
    e.persist();
    setLoginData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleLogin() {
    store.dispatch({
      type: "SET_LOADING_FOR_SIGN_IN",
    });

    makeRequest("POST", "/auth/login", loginData)
      .then(async (res) => {
        store.dispatch({
          type: "SET_RESPONSE_FOR_SIGN_IN",
          payload: res.data,
        });
        await localStorage.setItem(
          `learnforcare_access`,
          res.data.jwt_access_token
        );
        await localStorage.setItem(
          `learnforcare_refresh`,
          res.data.jwt_refresh_token
        );
        location.pathname = "/company/dashboard";
      })
      .catch((err) => {
        console.log(err.data.errors[0]);
        toast.error(err.data.errors[0].error);
        store.dispatch({
          type: "SET_ERROR_FOR_SIGN_IN",
          payload: err,
        });
      });
  }
  return (
    <main>
      {/* <Modal
          open={false}
          onClose={this.onCloseModal}
          styles={{
            modal: {
              maxWidth: "unset",
              width: "50%",
              padding: "unset",
            },
            overlay: {
              background: "rgba(0, 0, 0, 0.5)",
            },
            closeButton: {
              background: "white",
            },
          }}
          center
        >
          <div className="main p-5">
            <div className="heading">
              <h2>Forgot Password</h2>
            </div>
            <div className="info">
              An OTP has been sent to your registered email address.
            </div>
            <form className="py-3">
              <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  name="otp"
                  value={this.state.otp}
                  onChange={this.handleOnChange}
                  id="otp"
                />
                <Link href="/new-password">
                  <button type="button" class="my-4 width-100 btn btn-primary">
                    submit
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </Modal> */}
      <section className="signup__area po-rel-z1 pt-100 pb-145">
        <div className="sign__shape">
          <img
            className="man-1"
            src="assets/img/icon/sign/man-1.png"
            alt="img not found"
          />
          <img
            className="man-2"
            src="assets/img/icon/sign/man-2.png"
            alt="img not found"
          />
          <img
            className="circle"
            src="assets/img/icon/sign/circle.png"
            alt="img not found"
          />
          <img
            className="zigzag"
            src="assets/img/icon/sign/zigzag.png"
            alt="img not found"
          />
          <img
            className="dot"
            src="assets/img/icon/sign/dot.png"
            alt="img not found"
          />
          <img
            className="bg"
            src="assets/img/icon/sign/sign-up.png"
            alt="img not found"
          />
        </div>
        <div className="container">
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
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="section__title-wrapper text-center mb-55">
                <h2 className="section__title">
                  Sign in
                  <br />{" "}
                </h2>
                <p>
                  if you don't have an account you can use
                  <Link href="/sign-up">
                    <a> Sign Up </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__form">
                  <form>
                    <div className="sign__input-wrapper mb-25">
                      <h5>Work email</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="email"
                          value={loginData.email}
                          onChange={handleOnChange}
                          placeholder="e-mail address"
                        />
                        <i className="fas fa-envelope"></i>
                      </div>
                    </div>
                    <div className="sign__input-wrapper mb-10">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={handleOnChange}
                        />
                        <i className="fas fa-lock"></i>
                      </div>
                    </div>
                    <div className="sign__action d-sm-flex justify-content-between mb-30">
                      <div className="sign__agree d-flex align-items-center">
                        <input
                          className="m-check-input"
                          type="checkbox"
                          id="m-agree"
                        />
                        <label className="m-check-label" htmlFor="m-agree">
                          Keep me signed in
                        </label>
                      </div>
                      <div className="sign__forgot">
                        <span role="button">Forgot your password?</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="e-btn  w-100"
                      onClick={handleLogin}
                    >
                      {" "}
                      <span></span> Sign In
                    </button>
                    <div className="sign__new text-center mt-20">
                      <p>
                        New here{" "}
                        <Link href="/sign-up">
                          <a>Sign Up</a>
                        </Link>
                      </p>
                    </div>
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

export default SignInMain;
