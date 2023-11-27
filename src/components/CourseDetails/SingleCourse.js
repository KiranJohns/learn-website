import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import fetchData from "../../axios";
import { useEffect } from "react";
// import html from "../../html/sample.html";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Button from "react-bootstrap/Button";
import NoSSR from "react-no-ssr";
import { FcPrevious, FcNext } from "react-icons/fc";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "500px",
};



const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 1",
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "Slide 2",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 3",
  },
];

const SingleCourse = () => {
  const [course, setCourse] = useState({});
  const [doc, setDocs] = useState([]);
  const [images, setImages] = useState([]);

  const router = useRouter();
  const makeRequest = fetchData();
  // let docs = [{uri: require('../../html/sample.html')}]
  useEffect(() => {
    makeRequest(
      "GET",
      `/on-going-course/get-on-going-course/${router.query.slug}`
    )
      .then((res) => {
        console.log(res.data.response);
        setCourse(res.data.response[0]);
        setTimeout(() => {
          setImages(res.data.response[0].ppt);
        }, 5000);
      })
      .catch((err) => { })
      .catch((err) => {
        // console.log(err);
      });
  }, []);
  return (
    <div style={{}}>
      <div
        className="blog-box-shadow"
        style={{
          display: "flex",
          borderRadius: ".4rem",
          flexDirection: "column",
          margin: "3rem 0rem",
        }}
      >
        <h3 style={{ padding: "1rem", textAlign: "center" }}>{course?.name}</h3>
        <p style={{ padding: "1rem" }}>{course?.description}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <video
          onContextMenu={(e) => e.preventDefault()}
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
          className="course-player"
          controls
          src={course?.video}
        ></video>
        {/* <DocViewer
          documents={[{ uri: course.ppt }]}
          pluginRenderers={DocViewerRenderers}
        /> */}
        {/* <iframe
          title={"PDF-Viewer"}
          src={course?.ppt}
          frameBorder={0}
          style={{ height: "100vh", width: "90vw" }}
        ></iframe> */}
      </div>
      <div className="onecare"
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem",  }}
      >
      <iframe
        src="https://onedrive.live.com/embed?resid=F5F394858BB1213E%214405&authkey=!AIJnHcKPEcZ66uQ&em=2"
        width="630"
        height="500"
        frameborder=""
        scrolling="no"
        controls="0"
      ></iframe>
        </div>
      {/* <DocViewer
        // documents={docs}
          documents={[{uri: course?.ppt}]}
          initialActiveDocument={[{uri: course?.ppt}]}
          pluginRenderers={DocViewerRenderers}
        /> */}
    

      <div className="slide-container">
        <Slide autoplay={false}>
          {images && images?.map((slideImage, index) => (
            <div key={index}>
              <div
                style={{
                  ...divStyle,
                  'backgroundImage': `url(${slideImage})`,
                }}
              ></div>
            </div>
          ))}
        </Slide>
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
            query: { id: course?.course_id, user: router.query.slug },
          }}
        >
          <span className="btn btn-success">Start Exam</span>
        </Link>{" "}
      </div>
    </div>
  );
};

export default SingleCourse;

// import React, { useEffect } from "react";
// import NewInDash from "../../../components/Sidebar/BarDummy";
// import Header from "../../../components/Layout/Header/Header";
// import NoSSR from "react-no-ssr";
// import { useRouter } from "next/router";
// import SingleCourse from "../../../components/CourseDetails/SingleCourse";
// import fetchData from "../../../axios";
// import { useState } from "react";
// import CourseExam from "../../../components/CourseDetails/CourseExam";

// function ExamPage() {
//   return (
//     <main
//       className="p-4"
//       style={{ backgroundImage: "linear-gradient(to right, #EDEEF3, #EDEEF3)" }}
//     >
//       <NoSSR>
//         <Header />
//       </NoSSR>
//       <div
//         className="container-fluid "
//         style={{ borderRadius: "22px", marginTop: "120px" }}
//       >
//         <div className="row justify-content-md-center">
//           <div className="col-sm-12 col-md-12 col-lg-2 p-0" style={{ backgroundColor: "#212450" }}>
//             <NewInDash />
//           </div>
//           <div className="col-sm col-md-9 bg-white">

//             <CourseExam  />

//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default ExamPage;
