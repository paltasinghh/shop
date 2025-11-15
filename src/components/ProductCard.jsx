import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import Button from "./common/Button.jsx";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { ids, toggle } = useWishlist();
  const wishlisted = ids.includes(product.id);

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block font-medium text-gray-900">{product.name}</Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
          <span className="text-xs text-gray-600">★ {product.rating}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <Button className="flex-1" onClick={() => addItem(product)}>Add to Cart</Button>
          <Button variant={wishlisted ? "primary" : "outline"} onClick={() => toggle(product.id)}>♥</Button>
        </div>
      </div>
    </div>
  );
}