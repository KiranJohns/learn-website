import React, { Component } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import Confetti from 'react-confetti';

class FailedLayout extends Component {
    componentDidMount() {
        function removeCouponHandler() {
            makeRequest("POST", "/coupon/remove-coupon")
              .then((res) => {
                
              })
              .catch((err) => {
                console.log(err);
              });
          }
          removeCouponHandler()
    }
    render() {


        return (
            <div className="row">

                <div style={{ marginTop: "4rem", padding: '4rem' }} className="col-xxl-12 d-flex flex-column justify-content-center align-items-center">
                    <h1 style={{ color: "#f54263" }}><IoMdCloseCircle /></h1>
                    <h1 style={{ color: "#124694" }}>Payment Failed</h1>
                    <h3 style={{ color: "#124694" }}>
                        You payment has been failed
                    </h3>
                    <a href="/cart">
                        <div
                            className="btn btn-primary"
                            style={{ marginTop: "2rem" }}
                        >
                            Back to Cart
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}
export default FailedLayout;
