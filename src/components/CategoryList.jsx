import Link from "next/link";

const categories = [
  { name: "Antique Auctions", slug: "antique-auctions" },
  { name: "Coin & Currency", slug: "coin-currency" }, 
  { name: "Jewelry", slug: "jewelry-auctions" },
  { name: "Toy Auctions", slug: "toy-auctions" },
  { name: "brand watches", slug: "brand-watches" },
  { name: "paintings", slug: "paintings" },
  { name: "decorative art", slug: "decorative-art" },
  { name: "islamic art", slug: "islamic-art" },
  { name: "ancient art", slug: "ancient-art" },
  { name: "designer hand bags", slug: "designer-hand-bags" },
  { name: "diamonds", slug: "diamonds" },
  { name: "gold coins", slug: "gold-coins" },
  { name: "gold bars", slug: "gold-bars" },

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
