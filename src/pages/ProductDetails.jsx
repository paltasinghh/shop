import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();

  if (!product) return <div className="text-center">Product not found</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <img src={product.image} alt={product.name} className="w-full rounded-lg border" />
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="text-xl text-primary font-semibold">${product.price.toFixed(2)}</div>
        <div className="text-sm text-gray-600">★ {product.rating}</div>
        <p className="text-gray-700">{product.description}</p>
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => addItem(product)}>Add to Cart</button>
      </div>
    </div>
  );
}