import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetchData from "../../../axios";
import store from "../../../redux/store";
import { ToastContainer, toast } from "react-toastify";

function BundleCard({ item }) {
  const makeRequest = fetchData();
  const { cart } = useSelector((state) => state.cart);
  const [fakeCount, setFakeCount] = useState(0);
  const [bundles, setBundles] = useState([]);

  function getCartItem() {
    makeRequest("GET", "/cart/get")
      .then((res) => {

        console.log(res.data.response);
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
    getAllBundles();
  }, []);

  function getAllBundles() {
    makeRequest("GET", "/bundle/get-all-bundles")
      .then((res) => {
        setBundles(res.data.response);
        console.log(res.data.response); 
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleClick(id) {
    if (!fakeCount <= 0) {
      let cartItem = cart.find((cartItem) => cartItem.course_id == item.id);

      if (cartItem) {
        updateCount(Number(cartItem.id), Number(item.id), Number(fakeCount),cartItem.item_type);
      } else {
        addToCart(item.id);
      }
    }
  }

  function addToCart(id) {
    console.log(fakeCount, id);
    const data = new FormData();
    data.append("course", JSON.stringify([{ count: fakeCount, id: id }]));
    makeRequest("POST", "/cart/add-bundle", data)
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
              course: {...bundles.find((item) => item.id === id),item_type: "bundle"},
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

  return (
    <div key={item.id} className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
      <div className="course__item white-bg mb-30 fix">
        <div className="course__thumb w-img p-relative fix">
          <Link href={`/course-grid`}>
            <a>
              <img src={item.image} alt="img not found" />
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
            <Link href={`/course-grid`}>
              <a>{item.name}</a>
              {/* <a>{item.name.slice(0, 20) + "..."}</a> */}
            </Link>
          </h3>
          <div className="course__teacher d-flex align-items-center">
            {/* <div className="course__teacher-thumb mr-15">
                                 <img src="assets/img/course/teacher/teacher-5.jpg" alt="img not found"/>
                              </div> */}
            <h6>
              <Link href={`/course-grid`}>
                <a>{item?.description?.slice(0, 150) + "..."}</a>
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
  );
}

export default BundleCard;


