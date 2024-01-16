import React, { useEffect, useState } from 'react';
import Footer from '../components/Layout/Footer/Footer';
import CourseGridMain from '../components/CourseGrid/CourseGridMain';
import CourseAllMain from '../components/CourseGrid/CourseAllMain';
import HeaderThree from '../components/Layout/Header/HeaderStyleThree';
import Header from '../components/Layout/Header/Header';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import NoSSR from 'react-no-ssr';

const CourseAll = () => {
  

  return (
    <React.Fragment>
      <NoSSR>
        <HeaderOpaque />
      </NoSSR>
      <CourseAllMain />
      <Footer />
    </React.Fragment>
  );
};

export default CourseAll;
