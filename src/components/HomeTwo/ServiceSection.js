import React, { Component } from 'react';
import Link from 'next/link';

class Service extends Component {

    render() {

        return (
        <section className="services__area pt-115 pb-40">
            <div className="container">
               <div className="row">
                  <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3">
                     <div className="section__title-wrapper section-padding mb-60 text-center">
                        <h2 className="section__title">Why  <span className="yellow-bg">choose <img src="assets/img/shape/yellow-bg-2.png" alt="img not found" /></span> Learn for Care</h2>
                        {/* <p>You don't have to struggle alone, you've got our assistance and help.</p> */}
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <div className="services__item blue-bg-4 mb-30">
                        <div className="services__icon">
                           <svg viewBox="0 0 24 24"><path d="m16 10c-1.431 0-2.861-.424-4.283-1.271-.442-.264-.717-.756-.717-1.286v-2.943c0-.276.224-.5.5-.5s.5.224.5.5v2.943c0 .176.09.343.229.426 2.538 1.514 5.004 1.514 7.541 0 .14-.083.23-.25.23-.426v-2.943c0-.276.224-.5.5-.5s.5.224.5.5v2.943c0 .529-.275 1.021-.718 1.285-1.421.848-2.851 1.272-4.282 1.272z"/><path d="m16 7c-.071 0-.143-.016-.209-.046l-6.5-3c-.178-.082-.291-.259-.291-.454s.113-.372.291-.454l6.5-3c.133-.061.286-.061.419 0l6.5 3c.177.082.29.259.29.454s-.113.372-.291.454l-6.5 3c-.066.03-.138.046-.209.046zm-5.307-3.5 5.307 2.449 5.307-2.449-5.307-2.449z"/><path d="m1.5 18c-.276 0-.5-.224-.5-.5v-15c0-1.379 1.122-2.5 2.5-2.5h6c.276 0 .5.224.5.5s-.224.5-.5.5h-6c-.827 0-1.5.673-1.5 1.5v15c0 .276-.224.5-.5.5z"/><path d="m7.5 20h-4c-1.378 0-2.5-1.121-2.5-2.5s1.122-2.5 2.5-2.5h14.5v-2.5c0-.276.224-.5.5-.5s.5.224.5.5v3c0 .276-.224.5-.5.5h-15c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5h4c.276 0 .5.224.5.5s-.224.5-.5.5z"/><path d="m18.5 20h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5.5v-3.5c0-.276.224-.5.5-.5s.5.224.5.5v4c0 .276-.224.5-.5.5z"/><path d="m12.5 24c-.111 0-.222-.037-.313-.109l-2.187-1.75-2.188 1.75c-.15.12-.355.143-.529.06-.173-.084-.283-.259-.283-.451v-6c0-.276.224-.5.5-.5s.5.224.5.5v4.96l1.688-1.351c.183-.146.442-.146.625 0l1.687 1.351v-4.96c0-.276.224-.5.5-.5s.5.224.5.5v6c0 .192-.11.367-.283.45-.069.033-.143.05-.217.05z"/><path d="m14.5 18h-9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5z"/></svg>
                        </div>
                        <div className="services__content">
                           <h3 className="services__title"><Link href="/course-grid"><a>100+ <br /> Online courses</a></Link></h3>
                           {/* <p>Arhje over  morish wind up gormless buttlyl.!</p> */}

                           {/* <Link href="/about"><a className="link-btn-2">
                              <i className="fas fa-arrow-right"></i>
                              <i className="fas fa-arrow-right"></i>
                           </a></Link> */}
                        </div>
                     </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <div className="services__item pink-bg mb-30">
                        <div className="services__icon">
                           <svg viewBox="0 0 512 512">
                              <path className="st0" d="M288,512c-76.5,0-138.7-62.2-138.7-138.7v-64c0-5.9,4.8-10.7,10.7-10.7h256c5.9,0,10.7,4.8,10.7,10.7v64  C426.7,449.8,364.5,512,288,512z M170.7,320v53.3c0,64.7,52.7,117.3,117.3,117.3S405.3,438,405.3,373.3V320H170.7z"/>
                              <path className="st0" d="M458.7,426.7h-44.8c-5.9,0-10.7-4.8-10.7-10.7c0-5.9,4.8-10.7,10.7-10.7h44.8c8.6,0,16.6-3.3,22.4-9.4  c6.2-6.1,9.6-14,9.6-22.6c0-17.6-14.4-32-32-32h-37.3c-5.9,0-10.7-4.8-10.7-10.7s4.8-10.7,10.7-10.7h37.3  c29.4,0,53.3,23.9,53.3,53.3c0,14.4-5.6,27.8-15.8,37.7C486.5,421.1,473.1,426.7,458.7,426.7L458.7,426.7z"/>
                              <path className="st0" d="M236.6,256c-3.3,0-6.6-1.5-8.6-4.4c-3.5-4.8-2.4-11.4,2.4-14.9c6.7-4.9,10.1-10.9,9.6-17.1  c-0.6-7-6.2-13.6-15.2-18c-16-7.7-25.9-20.6-27.2-35.3c-1.2-13.8,5.5-27,18.3-36.3c4.8-3.5,11.4-2.4,14.9,2.4  c3.5,4.8,2.4,11.4-2.4,14.9c-6.7,4.9-10.1,10.9-9.6,17.1c0.6,7,6.2,13.6,15.2,18c16,7.7,25.9,20.6,27.2,35.3  c1.2,13.8-5.5,27-18.3,36.3C241,255.3,238.8,256,236.6,256L236.6,256z"/>
                              <path className="st0" d="M338,256c-3.3,0-6.6-1.5-8.6-4.4c-3.5-4.8-2.4-11.4,2.4-14.9c6.7-4.9,10.1-10.9,9.6-17.1  c-0.6-7-6.2-13.6-15.2-18c-16-7.7-25.9-20.6-27.2-35.3c-1.2-13.8,5.5-27,18.3-36.3c4.8-3.5,11.4-2.4,14.9,2.4  c3.5,4.8,2.4,11.4-2.4,14.9c-6.7,4.9-10.1,10.9-9.6,17.1c0.6,7,6.2,13.6,15.2,18c16,7.7,25.9,20.6,27.2,35.3  c1.2,13.8-5.5,27-18.3,36.3C342.3,255.3,340.1,256,338,256z"/>
                              <path className="st0" d="M426.7,512H149.3c-5.9,0-10.7-4.8-10.7-10.7s4.8-10.7,10.7-10.7h277.3c5.9,0,10.7,4.8,10.7,10.7  S432.6,512,426.7,512z"/>
                              <path className="st0" d="M32,442.1c-7.2,0-14.2-2.4-20-7c-7.6-6.1-12-15.3-12-25V66.3c0-12,6.9-23.2,17.6-28.5  c101.9-51.3,178-51.1,238.4,1.1c60.4-52.2,136.5-52.4,238.4-1.1c10.7,5.3,17.6,16.5,17.6,28.5v200.3c0,5.9-4.8,10.7-10.7,10.7  s-10.7-4.8-10.7-10.7V66.3c0-4-2.3-7.7-5.8-9.4c-97-48.9-167.3-47.6-221.5,4.1c-4.1,3.9-10.6,3.9-14.7,0  c-54.2-51.7-124.5-53-221.5-4.2c-3.6,1.8-5.8,5.5-5.8,9.5V410c0,3.3,1.5,6.4,4,8.4c1.5,1.2,4.7,3,9,2.1c25.7-6,46.7-9.8,65.9-12.1  c5.5-0.7,11.1,3.5,11.9,9.3c0.7,5.8-3.5,11.2-9.3,11.9c-18.4,2.2-38.6,6-63.7,11.8C36.7,441.9,34.3,442.1,32,442.1L32,442.1z"/>
                              <path className="st0" d="M256,106.7c-5.9,0-10.7-4.8-10.7-10.7V53.3c0-5.9,4.8-10.7,10.7-10.7s10.7,4.8,10.7,10.7V96  C266.7,101.9,261.9,106.7,256,106.7z"/>
                              </svg>
                        </div>
                        <div className="services__content">
                           <h3 className="services__title"><Link href="/course-grid"><a>Learn at your own pace<br /></a></Link></h3>
                           {/* <p>Arhje over  morish wind up gormless buttlyl.!</p> */}

                           {/* <Link href="/about"><a className="link-btn-2">
                              <i className="fas fa-arrow-right"></i>
                              <i className="fas fa-arrow-right"></i>
                           </a></Link> */}
                        </div>
                     </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <div className="services__item purple-bg mb-30">
                        <div className="services__icon">
                           <svg viewBox="0 0 24 24">
                              <g>
                                 <path d="m23.5 10c-.1 0-.2 0-.3-.1l-2.5-1.7c-.2-.1-.5-.2-.8-.2h-6.4c-.8 0-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5h9c.8 0 1.5.7 1.5 1.5v8c0 .2-.1.4-.3.4 0 .1-.1.1-.2.1zm-10-9c-.3 0-.5.2-.5.5v5c0 .3.2.5.5.5h6.4c.5 0 1 .1 1.4.4l1.7 1.2v-7.1c0-.3-.2-.5-.5-.5z"/>
                              </g>
                              <g>
                                 <path d="m.5 12c-.1 0-.2 0-.2-.1-.2 0-.3-.2-.3-.4v-8c0-.8.7-1.5 1.5-1.5h8c.3 0 .5.2.5.5s-.2.5-.5.5h-8c-.3 0-.5.2-.5.5v7.1l1.7-1.1c.4-.3.9-.5 1.4-.5h8.4c.3 0 .5.2.5.5s-.2.5-.5.5h-8.4c-.3 0-.6.1-.8.3l-2.5 1.7c-.1 0-.2 0-.3 0z"/></g><g><path d="m5.5 18c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></g><g><path d="m10.5 24c-.3 0-.5-.2-.5-.5v-2c0-.8-.7-1.5-1.5-1.5h-6c-.8 0-1.5.7-1.5 1.5v2c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-2c0-1.4 1.1-2.5 2.5-2.5h6c1.4 0 2.5 1.1 2.5 2.5v2c0 .3-.2.5-.5.5z"/></g><g><path d="m18.5 18c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm0-5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></g><g><path d="m23.5 24c-.3 0-.5-.2-.5-.5v-2c0-.8-.7-1.5-1.5-1.5h-6c-.8 0-1.5.7-1.5 1.5v2c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-2c0-1.4 1.1-2.5 2.5-2.5h6c1.4 0 2.5 1.1 2.5 2.5v2c0 .3-.2.5-.5.5z"/></g></svg>
                        </div>
                        <div className="services__content">
                           <h3 className="services__title"><Link href="/course-grid"><a>Easy<br /> to monitor</a></Link></h3>
                           {/* <p>Arhje over  morish wind up gormless buttlyl.!</p> */}

                           {/* <Link href="/about"><a className="link-btn-2">
                              <i className="fas fa-arrow-right"></i>
                              <i className="fas fa-arrow-right"></i>
                           </a></Link> */}
                        </div>
                     </div>
                  </div>
                  <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                     <div className="services__item green-bg mb-30">
                        <div className="services__icon">
                           <svg viewBox="0 0 512 512">
                              <path className="st0" d="M256,512c-1.6,0-3.1-0.3-4.6-1c-53.3-25.3-120.8-27.2-212.3-5.7c-9.6,2.1-19.5-0.1-27.1-6.3  c-7.6-6.1-12-15.3-12-25V130.3c0-12,6.9-23.2,17.6-28.5c45.1-22.8,84.5-35.1,120.5-37.6c5.7-0.3,11,4,11.4,9.9  c0.4,5.9-4,11-9.9,11.4c-33.1,2.3-69.9,13.9-112.4,35.4c-3.6,1.8-5.9,5.5-5.9,9.5V474c0,3.3,1.5,6.4,4,8.4c1.5,1.2,4.7,3.1,9,2.1  c93.8-22.1,164.5-20.5,221.6,5.1c57.1-25.5,127.8-27.1,221.8-5c4.4,0.9,7.4-0.9,8.9-2.1c2.6-2,4-5.1,4-8.4V130.3  c0-4-2.3-7.7-5.8-9.4c-47-23.7-87-35.4-122.5-35.8c-5.9-0.1-10.6-4.9-10.6-10.8c0.1-5.8,4.8-10.6,10.7-10.6h0.1  c38.8,0.4,81.9,12.9,131.9,38.1c10.6,5.3,17.6,16.5,17.6,28.5V474c0,9.8-4.4,18.9-12,25c-7.6,6.1-17.5,8.3-27,6.3  c-91.6-21.5-159.1-19.8-212.4,5.6C259.1,511.7,257.6,512,256,512L256,512z"/>
                              <path className="st0" d="M256,506.7c-5.9,0-10.7-4.8-10.7-10.7V266.7c0-5.9,4.8-10.7,10.7-10.7s10.7,4.8,10.7,10.7V496  C266.7,501.9,261.9,506.7,256,506.7z"/>
                              <path className="st0" d="M96,341.3c-1,0-2.1-0.1-3.2-0.5c-5.6-1.8-8.8-7.7-7-13.4C134.1,172.8,193.5,67.4,267.5,5.3  c6.1-5.1,14.4-6.6,21.6-4.1c7,2.5,12.1,8.4,13.6,15.9c9.9,50.6,8.2,93.7-5.2,128.2c-1.1,2.9-3.4,5.2-6.4,6.2c-2.9,1-6.2,0.8-8.9-0.8  l-26.3-15v61.4c0,3.3-1.6,6.5-4.3,8.5c-28.2,21.1-66.3,33.5-113.3,36.6c-11.2,28.3-22,58.8-32.2,91.6  C104.7,338.4,100.5,341.3,96,341.3L96,341.3z M281.8,21.3c-51.7,43.3-96,108.8-134.3,198.8c35.6-3.6,64.9-13.2,87.2-28.5v-74.3  c0-3.8,2-7.3,5.3-9.2c3.2-1.9,7.3-1.9,10.6,0l31,17.7C289.7,97,289.8,62,281.8,21.3L281.8,21.3z"/>
                              </svg>
                        </div>
                        <div className="services__content">
                           <h3 className="services__title"><Link href="/course-grid"><a>Certificated <br />  courses</a></Link></h3>
                           {/* <p>Arhje over  morish wind up gormless buttlyl.!</p> */}

                           {/* <Link href="/about"><a className="link-btn-2">
                              <i className="fas fa-arrow-right"></i>
                              <i className="fas fa-arrow-right"></i>
                           </a></Link> */}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
        );
    }
}

export default Service;