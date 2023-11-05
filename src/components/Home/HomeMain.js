import React, { Component } from "react";
import Hero from "./HeroSection";
import Category from "./CategorySection";
import Banner from "./BannerSection";
import Event from "./EventSection";
import Cta from "./CtaSection";
import PriceTab from "../Elements/Tab/PriceTab";
import CourseTab from "../Elements/Tab/CourseTab";
import Service from "../HomeTwo/ServiceSection";
import Testimonial from "../Elements/Testimonials/TestimonialsDefault";
import NoSSR from "react-no-ssr";
import ServiceBundle from "../HomeTwo/ServiceBundle";

class HomeMain extends Component {
  render() {
    return (
      <main>
        {/* hero-start */}
        <Hero />
        {/* hero-end */}

        {/* category-start */}
        {/* <Category /> */}
        {/* category-end */}

        {/* banner-start */}
        {/* <Banner /> */}
        {/* banner-end   */}
        
        <ServiceBundle/>

        {/* course-start */}
        <NoSSR>
          <CourseTab />
        </NoSSR>
        {/* course-end */}

        <Service />

        <Testimonial />

        {/* event-start */}
        {/* <Event /> */}
        {/* event-end */}

        {/* tab-start */}
        {/* <PriceTab /> */}
        {/* tab-end */}

        {/* cta-start */}
        <Cta />
        {/* cta-end */}
        {/* end */}
      </main>
    );
  }
}

export default HomeMain;
