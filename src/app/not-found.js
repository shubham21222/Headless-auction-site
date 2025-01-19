'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";

export default function NotFound() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/");
  // }, []);

  return (
    <>
    <Header2 />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Error 404 Page Not Found</h1>
      {/* <p className="mt-4 text-lg text-gray-600">
        Redirecting to Home...
      </p> */}
    </div>
    <Footer/>
    </>
  );
}