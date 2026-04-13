"use client";
import Image from "next/image";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Gallery() {
    return (
        <section id="gallery" className="my-[4rem]" aria-label="Galeria de fotos">
            <h3 className="text-3xl font-semibold font-sans">Fotos</h3>
            <div className="my-2">
                <Swiper
                modules={[Autoplay, FreeMode]}
                slidesPerView={3}
                speed={2000}
                loop
                autoplay={{delay: 0}}
                >
                    {Array.from({ length: 20 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-[400px] h-[300px] rounded-[5px] overflow-hidden">
                                <Image width={400} height={300} src="/images/hotel_model_3.jpg" alt="Image" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}