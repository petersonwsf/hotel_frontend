import FeaturedRoomsSlide from "./FeaturedRoomsSlide";
import { getRooms } from "@/lib/api/rooms";

export default async function FeaturedRooms() {

    const rooms = await getRooms({ page: 0, size: 10 })

    return (
        <section id="featured-rooms" className="my-[4rem]" aria-label="Featured rooms">
            <h3 className="text-3xl font-semibold font-sans">Quartos em destaque</h3>
            <div className="mt-3">
                <FeaturedRoomsSlide rooms={rooms.content}/>
            </div>
        </section>
    )
}