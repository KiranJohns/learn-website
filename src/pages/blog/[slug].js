import React, { useEffect, useState } from "react";
import BlogDetailsMain from "../../components/BlogDetails/BlogDetailsMain";
import Footer from "../../components/Layout/Footer/Footer";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import ShareButton from "react-share/lib/ShareButton";
import NoSSR from "react-no-ssr";
import FooterPad from "../../components/Layout/Footer/FooterLess";
import Cta from "../../components/Home/CtaSection";
import { useRouter } from "next/router";
import fetchData from "../../axios";
import ErrorMain from "../../components/Error/ErrorMain";

const BlogDetailss = () => {
  const {
    query: { slug },
  } = useRouter();
  const makeRequest = fetchData();
  const [course, setCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    makeRequest("GET", `/blog/get-blog-by-id/${slug}`)
      .then((res) => {
        if (res.data.response.length <= 0) {
          setCourse(false);
        } else {
          setCourse(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        setCourse(false);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {!loading && (
        <React.Fragment>
          <NoSSR>
            <HeaderOpaque
              pageTitle="Care course, online care course, Childcare, Mental health care courses"
              descr="Mental health care courses, Healthcare courses, Care certificate courses, online care course, Dementia care, bundle courses, company purchase, blog on care"
            />
          </NoSSR>
          <main>
            {/* Blog Main */}
            {!course ? <ErrorMain /> : <BlogDetailsMain slug={slug} />}
            {/* Blog Main End */}
          </main>
          <Footer />
        </React.Fragment>
      )}
    </>
  );
};

export default BlogDetailss;

BlogDetailss.getInitialProps = async ({ query }) => {
  const { slug } = query;
  return { slug };
};
