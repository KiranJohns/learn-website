import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import store from '../../../redux/store'
const Tabs = dynamic(import('react-tabs').then(mod => mod.Tabs), { ssr: false })
import { Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PaginationSection from '../../Common/Pagination';
import Link from 'next/link';
import sampleProducts from '../../../../sampleProduct.json'
import { useSelector } from 'react-redux'

export default () => {
    const { cart } = useSelector((store) => store.cart)
    function addToCart(id) {
      const item = sampleProducts.find((item) => item.id === id)
      store.dispatch({
        type: 'ADD_TO_CART',
        payload: item,
      })
    }
  
    function increment(id) {
      store.dispatch({
        type: 'INCREMENT_ITEM_CONT',
        payload: id,
      })
    }
    function decrement(id) {
      store.dispatch({
        type: 'DECREMENT_ITEM_CONT',
        payload: id,
      })
    }
   
return(
    <section className="course__area pt-115 pb-120 grey-bg">
    <Tabs variant="enclosed" id="react-tabs-276">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xxl-5 col-xl-6 col-lg-6">
            <div className="section__title-wrapper mb-60">
              {/* <h2 className="section__title">
                Find the Right
                <br />
                Online{' '}
                <span className="yellow-bg yellow-bg-big">
                  Course
                  <img
                    src="assets/img/shape/yellow-bg.png"
                    alt="img not found"
                  />
                </span>{' '}
                for you
              </h2> */}
              {/* <p>
                You don't have to struggle alone, you've got our assistance
                and help.
              </p> */}
            </div>
          </div>
          {/* <div className="col-xxl-7 col-xl-6 col-lg-6">
                   <div className="course__menu d-flex justify-content-lg-end mb-60">
                      <div className="masonary-menu filter-button-group">
                         <TabList>
                              <Tab><button>See All <span className="tag">new</span></button></Tab>
                              <Tab><button>Trending</button></Tab>
                              <Tab><button>Popularity</button></Tab>
                              <Tab><button>Featured</button></Tab>
                              <Tab><button>Art & Design</button></Tab>
                          </TabList>
                     </div>
                   </div>
                </div> */}
        </div>
        <TabPanel>
          <div className="row">
            {sampleProducts.map((item) => (
              <div
                key={item.id}
                className="col-xxl-4 col-xl-4 col-lg-4 col-md-6"
              >
                <div className="course__item white-bg mb-30 fix">
                  <div className="course__thumb w-img p-relative fix">
                    <Link href="/course-details">
                      <a>
                        <img src={item.image} alt="img not found" />
                      </a>
                    </Link>
                    {/* <div className="course__tag">
                      <Link href="/course-details">
                        <a className="orange">{item.course_tags}</a>
                      </Link>
                    </div> */}
                  </div>
                  <div className="course__content">
                    <h3 className="course__title">
                      <Link href="/course-details">
                        <a>{item.heading}</a>
                      </Link>
                    </h3>
                    <div className="course__teacher d-flex align-items-center">
                      {/* <div className="course__teacher-thumb mr-15">
                               <img src="assets/img/course/teacher/teacher-5.jpg" alt="img not found"/>
                            </div> */}
                      <h6>
                        <Link href="/instructor-details">
                          <a>{item.description}</a>
                        </Link>
                      </h6>
                    </div>
                  </div>
                  <div className="course__more d-flex justify-content-between ">
                    <div className="course__status d-flex align-items-center">
                      <span className="sky-blue">£{item.price}</span>
                    </div>
                    <span>
                      <div className="d-flex">
                        <button
                          className="cart-minus"
                          onClick={() => decrement(item.id)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <p className="p-1">
                          {(cart &&
                            cart?.find((cartItem) => cartItem.id === item.id)
                              ?.count) ||
                            0}
                        </p>
                        <button
                          className="cart-plus"
                          onClick={() => increment(item.id)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </span>
                    <span>
                      <button
                        className="course__more d-flex justify-content-between align-items-center"
                        type="button"
                        class="btn btn-primary btn-sm"
                        onClick={() => addToCart(item.id)}
                      >
                        Add to cart
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
     
       
      
       
      </div>
    </Tabs>
  </section>
);
                          }