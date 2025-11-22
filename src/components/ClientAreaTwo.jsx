import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, EffectFade, Autoplay } from "swiper";
const ClientAreaTwo = () => {
  return (
    <div
      className="client-bg-area-2"
      style={{ 
        backgroundImage: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        position: "relative"
      }}
    >      <div className="client-area-2 space text-center">
        <div className="container">
          <div className="title-area mb-50">
            <span className="sub-title text-white">TRUSTED BY LEADING AUTOMOTIVE BRANDS</span>
            <h2 className="sec-title text-white">Our Trusted Partners</h2>
          </div>
          <div className="row global-carousel">
            <Swiper
              loop={true}
              spaceBetween={30}
              slidesPerGroup={1}
              speed={1000}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="mySwiper"
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                992: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                },
                1400: {
                  slidesPerView: 6,
                },
              }}
            >
              <SwiperSlide>
                <div>
                  <div className="client-logo" style={{ filter: 'brightness(0) invert(1)', opacity: '0.8' }}>
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2021/03/BMW-Logo.png" 
                      alt="BMW" 
                      style={{ height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="client-logo" style={{ filter: 'brightness(0) invert(1)', opacity: '0.8' }}>
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2021/03/Audi-Logo.png" 
                      alt="Audi" 
                      style={{ height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="client-logo" style={{ filter: 'brightness(0) invert(1)', opacity: '0.8' }}>
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2021/03/Mercedes-Benz-Logo.png" 
                      alt="Mercedes-Benz" 
                      style={{ height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="client-logo" style={{ filter: 'brightness(0) invert(1)', opacity: '0.8' }}>
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2021/03/Toyota-Logo.png" 
                      alt="Toyota" 
                      style={{ height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="client-logo" style={{ filter: 'brightness(0) invert(1)', opacity: '0.8' }}>
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2021/03/Honda-Logo.png" 
                      alt="Honda" 
                      style={{ height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="client-logo" style={{ filter: 'brightness(0) invert(1)', opacity: '0.8' }}>
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2021/03/Nissan-Logo.png" 
                      alt="Ford" 
                      style={{ height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="client-logo" style={{ filter: 'brightness(0) invert(1)', opacity: '0.8' }}>
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2020/09/Volkswagen-Logo.png" 
                      alt="Volkswagen" 
                      style={{ height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div>
                  <div className="client-logo" style={{ filter: 'brightness(0) invert(1)', opacity: '0.8' }}>
                    <img 
                      src="https://logos-world.net/wp-content/uploads/2020/09/Nissan-Logo.png" 
                      alt="Nissan" 
                      style={{ height: '60px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>      {/*==============================
    Testimonial Area  
    ==============================*/}
      <div className="testimonial-area-2 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0066CC 0%, #004a8d 100%)' }}>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-lg-7">
              <div className="testiomonial-wrap-2 bg-title">
                <div className="title-area">
                  <span className="sub-title">CUSTOMER REVIEWS</span>
                  <h2 className="sec-title text-white">WHAT OUR CUSTOMERS SAY</h2>
                </div>
                <div className="quote-icon">
                  <img src="assets/img/icon/quote2-1.svg" alt="Quote" />
                </div>
                <div className="row global-carousel testi-slider-2">
                  <Swiper
                    loop={true}
                    navigation={{
                      nextEl: ".testimonial_R-button-next",
                      prevEl: ".testimonial_R-button-prev",
                    }}
                    spaceBetween={20}
                    slidesPerGroup={1}
                    speed={1000}
                    pagination={{ clickable: true }}                    autoplay={{ delay: 6000 }}
                    modules={[FreeMode, Navigation, Thumbs, EffectFade, Autoplay]}
                    className="mySwiper"
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 1,
                      },
                      992: {
                        slidesPerView: 1,
                      },
                      1200: {
                        slidesPerView: 1,
                      },
                      1400: {
                        slidesPerView: 1,
                      },
                    }}
                  >
                    <SwiperSlide>
                      <div>                        <div className="testi-card style2">
                          <div className="testi-card_content">
                            <div className="testi-card-profile">
                              <div className="testi-card-profile-details">
                                <h4 className="testi-profile-title">
                                  Mike Johnson
                                </h4>
                                <span className="testi-profile-desig">
                                  Car Dealer
                                </span>
                              </div>
                            </div>
                            <p className="testi-card_text">
                              &quot;The VIN inspection report was incredibly detailed and helped me make an informed decision about purchasing my used car. The service was fast and professional!&quot;
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div>                        <div className="testi-card style2">
                          <div className="testi-card_content">
                            <div className="testi-card-profile">
                              <div className="testi-card-profile-details">
                                <h4 className="testi-profile-title">
                                  Sarah Williams
                                </h4>
                                <span className="testi-profile-desig">
                                  First-time Car Buyer
                                </span>
                              </div>
                            </div>
                            <p className="testi-card_text">
                              &quot;As a first-time car buyer, this VIN check service gave me peace of mind. The report revealed important history that wasn&apos;t disclosed by the seller. Highly recommend!&quot;
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div>                        <div className="testi-card style2">
                          <div className="testi-card_content">
                            <div className="testi-card-profile">
                              <div className="testi-card-profile-details">
                                <h4 className="testi-profile-title">
                                  David Rodriguez
                                </h4>
                                <span className="testi-profile-desig">
                                  Automotive Mechanic
                                </span>
                              </div>
                            </div>
                            <p className="testi-card_text">
                              &quot;I use this service for all my customers who are buying used vehicles. The comprehensive reports help identify potential issues before purchase. Excellent accuracy!&quot;
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div>                        <div className="testi-card style2">
                          <div className="testi-card_content">
                            <div className="testi-card-profile">
                              <div className="testi-card-profile-details">
                                <h4 className="testi-profile-title">
                                  Lisa Chen
                                </h4>
                                <span className="testi-profile-desig">
                                  Insurance Agent
                                </span>
                              </div>
                            </div>
                            <p className="testi-card_text">
                              &quot;The detailed vehicle history reports from this service are invaluable for my insurance assessments. Fast turnaround time and accurate information every time.&quot;
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="icon-box">
                  <button className="slick-arrow style3 default testimonial_R-button-prev">
                    <i className="fas fa-arrow-left" />
                  </button>
                  <button className="slick-arrow style3 default testimonial_R-button-next">
                    <i className="fas fa-arrow-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-thumb-2">
          <img
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            alt="Car Inspection"
            style={{ borderRadius: '10px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientAreaTwo;
