// src/app/components/SellLoadingUi.tsx
import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@/app/components";

export const SellLoadingUi = () => {
  return (
    <section className="flex h-screen-header">
      <div className="w-3/4 flex flex-wrap gap-4 p-4 overflow-scroll">
        {/* Skeletons para productos */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-40 h-28 flex">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </div>
        ))}
      </div>
      <div className="w-1/4 bg-white flex flex-col justify-between p-2">
        <div>
          <h2 className="text-xl font-bold mb-4">
            <Skeleton width="50%" />
          </h2>
          <div className="h-[calc(100vh-14rem)] overflow-auto">
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
          </div>
          <div className="mt-4">
            <Skeleton variant="text" width="30%" height={30} />
            <Button className="w-full h-10 mt-2" disabled>
              <Skeleton variant="text" width="100%" height={30} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
