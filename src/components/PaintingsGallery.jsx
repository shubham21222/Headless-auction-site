'use client'
import { useEffect, useState } from "react";

const PaintingsGallery = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaintings = async () => {
    try {
      // First get the nonce by making a request to wp-admin
      const loginResponse = await fetch("https://auction.nyelizabeth.com/wp-login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          log: "auctionnyelizabeth",
          pwd: "^s)mBdEeOY$ESrr%)A",
          "wp-submit": "Log In",
          redirect_to: "wp-admin"
        }),
        credentials: 'include' // This is important for cookies
      });
  
      // Then use the cookie session for GraphQL query
      const response = await fetch("https://auction.nyelizabeth.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', 
        body: JSON.stringify({
          query: `
            query MyQuery {
              categories {
                name
                ... on GenericCategory {
                  customPosts {
                    ... on GenericCustomPost {
                      id
                    }
                  }
                }
              }
              myMediaItems {
                id
                title
                src
                altText
                url
                dateStr
                mimeType
                height
                width
              }
            }
          `
        }),
      });
  
      const { data, errors } = await response.json();
      // Rest of your code...
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-32">
      <div className="text-lg">Loading paintings...</div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 p-4 border border-red-300 rounded">
      Error: {error}
    </div>
  );

  if (!paintings.length) return (
    <div className="text-gray-500 p-4">
      No paintings found.
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {paintings.map((painting) => (
        <div key={painting.id} className="border rounded-lg shadow-md overflow-hidden">
          <div className="aspect-w-1 aspect-h-1">
            <a 
              href={painting.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src={painting.src}
                alt={painting.altText || painting.title}
                className="w-full h-64 object-cover"
              />
            </a>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-center mb-2">
              {painting.title}
            </h3>
            <p className="text-sm text-gray-500 text-center">
              {painting.dateStr}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaintingsGallery;