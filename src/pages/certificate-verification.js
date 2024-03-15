import React from 'react';
import HeaderOpaque from '../components/Layout/Header/HeaderOpaque';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import Cookies from '../components/About/cookiesMain';
import NoSSR from 'react-no-ssr';
import CertifiVeritication from '../components/About/CertificateVeri';


const verification = () => {
  return (
    <React.Fragment>
    <NoSSR>
    <HeaderOpaque  pageTitle="Certificate Verification"/>
    </NoSSR>
    <CertifiVeritication/>
    <div className='mt-10'>
    <Footer />
    </div>

    </React.Fragment>
  )
}

export default verification