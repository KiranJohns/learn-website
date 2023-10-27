import React, { Component } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import store from "../../redux/store";
import ReactGA from "react-ga";
import articleDetails from "../../sample-data/blog-posts/single-post.json";
import BlogDesc from "./BlogDescSection";
import BlogMeta from "./BlogMetaSection";
import BlogAuthor from "./BlogAuthorSection";
import BlogRecent from "./BlogRecentSection";
import LatestComments from "./LatestCommentsSection";
import ReplyForm from "./ReplyFormSection";
import Search from "../Blog/SearchSection";
import RecentPost from "../Blog/RecentPostSection";
import Category from "../Blog/CategorySecion";
import Tags from "../Blog/TagsSection";
import SidebarBanner from "../Blog/SidebarBannerSection";
import Breadcrumb from "../Common/Breadcrumb";
import fetchData from "../../axios/index";
import Link from "next/link";

class BlogDetailsMain extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    return { slug };
  }
  state = {
    allBlogs: [],
    recentBlogs: [],
  };

  constructor(props) {
    super(props);
  }

  getDetails() {
    // store.dispatch({
    //     type: 'NEWS_DETAILS_SUCCESS',
    //     allBlogs: articleDetails
    // });
  }

  componentDidMount() {
    let makeRequest = fetchData();

    makeRequest("GET", "/blog/get-all-blog")
      .then((res) => {
        this.setState(() => ({
          recentBlogs: res.data.response,
        }));
      })
      .catch((err) => {
        console.log(err);
      });

    makeRequest("GET", `/blog/get-blog-by-id/${this.props.slug}`)
      .then((res) => {
        console.log(res);
        this.setState((prev) => {
          return {
            ...prev,
            allBlogs: res.data.response,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.getDetails();
    ReactGA.initialize("UA-168056874-1", { alwaysSendToDefaultTracker: true });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <main>
        {this.state.allBlogs &&
          this.state.allBlogs.map((article, num) => (
            <Head key={num}>
              <title>{article.title}</title>
              <meta name={article.title} />
              <meta
                name="og:title"
                property="og:title"
                content={article.title}
              ></meta>
              <meta
                name="og:description"
                property="og:description"
                content={article.text}
              ></meta>
              <meta name="twitter:card" content={article.title}></meta>
              <link rel="canonical" href={"/" + article.url}></link>
              <meta property="og:image" content={article.image} />
            </Head>
          ))}

        {this.state.allBlogs &&
          this.state.allBlogs.map((article, num) => (
            <Breadcrumb key={num} pageTitle={article.title} />
          ))}

        <section className="blog__area pt-120 pb-120 pl-80 pr-80">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xxl-9 col-xl-7 col-lg-7">
                {this.state.allBlogs &&
                  this.state.allBlogs.map((article, num) => (
                    <div key={num} className="blog__wrapper">
                      {/* <BlogDesc /> */}
                      <div className="blog__img w-img mb-45">
                        <img src={article.img} alt={article.heading} />
                      </div>
                      <div className="blog__text mb-40">
                        <h3>{article.header}</h3>
                        <p>{article.content}</p>
                        <p style={{display: 'inline-block'}}>
                          {new Date(article.date)
                            .toLocaleDateString()
                            .split("/")
                            .join("-")}
                        </p>
                        <p style={{ display: 'block',float: "right" }}>{article.author}</p>
                      </div>
                      
                      <div className="blog__line"></div>
                      <BlogMeta />
                    </div>
                  ))}
              </div>
              <div className="col-xl-3 col-lg-3">
                <div className="heading">
                  <h2>Recent Blogs</h2>
                </div>
                <div className="blogs" style={{marginTop: '2rem'}}>
                  {this.state.recentBlogs &&
                    this.state.recentBlogs.map((blog,idx) => {
                      console.log(blog);
                      return (
                        <>
                          <div style={{ margin: "0", display: "flex" }} key={idx}>
                            <img
                              style={{
                                height: "5rem",
                                width: "5rem",
                                padding: "0 0.3rem",marginRight: '1rem'
                              }}
                              src={blog.img}
                              alt=""
                            />
                            <div className="info">
                              <div className="heading" style={{marginTop: "0.2rem"}}>
                                <a href={`/blog/${blog.id}`}>
                                  <h4 title={blog.header}>
                                    {blog.header.slice(0, 20)+"..."}
                                  </h4>
                                </a>
                              </div>
                              <div
                                style={{ lineHeight: "1rem" }}
                                className="content"
                              >
                                <small style={{ lineHeight: "0.1rem" }}>
                                  {blog.content.slice(0, 100)+"..."}
                                </small>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  const { allBlogs } = state.blog;
  return { allBlogs };
};

export default connect(mapStateToProps)(BlogDetailsMain);
