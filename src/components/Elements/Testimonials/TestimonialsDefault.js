import React, { Component } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

class Testimonial extends Component {

    render() {

        return (
            <section className="testimonial__area testimonial__overlay pt-175 pb-170" style={{ backgroundImage:`url(${'assets/img/testimonial/testimonial-bg1.webp'})`}}>
            <div className="container">
               <div className="col-xxl-12">
                  <div className="testimonial__slider swiper-container">
                     <div className="testimonial__slider-inner swiper-wrapper">
                     <Swiper
                            // install Swiper modules
                            modules={[Navigation, Pagination, Scrollbar, A11y,]}
                            spaceBetween={30}
                            slidesPerView={1}
                            autoplaydisableoninteraction={"false"}
                            loop={true}
                            breakpoints={{

                                // when window width is >= 768px
                                768: {
                                    slidesPerView: 1
                                },
                                1200: {
                                    // when window width is >= 992px
                                    slidesPerView: 1,
                                }
                            }}
                        // pagination={{ clickable: true }}
                        // scrollbar={{ draggable: true }}
                        navigation={{ clickable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                        >
                        <SwiperSlide>
                            <div className="testimonial__item text-center swiper-slide">
                            <div className="testimonial__thumb">
                                <img src="assets/img/testimonial/testimonial-3.jpg" alt="img not found"/>
                            </div>
                            <div className="testimonial__content">
                                <p>“ Barmy too sloshed porkiesdo with me down the pub say bubble and squeak. ”</p>
    
                                <div className="testimonial__info">
                                    <h4>Jimmy Response</h4>
                                    <span>Support Worker</span>
                                </div>
                            </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial__item text-center swiper-slide">
                            <div className="testimonial__thumb">
                                <img src="assets/img/testimonial/testimonial-3.jpg" alt="img not found"/>
                            </div>
                            <div className="testimonial__content">
                                <p>“ Barmy too sloshed porkiesdo with me down the pub say bubble and squeak. ”</p>
    
                                <div className="testimonial__info">
                                    <h4>Mike Response</h4>
                                    <span>Manager</span>
                                </div>
                            </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial__item text-center swiper-slide">
                            <div className="testimonial__thumb">
                                <img src="assets/img/testimonial/testimonial-3.jpg" alt="img not found"/>
                            </div>
                            <div className="testimonial__content">
                                <p>“ Barmy too sloshed porkiesdo with me down the pub say bubble and squeak. ”</p>
    
                                <div className="testimonial__info">
                                    <h4>Jason Response</h4>
                                    <span>Carer</span>
                                </div>
                            </div>
                            </div>
                        </SwiperSlide>
                        </Swiper>
                     </div>
                  </div>
               </div>
            </div>
         </section>
        );
    }
}

export default Testimonial;