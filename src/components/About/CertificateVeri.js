import React, { Component } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import VerificationSection from '../HomeTwo/VerificationSection';


const CertifiVeritication = () => {
  return (
    <main>
    {/* breadcrumb-start */}
    <Breadcrumb pageTitle="Certificate Verification" />
    {/* breadcrumb-end */}
    
   

    {/* about-start */}
    <div className='mt-10 '>
    <VerificationSection/>
    </div>
    


</main>
  )
}

export default CertifiVeritication