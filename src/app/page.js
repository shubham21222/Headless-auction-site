import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import CarouselComponent from "@/components/Carousel";
import AuctionNearmeBtn from "@/components/AuctionNearmeBtn";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import NewsletterForm from "@/components/NewsletterForm";
import Footer from "@/components/Footer";
import CategoryList from '@/components/CategoryList';
import MidSection from '@/components/MidSection';
import CommunitySection from '@/components/CommunitySection';
import PaintingsGallery from '@/components/PaintingsGallery';
import PaintingsCategory from '@/components/PaintingsGallery';

// Lazy Load Components with Skeleton Loading
const TrendingBrands = dynamic(() => import('@/components/TrendingBrands'), {
  loading: () => (
    <div className="space-y-4">
      <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
      <div className="animate-pulse bg-gray-200 h-8 w-48 rounded mt-2"></div>
    </div>
  ),
});

const PartnersSection = dynamic(() => import('@/components/PartnersSection'), {
  loading: () => (
    <div className="space-y-4">
      <div className="animate-pulse bg-gray-200 h-16 rounded"></div>
      <div className="animate-pulse bg-gray-200 h-16 rounded"></div>
    </div>
  ),
});

const CategoryCountry = dynamic(() => import('@/components/CategoryCountry'), {
  loading: () => (
    <div className="space-y-2">
      <div className="animate-pulse bg-gray-200 h-12 rounded"></div>
      <div className="animate-pulse bg-gray-200 h-8 w-3/4 rounded"></div>
    </div>
  ),
});



export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full">
        <CarouselComponent />
      </div>

      <CommunitySection/>
      

      <div className="w-full">
        <AboutSection />
      </div>

      <CategoryList />

      <StatsSection />
      <TrendingBrands />
      <CategoryCountry />
      <PartnersSection />
      
      <NewsletterForm />
      <Footer />
    </>
  );
}
