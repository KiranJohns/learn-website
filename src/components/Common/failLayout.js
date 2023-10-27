import React, { Component } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import Confetti from 'react-confetti';

class FailedLayout extends Component {
    render() {


        return (
            <div className="row">
              
                <div style={{ marginTop: "4rem", padding: '4rem' }} className="col-xxl-12 d-flex flex-column justify-content-center align-items-center">
                    <h1 style={{ color: "#f54263" }}><IoMdCloseCircle/></h1>
                    <h1 style={{ color: "#124694" }}>Payment Failed</h1>
                </div>
            </div>
        );
    }
}
export default FailedLayout;
