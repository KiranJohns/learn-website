import React from "react";

import BlogDetailsMain from "../../components/BlogDetails/BlogDetailsMain";

import Footer from "../../components/Layout/Footer/Footer";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";

class BlogDetailss extends React.Component {

  static async getInitialProps({ query }) {
    const {slug} = query;
    return { slug }
}

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <HeaderOpaque />
        <main >
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

BlogDetailss.getInitialProps = async ({query}) => {
  const {slug} = query;
  return {slug}
}
