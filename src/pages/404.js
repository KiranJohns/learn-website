import React from 'react'
import ErrorMain from '../components/Error/ErrorMain';
import Footer from '../components/Layout/Footer/Footer';
import Header from '../components/Layout/Header/Header';
import Head from "next/head";
import NoSSR from '../components/noSSR';

const NotFound = () => {

  return (
    <React.Fragment>
        <NoSSR>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Header pageTitle="404 Error: Page Not Found" descr="Oops! The page you were looking for couldn't be found." />
      </NoSSR>
      <ErrorMain />
      <Footer />
    </React.Fragment>
  )
}

export default NotFound