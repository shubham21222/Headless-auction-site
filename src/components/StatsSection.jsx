import React from "react";
import Image from "next/image";

const stats = [
  {
    icon: "https://beta.nyelizabeth.com/wp-content/uploads/2024/03/bar-chart-1-Traced.png",
    value: "14,000+",
    label: "Active Bidders",
  },
  {
    icon: "https://beta.nyelizabeth.com/wp-content/uploads/2024/03/Frame-18.png",
    value: "18+",
    label: "Countries",
  },
  {
    icon: "https://beta.nyelizabeth.com/wp-content/uploads/2024/03/Frame-20.png",
    value: "$1b",
    label: "In Bids",
  },
  {
    icon: "https://beta.nyelizabeth.com/wp-content/uploads/2024/03/Frame-2.png",
    value: "600+",
    label: "Auctions",
  },
];

const StatsSection = () => {
  return (
    <section className="statsSection2 bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 mb-12 mt-12 container mx-auto max-w-screen-2xl px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-4">
              <Image
                src={stat.icon}
                alt={stat.label}
                fill
                sizes="(max-width: 768px) 100vw, 
                       (max-width: 1200px) 50vw, 
                       25vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <h3 className="text-3xl font-semibold">{stat.value}</h3>
            <p className="text-xl mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
