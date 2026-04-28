import FeaturedRooms from "@/components/home/FeaturedRooms/FeaturedRooms";
import Gallery from "@/components/home/Gallery/Gallery";
import HeroSection from "@/components/home/HeroSection";
import Location from "@/components/home/Location";
import Offer from "@/components/home/Offer";
import Reviews from "@/components/home/Reviews/Reviews";
import LoadingFeaturedRooms from "./loadingFeaturedRooms";
import LoadingReviews from "./loadingReviews";
import LoadingGallery from "./loadingGallery";
import { Suspense } from "react";


export default function Home() {
  return (
    <>
      <HeroSection/>
      <div className="m-auto w-7xl py-5">
        <Suspense fallback={<LoadingFeaturedRooms />}>
          <FeaturedRooms />
        </Suspense>
        <Offer />
        <Suspense fallback={<LoadingReviews />}>
          <Reviews />
        </Suspense>
        <Suspense fallback={<LoadingGallery />}>
          <Gallery />
        </Suspense>
        <Location />
      </div>
    </>
  );
}