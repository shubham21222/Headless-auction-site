"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import keywordsData from "../../../../public/keywords.json"; // Adjust the path
import AuctionSection from "@/components/AuctionSection";
import FetchImages from "@/components/FetchImages";
import CategoryCountry from "@/components/CategoryCountry";

const CategoryPage = () => {
  const params = useParams();
  const { slug } = params;

  const categoryName = slug.replace("-", " ");
  const allKeywords = keywordsData[categoryName] || [];

  // State for managing keywords, search, and loading
  const [displayedKeywords, setDisplayedKeywords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadedCount, setLoadedCount] = useState(10); // Number of keywords to load initially

  // Load more keywords on scroll
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
  }, [loadedCount]);

  const loadMoreKeywords = () => {
    setLoadedCount((prevCount) => Math.min(prevCount + 10, allKeywords.length));
  };

  useEffect(() => {
    const filteredKeywords = allKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedKeywords(filteredKeywords.slice(0, loadedCount));
  }, [searchTerm, loadedCount, allKeywords]);

  return (
    <>
      <Header2 />
      <div className="p-6 container mx-auto max-w-screen-2xl mt-10">
      {/* <DynamicAboutSection country={country} /> */}

        <AuctionSection slug={slug} />
        

        {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {displayedKeywords.length > 0 ? (
            displayedKeywords.map((keyword) => (
              <Link
                key={keyword}
                href={`/category/${keyword.replace(/\s+/g, "-").toLowerCase()}`}
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors duration-300 shadow-xl hover:underline max-w-52 w-full py-3 text-center"
              >
                {keyword}
              </Link>
            ))
          ) : (
            <p className="col-span-full text-gray-600">
              No keywords found matching your search.
            </p>
          )}
        </div> */}

        <FetchImages slug={slug} />
      </div>
      <CategoryCountry />

      <Footer />
    </>
  );
};

export default CategoryPage;
