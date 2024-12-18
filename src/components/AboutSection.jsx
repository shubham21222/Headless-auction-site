'use client'
import React from 'react';
import Image from 'next/image';

const AboutSection = () => {
    return (
        <>
            <section className="w-full bg-white py-16">
                <div className="flex flex-col lg:flex-row items-center max-w-none mx-0 px-0 gap-8">
                    {/* Left Image */}
                    <div className="flex-1">
                        <div className="w-full h-0 pb-[100%] lg:pb-[60%] relative">
                            <Image
                                src="https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-min.webp"
                                alt="Street View"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="absolute inset-0 object-cover rounded-r-full"
                            />
                        </div>
                    </div>
                    {/* Right Content */}
                    <div className="flex-1 px-4 lg:px-8">
                        <h2 className="text-4xl font-bold mb-4 text-center lg:text-left">About AZ Auction</h2>
                        <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>
                        <h3 className="text-2xl font-semibold mb-4 text-center lg:text-left">Est 1956</h3>
                        <p className="text-gray-700 text-base leading-relaxed text-center lg:text-left">
                            NY Elizabeth was established in 1956 as an art gallery, and is now a leading
                            international online auction house with locations worldwide, including the United
                            States, United Kingdom, and Sweden.
                        </p>
                        <p className="text-gray-700 text-base leading-relaxed mt-4 text-center lg:text-left">
                            You can bid live from our app, track, follow, and place absentee and live bids through
                            your mobile phone. Download our app from the bottom of the page and register to bid
                            live.
                        </p>
                    </div>
                </div>
            </section>

            <section className="w-full bg-white py-16">
                <div className="flex flex-col lg:flex-row-reverse items-center max-w-none mx-0 px-0 gap-8">
                    {/* Right Image */}
                    <div className="flex-1">
                        <div className="w-full h-0 pb-[100%] lg:pb-[60%] relative">
                            <Image
                                src="https://beta.nyelizabeth.com/wp-content/uploads/2024/11/Rectangle-23-1-min.webp"
                                alt="Street View"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="absolute inset-0 object-cover rounded-tl-full rounded-bl-full"
                            />
                        </div>
                    </div>
                    {/* Left Content */}
                    <div className="flex-1 px-4 lg:px-8">
                        <h2 className="text-4xl font-bold mb-4 text-center lg:text-left">About AZ Auction</h2>
                        <div className="h-1 w-16 bg-yellow-500 mx-auto lg:mx-0 mb-6"></div>
                        <h3 className="text-2xl font-semibold mb-4 text-center lg:text-left">Est 1956</h3>
                        <p className="text-gray-700 text-base leading-relaxed text-center lg:text-left">
                            NY Elizabeth was established in 1956 as an art gallery, and is now a leading
                            international online auction house with locations worldwide, including the United
                            States, United Kingdom, and Sweden.
                        </p>
                        <p className="text-gray-700 text-base leading-relaxed mt-4 text-center lg:text-left">
                            You can bid live from our app, track, follow, and place absentee and live bids through
                            your mobile phone. Download our app from the bottom of the page and register to bid
                            live.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutSection;