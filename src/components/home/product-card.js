"use client";
import Image from "next/image";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { useState } from "react";
import items from "../../app/items.json";


const warningsData = [
  {
    productId: 4,
    title: "Health Alert",
    message:
      "This product contains high sugar content which may not be suitable for your diabetic condition.",
    alternative: {
      title: items[4].title,
      image: items[4].image,
      price: items[4].price,
    },
  },
  {
    productId: 8,
    title: "Health Warning",
    message:
      "This product contains high sodium content which may not be suitable for your BP condition.",
    alternative: {
      title: items[8].title,
      image: items[8].image,
      price: items[8].price,
    },
  },
  {
    productId: 10,
    title: "Preference Alert",
    message:
      "This product conatins gluten and mil based content.",
    alternative: {
      title: items[10].title,
      image: items[10].image,
      price: items[10].price,
    },
  },
];

export const ProductCard = ({ product, isSelected, onClick }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Find warning data for this product (if any)
  const warning = warningsData.find(
    (warn) => warn.productId === product.id
  );

  const hasWarning = !!warning;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${isSelected
          ? "border-neutral-500 bg-neutral-200"
          : "border-gray-200 bg-white hover:border-gray-300 hover:scale-102 hover:shadow-sm"
        }`}
      onClick={() => onClick(product)}
    >
      <Image
        src={product.image}
        alt={product.title}
        width={64}
        height={64}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1 min-w-0">
        <h3 className="text-gray-900 text-sm font-medium truncate">
          {product.title}
        </h3>
        <span className="font-semibold text-blue-600 text-sm">
          {formatCurrency(product.price)}
        </span>
      </div>

      {hasWarning && (
        <div className="relative">
          <AlertTriangle
            className="w-5 h-5 text-red-500 cursor-pointer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />

          {showTooltip && (
            <div className="absolute right-0 top-6 z-50 w-72 bg-white border border-red-200 rounded-lg shadow-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-700">
                  {warning.title}
                </span>
              </div>
              <p className="text-xs text-gray-700 mb-3">
                {warning.message}
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={24}
                    height={24}
                    className="w-6 h-6 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-red-700 truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-red-600">Not recommended</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-2">
                <p className="text-xs font-medium text-green-700 mb-1">
                  Recommended Alternative:
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={warning.alternative.image}
                      alt={warning.alternative.title}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-green-700">
                        {warning.alternative.title}
                      </p>
                      <p className="text-xs text-green-600">
                        {formatCurrency(warning.alternative.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <ArrowRight className="w-4 h-4 text-gray-400" />
    </div>
  );
};