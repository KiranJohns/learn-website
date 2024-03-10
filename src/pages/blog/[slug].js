import React from "react";

import BlogDetailsMain from "../../components/BlogDetails/BlogDetailsMain";

import Footer from "../../components/Layout/Footer/Footer";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import ShareButton from "react-share/lib/ShareButton";
import NoSSR from "react-no-ssr";
import FooterPad from "../../components/Layout/Footer/FooterLess";
import Cta from "../../components/Home/CtaSection";

class BlogDetailss extends React.Component {
  static async getInitialProps({ query }) {
    const { slug } = query;
    return { slug };
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <NoSSR>
          <HeaderOpaque />
        </NoSSR>
        <main>
          {/* Blog Main */}
          <BlogDetailsMain slug={this.props.slug} />
          {/* Blog Main End */}
        </main>

        <Footer />
      </React.Fragment>
    );
  }
}

export default BlogDetailss;

BlogDetailss.getInitialProps = async ({ query }) => {
  const { slug } = query;
  return { slug };
};
