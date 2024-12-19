"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useParams } from "next/navigation";

const CategoryPage = () => {
  const params = useParams();
  const { slug } = params;

  return (  
    <>
    <Header/>
    <div className="p-6 container mx-auto max-w-screen-2xl">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {slug.replace("-", " ")} Page
      </h1>
      <p>
        This is the category page for <strong>{slug}</strong>. Fetch and display
        category-specific content here.
      </p>
    </div>
    <Footer/>
    </>
  );
};

export default CategoryPage;
