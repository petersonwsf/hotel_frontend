"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CardRoom from "../../ui/CardRoomSlide";

export default function FeaturedRoomsSlide() {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={4}
            speed={1000}
            navigation
            loop
            centeredSlides={true}
        >
            {Array.from({ length: 10 }).map((_, index) => (
                <SwiperSlide key={index}>
                    <CardRoom />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}