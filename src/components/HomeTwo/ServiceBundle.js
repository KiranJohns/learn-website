import React, { Component } from 'react';
import Link from 'next/link';
import { BsStack} from "react-icons/bs";
import { GoStack } from "react-icons/go";

class ServiceBundle extends Component {

    render() {

        return (
        <section className="services__area pt-70 pb-55">
            <div className="container">
               <div className="row">
                  <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3">
                     <div className="section__title-wrapper section-padding mb-60 text-center">
                        <h2 className="section__title">Course <span className="yellow-bg">bundles<img src="assets/img/shape/yellow-bg-2.png" alt="img not found" /></span> from Learn for Care</h2>
                        {/* <p>You don't have to struggle alone, you've got our assistance and help.</p> */}
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6" style={{cursor:"pointer"}}>
                  <Link href="/bundle/bundle-Online">
                     <div className="services__item mb-30"  style={{background:'#212a50'}}>
                        <div className="services__icon">
                        <GoStack/>
                        </div>
                        <div className="services__content">
                           <h3 className="services__title"><a>Online Care Bundle Package</a></h3>
                           {/* <p>Arhje over  morish wind up gormless buttlyl.!</p> */}

                           {/* <Link href="/about"><a className="link-btn-2">
                              <i className="fas fa-arrow-right"></i>
                              <i className="fas fa-arrow-right"></i>
                           </a></Link> */}
                        </div>
                     </div>
                    </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6" style={{cursor:"pointer"}}>
                  <Link href="/bundle/mandatory-bundle">
                     <div className="services__item  mb-30" style={{background:'#e04c4c'}}>
                        <div className="services__icon">
                        <GoStack/>
                        </div>
                        <div className="services__content">
                           <h3 className="services__title"><a>Mandatory Care Bundle<br /></a></h3>
                           {/* <p>Arhje over  morish wind up gormless buttlyl.!</p> */}

                           {/* <Link href="/about"><a className="link-btn-2">
                              <i className="fas fa-arrow-right"></i>
                              <i className="fas fa-arrow-right"></i>
                           </a></Link> */}
                        </div>
                     </div>
                     </Link>
                  </div>

                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6" style={{cursor:"pointer"}}>
                  <Link href="/bundle/special-bundle">
                     <div className="services__item  mb-30" style={{background:'#e05fa6'}}>
                        <div className="services__icon">
                        <GoStack/>
                        </div>
                        <div className="services__content">
                           <h3 className="services__title"><a>Specialised Care Bundle</a></h3>
                           {/* <p>Arhje over  morish wind up gormless buttlyl.!</p> */}

                           {/* <Link href="/about"><a className="link-btn-2">
                              <i className="fas fa-arrow-right"></i>
                              <i className="fas fa-arrow-right"></i>
                           </a></Link> */}
                        </div>
                     </div>
                     </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6" style={{cursor:"pointer"}}>
                  <Link href="/bundle/recovery-bundle">
                     <div className="services__item mb-30"  style={{background:'#5a9676'}}>
                        <div className="services__icon">
                        <GoStack/>
                        </div>
                        <div className="services__content">
                           <h3 className="services__title"><a>Recovery Care Bundle</a></h3>
                           {/* <p>Arhje over  morish wind up gormless buttlyl.!</p> */}

                           {/* <Link href="/about"><a className="link-btn-2">
                              <i className="fas fa-arrow-right"></i>
                              <i className="fas fa-arrow-right"></i>
                           </a></Link> */}
                        </div>
                     </div>
                     </Link>
                  </div>
               </div>
               <div className="d-flex justify-content-center mt-2">
            <div className="btn btn-primary">
              <Link href="/bundle/bundle-all">View More</Link>
            </div>
          </div>
            </div>
         </section>
        );
    }
}

export default ServiceBundle;