import FeaturedRooms from "@/components/home/FeaturedRooms";
import Offer from "@/components/home/Offer";
import ImageSlider from "@/components/ui/ImageSlider/ImageSlider";

export default function Home() {
  return (
    <>
        <section id="hero-section" aria-label="Destaques do hotel">
          <ImageSlider />
        </section>
        <div className="m-auto w-7xl py-5">
          <FeaturedRooms />
          <Offer />
        </div>
    </>
  );
}
