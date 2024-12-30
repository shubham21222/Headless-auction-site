import Link from "next/link";

const categories = [
  { name: "Antique Auctions", slug: "antique-auctions" },
  { name: "Automobile Auction", slug: "automobile-auction" },
  { name: "Coin & Currency", slug: "coin-currency" },
  { name: "Commercial Auctions", slug: "commercial-auctions" },
  { name: "Doll Auctions", slug: "doll-auctions" },
  { name: "Ephemera Auctions", slug: "ephemera-auctions" },
  { name: "Farm Auctions", slug: "farm-auctions" },
  { name: "Guns & Weaponry", slug: "guns-weaponry" },
  { name: "Heavy Equipment", slug: "heavy-equipment" },
  { name: "Hummel Auctions", slug: "hummel-auctions" },
  { name: "Jewelry Auctions", slug: "jewelry-auctions" },
  { name: "Liquidation Auctions", slug: "liquidation-auctions" },
  { name: "Militaria Auctions", slug: "militaria-auctions" },
  { name: "Real Estate Auctions", slug: "real-estate-auctions" },
  { name: "Restaurant Equipment", slug: "restaurant-equipment" },
  { name: "Sports Memorabilia", slug: "sports-memorabilia" },
  { name: "Storage Unit Auctions", slug: "storage-unit-auctions" },
  { name: "Toy Auctions", slug: "toy-auctions" },
  { name: "Train Auctions", slug: "train-auctions" },
  { name: "Vintage Clothing", slug: "vintage-clothing" },
];

const CategoryList = () => {
  return (
    <section className="p-6 container mx-auto max-w-screen-2xl">
      <h2 className="font-bold text-2xl mb-4">Category</h2>
      <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className=" bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-colors duration-300 shadow-xl hover:shadow-xl hover:underline max-w-52 w-full py-3 rounded-full  text-white block text-center mb-2"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
