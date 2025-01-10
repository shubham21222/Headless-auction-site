'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchImages = ({ slug }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = "auctionnyelizabeth";
  const password = "^s)mBdEeOY$ESrr%)A";
  const wpURL = "https://auction.nyelizabeth.com";

  // Map frontend slugs to possible WordPress category variations
  const categoryMapping = {
    'jewelry-auctions': ['Jewelry', 'jewelry', 'Jewelry Auctions'],
    'antique-auctions': ['Antiques', 'antiques', 'Antique Auctions'],
    'paintings': ['Paintings', 'paintings'],
    'watches': ['Watches', 'watches']
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get JWT token
        const tokenResponse = await axios.post(`${wpURL}/wp-json/jwt-auth/v1/token`, {
          username,
          password,
        });
        const token = tokenResponse.data.token;

        // First try to get the media categories taxonomy if it exists
        let categoryId = null;
        try {
          const taxonomiesResponse = await axios.get(`${wpURL}/wp-json/wp/v2/taxonomies`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Available taxonomies:', taxonomiesResponse.data);
          
          // Check which media category taxonomy is available
          const mediaCategoryEndpoints = [
            'media_category',
            'media-category',
            'category'
          ];

          for (const endpoint of mediaCategoryEndpoints) {
            try {
              const categoriesResponse = await axios.get(`${wpURL}/wp-json/wp/v2/${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              console.log(`Categories from ${endpoint}:`, categoriesResponse.data);
              
              // Try to find matching category
              const possibleNames = categoryMapping[slug] || [slug];
              const category = categoriesResponse.data.find(cat => 
                possibleNames.includes(cat.name) || possibleNames.includes(cat.slug)
              );
              
              if (category) {
                categoryId = category.id;
                break;
              }
            } catch (e) {
              console.log(`Endpoint ${endpoint} not available`);
            }
          }
        } catch (e) {
          console.log('Error fetching taxonomies:', e);
        }

        if (!categoryId) {
          throw new Error(`${slug}`);
        }

        // Fetch media items using the found category ID
        const mediaParams = {
          per_page: 100
        };

        // Try different category parameter names
        const categoryParams = ['media_category', 'media-category', 'categories'];
        let mediaItems = [];

        for (const param of categoryParams) {
          try {
            const mediaResponse = await axios.get(`${wpURL}/wp-json/wp/v2/media`, {
              headers: { Authorization: `Bearer ${token}` },
              params: {
                ...mediaParams,
                [param]: categoryId
              }
            });
            
            if (mediaResponse.data.length > 0) {
              mediaItems = mediaResponse.data;
              break;
            }
          } catch (e) {
            console.log(`Failed to fetch with ${param} parameter`);
          }
        }

        setImages(mediaItems);
        if (mediaItems.length === 0) {
          setError('No images found in this category');
        }

      } catch (err) {
        // console.error('Error details:', err);
        setError(err.message || 'Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchImages();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="bg-white shadow-xl  rounded-lg overflow-hidden hover:shadow-xl transition-duration-300"
        >
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={image.source_url}
              alt={image.alt_text || 'Category image'}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            {/* <h3 className="text-lg font-semibold text-gray-800 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: image.title.rendered }}
            /> */}
            {image.caption?.rendered && (
              <div 
                className="text-sm text-gray-600 mt-2 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: image.caption.rendered }}
              />
            )}
          </div>
        </div>
      ))}
      {images.length === 0 && !error && (
        <div className="col-span-full text-center py-8">
          <p className="text-gray-600">No images available for this category.</p>
        </div>
      )}
    </div>
  );
};

export default FetchImages;