import React, { Component, useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { BiLogoFacebook } from "react-icons/bi";
import fetchData from "../../axios";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";
function GetInTouch() {
  const makeRequest = fetchData();
  const [form,setForm] = useState({name: "",
   email: "",
   sub: "",
   message: ""})
  const router = useRouter();
  function submit(e) {
   e.preventDefault()
    makeRequest("POST", "/info/contact-us", { name: form.name, email: form.email, sub: form.sub, message: form.message })
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function onHandleChange(e) {
   e.persist()
   setForm(prev => {
      return {
         ...prev,
         [e.target.name]: e.target.value
      }
   })
  }
  return (
    <section className="contact__area pt-80 pb-75">
      <div className="container">
        <div className="row">
          <div className="col-xxl-7 col-xl-7 col-lg-6">
            <div className="contact__wrapper">
              <div className="section__title-wrapper mb-40">
                <h2 className="section__title">
                  Get in
                  <span className="yellow-bg yellow-bg-big">
                    touch
                    <img
                      src="assets/img/shape/yellow-bg.png"
                      alt="img not found"
                    />
                  </span>
                </h2>
                <p>
                  Have a question or just want to say hi? We'd love to hear from
                  you.
                </p>
              </div>
              <div className="contact__form">
                <form action="assets/mail.php">
                  <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-md-6">
                      <div className="contact__form-input">
                        <input
                          type="text"
                          placeholder="Your Name"
                          name="name"
                          value={form.name}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-md-6">
                      <div className="contact__form-input">
                        <input
                          type="email"
                          placeholder="Your Email"
                          name="email"
                          value={form.email}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-12">
                      <div className="contact__form-input">
                        <input
                          type="text"
                          placeholder="Subject"
                          name="sub"
                          value={form.sub}
                          onChange={onHandleChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-12">
                      <div className="contact__form-input">
                        <textarea
                          placeholder="Enter Your Message"
                          name="message"
                          value={form.message}
                          onChange={onHandleChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-xxl-12">
                      <div className="contact__btn">
                        <button
                          type="submit"
                          className="e-btn"
                          onClick={submit}
                        >
                          Send your message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xxl-4 offset-xxl-1 col-xl-4 offset-xl-1 col-lg-5 offset-lg-1">
            <div className="contact__info white-bg p-relative z-index-1">
              <div className="contact__shape">
                <img
                  className="contact-shape-1"
                  src="assets/img/contact/contact-shape-1.png"
                  alt="img not found"
                />
                <img
                  className="contact-shape-2"
                  src="assets/img/contact/contact-shape-2.png"
                  alt="img not found"
                />
                <img
                  className="contact-shape-3"
                  src="assets/img/contact/contact-shape-3.png"
                  alt="img not found"
                />
              </div>
              <div className="contact__info-inner white-bg">
                <ul>
                  <li>
                    <div className="contact__info-item d-flex align-items-start mb-35">
                      <div className="contact__info-icon mr-15">
                        <svg className="map" viewBox="0 0 24 24">
                          <path
                            className="st0"
                            d="M21,10c0,7-9,13-9,13s-9-6-9-13c0-5,4-9,9-9S21,5,21,10z"
                          />
                          <circle className="st0" cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="contact__info-text">
                        <h4>UK Office</h4>
                        <p>
                          <a
                            target="_blank"
                            href="https://www.google.com/maps/place/Dhaka/@23.7806207,90.3492859,12z/data=!3m1!4b1!4m5!3m4!1s0x3755b8b087026b81:0x8fa563bbdd5904c2!8m2!3d23.8104753!4d90.4119873"
                          >
                            Learn For Care 124 City Road, London, EC1V2NX
                            
                          </a>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="contact__info-item d-flex align-items-start mb-35">
                      <div className="contact__info-icon mr-15">
                        <svg className="mail" viewBox="0 0 24 24">
                          <path
                            className="st0"
                            d="M4,4h16c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6C2,4.9,2.9,4,4,4z"
                          />
                          <polyline className="st0" points="22,6 12,13 2,6 " />
                        </svg>
                      </div>
                      <div className="contact__info-text">
                        <h4>Email us directly</h4>
                        <p>
                          <a href="mailto:support@educal.com">
                            support@learnforcare.co.uk
                          </a>
                        </p>
                        {/* <p>
                          <a href="mailto:info@educal.com">
                            {" "}
                            info@learnforcare.co.uk
                          </a>
                        </p> */}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="contact__info-item d-flex align-items-start mb-35">
                      <div className="contact__info-icon mr-15">
                        <svg className="call" viewBox="0 0 24 24">
                          <path
                            className="st0"
                            d="M22,16.9v3c0,1.1-0.9,2-2,2c-0.1,0-0.1,0-0.2,0c-3.1-0.3-6-1.4-8.6-3.1c-2.4-1.5-4.5-3.6-6-6  c-1.7-2.6-2.7-5.6-3.1-8.7C2,3.1,2.8,2.1,3.9,2C4,2,4.1,2,4.1,2h3c1,0,1.9,0.7,2,1.7c0.1,1,0.4,1.9,0.7,2.8c0.3,0.7,0.1,1.6-0.4,2.1  L8.1,9.9c1.4,2.5,3.5,4.6,6,6l1.3-1.3c0.6-0.5,1.4-0.7,2.1-0.4c0.9,0.3,1.8,0.6,2.8,0.7C21.3,15,22,15.9,22,16.9z"
                          />
                        </svg>
                      </div>
                      <div className="contact__info-text">
                        <h4>Phone</h4>
                        <p>
                          <a href="tel:+(426)-742-26-44">+(44)-2030051290</a>
                        </p>
                        {/* <p><a href="tel:+(224)-762-442-32">+(44) 762 442 32</a></p> */}
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="footer__social pl-30">
                  <h4>Follow Us</h4>
                  <ul>
                    <li>
                      <a href="#">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="tw">
                        <FaXTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="pin">
                        <BsInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="lin1">
                        <FaLinkedinIn />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetInTouch;
