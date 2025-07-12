"use client";

import { useState, useCallback, useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { ProductList } from "@/components/home/product-list";
import { ProductDetails } from "@/components/home/product-details";
import { QueryInput } from "@/components/home/query-input";
import items from "./items.json";
import { BounceLoading } from "respinner";

// Loading component
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

const ChatbotInterface = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false); // New state for processing
  const [chatHistory, setChatHistory] = useState([
    {
      query: "What are the ingredients I'll need to make this cake?",
      productIds: [3, 6, 7, 9, 13],
      selectedProductId: items[3].id,
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");

  const { isRecording, startRecording, stopRecording } = useSpeechRecognition({
    onTranscript: (transcript) => {
      setInputQuery((prev) => (prev ? prev + " " + transcript : transcript));
    },
  });

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5432); // 5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const handleMicClick = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      setInputQuery("");
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const handleSend = useCallback(() => {
    if (!inputQuery.trim()) return;

    setIsProcessing(true); // Start processing

    setTimeout(() => {
      const newIds = [16, 17, 19, 20, 21];
      const newEntry = {
        query: inputQuery.trim(),
        productIds: newIds,
        selectedProductId: items[newIds[0]].id,
      };
      setChatHistory((prev) => [...prev, newEntry]);
      setInputQuery("");
      setIsProcessing(false); // Stop processing
    }, 7530);
  }, [inputQuery]);

  const updateSelectedProduct = (chatIndex, newId) => {
    setChatHistory((prev) => {
      const updated = [...prev];
      updated[chatIndex].selectedProductId = newId;
      return updated;
    });
  };

  // Show loading state
  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="mx-auto px-10 pt-4 pb-20 bg-gray-100">
      <div id="chat" className="flex flex-col gap-8">
        {chatHistory.map((chat, index) => {
          const products = chat.productIds.map((id) => items[id]);
          const selectedProduct = products.find((p) => p.id === chat.selectedProductId);
          return (
            <div key={index} className="flex flex-col gap-4">
              {/* Query bubble */}
              <div className="flex justify-end">
                <div className="px-4 py-2 rounded-2xl shadow text-sm font-medium bg-white text-black">
                  {chat.query}
                </div>
              </div>

              {/* Product Display Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {selectedProduct && <ProductDetails product={selectedProduct} />}
                </div>
                <div className="lg:col-span-1 bg-white rounded-2xl p-4 shadow self-start">
                  <ProductList
                    products={products}
                    selectedProductId={chat.selectedProductId}
                    onSelect={(id) => updateSelectedProduct(index, id)}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Show processing spinner when waiting for results */}
        {isProcessing && (
          <div className="flex justify-center py-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow">
              <BounceLoading gap={2} color="#0071CE" size="small" />
              <span className="text-sm text-gray-600">Finding products...</span>
            </div>
          </div>
        )}

        {/* Query Input Section */}
        <QueryInput
          value={inputQuery}
          onChange={setInputQuery}
          onSend={handleSend}
          isRecording={isRecording}
          onMicClick={handleMicClick}
          disabled={isProcessing} // Disable input while processing
        />
      </div>
    </div>
  );
};

export default ChatbotInterface;