import Footer from '@/components/Footer';
import Header2 from '@/components/Header2';
import React from 'react';

const page = () => {
    return (
        <>
            <Header2 />
            <div className="flex justify-center mt-[50px] w-full px-4 md:px-8 lg:px-16">
                {/* Add flex container to center the max-w-2xl div */}
                <div className="w-full max-w-screen-2xl px-4 my-8 mx-auto ">
                    <div className="py-10">
                        <h1 className="text-2xl md:text-4xl font-bold text-center text-black">
                            Terms & Privacy Policy
                        </h1>
                        <div className="border-t-2 border-black my-4"></div>
                        <p className="text-sm md:text-base text-gray-600 text-center mb-6">
                            Last Updated: 30 December, 2024
                        </p>
                        <div className="space-y-6">
                            <section>
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                                    TERMS AND CONDITIONS
                                </h2>
                                <p className="text-sm md:text-base text-gray-700 mt-2">
                                    This website is operated by NY Elizabeth, (hereinafter,{' '}
                                    <strong>“NY Elizabeth Auction”</strong> <strong>“We”</strong>, or{' '}
                                    <strong>“Us”</strong>). These terms of service (the <strong>“Terms”</strong>) govern
                                    your access to the NY Elizabeth Auction website (
                                    <a
                                        href="https://nyelizabeth.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-500 underline"
                                    >
                                        https://nyelizabeth.com/
                                    </a>
                                    ), and any other services owned, controlled, or offered by NY Elizabeth Auction, now
                                    or in the future (all collectively referred to as, the <strong>“Services”</strong>).
                                    The term <strong>“You”</strong> or <strong>“Bidder”</strong> shall refer to any
                                    individual that views, uses, accesses, browses, or submits any bids through the
                                    Services.
                                </p>
                            </section>
                            <section>
                                <p className="text-sm md:text-base text-gray-700">
                                    These Terms are important and affect your legal rights, so please read them
                                    carefully. Note that these Terms contain a{' '}
                                    <strong>mandatory arbitration provision</strong> that requires the use of
                                    arbitration on an individual basis and limits the remedies available to you in the
                                    event of certain disputes.
                                </p>
                            </section>
                            <section>
                                <p className="text-sm md:text-base text-gray-700">
                                    The Services are offered to you conditioned on your acceptance without modification of Terms contained herein. Certain features, services or tools of the Services may be subject to additional guidelines, terms, or rules, which will be posted with those features and are a part of these Terms. Your use of the Services constitutes your agreement to all such Terms. Please read these terms carefully.
                                </p>
                            </section>
                            <section>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                            1. USE OF THE SERVICES
                                </h2>
                                <p className="text-sm md:text-base text-gray-700">
                                Subject to your compliance with its obligations under these Terms, we will provide you with access to the Services. Access to the Services is permitted on a temporary basis, and we reserve the right to withdraw or amend the service we provide without notice. We will not be liable if for any reason our Services are unavailable at any time or for any period. We shall use commercially reasonable efforts to ensure the availability of the Services, except that we shall not be liable for: (a) scheduled downtime; or (b) any unavailability caused directly or indirectly by circumstances beyond our reasonable control, including without limitation, (i) a force majeure event; (ii) Internet host, webhosting, cloud computing platform, or public telecommunications network failures or delays, or denial of service attacks; (iii) a fault or failure of your computer systems or networks; or (iv) any breach by of these Terms by you. 
                                </p>
                                <p className='text-sm md:text-base text-gray-700 mt-3'>
                                You must be eighteen (18) years or over in order to use the Services. 
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default page;
