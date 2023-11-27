import React from "react";

import ImageSlider from "../Elements/Tab/imageslider";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";
import fetchData from "../../axios";

const CourseResource = () => {
  const [slides, setSlides] = useState([]);
  const containerStyless = {
    width: "800px",
    height: "448px",
    margin: "0 auto",
  };

  const [course, setCourse] = useState({});
  const [doc, setDocs] = useState([]);
  const [images, setImages] = useState([]);

  const router = useRouter();
  const makeRequest = fetchData();
  useEffect(() => {
    makeRequest(
      "GET",
      `/on-going-course/get-on-going-course/${router.query.courseId}`
    )
      .then((res) => {
        console.log(res.data.response);
        setCourse(res.data.response[0]);
        res.data.response[0].ppt.forEach((link) => {
          setSlides((prev) => {
            return [
              ...prev,
              {
                url: link,
                title: "beach",
              },
            ];
          });
        });
        setTimeout(() => {
          setImages(res.data.response[0].ppt);
        }, 5000);
      })
      .catch((err) => {})
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div>
      <div
        className="blog-box-shadow"
        style={{
          display: "flex",
          borderRadius: ".4rem",
          flexDirection: "column",
          margin: "3rem 0rem",
        }}
      >
        <h4 style={{ padding: "1rem", textAlign: "center" }}>{course.name}</h4>
        {/* course description */}

        <p style={{ padding: "1rem", textAlign: "center" }}>
          {course.description}{" "}
        </p>
      </div>

      <div
        className="blog-box-shadow"
        style={{
          display: "flex",
          borderRadius: ".4rem",
          flexDirection: "column",
          margin: "3rem 0rem",
        }}
      >
        <div style={{ padding: "1.2rem" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <video
              onContextMenu={(e) => e.preventDefault()}
              config={{ file: { attributes: { controlsList: "nodownload" } } }}
              className="course-player"
              controls
              src={course.video}
            ></video>
          </div>

          <div
            className="onecare"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem",
            }}
          >
            <iframe
              style={{ padding: "1rem", border: "none" }}
              src="https://onedrive.live.com/embed?resid=F5F394858BB1213E%214405&authkey=!AIJnHcKPEcZ66uQ&em=2"
              width="809"
              height="640"
              frameborder=""
              scrolling="no"
              controls="0"
            ></iframe>
          </div>

          <div style={containerStyless}>
            <ImageSlider slides={slides} />
          </div>

          <div className="blog-box-shadow mt-50 p-4">
            <div>
              {" "}
              <h4>Resources</h4>
            </div>
            <div style={{ margin: " 1rem .5rem" }}>
              <p>
                Name of resource{" "}
                <a
                  href="https://www.africau.edu/images/default/sample.pdf"
                  style={{ color: "#1b85b8" }}
                  target="_blank"
                  download
                >
                  {" "}
                  View
                </a>
              </p>
            </div>
          </div>
          <div
            className="mt-4 py-4  px-1"
            style={{ display: "flex", justifyContent: "right" }}
          >
            {" "}
            <Link
              href={{
                pathname: "/company/exam",
                query: { id: course?.course_id, user: router.query.courseId },
              }}
            >
              <span className="btn btn-success">Start Exam</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseResource;
