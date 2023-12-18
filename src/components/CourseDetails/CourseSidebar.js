import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import ReactPlayer from "react-player";
import Modal from "react-responsive-modal";
import { useRouter } from "next/router";
// import products from '../../../sampleProduct.json'
import store from "../../redux/store";
import fetchData from "../../axios";
import { useSelector } from "react-redux";

function CourseSidebar({ addToCart }) {
  const {
    query: { slug },
  } = useRouter();

  const [fakeCount, setFakeCount] = useState(0);
  const { cart } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  const makeRequest = fetchData();

  async function handleClick(id) {
    if (!fakeCount <= 0) {
      let cartItem = cart.find((cartItem) => cartItem.course_id == course?.id);

      if (cartItem) {
        console.log(cartItem);
        updateCount(
          Number(cartItem.id),
          Number(course?.id),
          Number(fakeCount),
          cartItem.item_type
        );
      } else {
        addToCart(course?.id);
      }
    }
  }

  function getCartItem() {
    makeRequest("GET", "/cart/get")
      .then((res) => {
        store.dispatch({
          type: "SET_CART",
          payload: JSON.stringify(res.data.response),
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "SET_CART",
          });
        }
      });
  }

  function addToCart(id) {
    console.log(fakeCount, id);
    const data = new FormData();
    data.append("course", JSON.stringify([{ count: fakeCount, id: id }]));
    makeRequest("POST", "/cart/add", data)
      .then((res) => {
        getCartItem();
        setFakeCount(0);
        console.log(res.data);
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "ADD_TO_CART",
            payload: {
              course: {
                ...course,
                item_type: "course",
              },
              count: fakeCount,
            },
          });
          setFakeCount(0);
        }
      });
  }

  function updateCount(id, courseId, count, type) {
    const data = new FormData();
    data.append("id", id);
    data.append("type", type);
    data.append("count", count);
    data.append("courseId", courseId);
    makeRequest("PATCH", "/cart/update-cart-count", data)
      .then((res) => {
        setFakeCount(0);
        getCartItem();
        store.dispatch({
          type: "INCREMENT_ITEM_CONT",
          payload: { id, count },
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "INCREMENT_ITEM_CONT",
            payload: { id, count },
          });
          setFakeCount(0);
        }
        console.log(err);
        console.log(err?.data);
      });
  }
  const [course, setCourse] = useState(() => {
    makeRequest("GET", `/course/get-single-course/${slug}`)
      .then((res) => {
        setCourse(res.data.response[0]);
        console.log(res.data.response[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const onOpenModal = () => {
    setOpen((open) => true);
  };

  const onCloseModal = () => {
    setOpen((open) => false);
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={onCloseModal}
        styles={{
          modal: {
            maxWidth: "unset",
            width: "70%",
            padding: "unset",
          },
          overlay: {
            background: "rgba(0, 0, 0, 0.5)",
          },
          closeButton: {
            background: "yellow",
          },
        }}
        center
      >
        <ReactPlayer url="" width="100%" height="calc(100vh - 100px)" />
      </Modal>

      <div className="course__sidebar pl-70 p-relative">
        <div className="course__shape">
          <img
            className="course-dot"
            src="/assets/img/course/course-dot.png"
            alt="img not found"
          />
        </div>
        <div className="course__sidebar-widget-2 white-bg mb-20">
          <div className="course__video">
            {/* <div className="course__video-thumb w-img mb-25">
              <img src={course?.thumbnail} alt="img not found" />
              <div className="course__video-play">
                <a href="#!" className="play-btn" onClick={onOpenModal}>
                  {" "}
                  <i className="fas fa-play"></i>{" "}
                </a>
              </div>
            </div> */}
            <div className="course__video-meta mb-25 d-flex align-items-center justify-content-between">
              <div className="course__video-price">
                <h5>
                  £{parseFloat(course?.price).toFixed(2)}{" "}
                </h5>
                <h5 style={{color:'#c75342'}} className="old-price">
                £{parseFloat(course?.RRP).toFixed(2)}
                </h5>
              </div>
              <div className="course__video-discount">
                <span style={{ visibility: "hidden" }}>68% OFF</span>
              </div>
            </div>
            <div className="course__video-content mb-35">
              <ul>
                {/* <li className="d-flex align-items-center">
                    <div className="course__video-icon">
                      <i className="fas fa-home"></i>
                    </div>
                    <div className="course__video-info">
                      <h5>
                        <span>Instructor :</span> Eleanor Fant
                      </h5>
                    </div>
                  </li> */}
                <li className="d-flex align-items-center">
                  <div className="course__video-icon">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="course__video-info">
                    <h5>
                      {/* <span>Typ :</span>14 */}
                      {course?.course_type}
                    </h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <div className="course__video-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="course__video-info">
                    <h5>{course?.duration}</h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <div className="course__video-icon">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="course__video-info">
                    <h5>{course?.course_level}</h5>
                  </div>
                </li>
                <li className="d-flex align-items-center">
                  <div className="course__video-icon">
                    <i className="fas fa-globe"></i>
                  </div>
                  <div className="course__video-info">
                    <h5>{course?.certificate_line}</h5>
                    {/* <h5> Certificate of completion</h5> */}
                  </div>
                </li>
              </ul>
            </div>
            <div className="course__payment mb-35">
              <h3>Payment:</h3>
              <a href="#">
                <img
                  src="/assets/img/course/payment/payment-1.png"
                  alt="img not found"
                />
              </a>
            </div>
            <div className="course__enroll-btn">
              <div className="course__more d-flex justify-content-between">
                <div className="course__status d-flex align-items-center">
                  <span
                    className="sky-blue mb-3"
                    style={{ marginBottom: "1px" }}
                  >
                    £{parseFloat(course?.price).toFixed(2)}
                  </span>
                </div>
                <span style={{ marginTop: "2px" }}>
                  <div className="d-flex ml-1">
                    <button
                      className="cart-minus "
                      onClick={() =>
                        setFakeCount((prev) => {
                          if (prev <= 0) {
                            return 0;
                          }
                          return prev - 1;
                        })
                      }
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <p className="p-1">{fakeCount}</p>
                    <button
                      className="cart-plus"
                      onClick={() => setFakeCount((prev) => prev + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </span>
                <span style={{ marginBottom: ".1rem" }}>
                  <button
                    className="btn btn-primary btn-sm mb-2 d-flex justify-content-between align-items-center"
                    type="button"
                    // class=""
                    style={{ outline: "none", border: "none" }}
                    onClick={() => handleClick()}
                  >
                    Add
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CourseSidebar;
