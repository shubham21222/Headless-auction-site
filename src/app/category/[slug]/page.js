'use client'
import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import keywordsData from "../../../../public/keywords.json"; // Adjust the path
import AuctionSection from "@/components/AuctionSection";
import FetchImages from "@/components/FetchImages";
import CategoryCountry from "@/components/CategoryCountry";
import DynamicKeywordSection from "@/components/DynamicKeywordSection";
import DynamicAuctionInfoSection from "@/components/DynamicAuctionInfoSection";

const CategoryPage = () => {
  const params = useParams();
  const { slug } = params;

  const categoryName = slug.replace("-", " ");
  const allKeywords = useMemo(() => keywordsData[categoryName] || [], [categoryName]);

  const [displayedKeywords, setDisplayedKeywords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedCount, setLoadedCount] = useState(10);

  const [location, setLocation] = useState({
    city: '',
    state: '',
    country: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();

        setLocation({
          city: data.city || 'your city',
          state: data.principalSubdivision || 'your state',
          country: data.countryName || 'your country',
          loading: false,
          error: null
        });
      } catch (error) {
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: 'Location access denied. Please enable location services.'
        }));
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreKeywords();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadMoreKeywords = () => {
    setLoadedCount((prevCount) => Math.min(prevCount + 10, allKeywords.length));
  };

  const displayedKeywordsRef = useRef(displayedKeywords);

  useEffect(() => {
    const filteredKeywords = allKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const newDisplayedKeywords = filteredKeywords.slice(0, loadedCount);

    if (JSON.stringify(displayedKeywordsRef.current) !== JSON.stringify(newDisplayedKeywords)) {
      setDisplayedKeywords(newDisplayedKeywords);
      displayedKeywordsRef.current = newDisplayedKeywords;
    }
  }, [searchTerm, loadedCount, allKeywords]);

  return (
    <>
      <Header2 />
      <div className="p-6 container mx-auto max-w-screen-2xl mt-10">
        <DynamicKeywordSection keyword={slug} country={location.city} />
        <AuctionSection slug={slug} />
      </div>
      <DynamicAuctionInfoSection keyword={slug} country={location.city} />
      <FetchImages slug={slug} />
      <CategoryCountry />
      <Footer />
    </>
  );
};

export default CategoryPage;
