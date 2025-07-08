"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ExpandableCard from "@/components/expandable-card";
import { AlertCircle, Package, RefreshCw, Search } from "lucide-react";
import { BounceLoading } from "respinner";

export default function Similar() {
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

    // No IDs provided - show empty state
    if (ids.length === 0) {
        return (
            <main
                style={{
                    minHeight: "calc(100vh - 64px)"
                }}
                className="flex items-center justify-center p-8"
            >
                <div className="text-center max-w-md">
                    <div className="mb-2">
                        <Search className="mx-auto h-16 w-16 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        No Products found
                    </h2>
                </div>
            </main>
        );
    }

    // Loading state
    if (isLoading) {
        return (
            <main
                style={{
                    minHeight: "calc(100vh - 64px)"
                }}
                className="flex items-center justify-center p-8"
            >
                <div className="text-center">
                    <div className="flex justify-center">
                        <BounceLoading gap={3} color="@0071CE" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Loading Products
                    </h2>
                    <p className="text-gray-600">
                        Finding similar products for you...
                    </p>
                </div>
            </main>
        );
    }

    // Error state
    if (error) {
        return (
            <main
                style={{
                    minHeight: "calc(100vh - 64px)"
                }}
                className="flex items-center justify-center p-8"
            >
                <div className="text-center max-w-md">
                    <div className="mb-2">
                        <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
                    </div>
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
                        <div className="text-sm text-gray-500">
                            {error.response?.status && (
                                <span>Error Code: {error.response.status}</span>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Empty results state
    if (data?.results?.length === 0) {
        return (
            <main
                style={{
                    minHeight: "calc(100vh - 64px)"
                }}
                className="flex items-center justify-center p-8"
            >
                <div className="text-center max-w-md">
                    <div className="mb-2">
                        <Package className="mx-auto h-16 w-16 text-gray-400" />
                    </div>
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
    }

    // Success state with data
    return (
        <main
            style={{
                minHeight: "calc(100vh - 64px)"
            }}
            className="flex items-center justify-center p-4"
        >
            <div className="w-full max-w-7xl">
                <ExpandableCard cards={data.results} />
            </div>
        </main>
    );
}

async function fetchProductsByIds(ids) {
    try {
        const res = await axios.post("/api/search", { ids });
        return res.data;
    } catch (error) {
        // Enhanced error handling
        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message || 'Server error occurred';
            const enhancedError = new Error(errorMessage);
            enhancedError.response = error.response;
            throw enhancedError;
        } else if (error.request) {
            // Network error
            const networkError = new Error('Network connection failed');
            networkError.code = 'NETWORK_ERROR';
            throw networkError;
        } else {
            // Other error
            throw error;
        }
    }
}