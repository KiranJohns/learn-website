import React from 'react';
import ErrorMain from '../../components/Error/ErrorMain';
import Footer from '../../components/Layout/Footer/Footer';
import Header from '../../components/Layout/Header/Header';


const Errorss = () => {
    history.pushState(null, null, 'no-back-button');
    window.addEventListener('popstate', function(event) {
      // history.pushState(null, null, 'no-back-button');
       
        window.location.href = '/';
    });
  

    return (
        <React.Fragment>
        <Header />
        <ErrorMain />
        <Footer />
        </React.Fragment>
    );
}

export default Errorss