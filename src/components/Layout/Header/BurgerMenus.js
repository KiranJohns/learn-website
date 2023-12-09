import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';

const BurgerMenus = ({setMenuOpen, menuOpen}) => {

      const [home, setHome] = useState(false)
      const [courses, setcourses] = useState(false)
      const [blog, setBlog] = useState(false)
      const [pages, setPages] = useState(false)
      const [bundles, setbundles] = useState(false)
      const [dashboard, setDashboard] = useState(false)

      const router = useRouter()
      const [path, setPath] = useState("")
      useEffect(() => {
        setPath(router.pathname)
      }, [router])

      const openMobileMenu = menu => {
        
        if( menu == 'home'){
          setHome(!home)
          setcourses(false)
          setBlog(false)
          setPages(false)
          setbundles(false)
          setDashboard(false)
        }
        else if( menu == 'courses'){
          setHome(false)
          setcourses(!courses)
          setBlog(false)
          setPages(false)
          setDashboard(false)
        }
        else if( menu == 'blog'){
          setHome(false)
          setcourses(false)
          setBlog(!blog)
          setPages(false)
          setDashboard(false)
        }
        else if( menu == 'pages'){
          setHome(false)
          setcourses(false)
          setBlog(false)
          setPages(!pages)
          setDashboard(false)
        }
        else if( menu == 'bundles'){
          setHome(false)
          setcourses(false)
          setBlog(false)
          setPages(false)
          setbundles(!bundles)
        }
        else if( menu == 'dashboard'){
          setHome(false)
          setcourses(false)
          setBlog(false)
          setPages(false)
          setDashboard(!bundles)
          setbundles(false)
        }

      }; 

      return (
      <div className={menuOpen ? "sidebar__area open": "sidebar__area"}>
        <div className="sidebar__wrapper">
          <div className="sidebar__close">
              <button className="sidebar__close-btn" id="sidebar__close-btn" onClick={() => setMenuOpen(false)}>
                <span><i className="fas fa-times"></i></span>
                <span>close</span>
              </button>
          </div>
          <div className="sidebar__content">
              <div className="logo mb-40">
                <Link href="/"><a><img className='w-75 mt-5 ml-5' src="/assets/img/logo/logo7.png" alt="logo"/></a></Link>
              </div>
              <div className="sidebar__search p-relative mt-40 ">
                <form action="#">
                    <input type="text" placeholder="Search..."/>
                    <button type="submit"><i className="fas fa-search"></i></button>
                </form>
              </div>
              <div className="mm-menu">
                <ul>
                  <li className={home }>
                    <a href='/' onClick={() => { openMobileMenu('home'); }}>Home</a>
                    {/* <ul className={home ? "sub-menu active" : "sub-menu"}>
                      <li><Link href="/"><a>Home 1</a></Link></li>
                      <li><Link href="/home-2"><a>Home 2</a></Link></li>
                      <li><Link href="/home-3"><a>Home 3</a></Link></li>
                    </ul> */}
                  </li>
                  <li style={{backgroundColor:'#fff'}} className={courses ? "has-droupdown active" : "has-droupdown"}>
                    <a  onClick={() => { openMobileMenu('courses'); }}>Courses</a>
                    <ul style={{backgroundColor:'#fff'}} className={courses ? "sub-menu active" : "sub-menu"}>
                      <li ><Link  href="/course-all"><a>All Courses</a></Link></li>
                       <li><Link  href="/course-grid"><a>Care Certificate Courses</a></Link></li>
                      <li><Link href="/course-mandatory"><a>Mandatory Care Courses</a></Link></li>
                      <li><Link href="/course-specialised"><a>Specialised Care Courses</a></Link></li>
                      <li><Link href="/course-recovery"><a>Recovery Care Courses</a></Link></li>
                      <li><Link href="/course-child"><a>Child Care Courses</a></Link></li>
                    </ul>
                  </li>

                  <li style={{backgroundColor:'#fff'}} className={bundles ? "has-droupdown active" : "has-droupdown"}>
                    <a  onClick={() => { openMobileMenu('bundles'); }}>Bundles</a>
                    <ul style={{backgroundColor:'#fff'}} className={bundles? "sub-menu active" : "sub-menu"}>
                      <li ><Link  href="/bundle/bundle-all"><a>All Bundles</a></Link></li>
                       <li><Link  href="/bundle/care-bundle"><a>Course Bundles</a></Link></li>
                      <li><Link href="/bundle/mandatory-bundle"><a>Mandatory Care Bundle</a></Link></li>
                      <li><Link href="/bundle/special-bundle"><a>Specialised Care Bundle</a></Link></li>
                      <li><Link href="/bundle/recovery-bundle"><a>Recovery Care Bundle</a></Link></li>
                      <li><Link href="/bundle/child-bundle"><a>Child Care Bundle</a></Link></li>
                      <li><Link href="/bundle/recovery-bundle"><a>Online Care Bundle</a></Link></li>
                    </ul>
                  </li>

                  <li><Link href="/blog"><a>Blog</a></Link></li>
                {/* <li><Link href="/contact"><a>Contact</a></Link></li> */}
                <li><Link href="/sign-in"><a>Sign in</a></Link></li>
                <li><Link href="/sign-up"><a>Sign Up</a></Link></li>
                
                <li style={{backgroundColor:'#fff'}} className={dashboard ? "has-droupdown active" : "has-droupdown"}>
                    <a  onClick={() => { openMobileMenu('dashboard'); }}>Dashboard</a>
                    <ul className={dashboard ? "sub-menu active" : "sub-menu"}>
                      <li style={{backgroundColor:'#fff'}}><Link href="/dashboard" as="/"><a>Profile</a></Link></li>
                      <li style={{backgroundColor:'#fff'}}><Link href="/blog" as="/"><a>Logout</a></Link></li>
                    
                    </ul>
                  </li>
              </ul>
            </div>

          
              {/* <div className="sidebar__cart mt-30">
                <a href="#">
                    <div className="header__cart-icon">
                      <svg viewBox="0 0 24 24">
                          <circle className="st0" cx="9" cy="21" r="1"/>
                          <circle className="st0" cx="20" cy="21" r="1"/>
                          <path className="st0" d="M1,1h4l2.7,13.4c0.2,1,1,1.6,2,1.6h9.7c1,0,1.8-0.7,2-1.6L23,6H6"/>
                      </svg>
                    </div>
                    <span className="cart-item">2</span>
                </a>
              </div> */}
          </div>
        </div>
      </div>
          
    )
}

export default BurgerMenus;



   {/* <li className={pages ? "has-droupdown active" : "has-droupdown"}>
                    <a onClick={() => { openMobileMenu('pages'); }}>Pages</a>
                    <ul className={pages ? "sub-menu active" : "sub-menu"}>
                      <li><Link href="/about"><a>About</a></Link></li>
                      <li><Link href="/instructor"><a>Instructor</a></Link></li>
                      <li><Link href="/instructor-details"><a>Instructor Details</a></Link></li>
                      <li><Link href="/event-details"><a>Event Details</a></Link></li>
                      <li><Link href="/cart"><a>My Cart</a></Link></li>
                      <li><Link href="/wishlist"><a>My Wishlist</a></Link></li>
                      <li><Link href="/checkout"><a>Checkout</a></Link></li>
                      <li><Link href="/sign-in"><a>Sign In</a></Link></li>
                      <li><Link href="/sign-up"><a>Sign Up</a></Link></li>
                      <li><Link href="/error"><a>Error</a></Link></li>
                  </ul>
                </li> */}