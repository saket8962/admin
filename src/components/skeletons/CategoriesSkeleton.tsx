import React from "react";

export default function CategoriesSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-secondary rounded-lg" />
          <div className="h-4 w-96 bg-secondary/50 rounded" />
        </div>
        <div className="h-10 w-40 bg-secondary rounded-xl" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-border h-28 flex flex-col justify-between"
          >
            <div className="w-10 h-10 bg-secondary rounded-lg" />
            <div className="w-24 h-4 bg-secondary rounded" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
        <div className="h-10 w-80 bg-secondary rounded-lg" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b border-border/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary rounded-lg" />
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-secondary rounded" />
                  <div className="w-16 h-3 bg-secondary/70 rounded" />
                </div>
              </div>
              <div className="w-16 h-4 bg-secondary rounded" />
              <div className="w-20 h-4 bg-secondary rounded" />
              <div className="w-20 h-4 bg-secondary rounded" />
              <div className="w-16 h-4 bg-secondary rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
