import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import store from "../../../redux/store";

const ShopingCart = ({ setShopOpen, shopOpen }) => {
  const router = useRouter();
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  const { cart,totalPrice } = useSelector((store) => store.cart);
  function removeItem(id) {
   store.dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  }
  function increment(id) {
    store.dispatch({
      type: "INCREMENT_ITEM_CONT",
      payload: id,
    });
  }
  function decrement(id) {
    store.dispatch({
      type: "DECREMENT_ITEM_CONT",
      payload: id,
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
                            <img src={item.image} alt="img not found" />
                            
                          </a>
                        </div>
                        <div className="cartmini__content">
                          <h5>
                            <a href="#">{item.heading} </a>
                          </h5>
                          <div className="product-quantity mt-10 mb-10">
                            <span
                              className="cart-minus"
                              onClick={() => decrement(item.id)}
                            >
                              -
                            </span>
                            <span className="cart-input">{item.count}</span>
                            <span
                              className="cart-plus"
                              onClick={() => increment(item.id)}
                            >
                              +
                            </span>
                          </div>
                          <div className="product__sm-price-wrapper">
                            <span className="product__sm-price">
                            £{item.price}
                            </span>
                          </div>
                        </div>
                        <a href="#" className="cartmini__del" onClick={() => removeItem(item.id)}>
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
                <Link href="/checkout">
                  <a className="e-btn w-100">
                    <span></span> checkout
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopingCart;
