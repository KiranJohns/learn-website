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
  console.log("slug ", slug);
  const makeRequest = fetchData();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    makeRequest(
      "GET",
      `/course/get-single-course-by-id/${slug.replace("_", " ")}`
    )
      .then((res) => {
        setCourse(res.data.response);
        setLoading(false);
      })
      .catch((err) => {
        setCourse([]);
        setLoading(false);
      });
  }, []);
  console.log("course ", course);
  return (
    <>
      {!loading && course?.length !== 0 ? (
        <>
          <NoSSR>
            <Header pageTitle={slug.replace("_", " ")} />
          </NoSSR>
          <CourseDetailsMain />
        </>
      ) : (
        "not valid name"
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
//   `/course/get-single-course-by-id/${slug.replace("_", " ")}`
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
