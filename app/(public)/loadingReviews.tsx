export default function LoadingReviews() {
    return (
        <section id="reviews" className="my-[4rem]" aria-label="Avaliações do hotel">
            <div className="my-5 pointer-events-none flex justify-between">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-[300px] h-[300px] bg-gray-200 animate-pulse"></div>
                ))}
            </div>
        </section>
    )
}