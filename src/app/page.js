import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
}
