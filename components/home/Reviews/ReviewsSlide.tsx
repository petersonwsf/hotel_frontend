"use client";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Review from "../../ui/Review";

import 'swiper/css';
import 'swiper/css/free-mode';

export default function ReviewsSlide() {
    return (
        <Swiper
            modules={[Autoplay, FreeMode]}
            slidesPerView={3}
            loop
            freeMode
            spaceBetween={20}
            speed={5000}
            centeredSlides={true}
            autoplay={{
                delay: 0,
                disableOnInteraction: false
            }}
            allowTouchMove={false}
            className="swiper-reviews"
        >
            {Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={index}>
                    <Review />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}