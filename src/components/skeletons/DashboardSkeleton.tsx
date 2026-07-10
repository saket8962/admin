import React from "react";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-secondary rounded-lg" />
        <div className="h-4 w-96 bg-secondary/50 rounded" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-border h-36 flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-secondary rounded-lg" />
              <div className="w-12 h-4 bg-secondary rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-20 h-3 bg-secondary rounded" />
              <div className="w-28 h-6 bg-secondary rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Skeleton */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-secondary rounded" />
            <div className="h-4 w-16 bg-secondary rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex justify-between items-center py-3 border-b border-border/50"
              >
                <div className="w-16 h-4 bg-secondary rounded" />
                <div className="w-24 h-4 bg-secondary rounded" />
                <div className="w-20 h-4 bg-secondary rounded" />
                <div className="w-16 h-4 bg-secondary rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-border p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="h-6 w-28 bg-secondary rounded" />
              <div className="h-4 w-12 bg-secondary rounded" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="w-32 h-4 bg-secondary rounded" />
                    <div className="w-16 h-3 bg-secondary/70 rounded" />
                  </div>
                  <div className="w-12 h-4 bg-secondary rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
