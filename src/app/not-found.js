'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  const HeroSection = () => {
    return (
      <div className="relative w-full h-screen">
        <Image
          src="https://beta.nyelizabeth.com/wp-content/uploads/2024/11/banner-img3_1_11zon.webp"
          alt="Auction Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-6xl md:text-6xl font-bold mb-4">
            404 Page Not Found
          </h1>
          {/* <p className="text-white text-lg md:text-xl">
                   Explore antiques collections , live events and unique treasures
                </p> */}
        </div>
      </div>
    );
  };

  // useEffect(() => {
  //   router.push("/");
  // }, []);

  return (
    <>
      <Header />

      <HeroSection />

      <Footer />
    </>
  );
}