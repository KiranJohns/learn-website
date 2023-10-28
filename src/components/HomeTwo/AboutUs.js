import React, { Component } from 'react';
import Link from 'next/link';
import { Manipulation } from 'swiper';

class AboutUs extends Component {

    render() {
        return (
         <main className='container' style={{padding:"1rem", textAlign:'justify', marginTop:"3rem"}}>
          <p>At Learn for Care, we provide you with a comprehensive and enriching learning experience in the
field of care. Our online course is designed to equip you with the knowledge, skills, and insights
needed to excel in various aspects of caregiving. Whether you&#39;re looking to enhance your personal
caregiving skills or pursuing a professional career in healthcare, our course has something valuable
to offer.</p>
     <br></br>
     <p>Who We Are:</p>
     <p>We are a team of experienced professionals and educators who are passionate about care and its
    significance in improving the quality of life for individuals. Our course has been meticulously crafted
    to combine theoretical foundations with practical applications, ensuring that you understand the
    concepts and how to apply them effectively in real-world scenarios.</p>
   <br />
     <p> Our training benefits:</p>
     <p>&#9679; Individuals interested in pursuing a career in caregiving professions.</p>
     <p>&#9679; Current caregivers looking to enhance their skills and deepen their understanding.</p>
     <p>&#9679; Family members and friends who provide care to loved ones and want to improve their caregiving
        abilities.</p>
    <br />
    <p>Certification:</p>
    <p>Upon successful completion of the course, you will receive a certificate that signifies your dedication
     to improving your caregiving capabilities. This certificate can be an asset on your professional
     journey or a testament to your commitment as a caregiver.</p>

     <p>Thank you for considering our Learn for Care Online Course. Join us to embark on a journey of
growth, learning, and meaningful impact in the lives of those who need care. Enrol today and start
your path to becoming a skilled and compassionate caregiver.</p>
         </main>
        );
    }
}

export default AboutUs;