'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        Redirecting to Home...
      </p>
    </div>
  );
}