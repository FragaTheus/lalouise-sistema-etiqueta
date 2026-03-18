"use client";

import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function ListLoadingSkeleton() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 pt-10 lg:pt-4 max-w-screen mt-10 lg:mt-0">
      <div className="max-h-min w-full min-w-xs gap-2 flex flex-col pt-4 max-w-sm lg:max-w-7xl">
        <Skeleton className="h-9 w-20 bg-gray-200" />

        <Card className="p-6">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-9 w-40 bg-gray-200" />
              <Skeleton className="h-9 w-24 bg-gray-200" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-48 flex-1 max-w-xs bg-gray-200" />
              <Skeleton className="h-9 w-32 bg-gray-200" />
            </div>
          </div>

          <div className="border-b pb-4 mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <Skeleton className="h-5 w-20 bg-gray-200" />
              <Skeleton className="h-5 w-20 bg-gray-200" />
              <Skeleton className="h-5 w-20 bg-gray-200" />
              <Skeleton className="h-5 w-20 bg-gray-200" />
            </div>
          </div>

          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-4 gap-4 py-4 border-b last:border-b-0"
              >
                <Skeleton className="h-5 w-32 bg-gray-200" />
                <Skeleton className="h-5 w-40 bg-gray-200" />
                <Skeleton className="h-5 w-24 bg-gray-200" />
                <Skeleton className="h-5 w-24 bg-gray-200" />
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t">
            <Skeleton className="h-5 w-40 bg-gray-200" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-9 bg-gray-200" />
              <Skeleton className="h-9 w-9 bg-gray-200" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function ItemInfoLoadingSkeleton() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 max-w-screen">
      <div className="w-full lg:max-w-7xl flex flex-col gap-2 max-w-xs mt-10 lg:mt-0">
        <Skeleton className="h-9 w-20 bg-gray-200" />

        <Card className="border shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg bg-gray-200" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-7 w-48 bg-gray-200" />
                <Skeleton className="h-4 w-32 bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-16 bg-gray-200" />
                  <Skeleton className="h-5 w-40 bg-gray-200" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-16 bg-gray-200" />
                  <Skeleton className="h-6 w-24 rounded-full bg-gray-200" />
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <Skeleton className="h-5 w-40 bg-gray-200 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-28 bg-gray-200" />
                    <Skeleton className="h-5 w-36 bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
