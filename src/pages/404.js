'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Custom404() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(1);

  useEffect(() => {
    // Redirect to /find-auctions-near-me after 1 second
    const timer = setTimeout(() => {
      router.replace("/find-auctions-near-me");
    }, 1000);

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    // Cleanup timers on unmount
    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Page not found. Redirecting to Find Auctions Near Me." />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" role="alert">
        <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
        <p className="mt-4 text-lg text-gray-600">
          Redirecting to <span className="font-medium text-blue-500">Find Auctions Near Me</span> in {countdown}s...
        </p>
      </div>
    </>
  );
}