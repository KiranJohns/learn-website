import React, { Component } from "react";
import { useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";
import fetchData from "../../axios";
import { useSelector } from "react-redux";
import store from "../../redux/store";

const MyCart = () => {
  const makeRequest = fetchData();
  const { cart, totalPrice } = useSelector((state) => state.cart);

  function getCartItem() {
    makeRequest("GET", "/cart/get")
      .then((res) => {
        store.dispatch({
          type: "SET_CART",
          payload: res.data.response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function removeItem(id) {
    console.log(id);
    makeRequest("DELETE", "/cart/delete-cart-item", { cart_id: id })
      .then((res) => {
        console.log(res.data);
        getCartItem();
        store.dispatch({
          type: "REMOVE_ITEM",
          payload: id,
        });
      })
      .catch((err) => {
        console.log(err?.data?.errors);
        console.log(err?.data);
      });
  }
  function increment(id) {
    makeRequest("PATCH", "/cart/update-cart-count", {
      course_id: id,
      identifier: 1,
    })
      .then((res) => {
        getCartItem();
        console.log(res.data);
        store.dispatch({
          type: "INCREMENT_ITEM_CONT",
          payload: id,
        });
      })
      .catch((err) => {
        console.log(err?.data?.errors);
        console.log(err?.data);
      });
  }
  function decrement(id) {
    let product = cart.find((item) => item.course_id == id);

    if (product && product.product_count > 1) {
      makeRequest("PATCH", "/cart/update-cart-count", {
        course_id: id,
        identifier: -1,
      })
        .then((res) => {
          getCartItem();
          console.log(res.data);
          store.dispatch({
            type: "DECREMENT_ITEM_CONT",
            payload: id,
          });
        })
        .catch((err) => {
          console.log(err?.data?.errors);
          console.log(err?.data);
        });
    }
  }
  function handleCheckout(e) {
    e.preventDefault();
    makeRequest("POST", "/cart/checkout")
      .then((res) => {
        console.log(res.data.response);
        window.location.href = res.data.response;
      })
      .catch((err) => {
        console.log(err.data.errors[0]);
      });
  }
  return (
    <main>
      {/* breadcrumb-start */}
      <Breadcrumb pageTitle="My Cart" />
      {/* breadcrumb-end */}

      <section className="cart-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-content table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Images</th>
                      <th className="cart-product-name">Product</th>
                      <th className="product-price">Unit Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-subtotal">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart &&
                      cart.map((item) => {
                        return (
                          <tr>
                            <td className="product-thumbnail">
                              <Link href="course-grid">
                                <a>
                                  <img
                                    src={item.thumbnail}
                                    alt="img not found"
                                  />
                                </a>
                              </Link>
                            </td>
                            <td className="product-name">
                              <Link href="/course-grid">
                                <a>{item.name}</a>
                              </Link>
                            </td>
                            <td className="product-price">
                              <span className="amount">
                                £{item.amount / item.product_count}
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
                                    onClick={() => decrement(item.course_id)}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                  <p
                                    style={{
                                      padding: "0.8rem",
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
                                    onClick={() => increment(item.course_id)}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td className="product-subtotal">
                              <span className="amount">£{item.amount}</span>
                            </td>
                            <td className="product-remove">
                              <span onClick={() => removeItem(item.id)}>
                                <i className="fas fa-times"></i>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* <div className="row">
                <div className="col-12">
                  <div className="coupon-all">
                    <div className="coupon d-sm-flex align-items-center">
                      <input
                        id="coupon_code"
                        className="input-text"
                        name="coupon_code"
                        placeholder="Coupon code"
                        type="text"
                      />
                      <button
                        className="e-btn"
                        name="apply_coupon"
                        type="submit"
                      >
                        Apply coupon
                      </button>
                    </div>
                    <div className="coupon2">
                      <button
                        className="e-btn"
                        name="update_cart"
                        type="submit"
                      >
                        Update cart
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="col-md-5 ml-auto">
                  <div className="cart-page-total">
                    <h2>Cart totals</h2>
                    <ul className="mb-20">
                      {/* <li>Subtotal <span>£24.00</span></li> */}
                      <li>
                        Total <span>£{totalPrice}</span>
                      </li>
                    </ul>
                    <Link href="/checkout">
                      <span
                        onClick={handleCheckout}
                        className="e-btn e-btn-border"
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
