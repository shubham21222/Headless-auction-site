import React from "react";

const AuctionInfoSection = () => {
  return (
    <section className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
        {/* Text Content */}
        <div className="flex-1">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Discover the Best Auction Site for Rare Treasures
          </h1>
          <p className="text-lg leading-relaxed mb-6">
            Are you searching for unique collectibles, rare antiques, or
            one-of-a-kind treasures? Look no further! Our auction platform
            brings together buyers and sellers from around the world to offer
            an exclusive collection of items that you won{''}t find anywhere else.
            Start your journey to uncover exceptional deals and hidden gems
            today.
          </p>
          <h2 className="text-2xl font-semibold mb-4">
            Why Choose Our Auction Platform?
          </h2>
          <p className="text-lg leading-relaxed">
            Whether you{''}re a seasoned collector or a first-time bidder, our
            platform offers a seamless experience with secure transactions,
            real-time bidding, and a diverse selection of categories. Explore
            success stories from our community and join thousands of satisfied
            users.
          </p>
        </div>

        {/* Video Content */}
        <div className="flex-1">
          <div className="relative w-full h-80  rounded-lg overflow-hidden">
            <div
              className="relative w-full h-full bg-cover bg-center rounded-lg"
              style={{
                backgroundImage:
                  "url('https://i.ytimg.com/vi_webp/7Gu00wsXRKg/maxresdefault.webp')",
              }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/7Gu00wsXRKg?rel=0&autoplay=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuctionInfoSection;
