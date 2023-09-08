import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BurgerMenus from './BurgerMenus';
import ShopingCart from './ShopingCart';

const HeaderAdmin = () => {



   const router = useRouter()
   const [path, setPath] = useState("")
   useEffect(() => {
      setPath(router.pathname)
   }, [router])

   // Sticky Menu Area start
   useEffect(() => {
      window.addEventListener('scroll', sticky);
      return () => {
         window.removeEventListener('scroll', sticky);
      };
   });

   const sticky = (e) => {
      const header = document.querySelector('.header__area');
      const scrollTop = window.scrollY;
      scrollTop >= 1 ? header.classList.add('sticky') : header.classList.remove('sticky');
   };
   // Sticky Menu Area End

   return (
      <React.Fragment>
         <Head>
            <title>Learn for care</title>
            <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            <link rel="icon" href="assets/img/favicon.png" type="image/<generated>" sizes="<generated>"/>
         </Head>
         <header>
            <div id="header-sticky" className="header__area header__transparent header__padding">
               <div className="container-fluid">
                  <div className="row align-items-center">
                     <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-2 col-sm-4 col-6">
                        <div className="header__left d-flex ">
                           <div className="logo">
                              <Link href="">
                                 <a><img className='w-100 mt-5 ml-5' src="assets/img/logo/logo7.png" alt="logo" /></a>
                              </Link>
                           </div>
                           <div className="header__category d-none d-lg-block">
                              <nav>
                                 <ul>
                                    <li>
                                       {/* <Link href="/course-grid"><a className="cat-menu d-flex align-items-center">
                                          <div className="cat-dot-icon d-inline-block">
                                             <svg  viewBox="0 0 276.2 276.2">
                                                <g>
                                                   <g>
                                                      <path className="cat-dot" d="M33.1,2.5C15.3,2.5,0.9,17,0.9,34.8s14.5,32.3,32.3,32.3s32.3-14.5,32.3-32.3S51,2.5,33.1,2.5z" />
                                                      <path className="cat-dot" d="M137.7,2.5c-17.8,0-32.3,14.5-32.3,32.3s14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3S155.5,2.5,137.7,2.5    z" />
                                                      <path className="cat-dot" d="M243.9,67.1c17.8,0,32.3-14.5,32.3-32.3S261.7,2.5,243.9,2.5S211.6,17,211.6,34.8S226.1,67.1,243.9,67.1z" />
                                                      <path className="cat-dot" d="M32.3,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3S0,120.4,0,138.2S14.5,170.5,32.3,170.5z" />
                                                      <path className="cat-dot" d="M136.8,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3c-17.8,0-32.3,14.5-32.3,32.3    C104.5,156.1,119,170.5,136.8,170.5z" />
                                                      <path className="cat-dot" d="M243,170.5c17.8,0,32.3-14.5,32.3-32.3c0-17.8-14.5-32.3-32.3-32.3s-32.3,14.5-32.3,32.3    C210.7,156.1,225.2,170.5,243,170.5z" />
                                                      <path className="cat-dot" d="M33,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3s32.3-14.5,32.3-32.3S50.8,209.1,33,209.1z    " />
                                                      <path className="cat-dot" d="M137.6,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3    S155.4,209.1,137.6,209.1z" />
                                                      <path className="cat-dot" d="M243.8,209.1c-17.8,0-32.3,14.5-32.3,32.3c0,17.8,14.5,32.3,32.3,32.3c17.8,0,32.3-14.5,32.3-32.3    S261.6,209.1,243.8,209.1z" />
                                                   </g>
                                                </g>
                                             </svg>
                                          </div>
                                          <span>Category</span>
                                       </a>
                                       </Link> */}
                                       <ul className="cat-submenu">
                                          <li><Link href="/course-grid"><a>English Learning</a></Link></li>
                                          <li><Link href="/course-grid"><a>Web Development</a></Link></li>
                                          <li><Link href="/course-grid"><a>Logo Design</a></Link></li>
                                          <li><Link href="/course-grid"><a>Motion Graphics</a></Link></li>
                                          <li><Link href="/course-grid"><a>Video Edition</a></Link></li>
                                       </ul>
                                    </li>
                                 </ul>
                                 <ul>
                                    <li><h2 className=' mt-10 text-primary'>Admin</h2></li>
                                 </ul>
                              </nav>
                           </div>
                        </div>
                     </div>
                    
                  </div>
               </div>
            </div>
          

         </header>
      </React.Fragment>
   );
}

export default HeaderAdmin;