import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import fetchData from "../../axios";
import { useEffect } from "react";
// import html from "../../html/sample.html";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'




const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '500px'
}

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 1'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Slide 2'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 3'
  },
];

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
   
        {/* <DocViewer
        // documents={docs}
          documents={[{uri: course?.ppt}]}
          initialActiveDocument={[{uri: course?.ppt}]}
          pluginRenderers={DocViewerRenderers}
        /> */}

      </div>
      <div className="slide-container">
        <Slide autoplay={false}>
         {slideImages.map((slideImage, index)=> (
            <div key={index}>
              <div  style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>

        
               
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    </div>
  );
};

export default SingleCourse;
