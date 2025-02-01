"use client";

import { useParams } from "next/navigation";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import FetchImages from "@/components/FetchImages";
import AuctionSection from "@/components/AuctionSection";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;

  const productName = slug.replace("-", " ");

  return (
    <>
      <Header2 />
      <div className="p-6 container mx-auto max-w-screen-2xl mt-[80px]">
        <h1 className="text-3xl font-bold capitalize mb-4">{productName}</h1>
        <AuctionSection slug={productName}/>
        <p className="text-gray-600">
          Display details for the product: <strong>{productName}</strong>.
        </p>
        <p>
          You can fetch product-specific data here (e.g., descriptions, images,
          prices, etc.).
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
