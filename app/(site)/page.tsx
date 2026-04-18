import FeaturedRooms from "@/components/home/FeaturedRooms";
import Gallery from "@/components/home/Gallery";
import HeroSection from "@/components/home/HeroSection";
import Location from "@/components/home/Location";
import Offer from "@/components/home/Offer";
import Reviews from "@/components/home/Reviews";


export default function Home() {
  return (
    <>
      <HeroSection/>
      <div className="m-auto w-7xl py-5">
        <FeaturedRooms />
        <Offer />
        <Reviews />
        <Gallery />
        <Location />
      </div>
    </>
  );
}