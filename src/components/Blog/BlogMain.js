import React, { Component } from "react";
import ArticleLayout from "../Common/ArticleLayout";
import posts from "../../sample-data/blog-posts/posts.json";
import Breadcrumb from "../Common/Breadcrumb";
import PaginationSection from "../Common/Pagination";
import Search from "./SearchSection";
import RecentPost from "./RecentPostSection";
import Category from "./CategorySecion";
import Tags from "./TagsSection";
import SidebarBanner from "./SidebarBannerSection";
import fetchData from "../../axios/index";
import store from "../../redux/store";
import ShareButton from "react-share/lib/ShareButton";

class BlogMain extends Component {
  state = {
    blogs: [],
  };

  componentDidMount() {
    let makeRequest = fetchData();

    makeRequest("GET", "/blog/get-all-blog")
      .then((res) => {
        this.setState(() => ({
          blogs: res.data.response,
        }));
        store.dispatch({
          type: "SET_ALL_BLOGS",
          payload: res.data.response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state);

    return (
      <main>
        <Breadcrumb pageTitle="Blog" />
        <section className="blog__area pt-75 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-xxl-12 col-xl-12 col-lg-12">
                <div className="row">
                  {this.state.blogs &&
                    this.state.blogs.map((post, i) => {
                      console.log(post);
                      return (
                        <div
                          key={i}
                          className="col-xxl-4 col-xl-4 col-lg-4 col-md-4"
                        >
                          <ArticleLayout post={post} />
                        </div>
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

export default BlogMain;
