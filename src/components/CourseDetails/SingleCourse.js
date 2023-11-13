import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import fetchData from "../../axios";
import { useEffect } from "react";
// import html from "../../html/sample.html";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";


const SingleCourse = () => {
  const [course, setCourse] = useState({});
  const [doc, setDocs] = useState([]);
  const router = useRouter();
  console.log(router.query.slug);
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
        setDocs(res.data.response[0].ppt);
      })
      .catch((err) => {})
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

        {/* <ReactPlayer controls  className='course-player' url='https://www.youtube.com/watch?v=LXb3EKWsInQ' /> */}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop:"3rem" }}>
        <iframe
          src="https://onedrive.live.com/embed?resid=F5F394858BB1213E%214405&authkey=!AIJnHcKPEcZ66uQ&em=2"
          width="402"
          height="327"
          frameborder="0"
          scrolling="no"
          controls="0"
        ></iframe>
        {/* <iframe src={doc}/> */}
        {/* <DocViewer
        // documents={docs}
          documents={[{uri: course?.ppt}]}
          initialActiveDocument={[{uri: course?.ppt}]}
          pluginRenderers={DocViewerRenderers}
        /> */}
      </div>
    </div>
  );
};

export default SingleCourse;
