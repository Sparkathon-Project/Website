"use client";
import { ProductCard } from './product-card';

export const ProductList = ({ products, selectedProductId, onSelect }) => (
  <div className="space-y-2">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        isSelected={selectedProductId === product.id}
        onClick={() => onSelect(product.id)}
      />
    ))}
  </div>
);