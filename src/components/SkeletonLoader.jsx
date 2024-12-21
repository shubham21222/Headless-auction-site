export default function SkeletonLoader({ height = "h-10", width = "w-full" }) {
    return (
      <div
        className={`animate-pulse bg-gray-200 rounded ${height} ${width}`}
      ></div>
    );
  }
  