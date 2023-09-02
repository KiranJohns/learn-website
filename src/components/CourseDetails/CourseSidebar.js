import React, { Component } from 'react';
import Link from 'next/link';
import ReactPlayer from "react-player";
import Modal from "react-responsive-modal";

class CourseSidebar extends Component {

    state = {
        open: false
      };
    
      onOpenModal = () => {
        this.setState(prevState => ({
          open: !prevState.open
        }));
      };

      onCloseModal = () => {
        this.setState(prevState => ({
          open: !prevState.open
        }));
      };

    render() {

        return (
            <React.Fragment>
                <Modal
                open={this.state.open}
                onClose={this.onCloseModal}
                styles={{
                modal: {
                    maxWidth: "unset",
                    width: "70%",
                    padding: "unset"
                },
                overlay: {
                    background: "rgba(0, 0, 0, 0.5)"
                },
                closeButton: {
                    background: "yellow"
                }
                }}
                center
            >
                <ReactPlayer
                url="https://youtu.be/es4x5R-rV9s"
                width="100%"
                height="calc(100vh - 100px)"
                />
            </Modal>
            
            <div className="course__sidebar pl-70 p-relative">
                <div className="course__shape">
                <img className="course-dot" src="assets/img/course/course-dot.png" alt="img not found"/>
                </div>
                <div className="course__sidebar-widget-2 white-bg mb-20">
                <div className="course__video">
                <div className="course__video-thumb w-img mb-25">
                    <img src="assets/img/course/cn1.webp" alt="img not found"/>
                    <div className="course__video-play"> 
                        <a href="#!" className="play-btn" onClick={this.onOpenModal}> <i className="fas fa-play"></i> </a>
                    </div>
                </div>
                    <div className="course__video-meta mb-25 d-flex align-items-center justify-content-between">
                        <div className="course__video-price">
                            <h5>$6.<span>00</span> </h5>
                            <h5 className="old-price">$12.00</h5>
                        </div>
                        {/* <div className="course__video-discount">
                            <span>68% OFF</span>
                        </div> */}
                    </div>
                    <div className="course__video-content mb-35">
                        <ul>
                            <li className="d-flex align-items-center">
                            <div className="course__video-icon">
                                <i className="fas fa-globe"></i>
                            </div>
                            <div className="course__video-info">
                                <h5><span>Online</span> </h5>
                            </div>
                            </li>
                            <li className="d-flex align-items-center">
                            <div className="course__video-icon">
                                <i className="fas fa-book"></i>
                            </div>
                            <div className="course__video-info">
                                <h5><span>Intermediate, Advanced</span></h5>
                            </div>
                            </li>
                            <li className="d-flex align-items-center">
                            <div className="course__video-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            <div className="course__video-info">
                                <h5><span>Variable</span></h5>
                            </div>
                            </li>
                            <li className="d-flex align-items-center">
                            <div className="course__video-icon">
                                <i className="fas fa-certificate"></i>
                            </div>
                            <div className="course__video-info">
                                <h5><span>Certificate on Completion</span></h5>
                            </div>
                            </li>
                            {/* <li className="d-flex align-items-center">
                            <div className="course__video-icon">
                                <i className="fas fa-globe"></i>
                            </div>
                            <div className="course__video-info">
                                <h5><span>Language :</span>English</h5>
                            </div>
                            </li> */}
                        </ul>
                    </div>
                    <div className="course__payment mb-35">
                        <h3>Payment:</h3>
                        <a href="#">
                            <img src="assets/img/course/payment/payment-1.png" alt="img not found"/>
                        </a>
                    </div>
                    <div className="course__enroll-btn">
                        <Link href="/course-grid"><a className="e-btn e-btn-7 w-100">Add to Cart<i className="fas fa-shopping-cart"></i></a></Link>
                    </div>
                </div>
                </div>
              
            </div>
            </React.Fragment>
        );
    }
}

export default CourseSidebar;