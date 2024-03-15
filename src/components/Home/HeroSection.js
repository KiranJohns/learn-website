import React, { Component } from 'react';
import Link from 'next/link';

class Hero extends Component {

    render() {

        return (
            <main>
                <section className="hero__area hero__height d-flex align-items-center grey-bg-2 p-relative">
                    <div className="hero__shape">
                        <img className="hero-1-circle" src="assets/img/shape/hero/hero-1-circle.png" alt="img not found"/>
                        <img className="hero-1-circle-2" src="assets/img/shape/hero/hero-1-circle-2.png" alt="img not found"/>
                        <img className="hero-1-dot-2" src="assets/img/shape/hero/hero-1-dot-2.png" alt="img not found"/>
                    </div>
                    <div className="container">
                        <div className="hero__content-wrapper mt-90">
                            <div className="row align-items-center">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                    <div className="hero__content p-relative z-index-1">
                                    <h1 className="hero__title">
                                        <span></span>
                                        <span>CQC </span>   
                                         <span className="yellow-shapes">Complaint<img src="assets/img/shape/yellow-bg.png" alt=" "/> </span> 
                                         Care Courses</h1>
                                         
                                      
                                        <p>Unlocking Knowledge, Enhancing Compassion, and Improving Care</p>
                                        <Link href="/all-courses"><a className="e-btn">view all course</a></Link>
                                    </div>
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
                                    <div className="hero__thumb d-flex p-relative">
                                    <div className="hero__thumb-shape">
                                        <img className="hero-1-dot" src="assets/img/shape/hero/hero-1-dot.png" alt="img not found"/>
                                        <img className="hero-1-circle-3" src="assets/img/shape/hero/hero-1-circle-3.png" alt="img not found"/>
                                        <img className="hero-1-circle-4" src="assets/img/shape/hero/hero-1-circle-4.png" alt="img not found"/>
                                    </div>
                                    <div className="hero-image-cen hero__thumb-big mr-30 ">
                                        <img src="assets/img/hero/Home1.webp" alt="img not found"/>
                                        {/* <img src="https://images.pexels.com/photos/5088181/pexels-photo-5088181.jpeg?auto=compress&cs=tinysrgb&w=600" alt="not found" /> */}
                                        <div className="hero__quote hero__quote-animation">
                                            <span style={{fontWeight:"bold", color:"#212a50"}}>Nurturing Knowledge, Elevating<br/>Compassion in Caregiving</span>                                           
                                        </div>
                                    </div>
                                    <div className="hero-image-cen hero__thumb-sm mt-50 d-none d-xl-block">
                                        <img src="assets/img/hero/Home2.webp" alt="img not found"/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

export default Hero;