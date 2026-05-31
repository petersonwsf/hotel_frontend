export default function LoadingFeaturedRooms() {
    return (
        <section id="featured-rooms" className="my-[4rem]" aria-label="Featured rooms">
            <h3 className="text-3xl font-semibold font-sans">Quartos em destaque</h3>
            <div className="mt-3 flex justify-between">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="animate-pulse bg-gray-200 w-[250px] h-[250px]"></div>
                ))}
            </div>
        </section>
    )
}