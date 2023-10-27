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

class BlogDetailsMain extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    return { slug };
  }
  state = {
    allBlogs: [],
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
    let makeRequest = fetchData()
    makeRequest("GET",`/blog/get-blog-by-id/${this.props.slug}`).then(res => {
      console.log(res);
      this.setState(prev => {
        return {
          ...prev,
          allBlogs: res.data.response
        }
      })
    }).catch(err => {
      console.log(err);
    })
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

        <section className="blog__area pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-xxl-10 col-xl-10 col-lg-10">
                {this.state.allBlogs &&
                  this.state.allBlogs.map((article, num) => (
                    <div key={num} className="blog__wrapper">
                      {/* <BlogDesc /> */}
                      <div className="blog__img w-img mb-45">
                        <img src={article.img} alt={article.heading} />
                      </div>
                      <div className="blog__text mb-40">
                        <h3>{article.heading}</h3>
                        <p>{article.content}</p>
                        <p>{article.date}</p>
                        <p>{article.author}</p>
                      </div>
                      
                      <div className="blog__line"></div>
                      <BlogMeta />
                    </div>
                  ))}
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
