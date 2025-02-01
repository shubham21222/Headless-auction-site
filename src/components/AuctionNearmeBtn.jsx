import Link from 'next/link'
import React from 'react'

const AuctionNearmeBtn = () => {
    return (
        <Link href="find-auctions-near-me">
        <section className="py-10 px-4 container mx-auto max-w-screen-2xl cursor-pointer">
            <div className="text-start mb-6">
                <h2 className="text-3xl font-bold">Auctions Near Me</h2>
                <div className="w-16 h-1 bg-yellow-500 mt-2"></div>
            </div>

            <div className="text-center mt-6">
                <button className="btn bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
                    Auctions Near me
                </button>
            </div>
        </section>
        </Link>
    )
}

export default AuctionNearmeBtn










