import FeaturedRoomsSlide from "./FeaturedRoomsSlide";

export default async function FeaturedRooms() {
    return (
        <section id="featured-rooms" className="my-[4rem]" aria-label="Featured rooms">
            <h3 className="text-3xl font-semibold font-sans">Quartos em destaque</h3>
            <div className="mt-3">
                <FeaturedRoomsSlide />
            </div>
        </section>
    )
}