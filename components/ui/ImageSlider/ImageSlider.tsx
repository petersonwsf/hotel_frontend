"use client";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import Image from "next/image"

export default function ImageSlider() {
    return (
        <div className="w-full h-[400px]">
            <Swiper
                className="w-full h-[400px]"
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                navigation
                loop
                centeredSlides={true}
                autoplay={{ delay: 5000}}
                > 
                    <SwiperSlide>
                        <div className="w-full ">
                            <Image fill src="/images/hotel_model.webp" alt="Imagem"/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="w-full ">
                            <Image fill src="/images/hotel_model_2.webp" alt="Imagem"/>
                        </div>
                    </SwiperSlide>
            </Swiper>
        </div>
    )
}