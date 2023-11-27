import React from 'react'
 
import ImageSlider from '../Elements/Tab/imageslider';
import Link from "next/link";

const CourseResource = () => {

   
    const slides = [
      { url: "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "beach" },
      { url: "https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", title: "boat" },
      { url: "https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=600", title: "forest" },
    ];
    const containerStyless = {
      width: "800px",
      height: "448px",
      margin: "0 auto",
    };



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
 
    <h4 style={{ padding: "1rem", textAlign: "center" }}>Course Name</h4>
    {/* course description */}

    <p style={{ padding: "1rem", textAlign:'center' }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still. </p>
    </div>

    <div  className="blog-box-shadow"
    style={{
      display: "flex",
      borderRadius: ".4rem",
      flexDirection: "column",
      margin: "3rem 0rem",
    }}>
        <div style={{padding:'1.2rem'}}>
        <div style={{ display: "flex", justifyContent: "center" }}>
        <video
          onContextMenu={(e) => e.preventDefault()}
          config={{ file: { attributes: { controlsList: "nodownload" } } }}
          className="course-player"
          controls
          src={"https://www.youtube.com/embed/P6FORpg0KVo?si=uCdPiKQan_WqbvzG" }
        ></video>
      </div>
          
      <div className="onecare"
        style={{ display: "flex", justifyContent: "center", marginTop: "3rem",  }}
      >
      <iframe style={{padding:"1rem", border:'none'}}
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
            pathname: "/",
          }}
        >
          <span className="btn btn-success">Start Exam</span>
        </Link>{" "}
      </div>

        </div>

    </div>

    </div>
  )
}

export default CourseResource