import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import store from "../../../redux/store";
const Tabs = dynamic(
  import("react-tabs").then((mod) => mod.Tabs),
  { ssr: false }
);
import { Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PaginationSection from "../../Common/Pagination";
import Link from "next/link";
import { useSelector } from "react-redux";
import fetchData from "../../../axios/index";
import CourseCard from "./CourseCard";
import Pagination from 'react-bootstrap/Pagination';
import BundleCard from "./BundleCard";


export default () => {
  const { cart } = useSelector((store) => store.cart);
  let makeRequest = fetchData();

  const [bundles, setBundles] = useState([]);

  useEffect(() => {
    makeRequest("GET", "/bundle/get-all-bundles")
      .then((res) => {
        setBundles(res.data.response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="course__area pt-50 pb-60 grey-bg">
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
              {bundles.map((item) => (<BundleCard item={item} />))}
            </div>
          
          </TabPanel>
        </div>
       
      </Tabs>
    </section>
  );
};
