import React from 'react';
import ErrorMain from '../../components/Error/ErrorMain';
import Footer from '../../components/Layout/Footer/Footer';
import Header from '../../components/Layout/Header/Header';




const Error = () => {
  return (
    <React.Fragment>
    <Header pageTitle="404 Error: Page Not Found" descr="Oops! The page you were looking for couldn't be found."/>
    <ErrorMain />
    <Footer />
    </React.Fragment>
  )
}

export default Error