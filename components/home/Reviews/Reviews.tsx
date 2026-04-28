import ReviewsSlide from "./ReviewsSlide";

export default async function Reviews() {
    return (
        <section id="reviews" className="my-[4rem]" aria-label="Avaliações do hotel">
            <div className="my-5 pointer-events-none">
                <ReviewsSlide />
            </div>
        </section>
    )
}