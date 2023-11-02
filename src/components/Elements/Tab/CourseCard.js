import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchData from "../../../axios";
import store from "../../../redux/store";

function CourseCard({ item }) {
  const makeRequest = fetchData();
  const { cart } = useSelector((state) => state.cart);
  const [fakeCount, setFakeCount] = useState(0);
  const [course, setCourse] = useState([]);

  const [count, setCount] = useState(() => {
    let itemCount = cart.find(
      (cartItem) => cartItem.course_id == item.id
    )?.product_count;
    return itemCount ? itemCount : 0;
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

  useEffect(() => {
    getAllCourse();
  }, []);

  function getAllCourse() {
    makeRequest("GET", "/course/get-all-course")
      .then((res) => {
        setCourse(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleClick(id) {
    if (!fakeCount <= 0) {
      let cartItem = cart.find(
        (cartItem) => cartItem.course_id == item.id
      )?.product_count;

      if (cartItem) {
        updateCount(item.id, Number(fakeCount));
      } else {
        addToCart(item.id);
        updateCount(item.id, Number(fakeCount));
      }
    }
  }

  function addToCart(id) {
    makeRequest("POST", "/cart/add", { course: [{ count: 1, id: id }] })
      .then((res) => {
        getCartItem();
        console.log(res.data);
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

  function updateCount(id, count) {
    console.log(count);
    makeRequest("PATCH", "/cart/update-cart-count", {
      course_id: id,
      identifier: 1,
      count,
    })
      .then((res) => {
        setFakeCount(0);
        getCartItem();
        store.dispatch({
          type: "INCREMENT_ITEM_CONT",
          payload: id,
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "INCREMENT_ITEM_CONT",
            payload: id,
          });
        }
        console.log(err);
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
                onClick={() => setFakeCount((prev) => --prev)}
              >
                <i className="fas fa-minus"></i>
              </button>
              <p className="p-1">{fakeCount}</p>
              <button
                className="cart-plus"
                onClick={() => setFakeCount((prev) => ++prev)}
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
  );
}

export default CourseCard;
