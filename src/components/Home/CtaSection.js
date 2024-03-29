import React, { Component } from "react";
import Link from "next/link";
import { FaAngleDoubleRight } from "react-icons/fa";
import fetchData from "../../axios";

class Cta extends Component {
  state = {
    blog: {},
  };
  componentDidMount() {
    let makeRequest = fetchData();

    makeRequest("GET", "/blog/get-all-blog")
      .then((res) => {
        this.setState(() => ({
          blog: res.data.response[0],
          id: res?.data?.response[0]?.id,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <main style={{ background: '#ffffff' }}>
        <section className="cta__area mb--120">
          <div className="container">
            <div className="cta__inner blue-bg fix">
              <div className="cta__shape">
                <img src="/assets/img/cta/cta-shape.png" alt="img not found" />
              </div>
              <div className="row align-items-center">
                <div className="col-xxl-7 col-xl-7 col-lg-8 col-md-8">
                  <div className="cta__content">
                    <h3 className="text-white">Recent Blog:</h3>
                  </div>
                </div>
                <div className="col-xxl-7 col-xl-7 col-lg-8 col-md-8">
                  <div className="cta__content">
                  <a href={`/blog/${this.state.blog.header && this.state.blog.header.split(" ").join("_")}`}>
                      <a className="">
                        <h4 className="text-white" style={{ textOverflow: "ellipsis" }}>
                          {this.state.blog && this.state.blog.header?.slice(0, 85)}
                        </h4>
                      </a>
                    </a>
                  </div>
                </div>

                <div className="col-xxl-5 col-xl-5 col-lg-4 col-md-4">
                  <div className="cta__more d-md-flex justify-content-end mb-4  p-relative z-index-1">
                    <Link href="/blog">
                      <a className="e-btn e-btn-primary">
                       More Blogs <FaAngleDoubleRight />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default Cta;
