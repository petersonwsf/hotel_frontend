import GallerySlide from "./GallerySlide";

export default async function Gallery() {
    return (
        <section id="gallery" className="my-[4rem]" aria-label="Galeria de fotos">
            <h3 className="text-3xl font-semibold font-sans">Fotos</h3>
            <div className="my-2">
                <GallerySlide />
            </div>
        </section>
    )
}