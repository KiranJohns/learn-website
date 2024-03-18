import React, { useEffect, useState } from "react";
import BlogDetailsMain from "../../components/BlogDetails/BlogDetailsMain";
import Footer from "../../components/Layout/Footer/Footer";
import HeaderOpaque from "../../components/Layout/Header/HeaderOpaque";
import ShareButton from "react-share/lib/ShareButton";
import Head from "next/head";
import NoSSR from "react-no-ssr";
import FooterPad from "../../components/Layout/Footer/FooterLess";
import Cta from "../../components/Home/CtaSection";
import { useRouter } from "next/router";
import fetchData from "../../axios";
import ErrorMain from "../../components/Error/ErrorMain";

const BlogDetailss = () => {
  let Conname, Passtitle;
  const {
    query: { slug },
  } = useRouter();
  const makeRequest = fetchData();
  const [course, setCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  function getData() {
    let name = location.href?.split("/blog/")[1];
    name = name?.split("_")?.join(" ") || "";
    setLoading(true);
    setLoading(true);
    makeRequest("GET", `/blog/get-blog-by-name/${name}`)
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
  }
  useEffect(() => {
    if (location.pathname.includes("%20")) {
      setCourse(false);
      setLoading(false);
      return;
    } else {
      getData();
    }
  }, []);
  function NameCon(){
    Conname = location.href?.split("/blog/")[1];
    Passtitle = Conname?.split("_")?.join(" ") || "";
  }
  NameCon();

  return (
    <>
      {!loading && (
        <React.Fragment>
          <NoSSR>
            <Head>
            <link rel="canonical" href={`https://learnforcare.co.uk/blog/${Conname}`}/>
            </Head>
            <HeaderOpaque
              pageTitle={course ? `${Passtitle}` : "404 Error: Page Not Found"}
              descr={course ? `Mental health care courses, Healthcare courses, ${Passtitle}` : ""}
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
