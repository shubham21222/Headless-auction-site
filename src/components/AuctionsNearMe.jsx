import Image from 'next/image';
import Head from 'next/head';
import AuctionsMap from './AuctionsMap';
import AucntionIMg from "../assets/auctions2.webp"

export default function AuctionsNearMe() {
  return (
    <>
      <Head>
        <title>Auctions Near Me | Find Local Auctions</title>
        <meta
          name="description"
          content="Discover auctions near you for great deals on items you need. Browse now!"
        />
        <meta name="keywords" content="auctions near me, local auctions, deals near me" />
      </Head>
      <div className="bg-gray-100 min-h-[500px]">
        <header className="statsSection bg-blue-600 text-white text-center py-6">
          <h1 className="text-4xl font-bold">Auctions Near Me</h1>
          <p className="text-lg mt-2">Discover local auctions and find great deals near you!</p>
        </header>
        <main className="max-w-6xl mx-auto p-6">
          <section className="my-8 text-center">
            <Image
              src={AucntionIMg}
              alt="Auctions Near Me"
              width={800}
              height={400}
              className="mx-auto rounded-lg shadow-md"
            />
            <p className="mt-4 text-gray-700">
              Find auctions happening in your area and bid on items you love!
            </p>
          </section>
          <section className="bg-white shadow-lg rounded-lg p-6 my-6">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <p className="mt-2 text-gray-600">
              Search for auctions near your location and join the bidding war for exciting items.
            </p>
          </section>
          <section className="my-8  pb-[200px]">
            <h3 className="text-xl font-bold">Map of Auctions Near You</h3>
            <div className="h-64 mt-4 bg-gray-200 rounded-lg">
              <AuctionsMap/>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
