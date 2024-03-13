import React, { useEffect, useState } from 'react';
import Footer from '../components/Layout/Footer/Footer';
import CourseGridMain from '../components/CourseGrid/CourseGridMain';
import CourseAllMain from '../components/CourseGrid/CourseAllMain';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import NoSSR from 'react-no-ssr';
import CourseGridOnline from '../components/CourseGrid/OnlineCourses';
import OnlineGrid from '../components/Elements/Tab/OnlineGrid';


const OnlineCourses = () => {
  

  return (
    <React.Fragment>
      <NoSSR>
        <HeaderOpaque pageTitle="Online care bundle"/>
      </NoSSR>
      <CourseGridOnline />
      <Footer />
    </React.Fragment>
  );
};

export default OnlineCourses;
