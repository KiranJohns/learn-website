import React, { useEffect, useState } from "react";
import { Component } from "react";
import Footer from "../../components/Layout/Footer/Footer";
import CourseDetailsMain from "../../components/CourseDetails/CourseDetailsMain";
import HeaderFour from "../../components/Layout/Header/HeaderStyleFour";
import Header from "../../components/Layout/Header/Header";
import { useRouter } from "next/router";
import NoSSR from "react-no-ssr";
import fetchData from "../../axios";
import axios from "axios";
import ErrorMain from "../../components/Error/ErrorMain";

// class CourseDetails extends React.Component {
//   static getInitialProps({ store }) {}

//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <NoSSR>
//         <Header />
//         </NoSSR>
//         <CourseDetailsMain />
//         {/* <Footer /> */}
//       </React.Fragment>
//     );
//   }
// }
// import React, { useEffect } from 'react';

const CourseDetails = () => {
  const {
    query: { slug },
  } = useRouter();
  const makeRequest = fetchData();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('slug ',slug.replace("_", " "));
    let name = slug.split("_").join(" ")
    console.log('name ',name);
    setLoading(true);
    makeRequest(
      "GET",
      `/course/get-single-course-by-id/${name}`
    )
      .then((res) => {
        console.log('res ',res.data.response);
        setCourse(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        console.log('err ');
        console.log(err);
        setCourse([]);
        setLoading(false);
      });
  }, []);
  console.log("course ", course);
  return (
    <>
      {!loading && course?.length == 0 ? (
        <>
        <ErrorMain/>
        </>
    
      ) : (
        <>
        <NoSSR>
          <Header pageTitle={slug.split("_").join(" ")} />
        </NoSSR>
        <CourseDetailsMain />
      </>
      )}
    </>
  );
};

// export async function getServerSideProps(context) {
// Accessing query parameters or other context data
// const { params, query, resolvedUrl } = context;

// For demonstration, let's assume you want to pass the slug as a prop
// const slug = params.slug; // Assuming you have a dynamic route with a slug parameter

// const makeRequest = fetchData();

// let res = await axios.get(
//   `/course/get-single-course-by-id/${slug.split("_").join(" ")} />)}`
// );
// let course = res?.data?.response[0];

// // You can perform any additional logic based on the context if needed
// if (course) {
//   return {
//     props: {
//       slug: slug,
//     },
//   };
// } else {
//   // If you want to handle a not found scenario, you can do it like this
//   return {
//     notFound: true,
//   };
// }

// }

export default CourseDetails;
