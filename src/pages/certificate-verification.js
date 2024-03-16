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
    <HeaderOpaque  pageTitle="Certificate Verification: Learn For Care" descr="Verify the authenticity of your certificates quickly and securely. Enter your certificate details to confirm its validity and ensure peace of mind." />
    </NoSSR>
    <CertifiVeritication/>
    <div className='mt-10'>
    <Footer />
    </div>

    </React.Fragment>
  )
}

export default verification