"use client";
import Image from 'next/image';
import { Lens } from '../ui/lens';

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
};

export const ProductDetails = ({ product }) => (
  <div className="bg-white rounded-2xl shadow-xs overflow-hidden">
    <div className="aspect-video flex items-center justify-center">
      <Lens>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={300}
          className="max-w-full max-h-full object-contain"
        />
      </Lens>
    </div>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 font-space-grotesk">{product.title}</h2>
          <span className="font-bold text-blue-600">{formatCurrency(product.price)}</span>
        </div>
        <button className="cursor-pointer bg-blue-500 text-white px-4 rounded-3xl hover:bg-blue-600 transition">
          Buy Now
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold font-space-grotesk">About this item</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
      <div>
        <h3 className="text-lg font-bold font-space-grotesk">More details</h3>
        <KeyValueList data={product.miscellaneous} />
      </div>
    </div>
  </div>
);

function KeyValueList({
  data,
  level = 0,
}) {
  const formatKey = (key) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  return (
    <>
      {Object.entries(data).map(([key, value]) => {
        const isNested = typeof value === "object" && value !== null;

        return (
          <div
            key={key}
            className={`flex flex-col ${level > 0 ? "px-4 border-l border-gray-200" : ""
              }`}
          >
            <div className="flex justify-between items-start">
              <span className="flex-shrink-0 w-1/3 font-medium text-slate-600 text-sm">
                {formatKey(key)}:
              </span>
              <span className="flex-1 ml-2 text-slate-800 text-sm text-right capitalize">
                {!isNested ? String(value) : null}
              </span>
            </div>
            {isNested && <KeyValueList data={value} level={level + 1} />}
          </div>
        );
      })}
    </>
  );
}