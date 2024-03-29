import React, { Component, useEffect } from "react";
import { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import fetchData from "../../axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../../redux/store";
import { ImCross } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";

const MyCart = () => {
  const makeRequest = fetchData();
  const { cart, totalPrice } = useSelector((state) => state.cart);
  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState({
    coupon_code: "XXXX",
    type: "",
    amount: "",
  });
  const [offerPrice, setOfferPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [tocheckout, setToCheckout] = useState(false);
  const router = useRouter();

  function goTo(route, id) {
    switch (route) {
      case "Care Bundle":
        router.push({ pathname: "/bundle/care-bundle", query: { id } });
        // location.href = "/course-grid";
        break;
      case "Mandatory Care Bundle":
        router.push({ pathname: "/bundle/mandatory-bundle", query: { id } });
        // location.href = "/course-mandatory";
        break;
      case "Specialised Care Bundle":
        router.push({ pathname: "/bundle/special-bundle", query: { id } });
        // location.href = "/course-specialised";
        break;
      case "Recovery Care Bundle":
        router.push({ pathname: "/bundle/recovery-bundle", query: { id } });
        // location.href = "/course-recovery";
        break;
      case "Child Care Bundle":
        router.push({ pathname: "/bundle/child-bundle", query: { id } });
        // location.href = "/course-child";
        break;
      case "Online Care Bundle":
        router.push({ pathname: "/bundle/bundle-Online", query: { id } });
        // location.href = "/course-online";
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    getCartItem();

    return () => {
      if (!tocheckout) {
        makeRequest("POST", "/coupon/remove-coupon")
          .then((res) => {
            setCoupon("");
            setOfferPrice();
            setCouponData({ coupon_code: "XXXX" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      setToCheckout(false);
    };
  }, []);

  useEffect(() => {
    if (couponData.coupon_code != "XXXX" && couponData.coupon_code != "") {
      applyCouponWithoutInfo(couponData.coupon_code);
    }
  }, [totalPrice]);

  function getCartItem() {
    return new Promise((resolve, reject) => {
      makeRequest("GET", "/cart/get")
        .then((res) => {
          console.log(res.data.response);
          store.dispatch({
            type: "SET_CART",
            payload: JSON.stringify(
              res.data.response.filter((item) => item.product_count >= 1)
            ),
          });
          resolve();
        })
        .catch((err) => {
          if (err?.data?.errors[0].message === "please login") {
            store.dispatch({
              type: "SET_CART",
            });
          }
          console.log(err);
        });
    });
  }

  function removeItem(id) {
    console.log(id);
    makeRequest("DELETE", "/cart/delete-cart-item", { cart_id: id })
      .then((res) => {
        console.log(res.data);
        getCartItem();
        removeCoupon();
        store.dispatch({
          type: "REMOVE_ITEM",
          payload: id,
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "REMOVE_ITEM",
            payload: id,
          });
        }
        console.log(err?.data?.errors);
        console.log(err?.data);
      });
  }
  function increment(courseId, id, type) {
    makeRequest("PATCH", "/cart/update-cart-count", {
      count: 1,
      id,
      type,
      courseId,
    })
      .then(async (res) => {
        getCartItem();
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "INCREMENT_ITEM_CONT",
            payload: { id, count: 1 },
          });
        }
        console.log(err?.data?.errors);
        console.log(err?.data);
      });
  }
  function decrement(courseId, id, type) {
    makeRequest("PATCH", "/cart/update-cart-count", {
      count: -1,
      id,
      type,
      courseId,
    })
      .then(async (res) => {
        await getCartItem();
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          console.log("log");
          store.dispatch({
            type: "DECREMENT_ITEM_CONT",
            payload: id,
          });
        }
        console.log(err?.data?.errors);
        console.log(err?.data);
      });
  }
  function applyCouponWithoutInfo(coupon) {
    // alert(coupon)
    makeRequest("POST", "/coupon/apply-coupon", { code: coupon })
      .then((res) => {
        setCouponData((prev) => {
          return {
            ...prev,
            amount: res.data.response.amount,
            type: res.data.response.coupon_type,
          };
        });
        if (res.data.response.coupon_type == "Cash") {
          console.log(
            totalPrice -
              parseFloat(totalPrice) -
              parseFloat(res.data.response.amount)
          );

          setOfferPrice(
            parseFloat(
              parseFloat(totalPrice) - parseFloat(res.data.response.amount)
            ).toFixed(2)
          );

          setOffer(
            totalPrice -
              parseFloat(
                parseFloat(totalPrice) - parseFloat(res.data.response.amount)
              ).toFixed(2)
          );
        } else {
          let per = parseFloat(
            (parseFloat(totalPrice) * parseFloat(res.data.response.amount)) /
              100
          );
          console.log(
            totalPrice - parseFloat(parseFloat(totalPrice) - per).toFixed(2)
          );

          setOffer(
            totalPrice - parseFloat(parseFloat(totalPrice) - per).toFixed(2)
          );

          setOfferPrice(parseFloat(parseFloat(totalPrice) - per).toFixed(2));
        }
        setCoupon("");
        console.log(res.data.response);
        setCouponData(res.data.response);
      })
      .catch((err) => {

      })
  }
  function applyCoupon(coupon) {
    // alert(coupon)
    makeRequest("POST", "/coupon/apply-coupon", { code: coupon })
      .then((res) => {
        toast("Coupon Applied");
        setCouponData((prev) => {
          return {
            ...prev,
            amount: res.data.response.amount,
            type: res.data.response.coupon_type,
          };
        });
        if (res.data.response.coupon_type == "Cash") {
          console.log(
            totalPrice -
              parseFloat(totalPrice) -
              parseFloat(res.data.response.amount)
          );

          setOfferPrice(
            parseFloat(
              parseFloat(totalPrice) - parseFloat(res.data.response.amount)
            ).toFixed(2)
          );

          setOffer(
            totalPrice -
              parseFloat(
                parseFloat(totalPrice) - parseFloat(res.data.response.amount)
              ).toFixed(2)
          );
        } else {
          let per = parseFloat(
            (parseFloat(totalPrice) * parseFloat(res.data.response.amount)) /
              100
          );
          console.log(
            totalPrice - parseFloat(parseFloat(totalPrice) - per).toFixed(2)
          );

          setOffer(
            totalPrice - parseFloat(parseFloat(totalPrice) - per).toFixed(2)
          );

          setOfferPrice(parseFloat(parseFloat(totalPrice) - per).toFixed(2));
        }
        setCoupon("");
        console.log(res.data.response);
        setCouponData(res.data.response);
      })
      .catch((err) => {
        if (err?.data?.data?.response === "Minimum purchase is required.") {
          removeCoupon();
          toast.warn("Add more items to cart for this applying coupon");
        } else if (err?.data?.data?.response === "coupon not fount") {
          toast.warn("Invalid Coupon");
        } else if (err?.data?.data?.response === "Please Provide Coupon Code") {
          toast.warn("Please Provide Coupon Code");
        } else if (err?.data?.data?.response === "Coupon is Inactive") {
          toast.warn("Coupon Expired");
        } else {
          toast.warn("Please Login");
        }
      });
  }

  function removeCouponHandler() {
    makeRequest("POST", "/coupon/remove-coupon")
      .then((res) => {
        setCoupon("");
        toast("Coupon Removed");
        setOfferPrice();
        setOffer();
        setCouponData({ coupon_code: "XXXX" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    removeCoupon();
  }, []);

  function removeCoupon() {
    return new Promise((resolve, reject) => {
      // console.log("remove coupon function");
      makeRequest("POST", "/coupon/remove-coupon")
        .then((res) => {
          console.log("coupon removed");
          setCoupon("");
          setCouponData({ amount: "", coupon_code: "", type: "" });
          setOfferPrice();
          setOffer();
          resolve();
          // setCouponData({ coupon_code: "XXXX" });
        })
        .catch((err) => {
          reject();
          console.log(err);
        });
    });
  }

  function handleCheckout(e) {
    e.preventDefault();
    makeRequest("POST", "/cart/checkout")
      .then((res) => {
        console.log(res.data.response);
        localStorage.removeItem("learnfrocarecart");
        localStorage.setItem("reload", true);
        setToCheckout(true);
        setInterval(() => {
          location.href = res.data.response;
        }, 1000);
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          localStorage.setItem("from-checkout", true);
          location.pathname = "/sign-in";
        }
        console.log(err.data.errors[0]);
      });
  }
  return (
    <main>
      <ToastContainer position="top-right" />
      {/* breadcrumb-start */}
      <Breadcrumb pageTitle="My Cart" />
      {/* breadcrumb-end */}

      <section className="cart-area pt-70 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-content table-responsive">
                <table className="table  cart-table-display">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Course</th>
                      <th className="cart-product-name">Course Name</th>
                      <th className="product-price">Unit Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart &&
                      cart.map((item, id) => {
                        return (
                          <tr key={{ id }}>
                            <td className="product-thumbnail">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  item.item_type == "course"
                                    ? (location.href = `/course/${item.course_id}`)
                                    : goTo(item.name, item.course_id);
                                }}
                              >
                                <a>
                                  <img
                                    src={
                                      item?.thumbnail
                                        ? item?.thumbnail
                                        : item?.image
                                    }
                                    alt="img not found"
                                  />
                                </a>
                              </span>
                            </td>
                            <td className="product-name">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  item.item_type == "course"
                                    ? (location.href = `/course/${item.course_id}`)
                                    : goTo(item.name, item.course_id);
                                }}
                              >
                                <a>{item.name}</a>
                              </span>
                            </td>
                            <td className="product-price">
                              <span className="amount">
                                £
                                {parseFloat(
                                  item.amount / item.product_count
                                ).toFixed(2)}
                              </span>
                            </td>
                            <td className="product-quantity text-center">
                              <div className="product-quantity mt-10 mb-10">
                                <div className="product-quantity-form d-flex flex-column align-items-center">
                                  <button
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    className="cart-minus"
                                    onClick={() =>
                                      decrement(
                                        item.course_id,
                                        item.id,
                                        item.item_type
                                      )
                                    }
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                  <p
                                    style={{
                                      padding: "0.8rem",
                                      marginTop: "0.4rem",
                                    }}
                                  >
                                    {item.product_count}
                                  </p>
                                  {/* <p>{this.state.num}</p> */}
                                  <button
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    className="cart-plus"
                                    onClick={() =>
                                      increment(
                                        item.course_id,
                                        item.id,
                                        item.item_type
                                      )
                                    }
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="product-subtotal">
                              <span className="amount ">
                                £{parseFloat(item.amount).toFixed(2)}
                              </span>
                            </td>
                            <td className="product-remove">
                              <span onClick={() => removeItem(item.id)}>
                                <FaTrash
                                  style={{
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <div
                  className="cart-card-display"
                  style={{ marginTop: "1rem", padding: "1rem" }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "center" }}
                    className="row"
                  >
                    {/* <div style={{display:'flex'}} className="col-12"> */}

                    {cart &&
                      cart.map((item, id) => {
                        return (
                          <div
                            key={{ id }}
                            style={{
                              width: "28em",
                              height: "20rem",
                              position: "relative",
                              marginTop: "1rem",
                            }}
                            className="cart-card-shadow col-10 "
                          >
                            <div
                              style={{
                                position: "absolute",
                                right: "0",
                                padding: ".5rem",
                              }}
                            >
                              <span onClick={() => removeItem(item.id)}>
                                <FaTrash
                                  style={{
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    color: "#212a50",
                                  }}
                                />
                              </span>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ padding: "1rem" }}>
                                <Link href={`/course/${item.course_id}`}>
                                  <img
                                    style={{ height: "8rem", width: "13rem" }}
                                    src={item.thumbnail}
                                    alt=""
                                  />
                                </Link>
                              </div>

                              <div style={{ marginTop: "2.5rem" }}>
                                <h4
                                  className="unit-font-s"
                                  style={{ color: "#212a50" }}
                                >
                                  Unit Price
                                </h4>
                                <div>
                                  <span
                                    style={{ textAlign: "center" }}
                                    className="amount"
                                  >
                                    <p>
                                      £
                                      {parseFloat(
                                        item.amount / item.product_count
                                      ).toFixed(2)}
                                    </p>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div style={{}}>
                                <h4
                                  style={{
                                    color: "#212a50",
                                    marginTop: "1rem",
                                  }}
                                >
                                  {" "}
                                  <Link href={`/course/${item.course_id}`}>
                                    <a>{item.name}</a>
                                  </Link>
                                </h4>
                                <div>
                                  {/* <strong>Quantity: {item.quantity}</strong> */}
                                  <div className="product-quantity-form d-flex flex-column align-items-center">
                                    <button
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      className="cart-minus"
                                      onClick={() =>
                                        decrement(
                                          item.course_id,
                                          item.id,
                                          item.item_type
                                        )
                                      }
                                    >
                                      <i className="fas fa-minus"></i>
                                    </button>
                                    <p
                                      style={{
                                        padding: "0.8rem",
                                        marginTop: "0.4rem",
                                      }}
                                    >
                                      {item.product_count}
                                    </p>
                                    {/* <p>{this.state.num}</p> */}
                                    <button
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      className="cart-plus"
                                      onClick={() =>
                                        increment(
                                          item.course_id,
                                          item.id,
                                          item.item_type
                                        )
                                      }
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    {/* </div> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="coupon-all">
                    <div className="coupon d-sm-flex align-items-center">
                      <input
                        style={{ borderRadius: ".25rem" }}
                        id="coupon_code"
                        onChange={(e) => setCoupon(e.target.value)}
                        className="input-text"
                        value={coupon}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") applyCoupon(coupon);
                        }}
                        name="coupon_code"
                        placeholder="Coupon code"
                        type="text"
                      />
                      {!offerPrice ? (
                        <button
                          className="e-btn"
                          name="apply_coupon"
                          type="submit"
                          onClick={() => applyCoupon(coupon)}
                        >
                          Apply coupon
                        </button>
                      ) : (
                        <button
                          className="e-btn"
                          name="apply_coupon"
                          type="submit"
                          onClick={() => applyCoupon(couponData.coupon_code)}
                        >
                          Refresh
                        </button>
                      )}
                      {offerPrice && (
                        <div
                          style={{
                            marginLeft: "1rem",
                            padding: ".75rem",
                            background: "#5a9676",
                            color: "#fff",
                            fontWeight: "600",
                            borderRadius: ".27rem",
                          }}
                        >
                          {couponData.coupon_code}
                          <span
                            style={{
                              marginLeft: ".2rem",
                              padding: ".75rem",
                              background: "#5a9676",
                              color: "#fff",
                              cursor: "pointer",
                              alignContent: "center",
                            }}
                          >
                            {" "}
                            <FaTrash
                              onClick={removeCouponHandler}
                              style={{
                                fontSize: "1.1rem",
                                marginBottom: ".18rem",
                              }}
                            />
                          </span>
                        </div>
                      )}
                    </div>

                    {/* <div className="coupon2">
                      <button
                        className="e-btn"
                        name="update_cart"
                        type="submit"
                      >
                        Update cart
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-6 ml-auto">
                  <div className="cart-page-total">
                    {/* <h2>Grand Total</h2> */}
                    <ul className="mb-20 d-flex ">
                      {/* <li>Subtotal <span>£24.00</span></li> */}
                      <li
                        style={{ marginTop: ".4rem" }}
                        className="d-flex justify-content-between w-100"
                      >
                        Subtotal
                        <p>
                          <span
                            className="discount-font"
                            style={{ color: "#212a50", fontWeight:"700" }}
                          >
                            £ {parseFloat(totalPrice).toFixed(2)}
                          </span>
                          {/* {couponData && <span style={{textDecoration:"line-through",color:`${couponData ? 'red' : 'green'}` }}>£ {totalPrice}</span>} */}
                        </p>
                      </li>

                      <li
                        style={{ marginTop: ".4rem" }}
                        className="d-flex justify-content-between w-100"
                      >
                        Discount
                        <p>
                          <span
                            className="discount-font"
                            style={{ color: "#212a50", fontWeight:"700" }}
                          >
                            £ {offerPrice ? parseFloat(offer).toFixed(2) : 0}
                          </span>
                          {/* {couponData && <span style={{textDecoration:"line-through",color:`${couponData ? 'red' : 'green'}` }}>£ {totalPrice}</span>} */}
                        </p>
                      </li>
                    </ul>
                    <ul>
                      <li
                        style={{ marginTop: ".4rem" }}
                        className="d-flex  justify-content-between w-100"
                      >
                      <h2 style={{fontSize:"1rem", fontWeight:"400", color:"#6F7172"}}>Grand Total</h2>
                        <p>
                          <span
                            className="grand-total-f"
                            style={{ color: "#212a50", fontSize: "1.2rem", fontWeight:"700" }}
                          >
                            £{" "}
                            {offerPrice
                              ? parseFloat(offerPrice).toFixed(2)
                              : parseFloat(totalPrice).toFixed(2)}
                          </span>
                          {/* {couponData && <span style={{textDecoration:"line-through",color:`${couponData ? 'red' : 'green'}` }}>£ {totalPrice}</span>} */}
                        </p>
                      </li>
                    </ul>
                    <Link href="/checkout">
                      <span
                        onClick={handleCheckout}
                        className="e-btn mt-3 e-btn-border"
                        style={{ cursor: "pointer" }}
                      >
                        Proceed to checkout
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyCart;
