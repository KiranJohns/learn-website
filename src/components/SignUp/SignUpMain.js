import React, { useEffect } from "react";
import Link from "next/link";
import fetchData from "../../axios";
import { useFormik } from "formik";
import { signupValidation } from "../../yup/signupValidation";
import Modal from "react-responsive-modal";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { boolean } from "yup";
import store from "../../redux/store";
import Toast from "react-bootstrap/Toast";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  country: "",
  city: "",
  password: "",
  type_of_account: "",
  terms: "",
};

function SignUpMain() {
  const [otp, setOtp] = useState("");

  const [check, setCheck] = useState(true);

  function myCheck() {
    // var checkBox = document.getElementById("m-agree");
    // console.log(values?.terms);
    // if (checkBox.checked == false) {
    //   setCheck(false);
    //   values.terms = check;
    // } else {
    //   setCheck(true);
    //   values.terms = check;
    // }
  }

  function resend(event) {
    event.preventDefault();
    makeRequest("PATCH", "/auth/resend-otp", {
      email: values.email,
    })
      .then(() => {
        toast.success("A new OTP send to your email");
      })
      .catch((error) => {
        toast(error.errors[0].message);
      });
  }

  const [error, setError] = useState(null);

  const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);

  const [open, setOpen] = useState(false);
  let signupInfo = useSelector((state) => state.user.signup);

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (signupInfo.response) {
      onOpenModal();
    }
  }, [signupInfo.loading]);

  const makeRequest = fetchData();

  const handleOtp = (event) => {
    event.persist()
    event.preventDefault();
    makeRequest("POST", "/auth/validate-otp", {
      email: values.email,
      otp: otp,
    })
      .then((res) => {
        console.log(res);
        window.location.pathname = "/sign-in";
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(otp);
  };

  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidation,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async (e) => {
    try {
      e.persist()
      const method = "POST"; // Specify the HTTP method
      const url = "/auth/registration"; // Specify the API endpoint URL
      const data = values; // Send form values as data

      store.dispatch({
        type: "SET_LOADING",
      });


      makeRequest(method, url, data)
        .then((res) => {
          console.log(res);
          store.dispatch({
            type: "SET_RESPONSE",
            payload: res,
          });
        })
        .catch((error) => {
          console.log(error.data.errors[0]);
          // console.log(error.data);
          store.dispatch({
            type: "SET_ERROR",
            payload: error,
          });
          // toast.info(error.data.errors[0].response);
          toast.error(error.data.errors[0]?.error || error.data.errors[0].response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      {error && (
        <div>
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
        </div>
      )}

      <section className="signup__area po-rel-z1 pt-100 pb-145">
        <div className="sign__shape">
          <img
            className="man-1"
            src="assets/img/icon/sign/man-3.png"
            alt="img not found"
          />
          <img
            className="man-2 man-22"
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
          <img
            className="flower"
            src="assets/img/icon/sign/flower.png"
            alt="img not found"
          />
        </div>
        <div className="container">
          <Modal
            onClose={onCloseModal}
            open={open}
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
                <h2>OTP Verification</h2>
              </div>
              <div className="info">
                An OTP has been sent to your registered email address.
              </div>
              <div className="py-3">
                <div className="form-group">
                  <label htmlFor="otp">Enter OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    name="otp"
                    value={otp}
                    onKeyUp={(e) => e.key == "Enter" && handleOtp(e)}
                    onChange={(e) => setOtp(e.target.value)}
                    id="otp"
                  />
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <button
                        type="button"
                        className="my-4 width-100 btn btn-primary"
                        onClick={handleOtp}
                      >
                        submit
                      </button>
                    </div>

                    <div className="mt-4">
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={resend}
                        className="text-primary mt-2 width-100"
                      >
                        Resend OTP
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="section__title-wrapper text-center mb-55">
                <h2 className="section__title">
                  Create a free <br /> Account{" "}
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
              <div className="sign__wrapper white-bg">
                <div className="sign__header mb-35">
                  <div className="sign__in text-center">
                    <p>
                      {" "}
                      <span>........</span>{" "}
                      <Link href="/sign-up">
                        <a>sign up</a>
                      </Link>{" "}
                      with your email<span> ........</span>{" "}
                    </p>
                  </div>
                </div>
                <div className="sign__form">
                  <form>
                    <div className="sign__input-wrapper mb-25">
                      <h5>first name</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="first_name"
                          value={values.first_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="First name"
                        />
                        <i className="fas fa-user"></i>
                      </div>
                      <br />
                      {errors.first_name && <small>{errors.first_name}</small>}
                      <br />
                    </div>
                    <div className="sign__input-wrapper mb-25">
                      <h5>last name</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="last_name"
                          value={values.last_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="last name"
                        />
                        <i className="fas fa-user"></i>
                      </div>
                      <br />
                      {errors.last_name && <small>{errors.last_name}</small>}
                      <br />
                    </div>

                    <div className="sign__input-wrapper mb-25">
                      <h5>Work email</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="email"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="e-mail "
                        />
                        <i className="fas fa-envelope"></i>
                      </div>
                      <br />
                      {errors.email && <small>{errors.email}</small>}
                      <br />
                    </div>

                    <div className="sign__input-wrapper mb-25">
                      <h5>Type</h5>
                      <div className="sign__input">
                        <select style={{
                          width: '100%', background: "#f6f6f7", border: "none", padding: "1rem", borderRadius: '.2rem', outline: "#2b4eff"}} onChange={handleChange} name="type_of_account">
                         <option value="">Select</option>
                          <option value="Individual">Individual</option>
                          <option value="Company">Company</option>
                        </select>
                        {/* <input
                          type="text"
                          name="type_of_account"
                          value={values.type_of_account}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="type"
                        />
                        <i className="fas fa-check"></i> */}
                      </div>
                      <br />
                      {errors.type && <small>{errors.type}</small>}
                      <br />
                    </div>

                    <div className="sign__input-wrapper mb-25">
                      <h5>Country</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="country"
                          value={values.country}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Country"
                        />
                        <i className="fas fa-flag"></i>
                      </div>
                      <br />
                      {errors.country && <small>{errors.country}</small>}
                      <br />
                    </div>

                    <div className="sign__input-wrapper mb-25">
                      <h5>City</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="city"
                          value={values.city}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="City"
                        />
                        <i className="fas fa-city"></i>
                      </div>
                      <br />
                      {errors.city && <small>{errors.city}</small>}
                      <br />
                    </div>

                    <div className="sign__input-wrapper mb-25">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input
                          type="password"
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Password"
                        />
                        <i className="fas fa-lock"></i>
                      </div>
                      <br />
                      {errors.password && <small>{errors.password}</small>}
                      <br />
                    </div>
                    <div className="sign__action d-flex justify-content-between mb-30">
                      <div className="sign__agree d-flex align-items-center">
                        <input
                          className="m-check-input"
                          type="checkbox"
                          id="m-agree"
                          name="terms"
                          onClick={myCheck}
                          value={check}
                        />
                        <label className="m-check-label" htmlFor="m-agree">
                          I agree to the <a href="#">Terms & Conditions</a>
                        </label>
                      </div>
                      <br className="d-block " />
                      {errors.terms && (
                        <small className="text-primary">{errors.terms}</small>
                      )}
                      <br />
                    </div>

                    <button onClick={handleSignUp} type="button" className="e-btn w-100 disabled">
                      {" "}
                      {signupInfo.loading ? (
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
                          <span>Sign Up</span>
                        </>
                      )}
                    </button>
                    <div className="sign__new text-center mt-20">
                      <p>
                        Already in Signed Up ?{" "}
                        <Link href="/sign-in">
                          <a>Sign In</a>
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

export default SignUpMain;
