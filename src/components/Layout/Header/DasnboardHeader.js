import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import BurgerMenus from "./BurgerMenus";
import ShopingCart from "./ShopingCart";
import { useSelector } from "react-redux";
import NoSSR from "react-no-ssr";
import NoSSRWrapper from "../../noSSR";
import Dropdown from "react-bootstrap/Dropdown";
import BurgerDash from "./BurgerDash";

import allProduct from "../../../../sampleProduct.json";
import fetchData, { getUserType } from "../../../axios";
import store from "../../../redux/store";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const DashHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  // const [paths, setPaths] = useState([
  //   "/company/dashboard",
  //   "/company/myprofile",
  //   "/company/MyCourses",
  //   "/company/certificates",
  //   "/company/availablecourses",
  //   "/company/createuser",
  //   "/company/showuser",
  //   "/company/archive",
  //   "/company/archive",
  // ]);

  const router = useRouter();
  const [path, setPath] = useState("");
  const { cart, cartCount } = useSelector((store) => store.cart);
  const [searchProduct, setSearchProduct] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [course, setCourse] = useState([]);
  let logedIn = null;
  if (typeof window == "object") {
    logedIn = localStorage.getItem("learnforcare_access");
  }
  const makeRequest = fetchData();

  const handleLogout = () => {
    localStorage.removeItem(`learnforcare_access`);
    localStorage.removeItem(`learnforcare_refresh`);
    localStorage.removeItem("userType");
    location.pathname = "/sign-in";
  };

  useEffect(() => {
    setPath(router.pathname);
  }, [router]);

  useEffect(() => {
    if (localStorage.getItem("learnfrocarecart")) {
      let courseCart = [];
      let bundlesCart = [];
      let localCart =
        JSON.parse(localStorage.getItem("learnfrocarecart")) || [];
      console.log(localCart);
      if (localCart) {
        localCart?.forEach((item) => {
          if (item.item_type == "course") {
            courseCart.push({ count: item.product_count, id: item.id });
          } else {
            bundlesCart.push({ count: item.product_count, id: item.id });
          }
        });

        console.log(courseCart, bundlesCart);

        const courseData = new FormData();
        courseData.append("course", JSON.stringify(courseCart));
        let courseResponse = makeRequest("POST", "/cart/add", courseData);

        const bundleData = new FormData();
        bundleData.append("course", JSON.stringify(bundlesCart));
        let bundleResponse = makeRequest(
          "POST",
          "/cart/add-bundle",
          bundleData
        );
        Promise.all([courseResponse, bundleResponse])
          .then((res) => {
            getCartItem();
            localStorage.removeItem("learnfrocarecart");
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  function getCartItem() {
    const makeRequest = fetchData();
    makeRequest("GET", "/cart/get")
      .then((res) => {
        store.dispatch({
          type: "SET_CART",
          payload: JSON.stringify(res.data.response),
        });
      })
      .catch((err) => {
        if (err?.data?.errors[0].message === "please login") {
          // if (paths.includes(location.pathname)) {
          //   location.pathname = "/sign-in";
          // }
          store.dispatch({
            type: "SET_CART",
          });
        }
        console.log(err);
      });
  }
  useEffect(() => {
    getCartItem();
    getAllCourse();
  }, []);

  function getAllCourse() {
    makeRequest("GET", "/course/get-all-course")
      .then((res) => {
        setCourse(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSearch(e) {
    e.persist();
    setSearchString(() => e.target?.value);
    setSearchProduct(() =>
      course.filter((item) =>
        item?.name?.toLowerCase()?.startsWith(e.target?.value?.toLowerCase())
      )
    );
  }
  // Sticky Menu Area start
  // useEffect(() => {
  //   window.addEventListener("scroll", sticky);
  //   return () => {
  //     window.removeEventListener("scroll", sticky);
  //   };
  // });

  const sticky = (e) => {
    const header = document.querySelector(".header__area");
    const scrollTop = window.scrollY;
    scrollTop >= 1
      ? header.classList.add("sticky")
      : header.classList.remove("sticky");
  };
  // Sticky Menu Area End

  return (
    <NoSSR>
      <React.Fragment>
        <Head>
          <title>Learn for care</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            href="/assets/img/favicon.png"
            type="image/<generated>"
            sizes="<generated>"
          />
               <script async src="https://www.googletagmanager.com/gtag/js?id=G-TQH488CVJ5"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TQH488CVJ5');
          `,
        }}
      />
        </Head>
        <header>
          <div
            id="header-sticky"
            className="header__area header__transparent header__padding"
          >
             {/* <div style={{position:"relative"}}>  <div style={{position:'absolute'}} className="header-back-button"><button onClick={() => history.back()}> <FaArrowAltCircleLeft className="back-fontsize"  style={{color:"#0d6efd", }}/></button></div></div> */}
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-2 col-sm-4 col-6">
                  <div className="header__left d-flex">
                    <div className="logo ">
                      <Link href="/">
                        <a>
                          <img
                            className="w-75 mt-5 ml-5"
                            src="/assets/img/logo/logo7.png"
                            alt="logo"
                          />
                        </a>
                      </Link>
                    </div>
                    <div className="header__category d-none ">
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
                            {/* <ul className="cat-submenu">
                                          <li><Link href="/course-grid"><a>English Learning</a></Link></li>
                                          <li><Link href="/course-grid"><a>Web Development</a></Link></li>
                                          <li><Link href="/course-grid"><a>Logo Design</a></Link></li>
                                          <li><Link href="/course-grid"><a>Motion Graphics</a></Link></li>
                                          <li><Link href="/course-grid"><a>Video Edition</a></Link></li>
                                       </ul> */}
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-9 col-xl-9 col-lg-8 col-md-10 col-sm-8 col-6">
                  <div className="header__right d-flex justify-content-end align-items-center">
                    <div className="main-menu d-none d-xl-block">
                      <nav id="mobile-menu">
                        <ul>
                          <li className="">
                            <Link href="/">
                              <a>Home</a>
                            </Link>
                            {/* <ul className="submenu">
                                          <li><Link href="/"><a>Home Style 1</a></Link></li>
                                          <li><Link href="/home-2"><a>Home Style 2</a></Link></li>
                                          <li><Link href="/home-3"><a>Home Style 3</a></Link></li>
                                       </ul> */}
                          </li>
                          <li className="has-dropdown ">
                            <Link href="/all-courses">
                              <a>Courses</a>
                            </Link>
                            <ul className="submenu">
                              <li>
                                <Link href="/care-certificate-courses">
                                  <a>Care Certificate Courses</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/mandatory-care-courses">
                                  <a>Mandatory Care Courses</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/specialised-care-courses">
                                  <a>Specialised Care Courses</a>
                                </Link>
                              </li>{" "}
                              <li>
                                <Link href="/recovery-care-courses">
                                  <a>Recovery Care Courses</a>
                                </Link>
                              </li>{" "}
                              <li>
                                <Link href="/child-care-courses">
                                  <a>Child Care Courses</a>
                                </Link>
                              </li>
                              {/* <li>
                              <Link href="/course-details">
                                <a>Courses Details</a>
                              </Link>
                            </li> */}
                            </ul>
                          </li>
                          <li className="has-dropdown">
                            <Link href="/bundle/all-bundles">
                              <a>Bundles</a>
                            </Link>
                            <ul className="submenu">
                              <li>
                                <Link href="/bundle/care-bundle">
                                  <a>Care Bundle</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/bundle/mandatory-care-bundle">
                                  <a>Mandatory Care Bundle</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/bundle/specialised-care-bundle">
                                  <a>Specialised Care Bundle</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/bundle/recovery-care-bundle">
                                  <a>Recovery Care Bundle</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/bundle/child-care-bundle">
                                  <a>Child Care Bundle</a>
                                </Link>
                              </li>
                              <li>
                                <Link href="/bundle/online-care-bundle">
                                  <a>Online Care Bundle</a>
                                </Link>
                              </li>
                            </ul>
                          </li>

                          <li className="">
                            <Link href="/blog">
                              <a>Blog</a>
                            </Link>
                          </li>
                          <li>
                            <Link href="/aboutus">
                              <a>About Us</a>
                            </Link>
                          </li>
                          {/* <li className="has-dropdown">
                          <Link href="/course-grid">
                            <a>Pages</a>
                          </Link>
                          <ul className="submenu">
                            // <li>
                            //   <Link href="/about">
                            //     <a>About</a>
                            //   </Link>
                            // </li>
                            <li>
                              <Link href="/instructor">
                                <a>Instructor</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/instructor-details">
                                <a>Instructor Details</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/event-details">
                                <a>Event Details</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/cart">
                                <a>My Cart</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/wishlist">
                                <a>My Wishlist</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/checkout">
                                <a>Checkout</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/sign-in">
                                <a>Sign In</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/sign-up">
                                <a>Sign Up</a>
                              </Link>
                            </li>
                            <li>
                              <Link href="/error">
                                <a>Error</a>
                              </Link>
                            </li>
                          </ul>
                        </li> */}
                          {/* <li>
                            <Link href="/how-it">
                              <a>How it Works</a>
                            </Link>
                          </li> */}
                          {/* <li>
                          <Link href="/contact">
                            <a>Contact</a>
                          </Link>
                        </li> */}
                        </ul>
                      </nav>
                    </div>
                    <div className="header__search p-relative ml-50 d-none d-md-block">
                      <form action="">
                        <input
                          type="text"
                          placeholder="Search course..."
                          value={searchString}
                          onChange={handleSearch}
                        />
                        <button type="submit">
                          <i className="fas fa-search"></i>
                        </button>
                      </form>
                      <div className="header__cart">
                        <span
                          className="cart-toggle-btn"
                          onClick={() => {
                            setShopOpen(!shopOpen);
                          }}
                        >
                          <div className="header__cart-icon">
                            <svg viewBox="0 0 24 24">
                              <circle className="st0" cx="9" cy="21" r="1" />
                              <circle className="st0" cx="20" cy="21" r="1" />
                              <path
                                className="st0"
                                d="M1,1h4l2.7,13.4c0.2,1,1,1.6,2,1.6h9.7c1,0,1.8-0.7,2-1.6L23,6H6"
                              />
                            </svg>
                          </div>
                          <span className="cart-item">
                            {cartCount && cartCount}
                            {/* {cartCount && location.pathname == "/success"
                            ? "0"
                            : cartCount} */}
                          </span>
                        </span>
                      </div>
                      {searchString ? (
                        <div className="search-suggestions position-absolute w-100">
                          <ul class="list-group w-100">
                            {searchProduct.length > 0 ? (
                              searchProduct?.map((item) => (
                                <a href={`/course/${item.id}`}>
                                  <li class="list-group-item w-100 bg-white text-black">
                                    {item.name}
                                  </li>
                                </a>
                              ))
                            ) : (
                              <a>
                                <li
                                  class="list-group-item w-100 bg-white text-black"
                                  style={{ zIndex: "1001" }}
                                >
                                  No Results...
                                </li>
                              </a>
                            )}
                          </ul>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="header__cart header__cart--responsive">
                      <span
                        className="cart-toggle-btn"
                        onClick={() => {
                          setShopOpen(!shopOpen);
                        }}
                      >
                        <div className="header__cart-icon">
                          <svg viewBox="0 0 24 24">
                            <circle className="st0" cx="9" cy="21" r="1" />
                            <circle className="st0" cx="20" cy="21" r="1" />
                            <path
                              className="st0"
                              d="M1,1h4l2.7,13.4c0.2,1,1,1.6,2,1.6h9.7c1,0,1.8-0.7,2-1.6L23,6H6"
                            />
                          </svg>
                        </div>
                        <span className="cart-item">
                          {cartCount && cartCount}
                          {/* {cartCount && location.pathname == "/success"
                          ? "0"
                          : cartCount} */}
                        </span>
                      </span>
                    </div>
                    <div className="header__btn ml-20 d-none d-sm-block">
                      {logedIn ? (
                        // <Link href="/company/myprofile" >
                        //   <a className="e-btn ">Profile</a>
                        // </Link>

                        <Dropdown>
                          <Dropdown.Toggle
                            style={{
                              padding: ".7rem",
                              border: "none",
                              outline: "none",
                              background: "#2b4eff",
                              color: "white",
                            }}
                            variant=""
                            id="dropdown-basic"
                          >
                            <a
                              onClick={() => {
                                localStorage.removeItem("learnfrocarecart");
                                
                                router.push(`/${getUserType()}/dashboard`);
                                // if ( === "company") {
                              }}
                            >
                              {" "}
                              Dashboard
                            </a>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              className="btn"
                              onClick={() => {
                                router.push(`/${getUserType()}/myprofile`);

                                // if (getUserType() === "company") {
                                //   router.push("/company/myprofile");
                                // } else {
                                //   router.push("/individual/myprofile");
                                // }
                              }}
                            >
                              My Profile
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="btn"
                              onClick={handleLogout}
                              href=""
                            >
                              Logout
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <Link href="/sign-in">
                          <a className="e-btn">Sign In</a>
                        </Link>
                      )}
                    </div>

                    <div className="header__btn ml-20 d-none d-sm-block">
                      {logedIn ? (
                        // <Link href="/company/myprofile" >
                        //   <a className="e-btn ">Profile</a>
                        // </Link>

                        <div></div>
                      ) : (
                        <Link href="/sign-up">
                          <a className="e-btn">Sign Up</a>
                        </Link>
                      )}
                    </div>
                    <div className="sidebar__menu d-xl-none">
                      <div
                        className="sidebar-toggle-btn ml-30"
                        id="sidebar-toggle"
                        onClick={() => {
                          setMenuOpen(!menuOpen);
                        }}
                      >
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BurgerDash menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <div
            onClick={() => setMenuOpen(false)}
            className={menuOpen ? "body-overlay show" : "body-overlay"}
          ></div>

          <ShopingCart shopOpen={shopOpen} setShopOpen={setShopOpen} />
          <div
            onClick={() => setShopOpen(false)}
            className={shopOpen ? "body-overlay show" : "body-overlay"}
          ></div>
        </header>
      </React.Fragment>
    </NoSSR>
  );
};

export default DashHeader;
