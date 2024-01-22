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
          payload: JSON.stringify(res.data.response),
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
    makeRequest("DELETE", "/cart/delete-cart-item", { cart_id: id })
      .then((res) => {
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
  function increment(id, type, courseId) {
    makeRequest("PATCH", "/cart/update-cart-count", {
      id,
      type,
      count: 1,
      courseId,
    })
      .then((res) => {
        getCartItem();
        console.log(res.data);
        // store.dispatch({
        //   type: "INCREMENT_ITEM_CONT",
        //   payload: { id, count: 1 },
        // });
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
  function decrement(id, type, courseId) {
    console.log("hi");
    makeRequest("PATCH", "/cart/update-cart-count", {
      id,
      type,
      count: -1,
      courseId,
    })
      .then((res) => {
        getCartItem();
        console.log(res.data);
        // store.dispatch({
        //   type: "DECREMENT_ITEM_CONT",
        //   payload: id,
        // });
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
    // localStorage.removeItem("learnfrocarecart");
    makeRequest("POST", "/cart/checkout")
      .then((res) => {
        console.log(res.data.response);
        localStorage.removeItem("learnfrocarecart");
        localStorage.setItem("reload", true);
        setTimeout(() => {
          location.href = res.data.response;
        }, 100);
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          localStorage.setItem("from-checkout", true);
          location = "/sign-in";
        }
      });
  }

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

  return (
    <div className={shopOpen ? "sidebar__areas open" : "sidebar__areas"}>
      <div className="cartmini__area">
        <div className="cartmini__wrapper">
          <div className="cartmini__title">
            <h4>Shopping cart</h4>
          </div>
          <div className="cartmini__close">
            <button
              style={{ transition: ".3s" }}
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
                    console.log(item);
                    return (
                      <li>
                        <div className="cartmini__thumb">
                          <a
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (item.item_type == "bundle") {
                                goTo(item.name, item.id);
                              } else {
                                location.href = `/course/${item.course_id}`;
                              }
                            }}
                            //  href={`/${item.item_type == "bundle" ? 'bundle' : 'course' }/${item.course_id}`}
                          >
                            <img src={item?.thumbnail ? item?.thumbnail : item?.image } alt="img not found" />
                          </a>
                        </div>
                        <div className="cartmini__content">
                          <h5>
                            <span
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                if (item.item_type == "bundle") {
                                  goTo(item.name, item.id);
                                } else {
                                  location.href = `/course/${item.course_id}`;
                                }
                              }}
                              // href={`/${item.item_type == "bundle" ? 'bundle' : 'course' }/${item.course_id}`}
                            >
                              {item.name}
                            </span>
                          </h5>
                          <div className="product-quantity mt-10 mb-10">
                            <span
                              className="cart-minus"
                              onClick={() =>
                                decrement(
                                  item.id,
                                  item.item_type,
                                  item.course_id
                                )
                              }
                            >
                              -
                            </span>
                            <span className="cart-input">
                              {item.product_count}
                            </span>
                            <span
                              className="cart-plus"
                              onClick={() =>
                                increment(
                                  item.id,
                                  item.item_type,
                                  item.course_id
                                )
                              }
                            >
                              +
                            </span>
                          </div>
                          <div className="product__sm-price-wrapper">
                            <span className="product__sm-price">
                              £{parseFloat(item.amount).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <a
                          style={{ transition: "" }}
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
                <span>£{parseFloat(totalPrice).toFixed(2)}</span>
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
