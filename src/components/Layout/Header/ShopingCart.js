import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import store from "../../../redux/store";
import fetchData from "../../../axios";

const ShopingCart = ({ setShopOpen, shopOpen }) => {
  const router = useRouter();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  const { cart, totalPrice } = useSelector((store) => store.cart);

  const makeRequest = fetchData();
  function getCartItem() {
    makeRequest("GET", "/cart/get")
      .then((res) => {
        store.dispatch({
          type: "SET_CART",
          payload: res.data.response,
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "SET_CART",
          });
        }
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
  function decrement(id) {
    let product = cart.find((item) => item.course_id == id);

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
        if (err?.data?.errors[0].message === "please login") {
          store.dispatch({
            type: "DECREMENT_ITEM_CONT",
            payload: id,
          });
        }
        console.log(err?.data?.errors);
        console.log(err?.data);
      });
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
    <div className={shopOpen ? "sidebar__areas open" : "sidebar__areas"}>
      <div className="cartmini__area">
        <div className="cartmini__wrapper">
          <div className="cartmini__title">
            <h4>Shopping cart</h4>
          </div>
          <div className="cartmini__close">
            <button
              type="button"
              className="cartmini__close-btn"
              onClick={() => setShopOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="cartmini__widget">
            <div className="cartmini__inner">
              <ul>
                {cart &&
                  cart.map((item) => {
                    return (
                      <li>
                        <div className="cartmini__thumb">
                          <a href="#">
                            <img src={item.thumbnail} alt="img not found" />
                          </a>
                        </div>
                        <div className="cartmini__content">
                          <h5>
                            <a href="#">{item.name} </a>
                          </h5>
                          <div className="product-quantity mt-10 mb-10">
                            <span
                              className="cart-minus"
                              onClick={() => decrement(item.course_id)}
                            >
                              -
                            </span>
                            <span className="cart-input">
                              {item.product_count}
                            </span>
                            <span
                              className="cart-plus"
                              onClick={() => increment(item.course_id)}
                            >
                              +
                            </span>
                          </div>
                          <div className="product__sm-price-wrapper">
                            <span className="product__sm-price">
                              £{item.amount}
                            </span>
                          </div>
                        </div>
                        <a
                          href="#"
                          className="cartmini__del"
                          onClick={() => removeItem(item.id)}
                        >
                          <i className="fas fa-times"></i>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="cartmini__checkout">
              <div className="cartmini__checkout-title mb-30">
                <h4>Subtotal:</h4>
                <span>£{totalPrice}</span>
              </div>
              <div className="cartmini__checkout-btn">
                <Link href="/cart">
                  <a className="e-btn e-btn-border mb-10 w-100">
                    <span></span> view cart
                  </a>
                </Link>
                {/* <Link href="/checkout">
                  <a className="e-btn w-100">
                    <span>checkout</span>
                  </a>
                </Link> */}
              </div>
              <button onClick={handleCheckout} className="e-btn w-100">
                <span>checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopingCart;
