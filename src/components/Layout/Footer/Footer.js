import React from 'react';
import FooterBottom from './FooterBottom';
import Link from 'next/link';
import {FaXTwitter, FaLinkedinIn, FaFacebookF} from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone} from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {

    return (
        <footer>
            <div className="footer__area grey-bg-2">
               <div className="footer__top pt-190 pb-40">
                  <div className="container">
                     <div className="row">
                        
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-7 col-sm-7 col-xs-8">
                           <div className="footer__widget mb-50">
                              <div className="footer__widget-head mb-22">
                                 <div className="footer__logo">
                                    <Link href="/"><a><img className='w-75' src="/assets/img/logo/logo7.png" alt="img not found"/></a></Link>
                                 </div>
                              </div>
                              <div className="footer__widget-body footer__widget-body-2">
                                 <p>Enriching lives with unwavering dedication to care services.</p>

                                 <div className="footer__social">
                                    <ul>
                                       <li ><a href="#"><FaFacebookF style={{fontSize:"1.5rem"}}/></a></li>
                                       <li><a href="#" className="tw"><FaXTwitter style={{fontSize:"1.5rem"}}/></a></li>
                                       <li><a href="#" className="pin"><BsInstagram style={{fontSize:"1.5rem"}}/></a></li>
                                       <li><a href="#" className="lin1"><FaLinkedinIn style={{fontSize:"1.5rem"}}/></a></li>
                           {/* <FontAwesomeIcon icon="fab fa-instagram" /> */}
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                      
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6">
                           <div className="footer__widget mb-50">
                              <div className="footer__widget-head mb-22">
                                 <h3 className="footer__widget-title footer__widget-title-2">Links</h3>
                              </div>
                              <div className="footer__widget-body">
                                 <div className="footer__link footer__link-2">
                                    <ul>
                                       <li><Link href="/about"><a>About Us</a></Link></li>
                                       <li><Link href="/course-all"><a>Courses</a></Link></li>
                                       
                                       <li><Link href="/"><a>How it Works</a></Link></li>
                                       <li><Link href="/blog"><a>Blog</a></Link></li>
                                       <li><Link href="/bundle/bundle-all"><a>Bundles</a></Link></li>
                                      
                                       <li><Link href="/contact"><a>Contact Us</a></Link></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6 col-xs-6">
                           <div className="footer__widget mb-50">
                              <div className="footer__widget-head mb-22">
                                 <h3 style={{visibility:"hidden"}} className="footer__widget-title footer__widget-title-2">External Links</h3>
                              </div>
                              <div className="footer__widget-body">
                                 <div className="footer__link footer__link-2">
                                    <ul>
                                       <li><Link href="/privacy"><a>Privacy</a></Link></li>
                                       <li><Link href="/cookies"><a>Cookies</a></Link></li>                                
                                       <li><Link href="/conditions"><a>Terms & Conditions</a></Link></li>
                                       <li><Link href="/faq"><a>FAQ</a></Link></li>
                                       <li><Link href="/sign-in"><a>Sign In</a></Link></li>
                                       <li><Link href="/sign-up"><a>Sign Up</a></Link></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>

                        
                        
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
                           <div className="footer__widget mb-50">
                              <div className="footer__widget-head mb-22">
                                 <h3 className="footer__widget-title footer__widget-title-2">Contact</h3>
                              </div>
                              <div className="footer__widget-body">
                                 <div className="footer__link footer__link-2">
                                    <ul>
                                       {/* <li><Link href="/instructor"><a>Browse Library</a></Link></li>
                                       <li><Link href="/instructor"><a>Library</a></Link></li>
                                       <li><Link href="/instructor"><a>Partners</a></Link></li>
                                       <li><Link href="/blog"><a>News & Blogs</a></Link></li>
                                       <li><Link href="/about"><a>FAQs</a></Link></li> */}
                                       <li><IoLocationOutline style={{marginBottom:'.2rem',margin:"4px 0px"}}/> Suite 14, Neals Corner, 2 bath road, <IoLocationOutline className='footer-hidden-icon'/> Hounslow TW3 3HJ</li>
                                       <li><BsTelephone/> +44-2031483007</li>
                                       <li><Link href="mailto:info@learnforcare.co.uk"><a><AiOutlineMail/> <span style={{visibility:'hidden'}}>''</span>support@learnforcare.co.uk</a></Link></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-5 col-sm-6">
                           <div className="footer__widget footer__pl-70 mb-50">
                              <div className="footer__widget-head mb-22">
                                 <h3 className="footer__widget-title">Subscribe</h3>
                              </div>
                              <div className="footer__widget-body">
                                 <div className="footer__subscribe">
                                    <form action="#">
                                       <div className="footer__subscribe-input mb-15">
                                          <input type="email" placeholder="Your email address"/>
                                          <button type="submit">
                                             <i className="fas fa-arrow-right"></i>
                                             <i className="fas fa-arrow-right"></i>
                                          </button>
                                       </div>
                                    </form>
                                    <p>Get the latest news and updates right at your inbox.</p>
                                 </div>
                              </div>
                           </div>
                        </div> */}
                     </div>
                  </div>
               </div>
               <FooterBottom />
            </div>
         </footer>
    );
}

export default Footer;