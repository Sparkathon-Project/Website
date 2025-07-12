"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ExpandableCard from "@/components/expandable-card";
import { AlertCircle, Package, RefreshCw, Search } from "lucide-react";
import { BounceLoading } from "respinner";

// Wrapper component to use Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <Similar />
    </Suspense>
  );
}

function Similar() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get("ids");
  const ids = idsParam
    ? idsParam.split(",").map((id) => Number(id.trim()))
    : [];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", ids],
    queryFn: () => fetchProductsByIds(ids),
    enabled: ids.length > 0,
  });

  if (ids.length === 0) return <EmptyState />;
  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} refetch={refetch} />;
  if (data?.results?.length === 0) return <NoResultsState refetch={refetch} />;

  return (
    <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <ExpandableCard cards={data.results} />
      </div>
    </main>
  );
}

const EmptyState = () => (
  <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <Search className="mx-auto h-16 w-16 text-gray-400 mb-2" />
      <h2 className="text-2xl font-bold text-gray-900">No Products found</h2>
    </div>
  </main>
);

const LoadingState = () => (
  <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-8">
    <div className="text-center">
      <div className="flex justify-center">
        <BounceLoading gap={3} color="#0071CE" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mt-4">
        Loading Products
      </h2>
      <p className="text-gray-600">Finding similar products for you...</p>
    </div>
  </main>
);

const ErrorState = ({ error, refetch }) => (
  <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-2" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Something Went Wrong
      </h2>
      <p className="text-gray-600 mb-6">
        We encountered an error while loading the products.
      </p>
      <div className="space-y-3">
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        {error.response?.status && (
          <div className="text-sm text-gray-500">
            Error Code: {error.response.status}
          </div>
        )}
      </div>
    </div>
  </main>
);

const NoResultsState = ({ refetch }) => (
  <main className="min-h-[calc(100vh-64px)] flex items-center justify-center p-8">
    <div className="text-center max-w-md">
      <Package className="mx-auto h-16 w-16 text-gray-400 mb-2" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        No Similar Products Found
      </h2>
      <p className="text-gray-600 mb-6">
        We couldn&apos;t find any similar products for the selected item.
      </p>
      <button
        onClick={() => refetch()}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>
    </div>
  </main>
);

async function fetchProductsByIds(ids) {
  try {
    const res = await axios.post("/api/search", { ids });
    return res.data;
  } catch (error) {
    if (error.response) {
      const errorMessage =
        error.response.data?.message || "Server error occurred";
      const enhancedError = new Error(errorMessage);
      enhancedError.response = error.response;
      throw enhancedError;
    } else if (error.request) {
      const networkError = new Error("Network connection failed");
      networkError.code = "NETWORK_ERROR";
      throw networkError;
    } else {
      throw error;
    }
  }
}