import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function CourseCard({ item }) {
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(() => {
    let count = cart.find(
      (cartItem) => cartItem.course_id == item.id
    )?.product_count;
    if (!count) {
      return 0;
    } else {
      return count;
    }
  });

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
    makeRequest("POST", "/cart/add", { course: [{ count: 1, id: id }] })
      .then((res) => {
        getCartItem();
        console.log(res.data);
        store.dispatch({
          type: "ADD_TO_CART",
          payload: course.find((item) => item.id === id),
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "ADD_TO_CART",
            payload: course.find((item) => item.id === id),
          });
        }
      });
  }

  function increment(id) {
    makeRequest("PATCH", "/cart/update-cart-count", {
      course_id: id,
      identifier: 1,
    })
      .then((res) => {
        getCartItem();
        store.dispatch({
          type: "INCREMENT_ITEM_CONT",
          payload: id,
        });
        console.log(res.data);
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "INCREMENT_ITEM_CONT",
            payload: id,
          });
        }
        console.log(err?.data?.errors);
        console.log(err?.data);
      });
  }

  return (
    <div key={item.id} className="col-xxl-3 col-xl-3 col-lg-3 col-md-4">
      <div className="course__item white-bg mb-30 fix">
        <div className="course__thumb w-img p-relative fix">
          <Link href={`/course/${item.id}`}>
            <a>
              <img src={item.thumbnail} alt="img not found" />
            </a>
          </Link>
          {/* <div className="course__tag">
                        <Link href="/course-details">
                          <a className="orange">{item.course_tags}</a>
                        </Link>
                      </div> */}
        </div>
        <div className="course__content">
          <h3 className="homee__title" title={item.name}>
            <Link href={`/course/${item.id}`}>
              <a>{item.name}</a>
              {/* <a>{item.name.slice(0, 20) + "..."}</a> */}
            </Link>
          </h3>
          <div className="course__teacher d-flex align-items-center">
            {/* <div className="course__teacher-thumb mr-15">
                                 <img src="assets/img/course/teacher/teacher-5.jpg" alt="img not found"/>
                              </div> */}
            <h6>
              <Link href={`/course/${item.id}`}>
                <a>{item.description.slice(0, 150) + "..."}</a>
              </Link>
            </h6>
          </div>
        </div>
        <div className="course__more d-flex justify-content-around">
          <div className="course__status d-flex align-items-center">
            <span className="sky-blue mb-3" style={{ marginBottom: "1px" }}>
              £{item.price}
            </span>
          </div>
          <span style={{ marginTop: "2px" }}>
            <div className="d-flex ml-1">
              <button
                className="cart-minus "
                onClick={() => setCount(prev => --prev)}
              >
                <i className="fas fa-minus"></i>
              </button>
              <p className="p-1">{count}</p>
              <button className="cart-plus" onClick={() => setCount(prev => ++prev)}>
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
              onClick={() => addToCart(item.id)}
            >
              Add
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
