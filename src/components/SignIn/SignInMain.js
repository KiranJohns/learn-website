import React, { Component, useState } from "react";
import Link from "next/link";

import Modal from "react-responsive-modal";
import store from "../../redux/store";
import fetchRequest from "../../axios";
import fetchData from "../../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";

function SignInMain() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const [email, setEmail] = useState("");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const makeRequest = fetchData();

  function handleForgotPassword(e) {
    e.preventDefault();
    makeRequest("POST", "/auth/forgot-password", { email })
      .then((res) => {
        toast.info("Link sent to your email");
        setShowEmailModal(false)
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.warning(err?.data?.errors[0]?.message)
      });
  }
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
    let url = "";
    if (!loginUser) {
      url = "/auth/login";
    } else {
      url = "/sub-user/login";
    }
    store.dispatch({
      type: "SET_LOADING_FOR_SIGN_IN",
    });

    if(loginData.email == "" && loginData.password == "") {
      toast.error("Please provide valid email and password");
      return;
    }

    setLoading((prev) => true);
    makeRequest("POST", url, loginData)
      .then(async (res) => {
        console.log(res);
        store.dispatch({
          type: "SET_RESPONSE_FOR_SIGN_IN",
          payload: res.data,
        });
        setLoading((prev) => false);
        localStorage.setItem(`learnforcare_access`, res.data.jwt_access_token);
        localStorage.setItem(
          `learnforcare_refresh`,
          res.data.jwt_re_fresh_token
        );
        localStorage.setItem("userType", res.data.userType);
        let from = localStorage.getItem("from-checkout");
        if (res.data.userType == "individual") {
          if (from) {
            localStorage.removeItem("from-checkout");
            location.pathname = "/cart";
          } else {
            location.pathname = "/individual/dashboard";
          }
        } else if (res.data.userType === "company") {
          if (from) {
            localStorage.removeItem("from-checkout");
            location.pathname = "/cart";
          } else {
            location.pathname = "/company/dashboard";
          }
        } else if (res.data.userType === "manager") {
          if (from) {
            localStorage.removeItem("from-checkout");
            location.pathname = "/cart";
          } else {
            location.pathname = "/manager/dashboard";
          }
        }
      })
      .catch((err) => {
        setLoading((prev) => false);
        console.log(err?.data);

        toast.error(err?.data?.errors[0].error);
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

      <Modal
        open={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        styles={{
          modal: {
            maxWidth: "unset",
            minWidth: "35%",
            background:"#212a50",
            padding: "unset",
            borderRadius:"1rem"
          },
          overlay: {
            background: "rgba(0, 0, 0, 0)",
          },
          closeButton: {
            background: "white",
          
          },
        }}
        center
      >
        <div className="main p-5">
          <div className="heading">
            <h3 style={{textAlign:"center", color:"#fff"}}>Forgot Password</h3>
          </div>
          <div className="info"></div>
          <div className="form-group">
            {/* <label htmlFor="otp">Email</label> */}
            <input
              type="text"
              className="form-control"
              placeholder="Enter your registered email"
              name="otp"
              id="otp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={(e) => e.key == "Enter" && handleForgotPassword(e)}
            />
            <div style={{display:"flex", justifyContent:'center'}}>
            <Link href="/new-password">
              <button
                type="button"
                class="my-4 width-100 btn btn-primary"
                onClick={handleForgotPassword}
              >
                Submit
              </button>              
            </Link>
            </div>
          </div>
        </div>
      </Modal>
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
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="section__title-wrapper text-center mb-55">
                <h2 className="section__title ">
                  Sign in
                  <br />{" "}
                </h2>
                <p>
                  Don't have an account ?
                  <Link href="/sign-up">
                    <a className="text-primary"> Sign Up </a>
                  </Link>
                </p>
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
                      <h5>Email</h5>
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
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={loginData.password}
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
                            <BsEyeSlashFill />
                          ) : (
                            <BsFillEyeFill />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="sign__action d-sm-flex justify-content-between mb-30">
                      <div
                        style={{ visibility: "hidden" }}
                        className="sign__agree d-flex align-items-center"
                      >
                        <input
                          className="m-check-input"
                          type="checkbox"
                          id="m-agree"
                          onClick={() => setLoginUser((prev) => !prev)}
                          checked={loginUser}
                        />
                        <label className="m-check-label" htmlFor="m-agree">
                          company individual
                        </label>
                      </div>
                      <div className="sign__forgot">
                        <span
                          role="button"
                          onClick={() => setShowEmailModal((prev) => !prev)}
                        >
                          Forgot your password?
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="e-btn  w-100"
                      onClick={handleLogin}
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
                          <span>Sign In</span>
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

export default SignInMain;
