"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

// WooCommerce API Configuration
const WooCommerceAPI = axios.create({
  baseURL: "https://auction.nyelizabeth.com/wp-json/wc/v3",
  auth: {
    username: "ck_37074d045f3fa4a2752997506f65e0b24729b04e",
    password: "cs_c71086823b1ee0b6d069d4d981108627c948321d",
  },
});

const CountryStatesPage = () => {
  const params = useParams();
  const country = params.slug.toLowerCase().replace("-", " ");
  const router = useRouter();

  const [states, setStates] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
  
        // Fetch states
        const statesResponse = await fetch(`/api/countries?country=${encodeURIComponent(country)}`);
        if (!statesResponse.ok) throw new Error("Failed to fetch states");
        const statesData = await statesResponse.json();
        setStates(statesData);
  
        // Fetch products if United States
        if (country == "united states-auction") {
          try {
            const productsResponse = await WooCommerceAPI.get("/products");
            console.log("Products API Response:", productsResponse.data); // Debug log
            setProducts(productsResponse.data);
          } catch (error) {
            console.error("Error fetching products:", error.message);
          }
        }
      } catch (err) {
        console.error("Error fetching states or products:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [country]);
  

  const handleViewProduct = (slug) => {
    router.push(`..//Products/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-6">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="p-6 container mx-auto max-w-screen-2xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="capitalize text-gray-700">{country}</span>
        </nav>

        {country == "united states-auction" && (
          <>
            <h2 className="text-2xl font-bold mt-8 ">United states Products</h2>
            <div className="h-1 w-16 bg-yellow-500 mx-auto md:mx-0 mb-6"></div>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col border rounded-lg shadow hover:shadow-xl transition h-full group"
                    onClick={() => handleViewProduct(item.slug)}
                  >
                    <div className="w-full h-48 relative overflow-hidden rounded-t-lg">
                      <Image
                        src={item.images?.[0]?.src || "/placeholder.jpg"}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col flex-grow p-4 text-center">
                      <h3 className="text-blue-600 font-medium min-h-[3rem] flex items-center justify-center">
                        {item.name}
                      </h3>
                      <p
                        className="text-gray-800 font-bold text-lg mb-4"
                        dangerouslySetInnerHTML={{ __html: item.price_html }}
                      ></p>
                    </div>
                    <div className="p-4 mt-auto">
                      <button className="btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        View Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">No products found.</p>
            )}
          </>
        )}

        <h1 className="text-3xl font-bold mb-4 capitalize">{country} States</h1>
        <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>

        {states.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {states.map((state, index) => (
              <Link
                key={index}
                href={`/${params.slug}/${state.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="bg-blue-100 p-3 rounded-lg shadow-md hover:bg-blue-200 transition-colors cursor-pointer">
                  {state}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No states found for {country}.</p>
        )}

        {/* Show Products if United States */}
        
      </section>
      <Footer />
    </>
  );
};

export default CountryStatesPage;
