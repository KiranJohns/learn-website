
import React from 'react';
import Link from 'next/link';
import useFetch from '../../axios';
import { useFormik } from 'formik';
import { signupValidation } from '../../yup/signupValidation';

const initialValues = {
  name: '',
  email: '',
  country: '',
  city: '',
  password: '',
};

function SignUpMain() {

   
  const signUpReq = useFetch();

  const {values, handleBlur, handleChange, handleSubmit, errors} = useFormik({
    initialValues: initialValues,
    validationSchema: signupValidation,
    onSubmit: (values) => {
      handleSignUp(values)
    }
  });





  const handleSignUp = (values) => {
    const method = 'POST'; // Specify the HTTP method
    const urls = '/user/registration'; // Specify the API endpoint URL
    const data = values; // Send form values as data

    const [loading, response, error ] = signUpReq(method, urls, data);
    console.log(loading )
    console.log(response)
    console.log(error )
  };


  return (
    <main>
      <section className="signup__area po-rel-z1 pt-100 pb-145">
      <div className="sign__shape">
                        <img className="man-1" src="assets/img/icon/sign/man-3.png" alt="img not found"/>
                        <img className="man-2 man-22" src="assets/img/icon/sign/man-2.png" alt="img not found"/>
                        <img className="circle" src="assets/img/icon/sign/circle.png" alt="img not found"/>
                        <img className="zigzag" src="assets/img/icon/sign/zigzag.png" alt="img not found"/>
                        <img className="dot" src="assets/img/icon/sign/dot.png" alt="img not found"/>
                        <img className="bg" src="assets/img/icon/sign/sign-up.png" alt="img not found"/>
                        <img className="flower" src="assets/img/icon/sign/flower.png" alt="img not found"/>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
                                <div className="section__title-wrapper text-center mb-55">
                                    <h2 className="section__title">Create a free <br/>  Account</h2>
                                    {/* <p>I'm a subhead that goes with a story.</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                                <div className="sign__wrapper white-bg">
                                    <div className="sign__header mb-35">
                                    <div className="sign__in text-center">
                                        {/* <a href="#" className="sign__social g-plus text-start mb-15"><i className="fab fa-google"></i>Sign Up with Google</a> */}
                                        <p> <span>........</span>  <Link href="/sign-up"><a>sign up</a></Link> with your email<span> ........</span> </p>
                                    </div>
                                    </div>
                                    <div className="sign__form">
                                    <form onSubmit={handleSubmit}>
                                        <div className="sign__input-wrapper mb-25">
                                            <h5>Full Name</h5>
                                            <div className="sign__input">
                                                <input type="text" name="name" value={values.name} onBlur={handleBlur} onChange={handleChange} placeholder="Full name"/>
                                                <i className="fas fa-user"></i>
                                            </div>
                                            <br />
                                        {errors.name && <small>{errors.name}</small>}
                                        <br />
                                        </div>
                                        
                                        <div className="sign__input-wrapper mb-25">
                                            <h5>Work email</h5>
                                            <div className="sign__input">
                                                <input type="text" name='email' value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder="e-mail address"/>
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                            <br />
                                        {errors.email && <small>{errors.email}</small>}
                                        <br />
                                        </div>

                                        <div className="sign__input-wrapper mb-25">
                                            <h5>Country</h5>
                                            <div className="sign__input">
                                                <input type="text" name='country' value={values.country} onBlur={handleBlur} onChange={handleChange} placeholder="Country"/>
                                                <i className="fas fa-flag"></i>
                                            </div>
                                            <br />
                                        {errors.country && <small>{errors.country}</small>}
                                        <br />
                                        </div>

                                        <div className="sign__input-wrapper mb-25">
                                            <h5>City</h5>
                                            <div className="sign__input">
                                                <input type="text" name='city' value={values.city} onBlur={handleBlur} onChange={handleChange} placeholder="City"/>
                                                <i className="fas fa-city"></i>
                                            </div>
                                            <br />
                                        {errors.city && <small>{errors.city}</small>}
                                        <br />
                                        </div>

                                        <div className="sign__input-wrapper mb-25">
                                            <h5>Password</h5>
                                            <div className="sign__input">
                                                <input type="password" name='password' value={values.password} onBlur={handleBlur} onChange={handleChange} placeholder="Password"/>
                                                <i className="fas fa-lock"></i>
                                            </div>
                                            <br />
                                        {errors.password && <small>{errors.password}</small>}
                                        <br />
                                        </div>

                                        {/* <div className="sign__input-wrapper mb-10">
                                            <h5>Re-Password</h5>
                                            <div className="sign__input">
                                                <input type="password" name='cpassword' value={values.cpassword} onBlur={handleBlur} onChange={handleChange} placeholder="Re-Password"/>
                                                <i className="fas fa-lock"></i>
                                            </div>
                                            <br />
                                        {errors.cpassword && <small>{errors.cpassword}</small>}
                                        <br />
                                        </div> */}

                                        <div className="sign__action d-flex justify-content-between mb-30">
                                            <div className="sign__agree d-flex align-items-center">
                                                <input className="m-check-input" type="checkbox" id="m-agree"/>
                                                <label className="m-check-label" htmlFor="m-agree">I agree to the <a href="#">Terms & Conditions</a>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <button  type='submit' className="e-btn w-100"> <span></span> Sign Up</button>
                                        <div className="sign__new text-center mt-20">
                                            <p>Already in Signed Up ? <Link href="/sign-in"><a>Sign In</a></Link></p>
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
      </section>
    </main>
  );
}

export default SignUpMain;












// import React, { Component } from 'react';
// import Link from 'next/link';
// import useFetch from '../../axios';
// import {useFormik} from 'formik'

// const initialValues ={
//  name:'',
//  email:'',
//  country:'',
//  city:'',
//  password:'',
//  cpassword:''
// }

// class SignUpMain extends Component {

//        signUpReq = useFetch()
       
//        handleSignUp(){
        
//         signUpReq(method,url,data)

//        }




//     render() {
//         const formik =   useFormik({
//             intialValues: initialValues,
//             onSubmit: (values)=>{
//                 console.log(values)
//             }
//            })
//            console.log(formik)
//         return (
//             <main>
//                 <section className="signup__area po-rel-z1 pt-100 pb-145">
//                     <div className="sign__shape">
//                         <img className="man-1" src="assets/img/icon/sign/man-3.png" alt="img not found"/>
//                         <img className="man-2 man-22" src="assets/img/icon/sign/man-2.png" alt="img not found"/>
//                         <img className="circle" src="assets/img/icon/sign/circle.png" alt="img not found"/>
//                         <img className="zigzag" src="assets/img/icon/sign/zigzag.png" alt="img not found"/>
//                         <img className="dot" src="assets/img/icon/sign/dot.png" alt="img not found"/>
//                         <img className="bg" src="assets/img/icon/sign/sign-up.png" alt="img not found"/>
//                         <img className="flower" src="assets/img/icon/sign/flower.png" alt="img not found"/>
//                     </div>
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
//                                 <div className="section__title-wrapper text-center mb-55">
//                                     <h2 className="section__title">Create a free <br/>  Account</h2>
//                                     {/* <p>I'm a subhead that goes with a story.</p> */}
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
//                                 <div className="sign__wrapper white-bg">
//                                     <div className="sign__header mb-35">
//                                     <div className="sign__in text-center">
//                                         {/* <a href="#" className="sign__social g-plus text-start mb-15"><i className="fab fa-google"></i>Sign Up with Google</a> */}
//                                         <p> <span>........</span>  <Link href="/sign-up"><a>sign up</a></Link> with your email<span> ........</span> </p>
//                                     </div>
//                                     </div>
//                                     <div className="sign__form">
//                                     <form action="#">
//                                         <div className="sign__input-wrapper mb-25">
//                                             <h5>Full Name</h5>
//                                             <div className="sign__input">
//                                                 <input type="text" name="name" placeholder="Full name"/>
//                                                 <i className="fas fa-user"></i>
//                                             </div>
//                                         </div>
//                                         <div className="sign__input-wrapper mb-25">
//                                             <h5>Work email</h5>
//                                             <div className="sign__input">
//                                                 <input type="text" name='email' placeholder="e-mail address"/>
//                                                 <i className="fas fa-envelope"></i>
//                                             </div>
//                                         </div>
//                                         <div className="sign__input-wrapper mb-25">
//                                             <h5>Country</h5>
//                                             <div className="sign__input">
//                                                 <input type="text" name='country' placeholder="Country"/>
//                                                 <i className="fas fa-flag"></i>
//                                             </div>
//                                         </div>
//                                         <div className="sign__input-wrapper mb-25">
//                                             <h5>City</h5>
//                                             <div className="sign__input">
//                                                 <input type="text" name='city' placeholder="City"/>
//                                                 <i className="fas fa-flag"></i>
//                                             </div>
//                                         </div>
//                                         <div className="sign__input-wrapper mb-25">
//                                             <h5>Password</h5>
//                                             <div className="sign__input">
//                                                 <input type="text" name='password' placeholder="Password"/>
//                                                 <i className="fas fa-lock"></i>
//                                             </div>
//                                         </div>
//                                         <div className="sign__input-wrapper mb-10">
//                                             <h5>Re-Password</h5>
//                                             <div className="sign__input">
//                                                 <input type="text" name='cpassword' placeholder="Re-Password"/>
//                                                 <i className="fas fa-lock"></i>
//                                             </div>
//                                         </div>
//                                         <div className="sign__action d-flex justify-content-between mb-30">
//                                             <div className="sign__agree d-flex align-items-center">
//                                                 <input className="m-check-input" type="checkbox" id="m-agree"/>
//                                                 <label className="m-check-label" htmlFor="m-agree">I agree to the <a href="#">Terms & Conditions</a>
//                                                 </label>
//                                             </div>
//                                         </div>
//                                         <button className="e-btn w-100"> <span></span> Sign Up</button>
//                                         <div className="sign__new text-center mt-20">
//                                             <p>Already in Signed Up ? <Link href="/sign-in"><a>Sign In</a></Link></p>
//                                         </div>
//                                     </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//         	</main>
//         );
//     }
// }

// export default SignUpMain;




