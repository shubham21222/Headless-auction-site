'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Apollo Client Setup
const client = new ApolloClient({
  uri: 'https://auction.nyelizabeth.com/?graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

const FEATURED_PRODUCTS_QUERY = gql`
  query NewQuery {
  products(first: 10) {
    found
    edges {
      cursor
      node {
        id
        name
        image {
          sourceUrl
          altText
        }
        onSale
        ... on UnsupportedProduct {
          id
          name
          price
        }
        ... on ExternalProduct {
          id
          name
          price
        }
        description
        ... on SimpleProductVariation {
          id
          name
          price
        }
        ... on SimpleProduct {
          id
          name
          price
        }
      }
    }
  }
}
`;

const FeaturedPrices = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await client.query({
          query: FEATURED_PRODUCTS_QUERY,
        });

        // Extract the product nodes from the GraphQL response
        const items = data.products.edges.map((edge) => edge.node);
        setFeaturedItems(items);
      } catch (error) {
        console.error('Error fetching GraphQL products:', error);
        setFeaturedItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Featured Prices Realized</h2>
          <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>
        </div>
        <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredItems.map((item) => (
          <div key={item.id} className="border rounded shadow hover:shadow-xl transition">
            <div className="w-full h-48 relative">
              <Image
                src={item.image?.sourceUrl || '/placeholder.jpg'}
                alt={item.image?.altText || item.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-blue-600 font-medium">{item.name}</h3>
              <p className="text-gray-800 font-bold text-lg">
                {item.price || 'Price Not Available'}
              </p>
            </div>
            <div className="p-4">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Upcoming Auctions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPrices;
