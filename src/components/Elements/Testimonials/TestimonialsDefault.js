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
            <section className="testimonial__area testimonial__overlay pt-175 pb-170" style={{ backgroundImage:`url(${'assets/img/testimonial/testimonial.webp'})`}}>
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
                                <img src="assets/img/testimonial/test-1.webp" alt="img not found"/>
                            </div>
                            <div className="testimonial__content">
                                <p>“ Thank you, Learn for Care, for imparting education and fostering a sense of purpose and a deeper connection with the art of caregiving. 
                                    These courses have forever changed the way I approach my vocation, and I am profoundly grateful. ”</p>
    
                                <div className="testimonial__info">
                                    <h4>Emily M</h4>
                                    <span>Healthcare Professional</span>
                                </div>
                            </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="testimonial__item text-center swiper-slide">
                            <div className="testimonial__thumb">
                                <img src="assets/img/testimonial/test-3.jpg" alt="img not found"/>
                            </div>
                            <div className="testimonial__content">
                                <p>“ Thank you, Learn for Care, for imparting education and fostering a sense of purpose and a deeper connection with the art of caregiving.
                                     These courses have forever changed the way I approach my vocation, and I am profoundly grateful. ”</p>
    
                                <div className="testimonial__info">
                                    <h4>Emily M</h4>
                                    <span>Healthcare Professional </span>
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
                                <p>“ Thank you, Learn for Care, for imparting education and fostering a sense of purpose and a deeper connection with the art of caregiving.
                                     These courses have forever changed the way I approach my vocation, and I am profoundly grateful. ”</p>
    
                                <div className="testimonial__info">
                                    <h4>Emily M</h4>
                                    <span>Healthcare Professional </span>
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