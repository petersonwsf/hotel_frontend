"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CardRoom from "../../ui/CardRoomSlide";
import { Room } from "@/types/Room.types";

interface FeaturedRoomsSlideProps {
    rooms: Room[]
}

export default function FeaturedRoomsSlide({ rooms } : FeaturedRoomsSlideProps) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={4}
            speed={1000}
            navigation
            loop
            centeredSlides={true}
        >
            {rooms.map((room) => (
                <SwiperSlide key={room.id}>
                    <CardRoom room={room}/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}