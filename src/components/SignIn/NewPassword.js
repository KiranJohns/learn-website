import React from 'react'
import Link from 'next/link';
const NewPassword = () => {
  return (
    <div>
         <main>
                <section className="signup__area po-rel-z1 pt-100 pb-145">
                  
                    <div className="container">
                        <div className="row">
                            <div className="col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2">
                                <div className="section__title-wrapper text-center mb-55">
                                    <h2 className="section__title">Change Password<br/> </h2>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xxl-6 offset-xxl-3 col-xl-6 offset-xl-3 col-lg-8 offset-lg-2">
                                <div className="sign__wrapper white-bg">
                                    {/* <div className="sign__header mb-35">
                                    <div className="sign__in text-center">
                                        <a href="#" className="sign__social text-start mb-15"><i className="fab fa-facebook-f"></i></a>
                                        <p> <span>........</span> Or, <Link href="/sign-in"><a>sign in</a></Link> with your email<span> ........</span> </p>
                                    </div>
                                    </div> */}
                                    <div className="sign__form">
                                    <form action="#">
                                        <div className="sign__input-wrapper mb-25">
                                            <h5>New Password</h5>
                                            <div className="sign__input">
                                                <input type="text" placeholder="e-mail address"/>
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                        </div>
                                        <div className="sign__input-wrapper mb-10">
                                            <h5>Confirm Password</h5>
                                            <div className="sign__input">
                                                <input type="text" placeholder="Password"/>
                                                <i className="fas fa-lock"></i>
                                            </div>
                                        </div>
                                
                                        <button className="e-btn mt-2  w-100"> <span></span> Submit</button>
                                        <div className="sign__new text-center mt-20">
                                           
                                        </div>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

        	</main>
    </div>
  )
}

export default NewPassword