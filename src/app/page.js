import AboutSection from "@/components/AboutSection";
import AuctionNearmeBtn from "@/components/AuctionNearmeBtn";
import AuctionsNearMe from "@/components/AuctionsNearMe";
import CarouselComponent from "@/components/Carousel";
import CategoryCountry from "@/components/CategoryCountry";
import CategoryList from "@/components/CategoryList";
import FeaturedPrices from "@/components/FeaturedPrices";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageShowcase from "@/components/ImageShowcase";
import NewsletterForm from "@/components/NewsletterForm";
import PartnersSection from "@/components/PartnersSection";
import StatsSection from "@/components/StatsSection";
import TrendingBrands from "@/components/TrendingBrands";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full">
        <CarouselComponent />
      </div>
      <AuctionNearmeBtn/>
      {/* <AuctionsNearMe/> */}

    <ImageShowcase/>

      <div>
        {/* <FeaturedPrices/> */}
      </div>
      <CategoryCountry/>
      <CategoryList/>
      <div className="w-full">
        <AboutSection />
      </div>
      <StatsSection/>
      <TrendingBrands/>
      <PartnersSection/>
      <NewsletterForm/>
      <Footer />
    </>
  );
}