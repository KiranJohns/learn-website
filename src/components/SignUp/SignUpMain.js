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
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import ReCAPTCHA from "react-google-recaptcha";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  country: "",
  city: "",
  password: "",
  phone: "",
  confirmPassword: "",
  type_of_account: "",
  terms: "",
};

function CaptchaOnChange(value) {
  console.log("Captcha value:", value);
  setNotARobot(value);
}

function SignUpMain() {
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(true);
  const [timerValue, setTimerValue] = useState({ seconds: 45 });

  const [check, setCheck] = useState(false);

  function myCheck(e) {
    setCheck((prev) => !prev);
  }

  const [timer, setTimer] = useState("00:00:45");
  const Ref = useRef();

  function getTimeRemaining(e) {
    const total = Date.parse(e) - Date.parse(new Date());
    const hour = Math.floor((total / (1000 * 60 * 60)) % 24);
    const seconds = Math.floor((total / 1000) % 60);
    const minute = Math.floor((total / (1000 * 60)) % 60);
    setTimerValue((prev) => {
      console.log(prev);
      return { seconds: --prev.seconds };
    });
    return { total, hour, minute, seconds };
  }

  function startTimer(e) {
    let { total, hour, minute, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hour > 9 ? hour : "0" + hour) +
          ":" +
          (minute > 9 ? minute : "0" + minute) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      if (activeSubmit == true) {
        setActiveSubmit(false);
      }
    }
  }

  function clearTimer(e) {
    setTimer("00:00:45");
    if (Ref.current) {
      clearInterval(Ref.current);
    }

    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  }

  function getDeadTime() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 45);
    return deadline;
  }

  function Reset() {
    clearTimer(getDeadTime());
  }

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  function resend(event) {
    event.preventDefault();
    makeRequest("PATCH", "/auth/resend-otp", {
      email: values.email,
    })
      .then(() => {
        Reset();
        setTimerValue({seconds: 45})
        setActiveSubmit(true);
        toast.success("A new OTP send to your email");
      })
      .catch((error) => {
        toast(error.errors[0].message);
      });
  }

  const [error, setError] = useState(null);

  const [showA, setShowA] = useState(true);
  const [notARobot, setNotARobot] = useState(null);
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
    event.persist();
    event.preventDefault();
    makeRequest("POST", "/auth/validate-otp", {
      email: values.email,
      otp: otp,
    })
      .then((res) => {
        console.log(res);
        toast("OTP is Accepted");
        location.pathname = "/sign-in";
      })
      .catch((err) => {
        toast("OTP is Incorrect");
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
      e.persist();
      if (!check) {
        return toast.warn("Please Accept Terms & Conditions");
      }
      if (notARobot == "") {
        toast.warn("Verify you're not a robot");
        return;
      }
      const method = "POST"; // Specify the HTTP method
      const url = "/auth/registration"; // Specify the API endpoint URL
      const data = values; // Send form values as data

      if (values.password !== values.confirmPassword) {
        toast.error("Password Is Not Matching");
        return;
      }

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
          console.log(error?.data?.errors[0]);
          console.log(error);
          store.dispatch({
            type: "SET_ERROR",
            payload: error,
          });
          // toast.info(error.data.errors[0].response);
          toast.error(
            error.data.errors[0]?.error || error.data.errors[0].response
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <section className="signup__area po-rel-z1 pt-80 pb-80">
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
                <h4>One time Password (OTP) verification</h4>
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
                        disabled={timerValue.seconds >= 0 ? false : true}
                      >
                        Submit
                      </button>
                    </div>

                    <div className="mt-4">
                      {timerValue.seconds <= 0 ? (
                        <>
                          <span>Didn't recieve? </span>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={resend}
                            className="text-primary mt-2 width-100"
                          >
                            Resend
                          </a>
                        </>
                      ) : (
                        <div className="my-4">
                          <h5>{timer}</h5>
                          {/* <button className="btn btn-primary" onClick={}>
                          Reset
                        </button> */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          <div className="row">
            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
              <div className="section__title-wrapper text-center mb-25 mt-25">
                <h2 className="">Sign up</h2>
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
                      <span>........</span> Create an account
                      <span> ........</span>{" "}
                    </p>
                  </div>
                </div>
                <div className="sign__form">
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
                  <form>
                    <div className="sign__input-wrapper ">
                      <h5>First name</h5>
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
                      {/* {errors.first_name && <small>{errors.first_name}</small>}
                      <br /> */}
                    </div>
                    <div className="sign__input-wrapper ">
                      <h5>Last name</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="last_name"
                          value={values.last_name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Last name"
                        />
                        <i className="fas fa-user"></i>
                      </div>
                      <br />
                      {/* {errors.last_name && <small>{errors.last_name}</small>}
                      <br /> */}
                    </div>

                    <div className="sign__input-wrapper ">
                      <h5>Email</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="email"
                          value={values.email}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="E-mail"
                        />
                        <i className="fas fa-envelope"></i>
                      </div>
                      <br />
                      {/* {errors.email && <small>{errors.email}</small>}
                      <br /> */}
                    </div>

                    <div className="sign__input-wrapper ">
                      <h5>Phone</h5>
                      <div className="sign__input">
                        <input
                          type="text"
                          name="phone"
                          value={values.phone}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Phone"
                        />
                        <i className="fas fa-phone fa-fw"></i>
                      </div>
                      <br />
                      {/* {errors.email && <small>{errors.email}</small>}
                      <br /> */}
                    </div>

                    <div className="sign__input-wrapper ">
                      <h5>Type of user</h5>
                      <div className="sign__input">
                        <select
                          style={{
                            width: "100%",
                            background: "#f6f6f7",
                            border: "none",
                            padding: "1rem",
                            borderRadius: ".2rem",
                            outline: "#2b4eff",
                          }}
                          onChange={handleChange}
                          name="type_of_account"
                        >
                          <option value="">Select</option>
                          <option value="individual">Individual</option>
                          <option value="company">Company</option>
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
                      {/* {errors.type && <small>{errors.type}</small>}
                      <br /> */}
                    </div>

                    <div className="sign__input-wrapper ">
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
                      {/* {errors.city && <small>{errors.city}</small>}
                      <br /> */}
                    </div>

                    <div className="sign__input-wrapper ">
                      <h5>Country</h5>
                      <div className="sign__input">
                        <select
                          style={{
                            width: "100%",
                            background: "#f6f6f7",
                            border: "none",
                            padding: "1rem",
                            borderRadius: ".2rem",
                            outline: "#2b4eff",
                          }}
                          onChange={handleChange}
                          name="country"
                        >
                          <option value="">Select</option>
                          <option value="UK">United Kingdom</option>
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
                      {/* {errors.type && <small>{errors.type}</small>}
                      <br /> */}
                    </div>

                    <div className="sign__input-wrapper ">
                      <h5>Password</h5>
                      <div className="sign__input">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={values.password}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Password"
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

                      {errors.confirmPassword && (
                        <small>{errors.confirmPassword}</small>
                      )}
                      <br />
                    </div>
                    <div className="sign__input-wrapper ">
                      <h5>Confirm Password</h5>
                      <div className="sign__input">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Confirm password"
                        />
                        <i className="fas fa-lock"></i>
                      </div>

                      {errors.password && <small>{errors.password}</small>}
                      <br />
                    </div>
                    <div className="sign__action d-flex justify-content-between mb-10 mr-5">
                      <div className="sign__agree d-flex align-items-center">
                        <input
                          className="m-check-input"
                          type="checkbox"
                          id="m-agree"
                          name="terms"
                          onChange={myCheck}
                          checked={check}
                          required
                        />
                        <label className="m-check-label" htmlFor="m-agree">
                          I agree to the{" "}
                          <a href="#">Terms & Conditions & privacy policy</a>
                        </label>
                      </div>
                      <br className="d-block " />
                      {/* {errors.terms && (
                        <small className="text-primary">{errors.terms}</small>
                      )} */}
                      <br />
                    </div>

                    <div className="mb-20">
                      <ReCAPTCHA
                        sitekey="6LfhdDkpAAAAADgd41-6T2kLEPpzxGLXTlgNE3v5"
                        onChange={CaptchaOnChange}
                      />
                    </div>

                    <button
                      onClick={handleSignUp}
                      type="button"
                      className="e-btn w-100 disabled"
                    >
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
                        Already have an account ?{" "}
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
