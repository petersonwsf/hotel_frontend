"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CardRoom from "./CardRooms";

export default function FeaturedRooms() {
    return (
        <section id="featured-rooms" aria-label="Featured rooms">
            <h3 className="text-3xl font-semibold font-sans">Quartos em destaque</h3>
            <div className="mt-3">
                <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={4}
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
            </div>
        </section>
    )
}