import React, { Component } from 'react';
import { BsFillPatchCheckFill } from "react-icons/bs";
import Confetti from 'react-confetti';

class SuccessLayout extends Component {
    render() {
        // const width = window.innerWidth;
        // const height = window.innerHeight;

        return (
            <div className="row">
              
                <div style={{ marginTop: "4rem", padding: '4rem' }} className="col-xxl-12 d-flex flex-column justify-content-center align-items-center">
                    <h1 style={{ color: "#129444" }}><BsFillPatchCheckFill /></h1>
                    <h1 style={{ color: "#124694" }}>Payment successful</h1>
                </div>
            </div>
        );
    }
}

export default SuccessLayout;

