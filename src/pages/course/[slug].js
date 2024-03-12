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

const CourseDetails = () => {
  const {
    query: { slug },
  } = useRouter();
  const makeRequest = fetchData();
  const [course, setCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let name = slug.split("_").join(" ");
    setLoading(true);
    makeRequest("GET", `/course/get-single-course-by-id/${name}`)
      .then((res) => {
        if (res.data.response.length <= 0) {
          setCourse(false);
        } else {
          setCourse(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setCourse(false);
        setLoading(false);
      });
  }, []);
  console.log("course ", course);
  return (
    <>
      <NoSSR>
        <Header pageTitle={slug.split("_").join(" ")} />
      </NoSSR>
      {!loading && (
        <>
          {!course ? (
            <>
              <ErrorMain />
            </>
          ) : (
            <>
              <CourseDetailsMain />
            </>
          )}
        </>
      )}
    </>
  );
};

export default CourseDetails;
