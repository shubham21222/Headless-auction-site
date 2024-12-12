import AboutSection from "@/components/AboutSection";
import CarouselComponent from "@/components/Carousel";
import FeaturedPrices from "@/components/FeaturedPrices";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full">
        <CarouselComponent />
      </div>
      <div>
        <FeaturedPrices/>
      </div>
      <div className="w-full">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
}