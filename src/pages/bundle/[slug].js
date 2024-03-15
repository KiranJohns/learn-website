import React from 'react';
import ErrorMain from '../../components/Error/ErrorMain';
import Footer from '../../components/Layout/Footer/Footer';
import Header from '../../components/Layout/Header/Header';




const Error = () => {
  return (
    <React.Fragment>
    <Header pageTitle="404 Error: Page Not Found" descr=""/>
    <ErrorMain />
    <Footer />
    </React.Fragment>
  )
}

export default Error