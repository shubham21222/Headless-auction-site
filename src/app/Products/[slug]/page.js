'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const WooCommerceAPI = axios.create({
  baseURL: 'https://auction.nyelizabeth.com/wp-json/wc/v3',
  auth: {
    username: 'ck_37074d045f3fa4a2752997506f65e0b24729b04e',
    password: 'cs_c71086823b1ee0b6d069d4d981108627c948321d',
  },
});

const ProductPage = () => {
  const params = useParams();
  const slug = params?.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        const response = await WooCommerceAPI.get('/products', {
          params: { slug },
        });

        if (response.data.length > 0) {
          setProduct(response.data[0]);
        } else {
          setError('Product not found.');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('An error occurred while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return (
    <>
      {/* Header and Footer are rendered immediately */}
      <Header />

      <div className="container mx-auto py-8 px-4">
        {loading ? (
          // Skeleton Loader for Product Section
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <div className="animate-pulse rounded-lg bg-gray-300 h-[500px] w-full"></div>
              <div className="flex mt-4 space-x-2">
                {[1, 2, 3].map((_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-lg bg-gray-300 w-24 h-24"
                  ></div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="animate-pulse h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="animate-pulse h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="animate-pulse h-24 bg-gray-300 rounded w-full"></div>
              <div className="space-y-4">
                <div className="animate-pulse h-12 bg-blue-300 rounded w-full"></div>
                <div className="animate-pulse h-12 bg-blue-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          // Error Handling
          <div className="flex justify-center items-center h-screen text-red-500">
            Error: {error}
          </div>
        ) : (
          // Product Content
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <Image
                src={product.images?.[0]?.src || '/placeholder.jpg'}
                alt={product.name}
                width={500}
                height={500}
                className="rounded-lg object-cover"
              />
              {product.images && product.images.length > 1 && (
                <div className="flex mt-4 space-x-2">
                  {product.images.slice(1, 4).map((img, index) => (
                    <Image
                      key={index}
                      src={img.src}
                      alt={`Product image ${index + 2}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover w-24 h-24"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div
                className="text-lg font-medium text-gray-800 mb-6"
                dangerouslySetInnerHTML={{ __html: product.price_html }}
              ></div>
              <div
                className="text-gray-700 mb-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <div className="space-y-4">
                <button className="btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Add to Cart
                </button>
                <button className="w-full border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-600 hover:text-white transition">
                  View Auctions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ProductPage;
