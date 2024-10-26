// components/PersonalCardSkeleton.tsx
import React from "react";

export function PersonalCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </div>
  );
}
